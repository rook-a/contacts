import { createAsyncThunk, createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute, FetchStatus, MAX_COUNT_POSTS, NameSpace } from '../../utils/const';
import { AppDispatch, State } from '../../types/state';
import { Post } from '../../types/post';

interface InitialState {
  posts: Post[];
  postsStatus: FetchStatus;

  post: Post | null;
  postStatus: FetchStatus;
}

const initialState: InitialState = {
  posts: [],
  postsStatus: FetchStatus.Idle,

  post: null,
  postStatus: FetchStatus.Idle,
};

export const fetchUserPosts = createAsyncThunk<
  Post[],
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchUserPosts', async (id: number, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Post[]>(`${APIRoute.Users}/${id}${APIRoute.Posts}`);
    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchUserPost = createAsyncThunk<
  Post,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchUserPost', async (postId: number, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Post>(`${APIRoute.Posts}/${postId}`);
    return data;
  } catch (error) {
    throw error;
  }
});

export const postsSlice = createSlice({
  name: NameSpace.Posts,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.postsStatus = FetchStatus.Pending;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.postsStatus = FetchStatus.Fulfilled;
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.postsStatus = FetchStatus.Rejected;
      })
      .addCase(fetchUserPost.pending, (state) => {
        state.postStatus = FetchStatus.Pending;
      })
      .addCase(fetchUserPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.post = action.payload;
        state.postStatus = FetchStatus.Fulfilled;
      })
      .addCase(fetchUserPost.rejected, (state) => {
        state.postStatus = FetchStatus.Rejected;
      });
  },
});

const selectUserPostsState = (state: State) => state[NameSpace.Posts];

export const selectUserPosts = (state: State) => selectUserPostsState(state).posts;
export const selectUserPost = (state: State) => selectUserPostsState(state).post;

export const selectCurrentPosts = createSelector(selectUserPosts, (posts) => {
  return posts.slice(0, MAX_COUNT_POSTS);
});
