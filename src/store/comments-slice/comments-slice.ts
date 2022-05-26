import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute, FetchStatus, NameSpace } from '../../utils/const';
import { AppDispatch, State } from '../../types/state';
import { Comment, NewComment } from '../../types/comment';

interface InitialState {
  comments: Comment[];
  commentsStatus: FetchStatus;

  sendNewCommentStatus: FetchStatus;
}

const initialState: InitialState = {
  comments: [],
  commentsStatus: FetchStatus.Idle,

  sendNewCommentStatus: FetchStatus.Idle,
};

export const fetchComments = createAsyncThunk<
  Comment[],
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async (postId: number, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Comment[]>(`${APIRoute.Posts}/${postId}${APIRoute.Comments}`);
    return data;
  } catch (error) {
    throw error;
  }
});

export const sendNewComment = createAsyncThunk<
  NewComment,
  NewComment,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/sendNewComment', async ({ postId, name, email, body }: NewComment, { dispatch, extra: api }) => {
  try {
    const { data } = await api.post<NewComment>(`${APIRoute.Posts}/${postId}${APIRoute.Comments}`, {
      postId,
      name,
      email,
      body,
    });
    return data;
  } catch (error) {
    throw error;
  }
});

export const commentsSlice = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.commentsStatus = FetchStatus.Pending;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.commentsStatus = FetchStatus.Fulfilled;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.commentsStatus = FetchStatus.Rejected;
      })
      .addCase(sendNewComment.pending, (state) => {
        state.sendNewCommentStatus = FetchStatus.Pending;
      })
      .addCase(sendNewComment.fulfilled, (state) => {
        state.sendNewCommentStatus = FetchStatus.Fulfilled;
      })
      .addCase(sendNewComment.rejected, (state) => {
        state.sendNewCommentStatus = FetchStatus.Rejected;
      });
  },
});

const selectCommentsState = (state: State) => state[NameSpace.Comments];

export const selectComments = (state: State) => selectCommentsState(state).comments;
