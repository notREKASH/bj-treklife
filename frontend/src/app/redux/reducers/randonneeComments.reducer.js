const initialState = {
  randonneeComments: [],
  currentRandonneePage: 1,
  randonneeLoading: false,
  totalRandonneeComments: 0,
};

const randonneeCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_RANDONNEE_TOTAL_COMMENTS":
      return {
        ...state,
        totalRandonneeComments: action.payload,
      };
    case "SET_RANDONNEE_CURRENT_PAGE":
      return {
        ...state,
        currentRandonneePage: action.payload,
      };
    case "GET_RANDONNEE_COMMENTS_REQUEST":
      return {
        ...state,
        randonneeLoading: true,
      };
    case "GET_RANDONNEE_ALL_COMMENTS":
      return {
        ...state,
        randonneeComments: action.payload,
        randonneeLoading: false,
      };
    case "ADD_RANDONNEE_COMMENT":
      return {
        ...state,
        randonneeComments: [...state.randonneeComments, action.payload],
      };
    case "DELETE_RANDONNEE_COMMENT":
      return {
        ...state,
        randonneeComments: state.randonneeComments.filter(
          (comment) => comment._id !== action.payload
        ),
      };
    case "ADD_RANDONNEE_REPLY":
      return {
        ...state,
        randonneeComments: state.randonneeComments.map((comment) => {
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
    case "DELETE_RANDONNEE_REPLY":
      return {
        ...state,
        randonneeComments: state.randonneeComments.map((comment) => {
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

export default randonneeCommentsReducer;
