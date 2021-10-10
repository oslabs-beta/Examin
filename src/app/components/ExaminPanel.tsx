import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
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
  Popover,
} from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import PauseIcon from "@material-ui/icons/Pause";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import GetAppIcon from "@material-ui/icons/GetApp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Howto from "./Howto";
import Editor from "./Editor";

import copy from "copy-to-clipboard";

import { useStyles } from "./ExaminPanel-Style";

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
        name: "pauseClicked",
        tabId: chrome.devtools.inspectedWindow.tabId,
      });
      setIsRecording(false);
    } else {
      // Send a postMessage to background.js with payload shape of
      // request = { name: 'recordClicked', tabId: '' }
      port.postMessage({
        name: "recordClicked",
        tabId: chrome.devtools.inspectedWindow.tabId,
      });
      setIsRecording(true);
    }
  };
  // ---------------------------------------------------------------

  // Export Button Handling ----------------------------------------
  const exportHandler = (text: string) => {
    // create invisible download anchor link
    const fileDownload = document.createElement("a");

    // set file in anchor link
    fileDownload.href = URL.createObjectURL(
      new Blob([text], { type: "javascript" })
      // new Blob([JSON.stringify(text)], {type: 'javascript'})
    );

    // set anchor as file download and click it
    fileDownload.setAttribute("download", "testfile.js");
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
    const componentNames = [];
    const componentData = [];
    const checkedComps = [];
    const strArray = messageString.split("describe('");

    // Iterate through the split messageString
    for (let i = 0; i < strArray.length; i++) {
      // if(tempObj[i]) // dont overwrite previously created objects

      // Initialize a temp object
      let tempObj = {};
      if (i === 0) {
        tempObj = { import: strArray[0], isChecked: true };
        // tempObj = { name: componentNames[i], import: strArray[0], isChecked: true };
        componentData.push(tempObj);
      } else {
        // Substantiate the checkedComponents State variable
        checkedComps.push(true);

        componentNames.push(strArray[i].split(" ")[0]);
        // Set temporary key / value pairs that will change as for loop [i] increments
        const val = "describe('" + strArray[i];
        const key = strArray[i].split(" ")[0];

        tempObj = { [key]: val, isChecked: true };

        componentData.push(tempObj);
      }
      // componentData[componentNames[i-1]] = "describe('" + strArray[i];
    }
    setCheckedComponents(checkedComps);
    // console.log("result of checkedComponents: ", checkedComps);
    setComponentNames(componentNames);
    // console.log('result of componentNames: ', componentNames);
    setComponentData(componentData);
    // console.log('result of componentData: ', componentData);

    codeFromComponentData(componentData);
  };
  // ---------------------------------------------------------------

  // Function for Generating New Code String -----------------------
  // Input: componentData = [{import: '...', isChecked: true}, {}, {}, {}]
  // Output: String = 'import ... describe ....'
  const codeFromComponentData = (componentData) => {
    // Initialize a resultant string
    let codeString = "";
    // Iterate through the componentData array
    componentData.forEach((element) => {
      for (const key in element) {
        if (key !== "isChecked") {
          if (element.isChecked) {
            codeString += element[key];
          }
        }
      }
    });
    // Return the resultant string
    setCode(codeString);
  };
  // ---------------------------------------------------------------

  // isChecked Handling --------------------------------------------
  const [checkedImport, setCheckedImport] = React.useState(true);
  const [checkedComponents, setCheckedComponents] = React.useState([]);

  const handleCheckbox = (key: any) => () => {
    console.log("the index is ", key);
    const currComponentData = componentData;
    const currCheckedComponents = checkedComponents;
    // console.log(currComponentData);
    if (key === -1) {
      let tempObj = {};
      tempObj = currComponentData[0];
      if (tempObj["isChecked"]) {
        tempObj["isChecked"] = false;
        currComponentData.shift();
        currComponentData.unshift(tempObj);
        setCheckedImport(false);
        setComponentData(currComponentData);
        codeFromComponentData(currComponentData);
      } else {
        tempObj["isChecked"] = true;
        currComponentData.shift();
        currComponentData.unshift(tempObj);
        setCheckedImport(true);
        setComponentData(currComponentData);
        codeFromComponentData(currComponentData);
      }
      // console.log(currComponentData);
    } else {
      let tempObj = {};
      tempObj = currComponentData[key + 1];
      if (currComponentData[key + 1]["isChecked"]) {
        tempObj["isChecked"] = false;
        currComponentData[key + 1] = tempObj;
        // Handle checkedComponents here
        currCheckedComponents[key] = false;
        setCheckedComponents(currCheckedComponents);

        setComponentData(currComponentData);
        codeFromComponentData(currComponentData);
      } else {
        tempObj["isChecked"] = true;
        currComponentData[key + 1] = tempObj;
        // Handle checkedComponents here
        currCheckedComponents[key] = true;
        setCheckedComponents(currCheckedComponents);

        setComponentData(currComponentData);
        codeFromComponentData(currComponentData);
      }
      // console.log(currComponentData);
    }
  };
  // ---------------------------------------------------------------

  // Stateful functions for handling code panel values -------------
  const [code, setCode] = useState("loading...");

  // Connect chrome to the port where name is "examin-demo" from (examin panel?)
  const port = chrome.runtime.connect({ name: "examin-demo" });

  useEffect(() => {
    port.postMessage({
      name: "connect",
      tabId: chrome.devtools.inspectedWindow.tabId,
    });

    port.onMessage.addListener((message) => {
      // Update code displayed on Examin panel
      // console.log('message: ', message);
      // console.log("useeffect fired");
      // Start handling componentNames
      const text = message;
      createComponentNamesArray(text);
      setCheckedImport(true);
      // let compData = componentData;
      // console.log(compData);
      // codeFromComponentData(compData);
      // setCode(message);
    });
  }, []);

  // Stateful functions for handling Root Dir ---------------------
  const [openRootDir, setOpenRootDir] = useState(false);
  const [userRootInput, setUserRootInput] = useState("");

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
      name: "submitRootDir",
      tabId: chrome.devtools.inspectedWindow.tabId,
      userInput: userRootInput,
    });
  };
  // ---------------------------------------------------------------

  // Copy Button Popover Handling ----------------------------------
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleCopyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    copy(code);
    setAnchorEl(event.currentTarget);
  };

  const handleCopyClose = () => {
    setAnchorEl(null);
  };

  const copyPopOpen = Boolean(anchorEl);
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
              <Tab label="How to use" />
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
        {openRootDir ? (
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
          </Box>
        ) : (
          <></>
        )}
        <Box
          className={clsx(classes.codeEditor, {
            [classes.codeEditorShift]: openRootDir,
          })}
        >
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
        <Howto />
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
            // button
            key="Import"
            // onClick={handleCheckbox(-1)}
          >
            <ListItemIcon>
              <Checkbox
                // defaultChecked
                checked={checkedImport}
                color="primary"
                onClick={handleCheckbox(-1)}
              />
            </ListItemIcon>
            <ListItemText primary="Import Block" />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="settings"
                onClick={openRootDir ? handleRootDirClose : handleRootDirOpen}
              >
                {openRootDir ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Divider />
        <List>
          {componentNames.map((name, index) => (
            <ListItem
              dense
              // button
              key={name + index}
              // onClick={handleCheckbox(index)}
              // onClick={handleToggle(index)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checkedComponents[index]}
                  // checked={checkIsChecked(index)}
                  // defaultChecked
                  color="primary"
                  onClick={handleCheckbox(index)}
                  // onClick={()=> {checkIsChecked(index)}}
                />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={classes.btnContainer}>
        {/* <Fab
					size="small"
					color="primary"
					aria-label="prev"
					className={classes.prevBtn}
				>
					<FastRewindIcon />
				</Fab> */}

        <Fab
          size="medium"
          // color={ isRecording ? 'secondary' : 'primary' }
          style={
            isRecording
              ? { backgroundColor: "#45c77c" }
              : { backgroundColor: "#0C4B40" }
          }
          aria-label="play"
          className={classes.recordBtn}
          onClick={handlePauseRecClick}
        >
          {isRecording ? (
            <PauseIcon />
          ) : (
            <FiberManualRecordIcon style={{ color: "white" }} />
          )}
        </Fab>
        {/* <Fab
					size="small"
					color="primary"
					aria-label="next"
					className={classes.nextBtn}
				>
					<FastForwardIcon />
				</Fab> */}
        <Fab
          size="small"
          variant="extended"
          className={classes.copyBtn}
          // onClick={() => {
          // 	copy(code);
          // }}
          onClick={handleCopyClick}
        >
          <FileCopyIcon className={classes.extendedIcon} />
          Copy
        </Fab>
        <Popover
          id={"copy-popover"}
          open={copyPopOpen}
          anchorEl={anchorEl}
          onClose={handleCopyClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Typography variant="body1" className={classes.copyText}>
            Copied to Clipboard!
          </Typography>
        </Popover>
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
