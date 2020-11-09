import axios from 'axios'
import { useState, useEffect } from 'react'


let Getdata = ({list}) => {

  let [color, setColor] = useState('red')
  
  let changeColor = ()=>{
     setColor("green")
  }

  return (
    <>
      <div>
        {
          list.map((item)=>{
             return <div className="list" key={item}>{item}</div>
          })
        }
        <button onClick={changeColor}>改颜色</button>
      </div>
      <style jsx>
        {`
           .list{
              color: ${color};
           }
        
        `}
      </style>
    </>
  );
};
Getdata.getInitialProps = ()=>{
  
}


export default Getdata;
