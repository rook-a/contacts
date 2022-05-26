import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../../components/comments/comments';
import ModalContainer from '../../components/modal-container/modal-container';
import ModalSendComment from '../../components/modal-send-comment/modal-send-comment';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchComments } from '../../store/comments-slice/comments-slice';
import { fetchUserPost, selectUserPost } from '../../store/posts-slice/posts-slice';

import styles from './post.module.css';

function Post(): JSX.Element | null {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectUserPost);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const currentPostId = Number(postId);

  useEffect(() => {
    dispatch(fetchUserPost(currentPostId));
    dispatch(fetchComments(currentPostId));
  }, [dispatch, currentPostId]);

  if (!post) {
    return null;
  }

  const { title, body } = post;

  const handleClick = () => {
    document.body.style.overflow = 'hidden';
    setIsOpen(!isOpen);
  };

  return (
    <div className="container">
      <h1 className={styles['post-title']}>{title}</h1>
      <p className={styles['post-body']}>{body}</p>

      <h2 className="title">Comments</h2>

      <Comments />

      <button onClick={handleClick} className={`button ${styles['post-button']}`}>
        Send comment
      </button>

      {isOpen && (
        <ModalContainer children={<ModalSendComment onCloseClick={handleClick} />} onOverlayClick={handleClick} />
      )}
    </div>
  );
}

export default Post;
