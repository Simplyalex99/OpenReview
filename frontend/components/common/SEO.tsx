import React from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
      />
      <meta name="description" content={description} />
      <link rel="icon" href="/images/logo.jpg" />
    </Head>
  );
};

export default SEO;
