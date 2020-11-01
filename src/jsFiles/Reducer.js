export const initialState = {
    filterRooms: [],
    rooms: [],
    user: null,
};

export const actionTypes = {
    SET_USER : 'SET_USER',
    ADD_ROOM: 'ADD_ROOM',
    FILTER_ROOMS: 'FILTER_ROOMS'
}; 

const reducer = (state, action) =>{ 
    
    switch(action.type){
        
        case actionTypes.SET_USER:
            
            return{
                ...state,
                user: action,
                rooms: []

            };

        case actionTypes.ADD_ROOM:
            //console.log(state);
            
            return{
                ...state,
                rooms: [...state.rooms, action.item.room],
                filterRooms: [...state.rooms, action.item.room]
            };
            
        case actionTypes.FILTER_ROOMS:
            
            return{
                ...state,
                filterRooms: state.rooms.filter(x => x.data.Name.toLowerCase().includes(action.value.toLowerCase()))
            }

        default:
            return state;
    }

};

export default reducer 
