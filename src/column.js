import React, { Component } from "react";
import styled from "styled-components";
import Article from "./article";
import { Droppable } from "react-beautiful-dnd";
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3``;
const ArticlesList = styled.div`
  padding: 8px;
`;
export default class Column extends Component {
  render() {
    console.log("article in column", this.props.articles);
    return (
      <Container>
        <Droppable droppableId={this.props.column.id}>
        {/* each child of droppable pattern is a function */} 
          {(provided) => (
            <ArticlesList
            ref={provided.innerRef}// return dom node of component
            {...provided.droppableProps}
            >
              {this.props.articles.map((article, index) => (
                <Article key={index} article={article} index={index} />
              ))}
              {provided.placeholder //react element increasing available space in droppable. Need to be added as child of component
            }
            </ArticlesList>
          )}
        </Droppable>
      </Container>
    );
  }
}
