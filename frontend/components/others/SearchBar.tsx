import React, { InputHTMLAttributes, FC } from 'react';
import searchBarStyles from '../../styles/components/SearchBar.module.scss';
import { SearchSVG } from '../svg/common/Search';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  input: string;
  inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchHandler: () => void;
  searchFieldStyle?: string;
  buttonStyle?: string;
  icon?: React.ReactNode;
}
export const SearchBar: FC<SearchBarProps> = ({
  input,
  inputHandler,
  searchHandler,
  searchFieldStyle = searchBarStyles['search-input'],
  buttonStyle = searchBarStyles['search-button'],
  icon = <SearchSVG />,
  ...props
}) => {
  return (
    <div className={`${searchBarStyles['search-box']}`}>
      <input
        type="text"
        onChange={inputHandler}
        placeholder="Search..."
        value={input}
        className={searchFieldStyle}
        {...props}
      />
      <button type="button" onClick={searchHandler} className={buttonStyle}>
        {icon}
      </button>
    </div>
  );
};

export default SearchBar;
