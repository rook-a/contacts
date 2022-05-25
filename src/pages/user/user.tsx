import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchUser, selectUser } from '../../store/users-slice/users-slice';

import styles from './user.module.css';

function User(): JSX.Element | null {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const selectUserId = Number(id);

  useEffect(() => {
    dispatch(fetchUser(selectUserId));
  }, [dispatch, selectUserId]);

  if (!user) {
    return null;
  }

  const { username, name, email, phone, website, company } = user;

  return (
    <main className="container">
      <h1 className={styles['username']}>{username}</h1>

      <div className={styles['contacts']}>
        <h2 className={styles['title']}>Contacts</h2>
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
        <h2 className={styles['title']}>Posts</h2>
      </div>
    </main>
  );
}

export default User;
