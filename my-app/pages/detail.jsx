import React,{useState} from 'react'
import Head from 'next/head'
import {Row, Col , Icon ,Breadcrumb, Affix  } from 'antd'
import axios from 'axios'
import Header from '../components/header'
import Author from '../components/author'
import Ad from '../components/ad'
import Footer from '../components/footer'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/api'

let Detail = (props)=>{
    const renderer = new marked.Renderer();
    const tocify = new Tocify();
    renderer.heading = (text, level, raw)=>{
       let anchor = tocify.add(text, level);
       return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
    }

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

    let html = marked(props.artical_content) 
    return (
        <>
          <Head>
            <title>博客详细页</title>
          </Head>
          <Header />
          <Row className="main" type="flex" justify="center">
            <Col className="main_left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                <div>
                  <div className="bread-div">
                    <Breadcrumb>
                      <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                      <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                      <Breadcrumb.Item> {props.title} </Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
    
                 <div className="hold">
                    <div className="detailed-title">
                         {props.title}
                    </div>
                    <div className="list_icon center">
                      <span><Icon type="calendar" /> {props.add_time} </span>
                      <span><Icon type="folder" /> {props.type_name}</span>
                      <span><Icon type="fire" /> {props.view_count}人</span>
                    </div>
                    <div className="detailed-content" dangerouslySetInnerHTML={{__html: html}}></div>
                 </div>
                </div>
            </Col>
      
            <Col className="main_right" xs={0} sm={0} md={7} lg={5} xl={4}>
              <Author />
              <Ad />
              <Affix offsetTop={5}>
                    <div className="detailed-nav comm-box">
                        <div className="nav-title">文章目录</div>
                        {tocify && tocify.render()}
                    </div>
             </Affix>
    
            </Col>
          </Row>
          <Footer/>
      
       </>
      )
    
}

Detail.getInitialProps = async (context)=>{
   let id = context.query.id;
   let view_count = context.query.view_count;
   try {

    let res = await servicePath.getArticleById(id, view_count);
    return res.data.data[0]
  
   } catch (error) {
     console.log(error);
     
   }
   
}

export default Detail;
