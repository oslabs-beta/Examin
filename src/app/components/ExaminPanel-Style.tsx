import { makeStyles, Theme } from "@material-ui/core/styles";

const drawerWidth = 230;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // marginRight: drawerWidth,
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
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
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.background.paper,
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
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  codeEditor: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  codeEditorShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  hide: {
    display: "none",
  },
  logo: {
    width: 70,
    height: 27,
  },
  copyBtn: {
    margin: 0,
    top: "auto",
    right: 150,
    bottom: 20,
    left: "auto",
    position: "fixed",
    zIndex: theme.zIndex.drawer + 2,
  },
  exportBtn: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
    zIndex: theme.zIndex.drawer + 2,
  },
  recordBtn: {
    position: "fixed",
    margin: 0,
    top: "auto",
    bottom: 15,
    left: 20,
    right: "auto",
    zIndex: theme.zIndex.drawer + 2,
  },
  prevBtn: {
    position: "fixed",
    margin: 0,
    top: "auto",
    bottom: 20,
    left: 20,
    right: "auto",
    zIndex: theme.zIndex.drawer + 2,
  },
  nextBtn: {
    position: "fixed",
    margin: 0,
    top: "auto",
    bottom: 20,
    left: 130,
    right: "auto",
    zIndex: theme.zIndex.drawer + 2,
  },
  btnContainer: {
    position: "fixed",
    bottom: 0,
    height: 75,
    width: "100%",
    borderTop: "1px solid #dedede",
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.drawer + 1,
  },
  rootDirInput: {
    marginRight: 10,
    marginBottom: 10,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  rootDirInputShift: {
    marginRight: 10,
    marginBottom: 10,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  copyText: {
    padding: theme.spacing(2),
  },
}));

export { useStyles };
