import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from "lodash";

export const fetchPostsAndUsers = () => async (dispatch, getState) =>{
  console.log("About to fetch posts")
  await dispatch(fetchPosts());

  const userIds = _.uniq(_.map(getState().posts, "userId"));
  console.log("fetched posts!");
  userIds.forEach(id => dispatch(fetchUser(id)));

 /*  This is lodash Chain method if you want to make it cleaner and shorter

  _.chain(getState().post)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value(); */
};

export const fetchPosts = () => {
    return async (dispatch) => {
        const response = await jsonPlaceholder.get("/posts");

     dispatch({ type: "FETCH_POSTS", payload: response.data })
   };
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
 
  dispatch({ type: "FETCH_USER", payload: response.data })
 };


 // Memoize Version
/* export const fetchUser = (id) => (dispatch) =>{
  _fetchUser(id, dispatch);
};
  const _fetchUser = _.memoize(async (id, dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
 
    dispatch({ type: "FETCH_USER", payload: response.data })
 }); */