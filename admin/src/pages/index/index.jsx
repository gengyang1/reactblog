import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React, { useState } from 'react';
import { Route, Redirect } from "react-router-dom";
import "./index.css"
import AddArticle from '../addArticle/addArticle'
import ArticleList from '../articleList/articleList';
import { connect } from 'react-redux'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

let Add = ()=>{
    return (
        <div>usdsd</div>
    )
}

const Index = (props)=>{
    
    let [collapsed, setCollapsed] = useState(false);

    let onCollapse = collapsed => {
        setCollapsed(collapsed)
    };

    let handleClickArticle = e =>{
      
        if(e.key=='addArticle'){
           props.history.push('/index/add')
        }else if(e.key=='articleList'){
           props.history.push('/index')
        }
    }


    return (
      <>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider 
             collapsible 
             collapsed={collapsed}
             onCollapse={onCollapse}
             style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}>
            <div className="logo" />
            <Menu theme="dark" defaultOpenKeys={['sub1']} defaultSelectedKeys={["articleList"]} mode="inline" onClick={handleClickArticle}>
              
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    <span>文章管理</span>
                  </span>
                }
              >
              
                <Menu.Item key="articleList">文章列表</Menu.Item>
                <Menu.Item key="addArticle">添加文章</Menu.Item>
              </SubMenu>

              <Menu.Item key="9">
                <Icon type="file" />
                <span>留言管理</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                <Breadcrumb.Item>工作台</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                <Route path="/index" exact component={ArticleList} />
                <Route path="/index/add" exact component={AddArticle} />
                <Route path="/index/add/:id" exact component={AddArticle} />
  
              </div>
            </Content>
              <Footer style={{ textAlign: "center" }}>gy博客{ props.num }</Footer>
          </Layout>
        </Layout>
      </>
    );
      
}

const mapStateToProps = (state, ownProps) => {
    return {
      num: state.num
    }
}




export default connect(mapStateToProps)(Index)