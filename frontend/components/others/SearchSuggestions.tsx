import searchSuggestionsStyles from '../../styles/components/SearchSuggestions.module.scss';

interface SearchSuggestionsProps {
  suggestions: Array<string>;
  onClickHandler: (title: string) => void;
  style?: string;
}
export const SearchSuggestions = ({
  suggestions,
  onClickHandler,
  style,
}: SearchSuggestionsProps) => {
  return (
    <div className={`${searchSuggestionsStyles['suggestions-wrapper']}`}>
      {suggestions.map((name: string) => {
        return (
          <button
            type="button"
            onClick={() => onClickHandler(name)}
            className={`${searchSuggestionsStyles.suggestion} ${style}`}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};
export default SearchSuggestions;
