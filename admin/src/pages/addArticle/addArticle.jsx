import React, { useState, useEffect } from "react";
import marked from "marked";
import "./addArticle.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import axios from "axios";
import servicePath from "../../config/apiUrl";
import moment from 'moment'

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(moment()); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState(1); //选择的文章类别

  useEffect(() => {
    getTypeInfo();
    let tmpId = props.match.params.id;
    if (tmpId) {
      console.log(tmpId);
      setArticleId(tmpId);
      getArticleById(tmpId);
    }else{
        let t = moment().format('YYYY-MM-DD HH:mm:ss')
        setShowDate(t)

    }
  }, []);

  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };

  const getTypeInfo = () => {
    axios({
      method: "get",
      url: servicePath.getTypeInfo,
      withCredentials: true,
    }).then((res) => {
      if (res.data.data == "没有登录") {
        localStorage.removeItem("openId");
        props.history.push("/");
      } else {
        setTypeInfo(res.data.data);
      }
    });
  };

  const selectTypeHandler = (val) => {
    setSelectType(val);
  };

  const saveArtical = () => {
    if (!selectedType) {
      message.error("必须选择文章类型");
      return false;
    } else if (!articleTitle) {
      message.error("文章名称不能为空");
      return false;
    } else if (!articleContent) {
      message.error("文章内容不能为空");
      return false;
    } else if (!introducemd) {
      message.error("文章简介不能为空");
      return false;
    } else if (!showDate) {
      message.error("发布日期不能为空");
      return false;
    }
    let dataProps = {};
    dataProps.type_id = selectedType;
    dataProps.title = articleTitle;
    dataProps.artical_content = articleContent;
    dataProps.introduce = introducemd;
    console.log(showDate);
    
    let dateText = showDate;
    dataProps.add_time = new Date(dateText).getTime() / 1000;
    console.log(articleId);
    if (articleId == 0) {
      dataProps.view_count = 0;
      axios({
        method: "POST",
        url: servicePath.addArtical,
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        setArticleId(res.data.insertId);
        if (res.data.isSuccess) {
          message.success("文章添加成功");
        } else {
          message.error("文章添加失败");
        }
      });
    } else {
      dataProps.id = articleId;

      axios({
        method: "POST",
        url: servicePath.updateArtical,
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        if (res.data.isSuccess) {
          console.log(props);
          message.success("文章保存成功");
          props.history.push('/index')

        } else {
          message.error("文章保存失败");
        }
      });
    }
  };

  const getArticleById = (id) => {
    axios(servicePath.getArticleById + id, {
      withCredentials: true,
      header: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      console.log(res);
      
      //let articleInfo= res.data.data[0]
      setArticleTitle(res.data.data[0].title);
      setArticleContent(res.data.data[0].artical_content);
      let html = marked(res.data.data[0].artical_content);
      setMarkdownContent(html);
      setIntroducemd(res.data.data[0].introduce);
      let tmpInt = marked(res.data.data[0].introduce);
      setIntroducehtml(tmpInt);

      setShowDate( moment(res.data.data[0].addTime) );
      setSelectType(res.data.data[0].typeId);
    });
  };

  return (
    <div>
      <Row gutter={20}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={15}>
              <Input
                placeholder="博客标题"
                value={articleTitle}
                size="default"
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
              />
            </Col>
            <Col span={9} className="ds">
              {typeInfo.length > 0 ? (
                <Select
                  defaultValue={selectedType}
                  size="default"
                  onChange={selectTypeHandler}
                  getPopupContainer={() => document.getElementById("root")}
                >
                  {typeInfo.map((item, index) => {
                    return (
                      <Option value={item.kid} key={index}>
                        {item.type_name}
                      </Option>
                    );
                  })}
                </Select>
              ) : null}
            </Col>
          </Row>
          <br />
          <Row gutter={15}>
            <Col span={12}>
              <TextArea
                value={articleContent}
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                onChange={changeContent}
                onPressEnter={changeContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="default">暂存文章</Button>&nbsp;
              <Button type="primary" size="default" onClick={saveArtical}>
                发布文章
              </Button>
              <TextArea
                rows={4}
                value={introducemd}
                placeholder="文章简介"
                className="textAk"
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
              />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
            <Col span={24}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  size="default"
                  format= "YYYY-MM-DD HH:mm:ss"
                  value = {moment(showDate,"YYYY-MM-DD HH:mm:ss") }
                  onChange={(date, dateString) => {
                    setShowDate(dateString);
                  }}
                  getCalendarContainer={() => document.getElementById("root")}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default AddArticle;
