// eslint-disable-next-line object-curly-newline
import { Html, Main, Head, NextScript } from 'next/document';

export const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="modal" />
      </body>
    </Html>
  );
};
export default Document;
