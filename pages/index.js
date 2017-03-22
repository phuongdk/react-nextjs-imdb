import Layout from '../components/Layout.js'
import Link from 'next/link'
import axios from 'axios'
import fetch from 'isomorphic-unfetch'

const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

const Index = (props) => (
  <Layout>
    <h1>Blog Posts</h1>
    <ul>
      <PostLink id="1" title="Post1" />
      <PostLink id="2" title="Post2" />
      <PostLink id="3" title="Post3" />
    </ul>
    <ul>
    {
      props.shows &&
      props.shows.map(({show}) => (
        <li key={show.id}>
          <div><img src={show.image.medium} alt={show.name} /></div>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))
    }
    </ul>
    {console.log(props.shows)}
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=Avenger')
  const data = await res.json()

  return {
    shows: data  || null
  }
}

export default Index
