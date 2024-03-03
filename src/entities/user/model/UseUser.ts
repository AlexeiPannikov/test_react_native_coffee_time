import { useAppDispatch, useAppSelector } from '@/shared';
import { removeUserAction, setUserAction, User } from '@/entities';

export const useUser = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const setUser = (user: User) => {
    dispatch(setUserAction(user));
  };

  const removeUser = () => {
    dispatch(removeUserAction());
  };

  return {
    user,
    setUser,
    removeUser,
  };
};
