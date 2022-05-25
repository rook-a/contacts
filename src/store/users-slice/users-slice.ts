import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute, FetchStatus, NameSpace } from '../../utils/const';
import { AppDispatch, State } from '../../types/state';
import { User } from '../../types/users';

interface InitialState {
  users: User[];
  usersStatus: FetchStatus;
}

const initialState: InitialState = {
  users: [],
  usersStatus: FetchStatus.Idle,
};

export const fetchUsers = createAsyncThunk<
  User[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchUsers', async (_args, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<User[]>(APIRoute.Users);
    return data;
  } catch (error) {
    throw error;
  }
});

export const usersSlice = createSlice({
  name: NameSpace.Users,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.usersStatus = FetchStatus.Pending;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.usersStatus = FetchStatus.Fulfilled;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.usersStatus = FetchStatus.Rejected;
      });
  },
});

const selectUsersState = (state: State) => state[NameSpace.Users];

export const selectUsers = (state: State) => selectUsersState(state).users;
