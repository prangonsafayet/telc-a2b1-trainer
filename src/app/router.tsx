import { lazy, Suspense } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { RouteFallback } from '@/shared/components';

import { DashboardPage } from '@/features/dashboard/routes/DashboardPage.tsx';

import { AppLayout } from './layout/AppLayout.tsx';
import { NotFoundPage } from './routes/NotFoundPage.tsx';

/**
 * The dashboard is the landing page and ships in the main bundle; every other screen
 * loads on demand, so a first visit does not pay for the exam runner or the guide.
 */
const LearnPage = lazy(() =>
  import('@/features/learn/routes/LearnPage.tsx').then(m => ({ default: m.LearnPage }))
);
const GuidePage = lazy(() =>
  import('@/features/guide/routes/GuidePage.tsx').then(m => ({ default: m.GuidePage }))
);
const HistoryPage = lazy(() =>
  import('@/features/history/routes/HistoryPage.tsx').then(m => ({ default: m.HistoryPage }))
);
const SettingsPage = lazy(() =>
  import('@/features/settings/routes/SettingsPage.tsx').then(m => ({ default: m.SettingsPage }))
);
const RunnerPage = lazy(() =>
  import('@/features/exam/routes/RunnerPage.tsx').then(m => ({ default: m.RunnerPage }))
);
const ResultsPage = lazy(() =>
  import('@/features/exam/routes/ResultsPage.tsx').then(m => ({ default: m.ResultsPage }))
);
const ReviewPage = lazy(() =>
  import('@/features/exam/routes/ReviewPage.tsx').then(m => ({ default: m.ReviewPage }))
);

export function AppRouter() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/exam/:examId/:mode" element={<RunnerPage />} />
          <Route path="/results/:attemptId" element={<ResultsPage />} />
          <Route path="/review/:attemptId" element={<ReviewPage />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
