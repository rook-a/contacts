import { useEffect } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';
import PostsPreviewList from '../../components/posts-preview-list/posts-preview-list';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchUserPosts, selectCurrentPosts } from '../../store/posts-slice/posts-slice';
import { fetchUser, selectUser } from '../../store/users-slice/users-slice';

import styles from './user.module.css';

function User(): JSX.Element | null {
  const { id } = useParams();
  const link = generatePath('/user/:id/posts', { id });
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const posts = useAppSelector(selectCurrentPosts);

  const selectUserId = Number(id);

  useEffect(() => {
    dispatch(fetchUser(selectUserId));
    dispatch(fetchUserPosts(selectUserId));
  }, [dispatch, selectUserId]);

  if (!user) {
    return null;
  }

  const { username, name, email, phone, website, company } = user;

  return (
    <main className="container">
      <h1 className={styles['username']}>{username}</h1>

      <div className={styles['contacts']}>
        <h2 className="title">Contacts</h2>
        <ul className={styles['user-info']}>
          <li>Full name: {name}</li>
          <li>Email: {email}</li>
          <li>Phone: {phone}</li>
          <li>Website: {website}</li>
          <li>Company name: {company.name}</li>
          <li>Company bs: {company.bs}</li>
        </ul>
      </div>

      <div className={styles['posts']}>
        <h2 className="title">Posts</h2>

        <PostsPreviewList posts={posts} />

        <Link className={`button ${styles['posts-link']}`} to={link}>
          Show all
        </Link>
      </div>
    </main>
  );
}

export default User;
