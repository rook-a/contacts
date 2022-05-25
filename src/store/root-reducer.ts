import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../utils/const';
import { usersSlice } from './users-slice/users-slice';

export const rootReducer = combineReducers({
  [NameSpace.Users]: usersSlice.reducer,
});
