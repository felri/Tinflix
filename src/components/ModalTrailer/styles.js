import {StyleSheet} from 'react-native';
import Theme from 'src/utils/Theme';
import {RFValue} from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerModal: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Theme.colors.textColor,

    borderRadius: 50,
    borderWidth: 2,
  },
  closeText: {
    color: Theme.colors.textColor,
    fontSize: RFValue(30),
  },
});
