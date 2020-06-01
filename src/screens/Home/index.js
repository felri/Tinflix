import React from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import actions from 'src/redux/likes/types';
import Swipe from 'src/components/Swipe';
import Loading from 'src/components/Loading';
import Error from 'src/components/Error';
import Types from 'src/components/Types';
import Filter from 'src/components/Filter';

import {Container} from 'src/utils/Container';

import useApi from 'src/api/useApi';

export default props => {
  const [loading, setLoading] = React.useState(true);
  const [cards, setCards] = React.useState([]);
  const [newCards, setNewCards] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [typeOfShow, setTypeOfShow] = React.useState('all');
  const [filter, setFilter] = React.useState({
    genre: '',
    yearFrom: '',
    yearTo: '',
  });

  const dispatch = useDispatch();

  async function fetchShows({type}) {
    const t = handleType({type});
    setLoading(true);
    const data = await useApi.fetchShows({type: t});
    if (data) {
      setCards(data);
      setError(false);
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
    }
  }

  function handleError() {
    setLoading(true);
    fetchShows();
  }

  function handleLike({lastSwipeCard}) {
    dispatch({type: actions.SET_LIKE, payload: lastSwipeCard});
  }

  async function handleSwipe({like}) {
    const data = [...cards];
    let lastSwipeCard = null;

    if (newCards.length > 0) {
      const f = data.concat(newCards);
      lastSwipeCard = f.shift();
      setCards(f);
      setNewCards([]);
    } else {
      lastSwipeCard = data.shift();
      setCards(data);
    }

    //if last 3 cards, get new cards from api
    if (data.length === 3) {
      const f = await useApi.fetchShows({type: typeOfShow});
      if (f) {
        setNewCards(f);
      } else {
        setError(true);
      }
    }

    if (like && lastSwipeCard) {
      handleLike({lastSwipeCard});
    }
  }

  function handleType({type}) {
    if (type === 'movie' && typeOfShow === 'series') {
      setTypeOfShow('movie');
      return 'movie';
    } else if (type === 'series' && typeOfShow === 'movie') {
      setTypeOfShow('series');
      return 'series';
    } else if (type === 'movie' && typeOfShow === 'series') {
      setTypeOfShow('movie');
      return 'movie';
    } else if (type === 'series' && typeOfShow === 'series') {
      setTypeOfShow('all');
      return 'all';
    } else if (type === 'series' && typeOfShow === 'all') {
      setTypeOfShow('series');
      return 'series';
    } else if (type === 'movie' && typeOfShow === 'all') {
      setTypeOfShow('movie');
      return 'movie';
    } else if (type === 'movie' && typeOfShow === 'movie') {
      setTypeOfShow('all');
      return 'all';
    } else {
      return 'all';
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

  React.useEffect(() => {
    fetchShows({type: 'all'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Error handlePress={handleError} />
      </Container>
    );
  }

  return (
    <Container>
      <Types handleTypeChange={fetchShows} type={typeOfShow} />
      {/* <Filter /> */}
      <Swipe
        cards={cards}
        handleSwipe={handleSwipe}
        alertShowUnavailable={alertShowUnavailable}
      />
    </Container>
  );
};
