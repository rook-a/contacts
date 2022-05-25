import { lazy, Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';

import MainOutlet from '../main-outlet/main-outlet';
import Spinner from '../spinner/spinner';

import { AppRoute } from '../../utils/const';

const Main = lazy(() => import('../../pages/main/main'));
const User = lazy(() => import('../../pages/user/user'));
const NotFound = lazy(() => import('../../pages/not-found/not-found'));

function App(): JSX.Element {
  return (
    <Suspense fallback={<Spinner className="spinner" />}>
      <Routes>
        <Route path={AppRoute.Root} element={<MainOutlet />}>
          <Route index element={<Main />} />
          <Route path={`${AppRoute.User}/:id`} element={<User />} />
          <Route path={AppRoute.NotFound} element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
