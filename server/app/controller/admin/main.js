"use strict";

const Controller = require("egg").Controller;

class MainController extends Controller {
  async index() {
    this.ctx.body = "ewqeqz";
  }
  // 判断用户名密码是否正确
  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql =
      `SELECT userName FROM admin_user WHERE userName = '${userName}' AND password = '${password}'`;
    const res = await this.app.mysql.query(sql);

    console.log(res)
    if (res.length > 0) {
      // 登录成功,进行session缓存
      const openId = new Date().getTime();
      this.ctx.session.openId = {
        openId: openId
      };
      this.ctx.body = {
        data: "登录成功",
        openId: openId
      };
    } else {
      this.ctx.body = {
        data: "登录失败"
      };
    }
  }
  async getTypeInfo() {
    let resType = await this.app.mysql.select('type')
    this.ctx.body = {
      data: resType
    }
  }

  async delArtical() {
    let id = this.ctx.query.id;

    let result = await this.app.mysql.delete('artical', {
      id: id
    });

    let success = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: success
    }
  }

  async addArtical() {
    let tmpArtical = this.ctx.request.body;
    let result = await this.app.mysql.insert('artical', tmpArtical);
    let insertSuccess = result.affectedRows === 1;
    let insertId = result.insertId;
    this.ctx.body = {
      insertId: insertId,
      isSuccess: insertSuccess
    }
  }

  async updateArtical() {
    let tmpArtical = this.ctx.request.body;
    let result = await this.app.mysql.update('artical', tmpArtical);
    let updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess
    }
  }
    async getArticalList() {
      const sql =
        `select 
            id,
            title,
            type_name,
            add_time,
            view_count
            from 
            artical as Q
            left join type as A on Q.type_id=A.kid`;
      const res = await this.app.mysql.query(sql);
      this.ctx.body = {
        data: res
      }
    }
    //根据文章ID得到文章详情，用于修改文章
   async getArticleById(){
    let id = this.ctx.params.id

    let sql = 'SELECT artical.id as id,'+
    'artical.title as title,'+
    'artical.introduce as introduce,'+
    'artical.artical_content as artical_content,'+
    "FROM_UNIXTIME(artical.add_time,'%Y-%m-%d' ) as addTime,"+
    'artical.view_count as view_count ,'+
    'type.type_name as typeName ,'+
    'type.kid as typeId '+
    'FROM artical LEFT JOIN type ON artical.type_id = type.kid '+
    'WHERE artical.id='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}
  }

}

   
module.exports = MainController;