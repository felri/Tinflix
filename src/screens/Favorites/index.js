import React from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import actions from 'src/redux/likes/types';
import Swipe from 'src/components/Swipe';
import useApi from 'src/api/useApi';
import {Container} from 'src/utils/Container';
import {Text} from 'src/utils/Text';
import styles from './styles';

export default props => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.likes);

  function handleDisLike({lastSwipeCard}) {
    dispatch({type: actions.REMOVE_LIKE, payload: lastSwipeCard.id});
  }

  function handleLike({lastSwipeCard}) {
    dispatch({type: actions.SET_LIKE, payload: lastSwipeCard});
  }

  async function handleSwipe({like}) {
    const data = {...cards};
    let lastSwipeCard = data.data.shift();

    if (!like) {
      handleDisLike({lastSwipeCard});
    } else {
      handleLike({lastSwipeCard});
    }
  }

  function showThankYouAlert({card}) {
    useApi.setAlert({id: card.id});
    Alert.alert(
      'Thank you',
      'We will verify what happened',
      [{text: 'Ok', onPress: () => console.log('OK Pressed')}, ,],
      {cancelable: false},
    );
  }

  function alertShowUnavailable({card}) {
    Alert.alert(
      'Unavailable?',
      `Are you sure that ${card.title} is unavailable in the US?`,
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => showThankYouAlert({card})},
        ,
      ],
      {cancelable: false},
    );
  }

  if (cards.data.length === 0) {
    return (
      <Container>
        <Text style={styles.textNoFavorites}>No favorites yet</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Swipe
        cards={cards.data}
        handleSwipe={handleSwipe}
        alertShowUnavailable={alertShowUnavailable}
      />
    </Container>
  );
};
