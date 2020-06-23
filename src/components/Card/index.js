import * as React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import Theme from 'src/utils/Theme';
import {handleNetflixPress, handleImdbPress} from 'src/utils/helpers';
import {InfoSvg, WatchSvg, HomeSvg} from 'src/utils/svgIcons';
import imdbPng from 'src/assets/imgs/imdb.png';
import {Text} from 'src/utils/Text';
import styles from './styles';

const ImdbRating = ({card}) =>
  card.imdbrating !== '0' ? (
    <TouchableOpacity
      style={styles.containerScore}
      onPress={() => handleImdbPress({id: card.imdbid})}>
      <Image style={{height: 20, width: 50, marginTop: 2}} source={imdbPng} />
      <Text style={styles.imdbrating}>{card.imdbrating}</Text>
    </TouchableOpacity>
  ) : null;

export default React.memo(
  ({card, likeOpacity = 0, nopeOpacity = 0, onInfoClick, onTrailerClick}) => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animated.View style={[styles.like, {opacity: likeOpacity}]}>
          <Text style={styles.likeLabel}>LIKE</Text>
        </Animated.View>
        <ImdbRating card={card} />
        <Animated.View style={[styles.nope, {opacity: nopeOpacity}]}>
          <Text style={styles.nopeLabel}>NOPE</Text>
        </Animated.View>
      </View>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{uri: card.posteromdb ? card.posteromdb : card.posternetflix}}
        />
      </View>
      <View style={styles.overlay}>
        <View style={styles.footer}>
          <Text numberOfLines={2} style={styles.name}>
            {card.title}
          </Text>
          <View style={styles.line} />
          <View style={styles.containerType}>
            <Text style={styles.type}>{card.type}</Text>
            <Text style={styles.year}>{card.year}</Text>
          </View>

          <View style={styles.containerType}>
            <Text style={styles.details}>{card.genre}</Text>
            <Text style={styles.language}>{card.language}</Text>
          </View>
          <View style={styles.line} />

          <Text numberOfLines={3} style={styles.plot}>
            {card.plot}
          </Text>
        </View>
        <View style={styles.containerIcons}>
          <TouchableOpacity onPress={onInfoClick}>
            <InfoSvg width={30} height={30} fill={Theme.colors.textColor} />
          </TouchableOpacity>
          {!!card.trailer && card.trailer.length > 0 && (
            <TouchableOpacity
              onPress={() => onTrailerClick({trailerId: card.trailer})}
              style={styles.containerTrailer}>
              <Text style={styles.textTrailer}>Trailer</Text>
              <HomeSvg width={20} height={20} fill={Theme.colors.textColor} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => handleNetflixPress({id: card.netflixid})}>
            <WatchSvg width={50} height={50} fill={Theme.colors.red} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ),
);
