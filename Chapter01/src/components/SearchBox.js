import React, { useState } from "react";

function SearchBox(props) {
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(event) {
    setSearchValue(event.target.value);
    props.onSearch(event.target.value);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchValue}
        onChange={(event) => handleSearch(event)}
      />
    </div>
  );
}

export default SearchBox;
