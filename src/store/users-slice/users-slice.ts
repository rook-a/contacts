import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute, FetchStatus, NameSpace } from '../../utils/const';
import { AppDispatch, State } from '../../types/state';
import { User } from '../../types/user';

interface InitialState {
  users: User[];
  usersStatus: FetchStatus;

  user: User | null;
  userStatus: FetchStatus;
}

const initialState: InitialState = {
  users: [],
  usersStatus: FetchStatus.Idle,

  user: null,
  userStatus: FetchStatus.Idle,
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

export const fetchUser = createAsyncThunk<
  User,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchUser', async (id: number, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<User>(`${APIRoute.Users}/${id}`);
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
      .addCase(fetchUsers.pending, (state) => {
        state.usersStatus = FetchStatus.Pending;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.usersStatus = FetchStatus.Fulfilled;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.usersStatus = FetchStatus.Rejected;
      })
      .addCase(fetchUser.pending, (state) => {
        state.userStatus = FetchStatus.Pending;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.userStatus = FetchStatus.Fulfilled;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.userStatus = FetchStatus.Rejected;
      });
  },
});

const selectUsersState = (state: State) => state[NameSpace.Users];

export const selectUsers = (state: State) => selectUsersState(state).users;
export const selectUser = (state: State) => selectUsersState(state).user;
