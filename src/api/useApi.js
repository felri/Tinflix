import {URL_BASE} from 'src/api/env';

function handleTypeAndFilters({type, filters}) {
  const year = new Date().getFullYear();
  const url = `${URL_BASE}getShows/${type}?`;
  let params = '';
  if (filters.genre !== '' && filters.genre.toUpperCase() !== 'ALL') {
    params = params.concat(`genre=${filters.genre}&`);
  }
  if (filters.language !== '' && filters.language.toUpperCase() !== 'ALL') {
    params = params.concat(`language=${filters.language}&`);
  }
  if (filters.yearFrom !== 1921) {
    params = params.concat(`from=${filters.yearFrom}&`);
  }
  if (filters.yearTo !== year) {
    params = params.concat(`to=${filters.yearTo}&`);
  }
  return url + params;
}

async function fetchShows({type, filters}) {
  const url = handleTypeAndFilters({type, filters});
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function setAlert({id}) {
  try {
    const response = await fetch(`${URL_BASE}setAlert/${id}`);
    const data = response.json();
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export default {
  fetchShows,
  setAlert,
};
