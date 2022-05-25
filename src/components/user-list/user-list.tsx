import { Fragment } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { selectUsers } from '../../store/users-slice/users-slice';
import UserItem from '../user-item/user-item';

import styles from './user-list.module.css';

function UserList(): JSX.Element {
  const users = useAppSelector(selectUsers);

  return (
    <ul className={styles['user-list']}>
      {users.map(({ name, id }) => (
        <Fragment key={id}>
          <UserItem name={name} id={id} />
        </Fragment>
      ))}
    </ul>
  );
}

export default UserList;
