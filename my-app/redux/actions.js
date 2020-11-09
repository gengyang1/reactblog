import { actionTypes } from "./actionTypes";


export function changeNav(data) {
  return {
    type: actionTypes.NAVCHANGE,
    text: data
  };
}

export let login = (uname)=>{
  return {
      type: 'login',
      uname
  }
}

export let setLoadHead = (data)=>{
  return {
      type: 'loadHead',
      text: data
  }
}
