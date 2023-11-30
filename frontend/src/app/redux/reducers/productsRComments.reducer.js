const initialState = {
  productsRComments: [],
  currentProductsRPage: 1,
  productsRLoading: false,
  totalProductsRComments: 0,
};

const productsRCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCTR_TOTAL_COMMENTS":
      return {
        ...state,
        totalProductsRComments: action.payload,
      };
    case "SET_PRODUCTR_CURRENT_PAGE":
      return {
        ...state,
        currentProductsRPage: action.payload,
      };
    case "GET_PRODUCTR_COMMENTS_REQUEST":
      return {
        ...state,
        productsRLoading: true,
      };
    case "GET_PRODUCTR_ALL_COMMENTS":
      return {
        ...state,
        productsRComments: action.payload,
        productsRLoading: false,
      };
    case "ADD_PRODUCTR_COMMENT":
      return {
        ...state,
        productsRComments: [...state.productsRComments, action.payload],
      };
    case "DELETE_PRODUCTR_COMMENT":
      return {
        ...state,
        productsRComments: state.productsRComments.filter(
          (comment) => comment._id !== action.payload
        ),
      };
    case "ADD_PRODUCTR_REPLY":
      return {
        ...state,
        comments: state.productsRComments.map((comment) => {
          if (comment._id === action.payload.commentId) {
            return {
              ...comment,
              replies: [...comment.replies, action.payload.reply],
            };
          } else {
            return comment;
          }
        }),
      };
    case "DELETE_PRODUCTR_REPLY":
      return {
        ...state,
        productsRComments: state.productsRComments.map((comment) => {
          if (comment._id === action.payload.commentId) {
            return {
              ...comment,
              replies: comment.replies.filter(
                (reply) => reply._id !== action.payload.replyId
              ),
            };
          } else {
            return comment;
          }
        }),
      };
    default:
      return state;
  }
};

export default productsRCommentsReducer;
