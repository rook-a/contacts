import { Post } from '../../types/post';
import PostsPreviewItem from '../posts-preview-item/posts-preview-item';

import styles from './posts-preview-list.module.css';

interface PostsPreviewListProps {
  posts: Post[];
}

function PostsPreviewList({ posts }: PostsPreviewListProps): JSX.Element {
  return (
    <ul className={styles['posts-list']}>
      {posts.map(({ id, title, body }) => (
        <PostsPreviewItem postId={id} title={title} body={body} key={id} />
      ))}
    </ul>
  );
}

export default PostsPreviewList;
