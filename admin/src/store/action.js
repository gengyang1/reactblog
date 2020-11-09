import { ADD } from './type'

export let addAction = (text)=>{
    return {
        type: ADD,
        text: text
    }
}