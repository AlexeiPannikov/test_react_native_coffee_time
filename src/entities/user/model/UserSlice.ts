import { User } from '@entities/user/model/User.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAction: (state, payload: PayloadAction<User>) => {
      state.user = payload.payload;
    },
    removeUserAction: (state) => {
      state.user = null;
    },
  },
});

export const { setUserAction, removeUserAction } = userSlice.actions;

export default userSlice.reducer;
