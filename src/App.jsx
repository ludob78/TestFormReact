import React, { Component } from "react";
// import ReactDOM from "react-dom";
import { connect } from "react-redux";
import "./App.css";
// import M from "./js/materialize.min";
import M from "materialize-css";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import Fade from '@material-ui/core/Fade';
import Transition from "react-transition-group/Transition";
import ListArticles from "./ListArticles.jsx";
// import '@atlaskit/css-reset';

// const store = createStore(reducer);
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

export class FormArticle extends Component {
  constructor(props) {
    super(props);
    console.log("this.props from FormArticle:", this.props);
    this.state = {
      input: {
        id:
          this.props.articles.columns.articleIds.length === 0
            ? "0"
            : (
                Math.max(...this.props.articles.columns.articleIds) + 1
              ).toString(),
        title: "",
        description: "",
        file: "",
        imagePreviewURL: "",
        isPublic: false,
        isEditing: false,
        categories: []
      },
      ListArticles: []
    };
    /* BINDING */
    this._addArticle = this._addArticle.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.getPhoto = this.getPhoto.bind(this);
    this.handleStock = this.handleStock.bind(this);
    this.removePicture = this.removePicture.bind(this);
    this.handleMultiSelectCat = this.handleMultiSelectCat.bind(this);
  }
  componentDidMount() {
    // var elt=ReactDOM.findDOMNode(this.refs.multipleSelectMenu)
    // console.log("m:",M)
    // M.AutoInit()
    var elems = document.querySelectorAll("select");
     M.FormSelect.init(elems);
    // console.log("instances:", instances);
  }
  /*   shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate FormArticle nextProps:", nextProps);
    console.log("shouldComponentUpdate FormArticle this.props:", this.props);
    console.log("shouldComponentUpdate FormArticle nextState:", nextState);
    console.log("shouldComponentUpdate FormArticle this.state:", this.state);
    // console.log("shouldComponentUpdate from form nextState:",nextState.input!==this.state.input)
    return nextState.input !== this.state.input;
    //  return true;
  } */

  _addArticle = () => {
    /*    this.setState({
      ListArticles: this.state.ListArticles.concat(this.state.input)
    }); */
    this.props.articles.onAddArticle(this.state.input);
  };
  componentDidUpdate(prevProps) {
    console.log("FormArticle did update");
    // resetForm once props from redux update to get new id in input
    if (prevProps.articles.ListArticles !== this.props.articles.ListArticles) {
      this._resetForm();
    }
  }
  _resetForm = () => {
    console.log(
      "Math.max(this.props.columns.articleIds):",
      Math.max(...this.props.articles.columns.articleIds)
    );
    console.log(
      "this.props.columns.articleIds:",
      this.props.articles.columns.articleIds
    );

    let inputReset = {
      // id 0 if no record in article array order else max id+1
      id:
        this.props.articles.columns.articleIds.length === 0
          ? "0"
          : (
              Math.max(...this.props.articles.columns.articleIds) + 1
            ).toString(),
      title: "",
      description: "",
      isPublic: false,
      isEditing: false,
      file: "",
      imagePreviewURL: ""
    };
    this.removePicture();
    this.setState({ input: inputReset });
  };
  changeStyle = (ref, styleToChange) => {
    // var object=this.refs.description;

    // console.log("ref:", ref);
    // console.log("styleToChange:", styleToChange);
    ref.classList.contains(styleToChange) === false
      ? ref.classList.add(styleToChange)
      : ref.classList.remove(styleToChange);
  };
  handleStock = e => {
    e.preventDefault();
    // stock file somewhere
    // console.log("handle uploading-", this.state.input.file);
  };
  getPhoto = e => {
    // e.preventDefault()
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      let deepStateInput = { ...this.state.input };
      deepStateInput.file = file;
      deepStateInput.imagePreviewURL = reader.result;
      this.setState({
        input: deepStateInput
      });
    };
    reader.readAsDataURL(file);
  };
  removePicture = () => {
    // console.log("{...this.state.input}:", { ...this.state.input });
    // Destructuring assignment
    // var { file, imagePreviewURL } = { ...this.state.input };
    //reset value
    // [file,imagePreviewURL]="";
    // console.log("fil URL:", file, ",", imagePreviewURL);
    let deepState = { ...this.state.input };
    deepState.file = "";
    deepState.imagePreviewURL = "";
    this.setState({ input: deepState });
  };
  handleMultiSelectCat = e => {
    // console.log("handleMultiSelectCat:",e.target.options)
    let options = e.target.options;
    let selectedValue = [];
    // HTMLOptionsCollection is not an array and don't have any foreach method
    Array.prototype.forEach.call(options, option => {
      if (option.selected) {
        selectedValue.push(option.value);
      }
    });
    let deepStateInputCat = { ...this.state.input };
    deepStateInputCat.categories = selectedValue;
    this.setState({ input: deepStateInputCat });
  };
  render() {
    console.log("this.props in formArticle:", this.props);
    var { imagePreviewURL } = this.state.input;
    let imagePreview = null;
    // console.log("this.state.input.imagePreviewURL:",this.state.input.imagePreviewURL);
    if (imagePreviewURL) {
      // console.log("imagePreviewUrl:", imagePreviewURL);
      imagePreview = (
        <img alt="" width="250" className="col s12" src={imagePreviewURL} />
      );
    } else {
      // console.log("imagePreviewUrl:", imagePreviewURL);
      imagePreview = (
        <div>
          <button
          // className="btn blue waves-effect waves-light"
          // onClick={this.getPhoto}
          >
            Image
          </button>
        </div>
      );
    }
    /*   const articleToEdit=this.props.articles.ListArticles.filter(article=>{
return article.isEditing===true;
    }) */
    return (
      <div className="row grey lighten-4 z-depth-4">
        <div className="col s6 m1 l2">
          <div className="row">
            <div className="col s12" />
          </div>
          <div className="row">
            <div className="col s12">
              <form action="." encType="multipart/form-data">
                <div className="file-field input-field">
                  <input type="file" onChange={this.getPhoto} />
                  {imagePreview}
                </div>
                {this.state.input.file === "" ? null : (
                  <button
                    className="btn red waves-effect waves-light"
                    onClick={this.removePicture}
                  >
                    Remove
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="col s12 m11 l9">
          <div className="row">
            <div className="col s12">
              <div className="input-field col s6">
                <input
                  id="title"
                  type="text"
                  value={this.state.input.title}
                  className="validate"
                  onChange={e => {
                    let deepTitleState = { ...this.state.input };
                    deepTitleState.title = e.currentTarget.value;
                    this.setState({ input: deepTitleState });
                  }}
                />
                <label htmlFor="title">Title</label>
              </div>
              <div className="input-field col s3">
                <select
                  onChange={this.handleMultiSelectCat}
                  ref="multipleSelectCategories"
                  name="categories[]"
                  multiple
                >
                  <option value="" disabled defaultValue>
                    Your categories
                  </option>
                  <option
                    className="left"
                    data-icon="./icon/living-room-books-group.png"
                    value="objects"
                  >
                    object
                  </option>
                  <option
                    className="left"
                    data-icon="./icon/dog.png"
                    value="animal"
                  >
                    animal
                  </option>
                  <option
                    className="left"
                    data-icon="./icon/avatar.png"
                    value="people"
                  >
                    people
                  </option>
                </select>
                <label>Categories</label>
              </div>
              <div className="switch col s3 center-align">
                <label>
                  Private
                  <input
                    type="checkbox"
                    checked={this.state.input.isPublic}
                    onChange={() => {
                      // toggle deeper state
                      this.setState(prevState => ({
                        ...prevState,
                        input: {
                          ...prevState.input,
                          isPublic: !prevState.input.isPublic
                        }
                      }));
                    }}
                  />
                  <span className="lever" />
                  Public
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="input-field col s12">
                <textarea
                  ref="description"
                  id="description"
                  value={this.state.input.description}
                  className="materialize-textarea"
                  onChange={e => {
                    let deepDescState = { ...this.state.input };
                    deepDescState.description = e.currentTarget.value;
                    this.setState({ input: deepDescState });
                  }}
                />
                <label htmlFor="description">Description</label>
              </div>
            </div>
            <div className="col s6 offset-s3">
              <table>
                <tbody>
                  <tr>
                    <td
                      id="bold"
                      ref="bold"
                      style={styles.td}
                      onMouseOver={() =>
                        this.refs.bold.classList.add("blue", "lighten-4")
                      }
                      onMouseOut={() =>
                        this.refs.bold.classList.remove("blue", "lighten-4")
                      }
                      onClick={() =>
                        this.changeStyle(this.refs.description, "bold")
                      }
                    >
                      <span>B</span>
                    </td>
                    <td
                      id="italic"
                      ref="italic"
                      style={styles.td}
                      onMouseOver={() =>
                        this.refs.italic.classList.add("blue", "lighten-4")
                      }
                      onMouseOut={() =>
                        this.refs.italic.classList.remove("blue", "lighten-4")
                      }
                      onClick={() =>
                        this.changeStyle(this.refs.description, "italic")
                      }
                    >
                      <span>I</span>
                    </td>
                    <td
                      id="underline"
                      ref="underline"
                      style={styles.td}
                      onMouseOver={() =>
                        this.refs.underline.classList.add("blue", "lighten-4")
                      }
                      onMouseOut={() =>
                        this.refs.underline.classList.remove(
                          "blue",
                          "lighten-4"
                        )
                      }
                      onClick={() =>
                        this.changeStyle(this.refs.description, "underline")
                      }
                    >
                      <span>U</span>
                    </td>
                    <td style={styles.td}>
                      <span>Hypertext</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col s6 m12 l1">
          <button
            className="btn waves-effect waves-light tooltipped"
            data-position="right"
            data-tooltip="renseigner les informations avant de valider"
            type="submit"
            disabled={
              this.state.input.title === "" ||
              this.state.input.description === ""
                ? true
                : false
            }
            name="action"
            onClick={this._addArticle}
          >
            <i className="material-icons">add</i>
          </button>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
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
    var modals = document.querySelectorAll(".modal");
    // console.log("modals:", modals);
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
    M.Modal.init(modals, optionsModals);
    // console.log("instanceModal:", instanceModal);
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
        <Grid container spacing={24}>
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
                    <Grid item xs={6} style={{ backgroundColor: "black" }}>
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
          <div className="center-align">
            <button className="waves-effect waves-light btn" onClick={() => {
                this.setState({ isModalOpen: true });
              }}>
              <i className="large material-icons">add</i>
            </button>
          </div>
          <ListArticles onDeleteArticle={this._handleDelete} />
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
    onAddArticle: article => {
      dispatch(addArticle(article));
    }
  };
};
export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(withStyles(styles)(AppArticles));
