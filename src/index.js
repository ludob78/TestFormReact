import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";

// ReactDOM.render(<App />, document.getElementById('root'));
const initialState = {
  columns: {
    "column-1": {
      id: "column-1",
      titre: "List Articles",
      // articleIds: []
      articleIds: [1, 2, 3, 4]
    }
  },
  columnOrder: ["column-1"],
  // ListArticles: [],
  ListArticles: [
    {
      id: 1,
      categories: [],
      file: "",
      imagePreviewURL: "",
      title: "Joli text1",
      isPublic: false,
      isEditing: false,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
      id: 2,
      categories: [],
      file: "",
      imagePreviewURL: "",
      title: "Joli text2",
      isPublic: true,
      isEditing: false,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
      id: 3,
      categories: [],
      file: "",
      imagePreviewURL: "",
      title: "Joli text3",
      isPublic: true,
      isEditing: false,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
      id: 4,
      categories: [],
      file: "",
      imagePreviewURL: "",
      title: "Joli text4",
      isPublic: false,
      isEditing: false,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
  ]
};
export const articleReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "addArticle":
      return {
        ...state,
        columns: {
          ...state.columns,
          "column-1": {
            ...state.columns["column-1"],
            articleIds: state.columns["column-1"].articleIds.concat(
              parseInt(action.id)
            )
          }
        },
        ListArticles: state.ListArticles.concat({
          id: action.id,
          title: action.title,
          description: action.description,
          isPublic: action.isPublic,
          file: action.file,
          imagePreviewURL: action.imagePreviewURL,
          categories: action.categories,
          isEditing: false
        })
      };
    case "removeArticle":
      return {
        ...state,
        columns: {
          ...state.columns,
          "column-1": {
            ...state.columns["column-1"],
            articleIds: state.columns["column-1"].articleIds.filter(id => {
              return id !== parseInt(action.id);
            })
          }
        },
        ListArticles: state.ListArticles.filter(item => {
          return item.id !== action.id;
        })
      };
    case "reOrder":
      // console.log("action in reorder reducer:", action);
      return action.column;
    case "editArticle":
      return {
        ...state,
        ListArticles: state.ListArticles.map(article => {
          if (article.id === action.id) {
            article.isEditing = !article.isEditing;
          }
          return article;
        })
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({ articles: articleReducer });
const configureStore = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
console.log(configureStore.getState())
ReactDOM.render(
  <Provider store={configureStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);/*? */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
export default configureStore