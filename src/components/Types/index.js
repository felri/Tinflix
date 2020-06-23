import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'src/utils/Text';
import Theme from 'src/utils/Theme';
import styles from './styles';

export default ({handleTypeChange, type, filters}) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.btn}
      onPress={() => handleTypeChange({type: 'series', filters})}>
      <Text
        style={[
          styles.textBtn,
          {
            color:
              type === 'series' ? Theme.colors.red : Theme.colors.textColor,
          },
        ]}>
        Tv Shows
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.btn}
      onPress={() => handleTypeChange({type: 'movie', filters})}>
      <Text
        style={[
          styles.textBtn,
          {
            color: type === 'movie' ? Theme.colors.red : Theme.colors.textColor,
          },
        ]}>
        Movies
      </Text>
    </TouchableOpacity>
  </View>
);
