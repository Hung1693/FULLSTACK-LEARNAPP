import { createContext, useReducer } from "react";
import {postReducer} from '../reducer/postReducer'
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
    //************GET ALL POSTS********************* */
    const getPosts = async () => {
        try {
        const appUserName = localStorage.getItem("appUserName");
        const response = await axios.get(`${apiUrl}/dashboard/${appUserName}`);
        console.log(response.data);
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

  // Post context data
  const postContextData = {
    postState,
    getPosts,
    // showAddPostModal,
    // setShowAddPostModal,
    // showUpdatePostModal,
    // setShowUpdatePostModal,
    // addPost,
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
