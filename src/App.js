import './App.css';
import { Component } from 'react';
import SearchAppBar from "./components/nav"
import Welcome from './components/welcome';
import PokemonData from './components/pokemonData'

class App extends Component {
  constructor() {
    super();
    this.state = {
      isWelcome: true,
      searchName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange = (event) => {
    this.setState({ searchName: event.target.value, clean: false });
    console.log(this.state.searchName)
    if(event.key == 'Enter' || event == 'click'){
      this.handleSubmit()
    }
  }

  handleSubmit() {
    console.log(this.state.searchName)
    this.componentDidMount()   
  }

  welcomeScreenToggle () {
    if (this.state.isWelcome) {
      this.setState({ isWelcome: false})
    } else {
      this.setState({ isWelcome: true})
    }
  }

  async componentDidMount() {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + this.state.searchName
    fetch(url)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((data) => {
      console.log(data)
    }).catch((error) => {
      console.log(error);
    });
  }

  render(){
    let { isWelcome } = this.state
    return (
      <div className="App">
        <SearchAppBar handleChange= {this.handleChange} handleSubmit= {this.handleSubmit} />
        {isWelcome ? <Welcome /> : <PokemonData />}
      </div>
    );
  }
}



export default App;
