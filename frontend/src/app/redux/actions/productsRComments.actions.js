import axios from "axios";
import { toast } from "react-toastify";

// Current Comments (for pagination)

export const setCurrentCommentsPage = (pageNumber) => {
  return (dispatch) => {
    try {
      dispatch({
        type: "SET_PRODUCTR_CURRENT_PAGE",
        payload: pageNumber,
      });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors du réglage de la page actuelle"
      );
    }
  };
};

// Total Comments (for pagination)

export const setTotalComments = (totalComments) => {
  return (dispatch) => {
    try {
      dispatch({
        type: "SET_PRODUCTR_TOTAL_COMMENTS",
        payload: totalComments,
      });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors du réglage des commentaires totaux"
      );
    }
  };
};

// Get all comments (with pagination)

export const getProductsRComments = (id, page = 1, limit = 20) => {
  return async (dispatch) => {
    dispatch({ type: "GET_PRODUCTR_COMMENTS_REQUEST" });
    try {
      const res = await axios.get(
        `http://localhost:5000/productsReviews/${id}/comments-with-replies?page=${page}&limit=${limit}`
      );

      const commentsClone = [...res.data.comments];
      dispatch({
        type: "GET_PRODUCTR_ALL_COMMENTS",
        payload: commentsClone.reverse(),
      });
      dispatch(setTotalComments(res.data.totalComments));
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des commentaires"
      );
    }
  };
};

// Add a comment

export const addProductsRComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/productsReviews/${id}/comments`,
        comment
      );
      dispatch({
        type: "ADD_PRODUCTR_COMMENT",
        payload: res.data.comment,
      });
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
      dispatch(getProductsRComments(id));
    } catch (error) {
      const errors = error.response.data.message;
      toast.error(`${errors}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    }
  };
};

// Delete a comment

export const deleteProductsRComment = (id, commentId, token) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/productsReviews/${id}/comments/${commentId}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      dispatch({
        type: "DELETE_PRODUCTR_COMMENT",
        payload: commentId,
      });
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      const errors = error.response.data.message;
      toast.error(`${errors}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    }
  };
};

// Add a reply

export const addProductsRReply = (id, commentId, reply) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/productsReviews/${id}/comments/${commentId}/replies`,
        reply
      );
      dispatch({
        type: "ADD_PRODUCTR_REPLY",
        payload: res.data,
      });
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
      dispatch(getProductsRComments(id));
    } catch (error) {
      const errors = error.response.data.message;
      toast.error(`${errors}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    }
  };
};

// Delete a reply

export const deleteProductsRReply = (id, commentId, replyId, token) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/productsReviews/${id}/comments/${commentId}/replies/${replyId}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      dispatch({
        type: "DELETE_PRODUCTR_REPLY",
        payload: {
          commentId: commentId,
          replyId: replyId,
        },
      });
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      const errors = error.response.data.message;
      toast.error(`${errors}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    }
  };
};
