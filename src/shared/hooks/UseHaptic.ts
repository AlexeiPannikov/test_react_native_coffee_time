import { HapticOptions, trigger } from 'react-native-haptic-feedback';

const hapticOptions: HapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const useHaptic = () => {
  const softTrigger = () => {
    trigger('soft', hapticOptions);
  };

  const selectionTrigger = () => {
    trigger('selection', hapticOptions);
  };

  const errorTrigger = () => {
    trigger('notificationError', hapticOptions);
  };

  return {
    softTrigger,
    errorTrigger,
    selectionTrigger,
  };
};
