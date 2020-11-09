import {call, put, takeEvery} from 'redux-saga/effects'

// 模拟登录
const UserService = {
    login(uname){
        return new Promise((resolve, reject)=>{
           setTimeout(()=>{
               if(uname==='Jerry'){
                   resolve({
                      uname: 'Jerry',
                      id: 1,
                      age: 20
                   })
               }else{
                   reject("用户名或密码错误")
               }
           },1000)
        })
    }
}

// worker Saga
 function* login(action){
     try {
      
        let res = yield call(UserService.login, action.uname);
         
        yield put({type:'loginSuccess', res});
         
     } catch (error) {
        console.log(error);
         
     }
     
 }

 function *MySaga(){
     yield takeEvery('login',login)
 }

 export default MySaga