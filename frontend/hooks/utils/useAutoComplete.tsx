import { useEffect } from 'react';

export const useAutoComplete = (
  suggestions: Array<String>,
  suggestionHandler: (suggestion: Array<String>) => void,
  userInput: string
) => {
  const clearSuggestions = () => {
    suggestionHandler([]);
  };
  const filterSearch = () => {
    if (userInput.length === 0) {
      clearSuggestions();
      return;
    }
    const inputSize = userInput.length;
    const filteredSuggestions = suggestions.filter((text) => {
      return (
        text.length >= inputSize &&
        text.toLowerCase().substring(0, inputSize) === userInput.toLowerCase()
      );
    });
    suggestionHandler(filteredSuggestions);
  };
  useEffect(() => {
    filterSearch();
  }, [userInput]);

  return suggestions;
};

export default useAutoComplete;
