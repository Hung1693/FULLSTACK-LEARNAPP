export const apiUrl =
  process.env.NODE_ENV !== "production"
    // ? "http://localhost:3001"
    ? "http://hungnguyen:xFMsE94mx3of570Yy1VKfTVXHCeKxLZt@dpg-ccaljj9a6gdmn7sbrh0g-a.oregon-postgres.render.com/asalala"
    : "http://postgres://hungnguyen:xFMsE94mx3of570Yy1VKfTVXHCeKxLZt@dpg-ccaljj9a6gdmn7sbrh0g-a.oregon-postgres.render.com/asalala";

export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POSTS_LOADED_FAIL = "POSTS_LOADED_FAIL";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const FIND_POST = "FIND_POST";
