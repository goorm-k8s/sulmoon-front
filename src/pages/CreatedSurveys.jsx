import React,{useState,useEffect} from 'react'
import "./CreatedSurveys.css"
import StorageIcon from '@material-ui/icons/Storage';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import { IconButton } from '@material-ui/core';
import Card from "src/components/Card"


function CreatedSurveys() {
  const [surveys, setSurveys] = useState([]);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  
  useEffect(() => {
    (async () => {
      const response = await fetch(`http://3.35.95.59:10000/api/surveys/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
          }
          })
        setSurveys(await response.json());
        })();
    }, [token, userId])

  return (
    <div className="mainbody">
      <div className="main_top">
        <div className="main_top_left" style={{fontSize:"16px",fontWeight:"500"}}>Recent forms</div>
          <div className="main_top_right">
            <div className="main_top_center" style={{fontSize:"14px",marginRight:"125px"}}>Owned by anyone <ArrowDropDownIcon/></div>
              <IconButton >
                <StorageIcon style={{    fontSize: '16px',color:"black"}}/>
              </IconButton>
              <IconButton >
                <FolderOpenIcon style={{    fontSize: '16px',color:"black"}}/>
              </IconButton>
            </div>
          </div>
        <div className="main_docs">
                {
                  surveys.length === 0 ?
										(<p>생성한 설문이 없습니다.</p>)
            : surveys.map(survey => <Card key={survey.id} title={survey.title} id={survey.id}/>)
                }
      </div>
    </div>
  )
}

export default CreatedSurveys;
