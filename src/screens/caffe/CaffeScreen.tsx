import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, UiText } from '@/shared';

type Props = NativeStackScreenProps<RootStackParamList, 'Caffe'>;

export const CaffeScreen = ({ route: { params } }: Props) => {
  return (
    <View>
      <UiText>{params.id}</UiText>
    </View>
  );
};
