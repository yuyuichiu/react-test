import React from 'react';
import logo from './logo.svg';
import './App.css';

export class MyComponent extends React.Component {
  constructor(props) {
      super(props);
      this.state = { title: "This comes from a state" }
  }

  componentDidMount() {
    let timeOut = setTimeout(() => {
      this.setState({ title: "This comes from editing the state" });
    }, 2000)
  }

  render() {
      return (
      <div className='container'>
          <h1>{this.state.title}</h1>
          <p>Creating react app with create-react application.</p>
          <p>Please reload.</p>
      </div>
      )
  }
}

// export default App;


//   class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.props.title = "Hello to my React App"
//   }

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             {this.props.title}
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React.
//           </a>
//         </header>
//       </div>
//     );
//   }
// }