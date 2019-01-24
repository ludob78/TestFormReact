import React, { Component } from "react";
import {connect} from "react-redux";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textAlign: {
    // padding: theme.spacing.unit * 2,
    textAlign: "center"
    // color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing.unit
  },
  modal: {
    header: {
      color: "white"
    },
    background: {},
    backgroundColor: "#b6efff",
    margin: "15%"
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
const categories = ["Mobilier", "Nourriture", "Vêtement"];
function getStyles(name, that) {
  console.log("name:",name)/*?*/
  console.log("that:",that)/*?*/

  return {
    fontWeight:
      categories.indexOf(name) === -1
        ? that.props.propsFromParent.theme.typography.fontWeightRegular
        : that.props.propsFromParent.theme.typography.fontWeightMedium
  };
}

class MultipleSelect extends Component {
  constructor(props){
    super(props)
    this.state={categories:[]}
    this.handleMultiSelectCat = this.handleMultiSelectCat.bind(this);

  }
  componentWillReceiveProps(nextProps){
    console.log("MultipleSelect componentWillReceiveProps");
    console.log("MultipleSelect nextProps",nextProps);
    
  }
  shouldComponentUpdate(nextProps){
   console.log('shouldComponentUpdate nextProps:',nextProps);
   
    
    
    
    return true
  }
    //! HTMLOptionsCollection is not an array and don't have any foreach method
    handleMultiSelectCat = e => {
      // console.log("handleMultiSelectCat handleMultiSelectCat:",e.target.value)
      let selectedValue = [];
      let options = e.target.value;
      Array.prototype.forEach.call(options, option => {
        // console.log("handleMultiSelectCat option:",option)
        if (option) {
          selectedValue.push(option);
        }
      });
      // console.log("handleMultiSelectCat selectedValue:",selectedValue)
      /* let deepStateInputCat = { ...this.state.input };
      deepStateInputCat.categories = selectedValue;
      this.setState({ input: deepStateInputCat }); */
      this.setState({ categories: selectedValue });
      this.props.selectedValue(selectedValue);
  
    }; 
  render() {
    const { classes } = this.props.propsFromParent;
    // console.log("this:",this)
            
    return (
      
        //Todo: check classes formControl
      
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-chip">Chip</InputLabel>
        <Select
          multiple
          value={this.state.categories}
          onChange={this.handleMultiSelectCat}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip
                  key={value}
                  label={value}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {categories.map((category,index) => (
            <MenuItem
              key={category}
              value={category}
              style={getStyles(category, this)}
            >
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
}

class FormArticle extends Component {
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
    }; /*?*/
    /* BINDING */
    this._addArticle = this._addArticle.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.getPhoto = this.getPhoto.bind(this);
    this.handleStock = this.handleStock.bind(this);
    this.removePicture = this.removePicture.bind(this);
    this.handleSelCat = this.handleSelCat.bind(this);

  }
  componentWillMount() {
    console.log("this.props in formArticle:", this.props);
  }
  componentDidMount() {
    // var elt=ReactDOM.findDOMNode(this.refs.multipleSelectMenu)
    // console.log("m:",M)
    // M.AutoInit()
    /*     var elems = document.querySelectorAll("select");
          M.FormSelect.init(elems); */
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
    /*   this.setState({
            ListArticles: this.state.ListArticles.concat(this.state.input)
          }); */
    this.props.onAddArticle(this.state.input);
  };
  componentDidUpdate(prevProps) {
    console.log("FormArticle did update");
    // resetForm once props from redux update to get new id in input
    if (prevProps.articles.ListArticles !== this.props.articles.ListArticles) {
      this._resetForm();/*?*/
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
      imagePreviewURL: "",
      categories:[],
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
 
  handleSelCat=(selectedValue)=>{
      let deepStateInputCat = { ...this.state.input };
      deepStateInputCat.categories = selectedValue;
      this.setState({ input: deepStateInputCat });

  }
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
              <MultipleSelect propsFromParent={this.props} selectedValue={this.handleSelCat}></MultipleSelect>
                {/* <select onChange={this.handleMultiSelectCat} ref="multipleSelectCategories" name="categories[]" multiple>
                    <option value="" disabled defaultValue>
                      Your categories
                    </option>
                    <option className="left" data-icon="./icon/living-room-books-group.png" value="objects">
                      object
                    </option>
                    <option className="left" data-icon="./icon/dog.png" value="animal">
                      animal
                    </option>
                    <option className="left" data-icon="./icon/avatar.png" value="people">
                      people
                    </option>
                  </select>*/}
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
  propTypes = {
    classes: PropTypes.object.isRequired,
   /*  //Todo: https://github.com/mui-org/material-ui/issues/10845, tried this to fix "Warning: Failed prop type: The prop `value` is marked as required in `SelectInput`, but its value is `undefined`."
    value: PropTypes.oneOfType([ 
      PropTypes.string, 
      PropTypes.number, 
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])), 
    ]), */
  };
  
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
}
// action on store
const mapsDispatchToProps = dispatch => {
  return {
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
)(withStyles(styles, { withTheme: true })(FormArticle));
