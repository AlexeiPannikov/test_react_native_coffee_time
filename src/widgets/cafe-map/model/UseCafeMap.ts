import { Cafe, useGetCafeListQuery } from '@/entities';
import { useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import YaMap, {
  Animation,
  CameraPosition,
  MasstransitInfo,
  RoutesFoundEvent,
} from 'react-native-yamap';
import { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Geolocation from '@react-native-community/geolocation';
import { useHaptic } from '@/shared';

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

export const useCafeMap = () => {
  const { data, isLoading } = useGetCafeListQuery(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<YaMap>(null);
  const [selectedCafe, setCafe] = useState<Cafe | null>(null);
  const [isOpenedBottomSheet, setIsOpenedBottomSheet] = useState<boolean>(false);
  const [routeInfo, setRouteInfo] = useState<{ distance: number; time: string } | null>(null);
  const { selectionTrigger } = useHaptic();

  const animatedOffset = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(isOpenedBottomSheet ? -75 : 0) }],
    };
  });

  const getCamera = (): Promise<CameraPosition> => {
    return new Promise((resolve, reject) => {
      if (mapRef.current) {
        mapRef.current.getCameraPosition((position) => {
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
        (e: unknown) => {
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
      mapRef.current?.setCenter(
        { lon: myPosition.coords.longitude, lat: myPosition.coords.latitude },
        camera.zoom,
        0,
        0,
        1,
        Animation.LINEAR,
      );
    } catch (e) {
      console.log(e);
    }
  };

  const findRoute = async ({ lon, lat }: { lon: number; lat: number }) => {
    const myPosition = await getMyPosition();
    mapRef.current?.findPedestrianRoutes(
      [
        { lon: myPosition.coords.longitude, lat: myPosition.coords.latitude },
        { lat, lon },
      ],
      (event: unknown) => {
        const info = (event as RoutesFoundEvent<MasstransitInfo>['nativeEvent'])['routes'][0][
          'sections'
        ].map((item) => item.sectionInfo)[0];
        console.log('info', info);
        setRouteInfo({ time: info.time, distance: info.walkingDistance });
      },
    );
  };

  const pickCafe = async (cafe: Cafe) => {
    setCafe(cafe);
    setRouteInfo(null);
    selectionTrigger();
    await findRoute(cafe);
    bottomSheetRef.current?.expand();
  };

  const onChangeBottomSheet = (index: number) => {
    setIsOpenedBottomSheet(!!index);
  };

  return {
    data,
    isLoading,
    isOpenedBottomSheet,
    mapRef,
    bottomSheetRef,
    selectedCafe,
    routeInfo,
    pickCafe,
    animatedOffset,
    goToMyPosition,
    onChangeBottomSheet,
  };
};
