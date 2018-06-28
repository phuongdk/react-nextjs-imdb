export const querySearchMovies = `
  query searchMovies($keyword: String!) { 
    getMovies(keyword: $keyword) { 
      score 
      show {
        id
        url
        name
        type
        language
        genres
        status
        runtime
        premiered
        officialSite
        image {
          medium
          original
        }
      updated
      } 
    } 
  }`
export const queryMovieDetail = `
  query searchMovies($id: ID!) { 
    getMovieDetail(id: $id) { 
      id
      url
      name
      type
      language
      genres
      status
      runtime
      premiered
      officialSite
      image {
        medium
        original
      }
      rating {
        average
      }
      summary
      updated 
    } 
  }`
