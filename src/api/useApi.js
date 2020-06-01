import {URL_BASE} from 'src/api/env';

async function fetchShows({type}) {
  try {
    const response = await fetch(`${URL_BASE}getShows/${type}`);
    const data = response.json();
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
