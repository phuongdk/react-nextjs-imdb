import {Component} from 'react'
class Searchbox extends Component {
  constructor (props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch (event) {
    this.props.onSearchChange(event.target.value)
  }

  render () {
    const { search } = this.props
    return (
      <div className='searchbox'>
        <input type='text' name='search' placeholder='Search by movie name...' onChange={this.handleSearch} value={search} />
      </div>
    )
  }
}
export default Searchbox
