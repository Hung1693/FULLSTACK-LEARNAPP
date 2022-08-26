import { createContext, useReducer } from "react";
import axios from "axios";
import { authReducer } from "../reducer/AuthReducer";
import { apiUrl } from "./constant";

export const AuthContext = createContext();

//AuthContextProvider to wrap around the entire app to pass down the state to all the components
const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    //user login
    authLoading: true,
    //user waiting for authentication
    isAuthenticated: false,
    user: null,
  });
  //**********Login****************************/
  const loginUser = async (userForm) => {
    try {
        const response = await axios.post(`${apiUrl}/login`, userForm);
        console.log(response.data);
      //response.dat is built-in to retrieve status from backend
      if (response.data)
        //save username to localStorage
        localStorage.setItem(
          //save username into appUsername
          "appUserName",
          response.data.username
        );
      //   await loadUser();
      return response.data;
    } catch (error) {
      //if server response is not successful
      if (error.response.data) return error.response.data;
      //if connection to server is not successful
      else return { success: false, message: error.message };
    }
  };
  //-----------------------------------------------/

  //context data, get data from loginUser
  const authContextData = { loginUser };
  //return provider
    return (
      //props value = {authContextData} pass down to all components
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;