import { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { sendNewComment } from '../../store/comments-slice/comments-slice';
import { selectUserPost } from '../../store/posts-slice/posts-slice';

import styles from './modal-send-comment.module.css';

interface ModalSendCommentProps {
  onCloseClick: () => void;
}

function ModalSendComment({ onCloseClick }: ModalSendCommentProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectUserPost);

  if (!post) {
    return null;
  }

  const handleCloseClick = () => {
    onCloseClick();
    document.body.style.overflow = 'auto';
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data = {
      postId: post.id,
      name: '',
      email: '',
      body: '',
    };

    dispatch(sendNewComment(data));
  };

  return (
    <form className={styles['form']} action="#" method="POST" onSubmit={handleSubmit}>
      <label className={styles['form-label']} htmlFor="name">
        Name
      </label>
      <input className={styles['form-input']} id="name" name="name" type="text" autoComplete="off" required />

      <label className={styles['form-label']} htmlFor="email">
        Email
      </label>
      <input className={styles['form-input']} id="email" name="email" type="email" autoComplete="off" required />

      <label className={styles['form-label']} htmlFor="comment">
        Comment
      </label>
      <textarea
        className={`${styles['form-input']} ${styles['form-textarea']}`}
        id="comment"
        name="comment"
        rows={5}
        autoComplete="off"
        required
      />

      <button className={`button ${styles['form-button']}`}>Send</button>
      <button onClick={handleCloseClick} className={styles['close-button']} aria-label="Close" />
    </form>
  );
}

export default ModalSendComment;
