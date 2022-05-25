import { generatePath, Link } from 'react-router-dom';

import styles from './user-item.module.css';

interface UserItemProps {
  id: number;
  name: string;
}

function UserItem({ id, name }: UserItemProps): JSX.Element {
  const link = generatePath('/user/:id', { id: `${id}` });

  return (
    <li className={styles['user-item']}>
      <p className={styles['user-name']}>{name}</p>
      <Link className={styles['user-link']} to={link}>
        show more
      </Link>
    </li>
  );
}

export default UserItem;
