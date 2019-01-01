import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// ReactDOM.render(<App />, document.getElementById('root'));
const initialState = { ListArticles: [] };
export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "addArticle":
      return {
        ...state,
        ListArticles: state.ListArticles.concat({
          key: Math.random(),
          title:action.title,
          description:action.description,
          isPublic:action.isPublic,
          categories:action.categories,
        })
      }
    default:
      return state;
  }
};
const rootReducer=combineReducers({articles:articleReducer})
const configureStore=createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={configureStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
