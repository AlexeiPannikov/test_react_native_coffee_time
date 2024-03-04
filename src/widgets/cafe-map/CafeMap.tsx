import React, { useRef, useState } from 'react';
import { Cafe, useGetCafeListQuery } from '@/entities';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView, useBottomSheet } from '@gorhom/bottom-sheet';
import {
  SearchIcon,
  staticModerateScale,
  TelegramIcon,
  UiButton,
  UiText,
  useTheme,
} from '@/shared';
import YaMap, { Marker, Animation, CameraPosition } from 'react-native-yamap';
import Geolocation from '@react-native-community/geolocation';
import { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

interface IPosition {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
}

interface Props {
  onGoToCafePage: (id: string) => void;
}

export const CafeMap = (props: Props) => {
  const { data, isLoading } = useGetCafeListQuery(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const map = useRef<YaMap>(null);
  const [selectedCafe, setCafe] = useState<Cafe | null>(null);
  const [isOpenedBottomSheet, setIsOpenedBottomSheet] = useState<boolean>(false);
  const [routeInfo, setRouteInfo] = useState<{ distance: number; time: number } | null>(null);
  const {
    theme: { colors, font },
  } = useTheme();

  const animatedOffset = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(isOpenedBottomSheet ? -75 : 0) }],
    };
  });

  const getCamera = (): Promise<CameraPosition> => {
    return new Promise((resolve, reject) => {
      if (map.current) {
        map.current.getCameraPosition((position) => {
          resolve(position);
        });
      } else {
        reject('ERROR');
      }
    });
  };

  const getMyPosition = (): Promise<IPosition> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (info: IPosition) => resolve(info),
        (e: any) => {
          reject(e);
        },
        {},
      );
    });
  };

  const goToMyPosition = async () => {
    try {
      const myPosition = await getMyPosition();
      const camera = await getCamera();
      map.current?.setCenter(
        { lon: myPosition.coords.longitude, lat: myPosition.coords.latitude },
        12,
        0,
        0,
        1,
        Animation.LINEAR,
      );
    } catch (e) {
      console.log(e);
    }
  };

  const goToCafeScreen = () => {
    if (selectedCafe) {
      props.onGoToCafePage(selectedCafe?.id);
    }
  };

  const findRoute = async ({ lon, lat }: { lon: number; lat: number }) => {
    const myPosition = await getMyPosition();
    map.current?.findPedestrianRoutes(
      [
        { lon: myPosition.coords.longitude, lat: myPosition.coords.latitude },
        { lat, lon },
      ],
      (event) => {
        const info = event['routes'][0]['sections'].map((item) => item.sectionInfo)[0];
        console.log(info);
        setRouteInfo({ time: info.time, distance: info.walkingDistance });
      },
    );
  };

  const pickCafe = async (cafe: Cafe) => {
    setCafe(cafe);
    await findRoute(cafe);
    bottomSheetRef.current?.expand();
  };

  const onChangeBottomSheet = (index: number) => {
    setIsOpenedBottomSheet(!!index);
  };

  return isLoading || !data ? (
    <ActivityIndicator />
  ) : (
    <>
      <View style={{ flex: 1 }}>
        <YaMap
          ref={map}
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
              onPress={() => pickCafe(cafe)}
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
              type="headline2"
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
              {routeInfo?.distance} м = {routeInfo?.time} минут
            </UiText>
          )}
        </BottomSheetView>
      </BottomSheet>
    </>
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
