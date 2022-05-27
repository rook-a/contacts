import { useCallback, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  resetSendCommentStatus,
  selectSendNewCommentStatus,
  sendNewComment,
} from '../../store/comments-slice/comments-slice';
import { selectUserPost } from '../../store/posts-slice/posts-slice';

import { FetchStatus } from '../../utils/const';
import styles from './modal-send-comment.module.css';

const REG_EXP_EMAIL = /^\S+@[aA-zZ]{2,10}\.[aA-zZ]{2,3}$/;

interface ModalSendCommentProps {
  onCloseClick: () => void;
}

interface FormData {
  name: string;
  email: string;
  comment: string;
}

const schema = yup.object().shape({
  name: yup.string().required('The field cannot be empty'),
  email: yup.string().email().matches(REG_EXP_EMAIL, 'Email entered incorrectly').required(),
  comment: yup.string().required('The field cannot be empty'),
});

function ModalSendComment({ onCloseClick }: ModalSendCommentProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectUserPost);
  const sendNewCommentStatus = useAppSelector(selectSendNewCommentStatus);
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;
  const isFulfilled = sendNewCommentStatus === FetchStatus.Fulfilled;
  const isRejected = sendNewCommentStatus === FetchStatus.Rejected;
  const handleCloseClick = useCallback(() => {
    onCloseClick();
    document.body.style.overflow = 'auto';
  }, [onCloseClick]);

  useEffect(() => {
    if (isFulfilled) {
      toast.success('New comment send!');
      dispatch(resetSendCommentStatus(FetchStatus.Idle));
      handleCloseClick();
    }
  }, [dispatch, handleCloseClick, isFulfilled]);

  if (!post) {
    return null;
  }

  if (isRejected) {
    toast.error('Something wrong');
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData = {
      postId: post.id,
      name: data.name,
      email: data.email,
      body: data.comment,
    };

    dispatch(sendNewComment(formData));
  };

  return (
    <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles['form-label']} htmlFor="name">
        Name
      </label>
      <input
        {...register('name', { required: true })}
        className={cn(styles['form-input'], { [styles['form-input__error']]: errors?.name })}
        id="name"
        name="name"
        type="text"
        autoComplete="off"
      />
      {errors?.name && <p className={styles['form-error__message']}>{errors?.name?.message}</p>}

      <label className={styles['form-label']} htmlFor="email">
        Email
      </label>
      <input
        {...register('email', { required: true })}
        className={cn(styles['form-input'], { [styles['form-input__error']]: errors?.email })}
        id="email"
        name="email"
        type="email"
        autoComplete="off"
      />
      {errors?.email && <p className={styles['form-error__message']}>{errors?.email?.message}</p>}

      <label className={styles['form-label']} htmlFor="comment">
        Comment
      </label>
      <textarea
        {...register('comment', { required: true })}
        className={cn(styles['form-input'], styles['form-textarea'], {
          [styles['form-input__error']]: errors?.comment,
          [styles['form-textarea--error']]: errors?.comment,
        })}
        id="comment"
        name="comment"
        rows={5}
        autoComplete="off"
      />
      {errors?.comment && (
        <p
          className={cn(styles['form-error__message'], { [styles['form-error__message--textarea']]: errors?.comment })}>
          {errors?.comment?.message}
        </p>
      )}

      <button type="submit" className={`button ${styles['form-button']}`}>
        Send
      </button>
      <button onClick={handleCloseClick} className={styles['close-button']} aria-label="Close modal" />
    </form>
  );
}

export default ModalSendComment;
