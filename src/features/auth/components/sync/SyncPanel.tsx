import { useSync } from '@features/auth/hooks/useSync.ts';

import ActiveCard from './ActiveCard.tsx';
import NotConfiguredCard from './NotConfiguredCard.tsx';
import SignInCard from './SignInCard.tsx';

/** Picks the right sync card for the build's configuration and the session state. */
const SyncPanel = () => {
  const sync = useSync();
  if (!sync.configured) return <NotConfiguredCard />;
  if (!sync.user) return <SignInCard />;
  return <ActiveCard />;
};

export default SyncPanel;
