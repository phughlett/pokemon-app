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

  }
  handleChange = (event) => {
    this.setState({ searchName: event.target.value, clean: false });
    console.log(this.state.searchName)
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
    
    .then(response => response.json())
    .then((json) => json(json))//t
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  // REMINDER - TALK ABOUT FETCH AND COMPONENTDIDMOUNT AT THE END
  render(){
    let { isWelcome } = this.state
    return (
      <div className="App">
        <SearchAppBar handleChange= {this.handleChange} />
        {isWelcome ? <Welcome /> : <PokemonData />}
      </div>
    );
  }
}



export default App;
