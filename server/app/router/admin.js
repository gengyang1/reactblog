"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    var adminauth = app.middleware.adminauth()
    router.get("/admin/index", controller.admin.main.index);
    router.post("/admin/checkLogin", controller.admin.main.checkLogin);
    router.get("/admin/getTypeInfo", adminauth , controller.admin.main.getTypeInfo);
    router.post("/admin/addArtical", adminauth , controller.admin.main.addArtical);
    router.post("/admin/updateArtical", adminauth , controller.admin.main.updateArtical);
    router.get("/admin/getArticalList", adminauth , controller.admin.main.getArticalList);
    router.get("/admin/delArtical", adminauth , controller.admin.main.delArtical);
    router.get("/admin/getArticleById/:id" , adminauth , controller.admin.main.getArticleById);
};
