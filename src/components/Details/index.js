import * as React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import imdbPng from 'src/assets/imgs/imdb.png';

import {Text} from 'src/utils/Text';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import Theme from 'src/utils/Theme';
import {WatchSvg, AlertSvg} from 'src/utils/svgIcons';
import {handleNetflixPress, handleImdbPress} from 'src/utils/helpers';

const ImdbRating = ({card}) =>
  card.imdbrating !== '0' ? (
    <TouchableOpacity
      style={styles.containerScore}
      onPress={() => handleImdbPress({id: card.imdbid})}>
      <Image style={{height: 20, width: 50, marginTop: 2}} source={imdbPng} />
      <Text style={styles.imdbrating}>{card.imdbrating}</Text>
    </TouchableOpacity>
  ) : null;

export default ({card, alertShowUnavailable}) => {
  return (
    <>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.containerInsideScroll}>
            <View>
              <Text style={styles.name}>
                {card.title} - {card.year}
              </Text>
              <ImdbRating card={card} />
              <View style={styles.line} />
              {card.director.length > 0 && (
                <Text style={styles.details}>Director: {card.director}</Text>
              )}
              {card.actors.length > 0 && (
                <Text style={styles.details}>Actors: {card.actors}</Text>
              )}
              {card.language.length > 0 && (
                <Text style={styles.details}>Language: {card.language}</Text>
              )}
              {card.genre.length > 0 && (
                <Text style={styles.details}>Genre: {card.genre}</Text>
              )}
              {card.released.length > 0 && (
                <Text style={styles.details}>Released: {card.released}</Text>
              )}
              {card.runtime.length > 0 && (
                <Text style={styles.details}>Runtime: {card.runtime}</Text>
              )}
              <View style={styles.line} />
              {card.plot.length > 0 && (
                <Text style={styles.plot}>{card.plot}</Text>
              )}
            </View>
            <View style={styles.containerImage}>
              <TouchableOpacity onPress={() => alertShowUnavailable({card})}>
                <AlertSvg
                  width={30}
                  height={30}
                  fill={Theme.colors.textColor}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleNetflixPress({id: card.netflixid})}>
                <WatchSvg width={50} height={50} fill={Theme.colors.red} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
