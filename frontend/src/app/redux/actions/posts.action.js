import axios from "axios";
import { setRandonneeTrekkingFilterName } from "./filter.actions";
import { toast } from "react-toastify";

// Current Pages

export const setCurrentRandonneeTrekkingPage = (pageNumber) => {
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

// Get all posts (with pagination)

export const getPosts = (page = 1, limit = 5) => {
  return async (dispatch) => {
    dispatch({ type: "GET_POSTS_REQUEST" });
    try {
      const res = await axios.get(
        `https://bj-treklife.vercel.app/api/posts?page=${page}&limit=${limit}`
      );
      const postsClone = [...res.data.posts];
      dispatch({
        type: "GET_ALL_POSTS",
        payload: postsClone.reverse(),
      });
      dispatch(setTotalPages(res.data.totalPages));
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des posts"
      );
    }
  };
};

// Get 4 latest posts

export const getLatestPosts = () => {
  return async (dispatch) => {
    dispatch({
      type: "GET_POSTS_REQUEST",
    });
    try {
      const res = await axios.get(
        "https://bj-treklife.vercel.app/api/posts/latest-posts"
      );
      const postsClone = [...res.data];
      dispatch({
        type: "GET_LATEST_POSTS",
        payload: postsClone.reverse(),
      });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des 4 derniers posts"
      );
    }
  };
};

// Get a specific post

export const getSpecificPost = (id) => {
  return async (dispatch) => {
    dispatch({
      type: "GET_POSTS_REQUEST",
    });
    try {
      const res = await axios.get(
        `https://bj-treklife.vercel.app/api/posts/${id}`
      );
      dispatch({
        type: "GET_SPECIFIC_POST",
        payload: res.data,
      });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération du post"
      );
      dispatch({
        type: "GET_SPECIFIC_POST_FAILED",
        payload: error.response.data,
      });
    }
  };
};

// Get Filtered Posts

export const getFilteredPosts = (filterName, page = 1, limit = 5) => {
  return async (dispatch) => {
    dispatch(setRandonneeTrekkingFilterName(filterName));
    dispatch({ type: "GET_POSTS_REQUEST" });
    try {
      const response = await axios.get(
        `https://bj-treklife.vercel.app/api/posts`,
        {
          params: {
            activityType: filterName,
            page,
            limit,
          },
        }
      );

      const postsClone = [...response.data.posts];
      dispatch({
        type: "GET_FILTERED_POSTS",
        payload: postsClone.reverse(),
      });

      dispatch({
        type: "SET_TOTAL_PAGES",
        payload: response.data.totalPages,
      });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des posts filtrés"
      );
    }
  };
};

// Create a post

export const createPost = (post, token) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "https://bj-treklife.vercel.app/api/posts",
        {
          ...post,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      dispatch({
        type: "CREATE_POST",
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
      console.log(error);
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

// Delete a post

export const deletePost = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `https://bj-treklife.vercel.app/api/posts/${id}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      dispatch({
        type: "DELETE_POST",
        payload: res.data,
      });
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
      dispatch(getPosts());
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

// Update a post

export const updatePost = (id, post, token) => {
  console.log("update post", post);
  return async (dispatch) => {
    try {
      const res = await axios.patch(
        `https://bj-treklife.vercel.app/api/posts/${id}`,
        {
          ...post,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      dispatch({
        type: "UPDATE_POST",
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
