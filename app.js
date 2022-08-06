
// other themes to add ?
// bigger memory?

var library = {
  love: [
    'img/love/1.jpg',
    'img/love/2.jpg',
    'img/love/3.jpg',
    'img/love/4.jpg',
    'img/love/5.jpg',
    'img/love/6.jpg',
    'img/love/7.jpg',
    'img/love/8.jpg',
    'img/love/9.jpg',
    'img/love/10.jpg',
    'img/love/1.jpg',
    'img/love/2.jpg',
    'img/love/3.jpg',
    'img/love/4.jpg',
    'img/love/5.jpg',
    'img/love/6.jpg',
    'img/love/7.jpg',
    'img/love/8.jpg',
    'img/love/9.jpg',
    'img/love/10.jpg'
  ],
  family: [
    'img/family/1.jpg',
    'img/family/2.jpg',
    'img/family/3.jpg',
    'img/family/4.jpg',
    'img/family/5.jpg',
    'img/family/6.jpg',
    'img/family/7.jpg',
    'img/family/8.jpg',
    'img/family/9.jpg',
    'img/family/10.jpg',
    'img/family/1.jpg',
    'img/family/2.jpg',
    'img/family/3.jpg',
    'img/family/4.jpg',
    'img/family/5.jpg',
    'img/family/6.jpg',
    'img/family/7.jpg',
    'img/family/8.jpg',
    'img/family/9.jpg',
    'img/family/10.jpg'
  ],
  friends: [
    'img/friends/1.jpg',
    'img/friends/2.jpg',
    'img/friends/3.jpg',
    'img/friends/4.jpg',
    'img/friends/5.jpg',
    'img/friends/6.jpg',
    'img/friends/7.jpg',
    'img/friends/8.jpg',
    'img/friends/9.jpg',
    'img/friends/10.jpg',
    'img/friends/1.jpg',
    'img/friends/2.jpg',
    'img/friends/3.jpg',
    'img/friends/4.jpg',
    'img/friends/5.jpg',
    'img/friends/6.jpg',
    'img/friends/7.jpg',
    'img/friends/8.jpg',
    'img/friends/9.jpg',
    'img/friends/10.jpg'
  ],
  smiles: [
    'img/smiles/1.jpg',
    'img/smiles/2.jpg',
    'img/smiles/3.jpg',
    'img/smiles/4.jpg',
    'img/smiles/5.jpg',
    'img/smiles/6.jpg',
    'img/smiles/7.jpg',
    'img/smiles/8.jpg',
    'img/smiles/9.jpg',
    'img/smiles/10.jpg',
    'img/smiles/1.jpg',
    'img/smiles/2.jpg',
    'img/smiles/3.jpg',
    'img/smiles/4.jpg',
    'img/smiles/5.jpg',
    'img/smiles/6.jpg',
    'img/smiles/7.jpg',
    'img/smiles/8.jpg',
    'img/smiles/9.jpg',
    'img/smiles/10.jpg'
  ]
}

var images = [],
    tempElt1 = "",
    tempElt2 = "",
    click = -1,
    win = 0,
    score = 0,
    time = 0;

var preElt = document.querySelector("#pre"),
    themesElt = document.querySelector("#themes"),
    boxElts = document.getElementsByClassName("box"),
    mainElt = document.querySelector(".main"),
    timeElt = document.querySelector("#time"),
    scoreElt = document.querySelector("#score"),
    postElt = document.querySelector("#post"),
    finalElt = document.querySelector("#final"),
    againElt = document.querySelector("#again");


// initiate the game with chosen theme
themesElt.addEventListener("click", function(e) {
  if (e.target.classList.contains("themes")) {
    activateTheme(e.target.id);
    preElt.classList.add("hidden");
  }
});

function activateTheme(theme) {
  // insert theme in images array
  switch (theme) {
    case "love":
      for (let i=0; i<20; i++) {images.push(library.love[i]);}
      document.getElementById("demo").innerHTML = "Fun fact: GP and KMs favorite duet song is Jab koi baat bigad jaye";
      break;
      case "friends":
        for (let i=0; i<20; i++) {images.push(library.friends[i]);}
        document.getElementById("demo").innerHTML = "Fun fact: GP always stays close to his friends and recently he also met his friend after 25+ years";
        break;
        case "smiles":
          for (let i=0; i<20; i++) {images.push(library.smiles[i]);}
          document.getElementById("demo").innerHTML = "Fun fact: Along with Japan, Korea and UAE, GP has stayed in Chile";
          break;
    case "family":
      for (let i=0; i<20; i++) {images.push(library.family[i]);}
      document.getElementById("demo").innerHTML = "Fun fact: GP is an avid reader and shares this habit with his son-in-law";
      break
  }
  // insert images in memory game
  for (let i=0; i<20; i++) {
    var rand = Math.floor(Math.random() * (images.length-1));
    boxElts[i].innerHTML = "<img src='" + images[rand] + "' alt='image' class='hidden'>";
    images.splice(rand, 1);
  }
}


// Handle the play
mainElt.addEventListener("click", gameLogic);

function gameLogic(e) {
  // make sure the box is playable
  if (e.target.classList.contains("play")) {
    e.target.firstChild.classList.remove("hidden");
    // first of two click
    if (click < 1) {
      tempElt1 = e.target;
      // timer
      if (click === -1) {
        timer = setInterval(function() {
          time++;
          timeElt.innerHTML = time;
        }, 1000);
      }
      click = 1;
    }

    // second click
    else if (e.target !== tempElt1) {
      tempElt2 = e.target;

      // different images
      if (tempElt1.firstChild.src !== tempElt2.firstChild.src) {
        mainElt.removeEventListener("click", gameLogic);
        setTimeout( function() {
          tempElt1.firstChild.classList.add("hidden");
          tempElt2.firstChild.classList.add("hidden");
          mainElt.addEventListener("click", gameLogic);
        }, 400);
        if (score > 0){
          score -= 2;
        }
        scoreElt.innerHTML = score;
      }

      // same images
      else {
        score += 10;
        win += 2;
        tempElt1.firstChild.classList.add("outlined");
        tempElt2.firstChild.classList.add("outlined");
        tempElt1.classList.remove("play");
        tempElt2.classList.remove("play");
        scoreElt.innerHTML = score;

        // game won
        if (win === 20) {
          clearTimeout(timer);
          finalElt.innerHTML = "You won " + score + " points <br> in " + time + " seconds";
          postElt.classList.remove("hidden");
        }
      }
      click = 0;
    }
  }
}

againElt.addEventListener("click", resetGame);

function resetGame() {
  // reset game
  tempElt1 = "";
  tempElt2 = "";
  click = -1;
  win = 0;
  score = 0;
  time = 0;
  postElt.classList.add("hidden");
  preElt.classList.remove("hidden");
  for (let i=0; i<20; i++) {
    boxElts[i].classList.add("play");
    boxElts[i].firstChild.classList.add("hidden");
  }
  timeElt.textContent = time;
  scoreElt.textContent = score;
}

// handle focus of the page
// function checkPageFocus() {
//   if (document.hasFocus()) {
//     preElt.classList.remove("hidden");
//   }
//   else {
//     preElt.classList.add("hidden");
//   }
// }
// var checkPageInterval = setInterval(checkPageFocus, 300);
