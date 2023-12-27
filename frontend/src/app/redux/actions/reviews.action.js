import axios from "axios";
import {
  setReviewsProductCategory,
  setReviewsProductSubCategory,
} from "./filter.actions";
import { toast } from "react-toastify";

// Current Pages

export const setCurrentReviewsPage = (pageNumber) => {
  return (dispatch) => {
    try {
      dispatch({
        type: "SET_CURRENT_PAGE",
        payload: pageNumber,
      });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors du réglage de la page actuelle"
      );
    }
  };
};

// Total Pages

export const setTotalPages = (totalPages) => {
  return (dispatch) => {
    try {
      dispatch({
        type: "SET_TOTAL_PAGES",
        payload: totalPages,
      });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors du réglage des pages totales"
      );
    }
  };
};

// Get all reviews (with pagination)

export const getReviews = (page = 1, limit = 5) => {
  return async (dispatch) => {
    dispatch({
      type: "GET_REVIEWS_REQUEST",
    });
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/productsReviews?page=${page}&limit=${limit}`
      );
      dispatch({
        type: "GET_ALL_REVIEWS",
        payload: res.data.productsReviews,
      });
      dispatch(setTotalPages(res.data.totalPages));
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des reviews"
      );
    }
  };
};

// Get 1 latest review

export const getLatestReview = () => {
  return async (dispatch) => {
    dispatch({
      type: "GET_REVIEWS_REQUEST",
    });
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/productsReviews/latest-reviews`
      );
      const review = res.data;
      dispatch({
        type: "GET_LATEST_REVIEW",
        payload: review,
      });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération de la dernière review"
      );
    }
  };
};

// Get a specific review

export const getSpecificReview = (id) => {
  return async (dispatch) => {
    dispatch({
      type: "GET_REVIEWS_REQUEST",
    });
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/productsReviews/${id}`
      );
      dispatch({
        type: "GET_SPECIFIC_REVIEW",
        payload: res.data,
      });
      dispatch(getReviews());
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération de la review"
      );
      dispatch({
        type: "GET_SPECIFIC_REVIEW_FAILED",
        payload: error.response.data,
      });
    }
  };
};

// Get Filtered Reviews

export const getFilteredReviews = (
  category,
  subCategory = "",
  page = 1,
  limit = 5
) => {
  return async (dispatch) => {
    if (subCategory) {
      dispatch(setReviewsProductSubCategory(subCategory));
    } else {
      dispatch(setReviewsProductCategory(category));
    }

    dispatch({
      type: "GET_REVIEWS_REQUEST",
    });
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/productsReviews`,
        {
          params: {
            category: category,
            subCategory: subCategory,
            page,
            limit,
          },
        }
      );

      dispatch({
        type: "GET_FILTERED_REVIEWS",
        payload: res.data.reviews,
      });

      dispatch({
        type: "SET_TOTAL_PAGES",
        payload: res.data.totalPages,
      });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des reviews filtrés"
      );
    }
  };
};

// Create a review

export const createReview = (review, token) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/productsReviews`,
        {
          ...review,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      dispatch({
        type: "CREATE_REVIEW",
        payload: res.data,
      });
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      const errors = error.response.data;
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

// Delete a review

export const deleteReview = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/productsReviews/${id}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      dispatch({
        type: "DELETE_REVIEW",
        payload: res.data,
      });
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      const errors = error.response.data;
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

// Update a review

export const updateReview = (id, review, token) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/productsReviews/${id}`,
        {
          ...review,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      dispatch({
        type: "UPDATE_REVIEW",
        payload: res.data,
      });
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      const errors = error.response.data;
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
