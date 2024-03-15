import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedPokemon, setSearchedPokemon] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=30'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      const data = await response.json();
      setSearchedPokemon(data);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      setSearchedPokemon(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 justify-left">
        <input
          type="text"
          placeholder="Enter Pokemon name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 mr-2 border border-gray-400 rounded-md"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-gray-800 text-white rounded-md"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {searchedPokemon ? (
          <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-800">
            <img
              src={searchedPokemon.sprites.front_default}
              alt={searchedPokemon.name}
              className="w-full h-auto"
            />
            <div className="p-4  bg-gray-800">
              <h2 className="text-lg font-bold text-white">
                {searchedPokemon.name}
              </h2>
            </div>
          </div>
        ) : (
          pokemonList.map((pokemon, index) => (
            <Link key={index} to={`/${pokemon.name}`}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-800">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    index + 1
                  }.png`}
                  alt={pokemon.name}
                  className="w-full h-auto"
                />
                <div className="p-4  bg-gray-800">
                  <h2 className="text-lg font-bold text-white">
                    {pokemon.name}
                  </h2>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Homepage;
