const searchObj = {
  baseURL: `https://www.googleapis.com/books/v1/volumes?q=`,
  ipa: `key=AIzaSyAuDK04-7AA33VqCHIAXFQWieg8cPNBaKo`,
  mainSearch: '',
  queryAuthor: '',
  querySubject: ''
}
let queryURL = searchObj.baseURL + searchObj.mainSearch + '+' + `inauthor:${searchObj.queryAuthor}` + '&' + `subject:${searchObj.querySubject}` + '&' + searchObj.ipa;
//ajax call and dom builder
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

//jquery load wait
$(() => {


  $('#submit').on('click', () => {
    let string = $('.mainInput').val(); //main input value
    searchObj.mainSearch = string.replace(/ /g, "+");
    let stringAuthor = $('.author').val(); //author value
    searchObj.queryAuthor = stringAuthor.replace(/ /g, "+");
    searchObj.querySubject = $('.genre').val(); //genre value
    //final query
    queryURL = searchObj.baseURL + searchObj.mainSearch + '+' + `inauthor:${searchObj.queryAuthor}` + '&' + `subject:${searchObj.querySubject}` + '&' + searchObj.ipa;
    event.preventDefault()
    console.log(queryURL);
    setTimeout(findTitle, 1000);
  })





})