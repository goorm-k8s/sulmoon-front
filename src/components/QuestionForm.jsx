import React,{useState,useEffect} from 'react'
import { useParams, useHistory } from "react-router";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ShortTextIcon from '@material-ui/icons/ShortText';
import {BsTrash} from "react-icons/bs"
import { IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'
import { useQuestionsContext } from '../hooks/useQuestions';

import "./QuestionForm.css"; 

function QuestionForm() {
  const history = useHistory();
  const { questions: originQuestions } = useQuestionsContext();
  const [state, dispatch] = useStateValue();
  const [questions,setQuestions] =useState([]); 
  const [documentName,setDocName] =useState("제목을 입력해주세요."); 
  const [questionType,setType] =useState("radio");

  const { id } = useParams();
    
  console.log('id: ', id)
  useEffect(()=>{
    console.log('originQuestions', originQuestions);
    if (originQuestions) {
      setQuestions([
        ...questions,
        {
          ...originQuestions[0],
          questionType:"radio",
          open: true
        }])
    }
    
  },[originQuestions])

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
  
  async function handleSubmit() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    console.log(questions);
    dispatch({
      type: actionTypes.SET_QUESTIONS,
      questions: questions

    });

    const response = await fetch(`http://3.35.95.59:10000/api/surveys/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        'title': documentName,
        'description': '',
        'userId': userId,
        'questions': questions,
      })
    });
    
    const res = await response.json();

    if (res) {
      history.push('/');
    }
  }
    
  function addMoreQuestionField(){
    expandCloseAll();

    setQuestions(questions => [
      ...questions,
      {
        questionContent: '',
        questionId: '0',
        subjectiveYn: false,
        multipleSelectionYn: false,
        examples: [
          {
            exampleContent: "Option 1",
            exampleId: 0
          }
        ],
        questionType:"radio",
        open: true
      }]
    );
  }

  function addQuestionType(i,type){
    let qs = [...questions];  
    console.log(type)
    qs[i].questionType = type;
    
    setQuestions(qs);    
  }
    
  function deleteQuestion(i){
    let qs = [...questions]; 
    if(questions.length > 1){
      qs.splice(i, 1);
    }
    setQuestions(qs)
  }
      
  function handleOptionValue(text, i, j){
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].examples[j].exampleContent = text;
    //newMembersEmail[i]= email;
    setQuestions(optionsOfQuestion);
  }
    
  function handleQuestionValue(text, i){
    const optionsOfQuestion = [...questions];
    optionsOfQuestion[i].questionContent = text;
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

  function addOption(i){
    let optionsOfQuestion = [...questions];
    if(optionsOfQuestion[i].examples.length < 5){
      optionsOfQuestion[i].examples.push({
        exampleId: 0,
        exampleContent: "Option " + (optionsOfQuestion[i].examples.length + 1)
      })
    } else{
      console.log("Max  5 options ");  
    }
    setQuestions(optionsOfQuestion)
  }
    
  function setOptionAnswer(answer, questionIndex){
    const Questions = [...questions];

    Questions[questionIndex].exampleContent = answer;

    console.log(questionIndex+" "+answer)
    setQuestions(Questions)
  }

  // function requiredQuestion(i){
  //   var requiredQuestion = [...questions];
  
  //     requiredQuestion[i].required =  ! requiredQuestion[i].required
    
  //   console.log( requiredQuestion[i].required+" "+i);
  //   setQuestions(requiredQuestion)
  // }

  function removeOption(i, j){
    const optionsOfQuestion = [...questions];
    if(optionsOfQuestion[i].examples.length > 1){
      optionsOfQuestion[i].examples.splice(j, 1);
      setQuestions(optionsOfQuestion)
      console.log(i + "__" + j);
    }   
  }
    
  function expandCloseAll() {
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
        {(provided) => (
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
                <Accordion
                  onChange={() => { handleExpand(i) }}
                  expanded={questions[i].open}
                  className={questions[i].open ? 'add_border' : ""}
                >
                  <AccordionSummary            
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    elevation={1} style={{width:'100%'}}
                  >
                    { !questions[i].open && (
                      <div className="saved_questions">
                        <Typography style={{ fontSize: "15px", fontWeight: "400", letterSpacing: '.1px', lineHeight: '24px', paddingBottom: "8px" }} >
                          {i + 1}.  {ques.questionContent}
                        </Typography>
                        {ques.examples.map((example, j)=>(
                          <div key={j} >
                            <div style={{display: 'flex',}}>
                              <FormControlLabel
                                style={{ marginLeft: "5px", marginBottom: "5px" }}
                                disabled
                                control={<input type={ques.questionType} color="primary" style={{ marginRight: '3px', }} />}
                                label={
                                  <Typography style={{fontFamily:' Roboto,Arial,sans-serif',
                                      fontSize:' 13px',
                                      fontWeight: '400',
                                      letterSpacing: '.2px',
                                      lineHeight: '20px',
                                      color: '#202124'}}>
                                    {ques.examples[j].exampleContent}
                                  </Typography>
                                } />
                            </div>
                          </div>
                        ))}  
                      </div>            
                    )}   
                  </AccordionSummary>
                  <div className="question_boxes">
                    {!ques.answer ? (<AccordionDetails className="add_question" >
                      <div >
                        <div className="add_question_top">
                          <input type="text" className="question" placeholder="Question"
                            value={ques.questionContent}
                            onChange={(e) => { handleQuestionValue(e.target.value, i) }}
                          />
                            <Select className="select" style={{color:"#5f6368",fontSize:"13px"}}>
                              <MenuItem id="radio" value="Radio" onClick={() => { addQuestionType(i, "radio") }}>
                                <Radio style={{ marginRight: "10px", color: "#70757a" }} checked /> Multiple Choice
                              </MenuItem>
                            </Select>
                        </div>
                        {ques.examples.map((example, j)=>(
                          <div className="add_question_body" key={j}>
                            {
                              (ques.questionType!="text") ?
                              <input type={ques.questionType}  style={{marginRight:"10px"}}/> :
                              <ShortTextIcon style={{marginRight:"10px"}} />
                            }
                            <div >
                              <input
                                type="text"
                                className="text_input"
                                placeholder="option"
                                value={ques.examples[j].exampleContent}
                                onChange={(e) => { handleOptionValue(e.target.value, i, j) }} />
                            </div>
                            <IconButton aria-label="delete" onClick={()=>{removeOption(i, j)}}>
                              <CloseIcon />
                            </IconButton>
                          </div>   
                        ))} 
                        {ques.examples.length < 5 && (
                          <div className="add_question_body">
                            <FormControlLabel
                              disabled
                              control={ 
                                (ques.questionType!="text") ? 
                                <input type={ques.questionType} color="primary" style={{marginLeft:"10px",marginRight:"10px"}} disabled/> :
                                <ShortTextIcon style={{marginRight:"10px"}} />
                              }
                              label={
                                <div>
                                  <input type="text" className="text_input" style={{fontSize:"13px",width:"60px"}} placeholder="Add other" />
                                  <Button
                                    size="small"
                                    onClick={() => { addOption(i) }}
                                    style={{ textTransform: 'none', color: "#4285f4", fontSize: "13px", fontWeight: "600" }}
                                  >
                                    Add Option
                                  </Button>
                                </div>
                              }
                            /> 
                          </div>
                        )}
                        <div className="add_footer">
                          <div className="add_question_bottom">
                            <IconButton aria-label="delete" onClick={()=>{deleteQuestion(i)}}>
                              <BsTrash />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    </AccordionDetails>
                  ) : (
                    <AccordionDetails className="add_question" >
                      <div className="top_header">
                        Choose Correct Answer
                      </div>
                      <div >
                        <div className="add_question_top">
                          <input
                            type="text"
                            className="question"
                            placeholder="Question"
                            value={ques.questionContent}
                            onChange={(e) => { handleQuestionValue(e.target.value, i) }}
                            disabled
                          />
                        </div>
                        {ques.examples.map((example, j)=>(
                          <div className="add_question_body" key={j} style={{marginLeft:"8px",marginBottom:"10px",marginTop:"5px"}}>
                            <div key={j}>
                              <div style={{display: 'flex'}} className="">
                                <div className="form-check">
                                  <label style={{fontSize:"13px"}} onClick={()=>{setOptionAnswer(ques.examples[j].exampleContent, i)}}>
                                    {(ques.questionType!="text") ? 
                                        <input
                                          type={ques.questionType}
                                          name={ques.questionContent}
                                          value="option3"
                                          className="form-check-input"
                                          required={ques.required}
                                          style={{marginRight:"10px",marginBottom:"10px",marginTop:"5px"}}
                                        /> :
                                        <ShortTextIcon style={{marginRight:"10px"}} />
                                    }
                                    {ques.examples[j].exampleContent}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>   
                        ))}  
                      </div>
                    </AccordionDetails>
                  )}
                  {!ques.answer && (
                    <div className="question_edit">
                      <AddCircleOutlineIcon onClick={addMoreQuestionField} className="edit"/>
                    </div>)}
                  </div>
                </Accordion>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    ))
  }
      
  return (
    <div >
      <div className="question_form">
        <br/>
        <div className="section">
          <div className="question_title_section">
            <div className="question_form_top">
                <input type="text" className="question_form_top_name" style={{color:"black"}} placeholder={documentName} value={documentName} onChange={(e)=>{setDocName(e.target.value)}}></input>
              </div>
          </div>   
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
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
            <Button variant="contained" color="primary" onClick={handleSubmit} style={{fontSize:"14px"}}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionForm
