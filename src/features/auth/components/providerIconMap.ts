import { type OAuthProvider } from '../lib/oauthProviders.ts';

import GitHubIcon from './icons/GitHubIcon.tsx';
import GoogleIcon, { type ProviderIconProps } from './icons/GoogleIcon.tsx';

/** Brand mark per provider, used by the sign-in buttons. */
export const PROVIDER_ICONS: Readonly<
  Record<OAuthProvider, (props: ProviderIconProps) => React.JSX.Element>
> = {
  google: GoogleIcon,
  github: GitHubIcon
};
