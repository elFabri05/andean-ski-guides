/**
 * Email Header Injection Protection
 *
 * Prevents email header injection attacks by validating and sanitizing
 * data that will be used in email headers (subject, replyTo, etc.)
 *
 * Email header injection occurs when attackers inject CRLF characters
 * (\r\n) into email headers to add additional headers like BCC, CC,
 * or change the subject line.
 */

export interface HeaderValidationResult {
  safe: boolean;
  sanitized?: string;
  errors: string[];
}

/**
 * Dangerous characters that can be used for email header injection
 */
const DANGEROUS_HEADER_CHARS = [
  '\r',    // Carriage return
  '\n',    // Line feed
  '\0',    // Null byte
  '%0d',   // URL encoded CR
  '%0a',   // URL encoded LF
  '%00',   // URL encoded null
];

/**
 * Additional suspicious patterns in email headers
 */
const SUSPICIOUS_HEADER_PATTERNS = [
  /bcc:/gi,
  /cc:/gi,
  /to:/gi,
  /from:/gi,
  /subject:/gi,
  /content-type:/gi,
  /mime-version:/gi,
  /content-transfer-encoding:/gi,
];

/**
 * Check if a string contains dangerous characters for email headers
 */
function containsDangerousChars(input: string): boolean {
  // Check for direct dangerous characters
  for (const char of DANGEROUS_HEADER_CHARS) {
    if (input.includes(char)) {
      return true;
    }
  }

  // Check for suspicious header patterns
  for (const pattern of SUSPICIOUS_HEADER_PATTERNS) {
    if (pattern.test(input)) {
      return true;
    }
  }

  return false;
}

/**
 * Sanitize a string for safe use in email headers
 * Removes all dangerous characters
 */
function sanitizeHeaderValue(input: string): string {
  let sanitized = input;

  // Remove dangerous characters
  DANGEROUS_HEADER_CHARS.forEach(char => {
    sanitized = sanitized.replace(new RegExp(char, 'g'), '');
  });

  // Remove any suspicious header injection attempts
  sanitized = sanitized.replace(/\r\n|\r|\n/g, '');

  // Trim whitespace
  sanitized = sanitized.trim();

  return sanitized;
}

/**
 * Validate an email address for use in email headers
 * Email addresses should not contain CRLF or other dangerous characters
 */
export function validateEmailHeader(email: string): HeaderValidationResult {
  const errors: string[] = [];

  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
    return { safe: false, errors };
  }

  // Check for dangerous characters
  if (containsDangerousChars(email)) {
    errors.push('Email contains dangerous characters (potential header injection)');
    return { safe: false, errors };
  }

  // Additional validation for email format
  // Email should only contain valid characters
  const validEmailChars = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!validEmailChars.test(email)) {
    errors.push('Email format is invalid for header use');
    return { safe: false, errors };
  }

  // Check for null bytes
  if (email.includes('\0')) {
    errors.push('Email contains null bytes');
    return { safe: false, errors };
  }

  return {
    safe: true,
    sanitized: email.trim(),
    errors: [],
  };
}

/**
 * Validate a name/subject line for use in email headers
 * Names used in subject lines should not contain CRLF or other dangerous characters
 */
export function validateSubjectHeader(subject: string): HeaderValidationResult {
  const errors: string[] = [];

  if (!subject || subject.trim().length === 0) {
    errors.push('Subject is required');
    return { safe: false, errors };
  }

  // Check for dangerous characters
  if (containsDangerousChars(subject)) {
    errors.push('Subject contains dangerous characters (potential header injection)');

    // Try to sanitize
    const sanitized = sanitizeHeaderValue(subject);

    if (sanitized.length === 0) {
      errors.push('Subject became empty after sanitization');
      return { safe: false, errors };
    }

    // Return sanitized version with warning
    return {
      safe: true,
      sanitized,
      errors: ['Subject was sanitized to remove dangerous characters'],
    };
  }

  // Check for suspicious patterns
  for (const pattern of SUSPICIOUS_HEADER_PATTERNS) {
    if (pattern.test(subject)) {
      errors.push('Subject contains suspicious header patterns');

      const sanitized = sanitizeHeaderValue(subject);
      return {
        safe: true,
        sanitized,
        errors: ['Subject was sanitized to remove suspicious patterns'],
      };
    }
  }

  // Check length (RFC 2822 suggests max 998 characters per line)
  if (subject.length > 998) {
    errors.push('Subject is too long for email header');
    return {
      safe: true,
      sanitized: subject.substring(0, 998),
      errors: ['Subject was truncated to 998 characters'],
    };
  }

  return {
    safe: true,
    sanitized: subject.trim(),
    errors: [],
  };
}

/**
 * Comprehensive validation for all email headers
 */
export function validateEmailHeaders(data: {
  email: string;
  subject: string;
}): {
  safe: boolean;
  sanitizedEmail?: string;
  sanitizedSubject?: string;
  errors: string[];
  warnings: string[];
} {
  const emailValidation = validateEmailHeader(data.email);
  const subjectValidation = validateSubjectHeader(data.subject);

  const allErrors: string[] = [];
  const warnings: string[] = [];

  // Email validation
  if (!emailValidation.safe) {
    allErrors.push(...emailValidation.errors);
  }

  // Subject validation
  if (!subjectValidation.safe) {
    allErrors.push(...subjectValidation.errors);
  } else if (subjectValidation.errors.length > 0) {
    // Subject was sanitized but is safe now
    warnings.push(...subjectValidation.errors);
  }

  // If email is not safe, we can't proceed
  if (!emailValidation.safe) {
    return {
      safe: false,
      errors: allErrors,
      warnings,
    };
  }

  return {
    safe: allErrors.length === 0,
    sanitizedEmail: emailValidation.sanitized,
    sanitizedSubject: subjectValidation.sanitized,
    errors: allErrors,
    warnings,
  };
}

/**
 * Quick check: Does a string contain header injection attempts?
 */
export function containsHeaderInjection(input: string): boolean {
  return containsDangerousChars(input);
}

/**
 * Strip all dangerous characters from input
 */
export function stripDangerousChars(input: string): string {
  return sanitizeHeaderValue(input);
}
