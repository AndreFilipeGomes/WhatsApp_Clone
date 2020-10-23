export const initialState = {
    user: null,
};

export const actionTypes = {
    SET_USER : "SET_USER"
}; 

const reducer = (state, action) =>{ 
    switch(action.type){
        case actionTypes.SET_USER:
            // console.log(action);
            return{
                ...state,
                user: action
            };

            default:
                return state;
    }

};

export default reducer 