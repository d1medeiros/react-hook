import React, {Component} from 'react';
import {
    MyForm,
    TesteAPI,
    TesteAPIContainer,
    TesteAPIList,
    X
} from "./components/FormItems";


class App extends Component {
  render() {
      let list = [];
      list.push("nome");
      list.push("sobrenome");
      list.push("idade");
      list.push("outros");
    return (
      <div className="App">
          {/*<MyForm list={list}/>*/}
          <TesteAPIContainer/>
      </div>
    );
  }
}

export default App;
