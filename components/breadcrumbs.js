import React from 'react'

function breadcrumbs (page) {
  return (
    <React.Fragment>
      {
        page.home &&
        <div style={{backgroundColor: page.home.bgcolor}} className='breadcrumbs'>
          <h1 style={{color: page.home.color}} className='title'>{page.home.title}</h1>
        </div>
      }
      {
        page.search &&
        <div style={{backgroundColor: page.search.bgcolor}} className='breadcrumbs'>
          <h1 style={{color: page.search.color}} className='title'>{page.search.title}</h1>
        </div>
      }
      {
        page.detail &&
        <div style={{backgroundColor: page.detail.bgcolor}} className='breadcrumbs'>
          <h1 style={{color: page.detail.color}} className='title'>{page.detail.title}</h1>
        </div>
      }
      {
        page.info &&
        <div style={{backgroundColor: page.info.bgcolor}} className='breadcrumbs'>
          <h1 style={{color: page.info.color}} className='title'>{page.info.title}</h1>
        </div>
      }
      {
        page.bookmark &&
        <div style={{backgroundColor: page.bookmark.bgcolor}} className='breadcrumbs'>
          <h1 style={{color: page.bookmark.color}} className='title'>{page.bookmark.title}</h1>
        </div>
      }
    </React.Fragment>
  )
}
export default breadcrumbs
