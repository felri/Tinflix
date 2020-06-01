import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import actions from 'src/redux/likes/types';
import {Container} from 'src/utils/Container';
import {Text} from 'src/utils/Text';
import styles from './styles';
export default props => {
  const dispatch = useDispatch();

  function handleClean() {
    dispatch({type: actions.CLEAN_LIKES});
  }

  function handleClickCleanFavorites({card}) {
    Alert.alert(
      '',
      'Are you sure?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => handleClean()},
        ,
      ],
      {cancelable: false},
    );
  }

  return (
    <Container>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.containerText}
          onPress={handleClickCleanFavorites}>
          <Text style={styles.text}>Clean favorites</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};
