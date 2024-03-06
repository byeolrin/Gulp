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