import React, { useState } from 'react';
import { PrimaryLayout, NextPageWithLayout } from '../../components';
import { objectKeyToArray } from '../../helpers';
import { useFormInput, usePosition, useFetchData } from '../../hooks';

interface ReviewObject {
  text: string;
  categories: Array<string>;
}
interface BusinessData {
  review?: Array<ReviewObject>;
  isSuccessful?: boolean;
  positiveRatings?: number;
  negativeRatings?: number;
  competitors?: Array<Object>;
  similarProducts?: Array<String>;
}
const DashBoard: NextPageWithLayout = () => {
  const BASE_URL = 'http://localhost:5000/businesses/autocomplete';

  const { latitude, longitude } = usePosition();
  const [businessID] = useState('');
  const [formInput, onChangeHandler] = useFormInput();
  const [businessData] = useState<BusinessData>({});
  const [endpoint, setEndpoint] = useState('');

  const { data } = useFetchData(BASE_URL, endpoint);
  const terms = data['terms' as keyof typeof data];
  // eslint-disable-next-line operator-linebreak
  const suggestions =
    terms !== undefined ? objectKeyToArray(terms, 'text') : [];

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeHandler(e);
    const queryURL = `?text=${formInput}&latitude=${latitude}&longitude=${longitude}`;
    setEndpoint(queryURL);
  };

  return (
    <>
      <input
        style={{ 'margin-top': '6em' }}
        type="text"
        onChange={inputHandler}
        placeholder="enter"
      />
      {businessData}
      {businessID}
      {suggestions.map((name: string) => {
        return <p>{name}</p>;
      })}
    </>
  );
};

export default DashBoard;
DashBoard.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
