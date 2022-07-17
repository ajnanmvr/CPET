const handleSearchChange = (
  searchWord,
  setwordEntered,
  array,
  valueName,
  setSearchResults
) => {
  setwordEntered(searchWord);
  if (searchWord !== "") {
    let newFilter = array.filter((value) => {
      return value[valueName].toLowerCase().includes(searchWord.toLowerCase());
    });
    setSearchResults(newFilter);
  } else {
    setSearchResults(array);
  }
};

export default handleSearchChange;