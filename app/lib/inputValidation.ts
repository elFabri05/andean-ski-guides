/**
 * Input Validation Utilities
 *
 * Provides comprehensive validation for contact form inputs to prevent:
 * - Invalid data submission
 * - Injection attacks
 * - Data quality issues
 * - Abuse through malformed inputs
 */

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/**
 * Validate email format using a robust regex pattern
 * Based on RFC 5322 standard
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];

  // Check if empty
  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
    return { valid: false, errors };
  }

  // Check length constraints
  if (email.length > 254) {
    errors.push('Email is too long (max 254 characters)');
  }

  // Email format validation (RFC 5322 simplified)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(email)) {
    errors.push('Email format is invalid');
  }

  // Check for suspicious patterns
  if (email.includes('..')) {
    errors.push('Email contains invalid consecutive dots');
  }

  // Check for common typos in domains
  const domain = email.split('@')[1]?.toLowerCase();
  if (domain) {
    // Common typo domains
    const typoPatterns = ['gmial', 'gmai', 'yahooo', 'yaho', 'hotmial', 'outlok'];
    if (typoPatterns.some(typo => domain.includes(typo))) {
      errors.push('Email domain may contain a typo');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate name field
 */
export function validateName(name: string): ValidationResult {
  const errors: string[] = [];

  // Check if empty
  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
    return { valid: false, errors };
  }

  // Length constraints
  if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (name.length > 100) {
    errors.push('Name is too long (max 100 characters)');
  }

  // Allow letters, spaces, hyphens, apostrophes, and common international characters
  const nameRegex = /^[a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\s'-]+$/;
  if (!nameRegex.test(name)) {
    errors.push('Name contains invalid characters');
  }

  // Check for suspicious patterns (multiple consecutive special characters)
  if (/[-']{2,}/.test(name)) {
    errors.push('Name contains invalid consecutive special characters');
  }

  // Check for excessive whitespace
  if (/\s{3,}/.test(name)) {
    errors.push('Name contains excessive whitespace');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate phone number (optional field)
 * Accepts international formats
 */
export function validatePhone(phone: string | undefined): ValidationResult {
  const errors: string[] = [];

  // Phone is optional
  if (!phone || phone.trim().length === 0) {
    return { valid: true, errors: [] };
  }

  // Length constraints
  if (phone.length > 20) {
    errors.push('Phone number is too long (max 20 characters)');
  }

  if (phone.length < 7) {
    errors.push('Phone number is too short (min 7 characters)');
  }

  // Allow digits, spaces, hyphens, parentheses, and plus sign for international format
  const phoneRegex = /^[\d\s\-()+-]+$/;
  if (!phoneRegex.test(phone)) {
    errors.push('Phone number contains invalid characters');
  }

  // Must contain at least 7 digits
  const digitCount = (phone.match(/\d/g) || []).length;
  if (digitCount < 7) {
    errors.push('Phone number must contain at least 7 digits');
  }

  if (digitCount > 15) {
    errors.push('Phone number contains too many digits (max 15)');
  }

  // Check for suspicious patterns
  if (/(\d)\1{9,}/.test(phone.replace(/\D/g, ''))) {
    errors.push('Phone number appears invalid (repeated digits)');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate message content
 */
export function validateMessage(message: string): ValidationResult {
  const errors: string[] = [];

  // Check if empty
  if (!message || message.trim().length === 0) {
    errors.push('Message is required');
    return { valid: false, errors };
  }

  // Length constraints
  const trimmedLength = message.trim().length;

  if (trimmedLength < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  if (message.length > 5000) {
    errors.push('Message is too long (max 5000 characters)');
  }

  // Check for suspicious patterns that might indicate spam
  const suspiciousPatterns = [
    /https?:\/\/[^\s]+/gi, // URLs (count them)
    /<script/gi,           // Script tags
    /javascript:/gi,       // JavaScript protocol
    /on\w+\s*=/gi,        // Event handlers
  ];

  // Count URLs
  const urlMatches = message.match(/https?:\/\/[^\s]+/gi);
  if (urlMatches && urlMatches.length > 3) {
    errors.push('Message contains too many URLs (max 3)');
  }

  // Check for script injection attempts
  if (/<script|javascript:|on\w+\s*=/gi.test(message)) {
    errors.push('Message contains potentially malicious content');
  }

  // Check for excessive repetition (potential spam)
  const words = message.trim().split(/\s+/);
  const uniqueWords = new Set(words.map(w => w.toLowerCase()));

  if (words.length > 20 && uniqueWords.size / words.length < 0.3) {
    errors.push('Message appears to be spam (too much repetition)');
  }

  // Check for excessive capitalization (common in spam)
  const capitalLetters = (message.match(/[A-Z]/g) || []).length;
  const totalLetters = (message.match(/[a-zA-Z]/g) || []).length;

  if (totalLetters > 20 && capitalLetters / totalLetters > 0.5) {
    errors.push('Message contains excessive capitalization');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate entire contact form
 * Returns all validation errors at once
 */
export function validateContactForm(data: ContactFormData): {
  valid: boolean;
  errors: Record<string, string[]>;
  allErrors: string[];
} {
  const nameValidation = validateName(data.name);
  const emailValidation = validateEmail(data.email);
  const phoneValidation = validatePhone(data.phone);
  const messageValidation = validateMessage(data.message);

  const errors: Record<string, string[]> = {};
  const allErrors: string[] = [];

  if (!nameValidation.valid) {
    errors.name = nameValidation.errors;
    allErrors.push(...nameValidation.errors);
  }

  if (!emailValidation.valid) {
    errors.email = emailValidation.errors;
    allErrors.push(...emailValidation.errors);
  }

  if (!phoneValidation.valid) {
    errors.phone = phoneValidation.errors;
    allErrors.push(...phoneValidation.errors);
  }

  if (!messageValidation.valid) {
    errors.message = messageValidation.errors;
    allErrors.push(...messageValidation.errors);
  }

  return {
    valid: allErrors.length === 0,
    errors,
    allErrors,
  };
}

/**
 * Sanitize and normalize input
 * Trims whitespace and normalizes line breaks
 */
export function normalizeInput(input: string): string {
  return input
    .trim()
    .replace(/\r\n/g, '\n')  // Normalize line breaks
    .replace(/\n{3,}/g, '\n\n'); // Limit consecutive line breaks
}
