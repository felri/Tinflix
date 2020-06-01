import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Theme from 'src/utils/Theme';
export default StyleSheet.create({
  details: {
    color: Theme.colors.textColor,
    fontSize: RFValue(15),
    marginBottom: 5,
  },
  line: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: Theme.colors.textColor,
    marginTop: 5,
    marginBottom: 5,
    height: 1,
    opacity: 0.4,
  },
  imdbrating: {
    color: Theme.colors.textColor,
    fontSize: RFValue(30),
    marginLeft: 5,
  },
  containerScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {},
  name: {
    color: Theme.colors.textColor,
    fontSize: RFValue(32),
  },
  containerInsideScroll: {
    justifyContent: 'space-between',
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 120,
  },
  containerImage: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  plot: {
    fontFamily: 'normal',
    letterSpacing: 0,
    color: Theme.colors.textColor,
    fontSize: RFValue(15),
  },
});
