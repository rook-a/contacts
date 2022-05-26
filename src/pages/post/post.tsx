import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../../components/comments/comments';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchComments } from '../../store/comments-slice/comments-slice';
import { fetchUserPost, selectUserPost } from '../../store/posts-slice/posts-slice';

import styles from './post.module.css';

function Post(): JSX.Element | null {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectUserPost);

  const currentPostId = Number(postId);

  useEffect(() => {
    dispatch(fetchUserPost(currentPostId));
    dispatch(fetchComments(currentPostId));
  }, [dispatch, currentPostId]);

  if (!post) {
    return null;
  }

  const { title, body } = post;

  return (
    <div className="container">
      <h1 className={styles['post-title']}>{title}</h1>
      <p className={styles['post-body']}>{body}</p>

      <h2 className="title">Comments</h2>

      <Comments />

      <button className={`button ${styles['post-button']}`}>Send comment</button>
    </div>
  );
}

export default Post;
