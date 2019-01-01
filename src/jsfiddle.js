const styles = {
    td: {
      backgroundColor: "white",
      border: "1px solid black",
      textAlign: "center",
      margin: "0px",
      width: "25%",
      // backgroundColor:"red",
      cursor:"pointer"
    },
    button: {
      marginTop: "30px"
    }
  };
  class AppArticles extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: { title: "", description: "" },
        ListArticles: []
      };
      this._addArticle = this._addArticle.bind(this);
      this._handleDelete = this._handleDelete.bind(this);
      this.changeStyle=this.changeStyle.bind(this);
    }
    _addArticle(){
      this.setState({
        ListArticles: this.state.ListArticles.concat(this.state.input)
      });
    };
    _handleDelete(newList){
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
    changeStyle (styleToChange){
      var object=this.refs.description;
  
      console.log("object:",object)
      object.classList.contains(styleToChange)===false?object.classList.add(styleToChange):object.classList.remove(styleToChange);
     
    }
    render() {
      return (
        <div className="App container">
          <h1>Articles</h1>
          <div className="row grey lighten-4 z-depth-4">
            <div className="col s6 m1 l1">
              <div className="row">
                <div className="col s12" />
              </div>
              <div className="row">
                <div className="col s12">
                  <div className="file-field input-field">
                    <div className="btn">
                      <span>File</span>
                      <input type="file" ref="file" onChange={this.onChange}/>
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col s12 m11 l10">
              <div className="row">
                <div className="col s12">
                  <div className="input-field col s6">
                    <input
                      id="title"
                      type="text"
                      className="validate"
                      onChange={e => {
                        let deepTitleState = { ...this.state.input };
                        deepTitleState.title = e.currentTarget.value;
                        this.setState({ input: deepTitleState });
                      }}
                    />
                    <label htmlFor="title">Titre</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <div className="input-field col s12">
                    <textarea
                    ref="description"
                      id="description"
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
                        <td id="bold"
                          ref="bold" style={styles.td} 
                          onMouseOver={() => 		this.refs.bold.classList.add("blue","lighten-4")}
                          onMouseOut={() =>  this.refs.bold.classList.remove("blue","lighten-4")}                         onClick={()=>this.changeStyle("bold")}>
                          <span>B</span>
                        </td>
                        <td  id="italic"
                          ref="italic" style={styles.td} 
                          onMouseOver={() => 		this.refs.italic.classList.add("blue","lighten-4")}
                         onMouseOut={() =>  this.refs.italic.classList.remove("blue","lighten-4")}                        onClick={()=>this.changeStyle("italic")}>
                          <span>I</span>
                        </td>
                        <td id="underline"
                          ref="underline" 
                          style={styles.td}
                             onMouseOver={() => this.refs.underline.classList.add("blue","lighten-4")}
                          onMouseOut={() =>
                            this.refs.underline.classList.remove("blue","lighten-4")
                          }
                          onClick={() =>
                            this.changeStyle(this.refs.description, "underline")
                          }
                          onClick={()=>this.changeStyle("underline")}>
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
                className="btn waves-effect waves-light"
                type="submit"
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
  class ListArticles extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        ListArticles: [
      /*     {
            title: "Joli text",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          } */
        ]
      };
      this._removeArticle = this._removeArticle.bind(this);
      this.moveUp = this.moveUp.bind(this);
      this.moveDown = this.moveDown.bind(this);
    }
    shouldComponentUpdate(nextProps) {
      console.log(
        "shouldListArticlesComponentUpdate?",
        nextProps.IncListArticles !== this.props.IncListArticles
      );
      return nextProps.IncListArticles !== this.props.IncListArticles;
    }
    componentWillReceiveProps(nextProps) {
      this.setState({ ListArticles: nextProps.IncListArticles });
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
      /* 
      console.log("indexArticle:", indexArticle);
      cloneListArticles.filter((value, index) => {
        console.log("index in filter:", index);
        console.log("indexArticle in filter:", indexArticle);
        return index !== indexArticle;
      });
      console.log("cloneListArticles before setstate:", cloneListArticles); */
    };
    _move = (ListArticles, elt, iteration) => {
    // :_(
      var indexArticle=ListArticles.indexOf(elt);
      var newIndex=indexArticle+iteration
      if(newIndex<0 || newIndex>ListArticles.length){
        console.log("En dehors du tableau")
        return;
      }
  
  
    };
    moveUp = article => {
      console.log("article in moveUp:",article)
      this._move(this.state.ListArticles, article, 1);
    };
    moveDown = article => {
      console.log("article in moveDown:",article)
      this._move(this.state.ListArticles, article, -1);
    };
  
    render() {
      const ListArticles = this.state.ListArticles.map((article, index) => (
        <div className="row grey lighten-4 z-depth-4" key={index}>
          <div className="col s1">
            <div className="row">
              <div className="col s12" />
            </div>
            <div className="row">
              <div className="col s12">
                {/*    <img
                  className="materialboxed"
                  width="150"
                  src="https://lorempixel.com/800/400/nature/4"
             /> */}
              </div>
            </div>
          </div>
          <div className="col s10">
            <div className="row">
              <div className="col s5 offset-s3">
                <h5 className="col s12 white z-depth-1 center-align"  style={{padding:"10px"}}>{article.title}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col s11 white z-depth-1">
                <div className="input-field col s12">{article.description}</div>
              </div>
            </div>
          </div>
          <div className="col s1" style={styles.button}>
            <button
              className="btn waves-effect waves-light blue"
              type="submit"
              name="action"
              onClick={()=>this.moveUp(article)}
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
              type="submit"
              name="action"
              onClick={()=>this.moveDown(article)}
            >
              <i className="material-icons">arrow_downward</i>
            </button>
          </div>
        </div>
      )).sort((a, b) => {
        return b.key - a.key;
      });
      return <div>{ListArticles}</div>;
    }
  }
  
  ReactDOM.render(<AppArticles />, document.querySelector("#app"))
  