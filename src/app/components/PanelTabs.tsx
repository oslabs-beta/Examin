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
import { ChevronLeft, ChevronRight, Inbox, Mail, Menu } from '@material-ui/icons';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FastForwardIcon from '@material-ui/icons/FastForward';
import GetAppIcon from '@material-ui/icons/GetApp';

import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/dracula.css';

// Connect chrome to the port where name is "examin-demo" from (examin panel?)
const port = chrome.runtime.connect({ name: "examin-demo" });


const drawerWidth = 240;
// const code = `
//   // Initial describe statement for default initialized state
//   describe('default state', () => {
//     it('should return a default state when given an undefined input', () => {
//       // expect(currMemoizedState[0]).toEqual({});
//       // expect(currMemoizedState[1]).toEqual({});
//       // expect(currMemoizedState).toEqual([{},{}]);
//     });
//   });
//   // Initial describe statement for default initialized state
//   describe('default state', () => {
//     it('should return a default state when given an undefined input', () => {
//       // expect(currMemoizedState[0]).toEqual({});
//       // expect(currMemoizedState[1]).toEqual({});
//       // expect(currMemoizedState).toEqual([{},{}]);
//     });
//   });
//   // Initial describe statement for default initialized state
//   describe('default state', () => {
//     it('should return a default state when given an undefined input', () => {
//       // expect(currMemoizedState[0]).toEqual({});
//       // expect(currMemoizedState[1]).toEqual({});
//       // expect(currMemoizedState).toEqual([{},{}]);
//     });
//   });
//   // Initial describe statement for default initialized state
//   describe('default state', () => {
//     it('should return a default state when given an undefined input', () => {
//       // expect(currMemoizedState[0]).toEqual({});
//       // expect(currMemoizedState[1]).toEqual({});
//       // expect(currMemoizedState).toEqual([{},{}]);
//     });
//   });
//   // Initial describe statement for default initialized state
//   describe('default state', () => {
//     it('should return a default state when given an undefined input', () => {
//       // expect(currMemoizedState[0]).toEqual({});
//       // expect(currMemoizedState[1]).toEqual({});
//       // expect(currMemoizedState).toEqual([{},{}]);
//     });
//   });
//   // Initial describe statement for default initialized state
//   describe('default state', () => {
//     it('should return a default state when given an undefined input', () => {
//       // expect(currMemoizedState[0]).toEqual({});
//       // expect(currMemoizedState[1]).toEqual({});
//       // expect(currMemoizedState).toEqual([{},{}]);
//     });
//   });
// `;

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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // marginRight: drawerWidth,
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    marginTop: 50,
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  hide: {
    display: 'none',
  },
  logo: {
    width: 70,
    height: 27,
  },
  exportBtn: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
  },
  recordBtn: {
    position: 'fixed',
    margin: 0,
    top: 'auto',
    bottom: 15,
    left: 70,
    right: 'auto',
    zIndex: theme.zIndex.drawer + 1,
  },
  prevBtn: {
    position: 'fixed',
    margin: 0,
    top: 'auto',
    bottom: 20,
    left: 20,
    right: 'auto',
    zIndex: theme.zIndex.drawer + 1,
  },
  nextBtn: {
    position: 'fixed',
    margin: 0,
    top: 'auto',
    bottom: 20,
    left: 130,
    right: 'auto',
    zIndex: theme.zIndex.drawer + 1,
  }
}));


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

  const [code, setCode] = useState('code test');

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
                src='../assets/examin-small.png'
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
      <Fab size="small" variant="extended" className={classes.exportBtn}>
        <GetAppIcon className={classes.extendedIcon} />
        Export
      </Fab>

    </div>
  )
}

export default PanelTabs
