const image = document.querySelector("#cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const background = document.getElementById("background");

// Music
const songs = [
  {
    path:
      "m.mp3",
    displayName: "Happyness",
    artist: "سلنا گومز",  
      cover:
      "sleneablack.png",
  
  },
  {
    path: "selena_gomez_-_feel_me.mp3",
    displayName: "Feel me",
    artist: "سلنا گومز",
    cover:"selepink.png",
  },
 {
    path:
      "Selena_Gomez_-_Hands_To_Myself.mp3",
    displayName: "HandsToMyself",
    artist: "سلنا گومز",
    cover:
    "selena.png",

  },  {
    path:
      "Lauv - I'm so tired.mp3",
    displayName: "I'm so tired",
    artist: "Lauv",
    cover:
    "Lauv.png",

  },{
    path:
      "Ariana_Grande_Positions_320 (1).mp3",
    displayName: "Positions",
    artist: "آریانا گرنده",
    cover:
    "Ariana Grande.png",

  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", function () {
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

// Update DOM
function loadSong(s) {
 
  title.textContent = s.displayName;
  artist.textContent = s.artist;
  music.src = s.path;
  changeCover(s.cover);
}

function changeCover(cover) {
  image.classList.remove("active");
  setTimeout(() => {
    image.src = cover; background.src = cover;
    image.classList.add("active");
  }, );
 
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}



function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  let number = songs[songIndex]
  image.src=number.cover;
  background.src=number.cover;
  title.textContent = number.displayName;
  artist.textContent = number.artist;
  music.src = number.path;

  image.classList.remove("active");
  
  setTimeout(() => {

    image.classList.add("active");

  }, );
  playSong();
}


loadSong(songs[songIndex]);


function updateProgressBar(e) {
  if (isPlaying) {
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;


    progress.style.width =(currentTime / duration) * 100+ "%";

  }
}


function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
