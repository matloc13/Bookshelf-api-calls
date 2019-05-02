const dataArr = [];

const searchObj = {
  baseURL: `https://www.googleapis.com/books/v1/volumes?q=`,
  ipa: `key=AIzaSyAuDK04-7AA33VqCHIAXFQWieg8cPNBaKo`,
  mainSearch: '',
  queryAuthor: '',
  querySubject: '',
  maxResults: 40
}

class BOOK {
  constructor(title, author, image, description) {
    this.title = title,
      this.author = author,
      this.image = image,
      this.description = description
  }
  // modalBuild() {
  //   const modal = $('<div>').attr('id', 'modal')
  //   const modalBox = $('<div>').attr('id', 'modal-box').html(`
  //       <h1>${this.title}</h1>
  //       <h3> by: ${this.authors}</h3>
  //       <p> ${this.description}</p>
  //     `);
  //
  //   const close = $('<button>').text('x').addClass('cornerButton').on('click', () => {
  //     $(modal).remove();
  //   })
  //   modalBox.appendTo(modal)
  //   modalBox.append(close)
  //   modal.appendTo('body');
  // }
}
// const buildBooks = () => {
//
// }
const fight = (number) => {
  const fighters = number;
  console.log(fighters);
  const winNumber = Math.floor(Math.random() * fighters.length)
  let winner = fighters[winNumber]
  console.log(winner);
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
  console.log(fighters);
  const divFight = $('<div>').addClass('big-modal');
  const divBoundary = $('<div>').addClass('fight-modal')
  for (let i = 0; i < fighters.length; i++) {
    const fightingDiv = $('.bookshelf').children().eq(i).children().eq(0);
    const fightClone = fightingDiv.clone(true)

    console.log($('.bookshelf').children().eq(i).children().eq(0));
    // const fightingDiv = $('<div>').css('background-color', randomColor()).addClass('spinAround').addClass('fighter-div').append($('<img>').attr('src', fighters[i].children().eq(0)))
    $(divBoundary).append(fightClone).append($('<button>').text('x').addClass('close-modal'))
  }
  $('body').append(divFight.append(divBoundary))
  // $(divFight).appendTo('body');

  $('.close-modal').on('click', () => {
    $()
    $(divFight).remove();
  })


  // $(fighters).addClass('spinAround')
  // setTimeout(() => {
  //   $(fightingDiv).removeClass('spinAround')
  // }, 7000);

}


let queryURL = searchObj.baseURL + searchObj.mainSearch + '+' + `inauthor:${searchObj.queryAuthor}` + '&' + `maxResults=${searchObj.maxResults}` + '&' + searchObj.ipa;

// class SearchWeather {
//   constructor() {
//     this.
//   }
// }

//ajax call and dom builder
const findTitle = () => {
  $.ajax({
    url: queryURL
    // type: "GET",
  }).then((data) => {
    // console.log(data);
    for (let i = 0; i < data.items.length; i++) {
      dataArr.push(new BOOK(
        data.items[i].volumeInfo.title, data.items[i].volumeInfo.authors, data.items[i].volumeInfo.imageLinks.thumbnail, data.items[i].volumeInfo.description))

      console.log(dataArr);
      const newAuthor = $('<div>').text(data.items[i].volumeInfo.title).css("border", "1px solid teal");

      const bookCover = $('<img>').attr('src', data.items[i].volumeInfo.imageLinks.thumbnail).attr('alt', data.items[i].volumeInfo.title).on('click', (event) => {
        // this.modalBuild()
        const modal = $('<div>').addClass('modal')
        const modalBox = $('<div>').addClass('modal-box').html(`
            <h1>${data.items[i].volumeInfo.title}</h1>
            <h3> by: ${data.items[i].volumeInfo.authors}</h3>
            <p> ${data.items[i].volumeInfo.description}</p>
          `);

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
        $(event.target).parent().append($('<button>').addClass('cornerButton').text('x').on('click', (event) => {
          $(event.target).parent().remove();
        }));
        $(event.target).parent().appendTo($('.bookshelf'));
        $(event.target).remove();
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
    searchObj.queryAuthor = stringAuthor.replace(/ /g, "+");
    console.log($('.results').val());
    if ($('.results').val() == '') {
      searchObj.maxResults = 15;
    } else {
      searchObj.maxResults = $('.results').val();
    }
    //genre value
    //final query
    queryURL = searchObj.baseURL + searchObj.mainSearch + '+' + `inauthor:${searchObj.queryAuthor}` + '&' + `maxResults=${searchObj.maxResults}` + '&' + searchObj.ipa;
    event.preventDefault();
    console.log(queryURL);
    $('form').trigger('reset');
    $('.newBooks').empty();
    setTimeout(findTitle, 1000);
  });

  $('.show').on('click', () => {
    $('.advancedSearch').toggle();
  });

  $('.favShow').on('click', () => {
    $('.showHide').toggle('swing')
  });

  $('.fightBtn').on('click', () => {
    shake();

  });



  $('.bookshelf').droppable({
    scope: "demoBox",
    accept: ".book",
    hoverClass: "light",
    drop: (event, ui) => {
      let dropItem = $(ui.draggable).clone();
      console.log(dropItem);

      $(dropItem).children().eq(2).remove()
      $('.bookshelf').append(dropItem.removeClass('favorite').css('flex-grow', 1).append($('<button>').removeClass('favorite').addClass('cornerButton').text('x').on('click', (event) => {
        $(event.target).parent().remove();
      })))

      // $(this).append(dropItem);
    }
  })
})





// })

// question 1 appending to an a to a modal the hyplerlink is in the console but not on the pageWrapper