/**
 * An array of routes that are publicly accessible without authentication.
 */
export const publicRoutes: string[] = ["/"];

/**
 * An array of routes accessible only to unauthenticated users.
 * Authenticated users will be redirected to the default login redirect path.
 */
export const guestOnlyRoutes: string[] = [
  "/signin",
  "/signup",
  "/error",
  "/reset",
  "/new-password",
  "/new-verification",
];

/**
 * An array of routes accessible only to authenticated users.
 * Unauthenticated users will be redirected to the default login redirect path.
 */
export const authOnlyRoutes: string[] = ["/dashboard"];

/**
 * The default redirect path after a successful login.
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
