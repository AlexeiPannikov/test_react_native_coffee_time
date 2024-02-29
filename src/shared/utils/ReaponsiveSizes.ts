import { Dimensions, type ScaledSize, useWindowDimensions } from 'react-native';
const dimensions = Dimensions.get('window');

const FACTOR = 0.5;

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const getScale = (size: number, dimensions: ScaledSize) =>
  (dimensions.width / guidelineBaseWidth) * size;
const getVerticalScale = (size: number, dimensions: ScaledSize) =>
  (dimensions.height / guidelineBaseHeight) * size;
const getModerateScale = (size: number, dimensions: ScaledSize, factor = FACTOR) =>
  size + (getScale(size, dimensions) - size) * factor;

const useResponsiveSizes = () => {
  const dimensions = useWindowDimensions();
  return {
    scale: (size: number) => getScale(size, dimensions),
    verticalScale: (size: number) => getVerticalScale(size, dimensions),
    moderateScale: (size: number, factor = FACTOR) => getModerateScale(size, dimensions, factor),
  };
};

const staticScale = (scale: number) => getScale(scale, dimensions);
const staticVerticalScale = (scale: number) => getVerticalScale(scale, dimensions);
const staticModerateScale = (scale: number, factor = FACTOR) =>
  getModerateScale(scale, dimensions, factor);

export {
  staticScale,
  staticVerticalScale,
  staticModerateScale,
  useResponsiveSizes,
  guidelineBaseHeight,
};
