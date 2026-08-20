import { lazy, Suspense, type ReactElement } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { RouteFallback } from '@shared/components';
import {
  hasGuide,
  hasVocabBank,
  isSingleLevelTrainer,
  ROOT_TRAINER,
  TRAINER_ORDER,
  trainerHome
} from '@shared/config/trainers.ts';
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
const PracticePage = lazy(() => import('@features/level-trainer/routes/LevelPracticePage.tsx'));

/* One exam feature serves every trainer; the screens take the trainer as a prop. */
const RunnerPage = lazy(() => import('@features/exam/routes/RunnerPage.tsx'));
const ResultsPage = lazy(() => import('@features/exam/routes/ResultsPage.tsx'));
const ReviewPage = lazy(() => import('@features/exam/routes/ReviewPage.tsx'));

/** The guide screen, mounted only for a trainer whose descriptor ships one. */
const guideRoutes = (trainer: TrainerId): readonly ReactElement[] =>
  hasGuide(trainer) ? [<Route key="guide" path="guide" element={<GuidePage trainer={trainer} />} />] : [];

/** The practice hub, mounted for a trainer with a vocabulary and grammar bank to drill. */
const practiceRoutes = (trainer: TrainerId): readonly ReactElement[] =>
  hasVocabBank(trainer) && isSingleLevelTrainer(trainer)
    ? [<Route key="practice" path="practice" element={<PracticePage level={trainer} />} />]
    : [];

/**
 * The three exam screens, mounted relative to whichever trainer's base path they sit
 * under. Every trainer sets a paper, so every trainer gets the same three URLs.
 */
const examRoutes = (trainer: TrainerId): readonly ReactElement[] => [
  <Route key="exam" path="exam/:examId/:mode" element={<RunnerPage trainer={trainer} />} />,
  <Route key="results" path="results/:attemptId" element={<ResultsPage trainer={trainer} />} />,
  <Route key="review" path="review/:attemptId" element={<ReviewPage trainer={trainer} />} />
];

/**
 * One trainer's whole URL space, mounted under its own base path — and the trainer the
 * registry puts at the root owns everything unclaimed. Nothing here names a trainer, so a
 * fourth one gets all of these screens from its registry entry alone.
 */
const trainerRoutes = (trainer: TrainerId): ReactElement => (
  <Route key={trainer} path={trainerHome(trainer)}>
    <Route index element={<DashboardPage trainer={trainer} />} />
    <Route path="learn" element={<LearnPage trainer={trainer} />} />
    {guideRoutes(trainer)}
    {practiceRoutes(trainer)}
    <Route path="history" element={<HistoryPage trainer={trainer} />} />
    {examRoutes(trainer)}
  </Route>
);

export const AppRouter = () => (
  <Suspense fallback={<RouteFallback />}>
    <Routes>
      <Route element={<AppLayout />}>
        {TRAINER_ORDER.map(trainerRoutes)}

        {/* Settings covers every trainer, so it sits beside them rather than inside one. */}
        <Route path="/settings" element={<SettingsPage />} />

        <Route path="/dashboard" element={<Navigate to={trainerHome(ROOT_TRAINER)} replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Suspense>
);
