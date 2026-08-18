import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout.jsx';
import RouteFallback from '@/components/RouteFallback.jsx';
import Dashboard from '@/routes/Dashboard.jsx';

/* The dashboard is the landing page and ships in the main bundle; every other screen
   loads on demand, so a first visit does not pay for the exam runner or the guide. */
const Learn = lazy(() => import('@/routes/Learn.jsx'));
const Guide = lazy(() => import('@/routes/Guide.jsx'));
const History = lazy(() => import('@/routes/History.jsx'));
const Settings = lazy(() => import('@/routes/Settings.jsx'));
const Runner = lazy(() => import('@/routes/Runner.jsx'));
const Results = lazy(() => import('@/routes/Results.jsx'));
const Review = lazy(() => import('@/routes/Review.jsx'));
const NotFound = lazy(() => import('@/routes/NotFound.jsx'));

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/exam/:examId/:mode" element={<Runner />} />
          <Route path="/results/:attemptId" element={<Results />} />
          <Route path="/review/:attemptId" element={<Review />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
