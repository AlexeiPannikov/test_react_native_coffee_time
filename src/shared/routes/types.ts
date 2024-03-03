import type { ParamListBase } from '@react-navigation/native';

export interface RootStackParamList extends ParamListBase {
  Auth: undefined;
  CaffeList: undefined;
  Caffe: { id: string };
}

export interface AuthStackParamList extends ParamListBase {
  Choose: undefined;
  SignIn: undefined;
  SignUp: undefined;
}
