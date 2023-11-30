import { combineReducers } from "redux";
import postsReducer from "./posts.reducer";
import reviewsReducer from "./reviews.reducer";
import filterReducer from "./filter.reducer";
import authReducer from "./auth.reducer";
import randonneeCommentsReducer from "./randonneeComments.reducer";
import productsRCommentsReducer from "./productsRComments.reducer";

export default combineReducers({
  posts: postsReducer,
  reviews: reviewsReducer,
  filter: filterReducer,
  auth: authReducer,
  randonneeComments: randonneeCommentsReducer,
  productsRComments: productsRCommentsReducer,
});
