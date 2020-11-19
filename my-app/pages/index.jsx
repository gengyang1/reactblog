import React,{ useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import {Button, Row,Col, List, Icon, Spin} from 'antd'
import Header from '../components/header'
import Author from '../components/author'
import Ad from '../components/ad'
import Footer from '../components/footer'
import servicePath from '../config/api'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import { connect } from 'react-redux'
import { login } from '../redux/actions'

const Home = ({ list, uname, isLogin, loadHead }) => {
  useEffect(() => {
    login("Jerry");
  }, []);
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  let [indexList, setIndexList] = useState(list);
  return (
    <>
      <Head>
        <title>天马行空</title>
      </Head>
      <Header />

      <Row className="main" type="flex" justify="center">
        <Col className="main_left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            className="mn_list"
            header={<div className="mn_pick"> GY </div>}
            itemLayout="vertical"
            dataSource={indexList}
            renderItem={(item) => (
              <List.Item>
                <div className="listTile">
                  <Link
                    href={{
                      pathname: "/detail",
                      query: { id: item.id, view_count: item.view_count },
                    }}
                  >
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list_icon">
                  <span>
                    <Icon type="calendar" />
                    {item.add_time}
                  </span>
                  <span>
                    <Icon type="folder" /> {item.type_name}
                  </span>
                  <span>
                    <Icon type="fire" /> {item.view_count}人
                  </span>
                </div>
                <div
                  className="listContent"
                  dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                ></div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="main_right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Ad />
        </Col>
      </Row>
      <Footer />
    </>
  );
};


Home.getInitialProps = async ()=>{

    try {

       let res = await servicePath.getArticleList();
       return {list: res.data}

    } catch (error) {
        console.log(error);
    }
}


const mapStateToProps = (state, ownProps) => {
  return {
      count: state.count,
      isLogin: state.isLogin,
      uname: state.uname,
      loadHead: state.loadHead
  }
}


export default connect( mapStateToProps, { login })(Home)

