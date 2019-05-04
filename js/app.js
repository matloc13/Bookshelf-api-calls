const dataArr = [];
let userStore = '';
const searchObj = {
  baseURL: `https://www.googleapis.com/books/v1/volumes?q=`,
  ipa: `key=AIzaSyAuDK04-7AA33VqCHIAXFQWieg8cPNBaKo`,
  mainSearch: '',
  queryAuthor: '',
  querySubject: '',
  maxResults: 40

}



// class BOOK {
//   constructor(title, author, image, description) {
//     this.title = title,
//       this.author = author,
//       this.image = image,
//       this.description = description
//   }
//   modalBuild() {
//     const modal = $('<div>').attr('id', 'modal')
//     const modalBox = $('<div>').attr('id', 'modal-box').html(`
//       <h1>${this.title}</h1>
//       <h3> by: ${this.authors}</h3>
//       <p> ${this.description}</p>
//     `);
//
//     const close = $('<button>').text('x').addClass('cornerButton').on('click', () => {
//       $(modal).remove();
//     })
//     modalBox.appendTo(modal)
//     modalBox.append(close)
//     modal.appendTo('body');
//   }
// }
//book to read
const fight = (number) => {
  const fighters = number;
  // console.log(fighters);
  const winNumber = Math.floor(Math.random() * fighters.length)
  let winner = fighters[winNumber]
  // console.log(winner);
  return winner
}

const randomColor = () => {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`

}


const shake = () => {
  const fighters = $('.bookshelf').children();
  const winner = fight(fighters);
  // console.log(winner);
  const divFight = $('<div>').addClass('big-modal');
  const divBoundary = $('<div>').addClass('fight-modal')
  //*********************testing
  for (let i = 0; i < fighters.length; i++) { // testing
    const fightingDiv = $('.bookshelf').children().eq(i).children().eq(0);
    const fightClone = fightingDiv.clone(true);
    //create colored empty divs for animation
    $(divBoundary).append($('<div>').css('background-color', randomColor()).addClass("fighter-div spinAround "))
    $(divBoundary).append(fightClone.addClass("spinAround"));
  }
  const winnerClone = $(winner).clone(true)
  //clone winner to add to new page
  $('body').append(divFight.append(divBoundary).append($('<button>').text('x').addClass('close-modal')))

  $('.close-modal').on('click', () => {
    $(divFight).remove();

  })
  setTimeout(() => {
    $(divBoundary).empty();
    $(divBoundary).append($('<div>').addClass('winnerdiv').append(winnerClone)).append($('<button>').text('your next read').one('click', () => {
      $('.booksToSave').append(winnerClone);
      // console.log(winnerClone);
      store(userStore, $(winner).children().eq(1).text());
      $(divFight).remove();

    }));
  }, 4800)

}
//need to pass winner clone to store title as user and jquery object as object
const store = (user, book) => {
  console.log(book);
  window.localStorage.setItem(user, JSON.stringify(book));
  // window.localStorage.getItem('matloc')
}

let queryURL = searchObj.baseURL + searchObj.mainSearch + '+' + `inauthor:${searchObj.queryAuthor}` + '&' + `maxResults=${searchObj.maxResults}` + '&' + searchObj.ipa;


//ajax call and dom builder
const findTitle = () => {
  $.ajax({
    url: queryURL
    // type: "GET",
  }).then((data) => {
    // console.log(data);
    for (let i = 0; i < data.items.length; i++) {
      // dataArr.push(new BOOK(
      //   data.items[i].volumeInfo.title, data.items[i].volumeInfo.authors, data.items[i].volumeInfo.imageLinks.thumbnail, data.items[i].volumeInfo.description))
      //
      // console.log(dataArr);
      const newAuthor = $('<div>').text(data.items[i].volumeInfo.title).css("border", "1px solid teal");
      //book thumbnail
      const bookCover = $('<img>').attr('src', data.items[i].volumeInfo.imageLinks.thumbnail).attr('alt', data.items[i].volumeInfo.title).on('click', (event) => {
        // this.modalBuild()
        const modal = $('<div>').addClass('modal')
        const modalBox = $('<div>').addClass('modal-box').html(`
            <h1>${data.items[i].volumeInfo.title}</h1>
            <h3> by: ${data.items[i].volumeInfo.authors}</h3>
            <p> ${data.items[i].volumeInfo.description}</p>
            <a href='${data.items[i].accessInfo.webReaderLink}' target='_blank'>read online</a>
            <p>This reader is only a ${data.items[i].accessInfo.accessViewStatus}</p>
          `);
        //close the modal
        const close = $('<button>').text('x').addClass('cornerButton').on('click', () => {
          $(modal).remove();
        })
        modalBox.appendTo(modal)
        modalBox.append(close)
        modal.appendTo('body');
        //display .description in a modal which also
      })
      //new fav button
      const favorite = $('<button>').addClass('cornerButton').addClass('favorite').on('click', (event) => {
        $('.bookshelf').css('border', '1px solid teal');
        const bookClone = $(event.target).parent().clone(true);
        bookClone.append($('<button>').addClass('cornerButton').text('x').on('click', (event) => {
          $(event.target).parent().remove();
        }));
        bookClone.appendTo($('.bookshelf'));
      });
      //new book
      const book = $('<div>').addClass('book').append(bookCover.mouseover(() => {
        $('.favorite').toggle();
      })).append(newAuthor)
      $(book).draggable({
        revert: true,
        scope: "demoBox",
        helper: 'clone'
      })

      $('.newBooks').append(book.append(favorite));
    }
  })
}

//jquery load wait
$(() => {

  $('#submit').on('click', () => {
    let string = $('.mainInput').val(); //main input value
    searchObj.mainSearch = string.replace(/ /g, "+");
    let stringAuthor = $('.author').val(); //author value
    searchObj.queryAuthor = stringAuthor.replace(/ /g, "+"); //number of results
    console.log($('.results').val());
    if ($('.results').val() == '') {
      searchObj.maxResults = 30;
    } else {
      searchObj.maxResults = $('.results').val();
    }

    //final query
    queryURL = searchObj.baseURL + searchObj.mainSearch + '+' + `inauthor:${searchObj.queryAuthor}` + '&' + `maxResults=${searchObj.maxResults}` + '&' + searchObj.ipa;
    event.preventDefault();
    console.log(queryURL);
    $('form').trigger('reset');
    $('.newBooks').empty();
    setTimeout(findTitle, 500);
  });
  //*****************on click
  $('.show').on('click', () => {
    $('.advancedSearch').toggle();
  });

  $('.favShow').on('mouseover', () => {
    $('.showHide').toggle('swing')
  });
  $('.favShow').on('click', () => {
    $('.showHide').toggle('slow')
  })

  $('.fightBtn').on('click', () => {
    // console.log('fight');
    shake();

  });

  $('.saveShow').on('click', () => {
    $('.saveContainer').toggle('fast')
  });

  $('.signBtn').on('click', () => {
    $('.signIn').toggle('slow')
    $('#signSubmit').on('click', () => {
      event.preventDefault();
      userStore = $('#userSign').val();
      // console.log(userStore);
      $('.signBtn').text(userStore);
      setTimeout(() => {
        window.localStorage.setItem('username', userStore)
        $('.signIn').toggle('slow')
      }, 500)
    })
  })

  $('.localFavs').on('click', () => {
    console.log(window.localStorage.getItem(userStore));
  })



  $('.bookshelf').droppable({
    scope: "demoBox",
    accept: ".book",
    hoverClass: "light",
    drop: (event, ui) => {
      let dropItem = $(ui.draggable).clone();
      // console.log(dropItem);

      $(dropItem).children().eq(2).remove()
      $('.bookshelf').append(dropItem.removeClass('favorite').css('flex-grow', 1).append($('<button>').removeClass('favorite').addClass('cornerButton').text('x').on('click', (event) => {
        $(event.target).parent().remove();
      })))

    }
  })
})