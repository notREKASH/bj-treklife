const initialState = {
  reviews: [],
  currentPage: 1,
  totalPages: 0,
  filterName: "",
  loading: false,
  error: null,
};

export default function reviewsReducer(state = initialState, action) {
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
    case "GET_REVIEWS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_ALL_REVIEWS":
      return {
        ...state,
        reviews: action.payload,
        filterName: "",
        loading: false,
        error: null,
      };
    case "SET_FILTER_NAME":
      return {
        ...state,
        filterName: action.payload,
      };
    case "GET_FILTERED_REVIEWS":
      return {
        ...state,
        reviews: action.payload,
        loading: false,
        error: null,
      };
    case "CREATE_REVIEW":
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
        loading: false,
        error: null,
      };
    case "DELETE_REVIEW":
      return {
        ...state,
        reviews: state.reviews.filter(
          (review) => review._id !== action.payload
        ),
        loading: false,
        error: null,
      };
    case "UPDATE_REVIEW":
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review._id === action.payload._id ? action.payload : review
        ),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
