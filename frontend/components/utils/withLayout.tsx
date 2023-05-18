import React from 'react';
import { PrimaryLayout } from '../layouts/PrimaryLayout';

export const withLayout = () => {
  return function getLayout(page: React.ReactElement) {
    return <PrimaryLayout>{page}</PrimaryLayout>;
  };
};
export default withLayout;
