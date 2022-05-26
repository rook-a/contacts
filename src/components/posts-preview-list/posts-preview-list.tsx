import { useAppSelector } from '../../hooks/hooks';
import { selectCurrentPosts } from '../../store/posts-slice/posts-slice';

import styles from './posts-preview-list.module.css';

function PostsPreviewList(): JSX.Element {
  const posts = useAppSelector(selectCurrentPosts);

  return (
    <ul className={styles['posts-list']}>
      {posts.map(({ id, title, body }) => (
        <li className={styles['posts-item']} key={id}>
          <h3 className={styles['posts-title']}>{title}</h3>
          <p className={styles['posts-body']}>{body}</p>
        </li>
      ))}
    </ul>
  );
}

export default PostsPreviewList;
