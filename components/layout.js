import { Component } from 'react'
import Link from 'next/link'
class Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bookMarkQty: null
    }
    this.updateBookMark = this.updateBookMark.bind(this)
  }

  componentDidMount () {
    let count = 0
    for (let i = 0, len = window.localStorage.length; i < len; i++) {
      if (!isNaN(parseInt(window.localStorage.key(i)))) {
        count++
      }
    }
    this.setState({
      bookMarkQty: count
    })
  }

  updateBookMark (bookMarkQty) {
    this.setState({
      bookMarkQty: bookMarkQty
    })
  }

  render () {
    const { bookMarkQty } = this.state
    return (
      <div className='App'>
        <div className='router-wrapper'>
          <header>
            <ul>
              <li>
                {/* <NavLink title='Homepage' exact className='nav-link' activeClassName='navlink-active' to='/'>
                  <i className='fa fa-home' aria-hidden='true' />
                </NavLink> */}
                <Link href={`/`}>
                  <a className='nav-link' title='Homepage'><i className='fa fa-home' aria-hidden='true' /></a>
                </Link>
              </li>
              <li>
                <Link href={`/search`}>
                  <a className='nav-link' title='Searchpage'><i className='fa fa-search' aria-hidden='true' /></a>
                </Link>
              </li>
              <li>
                <Link href={`/bookmark`}>
                  <a className='nav-link' title='Bookmarkpage'>
                    <i className='fa fa-bookmark' aria-hidden='true' >
                      <div className='bookmarkQty'>{bookMarkQty}</div>
                    </i>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/info`}>
                  <a className='nav-link' title='Infopage'><i className='fa fa-info' aria-hidden='true' /></a>
                </Link>
              </li>
            </ul>
          </header>
        </div>
        {this.props.children}
      </div>
    )
  }
}
export default Layout
