import { z } from 'zod';

export const usernameValidation = z
    .string()
    .min(2, "Username must be at least 2 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores");

export const signupSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:"Please enter a valid email address"}),
    password: z.string().min(6, {message:"Password must be at least 6 characters long"})
})



// Zod is:
// A runtime validation library
// For JavaScript / TypeScript

// It:
// Checks actual values at runtime
// Returns structured errors
// Prevents bad data from flowing deeper
// TypeScript alone is not enough because:
// TS disappears at runtime
// User input is untrusted