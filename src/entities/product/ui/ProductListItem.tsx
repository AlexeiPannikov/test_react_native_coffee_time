import React, { ReactElement } from 'react';
import { CafeProduct } from '@entities/product/model/CafeProduct.ts';
import { Image, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { staticModerateScale, UiText, useTheme } from '@/shared';

interface IProps {
  product: CafeProduct;
  bottomRightSlot?: ReactElement;
  onPress: () => void;
}

export const ProductListItem = ({ product, bottomRightSlot, onPress }: IProps) => {
  const {
    theme: { colors, font },
  } = useTheme();
  const { width } = useWindowDimensions();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.background, width: width / 2 - 20 }]}
      onPress={onPress}
    >
      <UiText
        type="headline5"
        style={[styles.title, { fontFamily: font.families['SF-UI-Text-Bold'], fontWeight: '700' }]}
      >
        {product.name}
      </UiText>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.imagesPath }} style={styles.image} />
      </View>
      <View style={styles.bottomPanel}>
        <View>
          <UiText
            style={{
              color: colors.primary,
              fontFamily: font.families['Lobster-Regular'],
              fontSize: staticModerateScale(24),
            }}
          >
            {product.price} ₽
          </UiText>
        </View>
        <View>{bottomRightSlot}</View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: { marginBottom: 20 },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  bottomPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
