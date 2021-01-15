// In src/pages/Page.js
import React, { useEffect, useState, Component } from 'react'
import { RichText } from 'prismic-reactjs'
import { client, linkResolver } from '../prismic-configuration'

import NotFound from './prismic-defaults/NotFound'
import { PageInfo } from '../components'
import { getSimplePageInfo } from '../utils/page-utils'

const LandingPage = ({ match }) => {
  const [doc, setDocData] = useState(null)
  const [notFound, toggleNotFound] = useState(false)

  const uid = match.params.uid
  let allPages = [];

  // Get the page document from Prismic
  useEffect(() => {
    const fetchData = async () => {
      // We are using the function to get a document by its UID
      await client.getSingle('landingpage')
        .then(result => {
          return setDocData(result)
        })
        .catch(e=>{
          console.warn('LandingPage document not found. Make sure it exists in your Prismic repository')
          toggleNotFound(true)
        });
    }
    fetchData();

    const getAllPages = async () => {
      client.query('').then(res => {
        res.results.forEach(page => {
          let pageData = getSimplePageInfo(page);
          allPages.push(<PageInfo page={pageData} key={pageData.id} />);
        });
        console.log(allPages);

      });
    }
    getAllPages();


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
        <h3>Pages</h3>
        {allPages}
      </main>
    )
  } else if (notFound) {
    return <NotFound />
  }
  return null;
}

export default LandingPage;
