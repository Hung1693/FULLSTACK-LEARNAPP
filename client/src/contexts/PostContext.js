import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducer/postReducer";
import { apiUrl } from "./constant";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  // postState = {}, dispatch =postReducer (from postReducer.js)
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postsLoading: true,
  });
  //--------------------------------------------------/
  //********POST MODAL**************************** */
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  

  //--------------------------------------------------/

  //************GET ALL POSTS********************* */
  const getPosts = async () => {
    try {
      const appUserName = localStorage.getItem("appUserName");
      const response = await axios.get(`${apiUrl}/dashboard/${appUserName}`);
      // console.log(response.data);
      if (response.data.success) {
        dispatch(
          //action = {type: POSTS_LOADED_SUCCESS, payload: response.data.allPosts} from postReducer.js
          {
            type: "POSTS_LOADED_SUCCESS",
            payload: response.data.allPosts,
          }
        );
      }
    } catch (error) {
      dispatch({ type: "POSTS_LOADED_FAIL" });
    }
  };
  //--------------------------------------------------/
  //************ADD POST********************* */
  const addPost = async (newPost) => {
    const appUserName = localStorage.getItem("appUserName");
    try {
      //body newPost
      const response = await axios.post(
        `${apiUrl}/dashboard/add/${appUserName}`,
        newPost
      );
      if (response.data.success) {
        dispatch({
          type: "ADD_POST",
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };



  //--------------------------------------------------/

  // Post context data export to other components
  const postContextData = {
    postState,
    getPosts,
    setShowAddPostModal,
    showAddPostModal,
    addPost,
    // showUpdatePostModal,
    // setShowUpdatePostModal,
    // showToast,
    // setShowToast,
    // deletePost,
    // findPost,
    // updatePost,
  };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
