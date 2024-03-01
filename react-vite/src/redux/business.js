const LOAD_ALL = 'businesses/LOAD_ALL';
const LOAD_ONE = 'businesses/LOAD_ONE';
const CREATE_BUSINESS = 'businesses/CREATE';

const loadAll = (businesses) => ({
    type: LOAD_ALL,
    businesses
});

const loadOne = (business) => ({
    type: LOAD_ONE,
    business
})

const createBusiness = (business) => ({
    type: CREATE_BUSINESS,
    business
})

export const thunkGetAllBusinesses = () => async (dispatch) => {
    const response = await fetch ('/api/businesses')

    if (response.ok) {
        const allBusinesses = await response.json();
        dispatch(loadAll(allBusinesses));
        return allBusinesses;
    } else {
        const error = await response.json();
        return error;
    }
}

export const thunkGetOneBusiness = (businessId) => async (dispatch) => {
    const response = await fetch (`/api/businesses/${businessId}`)

    if (response.ok) {
        const oneBusiness = await response.json();
        dispatch(loadOne(oneBusiness));
        return oneBusiness;
    } else {
        const error = await response.json();
        return error;
    }
}

export const thunkCreateBusiness = (business) => async (dispatch) => {
    console.log('THIS IS INSIDE THE THUNK', business)
    const response = await fetch ('/api/businesses/new', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: business
    })
    if (response.ok) {
        const newBusiness = await response.json();
        dispatch(createBusiness(newBusiness));
        return newBusiness
    } else {
        const error = await response.json();
        return error
    }
}

const initialState = {
    allBusinesses: {},
    oneBusiness: {}
};

const businessReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL:
            return {
                ...state,
                allBusinesses: action.businesses
            }
        case LOAD_ONE:
            return {
                ...state,
                oneBusiness: action.business
            }
        case CREATE_BUSINESS:
            return {
                ...state, 
                allBusinesses: {
                    ...state.allBusinesses,
                    [action.business.id]: action.business
                }
            }
        default:
            return state
    }
}

export default businessReducer;