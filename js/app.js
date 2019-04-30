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
      const newAuthor = $('<div>').text(data.items[i].volumeInfo.title).css("border", "1px solid teal");
      const bookCover = $('<img>').attr('src', data.items[i].volumeInfo.imageLinks.thumbnail).on('click', (event) => {
        const modal = $('<div>').attr('id', 'modal')
        const modalBox = $('<div>').attr('id', 'modal-box').html(`
          <h1>${data.items[i].volumeInfo.title}</h1>
          <h3> By: ${data.items[i].volumeInfo.authors}</h3>
          <p> ${data.items[i].volumeInfo.description}</p>
        `);
        const close = $('<button>').text('x').addClass('cornerButton').on('click', () => {
          $(modal).remove();
        })
        modalBox.appendTo(modal)
        modalBox.append(close)
        modal.appendTo('body');
        //display .description in a modal which also shows thumbnail
        // console.log(data);
      })
      const book = $('<div>').addClass('book').append(bookCover).append(newAuthor);

      $('.newBooks').append(book);
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
    event.preventDefault();
    console.log(queryURL);
    setTimeout(findTitle, 1000);
  })



  // $('.bookshelf').droppable({
  //   tolerance: "touch",
  //   scope: "demoBox",
  //   drop: (event, ui) => {
  //     $('.book').draggable("option", "revert", false);
  //     $(ui.draggable).detach().css({
  //       top: 0,
  //       left: 0
  //     }).appendTo($(this));
  //   }
  // })
})





// })