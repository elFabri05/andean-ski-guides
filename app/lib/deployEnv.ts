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
 * URL of the *current* deployment, as injected by the hosting platform.
 *
 * This is what makes preview/branch deployments work: each one gets its own
 * hostname, which is not known ahead of time and therefore cannot be hardcoded
 * in the allowed-origin list.
 *
 * Returns undefined when running locally or on a host that injects nothing.
 */
export function getPlatformDeployUrl(): string | undefined {
  // Vercel: bare hostname, no scheme. Set on every deployment, previews included.
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  // Netlify: full URLs including scheme.
  // DEPLOY_PRIME_URL is the branch/preview permalink and stays stable across
  // rebuilds of the same branch, so it is preferred over DEPLOY_URL, which is
  // unique per build.
  const netlifyUrl = process.env.DEPLOY_PRIME_URL || process.env.DEPLOY_URL;
  if (netlifyUrl) {
    return netlifyUrl;
  }

  return undefined;
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
