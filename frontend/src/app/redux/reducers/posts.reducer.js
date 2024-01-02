const initialState = {
  posts: [],
  currentPage: 1,
  totalPages: 0,
  filterName: "",
  loading: false,
  error: null,
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "SET_TOTAL_PAGES":
      return {
        ...state,
        totalPages: action.payload,
      };
    case "GET_POSTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_ALL_POSTS":
      return {
        ...state,
        posts: action.payload,
        filterName: "",
        loading: false,
        error: null,
      };
    case "SET_FILTER_NAME":
      return {
        ...state,
        filterName: action.payload,
      };
    case "GET_FILTERED_POSTS":
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };
    case "CREATE_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    default:
      return state;
  }
}
