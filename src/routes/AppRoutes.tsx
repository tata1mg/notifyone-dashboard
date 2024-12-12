import React, { Dispatch, SetStateAction, Suspense, lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from '../view/components/Spinner';

const Dashboard = lazy(() => import('src/view/components/Dashboard/Dashboard'));
const CommunicationList = lazy(
  () => import('src/view/pages/CommunicationList/CommunicationList')
);
const Communication = lazy(
  () => import('src/view/pages/Communication/Communication')
);
const NewEventCreation = lazy(
  () => import('src/view/pages/NewEventCreation/index')
);
const AppNameCreation = lazy(
  () => import('src/view/pages/AppNameCreation/index')
);
const HomePage = lazy(() => import('src/view/pages/HomePage/HomePage'));
const ProvidersPage = lazy(
  () => import('src/view/pages/ProvidersPage/ProvidersPage')
);
const AppsListPage = lazy(() => import('src/view/pages/AppsListPage/AppsList'));
const ActivityFeed = lazy(
  () => import('src/view/pages/ActivityFeedPage/ActivityFeed')
);

const Priority = lazy(() => import('src/view/pages/SettingsPage/SettingsPage'));
const DynamicPriority = lazy(
  () => import('src/view/pages/SettingsPage/DynamicPriority')
);

interface AppRouteProps {
  changeLocale: Dispatch<SetStateAction<string>>;
  locale: string;
  accessToken?: any;
}

const AppRoutes: React.FC<AppRouteProps> = () => {
  return (
    //rendering the routes
    <Suspense fallback={<Spinner loading />}>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomePage />} />

          <Route path="templates" element={<CommunicationList />}>
            <Route path="sms" element={<CommunicationList />} />
            <Route path="whatsapp" element={<CommunicationList />} />
            <Route path="transaction" element={<CommunicationList />} />
            <Route path="email" element={<CommunicationList />} />
          </Route>

          <Route path="providers" element={<ProvidersPage />} />

          <Route path="template/sms/:id" element={<Communication />} />
          <Route path="template/transaction/:id" element={<Communication />} />
          <Route path="template/email/:id" element={<Communication />} />
          <Route path="template/whatsapp/:id" element={<Communication />} />
          <Route path="new/event" element={<NewEventCreation />} />

          <Route path="apps" element={<AppsListPage />} />
          <Route path="apps/new" element={<AppNameCreation />} />

          <Route path="activity" element={<ActivityFeed />} />
          <Route path="priority" element={<Priority />} />
          <Route path="priority/dynamic" element={<DynamicPriority />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default connect(null)(AppRoutes);
