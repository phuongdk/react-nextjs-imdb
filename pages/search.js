import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Layout from '../components/layout.js'
import Breadcrumbs from '../components/breadcrumbs'
import Searchbox from '../components/searchbox'
import LoadingIndicator from '../components/loadingindicator'
import config from '../libs/config'
import { querySearchMovies } from '../queries'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      shows: [],
      loading: false,
      totalResults: null,
      search: '',
      message: null
    }
    this.timeoutId = null
    this.firstTimeInit = true
    this.handleSearch = this.handleSearch.bind(this)
  }

  static async getInitialProps () {
    // client fetching
    // try {
    //   const result = await fetch(`${config.tvMazeSearchApiEndpoint}${config.defaultMovies}`)
    //   const data = await result.json()
    //   const totalResults = data.length
    //   return {
    //     shows: data,
    //     totalResults,
    //     message: null
    //   }
    // } catch (error) {
    //   return {
    //     message: config.fetchError
    //   }
    // }

    // graphql fetching
    try {
      const fetchData = await fetch(config.graphqlEndPoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: querySearchMovies,
          variables: { keyword: config.defaultMovies }
        })
      })
      const result = await fetchData.json()
      const totalResults = result.data.getMovies.length
      if (totalResults > 0) {
        return {
          shows: result.data.getMovies,
          totalResults,
          message: null
        }
      } else {
        return {
          message: config.page.search.noMovies
        }
      }
    } catch (error) {
      return {
        message: config.fetchError
      }
    }
  }

  async componentWillMount () {
    this.setState({
      shows: this.props.shows,
      totalResults: this.props.totalResults,
      message: this.props.message
    })
  }

  async getMovies (keyword) {
    try {
      const results = await fetch(`${config.tvMazeSearchApiEndpoint}${keyword}`)
      const shows = await results.json()
      if (shows.length > 0) {
        const totalResults = shows.length
        this.setState({
          shows,
          totalResults,
          message: null
        })
      } else {
        this.setState({
          shows: [],
          totalResults: null,
          message: config.page.search.noMovies
        })
      }
    } catch (error) {
      this.setState({
        message: config.fetchError
      })
    }
  }

  handleSearch (value) {
    let keyWord = value
    let newKeyWord = keyWord.trim()
    let keywordLength = newKeyWord.length
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    this.setState({
      search: keyWord
    })
    if (keywordLength < 3) {
      if (keywordLength === 0) {
        this.timeoutId = setTimeout(() => {
          this.getMovies(config.defaultMovies)
        }, 500)
        return
      }
      this.timeoutId = setTimeout(() => {
        this.setState({
          shows: [],
          totalResults: null,
          message: config.page.search.keyWordLengthMessage
        })
      }, 500)
      return
    }
    this.timeoutId = setTimeout(() => {
      this.getMovies(newKeyWord)
    }, 500)
  }

  render () {
    const { shows, loading, totalResults, message, search } = this.state
    return (
      <Layout>
        <div className='search-wrapper'>
          <Breadcrumbs search={config.page.search} />
          <div className='search-content block-content'>
            <Searchbox onSearchChange={this.handleSearch} search={search} />
            {
              totalResults ? <p>Showing <span className='totalresults'>{totalResults}</span> movies</p> : null
            }
            <div className='page-section-wrap'>
              <LoadingIndicator icon={loading} />
              {
                shows && shows.length > 0
                  ? shows.map(({show}) => (
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
                  : <div className='movie-content-wrap'>{message}</div>
              }
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
export default Search
