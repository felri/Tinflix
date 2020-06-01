import React from 'react';
import {View} from 'react-native';
import Theme from 'src/utils/Theme';

export const Container = ({children}) => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Theme.colors.secondary,
    }}>
    {children}
  </View>
);
