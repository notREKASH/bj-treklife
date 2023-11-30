export const setRandonneeTrekkingFilterName = (filterName) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_RANDONNEE_TREKKING_FILTER_NAME",
      payload: filterName,
    });
  };
};

export const setReviewsProductFilterName = (filterName) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_REVIEWS_PRODUCT_FILTER_NAME",
      payload: filterName,
    });
  };
};

export const setReviewsProductCategory = (category) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_REVIEWS_PRODUCT_CATEGORY",
      payload: category,
    });
  };
};

export const setReviewsProductSubCategory = (subCategory) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_REVIEWS_PRODUCT_SUB_CATEGORY",
      payload: subCategory,
    });
  };
};
