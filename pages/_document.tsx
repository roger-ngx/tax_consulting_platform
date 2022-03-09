import Document, { Html, Head, Main, NextScript } from 'next/document'
class TaxFunDocument extends Document {
  render() {    return (
      <Html>
        <Head>
          <title>Happy tax & bookkeeping life</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default TaxFunDocument