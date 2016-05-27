import axios from 'axios'

var rootURL = "http://localhost:8080";

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

function getDatabaseData( ) {
  const API_CONTEXT = "/database/data";
  return axios.get(rootURL + API_CONTEXT);
}

export { rootURL, postDatabaseCreate, postDatabaseInsert, getDatabaseData };
