import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
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
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useTheme } from '@material-ui/core/styles';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FastForwardIcon from '@material-ui/icons/FastForward';
import GetAppIcon from '@material-ui/icons/GetApp';


import {useStyles} from './PanelTabs-Style'
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/dracula.css';
import copy from 'copy-to-clipboard';

// Connect chrome to the port where name is "examin-demo" from (examin panel?)
const port = chrome.runtime.connect({ name: "examin-demo" });




interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

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


const PanelTabs = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [code, setCode] = useState('loading...');

  console.log('not inside of useEffect!');

  useEffect(() => {
    console.log('inside useEffect in PanelTabs')

    
    port.postMessage({
      name: 'connect',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
    
    port.onMessage.addListener((message) => { 
      console.log('in panel tabs addListener')
      setCode(message);
    });

  }, []);

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
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
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
            value={value} 
            index={0} 
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div>
              <CodeMirror
                value={code}
                options={{
                  theme: 'dracula',
                  mode: 'javascript',
                  lineWrapping: true,
                  // height: auto,
                  viewportMargin: Infinity,
                  scrollbarStyle: 'null',
                }}
              />
            </div>
          </TabPanel> 
          <TabPanel 
            value={value} 
            index={1}
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            Branched Testing!
          </TabPanel>
          <TabPanel 
            value={value} 
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

      <Fab size="medium" color="secondary" aria-label="play" className={classes.recordBtn}>
        <FiberManualRecordIcon />
      </Fab>

      <Fab size="small" color="primary" aria-label="next" className={classes.nextBtn}>
        <FastForwardIcon />
      </Fab>

      <Fab size="small" variant="extended" className={classes.copyBtn} 
      onClick={() => {copy(code)}}
      >
        <FileCopyIcon className={classes.extendedIcon} />
        Copy 
      </Fab>

      <Fab size="small" variant="extended" className={classes.exportBtn}>
        <GetAppIcon className={classes.extendedIcon} />
        Export
      </Fab>

    </div>
  )
}

export default PanelTabs