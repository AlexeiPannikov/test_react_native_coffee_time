import React, { ReactElement } from 'react';
import { View, StyleSheet, Image, useWindowDimensions, ScrollView } from 'react-native';
import { useGetProductQuery } from '@/entities';
import {
  CoffeeIcon,
  MilkIcon,
  PressureIcon,
  staticModerateScale,
  TemperatureIcon,
  UiButton,
  UiText,
  useTheme,
  WaterIcon,
} from '@/shared';

interface IProps {
  productId: string;
  titleSlot?: ReactElement;
}

const icons = {
  milk: MilkIcon,
  pressure: PressureIcon,
  water: WaterIcon,
  coffe: CoffeeIcon,
  temperature: TemperatureIcon,
};

export const ProductCard = ({ productId, titleSlot }: IProps) => {
  const { data } = useGetProductQuery({ productId });
  const { height, width } = useWindowDimensions();
  const {
    theme: { font, colors },
  } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={[styles.imageWrap, { height: height / 2.5 }]}>
          <Image style={styles.image} source={{ uri: data?.imagesPath }} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.titleWrap}>
            <UiText type="headline2" style={{ fontFamily: font.families['Lobster-Regular'] }}>
              {data?.cofeName}
            </UiText>
            {!!titleSlot && <View style={{ marginLeft: 10 }}>{titleSlot}</View>}
          </View>
          {!!data?.attribute.length && (
            <View style={styles.informIconsWrap}>
              {data?.attribute.map((attribute) => (
                <View key={attribute.id} style={styles.icon}>
                  <Image
                    source={icons[attribute.iconType as keyof typeof icons]}
                    style={{
                      width: staticModerateScale(35),
                      height: staticModerateScale(35),
                      marginBottom: 5,
                    }}
                  />
                  {/*<UiText type="body3">{attribute.description}</UiText>*/}
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <View
        style={[styles.bottomPanel, { borderTopColor: colors.outlineVariant, width: width - 40 }]}
      >
        <UiText type="headline2">{data?.price} ₽</UiText>
        <View>
          <UiButton>Заказать</UiButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  imageWrap: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 30,
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  informIconsWrap: {
    flexDirection: 'row',
    marginTop: 20,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  bottomPanel: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 0,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
});
