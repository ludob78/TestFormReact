import React, { Component } from "react";
import Article from "./article";
import { Droppable } from "react-beautiful-dnd";
import {myFlat} from "./tools";
const styles={
  container:{margin:"8px",borderRadius: "2px"},
  articleList:{padding:"8px"}
}

class InnerList extends Component {
  /* shouldComponentUpdate(nextProps) {
    if (nextProps.articles === this.props.articles) {
        return false;
    }
    return true;
  } */

  /*flatD=(depth = 1)=>{
    return this.reduce(function (flat, toFlatten) {
    return flat.concat((Array.isArray(toFlatten) && (depth-1)) ? toFlatten.flat(depth-1) : toFlatten);
  }, []); 

}*/
  render() {
    
      console.log("this.props.articles flatting in column:",myFlat(this.props.articles))
    // return this.props.articles.flat()
    return myFlat(this.props.articles)
    .map((article, index) => ( <Article key = {index}      article = {        article      }      index = {        index      }      />    ))

  }
}
class Column extends Component {
  render() {
    
    // console.log("article in column", this.props.articles.flat());
    return (
      <div style={styles.container}>
        <Droppable droppableId={this.props.column.id.toString()} direction="vertical" type="column">
          {/* each child of droppable pattern is a function */}
          {provided => (
            <div style={styles.articleList}
              ref={provided.innerRef} // return dom node of component
              {...provided.droppableProps}
            >
              {/* this.props.articles.flat().map((article, index) => (
                <Article key={index} article={article} index={index} />
                // <div>test</div>
              )) */}
              <InnerList articles={this.props.articles} />
              {
                provided.placeholder //react element increasing available space in droppable. Need to be added as child of component
              }
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
export default Column;
