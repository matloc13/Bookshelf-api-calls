// https: //www.googleapis.com/books/v1/volumes?q=search+terms
//   https: //books.google.com/ebooks?id=buc0AAAAMAAJ&dq=holmes&as_brr=4&source=webstore_bookcard
//   GET https: //www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=yourAPIKey

const baseURL = `https://www.googleapis.com/books/v1/volumes?q=`;
const ipa = `key=AIzaSyAuDK04-7AA33VqCHIAXFQWieg8cPNBaKo`;
let mainSearch = `Foundation`;
let queryTitle = 'Foundation';
let queryAuthor = 'Isaac+Asimov';
const baseAuthor = `inauthor:${queryAuthor}`;
const baseTitle = `intitle:${queryTitle}`;
const bookType = `printType=books`
let queryURL = baseURL + mainSearch + '+' + baseAuthor + '&' + ipa;

// console.log(queryURL);

const findTitle = () => {
  $.ajax({
    url: queryURL,
    // type: "GET"

  }).then((data) => {
    console.log(data);

    for (let i = 0; i < 10; i++) {
      const newBook = $('<div>').text(data.items[i].volumeInfo.title)
      $('.resultsContainer').append(newBook)
    }
    // $('.resultsContainer').html(`
    //   <h3>${data.items[0].volumeInfo.title}</h3>
    //   <h3>${data.items[0].volumeInfo.authors}</h3>`)
  })
}

$(() => {
  findTitle()
})