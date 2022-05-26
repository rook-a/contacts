import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../utils/const';
import { postsSlice } from './posts-slice/posts-slice';
import { usersSlice } from './users-slice/users-slice';

export const rootReducer = combineReducers({
  [NameSpace.Users]: usersSlice.reducer,
  [NameSpace.Posts]: postsSlice.reducer,
});
