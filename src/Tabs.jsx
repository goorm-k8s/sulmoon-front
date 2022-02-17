import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Switch from '@material-ui/core/Switch';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import QuestionForm from 'components/QuestionForm';
import {  IconButton } from '@material-ui/core'

import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    
  },
  tab:{
    fontSize:12,
    color:"#5f6368",
    textTransform:"capitalize",
    height:10,
    fontWeight:"600",
    fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
   
  },
  tabs:{
      height:10
      
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        
          <div>{children}</div>
   
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        className={classes.tabs}
      >
        <Tab label="Questions" className={classes.tab} {...a11yProps(0)} />
        <Tab label="Responses" className={classes.tab} {...a11yProps(1)}/>

      </Tabs>
      <TabPanel value={value} index={0}>
        <QuestionForm />
        
         
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className="submit" style={{height:"76vh"}}>
        <div className="user_form" >
            <div className="user_form_section">
              
              
          
                    <div className="user_form_questions" style={{display:"flex",flexDirection:"column",marginBottom:"20px"}}>
                      <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                    <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom:"8px"}} >3 Responses</Typography>
                    <div  ><IconButton>
                    <MoreVertIcon className="form_header_icon" />
                </IconButton>
                </div>
                </div>
                <br></br>
                              <div  style={{marginBottom:"5px"}}>
                                  <div style={{display: 'flex',fontSize:"12px",justifyContent:"flex-end"}}>
                                        Accepting responses <Switch color="primary" size="small"/>   
                                  </div>
                                </div>
                     
                    </div>
            
      
       
            <div className="user_footer">
                Google Forms
            </div>
            </div>
            
        </div>
        </div>
      </TabPanel>
    </Paper>
  );
}