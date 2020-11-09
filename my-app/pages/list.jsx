import React,{ useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import {Button, Row,Col, List, Icon, Breadcrumb} from 'antd'
import Header from '../components/header'
import Author from '../components/author'
import Ad from '../components/ad'
import Footer from '../components/footer'
import servicePath from '../config/api'
import axios from 'axios'
import { useEffect } from 'react'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const MyList = ({list}) => {

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
      }
    }); 

  let [indexList, setIndexList] = useState(list);
      
  useEffect(()=>{
    setIndexList(list)
  },[list])

  return (
      <>
        <Head>
          <title>列表页</title>
        </Head>
        <Header />
        <Row className="main" type="flex" justify="center">
           <Col className="main_left" xs={24} sm={24} md={16} lg={18} xl={14}>
                <div className="bread-div">
                    <Breadcrumb>
                        <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                        <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
              <List
                className="mn_list"
                header={<div className="mn_pick">最新日志</div>}
                itemLayout="vertical"
                dataSource={indexList}
                renderItem={(item)=>(
                  <List.Item>
                     <div className="listTile">
                      <Link href={{pathname:'/detail',query:{id:item.id, view_count: item.view_count}}}>
                          <a>{item.title}</a>
                      </Link>
                     </div>
                     <div className="list_icon">
                      <span><Icon type="calendar" /> {item.add_time}</span>
                      <span><Icon type="folder" /> {item.type_name}</span>
                      <span><Icon type="fire" /> {item.view_count}人</span>
                    </div>
                    <div className="listContent" dangerouslySetInnerHTML={{__html: marked(item.introduce)}}></div>
                  </List.Item>
                )}
              
              />
           </Col>
           <Col className="main_right" xs={0} sm={0} md={7} lg={5} xl={4}>
              <Author/>
              <Ad/>
             
           </Col>
        </Row>
        <Footer/>
      </>
  )
}

MyList.getInitialProps = async (context)=>{
  let id = context.query.id;
  try {
    let res = await servicePath.getListById(id);
    return {list: res.data.data}
    
  } catch (error) {
     console.log(error)
  }
 
}




export default MyList
