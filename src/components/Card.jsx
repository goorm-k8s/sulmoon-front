import React from 'react'
import "./Card.css"
import StorageIcon from '@material-ui/icons/Storage';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import doc_image from "./t-shirt.png"
// import { useHistory } from "react-router-dom";


function Card({ title }) {
    // const history = useHistory();

    function handleMoveSurvey() {
        // TODO: 설문 페이지로 이동하기
        // var fname=docname.split(".");
        // history.push("/form/" + fname[0])
    }

    return (
        <div className="doc_card" onClick={handleMoveSurvey}>
             {/* <img src={doc_image} className="doc_card_image"></img> */}
             <div className="doc_card_content">
                <h5 style={{overFlow:"ellipsis"}}>{title ? title : " Untitled Doc" }</h5>
                <div className="doc_content">
                    <div className="content_left" style={{fontSize:"12px",color:"grey"}}>
                        <StorageIcon style={{ color: "white", fontSize: "12px", backgroundColor: "#6E2594", padding: "3px", marginRight: "3px", borderRadius: "2px" }} />
                        Opened 6 Jan 2021
                    </div>
                    
                     <MoreVertIcon style={{color:"grey",fontSize:"16px"}} />
                </div>
             </div>
        </div>
    )
}

export default Card
