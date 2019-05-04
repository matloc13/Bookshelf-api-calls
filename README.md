# Bookshelf-api-calls
##### I would like to make page with a search and advanced search using Google Books api
##### my intention now is to use the css drag and drop as well as local storage in order for people to crate their own visual bookshelves

![wireframe img](https://imgur.com/hPIkPYM)

#### create html template adding classes for containers
  - directly in html doc to give page a skeleton to build of off.

#### api info is coming in
  - created an object to store user query info.
  - data coming in can be distributed as needed.
   -- query still only half working here

####  add basic css to see info on the page
  - book div has all info that need to be displayed
  - flex box is how i am keeping new appends inline

# narrowing in

####  make query input more user friendly
  - spaces in query are fine thanks to a  Regular expression for removing all spaces in a string.
  - user can find what they want in the query bar
  - still working on more advanced search/  (doesnt seem super necessary for this api to find what it needs)

#### first modal was created using jquery and classes to style via css
  - modals are built with jquery and handled by css for styling and animations.

#### buttons added to book divs
  - click listers for saving and closing books are created in jquery
  - css classes to style and place on the page per div.

#### functionality for buttons added
 - click listeners are doing the right things and in the right places.
 - show/hide for larger divs is functional.

#### more exciting functionality
  - drag and drop is functioning super well
  -it uses the jquery ui which has a good amount of support

#### query fixing
  - you can edit the number of results returned
  -  extra search functionality means (redesign of how i handle parts of the query)

 #### animations are hard and time consuming
    - added larger animation for random book picker
  - i used translate and rotate to make the books being decided upon fall down the page.
  - buttons are animated as well but a much simpler use.
  - i spent a lot time messing with animations trying to make them work and look cool.

 #### css margins and state changes
   - when div leaves it 'moves' of the page.
   - desired effect (when i click on something it feels good and i get a result that happens smoothly.

 #### cloning solves moving divs problem
   - appending problem solved by cloning.  
   - only the first instance of a book is real the rest are CLONES

 #### local storage
  - winners of div picker are placed in local storage.
  - the user can see what books they have collected
  - user input is not storing properly username login is still annoying

 #### media queries  
  - flex box has been helpful with book management.
  - hiding some buttons on smaller devices
  - buttons changes on screen size as well.
