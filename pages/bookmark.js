import { Component } from 'react'
import Link from 'next/link'
import Breadcrumbs from '../components/breadcrumbs'
import Layout from '../components/layout.js'
import config from '../libs/config'

class Bookmark extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: []
    }
  }

  componentDidMount () {
    this.listBookMark()
  }

  listBookMark () {
    let arr = []
    for (let i = 0, len = window.localStorage.length; i < len; i++) {
      if (!isNaN(parseInt(window.localStorage.key(i)))) {
        let obj = {}
        let key = window.localStorage.key(i)
        let value = window.localStorage[key]
        obj['id'] = key
        obj['name'] = value
        arr.push(obj)
        this.setState({
          movies: arr
        })
      }
    }
  }

  render () {
    const movies = this.state.movies
    const { page: { bookmark: { emptyMoviesMessage } } } = config
    return (
      <Layout>
        <div className='bookmark-wrapper component-wrapper'>
          <Breadcrumbs home={config.page.bookmark} />
          <div className='bookmark-content block-content'>
            <h1>Movies bookmarked</h1>
            {
              movies && movies.length > 0
                ? movies.map((movie, key) =>
                  <div className='link-bookmarked-wrap' key={key}>
                    {/* <Link className='link-bookmarked' to={`/detail/${movie.id}`}>{movie.title}</Link> */}
                    <Link as={`/d/${movie.id}`} href={`/detail?id=${movie.id}`}>
                      <a className='link-bookmarked'>{movie.name}</a>
                    </Link>
                  </div>
                )
                : <div className='no-bookmark'>{emptyMoviesMessage}</div>
            }
          </div>
        </div>
      </Layout>
    )
  }
}
export default Bookmark
