import {
     createStore
} from 'redux'
import rootReducer from './reducer.js'

let store = createStore(rootReducer)



export default store