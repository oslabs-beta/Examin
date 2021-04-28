import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import { 
  AppBar, 
  Box, 
  Drawer, 
  Divider, 
  IconButton,
  Fab, 
  Grid,
  List,
  ListItem,
  ListItemText, 
  Tabs, 
  Tab, 
  Typography 
} from '@material-ui/core';
import { ChevronLeft, ChevronRight, Inbox, Mail } from '@material-ui/icons';
import PauseIcon from '@material-ui/icons/Pause';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FastForwardIcon from '@material-ui/icons/FastForward';
import GetAppIcon from '@material-ui/icons/GetApp';

import Editor from './Editor';

import copy from 'copy-to-clipboard';

import { useStyles } from './ExaminPanel-Style';


function TabPanel(props: any) {
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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


const ExaminPanel = () => {
  // MaterialUI Styling Hook ---------------------------------------
  const classes = useStyles();
  const theme = useTheme();
  // ---------------------------------------------------------------

  // Stateful functions for handling Tab Logic ---------------------
  const [tab, setTab] = useState(0);
  
  const handleChange = (event: React.ChangeEvent<{}>, newTab: number) => {
    setTab(newTab);
  };
  // ---------------------------------------------------------------

  
  // Stateful functions for handling Drawer Logic ------------------
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };
  // ---------------------------------------------------------------

  
  // Stateful functions for handling Pause/Recording Button--------
  const [isRecording, setIsRecording] = useState(true);

  const handlePauseRecClick = () => {
    if (isRecording) {
      // Send a postMessage to background.js with payload shape of 
      // request = { name: 'pauseClicked', tabId: '' }
      port.postMessage({
        name: 'pauseClicked',
        tabId: chrome.devtools.inspectedWindow.tabId,
      })
      setIsRecording(false);
    } else {
      // Send a postMessage to background.js with payload shape of 
      // request = { name: 'recordClicked', tabId: '' }
      port.postMessage({
        name: 'recordClicked',
        tabId: chrome.devtools.inspectedWindow.tabId,
      })
      setIsRecording(true);
    }

  };
  // ---------------------------------------------------------------

  // Export Button Handling ----------------------------------------
  const exportHandler = (text: string) => {
    // create invisible download anchor link
    const fileDownload = document.createElement('a');

    // set file in anchor link
    fileDownload.href = URL.createObjectURL(
      new Blob([text], {type: 'javascript'})
      // new Blob([JSON.stringify(text)], {type: 'javascript'})
    )

    // set anchor as file download and click it
    fileDownload.setAttribute('download', 'testfile.js');
    fileDownload.click();

    // remove file url
    URL.revokeObjectURL(fileDownload.href);
  }
  // ---------------------------------------------------------------


  // Stateful functions for handling code panel values -------------
  const [code, setCode] = useState('loading...');

  // Connect chrome to the port where name is "examin-demo" from (examin panel?)
  const port = chrome.runtime.connect({ name: "examin-demo" });

  useEffect(() => {
    
    port.postMessage({
      name: 'connect',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
    
    port.onMessage.addListener((message) => { 
      setCode(message);
    });

  }, []);

  // ---------------------------------------------------------------
  
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Grid 
          container 
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Box style={{marginLeft: theme.spacing(2)}}>
              <img 
                className={classes.logo}
                src='../assets/examin-small.svg'
                alt="Examin Logo"
              />
            </Box>
          </Grid>
          <Grid item>
            <Tabs 
              value={tab} 
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Testing" />
              <Tab label="Branched Testing" />
              <Tab label="Components" />
            </Tabs>
          </Grid>
          <Grid item>
            <IconButton 
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              className={clsx(open)}
              style={{marginRight: theme.spacing(2)}}
            >
              { open ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </Grid>
        </Grid>
      </AppBar>

      <TabPanel 
        value={tab} 
        index={0} 
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div>
          <Editor
            language="javascript"
            displayName="Initial Describe Block"
            value={code}
            onChange={setCode}
          />
        </div>
      </TabPanel> 
      <TabPanel 
        value={tab} 
        index={1}
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        Branched Testing!
      </TabPanel>
      <TabPanel 
        value={tab} 
        index={2}
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        Components
      </TabPanel>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Fab size="small" color="primary" aria-label="prev" className={classes.prevBtn}>
        <FastRewindIcon />
      </Fab>

      <Fab 
        size="medium" 
        color={ isRecording ? 'secondary' : 'primary' }
        aria-label="play" 
        className={classes.recordBtn}
        onClick={handlePauseRecClick}
      >
        {/* <FiberManualRecordIcon /> */}
        {/* <PauseIcon /> */}
        { isRecording ? <PauseIcon /> : <FiberManualRecordIcon /> }
      </Fab>

      <Fab size="small" color="primary" aria-label="next" className={classes.nextBtn}>
        <FastForwardIcon />
      </Fab>

      <Fab 
        size="small" 
        variant="extended" 
        className={classes.copyBtn} 
        onClick={() => {copy(code)}}
      >
        <FileCopyIcon className={classes.extendedIcon} />
        Copy 
      </Fab>

    
      <Fab 
        size="small" 
        variant="extended" 
        className={classes.exportBtn}
        onClick={() => exportHandler(code)}
      >
        <GetAppIcon className={classes.extendedIcon} />
        Export
      </Fab>

    </div>
  )
}

export default ExaminPanel