import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.log(action.error);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2:
        'data' in action.error
          ? (action.error.data as { message: string }).message
          : action.error.message,
    });
  }

  return next(action);
};
