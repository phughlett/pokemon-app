import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PokemonCard from './PokemonCard';

export default function TeamData(props) {  
  

    let recentArray = [];
    for(let i = 0; i < 4; ++i){
        if(props.data[i]){
          recentArray.push(<PokemonCard
            pokeData={props.data[i]}                 
            />)
        }
    }

    return (
    <Box sx={{ margin: '25px', display: '',backgroundColor:'red'  }}>
      <Button variant="contained" onClick={(event) => props.addtoTeam()}>Add to Team</Button>
      {recentArray}
    </Box>
  );

}