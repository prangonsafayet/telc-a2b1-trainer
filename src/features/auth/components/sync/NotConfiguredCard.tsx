import { CloudOff } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui';

import { syncDiagnostics } from '@features/auth/lib/supabaseClient.ts';

import DiagnosticRow from './DiagnosticRow.tsx';

/** Explains exactly which sync env vars this build was compiled with and how to fix them. */
const NotConfiguredCard = () => {
  const d = syncDiagnostics;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudOff className="size-4" /> Cloud sync — not active
        </CardTitle>
        <CardDescription>
          Progress is saved in this browser only. Here is exactly what this build of the app was compiled
          with:
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <ul className="space-y-1.5">
          <DiagnosticRow
            label="VITE_SUPABASE_URL"
            ok={d.urlPresent}
            detail={d.urlPresent ? d.projectUrl : 'not set in this build'}
          />
          <DiagnosticRow
            label="…is a valid project URL"
            ok={d.urlValid}
            detail={d.urlValid ? 'looks right' : 'must be https://<project-ref>.supabase.co'}
          />
          <DiagnosticRow
            label="VITE_SUPABASE_ANON_KEY"
            ok={d.keyPresent}
            detail={d.keyPresent ? d.keyPreview : 'not set in this build'}
          />
          <DiagnosticRow
            label="…is a publishable key"
            ok={d.keyLooksValid}
            detail={
              d.keyIsSecret
                ? 'this is a SECRET key — never ship it'
                : d.keyPresent
                  ? 'expected "sb_publishable_…" or "eyJ…"'
                  : '—'
            }
          />
        </ul>

        {d.keyIsSecret ? (
          <p className="rounded-md border-l-4 border-destructive bg-[color-mix(in_oklab,var(--destructive)_10%,transparent)] p-3 text-destructive">
            <b>Stop.</b> That key is a service-role/secret key. It bypasses row-level security and must never
            be put in a browser app. Rotate it in Supabase, then use the <b>anon / publishable</b> key
            instead.
          </p>
        ) : (
          <div className="rounded-md border-l-4 border-primary bg-accent/40 p-3">
            <b>How to fix it</b>
            <p className="mt-1 text-muted-foreground">
              These values are baked in when the app is <i>built</i>, not read when it runs — so changing them
              always needs a rebuild.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>
                <b>Running locally?</b> Put them in <code>.env</code>, then <b>restart</b>{' '}
                <code>npm run dev</code>.
              </li>
              <li>
                <b>Deployed on Netlify?</b> Add them under <b>Site configuration → Environment variables</b>,
                then trigger a <b>new deploy</b>.
              </li>
              <li>
                <b>
                  Deployed by uploading <code>dist</code>?
                </b>{' '}
                Run <code>npm run build</code> again with <code>.env</code> in place and re-upload.
              </li>
            </ul>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Build mode: <code>{d.mode}</code>. Until sync is on, use <b>History → Export progress</b> to keep a
          backup.
        </p>
      </CardContent>
    </Card>
  );
};

export default NotConfiguredCard;
