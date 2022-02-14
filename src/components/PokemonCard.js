import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PokemonStats from './pokemonStats'

export default function PokemonCard(props) {
  let pokeData = props.pokeData;
  let selectObj = {
    name: pokeData.name,
    id: pokeData.id,
    image: pokeData.image,
    stats: pokeData.stats
  }
  return (
    <Card onClick={(event) => props.changePokemon(selectObj)} sx={{ maxWidth: 200}}>
      <CardActionArea>
        <CardMedia
          // maxHeight="500"
          component="img"    
          image={pokeData.image}
          alt={pokeData.name}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pokeData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <PokemonStats stats={pokeData.stats} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
