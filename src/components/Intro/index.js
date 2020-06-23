import * as React from 'react';
import {View, Image, Dimensions} from 'react-native';
import AppIntro from 'rn-falcon-app-intro';
import Theme from 'src/utils/Theme';
import {Text} from 'src/utils/Text';
import styles from './styles';

import btnFavorites from 'src/assets/guide/btnFavorites.png';
import btnFilters from 'src/assets/guide/btnFilters.png';
import btnImdb from 'src/assets/guide/btnImdb.png';
import btnInfo from 'src/assets/guide/btnInfo.png';
import btnWatchNetflix from 'src/assets/guide/btnWatchNetflix.png';
import swipeLeft from 'src/assets/guide/swipeLeft.png';
import swipeRight from 'src/assets/guide/swipeRight.png';

const ARRAY_INTRO = [
  {
    image: swipeRight,
    text: 'Swipe right to save',
  },
  {
    image: swipeLeft,
    text: 'Swipe left to see next',
  },
  {
    image: btnWatchNetflix,
    text: 'Watch on Netflix',
  },
  {
    image: btnInfo,
    text: 'See more info',
  },
  {
    image: btnFilters,
    text: 'Filter',
  },
  {
    image: btnImdb,
    text: 'Open imdb',
  },
  {
    image: btnFavorites,
    text: 'See your likes',
  },
];

export default ({handlePress}) => (
  <AppIntro
    dotColor={Theme.colors.textColor}
    activeDotColor={Theme.colors.red}
    onDoneBtnClick={handlePress}
    onSkipBtnClick={handlePress}>
    {ARRAY_INTRO.map((item, index) => (
      <View
        style={[styles.slide, {backgroundColor: Theme.colors.primary}]}
        key={index}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={{
            height: Dimensions.get('window').width * 2,
            flex: 4,
          }}
        />
        <View level={10} style={styles.textContainer}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    ))}
  </AppIntro>
);
