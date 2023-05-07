import { useState } from 'react';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@material-ui/core/IconButton';
import { InputAdornment } from '@material-ui/core';

interface SearchBarProps {
  searchText: string | null;
  setSearchText: React.Dispatch<React.SetStateAction<string | null>>;
}

export function SearchBar({ searchText, setSearchText }: SearchBarProps)
{
    // console.log(searchText)
    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        console.log(event.target.value)
        setSearchText(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const inputElement = document.getElementById('search-field') as HTMLInputElement;
        console.log(inputElement.value);
        setSearchText(inputElement.value);
        // setSearchText('')
    };

    

  return (
    <form onSubmit={handleSearchSubmit}>
      <TextField
        id="search-field"
        label="Search by Name"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleSearchInputChange}
        InputProps={{
            endAdornment: (
            // <InputAdornment position="end">
            //     <IconButton type="submit" aria-label="search">
                    <SearchIcon />
            //     </IconButton>
            // </InputAdornment>
            ),
        }}
          />
    </form>
  );
}

