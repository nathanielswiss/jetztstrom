import Head from "next/head"
const HeadTag = ({ title }) => {
  return (
    <Head>
      <meta property="og:title" content={`JetztStrom.de | Der Tarifrechner`} />
      <link rel="icon" href="favicon.ico" />
      <meta
        name="description"
        content={`Jetzt Strom und Gas Vergleichen unter 080037776606. Tarifvergleichsportale Stromvergleichen Tagesaktuelle Kurse Stromanbieter wechseln einfach gemacht`}
      />
      <meta
        name="keywords"
        content={`080037776606 Tarifvergleichsportale Stromvergleichen  Tagesaktuelle Kurse Stromanbieter wechseln`}
      />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="de" />
      <meta name="revisit-after" content={`1 day`} />
      <meta name="author" content={`JetztStrom.de`} />
      <title> JetztStrom.de | Der Tarifvergleich</title>
      <link rel="canonical" href="https://jetztstrom.de" />
    </Head>
  )
}

export default HeadTag
