import axios from './http'

const servicePath = {
    getArticleList(){
        return axios('/default/artical')
    },
    getArticleById(id, view_count){
        return axios(`/default/getArticleById/${id}?view_count=${view_count}`)
    },
    getTypeInfo(){
        return axios('/default/getTypeInfo')
    },
    getListById(id){
        return axios('/default/getListById/'+id)
    },
  
}
export default servicePath;