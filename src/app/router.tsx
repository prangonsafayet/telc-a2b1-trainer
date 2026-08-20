import { lazy, Suspense } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { RouteFallback } from '@shared/components';

import DashboardPage from '@features/dashboard/routes/DashboardPage.tsx';

import AppLayout from './layout/AppLayout.tsx';
import NotFoundPage from './routes/NotFoundPage.tsx';

/**
 * The dashboard is the landing page and ships in the main bundle; every other screen
 * loads on demand, so a first visit does not pay for the exam runner or the guide.
 */
const LearnPage = lazy(() => import('@features/learn/routes/LearnPage.tsx'));
const GuidePage = lazy(() => import('@features/guide/routes/GuidePage.tsx'));
const HistoryPage = lazy(() => import('@features/history/routes/HistoryPage.tsx'));
const SettingsPage = lazy(() => import('@features/settings/routes/SettingsPage.tsx'));
const RunnerPage = lazy(() => import('@features/exam/routes/RunnerPage.tsx'));
const ResultsPage = lazy(() => import('@features/exam/routes/ResultsPage.tsx'));
const ReviewPage = lazy(() => import('@features/exam/routes/ReviewPage.tsx'));

/* The B1 and B2 trainers: one set of screens, mounted once per level. */
const LevelDashboardPage = lazy(() => import('@features/level-trainer/routes/LevelDashboardPage.tsx'));
const LevelLearnPage = lazy(() => import('@features/level-trainer/routes/LevelLearnPage.tsx'));
const LevelPracticePage = lazy(() => import('@features/level-trainer/routes/LevelPracticePage.tsx'));
const LevelHistoryPage = lazy(() => import('@features/level-trainer/routes/LevelHistoryPage.tsx'));
const TelcRunnerPage = lazy(() => import('@features/telc-exam/routes/TelcRunnerPage.tsx'));
const TelcResultsPage = lazy(() => import('@features/telc-exam/routes/TelcResultsPage.tsx'));
const TelcReviewPage = lazy(() => import('@features/telc-exam/routes/TelcReviewPage.tsx'));

export const AppRouter = () => (
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
        {(['b1', 'b2'] as const).map(level => (
          <Route key={level} path={`/${level}`}>
            <Route index element={<LevelDashboardPage level={level} />} />
            <Route path="learn" element={<LevelLearnPage level={level} />} />
            <Route path="practice" element={<LevelPracticePage level={level} />} />
            <Route path="history" element={<LevelHistoryPage level={level} />} />
            <Route path="exam/:examId/:mode" element={<TelcRunnerPage level={level} />} />
            <Route path="results/:attemptId" element={<TelcResultsPage level={level} />} />
            <Route path="review/:attemptId" element={<TelcReviewPage level={level} />} />
          </Route>
        ))}
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Suspense>
);
