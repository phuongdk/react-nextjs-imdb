import { Component } from 'react'
import config from '../libs/config'
import Breadcrumbs from '../components/breadcrumbs'
import Layout from '../components/layout.js'

class Index extends Component {
  render () {
    const { page: { home: { appName, description, copyright } } } = config
    return (
      <Layout>
        <div className='home-wrapper component-wrapper'>
          <Breadcrumbs home={config.page.home} />
          <div className='home-content block-content'>
            <div className='page-section-wrap'>
              <table className='table table-bordered table-hover'>
                <tbody>
                  <tr>
                    <td className='infor'>Application Name</td>
                    <td className='content'>{appName}</td>
                  </tr>
                  <tr>
                    <td className='infor'>Description</td>
                    <td className='content'>{description}</td>
                  </tr>
                  <tr>
                    <td className='infor'>Copyright</td>
                    <td className='content'>{copyright}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
export default Index
