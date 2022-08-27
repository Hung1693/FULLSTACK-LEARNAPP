import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "./constant";
import { useNavigate } from "react-router";

export const AuthContext = createContext();
//AuthContextProvider to wrap around the entire app to pass down the state to all the components
const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  
  //**********Login****************************/
  //pass userForm = form value in LoginForm.js
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, userForm);
      //   console.log(response.data);
      //response.dat is built-in to retrieve status from backend
      if (response.data) {
        //save username to localStorage
        localStorage.setItem(
          //save username into appUsername
          "appUserName",
          response.data.username
        );
      }
      return response.data;
    } catch (error) {
      //if server response is not successful
      if (error.response.data) return error.response.data;
      //if connection to server is not successful
      else return { success: false, message: error.message };
    }
  };
  //-----------------------------------------------/

  //**********Register****************************/
  //pass userForm = form value in RegisterForm.js
  // Register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/register`, userForm);
      if (response.data)
        alert("Register successfully, please login to continue");
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  //-----------------------------------------------/

  //**********Logout****************************/
  const logoutUser = () => {
    localStorage.removeItem("appUserName");
    navigate('/login')
  };
    //-----------------------------------------------/

  //context data, get data from loginUser
    const authContextData = { loginUser, registerUser, logoutUser };
  //return provider
  return (
    //props value = {authContextData} pass down to all components
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
