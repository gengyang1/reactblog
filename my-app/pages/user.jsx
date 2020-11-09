import List from "../components/list"
import Link from 'next/link'
import {withRouter} from "next/router"

let  User = ({router})=>{
    return(
        <>
          <Link href="/"><a>首页</a></Link>
          <div>gy</div>
          <List>
              我是子组件的内容112223
              {router.query.id}
          </List>
        </>
    )
}

export default withRouter(User)