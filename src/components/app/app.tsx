import { lazy, Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';

import MainOutlet from '../main-outlet/main-outlet';
import Spinner from '../spinner/spinner';

import { AppRoute } from '../../utils/const';

const Main = lazy(() => import('../../pages/main/main'));
const User = lazy(() => import('../../pages/user/user'));
const UserPosts = lazy(() => import('../../pages/user-posts/user-posts'));
const Post = lazy(() => import('../../pages/post/post'));
const NotFound = lazy(() => import('../../pages/not-found/not-found'));

function App(): JSX.Element {
  return (
    <Suspense fallback={<Spinner className="spinner" />}>
      <Routes>
        <Route path={AppRoute.Root} element={<MainOutlet />}>
          <Route index element={<Main />} />
          <Route path={`${AppRoute.User}/:id`} element={<User />} />
          <Route path={`${AppRoute.User}/:id${AppRoute.Posts}`} element={<UserPosts />} />
          <Route path={`${AppRoute.User}/:id${AppRoute.Posts}/:postId`} element={<Post />} />
          <Route path={AppRoute.NotFound} element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
