import {StyleSheet} from 'react-native';
import Theme from 'src/utils/Theme';
import {RFValue} from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  image: {
    width: 200,
    height: '100%',
    borderRadius: 8,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Theme.colors.navigation,
    overflow: 'hidden',
  },
  details: {
    color: Theme.colors.textColor,
    fontSize: RFValue(15),
  },
  language: {
    marginLeft: 5,
    color: Theme.colors.red,
    fontSize: RFValue(15),
  },
  containerType: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  line: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: Theme.colors.textColor,
    marginTop: 5,
    marginBottom: 5,
    opacity: 0.4,
  },
  type: {
    color: Theme.colors.red,
    fontSize: RFValue(26),
  },
  year: {
    marginLeft: 6,
    color: Theme.colors.textColor,
    fontSize: RFValue(26),
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  imdbrating: {
    color: Theme.colors.textColor,
    fontSize: RFValue(30),
    marginLeft: 5,
  },
  containerImage: {
    marginTop: 10,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: Theme.colors.textColor,
    fontSize: RFValue(30),
  },
  like: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: '#6ee3b4',
  },
  likeLabel: {
    fontSize: RFValue(32),
    color: '#6ee3b4',
    fontWeight: 'bold',
  },
  nope: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: '#ec5288',
  },
  nopeLabel: {
    fontSize: RFValue(32),
    color: '#ec5288',
    fontWeight: 'bold',
  },
  containerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plot: {
    fontFamily: 'normal',
    letterSpacing: 0,
    color: Theme.colors.textColor,
    fontSize: RFValue(15),
  },
  containerTrailer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    borderRadius: 5,
  },
  textTrailer: {
    marginRight: 5,
    fontSize: RFValue(15),
    color: Theme.colors.textColor,
  },
});
