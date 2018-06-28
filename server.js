const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const next = require('next')
const fetch = require('isomorphic-unfetch')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const schema = buildSchema(`
  type Query {
    hello: String
    getMovies(keyword: String!): [Movies]
    getMovieDetail(id: ID!): Show
  }
  type Movies {
    score: Float
    show: Show
  }
  type Show {
    id: Int
    url: String
    name: String
    type: String
    language: String
    genres: [String]
    status: String
    runtime: Int
    premiered: String
    officialSite: String
    image: Image
    rating: Rating
    summary: String
    updated: Int
  }
  type Rating {
    average: Float
  }
  type Image {
    medium: String
    original: String
  }
`)

const root = {
  hello: () => {
    return 'Hello world!'
  },
  getMovies: async ({keyword}) => {
    try {
      const url = 'https://api.tvmaze.com/search/shows?q=' + keyword
      const res = await fetch(url)
      const data = await res.json()
      return data
    } catch (error) {
      return null
    }
  },
  getMovieDetail: async ({id}) => {
    try {
      const url = 'https://api.tvmaze.com/shows/' + id
      const res = await fetch(url)
      const data = await res.json()
      return data
    } catch (error) {
      return null
    }
  }
}

app.prepare().then(() => {
  const server = express()

  server.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  }))

  server.get('/d/:id', (req, res) => {
    const actualPage = '/detail'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Running on http://localhost:3000')
  })
}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
