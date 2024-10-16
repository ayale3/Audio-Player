// bismilah illahow  i  fududey


const audioElement = document.createElement('audio');

document.body.appendChild(audioElement);


// selecting dom

const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const title = document.getElementById('title');
const artist =  document.getElementById('artist');
const cover = document.getElementById('cover');
const CurrentTimeEl = document.getElementById('current-time')
 const durationEl = document.getElementById('durition')
 const progress = document.getElementById('progress');
 const progressContainer = document.querySelector('.prograss-bar');
 const volumeSlider = document.getElementById('volume');
 const speedSelect = document.getElementById('speed');
 


// songs data
const songs = [
    {
        title:  'SoundHelix Song 1',
        artist: 'T. Schürger',
        cover: 'https://images.unsplash.com/photo-1588066077857-70494c21533c?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
    } ,

    {
        title:  'SoundHelix Song 2',
        artist: 'T. Schürger 2',
        cover: 'https://images.unsplash.com/photo-1565010306786-f6375b362cd4?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3'
    } ,
    
    {
        title:  'SoundHelix Song 3',
        artist: 'T. Schürger 3',
        cover: 'https://images.unsplash.com/photo-1565682547411-1dd0d564d02b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG11c2ljJTIwY292ZXJ8ZW58MHx8MHx8fDA%3D',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3'
    } ,
    
     
];

// play the audio

let songindex = 0
let isPlaying = false
let speed = 1


//  all about functions 


// function-kaan  dom ayuuu ku soo bandhigaa dom-ka
function loadSong (songs){
    title.textContent = songs.title
    artist.textContent = songs.artist
    cover.src = songs.cover
    audioElement.src = songs.src
    // audioElement.play();

}

loadSong(songs[songindex]);

// function waxa oo diyaraa in cod-ka la daari karo
 function playSong() {
    playButton.querySelector('i').classList.remove('fa-play');
    playButton.querySelector('i').classList.add('fa-pause');    
    audioElement.play();
    isPlaying = true;
 }



// function waxa oo diyaarinayaa in codka  puse la dhihi karo

function puaseSong(){
    playButton.querySelector('i').classList.remove('fa-pause');
    playButton.querySelector('i').classList.add('fa-play');
    audioElement.pause();
    isPlaying = false;
}


// function waxa oo ku shuqul leyahay inoo diyaariyo next song 

function nextSong(){
     
    puaseSong

    // next song and play after 300ms
    setTimeout( function(){
        songindex++
     
    if(songindex > songs.length -1 ){
        songindex = 0;
        
    }

   
    loadSong(songs[songindex]);
    playSong()


    },300)
    
}

// function waxa oo ku shuqul leyahay inoo diyaariyo prev song

function prevSong(){
    puaseSong

    setTimeout (function(){
        songindex--;

        if(songindex < 0 ){
            songindex = songs.length -1 
        }
        loadSong(songs[songindex]);
        playSong()


    },300)
}

// function waxa o quseyo in oo so saro time ka la maraa

function updateprogress (e){
    

    const {duration, currentTime} = e.srcElement

    if(isNaN(duration)) return

    const progressPercent = (currentTime / duration ) * 100

    progress.style.width = `${progressPercent}%`


    // duration calculation

    const  durationMinutes = Math.floor(duration / 60)
 

    let durationSeconds = Math.floor(duration % 60)
    if(durationSeconds < 10){
        durationSeconds = `0${durationSeconds}`
    }
     
 
    CurrentTimeEl.textContent = `${durationMinutes}:${durationSeconds}`


    //  current time Calculation

    const currentMinutes = Math.floor(currentTime / 60)
    let currentSeconds =  Math.floor(currentTime % 60)
    if(currentSeconds < 10){
        currentSeconds = `0${currentSeconds}`
    }
     
    durationEl.textContent = `${currentMinutes}:${currentSeconds}`

    audioElement.playbackRate = speed
}

//  function waxa oo quseyo in la so jiido progress barka 
function setProgress(e) {
    const width = this.clientWidth;
     
    const clickx =  e.offsetX

    const duration = audioElement.duration;
    if(isNaN(duration) ) return

     

    const newTime = (clickx / width ) * duration
   

    audioElement.currentTime = newTime
     
}





//   all about evets 


// event-kaan batanka play button ayu samena in codka daarmo marka la riixo 
playButton.addEventListener('click' , function() {
    if(isPlaying ) {
    
    puaseSong()
   
    } else{
        playSong()
       
         

    }

})


// next song event

nextButton.addEventListener('click' , function() {
    nextSong()
   
})

 
prevButton.addEventListener('click' , function() {
    prevSong()

})


// event time ka updare  gareenaa

audioElement.addEventListener('timeupdate', function(e){

    updateprogress(e)


})

// qeybra waxa sameyna in seek la sameyo 

progressContainer.addEventListener('click', setProgress )


// chnage volume 

volumeSlider.addEventListener('input' , function(e){
    audioElement.volume = e.target.value
})

//  audio speed
speedSelect.addEventListener('change', function(e){
    speed = parseFloat(e.target.value)
    audioElement.playbackRate = speed
})


audioElement.addEventListener('loeadeddata' , updateprogress)