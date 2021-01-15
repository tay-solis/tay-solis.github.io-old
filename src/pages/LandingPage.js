// In src/pages/Page.js
import React, { useEffect, useState } from 'react'
import { RichText } from 'prismic-reactjs'
import { client, linkResolver } from '../prismic-configuration'
import NotFound from './prismic-defaults/NotFound'

const LandingPage = ({ match }) => {
  const [doc, setDocData] = useState(null)
  const [notFound, toggleNotFound] = useState(false)

  const uid = match.params.uid

  // Get the page document from Prismic
  useEffect(() => {
    const fetchData = async () => {
      // We are using the function to get a document by its UID
      const result = await client.getSingle('landingpage');
      console.log(result);

      if (result) {
        // We use the State hook to save the document
        return setDocData(result)
      } else {
        // Otherwise show an error message
        console.warn('LandingPage document not found. Make sure it exists in your Prismic repository')
        toggleNotFound(true)
      }
    }
    fetchData()
  }, [uid]) // Skip the Effect hook if the UID hasn't changed

  if (doc) {
    return (
      <main className="landing-page">
        <header className="landing-page__header-container">
          <h1 className="landing-page__title">
            {RichText.asText(doc.data.title)}
          </h1>
          <h2 className="landing-page__subtitle">
            {RichText.asText(doc.data.subtitle)}
          </h2>  
        </header>
      </main>
    )
  } else if (notFound) {
    return <NotFound />
  }
  return null;
}

export default LandingPage;
