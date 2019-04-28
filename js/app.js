// https: //www.googleapis.com/books/v1/volumes?q=search+terms
//   https: //books.google.com/ebooks?id=buc0AAAAMAAJ&dq=holmes&as_brr=4&source=webstore_bookcard
//   GET https: //www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=yourAPIKey

const baseURL = `https://www.googleapis.com/books/v1/volumes?q=`;
const ipa = `key=AIzaSyAuDK04-7AA33VqCHIAXFQWieg8cPNBaKo`;
let mainSearch = `Harry+Potter`;
let queryTitle = '';
let queryAuthor = '';
let querySubject = 'fantasy';
const baseAuthor = `inauthor:${queryAuthor}`;
const baseTitle = `intitle:${queryTitle}`;
const baseSubject = `subject:${querySubject}`;
const bookType = `printType=books`
let queryURL = baseURL + mainSearch + '+' + baseAuthor + '&' + baseSubject + '&' + ipa;

console.log(queryURL);

const findTitle = () => {
  $.ajax({
    url: queryURL,
    // type: "GET"

  }).then((data) => {
    console.log(data);

    for (let i = 0; i < 10; i++) {
      const book = $('<div>').addClass('book')
      const newAuthor = $('<div>').text(data.items[i].volumeInfo.title)
      const bookCover = $('<img>').attr('src', data.items[i].volumeInfo.imageLinks.thumbnail).on('click', () => {
        //display .description in a modal which also shows thumbnail
      })
      book.append(bookCover).append(newAuthor)
      $('.resultsContainer').append(book)
    }
    // $('.resultsContainer').html(`
    //   <h3>${data.items[0].volumeInfo.title}</h3>
    //   <h3>${data.items[0].volumeInfo.authors}</h3>`)
  })
}

$(() => {

  $('#submit').on('click', () => {
    mainSearch = $('.inputMain').val();
    findTitle();
  })
  findTitle();
})