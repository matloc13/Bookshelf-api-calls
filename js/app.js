const baseURL = `https://www.googleapis.com/books/v1/volumes?`
const ipa = `key=AIzaSyAuDK04-7AA33VqCHIAXFQWieg8cPNBaKo`
const baseTitle = `q=intitle:${queryTitle}`
let queryTitle = 'The Grasshopper'
let queryURL = baseURL + baseTitle + ipa

console.log(queryURL);


https: //www.googleapis.com/books/v1/volumes?q=search+terms
  https: //books.google.com/ebooks?id=buc0AAAAMAAJ&dq=holmes&as_brr=4&source=webstore_bookcard
  GET https: //www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=yourAPIKey

  const findTitle = () => {
    $.ajax({
      url: queryURL,
      type: "GET"

    })
  }