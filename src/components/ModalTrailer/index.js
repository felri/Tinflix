import * as React from 'react';
import {TouchableOpacity, View, Dimensions} from 'react-native';
import {Text} from 'src/utils/Text';
import Modal from 'react-native-modal';
import YoutubePlayer from 'react-native-youtube-iframe';

import styles from './styles';

export default ({onClose, isVisible, trailerId}) => {
  const playerRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(true);
  return (
    <Modal
      isVisible={isVisible}
      onRequestClose={onClose}
      style={styles.container}>
      <View style={{zIndex: 999}}>
        <YoutubePlayer
          ref={playerRef}
          height={300}
          width={Dimensions.get('window').width - 40}
          videoId={trailerId}
          play={playing}
          volume={70}
          playerParams={{
            preventFullScreen: true,
          }}
          playbackRate={1}
        />
      </View>
      <TouchableOpacity onPress={onClose} style={styles.containerModal}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>
    </Modal>
  );
};
