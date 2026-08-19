/**
 * Build identity, injected by Vite from package.json and the deploy environment.
 * `package.json` is the single source of truth; the release workflow bumps it.
 */
export const APP_VERSION = __APP_VERSION__;

/** Short commit SHA of the deployed build. Empty in local development. */
export const APP_COMMIT = __APP_COMMIT__;

/** e.g. "v2.1.0 · a1b2c3d", or just "v2.1.0" when the commit is unknown. */
export const APP_BUILD_LABEL = APP_COMMIT ? `v${APP_VERSION} · ${APP_COMMIT}` : `v${APP_VERSION}`;
