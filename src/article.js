import React, { Component } from "react";
import styled from 'styled-components';


const Container=styled.div`
border:1px solid lightgrey;
padding:8px;
border-radius:2px;
margin-bottom:10px;
`
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
export class Article extends Component {
    constructor(props){
        super(props)
       /*  this._removeArticle = this._removeArticle.bind(this);
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this); */
    }
   /*  _removeArticle = article => {
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
      }; */
  render() {
    return (
      <Container
       key={this.props.article[0].id}
      >
      <div
      className={[
        "row lighten-4 z-depth-4",
        this.props.article[0].isPublic === true ? "green" : "grey"
      ].join(" ")}
    //   key={index}
    >
      <div className="col s2">
        <div className="row">
          <img
            alt=""
            className="col s12"
            width="250"
            src={this.props.article[0].imagePreviewURL}
          />
        </div>
      </div>
      <div className="col s9">
        <div className="row">
          <div className="col s12">
            <h6 className="col s4">{this.props.article[0].categories}</h6>
            <h5
              className="col s4  center-align white z-depth-1"
              style={{ padding: "10px" }}
            >
              {this.props.article[0].title}
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <div
              className="input-field col s12 center-align white z-depth-1"
              style={{ padding: "20px" }}
            >
              {this.props.article[0].description}
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
          onClick={() => this.moveUp(this.props.article[0])}
        >
          <i className="material-icons">arrow_upward</i>
        </button>
      </div>
      <div className="col s1" style={styles.button}>
        <button
          className="btn waves-effect waves-light red"
          type="submit"
          name="action"
          onClick={() => this._removeArticle(this.props.article[0])}
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
          onClick={() => this.moveDown(this.props.article[0])}
        >
          <i className="material-icons">arrow_downward</i>
        </button>
      </div>
    </div>
  
      </Container>
    );
  }
}

export default Article;
