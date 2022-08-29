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
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
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
    //newPost is the post object (request body) from AddPostModal.js
    const appUserName = localStorage.getItem("appUserName");
    try {
      //body newPost
      const response = await axios.post(
        `${apiUrl}/dashboard/add/${appUserName}`,
        newPost
      );
      console.log(response.data);
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
  //************DELETE POST********************* */
  const deletePost = async (postId) => {
    //postId is the post_id from the post object
    try {
      const appUserName = localStorage.getItem("appUserName");
      const response = await axios.delete(
        `${apiUrl}/dashboard/delete/${appUserName}/${postId}`
      );
      if (response.data === "Post deleted") {
        dispatch({
          type: "DELETE_POST",
          payload: postId,
        });
        console.log(postState);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //--------------------------------------------------/

  //************UPDATE POST********************* */
  //------------find post------------------------//
  const findPost = (postId) => {
    const post = postState.posts.find((post) => post.post_id === postId);
    dispatch({
      type: "FIND_POST",
      payload: post,
    });
    // console.log(post.post_id)
  };
  
  //--------------------------------------------------/
  //------------------update--------------------//
  const updatePost = async (updatedPost) => {
    const appUserName = localStorage.getItem("appUserName");
    try {
      const response = await axios.put(
        `${apiUrl}/dashboard/update/${appUserName}/${updatedPost.post_id}`,
        updatedPost
      );
      if (response.data.success) {
        dispatch({ type: "UPDATE_POST", payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
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
    deletePost,
    updatePost,
    findPost,
    showUpdatePostModal,
    setShowUpdatePostModal,
  };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
