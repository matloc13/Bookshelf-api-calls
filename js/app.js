// https: //www.googleapis.com/books/v1/volumes?q=search+terms
//   https: //books.google.com/ebooks?id=buc0AAAAMAAJ&dq=holmes&as_brr=4&source=webstore_bookcard
//   GET https: //www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=yourAPIKey

const searchObj = {
  baseURL: `https://www.googleapis.com/books/v1/volumes?q=`,
  ipa: `key=AIzaSyAuDK04-7AA33VqCHIAXFQWieg8cPNBaKo`,
  mainSearch: '',
  queryAuthor: '',
  querySubject: ''

}
// let baseAuthor = `inauthor:${searchObj.queryAuthor}`;
// let baseTitle = `intitle:${searchObj.queryTitle}`;
// let baseSubject = `subject:${searchObj.querySubject}`;
let queryURL = searchObj.baseURL + searchObj.mainSearch + '+' + `inauthor:${searchObj.queryAuthor}` + '&' + `subject:${searchObj.querySubject}` + '&' + searchObj.ipa;




// console.log(queryURL);

const findTitle = () => {
  $.ajax({
    url: queryURL
    // type: "GET",
  }).then((data) => {
    // console.log(data);
    for (let i = 0; i < 10; i++) {
      const newAuthor = $('<div>').text(data.items[i].volumeInfo.title);
      const bookCover = $('<img>').attr('src', data.items[i].volumeInfo.imageLinks.thumbnail).on('click', () => {
        //display .description in a modal which also shows thumbnail
        console.log(data);
      })
      const book = $('<div>').addClass('book').append(bookCover).append(newAuthor);
      $('.resultsContainer').append(book);
    }
  })
}

$(() => {

  $('#submit').on('click', () => {


    // console.log($('.mainInput').val());
    searchObj.mainSearch = $('.mainInput').val();
    searchObj.queryAuthor = $('.author').val();
    searchObj.querySubject = $('.genre').val();

    queryURL = searchObj.baseURL + searchObj.mainSearch + '+' + `inauthor:${searchObj.queryAuthor}` + '&' + `subject:${searchObj.querySubject}` + '&' + searchObj.ipa;
    // console.log(searchObj.mainSearch);
    event.preventDefault()
    // console.log(searchObj.mainSearch);
    console.log(queryURL);
    setTimeout(findTitle, 1000);
  })
  // findTitle();
})