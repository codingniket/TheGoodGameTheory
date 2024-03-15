import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Pokemon = () => {
  const { name } = useParams();
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error(`Error fetching Pokemon data for ${name}:`, error);
      }
    }
    fetchPokemonData();
  }, [name]);

  if (!pokemonData) {
    return <div>Not Found...</div>;
  }

  const { sprites, stats } = pokemonData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md border border-gray-800 overflow-hidden">
        <div className="p-4">
          <img src={sprites.front_default} alt={name} className="mx-auto" />
          <h2 className="text-xl font-semibold text-center mt-4">{name}</h2>
          <div className="mt-2">
            <h3 className="text-lg font-semibold">Stats:</h3>
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>{stat.stat.name}</div>
                <div>{stat.base_stat}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
