import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFetchData, useFormInput, usePosition } from '../../hooks';
import UrlApiTypesEnum, { UrlPages } from '../../enums/types';
import { objectKeyToArray, queryBuilder } from '../../utils';
import { SearchSection } from '../sections/SearchSection';

interface AutoCompleteJSON {
  terms?: object[];
}
export type SearchPropsType = {
  formInput: string;
  businessResponse: {
    loading: boolean;
    data: {} | undefined;
    error?: string | undefined;
  };
  searchTerm: string;
};
type WithSearchTypeProps = {
  wrapperClassName?: string;
  searchbarClassName?: string;
};

export const withSearch = <P extends object>(Component: React.FC<P>) => {
  return (props: WithSearchTypeProps & P) => {
    const { wrapperClassName, searchbarClassName } = props;
    const { AUTOCOMPLETE_URL, SEARCH_BUSINESSES_URL } = UrlApiTypesEnum;
    const { DASHBOARD_SEARCH_PATH } = UrlPages;
    const router = useRouter();
    const { pathname, query } = router;
    const queryInput = (query?.input as string) ?? '';

    const [formInput, onChangeHandler, setFormInput] = useFormInput(queryInput);
    const { latitude, longitude } = usePosition();
    const initialSearchQuery = queryBuilder({
      term: formInput,
      latitude,
      longitude,
      limit: 3,
    });

    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const [searchTerm, setSearchTerm] = useState(formInput);
    const initialAutoQuery = queryBuilder({
      text: formInput,
      latitude,
      longitude,
    });
    const [endpoint, setEndpoint] = useState(initialAutoQuery);
    const autoCompleteResponse = useFetchData(AUTOCOMPLETE_URL, endpoint);
    const autoCompleteJSON: AutoCompleteJSON = autoCompleteResponse?.data ?? {};
    const terms = autoCompleteJSON?.terms ?? undefined;
    const businessesResponse = useFetchData(SEARCH_BUSINESSES_URL, searchQuery);

    const suggestions = terms
      ? (objectKeyToArray(terms, 'text') as Array<string>)
      : [];

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeHandler(e);
      const queryURL = queryBuilder({
        text: formInput,
        latitude,
        longitude,
      });
      setEndpoint(queryURL);
    };

    const suggestionsHandler = (name: string) => {
      setFormInput(name);
    };

    const searchHandler = () => {
      if (pathname !== DASHBOARD_SEARCH_PATH) {
        router.push({
          pathname: DASHBOARD_SEARCH_PATH,
          query: {
            input: formInput,
          },
        });
      }

      const queryParams = queryBuilder({
        term: formInput,
        latitude,
        longitude,
        limit: 50,
      });
      setSearchTerm(formInput);
      setSearchQuery(queryParams);
    };
    return (
      <div className={wrapperClassName}>
        <div className="wrapper">
          <div className={`custom-search-wrapper ${searchbarClassName} `}>
            <SearchSection
              formInput={formInput}
              inputHandler={inputHandler}
              searchHandler={searchHandler}
              suggestions={suggestions}
              suggestionsHandler={suggestionsHandler}
            />
          </div>
        </div>
        <Component
          formInput={formInput}
          businessResponse={businessesResponse}
          searchTerm={searchTerm}
          {...(props as P)}
        />
      </div>
    );
  };
};
export default withSearch;
