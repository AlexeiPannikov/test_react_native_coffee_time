import React, { useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, staticVerticalScale, UiText } from '@/shared';
import PagerView from 'react-native-pager-view';
import { View, StyleSheet } from 'react-native';
import { PagesSwitcher } from '@screens/main/PagesSwitcher.tsx';
import { CafeListWidget } from '@/widgets';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export const MainScreen = (props: Props) => {
  const [page, setPage] = useState<0 | 1>(1);
  const pager = useRef<PagerView>(null);
  const changePage = (value: 0 | 1) => {
    setPage(value);
    pager.current?.setPage(value);
  };

  return (
    <>
      <View style={styles.switcherContainer}>
        <PagesSwitcher value={page} onPress={(value) => changePage(value)} />
      </View>
      <PagerView ref={pager} style={styles.pagerView} initialPage={page} onPageSelected={(event) => event.}>
        <View key="1">
          <UiText>Map</UiText>
        </View>
        <View key="2">
          <CafeListWidget />
        </View>
      </PagerView>
    </>
  );
};

const styles = StyleSheet.create({
  switcherContainer: {
    paddingVertical: staticVerticalScale(15),
    alignItems: 'center',
  },
  pagerView: {
    flex: 1,
  },
});
