import React, { useState, useEffect } from "react";
import marked from "marked";
import "./articleList.css";
import { List, Row, Col, Button, message, Modal } from "antd";
import axios from "axios";
import servicePath from "../../config/apiUrl";
const { confirm } = Modal;

function ArticleList(props) {
  let [listd, setListd] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  function time(time = +new Date()) {
    var date = new Date(time + 8 * 3600 * 1000);
    return date.toJSON().substr(0, 19).replace("T", " ")
  }

  const getList = () => {
    axios({
      method: "get",
      url: servicePath.getArticalList,
      withCredentials: true,
    }).then((res) => {
      console.log(res.data.data);
      setListd(res.data.data);
    });
  };

  let delList = (id) => {
    axios({
      method: "get",
      params: {
        id: id,
      },
      url: servicePath.delArtical,
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      message.success("删除成功");
      if (res.data.isSuccess) {
        getList();
      }
    });
  };

  //修改文章
    const updateArticle = (id) => {
        props.history.push('/index/add/'+id)
    }

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={listd}
        renderItem={(item) => {
          return (
            <List.Item>
              <Row className="list-div">
                <Col span={8}>{item.title}</Col>
                <Col span={4}>{item.type_name}</Col>
                <Col span={4}>{time(item.add_time * 1000)}</Col>
                <Col span={4}>{item.view_count}</Col>
                <Col span={4}>
                  <Button size='small' onClick={ () => updateArticle(item.id) } type="primary" className="resetBtn">
                    修改
                  </Button>
                  <Button
                    size='small'
                    onClick={() => {
                      delList(item.id);
                    }}
                  >
                    删除
                  </Button>
                </Col>
              </Row>
            </List.Item>
          );
        }}
      />
    </div>
  );
}

export default ArticleList;
