

function PokemonStats({stats}){
    
  //console.log(stats);

  let statSheet = '||\n'

  for(let i = 0; i < stats.length; ++i){
    statSheet += stats[i].stat.name + " " + stats[i].base_stat + " \n||\n";
  }    
    
  return statSheet;
  
  }
  
  


    


  





export default PokemonStats;