import {Linking} from 'react-native';
import {NETFLIX_URL, IMDB_URL} from 'src/api/env';

export const handleNetflixPress = async ({id}) => {
  const url = `${NETFLIX_URL}${id}`;
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  }
};

export const handleImdbPress = async ({id}) => {
  const url = `${IMDB_URL}${id}`;
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  }
};
