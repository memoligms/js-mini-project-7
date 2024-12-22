const music = document.getElementById('audio');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const image = document.querySelector('img');
const title = document.getElementById('title');
const creator = document.getElementById('creator');
const progressDiv = document.getElementById('progressDiv');
const progress = document.getElementById('progress');
const currentTimeSpan = document.getElementById('currentTime');
const totalTimeSpan = document.getElementById('totalTime');


const songs = [
    {
        title:'Kusursuz',
        creator: 'Çakal',
        img: '1.png',
        file:'1.mp3',
    },
    {
        title:'Fregoli',
        creator: 'ati242',
        img: '2.png',
        file:'2.mp3'
    },
    {
        title:'Arabaya bin',
        creator: 'organize',
        img: '3.png',
        file:'3.mp3'
    },
    {
        title:'Nerdeysen',
        creator: 'era7capone',
        img: '4.png',
        file:'4.mp3'
    },
    {
        title:'Şarkılar sokaklara ait',
        creator: 'uzi',
        img: '5.png',
        file:'5.mp3'
    },
    {
        title:'Sprinter',
        creator: 'lvbelc5',
        img: '6.png',
        file:'6.mp3'
    },
]

let songİndex= 0;
let isPlaying = false;

function loadSong(song){
    title.textContent=song.title;
    creator.textContent= song.creator;
    music.src = `music/${song.file}`;
    image.src = `img/${song.img}`;
}

function playSong(){
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    music.play();
}

function pauseSong(){
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    music.pause();
}

function prevSong() {
    songİndex--;
    if (songİndex < 0) {
      songİndex = songs.length - 1;
    }
    loadSong(songs[songİndex]);
    playSong();
  }

function nextSong() {
    songİndex++;
    if (songİndex > songs.length - 1) {
      songİndex = 0;
    }
    loadSong(songs[songİndex]);
    playSong();
}

function uptadeteProgressBar(e){
    if(isPlaying){
        const {currentTime, duration}= e.srcElement;
        const progessPercent=(currentTime/duration)*100;
        progress.style.width=`${progessPercent}%`

        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);

        if(durationSeconds<10){
            durationSeconds=`0${durationSeconds}`;
        }
        if(durationSeconds){
        totalTimeSpan.textContent=`${durationMinutes}:${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);

        if(currentSeconds<10){
            currentSeconds=`0${currentSeconds}`;
        }
        if(currentSeconds){
        currentTimeSpan.textContent=`${currentMinutes}:${currentSeconds}`;
        }
    }
}

function setProgressBar(e){
    const width = e.srcElement.clientWidth;
    const {duration}=music;
    const clickX=e.offsetX;
    music.currentTime= (clickX/width)*duration;
}

playButton.addEventListener('click', ()=>
    isPlaying ? pauseSong() : playSong()
);

prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

music.addEventListener('timeupdate', uptadeteProgressBar);
progressDiv.addEventListener('click', setProgressBar)

music.addEventListener('ended', nextSong);