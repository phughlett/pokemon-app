import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PokemonCard from './PokemonCard';

export default function TeamData(props) {  
  

    let recentArray = [];
    for(let i = 0; i < 4; ++i){
        if(props.data[i]){
          recentArray.push(<PokemonCard sx={{maxHeight: 100}}
            pokeData={props.data[i]}                 
            />)
        }
    }

    return (
    <Box className="team-box" sx={{ margin: '25px', backgroundColor: 'pink', width: '75%'}}>
      <Button variant="contained" onClick={(event) => props.addtoTeam()}>Add to Team</Button>
      {recentArray}
    </Box>
  );

}