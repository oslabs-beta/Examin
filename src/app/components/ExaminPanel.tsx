import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import {
	AppBar,
	Box,
  Checkbox,
	Drawer,
	Divider,
	IconButton,
	Fab,
	Grid,
	List,
	ListItem,
	ListItemText,
  ListItemSecondaryAction,
	Tabs,
	Tab,
	Typography,
	TextField,
	Button,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight, Inbox, Mail } from '@material-ui/icons';
import PauseIcon from '@material-ui/icons/Pause';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FastForwardIcon from '@material-ui/icons/FastForward';
import GetAppIcon from '@material-ui/icons/GetApp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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
			});
			setIsRecording(false);
		} else {
			// Send a postMessage to background.js with payload shape of
			// request = { name: 'recordClicked', tabId: '' }
			port.postMessage({
				name: 'recordClicked',
				tabId: chrome.devtools.inspectedWindow.tabId,
			});
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
			new Blob([text], { type: 'javascript' })
			// new Blob([JSON.stringify(text)], {type: 'javascript'})
		);

		// set anchor as file download and click it
		fileDownload.setAttribute('download', 'testfile.js');
		fileDownload.click();

		// remove file url
		URL.revokeObjectURL(fileDownload.href);
	};
	// ---------------------------------------------------------------

  // Stateful functions for handling componentNames ----------------
  const [componentNames, setComponentNames] = useState([]); 
  const [componentData, setComponentData] = useState([]);
  // [app, todolist]
  // {app: describeTest}
  // [{app: describe, isChecked: true}, {}]
  const createComponentNamesArray = (messageString) => {
    // setCode(messageString);

    let componentNames = [];
    let componentData = [];
    const strArray = messageString.split("describe('");

    // Iterate through the split messageString
    for (let i = 0; i < strArray.length; i++) {
      // if(tempObj[i]) // dont overwrite previously created objects
      
      // Initialize a temp object
			let tempObj = {};
      if (i === 0) {
        tempObj = { import: strArray[0], isChecked: true };
        componentData.push(tempObj);
      } else {
        componentNames.push(strArray[i].split(' ')[0]);
				// Set temporary key / value pairs that will change as for loop [i] increments 
        let val = "describe('" + strArray[i];
        let key = strArray[i].split(' ')[0];

        tempObj = { [key] : val, isChecked: true };

        componentData.push(tempObj);
			}
      // componentData[componentNames[i-1]] = "describe('" + strArray[i];
    }
    // console.log('result of componentNames: ', componentNames);
    setComponentNames(componentNames);
    setComponentData(componentData);
    console.log('result of componentData: ', componentData);

    codeFromComponentData(componentData);
  };
  // ---------------------------------------------------------------

  // Function for Generating New Code String -----------------------
  // Input: componentData = [{import: '...', isChecked: true}, {}, {}, {}]
  // Output: String = 'import ... describe ....'
  const codeFromComponentData = (componentData) => {
    // Initialize a resultant string
    let codeString = '';
    // Iterate through the componentData array
    componentData.forEach(element => {
      for (const key in element) {
        if (key !== 'isChecked') {
          if (element.isChecked) {
            codeString += element[key];
          }
        } 
      }
    });
    // Return the resultant string
    // console.log('The codestring is: ', codeString);
    setCode(codeString);
  };
  // ---------------------------------------------------------------

  // const [checked, setChecked] = React.useState([0]);

  // const handleToggle = (index: number) => () => {
  //   // handleCheckbox(index)
  //   const currentIndex = checked.indexOf(index);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(index);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }
  //   setChecked(newChecked);
  // };

  // isChecked Handling --------------------------------------------

  const handleCheckbox = (key: any) => () => {
    console.log('the index is ', key);
    let currComponentData = componentData;
    // console.log(currComponentData);
    if (key === -1) {
      let tempObj = {};
      tempObj = currComponentData[0];
      if (tempObj['isChecked']) {
        tempObj['isChecked'] = false;
        currComponentData.shift();
        currComponentData.unshift(tempObj);
        setComponentData(currComponentData);
        codeFromComponentData(currComponentData);
      } else {
        tempObj['isChecked'] = true;
        currComponentData.shift();
        currComponentData.unshift(tempObj);
        setComponentData(currComponentData);
        codeFromComponentData(currComponentData);
      }
      // console.log(currComponentData);
    } else {
      let tempObj = {};
      tempObj = currComponentData[key+1];
      if (currComponentData[key+1]['isChecked']) {
        tempObj['isChecked'] = false;
        currComponentData[key+1] = tempObj;
        setComponentData(currComponentData);
        codeFromComponentData(currComponentData);
      } else {
        tempObj['isChecked'] = true;
        currComponentData[key+1] = tempObj;
        setComponentData(currComponentData);
        codeFromComponentData(currComponentData);
      }
      // console.log(currComponentData);
    }
  };
  // ---------------------------------------------------------------


	// Stateful functions for handling code panel values -------------
	const [code, setCode] = useState('loading...');
	

	// Connect chrome to the port where name is "examin-demo" from (examin panel?)
	const port = chrome.runtime.connect({ name: 'examin-demo' });

	useEffect(() => {
		port.postMessage({
			name: 'connect',
			tabId: chrome.devtools.inspectedWindow.tabId,
		});

		port.onMessage.addListener((message) => {
			// Update code displayed on Examin panel
      // console.log('message: ', message);
      
      // Start handling componentNames
      let text = message;
			createComponentNamesArray(text);
      // let compData = componentData;
      // console.log(compData);
      // codeFromComponentData(compData);
			// setCode(message);
		});
	}, []);

	// Stateful functions for handling Root Dir ---------------------
  const [openRootDir, setOpenRootDir] = useState(false);
  const [userRootInput, setUserRootInput] = useState('');

  const handleRootDirOpen = () => {
    setOpenRootDir(true);
  };

  const handleRootDirClose = () => {
    setOpenRootDir(false);
  };

	// handleSubmitRootDir submits user input (root-directory-name)
	const handleSubmitRootDir = () => {
    // setUserRootInput('');
		// console.log('user root input', userRootInput);
    // let text = code;
		port.postMessage({
			name: 'submitRootDir',
			tabId: chrome.devtools.inspectedWindow.tabId,
			userInput: userRootInput,
		});
	};
	// ---------------------------------------------------------------

  


	return (
		<div className={classes.root}>
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Grid container justify="space-between" alignItems="center">
					<Grid item>
						<Box style={{ marginLeft: theme.spacing(2) }}>
							<img
								className={classes.logo}
								src="../assets/examin-small.svg"
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
							style={{ marginRight: theme.spacing(2) }}
						>
							{open ? <ChevronRight /> : <ChevronLeft />}
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
				{ openRootDir ?
          <Box 
            display="flex" 
            alignItems="center" 
            justifyContent="flex-end" 
            className={clsx(classes.rootDirInput, {
              [classes.rootDirInputShift]: openRootDir,
            })}
          >
            <TextField
              id="outlined-full-width"
              label="Root Directory"
              style={{ margin: 8 }}
              placeholder="root-directory-name"
              helperText=""
              fullWidth
              size="small"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={userRootInput}
              onChange={(e) => setUserRootInput(e.target.value)}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSubmitRootDir}
            >
              Submit
            </Button>
          </Box> :
          <></>
        }
				<Box className={clsx(classes.codeEditor, {
					[classes.codeEditorShift]: openRootDir,
				})}>
					<Editor
						language="javascript"
						displayName="Initial Describe Block"
						value={code}
						onChange={setCode}
					/>
				</Box>
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
          <ListItem 
            dense 
            button 
            key="Import"
            onClick={handleCheckbox(-1)}
          >
            <ListItemIcon>
              <Checkbox 
                defaultChecked
                color="primary"
              />
            </ListItemIcon>
            <ListItemText primary="Import Code" />
            <ListItemSecondaryAction>
              <IconButton 
                edge="end" 
                aria-label="settings"
                onClick={openRootDir ? handleRootDirClose : handleRootDirOpen}
              >
                {openRootDir ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
				<Divider />
				<List>
          { componentNames.map((name, index) => (
            <ListItem 
              dense 
              button 
              key={name+index}
              onClick={handleCheckbox(index)}
              // onClick={handleToggle(index)}
            >
              <ListItemIcon>
                <Checkbox 
                  // checked={checked.indexOf(index) !== -1}
                  defaultChecked
                  disableRipple
                  color="primary"
                />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
				</List>
			</Drawer>

			<div className={classes.btnContainer}>
				<Fab
					size="small"
					color="primary"
					aria-label="prev"
					className={classes.prevBtn}
				>
					<FastRewindIcon />
				</Fab>

				<Fab
					size="medium"
					// color={ isRecording ? 'secondary' : 'primary' }
					style={
						isRecording
							? { backgroundColor: '#45c77c' }
							: { backgroundColor: '#0C4B40' }
					}
					aria-label="play"
					className={classes.recordBtn}
					onClick={handlePauseRecClick}
				>
					{/* <FiberManualRecordIcon /> */}
					{/* <PauseIcon /> */}
					{isRecording ? (
						<PauseIcon />
					) : (
						<FiberManualRecordIcon style={{ color: 'white' }} />
					)}
				</Fab>
				<Fab
					size="small"
					color="primary"
					aria-label="next"
					className={classes.nextBtn}
				>
					<FastForwardIcon />
				</Fab>
				<Fab
					size="small"
					variant="extended"
					className={classes.copyBtn}
					onClick={() => {
						copy(code);
					}}
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
		</div>
	);
};

export default ExaminPanel;
