import type { ParamListBase } from '@react-navigation/native';

export interface RootStackParamList extends ParamListBase {
  Choose: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Main: undefined;
}

export interface DrawerParamList extends ParamListBase {
  Home: undefined;
  Favorites: undefined;
}

export interface MainStackParamList extends ParamListBase {
  CaffeList: undefined;
  Caffe: { id: string };
  Product: { id: string };
}

export interface FavoritesStackParamList extends ParamListBase {
  FavoriteList: undefined;
  Product: { id: string };
}
