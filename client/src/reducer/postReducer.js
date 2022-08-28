import {
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_FAIL,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST,
} from "../contexts/constant";

export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postsLoading: false,
      };

    case POSTS_LOADED_FAIL:
      return {
        ...state,
        posts: [],
        postsLoading: false,
      };

    case ADD_POST:
      return {
        ...state,
        //add new post to posts array
        posts: [...state.posts, payload],
      };

    case DELETE_POST:
      
      return {
        ...state,
        //filter out the post with the id that matches the payload = postId from deletePost function
        posts: state.posts.filter((post) => post.post_id !== payload),
      };

    case FIND_POST:
      return { ...state, post: payload };

    case UPDATE_POST:
      //if the post id matches the payload id, then update the post with the payload
      const newPosts = state.posts.map((post) =>
        post.post_id === payload.post_id ? payload : post
      );

      return {
        ...state,
        posts: newPosts,
      };

    default:
      return state;
  }
};
export default postReducer;