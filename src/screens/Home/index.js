import React from 'react';
import {View} from 'react-native';
import styles from './styles';

import {HomeSvg, SettingsSvg, HeartSvg} from 'src/utils/svgIcons';

import {Text} from 'src/utils/Text';

export default props => {
  return (
    <View style={styles.container}>
      <Text>teste</Text>
      <HeartSvg height={50} width={50} fill="black" />
      <SettingsSvg height={50} width={50} fill="black" />
      <HomeSvg height={50} width={50} fill="black" />
    </View>
  );
};
