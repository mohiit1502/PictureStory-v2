export default class DataService {

  getFeaturedImages() {
    return fetch('/images/nature')
    .then(res => {
      // console.log(res)
      // console.log(res.json())
      return res.json()
    })
    .catch(err => console.log(err))
  }
}
