import { PokeList } from './PokeList';
import { getPokemonInfo } from '../services';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const mockedPokemon = {
  name: 'ditto',
  sprites: {
    front_default: 'image',
  },
};

jest.mock('../services', () => ({
  getPokemonInfo: jest.fn().mockImplementation(() => Promise.resolve(mockedPokemon)),
}));

describe('PokeList tests', () => {
  it('should render one pokemon after loading', async () => {
    jest.setMock();
    render(<PokeList />);

    expect(await screen.findByText('ditto')).toBeInTheDocument();
  });

  it('should render the searched pokemon', async () => {
    render(<PokeList />);

    expect(await screen.findByText('ditto')).toBeInTheDocument();

    getPokemonInfo.mockImplementation((name) =>
      Promise.resolve({
        name,
        sprites: {
          front_default: 'image2',
        },
      }),
    );
    const PokeNameInput = screen.getByLabelText('Pokemon name');
    userEvent.type(PokeNameInput, 'mewtwo');

    const SearchButton = await screen.findByText('Search');
    userEvent.click(SearchButton);

    expect(await screen.findByText('mewtwo')).toBeInTheDocument();
  });
});
