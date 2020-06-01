import {StyleSheet} from 'react-native';
import Theme from 'src/utils/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNoFavorites: {
    fontSize: 25,
    color: Theme.colors.textColor,
  },
});
