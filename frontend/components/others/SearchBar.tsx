import React from 'react';
import searchBarStyles from '../../styles/components/SearchBar.module.scss';
import { SearchSVG } from '../svg/common/Search';

interface SearchBarProps {
  input: string;
  inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchHandler: () => void;
  searchFieldStyle?: string;
  buttonStyle?: string;
  icon?: React.ReactNode;
}
export const SearchBar = ({
  input,
  inputHandler,
  searchHandler,
  searchFieldStyle = searchBarStyles['search-input'],
  buttonStyle = searchBarStyles['search-button'],
  icon = <SearchSVG />,
}: SearchBarProps) => {
  return (
    <div className={`${searchBarStyles['search-box']}`}>
      <input
        type="text"
        onChange={inputHandler}
        placeholder="Search..."
        value={input}
        className={searchFieldStyle}
      />
      <button type="button" onClick={searchHandler} className={buttonStyle}>
        {icon}
      </button>
    </div>
  );
};

export default SearchBar;
