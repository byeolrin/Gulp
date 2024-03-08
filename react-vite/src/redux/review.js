const LOAD_ALL = 'reviews/LOAD_ALL';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';
const LOAD_USER_BUSINESS_REVIEW = 'reviews/LOAD_USER_BUSINESS_REVIEW';

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

const loadUserBusinessReview = (review) => ({
    type: LOAD_USER_BUSINESS_REVIEW,
    review
})

export const thunkGetAllReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews')

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
    const response = await fetch('/api/reviews/new', {
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

export const thunkRemoveReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(removeReview(reviewId))
    }
}

export const thunkEditReview = (review, reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: review
    })

    if (response.ok) {
        const updatedReview = await response.json();
        dispatch(editReview(updatedReview));
        return updatedReview
    } else {
        const error = await response.json();
        return error
    }

}

export const thunkUserBusinessReview = (businessId, userId) => async (dispatch) => {
    const response = await fetch (`api/${businessId}/reviews/${userId}`)
    
    if (response.ok) {
        const currentUserReview = await response.json();
        dispatch(loadUserBusinessReview(currentUserReview));
        return currentUserReview
    } else {
        const error = await response.json();
        return error;
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
            return {
                ...state,
                [action.review.id]: action.review
            }
        case EDIT_REVIEW: {
            return {
                ...state,
                [action.review.id]: action.review
            };
        }
        case REMOVE_REVIEW: {
            const newAllReviews = { ...state }
            delete newAllReviews[action.reviewId]
            return {
                ...state,
                allReviews: newAllReviews
            }
        }
        case LOAD_USER_BUSINESS_REVIEW: {
            return {
                ...state,
                userBusinessReview: action.review
            };
        }
        default:
            return state
    }
}

export default reviewReducer;