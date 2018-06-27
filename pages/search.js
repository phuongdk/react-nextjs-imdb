import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Layout from '../components/layout.js'
import Breadcrumbs from '../components/breadcrumbs'
import Searchbox from '../components/searchbox'
import config from '../libs/config'

class Search extends Component {
  static async getInitialProps () {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=ghost')
    const data = await res.json()
    return {
      shows: data
    }
  }

  handleSearch (value) {
    console.log(value)
  }

  render () {
    return (
      <Layout>
        <div className='search-wrapper'>
          <Breadcrumbs search={config.page.search} />
          <div className='search-content block-content'>
            <Searchbox onSearchChange={this.handleSearch} />
            <div className='page-section-wrap'>
              <ul>
                {
                  this.props.shows.map(({show}) => (
                    <div className='movie-content-wrap animated fadeIn' key={show.id} style={{WebkitAnimationDuration: '2s'}}>
                      <div className='row'>
                        <div className='poster col-md-5 col-12'>
                          {
                            show.image && show.image.medium &&
                            <img src={show.image.medium} alt='Poster' />
                          }
                        </div>
                        <div className='movie-info col-md-7 col-12'>
                          <p>{show.name}</p>
                          <p>Publish in <strong>{show.premiered}</strong></p>
                          <p>Movie Type: {`${show.genres}`}</p>
                          <p>Movie ID: {show.id}</p>
                          <p>
                            <Link as={`/d/${show.id}`} href={`/detail?id=${show.id}`}>
                              <a className='btn-moviedetail'>Read more</a>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
export default Search
