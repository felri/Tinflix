import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import Theme from 'src/utils/Theme';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 15,
  },
  text: {
    color: Theme.colors.textColor,
    fontSize: RFValue(30),
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
    flex: 1,
  },
});
