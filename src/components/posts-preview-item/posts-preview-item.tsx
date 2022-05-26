import { generatePath, Link, useParams } from 'react-router-dom';
import styles from './posts-preview-item.module.css';

interface PostsPreviewItemProps {
  postId: number;
  title: string;
  body: string;
}

function PostsPreviewItem({ postId, title, body }: PostsPreviewItemProps): JSX.Element {
  const { id } = useParams();
  const link = generatePath('/user/:id/posts/:postId', { id, postId: `${postId}` });

  return (
    <li className={styles['posts-item']}>
      <h3 className={styles['posts-title']}>{title}</h3>
      <p className={styles['posts-body']}>{body}</p>
      <Link className={`button ${styles['posts-link']}`} to={link} />
    </li>
  );
}

export default PostsPreviewItem;
