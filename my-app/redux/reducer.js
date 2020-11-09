import { actionTypes } from "./actionTypes";

export const initialState = {
  count: '0',
  isLogin: false,
  uname: '',
  loadHead: true
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.NAVCHANGE:
      return {
        ...state,
        count: action.text,
      }
    case 'loadHead':
      return {
        ...state,
        loadHead: action.text,
      }  
    case "loginSuccess":
      return {
          ...state,
          isLogin: true,
          uname: action.res.uname
      }
      break;  
    
    default:
      return state
  }
}

export default reducer;