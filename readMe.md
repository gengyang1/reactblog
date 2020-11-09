1.脚手架
create-next-app   yarn cache clean
npx create-next-app 项目名称

2.路由

文件夹自动配置路由
import Link from 'next/link'
import Router from 'next/router'
<Link href="/user"><a>用户</a></Link>
Router.push()

- ## 传参数

import Router from 'next/router'
    <Link href="/user?id=10"><a>用户</a></Link>

    Router.push({
        pathname:'/user',
        query: {
        id: 20
        }
    })


    let  User = ({router})=>{
        return(
            <>
            <List>
                我是子组件的内容112223
                {router.query.id}
            </List>
            </>
        )
    }

    export default withRouter(User)

   - ## 路由钩子
   
      Router.events.on('routeChangeStart',(...args)=>{
        console.log('1.routeChangeStart->路由开始变化,参数为:',...args)
      })
    
      Router.events.on('routeChangeComplete',(...args)=>{
        console.log('2.routeChangeComplete->路由结束变化,参数为:',...args)
      })
    
      Router.events.on('beforeHistoryChange',(...args)=>{
        console.log('3,beforeHistoryChange->在改变浏览器 history之前触发,参数为:',...args)
      })
    
      Router.events.on('routeChangeError',(...args)=>{
        console.log('4,routeChangeError->跳转发生错误,参数为:',...args)
      })
     
      Router.events.on('hashChangeStart',(...args)=>{
        console.log('5,hashChangeStart->hash跳转开始时执行,参数为:',...args)
      })
    
      Router.events.on('hashChangeComplete',(...args)=>{
        console.log('6,hashChangeComplete->hash跳转完成时,参数为:',...args) 
      })


     
4. 获取数据 

import axios from 'axios'

let Getdata = ({list}) => {
  return (
    <>
      <div>
        {
          list.map((item)=>{
             return <div key={item}>{item}</div>
          })
        }
      </div>
    </>
  );
};
Getdata.getInitialProps = async ()=>{
  return await new Promise((resoleve, reject)=>{
       axios("http://localhost:8888/api").then((res)=>{
           resoleve({
             list: res.data.list
           })
       })
   })
}


export default Getdata;


5. 样式
       <style jsx>
        {`
           .list{
              color: ${color};
           }
        
        `}
      </style>

6. 懒加载

```
    import React, {useState} from 'react'
    //删除import moment
    function Time(){
        
        const [nowTime,setTime] = useState(Date.now())

        const changeTime= async ()=>{ //把方法变成异步模式
            const moment = await import('moment') //等待moment加载完成
            setTime(moment.default(Date.now()).format()) //注意使用defalut
        }
        return (
            <>
                <div>显示时间为:{nowTime}</div>
                <div><button onClick={changeTime}>改变时间格式</button></div>
            </>
        )
    }
    export default Time


    import dynamic from 'next/dynamic'
    const One = dynamic(import('../components/one'))

```