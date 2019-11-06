export default class DataService {

  constructor() { }

  getFeaturedImages() {
    fetch('/images/featured')
    .then(res => res.json())
    .catch(err => console.log(err))
  }
}
