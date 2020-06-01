import {StyleSheet} from 'react-native';
import Theme from 'src/utils/Theme';

export default StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    color: Theme.colors.textColor,
    fontSize: 20,
  },
  containerText: {
    height: 60,
    width: '100%',
    backgroundColor: Theme.colors.red,
    alignItems: 'flex-start',
    borderBottomWidth: 3,
    borderBottomColor: Theme.colors.navigation,
    justifyContent: 'center',
    paddingLeft: 20,
  },
});
