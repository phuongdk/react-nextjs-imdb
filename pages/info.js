import config from '../libs/config'
import Layout from '../components/layout.js'
import Breadcrumbs from '../components/breadcrumbs'
import MovieLogo from '../components/movielogo'

function Info () {
  const { page: { info: { appName, appDescription, author, division } } } = config
  return (
    <Layout>
      <div className='info-wrapper component-wrapper'>
        <Breadcrumbs info={config.page.info} />
        <div className='info-content block-content'>
          <MovieLogo />
          <div className='page-section-wrap'>
            <table className='table table-bordered table-hover'>
              <tbody>
                <tr>
                  <td className='infor'>Application Name</td>
                  <td className='content'>{appName}</td>
                </tr>
                <tr>
                  <td className='infor'>Description</td>
                  <td className='content'>{appDescription}</td>
                </tr>
                <tr>
                  <td className='infor'>Author</td>
                  <td className='content'>{author}</td>
                </tr>
                <tr>
                  <td className='infor'>Division</td>
                  <td className='content'>{division}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Info
