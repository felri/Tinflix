import {StyleSheet} from 'react-native';
import Theme from 'src/utils/Theme';
import {RFValue} from 'react-native-responsive-fontsize';

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
  containerOptions: {
    flex: 1,
    width: '100%',
  },
  picker: {
    height: 50,
    width: '100%',
    color: Theme.colors.textColor,
    borderBottomColor: Theme.colors.textColor,
    borderBottomWidth: 1,
  },
  textGenre: {
    color: Theme.colors.textColor,
  },
  containerPicker: {
    marginBottom: 20,
    borderBottomColor: Theme.colors.textColor,
    borderBottomWidth: 1,
  },
  textFromTo: {
    color: Theme.colors.textColor,
    fontSize: RFValue(18),
  },
  containerFromTo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btns: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnAction: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  textBtn: {
    color: Theme.colors.textColor,
  },
  marker: {
    backgroundColor: Theme.colors.red,
    height: 30,
    width: 30,
    borderRadius: 50,
  },
});
