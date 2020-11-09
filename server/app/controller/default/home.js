'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api接口';
  }
  async getArticalList() {
    const sql = `SELECT 
    artical.id as id,
    artical.title as title,
    artical.introduce as introduce,
    artical.artical_content as artical_content,
    FROM_UNIXTIME(artical.add_time,'%Y-%m-%d %H:%i:%s') as add_time,
    artical.view_count as view_count,
    type.type_name as type_name 
    FROM artical LEFT JOIN type ON artical.type_id = type.kid`;
    const resd = await this.app.mysql.query(sql);
    console.log(resd);
    this.ctx.body = resd;
  }
  async getArticleById() {
    console.log(this.ctx.query);
    const id = this.ctx.params.id;
    let view_count = parseInt(this.ctx.query.view_count);
    const resUp = await this.app.mysql.update('artical',{id:id, view_count: view_count+1});
    const sql =
      `SELECT artical.id as id,
      artical.title as title,
      artical.introduce as introduce,
      artical.artical_content as artical_content,
      FROM_UNIXTIME(artical.add_time,'%Y-%m-%d %H:%i:%s' ) as add_time,
      artical.view_count as view_count ,
      type.type_name as type_name ,
      type.kid as typeId 
      FROM artical LEFT JOIN type ON artical.type_id = type.kid 
      WHERE artical.id = ${id}`;

    const result = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: result,
    };
  }

  // 得到类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = {
      data: result,
    };

  }
  // 根据类别ID获得文章列表
  async getListById() {
    const id = this.ctx.params.id;
    const sql =
    `SELECT artical.id as id,
    artical.title as title,
    artical.introduce as introduce,
    artical.artical_content as artical_content,
    DATE_FORMAT(artical.add_time,'%Y-%m-%d %H:%i:%s' ) as add_time,
    artical.view_count as view_count ,
    type.type_name as type_name ,
    type.kid as typeId 
    FROM artical LEFT JOIN type ON artical.type_id = type.kid 
    WHERE type_id = ${id}`;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };

  }
}

// eslint-disable-next-line eol-last
module.exports = HomeController;