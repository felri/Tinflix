import {StyleSheet} from 'react-native';
import Theme from 'src/utils/Theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 20,
    width: 30,
    marginRight: 20,
    position: 'absolute',
    top: 0,
  },
  btn: {
    padding: 15,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
