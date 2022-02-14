import './App.css';
import { Component } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import SearchAppBar from "./components/nav"
import Welcome from './components/welcome';
// import PokemonCard from './components/PokemonCard'
import PokemonStats from './components/pokemonStats'
import HistoryBox from './components/HistoryBox';
import TeamBox from './components/TeamBox'
// import Grid from '@mui/material/Grid';
// import PokemonData from './components/pokemonData'

class App extends Component {
  constructor() {
    super();
    this.state = {
      isWelcome: true,
      searchName: '',
      noResult: false,
      selectedPokemon: {},
      searchHistory: [],
      teamData: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changePokemon = this.changePokemon.bind(this);
    this.addToTeam = this.addToTeam.bind(this);
  }
  handleChange = (event) => {
    this.setState({ searchName: event.target.value});
    console.log(this.state.searchName)
    if(event.key == 'Enter'){
      this.handleSubmit()
    }
  }
  
  changePokemon (obj) {
    // console.log("Called Change Pokemon", key);
    this.setState({ selectedPokemon: obj });
    this.setState({ pokemonSelected: true });
  }

  handleSubmit() {
    console.log('handle submit name',this.state.searchName)
    this.setState({isWelcome: false})
    this.setState({ pokemonSelected: false });
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
      let pokeObj= {
        name: data.name,
        id: data.id,
        image: data.sprites.front_default,
        stats: data.stats
      }
      this.state.searchHistory.unshift(pokeObj)
      this.setState({ selectedPokemon: pokeObj });
      // console.log('array: ', this.state.searchHistory)
      this.setState({noResult: false})
      this.setState({isWelcome: false})
      this.setState({ searchedPokeData: data})
    }).catch((error) => {
      console.log(error);
      this.setState({isWelcome: false})
      this.setState({noResult: true})
    }); 
  }

  addToTeam(){
    console.log("clicked add to Team")
    this.state.teamData.unshift(this.state.selectedPokemon);
    this.setState({isWelcome: false})
  }

  //  componentDidMount() {

  //  }

  render(){
    let { isWelcome } = this.state
    let { noResult } = this.state
    let { pokemonSelected } = this.state
    let {teamData} = this.state
    return (
        <div className="outter">
              <SearchAppBar handleChange= {this.handleChange} handleSubmit= {this.handleSubmit} />  
              <div className = "App">          
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: 'repeat(4, 1fr)' }}>
                  <Box className="mainCard" sx={{  backgroundColor:'green', gridRow: '1/2', gridColumn: '1/5' }}>
                        <Box sx={{ }}>
                          {
                          !this.state.searchedPokeData ? <Welcome /> :  
                          noResult ? <h1>CHECK SPELLING DUMBY!</h1> :   
                          <Card sx={{  maxWidth: 400}}>
                          <CardActionArea>
                            <CardMedia
                              height="100%"
                              component="img"    
                              image={this.state.selectedPokemon.image}
                              alt={this.state.selectedPokemon.name}
                            />
                    
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                {this.state.selectedPokemon.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                <PokemonStats stats={this.state.selectedPokemon.stats} />
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                          }
                        </Box>
                    </Box>
                    <Box sx={{ gridRow: '1/4', gridColumn: '5/6' }}>
                      <TeamBox addtoTeam={this.addToTeam} data={this.state.teamData}/>
                    </Box>
                    <Box sx={{ gridRow: '2/3', gridColumn: '1/5' }} >
                      <HistoryBox 
                      searchHistory = {this.state.searchHistory}
                      changePokemon = {this.changePokemon}             
                      />
                    </Box>

              </Box>
              </div>
           
      </div>
    );
  }
}



export default App;
