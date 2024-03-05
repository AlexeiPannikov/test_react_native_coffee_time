import React, { useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, staticVerticalScale } from '@/shared';
import PagerView from 'react-native-pager-view';
import { View, StyleSheet, NativeSyntheticEvent } from 'react-native';
import { PagesSwitcher } from '@screens/caffe-list/PagesSwitcher.tsx';
import { CafeListWidget, CafeMapWidget } from '@/widgets';

type Props = NativeStackScreenProps<RootStackParamList, 'CaffeList'>;

export const CaffeListScreen = (props: Props) => {
  const [page, setPage] = useState<0 | 1>(1);
  const pager = useRef<PagerView>(null);
  const changePage = (value: 0 | 1) => {
    setPage(value);
    pager.current?.setPage(value);
  };

  const onPageSelected = (data: NativeSyntheticEvent<Readonly<{ position: number }>>) => {
    setPage(data.nativeEvent.position as 0 | 1);
  };

  return (
    <>
      <View style={styles.switcherContainer}>
        <PagesSwitcher value={page} onPress={(value) => changePage(value)} />
      </View>
      <PagerView
        ref={pager}
        style={styles.pagerView}
        initialPage={page}
        scrollEnabled={false}
        onPageSelected={onPageSelected}
      >
        <View key="1">
          <CafeMapWidget onGoToCafePage={(id) => props.navigation.navigate('Caffe', { id })} />
        </View>
        <View style={{ marginTop: 65 }} key="2">
          <CafeListWidget {...props} />
        </View>
      </PagerView>
    </>
  );
};

const styles = StyleSheet.create({
  switcherContainer: {
    paddingVertical: staticVerticalScale(15),
    position: 'absolute',
    alignItems: 'center',
    zIndex: 20,
    width: '100%',
  },
  pagerView: {
    flex: 1,
  },
});
