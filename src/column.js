import React, { Component } from "react";
import styled from "styled-components";
import Article from "./article";
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
    console.log("article in column",this.props.articles) 
    return (
      <Container>
        <ArticlesList>
          {this.props.articles.map((article,index) => (
             
            <Article key={index} article={article} />
          ))}
        </ArticlesList>
      </Container>
    );
  }
}
