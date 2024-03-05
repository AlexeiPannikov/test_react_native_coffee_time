import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, useTheme } from '@/shared';
import { CafeImageWithTitle, useLazyGetCafeQuery, useLazyGetProductsCafeQuery } from '@/entities';
import { FilterProductsByFavoritesSwitch } from '@/features';
import { ProductList } from '@/widgets';

type Props = NativeStackScreenProps<RootStackParamList, 'Caffe'>;

export const CaffeScreen = ({ route: { params } }: Props) => {
  const [triggerCafe, dataCafe] = useLazyGetCafeQuery();
  const [triggerProduct, dataProduct] = useLazyGetProductsCafeQuery();
  const {
    theme: { colors },
  } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={dataCafe.isLoading || dataProduct.isLoading}
          onRefresh={() => {
            triggerCafe({ cafeId: params.id });
            triggerProduct({ cafeId: params.id });
          }}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
    >
      <CafeImageWithTitle cafeId={params.id}>
        <FilterProductsByFavoritesSwitch />
      </CafeImageWithTitle>
      <ProductList cafeId={params.id} />
    </ScrollView>
  );
};
