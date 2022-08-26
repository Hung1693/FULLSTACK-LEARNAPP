import axios from "axios";

//only need to verify accesstoken. If accesstoken is valid, then put it in header else delete it in localstorage
const setAuthToken = (username) => {
  if (username) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${username}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
