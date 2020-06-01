import {StyleSheet} from 'react-native';
import Theme from 'src/utils/Theme';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textError: {
    marginBottom: 20,
    fontSize: 20,
    color: Theme.colors.textColor,
  },
  btnError: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.red,
    borderRadius: 10,
  },
  textBtn: {
    color: 'white',
    fontSize: 15,
  },
});
