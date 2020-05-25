import React from 'react';
import {Text as TextReactNative} from 'react-native';

export const Text = ({children, style, fontWeight}) => (
  <TextReactNative
    style={[
      style,
      // {
      //   fontFamily:
      //     fontWeight === "thin"
      //       ? "Montserrat-Light"
      //       : fontWeight === "bold"
      //       ? "Montserrat-Bold"
      //       : "Montserrat-Regular",
      // },
    ]}>
    {children}
  </TextReactNative>
);
