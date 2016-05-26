import axios from 'axios'

var rootURL = "http://localhost:8080";

function postColnames(colnames) {
  const API_CONTEXT = "/database/colnames";
  return axios.post(rootURL + API_CONTEXT, {
    colnames: colnames
  });
}

export { rootURL, postColnames };
