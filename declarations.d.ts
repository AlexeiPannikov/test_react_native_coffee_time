declare module '*.png' {
  import { ImageSourcePropType } from 'react-native';
  const type: ImageSourcePropType;
  export default type;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
