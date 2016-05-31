import axios from 'axios'

const rootURL = "http://localhost:8080";

function postDatabaseCreate(colnames) {
  const API_CONTEXT = "/database/create";
  return axios.post(rootURL + API_CONTEXT, {
    colnames: colnames
  });
}

function postDatabaseInsert(rowmap) {
  const API_CONTEXT = "/database/insert";
  return axios.post(rootURL + API_CONTEXT, {
    row: rowmap
  });
}

function getDatabaseDataLastN(n) {
  const API_CONTEXT = "/database/data/" + n ;
  return axios.get(rootURL + API_CONTEXT);
}

function getDatabaseDataAll( ) {
  const API_CONTEXT = "/database/data/all";
  return axios.get(rootURL + API_CONTEXT);
}

export { rootURL, postDatabaseCreate, postDatabaseInsert, getDatabaseDataAll, getDatabaseDataLastN };
