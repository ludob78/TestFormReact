import React, { Component } from "react";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./column";
import { isEqual } from "./tools";

class ListArticles extends Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps article:",nextProps);
  }
  shouldComponentUpdate(nextProps, nextState) {
      // console.log("shouldComponentUpdate ListArticles nextState:", nextState);
      // console.log("shouldComponentUpdate ListArticles this.state:", this.state);
      console.log("shouldComponentUpdate ListArticles nextProps:", nextProps);
      console.log("shouldComponentUpdate ListArticles this.props:", this.props);
      var control = (nextProps,thisProps) => {
        //   console.log( "shouldComponentUpdate ListArticles isEqual control:", (!isEqual(nextProps.columns, thisProps.columns)) && (!isEqual(nextProps.ListArticles, thisProps.ListArticles)))
          return (
          // to check sort of item and list items
          (!isEqual(nextProps.columns, thisProps.columns))||(!isEqual(nextProps.ListArticles, thisProps.ListArticles)) 
      );
    };
    console.log(
      "shouldComponentUpdate ListArticles control?",
      control(nextProps,this.props)
    );
    return (
        control(nextProps,this.props)
    );
  }

  onDragEnd = result => {
    // todo: reorder column
    console.log("result DnD:", result);
    //destructured assignation
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
    // usefull if change id of the column in state
    // const column = this.state.columns[source.droppableId];
    const column = this.props.columns[source.droppableId];
    const newArticleIds = Array.from(column.articleIds);
    // remove article id from its position
    newArticleIds.splice(source.index, 1);
    // drop article id on its new position
    newArticleIds.splice(destination.index, 0, parseInt(draggableId));
    const newColumn = {
      ...column,
      articleIds: newArticleIds
    };
    const newState = {
      ...this.props,
      columns: {
        ...this.props.columns,
        [newColumn.id]: newColumn
      }
    };
    console.log(
      "newState.columns[newColumn.id].articleIds:",
      newState.columns[newColumn.id].articleIds
    );
    console.log("newState:", newState);

    this.props.onEndDragToRedux(newState);
    // this.setState(newState);
  };
  render() {
    // const ListArticles = this.state.ListArticles.map((article, index) => (
    // console.log("this.props in ListArticles:", this.props);
    /*     const ListArticles = this.state.columnOrder.map(columnId => {
      const column = this.state.columns[columnId];
      const articles = column.articleIds.map(articleId =>
        this.state.ListArticles.filter(article => {
          return article.id === articleId;
        })
      );
      // console.log("articles in app:", articles);
      return <Column key={column.id} column={column} articles={articles} />;
    }); */
    const ListArticles = this.props.columnOrder.map(columnId => {
      const column = this.props.columns[columnId];
      const articles = column.articleIds.map(articleId =>
        this.props.ListArticles.filter(article => {
          return parseInt(article.id) === articleId;
        })
      );
      // console.log("articles in app:", articles);
      return <Column key={column.id} column={column} articles={articles} />;
    })

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
    columnOrder: state.articles.columnOrder,
    ListArticles: state.articles.ListArticles,
    columns: state.articles.columns
  };
};
//reorder colum on dragend
const reOrder = newOrder => {
  return { type: "reOrder", column: newOrder };
};

// action on store
const mapsDispatchToProps = dispatch => {
  return {
    onEndDragToRedux: newOrder => {
      dispatch(reOrder(newOrder));
    }
  };
};
export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(ListArticles);
