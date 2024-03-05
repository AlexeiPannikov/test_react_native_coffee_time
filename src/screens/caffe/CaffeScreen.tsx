import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, useTheme } from '@/shared';
import { CafeImageWithTitle, useLazyGetCafeQuery, useLazyGetProductsCafeQuery } from '@/entities';
import { FilterProductsByFavoritesSwitch } from '@/features';
import { ProductListWidget } from '@/widgets';

type Props = NativeStackScreenProps<RootStackParamList, 'Caffe'>;

export const CaffeScreen = (props: Props) => {
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
            triggerCafe({ cafeId: props.route.params.id });
            triggerProduct({ cafeId: props.route.params.id });
          }}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
    >
      <CafeImageWithTitle cafeId={props.route.params.id}>
        <FilterProductsByFavoritesSwitch />
      </CafeImageWithTitle>
      <ProductListWidget {...props} cafeId={props.route.params.id} />
    </ScrollView>
  );
};
