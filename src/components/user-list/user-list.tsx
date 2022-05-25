import { useAppSelector } from '../../hooks/hooks';
import { selectUsers } from '../../store/users-slice/users-slice';

import styles from './user-list.module.css';

function UserList(): JSX.Element {
  const users = useAppSelector(selectUsers);

  return (
    <ul className={styles['user-list']}>
      {users.map(({ name, id }) => (
        <li className={styles['user-item']} key={id}>
          <p className={styles['user-name']}>{name}</p>
          <a className={styles['user-link']} href="/">
            show more
          </a>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
