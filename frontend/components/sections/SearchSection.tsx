import React from 'react';
import dashboardStyles from '../../styles/sections/Dashboard.module.scss';
import { useAppSelector } from '../../hooks';
import { SearchBar } from '../others/SearchBar';
import { SearchSuggestions } from '../others/SearchSuggestions';

interface SearchSectionProps {
  formInput: string;
  suggestionsHandler: (title: string) => void;
  inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchHandler: () => void;
  suggestions: string[];
}
export const SearchSection = ({
  formInput,
  suggestionsHandler,
  inputHandler,
  searchHandler,
  suggestions,
}: SearchSectionProps) => {
  const stateTheme = useAppSelector((state) => state.themeReducer);
  const { darkMode } = stateTheme;
  return (
    <>
      <div className={`${dashboardStyles['searchbar-flex-container']}`}>
        <SearchBar
          input={formInput}
          inputHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
            inputHandler(e)
          }
          searchHandler={searchHandler}
          searchFieldStyle={`${
            darkMode
              ? dashboardStyles['search-input-dark']
              : dashboardStyles['search-input-light']
          }`}
          buttonStyle={`${
            darkMode
              ? dashboardStyles['search-button-dark']
              : dashboardStyles['search-button-light']
          }`}
        />
      </div>
      <SearchSuggestions
        onClickHandler={suggestionsHandler}
        suggestions={suggestions}
        style={`${
          darkMode
            ? dashboardStyles['suggestions-dark']
            : dashboardStyles['suggestions-light']
        }`}
      />
    </>
  );
};
export default SearchSection;
