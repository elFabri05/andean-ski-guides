/**
 * Deployment environment adapter.
 *
 * This is the ONLY module that reads host-injected environment variables or
 * host-specific request headers. Vercel, Netlify and self-hosted deployments
 * all expose the same information under different names; everything else in
 * the app asks this module instead of reading `process.env` directly.
 *
 * Supporting another host means editing the lookup chains below and nothing
 * else.
 */

/** Canonical production domain. Used when no host has injected a URL. */
const CANONICAL_SITE_URL = 'https://andeanskiguides.com';

/**
 * Normalise a host-injected value to a bare origin: scheme + host (+ port),
 * with no path and no trailing slash, so it can be compared against a request's
 * Origin header by string equality.
 *
 * Hosts are inconsistent about the scheme -- Vercel injects bare hostnames,
 * Netlify injects full URLs -- so it is added only when absent. Anything that
 * does not parse as a URL is dropped rather than guessed at.
 */
function toOrigin(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) {
    return undefined;
  }

  const hasScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed);

  try {
    return new URL(hasScheme ? trimmed : `https://${trimmed}`).origin;
  } catch {
    return undefined;
  }
}

/**
 * Every origin the current deployment answers on, as injected by the hosting
 * platform, in descending order of stability. Empty when running locally or on
 * a host that injects nothing.
 *
 * This is what makes preview/branch deployments work: each one gets its own
 * hostname, which is not known ahead of time and therefore cannot be hardcoded
 * in the allowed-origin list.
 *
 * All applicable values are returned rather than the first match, because a
 * single deployment is typically reachable on several hostnames at once -- on
 * Netlify a production deploy answers on both the primary site URL and its
 * per-deploy URL, and a request from either is equally legitimate. Returning
 * only the first meant whichever hostname the visitor actually used had to be
 * the one that happened to win the lookup.
 */
export function getPlatformDeployUrls(): string[] {
  const candidates = [
    // Vercel: bare hostnames, no scheme. Set on every deployment, previews
    // included. VERCEL_BRANCH_URL is the branch permalink, stable across
    // rebuilds; VERCEL_URL is unique per deployment.
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,

    // Netlify: full URLs including scheme. URL is the primary site address;
    // DEPLOY_PRIME_URL is the branch/preview permalink and stays stable across
    // rebuilds of the same branch; DEPLOY_URL is unique per build.
    process.env.URL,
    process.env.DEPLOY_PRIME_URL,
    process.env.DEPLOY_URL,
  ];

  const origins: string[] = [];
  for (const candidate of candidates) {
    const origin = toOrigin(candidate);
    if (origin && !origins.includes(origin)) {
      origins.push(origin);
    }
  }

  return origins;
}

/**
 * The site's canonical URL.
 *
 * An explicit NEXT_PUBLIC_SITE_URL always wins, so a self-hosted or
 * differently-domained deployment can override it without a code change.
 */
export function getCanonicalSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_SITE_URL;
}

export type DeployContext = 'production' | 'preview' | 'development';

/**
 * Which kind of deployment this is, normalised across hosts.
 *
 * Vercel reports production/preview/development in VERCEL_ENV. Netlify reports
 * production/deploy-preview/branch-deploy/dev in CONTEXT — both of its
 * non-production remote contexts map onto "preview".
 */
export function getDeployContext(): DeployContext {
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv === 'production' || vercelEnv === 'preview' || vercelEnv === 'development') {
    return vercelEnv;
  }

  switch (process.env.CONTEXT) {
    case 'production':
      return 'production';
    case 'deploy-preview':
    case 'branch-deploy':
      return 'preview';
    case 'dev':
      return 'development';
  }

  // No host signal: fall back to the build mode.
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
}

export interface ClientIpHeader {
  name: string;
  /**
   * Whether the header may hold a comma-separated proxy chain, in which case
   * the first entry is the originating client. Single-value headers are read
   * verbatim.
   */
  isChain: boolean;
}

/**
 * Request headers that carry the real client IP, in order of preference.
 *
 * The order is the one this app has always used, deliberately preserved so
 * that swapping hosts does not change which IP the rate limiter keys on. The
 * Netlify header sits alongside the Vercel one at the end.
 *
 * Note that x-forwarded-for is client-supplied and only trustworthy because
 * the platform edge overwrites it; the platform-specific headers below it are
 * the stronger signal and would be the safer first choice. Changing that order
 * is a behavioural change to rate limiting, so it is left alone here.
 */
export const CLIENT_IP_HEADERS: readonly ClientIpHeader[] = [
  { name: 'x-forwarded-for', isChain: true }, // generic, set by most proxies
  { name: 'x-real-ip', isChain: false }, // nginx and most reverse proxies
  { name: 'cf-connecting-ip', isChain: false }, // Cloudflare
  { name: 'x-vercel-forwarded-for', isChain: false }, // Vercel edge
  { name: 'x-nf-client-connection-ip', isChain: false }, // Netlify edge
];
