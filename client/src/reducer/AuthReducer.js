//initialState in AuthContext.js
//initialState in AuthContext.js
export const authReducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
      };

    default:
      return state;
  }
};
