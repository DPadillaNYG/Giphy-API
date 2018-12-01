# Website w/ API Implementation

A website utilizing the Giphy API with AJAX.

### Link to Game

https://dpadillanyg.github.io/Giphy-API/

**Browser compatibility checked with:**

- Google Chrome - Version 70.0.3538.77 and up
- Firefox Developer Edition - 64.0b8 (64-bit) and up (download feature doesn't work)
- Safari - Version 12.0.1 and up

### Assignment

I was tasked with having to make a website using the Giphy API to demonstrate a user
request being generated into the DOM with AJAX behind the scenes. For this project I 
wanted to theme the gif requests around coffee. I typically code my homework with a
blonde roast latte at Starbucks anyway, so I decided to unofficially adopt their color
palette into my project.


### Skills Learned

I learned many things while doing this project with the support of my wife
who is also a very talented programmer and Stack Overflow. Here are some things
I learned on the fly:

- workaround functions (download feature)
- closures (let variables)
- Font Awesome Icons
- drag & drop
- childNodes
- autofit, autofill, and minmax w/ CSS Grid

**Also, feel free to refer to the comments within logic.js to see how I integrated:**

- Giphy API
- AJAX
- data- attributes

### Comments

The biggest feature I added that I am most proud of would have to be the drag and 
drop feature. I did not learn this event handler in bootcamp at all. Let me breakdown
in simple terms what is happening behind the scenes. Each button in the "Topic" section
is located in an array. The moment you drag a button into the "Favorites" section, it 
removes itself from the topics array and moves into the favorites array. Each time the 
user orders a new giffee, the javascript is checking to see if the user input is already 
located within the topics array or the favorites array. It will not generate a duplicate 
button. This project was fun and easy except for the download feature, which proved the
hardest to code because of browser restrictions that prevented cross-origin downloads. 
Therefore, I was eventually able to find a workaround with some help and google searching.

**I encourage you to check out the mobile responsiveness of the application.**

_created by David M. Padilla_
