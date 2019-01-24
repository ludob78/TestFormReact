import React, { Component } from "react";

import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import Modal from "./App";
import FormArticle from "./App.jsx";

const styles = {
  handle:{backgroundColor: "blue"},
  container:{padding: "8px",
    borderRadius: "2px",
    marginBottom: "10px"},
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

class Article extends Component {
  constructor(props) {
    super(props);

    this.state = { article: {} };
    this.handleEditing = this.handleEditing.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps article:", nextProps);
  }
  shouldComponentUpdate(nextProps) {
    // console.log("shouldComponentUpdate ListArticles nextState:", nextState);
    // console.log("shouldComponentUpdate ListArticles this.state:", this.state);
    console.log("shouldComponentUpdate Article nextProps:", nextProps);
    console.log("shouldComponentUpdate Article this.props:", this.props);
    return true;
  }
  handleEditing = () => {
    // e.preventDefault()
    console.log("before this.props.article in editing:", this.props.article);

    // this.props.article.isEditing=!this.props.article.isEditing
    // console.log("after this.props.article in editing:",this.props.article)
    this.props.onEditArticle(this.props.article);
  };
  render() {
    /*  const reduceArticle=this.props.article.reduce((obj,item)=>{
          obj[item.id]=item.title;
          return obj;
      }) */
    //   console.log("result:",reduceArticle)
    // console.log("this.props from article;", this.props);
    // console.log("this.props.article from article;", this.props.article);
    return (
      <Draggable index={this.props.index} draggableId={this.props.article.id}>
        {provided => (
          <div style={styles.container}
            {...provided.draggableProps}
            ref={provided.innerRef} // return dom node of component
            key={this.props.article.id}
          >
            {/* this.props.article.isEditing === true ? (
              //   <FormArticle />
              <div>
                  <a
                  href="#modalForm"
                  className="btn waves-effect waves-light orange btn modal-trigger"
                  type="submit"
                  name="action"
                  onClick={ this.handleEditing}
                //   onClick={() => this.props.onEditArticle(this.props.article)}
                >
                  <i className="material-icons">edit</i>
                </a>
              </div>
            ) : ( */
              <div
                className={[
                  "row lighten-4 z-depth-4",
                  this.props.article.isPublic === true ? "green" : "grey"
                ].join(" ")}
                //   key={index}
              >
                <div className="col s2">
                  <div className="row">
                    <img
                      alt=""
                      className="col s12"
                      width="250"
                      src={this.props.article.imagePreviewURL}
                    />
                  </div>
                </div>
                <div className="col s9">
                  <div className="row">
                    <div className="col s12">
                      <h6 className="col s4">
                        {
                          this.props.article.categories.map((category,index)=>{

                            return (<div className="col s12">
                              {category}
                              </div>)

                          })
                            
                            

                        }
                      </h6>
                      <h5
                        className="col s4  center-align white z-depth-1"
                        style={{ padding: "10px" }}
                      >
                        {this.props.article.title}
                      </h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <div
                        className="input-field col s12 center-align white z-depth-1"
                        style={{ padding: "20px" }}
                      >
                        {this.props.article.description}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col s1" style={styles.button}>
                  <div
                    style={styles.handle}
                    {...provided.dragHandleProps} // define tag from where we can drag
                    className="btn waves-effect waves-light"
                    ref={"arrow_upward"}
                    name="action"
                  >
                    <i className="material-icons">swap_vert</i>
                  </div>
                </div>
                <div className="col s1" style={styles.button}>
                  <button
                    className="btn waves-effect waves-light red"
                    type="submit"
                    name="action"
                    //   onClick={() => this._removeArticle(this.props.article)}
                    onClick={() =>
                      this.props.onDeleteArticle(this.props.article)
                    }
                  >
                    <i className="material-icons">remove</i>
                  </button>
                </div>
                <div className="col s1" style={styles.button}>
                  <a
                  href="#modalForm"
                    className="btn waves-effect waves-light orange btn modal-trigger"
                    type="submit"
                    name="action"
                    onClick={this.handleEditing}
                    // onClick={() => this.props.onEditArticle(this.props.article)}
                  >
                    <i className="material-icons">edit</i>
                  </a>
                </div>
              </div>
            // )
        }
          </div>
        )}
      </Draggable>
    );
  }
}
const deleteArticle = article => {
  return {
    type: "removeArticle",
    id: article.id
  };
};
const editArticle = article => {
  return {
    type: "editArticle",
    id: article.id,
    categories: article.categories,
    file: article.file,
    imagePreviewURL: article.imagePreviewURL,
    title: article.title,
    isPublic: article.isPublic,
    isEditing: article.isEditing,
    description: article.description
  };
};
// action on store
const mapsDispatchToProps = dispatch => {
  return {
    onDeleteArticle: article => {
      dispatch(deleteArticle(article));
    },
    onEditArticle: article => {
      dispatch(editArticle(article));
    }
  };
};
// export default AppArticles;
export default connect(
  null,
  mapsDispatchToProps
)(Article);
// export default Article;
