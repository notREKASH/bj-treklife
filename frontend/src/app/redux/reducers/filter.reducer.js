const initialState = {
  randonneeTrekking: "",
  reviewsProduct: "",
  reviewsProductCategory: "",
  reviewsProductSubCategory: "",
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_RANDONNEE_TREKKING_FILTER_NAME":
      return {
        ...state,
        randonneeTrekking: action.payload,
        reviewsProduct: "",
        reviewsProductCategory: "",
        reviewsProductSubCategory: "",
      };
    case "SET_REVIEWS_PRODUCT_FILTER_NAME":
      return {
        ...state,
        randonneeTrekking: "",
        reviewsProduct: action.payload,
      };
    case "SET_REVIEWS_PRODUCT_CATEGORY":
      return {
        ...state,
        reviewsProductCategory: action.payload,
        randonneeTrekking: "",
      };
    case "SET_REVIEWS_PRODUCT_SUB_CATEGORY":
      return {
        ...state,
        reviewsProductSubCategory: action.payload,
        randonneeTrekking: "",
      };
    default:
      return state;
  }
}
