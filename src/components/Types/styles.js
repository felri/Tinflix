import {StyleSheet} from 'react-native';
import Theme from 'src/utils/Theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginLeft: 20,
    marginRight: 20,
  },
  btn: {
    padding: 20,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  textBtn: {
    fontSize: 15,
  },
});
