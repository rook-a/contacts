import { useEffect } from 'react';
import UserList from '../../components/user-list/user-list';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchUsers } from '../../store/users-slice/users-slice';

import styles from './main.module.css';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <main className="container">
      <h1 className={styles['title']}>Contacts</h1>

      <UserList />
    </main>
  );
}

export default Main;
