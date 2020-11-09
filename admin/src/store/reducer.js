
let initialState = {
    num: 1
}

let addReducer = (state=initialState, action)=>{
     switch (action.type) {
         case "ADD":
             state.num++;
             return state;
             break;
     
         default:
             return state
             break;
     }
}

export default addReducer