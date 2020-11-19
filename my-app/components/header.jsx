import React, { useState, useEffect } from 'react'
import Router, {withRouter} from 'next/router'
import {Row,Col, Menu, Icon, Spin} from 'antd'
import servicePath from '../config/api'
import { connect } from 'react-redux'
import { changeNav, setLoadHead } from '../redux/actions'
 

const Header = ({router, count, changeNav, loadHead, setLoadHead }) => {
    let [navList, setNavlist]= useState([]);
    let [navState, setNavState]= useState('0');
  
    useEffect(()=>{
        let fetchData = async ()=>{
            setLoadHead(true)
            let result = await servicePath.getTypeInfo();
            setLoadHead(false)
            setNavlist(result.data.data)
        }
         fetchData();
    },[])

    let  handleClick = e => {
        if(e.key==count){
          return
        }
        if(e.key == 0){            
            Router.push('/');
            changeNav(e.key+'')
        }else{
           
            Router.push('/list?id='+e.key);
            changeNav(e.key+'')
        }
    };

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col className="sy_left"  xs={24} sm={24} md={10} lg={10} xl={10}>
                    <span className="header-logo">天马行空</span>
                    <span className="header-txt">专注前端开发</span>
                </Col>
            
                <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={8}>
                 <Spin spinning={loadHead}>
                    <Menu  mode="horizontal" onClick={handleClick} selectedKeys={[count]}>
                        <Menu.Item key="0">
                            <Icon type="home" />
                            首页
                        </Menu.Item>
                        {
                           navList.map( (item) => {                               
                               return <Menu.Item key={item.kid}>
                                        <Icon type={item.icon}/>{item.type_name}
                                    </Menu.Item>
                           })   
                        }
                    </Menu>
                    </Spin>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        count: state.count,
        loadHead: state.loadHead
    }
}


export default  withRouter(connect( mapStateToProps, { changeNav, setLoadHead })(Header))
