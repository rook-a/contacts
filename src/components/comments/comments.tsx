import { useAppSelector } from '../../hooks/hooks';
import { selectComments } from '../../store/comments-slice/comments-slice';

import styles from './comments.module.css';

function Comments(): JSX.Element {
  const comments = useAppSelector(selectComments);

  return (
    <ul className={styles['comments-list']}>
      {comments.map(({ id, name, email, body }) => (
        <li className={styles['comments-item']} key={id}>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Comment: {body}</p>
        </li>
      ))}
    </ul>
  );
}

export default Comments;
