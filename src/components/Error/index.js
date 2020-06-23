import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'src/utils/Text';
import styles from './styles';

export default ({handlePress}) => (
  <View style={styles.container}>
    <Text style={styles.textError}>Nothing found</Text>
    <TouchableOpacity style={styles.btnError} onPress={handlePress}>
      <Text style={styles.textBtn}>Try again</Text>
    </TouchableOpacity>
  </View>
);
