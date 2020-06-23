import React from 'react';
import {Alert, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import actions from 'src/redux/likes/types';
import Swipe from 'src/components/Swipe';
import Loading from 'src/components/Loading';
import Error from 'src/components/Error';
import Types from 'src/components/Types';
import Filter from 'src/components/Filter';
import Intro from 'src/components/Intro';

import {Container} from 'src/utils/Container';

import useApi from 'src/api/useApi';

const filtersDefaultState = {
  genre: 'All',
  language: 'All',
  yearFrom: 1921,
  yearTo: 2020,
};

export default props => {
  const year = new Date().getFullYear() + 1;
  const [loading, setLoading] = React.useState(true);
  const [cards, setCards] = React.useState([]);
  const [newCards, setNewCards] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [typeOfShow, setTypeOfShow] = React.useState('all');
  const [filters, setFilters] = React.useState(filtersDefaultState);

  const firstTime = useSelector(state => state.likes.firstTime);

  const dispatch = useDispatch();

  async function fetchShows({type, filters, dontUpdateType = false}) {
    const t = dontUpdateType ? type : handleType({type});
    setLoading(true);
    const data = await useApi.fetchShows({type: t, filters});
    if (data && data.length > 0) {
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
    setFilters(filtersDefaultState);
    setTypeOfShow('all');
    fetchShows({type: 'all', filters: filtersDefaultState});
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
    if (data.length === 4) {
      const f = await useApi.fetchShows({type: typeOfShow, filters});
      if (f && f.length > 0) {
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
    fetchShows({type: 'all', filters});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeFilter = ({item, name}) => {
    const f = {...filters};
    f[name.toLowerCase()] = item;
    setFilters(f);
  };

  const onYearChange = values => {
    const f = {...filters};
    f.yearFrom = values[0];
    f.yearTo = values[1];
    setFilters(f);
  };

  const handleCancelFilters = () => {
    setFilters(filtersDefaultState);
    fetchShows({type: typeOfShow, filters: filtersDefaultState});
  };

  const handleFilter = () => {
    fetchShows({type: typeOfShow, filters, dontUpdateType: true});
  };

  if (firstTime) {
    return (
      <Intro handlePress={() => dispatch({type: actions.SET_FIRST_TIME})} />
    );
  }

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
      <Types
        handleTypeChange={fetchShows}
        type={typeOfShow}
        filters={filters}
      />
      <Filter
        active={filters !== filtersDefaultState}
        handleCancel={handleCancelFilters}
        handleFilter={handleFilter}
        handleChangeFilter={handleChangeFilter}
        genre={filters.genre}
        language={filters.language}
        from={filters.yearFrom}
        to={filters.yearTo}
        onYearChange={onYearChange}
        max={year}
      />
      <Swipe
        cards={cards}
        handleSwipe={handleSwipe}
        alertShowUnavailable={alertShowUnavailable}
      />
    </Container>
  );
};
