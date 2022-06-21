import {
  Grid,
  TextField,
  Paper,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from '@mui/material';
import { getPokemonInfo } from '../services';
import { useEffect, useState } from 'react';

const PokeList = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonInfo, setPokemonInfo] = useState([]);

  const searchPokemon = async () => {
    if (pokemonName !== '') {
      const pokeInfo = await getPokemonInfo(pokemonName.toLocaleLowerCase().trim());
      setPokemonInfo([{ name: pokeInfo?.name, url: pokeInfo?.sprites?.front_default }]);
    }
  };

  useEffect(() => {
    async function savePokemons() {
      const pokeInfo = await getPokemonInfo('charmander');
      setPokemonInfo([{ name: pokeInfo?.name, url: pokeInfo?.sprites?.front_default }]);
    }

    savePokemons();
  }, []);

  return (
    <Paper style={{ maxWidth: '650px', backgroundColor: 'light-blue', padding: 32, margin: 32 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Pokemon name"
            placeholder="Pokemon name"
            type="text"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" onClick={searchPokemon}>
            Search
          </Button>
        </Grid>
        {pokemonInfo.length > 0 ? (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Image</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pokemonInfo?.map((pokemon) => (
                        <TableRow
                          key={pokemon?.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {pokemon?.name}
                          </TableCell>
                          <TableCell align="right">
                            <img src={pokemon?.url} alt={'pokeimgs'} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <CircularProgress color="success" />
        )}
      </Grid>
    </Paper>
  );
};

export { PokeList };
