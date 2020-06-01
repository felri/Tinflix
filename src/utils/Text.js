import React from 'react';
import {Text as TextReactNative} from 'react-native';

export const Text = ({children, style, fontWeight, numberOfLines}) => (
  <TextReactNative
    numberOfLines={numberOfLines}
    style={[
      {
        letterSpacing: 0.8,
        fontFamily: 'bebasneue_regular',
      },
      style,
    ]}>
    {children}
  </TextReactNative>
);
