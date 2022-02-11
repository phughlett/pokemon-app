

function PokemonData({name, sprites, id}){
  <div>
    <p>{name}   {id}</p><br />
    <img src={sprites.front_default} alt={name} />
  </div>



}

export default PokemonData;