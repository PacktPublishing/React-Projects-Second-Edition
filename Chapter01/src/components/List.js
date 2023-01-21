import React, { useState, useEffect, useMemo } from "react";
import Character from "./Character";
import SearchBox from "./SearchBox";

function List() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function fetchData(url) {
      setLoading(true);
      try {
        while (url) {
          const res = await fetch(url);
          const data = await res.json();
          setCharacters((prevCharacters) => [
            ...prevCharacters,
            ...data.results
          ]);
          url = data.info?.next;
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData("https://rickandmortyapi.com/api/character");
  }, []);

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) =>
      character.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [characters, searchValue]);

  return (
    <div>
      <SearchBox onSearch={setSearchValue} />
      <h2>Characters</h2>
      <div className="row">
        {loading ? (
          <div>Loading...</div>
        ) : (
          filteredCharacters.map((character) => (
            <Character
              key={character.id}
              name={character.name}
              origin={character.origin}
              image={character.image}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default List;
