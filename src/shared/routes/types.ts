import type { ParamListBase } from '@react-navigation/native';

export interface RootStackParamList extends ParamListBase {
  Auth: undefined;
  Main: undefined;
}

export interface AuthStackParamList extends ParamListBase {
  SignIn: undefined;
  SignUp: undefined;
}
