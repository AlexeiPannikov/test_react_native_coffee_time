import { EventArg, ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { DrawerScreenProps } from '@react-navigation/drawer';

type ArgType = StackScreenProps<ParamListBase> | DrawerScreenProps<ParamListBase>;

export const onRouteFocus = <K extends { [p: string | number]: unknown }>(
  e: EventArg<'focus', boolean, unknown>,
  arg: ArgType,
  targets: Array<keyof K>,
) => {
  const isIncludesName = () => {
    const routes = arg.navigation?.getState().routeNames;
    if (routes) {
      const targetName = e.target?.split('-')[0];
      return !!targetName && targets.includes(targetName);
    }
  };
  if (isIncludesName()) {
    arg.navigation?.setOptions({ headerShown: true });
  } else {
    arg.navigation?.setOptions({ headerShown: false });
  }
};
