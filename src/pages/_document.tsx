import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { globalStyles } from '../shared/styles'
// import { ServerStyleSheets } from '@material-ui/core/styles';
import createEmotionCache from '../shared/createEmotionCache';
import createEmotionServer from '@emotion/server/create-instance';
import React from 'react';

const MyDocument = () => (
  <Html>
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

MyDocument.renderDocument = Document.renderDocument

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage
  // const sheets = new ServerStyleSheets();
  const page = await ctx.renderPage()
    // const { css, ids } = await renderStatic(page.html)
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);
  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line react/display-name
      enhanceApp: (App: any) => (props) => <App emotionCache={cache} {...props} />,
    });

  const initialProps = await Document.getInitialProps(ctx)

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  }
}

export default MyDocument