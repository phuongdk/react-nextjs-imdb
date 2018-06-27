import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout.js'
import Breadcrumbs from '../components/breadcrumbs'
import config from '../libs/config'

class Detail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bookmark: false,
      movie: null,
      message: null
    }
    this.handleBookMark = this.handleBookMark.bind(this)
  }

  componentDidMount () {
    this.checkBookMark()
    this.setState({shouldUpdate: true})
  }

  static async getInitialProps (context) {
    const { id } = context.query
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
    const show = await res.json()
    return { show, id }
  }

  checkBookMark () {
    if (window.localStorage.length > 0 && window.localStorage.getItem(this.props.id) !== null) {
      this.setState({
        bookmark: true
      })
    }
  }

  handleBookMark (event) {
    this.setState({
      bookmark: !this.state.bookmark
    })
    if (this.state.bookmark === false) {
      window.localStorage.setItem(this.props.id, this.props.show.name)
    } else {
      window.localStorage.removeItem(this.props.id)
    }
  }

  render () {
    const { bookmark } = this.state
    const { show } = this.props
    return (
      <Layout>
        <div className='detail-wrapper component-wrapper'>
          <Breadcrumbs detail={config.page.detail} />
          <div className='detail-content block-content'>
            <div className='bookmark-wrapper' onClick={this.handleBookMark}>
              {bookmark === true ? <i className='fa fa-bookmark green' /> : <i className='fa fa-bookmark red' />}
            </div>
            <div className='page-section-wrap'>
              {
                show &&
                  <div className='movie-content-wrap'>
                    <div className='poster'>
                      <img src={show.image.original} alt='Poster' />
                    </div>
                    <div>
                      <p>{show.name}</p>
                      <p>Publish in <strong>{show.premiered}</strong></p>
                      <p>Movie Type: {`${show.genres}`}</p>
                      <p>Movie Status: {show.status}</p>
                      <p>Language: {show.language}</p>
                      <p>Plot: {show.summary.replace(/(<[/]?p>)|(<[/]?b>)/g, '')}</p>
                      <p>Rating: {show.rating.average ? show.rating.average : 'none'}</p>
                    </div>
                  </div>
              }
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
export default Detail
