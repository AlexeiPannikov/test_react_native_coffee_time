import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import {
  NoData,
  SearchIcon,
  staticModerateScale,
  TelegramIcon,
  UiButton,
  UiText,
  useTheme,
} from '@/shared';
import YaMap, { Marker } from 'react-native-yamap';
import Animated from 'react-native-reanimated';
import { useCafeMap } from '@widgets/cafe-map/model/UseCafeMap.ts';

interface Props {
  onGoToCafePage: (id: string) => void;
}

export const CafeMapWidget = (props: Props) => {
  const {
    data,
    mapRef,
    bottomSheetRef,
    selectedCafe,
    isLoading,
    isOpenedBottomSheet,
    routeInfo,
    pickCafe,
    animatedOffset,
    goToMyPosition,
    onChangeBottomSheet,
  } = useCafeMap();
  const {
    theme: { colors, font },
  } = useTheme();

  const goToCafeScreen = () => {
    if (selectedCafe) {
      props.onGoToCafePage(selectedCafe?.id);
    }
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : data?.length ? (
    <>
      <View style={{ flex: 1 }}>
        <YaMap
          ref={mapRef}
          showUserPosition={true}
          initialRegion={{
            lat: 46.83741607518258,
            lon: 29.66270076950434,
            zoom: 11,
          }}
          style={{ flex: 1 }}
        >
          {data?.map((cafe) => (
            <Marker
              key={cafe.id}
              point={{ lat: cafe.lat, lon: cafe.lon }}
              zIndex={6}
              scale={2}
              onPress={() => {
                pickCafe(cafe);
              }}
            >
              <View style={styles.cafePointBig}>
                <View style={styles.cafePointMedium}>
                  <View style={styles.cafePointSmall}>
                    <Text></Text>
                  </View>
                </View>
              </View>
            </Marker>
          ))}
        </YaMap>
      </View>
      <View style={{ flex: 0 }}>
        <Animated.View style={[styles.buttonsContainer, animatedOffset]}>
          <View>
            {isOpenedBottomSheet && (
              <UiButton type="icon" style={styles.leftButton} onPress={() => goToCafeScreen()}>
                <TelegramIcon width={staticModerateScale(25)} height={staticModerateScale(25)} />
              </UiButton>
            )}
          </View>
          <UiButton type="icon" style={styles.rightButton} onPress={() => goToMyPosition()}>
            <SearchIcon width={staticModerateScale(25)} height={staticModerateScale(25)} />
          </UiButton>
        </Animated.View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 100]}
        style={[styles.contentContainer, { backgroundColor: colors.background }]}
        onChange={(index) => onChangeBottomSheet(index)}
      >
        <BottomSheetView>
          <View
            style={{
              borderBottomColor: colors.outlineVariant,
              borderBottomWidth: 1,
              paddingBottom: 5,
              marginBottom: 5,
            }}
          >
            <UiText
              type="headline3"
              style={{
                color: colors.onBackgroundVariant2,
                fontFamily: font.families['Lobster-Regular'],
              }}
            >
              {selectedCafe?.name}
            </UiText>
          </View>
          {!!routeInfo && (
            <UiText type="body1">
              {routeInfo?.distance} м = {routeInfo?.time}
            </UiText>
          )}
        </BottomSheetView>
      </BottomSheet>
    </>
  ) : (
    <NoData style={{ marginTop: 65 }}>По вашему запросу ничего не найдено</NoData>
  );
};

const styles = StyleSheet.create({
  cafePointBig: {
    width: 30,
    height: 30,
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'rgba(200, 217, 175, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cafePointMedium: {
    width: 18,
    height: 18,
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'rgba(200, 217, 175, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cafePointSmall: {
    width: 8,
    height: 8,
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#717171',
  },
  contentContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 50,
    paddingHorizontal: 30,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '100%',
  },
  rightButton: {
    zIndex: 30,
  },
  leftButton: {
    zIndex: 30,
  },
});
