import React, { Component, PureComponent } from "react";
// import ReactDOM from "react-dom";
import { connect } from "react-redux";
import "./App.css";
// import M from "./js/materialize.min";
import M from "materialize-css";
import Column from "./column";
import { DragDropContext } from "react-beautiful-dnd";
// import '@atlaskit/css-reset';
/* const initialState = {ListArticles:[]};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "addItem":
      return {
        ...state,
        ListArticles: action.ListArticles
      };
    default:
      return state;
  }
 
}; */
// const store = createStore(reducer);
const styles = {
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
};

class AppArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        id:(0).toString(),
        title: "",
        description: "",
        file: "",
        imagePreviewURL: "",
        isPublic: false,
        categories: []
      },
      ListArticles: []
    };
    this._addArticle = this._addArticle.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.getPhoto = this.getPhoto.bind(this);
    this.handleStock = this.handleStock.bind(this);
    this.removePicture = this.removePicture.bind(this);
    this.handleMultiSelectCat = this.handleMultiSelectCat.bind(this);

    //  M.AutoInit()
  }
  componentDidMount() {
    // var elt=ReactDOM.findDOMNode(this.refs.multipleSelectMenu)
    // console.log("m:",M)
    // M.AutoInit()
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }
  _addArticle = () => {
    this.setState({
      ListArticles: this.state.ListArticles.concat(this.state.input)
    });
    this.props.onAddArticle(this.state.input);
    this._resetForm();
  };
  _resetForm = () => {
    let inputReset = {
      id:(parseInt(this.state.input.id)+1).toString(),
      title: "",
      description: "",
      isPublic: false,
      file: "",
      imagePreviewURL: ""
    };
    this.removePicture();
    this.setState({ input: inputReset });
  };
  _handleDelete = newList => {
    this.setState({ ListArticles: newList });
  };
  /*   _checkClassExist=(object,classN)=>{
    var classObj=object.getAttribute('class');
    var tabClass=classObj.split()
    for (var line in tabClass){
      console.log("line",line)
    }

    console.log("classObj",classObj);
  } */
  changeStyle = (ref, styleToChange) => {
    // var object=this.refs.description;

    console.log("ref:", ref);
    console.log("styleToChange:", styleToChange);
    ref.classList.contains(styleToChange) === false
      ? ref.classList.add(styleToChange)
      : ref.classList.remove(styleToChange);
  };
  handleStock = e => {
    e.preventDefault();
    // stock file somewhere
    console.log("handle uploading-", this.state.input.file);
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
    console.log("{...this.state.input}:", { ...this.state.input });
    // Destructuring assignment
    var { file, imagePreviewURL } = { ...this.state.input };
    //reset value
    // [file,imagePreviewURL]="";
    console.log("fil URL:", file, ",", imagePreviewURL);
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
    return (
      <div className="App container">
        <h1 className="center-align">Articles</h1>
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
        <ListArticles
          onDeleteArticle={this._handleDelete}
          IncListArticles={this.state.ListArticles}
        />
      </div>
    );
  }
}

export class ListArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListArticles: [
        /* {
          id: 1,
          title: "Joli text1",
          isPublic: false,
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
          id: 2,
          title: "Joli text2",
          isPublic: true,
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
          id: 3,
          title: "Joli text3",
          isPublic: true,
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
          id: 4,
          title: "Joli text4",
          isPublic: false,
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        } */
      ],
      columns: {
        "column-1": {
          id: "column-1",
          titre: "List Articles",
          articleIds: []
          // articleIds: [1, 2, 3, 4]
        }
      },
      columnOrder: ["column-1"]
    };
    this._removeArticle = this._removeArticle.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  /*  shouldComponentUpdate(nextProps) {
    console.log(
      "shouldListArticlesComponentUpdate?",
      nextProps.IncListArticles !== this.props.IncListArticles
    );
    // return true;
    return nextProps.IncListArticles !== this.props.IncListArticles;
  } */
  componentWillReceiveProps(nextProps) {
    
    var newIdsInc=nextProps.IncListArticles.map((article)=>{
      return article.id;
    })
  
    console.log("newIdsInc:",newIdsInc)
    const newListInc={
       ...this.state,
      columns:{
        ...this.state.columns,
        "column-1":{
          ...this.state.columns["column-1"],
          articleIds:newIdsInc,
       
        }
      },
      ListArticles: nextProps.IncListArticles,
    }
 
    console.log("newListInc:",newListInc)

    this.setState(newListInc);
    // this.setState({ ListArticles: nextProps.IncListArticles});
  }
  _removeArticle = article => {
    // clone current state
    var cloneListArticles = this.state.ListArticles.slice();
    var indexArticle = cloneListArticles.indexOf(article);
    // delete index from clone
    cloneListArticles.splice(indexArticle, 1);
    this.setState({ ListArticles: cloneListArticles });
    // update parent state to not reload its state here
    this.props.onDeleteArticle(cloneListArticles);
  };
  moveUp = article => {
    let cloneState = this.state.ListArticles.sort().slice();
    let i = cloneState.indexOf(article);
    if (i < cloneState.length - 1) {
      //get articles to move
      let removedArticles = cloneState.splice(i, 1);
      // add elt to his new place
      cloneState.splice(i + 1, 0, removedArticles[0]);
      // update State
      this.setState({ ListArticles: cloneState });
    } else {
      // this.refs.arrow_upward.classList.add("disabled")
    }
  };
  moveDown = article => {
    let cloneState = this.state.ListArticles.sort().slice();
    //found index article
    let i = cloneState.indexOf(article);
    if (i > 0) {
      //get articles to move
      let removedArticles = cloneState.splice(i, 1);
      // add elt to his new place
      cloneState.splice(i - 1, 0, removedArticles[0]);
      // update State
      this.setState({ ListArticles: cloneState });
    } else {
      // this.refs.arrow_downward.classList.add("disabled")
    }
  };
  onDragEnd = result => {
    // todo: reorder column
    console.log("result DnD:", result);
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    // if drop my component in the same place as original
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.destination
    ) {
      return;
    }
    // if change id of the column in state
    const column = this.state.columns[source.droppableId];
    const newArticleIds = Array.from(column.articleIds);
    // remove article id from its position
    newArticleIds.splice(source.index, 1);
    // drop article id on its new position
    newArticleIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      articleIds: newArticleIds
    };
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn
      }
    };
    this.setState(newState);
  };
  render() {
    // const ListArticles = this.state.ListArticles.map((article, index) => (

    const ListArticles = this.state.columnOrder.map(columnId => {
      const column = this.state.columns[columnId];
      const articles = column.articleIds.map(articleId =>
        this.state.ListArticles.filter(article => {
          return article.id === articleId;
        })
      );
      console.log("articles in app:", articles);
      return <Column key={column.id} column={column} articles={articles} />;
    });

    // this.state.ListArticles.map((article, index) => (
    /*  <div
        className={[
          "row lighten-4 z-depth-4",
          article.isPublic === true ? "green" : "grey"
        ].join(" ")}
        key={index}
      >
        <div className="col s2">
          <div className="row">
            <img
              alt=""
              className="col s12"
              width="250"
              src={article.imagePreviewURL}
            />
          </div>
        </div>
        <div className="col s9">
          <div className="row">
            <div className="col s12">
              <h6 className="col s4">{article.categories}</h6>
              <h5
                className="col s4  center-align white z-depth-1"
                style={{ padding: "10px" }}
              >
                {article.title}
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div
                className="input-field col s12 center-align white z-depth-1"
                style={{ padding: "20px" }}
              >
                {article.description}
              </div>
            </div>
          </div>
        </div>
        <div className="col s1" style={styles.button}>
          <button
            className="btn waves-effect waves-light blue"
            ref={"arrow_upward"}
            type="submit"
            name="action"
            onClick={() => this.moveUp(article)}
          >
            <i className="material-icons">arrow_upward</i>
          </button>
        </div>
        <div className="col s1" style={styles.button}>
          <button
            className="btn waves-effect waves-light red"
            type="submit"
            name="action"
            onClick={() => this._removeArticle(article)}
          >
            <i className="material-icons">remove</i>
          </button>
        </div>
        <div className="col s1" style={styles.button}>
          <button
            className="btn waves-effect waves-light blue"
            ref={"arrow_downward"}
            type="submit"
            name="action"
            onClick={() => this.moveDown(article)}
          >
            <i className="material-icons">arrow_downward</i>
          </button>
        </div>
      </div>
    )).sort((a, b) => {
      return b.key - a.key;
    }); */
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>{ListArticles}</div>
      </DragDropContext>
    );
  }
}
const mapStateToProps = state => {
  return {
    ListArticles: state.ListArticles
  };
};
//create action add Article
const addArticle = article => {
  return {
    type: "addArticle",
    title: article.title,
    description: article.description,
    isPublic: article.isPublic,
    categories: article.categories
  };
};
// action on store
const mapsDispatchToProps = dispatch => {
  return {
    onAddArticle: article => {
      dispatch(addArticle(article));
    }
  };
};
// export default AppArticles;
export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(AppArticles);
