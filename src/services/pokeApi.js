export const getPokemonInfo = (pokemonName) => {
  try {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => data);
  } catch (e) {
    return e;
  }
};
