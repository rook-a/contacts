import { lazy, Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';

import MainOutlet from '../main-outlet/main-outlet';
import Spinner from '../spinner/spinner';

import { AppRoute } from '../../utils/const';

const Main = lazy(() => import('../../pages/main/main'));

function App(): JSX.Element {
  return (
    <Suspense fallback={<Spinner className="spinner" />}>
      <Routes>
        <Route path={AppRoute.Root} element={<MainOutlet />}>
          <Route index element={<Main />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
