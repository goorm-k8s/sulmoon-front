import React,{useState,useEffect} from 'react'
import "./Question_form.css"

import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ShortTextIcon from '@material-ui/icons/ShortText';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import SubjectIcon from '@material-ui/icons/Subject';
import BackupIcon from '@material-ui/icons/Backup';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AppsIcon from '@material-ui/icons/Apps';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {BsTrash} from "react-icons/bs"
import Checkbox from '@material-ui/core/Checkbox';
import { IconButton } from '@material-ui/core';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import TextFieldsIcon from '@material-ui/icons/TextFields';
// import CenteredTabs from "./Tabs" 

// ------------------------------------------

import {Grid} from '@material-ui/core';
import {BsFileText} from "react-icons/bs"
import { Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import {FcRightUp} from "react-icons/fc"
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccordionActions from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import SaveIcon from '@material-ui/icons/Save';

import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
import { useParams } from "react-router";
import axios from "axios";

function Question_form() {
  const [{a = {}}, dispatch] = useStateValue();
    const [questions,setQuestions] =useState([]); 
    const [documentName,setDocName] =useState("untitled Document"); 

    const [documentDescription,setDocDesc] =useState("Add Description"); 

    const [questionType,setType] =useState("radio");
    const [questionRequired,setRequired] =useState("true"); 
    let { id } = useParams();
    
    console.log(id)
    useEffect(()=>{
        var newQuestion = {questionText: "Question",answer:false,answerKey:"",questionType:"radio", options : [{optionText: "Option 1"}], open: true, required:false}

           setQuestions([...questions, newQuestion])
      
    },[])
 
   useEffect(()=>{
    async function data_adding(){
      var request = await axios.get(`http://localhost:9000/data/${id}`);
      console.log("sudeep")
      var question_data=request.data.questions;
      console.log(question_data)
      var doc_name=request.data.document_name
      var doc_descip = request.data.doc_desc
      console.log(doc_name+" "+doc_descip)
      setDocName(doc_name)
      setDocDesc(doc_descip)
      setQuestions( question_data)
      dispatch({
        type: actionTypes.SET_DOC_NAME,
        doc_name: doc_name

     }) 

      dispatch({
        type: actionTypes.SET_DOC_DESC,
        doc_desc: doc_descip

   })
      dispatch({
          type: actionTypes.SET_QUESTIONS,
          questions:question_data

       })
    }

    data_adding()
    },[])

    function changeType(e){
      // dispatch({
      //   type:"CHANGE_TYPE",
      //   questionType:e.target.id
      // })
      setType(e.target.id)

    }


    useEffect(()=>{
      setType(questionType)
     },[changeType])
   
    function saveQuestions(){
        console.log("auto saving questions initiated");
        var data = {
          formId: "1256",
          name: "My-new_file",
          description: "first file",
          questions: questions
        }
    
        setQuestions(questions)
        
      }

      

      function commitToDB(){
        console.log(questions);
        dispatch({
          type: actionTypes.SET_QUESTIONS,
           questions:questions

         })

         axios.post(`http://localhost:9000/add_questions/${id}`,{
          "document_name": documentName,
          "doc_desc": documentDescription,
          "questions": questions,
          
          
      
        })
      }
    
    
    
      function addMoreQuestionField(){
          expandCloseAll(); //I AM GOD
    
          setQuestions(questions=> [...questions, {questionText: "Question", questionType:"radio", options : [{optionText: "Option 1"}], open: true, required:false}]);
      }

      function addQuestionType(i,type){
        let qs = [...questions];  
        console.log(type)
        qs[i].questionType = type;
        
        setQuestions(qs);
        
      }
    
  
    // function copyQuestion(i){
    //   expandCloseAll()
    //   let qs = [...questions]
    //   var newQuestion = qs[i]

    //   setQuestions([...questions, newQuestion])

    // }
    
      function deleteQuestion(i){
        let qs = [...questions]; 
        if(questions.length > 1){
          qs.splice(i, 1);
        }
        setQuestions(qs)
      }
      
      function handleOptionValue(text,i, j){
        var optionsOfQuestion = [...questions];
        optionsOfQuestion[i].options[j].optionText = text;
        //newMembersEmail[i]= email;
        setQuestions(optionsOfQuestion);
      }
    
      function handleQuestionValue(text, i){
        var optionsOfQuestion = [...questions];
        optionsOfQuestion[i].questionText = text;
        setQuestions(optionsOfQuestion);
      }
    
      function onDragEnd(result) {
          if (!result.destination) {
            return;
          }
          var itemgg = [...questions];
          const itemF = reorder(
            itemgg,
            result.source.index,
            result.destination.index
          );
          setQuestions(itemF);
      }
    
      const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
      };

      function showAsQuestion(i){
        let qs = [...questions];  
         qs[i].open = false;
         setQuestions(qs);
      }

      function addOption(i){
        var optionsOfQuestion = [...questions];
        if(optionsOfQuestion[i].options.length < 5){
          optionsOfQuestion[i].options.push({optionText: "Option " + (optionsOfQuestion[i].options.length + 1)})
        } else{
          console.log("Max  5 options ");  
        }
        //console.log(optionsOfQuestion);
        setQuestions(optionsOfQuestion)
      }
    
      function setOptionAnswer(ans,qno){
        var Questions = [...questions];
  
          Questions[qno].answer = ans;
        

        setQuestions(Questions)
        console.log(qno+" "+ans)
      }

      function setOptionPoints(points,qno){
        var Questions = [...questions];
  
          Questions[qno].points = points;
        

        setQuestions(Questions)
        console.log(qno+" "+points)
      }
      function addAnswer(i){
        var answerOfQuestion = [...questions];
        
          answerOfQuestion[i].answer= !answerOfQuestion[i].answer;
        
        setQuestions(answerOfQuestion)
      }
    
      function doneAnswer(i){
        var answerOfQuestion = [...questions];
        
          answerOfQuestion[i].answer= !answerOfQuestion[i].answer;
        
        setQuestions(answerOfQuestion)
      }

      function requiredQuestion(i){
        var requiredQuestion = [...questions];
      
          requiredQuestion[i].required =  ! requiredQuestion[i].required
        
        console.log( requiredQuestion[i].required+" "+i);
        setQuestions(requiredQuestion)
      }
    

      function removeOption(i, j){
        var optionsOfQuestion = [...questions];
        if(optionsOfQuestion[i].options.length > 1){
          optionsOfQuestion[i].options.splice(j, 1);
          setQuestions(optionsOfQuestion)
          console.log(i + "__" + j);
        }   
      }
    
      function expandCloseAll(){
        let qs = [...questions]; 
         for (let j = 0; j < qs.length; j++) {  
          qs[j].open = false;
         }
         setQuestions(qs);
      }
    
      function handleExpand(i){
        let qs = [...questions]; 
        for (let j = 0; j < qs.length; j++) {
          if(i ===j ){
            qs[i].open = true;
     
          } else{
            qs[j].open = false;
           }
        }
         setQuestions(qs);
      }
    
      function questionsUI(){
        return  questions.map((ques, i)=> (
          <Draggable key={i} draggableId={i + 'id'} index={i}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div>
              <div style={{marginBottom: "0px"}}>
                <div style={{width:'100%', marginBottom: '0px' }}>
                  <DragIndicatorIcon style={{transform: "rotate(-90deg)", color:'#DAE0E2',position:"relative",left:"300px"}} fontSize="small"/>
                </div>
              
                <Accordion onChange={()=>{handleExpand(i)}} expanded={questions[i].open} 
                
                    className={questions[i].open ? 'add_border' : ""} >
                  <AccordionSummary            
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    elevation={1} style={{width:'100%'}}
                  >
                    { !questions[i].open ? (

                        
                  <div className="saved_questions">
                    
                    
                    <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom:"8px"}} >{i+1}.  {ques.questionText}</Typography>
    
                    
                    {ques.options.map((op, j)=>(
                     
                     <div key={j} >
                       <div style={{display: 'flex',}}>
                        <FormControlLabel style={{marginLeft:"5px",marginBottom:"5px"}} disabled control={<input type={ques.questionType} color="primary" style={{marginRight: '3px', }} required={ques.type}/>} label={
                            <Typography style={{fontFamily:' Roboto,Arial,sans-serif',
                                fontSize:' 13px',
                                fontWeight: '400',
                                letterSpacing: '.2px',
                                lineHeight: '20px',
                                color: '#202124'}}>
                              {ques.options[j].optionText}
                            </Typography>
                          } />
                       </div>
    
                     
                     </div>

                         

                    ))}  
                  </div>            
                  ): ""}   
                  </AccordionSummary>
                      <div className="question_boxes">
                      {!ques.answer ? (<AccordionDetails className="add_question" >
                         
                        <div >
                            <div className="add_question_top">
                                <input type="text" className="question" placeholder="Question"    value={ques.questionText} onChange={(e)=>{handleQuestionValue(e.target.value, i)}}></input>
                                <CropOriginalIcon style={{color:"#5f6368"}} />
                                
                                <Select className="select" style={{color:"#5f6368",fontSize:"13px"}} >
                                    {/* <MenuItem value="radio" className="menuitem" >
                                     <ShortTextIcon style={{marginRight:"10px"}} /> <span style={{marginBottom:"10px"}}>Short Paragraph</span></MenuItem>
                                     */}
                                    {/* <MenuItem id="text" value="Text" onClick= {()=>{addQuestionType(i,"text")}}> <SubjectIcon style={{marginRight:"10px"}} />  Paragraph</MenuItem> */}
                                    
                                    {/* <MenuItem id="checkbox"><RadioButtonCheckedIcon checked style={{marginRight:"10px", color:"#70757a"}}/> Multiple Choice</MenuItem> */}
                                    {/* <MenuItem id="checkbox"  value="Checkbox" onClick= {()=>{addQuestionType(i,"checkbox")}}><CheckBoxIcon style={{marginRight:"10px" ,color:"#70757a"}} checked /> Checkboxes</MenuItem> */}
                                    <MenuItem id="radio" value="Radio" onClick= {()=>{addQuestionType(i,"radio")}}> <Radio style={{marginRight:"10px",color:"#70757a"}} checked/> Multiple Choice</MenuItem>
                                    {/* <MenuItem value="40"> <BackupIcon style={{marginRight:"10px"}} /> File Upload</MenuItem>
                                    <MenuItem value="50"> <LinearScaleIcon style={{marginRight:"10px"}} /> Linear Scale</MenuItem>
                                    <MenuItem value="60"> <AppsIcon style={{marginRight:"10px"}} /> Tick-box grid</MenuItem>
 */}

                                    {/* <MenuItem value="aate"  onClick= {(e)=>{setType(e.target.id)}}> <EventIcon style={{marginRight:"10px"}} /> Date</MenuItem>
                                    <MenuItem value="date"  onClick= {(e)=>{setType(e.target.id)}}> <ScheduleIcon style={{marginRight:"10px"}} /> Time</MenuItem>
 */}

                                </Select>
                                    
                                        
                            </div>
                    
                    
    
                 
                            {ques.options.map((op, j)=>(
                                <div className="add_question_body" key={j}>
                                    {/* <Checkbox  color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} disabled/> */}
                                    {
                                        (ques.questionType!="text") ? 
                                        <input type={ques.questionType}  style={{marginRight:"10px"}}/> :
                                        <ShortTextIcon style={{marginRight:"10px"}} />

                                    }
                                    <div >
                                        <input type="text" className="text_input" placeholder="option"  value={ques.options[j].optionText}onChange={(e)=>{handleOptionValue(e.target.value, i, j)}}></input>
                                    </div>

                                    <CropOriginalIcon style={{color:"#5f6368"}}/>

                                    <IconButton aria-label="delete" onClick={()=>{removeOption(i, j)}}>
                                            <CloseIcon />
                                    </IconButton>
                                </div>   
                            ))}  
                        
                    
                    
                                {ques.options.length < 5 ? (
                                <div className="add_question_body">
                                <FormControlLabel disabled control={ 
                                
                                (ques.questionType!="text") ? 
                                <input type={ques.questionType}  color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} style={{marginLeft:"10px",marginRight:"10px"}} disabled/> :
                                <ShortTextIcon style={{marginRight:"10px"}} />

                                } label={
                                <div>
                                    <input type="text" className="text_input" style={{fontSize:"13px",width:"60px"}} placeholder="Add other"></input>
                                    <Button size="small" onClick={()=>{addOption(i)}} style={{textTransform: 'none',color:"#4285f4",fontSize:"13px",fontWeight:"600"}}>Add Option</Button>
                                </div>
                                } /> 
                                </div>

                                ): ""}
                               <div className="add_footer">
                               <div className="add_question_bottom_left">
                        
                               <Button size="small"  onClick={()=>{addAnswer(i)}} style={{textTransform: 'none',color:"#4285f4",fontSize:"13px",fontWeight:"600"}}>       <FcRightUp style={{border:"2px solid #4285f4", padding:"2px",marginRight:"8px"}} /> Answer key</Button>
                                 
                              </div>

                                <div className="add_question_bottom">
                                  
                                    {/* <IconButton aria-label="Copy" onClick={()=>{copyQuestion(i)}}>
                                        <FilterNoneIcon/>
                                    </IconButton>
                                     */}
                                    <IconButton aria-label="delete" onClick={()=>{deleteQuestion(i)}}>
                                        <BsTrash />
                                    </IconButton>
                                        <span style={{color:"#5f6368",fontSize:"13px"}}>Required </span> <Switch name="checkedA" color="primary" checked={ques.required} onClick={()=>{requiredQuestion(i)}}/>
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                </div>
                              </div>
                            </div>
                            
                    </AccordionDetails>):(

<AccordionDetails className="add_question" >
                         <div className="top_header">
                              Choose Correct Answer
                         </div>
<div >
    <div className="add_question_top">
        <input type="text" className="question " placeholder="Question"    value={ques.questionText} onChange={(e)=>{handleQuestionValue(e.target.value, i)}} disabled/>
        <input type="number" className="points" min="0" step="1" placeholder="0" onChange={(e)=>{setOptionPoints(e.target.value, i)}} />
            
                
    </div>




    {ques.options.map((op, j)=>(
        <div className="add_question_body" key={j} style={{marginLeft:"8px",marginBottom:"10px",marginTop:"5px"}}>

            <div key={j}>
                                  <div style={{display: 'flex'}} className="">
                                  <div className="form-check">
                                    <label style={{fontSize:"13px"}} onClick={()=>{setOptionAnswer(ques.options[j].optionText, i)}}>

                                    {(ques.questionType!="text") ? 
                                         <input
                                         type={ques.questionType}
                                         name={ques.questionText}
                                         
                                         value="option3"
                                         className="form-check-input"
                                         required={ques.required}
                                         style={{marginRight:"10px",marginBottom:"10px",marginTop:"5px"}}
                                       />:
                                        <ShortTextIcon style={{marginRight:"10px"}} />
    }
                                     
                                  {ques.options[j].optionText}
                                    </label>
                                  </div>
                                  </div>
                                </div>
            
        </div>   
    ))}  



        <div className="add_question_body">
  
           
            <Button size="small"  style={{textTransform: 'none',color:"#4285f4",fontSize:"13px",fontWeight:"600"}}> <BsFileText style={{fontSize:"20px",marginRight:"8px"}}/>Add Answer Feedback</Button>
        
        
        </div>

       
     
    
        <div className="add_question_bottom">
          
        <Button variant="outlined" color="primary"  style={{textTransform: 'none',color:"#4285f4",fontSize:"12px",marginTop:"12px",fontWeight:"600"}} onClick={()=>{doneAnswer(i)}}>
                        Done
                      </Button>
        
      </div>
    </div>
    
</AccordionDetails>


                       
                    )}
                    {/* {!ques.answer ? (<div className="question_edit">
                                <AddCircleOutlineIcon    onClick={addMoreQuestionField} className="edit"/>
                                <OndemandVideoIcon className="edit"/>
                                <CropOriginalIcon className="edit"/>
                                <TextFieldsIcon className="edit"/>
                    </div>): "" } */}
                    </div>
                            
                </Accordion>

              </div>
          </div>
                        </div>
                      )}
          </Draggable>
          
         )
        )
      }
    
    

      
    return (
        <div >
         
            <div className="question_form">
     

            <br></br>
            <div className="section">
           
            <div className="question_title_section">

            
               <div className="question_form_top">
                   <input type="text" className="question_form_top_name" style={{color:"black"}} placeholder={documentName} value={documentName} onChange={(e)=>{setDocName(e.target.value)}}></input>
                   <input type="text" className="question_form_top_desc" placeholder="Form Description" placeholder={documentDescription} value={documentDescription} onChange={(e)=>{setDocDesc(e.target.value)}} ></input>

               </div>
            </div>   
     
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {questionsUI()}

                            {provided.placeholder}
                        </div>
                        )} 
                    </Droppable>
                </DragDropContext>

                
                <div className="save_form">
            <Button variant="contained" color="primary" onClick={commitToDB} style={{fontSize:"14px"}}>Save</Button>

            </div>
            </div>
          
    </div>
</div>
    )
}

export default Question_form
