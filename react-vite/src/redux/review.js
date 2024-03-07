const LOAD_ALL = 'reviews/LOAD_ALL';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

const loadAll = (reviews) => ({
    type: LOAD_ALL,
    reviews
});

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
});

const editReview = (review) => ({
    type: EDIT_REVIEW,
    review
});

const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
})

const userReviews = (reviews) => ({
    type: LOAD_ALL,
    reviews
})

export const thunkGetAllReviews = () => async (dispatch) => {
    const response = await fetch ('/api/reviews')

    if (response.ok) {
        const allReviews = await response.json();
        dispatch(loadAll(allReviews));
        return allReviews;
    } else {
        const error = await response.json();
        return error;
    }
}

export const thunkCreateReview = (review) => async (dispatch) => {
    const response = await fetch ('/api/reviews/new', {
        method: 'POST',
        body: review
    })
    if (response.ok) {
        const newReview = await response.json();
        dispatch(createReview(newReview));
        return newReview
    } else {
        const error = await response.json();
        return error
    }
}

const initialState = {}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL:
            return {
                ...state,
                allReviews: action.reviews
            }
        case CREATE_REVIEW: 
            console.log('HELLOOOOsdfasdfasdfasfafasdfafs-----', action)
            return {
                ...state,
                [action.review.id]: action.review
            }
            default:
                return state
    }
}

export default reviewReducer;