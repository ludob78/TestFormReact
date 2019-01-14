import React, { Component } from "react";
// import ReactDOM from "react-dom";
import { connect } from "react-redux";
import "./App.css";
// import M from "./js/materialize.min";
// import M from "materialize-css";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormArticle from "./formAddArticle";
// import Fade from '@material-ui/core/Fade';
import Transition from "react-transition-group/Transition";
import ListArticles from "./ListArticles.jsx";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textAlign: {
    // padding: theme.spacing.unit * 2,
    textAlign: 'center',
    // color: theme.palette.text.secondary,
  },
  button:{
    margin: theme.spacing.unit,
  },
  modal:{
    header:{
      color:"white"
    },
    background:{
    },
    backgroundColor:"#b6efff",
    margin:"15%",
  }
});

/* const styles = {
  td: {
    backgroundColor: "white",
    border: "1px solid black",
    textAlign: "center",
    margin: "0px",
    width: "25%",
    // backgroundColor:"red",
    cursor: "pointer"
  },
  button: {
    marginTop: "30px"
  }
}; */







const duration=3000;
const defaultFadeStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}
const transitionFadeStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
};
class AppArticles extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };
  }
  componentDidMount() {
    // console.log("modals:", modals);
  /*var modals = document.querySelectorAll(".modal");
    let optionsModals = {
    startingTop: "70%",
    dismissible: false,
    preventScrolling: false,
    inDuration: 250,
    outDuration: 500,
    onOpenStart: () => {
    console.log("open modal");
    }
  };
  M.Modal.init(modals, optionsModals); */
  }
    /*   shouldComponentUpdate(nextProps,nextState) {
    console.log("shouldComponentUpdate AppArticles nextProps:", nextProps);
    console.log("shouldComponentUpdate AppArticles this.props:", this.props);
    // console.log("shouldComponentUpdate AppArticles nextState:", nextState);
    // console.log("shouldComponentUpdate AppArticles this.state:", this.state);
    return nextProps.ListArticles !== this.props.ListArticles;
    // return true;
  } */
  render() {
    const { classes } = this.props;
    return <Grid className={classes.root}>
        <Grid container alignItems="center" justify="space-around" spacing={24}>
          {/* <Grid className="App container"> */}
          <Grid className={classes.textAlign} item xs={12}>
            <h1>Articles</h1>
          </Grid>

          <Transition in={this.state.isModalOpen} timeout={duration}>
            {state => <div style={{ ...defaultFadeStyle, ...transitionFadeStyles[state] }}>
                <Modal className={classes.modal} open={this.state.isModalOpen}>
                  <Grid container direction="column" alignItems="center" justify="center" className={["", classes.textAlign].join(" ")}>
                    {/* <Transition in={this.state.isModalOpen} timeout={500} /> */}
                    <h1
                      className={[classes.modal.header, "white"].join(" ")}
                    >
                      Add article
                    </h1>
                     {/* send props from parent connected to store */}
                    <FormArticle articles={this.props} />
                    <Grid item xs={6} lg={12} style={{ backgroundColor: "black" }}>
                      <Button variant="contained" size="small" fullWidth={false} className={classes.button} color="secondary" onClick={() => {
                          this.setState({ isModalOpen: false });
                        }}>
                        Close
                      </Button>
                    </Grid>
                  </Grid>
                </Modal>
              </div>}
          </Transition>
          <Grid item xs={12} className={classes.textAlign}>
            <button className="waves-effect waves-light btn" onClick={() => {
                this.setState({ isModalOpen: true });
              }}>
              <i className="large material-icons">add</i>
            </button>
          </Grid>
          <Grid item xs={12} lg={10}>
            <ListArticles onDeleteArticle={this._handleDelete} />
          </Grid>
        </Grid>
      </Grid>;
  }
}
// Define mandatory props to component
AppArticles.propTypes={
  classes:PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    ListArticles: state.articles.ListArticles,
    ColumnOrder: state.articles.columnOrder,
    columns: state.articles.columns["column-1"]
  };
};
//create action add Article
const addArticle = article => {
  return {
    type: "addArticle",
    id: article.id,
    title: article.title,
    description: article.description,
    isPublic: article.isPublic,
    isEditing: article.isEditing,
    categories: article.categories,
    file: article.file,
    imagePreviewURL: article.imagePreviewURL
  };
};
// action on store
const mapsDispatchToProps = dispatch => {
  return {
    // onEndDragToRedux:bindActionCreators(reOrder,dispatch),
    /*?*/
    onAddArticle: article => {
      dispatch(
        addArticle(article)
        );
    }
  };
};
export default connect(
  mapStateToProps,
  mapsDispatchToProps /*?.*/
)(withStyles(styles, { withTheme: true })(AppArticles));
