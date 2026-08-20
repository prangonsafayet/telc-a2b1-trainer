import { lazy, Suspense, type ReactElement } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { RouteFallback } from '@shared/components';
import { TELC_LEVELS, TRAINERS } from '@shared/config/trainers.ts';
import { type TrainerId } from '@shared/types';

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

/* The B1 and B2 trainers: one set of screens, mounted once per level. */
const LevelDashboardPage = lazy(() => import('@features/level-trainer/routes/LevelDashboardPage.tsx'));
const LevelLearnPage = lazy(() => import('@features/level-trainer/routes/LevelLearnPage.tsx'));
const LevelPracticePage = lazy(() => import('@features/level-trainer/routes/LevelPracticePage.tsx'));
const LevelHistoryPage = lazy(() => import('@features/level-trainer/routes/LevelHistoryPage.tsx'));

/* One exam feature serves every trainer; the screens take the trainer as a prop. */
const RunnerPage = lazy(() => import('@features/exam/routes/RunnerPage.tsx'));
const ResultsPage = lazy(() => import('@features/exam/routes/ResultsPage.tsx'));
const ReviewPage = lazy(() => import('@features/exam/routes/ReviewPage.tsx'));

/**
 * The three exam screens, mounted relative to whichever trainer's base path they sit
 * under. Every trainer sets a paper, so every trainer gets the same three URLs.
 */
const examRoutes = (trainer: TrainerId): readonly ReactElement[] => [
  <Route key="exam" path="exam/:examId/:mode" element={<RunnerPage trainer={trainer} />} />,
  <Route key="results" path="results/:attemptId" element={<ResultsPage trainer={trainer} />} />,
  <Route key="review" path="review/:attemptId" element={<ReviewPage trainer={trainer} />} />
];

export const AppRouter = () => (
  <Suspense fallback={<RouteFallback />}>
    <Routes>
      <Route element={<AppLayout />}>
        {/* The original A2·B1 trainer owns the root. */}
        <Route path={TRAINERS.a2b1.basePath || '/'}>
          <Route index element={<DashboardPage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="guide" element={<GuidePage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="settings" element={<SettingsPage />} />
          {examRoutes('a2b1')}
        </Route>

        {TELC_LEVELS.map(level => (
          <Route key={level} path={TRAINERS[level].basePath}>
            <Route index element={<LevelDashboardPage level={level} />} />
            <Route path="learn" element={<LevelLearnPage level={level} />} />
            <Route path="practice" element={<LevelPracticePage level={level} />} />
            <Route path="history" element={<LevelHistoryPage level={level} />} />
            {examRoutes(level)}
          </Route>
        ))}

        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Suspense>
);
