

let ipUrl = '/admin/'

let servicePath = {
    checkLogin: ipUrl + 'checkLogin', //  检查用户名密码是否正确
    getTypeInfo: ipUrl + 'getTypeInfo', //  获取文章类型
    addArtical: ipUrl + 'addArtical', //  添加文章
    delArtical: ipUrl + 'delArtical', //  删除文章
    updateArtical: ipUrl + 'updateArtical' ,//  修改文章
    getArticalList: ipUrl + 'getArticalList' ,//  文章列表
    getArticleById:ipUrl + 'getArticleById/' ,  //  根据ID获得文章详情
}
export default servicePath;