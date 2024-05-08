import React, { Dispatch, SetStateAction, Suspense, lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from '../view/components/Spinner';
import { RootState } from 'src/store';

const Dashboard = lazy(() => import('src/view/components/Dashboard/Dashboard'));
const CommunicationList = lazy(
  () => import('src/view/components/CommunicationList/CommunicationList')
);
const Communication = lazy(
  () => import('src/view/components/Communication/Communication')
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
          <Route path="templates" element={<CommunicationList />}>
            <Route path="sms" element={<CommunicationList />} />
            <Route path="whatsapp" element={<CommunicationList />} />
            <Route path="transaction" element={<CommunicationList />} />
            <Route path="email" element={<CommunicationList />} />
          </Route>
          <Route path="template/sms/:id" element={<Communication />} />
          <Route path="template/transaction/:id" element={<Communication />} />
          <Route path="template/email/:id" element={<Communication />} />
          <Route path="template/whatsapp/:id" element={<Communication />} />

          <Route path="" element={<Navigate to="/templates" replace />} />

          <Route path="*" element={<Navigate to="/templates" replace />} />
          <Route path="/" element={<Navigate to="/templates" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

const mapStateToProps = (state: RootState) => {
  const accessTokenBoolCheck = !!state?.user?.tokens?.accessToken;
  const accessToken = state?.user?.tokens?.accessToken;

  return {
    user_name: state?.user?.name,
    // login_success: accessTokenBoolCheck && state?.user?.success,
    accessToken: accessTokenBoolCheck && accessToken,
  };
};

export default connect(mapStateToProps, null)(AppRoutes);
