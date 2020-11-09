import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import { Provider } from 'react-redux'
import Login from './login/login'
import Index from './index/index'
import store from '../store/index'

function Main(){
    return (
        <Provider store={store}>
          <Router>  
             <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/index" component={Index} />
                <Redirect to="/"/>
             </Switch>  
          </Router>
        </Provider>
       
    )
}
export default Main
