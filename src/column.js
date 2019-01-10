import React, { Component } from "react";
import styled from "styled-components";
import Article from "./article";
import { Droppable } from "react-beautiful-dnd";
const Container = styled.div`
  margin: 8px;
  //border: 1px solid lightgrey;
  border-radius: 2px;
`;
// const Title = styled.h3``;
const ArticlesList = styled.div`
  padding: 8px;
`;
class InnerList extends Component {
  /* shouldComponentUpdate(nextProps) {
    if (nextProps.articles === this.props.articles) {
        return false;
    }
    return true;
  } */
  render() {
      console.log("article from column:",this.props.articles.flat())
    return this.props.articles.flat().map((article, index) => (
      <Article key={index} article={article} index={index} />
    ));
  }
}
class Column extends Component {
  render() {
    // console.log("article in column", this.props.articles.flat());
    return (
      <Container>
        <Droppable droppableId={this.props.column.id.toString()} direction="vertical" type="column">
          {/* each child of droppable pattern is a function */}
          {provided => (
            <ArticlesList
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
            </ArticlesList>
          )}
        </Droppable>
      </Container>
    );
  }
}
export default Column;
