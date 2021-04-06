//26/03/2021 Implementación del reproductor de audio
/* Implementation of the presentation of the audio player */
const playIconContainer = document.getElementById('play-icon');
const audioPlayerContainer = document.getElementById('audio-player-container');
const seekSlider = document.getElementById('seek-slider');
const volumeSlider = document.getElementById('volume-slider');
const muteIconContainer = document.getElementById('mute-icon');
let playState = 'play';
let muteState = 'unmute';

const playAnimation = lottie.loadAnimation({
  container: playIconContainer,
  path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json',
  renderer: 'svg',
  loop: false,
  autoplay: false,
  name: "Play Animation",
});

const muteAnimation = lottie.loadAnimation({
    container: muteIconContainer,
    path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/mute/mute.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
    name: "Mute Animation",
});

playAnimation.goToAndStop(14, true);

playIconContainer.addEventListener('click', () => {
    if(playState === 'play') {
        audio.play();
        playAnimation.playSegments([14, 27], true);
        requestAnimationFrame(whilePlaying);
        playState = 'pause';
    } else {
        audio.pause();
        playAnimation.playSegments([0, 14], true);
        cancelAnimationFrame(raf);
        playState = 'play';
    }
});

muteIconContainer.addEventListener('click', () => {
    if(muteState === 'unmute') {
        muteAnimation.playSegments([0, 15], true);
        audio.muted = true;
        muteState = 'mute';
    } else {
        muteAnimation.playSegments([15, 25], true);
        audio.muted = false;
        muteState = 'unmute';
    }
});

const showRangeProgress = (rangeInput) => {
    if(rangeInput === seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
    else audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
}

seekSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});
volumeSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});

/* Implementation of the functionality of the audio player */

var audio = document.querySelector('audio');
const durationContainer = document.getElementById('duration');
const currentTimeContainer = document.getElementById('current-time');
const outputContainer = document.getElementById('volume-output');
let raf = null;

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

const displayDuration = () => {
    durationContainer.textContent = calculateTime(audio.duration);
}

const setSliderMax = () => {
    seekSlider.max = Math.floor(audio.duration);
}

 const displayBufferedAmount = () => {
    var bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
    audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
}

const whilePlaying = () => {
    seekSlider.value = Math.floor(audio.currentTime);
    currentTimeContainer.textContent = calculateTime(seekSlider.value);
    audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
    raf = requestAnimationFrame(whilePlaying);
}

if (audio.readyState > 0) {
    displayDuration();
    setSliderMax();
    displayBufferedAmount();
} else {
    audio.addEventListener('loadedmetadata', () => {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
    });
}

audio.addEventListener('progress', displayBufferedAmount);

seekSlider.addEventListener('input', () => {
    currentTimeContainer.textContent = calculateTime(seekSlider.value);
    if(!audio.paused) {
        cancelAnimationFrame(raf);
    }
});

seekSlider.addEventListener('change', () => {
    audio.currentTime = seekSlider.value;
    if(!audio.paused) {
        requestAnimationFrame(whilePlaying);
    }
});

volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;

    outputContainer.textContent = value;
    audio.volume = value / 100;
});

/* Implementation of the Media Session API */
if('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Komorebi',
        artist: 'Anitek',
        album: 'MainStay',
        artwork: [
            { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '96x96', type: 'image/png' },
            { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '128x128', type: 'image/png' },
            { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '192x192', type: 'image/png' },
            { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '256x256', type: 'image/png' },
            { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '384x384', type: 'image/png' },
            { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '512x512', type: 'image/png' }
        ]
    });
    navigator.mediaSession.setActionHandler('play', () => {
        if(playState === 'play') {
            audio.play();
            playAnimation.playSegments([14, 27], true);
            requestAnimationFrame(whilePlaying);
            playState = 'pause';
        } else {
            audio.pause();
            playAnimation.playSegments([0, 14], true);
            cancelAnimationFrame(raf);
            playState = 'play';
        }
    });
    navigator.mediaSession.setActionHandler('pause', () => {
        if(playState === 'play') {
            audio.play();
            playAnimation.playSegments([14, 27], true);
            requestAnimationFrame(whilePlaying);
            playState = 'pause';
        } else {
            audio.pause();
            playAnimation.playSegments([0, 14], true);
            cancelAnimationFrame(raf);
            playState = 'play';
        }
    });
    navigator.mediaSession.setActionHandler('seekbackward', (details) => {
        audio.currentTime = audio.currentTime - (details.seekOffset || 10);
    });
    navigator.mediaSession.setActionHandler('seekforward', (details) => {
        audio.currentTime = audio.currentTime + (details.seekOffset || 10);
    });
    navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.fastSeek && 'fastSeek' in audio) {
          audio.fastSeek(details.seekTime);
          return;
        }
        audio.currentTime = details.seekTime;
    });
    navigator.mediaSession.setActionHandler('stop', () => {
        audio.currentTime = 0;
        seekSlider.value = 0;
        audioPlayerContainer.style.setProperty('--seek-before-width', '0%');
        currentTimeContainer.textContent = '0:00';
        if(playState === 'pause') {
            playAnimation.playSegments([0, 14], true);
            cancelAnimationFrame(raf);
            playState = 'play';
        }
    });
}

//FROM HERE STARTS OUR CODE FOR OUR PLAYLISTS AND BUTTONS

//Events and functionalities of the images
let title = document.querySelector("#plays"); //This is the title of the audio player

//Randomize the playlist with a random index
var count = 0;
var first = 1;

const randomSort = ()=>{
    let jukebox = [];
    do{
        jukebox.push(Math.round(Math.random()*(9-0)+0));
        var jx = jukebox.filter((value,index,array)=>(array.indexOf(value)==index));
    }
    while(jx.length<10);
    return jx;
};
var jack = randomSort();
const redrum = Array.from(jack,Number);

//Function that iterates the array forwards
function apfwd(arr) {

  if (first == 0) {
    first = 1;
    count++;
  } else {
    if (count == (arr.length - 1)) {
      count = 0;
    } else {
      count++;
    }
  }

  let miau = arr[count];
  return miau;
}
//Function that iterates the array backwards
function y(arr) {
    if (first == 1){
        first = 0;
        count--;
        if (count == -1){
            count=(arr.length-1);
        }
    }else{
        if (count == 0){
            count=(arr.length-1);
        }else{
            count--;
        }
    } 

    let miau = arr[count];
    return miau;    
};


//EPIC PLAYLIST ARRAY
const epicPlaylist = [
    "./playlists/epic/Armored Titan - Shingeki no Kyoji.mp3",
    "./playlists/epic/God of War.mp3",
    "./playlists/epic/Harry Potter - Battle Of Hogwarts.mp3",
    "./playlists/epic/Kara Theme - Detroit Become Human.mp3",
    "./playlists/epic/League of Legends - Ranked Song.mp3",
    "./playlists/epic/The Opened Way - Shadow of the Colossus.mp3",
    "./playlists/epic/The Seven Deadly Sins - Perfect Time.mp3",
    "./playlists/epic/Ultra Instinct - Dragon Ball Super.mp3",
    "./playlists/epic/World of Warcraft - Nightsong.mp3",
    "./playlists/epic/NieR Automata - The Sound of the End.mp3"
];

//REFLEX PLAYLIST ARRAY
const reflexPlaylist = [
    "./playlists/reflex/Daft Punk - Veridis Quo.mp3",
    "./playlists/reflex/Dark Souls II - Majula.mp3",
    "./playlists/reflex/Death Note - Main Theme.mp3",
    "./playlists/reflex/Detroit Become Human - Little One.mp3",
    "./playlists/reflex/Elfen Lied - Lilium (on Classical Guitar).mp3",
    "./playlists/reflex/Final Fantasy - Prelude (Orchestral).mp3",
    "./playlists/reflex/Floating Museum - Ghost In The Shell.mp3",
    "./playlists/reflex/Gwyn, Lord of Cinder - Dark Souls.mp3",
    "./playlists/reflex/Skyrim - The Streets of Whiterun.mp3",
    "./playlists/reflex/Thom Yorke - Suspirium.mp3"
];


//COOL PLAYLIST ARRAY
const coolPlaylist = [
    "./playlists/cool/505 - Arctic Monkeys.mp3",
    "./playlists/cool/Breaking The Habit - Linkin Park.mp3",
    "./playlists/cool/DEFTONES - Digital Bath.mp3",
    "./playlists/cool/Django Unchained.mp3",
    "./playlists/cool/Higurashi - Opening.mp3",
    "./playlists/cool/Naruto Opening 2.mp3",
    "./playlists/cool/Pearl Jam - Black.mp3",
    "./playlists/cool/The Midnight - Deep Blue.mp3",
    "./playlists/cool/The Weeknd - House Of Balloons Glass Table Girls.mp3",
    "./playlists/cool/Youth - Daughter.mp3"
];

//SECRET PLAYLIST ARRAY
const secretPlaylist = [
  "./playlists/secret/dofusAstrub.mp3",
  "./playlists/secret/dofusCombat.mp3",
  "./playlists/secret/Naruto.mp3",
  "./playlists/secret/Skyrim.mp3",
  "./playlists/secret/YuGiOh.mp3",
  "./playlists/secret/Zelda.mp3",
  "./playlists/secret/Crash Bandicoot.mp3",
  "./playlists/secret/Pokémon - ¡Atrápalos Ya!.mp3",
  "./playlists/secret/Dragon Ball Z El Poder Nuestro Es.mp3",
  "./playlists/secret/November Rain.mp3"
];


//Epic playlist (fire button)
var epic = document.querySelector("#epic");
const fire = (e)=>{e.target.src="./img/epicOn.png"};
const fireOff = (e)=>{e.target.src="./img/epic.png"};
epic.addEventListener("mouseover",fire);
epic.addEventListener("mouseout",fireOff);
//To tune the playlist name and the lights up
epic.addEventListener("click",(e)=>{ 
    e.target.src="./img/epicOn.png";
    mind.src="./img/mind.png";
    cool.src="./img/cool.png";
    epic.removeEventListener("mouseout",fireOff);
    mind.addEventListener("mouseout",brainOff);
    cool.addEventListener("mouseout",chillOff);
    title.textContent = `epic playlist`;
    document.querySelector("#h300").style.color = `blanchedalmond`;
});
epic.addEventListener("contextmenu",(e)=>{ 
    e.target.src="./img/epicOn.png";
    mind.src="./img/mind.png";
    cool.src="./img/cool.png";
    epic.removeEventListener("mouseout",fireOff);
    mind.addEventListener("mouseout",brainOff);
    cool.addEventListener("mouseout",chillOff);
    title.textContent = `epic playlist`;
    document.querySelector("#h300").style.color = `blanchedalmond`;
});
//Functions for each image/button (and bound its playlist)
epic.addEventListener('click', epicPlayForward = () => { 
    //Changing the song
    audio.pause();
    audio = new Audio(epicPlaylist[apfwd(redrum)]);
    audio.load();
    //For the animation stuff
    playAnimation.playSegments([14, 27], true);
    requestAnimationFrame(whilePlaying);
    playState = 'pause';
    cancelAnimationFrame(raf);
    //For the mute function to work correctly
    if(muteState === 'unmute') {
        muteAnimation.playSegments([15, 25], true);
        audio.muted = false;
        muteState = 'unmute';
    } else {
        muteAnimation.playSegments([0, 15], true);
        audio.muted = true;
        muteState = 'mute';
    };
    //here we will run a hack so the browser will always load the audio and run the code xd
    if (audio.readyState > 0) {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
        audio.play();
    } else {
        audio.addEventListener('loadedmetadata', () => {
            displayDuration();
            setSliderMax();
            displayBufferedAmount();
            audio.play();
        });
    };
    audio.addEventListener('ended',epicPlayForward);
});
epic.oncontextmenu =epicPlayBackward=()=>{
    //Changing the song
    audio.pause();
    audio = new Audio(epicPlaylist[y(redrum)]);
    audio.load();
    //For the animation stuff
    playAnimation.playSegments([14, 27], true);
    requestAnimationFrame(whilePlaying);
    playState = 'pause';
    cancelAnimationFrame(raf);
    //For the mute function to work correctly
    if(muteState === 'unmute') {
        muteAnimation.playSegments([15, 25], true);
        audio.muted = false;
        muteState = 'unmute';
    } else {
        muteAnimation.playSegments([0, 15], true);
        audio.muted = true;
        muteState = 'mute';
    };
    //acá usamos un hack para que siempre nos ejecute duración
    if (audio.readyState > 0) {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
        audio.play();
    } else {
        audio.addEventListener('loadedmetadata', () => {
            displayDuration();
            setSliderMax();
            displayBufferedAmount();
            audio.play();
        });
    };
    audio.addEventListener('ended',epicPlayBackward);
    return false;
};

//Chill playlist (mind button)
var mind = document.querySelector("#mind");
const brain = (e)=>{e.target.src="./img/mindOn.png"};
const brainOff = (e)=>{e.target.src="./img/mind.png"};
mind.addEventListener("mouseover",brain);
mind.addEventListener("mouseout",brainOff);
//To tune the playlist name and the lights up
mind.addEventListener("click",(e)=>{
    e.target.src="./img/mindOn.png";
    epic.src="./img/epic.png";
    cool.src="./img/cool.png";
    mind.removeEventListener("mouseout",brainOff);
    epic.addEventListener("mouseout",fireOff);
    cool.addEventListener("mouseout",chillOff);
    title.textContent = `reflex playlist`;
    document.querySelector("#h300").style.color = `blanchedalmond`;
});
mind.addEventListener("contextmenu",(e)=>{
    e.target.src="./img/mindOn.png";
    epic.src="./img/epic.png";
    cool.src="./img/cool.png";
    mind.removeEventListener("mouseout",brainOff);
    epic.addEventListener("mouseout",fireOff);
    cool.addEventListener("mouseout",chillOff);
    title.textContent = `reflex playlist`;
    document.querySelector("#h300").style.color = `blanchedalmond`;
});
//Functions for each image/button (and bound its playlist)
mind.addEventListener('click', reflexPlayForward = () => {
    //Changing the song
    audio.pause();
    audio = new Audio(reflexPlaylist[apfwd(redrum)]);
    audio.load();
    //For the animation stuff
    playAnimation.playSegments([14, 27], true);
    requestAnimationFrame(whilePlaying);
    playState = 'pause';
    cancelAnimationFrame(raf);
    //For the mute function to work correctly
    if(muteState === 'unmute') {
        muteAnimation.playSegments([15, 25], true);
        audio.muted = false;
        muteState = 'unmute';
    } else {
        muteAnimation.playSegments([0, 15], true);
        audio.muted = true;
        muteState = 'mute';
    };
    //acá usamos un hack para que siempre nos ejecute duración
    if (audio.readyState > 0) {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
        audio.play();
    } else {
        audio.addEventListener('loadedmetadata', () => {
            displayDuration();
            setSliderMax();
            displayBufferedAmount();
            audio.play();
        });
    };
    audio.addEventListener('ended',reflexPlayForward);
});
mind.oncontextmenu = reflexPlayBackward = ()=>{
    //Changing the song
    audio.pause();
    audio = new Audio(reflexPlaylist[y(redrum)]);
    audio.load();
    //For the animation stuff
    playAnimation.playSegments([14, 27], true);
    requestAnimationFrame(whilePlaying);
    playState = 'pause';
    cancelAnimationFrame(raf);
    //For the mute function to work correctly
    if(muteState === 'unmute') {
        muteAnimation.playSegments([15, 25], true);
        audio.muted = false;
        muteState = 'unmute';
    } else {
        muteAnimation.playSegments([0, 15], true);
        audio.muted = true;
        muteState = 'mute';
    };
    //acá usamos un hack para que siempre nos ejecute duración
    if (audio.readyState > 0) {
        displayDuration();
        setSliderMax();apfwd
        displayBufferedAmount();
        audio.play();
    } else {
        audio.addEventListener('loadedmetadata', () => {
            displayDuration();
            setSliderMax();
            displayBufferedAmount();
            audio.play();
        });
    };
    audio.addEventListener('ended',reflexPlayBackward);
    return false;
};

//Cool playlist (sunglasses button)
var cool = document.querySelector("#cool");
const chill = (e)=>{e.target.src="./img/coolOn.png"};
const chillOff = (e)=>{e.target.src="./img/cool.png"};
cool.addEventListener("mouseover",chill);
cool.addEventListener("mouseout",chillOff);
//To tune the playlist name and the lights up
cool.addEventListener("click",(e)=>{
    e.target.src="./img/coolOn.png";
    mind.src="./img/mind.png";
    epic.src="./img/epic.png";
    cool.removeEventListener("mouseout",chillOff);
    mind.addEventListener("mouseout",brainOff);
    epic.addEventListener("mouseout",fireOff);
    title.textContent = `cool playlist`;
    document.querySelector("#h300").style.color = `blanchedalmond`;
});
cool.addEventListener("contextmenu",(e)=>{
    e.target.src="./img/coolOn.png";
    mind.src="./img/mind.png";
    epic.src="./img/epic.png";
    cool.removeEventListener("mouseout",chillOff);
    mind.addEventListener("mouseout",brainOff);
    epic.addEventListener("mouseout",fireOff);
    title.textContent = `cool playlist`;
    document.querySelector("#h300").style.color = `blanchedalmond`;
});
//Functions for each image/button (and bound its playlist)
cool.addEventListener('click', coolPlayForward=()=> {
    //Changing the song
    audio.pause();
    audio = new Audio(coolPlaylist[apfwd(redrum)]);
    audio.load();
    //For the animation stuff
    playAnimation.playSegments([14, 27], true);
    requestAnimationFrame(whilePlaying);
    playState = 'pause';
    cancelAnimationFrame(raf);
    //For the mute function to work correctly
    if(muteState === 'unmute') {
        muteAnimation.playSegments([15, 25], true);
        audio.muted = false;
        muteState = 'unmute';
    } else {
        muteAnimation.playSegments([0, 15], true);
        audio.muted = true;
        muteState = 'mute';
    };
    //acá usamos un hack para que siempre nos ejecute duración
    if (audio.readyState > 0) {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
        audio.play();
    } else {
        audio.addEventListener('loadedmetadata', () => {
            displayDuration();
            setSliderMax();
            displayBufferedAmount();
            audio.play();
        });
    };
    audio.addEventListener('ended',coolPlayForward);
});
cool.oncontextmenu = coolPlayBackward=()=>{
    //Changing the song
    audio.pause();
    audio = new Audio(coolPlaylist[y(redrum)]);
    audio.load();
    //For the animation stuff
    playAnimation.playSegments([14, 27], true);
    requestAnimationFrame(whilePlaying);
    playState = 'pause';
    cancelAnimationFrame(raf);
    //For the mute function to work correctly
    if(muteState === 'unmute') {
        muteAnimation.playSegments([15, 25], true);
        audio.muted = false;
        muteState = 'unmute';
    } else {
        muteAnimation.playSegments([0, 15], true);
        audio.muted = true;
        muteState = 'mute';
    };
    //acá usamos un hack para que siempre nos ejecute duración
    if (audio.readyState > 0) {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
        audio.play();
    } else {
        audio.addEventListener('loadedmetadata', () => {
            displayDuration();
            setSliderMax();
            displayBufferedAmount();
            audio.play();
        });
    }
    audio.addEventListener('ended',coolPlayBackward);
    return false;
};


//MOVABLE || DRAGGABLE 
var draggableDiv = document.querySelector("#draggableDiv");

var PADDING = 1;

var rect;
var viewport = {
  left: 0,
  right:0,
}

//Make the DIV element draggagle:
dragElement(draggableDiv);
dragElement(title);

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    // store the current viewport and element dimensions when a drag starts
    rect = elmnt.getBoundingClientRect();
    viewport.left = PADDING;
    viewport.right = window.innerWidth - PADDING;
    
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    // check to make sure the element will be within our viewport boundary
    var newLeft = elmnt.offsetLeft - pos1;

    if (newLeft < viewport.left
        || newLeft + rect.width > viewport.right
        ) {
    	// the element will hit the boundary, do nothing...
    } else {
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    };
  };

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  };
}


//Erase/recreate div
function titleHover() {
    if(divKills==1){
        return false;
    }   
    else{
        title.onmouseover = function(){
            title.style.transition='0s';
            title.style.opacity='0.6';
        };
        title.onmouseout = function(){
            title.style.opacity= '0.3';
        };
    };
};
let divKills = 0;
let toggleBug = 1; 
let defaultEnded = 0;
function divKiller(){
  toggleBug = 0;
    if(divKills == 0){
        details.appendChild(audioPlayerContainer);
        draggableDiv.style.width = "430px";
        audioPlayerContainer.style.width = "430px"; 
        title.style.transitionDelay = '0s';
        title.style.transition = 'opacity 3s';
        title.style.opacity = '1';
        title.onmouseover = '';
        title.onmouseout = '';
        divKills++;
    }
    else{
      if(defaultEnded == 1){
        audioPlayerContainer.remove();
        draggableDiv.style.width = "150px";
        title.style.transition = 'opacity 3s 1s';
        title.style.opacity = '0.3';
        setTimeout(titleHover,1000);
        divKills--;
      }
      else{
        audioPlayerContainer.remove();
        draggableDiv.style.width = "100px";
        title.style.transition = 'opacity 3s 1s';
        title.style.opacity = '0.3';
        setTimeout(titleHover,1000);
        divKills--;
      }
    }
}

details.addEventListener('toggle',divKiller);
document.oncontextmenu = () => {return false};
//end.

//To maintain fixed the audio player while dragging sliders
const aPI = document.querySelectorAll(".aPi");
seekSlider.addEventListener('mouseover',()=>{
  draggableDiv.style.width = '4300px';
});
seekSlider.addEventListener('mouseout',()=>{
  draggableDiv.style.width = '430px';
});

volumeSlider.addEventListener('mouseover',()=>{
  draggableDiv.style.width = '4300px';
});
volumeSlider.addEventListener('mouseout',()=>{
  draggableDiv.style.width = '430px';
});
//end.

//choose a random playlist once the default song has ended
const playlists = [epicPlayForward,reflexPlayForward,coolPlayForward];
audio.addEventListener('ended',()=>{
  defaultEnded = 1;
  if(toggleBug == 1){
    draggableDiv.style.width = "150px";
    audioPlayerContainer.style.width = "150px"; 
  };
    let z = Math.round(Math.random()*(2-0)+0);
    playlists[z]();
    switch (z){
      case 0:
        epic.src="./img/epicOn.png";
        mind.src="./img/mind.png";
        cool.src="./img/cool.png";
        epic.removeEventListener("mouseout",fireOff);
        mind.addEventListener("mouseout",brainOff);
        cool.addEventListener("mouseout",chillOff);
        title.textContent = `epic playlist`;
        break;
        
      case 1:
        mind.src="./img/mindOn.png";
        epic.src="./img/epic.png";
        cool.src="./img/cool.png";
        mind.removeEventListener("mouseout",brainOff);
        epic.addEventListener("mouseout",fireOff);
        cool.addEventListener("mouseout",chillOff);
        title.textContent = `reflex playlist`;
        break;
          
      default:
        cool.src="./img/coolOn.png";
        mind.src="./img/mind.png";
        epic.src="./img/epic.png";
        cool.removeEventListener("mouseout",chillOff);
        mind.addEventListener("mouseout",brainOff);
        epic.addEventListener("mouseout",fireOff);
        title.textContent = `cool playlist`;
        break;
    }
});
//end audioplayer.


//10/03/2021 Le robé esta pequeña gran idea de función a alguien en los comentarios de soloLearn xd
function getE(id){
  return document.getElementById(id);
}
function getClass(c){
  return document.getElementsByClassName(c);
}
function getTag(tagName){
  return document.getElementsByTagName(tagName);
}

//ANIMACIÓN INTRO 300
var intro300 = document.querySelector("#containerIntro300");
var aaa = document.querySelector("#intro300");
aaa.addEventListener("click",kil);
function pre(){
  aaa.style.transform = 'translate(0%,0%)';
  setTimeout(pe,600);
}
function pe(){
  aaa.style.transform = 'scale(0.6)';
}
function pree(){
  aaa.style.transform = 'scale(1.2)';  
  setTimeout(pee,400);
}
function pee(){
  aaa.style.transform = 'translate(1000%,-300%)';
}
function kil(){
  let whooosh = new Audio('./music/whooosh.mp3');
  whooosh.play();
  aaa.style.transform = 'scale(2)';
  aaa.style.opacity="0";
  setTimeout(kill,200);
}
function kill(){
  document.body.removeChild(intro300);
  audio.play();
  playAnimation.playSegments([14, 27], true);
  requestAnimationFrame(whilePlaying);
  playState = 'pause';
  cancelAnimationFrame(raf);
}

//MÚSICA Y SONIDOS
//PARA MENÚES AL INICIAR
var timm = 0;
var launch;
function launcher(){
  var zuish = new Audio();
  var faia = new Audio();
  zuish.src = "music/test.mp3";
  faia.src = "music/fire.mp3";
  zuish.play();
  faia.play();
  launch = setInterval(wii,300);
}
function wii(){
  timm++;
  if (timm<8){
    var zuish = new Audio();
    zuish.src = "music/test.mp3";
    zuish.play();
  }
  else{
    clearInterval(launch);
  };
}


//PARA 300
var tre = document.querySelector("#h300"); //300
tre.addEventListener("mouseover",drama);
tre.addEventListener("mouseout",noDrama);
tre.onclick = function() {
  nostalgia(); 
  title.textContent = `secret playlist`; 
  tre.style.color='white';
  tre.removeEventListener('mouseover',drama);
  tre.removeEventListener('mouseout',noDrama);
};
tre.oncontextmenu = function() {
  childhood(); 
  title.textContent = `secret playlist`; 
  tre.style.color='white';
  tre.removeEventListener('mouseover',drama);
  tre.removeEventListener('mouseout',noDrama);
};

var colossus = new Audio();
colossus.src = "music/300hover.mp3";
var omg = 0;
var lastPlaylist = 0;

function drama(){
  title.textContent = `???`;
  colossus.play();
  
  if(epic.src=='file:///C:/Users/Daniel%20Vega/Documents/PROGRAMACI%C3%93N%20ALV/300/img/epicOn.png'){
    epic.src = "./img/epic.png";
    lastPlaylist = 211;
  }
  else if(mind.src=='file:///C:/Users/Daniel%20Vega/Documents/PROGRAMACI%C3%93N%20ALV/300/img/mindOn.png'){
    mind.src = "./img/mind.png";
    lastPlaylist = 121;
  }
  else if(cool.src=='file:///C:/Users/Daniel%20Vega/Documents/PROGRAMACI%C3%93N%20ALV/300/img/coolOn.png'){
    cool.src = "./img/cool.png";
    lastPlaylist = 112;
  }
  else{
    lastPlaylist = 111;
  };

  muteAnimation.playSegments([0, 15], true);
  audio.muted = true;

  audio.pause();
  playAnimation.playSegments([0, 14], true);
  cancelAnimationFrame(raf);
}

function noDrama(){
  colossus.pause();

  switch (lastPlaylist){
    case 211:
      title.textContent = `epic playlist`;
      epic.src="./img/epicOn.png";
      break
      
    case 121:
      title.textContent = `reflex playlist`;
      mind.src="./img/mindOn.png";
      break;
      
    case 112:
      title.textContent = `cool playlist`;
      cool.src="./img/coolOn.png";
      break;

    default:
      title.textContent = `playlists`;
      break;
  };

  if(muteState === 'unmute'){
    muteAnimation.playSegments([15, 25], true);
    audio.muted = false;
  }
  else{
    muteAnimation.playSegments([0, 15], true);
    audio.muted = true;
  };
    
  if(playState === 'pause'){
    audio.play();
    playAnimation.playSegments([14, 27], true);
    requestAnimationFrame(whilePlaying);
  }else{
    playAnimation.playSegments([0, 14], true);
    cancelAnimationFrame(raf);
  };
}

function nostalgia(){
  if(typeof colossus === 'object'){
    colossus.pause();
    colossus = 0;
  };
  
      //Changing the song
      audio.pause();
      audio = new Audio(secretPlaylist[apfwd(redrum)]);
      audio.load();
      //For the animation stuff
      playAnimation.playSegments([14, 27], true);
      requestAnimationFrame(whilePlaying);
      playState = 'pause';
      cancelAnimationFrame(raf);
      //For the mute function to work correctly
      if(muteState === 'unmute') {
          muteAnimation.playSegments([15, 25], true);
          audio.muted = false;
          muteState = 'unmute';
      } else {
          muteAnimation.playSegments([0, 15], true);
          audio.muted = true;
          muteState = 'mute';
      };
      //here we will run a hack so the browser will always load the audio and run the code xd
      if (audio.readyState > 0) {
          displayDuration();
          setSliderMax();
          displayBufferedAmount();
          audio.play();
      } else {
          audio.addEventListener('loadedmetadata', () => {
              displayDuration();
              setSliderMax();
              displayBufferedAmount();
              audio.play();
          });
      };
      audio.addEventListener('ended', nostalgia);
}
function childhood(){
  if(typeof colossus === 'object'){
    colossus.pause();
    colossus = 0;
  };

    //Changing the song
    audio.pause();
    audio = new Audio(secretPlaylist[y(redrum)]);
    audio.load();
    //For the animation stuff
    playAnimation.playSegments([14, 27], true);
    requestAnimationFrame(whilePlaying);
    playState = 'pause';
    cancelAnimationFrame(raf);
    //For the mute function to work correctly
    if(muteState === 'unmute') {
        muteAnimation.playSegments([15, 25], true);
        audio.muted = false;
        muteState = 'unmute';
    } else {
        muteAnimation.playSegments([0, 15], true);
        audio.muted = true;
        muteState = 'mute';
    };
    //acá usamos un hack para que siempre nos ejecute duración
    if (audio.readyState > 0) {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
        audio.play();
    } else {
        audio.addEventListener('loadedmetadata', () => {
            displayDuration();
            setSliderMax();
            displayBufferedAmount();
            audio.play();
        });
    };
    audio.addEventListener('ended',childhood);
    return false;
}

//PARA SECCIONES
const sections = getTag("summary");
//al abrir y cerrar
bipBip = 0;
for (let i = 0; i < sections.length; i++){
  sections[i].addEventListener("click",openClose); //al abrir y cerrar
};
function openClose(){
  switch (bipBip) {
    case 0:
      var sonido = new Audio();
      sonido.src = "music/open.mp3";
      sonido.play();
      bipBip++;
      break;

    default:
      var sonido = new Audio();
      sonido.src = "music/close.mp3";
      sonido.play();
      bipBip--;
      break;
  }
}

//PARA BOTONES HASTA FINAL DE CICLOS
var clicCLIC = 0;
for (let i = 0; i < 16; i++){
  getTag("button")[i].addEventListener("mouseup",downUp);
  getTag("button")[i].oncontextmenu = function(){return false};
}
function downUp(){
  switch (clicCLIC) {
    case 0:
      var buttonSound = new Audio();
      buttonSound.src = "music/buttonUP.mp3";
      buttonSound.play();
      clicCLIC++;
      break;
      
    default:
      var buttonSound = new Audio();
      buttonSound.src = "music/buttonDOWN.mp3";
      buttonSound.play();
      clicCLIC--;
      break;
    }
} 
//PARA BOTONES DESDE ARRAY
var miiauu = 0;
for (let i = 0; i < getClass("botonesSeccionArreglos").length; i++) {
  getClass("botonesSeccionArreglos")[i].addEventListener("mouseup",guau);
  getClass("botonesSeccionArreglos")[i].oncontextmenu = function(){return false};
}
function guau(){ 
  var buttonSound = new Audio();
  buttonSound.src = "music/buttonUP.mp3";
  buttonSound.play();
  miiauu = 1;
  for (let i= 16; i < getTag("button").length; i++) {
    getTag("button")[i].addEventListener("mouseout",guauu);
  }
}

function guauu(){
  if (miiauu == 1){
  var buttonSound = new Audio();
  buttonSound.src = "music/buttonDOWN.mp3";
    buttonSound.play();
  miiauu = 0;
  }
  else{}
}
//2 SONIDOS DE LOS VECTORES
//al pasar el mouse por encima
var vectors = document.querySelectorAll(".vector");
var vectorBoxes = document.querySelectorAll(".vector > div");
[].forEach.call(vectors,function(vector){
  [].forEach.call(vectorBoxes,function(box){
    box.addEventListener("mouseover",flashes);
  });
});
function flashes(){
  var flsh = new Audio();
  flsh.src = "music/flashes.mp3";
  flsh.play();
}



//INICIO DE LOS PROBLEMAS Y SOLUCIONES
// 6 EJERCICIOS DE VARIABLES

"1." 
    a = 10
    b = 20
    c = 5
    a = a + 3
    b = b + 4 - a
    c = a + b + c
    a = a + c
    b = 4
    c = c + 3 - b + 2
document.getElementById("1").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}`; 


"2."

  a = 5
  b = 18
  c = 15
  d = 25
  a = a + 10
  b = b + 5 - c
  c = c + 4 + b
  d = d + b + a
  a = a + 1
  b = b + c
  c = b + c
  d = b + b
  document.getElementById("2").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n  d = ${d}`; 


"3."

  a = 9
  b = 6
  a = a + 4
  b = b + 2
  a = a + 10
  b = b - 25
  a = a - 20
  b = b + 5
  a = a + 4
  b = b + 2
  a = a + 10
  b = b - 10
  document.getElementById("3").innerHTML = `
  a = ${a}\n\n  b = ${b}`; 


"4."

  a = 18
  b = 18
  c = 18
  d = 18
  a = a + b
  b = a - b
  c = a + b
  d = a - b
  a = a - b
  b = a + b
  c = a - b
  d = a + b
  document.getElementById("4").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n  d = ${d}`; 


"5."

  a = 10
  b = 5
  a = a - 5
  b = b + 6
  a = a + 18
  b = b - 23
  a = a - 21
  b = b - 5
  a = a - 4
  b = b - 2
  a = a + 10
  b = b + 10
  document.getElementById("5").innerHTML = `
  a = ${a}\n\n  b = ${b}`; 


"6."

  a = 8
  b = 7
  c = 5
  d = 8
  a = a + b - c + d
  b = a + b - c + d
  c = a + b - c + d
  d = a + b - c + d
  a = a + b - c + d
  b = a + b - c + d
  c = a + b - c + d
  d = a + b - c + d
  document.getElementById("6").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n  d = ${d}`; 


// 20 EJERCICIOS DE OPERADORES
  a = 0 
  b = 0
  c = 0
  d = 0

"1." 
    
    a = 10
    b = 20
    c = 10
    a = a + 15
    b = b + 12
    c = a * c
  
    "¿Qué valores quedan en las variables a, b y c?"
  document.getElementById("301").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`;     


"2."
    
    a = 3
    b = 8
    c = 1
    a = 5
    b = 9
    c = 7
    a = a + 1
    b = b + 2
    c = c + 3

    "¿Qué valores quedan en las variables a, b y c?"
  document.getElementById("302").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`; 

"3." 
    
    a = 10
    b = 5
    c = 10
    a = a + b - 5
    b = a + b - 5
    c = a + b - 5
    a = a + 5 * b / 2
    b = a + 5 * b / 2
    c = a + 5 * b / 2

    "¿Qué valores quedan en las variables a, b y c?"
  document.getElementById("303").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`; 

"4." 
    
    a = 5
    b = 5
    c = 5
    a = a + a
    b = b + b
    c = c + c
    a = a + b + c
    b = a + b + c
    c = a + b + c

    "¿Qué valores quedan en las variables a, b y c?"
  document.getElementById("304").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`; 

"5."

    a = 10
    b = 10
    c = 10
    a = a + 5
    b = a + 3
    c = a + 2
    a = b + 4
    b = b + 5
    c = c + 8
    
    "¿Qué valores quedan en las variables a, b y c?"
  document.getElementById("305").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`; 

"6." 

    a = 10
    b = 1
    c = 4
    a = a + c
    b = a + c
    c = a + c
    a = c + 5
    b = c + b
    c = a + b + c
    
    "¿Qué valores quedan en las variables a, b y c?"
  document.getElementById("306").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`; 

"7." 
    
    a = 1
    b = 1
    c = 1
    a = a + a
    b = b + a
    c = c + a
    a = a + a
    b = b + a
    c = c + a
    
    "¿Qué valores quedan en las variables a, b y c?"
  document.getElementById("307").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`; 

"8." 

    a = 10
    b = 50
    c = 30
    a = a - b
    b = b - c
    c = c - a
    a = a - 1
    b = b - a
    c = c + a - b
    
    "¿Qué valores quedan en las variables a, b y c?"
  document.getElementById("308").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`; 

"9." 
    
    a = 1
    b = 2
    c = 3
    a = a + b
    b = a - b
    c = a * b
    a = a - b
    b = a + b
    c = a * b

    "¿Qué valores quedan en las variables a, b y c?"
  document.getElementById("309").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`; 

"10." 
    
    a = 1
    b = 2
    c = 3
    a = a + 2
    b = a + 2 + b
    c = a + 2 + c
    a = a / 2
    b = b / 2
    c = c / 2
    "¿Qué valores quedan en las variables a, b y c?"  
  document.getElementById("310").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n`; 


"11."

 x = (a+b/c)/(a/b+c)


"12."

x = (a + b + a/b)/c


"13."

x = a/(a+b)/a/(a-b)


"14."

x = (a+b/(a+b+b/c))/a+b/(c+a)


"15."

x = (a+b+c)/(a+(b/c))


"16."

x = (a+b+c/(d*a))/(a+b*(c/d))


"17."

x = (a+b/c+d)/a


"18."

x = (a/b+b/c)/(a/b-b/c)


"19."

x = a + (a+(a+b/c+d))/(a+a/b)


"20."

x = a + b + c/d + (a/(b-c)/a/(b+c))


/* Estructuras del pensamiento humano
1
secuencias de acciones

2
decisión de acción

3
ciclos de acciones

Toda acción sólo se ejecuta si se cumple una condición, sea una secuencia, decisión o ciclo de acciones.
*/


// 50 algoritmos reales de decisión

x = 0
a = 0
b = 0
c = 0
d = 0


//Función para que sólo entren números en el input, carácteres diferentes arrojarán error
var alrt = 0;
function onlyNum(evt)
{
    if(window.event){
        keynum = evt.keyCode;
    }
    else{
        keynum = evt.which;
    } 
    if((keynum > 47 /*0*/ && keynum < 58 /*9*/) || keynum == 8 /* tecla borrar*/ || keynum == 13 /*enter*/  )
    {
        return true;
    }else{
      if(keynum!=45){
        switch (alrt){
          case 0:
            underAlrt = setTimeout(()=>{alrt=0},300000);
            alert("Ingresar sólo números enteros");
            alrt++;
            return false;
            break;

          case 1:
            alert("Oye... ¿Qué no lees? ¡Ingresar sólo números enteros!");
            alrt++;
            return false;
            break;
          
          case 2:
            alert("Okay, comienzo a perder la paciencia...INGRESAR SÓLO NÚMEROS ENTEROS");
            alrt++;
            return false;
            break;
          
          case 3:
            alert("¡¡¡INGRESAR SÓLO NÚMEROS ENTEROS!!! AAAAAA");
            alrt++;
            return false;
            break;
          
          case 4:
            alert("¡¡¡INGRESAR SÓLO NÚMEROS¡¡¡INGRESAR SÓLO NÚMEROS ¡¡¡INGRESAR SÓLO NÚMEROS ¡¡¡INGRESAR SÓLO NÚMEROS AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            alrt++;
            return false;
            break;

          case 5:
            alert("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            alrt++;
            return false;
            break;

          case 6:
            alert("$!#%/dfndndsofjPJSFDGOSDFG8J9JMLoiwjnsdf/(/!%$/(=)?¡))/!&&###HODSFH91!)&%nNSDF0!)&$#%nf0234708n!)(#$)fn#f=/%#1%#%oijfu$U4324T0J934'U9#MANCO09%#$=/()&¡?¡=))/SD*//-#$%@@@%$%%$°)/SDF");
            alrt++;
            return false;
            break;

          case 7:
            alert("Reiniciando...");
            alrt++;
            return false;
            break;
          
          case 8:
            alert("...");
            alrt++;
            return false;
            break;

          case 9:
            alert("Reajustando niveles de toleranciaContraLaEstupidez: 9999");
            alrt++;
            return false;
            break;

          case 10:
            alert("...");
            alrt++;
            return false;
            break;

          default:
            alert("Por favor, ingresar sólo números enteros c:    Gracias.");
            clearTimeout(underAlrt);
            return false;
            break;
        };
      }
      else{
      return false;
      };
    };
};

//Un pequeño código para alternar de positivo a negativo con (-) y optimizar el atributo maxLength
const allInputs = document.getElementsByTagName("input");
var nv = 0;
var pstv = 1;
var miau = 0;

[].forEach.call(allInputs, function(input){
  input.addEventListener('keydown',inputTest,false);  
  input.addEventListener('input', function(){
    if (this.value<0){
      if(nv == 0){
        nv = 1;
        pstv = 0;
        this.maxLength++;
      };
    }
    else{
      if(pstv == 0){
        pstv = 1;
        nv = 0;
        this.maxLength--;
      };
    };
  });

});

function inputTest(e){
  if (e.keyCode === 109 || e.keyCode === 189){
    if (this.value != ``){
      this.value = -this.value;
    }
    else{
        this.value = '-';
    };
  };

  if(isNaN(this.value)){
    this.value = '-'
  };
};


 // 1. Leer un número entero y determinar si es un número terminado en 4.
 function result(){
    var inputValue = document.getElementById("input").value;
   
    if((inputValue == 0)){
      document.getElementById("r1").innerHTML = ""; 
    }else if((inputValue == "-")){
      document.getElementById("r1").innerHTML = "";  
    }else{
      if(inputValue%10 == 4 || inputValue%10 == -4) {
        if(inputValue < 10 && inputValue >=-4){
          if(inputValue == 4 || inputValue == -4){
            document.getElementById("r1").innerHTML = `aaaaah, ahora sí nos estamos entendiendo, UwU eso sí es un SEÑOR ${inputValue%10}`;
          }
          else{ 
          document.getElementById("r1").innerHTML = `eso ni siquiera es un 4, es un ${inputValue%10} >:v`;
          }
        }
        else{
          document.getElementById("r1").innerHTML = `${inputValue} termina en 4, obviamente UwU`;
        }
      }
      else{
        document.getElementById("r1").innerHTML = `${inputValue} no termina en 4, termina en ${inputValue%10} >:v`;
      }
    }
}

/*Esta función me permite contar cuántos dígitos tiene cualquier valor
TAREA: CONVERTIR ESTA FUNCIÓN EN UNA LLAVE UNIVERSAL, VOLVIENDO numValue UN ARREGLO REUTILIZABLE*/

// 2. Leer un número entero y determinar si tiene 3 dígitos.
function result2(){

  var numValue = document.getElementById("input2").value;
  var length = (numValue<0)? (numValue.length)-1:numValue.length;

  if((numValue == 0)){
    document.getElementById("r2").innerHTML = "";
  }else if((numValue == "-")){
    document.getElementById("r2").innerHTML = "";  
  }else{
      if((length == 3)) {
        document.getElementById("r2").innerHTML = `${numValue} si que tiene ${length} dígitos AWIWIIII uwu`;
      }else{
          document.getElementById("r2").innerHTML = `nop, ${numValue} no tiene 3 dígitos sino ${length} >:c`;
      }
  }
}

// 3. Leer un número entero y determinar si es negativo.
function result3(){

  var value3 = document.getElementById("input3").value;
  
  if((value3 == 0)){
    document.getElementById("r3").innerHTML = "";
  }else if((value3 == "-")){
    document.getElementById("r3").innerHTML = ""; 
  }else{
    if ((value3 < 0)) {
      document.getElementById("r3").innerHTML = `${value3} es negativo, efectivamente ;)`;
    }else {
      document.getElementById("r3").innerHTML = `¿Podrías dejar de ser tan positivo, ${value3}? Dios...`;
    }
  }
}

// 4. Leer un número entero de dos dígitos y determinar a cuánto es igual la suma de sus dígitos.
function result4(){
  var n4 = document.getElementById("input4").value;

  if((n4 == 0)){
    document.getElementById("r4").innerHTML = "";
  }else if((n4 == "-")){
    document.getElementById("r4").innerHTML = ""; 
  }else{
    if ((n4 < 100 && n4 > 9)) {
        left = Number.parseInt(n4/10);
        right = (n4%10);
        document.getElementById("r4").innerHTML = `${left} y ${right} andaban juntos haciendo el ${n4}, PERO LUEGO SE SEPARARON D: no más para hacer la FUUUSIÓN y sumar ${left+right} UwU`; 
    }else {
      if (n4 < 9) {
      document.getElementById("r4").innerHTML = `¡Oh, vamos! ¿Un ${n4}? Dame un número MÁS...<br>Dos cabezas piensan mejor que una -guiño guiño ;)-`;
    } else {
        document.getElementById("r4").innerHTML = `¡Oye,${n4}!... ¡NO HAY CAMA PA' TANTA GENTEE!`;
      }
    }
  }
}  

// 5. Leer un número entero de dos dígitos y determinar si ambos dígitos son pares.
function result5(){
  var n5 = document.getElementById("input5").value;
  left = Number.parseInt(n5/10);
  right = (n5%10);

  if((n5 == 0)){
    document.getElementById("r5").innerHTML = "";
  }else if((n5 == "-")){
    document.getElementById("r5").innerHTML = ""; 
  }else{
    if ((n5 < 100 && n5 > 9)) {
      if ((left%2 == 0 && right%2 == 0)) {
        document.getElementById("r5").innerHTML = `Qué BONITO es el ${n5}: de dos dígitos<br> y conformado por el ${left} y el ${right}, ambos números par UwU <3`; 
      }
      else if((left%2 == 0)){
        document.getElementById("r5").innerHTML = `${n5} tiene dos dígitos, ¡qué guapo!<br> Lástima que sólo su ${left} sea par, mientras el cabezón de ${right} es un impar feo ahí >:c`;
      }
      else if ((right%2 == 0)) {
        document.getElementById("r5").innerHTML = `${n5} tiene dos dígitos, bien ahí. Pero el ${left} es impar mientras que el ${right} es par,<br> como obviamente ves... Y eso así no me sirve, o todo o nada, humano D:<`;
      }
      else{
        document.getElementById("r5").innerHTML = `¡Dos dígitos tiene el ${n5}! Lo aceptaría en mis filas...<br>Pero el ${left} y el ${right} son impares y no puedo permitir esto. Perdóname, niñita.`; 
      }
    }
    else {
      if (n5 < 9) {
        if ((n5%2 == 0)) {
          document.getElementById("r5").innerHTML = `Vamos, ${n5}, ¡que eres par!<br> Consíguete una buena pareja para el baile, chiquilín ;)`;
        }
        else{
          document.getElementById("r5").innerHTML = `¡La perfección no existee! Eres hermoso como eres, ${n5},<br> con to'as tus imperfecciones lograrás lo que quieras... Te lo juro por Dieguito Maradonna :'D`;
        }
      }
      else {
        if ((n5%2 == 0)) {
          document.getElementById("r5").innerHTML = `Uuuy, ${n5} ¡casi logras pasar!...<br> ¡No más no cabes por esos kilitos extra, señorit@ par!`;
        } else {
          document.getElementById("r5").innerHTML = `Palo que crece torcido, jamás endereza... ${n5}<br> ¡'tas bien grande y aparte bien impar! F por ti.`;
        }
      }
    }
  }
}  

// 6. Leer un número entero de dos dígitos menor que 20 y determinar si es primo.

//PRIMERA PROPUESTA DE ESTRUCTURA DE CASOS PARA NÚMEROS PRIMOS
/*function prime(){

  let z;
  const two = z%2;
  const three = z%3;
  const five = z%5;
  const seven = z%7;
  const eleven = n6%11;
  
  
  if (two != 0 && three != 0 && five!= 0 && seven != 0) {
      document.getElementById("r6").innerHTML = `El señor ${z} es un número primo divisible sólo por 1 y por ${z} (por si mismo)`;
  } 
  else {   
      if (two == 0) {
          if (z == 2){
              document.getElementById("r6").innerHTML = `Eso es un ${z} y por supuesto que es primo, ya que sólo puedes dividirlo por 1 y por ${z} uwu`;
          }
          else{
              document.getElementById("r6").innerHTML = `El señor ${z} es un número par no primo`;
          } 
      }
      else if(three == 0) {
          if (z == 3) {
              document.getElementById("r6").innerHTML = `Eso es un ${z} y por supuesto que es primo, ya que sólo puedes dividirlo por 1 y por ${z} uwu`;       
          } 
          else {
              document.getElementById("r6").innerHTML = `El señor ${z} es un número impar no primo, ya que es por lo menos múltiplo de 3`;
          }
      }
      else if(five == 0) {
          if (z == 5) {
              document.getElementById("r6").innerHTML = `Eso es un ${z} y por supuesto que es primo, ya que sólo puedes dividirlo por 1 y por ${z} uwu`;       
          } 
          else {      
              document.getElementById("r6").innerHTML = `El señor ${z} es un número no primo ya que es por lo menos múltiplo de 5`;
          }
      }
      else if(seven == 0) {
          if (z == 7) {
              document.getElementById("r6").innerHTML = `Eso es un ${z} y por supuesto que es primo, ya que sólo puedes dividirlo por 1 y por ${z} uwu`;
          } 
          else {
              document.getElementById("r6").innerHTML = `El señor ${z} es un número no primo ya que es por lo menos múltiplo de 7`;
          }
          }
  }
  
}*/


//EJERCICIO 6 Leer un número entero de dos dígitos menor que 20 y determinar si es primo.
function result6(){
  
    var n6 = document.getElementById("input6").value;
    var aux = Math.abs(n6);
    var length = (n6<0)? n6.length-1:n6.length;
    var len = (length==1)? `${n6} tiene solo 1 dígito`:`${n6} tiene ${length} dígitos`;
  
    //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;

  for (let numbers = 2; numbers <= aux; numbers++) {
      const prime = n6%numbers;
      if (prime == 0) {
        box.push(numbers);  
      }
    }
  //¿PRIMOS?
  var primes = (box.length == 1)? ` es número primo UwU`:` igual no es primo :c`;
  var ngtv = (n6<0)? `... ¿Sabías que los números primos <br> no pueden ser negativos? Quítale ese feo menos (-) al pobre ${aux} >:c`:primes;
  // ¿MENORES A 20?
  var min = (n6<20)? `es menor a 20 UwU`:`ojito que no es menor a 20`;

  //Personalización del problema
  var pero = (((box.length == 1)&&(n6<20&&n6>0))||((box.length != 1)&&(n6>20&&n6>0)))? `y`:`pero`;
  var xd = `${min} ${pero}${ngtv}`;
    
    if((n6 == 0)){
      document.getElementById("r6").innerHTML = ``;
    }
    else if((n6 == "-")){
      document.getElementById("r6").innerHTML = ``; 
    }
    else{
      switch (length) {

        case 2:
          document.getElementById("r6").innerHTML = `${len} :D y ${xd}`; 
          break;
          
          default:  
          document.getElementById("r6").innerHTML = `${len} y no 2 :c Pero que igual te cuento que <br> ${xd}`; 
          break;
      }
    }
}

// 7. Leer un número entero de dos dígitos y determinar si es primo y además si es negativo.
function result7(){
  
  var n7 = document.getElementById("input7").value;
  var aux = Math.abs(n7);
  var length = (n7<0)? n7.length-1:n7.length;
  var len = (length==1)? `El número ${n7} tiene solo 1 dígito`:`El número ${n7} tiene ${length} dígitos`;
  
  //ALGORITHM FOR PRIME NUMBERS >:c
  box = [];
  primes=``;

  for (let numbers = 2; numbers <= aux; numbers++) {
      const prime = n7%numbers;
      if (prime == 0) {
        box.push(numbers);  
      };
  }
  
  //SOLUTION
  var primes = (box.length == 1)? `es un número primo UwU`:`no es un número primo :c`;
  var solution = (n7<0)? `es negativo :D`:`es positivo :C`;
  var pero = (((box.length == 1)&&(n7<0))||((box.length != 1)&&(n7>0)))? `y`:`pero`;
  //Personalización del problema 
  var xd = `${solution} ${pero} ${primes}`;
    
    if((n7 == 0)){
      document.getElementById("r7").innerHTML = ``;
    }
    else if((n7 == "-")){
      document.getElementById("r7").innerHTML = ``; 
    }
    else{
      switch (length) {
        case 2:
          document.getElementById("r7").innerHTML = `${len}, como pide el ejercicio :D <br> ${xd}`; 
          break;
          
          default:  
          document.getElementById("r7").innerHTML = `${len} y no 2 :C pero que igual te lo calculo :D<br>${xd} <br>`; 
          break;
      }
    }
}

// 8. Leer un número entero de dos dígitos y determinar si sus dos dígitos son pares.
function result8(){

    let n8 = document.getElementById("input8").value;
    let left = Number.parseInt( n8 / 10 );
    let right = n8%10;

  if ((n8 == 0)) {
    document.getElementById("r8").innerHTML = "";
  }else if((n8 == "-")){
    document.getElementById("r8").innerHTML = ""; 
  }else {
    if ( n8 > 9 && n8 < 100 ) {
      if (left == 2 || left == 3 || left == 5 || left == 7) {
        if (right == 2 || right == 3 || right == 5 || right == 7) {
          if ( right == left ) {
            document.getElementById("r8").innerHTML = `El ${n8} es el ${left} dos veces seguidas.... Y ADIVINA QUÉ. EL ${right} ES UN NÚMERO par WOOHOOO :D ${n8} está conformado por un número paro`;
          }
          else { 
           document.getElementById("r8").innerHTML = `Cuando separas al ${n8} obtienes al ${left} y al ${right}. Lo bonito de esta relación es... QUE AMBOS, ${left} & ${right} SON NÚMEROS PARES :D`;
          }
        }   
        else {
          document.getElementById("r8").innerHTML = `El ${left} y el ${right} forman el  ${n8}; ¡EL ${left} ES par, SIN EMBARGO, EL ${right} ÑO!`;
        }
      }
      else{
        if (right == 2 || right == 3 || right == 5 || right == 7) {
          document.getElementById("r8").innerHTML = `El ${n8} está formado por el ${left} y el ${right}. ¡${left} NO ES par, PERO EL ${right} SÍ!`;
        }
        else {
          if ( right == left ) {
            document.getElementById("r8").innerHTML = `El ${n8} es el ${left} dos veces seguidas y lamentablemente... EL ${right} NO ES UN NÚMERO par, doble F por ti, ${n8}`; 
          }
          else {
            document.getElementById("r8").innerHTML = `El ${n8} está conformado por dos números NO parS. NI ${left} NI ${right} SON parS, dame otro número.`;
          }
        }
      }
    } 
    else if ( n8 > -100 && n8 < -9 ) {
        if (left == -2 || left == -3 || left == -5 || left == -7) {
          if (right == -2 || right == -3 || right == -5 || right == -7) {
            if ( right == left ) {
              document.getElementById("r8").innerHTML = `El ${n8} es el ${left} dos veces seguidas.... Y ADIVINA QUÉ. EL ${right} ES UN NÚMERO par WOOHOOO :D ${n8} está conformado por un número paro`;
            } 
            else {
              document.getElementById("r8").innerHTML = `Cuando separas al ${n8} obtienes al ${left} y al ${right}. Lo bonito de esta relación es... QUE AMBOS, ${left} & ${right} SON NÚMEROS parS :D`;
            }
          } 
          else {
            document.getElementById("r8").innerHTML = `El ${left} y el ${right} forman el  ${r8}; ¡EL ${left} ES par, SIN EMBARGO, EL ${right} ÑO`;
          }
        }
        else{
          if (right == -2 || right == -3 || right == -5 || right == -7) {
            document.getElementById("r8").innerHTML = `El ${n8} está formado por el ${left} y el ${right}. ¡EL ${left} NO ES par, EL ${right} SÍ!`;
          }
          else {
            if ( right == left ) {
              document.getElementById("r8").innerHTML = `El ${n8} es el ${left} dos veces seguidas y lamentablemente... EL ${right} NO ES UN NÚMERO par, doble F por ti, ${n8}`;
            } else { 
              document.getElementById("r8").innerHTML = `El ${n8} está conformado por dos números NO parS. NI ${left} NI ${right} SON parS, dame otro número.`;
            }
          }
        }
    }
    else {
      if ( n8 <= 9 || n8 >= 100 ) {
          document.getElementById("r8").innerHTML = `Por favor ingresa un número de dos dígitos, ${n8} tiene como ${n8.length} >:c`;
      }
    }       
  } 
}

// 9. Leer un número entero de dos dígitos y determinar si un dígito es múltiplo del otro.
function result9(){
  
  var n9 = document.getElementById("input9").value;
  var left = Number.parseInt( n9 / 10 );
  var right = ( n9 % 10 );

  if ((n9 == 0)) {
    document.getElementById("r9").innerHTML = "";
  }
  else if((n9 == "-")){
    document.getElementById("r9").innerHTML = ""; 
  }
  else {
    if ((n9 > 9 && n9 < 100) || (n9 < -9 && n9 > -100) ) {
      if (left == right) {
        document.getElementById("r9").innerHTML = `Eso es un ${n9} y es curioso pues son dos ${left} puestos sucesivamente, y claramente, todo número es múltiplo de si mismo, ya que 1 x ${right} pues te dará ${left} UwU`; 
      } 
      else if (( left % right == 0 )) {
        document.getElementById("r9").innerHTML = `El ${n9} es la fusión del ${left} y del ${right}, lo genial es que EL ${right} NO ES MÚLTIPLO DEL ${left} PERO EL ${left} SI ES MÚLTIPLO DEL ${right}, ya que si multiplicas ${right} por ${left/right}, te dará ${left}, cool, ¿no? UwU`; 
      } 
      else if (( right % left == 0 )) {
        document.getElementById("r9").innerHTML = `Ay, con el ${n9}, el resultado de un ${left} llevando un ${right}...Lo curioso es que EL ${right} ES MÚLTIPLO DEL ${left}, ya que si sumas ${right/left} veces el ${left}, te dará ${right} uwu`; 
      }
      else {
        document.getElementById("r9").innerHTML = `Al ${n9} lo obtienes pegando a lado y lado el ${left} y el ${right} pero lamentablemente, ni el ${left} es múltiplo del ${right} ni viceversa :C ¡intenta con números diferentes!`; 
      }
    }
    else {
      document.getElementById("r9").innerHTML = `${n9} no tiene 2 dígitos, tiene, emm... Espera cuento... ¡TIENE COMO ${n9.length}! ...Necesito un número con dos dígitos, así sea negativo >:c`; 
    }
  }
}

// 10. Leer un número entero de dos dígitos y determinar si los dos dígitos son iguales.
function result10(){

  var n10 = document.getElementById("input10").value;
  var left = Number.parseInt( n10 / 10 );
  var right = ( n10 % 10 );

  if ((n10 == 0)) {
    document.getElementById("r10").innerHTML = "";
  }
  else if((n10 == "-")){
    document.getElementById("r10").innerHTML = ""; 
  }
  else {
    if ((n10 > 9 && n10 < 100) || (n10 < -9 && n10 > -100)) {
      if ( left == right ) {
        document.getElementById("r10").innerHTML = `${n10} está conformado por EL MISMO NÚMERO REPETIDO DOS VECES :D el ${left}, venga, esa fue fácil. SIGUIENTE `; 
      }
      else {
        document.getElementById("r10").innerHTML = `${n10} es la fuuusión del ${left} y del ${right}, NÚMEROS QUE SON DIFERENTE, obviamente...¿Qué no ves? >:v`; 
      }
    } 
    else {   
      document.getElementById("r10").innerHTML = `Oshe, el ejercicio dice un número de DOS dígitos, ¿para qué pones entonces ${n10.length}?`; 
    }
  }
}

// 11. Leer dos números enteros y determinar cuál es el mayor.
function result11(){

  var n11 = document.getElementById("input11").value;
  var n11b = document.getElementById("input11b").value;
  var max = Math.max(n11,n11b);

  if ((n11 == 0 && n11b == 0)) {
    document.getElementById("r11").innerHTML = "";
  }
  else if((n11 == "-" && n11b == "-")){
    document.getElementById("r11").innerHTML = ""; 
  }
  else {
    if  ((n11 == `` || n11b == ``)) {
      document.getElementById("r11").innerHTML = `Okay, un ${n11}${n11b}. Pero ponme un número en el otro cuadro también >:c`; 
    }
    else{
      if (n11 == n11b) {
        document.getElementById("r11").innerHTML = `¡Los números dados son iguales!`; 
      }
      else{
          document.getElementById("r11").innerHTML = `${max} es mayor uwu`; 
      }
    }
  }
} 

// 12. Leer dos números enteros de dos dígitos y determinar si tienen dígitos comunes. ESTA SI QUE ME COSTÓ xd PERO FUE FASCI``TE RESOLVERLA
function result12(){

    var n12 = document.getElementById("input12").value;
    var n12b= document.getElementById("input12b").value;
    var arr = Array.from(String(n12), Number);
    var arrB = Array.from(String(n12b), Number);
    var length = ( n12 < 0 )? `${(n12.length)-1}`:`${n12.length}`;
    var lengthB = ( n12b < 0 )? `${(n12b.length)-1}`:`${n12b.length}`;
    
    var scanCommon = arr.filter(x=>arrB.includes(x));
    var deleteRepeated = scanCommon.filter((value, index, array)=>array.indexOf(value) === index);
    var commonDigits = deleteRepeated.sort((a,b)=>a-b);
    

    if ((n12 == 0 && n12b == 0)) {
      document.getElementById("r12").innerHTML = "";
    }
    else if((n12 == "-" && n12b == "-")){
      document.getElementById("r12").innerHTML = ""; 
    }
    else {
      if (n12 == `` || n12b == ``) {
        document.getElementById("r12").innerHTML = `Okay, un ${n12}${n12b}. Pero ponme un número en el otro cuadro también >:c `;
      } 
      else{
        if(((n12<100&&n12>9)||(n12<-9&&n12>-100)) && ((n12b<100&&n12b>9)||(n12b<-9&&n12b>-100))){
          if(scanCommon == 0){
            document.getElementById("r12").innerHTML = `Los números ${n12} y ${n12b} tienen ${length} dígitos :D <br> pero no tienen dígitos en común :(`;
          }
          else{
            document.getElementById("r12").innerHTML = `DÍGITOS EN COMÚN ENTRE EL ${n12} Y EL ${n12b}: ${commonDigits} uwu<br>y ambos tienen dos dígitos :D<br>(si supieran cómo me costó programar esta bobaditaxd)`;
          }
        }
        else{
          if (scanCommon == 0) {       
            document.getElementById("r12").innerHTML = `Sería cool que ambos números tuvieran 2 dígitos<br>El ${n12} tiene ${length} mientras que ${n12b} cuenta con ${lengthB}<br>Igual el ${n12} y el ${n12b} no tienen dígitos en común :C`;
          } else {
            document.getElementById("r12").innerHTML = `El ejercicio pide números de dos dígitos, pero que igual te lo calculo :D <br>VALORES DE DÍGITOS EN COMÚN: ${commonDigits} uwu<br>(si supieran cómo me costó programar esta bobaditaxd)`;
          }
        }
      }
    }
}

// 13. Leer dos números enteros de dos dígitos y determinar si la suma de los dos números origina un número par.
function result13() {
  var n13 = document.getElementById("input13").value;
  var n13b = document.getElementById("input13b").value;
  var aux = n13;
  var auxb = n13b;
  var auxx = Number.parseInt(aux);
  var auxxb = Number.parseInt(auxb);
  var summy = auxx + auxxb;
  var summyPair = summy%2;

  if ((n13 == 0 && n13b == 0)) {
    document.getElementById("r13").innerHTML = "";
  }
  else if((n13 == "-" && n13b == "-")){
    document.getElementById("r13").innerHTML = ""; 
  }
  else {
    if (n13 == `` || n13b == ``) {
      document.getElementById("r13").innerHTML = `Okay, un ${n13}${n13b}. Pero ponme un número en el otro cuadro también >:c`;
    } 
    else{
      if ( (summyPair == 0) && (summy != 0) ) {
        if ((n13 > 9 && n13 < 100) || (n13 < -9 && n13 > -100)) {
          if ((n13b > 9 && n13b < 100) || (n13b < -9 && n13b > -100)) {
            document.getElementById("r13").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} Y ES PAR :D<br>Y AMBOS NÚMEROS SON DE DOS DÍGITOS :D`;
          } 
          else {
            document.getElementById("r13").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} Y ES PAR :D<br>El número ${n13} tiene dos dígitos, pero el ${n13b} ño`;
          }
        }
        else{
          if ((n13b > 9 && n13b < 100) || (n13b < -9 && n13b > -100)) {
            document.getElementById("r13").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} Y ES PAR :D<br>Pero el ${n13} no tiene dígitos, mientras que el ${n13b} sí`;
          } 
          else {
            document.getElementById("r13").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} Y ES PAR:D <br>Pero ninguno de los dos números, ni el ${n13} ni el ${n13b} tiene dos dígitos`;
          }
        }
      }   
      else {
        if ((n13 > 9 && n13 < 100) || (n13 < -9 && n13 > -100)) {
          if ((n13b > 9 && n13b < 100) || (n13b < -9 && n13b > -100)) {
            document.getElementById("r13").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} PERO NO ES PAR :c<br>Y AMBOS NÚMEROS SON DE DOS DÍGITOS :D`;
          } 
          else {
            document.getElementById("r13").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} PERO NO ES PAR :c<br>El número ${n13} tiene dos dígitos, pero el ${n13b} ño`;
          }
        }
        else{
          if ((n13b > 9 && n13b < 100) || (n13b < -9 && n13b > -100)) {
            document.getElementById("r13").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} PERO NO ES PAR :c<br>Pero el ${n13} no tiene dígitos, mientras que el ${n13b} sí`;
          } 
          else {
            document.getElementById("r13").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} PERO NO ES PAR :c<br>Pero ninguno de los dos números, ni el ${n13} ni el ${n13b} tiene dos dígitos`;
          }
        }
      }
    }
  }
}

// 14. Leer dos números enteros de dos dígitos y determinar a cuánto es igual la suma de todos los dígitos.
function result14() {
  var n14 = document.getElementById("input14").value;
  var n14b = document.getElementById("input14b").value;
  var aux = n14;
  var auxb = n14b;
  var auxx = Number.parseInt(aux);
  var auxxb = Number.parseInt(auxb);
  var summy = auxx + auxxb;
  
  if ((n14 == 0 && n14b == 0)) {
    document.getElementById("r14").innerHTML = "";
  }
  else if((n14 == "-" && n14b == "-")){
    document.getElementById("r14").innerHTML = ""; 
  }
  else {
    if (n14 == `` || n14b == ``) {
      document.getElementById("r14").innerHTML = `Okay, un ${n14}${n14b}. Pero ponme un número en el otro cuadro también >:c`;
    } 
    else{
      if (n14 > 9 && n14 < 100) {
        if (n14b > 9 && n14b < 100) {
          document.getElementById("r14").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} UwU<br>Y AMBOS NÚMEROS SON DE DOS DÍGITOS :D`;
        } 
        else {
          document.getElementById("r14").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} UwU<br>El número ${n14} tiene dos dígitos, pero el ${n14b} ño`;
        }
      }
      else{
        if (n14b > 9 && n14b < 100) {
          document.getElementById("r14").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} UwU<br>Pero el ${n14} no tiene dígitos, mientras que el ${n14b} sí`;
        } 
        else {
          document.getElementById("r14").innerHTML = `LA SUMA DE LOS DOS NÚMEROS TE DA ${summy} UwU<br>Pero ninguno de los dos números, ni el ${n14} ni el ${n14b} tiene dos dígitos`;
        }
      }
    }
  }
}

// 15. Leer un número entero de tres dígitos y determinar a cuánto es igual la suma de sus dígitos.
function result15() {
  var n15 = document.getElementById("input15").value;
  var length = (n15<0)? `${(n15.length)-1}`:`${n15.length}`;
  var c = 0;
  n15.split('').forEach(x => (x=="-")? x == 0:c += Number.parseInt(x));

  if ((n15 == 0)) {
    document.getElementById("r15").innerHTML = "";
  }
  else if((n15 == "-")){
    document.getElementById("r15").innerHTML = ""; 
  }
  else {
    if ( (n15<1000 && n15>99) || (n15<-99 && n15>-1000) ) {
      document.getElementById("r15").innerHTML=`EL NÚMERO ${n15} TIENE ${length} DÍGITOS :D y la suma de ellos da ${c} UwU`;
    } 
    else {
      if ((n15<10 && n15>0 ) || (n15>-10 && n15<0)) {
        document.getElementById("r15").innerHTML=`Oshe, ser humano... Eso claramente es un ${n15} y pos tiene sólo ${length} dígito... Ponéme más números que estoy que me sumo >:c`;
      } 
      else {
        document.getElementById("r15").innerHTML=`El número ${n15} no tiene 3 dígitos sino ${length} :c igual su suma da ${c} UwU`;
      }
    }
  }
}

// 16. Leer un número entero de tres dígitos y determinar si al menos dos de sus tres dígitos son iguales.
function result16(){
  var n16 = document.getElementById("input16").value;
  var length = (n16<0)? (n16.length)-1:n16.length;
  var arr = Array.from(String(n16), Number); //convertimos el número metido en el input en un array
  var box = []; //creamos un arreglo vacío donde introduciremos posteriormente los dígitos repetidos
  var clean = []; //crearemos un arreglo con el que luego filtraremos box para eliminar repeticiones
  var sort = []; //crearemos el arreglo final que será mostrado al usuario con la información filtrada, limpiada y organizada
  // Pequeña impresora de UNOs 1111
  var onesArray = []; 
  var ones = 0;
  var xxx = 0;

  for (let i = 0; i < arr.length; i++) { //creamos un bucle dentro de un bucle que introducirá a nuestros array los números que se repitan en arr[i] y arr[j] 
    for (let j = i+1; j < arr.length; j++){  //(j= 1+i -asi identificamos números repetidos-)
      if (arr[i] === arr[j]) {
        box.push(arr[i]);
        clean = box.filter((value, index, array) => array.indexOf(value) === index);
        sort = clean.sort((a,b)=>a-b);   
      }
    }
  }

  for (let d = 0; d < length; d++) {  // IMPRESORA DE 111111
    onesArray.push(1);
    ones = Number.parseInt(onesArray.join(''));
    xxx = n16%ones;
  }

  //ESTRUCTURA DE CASOS
  if ((n16 == 0)) {
    document.getElementById("r16").innerHTML = "";
  }
  else if((n16 == "-")){
    document.getElementById("r16").innerHTML = ""; 
  }
  else {
    if (n16<10&&n16>-10) {
      document.getElementById("r16").innerHTML = `Eso es un ${n16}...Un dígito solo... Nada más... ¡Dame más números, human@! D:<`; 
    } 
    else if (xxx == 0) {
      if (n16 == 777) {
        document.getElementById("r16").innerHTML = `¡MUY BUENAS A TODOS, GUAPÍSIMOS! Aquí el ${n16} siendo un ${sort} repitiéndose ${length} veces :D`; 
      } 
      else if(n16 == 666){
        document.getElementById("r16").innerHTML = `El número ${n16} >:D es un ${sort} repitiéndose ${length} veces MUAHAHAHHAHAA lml_ c:<`; 
      }
      else {
        document.getElementById("r16").innerHTML = `El número ${n16} es un ${sort} repitiéndose ${length} veces UwU`; 
      }
    } 
    else {
      if((n16<1000&&n16>99)||(n16<-99&&n16>-1000)){
        if (sort.length == 1) {
          document.getElementById("r16").innerHTML = `El número ${n16} cumple las dos condiciones: tiene 3 dígitos y se repiten 2 de sus dígitos, el ${sort} UwU`; 
        }
        else{
          document.getElementById("r16").innerHTML = `El número ${n16} tiene 3 dígitos pero ninguno de ellos se repite :C`; 
        }
      }
      else{
        if (sort.length >= 1) {
          if (n16 == 3137054945) {
            document.getElementById("r16").innerHTML = `MIAU UwU`; 
          }
          else{
            document.getElementById("r16").innerHTML = `El ${n16} no tiene 3 dígitos sino ${length} >:c aunque tiene números repetidos como el ${sort} :o`; 
          }
        }
        else{
          if (n16 == 69) {
            document.getElementById("r16").innerHTML = `Hmmm baia baia 7u7 pilluel@ guiño guiño ;) ...pero ño. El ${n16} no tiene ni 3 dígitos ni números repetidos >:c`; 
          } 
          else {
            document.getElementById("r16").innerHTML = `El número ${n16} no tiene números repetidos ni 3 dígitos, tiene ${length} :c F`; 
          }
        }
      }
    }
  }
}

// 17. Leer un número entero de tres dígitos y determinar en qué posición está el mayor dígito.
function result17(){
  var n17 = document.getElementById("input17").value;
  var abs = Math.abs(n17);
  //var abs = Math.abs(x);
  var arr = Array.from(String(abs),Number);
  var length = (n17<0)? (n17.length)-1:n17.length;

  var left = Number.parseInt(abs/100);
  var right = abs%10;
  var mid = (abs-((left*100)+right))/10;

  var max = Math.max(...arr);
  var pos = arr.indexOf(Math.max(...arr))+1;

  // IMPRESORA DE 111111
  var onesArray = [];
  var ones = 0;
  var xxx = 0;
  for (let d = 0; d < length; d++) {  
    onesArray.push(1);
    ones = Number.parseInt(onesArray.join(''));
    xxx = n17%ones;
  }

  
  if ((n17 == 0 && n17 == 0)) {
    document.getElementById("r17").innerHTML = ``;
  }
  else if((n17 == "-" && n17 == "-")){
    document.getElementById("r17").innerHTML = ``; 
  }
  else {
    if (xxx == 0 && length>1) {
      document.getElementById("r17").innerHTML = `Eso es un ${right} repetido ${length} veces UwU, así que todas las posiciones tienen el mismo valor`;
     } 
    else {        
      switch (length) {
        case 1:
          document.getElementById("r17").innerHTML = `Eso es un ${n17} y sólo tiene un dígito >:c ¡escribe más números, humano!`;
          break;

        case 2:
          switch (max) {
            case parseInt(abs/10):
              document.getElementById("r17").innerHTML = `El número ${n17} sólo tiene 2 dígitos :c<br>igual el ${parseInt(n17/10)}, ubicado a su izquierda, es su dígito de mayor valor UwU`;
              break;
          
            case right:
              document.getElementById("r17").innerHTML = `El número ${n17} sólo tiene 2 dígitos :c<br>igual el ${right}, ubicado a su derecha, es su dígito de mayor valor UwU`;
              break;
          }
          break;      

        case 3:
          switch (max) {
            case left:
              document.getElementById("r17").innerHTML = `El número ${n17} tiene 3 dígitos y el mayor dígito es el ${max} posicionado a su izquierda UwU`;
              break;

            case mid:
              document.getElementById("r17").innerHTML = `El número ${n17} tiene 3 dígitos y el mayor dígito es el ${max} posicionado en su mitad UwU`;
              break;
              
            case right:
              document.getElementById("r17").innerHTML = `El número ${n17} tiene 3 dígitos y el mayor dígito es el ${max} posicionado a su derecha UwU`;
              break;
          }
          break;
          
        default:
            document.getElementById("r17").innerHTML = `El número ${n17} no tiene 3 dígitos sino ${length}<br>Igual su máximo valor es el ${max} en la posición de dígitos n°${pos} UwU`;
          break;
      }
    } 
  }
}  

// 18. Leer un número entero de tres dígitos y determinar si algún dígito es múltiplo de los otros.
function result18(){
  var n18= document.getElementById("input18").value;
  var length = (n18<0)? (n18.length)-1:n18.length;

  var left = Number.parseInt(n18/100);
  var right = n18%10;
  var mid = (n18-((left*100)+right))/10;
  var left_  = Number.parseInt(n18/10);

  var a = [];
  var b = []; 
  var c = [];

  var multiplesLeft = [];
  var multiplesMid = [];
  var multiplesRight = [];

  var resultA="";
  var resultB="";
  var resultC="";

//un for donde se resuelva todo el problemón de múltiplos
  for (let i = -9; i < 10; i++) {
    i%left;
    if (i!=left && i%left==0){
      a.push(i);
      multiplesLeft = a.filter(x=> x == mid || x == right);
    }
    
    i%mid;
    if (i!=mid && i%mid==0){
      b.push(i);
      multiplesMid = b.filter(x=> x == left || x == right);
    }
    
    i%right;
    if (i!=right && i%right==0){
      c.push(i);
      multiplesRight = c.filter(x=> x == left || x == mid);
    }

    if (multiplesLeft != 0){
      resultA =`${left} tiene de múltiplo a: ${multiplesLeft}<br>`;
    }

    if (multiplesMid != 0) {
      resultB =`${mid} tiene de múltiplo a: ${multiplesMid}<br>`;
    }

    if (multiplesRight != 0) {
      resultC =`${right} tiene de múltiplo a: ${multiplesRight}<br>`;
    }

  }
  

  // IMPRESORA DE 111111
  var onesArray = [];
  var ones = 0;
  var xxx = 0;
  for (let d = 0; d < length; d++) {  
    onesArray.push(1);
    ones = Number.parseInt(onesArray.join(''));
    xxx = n18%ones;
  }

  
  if ((n18 == 0 && n18 == 0)) {
    document.getElementById("r18").innerHTML = ``;
  }
  else if((n18 == "-" && n18 == "-")){
    document.getElementById("r18").innerHTML = ``; 
  }
  else { 
    if (xxx == 0 && length>1) {
      document.getElementById("r18").innerHTML = `Eso es un ${right} repetido ${length} veces UwU, y pues todo número es múltiplo de si mismo`;
     } 
    else {        
      switch (length) {
        case 1:
          document.getElementById("r18").innerHTML = `Eso es un ${n18} y sólo tiene un dígito >:c ¡escribe más números, humano!`;
          break;
          
          case 2:
          if (left_%right == 0) {
            document.getElementById("r18").innerHTML = `El ${n18} sólo tiene dos dígitos :c<br>Igual el ${left_} es múltiplo del ${right} ;)`;
          } 
          else if (right%left_ == 0) {
            document.getElementById("r18").innerHTML = `El ${n18} sólo tiene dos dígitos :c<br>Igual el ${right} es múltiplo del ${left_} ;)`;
          } 
          else {  
            document.getElementById("r18").innerHTML = `El ${n18} sólo tiene dos dígitos :c<br>Igual el ${left_} y el ${right} no son múltiplos F`;
          }
          break;      

        case 3:
          if (resultA=="" && resultB=="" && resultC=="") {
            document.getElementById("r18").innerHTML= `En este caso... Ni ${left} ni ${mid} ni ${right} son múltipos del otro :c intenta otra combinación de números`;
          }
          else{
            document.getElementById("r18").innerHTML = `En este caso...${resultA}${resultB}${resultC}UwU`
          }
          break; 
          
        default:
            document.getElementById("r18").innerHTML = `El número ${n18} no tiene 3 dígitos sino ${length},<br> ponme un número de 3 dígitos.`;
          break;
      
      } 
    }
  }
}  

// 19. Leer tres números enteros y determinar cuál es el mayor. Usar solamente dos variables.
function result19(){
  //VAR1: Creamos un arreglo que presentará al usuario los 3 valores de las 3 cajas y sha xd en una variable >:v
  var arr = [];

  //Ingresamos los inputs que pone el usuario a la variable arreglo (arr)
  arr.push(document.getElementById("input19").value);
  arr.push(document.getElementById("input19b").value);
  arr.push(document.getElementById("input19c").value);

  //comienza el juego

  if (arr == ",,") {
    document.getElementById("r19").innerHTML = ``; 
  }
  else {
      document.getElementById("r19").innerHTML = `Okay... El mayor es ${Math.max(...arr)}`; 
  }
 } 

// 20. Leer tres números enteros y mostrarlos ascendentemente.
function result20(){
  var n20 = document.getElementById("input20").value;
  var n20b = document.getElementById("input20b").value;
  var n20c = document.getElementById("input20c").value;

//Por algún motivo que, al momento de realizado este ejercicio, desconozco... JS no puede permutar debidamente variables leídas, quizá no son puramente numéricas, así que...
  var a = Number.parseInt(n20);
  var b = Number.parseInt(n20b);
  var c = Number.parseInt(n20c);
  
  if ((n20 == 0 && n20b == 0 && n20c == 0)) {
    document.getElementById("r20").innerHTML = ``;

  }
  else if((n20 == "-" && n20b == "-" && n20c == "-")){
    document.getElementById("r20").innerHTML = ``; 
  }
 //Generamos una estructura de casos aplicable para ejercicios de 3 cifras 
  else {
    if (n20c == ``) {
      if (n20 != `` && n20b != ``) {
        document.getElementById("r20").innerHTML = `Okay, un ${n20} y un ${n20b}. Pero ponme un número en el otro cuadro también >:c`;
      }
      else{
        document.getElementById("r20").innerHTML = `Okay, un ${n20}${n20b}. Pero ponme un número en los otros dos cuadros también >:c`;
      }
    }
    else {
      if (n20 == `` && n20b == ``) {
        document.getElementById("r20").innerHTML = `Okay, un ${n20c}. Pero ponme un número en los otros dos cuadros también >:c`;
      }
      else if (n20 == `` || n20b == ``) {
        document.getElementById("r20").innerHTML = `Okay, un ${n20c} y un ${n20}${n20b}. Pero ponme un número en el otro cuadro también >:c`;
      }
      else{
        if (a<=b && a<=c) {   
          if (b<c) {
            document.getElementById("r20").innerHTML = `${a}, ${b}, ${c} UwU`;
          } 
          else {
            document.getElementById("r20").innerHTML = `${a}, ${c}, ${b} UwU`;
          }
        } 
        else {
          if (b<=a && b<=c) {   
            if (a<c) {
              document.getElementById("r20").innerHTML = `${b}, ${a}, ${c} UwU`;
            } 
            else {
              document.getElementById("r20").innerHTML = `${b}, ${c}, ${a} UwU`;
            }
          } 
          else {
            if (c<=a && c<=b) {   
              if (a<b) {
                document.getElementById("r20").innerHTML = `${c}, ${a}, ${b} UwU`;
              } 
              else {
                document.getElementById("r20").innerHTML = `${c}, ${b}, ${a} UwU`;
              }
            }
          } 
        }
      }
    }
  }  
}

// 21. Leer tres números enteros de dos dígitos cada uno y determinar en cuál de ellos se encuentra el mayor dígito.
function result21(){
    var n21 = document.getElementById("input21").value;
    var n21b = document.getElementById("input21b").value;
    var n21c = document.getElementById("input21c").value;
    var length = (n21<0)? (n21.length)-1:n21.length;
    var lengthB = (n21b<0)? (n21b.length)-1:n21b.length;
    var lengthC = (n21c<0)? (n21c.length)-1:n21c.length;
    var len = (length==1)? `1 dígito`:`${length} dígitos`;
    var lenb = (lengthB==1)? `1 dígito`:`${lengthB} dígitos`;
    var lenc = (lengthC==1)? `1 dígito`:`${lengthC} dígitos`;

    //VAINAS PARA HALLAR CUÁL ES EL MAYOR DÍGITO DE LOS 3 NÚMEROS
    var aux = Math.abs(n21);        
    var auxb = Math.abs(n21b);    
    var auxc = Math.abs(n21c);
    //ARREGLOS DE LOS NÚMEROS
    var arr = Array.from(String(aux),Number);
    var arrb = Array.from(String(auxb),Number);
    var arrc = Array.from(String(auxc),Number);    
    //AQUÍ SABEMOS CUÁL ES EL MAYOR DÍGITO DE TODOS
    var left = Math.max(...arr); 
    var mid = Math.max(...arrb);
    var right = Math.max(...arrc);
    var max = Math.max(left,mid,right);

    //VAINAS PARA HALLAR EN QUÉ NÚMERO ESTÁ EL MAYOR DÍGITO DE LOS 3 NUMS
      
    var i = arr.includes(max)? `${n21} (el número de la izquierda);`:``;
    var c = arrb.includes(max)? `${n21b} (el número de la mitad);`:``;
    var d = arrc.includes(max)? `${n21c} (el número de la derecha);`:``;

    

    //Toda esta mamada para solucionar el problema de los dígitos + la solución incluida de una vez xd
    var len2 = ((length==2)&&(lengthB==2)&&(lengthC==2))? `:D <br> Y el mayor dígito de los 3 números es el ${max}, alojado en el...<br>${i} ${c} ${d} UwU`:`...Ojalá todos tuvieran 2 dígitos :C En cualquier caso...<br> El mayor dígito de los 3 números es el ${max}, alojado en el...<br>${i} ${c} ${d} UwU`;
    
    var lenSolution = ((length==lengthB)&&(length==lengthC))? `Los 3 números (${n21}, ${n21b} y ${n21c}) tienen ${len} ${len2}`:`El ${n21} tiene ${len}; el ${n21b} tiene ${lenb} y el ${n21c} tiene ${lenc};<br> ${len2}`;
    
    
    if ((n21 == 0 && n21b == 0 && n21c == 0)) {
      document.getElementById("r21").innerHTML = ``;
  
    }
    else if((n21 == "-" && n21b == "-" && n21c == "-")){
      document.getElementById("r21").innerHTML = ``; 
    }
   //Generamos una estructura de casos aplicable para ejercicios de 3 cifras 
    else {
      if (n21c == ``) {
        if (n21 != `` && n21b != ``) {
          document.getElementById("r21").innerHTML = `Okay, un ${n21} y un ${n21b}. Pero ponme un número en el otro cuadro también >:c`;
        }
        else{
          document.getElementById("r21").innerHTML = `Okay, un ${n21}${n21b}. Pero ponme un número en los otros dos cuadros también >:c`;
        }
      }
      else {
        if (n21 == `` && n21b == ``) {
          document.getElementById("r21").innerHTML = `Okay, un ${n21c}. Pero ponme un número en los otros dos cuadros también >:c`;
        }
        else if (n21 == `` || n21b == ``) {
          document.getElementById("r21").innerHTML = `Okay, un ${n21c} y un ${n21}${n21b}. Pero ponme un número en el otro cuadro también >:c`;
        }
        else{
             document.getElementById("r21").innerHTML = `${lenSolution}`;
        }  
      }
    }
}    
  
// 22. Leer un número entero de tres dígitos y determinar si el primer dígito es igual al último.
function result22(){
  var n22 = document.getElementById("input22").value;
  var length = (n22<0)? n22.length-1:n22.length;
  var len = (length==1)? `${n22} tiene 1 dígito`:`${n22} tiene ${length} dígitos`;
  var aux = Math.abs(n22);
  var extreme = 10**(length-1);
  var left = Number.parseInt(aux/extreme);
  var right = aux%10;

  if((n22 == 0)){
    document.getElementById("r22").innerHTML = ``;
  }
  else if((n22 == "-")){
    document.getElementById("r22").innerHTML = ``; 
  }
  else{
    switch (length) {
      case 1:
        document.getElementById("r22").innerHTML = `Eso es un ${n22}, y al igual que la serpiente Uróboros,<br>que se muerde la cola...El ${n22} empieza como termina: en el ${right} UwU`; 
        break;

      case 3:
        switch (left) {
          case right:
            document.getElementById("r22").innerHTML = `${len} :D y su primer y último dígito son el mismo: el ${left}`; 
            break;
        
          default:
            document.getElementById("r22").innerHTML = `${len} :D pero su primer dígito (${left}) es díferente del último (${right}) :c`; 
            break;
        }
        break;
          
      default:
        switch (left) {
          case right:
            document.getElementById("r22").innerHTML = `${n22} no tiene 3 dígitos sino ${length} >:c<br>Igual su primer y último dígito son, curiosamente, el mismo: el ${left}`; 
            break;
        
          default:
            document.getElementById("r22").innerHTML = `${n22} no tiene 3 dígitos sino ${length} >:c y para colmo...<br>Su primer número (el ${left}) no se parece en nada al último (el ${right})<br>>:c ¡DAME OTRO NÚMERO!`; 
            break;
        }        
        break;
    }
  }
}  

// 23. Leer un número entero de tres dígitos y determinar cuántos dígitos primos tiene.
function result23(){
  
  var n23 = document.getElementById("input23").value;
  var length = (n23<0)? n23.length-1:n23.length;
  var len = (length==1)? `${n23} tiene solo 1 dígito`:`${n23} tiene ${length} dígitos`;
  var arr = Array.from(String(n23),Number);

//En este caso, solution es un filtro de números primos
  var solution = arr.filter(x=>x==2||x==3||x==5||x==7||x==9); 
//sort organizará nuestro arreglo, mostrando la informacion de manera clara al usuario  
  var sort = solution.sort((a,b)=>a-b).filter((value,index,array)=>(array.indexOf(value)==index));
//Personalización del problema
  var ngtv = (n23<0)? `<br>Por cierto... ¿Sabías que los números primos no pueden ser negativos? Ese menos (-) sobra e,e`:``;
  var xd = (sort.length==1)? `tiene al ${sort} que es primo ${ngtv}`:`tiene varios números primos: ${sort} ${ngtv}`;
  
  if((n23 == 0)){
    document.getElementById("r23").innerHTML = ``;
  }
  else if((n23 == "-")){
    document.getElementById("r23").innerHTML = ``; 
  }
  else{
    switch (length) {
      case 1:
        switch (sort.length) {
          case 0:
            document.getElementById("r23").innerHTML = `${len} :c y además no es un número primo :cc doble F`; 
            break;
            
            default:
              document.getElementById("r23").innerHTML = `${len} :c pero al menos es un número primo :D`; 
              break;
        }
        break;
          
      case 3:
        switch (sort.length) {
          case 0:
            document.getElementById("r23").innerHTML = `${len} :D pero ninguno de ellos es un número primo :c`; 
            break;
            
            default:
            document.getElementById("r23").innerHTML = `${len} :D y entre ellos ${xd}`; 
            break;
        }
        break;
          
      default:  
      switch (sort.length) {
        case 0:
          document.getElementById("r23").innerHTML = `${len} y no 3 :c e increíblemente, ninguno de sus dígitos es un número primo F`; 
          break;
      
        default:
          document.getElementById("r23").innerHTML = `${len} y no 3 :c pero al menos ${xd}`; 
          break;
      }
        break;
    }
  }
}

// 24. Leer un número entero de tres dígitos y determinar cuántos dígitos pares tiene.
function result24(){
  
    var n24 = document.getElementById("input24").value;
    var length = (n24<0)? n24.length-1:n24.length;
    var len = (length==1)? `${n24} tiene solo 1 dígito`:`${n24} tiene ${length} dígitos`;
    var arr = Array.from(String(n24),Number);
  
  //En este caso, solution es un filtro de números pares
    var solution = arr.filter(x=>(x%2)==0); 
  //sort organizará nuestro arreglo, mostrando la informacion de manera clara al usuario  
    var sort = solution.sort((a,b)=>a-b).filter((value,index,array)=>(array.indexOf(value)==index));
  //Personalización del problema (singulares o plurales)
   var xd = (sort.length==1)? `tiene al ${sort} que es par`:`tiene varios números pares: ${sort}`;
    
    if((n24 == 0)){
      document.getElementById("r24").innerHTML = ``;
    }
    else if((n24 == "-")){
      document.getElementById("r24").innerHTML = ``; 
    }
    else{
      switch (length) {
        case 1:
          switch (sort.length) {
            case 0:
              document.getElementById("r24").innerHTML = `${len} :c y además no es un número par :cc doble F`; 
              break;
              
              default:
                document.getElementById("r24").innerHTML = `${len} :c pero al menos es un número par :D`; 
                break;
          }
          break;
            
        case 3:
          switch (sort.length) {
            case 0:
              document.getElementById("r24").innerHTML = `${len} :D pero ninguno de ellos es un número par :c`; 
              break;
              
              default:
              document.getElementById("r24").innerHTML = `${len} :D y entre ellos ${xd} UwU`; 
              break;
          }
          break;
            
        default:  
        switch (sort.length) {
          case 0:
            document.getElementById("r24").innerHTML = `${len} y no 3 :c e increíblemente, ninguno de sus dígitos es un número par F`; 
            break;
        
          default:
            document.getElementById("r24").innerHTML = `${len} y no 3 :c pero al menos ${xd} UwU`; 
            break;
        }
          break;
      }
    }
}

// 25. Leer un número entero de tres dígitos y determinar si alguno de sus dígitos es igual a la suma de los otros dos.
function result25(){
  
    var n25 = document.getElementById("input25").value;
    var length = (n25<0)? n25.length-1:n25.length;
    var len = (length==1)? `${n25} tiene solo 1 dígito`:`${n25} tiene ${length} dígitos`;
    var arr = Array.from(String(n25),Number);
    
    
    exponent = 10**(length-1);
    left = Number.parseInt((n25/exponent));
    right = Number.parseInt(n25%10);
    mid = Number.parseInt((n25-((left*100)+right))/10);
  
  //En este caso, solution es un filtro de números primos
    var solution = arr.filter(x=>left+right==x||left+mid==x||mid+right==x); 
    var partOf = arr.filter(x=>!(left+right==x||left+mid==x||mid+right==x)); 
  //sort organizará nuestro arreglo, mostrando la informacion de manera clara al usuario  
    var sort = solution.sort((a,b)=>a-b).filter((value,index,array)=>(array.indexOf(value)==index));
  //Personalización del problema (singulares o plurales)
   var xd = (sort.length==1)? `tiene al ${sort} que es la suma de ${partOf} UwU`:`Ninguno de sus números son el resultado de sumar los otros dos :C`;
    
    if((n25 == 0)){
      document.getElementById("r25").innerHTML = ``;
    }
    else if((n25 == "-")){
      document.getElementById("r25").innerHTML = ``; 
    }
    else{
      switch (length) {
        case 1:
          document.getElementById("r25").innerHTML = `${len} :c para este ejercicio necesito exactamente 3 dígitos`; 
          break;
            
        case 3:
          switch (sort.length) {
            case 0:
              document.getElementById("r25").innerHTML = `${len} :D pero entre ellos...<BR> ${xd}`; 
              break;
              
              default:
              document.getElementById("r25").innerHTML = `${len} :D y entre ellos ${xd}`; 
              break;
          }
          break;
            
        default:  
          document.getElementById("r25").innerHTML = `${len} >:c para este ejercicio necesito exactamente 3 dígitos`; 
          break;
      }
    }
}

// 26. Leer un número entero de cuatro dígitos y determinar a cuanto es igual la suma de sus dígitos.
function result26(){
  
    var n26 = document.getElementById("input26").value;
    var abs = Math.abs(n26);
    var arr = Array.from(String(abs),Number);
    
    var length = (n26<0)? n26.length-1:n26.length;
    var len = (length==1)? `${n26} tiene solo 1 dígito`:`${n26} tiene ${length} dígitos`;
  
  //En este caso, solution es un filtro de suma del arreglo
  var solution = arr.join('+'); 
  //Personalización del problema
  var summ = 0;
  for (let i = 0; i < arr.length; i++) {
   summ += arr[i];  
  }
  if (n26<0) {summ = summ*(-1);};

    if((n26 == 0)){
      document.getElementById("r26").innerHTML = ``;
    }
    else if((n26 == "-")){
      document.getElementById("r26").innerHTML = ``;  
    }
    else{
      switch (length) {
        case 1:
          document.getElementById("r26").innerHTML = `${len} y no 4 :C<br>...Y pues ni hay con quién sumarlo xd`; 
          break;
            
        case 4:
              document.getElementById("r26").innerHTML = `${len} :D<br>Y lo que es ${solution}<br>te dará la suma de ${summ} c:`; 
              break;

        default:  
            document.getElementById("r26").innerHTML = `${len} y no 4 :c pero que igual te lo calculo :D<br>${solution}<br>La suma de todo eso te dará... ${summ} UwU`; 
            break;
      }
    }
}


// 27. Leer un número entero de cuatro dígitos y determinar cuántos dígitos pares tiene.
function result27(){
  
  var n27 = document.getElementById("input27").value;
  var length = (n27<0)? n27.length-1:n27.length;
  var len = (length==1)? `${n27} tiene solo 1 dígito`:`${n27} tiene ${length} dígitos`;
  var arr = Array.from(String(n27),Number);

//En este caso, solution es un filtro de números pars
  var solution = arr.filter(x=>(x%2)==0); 
//sort organizará nuestro arreglo, mostrando la informacion de manera clara al usuario  
  var sort = solution.sort((a,b)=>a-b).filter((value,index,array)=>(array.indexOf(value)==index));
//Personalización del problema (singulares o plurales)
 var xd = (sort.length==1)? `tiene al ${sort} que es par`:`tiene varios números pares: ${sort}`;
  
  if((n27 == 0)){
    document.getElementById("r27").innerHTML = ``;
  }
  else if((n27 == "-")){
    document.getElementById("r27").innerHTML = ``; 
  }
  else{
    switch (length) {
      case 1:
        switch (sort.length) {
          case 0:
            document.getElementById("r27").innerHTML = `${len} :c y además no es un número par :cc doble F`; 
            break;
            
            default:
              document.getElementById("r27").innerHTML = `${len} :c pero al menos es un número par :D`; 
              break;
        }
        break;
          
      case 4:
        switch (sort.length) {
          case 0:
            document.getElementById("r27").innerHTML = `${len} :D pero ninguno de ellos es un número par :c`; 
            break;
            
            default:
            document.getElementById("r27").innerHTML = `${len} :D y entre ellos ${xd} UwU`; 
            break;
        }
        break;
          
      default:  
      switch (sort.length) {
        case 0:
          document.getElementById("r27").innerHTML = `${len} y no 4 :c e increíblemente, ninguno de sus dígitos es un número par F`; 
          break;
      
        default:
          document.getElementById("r27").innerHTML = `${len} y no 4 :c pero al menos ${xd} UwU`; 
          break;
      }
        break;
    }
  }
}

// 28. Leer un número entero menor que 50 y positivo y determinar si es un número par.
function result28(){
  
  var n28 = document.getElementById("input28").value;
  var aux = Number.parseInt(n28);
  
  //FILTROS
  var positive = (aux>0)? `Es positivo c:`:`No es positivo :c`;
  var fifty = (aux<50)? `es menor a 50 :D`:`es mayor a 50 :c`;
  var pair = ((aux%2)==0)? `Es par UwU`:`Es impar >:c`;
  var pero1 = (((aux<50)&&(aux>0))||((aux<0)&&(aux>50)))? `y`:`pero`;
  var pero2 = (((aux<50)&&((aux%2)==0))||((aux>50)&&((aux%2)!=0)))? `Además...`:`sin embargo...`;

  //RESULTADOS
 // var arr = [positive,fifty,pair];
  counter = 0;
  (positive === `Es positivo c:`)? counter++:``;
  (fifty === `es menor a 50 :D`)? counter++:``;
  (pair === `Es par UwU`)? counter++:``;

  var solution = `El número ${n28} cumple con ${counter} de las 3 condiciones:<br>${positive} ${pero1} ${fifty} ${pero2} ${pair}`

  if((n28 == 0)){
    document.getElementById("r28").innerHTML = ``;
  }
  else if((n28 == "-")){
    document.getElementById("r28").innerHTML = ``; 
  }
  else{
    document.getElementById("r28").innerHTML = `${solution}`; 
  }
}

// 29. Leer un número entero de cinco dígitos y determinar si es un número capicúo. Ej. 15651, 59895.
function result29(){
  
    var n29 = document.getElementById("input29").value;
    var abs = Math.abs(n29);
    var length = (n29<0)? n29.length-1:n29.length;
    var len = (length==1)? `${n29} tiene solo 1 dígito`:`${n29} tiene ${length} dígitos`;
    
    //En este caso, solution es un filtro de números primos
    var arr = Array.from(String(abs),Number);
    var aux = Array.from(String(abs),Number);
    var rev = aux.reverse();
    var left = Number.parseInt(arr.join(''));
    var right = Number.parseInt(rev.join(''));
    var solution = (left == right)? `<br>Ah, y... ¡Es un número capicúa! :D<br>(se lee igual de derecha a izquierda)<br> >${right}< >${left}<`:`<br>...Igual no es un número capicúa :c<br>(no se lee igual igual de derecha a izquierda)<br> >${right}< >${left}<`; 

    
    if((n29 == 0)){
      document.getElementById("r29").innerHTML = ``;
    }
    else if((n29 == "-")){
      document.getElementById("r29").innerHTML = ``; 
    }
    else{
      switch (length) {
        case 1:
          document.getElementById("r29").innerHTML = `El número ${len} y no 5 :c ${solution}`; 
          break;
          
          case 5:
            document.getElementById("r29").innerHTML = `El número ${len} :D ${solution}`; 
          break;
            
          default:  
          document.getElementById("r29").innerHTML = `El número ${len} y no 5 :c ${solution}`; 
          break;
        }
    }
}

// 30. Leer un número entero de cuatro dígitos y determinar si el segundo dígito es igual al penúltimo.
function result30(){
  var n30 = document.getElementById("input30").value;
  var aux = Math.abs(n30);
  var length = (n30<0)? n30.length-1:n30.length;
  var len = (length==1)? `El número ${n30} tiene 1 dígito`:`El número ${n30} tiene ${length} dígitos`;

  var arr = Array.from(String(aux),Number);
  //SOLUTION
  solution = (arr[1] == arr[(arr.length-2)])? `<br>En todo caso... Su segundo (${arr[1]}) y penúltimo (${arr[(arr.length-2)]}) dígito SON IGUALES UwU`:`<br>En todo caso... Su segundo (${arr[1]}) y penúltimo (${arr[(arr.length-2)]}) dígito SON DIFERENTES :c`;

  if((n30 == 0)){
    document.getElementById("r30").innerHTML = ``;
  }
  else if((n30 == "-")){
    document.getElementById("r30").innerHTML = ``; 
  }
  else{
    switch (length) {
      case 1:
        document.getElementById("r30").innerHTML = `${len} no más :c ¡dame más números, humano! >:c`; 
        break;

      case 4:
        document.getElementById("r30").innerHTML = `${len} :D ${solution}`; 
        break;
          
      default:
        document.getElementById("r30").innerHTML = `${len} >:C ${solution}`; 
        break;
    }
  }
}  

// 31. Leer un número entero y determina si es igual a 10.
function result31(){
  
    var n31 = document.getElementById("input31").value;
    var aux = Number.parseInt(n31);

    if((n31 == 0)){
      document.getElementById("r31").innerHTML = ``;
    }
    else if((n31 == "-")){
      document.getElementById("r31").innerHTML = ``; 
    }
    else{
      switch (aux) {
        case 10:
          document.getElementById("r31").innerHTML = `¡¡¡HURRAAA!!! UN 10 :DDDD 10 10 10 10101101 10!!<Br>UwU QUÉ FELICIDAD, UN 10 AWIWIII UwU<BR>En fin... Ya podrían ponerme algo más difícil, humanos >:c`; 
          break;
          
        default:
          document.getElementById("r31").innerHTML = `Eso no es un 10, es un ${n31} >:C`; 
          break;
      }
    }
}

// 32. Leer un número entero y determinar si es múltiplo de 7.
function result32(){
  
    var n32 = document.getElementById("input32").value;
    var aux = Number.parseInt(n32%7);

    if((n32 == 0)){
      document.getElementById("r32").innerHTML = ``;
    }
    else if((n32 == "-")){
      document.getElementById("r32").innerHTML = ``; 
    }
    else{
      switch (aux) {
        case 0:
          document.getElementById("r32").innerHTML = `¡¡¡HURRAAA!!! UN MÚLTIPLO DE 7 :DDDD  ¡¡777 777 777 77 777 7!!<Br>UwU QUÉ FELICIDAD, UN MÚLTIPLO DE 7 AWIWIII UwU<BR>En fin... Ya podrían ponerme algo más difícil, humanos 7n7`; 
          break;
          
        default:
          document.getElementById("r32").innerHTML = `Ese tal ${n32} no es múltiplo de 7 >:C`; 
          break;
      }
    }
}

// 33. Leer un número entero y determinar si termina en 7.
function result33(){
  
    var n33 = document.getElementById("input33").value;
    var aux = Math.abs(n33%10);

    if((n33 == 0)){
      document.getElementById("r33").innerHTML = ``;
    }
    else if((n33 == "-")){
      document.getElementById("r33").innerHTML = ``; 
    }
    else{
      switch (aux) {
        case 7:
          document.getElementById("r33").innerHTML = `¡¡¡HURRAAA!!! TERMINA EN 7 :DDDD ¡¡777 777 777 77 777 7!!<Br>UwU QUÉ FELICIDAD, UN 7 AWIWIII UwU<BR>En fin... Ya podrían ponerme algo más difícil, humanos 7n7||| -.-"`; 
          break;
          
        default:
          document.getElementById("r33").innerHTML = `${n33} NO TERMINA EN 7, TERMINA EN ${aux} >:C`; 
          break;
      }
    }
}

// 34. Leer un número entero menor que mil y determinar cuántos dígitos tiene.
function result34(){
  
    var n34 = document.getElementById("input34").value;
    var length = (n34<0)? n34.length-1:n34.length;
    var len = (length==1)? `tiene solo 1 dígito`:`tiene ${length} dígitos`;
    var aux = Number.parseInt(n34);
  
    //Personalización del problema 
    var solution = (aux<=1000)? `El ${aux} es igual o menor a 1000 :D`:`${aux} es mayor a 1000 :c`; 
    
    if((n34 == 0)){
      document.getElementById("r34").innerHTML = ``;
    }
    else if((n34 == "-")){
      document.getElementById("r34").innerHTML = ``; 
    }
    else{
      document.getElementById("r34").innerHTML = `${solution} y ${len}`; 
    }
}

// 35. Leer un número entero de dos dígitos, guardar cada dígito en una variable diferente y luego mostrarlas en pantalla.
function result35(){
  
    var n35 = document.getElementById("input35").value;
    var aux = Math.abs(n35);
    var arr = Array.from(String(aux),Number);
    var length = (n35<0)? n35.length-1:n35.length;
    var len = (length==1)? `El ${n35} tiene solo 1 dígito`:`El ${n35} tiene ${length} dígitos`;
    
    //ARREGLO PARA EL ABECEDARIO (con fromCharCode y un for)
    var abc = [];
    for (let i = 97; i<123; i++) {
      abc.push(String.fromCharCode(i));
    };
    
    //ARREGLO PARA ASOCIAR CADA DÍGITO A UNA LETRA (VARIABLE)
    var xd = ``;
    for (let miau = 0; miau < arr.length; miau++) {
      var solution = `${abc[miau]} = ${arr[miau]};<br>`;
      xd += solution;
    }
    if (n35<0) {
      xd += `...Y por supuesto, le agregas el signo negativo (-) a las variables en algún momento UwU`
    }

    if((n35 == 0)){
      document.getElementById("r35").innerHTML = ``;
    }
    else if((n35 == "-")){
      document.getElementById("r35").innerHTML = ``; 
    }
    else{
      switch (length) {
        case 1:
          document.getElementById("r35").innerHTML = `Pos... Eso es un ${n35}, sin más...<br>Pero que igual te lo hago variable, si quieres xd<br>${xd}`; 
          break;
          
          case 2:
            document.getElementById("r35").innerHTML = `${len} :D y sus dígitos separados en variables quedan así:<br>${xd}`; 
            break;
            
            default:
          document.getElementById("r35").innerHTML = `${len} y no 2 :C, pero que no importa... Que igual te lo calculo :D<br>${xd}`; 
          break;
      }
    }
}

// 36. Leer un número entero de 4 dígitos y determinar si tiene mas dígitos pares o impares.
function result36(){
  
    var n36 = document.getElementById("input36").value;
    var aux = Math.abs(n36);
    var length = (n36<0)? n36.length-1:n36.length;
    var len = (length==1)? `El ${n36} tiene solo 1 dígito`:`El ${n36} tiene ${length} dígitos`;
    var arr = Array.from(String(aux),Number);
  
  //En este caso, solution es un filtro de números primos
    var even = arr.filter(x=>x%2==0); 
    var odd = arr.filter(x=>!(x%2==0));
    var oneDigit = (aux%2==0)? `y no 4 :c y pues es un número par`:`y no 4 :c y pues es un número impar`;
  //sort organizará nuestro arreglo, mostrando la informacion de manera clara al usuario  
    var sortEven = even.sort((a,b)=>a-b).filter((value,index,array)=>(array.indexOf(value)==index));
    var sortOdd = odd.sort((a,b)=>a-b).filter((value,index,array)=>(array.indexOf(value)==index));
  //Personalización del problema (singulares o plurales)
    var evenResult = (sortEven.length==1)? `El ${n36} tiene un número par: el ${sortEven} `:`El ${n36} tiene varios números par: ${sortEven} `;
    var oddResult = (sortOdd.length==1)? `y tiene al ${sortOdd} que es impar`:`y tiene varios números impares: ${sortOdd}`;
    var solution = evenResult.concat(oddResult);
    var equals = (even.length == odd.length)? `<br>Y el ${n36} tiene igual proporción de pares (tiene ${even.length}) que de impares (tiene ${odd.length}) UwU`:``;
    var max = (even.length > odd.length)? `<br>Y el ${n36} tiene más números pares (tiene ${even.length}) que impares (tiene ${odd.length}) UwU`:`<br>Y el ${n36} tiene más números impares (tiene ${odd.length}) que pares (tiene ${even.length}) UwU`;
    var off = (equals == ``)? max:``;

    if((n36 == 0)){
      document.getElementById("r36").innerHTML = ``;
    }
    else if((n36 == "-")){
      document.getElementById("r36").innerHTML = ``; 
    }
    else{
      switch (length) {
        case 1:
          document.getElementById("r36").innerHTML = `${len} ${oneDigit}`; 
          break;
      
        case 4:
          switch (sortEven.length) {
            case 0:
              document.getElementById("r36").innerHTML = `${len} :D <br>el ${n36} no tiene números pares ${oddResult} ${equals} ${off}`; 
              break;
              
            default:
              switch (sortOdd.length) {
                case 0:
                  document.getElementById("r36").innerHTML = `${len} :D <br> ${evenResult} pero curiosamente no tiene números impares ${equals} ${off}`; 
                  break;
              
                default:
                  document.getElementById("r36").innerHTML = `${len} :D <br> ${solution} ${equals} ${off}`; 
                  break;
              }
              break;
          }
          break;
        
        default:
          switch (sortEven.length) {
            case 0:
              document.getElementById("r36").innerHTML = `${len} y no 4 :C ...Pero que igual te lo calculo :D<BR>no tiene números pares ${oddResult} ${equals} ${off}`; 
              break;
              
            default:
              switch (sortOdd.length) {
                case 0:
                  document.getElementById("r36").innerHTML = `${len} y no 4 :C ...Pero que igual te lo calculo :D<br> ${evenResult} pero curiosamente no tiene números impares :O ${equals} ${off}`; 
                  break;
              
                default:
                  document.getElementById("r36").innerHTML = `${len} y no 4 :C ...Pero que igual te lo calculo :D<br>${solution} ${equals} ${off}`; 
                  break;
              }
              break;
          }
          break;
      }
    }
}

// 37. Leer dos números enteros y determinar cuál es múltiplo de cuál.
function result37(){

  //Variable 1
  var n37 = document.getElementById("input37").value;
  var aux = Math.abs(n37);

  //Variable 2
  var n37b = document.getElementById("input37b").value;
  var auxb = Math.abs(n37b);
  

  if ((n37 == 0 && n37b == 0)) {
    document.getElementById("r37").innerHTML = ``;
  }
  else if((n37 == "-" && n37b == "-")){
    document.getElementById("r37").innerHTML = ``; 
  }
  else {
    if (n37 == `` || n37b == ``) {                                                                                           //PARA EJERCICIOS CON MÚLTIPLES VARIABLES 
      document.getElementById("r37").innerHTML = `Okay, un ${n37}${n37b}. Pero ponme un número en el otro cuadro también >:c`;
    } 
    else{
      switch (aux) {
        case auxb:
          document.getElementById("r37").innerHTML = `¡Ambas casillas tienen el mismo número, humano!<BR>Y pues todo número es múltiplo de si y ${n37} no es la excepción UwU`;
          break;
      
        default:
          switch (aux%auxb) {
            case 0:
              document.getElementById("r37").innerHTML = `El número de la izquierda (${n37}) es múltiplo del de la derecha (${n37b}) :D<br>Ya que si multiplicas ${n37b} * ${(n37/n37b)} veces, te dará ${n37} UwU`;
              break;
          
            default:
              switch (auxb%aux) {
                case 0:
                  document.getElementById("r37").innerHTML = `El número de la derecha (${n37b}) es múltiplo del de la izquierda (${n37}) :D<br>Ya que si multiplicas ${n37} * ${(n37b/n37)} veces, te dará ${n37b} UwU`;
                  break;
              
                default:
                  document.getElementById("r37").innerHTML = `Ninguno de los dos números, ni ${n37}, ni ${n37b} son múltiplos del otro :c<br>¡Prueba con otros números, humano!`;
                  break;
              }
              break;
          }
          break;
      }
    }
  }
}  

// 38. Leer tres números enteros y determinar si el último dígito de los tres números es igual.
function result38(){

    //Variables
    var n38 = document.getElementById("input38").value;
    var n38b = document.getElementById("input38b").value;
    var n38c = document.getElementById("input38c").value;

    //Valores absolutos de las variables (para que los arreglos no se pifeen con el signo menos (-))
    var aux = Math.abs(n38);
    var auxb = Math.abs(n38b);
    var auxc = Math.abs(n38c);

    //Arreglos para adquirir el último dígito de cada número
    var arr = Array.from(String(aux),Number); 
    var arrb = Array.from(String(auxb),Number);
    var arrc = Array.from(String(auxc),Number);

    var lastOne = arr[(arr.length-1)];
    var lastTwo = arrb[(arrb.length-1)];
    var lastThree = arrc[(arrc.length-1)];
    
    //LETS GO

    if ((n38 == 0 && n38b == 0 && n38c == 0)) {
      document.getElementById("r38").innerHTML = ``;
    }
    else if((n38 == "-" && n38b == "-" && n38c == "-")){
      document.getElementById("r38").innerHTML = ``; 
    }
   //Generamos una estructura de casos aplicable para ejercicios de 3 cifras 
    else {
      if (n38c == ``) {
        if (n38 != `` && n38b != ``) {
          document.getElementById("r38").innerHTML = `Okay, un ${n38} y un ${n38b}. Pero ponme un número en el otro cuadro también >:c`;
        }
        else{
          document.getElementById("r38").innerHTML = `Okay, un ${n38}${n38b}. Pero ponme un número en los otros dos cuadros también >:c`;
        }
      }
      else {
        if (n38 == `` && n38b == ``) {
          document.getElementById("r38").innerHTML = `Okay, un ${n38c}. Pero ponme un número en los otros dos cuadros también >:c`;
        }
        else if (n38 == `` || n38b == ``) {
          document.getElementById("r38").innerHTML = `Okay, un ${n38c} y un ${n38}${n38b}. Pero ponme un número en el otro cuadro también >:c`;
        }
        else{
          switch (lastOne) {

            case lastTwo:
              switch (lastTwo) {
                case lastThree:
                  document.getElementById("r38").innerHTML = `Los 3 números ${n38}, ${n38b} y ${n38c}...<br>¡Terminan en el mismo número: ${n38%10}! :D UwU`;
                  break;
                  
                default:
                  document.getElementById("r38").innerHTML = `El ${n38} de la izquierda termina igual que el ${n38b} del medio UwU<br>Ambos terminan en el número ${n38%10} c:`;
                  break;
              }
              break;

            case lastThree:
              switch (lastThree) {
                case lastTwo:
                  document.getElementById("r38").innerHTML = `Los 3 números ${n38}, ${n38b} y ${n38c}<br>terminan en el mismo número: ${n38%10}! :D UwU`;
                  break;
              
                default:
                  document.getElementById("r38").innerHTML = `El ${n38} de la izquierda termina igual que el ${n38c} de la derecha UwU<br>Ambos terminan en el número ${n38%10} c:`;
                  break;
              }
              break;
                
            default:
                  switch (lastTwo) {
                    case lastThree:
                  document.getElementById("r38").innerHTML = `El ${n38b} del medio  y el ${n38c} de la derecha terminan igual UwU<br>Ambos terminan en el número ${n38%10} c:`;
                  break;
              
                default:
                  document.getElementById("r38").innerHTML = `Ninguno de los 3 números terminan igual :c<br>¡PRUEBA OTRA COMBINACIÓN!`; 
                  break;
              }
              break;
          }
        }
      }  
    }
}

// 39. Leer tres números enteros y determina si el penúltimo dígito de los tres números es igual.
function result39(){

  //Variables
  var n39 = document.getElementById("input39").value;
  var n39b = document.getElementById("input39b").value;
  var n39c = document.getElementById("input39c").value;

  //Valores absolutos de las variables (para que los arreglos no se pifeen con el signo menos (-))
  var aux = Math.abs(n39);
  var auxb = Math.abs(n39b);
  var auxc = Math.abs(n39c);

  //Arreglos para adquirir el penúltimo dígito de cada número
  var arr = Array.from(String(aux),Number); 
  var arrb = Array.from(String(auxb),Number);
  var arrc = Array.from(String(auxc),Number);

  var penltOne = arr[(arr.length-2)];
  var penltTwo = arrb[(arrb.length-2)];
  var penltThree = arrc[(arrc.length-2)];
  
  //LETS GO

  if ((n39 == 0 && n39b == 0 && n39c == 0)) {
    document.getElementById("r39").innerHTML = ``;
  }
  else if((n39 == "-" && n39b == "-" && n39c == "-")){
    document.getElementById("r39").innerHTML = ``; 
  }
 //Generamos una estructura de casos aplicable para ejercicios de 3 cifras 
  else {
    if (n39c == ``) {
      if (n39 != `` && n39b != ``) {
        document.getElementById("r39").innerHTML = `Okay, un ${n39} y un ${n39b}. Pero ponme un número en el otro cuadro también >:c`;
      }
      else{
        document.getElementById("r39").innerHTML = `Okay, un ${n39}${n39b}. Pero ponme un número en los otros dos cuadros también >:c`;
      }
    }
    else {
      if (n39 == `` && n39b == ``) {
        document.getElementById("r39").innerHTML = `Okay, un ${n39c}. Pero ponme un número en los otros dos cuadros también >:c`;
      }
      else if (n39 == `` || n39b == ``) {
        document.getElementById("r39").innerHTML = `Okay, un ${n39c} y un ${n39}${n39b}. Pero ponme un número en el otro cuadro también >:c`;
      }
      else{
        switch (penltOne) {

          case penltTwo:
            switch (penltTwo) {
              case penltThree:
                document.getElementById("r39").innerHTML = `Los 3 números ${n39}, ${n39b} y ${n39c}...<br>¡Terminan en el mismo número: ${n39%10}! :D UwU`;
                break;
                
              default:
                document.getElementById("r39").innerHTML = `El ${n39} de la izquierda termina igual que el ${n39b} del medio UwU<br>Ambos terminan en el número ${n39%10} c:`;
                break;
            }
            break;

          case penltThree:
            switch (penltThree) {
              case penltTwo:
                document.getElementById("r39").innerHTML = `Los 3 números ${n39}, ${n39b} y ${n39c}<br>terminan en el mismo número: ${n39%10}! :D UwU`;
                break;
            
              default:
                document.getElementById("r39").innerHTML = `El ${n39} de la izquierda termina igual que el ${n39c} de la derecha UwU<br>Ambos terminan en el número ${n39%10} c:`;
                break;
            }
            break;
              
          default:
                switch (penltTwo) {
                  case penltThree:
                document.getElementById("r39").innerHTML = `El ${n39b} del medio  y el ${n39c} de la derecha terminan igual UwU<br>Ambos terminan en el número ${n39%10} c:`;
                break;
            
              default:
                document.getElementById("r39").innerHTML = `Ninguno de los 3 números terminan igual :c<br>¡PRUEBA OTRA COMBINACIÓN!`; 
                break;
            }
            break;
        }
      }
    }  
  }
}

// 40. Leer dos números enteros y si la diferencia entre los dos es menor o igual a 10 entonces mostrar en pantalla todos los enteros comprendidos entre el menor y el mayor de los números leídos.
function result40(){
  
  //variables de inputs
  var n40 = document.getElementById("input40").value;
  var n40b = document.getElementById("input40b").value;

  //variable que determina cuál número es el menor y mayor (para comenzar a contar desde allí)
  var min = Math.min(n40,n40b);
  var max = Math.max(n40,n40b);
  var box = [];
  
  for (let i = min; i <= max; i++) {
    box.push(i);
  };
  
  //variable que responda a la resta de las dos variables
  var test = (((n40-n40b)<=10)&&((n40-n40b)>=-10))? true:false;
  var rest = (test == true)? `La diferencia entre ${n40} y ${n40b} da ${n40-n40b}, lo que es menor a 10 unidades UwU<br>Si contáramos los números que hay entre el ${n40} y el ${n40b}, obtendríamos esto:<br>${box} UwU` :`La diferencia entre ${n40} y ${n40b} da ${n40-n40b}, lo que es mayor a 10 unidades...<br>Por lo que me salvé de contar huehuehue xd`;


  
  if ((n40 == 0 && n40b == 0)) {
    document.getElementById("r40").innerHTML = ``;
  }
  else if((n40 == "-" && n40b == "-")){
    document.getElementById("r40").innerHTML = ``; 
  }
  else {
    if (n40 == `` || n40b == ``) {                                                                                           //PARA EJERCICIOS CON MÚLTIPLES VARIABLES 
      document.getElementById("r40").innerHTML = `Okay, un ${n40}${n40b}. Pero ponme un número en el otro cuadro también >:c`;
    } 
    else{
      document.getElementById("r40").innerHTML = `Qué ejercicio tan rarito e,e... Pero okay, humano. ¡Aquí vamos! >:c<br>${rest}`;
    }
  } 
}

// 41. Leer dos números enteros y determinar si la diferencia entre los dos es un número primo.
function result41(){
  
  //variables de inputs
  var n41 = document.getElementById("input41").value;
  var n41b = document.getElementById("input41b").value;

  //Variable para diferir ambas variables
  var rest = Math.abs(n41-n41b);
  var uno = (rest==1)?  `1 unidad`:`${rest} unidades`;

    //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;

  for (let numbers = 2; numbers <= rest; numbers++) {
      const prime = rest%numbers;
      if (prime == 0) {
        box.push(numbers);  
      }
    }
    
  var primes = (box.length == 1)? `es, asombrosamente, primo UwU`:`no es primo :c`;

  //CON ESTE HERMOSO ALGORITMO QUE CREÉ PARA PRIMOS LOS EJERCICIOS SE FACILITAN MÁS :D
  var result = `A ${n41} y ${n41b} los diferencian ${uno}<br>Ese número de unidades (${rest}) ${primes}`;
  
  if ((n41 == 0 && n41b == 0)) {
    document.getElementById("r41").innerHTML = ``;
  }
  else if((n41 == "-" && n41b == "-")){
    document.getElementById("r41").innerHTML = ``; 
  }
  else {
    if (n41 == `` || n41b == ``) {                                                                       //PARA EJERCICIOS CON MÚLTIPLES VARIABLES 
      document.getElementById("r41").innerHTML = `Okay, un ${n41}${n41b}. Pero ponme un número en el otro cuadro también >:c`;
    } 
    else{
      document.getElementById("r41").innerHTML = `¿Otra vez esta clase de ejercicio? >:v ...Okay, humano. ¡Aquí vamos! >:c<br>${result}`;
    }
  } 
}

// 42. Leer dos números enteros y determinar si la diferencia entre los dos es un número par.
function result42(){
  
  //variables de inputs
  var n42 = document.getElementById("input42").value;
  var n42b = document.getElementById("input42b").value;

  //Variable para diferir ambas variables
  var rest = Math.abs(n42-n42b);
  var uno = (rest==1)?  `1 unidad`:`${rest} unidades`;
  
  //RESULTADO PARA DEFINIR SI ES PAR O NO, PAPI
  var result = ((rest%2)==0)? `A ${n42} y ${n42b} los diferencian ${uno}<br>ESE NÚMERO DE UNIDADES (${rest}) ES PAR UwU`:`A ${n42} y ${n42b} los diferencian ${uno}<br>Ese número de unidades (${rest}) no es par :C`;
  


  if ((n42 == 0 && n42b == 0)) {
    document.getElementById("r42").innerHTML = ``;
  }
  else if((n42 == "-" && n42b == "-")){
    document.getElementById("r42").innerHTML = ``; 
  }
  else {
    if (n42 == `` || n42b == ``) {                                                                  //PARA EJERCICIOS CON MÚLTIPLES VARIABLES 
      document.getElementById("r42").innerHTML = `Okay, un ${n42}${n42b}. Pero ponme un número en el otro cuadro también >:c`;
    } 
    else{
      document.getElementById("r42").innerHTML = `Bueh... Ya me estoy acostumbrado a estos ejercicios xd...<br>Okay, humano. ¡Aquí vamos! >:c<br>${result}`;
    }
  } 
}

// 43. Leer dos números enteros y determinar si la diferencia entre los dos es un número divisor exacto de alguno de los dos números.
function result43(){
  
  //variables de inputs
  var n43 = document.getElementById("input43").value;
  var aux = Number.parseInt(n43);
  var n43b = document.getElementById("input43b").value;
  var auxb = Number.parseInt(n43b);

  //Variable para diferir ambas variables
  var rest = Math.abs(n43-n43b);
  var uno = (rest==1)?  `1 unidad`:`${rest} unidades`;

  //Filtros
  var nums = [n43,n43b];
  var zeros = nums.filter(x=>x%rest==0);
  var left = ((aux%rest)==0)? `Si divides a ${n43} por ${rest}, te dará... ${aux/rest} CON ${aux%rest} RESIDUO :D`:``; 
  var right = ((auxb%rest)==0)? `Si divides a ${n43b} por ${rest}, te dará... ${auxb/rest} CON ${auxb%rest} RESIDUO :D`:``;

  //RESULTADO PARA DEFINIR SI %=0 O NO, PAPI
  var result = (zeros.length>=1)? `A ${n43} y ${n43b} los diferencian ${uno}<br>${left}<br>${right}`:`A ${n43} y ${n43b} los diferencian ${uno}<br>Pero si divides a cualquiera de los dos números por ${rest}, no obtendrás una división exacta :c`;
  


  if ((n43 == 0 && n43b == 0)) {
    document.getElementById("r43").innerHTML = ``;
  }
  else if((n43 == "-" && n43b == "-")){
    document.getElementById("r43").innerHTML = ``; 
  }
  else {
    if (n43 == `` || n43b == ``) {                                                                //PARA EJERCICIOS CON MÚLTIPLES VARIABLES 
      document.getElementById("r43").innerHTML = `Okay, un ${n43}${n43b}. Pero ponme un número en el otro cuadro también >:c`;
    } 
    else{
      document.getElementById("r43").innerHTML = `Bueh... Ya me estoy acostumbrado a estos ejercicios xd...<br>Okay, humano. ¡Aquí vamos! >:c<br>${result}`;
    }
  } 
}

// 44. Leer un número entero de 4 dígitos y determinar si el primer dígito es múltiplo de alguno de los otros dígitos.
function result44(){
  
    //Variables
    var n44 = document.getElementById("input44").value;
    var aux = Math.abs(n44);
    var arr = Array.from(String(aux),Number);

    //Cantidad de dígitos
    var length = (n44<0)? n44.length-1:n44.length;
    var len = (length==1)? `${n44} tiene solo 1 dígito y no 2:c`:`${n44} tiene ${length} dígitos`;
  
  //En este caso, solution es un filtro del primer número y for el lector del resto de dígitos
    var solution = arr[0]; 
    var box = [];

    for (let i = 1; i < arr.length; i++) {
      const miau = (solution%arr[i]);
      if (miau == 0) {
        box.push(arr[i]);
      };
    };

  //sort organizará nuestro arreglo, mostrando la informacion de manera clara al usuario  
    var sort = box.sort((a,b)=>a-b).filter((value,index,array)=>(array.indexOf(value)==index));
  //Personalización del problema (singulares o plurales)
    var xd = (sort.length>=1)? `Tiene de primer número al ${solution}, el cual, curiosamente... <br> ¡ES MÚLTIPLO DEL ${box}! :D UwU`:`Comienza con el número ${solution}, el cual,<br>lamentablemente, no es múltiplo de ninguno de los otros números :c`;


    //COMENZAMOS    
    if((n44 == 0)){
      document.getElementById("r44").innerHTML = ``;
    }
    else if((n44 == "-")){
      document.getElementById("r44").innerHTML = ``; 
    }
    else{
      switch (length) {

        case 1:
          document.getElementById("r44").innerHTML = `${len} aunque podemos decir...<br>Que es múltiplo de si mismo xd ¡Ponme más números!`; 
          break;
           
        case 4:
          document.getElementById("r44").innerHTML = `${len} :D ${xd}`; 
          break;
            
        default:  
          document.getElementById("r44").innerHTML = `${len} y no 4 :c pero que igual te lo calculo :D <br> ${xd}`; 
          break;
      }
    }
}

// 45. Leer un número entero de 2 dígitos y si es par mostrar en pantalla la suma de sus dígitos, si es primo y menor que 10 mostrar en pantalla su último dígito y si es múltiplo de 5 y menor que 30 mostrar en pantalla el primer dígito.
function result45(){
  
  //Variables
  var n45 = document.getElementById("input45").value;
  var aux = Math.abs(n45);
  var arr = Array.from(String(aux),Number);

  //Cantidad de dígitos
  var length = (n45<0)? n45.length-1:n45.length;
  var len = (length==1)? `${n45} tiene solo 1 dígito y no 2 :c`:`${n45} tiene ${length} dígitos`;

  //3 FILTROS: 

  //1- SI ES PAR, SUMAR SUS DÍGITOS
  var summString = arr.join('+'); 
  var summResult = 0;

  for (let i = 0; i < arr.length; i++) {
  summResult += arr[i];  
  }

  var pair = ((n45%2)==0)? `El número ${n45} es par :D así que te sumo sus dígitos:<br>${summString} te dará: ${summResult} UwU`:`El número ${n45} no es par, así que...Me salvé de contar xd`;

  //2- PRIMO MENOR QUE 10 (2,3,5,7) (ÚLTIMO DÍGITO)
    //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;

  for (let numbers = 2; numbers <= aux; numbers++) {
      const prime = n45%numbers;
      if (prime == 0) {
        box.push(numbers);  
      }
    }
    
  var primes = (box.length == 1 && n45>0)? `El ${n45} es primo UwU`:`El ${n45} no es primo :c`;
  var pero = (((box.length==1)&&(n45<10&&n45>0))||((box.length!=1)&&(n45>10&&n45>0)))? `y`:`pero`;
  var lessThan10 = (n45<10)? `es menor a 10 :D`:`es mayor que 10 :c ...`;
  var lastDigit = arr[(arr.length-1)];
  var showLast = ((box.length==1)&&(n45<10))? `Así que puedo mostrarte al ${lastDigit}, el último dígito del número UwU`:`No cumple ambas condiciones, así que no puedo mostrarte el ${lastDigit} :c xd`;


  //3- MÚLTIPLO DE 5 Y MENOR QUE 30 (PRIMER DÍGITO)
  var firstDigit = arr[0];
  var mult5 = ((n45%5)==0)? `El ${n45} es múltiplo de 5 :D`:`El ${n45} no es múltiplo de 5 :C`;
  var peroo = ((n45<30)&&((n45%5)==0)||((n45>30)&&((n45%5)!=0)))? `y`:`pero`;
  var lessThan30 = (n45<30)? `${n45} es menor a 30 :D`:`${n45} es mayor que 30 :C`;
  var showFirst = (((n45%5)==0)&&(n45<30))? `Así que puedo mostrarte el primer dígito del número que es ${firstDigit} UwUUUuwuwuwWuU`:`No cumple ambas condiciones, así que no puedo mostrarte al ${firstDigit} :c xdd`;

  //Personalización del problema
  var xd = `Tenemos 3 condiciones: <br> 1- Si es par, te sumo los números: <br> ${pair} <br> 2- Si es primo y menor que 10, te muestro su último dígito: <br> ${primes} ${pero} ${lessThan10}<br>${showLast}<br>3- Si es múltiplo de 5 y menor que 30, mostrar el primer dígito, así que...<br>${mult5} ${peroo} ${lessThan30}<br>${showFirst}`;


  //COMENZAMOS    
  if((n45 == 0)){
    document.getElementById("r45").innerHTML = ``;
  }
  else if((n45 == "-")){
    document.getElementById("r45").innerHTML = ``; 
  }
  else{
    switch (length) {
      case 2:
        document.getElementById("r45").innerHTML = `${len}... ¡Como pide el ejercicio! :D Y bueno...<br>Hagamos esto juntos, humano, porque yo sé que el ejercicio está complejo hasta para ti xd<br> ${xd}<br> Fin xd.`; 
        break;
          
      default:  
        document.getElementById("r45").innerHTML = `${len} pero que igual te lo calculo :D <br> Hagamos esto juntos, humano, porque yo sé que el ejercicio está complejo hasta para ti xd <br>${xd}<br> Fin xd.`; 
        break;
    }
  }
}

// 46. Leer un número entero de 2 dígitos y si termina en 1 mostrar en pantalla su primer dígito, si termina en 2 mostrar en pantalla la suma de sus dígitos y si termina en 3 mostrar en pantalla el producto de sus dos dígitos.
function result46(){
  
  //Variables
  var n46 = document.getElementById("input46").value;
  var aux = Math.abs(n46);
  var arr = Array.from(String(aux),Number);

  //Cantidad de dígitos
  var length = (n46<0)? n46.length-1:n46.length;
  var len = (length==1)? `${n46} tiene solo 1 dígito y no 2 :c`:`${n46} tiene ${length} dígitos`;

  //3 FILTROS CORRELATADOS AL ÚLTIMO DÍGITO: 
  var lastDigit = arr[(arr.length-1)];
  
  //1- SI TERMINA EN 1, MOSTRAR EL PRIMER DÍGITO
  var firstDigit = arr[0];
  var showFirst = (lastDigit==1)? `${n46} termina en ${lastDigit} así que puedo mostrarte el primer dígito del número que es ${firstDigit} UwUUUuwuwuwWuU`:`${n46} no termina en 1 sino en ${lastDigit} así que no puedo mostrarte al ${firstDigit} :c xdd`;
  
  //2- SI TERMINA EN 2, SUMAR DÍGITOS
  var summString = arr.join('+'); 
  var summResult = 0;

  for (let i = 0; i < arr.length; i++) {
  summResult += arr[i];  
  }

  var summ = (lastDigit == 2)? `El número ${n46} termina en ${lastDigit} :D así que te sumo sus dígitos:<br>${summString} te dará: ${summResult} UwU`:`El número ${n46} no termina en 2 sino en ${lastDigit}, así que...Me salvé de contar xd`;


  //3- SI TERMINA EN 3, MULTIPLICAR EL PRIMER Y SEGUNDO DÍGITO
  var mult = (arr[0]*arr[1]);
  var product = (lastDigit == 3)? `${n46} termina en ${lastDigit} UwU y el producto de sus dos primeros dígitos da ${mult} UWwuWUwuUWuwuUuU`:`${n46} termina en ${lastDigit} y no en 3, así que F xd no te multiplicaré na'ah >:v`; 

  //Personalización del problema
  var xd = `Tenemos 3 condiciones: <br> 1- Si termina en 1, te muestro el primer dígito: <br> ${showFirst} <br> 2- Si termina en 2, te muestro la suma de sus números: <br> ${summ} <br> 3- Si termina en 3, mostrar el producto de sus primeros dos dígitos, así que...<br>${product}`;


  //COMENZAMOS    
  if((n46 == 0)){
    document.getElementById("r46").innerHTML = ``;
  }
  else if((n46 == "-")){
    document.getElementById("r46").innerHTML = ``; 
  }
  else{
    switch (length) {
      case 2:
        document.getElementById("r46").innerHTML = `${len}... ¡Como pide el ejercicio! :D Y bueno...<br>Esto es el mismo ejercicio que el anterior (de 3 condiciones simultáneas sobre un número) pero más simplecito xd<br>LETS GOOOOO<br> ${xd}<br> Fin xd.`; 
        break;
          
      default:  
        document.getElementById("r46").innerHTML = `${len} pero que igual te lo calculo :D <br> Esto es el mismo ejercicio que el anterior (de 3 condiciones simultáneas sobre un número) pero más simplecito xd <br> LETS GOOOOO <br>${xd}<br> Fin xd.`; 
        break;
    }
  }
}

// 47. Leer dos números enteros y si la diferencia entre los dos números es par mostrar en pantalla la suma de los dígitos de los números, si dicha diferencia es un número primo menor que 10 entonces mostrar en pantalla el producto de los dos números y si la diferencia entre ellos termina en 4 mostrar en pantalla todos los dígitos por separado.
function result47(){
  var n47 = document.getElementById("input47").value;
  var n47b = document.getElementById("input47b").value;

  //3 CASOS BASADOS EN LA DIFERENCIA ENTRE LAS DOS VARIABLES
  var diff = Math.abs(n47-n47b);

  //VARIABLES NECESARIAS PARA EL ALGORTIMO
  var aux = Math.abs(n47);
  var auxb = Math.abs(n47b);
  var arr = Array.from(String(aux),Number);
  var arrb = Array.from(String(auxb),Number);
  var twoNums = arr.concat(arrb);     

  //1- diff es par > mostrar suma de los dígitos de los dos num
  var summString = twoNums.join('+'); 
  var summResult = 0;

  for (let i = 0; i < twoNums.length; i++) {
  summResult += twoNums[i];  
  }

  var summ = ((diff%2)==0)? `El número ${diff} ES PAR :D así que te sumo los dígitos de los dos números que me diste:<br>${summString} te dará: ${summResult} UwU`:`El número ${n47} no es par :C, así que...Me salvé de contar xd`;


  //2- diff es primo menor a 10 > mostrar producto de los dos números
    //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;

  for (let numbers = 2; numbers <= diff; numbers++) {
      const prime = diff%numbers;
      if (prime == 0) {
        box.push(numbers);  
      }
    }
    
  var primes = (box.length == 1)? `${diff} es primo UwU`:`${diff} no es primo :c`;
  var minus10 = (diff<10)? `es menor a 10 :D`:`es mayor a 10 :cc`;
  var pero = (((box.length==1)&&(diff<10))||((box.length!=1)&&(diff>10)))? `y`:`pero`;

    //ALGORITHM FOR MULTIPLY
  var multiply = ((box.length==1)&&(diff<10))? `Así que puedo multiplicarte a ${n47}*${n47b} que te dará = ${(n47*n47b)} UwU`:` El número no cumple con las dos condiciones...<br>Así que no tengo permitido multiplicarte a ${n47} y ${n47b}...Lo siento, humano :c`;

  //3- diff termina en 4 > mostrar todos los dígitos por separado
  var diffArray = Array.from(String(diff),Number);
  var lastDigit = diffArray[(diffArray.length)-1];

  var allNums = (lastDigit == 4)? `El número de unidades que diferencia al ${n47} y al ${n47b} es ${diff}, el cual termina en 4 :D <br> Así que aquí tienes todos los dígitos de los dos números ingresados por ti UwU <br> ${twoNums}`:`El número de unidades que diferencia al ${n47} y al ${n47b} es ${diff} y no termina en 4 :c <br> ¡NO HAY DÍGITOS ARREGLADOS PARA TI! >:c `;

  //PERSONALIZACIÓN DEL EJERCICIO 
  var xd = `CASO 1: Si la diferencia es par, mostrar la suma de todos los dígitos de los dos números dados por el humano <br> ${summ} <br> CASO 2: Si la diferencia es un número primo menor a 10, multiplicar los dos números dados por el humano <br> ${primes} ${pero} ${minus10} ${multiply} <br> CASO 3: Si la diferencia termina en 4, mostrar todos los dígitos de las dos variables pero separados, pues... <br> ${allNums}`;

  //& LET'S GOOOOOOOOOOOOOOOOOOOOO
  
  if ((n47 == 0 && n47b == 0)) {
    document.getElementById("r47").innerHTML = ``;
  }
  else if((n47 == "-" && n47b == "-")){
    document.getElementById("r47").innerHTML = ``; 
  }
  else {
    if (n47 == `` || n47b == ``) {                                                              //PARA EJERCICIOS CON MÚLTIPLES VARIABLES 
      document.getElementById("r47").innerHTML = `Okay, un ${n47}${n47b}. Pero ponme un número en el otro cuadro también >:c`;
    } 
    else{
      document.getElementById("r47").innerHTML = `Tenemos ahora 3 casos diferentes basados en el número ${diff} que son las unidades que diferencian a ${n47} y ${n47b} <br> LET'S GOOOOOO<br>${xd} Y LISTOOOO, izi xd.`;
    }
  }  
}

// 48. Leer un número entero y si es menor que 100 determinar si es primo.
function result48(){
  
  //Variables
  var n48 = document.getElementById("input48").value;
  var aux = Math.abs(n48);

  //¿ES MENOR QUE 100?
  var filter100 = (n48<=100)? true:false;

  //¿ES PRIMO?
    //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;
  
  for (let numbers = 1; numbers <= aux; numbers++) {
    const prime = aux%numbers;
    if (prime == 0) {
      box.push(numbers);  
    }
  };

  var fixBox = box.filter((value,index,array)=>array.indexOf(value)===index);
  
  var primes = (box.length == 2)? `es primo UwU ya que sólo puede ser dividido de manera exacta por el 1 y por si mismo (${fixBox}) c: awiwii`:`no es primo :c ya que es divisible de manera exacta por todos estos números: ${fixBox} <br> ¡Prueba otro número, humano! :c`;
  var ngtv = (n48<0)? `es negativo, así que hasta aquí llegamos, humano... <br> Porque los números primos no pueden ser negativos :c`:primes;

  //Personalización del problema
  var xd = `El ${n48} ${ngtv}`;


  //COMENZAMOS    
  if((n48 == 0)){
    document.getElementById("r48").innerHTML = ``;
  }
  else if((n48 == "-")){
    document.getElementById("r48").innerHTML = ``; 
  }
  else{
    switch (filter100) {
      case true:
        document.getElementById("r48").innerHTML = `¡${n48} ES MENOR A 100 COMO PIDE EL EJERCICIO! :D COMENCEMOS<br>${xd}`; 
        break;
          
      default:  
        document.getElementById("r48").innerHTML = `${n48} es mayor a 100 :c ...Pero que no importa, que igual te lo calculo todo :D LET'S GOOOOO <br>${xd}`; 
        break;
    }
  }
}

// 49. Leer un número entero y si es múltiplo de 4 determinar si su último dígito es primo.
function result49(){
  
  //Variables
  var n49 = document.getElementById("input49").value;
  var aux = Math.abs(n49);
  var arr = Array.from(String(aux),Number);
  

  //SI ES PRIMO
  //ALGORITHM FOR PRIME NUMBERS >:c
  var lastDigit = arr[(arr.length-1)];
  var box = [];
  var primes = ``;

  for (let numbers = 2; numbers <= lastDigit; numbers++) {
      const prime = lastDigit%numbers;
      if (prime == 0) {
        box.push(numbers);  
      }
  }
    
  var primes = (box.length == 1)? `Y además...Su último dígito (${lastDigit}) es primo UwU`:`Lamentablemente, su último dígito (${lastDigit}) no es primo :c`;


  //SI ES MÚLTIPLO DE OTRA COSA
  //ALGORITHM FOR PRIME NUMBERS >:c
  var boxx = [];
  var primess = ``;
  
  for (let n = 1; n <= aux; n++) {
    const prime = aux%n;
      if (prime == 0) {
          boxx.push(n);  
      }
  }
  
  var boxxSort = boxx.filter((value,index,array)=>array.indexOf(value)===index);

  var primess = (boxx.length == 2)? `sólo es múltiplo de ${boxxSort}...<br>Por lo que es un número primo UwU <br> ${primes}`:`es múltiplo de ${boxxSort} y por cierto, no es un número primo...<br> ${primes} <br> ¡Prueba con otro número, humano!`;

  

  //SI ES MÚLTIPLO DE 4
  var veces = (n49==4)? `vez`:`veces`;

  var mult4 = ((n49%4)==0)? `El ${n49} es múltiplo del 4, ya que si multiplicas 4 * ${(n49/4)} ${veces}, te dará ${n49} :D <br> ${primes} `:`El ${n49} no es múltiplo del 4 :c ...En realidad, <br> ${primess} <br>`;




  //Personalización del problema
  var xd = `${mult4}`;


  //COMENZAMOS    
  if((n49 == 0)){
    document.getElementById("r49").innerHTML = ``;
  }
  else if((n49 == "-")){
    document.getElementById("r49").innerHTML = ``; 
  }
  else{
    document.getElementById("r49").innerHTML = `${xd}`;
  }
}

// 50. Leer un número entero y si es múltiplo de 4 mostrar en pantalla su mitad, si es múltiplo de 5 mostrar en pantalla su cuadrado y si es múltiplo de 6 mostrar en pantalla su primer dígito. Asumir que el número no es mayor que 100.
function result50(){
  
  //Variables
  var n50 = document.getElementById("input50").value;
  var aux = Math.abs(n50);
  var arr = Array.from(String(aux), Number);
  

//3 FILTROS A MÚLTIPLOS DEL NÚMERO (& AL VALOR DE n50<100): 
  var filter100 = (n50<=100)? true:false;
  var veces = ((n50==4)||(n50==5)||(n50==6))? `vez`:`veces`;

  //1- SI ES MÚLTIPLO DE 4, MOSTRAR SU MITAD
  var mult4 = ((n50%4)==0)? `El ${n50} es múltiplo del 4, ya que si multiplicas 4 * ${(n50/4)} ${veces}, te dará ${n50} :D <br> La mitad de ${n50} es ${n50} / 2 = ${n50/2} UwU <br> Fin. xd`:``;

  
  //2- SI ES MÚLTIPLO DE 5, MOSTRAR SU CUADRADO
  var mult5 = ((n50%5)==0)? `El ${n50} es múltiplo del 5, ya que si multiplicas 5 * ${(n50/5)} ${veces}, te dará ${n50} :D <br> El cuadrado de ${n50} es ${n50} * ${n50} = ${n50*n50} UwU <br> Fin. xd`:``;
  
  
  //3- SI ES MÚLTIPLO DE 6, MOSTRAR SU PRIMER DÍGITO
  var mult6 = ((n50%6)==0)? `El ${n50} es múltiplo del 6, ya que si multiplicas 6 * ${(n50/6)} ${veces}, te dará ${n50} :D <br> El primer dígito del ${n50} es claramente el ${arr[0]}, como tú mismo puedes ver, humano UwU <br> Fin. xd`:``;


  //POR SI EL NÚMERO NO CUMPLE CON NINGUNA DE LAS TRES CONDICIONES
  //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;
  
  for (let numbers = 1; numbers <= aux; numbers++) {
    const prime = aux%numbers;
      if (prime == 0) {
          box.push(numbers);  
      }
  }
  
  var boxSort = box.filter((value,index,array)=>array.indexOf(value)===index);

  var primes = (box.length == 2)? `sólo es múltiplo de ${boxSort}...Por lo que es un número primo UwU`:`es múltiplo de ${boxSort} UwU ¡Prueba con otro número, humano!`;

  var alv = (((n50%4)!=0)&&((n50%5)!=0)&&((n50%6)!=0))? `El ${n50} no es múltiplo ni de 4, ni de 5, ni de 6... <br> De hecho, ${primes}`:``;



  //Personalización del problema
  var xd = `${mult4} ${mult5} ${mult6} ${alv}`;


  //COMENZAMOS    
  if((n50 == 0)){
    document.getElementById("r50").innerHTML = ``;
  }
  else if((n50 == "-")){
    document.getElementById("r50").innerHTML = ``; 
  }
  else{
    switch (filter100) {
      case true:
        document.getElementById("r50").innerHTML = `¡${n50} ES MENOR A 100 COMO PIDE EL EJERCICIO! :D COMENCEMOS<br>${xd}`; 
        break;
          
      default:  
        document.getElementById("r50").innerHTML = `${n50} es mayor a 100 :c ...Pero que no importa, que igual te lo calculo todo :D LET'S GOOOOO <br>${xd}`; 
        break;
    }
  }
}

// 50 algoritmos reales de ciclos

x = 0
a = 0
b = 0
c = 0
d = 0

// 1. Leer un número entero y mostrar todos los enteros comprendidos entre 1 y el número leído.
function cycle01(){
  var c01 = document.getElementById("cycle01").value;
  var aux = Number.parseInt(c01);
  var text = ``;

  if (c01 == ``) {
    document.getElementById("c01").innerHTML = ``;
  }
  else if (c01 == "-") {
    document.getElementById("c01").innerHTML = ``;
  }
  else {
    if (c01 <= 0) {
      for (let i = aux; i <= 1; i++) {
        text += `${i} `;
        document.getElementById("c01").innerHTML = `${text}   UwU`;
      }
    }
    else {
      for (let i = 1; i <= aux; i++) {
        text += `${i} `;
        document.getElementById("c01").innerHTML = `${text}   UwU`;
      }
    }
  }
}

// 2. Leer un número entero y mostrar todos los pares comprendidos entre 1 y el número leído.
function cycle02(){
  var c02 = document.getElementById("cycle02").value;
  var aux = Number.parseInt(c02);
  var text = ``;

  var max = Math.max(1,aux);
  var min = Math.min(1,aux);

  for (let index = min; index <= max; index++) {
    if ((index%2)==0 && index!=0){
      text += `${index} `;
    }
  }

  if (c02 == ``) {        
    document.getElementById("c02").innerHTML = ``;
  }
  else if (c02 == "-") {
    document.getElementById("c02").innerHTML = ``;
  }
  else {
    document.getElementById("c02").innerHTML = `${text} UwU`;
  }
}

// 3. Leer un número entero y mostrar todos los divisores exactos del número comprendidos entre 1 y el número leído.
function cycle03(){
  var c03 = document.getElementById("cycle03").value;
  var aux = Number.parseInt(c03);
  var text = ``;

  if (c03 == ``) {
    document.getElementById("c03").innerHTML = ``;
  }
  else if (c03 == "-") {
    document.getElementById("c03").innerHTML = ``;
  }
  else {
    if (c03 <= 0) {
      for (let i = aux; i <= 1; i++) {
        if ((c03%i)==0){
          text += `${i} `;
          document.getElementById("c03").innerHTML = `${text}   UwU`;
        }
      }
    }
    else {
      for (let i = 1; i <= aux; i++) {
        if ((c03%i)==0){
          text += `${i} `;
          document.getElementById("c03").innerHTML = `${text}   UwU`;
        }
      }
    }
  }
}

// 4. Leer dos números y mostrar todos los enteros comprendidos entre ellos.
function cycle04(){
  var c04 = document.getElementById("cycle04").value;
  var c04b = document.getElementById("cycle04b").value;
  var aux = Number.parseInt(c04);
  var auxb = Number.parseInt(c04b);
  var text = ``;
  var min = Math.min(aux,auxb);
  var max = Math.max(aux,auxb);

  if ((c04 == `` && c04b == ``) || (c04 == "-" && c04b == "-")) {
    document.getElementById("c04").innerHTML = ``;
  }
  else if (c04 == `` || c04b == ``) {
    document.getElementById("c04").innerHTML = `Bueno, un ${c04}${c04b}... Y la otra casilla qué >:c`;
  }
  else {
    for (let i = min; i <= max; i++) {
      text += `${i} `;
      document.getElementById("c04").innerHTML = `${text} UwU`;
    }
  }
}

// 5. Leer dos números y mostrar todos los números terminados en 4 comprendidos entre ellos.
function cycle05(){
    var c05 = document.getElementById("cycle05").value;
    var c05b = document.getElementById("cycle05b").value;
    var aux = Number.parseInt(c05);
    var auxb = Number.parseInt(c05b);
    var text = ``;
    var min = Math.min(aux,auxb);
    var max = Math.max(aux,auxb);

    for (let i = min; i <= max; i++) {
      if ((i%10)==4||(i%10)==-4){
        text += `${i} `;
      }
    };
  
    if ((c05 == `` && c05b == ``) || (c05 == "-" && c05b == "-")) {
      document.getElementById("c05").innerHTML = ``;
    }
    else if (c05 == `` || c05b == ``) {
      document.getElementById("c05").innerHTML = `Bueno, un ${c05}${c05b}... Y la otra casilla qué >:c`;
    }
    else {
      if (text==``) {
        document.getElementById("c05").innerHTML = `Ninguno de los números enteros entre el ${c05} y el ${c05b} terminan en 4 :C `;
      } 
      else {
        document.getElementById("c05").innerHTML = `${text} UwU`;
      }
    }
}

// 6. Leer un número entero de tres dígitos y mostrar todos los enteros comprendidos entre 1 y cada uno de los dígitos.
function cycle06(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c06 = document.getElementById("cycle06").value;
    var aux = Math.abs(c06);
    var array = Array.from(String(aux),Number);
    var text = ``;
    
  
    //VARIABLES MAX Y MIN PARA UN for
    var max = '';
    var min = '';
  
    for (let index = 0; index <= array.length; index++) { //UNA TRAMPITA QUE SE ME OCURRIÓ PARA DIFERENCIAR POSITIVOS Y NEGATIVOS xd   
      if (c06<0) {
        max = Math.max(1,-(array[index]));
        min = Math.min(1,-(array[index]));
      }
      else{
        max = Math.max(1,(array[index]));
        min = Math.min(1,(array[index]));
      }
      for (let i = min; i <= max; i++) {
        text += `${i} `;
      }
      text += `<br>`;
    };

    //LETS GO 
    if (c06 == `` || c06 == "-") {
      document.getElementById("c06").innerHTML = ``;
    }
    else {
      switch (array.length) {
        case 1:
          document.getElementById("c06").innerHTML = `¿Solo 1 dígito? Pon los dígitos que quieras UwU <br> ${text} `;
          break;
          
          case 3:
          document.getElementById("c06").innerHTML = `UwU <br> ${text} `;
          break;  
          
          default:
          document.getElementById("c06").innerHTML = `El ejercicio pide 3 dígitos y no ${array.length}, pero que da igual UwU <br> Te lo ejecuto de todas formas: <br> ${text} `;
          break;
      }
    }
}


// 7. Mostrar en pantalla todos los enteros comprendidos entre 1 y 100.
//FUNCIONES PARA LOS BOTONES
var button07 = document.getElementById("cycle07");
function onMouseOverLight07(){
  button07.style.border="3px solid #ffaa22";
  button07.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight07(){
  button07.style.border='3px solid #f7b64e';
  button07.style.color='#333333';
  button07.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark07(){
  button07.style.border="3px solid #ffaa22";
  button07.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark07(){
  button07.style.border = '3px solid #ffaa22';
  button07.style.color = 'rgb(31, 11, 11)';
  button07.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark07(){
  button07.style.border="1px solid #ffaa22";
  button07.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button07.style.color="rgb(31, 11, 11)";
	button07.style.top="1px";
};
function onMouseDownLight07(){
  button07.style.border="1px solid #ffa22";
  button07.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc07(){
  //SWITCH
  document.getElementById("c07").innerHTML = ``;
  button07.onclick = function () {cycle07()};
  //OH, STYLO
  button07.innerHTML = `LET'S GOOO >:C`;
  button07.onmouseover = function (){onMouseOverLight07()};
  button07.onmouseout = function (){onMouseOutLight07()};
  button07.onmousedown = function (){onMouseDownDark07()};
}

function cycle07() {
  
  //SOLUTION
  var count07 = ``;

    for (let index = 1; index <= 100; index++) {
      count07 += `${index} `;
      document.getElementById("c07").innerHTML = `${count07} UwU`;
    }
    
    //SWITCH
    button07.onclick = function () {buttonc07()};
    //OH, STYLO
    button07.innerHTML = `UwU`;
    button07.onmouseover = function (){onMouseOverDark07()};
    button07.onmouseout = function (){onMouseOutDark07()};
    button07.onmousedown = function (){onMouseDownLight07()};
}

// 8. Mostrar en pantalla todos los pares comprendidos entre 20 y 200.
//FUNCIONES PARA LOS BOTONES
var button08 = document.getElementById("cycle08");
function onMouseOverLight08(){
  button08.style.border="3px solid #ffaa22";
  button08.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight08(){
  button08.style.border='3px solid #f7b64e';
  button08.style.color='#333333';
  button08.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark08(){
  button08.style.border="3px solid #ffaa22";
  button08.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark08(){
  button08.style.border = '3px solid #ffaa22';
  button08.style.color = 'rgb(31, 11, 11)';
  button08.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark08(){
  button08.style.border="1px solid #ffaa22";
  button08.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button08.style.color="rgb(31, 11, 11)";
	button08.style.top="1px";
};
function onMouseDownLight08(){
  button08.style.border="1px solid #ffa22";
  button08.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc08(){
  //SWITCH
  document.getElementById("c08").innerHTML = ``;
  button08.onclick = function () {cycle08()};
  //OH, STYLO
  button08.innerHTML = `LET'S GOOO >:C`;
  button08.onmouseover = function (){onMouseOverLight08()};
  button08.onmouseout = function (){onMouseOutLight08()};
  button08.onmousedown = function (){onMouseDownDark08()};
}

function cycle08() {
  
  //SOLUTION
  var count08 = ``;

    for (let index = 20; index <= 200; index=index+2) {
      count08 += `${index} `;
      document.getElementById("c08").innerHTML = `${count08} UwU`;
    }
    
    //SWITCH
    button08.onclick = function () {buttonc08()};
    //OH, STYLO
    button08.innerHTML = `UwU`;
    button08.onmouseover = function (){onMouseOverDark08()};
    button08.onmouseout = function (){onMouseOutDark08()};
    button08.onmousedown = function (){onMouseDownLight08()};
}

// 9. Mostrar en pantalla todos los números terminados en 6 comprendidos entre 25 y 205.
//FUNCIONES PARA LOS BOTONES
var button09 = document.getElementById("cycle09");
function onMouseOverLight09(){
  button09.style.border="3px solid #ffaa22";
  button09.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight09(){
  button09.style.border='3px solid #f7b64e';
  button09.style.color='#333333';
  button09.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark09(){
  button09.style.border="3px solid #ffaa22";
  button09.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark09(){
  button09.style.border = '3px solid #ffaa22';
  button09.style.color = 'rgb(31, 11, 11)';
  button09.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark09(){
  button09.style.border="1px solid #ffaa22";
  button09.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button09.style.color="rgb(31, 11, 11)";
	button09.style.top="1px";
};
function onMouseDownLight09(){
  button09.style.border="1px solid #ffa22";
  button09.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc09(){
  //SWITCH
  document.getElementById("c09").innerHTML = ``;
  button09.onclick = function () {cycle09()};
  //OH, STYLO
  button09.innerHTML = `LET'S GOOO >:C`;
  button09.onmouseover = function (){onMouseOverLight09()};
  button09.onmouseout = function (){onMouseOutLight09()};
  button09.onmousedown = function (){onMouseDownDark09()};
}

function cycle09() {
  
  //SOLUTION
  var count09 = ``;

    for (let index = 25; index <= 205; index++) {
      if ((index%10)==6){
        count09 += `${index} `;
      }
      document.getElementById("c09").innerHTML = `${count09} UwU`;
    }
    
    //SWITCH
    button09.onclick = function () {buttonc09()};
    //OH, STYLO
    button09.innerHTML = `UwU`;
    button09.onmouseover = function (){onMouseOverDark09()};
    button09.onmouseout = function (){onMouseOutDark09()};
    button09.onmousedown = function (){onMouseDownLight09()};
}

// 10. Leer un número entero y determinar a cuánto es igual la suma de todos los enteros comprendidos entre 1 y el número leído.
function cycle10(){
  
  //VARIABLES BÁSICAS PARA EL CICLO
  var c10 = document.getElementById("cycle10").value;
  var aux = Number.parseInt(c10);
  var text = ``;
  var summ = 0;
  var cont = 0;

  //VARIABLES MAX Y MIN PARA UN for
  var max = Math.max(aux,1);
  var min = Math.min(aux,1);

  if (c10 == `` || c10 == "-") {
    document.getElementById("c10").innerHTML = ``;
  }
  else {
      for (let i = min; i <= max; i++) {
         cont++;
         if (cont>25){
          text += `<br>`;
          cont=0;
         };
          if (i<0){
            text += `${i}`;
          }
          else{
            if (i==min){
              text += `${i}`;
            }
            else {
              text += `+${i}`;
            }
          }
        summ += i;
        document.getElementById("c10").innerHTML = `${text} = ... <br> Eso te da un total de ${summ} UwU`;
      }
  }
}

// 11. Leer un número entero de dos dígitos y mostrar en pantalla todos los enteros comprendidos entre un dígito y otro.
function cycle11(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c11 = document.getElementById("cycle11").value;
    var text = ``;
    
    //VARIABLES PARA EL EJERCICIO (dígito 1 y 2)
    var abs = Math.abs(c11);
    var arr = Array.from(String(abs),Number);
    var left = arr[0];
    var right = arr[1];

    //CANTIDAD DE DÍGITOS
    var length = arr.length;
    var len = (length==1)? `El número ${c11} tiene ${length} dígito y no 2 :c <br> Dame al menos un dígito más, ser humano`:`El número ${c11} tiene ${length} dígitos y no 2 :c <br>...Pero que igual te calculo los dos primeros dígitos :D`;

    //VARIABLES MAX Y MIN PARA UN for
    var max = Math.max(left,right);
    var min = Math.min(left,right);

    for (let i = min; i <= max; i++) {
      text += `${i} `;
    }
  
    if (c11 == `` || c11 == "-" || c11 == 0) {
      document.getElementById("c11").innerHTML = ``;
    }
    else {
      switch (length) {
        case 1:
          document.getElementById("c11").innerHTML = `${len}`;
          break;
      
        case 2:
          document.getElementById("c11").innerHTML = `${text}   UwU`;
          break;
          
          default:
          document.getElementById("c11").innerHTML = `${len}<br>${text}   UwU`;
          break;
      }
    }
}
// 12. Leer un número entero de 3 dígitos y determinar si tiene el dígito 1.
function cycle12(){
  
  //VARIABLES BÁSICAS PARA EL CICLO
  var c12 = document.getElementById("cycle12").value;
  var abs = Math.abs(c12);
  var arr = Array.from(String(abs),Number);
  
  //VARIABLES PARA EL EJERCICIO (array.filters y demás)
  var three = [arr[0],arr[1],arr[2]];
  var uno3 = three.filter(x=>x==1);
  var derecha = (three[2] == 1)? `en la derecha`:``;
  var middle = (arr.length==3)? `en el medio`:`en el segundo dígito`;
  var mitad = (three[1] == 1)? `${middle} `:``;
  var izquierda = (three[0] == 1)? `en la izquierda`:``;
  var and = (uno3.length==3 || (three[0]!=1 && three[2]==1))? `y `:``;
  var comma = (uno3.length==3)? `, `:``;
  var yIzq = (uno3.length==2 && izquierda==`en la izquierda`)? ` y `:``;
  //Cada palabra se valoró de manera binaria para volver posible el código
  var uno = arr.filter(x=>x==1);
  var totalUnos = (uno.length==1)? `tiene un 1 :D`:`tiene ${uno.length} UNOS :D`;
  var hafIs = (abs==1)? `el número es un 1 :D`:`${totalUnos}`;
  var though = (uno.length>=1)? `...Aunque ${hafIs}`:`...Y de todas maneras, no tiene un 1 en ninguna parte >:c`;
  //POSICIÓN (en caso de número de 4 dígitos o más con un 1)
  var pos = [];
  var box = [];
  var sortedPos = [];
  for (let i = 0; i < arr.length; i++) {
    pos = (arr.indexOf(1,i))+1;
    if (pos!=0){
      box.push(pos);
    };
    sortedPos = box.filter((value,index,array)=>array.indexOf(value)==index);
  };
  
  //EN BÚSQUEDA DEL 1 
  var oneInThree = (uno3.length>=1)? `El número ${c12} tiene 3 dígitos :D y un 1 ${izquierda}${comma}${yIzq}${mitad}${and}${derecha}`:`El número ${c12} tiene 3 dígitos :D pero ninguno de ellos es un 1 :c`;
  var length = arr.length;
  var len = (length==1)? `El número ${c12} tiene ${length} dígito y no 3 :c ${though} <br> Dame al menos dos dígitos más, ser humano >:c`:`El número ${c12} tiene ${length} dígitos y no 3 :c ${though}`;
  var coor = (uno.length==1)? `Y ese 1 está en la posición n°`:`Los 1 están en las posiciones n°:`;
  var position = (uno.length>=1)? `${coor} ${sortedPos} UwU`:``;


  if (c12 == `` || c12 == "-" || c12 == 0) {
    document.getElementById("c12").innerHTML = ``;
  }
  else {
    switch (length) {
      case 1:
        document.getElementById("c12").innerHTML = `${len}`;
        break;
    
      case 3:
        document.getElementById("c12").innerHTML = `${oneInThree} UwU`;
        break;
        
        default:
        document.getElementById("c12").innerHTML = `${len}<br>${position}`;
        break;
    }
  }
}

// 13. Leer un entero y mostrar todos los múltiplos de 5 comprendidos entre 1 y el número leído.
function cycle13(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c13 = document.getElementById("cycle13").value;
    var aux = Number.parseInt(c13);
    var text = ``;
  
    //VARIABLES MAX Y MIN PARA UN for
    var max = Math.max(aux,1);
    var min = Math.min(aux,1);

    for (let i = min; i <= max; i++) {
      if ((i%5)==0 && i!=0){
        text += `${i} `;
      };
    }
  
    if (c13 == `` || c13 == "-") {
      document.getElementById("c13").innerHTML = ``;
    }
    else {
      if (text==``){
        document.getElementById("c13").innerHTML = `Entre los números ${min} y ${max} no hay múltiplos de 5 :C <br> ¡Prueba con otro número, humano!`;
      }
      else{
        document.getElementById("c13").innerHTML = `${text} UwU`;
      }
    }
}

// 14. Mostrar en pantalla los primeros 20 múltiplos de 3.
//FUNCIONES PARA LOS BOTONES
var button14 = document.getElementById("cycle14");
function onMouseOverLight14(){
  button14.style.border="3px solid #ffaa22";
  button14.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight14(){
  button14.style.border='3px solid #f7b64e';
  button14.style.color='#333333';
  button14.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark14(){
  button14.style.border="3px solid #ffaa22";
  button14.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark14(){
  button14.style.border = '3px solid #ffaa22';
  button14.style.color = 'rgb(31, 11, 11)';
  button14.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark14(){
  button14.style.border="1px solid #ffaa22";
  button14.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button14.style.color="rgb(31, 11, 11)";
	button14.style.top="1px";
};
function onMouseDownLight14(){
  button14.style.border="1px solid #ffa22";
  button14.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc14(){
  //SWITCH
  document.getElementById("c14").innerHTML = ``;
  button14.onclick = function () {cycle14()};
  //OH, STYLO
  button14.innerHTML = `LET'S GOOO >:C`;
  button14.onmouseover = function (){onMouseOverLight14()};
  button14.onmouseout = function (){onMouseOutLight14()};
  button14.onmousedown = function (){onMouseDownDark14()};
}

function cycle14() {
  
  //SOLUTION
  var count14 = ``;
  var mult = 3;
  var quant = 20;

    for (let index = mult; index <= mult*quant; index=index+mult) {
      count14 += `${index} `;
      document.getElementById("c14").innerHTML = `${count14} UwU`;
    }
    
    //SWITCH
    button14.onclick = function () {buttonc14()};
    //OH, STYLO
    button14.innerHTML = `UwU`;
    button14.onmouseover = function (){onMouseOverDark14()};
    button14.onmouseout = function (){onMouseOutDark14()};
    button14.onmousedown = function (){onMouseDownLight14()};
}

// 15. Escribir en pantalla el resultado de sumar los primeros 20 múltiplos de 3.
//FUNCIONES PARA LOS BOTONES
var button15 = document.getElementById("cycle15");
function onMouseOverLight15(){
  button15.style.border="3px solid #ffaa22";
  button15.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight15(){
  button15.style.border='3px solid #f7b64e';
  button15.style.color='#333333';
  button15.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark15(){
  button15.style.border="3px solid #ffaa22";
  button15.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark15(){
  button15.style.border = '3px solid #ffaa22';
  button15.style.color = 'rgb(31, 11, 11)';
  button15.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark15(){
  button15.style.border="1px solid #ffaa22";
  button15.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button15.style.color="rgb(31, 11, 11)";
	button15.style.top="1px";
};
function onMouseDownLight15(){
  button15.style.border="1px solid #ffa22";
  button15.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc15(){
  //SWITCH
  document.getElementById("c15").innerHTML = ``;
  button15.onclick = function () {cycle15()};
  //OH, STYLO
  button15.innerHTML = `LET'S GOOO >:C`;
  button15.onmouseover = function (){onMouseOverLight15()};
  button15.onmouseout = function (){onMouseOutLight15()};
  button15.onmousedown = function (){onMouseDownDark15()};
}

function cycle15() {
  
  //SOLUTION
  var count15 = ``;
  var mult = 3;
  var quant=20;
  var summ = 0;

    for (let index = mult; index <= mult*quant; index=index+mult) {
      if (index==mult){
        count15 += `${mult} `;
      }
      else{
        count15 += `+ ${index} `;
      };
      summ += index;
      document.getElementById("c15").innerHTML = `${count15} = ... <br> La suma de los ${quant} primeros múltiplos de ${mult} te dará ${summ} UwU`;
    }
    
    //SWITCH
    button15.onclick = function () {buttonc15()};
    //OH, STYLO
    button15.innerHTML = `UwU`;
    button15.onmouseover = function (){onMouseOverDark15()};
    button15.onmouseout = function (){onMouseOutDark15()};
    button15.onmousedown = function (){onMouseDownLight15()};
}

// 16. Mostrar en pantalla el promedio entero de los n primeros múltiplos de 3 para un número n leído.
function cycle16(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c16 = document.getElementById("cycle16").value;
    var abs = Math.abs(c16);

    var text = ``;
    var box = 0;
    var avg = 0;

    //BUCLE
    for (let i = 0; i <= abs; i++) {
      box += 3*i;
      text += `3*${i} = ${3*i}<br> `;
    }
    
    //TRAMPILLA PARA QUE TE DE 0 AL DIVIDIR 0 POR X
    avg = Number.parseInt(box/abs);   
    avgg = (box == 0)? 0:avg;

    if (c16 == `` || c16 == "-") {
      document.getElementById("c16").innerHTML = ``;
    }
    else {
      if(c16<0){
        document.getElementById("c16").innerHTML = `Oshe, quítale ese menos (-) al ${abs}, porque sho sólo cuento múltiplos para arriba UwU <br> MÚLTIPLOS: ${abs} <br> TOTAL: ${box} <br> PROMEDIO: ${avg}<br>UwU <br> ${text} `;
      }
      else{
        document.getElementById("c16").innerHTML = `MÚLTIPLOS: ${abs} <br> SUMA TOTAL: ${box} <br> PROMEDIO: ${avgg} <br> UwU <br> ${text} `;
      }
    }
}

// 17. Promediar los x primeros múltiplos de 2 y determinar si ese promedio es mayor que los y primeros múltiplos de 5 para valores de x y y leídos.
function cycle17(){
  
  //VARIABLES BÁSICAS PARA EL CICLO
  var c17 = document.getElementById("cycle17").value;
  var c17b = document.getElementById("cycle17b").value;
  //VARIABLES PARA UN for X (múltiplos 2)
  var abs = Math.abs(c17);
  var aux = Number.parseInt(c17);
  var avg = 0;
  var box = 0;
  var text = ``;
  //VARIABLES MAX Y MIN PARA UN for Y (múltiplos de 5)
  var absb = Math.abs(c17b);
  var auxb = Number.parseInt(c17b);
  var avgb = 0;
  var boxb = 0;
  var textb = ``;
  
  //IDENTIFICADOR DE NEGATIVOS
  var min = Math.min(aux,auxb);
  var neg = (aux<0 && auxb<0)? `${aux} y ${auxb} son negativos y sho sólo cuento múltiplos hacia arriba, ¡quítales ese menos! (-)`:`${min} es negativo, quítale ese menos (-) que los múltiplos los cuento para arriba`;
  
  
  //BUCLE PARA X
  for (let i = 0; i <= abs; i++) {
    box += 2*i;
    text += `2*${i} = ${i*2}<br> `;
  };
  
  //BUCLE PARA Y
  for (let miau = 0; miau <= absb; miau++) {
    boxb += 5*miau;
    textb += `5*${miau} = ${miau*5}<br> `;
  };

  
  
  //¿QUÉ PROMEDIO ES MAYOR?
  avg = Number.parseInt(box/abs);
  avgg = (box == 0)? 0:avg;

  avgb = Number.parseInt(boxb/absb);
  avggb = (boxb == 0)? 0:avgb;  
  
  var theOne = (avgg>avggb)? `El promedio entero de los ${abs} múltiplos de 2 (${avgg}) es mayor que el de los ${absb} múltiplos de 5 (${avggb}) UwU`:`El promedio entero de los ${abs} múltiplos de 2 (${avgg}) es menor que el de los ${absb} múltiplos de 5 (${avggb}) UwU`;
  var equals = (avgg==avggb)? `El promedio entero de los ${abs} múltiplos de 2 y de los ${absb} múltiplos de 5...¡Es el mismo! ${avgg} UwU`:theOne;


  if (c17 == `` && c17b == ``){
    document.getElementById("c17").innerHTML = ``;
    document.getElementById("c17b").innerHTML = ``;
    document.getElementById("c17c").innerHTML = ``;
  }
  else if (c17 == "-" && c17b == "-"){
    document.getElementById("c17").innerHTML = ``;
    document.getElementById("c17b").innerHTML = ``;
    document.getElementById("c17c").innerHTML = ``;
  }
  else {
    if (c17 == `` || c17b == ``) {
    document.getElementById("c17c").innerHTML = `Bueno, un ${c17}${c17b}... Y la otra casilla qué >:c`;
  }
  else {
      if(c17 < 0 || c17b < 0){
      document.getElementById("c17c").innerHTML = `Oshe, que ${neg} >:c`;
      document.getElementById("c17").innerHTML = `MÚLTIPLOS: ${abs} <br> SUMA TOTAL: ${box}<br>PROMEDIO: ${avgg}<br>UwU <br> ${text} `;
      document.getElementById("c17b").innerHTML = `MÚLTIPLOS: ${absb} <br> SUMA TOTAL: ${boxb}<br>PROMEDIO: ${avggb}<br>UwU <br> ${textb} `;
      }
      else{
        document.getElementById("c17").innerHTML = `MÚLTIPLOS: ${abs} <br> SUMA TOTAL: ${box}<br>PROMEDIO: ${avgg}<br>UwU <br> ${text} `;
        document.getElementById("c17b").innerHTML = `MÚLTIPLOS: ${absb} <br> SUMA TOTAL: ${boxb}<br>PROMEDIO: ${avggb}<br>UwU <br> ${textb} `;
        document.getElementById("c17c").innerHTML = `${equals}`;
      }
    }
  }
}

// 18. Leer dos números enteros y mostrar todos los múltiplos de 5 comprendidos entre el menor y el mayor.
function cycle18(){
    var c18 = document.getElementById("cycle18").value;
    var c18b = document.getElementById("cycle18b").value;
    var aux = Number.parseInt(c18);
    var auxb = Number.parseInt(c18b);
    var text = ``;
    var min = Math.min(aux,auxb);
    var max = Math.max(aux,auxb);

    for (let i = min; i <= max; i++) {
      if ((i%5)==0 && i!=0){
        text += `${i} `;
      }
    }
  
    if ((c18 == `` && c18b == ``) || (c18 == "-" && c18b == "-")) {
      document.getElementById("c18").innerHTML = ``;
    }
    else if (c18 == `` || c18b == ``) {
      document.getElementById("c18").innerHTML = `Bueno, un ${c18}${c18b}... Y la otra casilla qué >:c`;
    }
    else {
      if (text==``){
        document.getElementById("c18").innerHTML = `Entre el ${min} y el ${max} no hay múltiplos del 5 :c Prueba con otros números`;
      }
      else{
        document.getElementById("c18").innerHTML = `${text} UwU`;
      }
    }
}

// 19. Leer un número entero y determinar si es primo.
function cycle19(){
  
    var c19 = document.getElementById("cycle19").value;
    var aux = Math.abs(c19);

      //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;

  for (let numbers = 1; numbers <= aux; numbers++) {
      const prime = c19%numbers;
      if (prime == 0) {
        box.push(numbers);  
      }
    }
    
  var primes = (box.length == 2)? `El número ${c19} es primo UwU ya que...<br>Es múltiplo solo de si mismo y del 1 (${box})`:`El número ${c19} no es primo :c ya que...<br> Es múltiplo de varios números a la vez: <br> Es múltiplo del... ${box}`;
  var ngtv = (c19<0)? `Si sabes que los números negativos no pueden ser negativos ya que deben ser mayores a 1... ¿No? <br> Quítale ese feo menos (-) al pobre ${aux} de encima >:c`:primes;

    if((c19 == `` || c19 == "-" || c19 == 0)){
      document.getElementById("c19").innerHTML = ``;
    }
    else{
    document.getElementById("c19").innerHTML = ngtv; 
    }
}

// 20. Leer un número entero y determinar cuántos dígitos tiene.
function cycle20(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c20 = document.getElementById("cycle20").value;
    var aux = Math.abs(c20);
    var arr = Array.from(String(aux),Number);

    //CONTADOR DE DÍGITOS... Sin ciclos, ni mamadas xd solo arrays hermosos
    var digits = arr.length;
    var uno = (digits==1)? `El número ${c20} tiene ${digits} dígito UwU`:`El número ${c20} tiene ${digits} dígitos UwU`;

    //LET'S GOOO
    if (c20 == `` || c20 == "-" || c20 == 0) {
      document.getElementById("c20").innerHTML = ``;
    }
    else {
      document.getElementById("c20").innerHTML = `${uno}`;
    }
}

// 21. Leer un número entero y determinar a cuánto es igual al suma de sus dígitos.
function cycle21(){
  
  var c21 = document.getElementById("cycle21").value;
  var abs = Math.abs(c21);
  var arr = Array.from(String(abs),Number);
  var length = arr.length;
  var len = (length==1)? `${c21} tiene solo 1 dígito`:`${c21} tiene ${length} dígitos`;

  //En este caso, solution es un filtro de suma del arreglo
  var solution = arr.join('+'); 
  var negative = (c21<0)? `Más el signo menos, claro xd`:``;
  //Personalización del problema
  var summ = 0;
  for (let i = 0; i < arr.length; i++) {
  summ += arr[i];  
  };
  if (c21<0) {summ = summ*(-1)};

  if((c21 == 0 || c21 == `` || c21 == "-")){
    document.getElementById("c21").innerHTML = ``;
  }
  else{
    switch (length) {
      case 1:
        document.getElementById("c21").innerHTML = `${len} y pues es un ${c21} sin más... ¡Dame más números, humano! >:c`;
        break;
        
        default:
        document.getElementById("c21").innerHTML = `${len} y la suma de sus dígitos sería... <br> ${solution} <br> Lo que da un total de ${summ} UwU <br> ${negative}`;
        break;
    }
  }
}

// 22. Leer un número entero y determinar cuántas veces tiene el dígito 1.
function cycle22(){
  //VARIABLES BÁSICAS PARA EL CICLO
  var c22 = document.getElementById("cycle22").value;
  var abs = Math.abs(c22);
  var arr = Array.from(String(abs),Number);
  
  //POSICIÓN (en caso de número de 4 dígitos o más con un 1)
  var pos = [];
  var box = [];
  var sortedPos = [];
  for (let i = 0; i < arr.length; i++) {
    pos = (arr.indexOf(1,i))+1;
    if (pos!=0){
      box.push(pos);
    };
    sortedPos = box.filter((value,index,array)=>array.indexOf(value)==index);
  };
  
  //Escáner de UNOS
  var uno = arr.filter(x=>x==1);
  var totalUnos = (uno.length==1)? `El número ${c22} tiene un 1 :D <br> En la posición n° ${sortedPos} UwU`:`El número ${c22} tiene ${uno.length} UNOS :D <br> En las posiciones n° ${sortedPos} UwU`;
  var ngtv = (c22<0)? `así sea negativo UwU`:``;
  var hafIs = (abs==1)? `Eso es un 1 :D ${ngtv}`:`${totalUnos}`;
  var though = (uno.length>=1)? `${hafIs}`:`El número ${c22} no tiene un 1 en ninguna parte >:c`;
  
  
  //EN BÚSQUEDA DEL 1 
  if (c22 == `` || c22 == "-" || c22 == 0) {
    document.getElementById("c22").innerHTML = ``;
  }
  else {
    document.getElementById("c22").innerHTML = `${though}`;
  }
}

// 23. Leer un número entero y determinar si la suma de sus dígitos es también un número primo.
function cycle23(){
  
  var c23 = document.getElementById("cycle23").value;
  var abs = Math.abs(c23);
  var arr = Array.from(String(abs),Number);
  var length = arr.length;
  var len = (length==1)? `${c23} tiene solo 1 dígito`:`${c23} tiene ${length} dígitos`;

  //En este caso, solution es un filtro de suma del arreglo
  var solution = arr.join('+'); 
  
  //Personalización del problema
  var summ = 0;
  for (let i = 0; i < arr.length; i++) {
    summ += arr[i];  
  };
  if (c23<0) {summ = summ*(-1)};
  var sum = Math.abs(summ);
  
  //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;
  
  for (let numbers = 2; numbers <= sum; numbers++) {
      const prime = sum%numbers;
      if (prime == 0) {
        box.push(numbers);  
      }
    };
    
    var primes = (box.length == 1)? `<br>Ah, y...¡¡${summ} ES PRIMOO!! :DDd`:`<br> ...Igual ${summ} no es primo :c`;
    var negative = (c23<0)? `<br>Más el signo menos, claro xd<br> Por cierto... Los números negativos no pueden ser primos c:`:`${primes}`;
    var neg = (arr.length==1 && c23<0)? `Por cierto... Los números negativos no pueden ser primos c:`:`${primes}`; 

  if((c23 == 0 || c23 == `` || c23 == "-")){
    document.getElementById("c23").innerHTML = ``;
  }
  else{
    switch (length) {
      case 1:
        document.getElementById("c23").innerHTML = `${len} y pues es un ${c23} sin más... ¡Dame más números, humano! >:c ${neg}`;
        break;
        
        default:
        document.getElementById("c23").innerHTML = `${len} y la suma de sus dígitos sería... <br> ${solution} <br> Lo que da un total de ${summ} UwU ${negative}`;
        break;
    }
  }
}

// 24. Leer un número entero y determinar a cuánto es igual al suma de sus dígitos pares.
function cycle24(){
  
  var c24 = document.getElementById("cycle24").value;
  var abs = Math.abs(c24);
  var arr = Array.from(String(abs),Number);
  var length = arr.length;
  var len = (length==1)? `${c24} tiene solo 1 dígito`:`${c24} tiene ${length} dígitos`;

  //En este caso, solution es un filtro de suma del arreglo
  var pair = arr.filter(x=>x%2==0);
  var solution = pair.join('+'); 
  var negative = (c24<0)? `Más el signo menos, claro xd`:``;
  //Personalización del problema
  var summ = 0;
  for (let i = 0; i < arr.length; i++) {
    if (i%2==0){
      summ += arr[i];  
    }
  };
  if (c24<0) {summ = summ*(-1)};

  if((c24 == 0 || c24 == `` || c24 == "-")){
    document.getElementById("c24").innerHTML = ``;
  }
  else{
    switch (length) {
      case 1:
        document.getElementById("c24").innerHTML = `${len} y pues es un ${c24} sin más... ¡Dame más números, humano! >:c`;
        break;
        
        default:
        document.getElementById("c24").innerHTML = `${len} y la suma de sus dígitos pares sería... <br> ${solution} <br> Lo que da un total de ${summ} UwU <br> ${negative}`;
        break;
    }
  }
}

// 25. Leer un número entero y determinar a cuánto es igual el promedio entero de sus dígitos.
function cycle25(){
  
  var c25 = document.getElementById("cycle25").value;
  var abs = Math.abs(c25);
  var arr = Array.from(String(abs),Number);
  var length = arr.length;
  var len = (length==1)? `${c25} tiene solo 1 dígito`:`${c25} tiene ${length} dígitos`;

  //En este caso, solution es un filtro de suma del arreglo
  var solution = arr.join('+'); 
  var negative = (c25<0)? `<br> Más el signo menos, claro xd <br>`:`<br>`;
  //Personalización del problema
  var summ = 0;
  for (let i = 0; i < arr.length; i++) {
    summ += arr[i];  
  };
  if (c25<0) {summ = summ*(-1)};
  var avg = Number.parseInt(summ/length);

  if((c25 == 0 || c25 == `` || c25 == "-")){
    document.getElementById("c25").innerHTML = ``;
  }
  else{
    switch (length) {
      case 1:
        document.getElementById("c25").innerHTML = `${len} y pues es un ${c25} sin más... ¡Dame más números, humano! >:c`;
        break;
        
        default:
        document.getElementById("c25").innerHTML = `${len} y la suma de sus dígitos sería... ${solution} <br> Lo que da un total de ${summ} UwU y al dividir enteros... ${negative} El promedio de la suma de los dígitos del ${c25} equivale a ${avg} ( ${summ} / ${length} = ${avg} ) UwU`;
        break;
    }
  }
}

// 26. Leer un número entero y determinar cuál es el mayor de sus dígitos.
function cycle26(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c26 = document.getElementById("cycle26").value;
    var aux = Math.abs(c26);
    var arr = Array.from(String(aux),Number);
    var length = arr.length;
    
    //MAX 
    var max = Math.max(...arr);
    var ngtv = (c26<0)? `<br> ¡Y me vale si es negativo! >:v`:``;
  
    if (c26 == `` || c26 == "-") {
      document.getElementById("c26").innerHTML = ``;
    }
    else {
      switch (length) {
        case 1:
          document.getElementById("c26").innerHTML = `Eso es un ${c26} y pos... Ajá. ${ngtv}`;
          break;
          
          case 2:
          document.getElementById("c26").innerHTML = `El mayor número de esos dos (${aux}) es el ${max} UwU ${ngtv}`;
          break;

        default:
          document.getElementById("c26").innerHTML = `El mayor dígito en el número ${aux} es el ${max} UwU ${ngtv}`;
          break;
      }
    }
}

// 27. Leer 2 números enteros y determinar cuál de los dos tiene mayor cantidad de dígitos.
function cycle27(){
  //VARIABLES
    var c27 = document.getElementById("cycle27").value;
    var c27b = document.getElementById("cycle27b").value;
    var abs = Math.abs(c27);
    var absb = Math.abs(c27b);

  //ARRAYS
    var arr = Array.from(String(abs),Number);
    var arrb = Array.from(String(absb),Number);

  //WHICH ONE KEEPS MORE DIGITS?
    var length = arr.length;
    var lengthb = arrb.length;
    var high = Math.max(abs,absb);
    var low = Math.min(abs,absb);
    var max = Math.max(length,lengthb);
    var min = Math.min(length,lengthb);
    var plural = (max==1)? `${max} dígito`:`${max} dígitos`;
    var pluralb = (min==1)? `${min} dígito`:`${min} dígitos`;
    var win = `Entre el ${c27} y el ${c27b}, hasta tú mismo, humano, puedes contar que <br> el ${high} tiene más dígitos (${plural}) que el ${low} (${pluralb}) UwU`
    var digits = (length==lengthb)? `Los dos números (${c27} & ${c27b}) tienen la misma cantidad de dígitos: ${max} c:`:win;

    if ((c27 == `` && c27b == ``) || (c27 == "-" && c27b == "-") || (c27 == 0 && c27b == 0)) {
      document.getElementById("c27").innerHTML = ``;
    }
    else if (c27 == 0 || c27b == 0) {
      document.getElementById("c27").innerHTML = `Bueno, un ${c27}${c27b}... Y la otra casilla qué >:c`;
    }
    else {
      document.getElementById("c27").innerHTML = `${digits}`;
    }
}

// 28. Leer 2 números enteros y determinar cual de los dos tiene mayor cantidad de dígitos primos.
function cycle28(){
  //VARIABLES
    var c28 = document.getElementById("cycle28").value;
    var c28b = document.getElementById("cycle28b").value;
    var abs = Math.abs(c28);
    var absb = Math.abs(c28b);

  //ARRAYS
    var arr = Array.from(String(abs),Number);
    var arrb = Array.from(String(absb),Number);

  //ALGORITHM FOR PRIME NUMBERS A >:c
  const primes = [2,3,5,7];

  var box = arr.filter(x=>primes.includes(x));
  var sortbox = box.sort((a,b)=>a-b);

  //ALGORITHM FOR PRIME NUMBERS B >:c
  var boxb = arrb.filter(x=>primes.includes(x));
  var sortboxb = boxb.sort((a,b)=>a-b);

  //WHICH ONE KEEPS MORE PRIME DIGITS?
    var length = box.length;
    var lengthb = boxb.length;
    var singular = (length == 1)? `solo un número primo: <br> el ${c28} tiene al ${sortbox} y el ${c28b} tiene al ${sortboxb}`:`la misma cantidad de dígitos primos: ${length} <br> El ${c28} tiene los primos n° ${sortbox} mientras que el ${c28b} tiene los primos n° ${sortboxb}`;
    var max = (length>lengthb)? `Por ende... El número con más dígitos primos es el ${c28}`:`Por ende... El número con más dígitos primos es el ${c28b}`;
    var plural = (length==1)? `El ${c28} tiene ${length} dígito primo: el n°`:`El ${c28} tiene ${length} dígitos primos: los n°`;
    var pluralb = (lengthb==1)? `El ${c28b} tiene ${lengthb} dígito primo: el n°`:`El ${c28b} tiene ${length} dígitos primos: los n°`;
    var itsOn = `${plural} ${sortbox}`;
    var itsOnb = `${pluralb} ${sortboxb}`;
    var zero = (length == 0)? `El número ${c28} no tiene dígitos primos :C`:itsOn;
    var zeroB = (lengthb == 0)? `El número ${c28b} no tiene dígitos primos :C`:itsOnb;

    var win = `${zero} <br> ${zeroB} <br> ${max} UwU`;
    var digits = (length==lengthb)? `Ambos números (${c28} & ${c28b}) tienen ${singular} c:`:win;
    var ngtv = (c28<0||c28b<0)? `<br>Por cierto... Los números negativos no pueden ser primos... <br> Pero como andamos hablando de dígitos, te la pasaré esta vez... e,e`:``;

    //LET'S GET STARTED
    if ((c28 == `` && c28b == ``) || (c28 == "-" && c28b == "-") || (c28 == 0 && c28b == 0)) {
      document.getElementById("c28").innerHTML = ``;
    }
    else if (c28 == `` || c28b == ``) {
      document.getElementById("c28").innerHTML = `Bueno, un ${c28}${c28b}... Y la otra casilla qué >:c`;
    }
    else {
      document.getElementById("c28").innerHTML = `${digits} ${ngtv}`;
    }
}

// 29. Leer un número entero y determinar a cuánto es igual el primero de sus dígitos.
function cycle29(){

  //VARIABLES ELEMENTALES 
  var c29 = document.getElementById("cycle29").value;
  var abs = Math.abs(c29);

  //ARREGLO
  var arr = Array.from(String(abs),Number);

  //PRIMER DÍGITO
  var firstDigit = arr[0];

  //PERSONALIZACIÓN DE LA SOLUCIÓN
  var ngtv = (c29<0)? `<br> ¡Y me vale que sea negativo! >:v xd`:``;

  //ESQUEMA DE CASOS
  if (c29 == `-` || c29 == `` || c29 == 0) {
    document.getElementById("c29").innerHTML = ``;
  }
  else {
    document.getElementById("c29").innerHTML = `El primer dígito del ${c29} es el ${firstDigit} UwU ${ngtv}`;
  }
}

// 30. Leer un número entero y mostrar todos sus componentes numéricos o sea aquellos para quienes él sea un múltiplo.
function cycle30(){
    //VARIABLES BÁSICAS PARA EL CICLO
    var c30 = document.getElementById("cycle30").value;
    var abs = Math.abs(c30);
    
    //ARREGLOS PARA DEPOSITAR Y ORDENAR LOS COMPONENTES NUMÉRICOS
    var boxx = [];
    
    for (let i = 1; i <= abs; i++) {
      if (abs%i==0) {
        boxx.push(i);
      };
    };
    
    var comp = boxx.sort((a,b)=>a-b).filter((value,index,array)=>array.indexOf(value)===index);
    
    //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;

  for (let numbers = 2; numbers <= abs; numbers++) {
      const prime = c30%numbers;
      if (prime == 0) {
        box.push(numbers);  
      };
    };
    
  var primes = (box.length == 1)? `(es un número primo UwU)`:``;


    if (c30 == `` || c30 == "-") {
      document.getElementById("c30").innerHTML = ``;
    }
    else {
        document.getElementById("c30").innerHTML = `Los componentes numéricos o números de los que <br> el ${c30} es múltiplo, son los n° ${comp} ${primes}`;
    }
}

// 31. Leer números hasta que digiten 0 y determinar a cuánto es igual el promedio de los números terminados en 5.
  
  //Definimos ENTER como botón para el input 
  var i31 = document.getElementById("cycle31");
  i31.addEventListener('keydown', interactive31, false);

  //Variables requeridas
  var spanCycle31 = document.getElementById("c31");
  var spanCycle31c = document.getElementById("c31c");
  var arrCycle31 = [];
  var sorCycle31 = [];
  var endCycle31 = [];
  var fivesFilter = [];
  var element = 0;
  var avg = 0;
  var zero = 0;
  var zero2 = 0;
  var shit = 0;

  //Función que se ejecutará cuando se oprima ENTER dentro del input 31 de la sección ciclos
  function interactive31(e){
    if (e.keyCode === 13) {
      
      //Variables "locales"
      var i31 = document.getElementById("cycle31");
      var number = i31.value;
      var c31 = document.getElementById("c31");
      
      //Esquema de casos
      if ( number>0 || number<0 ){
        arrCycle31.push(Number.parseInt(number));
        sorCycle31 = arrCycle31.sort((a,b)=>a-b).filter((value,index,array)=>array.indexOf(value)===index);
        endCycle31 = sorCycle31.join(', ');
        c31.innerHTML = `Números registrados: ${endCycle31}`;
        fivesFilter = sorCycle31.filter(x=>(Math.abs(x%10))==5);
        element = eval(fivesFilter.join("+"));
        avg = Number.parseInt((element)/(fivesFilter.length));
        i31.value = ``;
        if (sorCycle31.length>=1){
          document.getElementById("c31c").innerHTML = `Cuando hayas acabado de registrar números, <br> ingresa el CERO para mostrarte el resultado c:`;
        }
      }
      else if (number==``){
      }
      else {
        i31.value = ``;

        if (sorCycle31.length==0){
          document.getElementById("c31c").innerHTML = `>:CC ¡Te dije que escribieras primero un número diferente a CERO, humano! <br> ¿Cómo quieres que te calcule nada si no me has registrado números? >:c`;
          c31.innerHTML = ``;
        }
        else{
          arrCycle31.push(Number.parseInt(number));
          //Personalización de la solución
          var plural = (fivesFilter.length==1)? `${fivesFilter.length} termina en 5: ${fivesFilter.join(', ')} <br> Y pues ni modo a sacarle promedio a un solo número... xd Ingresa más números UwU`:`${fivesFilter.length} terminan en 5: ${fivesFilter.join(', ')} <br> El promedio de estos números [ ( ${fivesFilter.join(" + ")} ) / ${fivesFilter.length} ] = ( ${element} / ${fivesFilter.length} ) es ${avg} UwU`;
          var ninguno = (fivesFilter.length==0)? `ninguno termina en 5 :C <br> Ingresa más números, humano (y ojalá que terminen en 5 e,e)`:plural;
          //Solución
          document.getElementById("c31c").innerHTML = `De los números que me registraste, ${ninguno} <br> Si ingresas nuevamente el cero, puedo reiniciarte los números registrados, humano c:`;
          //El cero como botón de reinicio
          zero = arrCycle31[(arrCycle31.length)-1]; // El último número ingresado
          zero2 = arrCycle31[(arrCycle31.length)-2]; //El penúltimo número ingresado
          if (zero == 0 ){
            shit = 69;
          }
          else{
            shit = 98;
          };
          if ( zero == 0 && zero2 == 0){
            c31.innerHTML = `Has reiniciado los números registrados con éxito :D`;
            document.getElementById("c31c").innerHTML = `Te invito a registrar nuevos números (obvio distintos a cero)`;
            arrCycle31 = [];
            sorCycle31 = [];
            endCycle31 = [];
            fivesFilter = [];
            element = 0;
            avg = 0;
            zero = 0;
            zero2 = 0;
            shit = 0;
          };
        }
      }
    }
  }
  

    //Creamos una función para que aparezca un texto cuando el usuario escribe
    function cycle31 () {
      var c31 = document.getElementById("cycle31").value;
      var aux = Number.parseInt(c31);
      var five = (aux%10);
  

      if (c31 == `` || c31 == '-'){
        document.getElementById("c31b").innerHTML = ``;
      }
      else {
        if (five==5 && aux!=5){
          document.getElementById("c31b").innerHTML = `¡Genial! Un número que termina en 5 c:< Oprime ENTER para yo registrarlo UwU`;
        }
        else if (c31 == 0 && sorCycle31.length==0){
          document.getElementById("c31b").innerHTML = `Oshe, regístrame números primero, antes de pensar en ceros >:c`;
        }
        else{
          if (c31 == 0){
            if (shit == 69){
              document.getElementById("c31b").innerHTML = `¿Quieres reiniciar los números registrados? UwU`;
            }
            else{
              document.getElementById("c31b").innerHTML = `¿Quieres calcular ya el resultado? UwU`;
            }
          }
          else{
            if (sorCycle31.includes(aux)){
              document.getElementById("c31b").innerHTML = `Ya registraste al ${aux}, intenta con otro número`;
            }
            else{
              document.getElementById("c31b").innerHTML = `¡Genial! Un ${aux} c: Oprime ENTER para yo registrarlo UwU`;
            }
          }
        }
      }
    }

// 32. Leer números hasta que digiten 0 y determinar a cuanto es igual el promedio entero de los número primos leídos.
  
  //Definimos ENTER como botón para el input 
  var i32 = document.getElementById("cycle32");
  i32.addEventListener('keydown', interactive32, false);

  //Variables requeridas
  var spanCycle32 = document.getElementById("c32");
  var spanCycle32c = document.getElementById("c32c");
  var arrCycle32 = [];
  var sorCycle32 = [];
  var endCycle32 = [];
  var primesFilter = [];
  var sortedFilter = [];
  var element32 = 0;
  var avg32 = 0;
  var zero32 = 0;
  var zero232 = 0;
  var shit32 = 0;
  var box = [];


  //Función que se ejecutará cuando se oprima ENTER dentro del input 32 de la sección ciclos
  function interactive32(e){
    if (e.keyCode === 13) {
      
      //Variables "locales"
      var i32 = document.getElementById("cycle32");
      var number = i32.value;
      var c32 = document.getElementById("c32");

      //Esquema de casos
      if ( number>0 || number<0 ){
        arrCycle32.push(Number.parseInt(number));
        sorCycle32 = arrCycle32.sort((a,b)=>a-b).filter((value,index,array)=>array.indexOf(value)===index);
        endCycle32 = sorCycle32.join(', ');
        c32.innerHTML = `Números registrados: ${endCycle32}`;
        element = eval(primesFilter.join("+"));
        avg = Number.parseInt((element)/(primesFilter.length));
        i32.value = ``;
        //ALGORITHM FOR PRIME NUMBERS >:c
        for (let index = 0; index < sorCycle32.length; index++) {
          const miau = sorCycle32[index];
          for (let numbers = 2; numbers <= miau; numbers++) {
            const prime = miau%numbers;
            if (prime == 0) {
              box.push(numbers);
            };
            if (box.length == 1) {
              primesFilter.push(miau);
            };
            box = [];
          };
        };
        sortedFilter = primesFilter.filter((value,index,array)=>array.indexOf(value)===index);
        if (sorCycle32.length>=1){
          document.getElementById("c32c").innerHTML = `Cuando hayas acabado de registrar números, <br> ingresa el CERO para mostrarte el resultado c:`;
        };
      }
      else if (number==``){
      }
      else {
        i32.value = ``;

        if (sorCycle32.length==0){
          document.getElementById("c32c").innerHTML = `>:CC ¡Te dije que escribieras primero un número diferente a CERO, humano! <br> ¿Cómo quieres que te calcule nada si no me has registrado números? >:c`;
          c32.innerHTML = ``;
        }
        else{
          arrCycle32.push(Number.parseInt(number));
          //Personalización de la solución
          var plural = (sortedFilter.length==1)? `${sortedFilter.length} es primo: ${sortedFilter.join(', ')} <br> Y pues ni modo a sacarle promedio a un solo número... xd Ingresa más números UwU`:`${sortedFilter.length} son primos: ${sortedFilter.join(', ')} <br> El promedio de estos números [ ( ${sortedFilter.join(" + ")} ) / ${sortedFilter.length} ] = ( ${element} / ${sortedFilter.length} ) es ${avg} UwU`;
          var ninguno = (sortedFilter.length==0)? `ninguno es primo :C <br> Ingresa más números, humano (y ojalá primos e,e)`:plural;
          //Solución
          document.getElementById("c32c").innerHTML = `De los números que me registraste, ${ninguno} <br> Si ingresas nuevamente el cero, puedo reiniciarte los números registrados, humano c:`;
          //El cero como botón de reinicio
          zero = arrCycle32[(arrCycle32.length)-1]; // El último número ingresado
          zero2 = arrCycle32[(arrCycle32.length)-2]; //El penúltimo número ingresado
          if (zero == 0 ){
            shit = 69;
          }
          else{
            shit = 98;
          };
          if ( zero == 0 && zero2 == 0){
            c32.innerHTML = `Has reiniciado los números registrados con éxito :D`;
            document.getElementById("c32c").innerHTML = `Te invito a registrar nuevos números (obvio distintos a cero)`;
            arrCycle32 = [];
            sorCycle32 = [];
            endCycle32 = [];
            primesFilter = [];
            element = 0;
            avg = 0;
            zero = 0;
            zero2 = 0;
            shit = 0;
          };
        }
      }
    }
  }
  

    //Creamos una función para que aparezca un texto cuando el usuario escribe
    function cycle32 () {
      var c32 = document.getElementById("cycle32").value;
      var aux = Number.parseInt(c32);
      var abs = Math.abs(c32);
  
      //ALGORITHM FOR PRIME NUMBERS >:c
      var box = [];

      for (let numbers = 2; numbers <= abs; numbers++) {
          const prime = c32%numbers;
          if (prime == 0) {
            box.push(numbers);  
          }
      };
    
      var primes = (box.length == 1)? `es primo UwU`:`no es primo :c`;
      var ngtv = (c32<0)? `... En su versión positiva. <br> Recuerda que los negativos no son primos e.e`:` c:`;

      if (c32 == `` || c32 == '-'){
        document.getElementById("c32b").innerHTML = ``;
      }
      else {
        if (primes == `es primo UwU`){
          document.getElementById("c32b").innerHTML = `¡Genial! El ${abs} es primo${ngtv} <br> Oprime ENTER para yo registrarlo UwU`;
        }
        else if (c32 == 0 && sorCycle32.length==0){
          document.getElementById("c32b").innerHTML = `Oshe, regístrame números primero, antes de pensar en ceros >:c`;
        }
        else{
          if (c32 == 0){
            if (shit == 69){
              document.getElementById("c32b").innerHTML = `¿Quieres reiniciar los números registrados? UwU`;
            }
            else{
              document.getElementById("c32b").innerHTML = `¿Quieres calcular ya el resultado? UwU`;
            }
          }
          else{
            if (sorCycle32.includes(aux)){
              document.getElementById("c32b").innerHTML = `Ya registraste al ${aux}, intenta con otro número`;
            }
            else{
              document.getElementById("c32b").innerHTML = `¡Genial! Un ${aux} c: aunque no es primo... Igual si quieres lo registro <br> Oprime ENTER para yo registrarlo UwU`;
            }
          }
        }
      }
    }

// 33. Si 32768 es el tope superior para los números enteros, determinar cuál es el número primo mas cercano por debajo de él.
//FUNCIONES PARA LOS BOTONES
var button33 = document.getElementById("cycle33");
function onMouseOverLight33(){
  button33.style.border="3px solid #ffaa22";
  button33.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight33(){
  button33.style.border='3px solid #f7b64e';
  button33.style.color='#333333';
  button33.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark33(){
  button33.style.border="3px solid #ffaa22";
  button33.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark33(){
  button33.style.border = '3px solid #ffaa22';
  button33.style.color = 'rgb(31, 11, 11)';
  button33.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark33(){
  button33.style.border="1px solid #ffaa22";
  button33.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button33.style.color="rgb(31, 11, 11)";
	button33.style.top="1px";
};
function onMouseDownLight33(){
  button33.style.border="1px solid #ffa22";
  button33.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc33(){
  //SWITCH
  document.getElementById("c33").innerHTML = ``;
  button33.onclick = function () {cycle33()};
  //OH, STYLO
  button33.innerHTML = `LET'S GOOO >:C`;
  button33.onmouseover = function (){onMouseOverLight33()};
  button33.onmouseout = function (){onMouseOutLight33()};
  button33.onmousedown = function (){onMouseDownDark33()};
}

function cycle33() {
  // Si 32768 es el tope superior para los números enteros, determinar cuál es el número primo mas cercano por debajo de él.
  
  //SOLUTION
  //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = [];
  var subject = 0;
  var lastFive = [];
  
  for (let index = 32700; index <= 32768; index++) {
    subject = index;
    for (let numbers = 2; numbers <= subject; numbers++) {
      const prime = subject%numbers;
      if (prime == 0) {
        box.push(numbers);
      };
    };
    if (box.length==1){
      primes.push(subject);
    };
    lastFive = primes.join(`,  `);
    document.getElementById("c33").innerHTML = `ÚLTIMO PRIMO:  ${primes[primes.length-1]} c: <BR> ÚLTIMOS 5 PRIMOS:  ${lastFive} UwU`;
    box = [];
  };
  
    
    //SWITCH
    button33.onclick = function () {buttonc33()};
    //OH, STYLO
    button33.innerHTML = `UwU`;
    button33.onmouseover = function (){onMouseOverDark33()};
    button33.onmouseout = function (){onMouseOutDark33()};
    button33.onmousedown = function (){onMouseDownLight33()};
}

// 34. Generar los números del 1 al 10 utilizando un ciclo que vaya de 10 a 1.
//FUNCIONES PARA LOS BOTONES
var button34 = document.getElementById("cycle34");
function onMouseOverLight34(){
  button34.style.border="3px solid #ffaa22";
  button34.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight34(){
  button34.style.border='3px solid #f7b64e';
  button34.style.color='#333333';
  button34.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark34(){
  button34.style.border="3px solid #ffaa22";
  button34.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark34(){
  button34.style.border = '3px solid #ffaa22';
  button34.style.color = 'rgb(31, 11, 11)';
  button34.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark34(){
  button34.style.border="1px solid #ffaa22";
  button34.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button34.style.color="rgb(31, 11, 11)";
	button34.style.top="1px";
};
function onMouseDownLight34(){
  button34.style.border="1px solid #ffa22";
  button34.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc34(){
  //SWITCH
  document.getElementById("c34").innerHTML = ``;
  button34.onclick = function () {cycle34()};
  //OH, STYLO
  button34.innerHTML = `LET'S GOOO >:C`;
  button34.onmouseover = function (){onMouseOverLight34()};
  button34.onmouseout = function (){onMouseOutLight34()};
  button34.onmousedown = function (){onMouseDownDark34()};
}

function cycle34() {
  
  //SOLUTION
  var count34 = ``;

    for (let index = 10; index >= 1; index--) {
      count34 += `${index} `;
    };

    document.getElementById("c34").innerHTML = `${count34} UwU`;
    
    //SWITCH
    button34.onclick = function () {buttonc34()};
    //OH, STYLO
    button34.innerHTML = `UwU`;
    button34.onmouseover = function (){onMouseOverDark34()};
    button34.onmouseout = function (){onMouseOutDark34()};
    button34.onmousedown = function (){onMouseDownLight34()};
}
// 35. Leer dos números enteros y determinar a cuánto es igual el producto mutuo del primer dígito de cada uno.
function cycle35(){
  //variables
  var c35 = document.getElementById("cycle35").value;
  var c35b = document.getElementById("cycle35b").value;

  //Valores absolutos
  var abs = Math.abs(c35);
  var absb = Math.abs(c35b);

  //arrays
  var arr = Array.from(String(abs),Number);
  var arrb = Array.from(String(absb),Number);
  var product = arr[0]*arrb[0];
  var ngtv = ((c35*c35b)<0)? product*-1:product;
  var miau = (c35<0||c35b<0)? `Siempre respetando signos`:``;
  
  //Personalización del problema
  var digits = (arr.length==1)? `PRIMER NÚMERO: ${c35}`:`PRIMER DÍGITO DE ${c35}: ${arr[0]}`;
  var digitsb = (arrb.length==1)? `SEGUNDO NÚMERO: ${c35b}`:`PRIMER DÍGITO DE ${c35b}: ${arrb[0]}`;

  //Esquema de casos
  if ((c35 == 0 && c35b == 0)) {
    document.getElementById("c35").innerHTML = ``;
  }
  else if((c35 == "-" && c35b == "-")){
    document.getElementById("c35").innerHTML = ``; 
  }
  else {
    if (c35 == 0 || c35b == 0) {                                                                                           //PARA EJERCICIOS CON MÚLTIPLES VARIABLES 
      document.getElementById("c35").innerHTML = `Okay, un ${c35}${c35b}. Pero ponme un número en el otro cuadro también >:c`;
    }
    else{
      document.getElementById("c35").innerHTML = `${digits}<br> ${digitsb} <br> RESULTADO DEL PRODUCTO: ${ngtv} <br> ${miau} UwU`; 
    } 
  }  
}


// 36. Mostrar en pantalla la tabla de multiplicar del número 5.
//FUNCIONES PARA LOS BOTONES
var button36 = document.getElementById("cycle36");
function onMouseOverLight36(){
  button36.style.border="3px solid #ffaa22";
  button36.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight36(){
  button36.style.border='3px solid #f7b64e';
  button36.style.color='#333333';
  button36.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark36(){
  button36.style.border="3px solid #ffaa22";
  button36.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark36(){
  button36.style.border = '3px solid #ffaa22';
  button36.style.color = 'rgb(31, 11, 11)';
  button36.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark36(){
  button36.style.border="1px solid #ffaa22";
  button36.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button36.style.color="rgb(31, 11, 11)";
	button36.style.top="1px";
};
function onMouseDownLight36(){
  button36.style.border="1px solid #ffa22";
  button36.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc36(){
  //SWITCH
  document.getElementById("c36").innerHTML = ``;
  button36.onclick = function () {cycle36()};
  //OH, STYLO
  button36.innerHTML = `LET'S GOOO >:C`;
  button36.onmouseover = function (){onMouseOverLight36()};
  button36.onmouseout = function (){onMouseOutLight36()};
  button36.onmousedown = function (){onMouseDownDark36()};
}

function cycle36() {
  
  //SOLUTION
  var count36 = ``;

    for (let index = 0; index <= 10; index++) {
      count36 += `5 * ${index} = ${5*index} <br>`;
    }

  document.getElementById("c36").innerHTML = `UwU <br> ${count36}`;
    
    //SWITCH
    button36.onclick = function () {buttonc36()};
    //OH, STYLO
    button36.innerHTML = `UwU`;
    button36.onmouseover = function (){onMouseOverDark36()};
    button36.onmouseout = function (){onMouseOutDark36()};
    button36.onmousedown = function (){onMouseDownLight36()};
}

// 37. Generar todas las tablas de multiplicar del 1 al 10.
//FUNCIONES PARA LOS BOTONES
var button37 = document.getElementById("cycle37");
function onMouseOverLight37(){
  button37.style.border="3px solid #ffaa22";
  button37.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight37(){
  button37.style.border='3px solid #f7b64e';
  button37.style.color='#333333';
  button37.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark37(){
  button37.style.border="3px solid #ffaa22";
  button37.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark37(){
  button37.style.border = '3px solid #ffaa22';
  button37.style.color = 'rgb(31, 11, 11)';
  button37.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark37(){
  button37.style.border="1px solid #ffaa22";
  button37.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button37.style.color="rgb(31, 11, 11)";
	button37.style.top="1px";
};
function onMouseDownLight37(){
  button37.style.border="1px solid #ffa22";
  button37.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc37(){
  //SWITCH
  for (let index = 1; index <= 10; index++) {
    document.getElementById(`c37${index}`).innerHTML = ``;
  };
  button37.onclick = function () {cycle37()};
  //OH, STYLO
  button37.innerHTML = `LET'S GOOO >:C`;
  button37.onmouseover = function (){onMouseOverLight37()};
  button37.onmouseout = function (){onMouseOutLight37()};
  button37.onmousedown = function (){onMouseDownDark37()};
}

function cycle37() {
  
  //SOLUTION
  var count37 = ``;
  var number = 0; 

  for (let i = 1; i <= 10; i++) {    
    number = i;
    for (let n = 0; n <= 10; n++) {
      count37 += `${number} * ${n} = ${number*n}<br>`
    };  
    document.getElementById(`c37${i}`).innerHTML = `${count37}`;
    count37 = ``;
  };
    
    //SWITCH
    button37.onclick = function () {buttonc37()};
    //OH, STYLO
    button37.innerHTML = `UwU`;
    button37.onmouseover = function (){onMouseOverDark37()};
    button37.onmouseout = function (){onMouseOutDark37()};
    button37.onmousedown = function (){onMouseDownLight37()};
}

// 38. Leer un número entero y mostrar en pantalla su tabla de multiplicar.
function cycle38(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c38 = document.getElementById("cycle38").value;
    var aux = Number.parseInt(c38);
  
  //SOLUTION
  var count38 = ``;

    for (let index = 0; index <= 10; index++) {
      count38 += `${aux} * ${index} = ${aux*index} <br>`;
    }

  //CASOS    
    if (c38 == `` || c38 == "-") {
      document.getElementById("c38").innerHTML = ``;
    }
    else {
      document.getElementById("c38").innerHTML = `UwU <br> ${count38}`;
    }
    
}

// 39. Se define la serie de Fibonacci como la serie que comienza con los dígitos 1 y 0 y va sumando progresivamente los dos últimos elementos de la serie, así:
//     0 1 1 2 3 5 8 13 21 34.......
//     Utilizando el concepto de ciclo generar la serie de Fibonacci hasta llegar o sobrepasas el número 10.000.
//FUNCIONES PARA LOS BOTONES
var button39 = document.getElementById("cycle39");
function onMouseOverLight39(){
  button39.style.border="3px solid #ffaa22";
  button39.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight39(){
  button39.style.border='3px solid #f7b64e';
  button39.style.color='#333333';
  button39.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark39(){
  button39.style.border="3px solid #ffaa22";
  button39.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark39(){
  button39.style.border = '3px solid #ffaa22';
  button39.style.color = 'rgb(31, 11, 11)';
  button39.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark39(){
  button39.style.border="1px solid #ffaa22";
  button39.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button39.style.color="rgb(31, 11, 11)";
	button39.style.top="1px";
};
function onMouseDownLight39(){
  button39.style.border="1px solid #ffa22";
  button39.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc39(){
  //SWITCH
  document.getElementById("c39").innerHTML = ``;
  button39.onclick = function () {cycle39()};
  //OH, STYLO
  button39.innerHTML = `LET'S GOOO >:C`;
  button39.onmouseover = function (){onMouseOverLight39()};
  button39.onmouseout = function (){onMouseOutLight39()};
  button39.onmousedown = function (){onMouseDownDark39()};
}

function cycle39() {
  
  //FIBONNACI
  a = 0;
  b = 1;
  text = ``;

  for (let fibo = 0; fibo <= 11000; fibo = a+b) {
    text += `${fibo}`;
    a = b;
    b = fibo;

    if (fibo<10000){
      text += `, `;
    }
    else {
      text += `...`;
    };
  };
  
  document.getElementById("c39").innerHTML = `${text} <br> UwU`;
    
    //SWITCH
    button39.onclick = function () {buttonc39()};
    //OH, STYLO
    button39.innerHTML = `UwU`;
    button39.onmouseover = function (){onMouseOverDark39()};
    button39.onmouseout = function (){onMouseOutDark39()};
    button39.onmousedown = function (){onMouseDownLight39()};
}

// 40. Leer un número de dos dígitos y determinar si pertenece a la serie de Fibonacci.
function cycle40(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c40 = document.getElementById("cycle40").value;
    var abs = Math.abs(c40);
    var arr = Array.from(String(abs),Number);
    var length = arr.length;
  
    //FIBONACCI
  var a = 0;
  var b = 1;
  var box = [];

  for (let fibo = 0; fibo <= 11000; fibo = a+b) {
    box.push(fibo);
    a = b;
    b = fibo;
  };

  var fibou = box.filter(x=>x==abs);
  var ngtv = (c40<0)? `<br> Aunque es negativo... Pero eso le quitas el menos (-) y ya queda xd UwU`:``;
  var solution = (fibou.length==1 || abs == 1)? `PERTENECE A LA SERIE FIBONACCI :DD ${ngtv}`:`no pertenece a la serie FIBONACCI :c Prueba con otro número <br> ...En el ejercicio anterior tienes la serie hasta el n° 10.000 *guiño guiño* `;
  var digits = (length==1)? `dígito`:`dígitos`;
  var fiboFilter = (fibou.length==1 || abs == 1)? `y es una pena porque...<br> SI ${solution}`:`<br>...Y de todas maneras, ${solution}`;
  var twoDigits = (length==2)? `Aunque el ${c40} tiene ${length} ${digits}, ${solution}`:`El ${c40} no tiene 2 dígitos sino ${length} :C ${fiboFilter}`;
  var fibonacci = (length==2 && fibou.length==1)? `El ${c40} no sólo tiene ${length} ${digits}, sino que también... ${solution} <br> AWIWIIIIIIIIIIIIII UwUwUwUwUwUwUwU xd`:`${twoDigits}`;
  
  
    if (c40 == `` || c40 == "-") {
      document.getElementById("c40").innerHTML = ``;
    }
    else {
      switch (length) {
        case 2:
          document.getElementById("c40").innerHTML = ` ${fibonacci}   `;
          break;
          
        default:
          document.getElementById("c40").innerHTML = `${fibonacci}   `;
          break;
      }
    }
}

// 41. Determinar a cuánto es igual la suma de los elementos de la serie de Fibonacci entre 0 y 100.
//FUNCIONES PARA LOS BOTONES
var button41 = document.getElementById("cycle41");
function onMouseOverLight41(){
  button41.style.border="3px solid #ffaa22";
  button41.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight41(){
  button41.style.border='3px solid #f7b64e';
  button41.style.color='#333333';
  button41.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark41(){
  button41.style.border="3px solid #ffaa22";
  button41.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark41(){
  button41.style.border = '3px solid #ffaa22';
  button41.style.color = 'rgb(31, 11, 11)';
  button41.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark41(){
  button41.style.border="1px solid #ffaa22";
  button41.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button41.style.color="rgb(31, 11, 11)";
	button41.style.top="1px";
};
function onMouseDownLight41(){
  button41.style.border="1px solid #ffa22";
  button41.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc41(){
  //SWITCH
  document.getElementById("c41").innerHTML = ``;
  button41.onclick = function () {cycle41()};
  //OH, STYLO
  button41.innerHTML = `LET'S GOOO >:C`;
  button41.onmouseover = function (){onMouseOverLight41()};
  button41.onmouseout = function (){onMouseOutLight41()};
  button41.onmousedown = function (){onMouseDownDark41()};
}

function cycle41() {
  
    //FIBONACCI
  a = 0;
  b = 1;
  text = ``;
  summ = 0;

  for (let fibo = 0; fibo <= 100; fibo = a+b) {

    //FOR TEXTING FIBO SERIE
    text += `${fibo}`;
    a = b;
    b = fibo;

    if (fibo<80){
      text += ` + `;
    }
    else {
      text += ` = ...`;
    };
    //FOR SUMMARIZE THAT FIBO SERIE TIL 100
    summ += fibo;

  };
  
  document.getElementById("c41").innerHTML = `${text} <br> ¡¡¡ ${summ} !!! Es el total de sumar la serie fibonacci hasta 100 UwU`;
    
    //SWITCH
    button41.onclick = function () {buttonc41()};
    //OH, STYLO
    button41.innerHTML = `UwU`;
    button41.onmouseover = function (){onMouseOverDark41()};
    button41.onmouseout = function (){onMouseOutDark41()};
    button41.onmousedown = function (){onMouseDownLight41()};
}

// 42. Determinar a cuánto es igual el promedio entero de los elementos de la serie de Fibonacci entre 0 y 1000.
//FUNCIONES PARA LOS BOTONES
var button42 = document.getElementById("cycle42");
function onMouseOverLight42(){
  button42.style.border="3px solid #ffaa22";
  button42.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight42(){
  button42.style.border='3px solid #f7b64e';
  button42.style.color='#333333';
  button42.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark42(){
  button42.style.border="3px solid #ffaa22";
  button42.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark42(){
  button42.style.border = '3px solid #ffaa22';
  button42.style.color = 'rgb(31, 11, 11)';
  button42.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark42(){
  button42.style.border="1px solid #ffaa22";
  button42.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button42.style.color="rgb(31, 11, 11)";
	button42.style.top="1px";
};
function onMouseDownLight42(){
  button42.style.border="1px solid #ffa22";
  button42.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc42(){
  //SWITCH
  document.getElementById("c42").innerHTML = ``;
  button42.onclick = function () {cycle42()};
  //OH, STYLO
  button42.innerHTML = `LET'S GOOO >:C`;
  button42.onmouseover = function (){onMouseOverLight42()};
  button42.onmouseout = function (){onMouseOutLight42()};
  button42.onmousedown = function (){onMouseDownDark42()};
}

function cycle42() {
  
    //FIBONACCI
  var a = 0;
  var b = 1;
  var text = ``;
  var summ = 0;
  var box = [];

  for (let fibo = 0; fibo <= 1000; fibo = a+b) {

    //FOR TEXTING FIBO SERIE
    text += `${fibo}`;
    a = b;
    b = fibo;

    if (fibo<900){
      text += ` + `;
    }
    else {
      text += ` = ...`;
    };
    //FOR SUMMARIZE THAT FIBO SERIE 
    summ += fibo;
    box.push(fibo);
  };

    var avg = Number.parseInt(summ/box.length);
  
  document.getElementById("c42").innerHTML = `${text} <br> ¡¡¡ ${summ} !!! Es el total de sumar la serie fibonacci hasta 1000 UwU <br> Y el promedio entero de esta serie fibonacci hasta 1000 es ${avg} ( ${summ} / ${box.length} c: )`;
    
    //SWITCH
    button42.onclick = function () {buttonc42()};
    //OH, STYLO
    button42.innerHTML = `UwU`;
    button42.onmouseover = function (){onMouseOverDark42()};
    button42.onmouseout = function (){onMouseOutDark42()};
    button42.onmousedown = function (){onMouseDownLight42()};
}

// 43. Determinar cuántos elementos de la serie de Fibonacci se encuentran entre 1000 y 2000.
//FUNCIONES PARA LOS BOTONES
var button43 = document.getElementById("cycle43");
function onMouseOverLight43(){
  button43.style.border="3px solid #ffaa22";
  button43.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight43(){
  button43.style.border='3px solid #f7b64e';
  button43.style.color='#333333';
  button43.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark43(){
  button43.style.border="3px solid #ffaa22";
  button43.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark43(){
  button43.style.border = '3px solid #ffaa22';
  button43.style.color = 'rgb(31, 11, 11)';
  button43.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark43(){
  button43.style.border="1px solid #ffaa22";
  button43.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button43.style.color="rgb(31, 11, 11)";
	button43.style.top="1px";
};
function onMouseDownLight43(){
  button43.style.border="1px solid #ffa22";
  button43.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc43(){
  //SWITCH
  document.getElementById("c43").innerHTML = ``;
  button43.onclick = function () {cycle43()};
  //OH, STYLO
  button43.innerHTML = `LET'S GOOO >:C`;
  button43.onmouseover = function (){onMouseOverLight43()};
  button43.onmouseout = function (){onMouseOutLight43()};
  button43.onmousedown = function (){onMouseDownDark43()};
}

function cycle43() {
  
    //FIBONACCI
  a = 0;
  b = 1;
  text = ``;
  summ = 0;
  box = [];

  for (let fibo = 0; fibo <= 3000; fibo = a+b) {

    //FOR TEXTING FIBO SERIE
    text += `${fibo}`;
    a = b;
    b = fibo;
    
    if (fibo<2500){
      text += `, `;
    }
    else {
      text += `...`;
    };
    //FOR SUMMARIZE THAT FIBO SERIE TIL 100
    summ += fibo;
    box.push(fibo);
  };

  howMany = box.length;

  document.getElementById("c43").innerHTML = `Entre el 1000 y el 2000 sólo hay un número fibonacci: el 1597 <br> Aquí abajo te los dejo por si no me crees UwU <br> ${text} xd`;
    
    //SWITCH
    button43.onclick = function () {buttonc43()};
    //OH, STYLO
    button43.innerHTML = `UwU`;
    button43.onmouseover = function (){onMouseOverDark43()};
    button43.onmouseout = function (){onMouseOutDark43()};
    button43.onmousedown = function (){onMouseDownLight43()};
}

// 44. Leer un número y calcularle su factorial.
function cycle44(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c44 = document.getElementById("cycle44").value;
    var aux = Math.abs(c44);
    var text = ``;
    
    //FACTOR NUMBERS!
    var fact = 1;
    for (let i = 1; i <= aux; i++) {
      //ALGORITHM FOR TEXT      
      text += `${i}`;
      if (i < aux){
        text += ` * `;
      }
      else {
        text += ` = `;
      }

      //ALGORITHM FOR RESULT
      fact = fact*i;
    };

    ngtv = (c44<0)? `<br> Aunque por definición, <br> los factoriales no pueden ser negativos... <br> Pero te la paso por esta vez, humano xd`:``;
  
    if (c44 == `` || c44 == "-") {
      document.getElementById("c44").innerHTML = ``;
    }
    else {
        document.getElementById("c44").innerHTML = `${text} ¡¡¡ ${fact} !!! <br> Ese es el factorial de ${c44} UwU ${ngtv}`;
    }
}

// 45. Leer un número y calcularle el factorial a todos los enteros comprendidos entre 1 y el número leído.
function cycle45(){
  
    //VARIABLES BÁSICAS PARA EL CICLO
    var c45 = document.getElementById("cycle45").value;
    var abs = Math.abs(c45);
    
    //VARIABLES NECESARIAS PARA EL FACTORIAL EN CICLO
    var fact = 1;
    var arr = [];
    var array = [];
    var arrow = 0;
    var text = ``;
    
    //CICLO PARA ORGANIZAR LOS NÚMEROS DE 1 A N
    for (let number = 1; number <= abs; number++) {
      arr.push(number);
      array = arr.filter((value,index,array)=>array.indexOf(value)===index);
    };
    
    //CICLO FACTORIAL
    for (let index = 0; index < array.length; index++) {
      arrow = array[index];
      for (let count = 1; count <= arrow; count++) { 
        //algorithm for solution
        fact = fact*count;
        //ALGORITHM FOR TEXT      
        text += `${count}`;
        if (count < arrow ){
          text += ` * `;
        }
        else {
          text += ` = ${fact} <br>`;
        }      
      }
    };

    var red = (c45<0)? `Que los números negativos no pueden ser factorialesss >:c pero supongamos que <br> no tiene ese feo signo de menos (-) y calculémoslo igual UwU`:``;
      
  
    if (c45 == `` || c45 == "-" || c45 == 0) {
      document.getElementById("c45").innerHTML = ``;
    }
    else {
      document.getElementById("c45").innerHTML = `UwU <br> ${text}${red}`;
    }
}

// 46. Leer un número entero y calcular el promedio entero de los factoriales de los enteros comprendidos entre 1 y el número leído.
function cycle46(){
  
  //VARIABLES BÁSICAS PARA EL CICLO
  var c46 = document.getElementById("cycle46").value;
  var abs = Math.abs(c46);
  
  //VARIABLES NECESARIAS PARA EL FACTORIAL EN CICLO
  var fact = 1;
  var arr = [];
  var array = [];
  var arrow = 0;
  var text = ``;
  var summ = 0;
  
  //CICLO PARA ORGANIZAR LOS NÚMEROS DE 1 A N
  for (let number = 1; number <= abs; number++) {
    arr.push(number);
    array = arr.filter((value,index,array)=>array.indexOf(value)===index);
  };
  
  //CICLO FACTORIAL
  for (let index = 0; index < array.length; index++) {
    arrow = array[index];
    for (let count = 1; count <= arrow; count++) { 
      //algorithm for solution
      fact = fact*count;
      //ALGORITHM FOR TEXT      
      text += `${count}`;
      if (count < arrow ){
        text += ` * `;
      }
      else {
        text += ` = ${fact} <br>`;
        summ += fact;
      }      
    }
  };

  var red = (c46<0)? `Que los números negativos no pueden ser factorialesss >:c pero supongamos que <br> no tiene ese feo signo de menos (-) y calculémoslo igual UwU`:``;
  var avg = Number.parseInt(summ/arr.length);

  if (c46 == `` || c46 == "-" || c46 == 0) {
    document.getElementById("c46").innerHTML = ``;
  }
  else {
    document.getElementById("c46").innerHTML = `SUMA DE FACTORIALES: ${summ} <br> CANTIDAD DE ELEMENTOS: ${array.length} <br> PROMEDIO ENTERO: ${avg}  UwU <br> Puedes comprobarlo tú mismo, humano c: <br> ${text}${red}`;
  }
}

// 47. Leer un número entero y calcular a cuánto es igual la sumatoria de todos los factoriales de los números comprendidos entre 1 y el número leído.
function cycle47(){
  
  //VARIABLES BÁSICAS PARA EL CICLO
  var c47 = document.getElementById("cycle47").value;
  var abs = Math.abs(c47);
  
  //VARIABLES NECESARIAS PARA EL FACTORIAL EN CICLO
  var fact = 1;
  var arr = [];
  var array = [];
  var arrow = 0;
  var text = ``;
  var summ = 0;
  
  //CICLO PARA ORGANIZAR LOS NÚMEROS DE 1 A N
  for (let number = 1; number <= abs; number++) {
    arr.push(number);
    array = arr.filter((value,index,array)=>array.indexOf(value)===index);
  };
  
  //CICLO FACTORIAL
  for (let index = 0; index < array.length; index++) {
    arrow = array[index];
    for (let count = 1; count <= arrow; count++) { 
      //algorithm for solution
      fact = fact*count;
      //ALGORITHM FOR TEXT      
      text += `${count}`;
      if (count < arrow ){
        text += ` * `;
      }
      else {
        text += ` = ${fact} <br>`;
        summ += fact;
      }      
    }
  };

  var red = (c47<0)? `Que los números negativos no pueden ser factorialesss >:c pero supongamos que <br> no tiene ese feo signo de menos (-) y calculémoslo igual UwU`:``;
    

  if (c47 == `` || c47 == "-" || c47 == 0) {
    document.getElementById("c47").innerHTML = ``;
  }
  else {
    document.getElementById("c47").innerHTML = `SUMA DE FACTORIALES: ${summ} UwU <br> Puedes comprobarlo tú mismo, humano c: <br> ${text}${red}`;
  }
}

// 48. Utilizando ciclos anidados generar las siguientes parejas de enteros

// 0 1
// 1 1
// 2 2
// 3 2
// 4 3
// 5 3
// 6 4
// 7 4
// 8 5
// 9 5

//FUNCIONES PARA LOS BOTONES
var button48 = document.getElementById("cycle48");
function onMouseOverLight48(){
  button48.style.border="3px solid #ffaa22";
  button48.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight48(){
  button48.style.border='3px solid #f7b64e';
  button48.style.color='#333333';
  button48.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark48(){
  button48.style.border="3px solid #ffaa22";
  button48.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark48(){
  button48.style.border = '3px solid #ffaa22';
  button48.style.color = 'rgb(31, 11, 11)';
  button48.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark48(){
  button48.style.border="1px solid #ffaa22";
  button48.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button48.style.color="rgb(31, 11, 11)";
	button48.style.top="1px";
};
function onMouseDownLight48(){
  button48.style.border="1px solid #ffa22";
  button48.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc48(){
  //SWITCH
  document.getElementById("c48").innerHTML = ``;
  button48.onclick = function () {cycle48()};
  //OH, STYLO
  button48.innerHTML = `LET'S GOOO >:C`;
  button48.onmouseover = function (){onMouseOverLight48()};
  button48.onmouseout = function (){onMouseOutLight48()};
  button48.onmousedown = function (){onMouseDownDark48()};
}

function cycle48() {
  
  //SOLUTION
  var left = [];
  var right = [];
  var text = ``;

  for (let miau = 0; miau <= 9; miau++) {
    left.push(miau);
  };
  
  for (let lol = 1; lol <= 5; lol++) {
    for (let wow = 1; wow <= 2; wow++) { 
      right.push(lol);
    }
  };

  for (let pairs = 0; pairs <= 9; pairs++) {
    text += `${left[pairs]} ${right[pairs]} <br>`;
  };

  document.getElementById("c48").innerHTML = `${text} <br> aWIWIII`;
  
    //SWITCH
    button48.onclick = function () {buttonc48()};
    //OH, STYLO
    button48.innerHTML = `UwU`;
    button48.onmouseover = function (){onMouseOverDark48()};
    button48.onmouseout = function (){onMouseOutDark48()};
    button48.onmousedown = function (){onMouseDownLight48()};
}

// 49. Utilizando ciclos anidados generar las siguientes ternas de números

// 1 1 1
// 2 1 2
// 3 1 3
// 4 2 1
// 5 2 2
// 6 2 3
// 7 3 1
// 8 3 2
// 9 3 3

//FUNCIONES PARA LOS BOTONES
var button49 = document.getElementById("cycle49");
function onMouseOverLight49(){
  button49.style.border="3px solid #ffaa22";
  button49.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight49(){
  button49.style.border='3px solid #f7b64e';
  button49.style.color='#333333';
  button49.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark49(){
  button49.style.border="3px solid #ffaa22";
  button49.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark49(){
  button49.style.border = '3px solid #ffaa22';
  button49.style.color = 'rgb(31, 11, 11)';
  button49.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark49(){
  button49.style.border="1px solid #ffaa22";
  button49.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button49.style.color="rgb(31, 11, 11)";
	button49.style.top="1px";
};
function onMouseDownLight49(){
  button49.style.border="1px solid #ffa22";
  button49.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc49(){
  //SWITCH
  document.getElementById("c49").innerHTML = ``;
  button49.onclick = function () {cycle49()};
  //OH, STYLO
  button49.innerHTML = `LET'S GOOO >:C`;
  button49.onmouseover = function (){onMouseOverLight49()};
  button49.onmouseout = function (){onMouseOutLight49()};
  button49.onmousedown = function (){onMouseDownDark49()};
}

function cycle49() {
  
  //SOLUTION
  var left = [];
  var mid = [];
  var right = [];
  var text = ``;

  //LEFT NUMBER
  for (let miau = 1; miau <= 9; miau++) {
    left.push(miau);
  };
  
  //MID NUMBER
  for (let lol = 1; lol <= 3; lol++) {
    for (let wow = 1; wow <= 3; wow++) { 
      mid.push(lol);
    }
  };
  
  //RIGHT NUMBER
  for (let lol = 1; lol <= 3; lol++) {
    for (let wow = 1; wow <= 3; wow++) { 
      right.push(wow);
    }
  };

  //full sequence
  for (let pairs = 0; pairs <= 8; pairs++) {
    text += `${left[pairs]} ${mid[pairs]} ${right[pairs]} <br>`;
  };

  document.getElementById("c49").innerHTML = `${text} <br> :DD aWIWIII`;
  
    //SWITCH
    button49.onclick = function () {buttonc49()};
    //OH, STYLO
    button49.innerHTML = `UwU`;
    button49.onmouseover = function (){onMouseOverDark49()};
    button49.onmouseout = function (){onMouseOutDark49()};
    button49.onmousedown = function (){onMouseDownLight49()};
}

// 50. Utilizando ciclos anidados generar las siguientes parejas de números

// 0 1
// 1 1
// 2 1
// 3 1
// 4 2
// 5 2
// 6 2
// 7 2

//FUNCIONES PARA LOS BOTONES
var button50 = document.getElementById("cycle50");
function onMouseOverLight50(){
  button50.style.border="3px solid #ffaa22";
  button50.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function onMouseOutLight50(){
  button50.style.border='3px solid #f7b64e';
  button50.style.color='#333333';
  button50.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark50(){
  button50.style.border="3px solid #ffaa22";
  button50.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark50(){
  button50.style.border = '3px solid #ffaa22';
  button50.style.color = 'rgb(31, 11, 11)';
  button50.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function onMouseDownDark50(){
  button50.style.border="1px solid #ffaa22";
  button50.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  button50.style.color="rgb(31, 11, 11)";
	button50.style.top="1px";
};
function onMouseDownLight50(){
  button50.style.border="1px solid #ffa22";
  button50.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  button07.style.top="1px";
};

function buttonc50(){
  //SWITCH
  document.getElementById("c50").innerHTML = ``;
  button50.onclick = function () {cycle50()};
  //OH, STYLO
  button50.innerHTML = `LET'S GOOO >:C`;
  button50.onmouseover = function (){onMouseOverLight50()};
  button50.onmouseout = function (){onMouseOutLight50()};
  button50.onmousedown = function (){onMouseDownDark50()};
}

function cycle50() {
  
  //SOLUTION
  var left = [];
  var right = [];
  var text = ``;

  for (let miau = 0; miau <= 7; miau++) {
    left.push(miau);
  };
  
  for (let lol = 1; lol <= 2; lol++) {
    for (let wow = 1; wow <= 4; wow++) { 
      right.push(lol);
    }
  };

  for (let pairs = 0; pairs <= 7; pairs++) {
    text += `${left[pairs]} ${right[pairs]} <br>`;
  };

  document.getElementById("c50").innerHTML = `${text} <br> AWIWII UwU`;
  
    //SWITCH
    button50.onclick = function () {buttonc50()};
    //OH, STYLO
    button50.innerHTML = `UwU`;
    button50.onmouseover = function (){onMouseOverDark50()};
    button50.onmouseout = function (){onMouseOutDark50()};
    button50.onmousedown = function (){onMouseDownLight50()};
}

// 50 algoritmos reales de arreglos

x = 0
a = 0
b = 0
c = 0
d = 0

// Función para omitir el 0 como número máximo en un arreglo lleno de valores negativos
var max2 = -1000;
const theSecondHigher = (arr) =>{
  var arr;
  let max1 = max2;
  
  for(var i=0;i<arr.length;i++){
    if((Number.parseInt(arr[i]))>max1){
      if(arr[i]!=0){
        max1=(Number.parseInt(arr[i]));
      }
    };
    if(max1!=0 && max1!=max2){
      max2 = max1;
      return max1;
    };
  };
    if(max1 == max1){
      return max1;
    };
}

//DRAG AND DROP
var vectorBlocks = document.querySelectorAll("div.vector > div");
var dragSrcEl = null;
function handleDragStart(e){
  this.style.opacity = '0.4';
  let ploop = new Audio("./music/drag.mp3");
  ploop.play();
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html',this.innerHTML);}
function handleDragOver(e){
  if (e.preventDefault){e.preventDefault();}
  e.dataTransfer.dropEffect = 'move';
  return false;
}
function handleDragEnter(e){this.classList.add('over');}
function handleDragLeave(e){this.classList.remove('over');}
function handleDrop(e){
  let droop = new Audio("./music/drop.mp3");
  droop.play();
  if(e.stopPropagation){e.stopPropagation();}
  if (dragSrcEl != this){
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false; 
}
function handleDragEnd(e){
  this.style.opacity = '1';
  [].forEach.call(vectorBlocks,function(block){
    block.classList.remove('over');
  });
}
//DRAG AND DROP PARA EL VECTOR Y SUS CASILLAS
[].forEach.call(vectorBlocks,function(block){
  block.addEventListener('dragstart',handleDragStart);
  block.addEventListener('dragover',handleDragOver);
  block.addEventListener('dragenter',handleDragEnter);
  block.addEventListener('dragleave',handleDragLeave);
  block.addEventListener('drop',handleDrop);
  block.addEventListener('dragend',handleDragEnd);
});


//IMÁGENES DE FLECHAS APAGADAS PARA VECTORES
var offArrows = document.querySelectorAll("div.arrow > div");
[].forEach.call(offArrows,function(quiver){
  quiver.innerHTML = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;
});


//OBJETO PARA GENERAR UN ARRAY Y 10 NÚMEROS ALEATORIOS DESDE -9999 HASTA 9999
class get10Random {
  constructor(vectorClass) {
    this.nums = 0;
    this.box = document.getElementsByClassName(vectorClass);
    this.aux = new Array;

    this.method = function (min, max) {
      if (this.aux.length == 10) {
        this.aux = new Array;
        for (let i = 0; i < 10; i++) {
          this.nums = Math.round(Math.random() * (max - min) + min);
          if (this.nums == 0){
            this.nums++;
          };
          this.aux.push(this.nums);
          this.box[i].innerHTML = this.aux[i];
        }
      }
      else {
        for (let i = 0; i < 10; i++) {
          this.nums = Math.round(Math.random() * (max - min) + min);
          if (this.nums == 0){
            this.nums++;
          };
          if(this.box[i].textContent == ``){
            this.box[i].textContent = Number.parseInt(this.nums);
          };
        }
      }
      return this.box;
    };

    this.equalize = function () {
      for (let i = 0; i < this.aux.length; i++) {
        this.box[i].innerHTML = this.aux[i];
      }
      if (this.aux.length == 0) {
        for (let i = 0; i < 10; i++) {
          this.box[i].innerHTML = ``;
        }
      }
      return this.box;
    };
  }
}



// 1. Leer 10 enteros, almacenarlos en un vector y determinar en qué posición del vector está el mayor número leído.
var box01 = new get10Random("vector01");
var buttona01 = document.getElementById("arrayb01");
var inputArr01 = document.getElementById("arrayi01");
var freedom01;
var justice01;
var love01;
var flash01 = 0;
var xd01 = 0;
var cancelButton01 = 0;
var filterOfZeros01 = [];
var arrow01 = document.getElementsByClassName("arrow01");
var imgOff01 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd01 = document.querySelectorAll('div#a01d > div');
  [].forEach.call(dnd01,function(block){
    block.addEventListener('dragend',solutiona01);
  });

//solución al problema
function solutiona01(){
  if (cancelButton01==1){}
  else{
    
  function limitSolution(){
    cancelButton01 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow01,function(arrows){
    arrows.innerHTML = imgOff01; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector01 = [];
  for (let nums of box01.box){
      if (nums.textContent == 0){
        arrVector01.push(Number.parseInt(0));
      }
      else{
        arrVector01.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros01 = arrVector01.filter(x=>x!=0);
  box01.aux = filterOfZeros01;
  //Variables para solucionar la pregunta concreta
    var seeker = ((Math.max(...arrVector01))==0)? theSecondHigher(arrVector01):Math.max(...arrVector01);
    var snitch = arrVector01.indexOf(seeker);

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd01 == 2){ 
      if (flash01==-1){
        arrow01[0].innerHTML = imgOff01;
        xd01 = 0;
        flash01=0;
      }
      else if (flash01==0){
        arrow01[1].innerHTML = imgOff01;
        arrow01[0].innerHTML = img;
        flash01=-1;
      }
      else{
        if (flash01<=8){
          arrow01[(flash01+1)].innerHTML = imgOff01;
        };
        arrow01[flash01].innerHTML = img;
        flash01--;
      }               
    }
    else if(xd01 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash01 = 9;
      arrow01[flash01].innerHTML = img;
      xd01 = 2;
      flash01--;
    }
    else{
      if (flash01==10){                       //VUELTA 2
        arrow01[(flash01-1)].innerHTML = imgOff01;
        xd01++;
        flash01 = 0;
      }
      else{                                 //VUELTA 1
        if (flash01>=1){
          arrow01[(flash01-1)].innerHTML = imgOff01;
        };
        arrow01[flash01].innerHTML = img;
        flash01++;
      }
    };
      getE("a01e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom01);
    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    flash01 = snitch;

    for (let i = 0; i < 10; i++) {
      if(i == snitch) {
        arrow01[i].innerHTML = imgOn;
      }
      else{
        arrow01[i].innerHTML = imgOff01;
      }
    };
    getE("a01e").innerHTML = `De este vector, el número más alto es el ${seeker} y se halla en la posición n°${snitch} c:`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros01.length == 10) {
    cancelButton01 = 1;
    freedom01 = setInterval(animation,250);
    justice01 = setTimeout(solution, 2000);
    love01 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros01.length == 0){
    flash01 = 0;
    clearInterval(freedom01);
    clearTimeout(justice01);
    clearTimeout(love01);
    getE("a01e").innerHTML = ``;
    [].forEach.call(arrow01,function(arrows){
      arrows.innerHTML = imgOff01; 
    });
  }
  else{
    getE("a01e").innerHTML = `De este vector, el número más alto es el ${seeker} y se halla en la posición n°${snitch} c: <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr01.addEventListener("keydown",arrayi01, false);
var iOfBox01 = 0; 
function arrayi01(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros01.length == 10 || filterOfZeros01.length == 0){
      buttona01.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros01.length == 9){
        buttona01.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona01.innerHTML = `GENERAR ${10-filterOfZeros01.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr01.value<0)? `-`:``;

  if (isNaN(inputArr01.value)){
    document.getElementById("a01").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr01.value == `` || inputArr01.value == '-' || inputArr01.value == '--' || inputArr01.value == '---' || inputArr01.value == '----'){
    document.getElementById("a01").innerHTML = ``;
  }
  else{
    if (inputArr01.value == 0){
      if (filterOfZeros01.length > 0){
        document.getElementById("a01").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a01").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a01").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr01.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr01.value)){
      inputArr01.value = ``;
    }else{
    if (inputArr01.value == `` || inputArr01.value == '-' || inputArr01.value == '--' || inputArr01.value == '---' || inputArr01.value == '----'){
      inputArr01.value = ``;
    }
    else if (inputArr01.value == 0){
      if(filterOfZeros01.length==0){
        inputArr01.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice01);
        clearInterval(freedom01);
        document.getElementById("a01b").innerHTML = ``;
        document.getElementById("a01c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a01c").innerHTML = ``;
        };
        box01.aux = [];
        filterOfZeros01.length = [];
        box01.equalize();
        solutiona01();
        inputArr01.value = ``;
        iOfBox01 = 0;

        clearInterval(freedom01);
        clearTimeout(justice01);
        clearTimeout(love01);
        getE("a01e").innerHTML = ``;
        [].forEach.call(arrow01,function(arrows){
          arrows.innerHTML = imgOff01; 
        });
      }
    }
    else{
      if (filterOfZeros01.length == 10){
        document.getElementById("a01c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box01.aux.shift();
        box01.aux.push(Number(inputArr01.value));
        box01.equalize();
        solutiona01();
        inputArr01.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a01c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox01 = 0; iOfBox01 < 10; iOfBox01++){
          if(box01.box[iOfBox01].textContent == ``){
            box01.box[iOfBox01].textContent = Number.parseInt(inputArr01.value);
            iOfBox01 = 10;
          };
        };
        solutiona01();
        inputArr01.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight01(){
  buttona01.style.border="3px solid #ffab22";
  buttona01.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona01.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight01(){
  buttona01.style.border='3px solid #f7b64e';
  buttona01.style.color='#333333';
  buttona01.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark01(){
  buttona01.style.border="3px solid #ffaa22";
  buttona01.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark01(){
  buttona01.style.border = '1px solid #ff9d00';
  buttona01.style.color = 'rgb(31, 11, 11)';
  buttona01.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array01(){
  //SOLUTION
  box01.method(-9999,10000);
  document.getElementById("a01c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona01.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona01();

  //OH, STYLO
  buttona01.onmouseover = function (){arrOnMouseOverLight01()};
  buttona01.onmouseout = function (){arrOnMouseOutLight01()};
  buttona01.onmousedown = function (){arrOnMouseOutDark01()};
  buttona01.onmouseup = function (){arrOnMouseOverDark01()};
}

// 2. Leer 10 enteros, almacenarlos en un vector y determinar en qué posición del vector está el mayor número par leído.
var box02 = new get10Random("vector02");
var buttona02 = document.getElementById("arrayb02");
var inputArr02 = document.getElementById("arrayi02");
var freedom02;
var justice02;
var love02;
var flash02 = 0;
var xd02 = 0;
var cancelButton02 = 0;
var filterOfZeros02 = [];
var arrow02 = document.getElementsByClassName("arrow02");
var imgOff02 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd02 = document.querySelectorAll('div#a02d > div');
  [].forEach.call(dnd02,function(block){
    block.addEventListener('dragend',solutiona02);
  });

//solución al problema
function solutiona02(){
  if (cancelButton02==1){}
  else{
    
  function limitSolution(){
    cancelButton02 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow02,function(arrows){
    arrows.innerHTML = imgOff02; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector02 = [];
  for (let nums of box02.box){
      if (nums.textContent == 0){
        arrVector02.push(Number.parseInt(0));
      }
      else{
        arrVector02.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros02 = arrVector02.filter(x=>x!=0);
  box02.aux = filterOfZeros02;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //mayor número par leído
  const pairs = filterOfZeros02.filter(x=>x%2==0);
  var seeker = ((Math.max(...pairs))==0)? theSecondHigher(pairs):Math.max(...pairs);
  var snitch = arrVector02.indexOf(seeker);
  var answer = (pairs.length==0)? `Este vector no tiene ningún número par :c mala suerte... <br> Intenta con otra tanda de números, human@`:`De este vector, el número par más alto es el ${seeker} y se halla en la posición n°${snitch} c:`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd02 == 2){ 
      if (flash02==-1){
        arrow02[0].innerHTML = imgOff02;
        xd02 = 0;
        flash02=0;
      }
      else if (flash02==0){
        arrow02[1].innerHTML = imgOff02;
        arrow02[0].innerHTML = img;
        flash02=-1;
      }
      else{
        if (flash02<=8){
          arrow02[(flash02+1)].innerHTML = imgOff02;
        };
        arrow02[flash02].innerHTML = img;
        flash02--;
      }               
    }
    else if(xd02 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash02 = 9;
      arrow02[flash02].innerHTML = img;
      xd02 = 2;
      flash02--;
    }
    else{
      if (flash02==10){                       //VUELTA 2
        arrow02[(flash02-1)].innerHTML = imgOff02;
        xd02++;
        flash02 = 0;
      }
      else{                                 //VUELTA 1
        if (flash02>=1){
          arrow02[(flash02-1)].innerHTML = imgOff02;
        };
        arrow02[flash02].innerHTML = img;
        flash02++;
      }
    };
      getE("a02e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom02);
    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    if(snitch!=-1){
      flash02 = snitch;
    }
    else{
      flash02 = 0;
    };

    for (let i = 0; i < 10; i++) {
      if(i == snitch) {
        arrow02[i].innerHTML = imgOn;
      }
      else{
        arrow02[i].innerHTML = imgOff02;
      }
    };
    getE("a02e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros02.length == 10) {
    cancelButton02 = 1;
    freedom02 = setInterval(animation,250);
    justice02 = setTimeout(solution, 2000);
    love02 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros02.length == 0){
    flash02 = 0;
    clearInterval(freedom02);
    clearTimeout(justice02);
    clearTimeout(love02);
    getE("a02e").innerHTML = ``;
    [].forEach.call(arrow02,function(arrows){
      arrows.innerHTML = imgOff02; 
    });
  }
  else{
    getE("a02e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr02.addEventListener("keydown",arrayi02, false);
var iOfBox02 = 0; 
function arrayi02(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros02.length == 10 || filterOfZeros02.length == 0){
      buttona02.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros02.length == 9){
        buttona02.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona02.innerHTML = `GENERAR ${10-filterOfZeros02.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr02.value<0)? `-`:``;

  if (isNaN(inputArr02.value)){
    document.getElementById("a02").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr02.value == `` || inputArr02.value == '-' || inputArr02.value == '--' || inputArr02.value == '---' || inputArr02.value == '----'){
    document.getElementById("a02").innerHTML = ``;
  }
  else{
    if (inputArr02.value == 0){
      if (filterOfZeros02.length > 0){
        document.getElementById("a02").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a02").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a02").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr02.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr02.value)){
      inputArr02.value = ``;
    }else{
    if (inputArr02.value == `` || inputArr02.value == '-' || inputArr02.value == '--' || inputArr02.value == '---' || inputArr02.value == '----'){
      inputArr02.value = ``;
    }
    else if (inputArr02.value == 0){
      if(filterOfZeros02.length==0){
        inputArr02.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice02);
        clearInterval(freedom02);
        document.getElementById("a02b").innerHTML = ``;
        document.getElementById("a02c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a02c").innerHTML = ``;
        };
        box02.aux = [];
        filterOfZeros02.length = [];
        box02.equalize();
        solutiona02();
        inputArr02.value = ``;
        iOfBox02 = 0;

        clearInterval(freedom02);
        clearTimeout(justice02);
        clearTimeout(love02);
        getE("a02e").innerHTML = ``;
        [].forEach.call(arrow02,function(arrows){
          arrows.innerHTML = imgOff02; 
        });
      }
    }
    else{
      if (filterOfZeros02.length == 10){
        document.getElementById("a02c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box02.aux.shift();
        box02.aux.push(Number(inputArr02.value));
        box02.equalize();
        solutiona02();
        inputArr02.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a02c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox02 = 0; iOfBox02 < 10; iOfBox02++){
          if(box02.box[iOfBox02].textContent == ``){
            box02.box[iOfBox02].textContent = Number.parseInt(inputArr02.value);
            iOfBox02 = 10;
          };
        };
        solutiona02();
        inputArr02.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight02(){
  buttona02.style.border="3px solid #ffab22";
  buttona02.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona02.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight02(){
  buttona02.style.border='3px solid #f7b64e';
  buttona02.style.color='#333333';
  buttona02.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark02(){
  buttona02.style.border="3px solid #ffaa22";
  buttona02.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark02(){
  buttona02.style.border = '1px solid #ff9d00';
  buttona02.style.color = 'rgb(31, 11, 11)';
  buttona02.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array02(){
  //SOLUTION
  box02.method(-9999,10000);
  document.getElementById("a02c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona02.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona02();

  //OH, STYLO
  buttona02.onmouseover = function (){arrOnMouseOverLight02()};
  buttona02.onmouseout = function (){arrOnMouseOutLight02()};
  buttona02.onmousedown = function (){arrOnMouseOutDark02()};
  buttona02.onmouseup = function (){arrOnMouseOverDark02()};
}

// 3. Leer 10 enteros, almacenarlos en un vector y determinar en qué posición del vector está el mayor número primo leído.
var box03 = new get10Random("vector03");
var buttona03 = document.getElementById("arrayb03");
var inputArr03 = document.getElementById("arrayi03");
var freedom03;
var justice03;
var love03;
var flash03 = 0;
var xd03 = 0;
var cancelButton03 = 0;
var filterOfZeros03 = [];
var arrow03 = document.getElementsByClassName("arrow03");
var imgOff03 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd03 = document.querySelectorAll('div#a03d > div');
  [].forEach.call(dnd03,function(block){
    block.addEventListener('dragend',solutiona03);
  });

//solución al problema
function solutiona03(){
  if (cancelButton03==1){}
  else{
    
  function limitSolution(){
    cancelButton03 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow03,function(arrows){
    arrows.innerHTML = imgOff03; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector03 = [];
  for (let nums of box03.box){
      if (nums.textContent == 0){
        arrVector03.push(Number.parseInt(0));
      }
      else{
        arrVector03.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros03 = arrVector03.filter(x=>x!=0);
  box03.aux = filterOfZeros03;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //mayor número primo leído

    //ALGORITHM FOR PRIME NUMBERS >:c
    var primes = [];

    for (let i = 0; i < 10; i++){
      let box = [];
      
      if(filterOfZeros03[i]>1){
        for (let numbers = 2; numbers < filterOfZeros03[i]; numbers++) {
          const prime = arrVector03[i]%numbers;
          if (prime == 0) {
            box.push(numbers);  
          };
        };
        
        if(box.length == 0){
          primes.push(filterOfZeros03[i]);
        };
      };
    };

  let seeker = ((Math.max(...primes))==0)? theSecondHigher(primes):Math.max(...primes);
  let snitch = arrVector03.indexOf(seeker);
    
  let plural = (primes.length == 1)? `solo el ${primes} en la posición n°${snitch} es primo... <br> Por ende, es el número primo más alto uwu`:`${primes} son números primos <br> y el más alto entre estos ${primes.length} es el ${seeker} en la posición ${snitch} c:`;

  let noPrimes = (primes.length == 0)? `En este vector no hay ningún número primo :c mala suerte... <br> Intenta ingresando otra tanda de 10 números, humano`:`De este vector, ${plural}`;

  var answer = `${noPrimes}`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd03 == 2){ 
      if (flash03==-1){
        arrow03[0].innerHTML = imgOff03;
        xd03 = 0;
        flash03=0;
      }
      else if (flash03==0){
        arrow03[1].innerHTML = imgOff03;
        arrow03[0].innerHTML = img;
        flash03=-1;
      }
      else{
        if (flash03<=8){
          arrow03[(flash03+1)].innerHTML = imgOff03;
        };
        arrow03[flash03].innerHTML = img;
        flash03--;
      }               
    }
    else if(xd03 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash03 = 9;
      arrow03[flash03].innerHTML = img;
      xd03 = 2;
      flash03--;
    }
    else{
      if (flash03==10){                       //VUELTA 2
        arrow03[(flash03-1)].innerHTML = imgOff03;
        xd03++;
        flash03 = 0;
      }
      else{                                 //VUELTA 1
        if (flash03>=1){
          arrow03[(flash03-1)].innerHTML = imgOff03;
        };
        arrow03[flash03].innerHTML = img;
        flash03++;
      }
    };
      getE("a03e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom03);
    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(snitch!=-1){
      flash03 = snitch;
    }
    else{
      flash03 = 0;
    };

    for (let i = 0; i < 10; i++) {
      if(i == snitch) {
        arrow03[i].innerHTML = imgOn;
      }
      else{
        arrow03[i].innerHTML = imgOff03;
      }
    };
    getE("a03e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros03.length == 10) {
    cancelButton03 = 1;
    freedom03 = setInterval(animation,250);
    justice03 = setTimeout(solution, 2000);
    love03 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros03.length == 0){
    flash03 = 0;
    clearInterval(freedom03);
    clearTimeout(justice03);
    clearTimeout(love03);
    getE("a03e").innerHTML = ``;
    [].forEach.call(arrow03,function(arrows){
      arrows.innerHTML = imgOff03; 
    });
  }
  else{
    getE("a03e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr03.addEventListener("keydown",arrayi03, false);
var iOfBox03 = 0; 
function arrayi03(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros03.length == 10 || filterOfZeros03.length == 0){
      buttona03.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros03.length == 9){
        buttona03.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona03.innerHTML = `GENERAR ${10-filterOfZeros03.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr03.value<0)? `-`:``;

  if (isNaN(inputArr03.value)){
    document.getElementById("a03").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr03.value == `` || inputArr03.value == '-' || inputArr03.value == '--' || inputArr03.value == '---' || inputArr03.value == '----'){
    document.getElementById("a03").innerHTML = ``;
  }
  else{
    if (inputArr03.value == 0){
      if (filterOfZeros03.length > 0){
        document.getElementById("a03").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a03").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a03").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr03.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr03.value)){
      inputArr03.value = ``;
    }else{
    if (inputArr03.value == `` || inputArr03.value == '-' || inputArr03.value == '--' || inputArr03.value == '---' || inputArr03.value == '----'){
      inputArr03.value = ``;
    }
    else if (inputArr03.value == 0){
      if(filterOfZeros03.length==0){
        inputArr03.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice03);
        clearInterval(freedom03);
        document.getElementById("a03b").innerHTML = ``;
        document.getElementById("a03c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a03c").innerHTML = ``;
        };
        box03.aux = [];
        filterOfZeros03.length = [];
        box03.equalize();
        solutiona03();
        inputArr03.value = ``;
        iOfBox03 = 0;

        clearInterval(freedom03);
        clearTimeout(justice03);
        clearTimeout(love03);
        getE("a03e").innerHTML = ``;
        [].forEach.call(arrow03,function(arrows){
          arrows.innerHTML = imgOff03; 
        });
      }
    }
    else{
      if (filterOfZeros03.length == 10){
        document.getElementById("a03c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box03.aux.shift();
        box03.aux.push(Number(inputArr03.value));
        box03.equalize();
        solutiona03();
        inputArr03.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a03c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox03 = 0; iOfBox03 < 10; iOfBox03++){
          if(box03.box[iOfBox03].textContent == ``){
            box03.box[iOfBox03].textContent = Number.parseInt(inputArr03.value);
            iOfBox03 = 10;
          };
        };
        solutiona03();
        inputArr03.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight03(){
  buttona03.style.border="3px solid #ffab22";
  buttona03.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona03.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight03(){
  buttona03.style.border='3px solid #f7b64e';
  buttona03.style.color='#333333';
  buttona03.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark03(){
  buttona03.style.border="3px solid #ffaa22";
  buttona03.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark03(){
  buttona03.style.border = '1px solid #ff9d00';
  buttona03.style.color = 'rgb(31, 11, 11)';
  buttona03.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array03(){
  //SOLUTION
  box03.method(-9999,10000);
  document.getElementById("a03c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona03.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona03();

  //OH, STYLO
  buttona03.onmouseover = function (){arrOnMouseOverLight03()};
  buttona03.onmouseout = function (){arrOnMouseOutLight03()};
  buttona03.onmousedown = function (){arrOnMouseOutDark03()};
  buttona03.onmouseup = function (){arrOnMouseOverDark03()};
}

// 4. Cargar un vector de 10 posiciones con los 10 primeros elementos de la serie de Fibonacci y mostrarlo en pantalla.
//FUNCIONES PARA LOS BOTONES
var buttona04 = document.getElementById("arrayb04");
function arrOnMouseOverLight04(){
  buttona04.style.border="3px solid #ffaa22";
  buttona04.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function arrOnMouseOutLight04(){
  buttona04.style.border='3px solid #f7b64e';
  buttona04.style.color='#333333';
  buttona04.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark04(){
  buttona04.style.border="3px solid #ffaa22";
  buttona04.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark04(){
  buttona04.style.border = '3px solid #ffaa22';
  buttona04.style.color = 'rgb(31, 11, 11)';
  buttona04.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function arrOnMouseDownDark04(){
  buttona04.style.border="1px solid #ffaa22";
  buttona04.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  buttona04.style.color="rgb(31, 11, 11)";
	buttona04.style.top="1px";
};
function arrOnMouseDownLight04(){
  buttona04.style.border="1px solid #ffa22";
  buttona04.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona04.style.top="1px";
};

function array04(){
  //SWITCH
  buttona04.onclick = function () {arrayy04()};
  getE("detailsArr04").open = false;
  //OH, STYLO
  buttona04.innerHTML = `LET'S GOOO >:C`;
  buttona04.onmouseover = function (){arrOnMouseOverLight04()};
  buttona04.onmouseout = function (){arrOnMouseOutLight04()};
  buttona04.onmousedown = function (){arrOnMouseDownDark04()};
}

function arrayy04() {
    //SWITCH
    getE("detailsArr04").open = true;
    buttona04.onclick = function () {array04()};
    //OH, STYLO
    buttona04.innerHTML = `UwU`;
    buttona04.onmouseover = function (){arrOnMouseOverDark04()};
    buttona04.onmouseout = function (){arrOnMouseOutDark04()};
    buttona04.onmousedown = function (){arrOnMouseDownLight04()};
}

// 5. Almacenar en un vector de 10 posiciones los 10 números primos comprendidos entre 100 y 300. Luego mostrarlos en pantalla.
var buttona05 = document.getElementById("arrayb05");
function arrOnMouseOverLight05(){
  buttona05.style.border="3px solid #ffaa22";
  buttona05.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
};
function arrOnMouseOutLight05(){
  buttona05.style.border='3px solid #f7b64e';
  buttona05.style.color='#333333';
  buttona05.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark05(){
  buttona05.style.border="3px solid #ffaa22";
  buttona05.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark05(){
  buttona05.style.border = '3px solid #ffaa22';
  buttona05.style.color = 'rgb(31, 11, 11)';
  buttona05.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
function arrOnMouseDownDark05(){
  buttona05.style.border="1px solid #ffaa22";
  buttona05.style.background ="linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)";
  buttona05.style.color="rgb(31, 11, 11)";
	buttona05.style.top="1px";
};
function arrOnMouseDownLight05(){
  buttona05.style.border="1px solid #ffa22";
  buttona05.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona05.style.top="1px";
};

function array05(){
  //SWITCH
  buttona05.onclick = function () {arrayy05()};
  getE("detailsArr05").open = false;
  //OH, STYLO
  buttona05.innerHTML = `LET'S GOOO >:C`;
  buttona05.onmouseover = function (){arrOnMouseOverLight05()};
  buttona05.onmouseout = function (){arrOnMouseOutLight05()};
  buttona05.onmousedown = function (){arrOnMouseDownDark05()};
}

function arrayy05() {
    //SWITCH
    getE("detailsArr05").open = true;
    buttona05.onclick = function () {array05()};
    //OH, STYLO
    buttona05.innerHTML = `UwU`;
    buttona05.onmouseover = function (){arrOnMouseOverDark05()};
    buttona05.onmouseout = function (){arrOnMouseOutDark05()};
    buttona05.onmousedown = function (){arrOnMouseDownLight05()};
}

// 6. Leer dos números enteros y almacenar en un vector los 10 primeros números primos comprendidos entre el menor y el mayor. Luego mostrarlos en pantalla.
//INPUTS
var arr06inpL = getE('arrayi06');
var arr06inpR = getE('arrayi06b');
//BUTTONS
var arr06butL = getE('arrayb06');
var arr06butR = getE('arrayb06b');
//SPANS
var arr06spnL = getE('arrSpan06l');
var arr06spnR = getE('arrSpan06r');
//end of global variables.

//EVENTS FOR THE INITIAL SPAN TO POP UP AND GO OUT
function arr06Blanchedalmond(){
  return getE('arr06intro').style.color = 'blanchedalmond';
};
function arr06Black(){
    getE('arr06intro').innerHTML = `oli <br> xd`;
    getE('arr06intro').style.color = 'black';
};

//left input
arr06inpL.addEventListener('focus',(e)=>{
  getE('arr06intro').innerHTML = `Escribe un número de máximo 2 dígitos. <br> Luego, regístralo oprimiendo ENTER c:`;
  arr06Blanchedalmond();
});
arr06inpL.addEventListener('blur',arr06Black);
//left button
arr06butL.addEventListener('click',array06);
arr06butL.addEventListener('focus',arr06Blanchedalmond);
arr06butL.addEventListener('blur',arr06Black);

//right input
arr06inpR.addEventListener('focus',(e)=>{
  getE('arr06intro').innerHTML = `Escribe un número de máximo 4 dígitos. <br> Luego, regístralo oprimiendo ENTER c:`;
  arr06Blanchedalmond();
});
arr06inpR.addEventListener('blur',arr06Black);
//right button
arr06butR.addEventListener('click',array06b);
arr06butR.addEventListener('focus',arr06Blanchedalmond);
arr06butR.addEventListener('blur',arr06Black);
//end of events.

//INPUT FUNCTION TO INTRODUCE THE VALUES
var arrN06 = 0; //for trolling with the negative inputs xd
var arrNL6 = 0; //xd
var arrNR6 = 0; //xd

//left input
arr06inpL.addEventListener('keydown',arrayi06);
function arrayi06(e){
  //run this when press enter
  if (e.keyCode === 13){
    //no sign is valid
    if (isNaN(arr06inpL.value)){
      getE('arr06intro').innerHTML = `Oshe... Que valores imposibles <br> sha no te recibo, sha aprendí xd`;
      arr06inpL.value = ``;  
    }
    //negatives
    else if (arr06inpL.value < 0){
      switch (arrN06){
        case 0:  
          if(arrNR6 == 1){
            getE('arr06intro').innerHTML = `Aquí...<br> Tampoco xd`;
            arrN06 = 1;
            arrNR6 = 0;
          }
          else{
            getE('arr06intro').innerHTML = `Ah, se me olvidó decirte... <br> Aquí no te valdré negativos xd`;
            arrNL6 = 1;
          };
          break;
        
        default:
          if (arrNR6 == 0){
            getE('arr06intro').innerHTML = `¿Por qué insistes tanto... <br> ...Con los negativos? xd`;
            arrNL6 = 1;
          }
          else{
            getE('arr06intro').innerHTML = `¡¡¡QUE NO SE PUEDEN NEGATIVOS!!! >:C <br> Ejem... Recuerda que los números primos son positivos c:`;
            arrNL6 = 1;
          };
          break;
      };
      arr06inpL.value = ``;
    }
    //zeros
    else if(arr06inpL.value == 0){
      if(arr06spnR.textContent == 0){
        getE('arr06intro').innerHTML = `A ver, a ver, a ver... <br> Ya te valí en el segundo número un 0... ¿PERO DOOS? NO ABUSES >:c`;
        arr06inpL.value = ``;  
      }
      else{
        if (arr06spnR.textContent == `?`){
          getE('arr06intro').innerHTML = `¡Cool! Un ${arr06inpL.value} uwu <br> Ahora genera el segundo número`;
        }
        else {
          getE('arr06intro').innerHTML = `¡Cool! Un ${arr06inpL.value} uwu Ahora a ver el resultado... <br> Y a jugar con el vector... Que para algo lo hice xd`;
        };
      arr06spnL.textContent = Number(arr06inpL.value);
      arr06inpL.value = ``;  
      };
    }
    //when same numbers
    else if(arr06inpL.value == arr06spnR.textContent){
      getE('arr06intro').innerHTML = `Hey, human@...¿Variemos un poco, no? <br> Introduce un valor diferente del segundo número`;
      arr06inpL.value = ``;  
    }
    //any other valid number
    else{
      if (arr06spnR.textContent == `?`){
        if (arr06inpL.value == 69){
          getE('arr06intro').innerHTML = `${arr06inpL.value}... ¡EXCELENTE ELECCIÓN! uwu <br> Ahora genera el segundo número`;
        }
        else{
          getE('arr06intro').innerHTML = `¡Cool! Un ${arr06inpL.value} uwu <br> Ahora genera el segundo número`;
        };
      }
      else {
        if (arr06inpL.value == 69){
          getE('arr06intro').innerHTML = `${arr06inpL.value}... ¡EXCELENTE ELECCIÓN! uwu Ahora a ver el resultado... <br> Y a jugar con el vector... Que para algo lo hice xd`;
        }
        else{
          getE('arr06intro').innerHTML = `¡Cool! Un ${arr06inpL.value} uwu Ahora a ver el resultado... <br> Y a jugar con el vector... Que para algo lo hice xd`;
        };
      };
      arr06spnL.textContent = Number(arr06inpL.value);
      arr06inpL.value = ``;
    };
    //execution
    if (arr06spnL.textContent != '?' && arr06spnR.textContent != '?'){
      solveArr06(arr06spnL.textContent, arr06spnR.textContent);
    };
  };
};

//right input
arr06inpR.addEventListener('keydown',arrayi06b);
function arrayi06b(e){
  //run this when press enter
  if (e.keyCode === 13){
    //no sign is valid
    if (isNaN(arr06inpR.value)){
      getE('arr06intro').innerHTML = `Oshe... Que valores imposibles <br> sha no te recibo, sha aprendí xd`;
      arr06inpR.value = ``;
    }
    //negatives
    else if (arr06inpR.value < 0){
      switch (arrN06){
        case 0:  
          if(arrNL6 == 1){
            getE('arr06intro').innerHTML = `Aquí...<br> Tampoco xd`;
            arrN06 = 1;
            arrNL6 = 0;
          }
          else{
            getE('arr06intro').innerHTML = `Ah, se me olvidó decirte... <br> Aquí no te valdré negativos xd`;
            arrNR6 = 1;
          };
          break;
        
        default:
          if (arrNL6 == 0){
            getE('arr06intro').innerHTML = `¿Por qué insistes tanto... <br> ...Con los negativos? xd`;
            arrNR6 = 1;
          }
          else{
            getE('arr06intro').innerHTML = `¡¡¡QUE NO SE PUEDEN NEGATIVOS!!! >:C <br> Ejem... Recuerda que los números primos son positivos c:`;
            arrNR6 = 1;
          }
          break;
      };      
      arr06inpR.value = ``;
    }
    //zeros
    else if (arr06inpR.value == 0){
      if(arr06spnL.textContent == 0){
        getE('arr06intro').innerHTML = `A ver, a ver, a ver... <br> Ya te valí en el primer número un 0... ¿PERO DOOS? NO ABUSES >:c`;
        arr06inpR.value = ``;
      }
      else{
        if (arr06spnL.value == `?`){
          getE('arr06intro').innerHTML = `¡Cool! Un ${arr06inpR.value} uwu <br> Ahora genera el primer número`;
        }
        else {
          getE('arr06intro').innerHTML = `¡Cool! Un ${arr06inpR.value} uwu Ahora a ver el resultado... <br> Y a jugar con el vector... Que para algo lo hice xd`;
        };
      arr06spnR.textContent = Number(arr06inpR.value);
      arr06inpR.value = ``;  
      };
    }
    //when same numbers
    else if(arr06inpR.value == arr06spnL.textContent){
      getE('arr06intro').innerHTML = `Hey, human@...¿Variemos un poco, no? <br> Introduce un valor diferente del primer número`;
      arr06inpR.value = ``;
    }
    //any other valid number
    else{
      if (arr06spnL.value == `?`){
        if(arr06inpR.value == 666){
          getE('arr06intro').innerHTML = `${arr06inpR.value}... ¡EXCELENTE ELECCIÓN! uwu <br> Ahora genera el primer número`;
        }
        else{
          getE('arr06intro').innerHTML = `¡Cool! Un ${arr06inpR.value} uwu <br> Ahora genera el primer número`;
        }
      }
      else {
        if(arr06inpR.value == 666){
          getE('arr06intro').innerHTML = `${arr06inpR.value}... ¡EXCELENTE ELECCIÓN! uwu Ahora a ver el resultado... <br> Y a jugar con el vector... Que para algo lo hice xd`;

        }
        else{
          getE('arr06intro').innerHTML = `¡Cool! Un ${arr06inpR.value} uwu Ahora a ver el resultado... <br> Y a jugar con el vector... Que para algo lo hice xd`;
        }
      };
      arr06spnR.textContent = Number(arr06inpR.value);
      arr06inpR.value = ``;
    };
    //execution
    if (arr06spnL.textContent != '?' && arr06spnR.textContent != '?'){
      solveArr06(arr06spnL.textContent, arr06spnR.textContent);
    };
  };
};
//end of inputs.

//BUTTONS FUNCTIONS to generate random nums
//but first the styles xd
//left button style
function arrOnMouseOverLight06L(){
  arr06butL.style.border="3px solid #ffab22";
  arr06butL.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  arr06butL.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight06L(){
  arr06butL.style.border='3px solid #f7b64e';
  arr06butL.style.color='#333333';
  arr06butL.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark06L(){
  arr06butL.style.border="3px solid #ffaa22";
  arr06butL.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark06L(){
  arr06butL.style.border = '1px solid #ff9d00';
  arr06butL.style.color = 'rgb(31, 11, 11)';
  arr06butL.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};
//right button style
function arrOnMouseOverLight06R(){
  arr06butR.style.border="3px solid #ffab22";
  arr06butR.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  arr06butR.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight06R(){
  arr06butR.style.border='3px solid #f7b64e';
  arr06butR.style.color='#333333';
  arr06butR.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark06R(){
  arr06butR.style.border="3px solid #ffaa22";
  arr06butR.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark06R(){
  arr06butR.style.border = '1px solid #ff9d00';
  arr06butR.style.color = 'rgb(31, 11, 11)';
  arr06butR.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

//left button function
function array06(){
  //solution
  arr06spnL.textContent = Math.round(Math.random() * 99);  
  if (arr06spnR.textContent == `?`){
    if(arr06spnL.textContent == 666){
      getE('arr06intro').innerHTML = `${arr06spnL.textContent}... ¡PERO QUÉ SUERTE TIENES! uwu <br> Ahora genera el primer número`;
    }
    else{
      getE('arr06intro').innerHTML = `¡Cool! Un ${arr06spnL.textContent} uwu <br> Ahora genera el primer número`;
    };
  }
  else {
    if(arr06spnL.textContent == 666){
      getE('arr06intro').innerHTML = `${arr06spnL.textContent}... ¡PERO QUÉ SUERTE TIENES! uwu Ahora a ver el resultado... <br> Y a jugar con el vector... Que para algo lo hice xd`;
    }
    else{
      getE('arr06intro').innerHTML = `¡Cool! Un ${arr06spnL.textContent} uwu Ahora a ver el resultado... <br> Y a jugar con el vector... Que para algo lo hice xd`;
    };
  };
  //oh, stylo
  arr06butL.onmouseover = function (){arrOnMouseOverLight06L()};
  arr06butL.onmouseout = function (){arrOnMouseOutLight06L()};
  arr06butL.onmousedown = function (){arrOnMouseOutDark06L()};
  arr06butL.onmouseup = function (){arrOnMouseOverDark06L()};
  //execution
  if (arr06spnL.textContent != '?' && arr06spnR.textContent != '?'){
    solveArr06(arr06spnL.textContent, arr06spnR.textContent);
  };
};

//right button function
function array06b(){
  arr06spnR.textContent = Math.round(Math.random() * 999);
  if (arr06spnL.textContent == `?`){
    if(arr06spnR.textContent == 666){
      getE('arr06intro').innerHTML = `${arr06spnR.textContent}... ¡PERO QUÉ SUERTE TIENES! uwu <br> Ahora genera el primer número`;
    }
    else{
      getE('arr06intro').innerHTML = `¡Cool! Un ${arr06spnR.textContent} uwu <br> Ahora genera el primer número`;
    };
  }
  else {
    if(arr06spnR.textContent == 666){
      getE('arr06intro').innerHTML = `${arr06spnR.textContent}... ¡PERO QUÉ SUERTE TIENES! uwu Ahora a ver el resultado... <br> Y a jugar con el vector... Que para algo lo hice xd`;
    }
    else{
      getE('arr06intro').innerHTML = `¡Cool! Un ${arr06spnR.textContent} uwu Ahora a ver el resultado... <br> Y a jugar con el vector... Que para algo lo hice xd`;
    };
  };
    //oh, stylo
    arr06butR.onmouseover = function (){arrOnMouseOverLight06R()};
    arr06butR.onmouseout = function (){arrOnMouseOutLight06R()};
    arr06butR.onmousedown = function (){arrOnMouseOutDark06R()};
    arr06butR.onmouseup = function (){arrOnMouseOverDark06R()};
  //execution
    if (arr06spnL.textContent != '?' && arr06spnR.textContent != '?'){
      solveArr06(arr06spnL.textContent, arr06spnR.textContent);
    };
};
//end of buttons.

//vector function
function solveArr06(left, right){
  let bag = [];
  for (let i = left; i <= right; i++){
    bag.push(i);
  };
  //ALGORITHM FOR PRIME NUMBERS >:c
  let primes = [];
  for (let j = 0; j < bag.length; j++){
    let box = [];
    for (let numbers = 2; numbers <= bag[j]; numbers++) {
      const prime = bag[j] % numbers;
      if (prime == 0) {
        box.push(numbers);  
      };
    };
    if (box.length == 1){
      primes.push(bag[j]);
    };
    if (primes.length == 10){
      j = bag.length;
    };
  };
  let result = primes.sort((a,b)=>a-b);
  const vector06 = document.querySelectorAll('div#a06d > div');
  for (let i = 0; i < vector06.length; i++){
    vector06[i].textContent = result[i];
  };
  switch (result.length){
    case 10:
      getE('arr06intro').innerHTML = `UwU <br> Ahí 'tan tus 10 primos`;
      break;

    case 9:
      getE('arr06intro').innerHTML = `Ufff casii casii 10 primos, <br> por un pelo de rana calva xd`;
      break;
    
    case 8:
      getE('arr06intro').innerHTML = `Aish... Faltaron <br> 2 primos no más F`;
      break;

    case 7:
      getE('arr06intro').innerHTML = `Caaasi los 10 D: <br> intenta otra veez`;
      break;

    case 1:
      getE('arr06intro').innerHTML = `Y HE AQUÍ A ${result} <br> EL ÚNICO SOBREVIVIENTE EN PIE DE LOS PRIMOS`;
      break;
    
    case 0:
      getE('arr06intro').innerHTML = `alv no hay primos <br> entre estos dos números D:`;
      break;

    default:
      getE('arr06intro').innerHTML = `Hmm... :c No hay suficientes primos entre tus dos <br> números como para llenar el vector F`;
      break;
  };
};
//enddd of vector and everythiiiing.

// 7. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posiciones se encuentra el número mayor.
var box07 = new get10Random("vector07");
var buttona07 = document.getElementById("arrayb07");
var inputArr07 = document.getElementById("arrayi07");
var freedom07;
var justice07;
var love07;
var flash07 = 0;
var xd07 = 0;
var cancelButton07 = 0;
var filterOfZeros07 = [];
var arrow07 = document.getElementsByClassName("arrow07");
var imgOff07 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd07 = document.querySelectorAll('div#a07d > div');
  [].forEach.call(dnd07,function(block){
    block.addEventListener('dragend',solutiona07);
  });

//solución al problema
function solutiona07(){
  if (cancelButton07==1){}
  else{
    
  function limitSolution(){
    cancelButton07 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow07,function(arrows){
    arrows.innerHTML = imgOff07; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector07 = [];
  for (let nums of box07.box){
      if (nums.textContent == 0){
        arrVector07.push(Number.parseInt(0));
      }
      else{
        arrVector07.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros07 = arrVector07.filter(x=>x!=0);
  box07.aux = filterOfZeros07;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES del número más alto (identifica si se repite)
  var seeker = Math.max(...filterOfZeros07);
  var snitch = arrVector07.indexOf(seeker);
  var basurero = [];

  for (let i=0; i<arrVector07.length; i++){
    if(seeker == arrVector07[i]){
      basurero.push(i);
    }
  };

  var parallel = (basurero.length>1)? `<br>y se halla repetido ${basurero.length} veces en las posiciones ${basurero} UwU`:`y se halla en la posición n°${snitch} c:`;
  var answer = `De este vector, el número más alto es el ${seeker} ${parallel}`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd07 == 2){ 
      if (flash07==-1){
        arrow07[0].innerHTML = imgOff07;
        xd07 = 0;
        flash07=0;
      }
      else if (flash07==0){
        arrow07[1].innerHTML = imgOff07;
        arrow07[0].innerHTML = img;
        flash07=-1;
      }
      else{
        if (flash07<=8){
          arrow07[(flash07+1)].innerHTML = imgOff07;
        };
        arrow07[flash07].innerHTML = img;
        flash07--;
      }               
    }
    else if(xd07 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash07 = 9;
      arrow07[flash07].innerHTML = img;
      xd07 = 2;
      flash07--;
    }
    else{
      if (flash07==10){                       //VUELTA 2
        arrow07[(flash07-1)].innerHTML = imgOff07;
        xd07++;
        flash07 = 0;
      }
      else{                                 //VUELTA 1
        if (flash07>=1){
          arrow07[(flash07-1)].innerHTML = imgOff07;
        };
        arrow07[flash07].innerHTML = img;
        flash07++;
      }
    };
      getE("a07e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom07);
    [].forEach.call(arrow07,function(arrows){
      arrows.innerHTML = imgOff07; 
    });

    for (let i=0; i<basurero.length; i++){
      let miau = basurero[i]; 
      arrow07[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a07e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros07.length == 10) {
    cancelButton07 = 1;
    freedom07 = setInterval(animation,250);
    justice07 = setTimeout(solution, 2000);
    love07 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros07.length == 0){
    flash07 = 0;
    clearInterval(freedom07);
    clearTimeout(justice07);
    clearTimeout(love07);
    getE("a07e").innerHTML = ``;
    [].forEach.call(arrow07,function(arrows){
      arrows.innerHTML = imgOff07; 
    });
  }
  else{
    getE("a07e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr07.addEventListener("keydown",arrayi07, false);
var iOfBox07 = 0; 
function arrayi07(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros07.length == 10 || filterOfZeros07.length == 0){
      buttona07.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros07.length == 9){
        buttona07.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona07.innerHTML = `GENERAR ${10-filterOfZeros07.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr07.value<0)? `-`:``;

  if (isNaN(inputArr07.value)){
    document.getElementById("a07").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr07.value == `` || inputArr07.value == '-' || inputArr07.value == '--' || inputArr07.value == '---' || inputArr07.value == '----'){
    document.getElementById("a07").innerHTML = ``;
  }
  else{
    if (inputArr07.value == 0){
      if (filterOfZeros07.length > 0){
        document.getElementById("a07").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a07").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a07").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr07.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr07.value)){
      inputArr07.value = ``;
    }else{
    if (inputArr07.value == `` || inputArr07.value == '-' || inputArr07.value == '--' || inputArr07.value == '---' || inputArr07.value == '----'){
      inputArr07.value = ``;
    }
    else if (inputArr07.value == 0){
      if(filterOfZeros07.length==0){
        inputArr07.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice07);
        clearInterval(freedom07);
        document.getElementById("a07b").innerHTML = ``;
        document.getElementById("a07c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a07c").innerHTML = ``;
        };
        box07.aux = [];
        filterOfZeros07.length = [];
        box07.equalize();
        solutiona07();
        inputArr07.value = ``;
        iOfBox07 = 0;

        clearInterval(freedom07);
        clearTimeout(justice07);
        clearTimeout(love07);
        getE("a07e").innerHTML = ``;
        [].forEach.call(arrow07,function(arrows){
          arrows.innerHTML = imgOff07; 
        });
      }
    }
    else{
      if (filterOfZeros07.length == 10){
        document.getElementById("a07c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box07.aux.shift();
        box07.aux.push(Number(inputArr07.value));
        box07.equalize();
        solutiona07();
        inputArr07.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a07c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox07 = 0; iOfBox07 < 10; iOfBox07++){
          if(box07.box[iOfBox07].textContent == ``){
            box07.box[iOfBox07].textContent = Number.parseInt(inputArr07.value);
            iOfBox07 = 10;
          };
        };
        solutiona07();
        inputArr07.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight07(){
  buttona07.style.border="3px solid #ffab22";
  buttona07.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona07.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight07(){
  buttona07.style.border='3px solid #f7b64e';
  buttona07.style.color='#333333';
  buttona07.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark07(){
  buttona07.style.border="3px solid #ffaa22";
  buttona07.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark07(){
  buttona07.style.border = '1px solid #ff9d00';
  buttona07.style.color = 'rgb(31, 11, 11)';
  buttona07.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array07(){
  //SOLUTION
  box07.method(-9999,10000);
  document.getElementById("a07c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona07.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona07();

  //OH, STYLO
  buttona07.onmouseover = function (){arrOnMouseOverLight07()};
  buttona07.onmouseout = function (){arrOnMouseOutLight07()};
  buttona07.onmousedown = function (){arrOnMouseOutDark07()};
  buttona07.onmouseup = function (){arrOnMouseOverDark07()};
}

// 8. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posiciones se encuentran los números terminados en 4.
var box08 = new get10Random("vector08");
var buttona08 = document.getElementById("arrayb08");
var inputArr08 = document.getElementById("arrayi08");
var freedom08;
var justice08;
var love08;
var flash08 = 0;
var xd08 = 0;
var cancelButton08 = 0;
var filterOfZeros08 = [];
var arrow08 = document.getElementsByClassName("arrow08");
var imgOff08 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd08 = document.querySelectorAll('div#a08d > div');
  [].forEach.call(dnd08,function(block){
    block.addEventListener('dragend',solutiona08);
  });

//solución al problema
function solutiona08(){
  if (cancelButton08==1){}
  else{
    
  function limitSolution(){
    cancelButton08 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow08,function(arrows){
    arrows.innerHTML = imgOff08; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector08 = [];
  for (let nums of box08.box){
      if (nums.textContent == 0){
        arrVector08.push(Number.parseInt(0));
      }
      else{
        arrVector08.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros08 = arrVector08.filter(x=>x!=0);
  box08.aux = filterOfZeros08;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES de números terminados en 4
  var seeker = filterOfZeros08.filter(x=>x%10==4||x%10==-4);
  var snitch = [];

  for (let j=0; j<seeker.length; j++){
    for (let i=0; i<filterOfZeros08.length; i++){
      if(filterOfZeros08[i]==seeker[j]){
        snitch.push(i);
      };
    };
  };

  
  var parallel = (snitch.length>1)? `<br>y se hallan en las posiciones ${snitch} UwU`:`y se halla en la posición n°${snitch} c:`;
  var plural = (snitch.length>1)? `los números ${seeker} terminan en 4`:`el número ${seeker} termina en 4`;
  var no4 = (seeker.length==0)? `Este vector no cuenta con números que terminen en 4 :c vaya suerte... <br> ¡Prueba con otra tanda de números, human@!`:`De este vector, ${plural} ${parallel}`;
  var answer = no4;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd08 == 2){ 
      if (flash08==-1){
        arrow08[0].innerHTML = imgOff08;
        xd08 = 0;
        flash08=0;
      }
      else if (flash08==0){
        arrow08[1].innerHTML = imgOff08;
        arrow08[0].innerHTML = img;
        flash08=-1;
      }
      else{
        if (flash08<=8){
          arrow08[(flash08+1)].innerHTML = imgOff08;
        };
        arrow08[flash08].innerHTML = img;
        flash08--;
      }               
    }
    else if(xd08 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash08 = 9;
      arrow08[flash08].innerHTML = img;
      xd08 = 2;
      flash08--;
    }
    else{
      if (flash08==10){                       //VUELTA 2
        arrow08[(flash08-1)].innerHTML = imgOff08;
        xd08++;
        flash08 = 0;
      }
      else{                                 //VUELTA 1
        if (flash08>=1){
          arrow08[(flash08-1)].innerHTML = imgOff08;
        };
        arrow08[flash08].innerHTML = img;
        flash08++;
      }
    };
      getE("a08e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom08);
    [].forEach.call(arrow08,function(arrows){
      arrows.innerHTML = imgOff08; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow08[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    
    getE("a08e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros08.length == 10) {
    cancelButton08 = 1;
    freedom08 = setInterval(animation,250);
    justice08 = setTimeout(solution, 2000);
    love08 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros08.length == 0){
    flash08 = 0;
    clearInterval(freedom08);
    clearTimeout(justice08);
    clearTimeout(love08);
    getE("a08e").innerHTML = ``;
    [].forEach.call(arrow08,function(arrows){
      arrows.innerHTML = imgOff08; 
    });
  }
  else{
    getE("a08e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr08.addEventListener("keydown",arrayi08, false);
var iOfBox08 = 0; 
function arrayi08(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros08.length == 10 || filterOfZeros08.length == 0){
      buttona08.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros08.length == 9){
        buttona08.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona08.innerHTML = `GENERAR ${10-filterOfZeros08.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr08.value<0)? `-`:``;

  if (isNaN(inputArr08.value)){
    document.getElementById("a08").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr08.value == `` || inputArr08.value == '-' || inputArr08.value == '--' || inputArr08.value == '---' || inputArr08.value == '----'){
    document.getElementById("a08").innerHTML = ``;
  }
  else{
    if (inputArr08.value == 0){
      if (filterOfZeros08.length > 0){
        document.getElementById("a08").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a08").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a08").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr08.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr08.value)){
      inputArr08.value = ``;
    }else{
    if (inputArr08.value == `` || inputArr08.value == '-' || inputArr08.value == '--' || inputArr08.value == '---' || inputArr08.value == '----'){
      inputArr08.value = ``;
    }
    else if (inputArr08.value == 0){
      if(filterOfZeros08.length==0){
        inputArr08.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice08);
        clearInterval(freedom08);
        document.getElementById("a08b").innerHTML = ``;
        document.getElementById("a08c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a08c").innerHTML = ``;
        };
        box08.aux = [];
        filterOfZeros08.length = [];
        box08.equalize();
        solutiona08();
        inputArr08.value = ``;
        iOfBox08 = 0;

        clearInterval(freedom08);
        clearTimeout(justice08);
        clearTimeout(love08);
        getE("a08e").innerHTML = ``;
        [].forEach.call(arrow08,function(arrows){
          arrows.innerHTML = imgOff08; 
        });
      }
    }
    else{
      if (filterOfZeros08.length == 10){
        document.getElementById("a08c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box08.aux.shift();
        box08.aux.push(Number(inputArr08.value));
        box08.equalize();
        solutiona08();
        inputArr08.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a08c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox08 = 0; iOfBox08 < 10; iOfBox08++){
          if(box08.box[iOfBox08].textContent == ``){
            box08.box[iOfBox08].textContent = Number.parseInt(inputArr08.value);
            iOfBox08 = 10;
          };
        };
        solutiona08();
        inputArr08.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight08(){
  buttona08.style.border="3px solid #ffab22";
  buttona08.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona08.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight08(){
  buttona08.style.border='3px solid #f7b64e';
  buttona08.style.color='#333333';
  buttona08.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark08(){
  buttona08.style.border="3px solid #ffaa22";
  buttona08.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark08(){
  buttona08.style.border = '1px solid #ff9d00';
  buttona08.style.color = 'rgb(31, 11, 11)';
  buttona08.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array08(){
  //SOLUTION
  box08.method(-9999,10000);
  document.getElementById("a08c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona08.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona08();

  //OH, STYLO
  buttona08.onmouseover = function (){arrOnMouseOverLight08()};
  buttona08.onmouseout = function (){arrOnMouseOutLight08()};
  buttona08.onmousedown = function (){arrOnMouseOutDark08()};
  buttona08.onmouseup = function (){arrOnMouseOverDark08()};
}

// 9. Leer 10 números enteros, almacenarlos en un vector y determinar cuántas veces está repetido el mayor.
var box09 = new get10Random("vector09");
var buttona09 = document.getElementById("arrayb09");
var inputArr09 = document.getElementById("arrayi09");
var freedom09;
var justice09;
var love09;
var flash09 = 0;
var xd09 = 0;
var cancelButton09 = 0;
var filterOfZeros09 = [];
var arrow09 = document.getElementsByClassName("arrow09");
var imgOff09 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd09 = document.querySelectorAll('div#a09d > div');
  [].forEach.call(dnd09,function(block){
    block.addEventListener('dragend',solutiona09);
  });

//solución al problema
function solutiona09(){
  if (cancelButton09==1){}
  else{
    
  function limitSolution(){
    cancelButton09 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow09,function(arrows){
    arrows.innerHTML = imgOff09; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector09 = [];
  for (let nums of box09.box){
      if (nums.textContent == 0){
        arrVector09.push(Number.parseInt(0));
      }
      else{
        arrVector09.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros09 = arrVector09.filter(x=>x!=0);
  box09.aux = filterOfZeros09;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES del número más alto (identifica si se repite)
  var seeker = Math.max(...filterOfZeros09);
  var snitch = arrVector09.indexOf(seeker);
  var basurero = [];

  for (let i=0; i<arrVector09.length; i++){
    if(seeker == arrVector09[i]){
      basurero.push(i);
    }
  };

  var parallel = (basurero.length>1)? `<br>y se halla repetido ${basurero.length} veces en las posiciones ${basurero} UwU`:`<br> y se halla repetido ${basurero.length} única vez: en la posición n°${snitch} c:`;
  var answer = `De este vector, el número más alto es el ${seeker} ${parallel}`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd09 == 2){ 
      if (flash09==-1){
        arrow09[0].innerHTML = imgOff09;
        xd09 = 0;
        flash09=0;
      }
      else if (flash09==0){
        arrow09[1].innerHTML = imgOff09;
        arrow09[0].innerHTML = img;
        flash09=-1;
      }
      else{
        if (flash09<=8){
          arrow09[(flash09+1)].innerHTML = imgOff09;
        };
        arrow09[flash09].innerHTML = img;
        flash09--;
      }               
    }
    else if(xd09 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash09 = 9;
      arrow09[flash09].innerHTML = img;
      xd09 = 2;
      flash09--;
    }
    else{
      if (flash09==10){                       //VUELTA 2
        arrow09[(flash09-1)].innerHTML = imgOff09;
        xd09++;
        flash09 = 0;
      }
      else{                                 //VUELTA 1
        if (flash09>=1){
          arrow09[(flash09-1)].innerHTML = imgOff09;
        };
        arrow09[flash09].innerHTML = img;
        flash09++;
      }
    };
      getE("a09e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom09);
    [].forEach.call(arrow09,function(arrows){
      arrows.innerHTML = imgOff09; 
    });

    for (let i=0; i<basurero.length; i++){
      let miau = basurero[i]; 
      arrow09[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a09e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros09.length == 10) {
    cancelButton09 = 1;
    freedom09 = setInterval(animation,250);
    justice09 = setTimeout(solution, 2000);
    love09 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros09.length == 0){
    flash09 = 0;
    clearInterval(freedom09);
    clearTimeout(justice09);
    clearTimeout(love09);
    getE("a09e").innerHTML = ``;
    [].forEach.call(arrow09,function(arrows){
      arrows.innerHTML = imgOff09; 
    });
  }
  else{
    getE("a09e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr09.addEventListener("keydown",arrayi09, false);
var iOfBox09 = 0; 
function arrayi09(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros09.length == 10 || filterOfZeros09.length == 0){
      buttona09.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros09.length == 9){
        buttona09.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona09.innerHTML = `GENERAR ${10-filterOfZeros09.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr09.value<0)? `-`:``;

  if (isNaN(inputArr09.value)){
    document.getElementById("a09").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr09.value == `` || inputArr09.value == '-' || inputArr09.value == '--' || inputArr09.value == '---' || inputArr09.value == '----'){
    document.getElementById("a09").innerHTML = ``;
  }
  else{
    if (inputArr09.value == 0){
      if (filterOfZeros09.length > 0){
        document.getElementById("a09").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a09").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a09").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr09.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr09.value)){
      inputArr09.value = ``;
    }else{
    if (inputArr09.value == `` || inputArr09.value == '-' || inputArr09.value == '--' || inputArr09.value == '---' || inputArr09.value == '----'){
      inputArr09.value = ``;
    }
    else if (inputArr09.value == 0){
      if(filterOfZeros09.length==0){
        inputArr09.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice09);
        clearInterval(freedom09);
        document.getElementById("a09b").innerHTML = ``;
        document.getElementById("a09c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a09c").innerHTML = ``;
        };
        box09.aux = [];
        filterOfZeros09.length = [];
        box09.equalize();
        solutiona09();
        inputArr09.value = ``;
        iOfBox09 = 0;

        clearInterval(freedom09);
        clearTimeout(justice09);
        clearTimeout(love09);
        getE("a09e").innerHTML = ``;
        [].forEach.call(arrow09,function(arrows){
          arrows.innerHTML = imgOff09; 
        });
      }
    }
    else{
      if (filterOfZeros09.length == 10){
        document.getElementById("a09c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box09.aux.shift();
        box09.aux.push(Number(inputArr09.value));
        box09.equalize();
        solutiona09();
        inputArr09.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a09c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox09 = 0; iOfBox09 < 10; iOfBox09++){
          if(box09.box[iOfBox09].textContent == ``){
            box09.box[iOfBox09].textContent = Number.parseInt(inputArr09.value);
            iOfBox09 = 10;
          };
        };
        solutiona09();
        inputArr09.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight09(){
  buttona09.style.border="3px solid #ffab22";
  buttona09.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona09.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight09(){
  buttona09.style.border='3px solid #f7b64e';
  buttona09.style.color='#333333';
  buttona09.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark09(){
  buttona09.style.border="3px solid #ffaa22";
  buttona09.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark09(){
  buttona09.style.border = '1px solid #ff9d00';
  buttona09.style.color = 'rgb(31, 11, 11)';
  buttona09.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array09(){
  //SOLUTION
  box09.method(-9999,10000);
  document.getElementById("a09c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona09.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona09();

  //OH, STYLO
  buttona09.onmouseover = function (){arrOnMouseOverLight09()};
  buttona09.onmouseout = function (){arrOnMouseOutLight09()};
  buttona09.onmousedown = function (){arrOnMouseOutDark09()};
  buttona09.onmouseup = function (){arrOnMouseOverDark09()};
}

// 10. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posiciones se encuentran los números con mas de 3 dígitos.
var box10 = new get10Random("vector10");
var buttona10 = document.getElementById("arrayb10");
var inputArr10 = document.getElementById("arrayi10");
var freedom10;
var justice10;
var love10;
var flash10 = 0;
var xd10 = 0;
var cancelButton10 = 0;
var filterOfZeros10 = [];
var arrow10 = document.getElementsByClassName("arrow10");
var imgOff10 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd10 = document.querySelectorAll('div#a10d > div');
  [].forEach.call(dnd10,function(block){
    block.addEventListener('dragend',solutiona10);
  });

//solución al problema
function solutiona10(){
  if (cancelButton10==1){}
  else{
    
  function limitSolution(){
    cancelButton10 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow10,function(arrows){
    arrows.innerHTML = imgOff10; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector10 = [];
  for (let nums of box10.box){
      if (nums.textContent == 0){
        arrVector10.push(Number.parseInt(0));
      }
      else{
        arrVector10.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros10 = arrVector10.filter(x=>x!=0);
  box10.aux = filterOfZeros10;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //números con mas de 3 dígitos.
  var seeker = filterOfZeros10.filter(x => x>=1000 || x<= -1000);
  var snitch = [];
  
  for (let j=0; j<seeker.length; j++){
    for (let i=0; i<arrVector10.length; i++){
      if(seeker[j] == arrVector10[i]){
        snitch.push(i);
      };
    }; 
  };

  let parallel = (snitch.length>1)? `En este vector, hay ${snitch.length} números de más de 3 dígitos: ${seeker} <br> y se hallan en las posiciones n°: ${snitch} UwU`:`En este vector, hay un solo número de más de 3 dígitos: el ${seeker} en la posición n°${snitch} c:`;
  let ten = (snitch.length==10)? `¡¡¡HURRAA!!! Todo el vector está compuesto por números de más de 3 dígitos :DDDD awiwii`:`${parallel}`;  
  let none = (snitch.length==0)? `En este vector, ninguno de sus números tiene más de 3 dígitos... Vaya suerte tienes, human@ :c <br> Por tu bien... Espero que nunca vayas a un casino, F. En fin... Intenta otros números c:`:`${ten}`;
  var answer = `${none}`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd10 == 2){ 
      if (flash10==-1){
        arrow10[0].innerHTML = imgOff10;
        xd10 = 0;
        flash10=0;
      }
      else if (flash10==0){
        arrow10[1].innerHTML = imgOff10;
        arrow10[0].innerHTML = img;
        flash10=-1;
      }
      else{
        if (flash10<=8){
          arrow10[(flash10+1)].innerHTML = imgOff10;
        };
        arrow10[flash10].innerHTML = img;
        flash10--;
      }               
    }
    else if(xd10 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash10 = 9;
      arrow10[flash10].innerHTML = img;
      xd10 = 2;
      flash10--;
    }
    else{
      if (flash10==10){                       //VUELTA 2
        arrow10[(flash10-1)].innerHTML = imgOff10;
        xd10++;
        flash10 = 0;
      }
      else{                                 //VUELTA 1
        if (flash10>=1){
          arrow10[(flash10-1)].innerHTML = imgOff10;
        };
        arrow10[flash10].innerHTML = img;
        flash10++;
      }
    };
      getE("a10e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom10);
    [].forEach.call(arrow10,function(arrows){
      arrows.innerHTML = imgOff10; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow10[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a10e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros10.length == 10) {
    cancelButton10 = 1;
    freedom10 = setInterval(animation,250);
    justice10 = setTimeout(solution, 2000);
    love10 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros10.length == 0){
    flash10 = 0;
    clearInterval(freedom10);
    clearTimeout(justice10);
    clearTimeout(love10);
    getE("a10e").innerHTML = ``;
    [].forEach.call(arrow10,function(arrows){
      arrows.innerHTML = imgOff10; 
    });
  }
  else{
    getE("a10e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr10.addEventListener("keydown",arrayi10, false);
var iOfBox10 = 0; 
function arrayi10(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros10.length == 10 || filterOfZeros10.length == 0){
      buttona10.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros10.length == 9){
        buttona10.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona10.innerHTML = `GENERAR ${10-filterOfZeros10.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr10.value<0)? `-`:``;

  if (isNaN(inputArr10.value)){
    document.getElementById("a10").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr10.value == `` || inputArr10.value == '-' || inputArr10.value == '--' || inputArr10.value == '---' || inputArr10.value == '----'){
    document.getElementById("a10").innerHTML = ``;
  }
  else{
    if (inputArr10.value == 0){
      if (filterOfZeros10.length > 0){
        document.getElementById("a10").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a10").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a10").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr10.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr10.value)){
      inputArr10.value = ``;
    }else{
    if (inputArr10.value == `` || inputArr10.value == '-' || inputArr10.value == '--' || inputArr10.value == '---' || inputArr10.value == '----'){
      inputArr10.value = ``;
    }
    else if (inputArr10.value == 0){
      if(filterOfZeros10.length==0){
        inputArr10.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice10);
        clearInterval(freedom10);
        document.getElementById("a10b").innerHTML = ``;
        document.getElementById("a10c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a10c").innerHTML = ``;
        };
        box10.aux = [];
        filterOfZeros10.length = [];
        box10.equalize();
        solutiona10();
        inputArr10.value = ``;
        iOfBox10 = 0;

        clearInterval(freedom10);
        clearTimeout(justice10);
        clearTimeout(love10);
        getE("a10e").innerHTML = ``;
        [].forEach.call(arrow10,function(arrows){
          arrows.innerHTML = imgOff10; 
        });
      }
    }
    else{
      if (filterOfZeros10.length == 10){
        document.getElementById("a10c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box10.aux.shift();
        box10.aux.push(Number(inputArr10.value));
        box10.equalize();
        solutiona10();
        inputArr10.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a10c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox10 = 0; iOfBox10 < 10; iOfBox10++){
          if(box10.box[iOfBox10].textContent == ``){
            box10.box[iOfBox10].textContent = Number.parseInt(inputArr10.value);
            iOfBox10 = 10;
          };
        };
        solutiona10();
        inputArr10.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight10(){
  buttona10.style.border="3px solid #ffab22";
  buttona10.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona10.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight10(){
  buttona10.style.border='3px solid #f7b64e';
  buttona10.style.color='#333333';
  buttona10.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark10(){
  buttona10.style.border="3px solid #ffaa22";
  buttona10.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark10(){
  buttona10.style.border = '1px solid #ff9d00';
  buttona10.style.color = 'rgb(31, 11, 11)';
  buttona10.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array10(){
  //SOLUTION
  box10.method(-9999,10000);
  document.getElementById("a10c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona10.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona10();

  //OH, STYLO
  buttona10.onmouseover = function (){arrOnMouseOverLight10()};
  buttona10.onmouseout = function (){arrOnMouseOutLight10()};
  buttona10.onmousedown = function (){arrOnMouseOutDark10()};
  buttona10.onmouseup = function (){arrOnMouseOverDark10()};
}

//11. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos números tienen, de los almacenados allí, tienen menos de 3 dígitos.
var box11 = new get10Random("vector11");
var buttona11 = document.getElementById("arrayb11");
var inputArr11 = document.getElementById("arrayi11");
var freedom11;
var justice11;
var love11;
var flash11 = 0;
var xd11 = 0;
var cancelButton11 = 0;
var filterOfZeros11 = [];
var arrow11 = document.getElementsByClassName("arrow11");
var imgOff11 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd11 = document.querySelectorAll('div#a11d > div');
  [].forEach.call(dnd11,function(block){
    block.addEventListener('dragend',solutiona11);
  });

//solución al problema
function solutiona11(){
  if (cancelButton11==1){}
  else{
    
  function limitSolution(){
    cancelButton11 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow11,function(arrows){
    arrows.innerHTML = imgOff11; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector11 = [];
  for (let nums of box11.box){
      if (nums.textContent == 0){
        arrVector11.push(Number.parseInt(0));
      }
      else{
        arrVector11.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros11 = arrVector11.filter(x=>x!=0);
  box11.aux = filterOfZeros11;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //números con menos de 3 dígitos.
  var seeker = filterOfZeros11.filter(x => x <= 99 && x >= -99);
  var snitch = [];
  
  for (let j=0; j<seeker.length; j++){
    for (let i=0; i<arrVector11.length; i++){
      if(seeker[j] == arrVector11[i]){
        snitch.push(i);
      };
    }; 
  };

  let parallel = (snitch.length>1)? `En este vector, hay ${snitch.length} números de menos de 3 dígitos: ${seeker} <br> y se hallan en las posiciones n°: ${snitch} UwU`:`En este vector, hay un solo número de menos de 3 dígitos: el ${seeker} en la posición n°${snitch} c:`;
  let ten = (snitch.length==10)? `¡¡¡HURRAA!!! Todo el vector está compuesto por números de menos de 3 dígitos :DDDD awiwii`:`${parallel}`;  
  let none = (snitch.length==0)? `En este vector, ninguno de sus números tiene menos de 3 dígitos... Vaya suerte tienes, human@ :c <br> Por tu bien... Espero que nunca vayas a un casino, F. En fin... Intenta otros números c:`:`${ten}`;
  var answer = `${none}`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd11 == 2){ 
      if (flash11==-1){
        arrow11[0].innerHTML = imgOff11;
        xd11 = 0;
        flash11=0;
      }
      else if (flash11==0){
        arrow11[1].innerHTML = imgOff11;
        arrow11[0].innerHTML = img;
        flash11=-1;
      }
      else{
        if (flash11<=8){
          arrow11[(flash11+1)].innerHTML = imgOff11;
        };
        arrow11[flash11].innerHTML = img;
        flash11--;
      }               
    }
    else if(xd11 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash11 = 9;
      arrow11[flash11].innerHTML = img;
      xd11 = 2;
      flash11--;
    }
    else{
      if (flash11==10){                       //VUELTA 2
        arrow11[(flash11-1)].innerHTML = imgOff11;
        xd11++;
        flash11 = 0;
      }
      else{                                 //VUELTA 1
        if (flash11>=1){
          arrow11[(flash11-1)].innerHTML = imgOff11;
        };
        arrow11[flash11].innerHTML = img;
        flash11++;
      }
    };
      getE("a11e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom11);
    [].forEach.call(arrow11,function(arrows){
      arrows.innerHTML = imgOff11; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow11[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a11e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros11.length == 10) {
    cancelButton11 = 1;
    freedom11 = setInterval(animation,250);
    justice11 = setTimeout(solution, 2000);
    love11 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros11.length == 0){
    flash11 = 0;
    clearInterval(freedom11);
    clearTimeout(justice11);
    clearTimeout(love11);
    getE("a11e").innerHTML = ``;
    [].forEach.call(arrow11,function(arrows){
      arrows.innerHTML = imgOff11; 
    });
  }
  else{
    getE("a11e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr11.addEventListener("keydown",arrayi11, false);
var iOfBox11 = 0; 
function arrayi11(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros11.length == 10 || filterOfZeros11.length == 0){
      buttona11.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros11.length == 9){
        buttona11.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona11.innerHTML = `GENERAR ${10-filterOfZeros11.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr11.value<0)? `-`:``;

  if (isNaN(inputArr11.value)){
    document.getElementById("a11").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr11.value == `` || inputArr11.value == '-' || inputArr11.value == '--' || inputArr11.value == '---' || inputArr11.value == '----'){
    document.getElementById("a11").innerHTML = ``;
  }
  else{
    if (inputArr11.value == 0){
      if (filterOfZeros11.length > 0){
        document.getElementById("a11").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a11").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a11").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr11.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr11.value)){
      inputArr11.value = ``;
    }else{
    if (inputArr11.value == `` || inputArr11.value == '-' || inputArr11.value == '--' || inputArr11.value == '---' || inputArr11.value == '----'){
      inputArr11.value = ``;
    }
    else if (inputArr11.value == 0){
      if(filterOfZeros11.length==0){
        inputArr11.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice11);
        clearInterval(freedom11);
        document.getElementById("a11b").innerHTML = ``;
        document.getElementById("a11c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a11c").innerHTML = ``;
        };
        box11.aux = [];
        filterOfZeros11.length = [];
        box11.equalize();
        solutiona11();
        inputArr11.value = ``;
        iOfBox11 = 0;

        clearInterval(freedom11);
        clearTimeout(justice11);
        clearTimeout(love11);
        getE("a11e").innerHTML = ``;
        [].forEach.call(arrow11,function(arrows){
          arrows.innerHTML = imgOff11; 
        });
      }
    }
    else{
      if (filterOfZeros11.length == 10){
        document.getElementById("a11c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box11.aux.shift();
        box11.aux.push(Number(inputArr11.value));
        box11.equalize();
        solutiona11();
        inputArr11.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a11c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox11 = 0; iOfBox11 < 10; iOfBox11++){
          if(box11.box[iOfBox11].textContent == ``){
            box11.box[iOfBox11].textContent = Number.parseInt(inputArr11.value);
            iOfBox11 = 10;
          };
        };
        solutiona11();
        inputArr11.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight11(){
  buttona11.style.border="3px solid #ffab22";
  buttona11.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona11.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight11(){
  buttona11.style.border='3px solid #f7b64e';
  buttona11.style.color='#333333';
  buttona11.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark11(){
  buttona11.style.border="3px solid #ffaa22";
  buttona11.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark11(){
  buttona11.style.border = '1px solid #ff9d00';
  buttona11.style.color = 'rgb(31, 11, 11)';
  buttona11.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array11(){
  //SOLUTION
  box11.method(-9999,10000);
  document.getElementById("a11c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona11.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona11();

  //OH, STYLO
  buttona11.onmouseover = function (){arrOnMouseOverLight11()};
  buttona11.onmouseout = function (){arrOnMouseOutLight11()};
  buttona11.onmousedown = function (){arrOnMouseOutDark11()};
  buttona11.onmouseup = function (){arrOnMouseOverDark11()};
}

// 12. Leer 10 números enteros, almacenarlos en un vector y determinar a cuánto es igual el promedio entero de los datos del vector.
var box12 = new get10Random("vector12");
var buttona12 = document.getElementById("arrayb12");
var inputArr12 = document.getElementById("arrayi12");
var freedom12;
var justice12;
var love12;
var flash12 = 0;
var xd12 = 0;
var cancelButton12 = 0;
var filterOfZeros12 = [];
var arrow12 = document.getElementsByClassName("arrow12");
var imgOff12 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd12 = document.querySelectorAll('div#a12d > div');
  [].forEach.call(dnd12,function(block){
    block.addEventListener('dragend',solutiona12);
  });

//solución al problema
function solutiona12(){
  if (cancelButton12==1){}
  else{
    
  function limitSolution(){
    cancelButton12 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow12,function(arrows){
    arrows.innerHTML = imgOff12; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector12 = [];
  for (let nums of box12.box){
      if (nums.textContent == 0){
        arrVector12.push(Number.parseInt(0));
      }
      else{
        arrVector12.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros12 = arrVector12.filter(x=>x!=0);
  box12.aux = filterOfZeros12;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICE del promedio del vector (si está)
  var seeker = filterOfZeros12.reduce(function(acc,cur){return acc+cur;},0);
  var avg = Math.round(seeker/filterOfZeros12.length); 
  var snitch = arrVector12.indexOf(avg);
  var basurero = [];

  for (let i=0; i<arrVector12.length; i++){
    if(avg == arrVector12[i]){
      basurero.push(i);
    }
  };

  var parallel = (basurero.length>1)? `<br> E INCLUSO SE HALLA REPETIDO ${basurero.length} VECES EN LAS POSICIONES N°: ${basurero} WTFF`:`<br> el pilluelo se halla en la posición n°${snitch} alv`;
  let present = (snitch == -1)? `y pues... ese número no está en el vector... <br> Para serte franco, me sorprendería mucho que cayera en el vector con números aleatorios xd`:`y OMG EL PROMEDIO APARECE EN EL VECTOR DDD: ${parallel}`;
  var answer = `De este vector, el promedio es ${avg} ${present}`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd12 == 2){ 
      if (flash12==-1){
        arrow12[0].innerHTML = imgOff12;
        xd12 = 0;
        flash12=0;
      }
      else if (flash12==0){
        arrow12[1].innerHTML = imgOff12;
        arrow12[0].innerHTML = img;
        flash12=-1;
      }
      else{
        if (flash12<=8){
          arrow12[(flash12+1)].innerHTML = imgOff12;
        };
        arrow12[flash12].innerHTML = img;
        flash12--;
      }               
    }
    else if(xd12 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash12 = 9;
      arrow12[flash12].innerHTML = img;
      xd12 = 2;
      flash12--;
    }
    else{
      if (flash12==10){                       //VUELTA 2
        arrow12[(flash12-1)].innerHTML = imgOff12;
        xd12++;
        flash12 = 0;
      }
      else{                                 //VUELTA 1
        if (flash12>=1){
          arrow12[(flash12-1)].innerHTML = imgOff12;
        };
        arrow12[flash12].innerHTML = img;
        flash12++;
      }
    };
      getE("a12e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom12);
    [].forEach.call(arrow12,function(arrows){
      arrows.innerHTML = imgOff12; 
    });

    for (let i=0; i<basurero.length; i++){
      let miau = basurero[i]; 
      arrow12[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a12e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros12.length == 10) {
    cancelButton12 = 1;
    freedom12 = setInterval(animation,250);
    justice12 = setTimeout(solution, 2000);
    love12 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros12.length == 0){
    flash12 = 0;
    clearInterval(freedom12);
    clearTimeout(justice12);
    clearTimeout(love12);
    getE("a12e").innerHTML = ``;
    [].forEach.call(arrow12,function(arrows){
      arrows.innerHTML = imgOff12; 
    });
  }
  else{
    getE("a12e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr12.addEventListener("keydown",arrayi12, false);
var iOfBox12 = 0; 
function arrayi12(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros12.length == 10 || filterOfZeros12.length == 0){
      buttona12.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros12.length == 9){
        buttona12.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona12.innerHTML = `GENERAR ${10-filterOfZeros12.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr12.value<0)? `-`:``;

  if (isNaN(inputArr12.value)){
    document.getElementById("a12").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr12.value == `` || inputArr12.value == '-' || inputArr12.value == '--' || inputArr12.value == '---' || inputArr12.value == '----'){
    document.getElementById("a12").innerHTML = ``;
  }
  else{
    if (inputArr12.value == 0){
      if (filterOfZeros12.length > 0){
        document.getElementById("a12").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a12").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a12").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr12.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr12.value)){
      inputArr12.value = ``;
    }else{
    if (inputArr12.value == `` || inputArr12.value == '-' || inputArr12.value == '--' || inputArr12.value == '---' || inputArr12.value == '----'){
      inputArr12.value = ``;
    }
    else if (inputArr12.value == 0){
      if(filterOfZeros12.length==0){
        inputArr12.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice12);
        clearInterval(freedom12);
        document.getElementById("a12b").innerHTML = ``;
        document.getElementById("a12c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a12c").innerHTML = ``;
        };
        box12.aux = [];
        filterOfZeros12.length = [];
        box12.equalize();
        solutiona12();
        inputArr12.value = ``;
        iOfBox12 = 0;

        clearInterval(freedom12);
        clearTimeout(justice12);
        clearTimeout(love12);
        getE("a12e").innerHTML = ``;
        [].forEach.call(arrow12,function(arrows){
          arrows.innerHTML = imgOff12; 
        });
      }
    }
    else{
      if (filterOfZeros12.length == 10){
        document.getElementById("a12c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box12.aux.shift();
        box12.aux.push(Number(inputArr12.value));
        box12.equalize();
        solutiona12();
        inputArr12.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a12c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox12 = 0; iOfBox12 < 10; iOfBox12++){
          if(box12.box[iOfBox12].textContent == ``){
            box12.box[iOfBox12].textContent = Number.parseInt(inputArr12.value);
            iOfBox12 = 10;
          };
        };
        solutiona12();
        inputArr12.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight12(){
  buttona12.style.border="3px solid #ffab22";
  buttona12.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona12.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight12(){
  buttona12.style.border='3px solid #f7b64e';
  buttona12.style.color='#333333';
  buttona12.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark12(){
  buttona12.style.border="3px solid #ffaa22";
  buttona12.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark12(){
  buttona12.style.border = '1px solid #ff9d00';
  buttona12.style.color = 'rgb(31, 11, 11)';
  buttona12.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array12(){
  //SOLUTION
  box12.method(-9999,10000);
  document.getElementById("a12c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona12.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona12();

  //OH, STYLO
  buttona12.onmouseover = function (){arrOnMouseOverLight12()};
  buttona12.onmouseout = function (){arrOnMouseOutLight12()};
  buttona12.onmousedown = function (){arrOnMouseOutDark12()};
  buttona12.onmouseup = function (){arrOnMouseOverDark12()};
}

// 13. Leer 10 números enteros, almacenarlos en un vector y determinar si el promedio entero de estos datos está almacenado en el vector.
var box13 = new get10Random("vector13");
var buttona13 = document.getElementById("arrayb13");
var inputArr13 = document.getElementById("arrayi13");
var freedom13;
var justice13;
var love13;
var flash13 = 0;
var xd13 = 0;
var cancelButton13 = 0;
var filterOfZeros13 = [];
var arrow13 = document.getElementsByClassName("arrow13");
var imgOff13 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd13 = document.querySelectorAll('div#a13d > div');
  [].forEach.call(dnd13,function(block){
    block.addEventListener('dragend',solutiona13);
  });

//solución al problema
function solutiona13(){
  if (cancelButton13==1){}
  else{
    
  function limitSolution(){
    cancelButton13 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow13,function(arrows){
    arrows.innerHTML = imgOff13; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector13 = [];
  for (let nums of box13.box){
      if (nums.textContent == 0){
        arrVector13.push(Number.parseInt(0));
      }
      else{
        arrVector13.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros13 = arrVector13.filter(x=>x!=0);
  box13.aux = filterOfZeros13;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICE del promedio del vector (si está)
  var seeker = filterOfZeros13.reduce(function(acc,cur){return acc+cur;},0);
  var avg = Math.round(seeker/filterOfZeros13.length); 
  var snitch = arrVector13.indexOf(avg);
  var basurero = [];

  for (let i=0; i<arrVector13.length; i++){
    if(avg == arrVector13[i]){
      basurero.push(i);
    }
  };

  var parallel = (basurero.length>1)? `<br> E INCLUSO SE HALLA REPETIDO ${basurero.length} VECES EN LAS POSICIONES N°: ${basurero} WTFF`:`<br> el pilluelo se halla en la posición n°${snitch} alv`;
  let present = (snitch == -1)? `y pues... ese número no está en el vector... <br> Para serte franco, me sorprendería mucho que cayera en el vector con números aleatorios xd`:`y OMG EL PROMEDIO APARECE EN EL VECTOR DDD: ${parallel}`;
  var answer = `De este vector, el promedio es ${avg} ${present}`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd13 == 2){ 
      if (flash13==-1){
        arrow13[0].innerHTML = imgOff13;
        xd13 = 0;
        flash13=0;
      }
      else if (flash13==0){
        arrow13[1].innerHTML = imgOff13;
        arrow13[0].innerHTML = img;
        flash13=-1;
      }
      else{
        if (flash13<=8){
          arrow13[(flash13+1)].innerHTML = imgOff13;
        };
        arrow13[flash13].innerHTML = img;
        flash13--;
      }               
    }
    else if(xd13 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash13 = 9;
      arrow13[flash13].innerHTML = img;
      xd13 = 2;
      flash13--;
    }
    else{
      if (flash13==10){                       //VUELTA 2
        arrow13[(flash13-1)].innerHTML = imgOff13;
        xd13++;
        flash13 = 0;
      }
      else{                                 //VUELTA 1
        if (flash13>=1){
          arrow13[(flash13-1)].innerHTML = imgOff13;
        };
        arrow13[flash13].innerHTML = img;
        flash13++;
      }
    };
      getE("a13e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom13);
    [].forEach.call(arrow13,function(arrows){
      arrows.innerHTML = imgOff13; 
    });

    for (let i=0; i<basurero.length; i++){
      let miau = basurero[i]; 
      arrow13[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a13e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros13.length == 10) {
    cancelButton13 = 1;
    freedom13 = setInterval(animation,250);
    justice13 = setTimeout(solution, 2000);
    love13 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros13.length == 0){
    flash13 = 0;
    clearInterval(freedom13);
    clearTimeout(justice13);
    clearTimeout(love13);
    getE("a13e").innerHTML = ``;
    [].forEach.call(arrow13,function(arrows){
      arrows.innerHTML = imgOff13; 
    });
  }
  else{
    getE("a13e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr13.addEventListener("keydown",arrayi13, false);
var iOfBox13 = 0; 
function arrayi13(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros13.length == 10 || filterOfZeros13.length == 0){
      buttona13.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros13.length == 9){
        buttona13.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona13.innerHTML = `GENERAR ${10-filterOfZeros13.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr13.value<0)? `-`:``;

  if (isNaN(inputArr13.value)){
    document.getElementById("a13").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr13.value == `` || inputArr13.value == '-' || inputArr13.value == '--' || inputArr13.value == '---' || inputArr13.value == '----'){
    document.getElementById("a13").innerHTML = ``;
  }
  else{
    if (inputArr13.value == 0){
      if (filterOfZeros13.length > 0){
        document.getElementById("a13").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a13").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a13").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr13.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr13.value)){
      inputArr13.value = ``;
    }else{
    if (inputArr13.value == `` || inputArr13.value == '-' || inputArr13.value == '--' || inputArr13.value == '---' || inputArr13.value == '----'){
      inputArr13.value = ``;
    }
    else if (inputArr13.value == 0){
      if(filterOfZeros13.length==0){
        inputArr13.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice13);
        clearInterval(freedom13);
        document.getElementById("a13b").innerHTML = ``;
        document.getElementById("a13c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a13c").innerHTML = ``;
        };
        box13.aux = [];
        filterOfZeros13.length = [];
        box13.equalize();
        solutiona13();
        inputArr13.value = ``;
        iOfBox13 = 0;

        clearInterval(freedom13);
        clearTimeout(justice13);
        clearTimeout(love13);
        getE("a13e").innerHTML = ``;
        [].forEach.call(arrow13,function(arrows){
          arrows.innerHTML = imgOff13; 
        });
      }
    }
    else{
      if (filterOfZeros13.length == 10){
        document.getElementById("a13c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box13.aux.shift();
        box13.aux.push(Number(inputArr13.value));
        box13.equalize();
        solutiona13();
        inputArr13.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a13c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox13 = 0; iOfBox13 < 10; iOfBox13++){
          if(box13.box[iOfBox13].textContent == ``){
            box13.box[iOfBox13].textContent = Number.parseInt(inputArr13.value);
            iOfBox13 = 10;
          };
        };
        solutiona13();
        inputArr13.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight13(){
  buttona13.style.border="3px solid #ffab22";
  buttona13.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona13.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight13(){
  buttona13.style.border='3px solid #f7b64e';
  buttona13.style.color='#333333';
  buttona13.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark13(){
  buttona13.style.border="3px solid #ffaa22";
  buttona13.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark13(){
  buttona13.style.border = '1px solid #ff9d00';
  buttona13.style.color = 'rgb(31, 11, 11)';
  buttona13.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array13(){
  //SOLUTION
  box13.method(-9999,10000);
  document.getElementById("a13c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona13.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona13();

  //OH, STYLO
  buttona13.onmouseover = function (){arrOnMouseOverLight13()};
  buttona13.onmouseout = function (){arrOnMouseOutLight13()};
  buttona13.onmousedown = function (){arrOnMouseOutDark13()};
  buttona13.onmouseup = function (){arrOnMouseOverDark13()};
}

// 14. Leer 10 números enteros, almacenarlos en un vector y determinar cuántas veces se repite el promedio entero de los datos dentro del vector.
var box14 = new get10Random("vector14");
var buttona14 = document.getElementById("arrayb14");
var inputArr14 = document.getElementById("arrayi14");
var freedom14;
var justice14;
var love14;
var flash14 = 0;
var xd14 = 0;
var cancelButton14 = 0;
var filterOfZeros14 = [];
var arrow14 = document.getElementsByClassName("arrow14");
var imgOff14 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd14 = document.querySelectorAll('div#a14d > div');
  [].forEach.call(dnd14,function(block){
    block.addEventListener('dragend',solutiona14);
  });

//solución al problema
function solutiona14(){
  if (cancelButton14==1){}
  else{
    
  function limitSolution(){
    cancelButton14 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow14,function(arrows){
    arrows.innerHTML = imgOff14; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector14 = [];
  for (let nums of box14.box){
      if (nums.textContent == 0){
        arrVector14.push(Number.parseInt(0));
      }
      else{
        arrVector14.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros14 = arrVector14.filter(x=>x!=0);
  box14.aux = filterOfZeros14;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICE del promedio del vector (si está)
  var seeker = filterOfZeros14.reduce(function(acc,cur){return acc+cur;},0);
  var avg = Math.round(seeker/filterOfZeros14.length); 
  var snitch = arrVector14.indexOf(avg);
  var basurero = [];

  for (let i=0; i<arrVector14.length; i++){
    if(avg == arrVector14[i]){
      basurero.push(i);
    }
  };

  var parallel = (basurero.length>1)? `<br> E INCLUSO SE HALLA REPETIDO ${basurero.length} VECES EN LAS POSICIONES N°: ${basurero} WTFF`:`<br> el pilluelo se halla en la posición n°${snitch} alv`;
  let present = (snitch == -1)? `y pues... ese número no está en el vector... <br> Para serte franco, me sorprendería mucho que cayera en el vector con números aleatorios xd`:`y OMG EL PROMEDIO APARECE EN EL VECTOR DDD: ${parallel}`;
  var answer = `De este vector, el promedio es ${avg} ${present}`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd14 == 2){ 
      if (flash14==-1){
        arrow14[0].innerHTML = imgOff14;
        xd14 = 0;
        flash14=0;
      }
      else if (flash14==0){
        arrow14[1].innerHTML = imgOff14;
        arrow14[0].innerHTML = img;
        flash14=-1;
      }
      else{
        if (flash14<=8){
          arrow14[(flash14+1)].innerHTML = imgOff14;
        };
        arrow14[flash14].innerHTML = img;
        flash14--;
      }               
    }
    else if(xd14 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash14 = 9;
      arrow14[flash14].innerHTML = img;
      xd14 = 2;
      flash14--;
    }
    else{
      if (flash14==10){                       //VUELTA 2
        arrow14[(flash14-1)].innerHTML = imgOff14;
        xd14++;
        flash14 = 0;
      }
      else{                                 //VUELTA 1
        if (flash14>=1){
          arrow14[(flash14-1)].innerHTML = imgOff14;
        };
        arrow14[flash14].innerHTML = img;
        flash14++;
      }
    };
      getE("a14e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom14);
    [].forEach.call(arrow14,function(arrows){
      arrows.innerHTML = imgOff14; 
    });

    for (let i=0; i<basurero.length; i++){
      let miau = basurero[i]; 
      arrow14[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a14e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros14.length == 10) {
    cancelButton14 = 1;
    freedom14 = setInterval(animation,250);
    justice14 = setTimeout(solution, 2000);
    love14 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros14.length == 0){
    flash14 = 0;
    clearInterval(freedom14);
    clearTimeout(justice14);
    clearTimeout(love14);
    getE("a14e").innerHTML = ``;
    [].forEach.call(arrow14,function(arrows){
      arrows.innerHTML = imgOff14; 
    });
  }
  else{
    getE("a14e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr14.addEventListener("keydown",arrayi14, false);
var iOfBox14 = 0; 
function arrayi14(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros14.length == 10 || filterOfZeros14.length == 0){
      buttona14.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros14.length == 9){
        buttona14.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona14.innerHTML = `GENERAR ${10-filterOfZeros14.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr14.value<0)? `-`:``;

  if (isNaN(inputArr14.value)){
    document.getElementById("a14").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr14.value == `` || inputArr14.value == '-' || inputArr14.value == '--' || inputArr14.value == '---' || inputArr14.value == '----'){
    document.getElementById("a14").innerHTML = ``;
  }
  else{
    if (inputArr14.value == 0){
      if (filterOfZeros14.length > 0){
        document.getElementById("a14").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a14").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a14").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr14.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 14){ 
    if (isNaN(inputArr14.value)){
      inputArr14.value = ``;
    }else{
    if (inputArr14.value == `` || inputArr14.value == '-' || inputArr14.value == '--' || inputArr14.value == '---' || inputArr14.value == '----'){
      inputArr14.value = ``;
    }
    else if (inputArr14.value == 0){
      if(filterOfZeros14.length==0){
        inputArr14.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice14);
        clearInterval(freedom14);
        document.getElementById("a14b").innerHTML = ``;
        document.getElementById("a14c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a14c").innerHTML = ``;
        };
        box14.aux = [];
        filterOfZeros14.length = [];
        box14.equalize();
        solutiona14();
        inputArr14.value = ``;
        iOfBox14 = 0;

        clearInterval(freedom14);
        clearTimeout(justice14);
        clearTimeout(love14);
        getE("a14e").innerHTML = ``;
        [].forEach.call(arrow14,function(arrows){
          arrows.innerHTML = imgOff14; 
        });
      }
    }
    else{
      if (filterOfZeros14.length == 10){
        document.getElementById("a14c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box14.aux.shift();
        box14.aux.push(Number(inputArr14.value));
        box14.equalize();
        solutiona14();
        inputArr14.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a14c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox14 = 0; iOfBox14 < 10; iOfBox14++){
          if(box14.box[iOfBox14].textContent == ``){
            box14.box[iOfBox14].textContent = Number.parseInt(inputArr14.value);
            iOfBox14 = 10;
          };
        };
        solutiona14();
        inputArr14.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight14(){
  buttona14.style.border="3px solid #ffab22";
  buttona14.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona14.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight14(){
  buttona14.style.border='3px solid #f7b64e';
  buttona14.style.color='#333333';
  buttona14.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark14(){
  buttona14.style.border="3px solid #ffaa22";
  buttona14.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark14(){
  buttona14.style.border = '1px solid #ff9d00';
  buttona14.style.color = 'rgb(31, 11, 11)';
  buttona14.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array14(){
  //SOLUTION
  box14.method(-9999,10000);
  document.getElementById("a14c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona14.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona14();

  //OH, STYLO
  buttona14.onmouseover = function (){arrOnMouseOverLight14()};
  buttona14.onmouseout = function (){arrOnMouseOutLight14()};
  buttona14.onmousedown = function (){arrOnMouseOutDark14()};
  buttona14.onmouseup = function (){arrOnMouseOverDark14()};
}

// 15. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos datos almacenados son múltiplos de 3.
var box15 = new get10Random("vector15");
var buttona15 = document.getElementById("arrayb15");
var inputArr15 = document.getElementById("arrayi15");
var freedom15;
var justice15;
var love15;
var flash15 = 0;
var xd15 = 0;
var cancelButton15 = 0;
var filterOfZeros15 = [];
var arrow15 = document.getElementsByClassName("arrow15");
var imgOff15 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd15 = document.querySelectorAll('div#a15d > div');
  [].forEach.call(dnd15,function(block){
    block.addEventListener('dragend',solutiona15);
  });

//solución al problema
function solutiona15(){
  if (cancelButton15==1){}
  else{
    
  function limitSolution(){
    cancelButton15 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow15,function(arrows){
    arrows.innerHTML = imgOff15; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector15 = [];
  for (let nums of box15.box){
      if (nums.textContent == 0){
        arrVector15.push(Number.parseInt(0));
      }
      else{
        arrVector15.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros15 = arrVector15.filter(x=>x!=0);
  box15.aux = filterOfZeros15;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES de números múltiplos de 3
  var seeker = filterOfZeros15.filter(x=>x%3==0);
  var snitch = [];

  for (let j=0; j<seeker.length; j++){
    for (let i=0; i<filterOfZeros15.length; i++){
      if(filterOfZeros15[i]==seeker[j]){
        snitch.push(i);
      };
    };
  };

  
  var parallel = (snitch.length>1)? `<br> y se hallan en las posiciones n°: ${snitch} UwU`:`y se halla en la posición n°${snitch} c:`;
  var plural = (snitch.length>1)? `hay ${snitch.length} múltiplos de 3: ${seeker}`:`sólo hay un múltiplo del 3: el número ${seeker}`;
  var no4 = (seeker.length==0)? `Este vector no cuenta con múltiplos de 3 :c vaya suerte... <br> ¡Prueba con otra tanda de números, human@!`:`En este vector, ${plural} ${parallel}`;
  var answer = no4;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd15 == 2){ 
      if (flash15==-1){
        arrow15[0].innerHTML = imgOff15;
        xd15 = 0;
        flash15=0;
      }
      else if (flash15==0){
        arrow15[1].innerHTML = imgOff15;
        arrow15[0].innerHTML = img;
        flash15=-1;
      }
      else{
        if (flash15<=8){
          arrow15[(flash15+1)].innerHTML = imgOff15;
        };
        arrow15[flash15].innerHTML = img;
        flash15--;
      }               
    }
    else if(xd15 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash15 = 9;
      arrow15[flash15].innerHTML = img;
      xd15 = 2;
      flash15--;
    }
    else{
      if (flash15==10){                       //VUELTA 2
        arrow15[(flash15-1)].innerHTML = imgOff15;
        xd15++;
        flash15 = 0;
      }
      else{                                 //VUELTA 1
        if (flash15>=1){
          arrow15[(flash15-1)].innerHTML = imgOff15;
        };
        arrow15[flash15].innerHTML = img;
        flash15++;
      }
    };
      getE("a15e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom15);
    [].forEach.call(arrow15,function(arrows){
      arrows.innerHTML = imgOff15; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow15[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    
    getE("a15e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros15.length == 10) {
    cancelButton15 = 1;
    freedom15 = setInterval(animation,250);
    justice15 = setTimeout(solution, 2000);
    love15 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros15.length == 0){
    flash15 = 0;
    clearInterval(freedom15);
    clearTimeout(justice15);
    clearTimeout(love15);
    getE("a15e").innerHTML = ``;
    [].forEach.call(arrow15,function(arrows){
      arrows.innerHTML = imgOff15; 
    });
  }
  else{
    getE("a15e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr15.addEventListener("keydown",arrayi15, false);
var iOfBox15 = 0; 
function arrayi15(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros15.length == 10 || filterOfZeros15.length == 0){
      buttona15.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros15.length == 9){
        buttona15.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona15.innerHTML = `GENERAR ${10-filterOfZeros15.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr15.value<0)? `-`:``;

  if (isNaN(inputArr15.value)){
    document.getElementById("a15").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr15.value == `` || inputArr15.value == '-' || inputArr15.value == '--' || inputArr15.value == '---' || inputArr15.value == '----'){
    document.getElementById("a15").innerHTML = ``;
  }
  else{
    if (inputArr15.value == 0){
      if (filterOfZeros15.length > 0){
        document.getElementById("a15").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a15").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a15").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr15.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr15.value)){
      inputArr15.value = ``;
    }else{
    if (inputArr15.value == `` || inputArr15.value == '-' || inputArr15.value == '--' || inputArr15.value == '---' || inputArr15.value == '----'){
      inputArr15.value = ``;
    }
    else if (inputArr15.value == 0){
      if(filterOfZeros15.length==0){
        inputArr15.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice15);
        clearInterval(freedom15);
        document.getElementById("a15b").innerHTML = ``;
        document.getElementById("a15c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a15c").innerHTML = ``;
        };
        box15.aux = [];
        filterOfZeros15.length = [];
        box15.equalize();
        solutiona15();
        inputArr15.value = ``;
        iOfBox15 = 0;

        clearInterval(freedom15);
        clearTimeout(justice15);
        clearTimeout(love15);
        getE("a15e").innerHTML = ``;
        [].forEach.call(arrow15,function(arrows){
          arrows.innerHTML = imgOff15; 
        });
      }
    }
    else{
      if (filterOfZeros15.length == 10){
        document.getElementById("a15c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box15.aux.shift();
        box15.aux.push(Number(inputArr15.value));
        box15.equalize();
        solutiona15();
        inputArr15.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a15c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox15 = 0; iOfBox15 < 10; iOfBox15++){
          if(box15.box[iOfBox15].textContent == ``){
            box15.box[iOfBox15].textContent = Number.parseInt(inputArr15.value);
            iOfBox15 = 10;
          };
        };
        solutiona15();
        inputArr15.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight15(){
  buttona15.style.border="3px solid #ffab22";
  buttona15.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona15.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight15(){
  buttona15.style.border='3px solid #f7b64e';
  buttona15.style.color='#333333';
  buttona15.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark15(){
  buttona15.style.border="3px solid #ffaa22";
  buttona15.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark15(){
  buttona15.style.border = '1px solid #ff9d00';
  buttona15.style.color = 'rgb(31, 11, 11)';
  buttona15.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array15(){
  //SOLUTION
  box15.method(-9999,10000);
  document.getElementById("a15c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona15.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona15();

  //OH, STYLO
  buttona15.onmouseover = function (){arrOnMouseOverLight15()};
  buttona15.onmouseout = function (){arrOnMouseOutLight15()};
  buttona15.onmousedown = function (){arrOnMouseOutDark15()};
  buttona15.onmouseup = function (){arrOnMouseOverDark15()};
}

// 16. Leer 10 números enteros, almacenarlos en un vector y determinar cuáles son los datos almacenados múltiplos de 3.
var box16 = new get10Random("vector16");
var buttona16 = document.getElementById("arrayb16");
var inputArr16 = document.getElementById("arrayi16");
var freedom16;
var justice16;
var love16;
var flash16 = 0;
var xd16 = 0;
var cancelButton16 = 0;
var filterOfZeros16 = [];
var arrow16 = document.getElementsByClassName("arrow16");
var imgOff16 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd16 = document.querySelectorAll('div#a16d > div');
  [].forEach.call(dnd16,function(block){
    block.addEventListener('dragend',solutiona16);
  });

//solución al problema
function solutiona16(){
  if (cancelButton16==1){}
  else{
  function limitSolution(){
    cancelButton16 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow16,function(arrows){
    arrows.innerHTML = imgOff16; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector16 = [];
  for (let nums of box16.box){
      if (nums.textContent == 0){
        arrVector16.push(Number.parseInt(0));
      }
      else{
        arrVector16.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros16 = arrVector16.filter(x=>x!=0);
  box16.aux = filterOfZeros16;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES de números múltiplos de 3
  var seeker = filterOfZeros16.filter(x=>x%3==0);
  var snitch = [];

  for (let j=0; j<seeker.length; j++){
    for (let i=0; i<filterOfZeros16.length; i++){
      if(filterOfZeros16[i]==seeker[j]){
        snitch.push(i);
      };
    };
  };

  
  var parallel = (snitch.length>1)? `<br> y se hallan en las posiciones n°: ${snitch} UwU`:`y se halla en la posición n°${snitch} c:`;
  var plural = (snitch.length>1)? `hay ${snitch.length} múltiplos de 3: ${seeker}`:`sólo hay un múltiplo del 3: el número ${seeker}`;
  var no4 = (seeker.length==0)? `Este vector no cuenta con múltiplos de 3 :c vaya suerte... <br> ¡Prueba con otra tanda de números, human@!`:`En este vector, ${plural} ${parallel}`;
  var answer = no4;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd16 == 2){ 
      if (flash16==-1){
        arrow16[0].innerHTML = imgOff16;
        xd16 = 0;
        flash16=0;
      }
      else if (flash16==0){
        arrow16[1].innerHTML = imgOff16;
        arrow16[0].innerHTML = img;
        flash16=-1;
      }
      else{
        if (flash16<=8){
          arrow16[(flash16+1)].innerHTML = imgOff16;
        };
        arrow16[flash16].innerHTML = img;
        flash16--;
      }               
    }
    else if(xd16 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash16 = 9;
      arrow16[flash16].innerHTML = img;
      xd16 = 2;
      flash16--;
    }
    else{
      if (flash16==10){                       //VUELTA 2
        arrow16[(flash16-1)].innerHTML = imgOff16;
        xd16++;
        flash16 = 0;
      }
      else{                                 //VUELTA 1
        if (flash16>=1){
          arrow16[(flash16-1)].innerHTML = imgOff16;
        };
        arrow16[flash16].innerHTML = img;
        flash16++;
      }
    };
      getE("a16e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom16);
    [].forEach.call(arrow16,function(arrows){
      arrows.innerHTML = imgOff16; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow16[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    
    getE("a16e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros16.length == 10) {
    cancelButton16 = 1;
    freedom16 = setInterval(animation,250);
    justice16 = setTimeout(solution, 2000);
    love16 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros16.length == 0){
    flash16 = 0;
    clearInterval(freedom16);
    clearTimeout(justice16);
    clearTimeout(love16);
    getE("a16e").innerHTML = ``;
    [].forEach.call(arrow16,function(arrows){
      arrows.innerHTML = imgOff16; 
    });
  }
  else{
    getE("a16e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr16.addEventListener("keydown",arrayi16, false);
var iOfBox16 = 0; 
function arrayi16(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros16.length == 10 || filterOfZeros16.length == 0){
      buttona16.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros16.length == 9){
        buttona16.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona16.innerHTML = `GENERAR ${10-filterOfZeros16.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr16.value<0)? `-`:``;

  if (isNaN(inputArr16.value)){
    document.getElementById("a16").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr16.value == `` || inputArr16.value == '-' || inputArr16.value == '--' || inputArr16.value == '---' || inputArr16.value == '----'){
    document.getElementById("a16").innerHTML = ``;
  }
  else{
    if (inputArr16.value == 0){
      if (filterOfZeros16.length > 0){
        document.getElementById("a16").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a16").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a16").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr16.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr16.value)){
      inputArr16.value = ``;
    }else{
    if (inputArr16.value == `` || inputArr16.value == '-' || inputArr16.value == '--' || inputArr16.value == '---' || inputArr16.value == '----'){
      inputArr16.value = ``;
    }
    else if (inputArr16.value == 0){
      if(filterOfZeros16.length==0){
        inputArr16.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice16);
        clearInterval(freedom16);
        document.getElementById("a16b").innerHTML = ``;
        document.getElementById("a16c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a16c").innerHTML = ``;
        };
        box16.aux = [];
        filterOfZeros16.length = [];
        box16.equalize();
        solutiona16();
        inputArr16.value = ``;
        iOfBox16 = 0;

        clearInterval(freedom16);
        clearTimeout(justice16);
        clearTimeout(love16);
        getE("a16e").innerHTML = ``;
        [].forEach.call(arrow16,function(arrows){
          arrows.innerHTML = imgOff16; 
        });
      }
    }
    else{
      if (filterOfZeros16.length == 10){
        document.getElementById("a16c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box16.aux.shift();
        box16.aux.push(Number(inputArr16.value));
        box16.equalize();
        solutiona16();
        inputArr16.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a16c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox16 = 0; iOfBox16 < 10; iOfBox16++){
          if(box16.box[iOfBox16].textContent == ``){
            box16.box[iOfBox16].textContent = Number.parseInt(inputArr16.value);
            iOfBox16 = 10;
          };
        };
        solutiona16();
        inputArr16.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight16(){
  buttona16.style.border="3px solid #ffab22";
  buttona16.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona16.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight16(){
  buttona16.style.border='3px solid #f7b64e';
  buttona16.style.color='#333333';
  buttona16.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark16(){
  buttona16.style.border="3px solid #ffaa22";
  buttona16.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark16(){
  buttona16.style.border = '1px solid #ff9d00';
  buttona16.style.color = 'rgb(31, 11, 11)';
  buttona16.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array16(){
  //SOLUTION
  box16.method(-9999,10000);
  document.getElementById("a16c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona16.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona16();

  //OH, STYLO
  buttona16.onmouseover = function (){arrOnMouseOverLight16()};
  buttona16.onmouseout = function (){arrOnMouseOutLight16()};
  buttona16.onmousedown = function (){arrOnMouseOutDark16()};
  buttona16.onmouseup = function (){arrOnMouseOverDark16()};
}

// 17. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos números negativos hay.
var box17 = new get10Random("vector17");
var buttona17 = document.getElementById("arrayb17");
var inputArr17 = document.getElementById("arrayi17");
var freedom17;
var justice17;
var love17;
var flash17 = 0;
var xd17 = 0;
var cancelButton17 = 0;
var filterOfZeros17 = [];
var arrow17 = document.getElementsByClassName("arrow17");
var imgOff17 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd17 = document.querySelectorAll('div#a17d > div');
  [].forEach.call(dnd17,function(block){
    block.addEventListener('dragend',solutiona17);
  });

//solución al problema
function solutiona17(){
  if (cancelButton17==1){}
  else{
    
  function limitSolution(){
    cancelButton17 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow17,function(arrows){
    arrows.innerHTML = imgOff17; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector17 = [];
  for (let nums of box17.box){
      if (nums.textContent == 0){
        arrVector17.push(Number.parseInt(0));
      }
      else{
        arrVector17.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros17 = arrVector17.filter(x=>x!=0);
  box17.aux = filterOfZeros17;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES de números múltiplos de 3
  var seeker = filterOfZeros17.filter(x=>x<=-1);
  var snitch = [];

  for (let j=0; j<seeker.length; j++){
    for (let i=0; i<filterOfZeros17.length; i++){
      if(filterOfZeros17[i]==seeker[j]){
        snitch.push(i);
      };
    };
  };

  
  var parallel = (snitch.length>1)? `<br> y se hallan en las posiciones n°: ${snitch} UwU`:`y se halla en la posición n°${snitch} c:`;
  var plural = (snitch.length>1)? `hay ${snitch.length} números negativos: ${seeker}`:`sólo hay un negativo: el número ${seeker}`;
  var no4 = (seeker.length==0)? `Este vector no cuenta con números negativos :c vaya suerte... <br> ¡Prueba con otra tanda de números, human@!`:`En este vector, ${plural} ${parallel}`;
  var answer = no4;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd17 == 2){ 
      if (flash17==-1){
        arrow17[0].innerHTML = imgOff17;
        xd17 = 0;
        flash17=0;
      }
      else if (flash17==0){
        arrow17[1].innerHTML = imgOff17;
        arrow17[0].innerHTML = img;
        flash17=-1;
      }
      else{
        if (flash17<=8){
          arrow17[(flash17+1)].innerHTML = imgOff17;
        };
        arrow17[flash17].innerHTML = img;
        flash17--;
      }               
    }
    else if(xd17 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash17 = 9;
      arrow17[flash17].innerHTML = img;
      xd17 = 2;
      flash17--;
    }
    else{
      if (flash17==10){                       //VUELTA 2
        arrow17[(flash17-1)].innerHTML = imgOff17;
        xd17++;
        flash17 = 0;
      }
      else{                                 //VUELTA 1
        if (flash17>=1){
          arrow17[(flash17-1)].innerHTML = imgOff17;
        };
        arrow17[flash17].innerHTML = img;
        flash17++;
      }
    };
      getE("a17e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom17);
    [].forEach.call(arrow17,function(arrows){
      arrows.innerHTML = imgOff17; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow17[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    
    getE("a17e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros17.length == 10) {
    cancelButton17 = 1;
    freedom17 = setInterval(animation,250);
    justice17 = setTimeout(solution, 2000);
    love17 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros17.length == 0){
    flash17 = 0;
    clearInterval(freedom17);
    clearTimeout(justice17);
    clearTimeout(love17);
    getE("a17e").innerHTML = ``;
    [].forEach.call(arrow17,function(arrows){
      arrows.innerHTML = imgOff17; 
    });
  }
  else{
    getE("a17e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr17.addEventListener("keydown",arrayi17, false);
var iOfBox17 = 0; 
function arrayi17(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros17.length == 10 || filterOfZeros17.length == 0){
      buttona17.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros17.length == 9){
        buttona17.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona17.innerHTML = `GENERAR ${10-filterOfZeros17.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr17.value<0)? `-`:``;

  if (isNaN(inputArr17.value)){
    document.getElementById("a17").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr17.value == `` || inputArr17.value == '-' || inputArr17.value == '--' || inputArr17.value == '---' || inputArr17.value == '----'){
    document.getElementById("a17").innerHTML = ``;
  }
  else{
    if (inputArr17.value == 0){
      if (filterOfZeros17.length > 0){
        document.getElementById("a17").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a17").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a17").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr17.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr17.value)){
      inputArr17.value = ``;
    }else{
    if (inputArr17.value == `` || inputArr17.value == '-' || inputArr17.value == '--' || inputArr17.value == '---' || inputArr17.value == '----'){
      inputArr17.value = ``;
    }
    else if (inputArr17.value == 0){
      if(filterOfZeros17.length==0){
        inputArr17.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice17);
        clearInterval(freedom17);
        document.getElementById("a17b").innerHTML = ``;
        document.getElementById("a17c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a17c").innerHTML = ``;
        };
        box17.aux = [];
        filterOfZeros17.length = [];
        box17.equalize();
        solutiona17();
        inputArr17.value = ``;
        iOfBox17 = 0;

        clearInterval(freedom17);
        clearTimeout(justice17);
        clearTimeout(love17);
        getE("a17e").innerHTML = ``;
        [].forEach.call(arrow17,function(arrows){
          arrows.innerHTML = imgOff17; 
        });
      }
    }
    else{
      if (filterOfZeros17.length == 10){
        document.getElementById("a17c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box17.aux.shift();
        box17.aux.push(Number(inputArr17.value));
        box17.equalize();
        solutiona17();
        inputArr17.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a17c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox17 = 0; iOfBox17 < 10; iOfBox17++){
          if(box17.box[iOfBox17].textContent == ``){
            box17.box[iOfBox17].textContent = Number.parseInt(inputArr17.value);
            iOfBox17 = 10;
          };
        };
        solutiona17();
        inputArr17.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight17(){
  buttona17.style.border="3px solid #ffab22";
  buttona17.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona17.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight17(){
  buttona17.style.border='3px solid #f7b64e';
  buttona17.style.color='#333333';
  buttona17.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark17(){
  buttona17.style.border="3px solid #ffaa22";
  buttona17.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark17(){
  buttona17.style.border = '1px solid #ff9d00';
  buttona17.style.color = 'rgb(31, 11, 11)';
  buttona17.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array17(){
  //SOLUTION
  box17.method(-9999,10000);
  document.getElementById("a17c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona17.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona17();

  //OH, STYLO
  buttona17.onmouseover = function (){arrOnMouseOverLight17()};
  buttona17.onmouseout = function (){arrOnMouseOutLight17()};
  buttona17.onmousedown = function (){arrOnMouseOutDark17()};
  buttona17.onmouseup = function (){arrOnMouseOverDark17()};
}

// 18. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posiciones están los números positivos.
var box18 = new get10Random("vector18");
var buttona18 = document.getElementById("arrayb18");
var inputArr18 = document.getElementById("arrayi18");
var freedom18;
var justice18;
var love18;
var flash18 = 0;
var xd18 = 0;
var cancelButton18 = 0;
var filterOfZeros18 = [];
var arrow18 = document.getElementsByClassName("arrow18");
var imgOff18 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd18 = document.querySelectorAll('div#a18d > div');
  [].forEach.call(dnd18,function(block){
    block.addEventListener('dragend',solutiona18);
  });

//solución al problema
function solutiona18(){
  if (cancelButton18==1){}
  else{
    
  function limitSolution(){
    cancelButton18 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow18,function(arrows){
    arrows.innerHTML = imgOff18; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector18 = [];
  for (let nums of box18.box){
      if (nums.textContent == 0){
        arrVector18.push(Number.parseInt(0));
      }
      else{
        arrVector18.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros18 = arrVector18.filter(x=>x!=0);
  box18.aux = filterOfZeros18;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES de números múltiplos de 3
  var seeker = filterOfZeros18.filter(x=>x>=1);
  var snitch = [];

  for (let j=0; j<seeker.length; j++){
    for (let i=0; i<filterOfZeros18.length; i++){
      if(filterOfZeros18[i]==seeker[j]){
        snitch.push(i);
      };
    };
  };

  
  var parallel = (snitch.length>1)? `<br> y se hallan en las posiciones n°: ${snitch} UwU`:`y se halla en la posición n°${snitch} c:`;
  var plural = (snitch.length>1)? `hay ${snitch.length} números positivos: ${seeker}`:`sólo hay un negativo: el número ${seeker}`;
  var no4 = (seeker.length==0)? `Este vector no cuenta con números positivos :c vaya suerte... <br> ¡Prueba con otra tanda de números, human@!`:`En este vector, ${plural} ${parallel}`;
  var answer = no4;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd18 == 2){ 
      if (flash18==-1){
        arrow18[0].innerHTML = imgOff18;
        xd18 = 0;
        flash18=0;
      }
      else if (flash18==0){
        arrow18[1].innerHTML = imgOff18;
        arrow18[0].innerHTML = img;
        flash18=-1;
      }
      else{
        if (flash18<=8){
          arrow18[(flash18+1)].innerHTML = imgOff18;
        };
        arrow18[flash18].innerHTML = img;
        flash18--;
      }               
    }
    else if(xd18 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash18 = 9;
      arrow18[flash18].innerHTML = img;
      xd18 = 2;
      flash18--;
    }
    else{
      if (flash18==10){                       //VUELTA 2
        arrow18[(flash18-1)].innerHTML = imgOff18;
        xd18++;
        flash18 = 0;
      }
      else{                                 //VUELTA 1
        if (flash18>=1){
          arrow18[(flash18-1)].innerHTML = imgOff18;
        };
        arrow18[flash18].innerHTML = img;
        flash18++;
      }
    };
      getE("a18e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom18);
    [].forEach.call(arrow18,function(arrows){
      arrows.innerHTML = imgOff18; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow18[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    
    getE("a18e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros18.length == 10) {
    cancelButton18 = 1;
    freedom18 = setInterval(animation,250);
    justice18 = setTimeout(solution, 2000);
    love18 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros18.length == 0){
    flash18 = 0;
    clearInterval(freedom18);
    clearTimeout(justice18);
    clearTimeout(love18);
    getE("a18e").innerHTML = ``;
    [].forEach.call(arrow18,function(arrows){
      arrows.innerHTML = imgOff18; 
    });
  }
  else{
    getE("a18e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr18.addEventListener("keydown",arrayi18, false);
var iOfBox18 = 0; 
function arrayi18(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros18.length == 10 || filterOfZeros18.length == 0){
      buttona18.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros18.length == 9){
        buttona18.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona18.innerHTML = `GENERAR ${10-filterOfZeros18.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr18.value<0)? `-`:``;

  if (isNaN(inputArr18.value)){
    document.getElementById("a18").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr18.value == `` || inputArr18.value == '-' || inputArr18.value == '--' || inputArr18.value == '---' || inputArr18.value == '----'){
    document.getElementById("a18").innerHTML = ``;
  }
  else{
    if (inputArr18.value == 0){
      if (filterOfZeros18.length > 0){
        document.getElementById("a18").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a18").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a18").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr18.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr18.value)){
      inputArr18.value = ``;
    }else{
    if (inputArr18.value == `` || inputArr18.value == '-' || inputArr18.value == '--' || inputArr18.value == '---' || inputArr18.value == '----'){
      inputArr18.value = ``;
    }
    else if (inputArr18.value == 0){
      if(filterOfZeros18.length==0){
        inputArr18.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice18);
        clearInterval(freedom18);
        document.getElementById("a18b").innerHTML = ``;
        document.getElementById("a18c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a18c").innerHTML = ``;
        };
        box18.aux = [];
        filterOfZeros18.length = [];
        box18.equalize();
        solutiona18();
        inputArr18.value = ``;
        iOfBox18 = 0;

        clearInterval(freedom18);
        clearTimeout(justice18);
        clearTimeout(love18);
        getE("a18e").innerHTML = ``;
        [].forEach.call(arrow18,function(arrows){
          arrows.innerHTML = imgOff18; 
        });
      }
    }
    else{
      if (filterOfZeros18.length == 10){
        document.getElementById("a18c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box18.aux.shift();
        box18.aux.push(Number(inputArr18.value));
        box18.equalize();
        solutiona18();
        inputArr18.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a18c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox18 = 0; iOfBox18 < 10; iOfBox18++){
          if(box18.box[iOfBox18].textContent == ``){
            box18.box[iOfBox18].textContent = Number.parseInt(inputArr18.value);
            iOfBox18 = 10;
          };
        };
        solutiona18();
        inputArr18.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight18(){
  buttona18.style.border="3px solid #ffab22";
  buttona18.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona18.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight18(){
  buttona18.style.border='3px solid #f7b64e';
  buttona18.style.color='#333333';
  buttona18.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark18(){
  buttona18.style.border="3px solid #ffaa22";
  buttona18.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark18(){
  buttona18.style.border = '1px solid #ff9d00';
  buttona18.style.color = 'rgb(31, 11, 11)';
  buttona18.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array18(){
  //SOLUTION
  box18.method(-9999,10000);
  document.getElementById("a18c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona18.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona18();

  //OH, STYLO
  buttona18.onmouseover = function (){arrOnMouseOverLight18()};
  buttona18.onmouseout = function (){arrOnMouseOutLight18()};
  buttona18.onmousedown = function (){arrOnMouseOutDark18()};
  buttona18.onmouseup = function (){arrOnMouseOverDark18()};
}

// 19. Leer 10 números enteros, almacenarlos en un vector y determinar cuál es el número menor.
var box19 = new get10Random("vector19");
var buttona19 = document.getElementById("arrayb19");
var inputArr19 = document.getElementById("arrayi19");
var freedom19;
var justice19;
var love19;
var flash19 = 0;
var xd19 = 0;
var cancelButton19 = 0;
var filterOfZeros19 = [];
var arrow19 = document.getElementsByClassName("arrow19");
var imgOff19 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd19 = document.querySelectorAll('div#a19d > div');
  [].forEach.call(dnd19,function(block){
    block.addEventListener('dragend',solutiona19);
  });

//solución al problema
function solutiona19(){
  if (cancelButton19==1){}
  else{
    
  function limitSolution(){
    cancelButton19 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow19,function(arrows){
    arrows.innerHTML = imgOff19; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector19 = [];
  for (let nums of box19.box){
      if (nums.textContent == 0){
        arrVector19.push(Number.parseInt(0));
      }
      else{
        arrVector19.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros19 = arrVector19.filter(x=>x!=0);
  box19.aux = filterOfZeros19;
  //Variables para solucionar la pregunta concreta
    var seeker = Math.min(...filterOfZeros19);
    var snitch = arrVector19.indexOf(seeker);

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd19 == 2){ 
      if (flash19==-1){
        arrow19[0].innerHTML = imgOff19;
        xd19 = 0;
        flash19=0;
      }
      else if (flash19==0){
        arrow19[1].innerHTML = imgOff19;
        arrow19[0].innerHTML = img;
        flash19=-1;
      }
      else{
        if (flash19<=8){
          arrow19[(flash19+1)].innerHTML = imgOff19;
        };
        arrow19[flash19].innerHTML = img;
        flash19--;
      }               
    }
    else if(xd19 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash19 = 9;
      arrow19[flash19].innerHTML = img;
      xd19 = 2;
      flash19--;
    }
    else{
      if (flash19==10){                       //VUELTA 2
        arrow19[(flash19-1)].innerHTML = imgOff19;
        xd19++;
        flash19 = 0;
      }
      else{                                 //VUELTA 1
        if (flash19>=1){
          arrow19[(flash19-1)].innerHTML = imgOff19;
        };
        arrow19[flash19].innerHTML = img;
        flash19++;
      }
    };
      getE("a19e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom19);
    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    flash19 = snitch;

    for (let i = 0; i < 10; i++) {
      if(i == snitch) {
        arrow19[i].innerHTML = imgOn;
      }
      else{
        arrow19[i].innerHTML = imgOff19;
      }
    };
    getE("a19e").innerHTML = `De este vector, el número menos es el ${seeker} y se halla en la posición n°${snitch} c:`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros19.length == 10) {
    cancelButton19 = 1;
    freedom19 = setInterval(animation,250);
    justice19 = setTimeout(solution, 2000);
    love19 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros19.length == 0){
    flash19 = 0;
    clearInterval(freedom19);
    clearTimeout(justice19);
    clearTimeout(love19);
    getE("a19e").innerHTML = ``;
    [].forEach.call(arrow19,function(arrows){
      arrows.innerHTML = imgOff19; 
    });
  }
  else{
    getE("a19e").innerHTML = `De este vector, el número menor es el ${seeker} y se halla en la posición n°${snitch} c: <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr19.addEventListener("keydown",arrayi19, false);
var iOfBox19 = 0; 
function arrayi19(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros19.length == 10 || filterOfZeros19.length == 0){
      buttona19.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros19.length == 9){
        buttona19.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona19.innerHTML = `GENERAR ${10-filterOfZeros19.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr19.value<0)? `-`:``;

  if (isNaN(inputArr19.value)){
    document.getElementById("a19").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr19.value == `` || inputArr19.value == '-' || inputArr19.value == '--' || inputArr19.value == '---' || inputArr19.value == '----'){
    document.getElementById("a19").innerHTML = ``;
  }
  else{
    if (inputArr19.value == 0){
      if (filterOfZeros19.length > 0){
        document.getElementById("a19").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a19").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a19").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr19.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr19.value)){
      inputArr19.value = ``;
    }else{
    if (inputArr19.value == `` || inputArr19.value == '-' || inputArr19.value == '--' || inputArr19.value == '---' || inputArr19.value == '----'){
      inputArr19.value = ``;
    }
    else if (inputArr19.value == 0){
      if(filterOfZeros19.length==0){
        inputArr19.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice19);
        clearInterval(freedom19);
        document.getElementById("a19b").innerHTML = ``;
        document.getElementById("a19c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a19c").innerHTML = ``;
        };
        box19.aux = [];
        filterOfZeros19.length = [];
        box19.equalize();
        solutiona19();
        inputArr19.value = ``;
        iOfBox19 = 0;

        clearInterval(freedom19);
        clearTimeout(justice19);
        clearTimeout(love19);
        getE("a19e").innerHTML = ``;
        [].forEach.call(arrow19,function(arrows){
          arrows.innerHTML = imgOff19; 
        });
      }
    }
    else{
      if (filterOfZeros19.length == 10){
        document.getElementById("a19c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box19.aux.shift();
        box19.aux.push(Number(inputArr19.value));
        box19.equalize();
        solutiona19();
        inputArr19.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a19c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox19 = 0; iOfBox19 < 10; iOfBox19++){
          if(box19.box[iOfBox19].textContent == ``){
            box19.box[iOfBox19].textContent = Number.parseInt(inputArr19.value);
            iOfBox19 = 10;
          };
        };
        solutiona19();
        inputArr19.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight19(){
  buttona19.style.border="3px solid #ffab22";
  buttona19.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona19.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight19(){
  buttona19.style.border='3px solid #f7b64e';
  buttona19.style.color='#333333';
  buttona19.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark19(){
  buttona19.style.border="3px solid #ffaa22";
  buttona19.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark19(){
  buttona19.style.border = '1px solid #ff9d00';
  buttona19.style.color = 'rgb(31, 11, 11)';
  buttona19.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array19(){
  //SOLUTION
  box19.method(-9999,10000);
  document.getElementById("a19c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona19.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona19();

  //OH, STYLO
  buttona19.onmouseover = function (){arrOnMouseOverLight19()};
  buttona19.onmouseout = function (){arrOnMouseOutLight19()};
  buttona19.onmousedown = function (){arrOnMouseOutDark19()};
  buttona19.onmouseup = function (){arrOnMouseOverDark19()};
}

// 20. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posición está el menor número primo.
var box20 = new get10Random("vector20");
var buttona20 = document.getElementById("arrayb20");
var inputArr20 = document.getElementById("arrayi20");
var freedom20;
var justice20;
var love20;
var flash20 = 0;
var xd20 = 0;
var cancelButton20 = 0;
var filterOfZeros20 = [];
var arrow20 = document.getElementsByClassName("arrow20");
var imgOff20 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd20 = document.querySelectorAll('div#a20d > div');
  [].forEach.call(dnd20,function(block){
    block.addEventListener('dragend',solutiona20);
  });

//solución al problema
function solutiona20(){
  if (cancelButton20==1){}
  else{
    
  function limitSolution(){
    cancelButton20 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow20,function(arrows){
    arrows.innerHTML = imgOff20; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector20 = [];
  for (let nums of box20.box){
      if (nums.textContent == 0){
        arrVector20.push(Number.parseInt(0));
      }
      else{
        arrVector20.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros20 = arrVector20.filter(x=>x!=0);
  box20.aux = filterOfZeros20;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //menor número primo leído

    //ALGORITHM FOR PRIME NUMBERS >:c
    var primes = [];

    for (let i = 0; i < 10; i++){
      let box = [];
      
      if(filterOfZeros20[i]>1){
        for (let numbers = 2; numbers < filterOfZeros20[i]; numbers++) {
          const prime = arrVector20[i]%numbers;
          if (prime == 0) {
            box.push(numbers);  
          };
        };
        
        if(box.length == 0){
          primes.push(filterOfZeros20[i]);
        };
      };
    };

  let seeker = Math.min(...primes);
  let snitch = arrVector20.indexOf(seeker);
    
  let plural = (primes.length == 1)? `solo el ${primes} en la posición n°${snitch} es primo... <br> Por ende, es el número primo más bajo uwu`:`${primes} son números primos <br> y el menor entre estos ${primes.length} es el ${seeker} en la posición ${snitch} c:`;

  let noPrimes = (primes.length == 0)? `En este vector no hay ningún número primo :c mala suerte... <br> Intenta ingresando otra tanda de 10 números, humano`:`De este vector, ${plural}`;

  var answer = `${noPrimes}`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd20 == 2){ 
      if (flash20==-1){
        arrow20[0].innerHTML = imgOff20;
        xd20 = 0;
        flash20=0;
      }
      else if (flash20==0){
        arrow20[1].innerHTML = imgOff20;
        arrow20[0].innerHTML = img;
        flash20=-1;
      }
      else{
        if (flash20<=8){
          arrow20[(flash20+1)].innerHTML = imgOff20;
        };
        arrow20[flash20].innerHTML = img;
        flash20--;
      }               
    }
    else if(xd20 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash20 = 9;
      arrow20[flash20].innerHTML = img;
      xd20 = 2;
      flash20--;
    }
    else{
      if (flash20==10){                       //VUELTA 2
        arrow20[(flash20-1)].innerHTML = imgOff20;
        xd20++;
        flash20 = 0;
      }
      else{                                 //VUELTA 1
        if (flash20>=1){
          arrow20[(flash20-1)].innerHTML = imgOff20;
        };
        arrow20[flash20].innerHTML = img;
        flash20++;
      }
    };
      getE("a20e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom20);
    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(snitch!=-1){
      flash20 = snitch;
    }
    else{
      flash20 = 0;
    };

    for (let i = 0; i < 10; i++) {
      if(i == snitch) {
        arrow20[i].innerHTML = imgOn;
      }
      else{
        arrow20[i].innerHTML = imgOff20;
      }
    };
    getE("a20e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros20.length == 10) {
    cancelButton20 = 1;
    freedom20 = setInterval(animation,250);
    justice20 = setTimeout(solution, 2000);
    love20 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros20.length == 0){
    flash20 = 0;
    clearInterval(freedom20);
    clearTimeout(justice20);
    clearTimeout(love20);
    getE("a20e").innerHTML = ``;
    [].forEach.call(arrow20,function(arrows){
      arrows.innerHTML = imgOff20; 
    });
  }
  else{
    getE("a20e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr20.addEventListener("keydown",arrayi20, false);
var iOfBox20 = 0; 
function arrayi20(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros20.length == 10 || filterOfZeros20.length == 0){
      buttona20.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros20.length == 9){
        buttona20.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona20.innerHTML = `GENERAR ${10-filterOfZeros20.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr20.value<0)? `-`:``;

  if (isNaN(inputArr20.value)){
    document.getElementById("a20").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr20.value == `` || inputArr20.value == '-' || inputArr20.value == '--' || inputArr20.value == '---' || inputArr20.value == '----'){
    document.getElementById("a20").innerHTML = ``;
  }
  else{
    if (inputArr20.value == 0){
      if (filterOfZeros20.length > 0){
        document.getElementById("a20").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a20").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a20").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr20.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr20.value)){
      inputArr20.value = ``;
    }else{
    if (inputArr20.value == `` || inputArr20.value == '-' || inputArr20.value == '--' || inputArr20.value == '---' || inputArr20.value == '----'){
      inputArr20.value = ``;
    }
    else if (inputArr20.value == 0){
      if(filterOfZeros20.length==0){
        inputArr20.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice20);
        clearInterval(freedom20);
        document.getElementById("a20b").innerHTML = ``;
        document.getElementById("a20c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a20c").innerHTML = ``;
        };
        box20.aux = [];
        filterOfZeros20.length = [];
        box20.equalize();
        solutiona20();
        inputArr20.value = ``;
        iOfBox20 = 0;

        clearInterval(freedom20);
        clearTimeout(justice20);
        clearTimeout(love20);
        getE("a20e").innerHTML = ``;
        [].forEach.call(arrow20,function(arrows){
          arrows.innerHTML = imgOff20; 
        });
      }
    }
    else{
      if (filterOfZeros20.length == 10){
        document.getElementById("a20c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box20.aux.shift();
        box20.aux.push(Number(inputArr20.value));
        box20.equalize();
        solutiona20();
        inputArr20.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a20c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox20 = 0; iOfBox20 < 10; iOfBox20++){
          if(box20.box[iOfBox20].textContent == ``){
            box20.box[iOfBox20].textContent = Number.parseInt(inputArr20.value);
            iOfBox20 = 10;
          };
        };
        solutiona20();
        inputArr20.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight20(){
  buttona20.style.border="3px solid #ffab22";
  buttona20.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona20.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight20(){
  buttona20.style.border='3px solid #f7b64e';
  buttona20.style.color='#333333';
  buttona20.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark20(){
  buttona20.style.border="3px solid #ffaa22";
  buttona20.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark20(){
  buttona20.style.border = '1px solid #ff9d00';
  buttona20.style.color = 'rgb(31, 11, 11)';
  buttona20.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array20(){
  //SOLUTION
  box20.method(-9999,10000);
  document.getElementById("a20c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona20.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona20();

  //OH, STYLO
  buttona20.onmouseover = function (){arrOnMouseOverLight20()};
  buttona20.onmouseout = function (){arrOnMouseOutLight20()};
  buttona20.onmousedown = function (){arrOnMouseOutDark20()};
  buttona20.onmouseup = function (){arrOnMouseOverDark20()};
}

// 21. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posición está el número cuya suma de dígitos sea la mayor.
var box21 = new get10Random("vector21");
var buttona21 = document.getElementById("arrayb21");
var inputArr21 = document.getElementById("arrayi21");
var freedom21;
var justice21;
var love21;
var flash21 = 0;
var xd21 = 0;
var cancelButton21 = 0;
var filterOfZeros21 = [];
var arrow21 = document.getElementsByClassName("arrow21");
var imgOff21 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd21 = document.querySelectorAll('div#a21d > div');
  [].forEach.call(dnd21,function(block){
    block.addEventListener('dragend',solutiona21);
  });

//solución al problema
function solutiona21(){
  if (cancelButton21==1){}
  else{
    
  function limitSolution(){
    cancelButton21 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow21,function(arrows){
    arrows.innerHTML = imgOff21; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector21 = [];
  for (let nums of box21.box){
      if (nums.textContent == 0){
        arrVector21.push(Number.parseInt(0));
      }
      else{
        arrVector21.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros21 = arrVector21.filter(x=>x!=0);
  box21.aux = filterOfZeros21;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES del número con la suma de dígitos más alta
  var box = [];
  var red = [];
  
  for(let i = 0; i < filterOfZeros21.length; i++){
    box[i] = Array.from(String(Math.abs(filterOfZeros21[i])),Number);
  };

  for(let i = 0; i < box.length; i++){
    red[i] = box[i].reduce(function(acc,cur){return acc+cur;},0);
  };

  var seeker = Math.max(...red);
  var snitch = red.indexOf(seeker);
  var basurero = [];

  for (let i=0; i<red.length; i++){
    if(seeker == red[i]){
      basurero.push(i);
    }
  };


  var parallel = (basurero.length>1)? `<br>y se halla repetido ${basurero.length} veces en las posiciones ${basurero} UwU`:`<br> y es la suma de dígitos del ${arrVector21[snitch]} que se halla en la posición n°${snitch} c:`;
  var answer = `SUMA DE DÍGITOS DE TODOS LOS NÚMEROS: ${red.join(', ')} <br> Obviamos el signo negativo, ¿okay? De aquí el número más alto es el ${seeker} ${parallel}`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd21 == 2){ 
      if (flash21==-1){
        arrow21[0].innerHTML = imgOff21;
        xd21 = 0;
        flash21=0;
      }
      else if (flash21==0){
        arrow21[1].innerHTML = imgOff21;
        arrow21[0].innerHTML = img;
        flash21=-1;
      }
      else{
        if (flash21<=8){
          arrow21[(flash21+1)].innerHTML = imgOff21;
        };
        arrow21[flash21].innerHTML = img;
        flash21--;
      }               
    }
    else if(xd21 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash21 = 9;
      arrow21[flash21].innerHTML = img;
      xd21 = 2;
      flash21--;
    }
    else{
      if (flash21==10){                       //VUELTA 2
        arrow21[(flash21-1)].innerHTML = imgOff21;
        xd21++;
        flash21 = 0;
      }
      else{                                 //VUELTA 1
        if (flash21>=1){
          arrow21[(flash21-1)].innerHTML = imgOff21;
        };
        arrow21[flash21].innerHTML = img;
        flash21++;
      }
    };
      getE("a21e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom21);
    [].forEach.call(arrow21,function(arrows){
      arrows.innerHTML = imgOff21; 
    });

    for (let i=0; i<basurero.length; i++){
      let miau = basurero[i]; 
      arrow21[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a21e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros21.length == 10) {
    cancelButton21 = 1;
    freedom21 = setInterval(animation,250);
    justice21 = setTimeout(solution, 2000);
    love21 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros21.length == 0){
    flash21 = 0;
    clearInterval(freedom21);
    clearTimeout(justice21);
    clearTimeout(love21);
    getE("a21e").innerHTML = ``;
    [].forEach.call(arrow21,function(arrows){
      arrows.innerHTML = imgOff21; 
    });
  }
  else{
    getE("a21e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr21.addEventListener("keydown",arrayi21, false);
var iOfBox21 = 0; 
function arrayi21(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros21.length == 10 || filterOfZeros21.length == 0){
      buttona21.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros21.length == 9){
        buttona21.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona21.innerHTML = `GENERAR ${10-filterOfZeros21.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr21.value<0)? `-`:``;

  if (isNaN(inputArr21.value)){
    document.getElementById("a21").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr21.value == `` || inputArr21.value == '-' || inputArr21.value == '--' || inputArr21.value == '---' || inputArr21.value == '----'){
    document.getElementById("a21").innerHTML = ``;
  }
  else{
    if (inputArr21.value == 0){
      if (filterOfZeros21.length > 0){
        document.getElementById("a21").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a21").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a21").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr21.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr21.value)){
      inputArr21.value = ``;
    }else{
    if (inputArr21.value == `` || inputArr21.value == '-' || inputArr21.value == '--' || inputArr21.value == '---' || inputArr21.value == '----'){
      inputArr21.value = ``;
    }
    else if (inputArr21.value == 0){
      if(filterOfZeros21.length==0){
        inputArr21.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice21);
        clearInterval(freedom21);
        document.getElementById("a21b").innerHTML = ``;
        document.getElementById("a21c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a21c").innerHTML = ``;
        };
        box21.aux = [];
        filterOfZeros21.length = [];
        box21.equalize();
        solutiona21();
        inputArr21.value = ``;
        iOfBox21 = 0;

        clearInterval(freedom21);
        clearTimeout(justice21);
        clearTimeout(love21);
        getE("a21e").innerHTML = ``;
        [].forEach.call(arrow21,function(arrows){
          arrows.innerHTML = imgOff21; 
        });
      }
    }
    else{
      if (filterOfZeros21.length == 10){
        document.getElementById("a21c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box21.aux.shift();
        box21.aux.push(Number(inputArr21.value));
        box21.equalize();
        solutiona21();
        inputArr21.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a21c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox21 = 0; iOfBox21 < 10; iOfBox21++){
          if(box21.box[iOfBox21].textContent == ``){
            box21.box[iOfBox21].textContent = Number.parseInt(inputArr21.value);
            iOfBox21 = 10;
          };
        };
        solutiona21();
        inputArr21.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight21(){
  buttona21.style.border="3px solid #ffab22";
  buttona21.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona21.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight21(){
  buttona21.style.border='3px solid #f7b64e';
  buttona21.style.color='#333333';
  buttona21.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark21(){
  buttona21.style.border="3px solid #ffaa22";
  buttona21.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark21(){
  buttona21.style.border = '1px solid #ff9d00';
  buttona21.style.color = 'rgb(31, 11, 11)';
  buttona21.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array21(){
  //SOLUTION
  box21.method(-9999,10000);
  document.getElementById("a21c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona21.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona21();

  //OH, STYLO
  buttona21.onmouseover = function (){arrOnMouseOverLight21()};
  buttona21.onmouseout = function (){arrOnMouseOutLight21()};
  buttona21.onmousedown = function (){arrOnMouseOutDark21()};
  buttona21.onmouseup = function (){arrOnMouseOverDark21()};
}

// 22. Leer 10 números enteros, almacenarlos en un vector y determinar cuáles son los números múltiplos de 5 y en qué posiciones están.
var box22 = new get10Random("vector22");
var buttona22 = document.getElementById("arrayb22");
var inputArr22 = document.getElementById("arrayi22");
var freedom22;
var justice22;
var love22;
var flash22 = 0;
var xd22 = 0;
var cancelButton22 = 0;
var filterOfZeros22 = [];
var arrow22 = document.getElementsByClassName("arrow22");
var imgOff22 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd22 = document.querySelectorAll('div#a22d > div');
  [].forEach.call(dnd22,function(block){
    block.addEventListener('dragend',solutiona22);
  });

//solución al problema
function solutiona22(){
  if (cancelButton22==1){}
  else{
    
  function limitSolution(){
    cancelButton22 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow22,function(arrows){
    arrows.innerHTML = imgOff22; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector22 = [];
  for (let nums of box22.box){
      if (nums.textContent == 0){
        arrVector22.push(Number.parseInt(0));
      }
      else{
        arrVector22.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros22 = arrVector22.filter(x=>x!=0);
  box22.aux = filterOfZeros22;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES de números múltiplos de 5
  var seeker = filterOfZeros22.filter(x=>x%5==0);
  var snitch = [];

  for (let j=0; j<seeker.length; j++){
    for (let i=0; i<filterOfZeros22.length; i++){
      if(filterOfZeros22[i]==seeker[j]){
        snitch.push(i);
      };
    };
  };

  
  var parallel = (snitch.length>1)? `<br> y se hallan en las posiciones n°: ${snitch} UwU`:`y se halla en la posición n°${snitch} c:`;
  var plural = (snitch.length>1)? `hay ${snitch.length} múltiplos de 5: ${seeker}`:`sólo hay un múltiplo del 5: el número ${seeker}`;
  var no4 = (seeker.length==0)? `Este vector no cuenta con múltiplos de 5 :c vaya suerte... <br> ¡Prueba con otra tanda de números, human@!`:`En este vector, ${plural} ${parallel}`;
  var answer = no4;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd22 == 2){ 
      if (flash22==-1){
        arrow22[0].innerHTML = imgOff22;
        xd22 = 0;
        flash22=0;
      }
      else if (flash22==0){
        arrow22[1].innerHTML = imgOff22;
        arrow22[0].innerHTML = img;
        flash22=-1;
      }
      else{
        if (flash22<=8){
          arrow22[(flash22+1)].innerHTML = imgOff22;
        };
        arrow22[flash22].innerHTML = img;
        flash22--;
      }               
    }
    else if(xd22 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash22 = 9;
      arrow22[flash22].innerHTML = img;
      xd22 = 2;
      flash22--;
    }
    else{
      if (flash22==10){                       //VUELTA 2
        arrow22[(flash22-1)].innerHTML = imgOff22;
        xd22++;
        flash22 = 0;
      }
      else{                                 //VUELTA 1
        if (flash22>=1){
          arrow22[(flash22-1)].innerHTML = imgOff22;
        };
        arrow22[flash22].innerHTML = img;
        flash22++;
      }
    };
      getE("a22e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom22);
    [].forEach.call(arrow22,function(arrows){
      arrows.innerHTML = imgOff22; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow22[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    
    getE("a22e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros22.length == 10) {
    cancelButton22 = 1;
    freedom22 = setInterval(animation,250);
    justice22 = setTimeout(solution, 2000);
    love22 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros22.length == 0){
    flash22 = 0;
    clearInterval(freedom22);
    clearTimeout(justice22);
    clearTimeout(love22);
    getE("a22e").innerHTML = ``;
    [].forEach.call(arrow22,function(arrows){
      arrows.innerHTML = imgOff22; 
    });
  }
  else{
    getE("a22e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr22.addEventListener("keydown",arrayi22, false);
var iOfBox22 = 0; 
function arrayi22(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros22.length == 10 || filterOfZeros22.length == 0){
      buttona22.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros22.length == 9){
        buttona22.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona22.innerHTML = `GENERAR ${10-filterOfZeros22.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr22.value<0)? `-`:``;

  if (isNaN(inputArr22.value)){
    document.getElementById("a22").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr22.value == `` || inputArr22.value == '-' || inputArr22.value == '--' || inputArr22.value == '---' || inputArr22.value == '----'){
    document.getElementById("a22").innerHTML = ``;
  }
  else{
    if (inputArr22.value == 0){
      if (filterOfZeros22.length > 0){
        document.getElementById("a22").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a22").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a22").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr22.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr22.value)){
      inputArr22.value = ``;
    }else{
    if (inputArr22.value == `` || inputArr22.value == '-' || inputArr22.value == '--' || inputArr22.value == '---' || inputArr22.value == '----'){
      inputArr22.value = ``;
    }
    else if (inputArr22.value == 0){
      if(filterOfZeros22.length==0){
        inputArr22.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice22);
        clearInterval(freedom22);
        document.getElementById("a22b").innerHTML = ``;
        document.getElementById("a22c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a22c").innerHTML = ``;
        };
        box22.aux = [];
        filterOfZeros22.length = [];
        box22.equalize();
        solutiona22();
        inputArr22.value = ``;
        iOfBox22 = 0;

        clearInterval(freedom22);
        clearTimeout(justice22);
        clearTimeout(love22);
        getE("a22e").innerHTML = ``;
        [].forEach.call(arrow22,function(arrows){
          arrows.innerHTML = imgOff22; 
        });
      }
    }
    else{
      if (filterOfZeros22.length == 10){
        document.getElementById("a22c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box22.aux.shift();
        box22.aux.push(Number(inputArr22.value));
        box22.equalize();
        solutiona22();
        inputArr22.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a22c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox22 = 0; iOfBox22 < 10; iOfBox22++){
          if(box22.box[iOfBox22].textContent == ``){
            box22.box[iOfBox22].textContent = Number.parseInt(inputArr22.value);
            iOfBox22 = 10;
          };
        };
        solutiona22();
        inputArr22.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight22(){
  buttona22.style.border="3px solid #ffab22";
  buttona22.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona22.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight22(){
  buttona22.style.border='3px solid #f7b64e';
  buttona22.style.color='#333333';
  buttona22.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark22(){
  buttona22.style.border="3px solid #ffaa22";
  buttona22.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark22(){
  buttona22.style.border = '1px solid #ff9d00';
  buttona22.style.color = 'rgb(31, 11, 11)';
  buttona22.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array22(){
  //SOLUTION
  box22.method(-9999,10000);
  document.getElementById("a22c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona22.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona22();

  //OH, STYLO
  buttona22.onmouseover = function (){arrOnMouseOverLight22()};
  buttona22.onmouseout = function (){arrOnMouseOutLight22()};
  buttona22.onmousedown = function (){arrOnMouseOutDark22()};
  buttona22.onmouseup = function (){arrOnMouseOverDark22()};
}

// 23. Leer 10 números enteros, almacenarlos en un vector y determinar si existe al menos un número repetido.
var box23 = new get10Random("vector23");
var buttona23 = document.getElementById("arrayb23");
var inputArr23 = document.getElementById("arrayi23");
var freedom23;
var justice23;
var love23;
var flash23 = 0;
var xd23 = 0;
var cancelButton23 = 0;
var filterOfZeros23 = [];
var arrow23 = document.getElementsByClassName("arrow23");
var imgOff23 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd23 = document.querySelectorAll('div#a23d > div');
  [].forEach.call(dnd23,function(block){
    block.addEventListener('dragend',solutiona23);
  });

//solución al problema
function solutiona23(){
  if (cancelButton23==1){}
  else{
    
  function limitSolution(){
    cancelButton23 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow23,function(arrows){
    arrows.innerHTML = imgOff23; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector23 = [];
  for (let nums of box23.box){
      if (nums.textContent == 0){
        arrVector23.push(Number.parseInt(0));
      }
      else{
        arrVector23.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros23 = arrVector23.filter(x=>x!=0);
  box23.aux = filterOfZeros23;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES de números repetidos.

  //PARA HALLAR LOS NÚMEROS QUE SE REPITEN    
  var box = [];
  for (let j=0; j < filterOfZeros23.length; j++){
      for (let i=0; i < filterOfZeros23.length; i++){
        if((filterOfZeros23[j] == filterOfZeros23[i]) && (j!=i)){
          box.push(filterOfZeros23[j]);
        };
      };
    };
    var seeker = box.filter((value,index,array)=>array.indexOf(value)===index);
    
  //PARA HALLAR EL ÍNDICE DE LOS NÚMEROS QUE SE REPITEN
  var basurero = [];
  for (let i=0; i<seeker.length; i++){
    basurero.push(filterOfZeros23.indexOf(seeker[i]));
  };

  //PARA HALLAR LOS ÍNDICES DE LOS NÚMEROS REPETIDOS (EXCLUYENDO AL ORIGINAL)
  var msn = [];
  for(let j=0; j<seeker.length; j++){
    msn[j] = [];
    for(let i=0; i<filterOfZeros23.length; i++){
      if(seeker[j] == filterOfZeros23[i] && basurero[j] != i){
        msn[j].push(i);
      };
    };
  };
  var snitch = msn.filter((value,index,array)=>array.indexOf(value)===index);

  //RESPUESTA
  var answer = ``;
  var plural = ``;

  if(seeker.length==0){
    answer = `En este vector no hay números repetidos, human@...<br> :c ¡Prueba otra tanda de números!`;
  }
  else if(seeker.length>1){
    answer = `En este vector, se repiten ${seeker.length} números: ${seeker.join(', ')} UwU <br><br>`;
  };

  for (let i=0; i<seeker.length; i++){
    plural = (snitch[i].length==1)? `y se repite <br> ${snitch[i].length} única vez en el índice ${snitch[i]}`:`y se replica <br> hasta ${snitch[i].length} veces en los índices ${snitch[i].join(', ')}`;

    if (seeker.length == 1){
      answer = `En este vector, solo se repite el número ${seeker}, <br> ubicado en la posición ${basurero} ${plural} UwU`;
    }
    else{
      answer += `El ${seeker[i]} se halla en la posición ${basurero[i]} ${plural} <br><br>`;
    };
  };


  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd23 == 2){ 
      if (flash23==-1){
        arrow23[0].innerHTML = imgOff23;
        xd23 = 0;
        flash23=0;
      }
      else if (flash23==0){
        arrow23[1].innerHTML = imgOff23;
        arrow23[0].innerHTML = img;
        flash23=-1;
      }
      else{
        if (flash23<=8){
          arrow23[(flash23+1)].innerHTML = imgOff23;
        };
        arrow23[flash23].innerHTML = img;
        flash23--;
      }               
    }
    else if(xd23 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash23 = 9;
      arrow23[flash23].innerHTML = img;
      xd23 = 2;
      flash23--;
    }
    else{
      if (flash23==10){                       //VUELTA 2
        arrow23[(flash23-1)].innerHTML = imgOff23;
        xd23++;
        flash23 = 0;
      }
      else{                                 //VUELTA 1
        if (flash23>=1){
          arrow23[(flash23-1)].innerHTML = imgOff23;
        };
        arrow23[flash23].innerHTML = img;
        flash23++;
      }
    };
      getE("a23e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom23);
    [].forEach.call(arrow23,function(arrows){
      arrows.innerHTML = imgOff23; 
    });

    for (let i=0; i<basurero.length; i++){
      let miau = basurero[i]; 
      arrow23[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a23e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros23.length == 10) {
    cancelButton23 = 1;
    freedom23 = setInterval(animation,250);
    justice23 = setTimeout(solution, 2000);
    love23 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros23.length == 0){
    flash23 = 0;
    clearInterval(freedom23);
    clearTimeout(justice23);
    clearTimeout(love23);
    getE("a23e").innerHTML = ``;
    [].forEach.call(arrow23,function(arrows){
      arrows.innerHTML = imgOff23; 
    });
  }
  else{
    getE("a23e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr23.addEventListener("keydown",arrayi23, false);
var iOfBox23 = 0; 
function arrayi23(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros23.length == 10 || filterOfZeros23.length == 0){
      buttona23.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros23.length == 9){
        buttona23.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona23.innerHTML = `GENERAR ${10-filterOfZeros23.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr23.value<0)? `-`:``;

  if (isNaN(inputArr23.value)){
    document.getElementById("a23").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr23.value == `` || inputArr23.value == '-' || inputArr23.value == '--' || inputArr23.value == '---' || inputArr23.value == '----'){
    document.getElementById("a23").innerHTML = ``;
  }
  else{
    if (inputArr23.value == 0){
      if (filterOfZeros23.length > 0){
        document.getElementById("a23").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a23").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a23").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr23.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr23.value)){
      inputArr23.value = ``;
    }else{
    if (inputArr23.value == `` || inputArr23.value == '-' || inputArr23.value == '--' || inputArr23.value == '---' || inputArr23.value == '----'){
      inputArr23.value = ``;
    }
    else if (inputArr23.value == 0){
      if(filterOfZeros23.length==0){
        inputArr23.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice23);
        clearInterval(freedom23);
        document.getElementById("a23b").innerHTML = ``;
        document.getElementById("a23c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a23c").innerHTML = ``;
        };
        box23.aux = [];
        filterOfZeros23.length = [];
        box23.equalize();
        solutiona23();
        inputArr23.value = ``;
        iOfBox23 = 0;

        clearInterval(freedom23);
        clearTimeout(justice23);
        clearTimeout(love23);
        getE("a23e").innerHTML = ``;
        [].forEach.call(arrow23,function(arrows){
          arrows.innerHTML = imgOff23; 
        });
      }
    }
    else{
      if (filterOfZeros23.length == 10){
        document.getElementById("a23c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box23.aux.shift();
        box23.aux.push(Number(inputArr23.value));
        box23.equalize();
        solutiona23();
        inputArr23.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a23c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox23 = 0; iOfBox23 < 10; iOfBox23++){
          if(box23.box[iOfBox23].textContent == ``){
            box23.box[iOfBox23].textContent = Number.parseInt(inputArr23.value);
            iOfBox23 = 10;
          };
        };
        solutiona23();
        inputArr23.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight23(){
  buttona23.style.border="3px solid #ffab22";
  buttona23.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona23.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight23(){
  buttona23.style.border='3px solid #f7b64e';
  buttona23.style.color='#333333';
  buttona23.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark23(){
  buttona23.style.border="3px solid #ffaa22";
  buttona23.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark23(){
  buttona23.style.border = '1px solid #ff9d00';
  buttona23.style.color = 'rgb(31, 11, 11)';
  buttona23.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array23(){
  //SOLUTION
  box23.method(-9999,10000);
  document.getElementById("a23c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona23.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona23();

  //OH, STYLO
  buttona23.onmouseover = function (){arrOnMouseOverLight23()};
  buttona23.onmouseout = function (){arrOnMouseOutLight23()};
  buttona23.onmousedown = function (){arrOnMouseOutDark23()};
  buttona23.onmouseup = function (){arrOnMouseOverDark23()};
}

// 24. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posición está el número con mas dígitos.
var box24 = new get10Random("vector24");
var buttona24 = document.getElementById("arrayb24");
var inputArr24 = document.getElementById("arrayi24");
var freedom24;
var justice24;
var love24;
var flash24 = 0;
var xd24 = 0;
var cancelButton24 = 0;
var filterOfZeros24 = [];
var arrow24 = document.getElementsByClassName("arrow24");
var imgOff24 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd24 = document.querySelectorAll('div#a24d > div');
  [].forEach.call(dnd24,function(block){
    block.addEventListener('dragend',solutiona24);
  });

//solución al problema
function solutiona24(){
  if (cancelButton24==1){}
  else{
    
  function limitSolution(){
    cancelButton24 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow24,function(arrows){
    arrows.innerHTML = imgOff24; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector24 = [];
  for (let nums of box24.box){
      if (nums.textContent == 0){
        arrVector24.push(Number.parseInt(0));
      }
      else{
        arrVector24.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros24 = arrVector24.filter(x=>x!=0);
  box24.aux = filterOfZeros24;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES de los números con más dígitos 
  let one = filterOfZeros24.filter(x=>(Math.abs(x))<=9 && (Math.abs(x))>=1);
  let two = filterOfZeros24.filter(x=>(Math.abs(x))<=99 && (Math.abs(x))>=10);
  let three = filterOfZeros24.filter(x=>(Math.abs(x))<=999 && (Math.abs(x))>=100);
  let four = filterOfZeros24.filter(x=>(Math.abs(x))<=9999 && (Math.abs(x))>=1000);
  
  //Adquirimos los números con más dígitos
  var seeker = [];
  var snitch = 0;
  if (four.length >= 1){
    for(let i = 0; i < four.length; i++){
      seeker.push(four[i]);
    };   
    snitch = 4;
  }
  else if (three.length >= 1){
    for(let i = 0; i < three.length; i++){
      seeker.push(three[i]);
    };
    snitch = 3;
  }  
  else if (two.length >= 1){
    for(let i = 0; i < two.length; i++){
      seeker.push(two[i]);
    };
    snitch = 2;
  }
  else{
    for(let i = 0; i < one.length; i++){
      seeker.push(one[i]);
    };
    snitch = 1;
  };

  //Determinamos sus índices
  var basurero = [];
  for (let i = 0; i < seeker.length; i++){
    basurero.push(arrVector24.indexOf(seeker[i]));
  };

  let pos = ``;
  for (let i = 0; i < seeker.length; i++){
    pos += `El ${seeker[i]} en la posición n°${basurero[i]} <br>`;
  };

  var parallel = (seeker.length>1)? `y se da por estos ${seeker.length} pilluelos que ya te los ubico: c:<br><br> ${pos}`:`y de hecho... Solo se da por un único número: el ${seeker} en la posición n°${basurero} <br> ¿Ves como uno solito puede marcar la diferencia? c:`;
  var answer = `La cantidad de dígitos más alta en los números es de ${snitch}, <br> ${parallel}`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd24 == 2){ 
      if (flash24==-1){
        arrow24[0].innerHTML = imgOff24;
        xd24 = 0;
        flash24=0;
      }
      else if (flash24==0){
        arrow24[1].innerHTML = imgOff24;
        arrow24[0].innerHTML = img;
        flash24=-1;
      }
      else{
        if (flash24<=8){
          arrow24[(flash24+1)].innerHTML = imgOff24;
        };
        arrow24[flash24].innerHTML = img;
        flash24--;
      }               
    }
    else if(xd24 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash24 = 9;
      arrow24[flash24].innerHTML = img;
      xd24 = 2;
      flash24--;
    }
    else{
      if (flash24==10){                       //VUELTA 2
        arrow24[(flash24-1)].innerHTML = imgOff24;
        xd24++;
        flash24 = 0;
      }
      else{                                 //VUELTA 1
        if (flash24>=1){
          arrow24[(flash24-1)].innerHTML = imgOff24;
        };
        arrow24[flash24].innerHTML = img;
        flash24++;
      }
    };
      getE("a24e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom24);
    [].forEach.call(arrow24,function(arrows){
      arrows.innerHTML = imgOff24; 
    });

    for (let i=0; i<basurero.length; i++){
      let miau = basurero[i]; 
      arrow24[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a24e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros24.length == 10) {
    cancelButton24 = 1;
    freedom24 = setInterval(animation,250);
    justice24 = setTimeout(solution, 2000);
    love24 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros24.length == 0){
    flash24 = 0;
    clearInterval(freedom24);
    clearTimeout(justice24);
    clearTimeout(love24);
    getE("a24e").innerHTML = ``;
    [].forEach.call(arrow24,function(arrows){
      arrows.innerHTML = imgOff24; 
    });
  }
  else{
    getE("a24e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr24.addEventListener("keydown",arrayi24, false);
var iOfBox24 = 0; 
function arrayi24(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros24.length == 10 || filterOfZeros24.length == 0){
      buttona24.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros24.length == 9){
        buttona24.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona24.innerHTML = `GENERAR ${10-filterOfZeros24.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr24.value<0)? `-`:``;

  if (isNaN(inputArr24.value)){
    document.getElementById("a24").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr24.value == `` || inputArr24.value == '-' || inputArr24.value == '--' || inputArr24.value == '---' || inputArr24.value == '----'){
    document.getElementById("a24").innerHTML = ``;
  }
  else{
    if (inputArr24.value == 0){
      if (filterOfZeros24.length > 0){
        document.getElementById("a24").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a24").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a24").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr24.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr24.value)){
      inputArr24.value = ``;
    }else{
    if (inputArr24.value == `` || inputArr24.value == '-' || inputArr24.value == '--' || inputArr24.value == '---' || inputArr24.value == '----'){
      inputArr24.value = ``;
    }
    else if (inputArr24.value == 0){
      if(filterOfZeros24.length==0){
        inputArr24.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice24);
        clearInterval(freedom24);
        document.getElementById("a24b").innerHTML = ``;
        document.getElementById("a24c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a24c").innerHTML = ``;
        };
        box24.aux = [];
        filterOfZeros24.length = [];
        box24.equalize();
        solutiona24();
        inputArr24.value = ``;
        iOfBox24 = 0;

        clearInterval(freedom24);
        clearTimeout(justice24);
        clearTimeout(love24);
        getE("a24e").innerHTML = ``;
        [].forEach.call(arrow24,function(arrows){
          arrows.innerHTML = imgOff24; 
        });
      }
    }
    else{
      if (filterOfZeros24.length == 10){
        document.getElementById("a24c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box24.aux.shift();
        box24.aux.push(Number(inputArr24.value));
        box24.equalize();
        solutiona24();
        inputArr24.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a24c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox24 = 0; iOfBox24 < 10; iOfBox24++){
          if(box24.box[iOfBox24].textContent == ``){
            box24.box[iOfBox24].textContent = Number.parseInt(inputArr24.value);
            iOfBox24 = 10;
          };
        };
        solutiona24();
        inputArr24.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight24(){
  buttona24.style.border="3px solid #ffab22";
  buttona24.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona24.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight24(){
  buttona24.style.border='3px solid #f7b64e';
  buttona24.style.color='#333333';
  buttona24.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark24(){
  buttona24.style.border="3px solid #ffaa22";
  buttona24.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark24(){
  buttona24.style.border = '1px solid #ff9d00';
  buttona24.style.color = 'rgb(31, 11, 11)';
  buttona24.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array24(){
  //SOLUTION
  box24.method(-9999,10000);
  document.getElementById("a24c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona24.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona24();

  //OH, STYLO
  buttona24.onmouseover = function (){arrOnMouseOverLight24()};
  buttona24.onmouseout = function (){arrOnMouseOutLight24()};
  buttona24.onmousedown = function (){arrOnMouseOutDark24()};
  buttona24.onmouseup = function (){arrOnMouseOverDark24()};
}

// 25. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos de los números leídos son números primos terminados en 3.
var box25 = new get10Random("vector25");
var buttona25 = document.getElementById("arrayb25");
var inputArr25 = document.getElementById("arrayi25");
var freedom25;
var justice25;
var love25;
var flash25 = 0;
var xd25 = 0;
var cancelButton25 = 0;
var filterOfZeros25 = [];
var arrow25 = document.getElementsByClassName("arrow25");
var imgOff25 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd25 = document.querySelectorAll('div#a25d > div');
  [].forEach.call(dnd25,function(block){
    block.addEventListener('dragend',solutiona25);
  });

//solución al problema
function solutiona25(){
  if (cancelButton25==1){}
  else{
    
  function limitSolution(){
    cancelButton25 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow25,function(arrows){
    arrows.innerHTML = imgOff25; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector25 = [];
  for (let nums of box25.box){
      if (nums.textContent == 0){
        arrVector25.push(Number.parseInt(0));
      }
      else{
        arrVector25.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros25 = arrVector25.filter(x=>x!=0);
  box25.aux = filterOfZeros25;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //menor número primo leído

    //ALGORITHM FOR PRIME NUMBERS >:c
    var primes = [];

    for (let i = 0; i < 10; i++){
      let box = [];
      
      if(filterOfZeros25[i]>1){
        for (let numbers = 2; numbers < filterOfZeros25[i]; numbers++) {
          const prime = arrVector25[i]%numbers;
          if (prime == 0) {
            box.push(numbers);  
          };
        };
        
        if(box.length == 0){
          primes.push(filterOfZeros25[i]);
        };
      };
    };

  let seeker = primes.filter(x=>(x%10)==3);
  let snitch = [];
  for (let i=0; i<seeker.length; i++){
    snitch.push(arrVector25.indexOf(seeker[i]));
  };
  
  let oneOrTwo = (seeker.length == 1)? `<br> y pues el ${seeker} termina en 3 c:`:`<br> e increíblemente, los números ${seeker.join(', ')} terminan en 3 :DD`
  let plural = (seeker.length > 0)? oneOrTwo:`...Pero no hay primo alguno que termine en 3 :c`;
  let cousin = (primes.length == 1)? `¡El número ${primes} es primo!`:`¡Los números ${primes.join(', ')} son primos! :D`;
  let noPrimes = (primes.length == 0)? `En este vector no hay ningún número primo :c mala suerte... <br> Intenta ingresando otra tanda de 10 números, humano`:`${cousin} :D ${plural}`;

  var answer = `${noPrimes}`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd25 == 2){ 
      if (flash25==-1){
        arrow25[0].innerHTML = imgOff25;
        xd25 = 0;
        flash25=0;
      }
      else if (flash25==0){
        arrow25[1].innerHTML = imgOff25;
        arrow25[0].innerHTML = img;
        flash25=-1;
      }
      else{
        if (flash25<=8){
          arrow25[(flash25+1)].innerHTML = imgOff25;
        };
        arrow25[flash25].innerHTML = img;
        flash25--;
      }               
    }
    else if(xd25 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash25 = 9;
      arrow25[flash25].innerHTML = img;
      xd25 = 2;
      flash25--;
    }
    else{
      if (flash25==10){                       //VUELTA 2
        arrow25[(flash25-1)].innerHTML = imgOff25;
        xd25++;
        flash25 = 0;
      }
      else{                                 //VUELTA 1
        if (flash25>=1){
          arrow25[(flash25-1)].innerHTML = imgOff25;
        };
        arrow25[flash25].innerHTML = img;
        flash25++;
      }
    };
      getE("a25e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom25);
    [].forEach.call(arrow25,function(arrows){
      arrows.innerHTML = imgOff25; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow25[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a25e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros25.length == 10) {
    cancelButton25 = 1;
    freedom25 = setInterval(animation,250);
    justice25 = setTimeout(solution, 2500);
    love25 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros25.length == 0){
    flash25 = 0;
    clearInterval(freedom25);
    clearTimeout(justice25);
    clearTimeout(love25);
    getE("a25e").innerHTML = ``;
    [].forEach.call(arrow25,function(arrows){
      arrows.innerHTML = imgOff25; 
    });
  }
  else{
    getE("a25e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr25.addEventListener("keydown",arrayi25, false);
var iOfBox25 = 0; 
function arrayi25(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros25.length == 10 || filterOfZeros25.length == 0){
      buttona25.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros25.length == 9){
        buttona25.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona25.innerHTML = `GENERAR ${10-filterOfZeros25.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr25.value<0)? `-`:``;

  if (isNaN(inputArr25.value)){
    document.getElementById("a25").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr25.value == `` || inputArr25.value == '-' || inputArr25.value == '--' || inputArr25.value == '---' || inputArr25.value == '----'){
    document.getElementById("a25").innerHTML = ``;
  }
  else{
    if (inputArr25.value == 0){
      if (filterOfZeros25.length > 0){
        document.getElementById("a25").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a25").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a25").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr25.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr25.value)){
      inputArr25.value = ``;
    }else{
    if (inputArr25.value == `` || inputArr25.value == '-' || inputArr25.value == '--' || inputArr25.value == '---' || inputArr25.value == '----'){
      inputArr25.value = ``;
    }
    else if (inputArr25.value == 0){
      if(filterOfZeros25.length==0){
        inputArr25.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice25);
        clearInterval(freedom25);
        document.getElementById("a25b").innerHTML = ``;
        document.getElementById("a25c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a25c").innerHTML = ``;
        };
        box25.aux = [];
        filterOfZeros25.length = [];
        box25.equalize();
        solutiona25();
        inputArr25.value = ``;
        iOfBox25 = 0;

        clearInterval(freedom25);
        clearTimeout(justice25);
        clearTimeout(love25);
        getE("a25e").innerHTML = ``;
        [].forEach.call(arrow25,function(arrows){
          arrows.innerHTML = imgOff25; 
        });
      }
    }
    else{
      if (filterOfZeros25.length == 10){
        document.getElementById("a25c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box25.aux.shift();
        box25.aux.push(Number(inputArr25.value));
        box25.equalize();
        solutiona25();
        inputArr25.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a25c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox25 = 0; iOfBox25 < 10; iOfBox25++){
          if(box25.box[iOfBox25].textContent == ``){
            box25.box[iOfBox25].textContent = Number.parseInt(inputArr25.value);
            iOfBox25 = 10;
          };
        };
        solutiona25();
        inputArr25.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight25(){
  buttona25.style.border="3px solid #ffab22";
  buttona25.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona25.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight25(){
  buttona25.style.border='3px solid #f7b64e';
  buttona25.style.color='#333333';
  buttona25.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark25(){
  buttona25.style.border="3px solid #ffaa22";
  buttona25.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark25(){
  buttona25.style.border = '1px solid #ff9d00';
  buttona25.style.color = 'rgb(31, 11, 11)';
  buttona25.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array25(){
  //SOLUTION
  box25.method(-9999,10000);
  document.getElementById("a25c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona25.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona25();

  //OH, STYLO
  buttona25.onmouseover = function (){arrOnMouseOverLight25()};
  buttona25.onmouseout = function (){arrOnMouseOutLight25()};
  buttona25.onmousedown = function (){arrOnMouseOutDark25()};
  buttona25.onmouseup = function (){arrOnMouseOverDark25()};
}

// 26. Leer 10 números enteros, almacenarlos en un vector y calcularle el factorial a cada uno de los números leídos almacenándolos en otro vector.
var box26 = new get10Random("vector26");
var buttona26 = document.getElementById("arrayb26");
var inputArr26 = document.getElementById("arrayi26");
var filterOfZeros26 = [];


  //DRAG AND DROP
  var dnd26 = document.querySelectorAll('div#a26d > div');
  [].forEach.call(dnd26,function(block){
    block.addEventListener('dragend',solutiona26);
  });

//solución al problema
function solutiona26(){
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector26 = [];
  for (let nums of box26.box){
      if (nums.textContent == 0){
        arrVector26.push(Number.parseInt(0));
      }
      else{
        arrVector26.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros26 = arrVector26.filter(x=>x!=0);
  box26.aux = filterOfZeros26;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //Todos los enteros entre 1 y el número
      var seeker = ``;
      for (let j = 0; j < arrVector26.length; j++){
        let box = [];
        let zero = (arrVector26[j]==0)? 0:arrVector26[j];
        seeker += `<br> POSICIÓN ${j}, NÚMERO ${zero}<br>`;
        for (let i = 1; i < Math.abs(arrVector26[j]); i++){
          box.push(i);
          seeker += `${i} * `;
        };
        if(arrVector26[j] == 0 || arrVector26[j] == -1){
          seeker += `${arrVector26[j]}! = 1 <br>`;
        }
        else{
          box.push(Math.abs(arrVector26[j]));
          let fact = box.reduce(function(acc,cur){return acc*cur;},1);
          let resp = new Intl.NumberFormat().format(fact);
          seeker += `${Math.abs(arrVector26[j])} = ${resp} <br>`;
          seeker += `<br>`;
        };
      };
    
      var answer = `(Aquí discúlpame, human@, limité los números a un dígito, <br> porque si no... Me quedaba esto una mazamorra xd) <br> Por cierto, los factoriales no pueden ser negativos... Solo por...Si acaso c: <br> ${seeker}`;

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a26e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros26.length == 10) {
    solution();
  }
  else if (filterOfZeros26.length == 0){
    getE("a26e").innerHTML = ``;

  }
  else{
    getE("a26e").innerHTML = `${answer} <br> uwu`;
  };
};

//FUNCIONES PARA EL INPUT
inputArr26.addEventListener("keydown",arrayi26, false);
var iOfBox26 = 0; 
function arrayi26(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros26.length == 10 || filterOfZeros26.length == 0){
      buttona26.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros26.length == 9){
        buttona26.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona26.innerHTML = `GENERAR ${10-filterOfZeros26.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr26.value<0)? `-`:``;

  if (isNaN(inputArr26.value)){
    document.getElementById("a26").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr26.value == `` || inputArr26.value == '-' || inputArr26.value == '--' || inputArr26.value == '---' || inputArr26.value == '----'){
    document.getElementById("a26").innerHTML = ``;
  }
  else{
    if (inputArr26.value == 0){
      if (filterOfZeros26.length > 0){
        document.getElementById("a26").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a26").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a26").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr26.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr26.value)){
      inputArr26.value = ``;
    }else{
    if (inputArr26.value == `` || inputArr26.value == '-' || inputArr26.value == '--' || inputArr26.value == '---' || inputArr26.value == '----'){
      inputArr26.value = ``;
    }
    else if (inputArr26.value == 0){
      if(filterOfZeros26.length==0){
        inputArr26.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        document.getElementById("a26b").innerHTML = ``;
        document.getElementById("a26c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a26c").innerHTML = ``;
        };
        box26.aux = [];
        filterOfZeros26.length = [];
        box26.equalize();
        solutiona26();
        inputArr26.value = ``;
        iOfBox26 = 0;
      }
    }
    else{
      if (filterOfZeros26.length == 10){
        document.getElementById("a26c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box26.aux.shift();
        box26.aux.push(Number(inputArr26.value));
        box26.equalize();
        solutiona26();
        inputArr26.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a26c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox26 = 0; iOfBox26 < 10; iOfBox26++){
          if(box26.box[iOfBox26].textContent == ``){
            box26.box[iOfBox26].textContent = Number.parseInt(inputArr26.value);
            iOfBox26 = 10;
          };
        };
        solutiona26();
        inputArr26.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight26(){
  buttona26.style.border="3px solid #ffab22";
  buttona26.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona26.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight26(){
  buttona26.style.border='3px solid #f7b64e';
  buttona26.style.color='#333333';
  buttona26.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark26(){
  buttona26.style.border="3px solid #ffaa22";
  buttona26.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark26(){
  buttona26.style.border = '1px solid #ff9d00';
  buttona26.style.color = 'rgb(31, 11, 11)';
  buttona26.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array26(){
  //SOLUTION
  box26.method(-9,10);
  document.getElementById("a26c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona26.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona26();

  //OH, STYLO
  buttona26.onmouseover = function (){arrOnMouseOverLight26()};
  buttona26.onmouseout = function (){arrOnMouseOutLight26()};
  buttona26.onmousedown = function (){arrOnMouseOutDark26()};
  buttona26.onmouseup = function (){arrOnMouseOverDark26()};
}

// 27. Leer 10 números enteros, almacenarlos en un vector y determinar a cuánto es igual el promedio entero de los factoriales de cada uno de los números leídos.
var box27 = new get10Random("vector27");
var buttona27 = document.getElementById("arrayb27");
var inputArr27 = document.getElementById("arrayi27");
var filterOfZeros27 = [];


  //DRAG AND DROP
  var dnd27 = document.querySelectorAll('div#a27d > div');
  [].forEach.call(dnd27,function(block){
    block.addEventListener('dragend',solutiona27);
  });

//solución al problema
function solutiona27(){
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector27 = [];
  for (let nums of box27.box){
      if (nums.textContent == 0){
        arrVector27.push(Number.parseInt(0));
      }
      else{
        arrVector27.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros27 = arrVector27.filter(x=>x!=0);
  box27.aux = filterOfZeros27;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //Todos los enteros entre 1 y el número
  var seeker = ``;
  for (let j = 0; j < arrVector27.length; j++){
    let box = [];
    let zero = (arrVector27[j]==0)? 0:arrVector27[j];
    seeker += `<br> POSICIÓN ${j}, NÚMERO ${zero}<br>`;
    for (let i = 1; i < Math.abs(arrVector27[j]); i++){
      box.push(i);
      seeker += `${i} * `;
    };
    if(arrVector27[j] == 0 || arrVector27[j] == -1){
      seeker += `${arrVector27[j]}! = 1 <br> PROMEDIO DEL FACTORIAL: 1`;
    }
    else{
      box.push(Math.abs(arrVector27[j]));
      let fact = box.reduce(function(acc,cur){return acc*cur;},1);
      let resp = new Intl.NumberFormat().format(fact);
      seeker += `${Math.abs(arrVector27[j])} = ${resp} <br> PROMEDIO DEL FACTORIAL: ${Math.round(fact/(box.length))}`;
      seeker += `<br>`;
    };
  };

  var answer = `(Aquí discúlpame, human@, limité los números a un dígito, <br> porque si no... Me quedaba esto una mazamorra xd) <br> Por cierto, los factoriales no pueden ser negativos... Solo por...Si acaso c: <br> ${seeker}`;


  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a27e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros27.length == 10) {
    solution();
  }
  else if (filterOfZeros27.length == 0){
    getE("a27e").innerHTML = ``;

  }
  else{
    getE("a27e").innerHTML = `${answer} <br> uwu`;
  };
};

//FUNCIONES PARA EL INPUT
inputArr27.addEventListener("keydown",arrayi27, false);
var iOfBox27 = 0; 
function arrayi27(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros27.length == 10 || filterOfZeros27.length == 0){
      buttona27.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros27.length == 9){
        buttona27.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona27.innerHTML = `GENERAR ${10-filterOfZeros27.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr27.value<0)? `-`:``;

  if (isNaN(inputArr27.value)){
    document.getElementById("a27").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr27.value == `` || inputArr27.value == '-' || inputArr27.value == '--' || inputArr27.value == '---' || inputArr27.value == '----'){
    document.getElementById("a27").innerHTML = ``;
  }
  else{
    if (inputArr27.value == 0){
      if (filterOfZeros27.length > 0){
        document.getElementById("a27").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a27").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a27").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr27.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr27.value)){
      inputArr27.value = ``;
    }else{
    if (inputArr27.value == `` || inputArr27.value == '-' || inputArr27.value == '--' || inputArr27.value == '---' || inputArr27.value == '----'){
      inputArr27.value = ``;
    }
    else if (inputArr27.value == 0){
      if(filterOfZeros27.length==0){
        inputArr27.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        document.getElementById("a27b").innerHTML = ``;
        document.getElementById("a27c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a27c").innerHTML = ``;
        };
        box27.aux = [];
        filterOfZeros27.length = [];
        box27.equalize();
        solutiona27();
        inputArr27.value = ``;
        iOfBox27 = 0;
      }
    }
    else{
      if (filterOfZeros27.length == 10){
        document.getElementById("a27c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box27.aux.shift();
        box27.aux.push(Number(inputArr27.value));
        box27.equalize();
        solutiona27();
        inputArr27.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a27c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox27 = 0; iOfBox27 < 10; iOfBox27++){
          if(box27.box[iOfBox27].textContent == ``){
            box27.box[iOfBox27].textContent = Number.parseInt(inputArr27.value);
            iOfBox27 = 10;
          };
        };
        solutiona27();
        inputArr27.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight27(){
  buttona27.style.border="3px solid #ffab22";
  buttona27.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona27.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight27(){
  buttona27.style.border='3px solid #f7b64e';
  buttona27.style.color='#333333';
  buttona27.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark27(){
  buttona27.style.border="3px solid #ffaa22";
  buttona27.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark27(){
  buttona27.style.border = '1px solid #ff9d00';
  buttona27.style.color = 'rgb(31, 11, 11)';
  buttona27.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array27(){
  //SOLUTION
  box27.method(-9,10);
  document.getElementById("a27c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona27.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona27();

  //OH, STYLO
  buttona27.onmouseover = function (){arrOnMouseOverLight27()};
  buttona27.onmouseout = function (){arrOnMouseOutLight27()};
  buttona27.onmousedown = function (){arrOnMouseOutDark27()};
  buttona27.onmouseup = function (){arrOnMouseOverDark27()};
}

// 28. Leer 10 números enteros, almacenarlos en un vector y mostrar en pantalla todos los enteros comprendidos entre 1 y cada uno de los números almacenados en el vector.
var box28 = new get10Random("vector28");
var buttona28 = document.getElementById("arrayb28");
var inputArr28 = document.getElementById("arrayi28");
var filterOfZeros28 = [];


  //DRAG AND DROP
  var dnd28 = document.querySelectorAll('div#a28d > div');
  [].forEach.call(dnd28,function(block){
    block.addEventListener('dragend',solutiona28);
  });

//solución al problema
function solutiona28(){
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector28 = [];
  for (let nums of box28.box){
      if (nums.textContent == 0){
        arrVector28.push(Number.parseInt(0));
      }
      else{
        arrVector28.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros28 = arrVector28.filter(x=>x!=0);
  box28.aux = filterOfZeros28;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //Todos los enteros entre 1 y el número
  var seeker = ``;
  for (let j = 0; j < arrVector28.length; j++){
    let zero = (arrVector28[j]==0)? 0:arrVector28[j];
    seeker += `<br> POSICIÓN ${j}, NÚMERO ${zero}<br>`;
    if (arrVector28[j] <= 0){
      for (let k = arrVector28[j]; k <= 1; k++){
        seeker += `${k} `;
      };
    }
    else{
      for (let i = 1; i <= arrVector28[j]; i++){
        seeker += `${i} `;
      };
    };
    seeker += `<br>`;
  };


  var answer = `(Aquí discúlpame, human@, limité los números a un dígito, <br> porque si no... Me quedaba esto una mazamorra xd) <br> ${seeker}`;


  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a28e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros28.length == 10) {
    solution();
  }
  else if (filterOfZeros28.length == 0){
    getE("a28e").innerHTML = ``;

  }
  else{
    getE("a28e").innerHTML = `${answer} <br> uwu`;
  };
};

//FUNCIONES PARA EL INPUT
inputArr28.addEventListener("keydown",arrayi28, false);
var iOfBox28 = 0; 
function arrayi28(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros28.length == 10 || filterOfZeros28.length == 0){
      buttona28.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros28.length == 9){
        buttona28.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona28.innerHTML = `GENERAR ${10-filterOfZeros28.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr28.value<0)? `-`:``;

  if (isNaN(inputArr28.value)){
    document.getElementById("a28").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr28.value == `` || inputArr28.value == '-' || inputArr28.value == '--' || inputArr28.value == '---' || inputArr28.value == '----'){
    document.getElementById("a28").innerHTML = ``;
  }
  else{
    if (inputArr28.value == 0){
      if (filterOfZeros28.length > 0){
        document.getElementById("a28").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a28").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a28").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr28.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr28.value)){
      inputArr28.value = ``;
    }else{
    if (inputArr28.value == `` || inputArr28.value == '-' || inputArr28.value == '--' || inputArr28.value == '---' || inputArr28.value == '----'){
      inputArr28.value = ``;
    }
    else if (inputArr28.value == 0){
      if(filterOfZeros28.length==0){
        inputArr28.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        document.getElementById("a28b").innerHTML = ``;
        document.getElementById("a28c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a28c").innerHTML = ``;
        };
        box28.aux = [];
        filterOfZeros28.length = [];
        box28.equalize();
        solutiona28();
        inputArr28.value = ``;
        iOfBox28 = 0;
      }
    }
    else{
      if (filterOfZeros28.length == 10){
        document.getElementById("a28c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box28.aux.shift();
        box28.aux.push(Number(inputArr28.value));
        box28.equalize();
        solutiona28();
        inputArr28.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a28c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox28 = 0; iOfBox28 < 10; iOfBox28++){
          if(box28.box[iOfBox28].textContent == ``){
            box28.box[iOfBox28].textContent = Number.parseInt(inputArr28.value);
            iOfBox28 = 10;
          };
        };
        solutiona28();
        inputArr28.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight28(){
  buttona28.style.border="3px solid #ffab22";
  buttona28.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona28.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight28(){
  buttona28.style.border='3px solid #f7b64e';
  buttona28.style.color='#333333';
  buttona28.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark28(){
  buttona28.style.border="3px solid #ffaa22";
  buttona28.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark28(){
  buttona28.style.border = '1px solid #ff9d00';
  buttona28.style.color = 'rgb(31, 11, 11)';
  buttona28.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array28(){
  //SOLUTION
  box28.method(-9,10);
  document.getElementById("a28c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona28.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona28();

  //OH, STYLO
  buttona28.onmouseover = function (){arrOnMouseOverLight28()};
  buttona28.onmouseout = function (){arrOnMouseOutLight28()};
  buttona28.onmousedown = function (){arrOnMouseOutDark28()};
  buttona28.onmouseup = function (){arrOnMouseOverDark28()};
}

// 29. Leer 10 números enteros, almacenarlos en un vector y mostrar en pantalla todos los enteros comprendidos entre 1 y cada uno de los dígitos de cada uno de los números almacenados en el vector.
var box29 = new get10Random("vector29");
var buttona29 = document.getElementById("arrayb29");
var inputArr29 = document.getElementById("arrayi29");
var filterOfZeros29 = [];


  //DRAG AND DROP
  var dnd29 = document.querySelectorAll('div#a29d > div');
  [].forEach.call(dnd29,function(block){
    block.addEventListener('dragend',solutiona29);
  });

//solución al problema
function solutiona29(){
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector29 = [];
  for (let nums of box29.box){
      if (nums.textContent == 0){
        arrVector29.push(Number.parseInt(0));
      }
      else{
        arrVector29.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros29 = arrVector29.filter(x=>x!=0);
  box29.aux = filterOfZeros29;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //Todos los enteros entre 1 y los dígitos de cada número
  var seeker = [];
  for (let i = 0; i < arrVector29.length; i++){
    let bag = 0;
    let box = 0;
    seeker[i] = [];
    bag = Math.abs(arrVector29[i]);
    box = Array.from(String(bag),Number);
    seeker[i].push(...box);
  };

  var snitch = ``;
  for (let j = 0; j < seeker.length; j++){
    snitch += `<br>`
    for (let i =  0; i < seeker[j].length; i++){
      snitch += `CAJÓN ${j}  DÍGITO ${i} <br>`;
      if (seeker[j][i]==0){
        for (let l = seeker[j][i]; l <= 1; l++){
          snitch += `${l} `;
        };
      }
      else{
        for (let k = 1; k <= seeker[j][i]; k++){
          snitch += `${k} `;
        };
      };
      snitch += `<br><br>`
    };
  };

  var answer = `(Aquí discúlpame, human@, limité los números a dos dígitos, <br> porque si no... Nos queda esto un tamal xd) <br> ${snitch}`;


  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a29e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros29.length == 10) {
    solution();
  }
  else if (filterOfZeros29.length == 0){
    getE("a29e").innerHTML = ``;

  }
  else{
    getE("a29e").innerHTML = `${answer} <br> uwu`;
  };
};

//FUNCIONES PARA EL INPUT
inputArr29.addEventListener("keydown",arrayi29, false);
var iOfBox29 = 0; 
function arrayi29(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros29.length == 10 || filterOfZeros29.length == 0){
      buttona29.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros29.length == 9){
        buttona29.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona29.innerHTML = `GENERAR ${10-filterOfZeros29.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr29.value<0)? `-`:``;

  if (isNaN(inputArr29.value)){
    document.getElementById("a29").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr29.value == `` || inputArr29.value == '-' || inputArr29.value == '--' || inputArr29.value == '---' || inputArr29.value == '----'){
    document.getElementById("a29").innerHTML = ``;
  }
  else{
    if (inputArr29.value == 0){
      if (filterOfZeros29.length > 0){
        document.getElementById("a29").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a29").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a29").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr29.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr29.value)){
      inputArr29.value = ``;
    }else{
    if (inputArr29.value == `` || inputArr29.value == '-' || inputArr29.value == '--' || inputArr29.value == '---' || inputArr29.value == '----'){
      inputArr29.value = ``;
    }
    else if (inputArr29.value == 0){
      if(filterOfZeros29.length==0){
        inputArr29.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        document.getElementById("a29b").innerHTML = ``;
        document.getElementById("a29c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a29c").innerHTML = ``;
        };
        box29.aux = [];
        filterOfZeros29.length = [];
        box29.equalize();
        solutiona29();
        inputArr29.value = ``;
        iOfBox29 = 0;
      }
    }
    else{
      if (filterOfZeros29.length == 10){
        document.getElementById("a29c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box29.aux.shift();
        box29.aux.push(Number(inputArr29.value));
        box29.equalize();
        solutiona29();
        inputArr29.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a29c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox29 = 0; iOfBox29 < 10; iOfBox29++){
          if(box29.box[iOfBox29].textContent == ``){
            box29.box[iOfBox29].textContent = Number.parseInt(inputArr29.value);
            iOfBox29 = 10;
          };
        };
        solutiona29();
        inputArr29.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight29(){
  buttona29.style.border="3px solid #ffab22";
  buttona29.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona29.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight29(){
  buttona29.style.border='3px solid #f7b64e';
  buttona29.style.color='#333333';
  buttona29.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark29(){
  buttona29.style.border="3px solid #ffaa22";
  buttona29.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark29(){
  buttona29.style.border = '1px solid #ff9d00';
  buttona29.style.color = 'rgb(31, 11, 11)';
  buttona29.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array29(){
  //SOLUTION
  box29.method(-99,100);
  document.getElementById("a29c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona29.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona29();

  //OH, STYLO
  buttona29.onmouseover = function (){arrOnMouseOverLight29()};
  buttona29.onmouseout = function (){arrOnMouseOutLight29()};
  buttona29.onmousedown = function (){arrOnMouseOutDark29()};
  buttona29.onmouseup = function (){arrOnMouseOverDark29()};
}

// 30. Leer 10 números enteros, almacenarlos en un vector. Luego leer un entero y determinar si este último entero se encuentra entre los 10 valores almacenados en el vector.
var box30 = new get10Random("vector30");
var buttona30 = document.getElementById("arrayb30");
var inputArr30 = document.getElementById("arrayi30");
var freedom30;
var justice30;
var love30;
var flash30 = 0;
var xd30 = 0;
var cancelButton30 = 0;
var filterOfZeros30 = [];
var arrow30 = document.getElementsByClassName("arrow30");
var imgOff30 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;
var eleven30 = ``;
var buttonPressed30 = 0;

  //DRAG AND DROP
  var dnd30 = document.querySelectorAll('div#a30d > div');
  [].forEach.call(dnd30,function(block){
    block.addEventListener('dragend',malditoExtra30);
  });

//solución al problema
function malditoExtra30(){
  if(buttonPressed30 == 0){
    getE("a30e").innerHTML = `Termina de llenar el vector, luego ingresa un número más <br> y evaluemos juntos el resultado, human@ :D`;
  }
  else{
    if(eleven30==``){
      buttona30.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      inputArr30.placeholder = "INGRESAR UN NÚMERO";
      getE("a30e").innerHTML = `Registra el número adicional con el que quieres realizar el ejercicio uwu`;
    }
    else{
      getE("a30f").innerHTML = eleven30;
      solutiona30();
    };
  };
}

function solutiona30(){
  if (cancelButton30==1){}
  else{
    
  function limitSolution(){
    cancelButton30 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow30,function(arrows){
    arrows.innerHTML = imgOff30; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector30 = [];
  for (let nums of box30.box){
      if (nums.textContent == 0){
        arrVector30.push(Number.parseInt(0));
      }
      else{
        arrVector30.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros30 = arrVector30.filter(x=>x!=0);
  box30.aux = filterOfZeros30;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES del número más alto (identifica si se repite)
      
  var basurero = [];
  for (let i = 0; i < filterOfZeros30.length; i++){
    if (eleven30 == filterOfZeros30[i]){
      basurero.push(i);
    };
  };

  var answer = (basurero.length == 0)? `Tu número no está en el vector, human@ :c F <br> Lo siento... Intenta con otro número`:`¡¡¡TÚ NÚMERO ESTÁ EN EL VECTOR, HUMAN@!!! :DD <br> AWIIWIIII uwuwUWuwuWUwU`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd30 == 2){ 
      if (flash30==-1){
        arrow30[0].innerHTML = imgOff30;
        xd30 = 0;
        flash30=0;
      }
      else if (flash30==0){
        arrow30[1].innerHTML = imgOff30;
        arrow30[0].innerHTML = img;
        flash30=-1;
      }
      else{
        if (flash30<=8){
          arrow30[(flash30+1)].innerHTML = imgOff30;
        };
        arrow30[flash30].innerHTML = img;
        flash30--;
      }               
    }
    else if(xd30 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash30 = 9;
      arrow30[flash30].innerHTML = img;
      xd30 = 2;
      flash30--;
    }
    else{
      if (flash30==10){                       //VUELTA 2
        arrow30[(flash30-1)].innerHTML = imgOff30;
        xd30++;
        flash30 = 0;
      }
      else{                                 //VUELTA 1
        if (flash30>=1){
          arrow30[(flash30-1)].innerHTML = imgOff30;
        };
        arrow30[flash30].innerHTML = img;
        flash30++;
      }
    };
      getE("a30e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom30);
    [].forEach.call(arrow30,function(arrows){
      arrows.innerHTML = imgOff30; 
    });

    for (let i=0; i<basurero.length; i++){
      let miau = basurero[i]; 
      arrow30[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a30e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros30.length == 10) {
    cancelButton30 = 1;
    freedom30 = setInterval(animation,250);
    justice30 = setTimeout(solution, 2000);
    love30 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros30.length == 0){
    flash30 = 0;
    clearInterval(freedom30);
    clearTimeout(justice30);
    clearTimeout(love30);
    getE("a30e").innerHTML = ``;
    [].forEach.call(arrow30,function(arrows){
      arrows.innerHTML = imgOff30; 
    });
  }
  else{
    getE("a30e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr30.addEventListener("keydown",arrayi30, false);
var iOfBox30 = 0; 
var count30 = 0;
function arrayi30(e){
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr30.value<0)? `-`:``;

  if (isNaN(inputArr30.value)){
    document.getElementById("a30").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr30.value == `` || inputArr30.value == '-' || inputArr30.value == '--' || inputArr30.value == '---' || inputArr30.value == '----'){
    document.getElementById("a30").innerHTML = ``;
  }
  else{
    if (inputArr30.value == 0){
      if (count30 > 0){
        document.getElementById("a30").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a30").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a30").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr30.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr30.value)){
      inputArr30.value = ``;
    }else{
    if (inputArr30.value == `` || inputArr30.value == '-' || inputArr30.value == '--' || inputArr30.value == '---' || inputArr30.value == '----'){
      inputArr30.value = ``;
    }
    else if (inputArr30.value == 0){
      if(count30==0){
        inputArr30.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice30);
        clearInterval(freedom30);
        document.getElementById("a30b").innerHTML = ``;
        document.getElementById("a30c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a30c").innerHTML = ``;
        };
        buttonPressed30 = 0;
        eleven30 = ``;
        getE("a30f").innerHTML = ``;
        box30.aux = [];
        filterOfZeros30.length = [];
        box30.equalize();
        malditoExtra30();
        inputArr30.value = ``;
        iOfBox30 = 0;
        count30 = 0;
        clearInterval(freedom30);
        clearTimeout(justice30);
        clearTimeout(love30);
        getE("a30e").innerHTML = ``;
        [].forEach.call(arrow30,function(arrows){
          arrows.innerHTML = imgOff30; 
        });
      }
    }
    else{
      let introduce = new Audio("./music/introduce.mp3");
      introduce.play();

      if (count30 == 10){
        buttonPressed30 = 1;
        document.getElementById("a30c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        eleven30 = inputArr30.value;
        malditoExtra30();
        inputArr30.value = ``;
      }
      else{
        count30++;
        document.getElementById("a30c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox30 = 0; iOfBox30 < 10; iOfBox30++){
          if(box30.box[iOfBox30].textContent == ``){
            box30.box[iOfBox30].textContent = Number.parseInt(inputArr30.value);
            iOfBox30 = 10;
          };
        };
        malditoExtra30();
        inputArr30.value = ``;
      }
    }
  };
};
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros30.length == 0){
      inputArr30.placeholder = "INGRESAR NÚMEROS";
      if(count30 != 0){
        if(count30 == 10){
          inputArr30.placeholder = "INGRESAR UN NÚMERO";
          buttona30.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
        }
        else if(count30 == 9){
          buttona30.innerHTML = `GENERAR ${10 - count30} NÚMERO ALEATORIO`;
        }
        else{
          buttona30.innerHTML = `GENERAR ${10 - count30} NÚMEROS ALEATORIOS`;
        }
      }
      else{
        buttona30.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
      }
    }
    else{
      if (filterOfZeros30.length == 10){
        buttona30.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
        inputArr30.placeholder = "INGRESAR UN NÚMERO";
      }
      else if(filterOfZeros30.length == 9){
        buttona30.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      };
    };
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight30(){
  buttona30.style.border="3px solid #ffab22";
  buttona30.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona30.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight30(){
  buttona30.style.border='3px solid #f7b64e';
  buttona30.style.color='#333333';
  buttona30.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark30(){
  buttona30.style.border="3px solid #ffaa22";
  buttona30.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark30(){
  buttona30.style.border = '1px solid #ff9d00';
  buttona30.style.color = 'rgb(31, 11, 11)';
  buttona30.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array30(){
  //SOLUTION
  if(buttonPressed30 == 0){
    box30.method(-9,10);
    buttonPressed30 = 1;
  }
  else{
    eleven30 = Math.round(Math.random() * (9 - (-9)) + (-9));
    if (eleven30 == 0){
      eleven30++;
    };
  };
  document.getElementById("a30c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona30.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
  inputArr30.placeholder = "INGRESAR UN NÚMERO";
  count30 = 10;
  malditoExtra30();

  //OH, STYLO
  buttona30.onmouseover = function (){arrOnMouseOverLight30()};
  buttona30.onmouseout = function (){arrOnMouseOutLight30()};
  buttona30.onmousedown = function (){arrOnMouseOutDark30()};
  buttona30.onmouseup = function (){arrOnMouseOverDark30()};
}

// 31. Leer 10 números enteros, almacenarlos en un vector. Luego leer un entero y determinar cuantos divisores exactos tiene este último número entre los valores almacenados en el vector.
var box31 = new get10Random("vector31");
var buttona31 = document.getElementById("arrayb31");
var inputArr31 = document.getElementById("arrayi31");
var freedom31;
var justice31;
var love31;
var flash31 = 0;
var xd31 = 0;
var cancelButton31 = 0;
var filterOfZeros31 = [];
var arrow31 = document.getElementsByClassName("arrow31");
var imgOff31 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;
var eleven31 = ``;
var buttonPressed31 = 0;

  //DRAG AND DROP
  var dnd31 = document.querySelectorAll('div#a31d > div');
  [].forEach.call(dnd31,function(block){
    block.addEventListener('dragend',malditoExtra31);
  });

//solución al problema
function malditoExtra31(){
  if(buttonPressed31 == 0){
    getE("a31e").innerHTML = `Termina de llenar el vector, luego ingresa un número más <br> y evaluemos juntos el resultado, human@ :D`;
  }
  else{
    if(eleven31==``){
      buttona31.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      inputArr31.placeholder = "INGRESAR UN NÚMERO";
      getE("a31e").innerHTML = `Registra el número adicional con el que quieres realizar el ejercicio uwu`;
    }
    else{
      getE("a31f").innerHTML = eleven31;
      solutiona31();
    };
  };
}

function solutiona31(){
  if (cancelButton31==1){}
  else{
    
  function limitSolution(){
    cancelButton31 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow31,function(arrows){
    arrows.innerHTML = imgOff31; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector31 = [];
  for (let nums of box31.box){
      if (nums.textContent == 0){
        arrVector31.push(Number.parseInt(0));
      }
      else{
        arrVector31.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros31 = arrVector31.filter(x=>x!=0);
  box31.aux = filterOfZeros31;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //divisores exactos del eleven31 en el vector
      
  var basurero = [];
  for (let i = 0; i < filterOfZeros31.length; i++){
    if (eleven31%filterOfZeros31[i]==0){
      basurero.push(i);
    };
  };

  let plural = (basurero.length == 1)? `DIVISOR EXACTO`:`DIVISORES EXACTOS`;
  var answer = (basurero.length == 0)? `Tu número no tiene divisores exactos en el vector, human@ <br> Lo siento... :c Intenta con otro número`:`¡¡¡TÚ NÚMERO TIENE ${basurero.length} ${plural}, HUMAN@!!! :DD <br> AWIIWIIII uwuwUWuwuWUwU`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd31 == 2){ 
      if (flash31==-1){
        arrow31[0].innerHTML = imgOff31;
        xd31 = 0;
        flash31=0;
      }
      else if (flash31==0){
        arrow31[1].innerHTML = imgOff31;
        arrow31[0].innerHTML = img;
        flash31=-1;
      }
      else{
        if (flash31<=8){
          arrow31[(flash31+1)].innerHTML = imgOff31;
        };
        arrow31[flash31].innerHTML = img;
        flash31--;
      }               
    }
    else if(xd31 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash31 = 9;
      arrow31[flash31].innerHTML = img;
      xd31 = 2;
      flash31--;
    }
    else{
      if (flash31==10){                       //VUELTA 2
        arrow31[(flash31-1)].innerHTML = imgOff31;
        xd31++;
        flash31 = 0;
      }
      else{                                 //VUELTA 1
        if (flash31>=1){
          arrow31[(flash31-1)].innerHTML = imgOff31;
        };
        arrow31[flash31].innerHTML = img;
        flash31++;
      }
    };
      getE("a31e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom31);
    [].forEach.call(arrow31,function(arrows){
      arrows.innerHTML = imgOff31; 
    });

    for (let i=0; i<basurero.length; i++){
      let miau = basurero[i]; 
      arrow31[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a31e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros31.length == 10) {
    cancelButton31 = 1;
    freedom31 = setInterval(animation,250);
    justice31 = setTimeout(solution, 2000);
    love31 = setTimeout(limitSolution,3100);
  }
  else if (filterOfZeros31.length == 0){
    flash31 = 0;
    clearInterval(freedom31);
    clearTimeout(justice31);
    clearTimeout(love31);
    getE("a31e").innerHTML = ``;
    [].forEach.call(arrow31,function(arrows){
      arrows.innerHTML = imgOff31; 
    });
  }
  else{
    getE("a31e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr31.addEventListener("keydown",arrayi31, false);
var iOfBox31 = 0; 
var count31 = 0;
function arrayi31(e){
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr31.value<0)? `-`:``;

  if (isNaN(inputArr31.value)){
    document.getElementById("a31").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr31.value == `` || inputArr31.value == '-' || inputArr31.value == '--' || inputArr31.value == '---' || inputArr31.value == '----'){
    document.getElementById("a31").innerHTML = ``;
  }
  else{
    if (inputArr31.value == 0){
      if (count31 > 0){
        document.getElementById("a31").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a31").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a31").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr31.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr31.value)){
      inputArr31.value = ``;
    }else{
    if (inputArr31.value == `` || inputArr31.value == '-' || inputArr31.value == '--' || inputArr31.value == '---' || inputArr31.value == '----'){
      inputArr31.value = ``;
    }
    else if (inputArr31.value == 0){
      if(count31==0){
        inputArr31.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice31);
        clearInterval(freedom31);
        document.getElementById("a31b").innerHTML = ``;
        document.getElementById("a31c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a31c").innerHTML = ``;
        };
        buttonPressed31 = 0;
        eleven31 = ``;
        getE("a31f").innerHTML = ``;
        box31.aux = [];
        filterOfZeros31.length = [];
        box31.equalize();
        malditoExtra31();
        inputArr31.value = ``;
        iOfBox31 = 0;
        count31 = 0;
        clearInterval(freedom31);
        clearTimeout(justice31);
        clearTimeout(love31);
        getE("a31e").innerHTML = ``;
        [].forEach.call(arrow31,function(arrows){
          arrows.innerHTML = imgOff31; 
        });
      }
    }
    else{
      let introduce = new Audio("./music/introduce.mp3");
      introduce.play();

      if (count31 == 10){
        buttonPressed31 = 1;
        document.getElementById("a31c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        eleven31 = inputArr31.value;
        malditoExtra31();
        inputArr31.value = ``;
      }
      else{
        count31++;
        document.getElementById("a31c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox31 = 0; iOfBox31 < 10; iOfBox31++){
          if(box31.box[iOfBox31].textContent == ``){
            box31.box[iOfBox31].textContent = Number.parseInt(inputArr31.value);
            iOfBox31 = 10;
          };
        };
        malditoExtra31();
        inputArr31.value = ``;
      }
    }
  };
};
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros31.length == 0){
      inputArr31.placeholder = "INGRESAR NÚMEROS";
      if(count31 != 0){
        if(count31 == 10){
          inputArr31.placeholder = "INGRESAR UN NÚMERO";
          buttona31.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
        }
        else if(count31 == 9){
          buttona31.innerHTML = `GENERAR ${10 - count31} NÚMERO ALEATORIO`;
        }
        else{
          buttona31.innerHTML = `GENERAR ${10 - count31} NÚMEROS ALEATORIOS`;
        }
      }
      else{
        buttona31.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
      }
    }
    else{
      if (filterOfZeros31.length == 10){
        buttona31.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
        inputArr31.placeholder = "INGRESAR UN NÚMERO";
      }
      else if(filterOfZeros31.length == 9){
        buttona31.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      };
    };
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight31(){
  buttona31.style.border="3px solid #ffab22";
  buttona31.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona31.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight31(){
  buttona31.style.border='3px solid #f7b64e';
  buttona31.style.color='#333333';
  buttona31.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark31(){
  buttona31.style.border="3px solid #ffaa22";
  buttona31.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark31(){
  buttona31.style.border = '1px solid #ff9d00';
  buttona31.style.color = 'rgb(31, 11, 11)';
  buttona31.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array31(){
  //SOLUTION
  if(buttonPressed31 == 0){
    box31.method(-99,100);
    buttonPressed31 = 1;
  }
  else{
    eleven31 = Math.round(Math.random() * (99 - (-99)) + (-99));
    if (eleven31 == 0){
      eleven31++;
    };
  };
  document.getElementById("a31c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona31.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
  inputArr31.placeholder = "INGRESAR UN NÚMERO";
  count31 = 10;
  malditoExtra31();

  //OH, STYLO
  buttona31.onmouseover = function (){arrOnMouseOverLight31()};
  buttona31.onmouseout = function (){arrOnMouseOutLight31()};
  buttona31.onmousedown = function (){arrOnMouseOutDark31()};
  buttona31.onmouseup = function (){arrOnMouseOverDark31()};
}

// 32. Leer 10 números enteros, almacenarlos en un vector. Luego leer un entero y determinar cuántos números de los almacenados en el vector terminan en el mismo dígito que el último valor leído.
var box32 = new get10Random("vector32");
var buttona32 = document.getElementById("arrayb32");
var inputArr32 = document.getElementById("arrayi32");
var freedom32;
var justice32;
var love32;
var flash32 = 0;
var xd32 = 0;
var cancelButton32 = 0;
var filterOfZeros32 = [];
var arrow32 = document.getElementsByClassName("arrow32");
var imgOff32 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;
var eleven32 = ``;
var buttonPressed32 = 0;

  //DRAG AND DROP
  var dnd32 = document.querySelectorAll('div#a32d > div');
  [].forEach.call(dnd32,function(block){
    block.addEventListener('dragend',malditoExtra32);
  });

//solución al problema
function malditoExtra32(){
  if(buttonPressed32 == 0){
    getE("a32e").innerHTML = `Termina de llenar el vector, luego ingresa un número más <br> y evaluemos juntos el resultado, human@ :D`;
  }
  else{
    if(eleven32==``){
      buttona32.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      inputArr32.placeholder = "INGRESAR UN NÚMERO";
      getE("a32e").innerHTML = `Registra el número adicional con el que quieres realizar el ejercicio uwu`;
    }
    else{
      getE("a32f").innerHTML = eleven32;
      solutiona32();
    };
  };
}

function solutiona32(){
  if (cancelButton32==1){}
  else{
    
  function limitSolution(){
    cancelButton32 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow32,function(arrows){
    arrows.innerHTML = imgOff32; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector32 = [];
  for (let nums of box32.box){
      if (nums.textContent == 0){
        arrVector32.push(Number.parseInt(0));
      }
      else{
        arrVector32.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros32 = arrVector32.filter(x=>x!=0);
  box32.aux = filterOfZeros32;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //cuántos números de los almacenados en el vector terminan en el mismo dígito que el último valor leído.
      
  var basurero = [];
  for (let i = 0; i < filterOfZeros32.length; i++){
    let numArr = Array.from(String(Math.abs(filterOfZeros32[i])),Number);
      if (eleven32 == numArr[(numArr.length-1)]){
        basurero.push(i);
      };
    };
  let plural = (basurero.length == 1)? `NÚMERO`:`NÚMEROS`;
  var answer = (basurero.length == 0)? `Tu número no está en el final de ningún número, human@ <br> Lo siento... :c Intenta con otro número`:`¡¡¡TÚ NÚMERO ESTÁ AL FINAL DE ${basurero.length} ${plural}, HUMAN@!!! :DD <br> AWIIWIIII uwuwUWuwuWUwU`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd32 == 2){ 
      if (flash32==-1){
        arrow32[0].innerHTML = imgOff32;
        xd32 = 0;
        flash32=0;
      }
      else if (flash32==0){
        arrow32[1].innerHTML = imgOff32;
        arrow32[0].innerHTML = img;
        flash32=-1;
      }
      else{
        if (flash32<=8){
          arrow32[(flash32+1)].innerHTML = imgOff32;
        };
        arrow32[flash32].innerHTML = img;
        flash32--;
      }               
    }
    else if(xd32 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash32 = 9;
      arrow32[flash32].innerHTML = img;
      xd32 = 2;
      flash32--;
    }
    else{
      if (flash32==10){                       //VUELTA 2
        arrow32[(flash32-1)].innerHTML = imgOff32;
        xd32++;
        flash32 = 0;
      }
      else{                                 //VUELTA 1
        if (flash32>=1){
          arrow32[(flash32-1)].innerHTML = imgOff32;
        };
        arrow32[flash32].innerHTML = img;
        flash32++;
      }
    };
      getE("a32e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom32);
    [].forEach.call(arrow32,function(arrows){
      arrows.innerHTML = imgOff32; 
    });

    for (let i=0; i<basurero.length; i++){
      let miau = basurero[i]; 
      arrow32[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a32e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros32.length == 10) {
    cancelButton32 = 1;
    freedom32 = setInterval(animation,250);
    justice32 = setTimeout(solution, 2000);
    love32 = setTimeout(limitSolution,3200);
  }
  else if (filterOfZeros32.length == 0){
    flash32 = 0;
    clearInterval(freedom32);
    clearTimeout(justice32);
    clearTimeout(love32);
    getE("a32e").innerHTML = ``;
    [].forEach.call(arrow32,function(arrows){
      arrows.innerHTML = imgOff32; 
    });
  }
  else{
    getE("a32e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr32.addEventListener("keydown",arrayi32, false);
var iOfBox32 = 0; 
var count32 = 0;
function arrayi32(e){
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr32.value<0)? `-`:``;

  if (isNaN(inputArr32.value)){
    document.getElementById("a32").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr32.value == `` || inputArr32.value == '-' || inputArr32.value == '--' || inputArr32.value == '---' || inputArr32.value == '----'){
    document.getElementById("a32").innerHTML = ``;
  }
  else{
    if (inputArr32.value == 0){
      if (count32 > 0){
        document.getElementById("a32").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a32").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a32").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr32.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr32.value)){
      inputArr32.value = ``;
    }else{
    if (inputArr32.value == `` || inputArr32.value == '-' || inputArr32.value == '--' || inputArr32.value == '---' || inputArr32.value == '----'){
      inputArr32.value = ``;
    }
    else if (inputArr32.value == 0){
      if(count32==0){
        inputArr32.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice32);
        clearInterval(freedom32);
        document.getElementById("a32b").innerHTML = ``;
        document.getElementById("a32c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a32c").innerHTML = ``;
        };
        buttonPressed32 = 0;
        eleven32 = ``;
        getE("a32f").innerHTML = ``;
        box32.aux = [];
        filterOfZeros32.length = [];
        box32.equalize();
        malditoExtra32();
        inputArr32.value = ``;
        iOfBox32 = 0;
        count32 = 0;
        clearInterval(freedom32);
        clearTimeout(justice32);
        clearTimeout(love32);
        getE("a32e").innerHTML = ``;
        [].forEach.call(arrow32,function(arrows){
          arrows.innerHTML = imgOff32; 
        });
      }
    }
    else{
      let introduce = new Audio("./music/introduce.mp3");
      introduce.play();

      if (count32 == 10){
        buttonPressed32 = 1;
        document.getElementById("a32c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        eleven32 = inputArr32.value;
        malditoExtra32();
        inputArr32.value = ``;
      }
      else{
        count32++;
        document.getElementById("a32c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox32 = 0; iOfBox32 < 10; iOfBox32++){
          if(box32.box[iOfBox32].textContent == ``){
            box32.box[iOfBox32].textContent = Number.parseInt(inputArr32.value);
            iOfBox32 = 10;
          };
        };
        malditoExtra32();
        inputArr32.value = ``;
      }
    }
  };
};
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros32.length == 0){
      inputArr32.placeholder = "INGRESAR NÚMEROS";
      if(count32 != 0){
        if(count32 == 10){
          inputArr32.placeholder = "INGRESAR UN NÚMERO";
          buttona32.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
        }
        else if(count32 == 9){
          buttona32.innerHTML = `GENERAR ${10 - count32} NÚMERO ALEATORIO`;
        }
        else{
          buttona32.innerHTML = `GENERAR ${10 - count32} NÚMEROS ALEATORIOS`;
        }
      }
      else{
        buttona32.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
      }
    }
    else{
      if (filterOfZeros32.length == 10){
        buttona32.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
        inputArr32.placeholder = "INGRESAR UN NÚMERO";
      }
      else if(filterOfZeros32.length == 9){
        buttona32.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      };
    };
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight32(){
  buttona32.style.border="3px solid #ffab22";
  buttona32.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona32.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight32(){
  buttona32.style.border='3px solid #f7b64e';
  buttona32.style.color='#333333';
  buttona32.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark32(){
  buttona32.style.border="3px solid #ffaa22";
  buttona32.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark32(){
  buttona32.style.border = '1px solid #ff9d00';
  buttona32.style.color = 'rgb(31, 11, 11)';
  buttona32.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array32(){
  //SOLUTION
  if(buttonPressed32 == 0){
    box32.method(-99,100);
    buttonPressed32 = 1;
  }
  else{
    eleven32 = Math.round(Math.random() * (99 - (-99)) + (-99));
    if (eleven32 == 0){
      eleven32++;
    };
  };
  document.getElementById("a32c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona32.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
  inputArr32.placeholder = "INGRESAR UN NÚMERO";
  count32 = 10;
  malditoExtra32();

  //OH, STYLO
  buttona32.onmouseover = function (){arrOnMouseOverLight32()};
  buttona32.onmouseout = function (){arrOnMouseOutLight32()};
  buttona32.onmousedown = function (){arrOnMouseOutDark32()};
  buttona32.onmouseup = function (){arrOnMouseOverDark32()};
}

// 33. Leer 10 números enteros, almacenarlos en un vector y determinar a cuánto es igual la suma de los dígitos pares de cada uno de los números leídos.
var box33 = new get10Random("vector33");
var buttona33 = document.getElementById("arrayb33");
var inputArr33 = document.getElementById("arrayi33");
var freedom33;
var justice33;
var love33;
var flash33 = 0;
var xd33 = 0;
var cancelButton33 = 0;
var filterOfZeros33 = [];
var arrow33 = document.getElementsByClassName("arrow33");
var imgOff33 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd33 = document.querySelectorAll('div#a33d > div');
  [].forEach.call(dnd33,function(block){
    block.addEventListener('dragend',solutiona33);
  });

//solución al problema
function solutiona33(){
  if (cancelButton33==1){}
  else{
    
  function limitSolution(){
    cancelButton33 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow33,function(arrows){
    arrows.innerHTML = imgOff33; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector33 = [];
  for (let nums of box33.box){
      if (nums.textContent == 0){
        arrVector33.push(Number.parseInt(0));
      }
      else{
        arrVector33.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros33 = arrVector33.filter(x=>x!=0);
  box33.aux = filterOfZeros33;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //Suma de los dígitos pares
      let can = [];
      basurero = [];
      for (let i = 0; i < filterOfZeros33.length; i++){
        let bag = 0;
        let box= [];
        bag = Math.abs(filterOfZeros33[i]);
        box = Array.from(String(bag),Number);
        for (let j = 0; j < box.length; j++){
          can.push(box[j]);
          if(box[j]%2==0){
            basurero.push(i);
          };
        };
      };
      pairs = can.filter(x=>(x%2)==0);
      seeker = pairs.reduce(function(acc,cur){return acc+cur;},0);
      
      let todo = (pairs.length>=10)? `todo`:``;
      var yON = (pairs.length>0)? `${pairs.join(' + ')} = ... <br> ...La suma de ${todo} eso te dará ${seeker}, human@ uwu`:`En este vector no hay ni un solo dígito par :c <br> Pff... Con tremenda suerte, no me extraña que te vaya cómo te va- <br> Quiero decir... O  sea... ¿Ni un par? Por favor, nunca vayas a un casino.`;
      let tWoo = (basurero.length == 1)? `El ${filterOfZeros33[basurero]} en la posición n°${basurero} tiene algún par entre sus dígitos c:`:`Los números señalados tienen algún dígito par c:`;
      let twoO = (basurero.length>0)? `${tWoo} <br>`:``;
      var answer = `${twoO} ${yON}`; 
    

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd33 == 2){ 
      if (flash33==-1){
        arrow33[0].innerHTML = imgOff33;
        xd33 = 0;
        flash33=0;
      }
      else if (flash33==0){
        arrow33[1].innerHTML = imgOff33;
        arrow33[0].innerHTML = img;
        flash33=-1;
      }
      else{
        if (flash33<=8){
          arrow33[(flash33+1)].innerHTML = imgOff33;
        };
        arrow33[flash33].innerHTML = img;
        flash33--;
      }               
    }
    else if(xd33 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash33 = 9;
      arrow33[flash33].innerHTML = img;
      xd33 = 2;
      flash33--;
    }
    else{
      if (flash33==10){                       //VUELTA 2
        arrow33[(flash33-1)].innerHTML = imgOff33;
        xd33++;
        flash33 = 0;
      }
      else{                                 //VUELTA 1
        if (flash33>=1){
          arrow33[(flash33-1)].innerHTML = imgOff33;
        };
        arrow33[flash33].innerHTML = img;
        flash33++;
      }
    };
      getE("a33e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom33);
    [].forEach.call(arrow33,function(arrows){
      arrows.innerHTML = imgOff33; 
    });

    for (let i=0; i<basurero.length; i++){
      let miau = basurero[i]; 
      arrow33[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a33e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros33.length == 10) {
    cancelButton33 = 1;
    freedom33 = setInterval(animation,250);
    justice33 = setTimeout(solution, 2000);
    love33 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros33.length == 0){
    flash33 = 0;
    clearInterval(freedom33);
    clearTimeout(justice33);
    clearTimeout(love33);
    getE("a33e").innerHTML = ``;
    [].forEach.call(arrow33,function(arrows){
      arrows.innerHTML = imgOff33; 
    });
  }
  else{
    getE("a33e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr33.addEventListener("keydown",arrayi33, false);
var iOfBox33 = 0; 
function arrayi33(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros33.length == 10 || filterOfZeros33.length == 0){
      buttona33.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros33.length == 9){
        buttona33.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona33.innerHTML = `GENERAR ${10-filterOfZeros33.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr33.value<0)? `-`:``;

  if (isNaN(inputArr33.value)){
    document.getElementById("a33").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr33.value == `` || inputArr33.value == '-' || inputArr33.value == '--' || inputArr33.value == '---' || inputArr33.value == '----'){
    document.getElementById("a33").innerHTML = ``;
  }
  else{
    if (inputArr33.value == 0){
      if (filterOfZeros33.length > 0){
        document.getElementById("a33").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a33").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a33").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr33.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr33.value)){
      inputArr33.value = ``;
    }else{
    if (inputArr33.value == `` || inputArr33.value == '-' || inputArr33.value == '--' || inputArr33.value == '---' || inputArr33.value == '----'){
      inputArr33.value = ``;
    }
    else if (inputArr33.value == 0){
      if(filterOfZeros33.length==0){
        inputArr33.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice33);
        clearInterval(freedom33);
        document.getElementById("a33b").innerHTML = ``;
        document.getElementById("a33c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a33c").innerHTML = ``;
        };
        box33.aux = [];
        filterOfZeros33.length = [];
        box33.equalize();
        solutiona33();
        inputArr33.value = ``;
        iOfBox33 = 0;

        clearInterval(freedom33);
        clearTimeout(justice33);
        clearTimeout(love33);
        getE("a33e").innerHTML = ``;
        [].forEach.call(arrow33,function(arrows){
          arrows.innerHTML = imgOff33; 
        });
      }
    }
    else{
      if (filterOfZeros33.length == 10){
        document.getElementById("a33c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box33.aux.shift();
        box33.aux.push(Number(inputArr33.value));
        box33.equalize();
        solutiona33();
        inputArr33.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a33c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox33 = 0; iOfBox33 < 10; iOfBox33++){
          if(box33.box[iOfBox33].textContent == ``){
            box33.box[iOfBox33].textContent = Number.parseInt(inputArr33.value);
            iOfBox33 = 10;
          };
        };
        solutiona33();
        inputArr33.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight33(){
  buttona33.style.border="3px solid #ffab22";
  buttona33.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona33.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight33(){
  buttona33.style.border='3px solid #f7b64e';
  buttona33.style.color='#333333';
  buttona33.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark33(){
  buttona33.style.border="3px solid #ffaa22";
  buttona33.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark33(){
  buttona33.style.border = '1px solid #ff9d00';
  buttona33.style.color = 'rgb(31, 11, 11)';
  buttona33.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array33(){
  //SOLUTION
  box33.method(-999,1000);
  document.getElementById("a33c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona33.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona33();

  //OH, STYLO
  buttona33.onmouseover = function (){arrOnMouseOverLight33()};
  buttona33.onmouseout = function (){arrOnMouseOutLight33()};
  buttona33.onmousedown = function (){arrOnMouseOutDark33()};
  buttona33.onmouseup = function (){arrOnMouseOverDark33()};
}

// 34. Leer 10 números enteros, almacenarlos en un vector y determinar cuántas veces en el vector
// se encuentra el dígito 2. No se olvide que el dígito 2 puede estar varias veces en un mismo
// número.
var box34 = new get10Random("vector34");
var buttona34 = document.getElementById("arrayb34");
var inputArr34 = document.getElementById("arrayi34");
var freedom34;
var justice34;
var love34;
var flash34 = 0;
var xd34 = 0;
var cancelButton34 = 0;
var filterOfZeros34 = [];
var arrow34 = document.getElementsByClassName("arrow34");
var imgOff34 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd34 = document.querySelectorAll('div#a34d > div');
  [].forEach.call(dnd34,function(block){
    block.addEventListener('dragend',solutiona34);
  });

//solución al problema
function solutiona34(){
  if (cancelButton34==1){}
  else{
    
  function limitSolution(){
    cancelButton34 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow34,function(arrows){
    arrows.innerHTML = imgOff34; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector34 = [];
  for (let nums of box34.box){
      if (nums.textContent == 0){
        arrVector34.push(Number.parseInt(0));
      }
      else{
        arrVector34.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros34 = arrVector34.filter(x=>x!=0);
  box34.aux = filterOfZeros34;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //Suma de los dígitos pares
      let can = [];
      basurero = [];
      for (let i = 0; i < filterOfZeros34.length; i++){
        let bag = 0;
        let box= [];
        bag = Math.abs(filterOfZeros34[i]);
        box = Array.from(String(bag),Number);
        for (let j = 0; j < box.length; j++){
          can.push(box[j]);
          if(box[j]==2){
            basurero.push(i);
          };
        };
      };
      pairs = can.filter(x=>x==2);
      seeker = pairs.reduce(function(acc,cur){return acc+cur;},0);
      
      let todo = (pairs.length>=10)? `todo`:``;
      var yON = (pairs.length>0)? `${pairs.join(' + ')} = ... <br> ...La suma de ${todo} eso te dará ${seeker}, human@ uwu`:`En este vector no hay ni un solo dos :c <br> Pff... Con tremenda suerte, no me extraña que te vaya cómo te va- <br> Quiero decir... O  sea... ¿Ni un dos? Por favor, nunca vayas a un casino.`;
      let tWoo = (basurero.length == 1)? `El ${filterOfZeros34[basurero]} en la posición n°${basurero} tiene algún dos entre sus dígitos c:`:`Los números señalados tienen algún dos c:`;
      let twoO = (basurero.length>0)? `${tWoo} <br>`:``;
      var answer = `${twoO} ${yON}`; 
    

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd34 == 2){ 
      if (flash34==-1){
        arrow34[0].innerHTML = imgOff34;
        xd34 = 0;
        flash34=0;
      }
      else if (flash34==0){
        arrow34[1].innerHTML = imgOff34;
        arrow34[0].innerHTML = img;
        flash34=-1;
      }
      else{
        if (flash34<=8){
          arrow34[(flash34+1)].innerHTML = imgOff34;
        };
        arrow34[flash34].innerHTML = img;
        flash34--;
      }               
    }
    else if(xd34 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash34 = 9;
      arrow34[flash34].innerHTML = img;
      xd34 = 2;
      flash34--;
    }
    else{
      if (flash34==10){                       //VUELTA 2
        arrow34[(flash34-1)].innerHTML = imgOff34;
        xd34++;
        flash34 = 0;
      }
      else{                                 //VUELTA 1
        if (flash34>=1){
          arrow34[(flash34-1)].innerHTML = imgOff34;
        };
        arrow34[flash34].innerHTML = img;
        flash34++;
      }
    };
      getE("a34e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom34);
    [].forEach.call(arrow34,function(arrows){
      arrows.innerHTML = imgOff34; 
    });

    for (let i=0; i<basurero.length; i++){
      let miau = basurero[i]; 
      arrow34[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a34e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros34.length == 10) {
    cancelButton34 = 1;
    freedom34 = setInterval(animation,250);
    justice34 = setTimeout(solution, 2000);
    love34 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros34.length == 0){
    flash34 = 0;
    clearInterval(freedom34);
    clearTimeout(justice34);
    clearTimeout(love34);
    getE("a34e").innerHTML = ``;
    [].forEach.call(arrow34,function(arrows){
      arrows.innerHTML = imgOff34; 
    });
  }
  else{
    getE("a34e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr34.addEventListener("keydown",arrayi34, false);
var iOfBox34 = 0; 
function arrayi34(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros34.length == 10 || filterOfZeros34.length == 0){
      buttona34.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros34.length == 9){
        buttona34.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona34.innerHTML = `GENERAR ${10-filterOfZeros34.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr34.value<0)? `-`:``;

  if (isNaN(inputArr34.value)){
    document.getElementById("a34").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr34.value == `` || inputArr34.value == '-' || inputArr34.value == '--' || inputArr34.value == '---' || inputArr34.value == '----'){
    document.getElementById("a34").innerHTML = ``;
  }
  else{
    if (inputArr34.value == 0){
      if (filterOfZeros34.length > 0){
        document.getElementById("a34").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a34").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a34").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr34.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr34.value)){
      inputArr34.value = ``;
    }else{
    if (inputArr34.value == `` || inputArr34.value == '-' || inputArr34.value == '--' || inputArr34.value == '---' || inputArr34.value == '----'){
      inputArr34.value = ``;
    }
    else if (inputArr34.value == 0){
      if(filterOfZeros34.length==0){
        inputArr34.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice34);
        clearInterval(freedom34);
        document.getElementById("a34b").innerHTML = ``;
        document.getElementById("a34c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a34c").innerHTML = ``;
        };
        box34.aux = [];
        filterOfZeros34.length = [];
        box34.equalize();
        solutiona34();
        inputArr34.value = ``;
        iOfBox34 = 0;

        clearInterval(freedom34);
        clearTimeout(justice34);
        clearTimeout(love34);
        getE("a34e").innerHTML = ``;
        [].forEach.call(arrow34,function(arrows){
          arrows.innerHTML = imgOff34; 
        });
      }
    }
    else{
      if (filterOfZeros34.length == 10){
        document.getElementById("a34c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box34.aux.shift();
        box34.aux.push(Number(inputArr34.value));
        box34.equalize();
        solutiona34();
        inputArr34.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a34c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox34 = 0; iOfBox34 < 10; iOfBox34++){
          if(box34.box[iOfBox34].textContent == ``){
            box34.box[iOfBox34].textContent = Number.parseInt(inputArr34.value);
            iOfBox34 = 10;
          };
        };
        solutiona34();
        inputArr34.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight34(){
  buttona34.style.border="3px solid #ffab22";
  buttona34.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona34.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight34(){
  buttona34.style.border='3px solid #f7b64e';
  buttona34.style.color='#333333';
  buttona34.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark34(){
  buttona34.style.border="3px solid #ffaa22";
  buttona34.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark34(){
  buttona34.style.border = '1px solid #ff9d00';
  buttona34.style.color = 'rgb(31, 11, 11)';
  buttona34.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array34(){
  //SOLUTION
  box34.method(-999,1000);
  document.getElementById("a34c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona34.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona34();

  //OH, STYLO
  buttona34.onmouseover = function (){arrOnMouseOverLight34()};
  buttona34.onmouseout = function (){arrOnMouseOutLight34()};
  buttona34.onmousedown = function (){arrOnMouseOutDark34()};
  buttona34.onmouseup = function (){arrOnMouseOverDark34()};
}

// 35. Leer 10 números enteros, almacenarlos en un vector y determinar si el promedio entero de dichos números es un número primo.
var box35 = new get10Random("vector35");
var buttona35 = document.getElementById("arrayb35");
var inputArr35 = document.getElementById("arrayi35");
var freedom35;
var justice35;
var love35;
var flash35 = 0;
var xd35 = 0;
var cancelButton35 = 0;
var filterOfZeros35 = [];
var arrow35 = document.getElementsByClassName("arrow35");
var imgOff35 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd35 = document.querySelectorAll('div#a35d > div');
  [].forEach.call(dnd35,function(block){
    block.addEventListener('dragend',solutiona35);
  });

//solución al problema
function solutiona35(){
  if (cancelButton35==1){}
  else{
    
  function limitSolution(){
    cancelButton35 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow35,function(arrows){
    arrows.innerHTML = imgOff35; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector35 = [];
  for (let nums of box35.box){
      if (nums.textContent == 0){
        arrVector35.push(Number.parseInt(0));
      }
      else{
        arrVector35.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros35 = arrVector35.filter(x=>x!=0);
  box35.aux = filterOfZeros35;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICE del promedio del vector (si está)
  var seeker = filterOfZeros35.reduce(function(acc,cur){return acc+cur;},0);
  var avg = Math.round(seeker/filterOfZeros35.length); 
  var snitch = arrVector35.indexOf(avg);
  var basurero = [];
    //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];
  var primes = ``;

  for (let numbers = 2; numbers <= Math.abs(avg); numbers++) {
      const prime = avg%numbers;
      if (prime == 0) {
        box.push(numbers);  
      }
    }
    
  var primes = (box.length == 1)? `¡¡UN NÚMERO PRIMO :DD`:`un número normalito... No primo F :c`;


  for (let i=0; i<arrVector35.length; i++){
    if(avg == arrVector35[i]){
      basurero.push(i);
    }
  };

  var parallel = (basurero.length>1)? `<br> E INCLUSO SE HALLA REPETIDO ${basurero.length} VECES EN LAS POSICIONES N°: ${basurero} WTFF`:`<br> El pilluelo se halla en la posición n°${snitch} alv`;
  let present = (snitch == -1)? `& pues... ese número no está en el vector... Para serte franco, <br> me sorprendería mucho que cayera en el vector con números aleatorios xd`:`& OMG EL PROMEDIO APARECE EN EL VECTOR DDD: ${parallel}`;
  var answer = `De este vector, el promedio es ${avg}, ${primes} <br> ${present}`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd35 == 2){ 
      if (flash35==-1){
        arrow35[0].innerHTML = imgOff35;
        xd35 = 0;
        flash35=0;
      }
      else if (flash35==0){
        arrow35[1].innerHTML = imgOff35;
        arrow35[0].innerHTML = img;
        flash35=-1;
      }
      else{
        if (flash35<=8){
          arrow35[(flash35+1)].innerHTML = imgOff35;
        };
        arrow35[flash35].innerHTML = img;
        flash35--;
      }               
    }
    else if(xd35 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash35 = 9;
      arrow35[flash35].innerHTML = img;
      xd35 = 2;
      flash35--;
    }
    else{
      if (flash35==10){                       //VUELTA 2
        arrow35[(flash35-1)].innerHTML = imgOff35;
        xd35++;
        flash35 = 0;
      }
      else{                                 //VUELTA 1
        if (flash35>=1){
          arrow35[(flash35-1)].innerHTML = imgOff35;
        };
        arrow35[flash35].innerHTML = img;
        flash35++;
      }
    };
      getE("a35e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom35);
    [].forEach.call(arrow35,function(arrows){
      arrows.innerHTML = imgOff35; 
    });

    for (let i=0; i<basurero.length; i++){
      let miau = basurero[i]; 
      arrow35[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a35e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros35.length == 10) {
    cancelButton35 = 1;
    freedom35 = setInterval(animation,250);
    justice35 = setTimeout(solution, 2000);
    love35 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros35.length == 0){
    flash35 = 0;
    clearInterval(freedom35);
    clearTimeout(justice35);
    clearTimeout(love35);
    getE("a35e").innerHTML = ``;
    [].forEach.call(arrow35,function(arrows){
      arrows.innerHTML = imgOff35; 
    });
  }
  else{
    getE("a35e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr35.addEventListener("keydown",arrayi35, false);
var iOfBox35 = 0; 
function arrayi35(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros35.length == 10 || filterOfZeros35.length == 0){
      buttona35.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros35.length == 9){
        buttona35.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona35.innerHTML = `GENERAR ${10-filterOfZeros35.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr35.value<0)? `-`:``;

  if (isNaN(inputArr35.value)){
    document.getElementById("a35").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr35.value == `` || inputArr35.value == '-' || inputArr35.value == '--' || inputArr35.value == '---' || inputArr35.value == '----'){
    document.getElementById("a35").innerHTML = ``;
  }
  else{
    if (inputArr35.value == 0){
      if (filterOfZeros35.length > 0){
        document.getElementById("a35").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a35").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a35").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr35.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr35.value)){
      inputArr35.value = ``;
    }else{
    if (inputArr35.value == `` || inputArr35.value == '-' || inputArr35.value == '--' || inputArr35.value == '---' || inputArr35.value == '----'){
      inputArr35.value = ``;
    }
    else if (inputArr35.value == 0){
      if(filterOfZeros35.length==0){
        inputArr35.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice35);
        clearInterval(freedom35);
        document.getElementById("a35b").innerHTML = ``;
        document.getElementById("a35c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a35c").innerHTML = ``;
        };
        box35.aux = [];
        filterOfZeros35.length = [];
        box35.equalize();
        solutiona35();
        inputArr35.value = ``;
        iOfBox35 = 0;

        clearInterval(freedom35);
        clearTimeout(justice35);
        clearTimeout(love35);
        getE("a35e").innerHTML = ``;
        [].forEach.call(arrow35,function(arrows){
          arrows.innerHTML = imgOff35; 
        });
      }
    }
    else{
      if (filterOfZeros35.length == 10){
        document.getElementById("a35c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box35.aux.shift();
        box35.aux.push(Number(inputArr35.value));
        box35.equalize();
        solutiona35();
        inputArr35.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a35c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox35 = 0; iOfBox35 < 10; iOfBox35++){
          if(box35.box[iOfBox35].textContent == ``){
            box35.box[iOfBox35].textContent = Number.parseInt(inputArr35.value);
            iOfBox35 = 10;
          };
        };
        solutiona35();
        inputArr35.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight35(){
  buttona35.style.border="3px solid #ffab22";
  buttona35.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona35.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight35(){
  buttona35.style.border='3px solid #f7b64e';
  buttona35.style.color='#333333';
  buttona35.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark35(){
  buttona35.style.border="3px solid #ffaa22";
  buttona35.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark35(){
  buttona35.style.border = '1px solid #ff9d00';
  buttona35.style.color = 'rgb(31, 11, 11)';
  buttona35.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array35(){
  //SOLUTION
  box35.method(-9999,10000);
  document.getElementById("a35c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona35.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona35();

  //OH, STYLO
  buttona35.onmouseover = function (){arrOnMouseOverLight35()};
  buttona35.onmouseout = function (){arrOnMouseOutLight35()};
  buttona35.onmousedown = function (){arrOnMouseOutDark35()};
  buttona35.onmouseup = function (){arrOnMouseOverDark35()};
}

// 36. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos dígitos primos hay en los números leídos.
var box36 = new get10Random("vector36");
var buttona36 = document.getElementById("arrayb36");
var inputArr36 = document.getElementById("arrayi36");
var filterOfZeros36 = [];


  //DRAG AND DROP
  var dnd36 = document.querySelectorAll('div#a36d > div');
  [].forEach.call(dnd36,function(block){
    block.addEventListener('dragend',solutiona36);
  });

//solución al problema
function solutiona36(){
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector36 = [];
  for (let nums of box36.box){
      if (nums.textContent == 0){
        arrVector36.push(Number.parseInt(0));
      }
      else{
        arrVector36.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros36 = arrVector36.filter(x=>x!=0);
  box36.aux = filterOfZeros36;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //Cantidad de dígitos primos
  let can = [];
  for (let i = 0; i < filterOfZeros36.length; i++){
    let bag = 0;
    let box= [];
    bag = Math.abs(filterOfZeros36[i]);
    box = Array.from(String(bag),Number);
    for (let j = 0; j < box.length; j++){
      can.push(box[j]);
    };
  };
  pairs = can.filter(x=>x==2||x==3||x==5||x==7);
  seeker = pairs.reduce(function(acc,cur){return acc+cur;},0);

  let todo = (pairs.length==1)? `Adivina cuántos dígitos primos hay en este vector... <br> ¡La misma cantidad de personas en tu cama por la noche: 1! <br> BUAHAHAHAHAHAHAHAHAahah-ah-aah-a ay... F.`:`Ah, sí claro... Como son números primos, ahí si no vas a dudar de mi, ¿no? Jmm... <br> En este vector hay un total de ${pairs.length} dígitos primos, human@...<br> Y si estás confundid@, pues es tan fácil como contar los 2, 3, 5 y 7, <br> ya que son los únicos números primos de 1 dígito >:c"`;
  var yON = (pairs.length>0)? todo:`En este vector no hay ni un solo dígito primo :c <br> Pff... Con tremenda suerte, no me extraña que te vaya cómo te va- <br> Quiero decir... O  sea... ¿Ni un dos? Por favor, nunca vayas a un casino.`;
  var answer = yON; 


  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a36e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros36.length == 10) {
    solution();
  }
  else if (filterOfZeros36.length == 0){
    getE("a36e").innerHTML = ``;

  }
  else{
    getE("a36e").innerHTML = `${answer} <br> uwu`;
  };
};

//FUNCIONES PARA EL INPUT
inputArr36.addEventListener("keydown",arrayi36, false);
var iOfBox36 = 0; 
function arrayi36(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros36.length == 10 || filterOfZeros36.length == 0){
      buttona36.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros36.length == 9){
        buttona36.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona36.innerHTML = `GENERAR ${10-filterOfZeros36.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr36.value<0)? `-`:``;

  if (isNaN(inputArr36.value)){
    document.getElementById("a36").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr36.value == `` || inputArr36.value == '-' || inputArr36.value == '--' || inputArr36.value == '---' || inputArr36.value == '----'){
    document.getElementById("a36").innerHTML = ``;
  }
  else{
    if (inputArr36.value == 0){
      if (filterOfZeros36.length > 0){
        document.getElementById("a36").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a36").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a36").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr36.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr36.value)){
      inputArr36.value = ``;
    }else{
    if (inputArr36.value == `` || inputArr36.value == '-' || inputArr36.value == '--' || inputArr36.value == '---' || inputArr36.value == '----'){
      inputArr36.value = ``;
    }
    else if (inputArr36.value == 0){
      if(filterOfZeros36.length==0){
        inputArr36.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        document.getElementById("a36b").innerHTML = ``;
        document.getElementById("a36c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a36c").innerHTML = ``;
        };
        box36.aux = [];
        filterOfZeros36.length = [];
        box36.equalize();
        solutiona36();
        inputArr36.value = ``;
        iOfBox36 = 0;
      }
    }
    else{
      if (filterOfZeros36.length == 10){
        document.getElementById("a36c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box36.aux.shift();
        box36.aux.push(Number(inputArr36.value));
        box36.equalize();
        solutiona36();
        inputArr36.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a36c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox36 = 0; iOfBox36 < 10; iOfBox36++){
          if(box36.box[iOfBox36].textContent == ``){
            box36.box[iOfBox36].textContent = Number.parseInt(inputArr36.value);
            iOfBox36 = 10;
          };
        };
        solutiona36();
        inputArr36.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight36(){
  buttona36.style.border="3px solid #ffab22";
  buttona36.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona36.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight36(){
  buttona36.style.border='3px solid #f7b64e';
  buttona36.style.color='#333333';
  buttona36.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark36(){
  buttona36.style.border="3px solid #ffaa22";
  buttona36.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark36(){
  buttona36.style.border = '1px solid #ff9d00';
  buttona36.style.color = 'rgb(31, 11, 11)';
  buttona36.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array36(){
  //SOLUTION
  box36.method(-9999,10000);
  document.getElementById("a36c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona36.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona36();

  //OH, STYLO
  buttona36.onmouseover = function (){arrOnMouseOverLight36()};
  buttona36.onmouseout = function (){arrOnMouseOutLight36()};
  buttona36.onmousedown = function (){arrOnMouseOutDark36()};
  buttona36.onmouseup = function (){arrOnMouseOverDark36()};
}

// 37. Leer 10 números enteros, almacenarlos en un vector y determinar a cuántos es igual el cuadrado de cada uno de los números leídos.
var box37 = new get10Random("vector37");
var buttona37 = document.getElementById("arrayb37");
var inputArr37 = document.getElementById("arrayi37");
var filterOfZeros37 = [];


  //DRAG AND DROP
  var dnd37 = document.querySelectorAll('div#a37d > div');
  [].forEach.call(dnd37,function(block){
    block.addEventListener('dragend',solutiona37);
  });

//solución al problema
function solutiona37(){
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector37 = [];
  for (let nums of box37.box){
      if (nums.textContent == 0){
        arrVector37.push(Number.parseInt(0));
      }
      else{
        arrVector37.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros37 = arrVector37.filter(x=>x!=0);
  box37.aux = filterOfZeros37;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //Cuadrado de los números
  var sqr = ``;
  for (let i = 0; i < filterOfZeros37.length; i++){
    let pot = Math.pow(filterOfZeros37[i],2);
    let miau = new Intl.NumberFormat().format(pot);
    sqr += `${filterOfZeros37[i]} ............................. ${miau} <br>`;
  };

  var answer = `NÚMERO .......... CUADRADO <br> ${sqr}`; 

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a37e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros37.length == 10) {
    solution();
  }
  else if (filterOfZeros37.length == 0){
    getE("a37e").innerHTML = ``;

  }
  else{
    getE("a37e").innerHTML = `${answer} <br> uwu`;
  };
};

//FUNCIONES PARA EL INPUT
inputArr37.addEventListener("keydown",arrayi37, false);
var iOfBox37 = 0; 
function arrayi37(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros37.length == 10 || filterOfZeros37.length == 0){
      buttona37.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros37.length == 9){
        buttona37.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona37.innerHTML = `GENERAR ${10-filterOfZeros37.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr37.value<0)? `-`:``;

  if (isNaN(inputArr37.value)){
    document.getElementById("a37").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr37.value == `` || inputArr37.value == '-' || inputArr37.value == '--' || inputArr37.value == '---' || inputArr37.value == '----'){
    document.getElementById("a37").innerHTML = ``;
  }
  else{
    if (inputArr37.value == 0){
      if (filterOfZeros37.length > 0){
        document.getElementById("a37").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a37").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a37").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr37.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr37.value)){
      inputArr37.value = ``;
    }else{
    if (inputArr37.value == `` || inputArr37.value == '-' || inputArr37.value == '--' || inputArr37.value == '---' || inputArr37.value == '----'){
      inputArr37.value = ``;
    }
    else if (inputArr37.value == 0){
      if(filterOfZeros37.length==0){
        inputArr37.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        document.getElementById("a37b").innerHTML = ``;
        document.getElementById("a37c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a37c").innerHTML = ``;
        };
        box37.aux = [];
        filterOfZeros37.length = [];
        box37.equalize();
        solutiona37();
        inputArr37.value = ``;
        iOfBox37 = 0;
      }
    }
    else{
      if (filterOfZeros37.length == 10){
        document.getElementById("a37c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box37.aux.shift();
        box37.aux.push(Number(inputArr37.value));
        box37.equalize();
        solutiona37();
        inputArr37.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a37c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox37 = 0; iOfBox37 < 10; iOfBox37++){
          if(box37.box[iOfBox37].textContent == ``){
            box37.box[iOfBox37].textContent = Number.parseInt(inputArr37.value);
            iOfBox37 = 10;
          };
        };
        solutiona37();
        inputArr37.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight37(){
  buttona37.style.border="3px solid #ffab22";
  buttona37.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona37.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight37(){
  buttona37.style.border='3px solid #f7b64e';
  buttona37.style.color='#333333';
  buttona37.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark37(){
  buttona37.style.border="3px solid #ffaa22";
  buttona37.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark37(){
  buttona37.style.border = '1px solid #ff9d00';
  buttona37.style.color = 'rgb(31, 11, 11)';
  buttona37.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array37(){
  //SOLUTION
  box37.method(-999,1000);
  document.getElementById("a37c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona37.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona37();

  //OH, STYLO
  buttona37.onmouseover = function (){arrOnMouseOverLight37()};
  buttona37.onmouseout = function (){arrOnMouseOutLight37()};
  buttona37.onmousedown = function (){arrOnMouseOutDark37()};
  buttona37.onmouseup = function (){arrOnMouseOverDark37()};
}

// 38. Leer 10 números enteros, almacenarlos en un vector y determinar si la semisuma entre el valor mayor y el valor menor es un número primo.
var box38 = new get10Random("vector38");
var buttona38 = document.getElementById("arrayb38");
var inputArr38 = document.getElementById("arrayi38");
var freedom38;
var justice38;
var love38;
var flash38 = 0;
var xd38 = 0;
var cancelButton38 = 0;
var filterOfZeros38 = [];
var arrow38 = document.getElementsByClassName("arrow38");
var imgOff38 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd38 = document.querySelectorAll('div#a38d > div');
  [].forEach.call(dnd38,function(block){
    block.addEventListener('dragend',solutiona38);
  });

//solución al problema
function solutiona38(){
  if (cancelButton38==1){}
  else{
    
  function limitSolution(){
    cancelButton38 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow38,function(arrows){
    arrows.innerHTML = imgOff38; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector38 = [];
  for (let nums of box38.box){
      if (nums.textContent == 0){
        arrVector38.push(Number.parseInt(0));
      }
      else{
        arrVector38.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros38 = arrVector38.filter(x=>x!=0);
  box38.aux = filterOfZeros38;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //semisuma xd
  var seeker = [Math.max(...filterOfZeros38), Math.min(...filterOfZeros38)];
  var semi = Math.round((seeker[0]+seeker[1])/2);
  var basurero = [];
  for (let i=0; i<seeker.length; i++){
    basurero.push(filterOfZeros38.indexOf(seeker[i]));
  };
    //ALGORITHM FOR PRIME NUMBERS >:c
  var box = [];

  for (let numbers = 2; numbers <= semi; numbers++) {
    const prime = semi%numbers;
    if (prime == 0) {
      box.push(numbers);  
    };
  };
    
  let primes = (box.length == 1)? `SII ALVVV D:`:`ño xd`;


  var answer = `Por si tampoco sabes qué es una semisuma, ya lo googlée, xd. <br> Básicamente, es sumar dos números y dividir el resultado por la mitad, así que... <br> NÚMERO MAYOR: ${seeker[0]} <br> NÚMERO MENOR: ${seeker[1]} <br> SEMISUMA: ${semi} <br> ¿Es ${semi} primo? <br> ${primes}`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd38 == 2){ 
      if (flash38==-1){
        arrow38[0].innerHTML = imgOff38;
        xd38 = 0;
        flash38=0;
      }
      else if (flash38==0){
        arrow38[1].innerHTML = imgOff38;
        arrow38[0].innerHTML = img;
        flash38=-1;
      }
      else{
        if (flash38<=8){
          arrow38[(flash38+1)].innerHTML = imgOff38;
        };
        arrow38[flash38].innerHTML = img;
        flash38--;
      }               
    }
    else if(xd38 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash38 = 9;
      arrow38[flash38].innerHTML = img;
      xd38 = 2;
      flash38--;
    }
    else{
      if (flash38==10){                       //VUELTA 2
        arrow38[(flash38-1)].innerHTML = imgOff38;
        xd38++;
        flash38 = 0;
      }
      else{                                 //VUELTA 1
        if (flash38>=1){
          arrow38[(flash38-1)].innerHTML = imgOff38;
        };
        arrow38[flash38].innerHTML = img;
        flash38++;
      }
    };
      getE("a38e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom38);
    [].forEach.call(arrow38,function(arrows){
      arrows.innerHTML = imgOff38; 
    });

    for (let i=0; i<basurero.length; i++){
      let miau = basurero[i]; 
      arrow38[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a38e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros38.length == 10) {
    cancelButton38 = 1;
    freedom38 = setInterval(animation,250);
    justice38 = setTimeout(solution, 2000);
    love38 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros38.length == 0){
    flash38 = 0;
    clearInterval(freedom38);
    clearTimeout(justice38);
    clearTimeout(love38);
    getE("a38e").innerHTML = ``;
    [].forEach.call(arrow38,function(arrows){
      arrows.innerHTML = imgOff38; 
    });
  }
  else{
    getE("a38e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr38.addEventListener("keydown",arrayi38, false);
var iOfBox38 = 0; 
function arrayi38(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros38.length == 10 || filterOfZeros38.length == 0){
      buttona38.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros38.length == 9){
        buttona38.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona38.innerHTML = `GENERAR ${10-filterOfZeros38.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr38.value<0)? `-`:``;

  if (isNaN(inputArr38.value)){
    document.getElementById("a38").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr38.value == `` || inputArr38.value == '-' || inputArr38.value == '--' || inputArr38.value == '---' || inputArr38.value == '----'){
    document.getElementById("a38").innerHTML = ``;
  }
  else{
    if (inputArr38.value == 0){
      if (filterOfZeros38.length > 0){
        document.getElementById("a38").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a38").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a38").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr38.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr38.value)){
      inputArr38.value = ``;
    }else{
    if (inputArr38.value == `` || inputArr38.value == '-' || inputArr38.value == '--' || inputArr38.value == '---' || inputArr38.value == '----'){
      inputArr38.value = ``;
    }
    else if (inputArr38.value == 0){
      if(filterOfZeros38.length==0){
        inputArr38.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice38);
        clearInterval(freedom38);
        document.getElementById("a38b").innerHTML = ``;
        document.getElementById("a38c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a38c").innerHTML = ``;
        };
        box38.aux = [];
        filterOfZeros38.length = [];
        box38.equalize();
        solutiona38();
        inputArr38.value = ``;
        iOfBox38 = 0;

        clearInterval(freedom38);
        clearTimeout(justice38);
        clearTimeout(love38);
        getE("a38e").innerHTML = ``;
        [].forEach.call(arrow38,function(arrows){
          arrows.innerHTML = imgOff38; 
        });
      }
    }
    else{
      if (filterOfZeros38.length == 10){
        document.getElementById("a38c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box38.aux.shift();
        box38.aux.push(Number(inputArr38.value));
        box38.equalize();
        solutiona38();
        inputArr38.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a38c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox38 = 0; iOfBox38 < 10; iOfBox38++){
          if(box38.box[iOfBox38].textContent == ``){
            box38.box[iOfBox38].textContent = Number.parseInt(inputArr38.value);
            iOfBox38 = 10;
          };
        };
        solutiona38();
        inputArr38.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight38(){
  buttona38.style.border="3px solid #ffab22";
  buttona38.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona38.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight38(){
  buttona38.style.border='3px solid #f7b64e';
  buttona38.style.color='#333333';
  buttona38.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark38(){
  buttona38.style.border="3px solid #ffaa22";
  buttona38.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark38(){
  buttona38.style.border = '1px solid #ff9d00';
  buttona38.style.color = 'rgb(31, 11, 11)';
  buttona38.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array38(){
  //SOLUTION
  box38.method(-9999,10000);
  document.getElementById("a38c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona38.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona38();

  //OH, STYLO
  buttona38.onmouseover = function (){arrOnMouseOverLight38()};
  buttona38.onmouseout = function (){arrOnMouseOutLight38()};
  buttona38.onmousedown = function (){arrOnMouseOutDark38()};
  buttona38.onmouseup = function (){arrOnMouseOverDark38()};
}

// 39. Leer 10 números enteros, almacenarlos en un vector y determinar si la semisuma entre el valor mayor y el valor menor es un número par.
var box39 = new get10Random("vector39");
var buttona39 = document.getElementById("arrayb39");
var inputArr39 = document.getElementById("arrayi39");
var freedom39;
var justice39;
var love39;
var flash39 = 0;
var xd39 = 0;
var cancelButton39 = 0;
var filterOfZeros39 = [];
var arrow39 = document.getElementsByClassName("arrow39");
var imgOff39 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd39 = document.querySelectorAll('div#a39d > div');
  [].forEach.call(dnd39,function(block){
    block.addEventListener('dragend',solutiona39);
  });

//solución al problema
function solutiona39(){
  if (cancelButton39==1){}
  else{
    
  function limitSolution(){
    cancelButton39 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow39,function(arrows){
    arrows.innerHTML = imgOff39; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector39 = [];
  for (let nums of box39.box){
      if (nums.textContent == 0){
        arrVector39.push(Number.parseInt(0));
      }
      else{
        arrVector39.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros39 = arrVector39.filter(x=>x!=0);
  box39.aux = filterOfZeros39;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //semisuma xd
  var seeker = [Math.max(...filterOfZeros39), Math.min(...filterOfZeros39)];
  var semi = Math.round((seeker[0]+seeker[1])/2);
  var basurero = [];
  for (let i=0; i<seeker.length; i++){
    basurero.push(filterOfZeros39.indexOf(seeker[i]));
  };  
  let primes = (semi%2==0)? `SII ALVVV D:`:`ño xd`;


  var answer = `Por si tampoco sabes qué es una semisuma, ya lo googlée, xd. <br> Básicamente, es sumar dos números y dividir el resultado por la mitad, así que... <br> NÚMERO MAYOR: ${seeker[0]} <br> NÚMERO MENOR: ${seeker[1]} <br> SEMISUMA: ${semi} <br> ¿Es ${semi} par? <br> ${primes}`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd39 == 2){ 
      if (flash39==-1){
        arrow39[0].innerHTML = imgOff39;
        xd39 = 0;
        flash39=0;
      }
      else if (flash39==0){
        arrow39[1].innerHTML = imgOff39;
        arrow39[0].innerHTML = img;
        flash39=-1;
      }
      else{
        if (flash39<=8){
          arrow39[(flash39+1)].innerHTML = imgOff39;
        };
        arrow39[flash39].innerHTML = img;
        flash39--;
      }               
    }
    else if(xd39 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash39 = 9;
      arrow39[flash39].innerHTML = img;
      xd39 = 2;
      flash39--;
    }
    else{
      if (flash39==10){                       //VUELTA 2
        arrow39[(flash39-1)].innerHTML = imgOff39;
        xd39++;
        flash39 = 0;
      }
      else{                                 //VUELTA 1
        if (flash39>=1){
          arrow39[(flash39-1)].innerHTML = imgOff39;
        };
        arrow39[flash39].innerHTML = img;
        flash39++;
      }
    };
      getE("a39e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom39);
    [].forEach.call(arrow39,function(arrows){
      arrows.innerHTML = imgOff39; 
    });

    for (let i=0; i<basurero.length; i++){
      let miau = basurero[i]; 
      arrow39[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a39e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros39.length == 10) {
    cancelButton39 = 1;
    freedom39 = setInterval(animation,250);
    justice39 = setTimeout(solution, 2000);
    love39 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros39.length == 0){
    flash39 = 0;
    clearInterval(freedom39);
    clearTimeout(justice39);
    clearTimeout(love39);
    getE("a39e").innerHTML = ``;
    [].forEach.call(arrow39,function(arrows){
      arrows.innerHTML = imgOff39; 
    });
  }
  else{
    getE("a39e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr39.addEventListener("keydown",arrayi39, false);
var iOfBox39 = 0; 
function arrayi39(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros39.length == 10 || filterOfZeros39.length == 0){
      buttona39.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros39.length == 9){
        buttona39.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona39.innerHTML = `GENERAR ${10-filterOfZeros39.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr39.value<0)? `-`:``;

  if (isNaN(inputArr39.value)){
    document.getElementById("a39").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr39.value == `` || inputArr39.value == '-' || inputArr39.value == '--' || inputArr39.value == '---' || inputArr39.value == '----'){
    document.getElementById("a39").innerHTML = ``;
  }
  else{
    if (inputArr39.value == 0){
      if (filterOfZeros39.length > 0){
        document.getElementById("a39").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a39").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a39").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr39.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr39.value)){
      inputArr39.value = ``;
    }else{
    if (inputArr39.value == `` || inputArr39.value == '-' || inputArr39.value == '--' || inputArr39.value == '---' || inputArr39.value == '----'){
      inputArr39.value = ``;
    }
    else if (inputArr39.value == 0){
      if(filterOfZeros39.length==0){
        inputArr39.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice39);
        clearInterval(freedom39);
        document.getElementById("a39b").innerHTML = ``;
        document.getElementById("a39c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a39c").innerHTML = ``;
        };
        box39.aux = [];
        filterOfZeros39.length = [];
        box39.equalize();
        solutiona39();
        inputArr39.value = ``;
        iOfBox39 = 0;

        clearInterval(freedom39);
        clearTimeout(justice39);
        clearTimeout(love39);
        getE("a39e").innerHTML = ``;
        [].forEach.call(arrow39,function(arrows){
          arrows.innerHTML = imgOff39; 
        });
      }
    }
    else{
      if (filterOfZeros39.length == 10){
        document.getElementById("a39c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box39.aux.shift();
        box39.aux.push(Number(inputArr39.value));
        box39.equalize();
        solutiona39();
        inputArr39.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a39c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox39 = 0; iOfBox39 < 10; iOfBox39++){
          if(box39.box[iOfBox39].textContent == ``){
            box39.box[iOfBox39].textContent = Number.parseInt(inputArr39.value);
            iOfBox39 = 10;
          };
        };
        solutiona39();
        inputArr39.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight39(){
  buttona39.style.border="3px solid #ffab22";
  buttona39.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona39.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight39(){
  buttona39.style.border='3px solid #f7b64e';
  buttona39.style.color='#333333';
  buttona39.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark39(){
  buttona39.style.border="3px solid #ffaa22";
  buttona39.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark39(){
  buttona39.style.border = '1px solid #ff9d00';
  buttona39.style.color = 'rgb(31, 11, 11)';
  buttona39.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array39(){
  //SOLUTION
  box39.method(-9999,10000);
  document.getElementById("a39c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona39.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona39();

  //OH, STYLO
  buttona39.onmouseover = function (){arrOnMouseOverLight39()};
  buttona39.onmouseout = function (){arrOnMouseOutLight39()};
  buttona39.onmousedown = function (){arrOnMouseOutDark39()};
  buttona39.onmouseup = function (){arrOnMouseOverDark39()};
}


// 40. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos números de los almacenados en dicho vector terminan en 15.
var box40 = new get10Random("vector40");
var buttona40 = document.getElementById("arrayb40");
var inputArr40 = document.getElementById("arrayi40");
var freedom40;
var justice40;
var love40;
var flash40 = 0;
var xd40 = 0;
var cancelButton40 = 0;
var filterOfZeros40 = [];
var arrow40 = document.getElementsByClassName("arrow40");
var imgOff40 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd40 = document.querySelectorAll('div#a40d > div');
  [].forEach.call(dnd40,function(block){
    block.addEventListener('dragend',solutiona40);
  });

//solución al problema
function solutiona40(){
  if (cancelButton40==1){}
  else{
    
  function limitSolution(){
    cancelButton40 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow40,function(arrows){
    arrows.innerHTML = imgOff40; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector40 = [];
  for (let nums of box40.box){
      if (nums.textContent == 0){
        arrVector40.push(Number.parseInt(0));
      }
      else{
        arrVector40.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros40 = arrVector40.filter(x=>x!=0);
  box40.aux = filterOfZeros40;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES de números que terminen en 15
  var seeker = filterOfZeros40.filter(x=>(Math.abs(x%100))==15);
  var snitch = [];

  for (let j=0; j<seeker.length; j++){
    for (let i=0; i<filterOfZeros40.length; i++){
      if(filterOfZeros40[i]==seeker[j]){
        snitch.push(i);
      };
    };
  };

  
  var parallel = (snitch.length>1)? `<br> y se hallan en las posiciones n°: ${snitch} UwU`:`y se halla en la posición n°${snitch} c:`;
  var plural = (snitch.length>1)? `hay ${snitch.length} números que terminan en 15: ${seeker}`:`sólo hay un amante del 15: el número ${seeker}`;
  var no4 = (seeker.length==0)? `Ninguno de estos números termina en 15 :c vaya suerte... <br> ¡Prueba con otra tanda de números, human@!`:`En este vector, ${plural} ${parallel}`;
  var answer = no4;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd40 == 2){ 
      if (flash40==-1){
        arrow40[0].innerHTML = imgOff40;
        xd40 = 0;
        flash40=0;
      }
      else if (flash40==0){
        arrow40[1].innerHTML = imgOff40;
        arrow40[0].innerHTML = img;
        flash40=-1;
      }
      else{
        if (flash40<=8){
          arrow40[(flash40+1)].innerHTML = imgOff40;
        };
        arrow40[flash40].innerHTML = img;
        flash40--;
      }               
    }
    else if(xd40 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash40 = 9;
      arrow40[flash40].innerHTML = img;
      xd40 = 2;
      flash40--;
    }
    else{
      if (flash40==10){                       //VUELTA 2
        arrow40[(flash40-1)].innerHTML = imgOff40;
        xd40++;
        flash40 = 0;
      }
      else{                                 //VUELTA 1
        if (flash40>=1){
          arrow40[(flash40-1)].innerHTML = imgOff40;
        };
        arrow40[flash40].innerHTML = img;
        flash40++;
      }
    };
      getE("a40e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom40);
    [].forEach.call(arrow40,function(arrows){
      arrows.innerHTML = imgOff40; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow40[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    
    getE("a40e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros40.length == 10) {
    cancelButton40 = 1;
    freedom40 = setInterval(animation,250);
    justice40 = setTimeout(solution, 2000);
    love40 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros40.length == 0){
    flash40 = 0;
    clearInterval(freedom40);
    clearTimeout(justice40);
    clearTimeout(love40);
    getE("a40e").innerHTML = ``;
    [].forEach.call(arrow40,function(arrows){
      arrows.innerHTML = imgOff40; 
    });
  }
  else{
    getE("a40e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr40.addEventListener("keydown",arrayi40, false);
var iOfBox40 = 0; 
function arrayi40(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros40.length == 10 || filterOfZeros40.length == 0){
      buttona40.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros40.length == 9){
        buttona40.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona40.innerHTML = `GENERAR ${10-filterOfZeros40.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr40.value<0)? `-`:``;

  if (isNaN(inputArr40.value)){
    document.getElementById("a40").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr40.value == `` || inputArr40.value == '-' || inputArr40.value == '--' || inputArr40.value == '---' || inputArr40.value == '----'){
    document.getElementById("a40").innerHTML = ``;
  }
  else{
    if (inputArr40.value == 0){
      if (filterOfZeros40.length > 0){
        document.getElementById("a40").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a40").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a40").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr40.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr40.value)){
      inputArr40.value = ``;
    }else{
    if (inputArr40.value == `` || inputArr40.value == '-' || inputArr40.value == '--' || inputArr40.value == '---' || inputArr40.value == '----'){
      inputArr40.value = ``;
    }
    else if (inputArr40.value == 0){
      if(filterOfZeros40.length==0){
        inputArr40.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice40);
        clearInterval(freedom40);
        document.getElementById("a40b").innerHTML = ``;
        document.getElementById("a40c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a40c").innerHTML = ``;
        };
        box40.aux = [];
        filterOfZeros40.length = [];
        box40.equalize();
        solutiona40();
        inputArr40.value = ``;
        iOfBox40 = 0;

        clearInterval(freedom40);
        clearTimeout(justice40);
        clearTimeout(love40);
        getE("a40e").innerHTML = ``;
        [].forEach.call(arrow40,function(arrows){
          arrows.innerHTML = imgOff40; 
        });
      }
    }
    else{
      if (filterOfZeros40.length == 10){
        document.getElementById("a40c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box40.aux.shift();
        box40.aux.push(Number(inputArr40.value));
        box40.equalize();
        solutiona40();
        inputArr40.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a40c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox40 = 0; iOfBox40 < 10; iOfBox40++){
          if(box40.box[iOfBox40].textContent == ``){
            box40.box[iOfBox40].textContent = Number.parseInt(inputArr40.value);
            iOfBox40 = 10;
          };
        };
        solutiona40();
        inputArr40.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight40(){
  buttona40.style.border="3px solid #ffab40";
  buttona40.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona40.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight40(){
  buttona40.style.border='3px solid #f7b64e';
  buttona40.style.color='#333333';
  buttona40.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark40(){
  buttona40.style.border="3px solid #ffaa40";
  buttona40.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark40(){
  buttona40.style.border = '1px solid #ff9d00';
  buttona40.style.color = 'rgb(31, 11, 11)';
  buttona40.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array40(){
  //SOLUTION
  box40.method(-9999,10000);
  document.getElementById("a40c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona40.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona40();

  //OH, STYLO
  buttona40.onmouseover = function (){arrOnMouseOverLight40()};
  buttona40.onmouseout = function (){arrOnMouseOutLight40()};
  buttona40.onmousedown = function (){arrOnMouseOutDark40()};
  buttona40.onmouseup = function (){arrOnMouseOverDark40()};
}

// 41. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos números de los almacenados en dicho vector comienzan con 3.
var box41 = new get10Random("vector41");
var buttona41 = document.getElementById("arrayb41");
var inputArr41 = document.getElementById("arrayi41");
var freedom41;
var justice41;
var love41;
var flash41 = 0;
var xd41 = 0;
var cancelButton41 = 0;
var filterOfZeros41 = [];
var arrow41 = document.getElementsByClassName("arrow41");
var imgOff41 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd41 = document.querySelectorAll('div#a41d > div');
  [].forEach.call(dnd41,function(block){
    block.addEventListener('dragend',solutiona41);
  });

//solución al problema
function solutiona41(){
  if (cancelButton41==1){}
  else{
    
  function limitSolution(){
    cancelButton41 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow41,function(arrows){
    arrows.innerHTML = imgOff41; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector41 = [];
  for (let nums of box41.box){
      if (nums.textContent == 0){
        arrVector41.push(Number.parseInt(0));
      }
      else{
        arrVector41.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros41 = arrVector41.filter(x=>x!=0);
  box41.aux = filterOfZeros41;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES de números que comiencen por 3
  var seeker = [];
  for (let i = 0; i < filterOfZeros41.length; i++){
    let tissue = 0;
    tissue = Array.from(String(Math.abs(filterOfZeros41[i])),Number);
    if (tissue[0] == 3){
      seeker.push(filterOfZeros41[i]);
    };
  };
  var snitch = [];

  for (let j=0; j<seeker.length; j++){
    for (let i=0; i<filterOfZeros41.length; i++){
      if(filterOfZeros41[i]==seeker[j]){
        snitch.push(i);
      };
    };
  };

  let fiu = `<br>`;
  for (let i = 0; i < seeker.length; i++){
    fiu += `El ${seeker[i]} en la posición ${snitch[i]} <br>`
  };
  let plural = (snitch.length>1)? `hay ${snitch.length} números que comienzan por 3: <br> ${fiu} UwU`:`sólo hay un número que comienza por el 3: <br> el número ${seeker} y se halla en la posición n°${snitch} c:`;
  let no4 = (seeker.length==0)? `Ninguno de estos números comienza por el 3 :c vaya suerte... <br> ¡Prueba con otra tanda de números, human@!`:`En este vector, ${plural}`;
  let answer = no4;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd41 == 2){ 
      if (flash41==-1){
        arrow41[0].innerHTML = imgOff41;
        xd41 = 0;
        flash41=0;
      }
      else if (flash41==0){
        arrow41[1].innerHTML = imgOff41;
        arrow41[0].innerHTML = img;
        flash41=-1;
      }
      else{
        if (flash41<=8){
          arrow41[(flash41+1)].innerHTML = imgOff41;
        };
        arrow41[flash41].innerHTML = img;
        flash41--;
      }               
    }
    else if(xd41 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash41 = 9;
      arrow41[flash41].innerHTML = img;
      xd41 = 2;
      flash41--;
    }
    else{
      if (flash41==10){                       //VUELTA 2
        arrow41[(flash41-1)].innerHTML = imgOff41;
        xd41++;
        flash41 = 0;
      }
      else{                                 //VUELTA 1
        if (flash41>=1){
          arrow41[(flash41-1)].innerHTML = imgOff41;
        };
        arrow41[flash41].innerHTML = img;
        flash41++;
      }
    };
      getE("a41e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom41);
    [].forEach.call(arrow41,function(arrows){
      arrows.innerHTML = imgOff41; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow41[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    
    getE("a41e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros41.length == 10) {
    cancelButton41 = 1;
    freedom41 = setInterval(animation,250);
    justice41 = setTimeout(solution, 2000);
    love41 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros41.length == 0){
    flash41 = 0;
    clearInterval(freedom41);
    clearTimeout(justice41);
    clearTimeout(love41);
    getE("a41e").innerHTML = ``;
    [].forEach.call(arrow41,function(arrows){
      arrows.innerHTML = imgOff41; 
    });
  }
  else{
    getE("a41e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr41.addEventListener("keydown",arrayi41, false);
var iOfBox41 = 0; 
function arrayi41(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros41.length == 10 || filterOfZeros41.length == 0){
      buttona41.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros41.length == 9){
        buttona41.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona41.innerHTML = `GENERAR ${10-filterOfZeros41.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr41.value<0)? `-`:``;

  if (isNaN(inputArr41.value)){
    document.getElementById("a41").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr41.value == `` || inputArr41.value == '-' || inputArr41.value == '--' || inputArr41.value == '---' || inputArr41.value == '----'){
    document.getElementById("a41").innerHTML = ``;
  }
  else{
    if (inputArr41.value == 0){
      if (filterOfZeros41.length > 0){
        document.getElementById("a41").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a41").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a41").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr41.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr41.value)){
      inputArr41.value = ``;
    }else{
    if (inputArr41.value == `` || inputArr41.value == '-' || inputArr41.value == '--' || inputArr41.value == '---' || inputArr41.value == '----'){
      inputArr41.value = ``;
    }
    else if (inputArr41.value == 0){
      if(filterOfZeros41.length==0){
        inputArr41.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice41);
        clearInterval(freedom41);
        document.getElementById("a41b").innerHTML = ``;
        document.getElementById("a41c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a41c").innerHTML = ``;
        };
        box41.aux = [];
        filterOfZeros41.length = [];
        box41.equalize();
        solutiona41();
        inputArr41.value = ``;
        iOfBox41 = 0;

        clearInterval(freedom41);
        clearTimeout(justice41);
        clearTimeout(love41);
        getE("a41e").innerHTML = ``;
        [].forEach.call(arrow41,function(arrows){
          arrows.innerHTML = imgOff41; 
        });
      }
    }
    else{
      if (filterOfZeros41.length == 10){
        document.getElementById("a41c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box41.aux.shift();
        box41.aux.push(Number(inputArr41.value));
        box41.equalize();
        solutiona41();
        inputArr41.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a41c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox41 = 0; iOfBox41 < 10; iOfBox41++){
          if(box41.box[iOfBox41].textContent == ``){
            box41.box[iOfBox41].textContent = Number.parseInt(inputArr41.value);
            iOfBox41 = 10;
          };
        };
        solutiona41();
        inputArr41.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight41(){
  buttona41.style.border="3px solid #ffab40";
  buttona41.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona41.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight41(){
  buttona41.style.border='3px solid #f7b64e';
  buttona41.style.color='#333333';
  buttona41.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark41(){
  buttona41.style.border="3px solid #ffaa40";
  buttona41.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark41(){
  buttona41.style.border = '1px solid #ff9d00';
  buttona41.style.color = 'rgb(31, 11, 11)';
  buttona41.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array41(){
  //SOLUTION
  box41.method(-9999,10000);
  document.getElementById("a41c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona41.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona41();

  //OH, STYLO
  buttona41.onmouseover = function (){arrOnMouseOverLight41()};
  buttona41.onmouseout = function (){arrOnMouseOutLight41()};
  buttona41.onmousedown = function (){arrOnMouseOutDark41()};
  buttona41.onmouseup = function (){arrOnMouseOverDark41()};
}

// 42. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos números con cantidad par de dígitos pares hay almacenados en dicho vector.
var box42 = new get10Random("vector42");
var buttona42 = document.getElementById("arrayb42");
var inputArr42 = document.getElementById("arrayi42");
var freedom42;
var justice42;
var love42;
var flash42 = 0;
var xd42 = 0;
var cancelButton42 = 0;
var filterOfZeros42 = [];
var arrow42 = document.getElementsByClassName("arrow42");
var imgOff42 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd42 = document.querySelectorAll('div#a42d > div');
  [].forEach.call(dnd42,function(block){
    block.addEventListener('dragend',solutiona42);
  });

//solución al problema
function solutiona42(){
  if (cancelButton42==1){}
  else{
    
  function limitSolution(){
    cancelButton42 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow42,function(arrows){
    arrows.innerHTML = imgOff42; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector42 = [];
  for (let nums of box42.box){
      if (nums.textContent == 0){
        arrVector42.push(Number.parseInt(0));
      }
      else{
        arrVector42.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros42 = arrVector42.filter(x=>x!=0);
  box42.aux = filterOfZeros42;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES de números que tengan una cantidad par de dígitos par
  var seeker = [];
  for (let i = 0; i < filterOfZeros42.length; i++){
    let tissue = 0;
    let count = 0;
    tissue = Array.from(String(Math.abs(filterOfZeros42[i])),Number);
    for (m = 0; m < tissue.length; m++){
      if (tissue[m]%2==0 && tissue[m]!=0){
        count++;
      };
    };
    if (count%2==0 && count!=0){ 
      seeker.push(filterOfZeros42[i]);
    };
  };
  var snitch = [];

  for (let j=0; j<seeker.length; j++){
    for (let i=0; i<filterOfZeros42.length; i++){
      if(filterOfZeros42[i]==seeker[j]){
        snitch.push(i);
      };
    };
  };

  let fiu = `<br>`;
  for (let i = 0; i < seeker.length; i++){
    fiu += `El ${seeker[i]} en la posición ${snitch[i]} <br>`
  };
  let plural = (snitch.length>1)? `hay ${snitch.length} números con una cantidad par de dígitos pares: <br> ${fiu} UwU`:`sólo hay un número que tiene una cantidad par de dígitos pares: <br> el número ${seeker} y se halla en la posición n°${snitch} c:`;
  let no4 = (seeker.length==0)? `Ninguno de estos números tiene una cantidad par de dígitos pares :c vaya suerte... <br> ¡Prueba con otra tanda de números, human@!`:`En este vector, ${plural}`;
  let answer = no4;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd42 == 2){ 
      if (flash42==-1){
        arrow42[0].innerHTML = imgOff42;
        xd42 = 0;
        flash42=0;
      }
      else if (flash42==0){
        arrow42[1].innerHTML = imgOff42;
        arrow42[0].innerHTML = img;
        flash42=-1;
      }
      else{
        if (flash42<=8){
          arrow42[(flash42+1)].innerHTML = imgOff42;
        };
        arrow42[flash42].innerHTML = img;
        flash42--;
      }               
    }
    else if(xd42 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash42 = 9;
      arrow42[flash42].innerHTML = img;
      xd42 = 2;
      flash42--;
    }
    else{
      if (flash42==10){                       //VUELTA 2
        arrow42[(flash42-1)].innerHTML = imgOff42;
        xd42++;
        flash42 = 0;
      }
      else{                                 //VUELTA 1
        if (flash42>=1){
          arrow42[(flash42-1)].innerHTML = imgOff42;
        };
        arrow42[flash42].innerHTML = img;
        flash42++;
      }
    };
      getE("a42e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom42);
    [].forEach.call(arrow42,function(arrows){
      arrows.innerHTML = imgOff42; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow42[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    
    getE("a42e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros42.length == 10) {
    cancelButton42 = 1;
    freedom42 = setInterval(animation,250);
    justice42 = setTimeout(solution, 2000);
    love42 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros42.length == 0){
    flash42 = 0;
    clearInterval(freedom42);
    clearTimeout(justice42);
    clearTimeout(love42);
    getE("a42e").innerHTML = ``;
    [].forEach.call(arrow42,function(arrows){
      arrows.innerHTML = imgOff42; 
    });
  }
  else{
    getE("a42e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr42.addEventListener("keydown",arrayi42, false);
var iOfBox42 = 0; 
function arrayi42(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros42.length == 10 || filterOfZeros42.length == 0){
      buttona42.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros42.length == 9){
        buttona42.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona42.innerHTML = `GENERAR ${10-filterOfZeros42.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr42.value<0)? `-`:``;

  if (isNaN(inputArr42.value)){
    document.getElementById("a42").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr42.value == `` || inputArr42.value == '-' || inputArr42.value == '--' || inputArr42.value == '---' || inputArr42.value == '----'){
    document.getElementById("a42").innerHTML = ``;
  }
  else{
    if (inputArr42.value == 0){
      if (filterOfZeros42.length > 0){
        document.getElementById("a42").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a42").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a42").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr42.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr42.value)){
      inputArr42.value = ``;
    }else{
    if (inputArr42.value == `` || inputArr42.value == '-' || inputArr42.value == '--' || inputArr42.value == '---' || inputArr42.value == '----'){
      inputArr42.value = ``;
    }
    else if (inputArr42.value == 0){
      if(filterOfZeros42.length==0){
        inputArr42.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice42);
        clearInterval(freedom42);
        document.getElementById("a42b").innerHTML = ``;
        document.getElementById("a42c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a42c").innerHTML = ``;
        };
        box42.aux = [];
        filterOfZeros42.length = [];
        box42.equalize();
        solutiona42();
        inputArr42.value = ``;
        iOfBox42 = 0;

        clearInterval(freedom42);
        clearTimeout(justice42);
        clearTimeout(love42);
        getE("a42e").innerHTML = ``;
        [].forEach.call(arrow42,function(arrows){
          arrows.innerHTML = imgOff42; 
        });
      }
    }
    else{
      if (filterOfZeros42.length == 10){
        document.getElementById("a42c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box42.aux.shift();
        box42.aux.push(Number(inputArr42.value));
        box42.equalize();
        solutiona42();
        inputArr42.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a42c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox42 = 0; iOfBox42 < 10; iOfBox42++){
          if(box42.box[iOfBox42].textContent == ``){
            box42.box[iOfBox42].textContent = Number.parseInt(inputArr42.value);
            iOfBox42 = 10;
          };
        };
        solutiona42();
        inputArr42.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight42(){
  buttona42.style.border="3px solid #ffab40";
  buttona42.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona42.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight42(){
  buttona42.style.border='3px solid #f7b64e';
  buttona42.style.color='#333333';
  buttona42.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark42(){
  buttona42.style.border="3px solid #ffaa40";
  buttona42.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark42(){
  buttona42.style.border = '1px solid #ff9d00';
  buttona42.style.color = 'rgb(31, 11, 11)';
  buttona42.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array42(){
  //SOLUTION
  box42.method(-99999,100000);
  document.getElementById("a42c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona42.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona42();

  //OH, STYLO
  buttona42.onmouseover = function (){arrOnMouseOverLight42()};
  buttona42.onmouseout = function (){arrOnMouseOutLight42()};
  buttona42.onmousedown = function (){arrOnMouseOutDark42()};
  buttona42.onmouseup = function (){arrOnMouseOverDark42()};
}

// 43. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posiciones se encuentra el número con mayor cantidad de dígitos primos.
var box43 = new get10Random("vector43");
var buttona43 = document.getElementById("arrayb43");
var inputArr43 = document.getElementById("arrayi43");
var freedom43;
var justice43;
var love43;
var flash43 = 0;
var xd43 = 0;
var cancelButton43 = 0;
var filterOfZeros43 = [];
var arrow43 = document.getElementsByClassName("arrow43");
var imgOff43 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd43 = document.querySelectorAll('div#a43d > div');
  [].forEach.call(dnd43,function(block){
    block.addEventListener('dragend',solutiona43);
  });

//solución al problema
function solutiona43(){
  if (cancelButton43==1){}
  else{
    
  function limitSolution(){
    cancelButton43 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow43,function(arrows){
    arrows.innerHTML = imgOff43; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector43 = [];
  for (let nums of box43.box){
      if (nums.textContent == 0){
        arrVector43.push(Number.parseInt(0));
      }
      else{
        arrVector43.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros43 = arrVector43.filter(x=>x!=0);
  box43.aux = filterOfZeros43;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //en qué posiciones se encuentra el número con mayor cantidad de dígitos primos
  let mark = [];
  let seeker = [];
  let pos = [];
  for (let i = 0; i < filterOfZeros43.length; i++){
    let tissue = 0;
    let count = 0;
    tissue = Array.from(String(Math.abs(filterOfZeros43[i])),Number);
    for (m = 0; m < tissue.length; m++){
      if (tissue[m]==2 || tissue[m]==3 || tissue[m]==5 || tissue[m]==7){
        count++;
      };
    };
    if (count!=0){ 
      mark.push(count);
      seeker.push(filterOfZeros43[i]);
      pos.push(i);
    };
  };
  
  let snitch = [];
  let great = Math.max(...mark);
  for (let i = 0; i < mark.length; i++){
    if(mark[i] == great){
      snitch.push(pos[i]);
    };
  };

  let fiu = `<br>`;
  for (let i = 0; i < seeker.length; i++){
    let unit = (mark[i]==1)? `primo`:`primos`;
    fiu += `El ${seeker[i]} en la posición ${pos[i]} con ${mark[i]} ${unit} <br>`
  };

  let puta = [];
  for (let i = 0; i < snitch.length; i++){
    puta.push(seeker[snitch[i]]);
  };

  let win = (snitch.length == 1)? `Y el número con más dígitos primos es... <br> El ${seeker[snitch]} en la posición ${snitch} con ${mark[snitch]} primos c:<`:`Y los números con más dígitos primos son: <br> ${puta} con ${great} primos`;

  let plural = (seeker.length>1)? `hay ${seeker.length} números con dígitos primos: <br> ${fiu} <br> ${win} <br> UwU`:`sólo hay un número que tiene dígitos primos (y es por ende... El mayor): <br> el número ${seeker[snitch]} en la posición n°${snitch} c:`;
  let no4 = (seeker.length==0)? `Ninguno de estos números tiene dígitos primos :c Estamos es pero podridos... <br> ¡Prueba con otra tanda de números, human@!`:`En este vector, ${plural}`;
  let answer = no4;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd43 == 2){ 
      if (flash43==-1){
        arrow43[0].innerHTML = imgOff43;
        xd43 = 0;
        flash43=0;
      }
      else if (flash43==0){
        arrow43[1].innerHTML = imgOff43;
        arrow43[0].innerHTML = img;
        flash43=-1;
      }
      else{
        if (flash43<=8){
          arrow43[(flash43+1)].innerHTML = imgOff43;
        };
        arrow43[flash43].innerHTML = img;
        flash43--;
      }               
    }
    else if(xd43 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash43 = 9;
      arrow43[flash43].innerHTML = img;
      xd43 = 2;
      flash43--;
    }
    else{
      if (flash43==10){                       //VUELTA 2
        arrow43[(flash43-1)].innerHTML = imgOff43;
        xd43++;
        flash43 = 0;
      }
      else{                                 //VUELTA 1
        if (flash43>=1){
          arrow43[(flash43-1)].innerHTML = imgOff43;
        };
        arrow43[flash43].innerHTML = img;
        flash43++;
      }
    };
      getE("a43e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom43);
    [].forEach.call(arrow43,function(arrows){
      arrows.innerHTML = imgOff43; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow43[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    
    getE("a43e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros43.length == 10) {
    cancelButton43 = 1;
    freedom43 = setInterval(animation,250);
    justice43 = setTimeout(solution, 2000);
    love43 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros43.length == 0){
    flash43 = 0;
    clearInterval(freedom43);
    clearTimeout(justice43);
    clearTimeout(love43);
    getE("a43e").innerHTML = ``;
    [].forEach.call(arrow43,function(arrows){
      arrows.innerHTML = imgOff43; 
    });
  }
  else{
    getE("a43e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr43.addEventListener("keydown",arrayi43, false);
var iOfBox43 = 0; 
function arrayi43(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros43.length == 10 || filterOfZeros43.length == 0){
      buttona43.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros43.length == 9){
        buttona43.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona43.innerHTML = `GENERAR ${10-filterOfZeros43.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr43.value<0)? `-`:``;

  if (isNaN(inputArr43.value)){
    document.getElementById("a43").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr43.value == `` || inputArr43.value == '-' || inputArr43.value == '--' || inputArr43.value == '---' || inputArr43.value == '----'){
    document.getElementById("a43").innerHTML = ``;
  }
  else{
    if (inputArr43.value == 0){
      if (filterOfZeros43.length > 0){
        document.getElementById("a43").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a43").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a43").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr43.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr43.value)){
      inputArr43.value = ``;
    }else{
    if (inputArr43.value == `` || inputArr43.value == '-' || inputArr43.value == '--' || inputArr43.value == '---' || inputArr43.value == '----'){
      inputArr43.value = ``;
    }
    else if (inputArr43.value == 0){
      if(filterOfZeros43.length==0){
        inputArr43.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice43);
        clearInterval(freedom43);
        document.getElementById("a43b").innerHTML = ``;
        document.getElementById("a43c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a43c").innerHTML = ``;
        };
        box43.aux = [];
        filterOfZeros43.length = [];
        box43.equalize();
        solutiona43();
        inputArr43.value = ``;
        iOfBox43 = 0;

        clearInterval(freedom43);
        clearTimeout(justice43);
        clearTimeout(love43);
        getE("a43e").innerHTML = ``;
        [].forEach.call(arrow43,function(arrows){
          arrows.innerHTML = imgOff43; 
        });
      }
    }
    else{
      if (filterOfZeros43.length == 10){
        document.getElementById("a43c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box43.aux.shift();
        box43.aux.push(Number(inputArr43.value));
        box43.equalize();
        solutiona43();
        inputArr43.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a43c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox43 = 0; iOfBox43 < 10; iOfBox43++){
          if(box43.box[iOfBox43].textContent == ``){
            box43.box[iOfBox43].textContent = Number.parseInt(inputArr43.value);
            iOfBox43 = 10;
          };
        };
        solutiona43();
        inputArr43.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight43(){
  buttona43.style.border="3px solid #ffab40";
  buttona43.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona43.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight43(){
  buttona43.style.border='3px solid #f7b64e';
  buttona43.style.color='#333333';
  buttona43.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark43(){
  buttona43.style.border="3px solid #ffaa40";
  buttona43.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark43(){
  buttona43.style.border = '1px solid #ff9d00';
  buttona43.style.color = 'rgb(31, 11, 11)';
  buttona43.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array43(){
  //SOLUTION
  box43.method(-99999,100000);
  document.getElementById("a43c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona43.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona43();

  //OH, STYLO
  buttona43.onmouseover = function (){arrOnMouseOverLight43()};
  buttona43.onmouseout = function (){arrOnMouseOutLight43()};
  buttona43.onmousedown = function (){arrOnMouseOutDark43()};
  buttona43.onmouseup = function (){arrOnMouseOverDark43()};
}

// 44. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos de los números almacenados en dicho vector pertenecen a los 100 primeros elementos de la serie de Fibonacci.
var box44 = new get10Random("vector44");
var buttona44 = document.getElementById("arrayb44");
var inputArr44 = document.getElementById("arrayi44");
var freedom44;
var justice44;
var love44;
var flash44 = 0;
var xd44 = 0;
var cancelButton44 = 0;
var filterOfZeros44 = [];
var arrow44 = document.getElementsByClassName("arrow44");
var imgOff44 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd44 = document.querySelectorAll('div#a44d > div');
  [].forEach.call(dnd44,function(block){
    block.addEventListener('dragend',solutiona44);
  });

//solución al problema
function solutiona44(){
  if (cancelButton44==1){}
  else{
    
  function limitSolution(){
    cancelButton44 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow44,function(arrows){
    arrows.innerHTML = imgOff44; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector44 = [];
  for (let nums of box44.box){
      if (nums.textContent == 0){
        arrVector44.push(Number.parseInt(0));
      }
      else{
        arrVector44.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros44 = arrVector44.filter(x=>x!=0);
  box44.aux = filterOfZeros44;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //cuántos pertenecen a los 100 primeros Fibonacci.
  //new Fibo
    arr = new Array(101).fill(1).reduce((arr, _ ,i) => {
        arr.push((i <= 1) ? i : arr[i-2] + arr[i-1]);
        return arr;
    },[]);

  let basurero = [];
  let seeker = [];

  for (let i = 0; i < filterOfZeros44.length; i++){
    for (let j = 0; j < arr.length; j++){
      if (filterOfZeros44[i] == arr[j]){
        basurero.push(i);
        seeker.push(filterOfZeros44[i]);
      };
    };
  };

  let list = `<br>`
  for (let i = 0; i < basurero.length; i++){
    list += `El ${seeker[i]} en la posición n°${basurero[i]} <br>`;
    if(seeker[i]==1){
      i++;
    };
  };

  let aaa = (basurero.length == 1)? `Curiosamente, sólo el ${seeker} en la posición n°${basurero} <br> pertenece a los 100 primeros fibonacci uwu` : `alv hay varios números en este vector que pertenecen a la serie fibo: <br> ${list} uwu`;
  let bbb = (filterOfZeros44.length == 1)? `El ${filterOfZeros44} no`: `Ningún número del vector`;
  let answer = (basurero.length > 0)? aaa : `${bbb} pertenece a los 100 primeros fibonacci, humano :c`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd44 == 2){ 
      if (flash44==-1){
        arrow44[0].innerHTML = imgOff44;
        xd44 = 0;
        flash44=0;
      }
      else if (flash44==0){
        arrow44[1].innerHTML = imgOff44;
        arrow44[0].innerHTML = img;
        flash44=-1;
      }
      else{
        if (flash44<=8){
          arrow44[(flash44+1)].innerHTML = imgOff44;
        };
        arrow44[flash44].innerHTML = img;
        flash44--;
      }               
    }
    else if(xd44 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash44 = 9;
      arrow44[flash44].innerHTML = img;
      xd44 = 2;
      flash44--;
    }
    else{
      if (flash44==10){                       //VUELTA 2
        arrow44[(flash44-1)].innerHTML = imgOff44;
        xd44++;
        flash44 = 0;
      }
      else{                                 //VUELTA 1
        if (flash44>=1){
          arrow44[(flash44-1)].innerHTML = imgOff44;
        };
        arrow44[flash44].innerHTML = img;
        flash44++;
      }
    };
      getE("a44e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom44);
    [].forEach.call(arrow44,function(arrows){
      arrows.innerHTML = imgOff44; 
    });

    for (let i=0; i<basurero.length; i++){
      let miau = basurero[i]; 
      arrow44[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    getE("a44e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros44.length == 10) {
    cancelButton44 = 1;
    freedom44 = setInterval(animation,250);
    justice44 = setTimeout(solution, 2000);
    love44 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros44.length == 0){
    flash44 = 0;
    clearInterval(freedom44);
    clearTimeout(justice44);
    clearTimeout(love44);
    getE("a44e").innerHTML = ``;
    [].forEach.call(arrow44,function(arrows){
      arrows.innerHTML = imgOff44; 
    });
  }
  else{
    getE("a44e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr44.addEventListener("keydown",arrayi44, false);
var iOfBox44 = 0; 
function arrayi44(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros44.length == 10 || filterOfZeros44.length == 0){
      buttona44.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros44.length == 9){
        buttona44.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona44.innerHTML = `GENERAR ${10-filterOfZeros44.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr44.value<0)? `-`:``;

  if (isNaN(inputArr44.value)){
    document.getElementById("a44").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr44.value == `` || inputArr44.value == '-' || inputArr44.value == '--' || inputArr44.value == '---' || inputArr44.value == '----'){
    document.getElementById("a44").innerHTML = ``;
  }
  else{
    if (inputArr44.value == 0){
      if (filterOfZeros44.length > 0){
        document.getElementById("a44").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a44").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a44").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr44.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr44.value)){
      inputArr44.value = ``;
    }else{
    if (inputArr44.value == `` || inputArr44.value == '-' || inputArr44.value == '--' || inputArr44.value == '---' || inputArr44.value == '----'){
      inputArr44.value = ``;
    }
    else if (inputArr44.value == 0){
      if(filterOfZeros44.length==0){
        inputArr44.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice44);
        clearInterval(freedom44);
        document.getElementById("a44b").innerHTML = ``;
        document.getElementById("a44c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a44c").innerHTML = ``;
        };
        box44.aux = [];
        filterOfZeros44.length = [];
        box44.equalize();
        solutiona44();
        inputArr44.value = ``;
        iOfBox44 = 0;

        clearInterval(freedom44);
        clearTimeout(justice44);
        clearTimeout(love44);
        getE("a44e").innerHTML = ``;
        [].forEach.call(arrow44,function(arrows){
          arrows.innerHTML = imgOff44; 
        });
      }
    }
    else{
      if (filterOfZeros44.length == 10){
        document.getElementById("a44c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box44.aux.shift();
        box44.aux.push(Number(inputArr44.value));
        box44.equalize();
        solutiona44();
        inputArr44.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a44c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox44 = 0; iOfBox44 < 10; iOfBox44++){
          if(box44.box[iOfBox44].textContent == ``){
            box44.box[iOfBox44].textContent = Number.parseInt(inputArr44.value);
            iOfBox44 = 10;
          };
        };
        solutiona44();
        inputArr44.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function onMouseOverLight44(){
  buttona44.style.border="3px solid #ffab22";
  buttona44.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona44.style.color="rgb(31, 11, 11)";
};
function onMouseOutLight44(){
  buttona44.style.border='3px solid #f7b64e';
  buttona44.style.color='#333333';
  buttona44.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function onMouseOverDark44(){
  buttona44.style.border="3px solid #ffaa22";
  buttona44.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function onMouseOutDark44(){
  buttona44.style.border = '1px solid #ff9d00';
  buttona44.style.color = 'rgb(31, 11, 11)';
  buttona44.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array44(){
  //SOLUTION
  box44.method(-9999,10000);
  document.getElementById("a44c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona44.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona44();

  //OH, STYLO
  buttona44.onmouseover = function (){onMouseOverLight44()};
  buttona44.onmouseout = function (){onMouseOutLight44()};
  buttona44.onmousedown = function (){onMouseOutDark44()};
  buttona44.onmouseup = function (){onMouseOverDark44()};
}

// 45. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos números de los almacenados en dicho vector comienzan por 34.
var box45 = new get10Random("vector45");
var buttona45 = document.getElementById("arrayb45");
var inputArr45 = document.getElementById("arrayi45");
var freedom45;
var justice45;
var love45;
var flash45 = 0;
var xd45 = 0;
var cancelButton45 = 0;
var filterOfZeros45 = [];
var arrow45 = document.getElementsByClassName("arrow45");
var imgOff45 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd45 = document.querySelectorAll('div#a45d > div');
  [].forEach.call(dnd45,function(block){
    block.addEventListener('dragend',solutiona45);
  });

//solución al problema
function solutiona45(){
  if (cancelButton45==1){}
  else{
    
  function limitSolution(){
    cancelButton45 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow45,function(arrows){
    arrows.innerHTML = imgOff45; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector45 = [];
  for (let nums of box45.box){
      if (nums.textContent == 0){
        arrVector45.push(Number.parseInt(0));
      }
      else{
        arrVector45.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros45 = arrVector45.filter(x=>x!=0);
  box45.aux = filterOfZeros45;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES de números que comiencen por 34
  var seeker = [];
  for (let i = 0; i < filterOfZeros45.length; i++){
    let tissue = 0;
    tissue = Array.from(String(Math.abs(filterOfZeros45[i])),Number);
    if (tissue[0] == 3 && tissue[1] == 4){
      seeker.push(filterOfZeros45[i]);
    };
  };
  var snitch = [];

  for (let j=0; j<seeker.length; j++){
    for (let i=0; i<filterOfZeros45.length; i++){
      if(filterOfZeros45[i]==seeker[j]){
        snitch.push(i);
      };
    };
  };

  let fiu = `<br>`;
  for (let i = 0; i < seeker.length; i++){
    fiu += `El ${seeker[i]} en la posición ${snitch[i]} <br>`
  };
  let plural = (snitch.length>1)? `hay ${snitch.length} números que comienzan por 34: <br> ${fiu} UwU`:`sólo hay un número que comienza por el 34: <br> el número ${seeker} y se halla en la posición n°${snitch} c:`;
  let no4 = (seeker.length==0)? `Ninguno de estos números comienza por el 34 :c vaya suerte... <br> ¡Prueba con otra tanda de números, human@!`:`En este vector, ${plural}`;
  let answer = no4;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd45 == 2){ 
      if (flash45==-1){
        arrow45[0].innerHTML = imgOff45;
        xd45 = 0;
        flash45=0;
      }
      else if (flash45==0){
        arrow45[1].innerHTML = imgOff45;
        arrow45[0].innerHTML = img;
        flash45=-1;
      }
      else{
        if (flash45<=8){
          arrow45[(flash45+1)].innerHTML = imgOff45;
        };
        arrow45[flash45].innerHTML = img;
        flash45--;
      }               
    }
    else if(xd45 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash45 = 9;
      arrow45[flash45].innerHTML = img;
      xd45 = 2;
      flash45--;
    }
    else{
      if (flash45==10){                       //VUELTA 2
        arrow45[(flash45-1)].innerHTML = imgOff45;
        xd45++;
        flash45 = 0;
      }
      else{                                 //VUELTA 1
        if (flash45>=1){
          arrow45[(flash45-1)].innerHTML = imgOff45;
        };
        arrow45[flash45].innerHTML = img;
        flash45++;
      }
    };
      getE("a45e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom45);
    [].forEach.call(arrow45,function(arrows){
      arrows.innerHTML = imgOff45; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow45[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    
    getE("a45e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros45.length == 10) {
    cancelButton45 = 1;
    freedom45 = setInterval(animation,250);
    justice45 = setTimeout(solution, 2000);
    love45 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros45.length == 0){
    flash45 = 0;
    clearInterval(freedom45);
    clearTimeout(justice45);
    clearTimeout(love45);
    getE("a45e").innerHTML = ``;
    [].forEach.call(arrow45,function(arrows){
      arrows.innerHTML = imgOff45; 
    });
  }
  else{
    getE("a45e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr45.addEventListener("keydown",arrayi45, false);
var iOfBox45 = 0; 
function arrayi45(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros45.length == 10 || filterOfZeros45.length == 0){
      buttona45.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros45.length == 9){
        buttona45.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona45.innerHTML = `GENERAR ${10-filterOfZeros45.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr45.value<0)? `-`:``;

  if (isNaN(inputArr45.value)){
    document.getElementById("a45").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr45.value == `` || inputArr45.value == '-' || inputArr45.value == '--' || inputArr45.value == '---' || inputArr45.value == '----'){
    document.getElementById("a45").innerHTML = ``;
  }
  else{
    if (inputArr45.value == 0){
      if (filterOfZeros45.length > 0){
        document.getElementById("a45").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a45").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a45").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr45.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr45.value)){
      inputArr45.value = ``;
    }else{
    if (inputArr45.value == `` || inputArr45.value == '-' || inputArr45.value == '--' || inputArr45.value == '---' || inputArr45.value == '----'){
      inputArr45.value = ``;
    }
    else if (inputArr45.value == 0){
      if(filterOfZeros45.length==0){
        inputArr45.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice45);
        clearInterval(freedom45);
        document.getElementById("a45b").innerHTML = ``;
        document.getElementById("a45c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a45c").innerHTML = ``;
        };
        box45.aux = [];
        filterOfZeros45.length = [];
        box45.equalize();
        solutiona45();
        inputArr45.value = ``;
        iOfBox45 = 0;

        clearInterval(freedom45);
        clearTimeout(justice45);
        clearTimeout(love45);
        getE("a45e").innerHTML = ``;
        [].forEach.call(arrow45,function(arrows){
          arrows.innerHTML = imgOff45; 
        });
      }
    }
    else{
      if (filterOfZeros45.length == 10){
        document.getElementById("a45c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box45.aux.shift();
        box45.aux.push(Number(inputArr45.value));
        box45.equalize();
        solutiona45();
        inputArr45.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a45c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox45 = 0; iOfBox45 < 10; iOfBox45++){
          if(box45.box[iOfBox45].textContent == ``){
            box45.box[iOfBox45].textContent = Number.parseInt(inputArr45.value);
            iOfBox45 = 10;
          };
        };
        solutiona45();
        inputArr45.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight45(){
  buttona45.style.border="3px solid #ffab40";
  buttona45.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona45.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight45(){
  buttona45.style.border='3px solid #f7b64e';
  buttona45.style.color='#333333';
  buttona45.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark45(){
  buttona45.style.border="3px solid #ffaa40";
  buttona45.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark45(){
  buttona45.style.border = '1px solid #ff9d00';
  buttona45.style.color = 'rgb(31, 11, 11)';
  buttona45.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array45(){
  //SOLUTION
  box45.method(-9999,10000);
  document.getElementById("a45c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona45.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona45();

  //OH, STYLO
  buttona45.onmouseover = function (){arrOnMouseOverLight45()};
  buttona45.onmouseout = function (){arrOnMouseOutLight45()};
  buttona45.onmousedown = function (){arrOnMouseOutDark45()};
  buttona45.onmouseup = function (){arrOnMouseOverDark45()};
}

// 46. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos números de los almacenados en dicho vector son primos y comienzan por 5.
var box46 = new get10Random("vector46");
var buttona46 = document.getElementById("arrayb46");
var inputArr46 = document.getElementById("arrayi46");
var freedom46;
var justice46;
var love46;
var flash46 = 0;
var xd46 = 0;
var cancelButton46 = 0;
var filterOfZeros46 = [];
var arrow46 = document.getElementsByClassName("arrow46");
var imgOff46 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd46 = document.querySelectorAll('div#a46d > div');
  [].forEach.call(dnd46,function(block){
    block.addEventListener('dragend',solutiona46);
  });

//solución al problema
function solutiona46(){
  if (cancelButton46==1){}
  else{
    
  function limitSolution(){
    cancelButton46 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow46,function(arrows){
    arrows.innerHTML = imgOff46; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector46 = [];
  for (let nums of box46.box){
      if (nums.textContent == 0){
        arrVector46.push(Number.parseInt(0));
      }
      else{
        arrVector46.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros46 = arrVector46.filter(x=>x!=0);
  box46.aux = filterOfZeros46;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES de números que comiencen por 5 y que sean primos
  //algorithm for numbers that startup with a 5
  let five = [];
  let fivePos = [];
  for (let i = 0; i < filterOfZeros46.length; i++){
    let tissue = 0;
    tissue = Array.from(String(Math.abs(filterOfZeros46[i])),Number);
    if (tissue[0] == 5){
      five.push(filterOfZeros46[i]);
      fivePos.push(i);
    };
  };


  //algorithm for prime numbers
  let prm = [];
  let prmPos = [];
  for (let j = 0; j < filterOfZeros46.length; j++){
    let cousins = [];
    for (let numbers = 2; numbers <= Math.abs(filterOfZeros46[j]); numbers++) {
      const prime = filterOfZeros46[j]%numbers;
      if (prime == 0) {
        cousins.push(numbers);  
      };
    };
    if (cousins.length == 1){
      prm.push(filterOfZeros46[j]);
      prmPos.push(j);
    };
  };

  
  //ALGORITHM FOR PRIME NUMBERS THAT START UP WITH A FREAKIN' 5 >:c
  let seeker = [];
  for (let i = 0; i < five.length; i++){
    let box = [];
    for (let numbers = 2; numbers <= Math.abs(five[i]); numbers++) {
      const prime = five[i]%numbers;
      if (prime == 0) {
        box.push(numbers);  
      };
    };
    if (box.length == 1){
      seeker.push(five[i]);
    };
  };    
    
  let snitch = [];
  for (let j=0; j<seeker.length; j++){
    for (let i=0; i<filterOfZeros46.length; i++){
      if(filterOfZeros46[i]==seeker[j]){
        snitch.push(i);
      };
    };
  };

  //Algorithm for listing primes
  let fui = `<br>`;
  for (let i = 0; i < prm.length; i++){
    fui += `El ${prm[i]} en la posición ${prmPos[i]} <br>`
  };

  //Algorithm for listing fives
  let fiu = `<br>`;
  for (let i = 0; i < five.length; i++){
    fiu += `El ${five[i]} en la posición ${fivePos[i]} <br>`
  };

  let snitchS = (snitch.length > 1)? `ALVV SII <br> ¡¡¡${snitch.join(', ')} LO SON!!!`:`ALV SII ES PRIMOOO D:`;
  let resp = (snitch.length == 0)? `pos ño xd`:`${snitchS}`;
  let plural = (five.length>1)? `hay ${five.length} números que comienzan por 5: <br> ${fiu} UwU <br> Pero bueno... ¿Alguno es primo? <br> ${resp}`:`sólo hay un número que comienza por el 5: <br> el número ${five} y se halla en la posición n°${fivePos} c: <br> Pero bueno... ¿Es primo? <br> ${resp}`;
  let hayPrimos = (prm.length>0)? `y eso que tenías números primos: ${fui} F`:`igual no tenías números primos, así que doble F`;
  let no4 = (five.length==0)? `Ninguno de estos números comienza por el 5 :c vaya suerte... <br> ${hayPrimos} <br> ¡Prueba con otra tanda de números, human@!`:`En este vector, ${plural}`;
  let answer = no4;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd46 == 2){ 
      if (flash46==-1){
        arrow46[0].innerHTML = imgOff46;
        xd46 = 0;
        flash46=0;
      }
      else if (flash46==0){
        arrow46[1].innerHTML = imgOff46;
        arrow46[0].innerHTML = img;
        flash46=-1;
      }
      else{
        if (flash46<=8){
          arrow46[(flash46+1)].innerHTML = imgOff46;
        };
        arrow46[flash46].innerHTML = img;
        flash46--;
      }               
    }
    else if(xd46 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash46 = 9;
      arrow46[flash46].innerHTML = img;
      xd46 = 2;
      flash46--;
    }
    else{
      if (flash46==10){                       //VUELTA 2
        arrow46[(flash46-1)].innerHTML = imgOff46;
        xd46++;
        flash46 = 0;
      }
      else{                                 //VUELTA 1
        if (flash46>=1){
          arrow46[(flash46-1)].innerHTML = imgOff46;
        };
        arrow46[flash46].innerHTML = img;
        flash46++;
      }
    };
      getE("a46e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom46);
    [].forEach.call(arrow46,function(arrows){
      arrows.innerHTML = imgOff46; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow46[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    
    getE("a46e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros46.length == 10) {
    cancelButton46 = 1;
    freedom46 = setInterval(animation,250);
    justice46 = setTimeout(solution, 2000);
    love46 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros46.length == 0){
    flash46 = 0;
    clearInterval(freedom46);
    clearTimeout(justice46);
    clearTimeout(love46);
    getE("a46e").innerHTML = ``;
    [].forEach.call(arrow46,function(arrows){
      arrows.innerHTML = imgOff46; 
    });
  }
  else{
    getE("a46e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr46.addEventListener("keydown",arrayi46, false);
var iOfBox46 = 0; 
function arrayi46(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros46.length == 10 || filterOfZeros46.length == 0){
      buttona46.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros46.length == 9){
        buttona46.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona46.innerHTML = `GENERAR ${10-filterOfZeros46.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr46.value<0)? `-`:``;

  if (isNaN(inputArr46.value)){
    document.getElementById("a46").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr46.value == `` || inputArr46.value == '-' || inputArr46.value == '--' || inputArr46.value == '---' || inputArr46.value == '----'){
    document.getElementById("a46").innerHTML = ``;
  }
  else{
    if (inputArr46.value == 0){
      if (filterOfZeros46.length > 0){
        document.getElementById("a46").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a46").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a46").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr46.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr46.value)){
      inputArr46.value = ``;
    }else{
    if (inputArr46.value == `` || inputArr46.value == '-' || inputArr46.value == '--' || inputArr46.value == '---' || inputArr46.value == '----'){
      inputArr46.value = ``;
    }
    else if (inputArr46.value == 0){
      if(filterOfZeros46.length==0){
        inputArr46.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice46);
        clearInterval(freedom46);
        document.getElementById("a46b").innerHTML = ``;
        document.getElementById("a46c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a46c").innerHTML = ``;
        };
        box46.aux = [];
        filterOfZeros46.length = [];
        box46.equalize();
        solutiona46();
        inputArr46.value = ``;
        iOfBox46 = 0;

        clearInterval(freedom46);
        clearTimeout(justice46);
        clearTimeout(love46);
        getE("a46e").innerHTML = ``;
        [].forEach.call(arrow46,function(arrows){
          arrows.innerHTML = imgOff46; 
        });
      }
    }
    else{
      if (filterOfZeros46.length == 10){
        document.getElementById("a46c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box46.aux.shift();
        box46.aux.push(Number(inputArr46.value));
        box46.equalize();
        solutiona46();
        inputArr46.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a46c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox46 = 0; iOfBox46 < 10; iOfBox46++){
          if(box46.box[iOfBox46].textContent == ``){
            box46.box[iOfBox46].textContent = Number.parseInt(inputArr46.value);
            iOfBox46 = 10;
          };
        };
        solutiona46();
        inputArr46.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight46(){
  buttona46.style.border="3px solid #ffab40";
  buttona46.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona46.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight46(){
  buttona46.style.border='3px solid #f7b64e';
  buttona46.style.color='#333333';
  buttona46.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark46(){
  buttona46.style.border="3px solid #ffaa40";
  buttona46.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark46(){
  buttona46.style.border = '1px solid #ff9d00';
  buttona46.style.color = 'rgb(31, 11, 11)';
  buttona46.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array46(){
  //SOLUTION
  box46.method(-9999,10000);
  document.getElementById("a46c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona46.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona46();

  //OH, STYLO
  buttona46.onmouseover = function (){arrOnMouseOverLight46()};
  buttona46.onmouseout = function (){arrOnMouseOutLight46()};
  buttona46.onmousedown = function (){arrOnMouseOutDark46()};
  buttona46.onmouseup = function (){arrOnMouseOverDark46()};
}

// 47. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posiciones se encuentran los números múltiplos de 10. 
var box47 = new get10Random("vector47");
var buttona47 = document.getElementById("arrayb47");
var inputArr47 = document.getElementById("arrayi47");
var freedom47;
var justice47;
var love47;
var flash47 = 0;
var xd47 = 0;
var cancelButton47 = 0;
var filterOfZeros47 = [];
var arrow47 = document.getElementsByClassName("arrow47");
var imgOff47 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd47 = document.querySelectorAll('div#a47d > div');
  [].forEach.call(dnd47,function(block){
    block.addEventListener('dragend',solutiona47);
  });

//solución al problema
function solutiona47(){
  if (cancelButton47==1){}
  else{
    
  function limitSolution(){
    cancelButton47 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow47,function(arrows){
    arrows.innerHTML = imgOff47; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector47 = [];
  for (let nums of box47.box){
      if (nums.textContent == 0){
        arrVector47.push(Number.parseInt(0));
      }
      else{
        arrVector47.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros47 = arrVector47.filter(x=>x!=0);
  box47.aux = filterOfZeros47;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES de números múltiplos de 10
  let seeker = filterOfZeros47.filter(x=>x%(5+5)==0); //Ahí está, el ejercicio sin usar el 10 xd
  let snitch = [];
  for (let j=0; j<seeker.length; j++){
    for (let i=0; i<filterOfZeros47.length; i++){
      if(filterOfZeros47[i]==seeker[j]){
        snitch.push(i);
      };
    };
  };

  let fiu = `<br>`;
  for (let i = 0; i < seeker.length; i++){
    fiu += `El ${filterOfZeros47[snitch[i]]} en la posición n°${snitch[i]} <br>`
  };
  
  let plural = (snitch.length>1)? `hay ${snitch.length} múltiplos de 10: <br> ${fiu} uwu`:`sólo hay un múltiplo del 10: <br> el número ${seeker} en la posición n°${snitch} uwu`;
  let no4 = (seeker.length==0)? `Este vector no cuenta con múltiplos de 10 :c vaya suerte... <br> ¡Prueba con otra tanda de números, human@!`:`En este vector, ${plural}`;
  let answer = no4;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd47 == 2){ 
      if (flash47==-1){
        arrow47[0].innerHTML = imgOff47;
        xd47 = 0;
        flash47=0;
      }
      else if (flash47==0){
        arrow47[1].innerHTML = imgOff47;
        arrow47[0].innerHTML = img;
        flash47=-1;
      }
      else{
        if (flash47<=8){
          arrow47[(flash47+1)].innerHTML = imgOff47;
        };
        arrow47[flash47].innerHTML = img;
        flash47--;
      }               
    }
    else if(xd47 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash47 = 9;
      arrow47[flash47].innerHTML = img;
      xd47 = 2;
      flash47--;
    }
    else{
      if (flash47==10){                       //VUELTA 2
        arrow47[(flash47-1)].innerHTML = imgOff47;
        xd47++;
        flash47 = 0;
      }
      else{                                 //VUELTA 1
        if (flash47>=1){
          arrow47[(flash47-1)].innerHTML = imgOff47;
        };
        arrow47[flash47].innerHTML = img;
        flash47++;
      }
    };
      getE("a47e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom47);
    [].forEach.call(arrow47,function(arrows){
      arrows.innerHTML = imgOff47; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow47[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    
    getE("a47e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros47.length == 10) {
    cancelButton47 = 1;
    freedom47 = setInterval(animation,250);
    justice47 = setTimeout(solution, 2000);
    love47 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros47.length == 0){
    flash47 = 0;
    clearInterval(freedom47);
    clearTimeout(justice47);
    clearTimeout(love47);
    getE("a47e").innerHTML = ``;
    [].forEach.call(arrow47,function(arrows){
      arrows.innerHTML = imgOff47; 
    });
  }
  else{
    getE("a47e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr47.addEventListener("keydown",arrayi47, false);
var iOfBox47 = 0; 
function arrayi47(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros47.length == 10 || filterOfZeros47.length == 0){
      buttona47.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros47.length == 9){
        buttona47.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona47.innerHTML = `GENERAR ${10-filterOfZeros47.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr47.value<0)? `-`:``;

  if (isNaN(inputArr47.value)){
    document.getElementById("a47").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr47.value == `` || inputArr47.value == '-' || inputArr47.value == '--' || inputArr47.value == '---' || inputArr47.value == '----'){
    document.getElementById("a47").innerHTML = ``;
  }
  else{
    if (inputArr47.value == 0){
      if (filterOfZeros47.length > 0){
        document.getElementById("a47").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a47").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a47").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr47.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr47.value)){
      inputArr47.value = ``;
    }else{
    if (inputArr47.value == `` || inputArr47.value == '-' || inputArr47.value == '--' || inputArr47.value == '---' || inputArr47.value == '----'){
      inputArr47.value = ``;
    }
    else if (inputArr47.value == 0){
      if(filterOfZeros47.length==0){
        inputArr47.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice47);
        clearInterval(freedom47);
        document.getElementById("a47b").innerHTML = ``;
        document.getElementById("a47c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a47c").innerHTML = ``;
        };
        box47.aux = [];
        filterOfZeros47.length = [];
        box47.equalize();
        solutiona47();
        inputArr47.value = ``;
        iOfBox47 = 0;

        clearInterval(freedom47);
        clearTimeout(justice47);
        clearTimeout(love47);
        getE("a47e").innerHTML = ``;
        [].forEach.call(arrow47,function(arrows){
          arrows.innerHTML = imgOff47; 
        });
      }
    }
    else{
      if (filterOfZeros47.length == 10){
        document.getElementById("a47c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box47.aux.shift();
        box47.aux.push(Number(inputArr47.value));
        box47.equalize();
        solutiona47();
        inputArr47.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a47c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox47 = 0; iOfBox47 < 10; iOfBox47++){
          if(box47.box[iOfBox47].textContent == ``){
            box47.box[iOfBox47].textContent = Number.parseInt(inputArr47.value);
            iOfBox47 = 10;
          };
        };
        solutiona47();
        inputArr47.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight47(){
  buttona47.style.border="3px solid #ffab22";
  buttona47.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona47.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight47(){
  buttona47.style.border='3px solid #f7b64e';
  buttona47.style.color='#333333';
  buttona47.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark47(){
  buttona47.style.border="3px solid #ffaa22";
  buttona47.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark47(){
  buttona47.style.border = '1px solid #ff9d00';
  buttona47.style.color = 'rgb(31, 11, 11)';
  buttona47.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array47(){
  //SOLUTION
  box47.method(-9999,10000);
  document.getElementById("a47c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona47.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona47();

  //OH, STYLO
  buttona47.onmouseover = function (){arrOnMouseOverLight47()};
  buttona47.onmouseout = function (){arrOnMouseOutLight47()};
  buttona47.onmousedown = function (){arrOnMouseOutDark47()};
  buttona47.onmouseup = function (){arrOnMouseOverDark47()};
}


// 48. Leer 10 números enteros, almacenarlos en un vector y determinar en qué posición se encuentra el número primo con mayor cantidad de dígitos pares.
var box48 = new get10Random("vector48");
var buttona48 = document.getElementById("arrayb48");
var inputArr48 = document.getElementById("arrayi48");
var freedom48;
var justice48;
var love48;
var flash48 = 0;
var xd48 = 0;
var cancelButton48 = 0;
var filterOfZeros48 = [];
var arrow48 = document.getElementsByClassName("arrow48");
var imgOff48 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd48 = document.querySelectorAll('div#a48d > div');
  [].forEach.call(dnd48,function(block){
    block.addEventListener('dragend',solutiona48);
  });

//solución al problema
function solutiona48(){
  if (cancelButton48==1){}
  else{
    
  function limitSolution(){
    cancelButton48 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow48,function(arrows){
    arrows.innerHTML = imgOff48; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector48 = [];
  for (let nums of box48.box){
      if (nums.textContent == 0){
        arrVector48.push(Number.parseInt(0));
      }
      else{
        arrVector48.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros48 = arrVector48.filter(x=>x!=0);
  box48.aux = filterOfZeros48;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //en qué posiciones se encuentran los números primos con mayor cantidad de dígitos pares
      
      //ALGORITHM FOR PRIME NUMBERS >:c
  let primes = [];
  let pos = [];
  
  for (let i = 0; i < filterOfZeros48.length; i++){
    let box = [];
    for (let numbers = 2; numbers <= filterOfZeros48[i]; numbers++) {
      const prime = filterOfZeros48[i]%numbers;
      if (prime == 0) {
        box.push(numbers);  
      };
    };
    if(box.length == 1){
      primes.push(filterOfZeros48[i]);
      pos.push(i);
    };
  };

  //FILTRADOR DE DÍGITOS (QUE CUMPLAN CON X CONDICIÓN) DE LOS NÚMEROS DE UN ARREGLO
  let mark = [];    //PUNTAJE
  let seeker = [];  //NÚMERO
  for (let i = 0; i < primes.length; i++){
    let tissue = 0;
    let count = 0;
    tissue = Array.from(String(primes[i]),Number);
    for (m = 0; m < tissue.length; m++){
      if (tissue[m]%2==0){
        count++;
      };
    };
    if (count!=0){ 
      mark.push(count);
      seeker.push(primes[i]);
    };
  };
  
  //AQUÍ OBTENEMOS EL ÍNDICE DE TODOS LOS NÚMEROS QUE CUMPLAN AL MÁXIMO EL REQUISITO
  let snitch = [];
  let great = Math.max(...mark); 
  for (let i = 0; i < mark.length; i++){
    if(mark[i] == great){
      snitch.push(filterOfZeros48.indexOf(seeker[i]));
    };
  };

  //GENERADOR DE MAPAS
  let fui = `<br>`;
  for (let i = 0; i < primes.length; i++){
    fui += `El ${primes[i]} en la posición ${pos[i]} <br>`
  };

  //par pares
  let fiu = (mark.length == 1)? `par`:`pares`;
  let fiuu = (mark.length == 1)? `DÍGITO PAR`:`DÍGITOS PARES`;

  //LOS NÚMEROS VICTORIOSOS
  let puta = [];
  for (let i = 0; i < snitch.length; i++){
    puta.push(seeker[snitch[i]]);
  };

  let wiin = (snitch.length == 1)? `Y el primo con más dígitos pares es... <br> El ${filterOfZeros48[snitch]} en la posición ${snitch} con ${great} ${fiu} c:<`:`Y los primos con más dígitos pares son: <br> ${puta} con ${great} pares`;
  let win = (snitch.length > 0)? wiin:`Lamentablemente... Ninguno de ellos tiene dígitos pares :c <br> F. Intenta con otra tanda de números, human@`;
  let alone = (mark.length == 0)? `Lamentablemente... Este primo no tiene dígitos pares :c F <br> ¡Intenta con otra tanda de números, human@!`:`Y ADIVINA QUÉ, TIENE ${mark} ${fiuu} :D`;
  let plural = (primes.length>1)? `hay ${primes.length} números primos: <br> ${fui} <br> ${win} <br> UwU`:`sólo hay un número primo: <br> el número ${filterOfZeros48[snitch]} en la posición n°${snitch} c: <br> ${alone}`;
  let no4 = (primes.length==0)? `En este vector no hay números primos :c Estamos es pero podridos... <br> ¡Prueba con otra tanda de números, human@!`:`En este vector, ${plural}`;
  let answer = no4;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd48 == 2){ 
      if (flash48==-1){
        arrow48[0].innerHTML = imgOff48;
        xd48 = 0;
        flash48=0;
      }
      else if (flash48==0){
        arrow48[1].innerHTML = imgOff48;
        arrow48[0].innerHTML = img;
        flash48=-1;
      }
      else{
        if (flash48<=8){
          arrow48[(flash48+1)].innerHTML = imgOff48;
        };
        arrow48[flash48].innerHTML = img;
        flash48--;
      }               
    }
    else if(xd48 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash48 = 9;
      arrow48[flash48].innerHTML = img;
      xd48 = 2;
      flash48--;
    }
    else{
      if (flash48==10){                       //VUELTA 2
        arrow48[(flash48-1)].innerHTML = imgOff48;
        xd48++;
        flash48 = 0;
      }
      else{                                 //VUELTA 1
        if (flash48>=1){
          arrow48[(flash48-1)].innerHTML = imgOff48;
        };
        arrow48[flash48].innerHTML = img;
        flash48++;
      }
    };
      getE("a48e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom48);
    [].forEach.call(arrow48,function(arrows){
      arrows.innerHTML = imgOff48; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow48[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    
    getE("a48e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros48.length == 10) {
    cancelButton48 = 1;
    freedom48 = setInterval(animation,250);
    justice48 = setTimeout(solution, 2000);
    love48 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros48.length == 0){
    flash48 = 0;
    clearInterval(freedom48);
    clearTimeout(justice48);
    clearTimeout(love48);
    getE("a48e").innerHTML = ``;
    [].forEach.call(arrow48,function(arrows){
      arrows.innerHTML = imgOff48; 
    });
  }
  else{
    getE("a48e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr48.addEventListener("keydown",arrayi48, false);
var iOfBox48 = 0; 
function arrayi48(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros48.length == 10 || filterOfZeros48.length == 0){
      buttona48.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros48.length == 9){
        buttona48.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona48.innerHTML = `GENERAR ${10-filterOfZeros48.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr48.value<0)? `-`:``;

  if (isNaN(inputArr48.value)){
    document.getElementById("a48").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr48.value == `` || inputArr48.value == '-' || inputArr48.value == '--' || inputArr48.value == '---' || inputArr48.value == '----'){
    document.getElementById("a48").innerHTML = ``;
  }
  else{
    if (inputArr48.value == 0){
      if (filterOfZeros48.length > 0){
        document.getElementById("a48").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a48").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a48").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr48.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr48.value)){
      inputArr48.value = ``;
    }else{
    if (inputArr48.value == `` || inputArr48.value == '-' || inputArr48.value == '--' || inputArr48.value == '---' || inputArr48.value == '----'){
      inputArr48.value = ``;
    }
    else if (inputArr48.value == 0){
      if(filterOfZeros48.length==0){
        inputArr48.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice48);
        clearInterval(freedom48);
        document.getElementById("a48b").innerHTML = ``;
        document.getElementById("a48c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a48c").innerHTML = ``;
        };
        box48.aux = [];
        filterOfZeros48.length = [];
        box48.equalize();
        solutiona48();
        inputArr48.value = ``;
        iOfBox48 = 0;

        clearInterval(freedom48);
        clearTimeout(justice48);
        clearTimeout(love48);
        getE("a48e").innerHTML = ``;
        [].forEach.call(arrow48,function(arrows){
          arrows.innerHTML = imgOff48; 
        });
      }
    }
    else{
      if (filterOfZeros48.length == 10){
        document.getElementById("a48c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box48.aux.shift();
        box48.aux.push(Number(inputArr48.value));
        box48.equalize();
        solutiona48();
        inputArr48.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a48c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox48 = 0; iOfBox48 < 10; iOfBox48++){
          if(box48.box[iOfBox48].textContent == ``){
            box48.box[iOfBox48].textContent = Number.parseInt(inputArr48.value);
            iOfBox48 = 10;
          };
        };
        solutiona48();
        inputArr48.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight48(){
  buttona48.style.border="3px solid #ffab40";
  buttona48.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona48.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight48(){
  buttona48.style.border='3px solid #f7b64e';
  buttona48.style.color='#333333';
  buttona48.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark48(){
  buttona48.style.border="3px solid #ffaa40";
  buttona48.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark48(){
  buttona48.style.border = '1px solid #ff9d00';
  buttona48.style.color = 'rgb(31, 11, 11)';
  buttona48.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array48(){
  //SOLUTION
  box48.method(-9999,10000);
  document.getElementById("a48c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona48.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona48();

  //OH, STYLO
  buttona48.onmouseover = function (){arrOnMouseOverLight48()};
  buttona48.onmouseout = function (){arrOnMouseOutLight48()};
  buttona48.onmousedown = function (){arrOnMouseOutDark48()};
  buttona48.onmouseup = function (){arrOnMouseOverDark48()};
}

// 49. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos números terminan en dígito primo.
var box49 = new get10Random("vector49");
var buttona49 = document.getElementById("arrayb49");
var inputArr49 = document.getElementById("arrayi49");
var freedom49;
var justice49;
var love49;
var flash49 = 0;
var xd49 = 0;
var cancelButton49 = 0;
var filterOfZeros49 = [];
var arrow49 = document.getElementsByClassName("arrow49");
var imgOff49 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd49 = document.querySelectorAll('div#a49d > div');
  [].forEach.call(dnd49,function(block){
    block.addEventListener('dragend',solutiona49);
  });

//solución al problema
function solutiona49(){
  if (cancelButton49==1){}
  else{
    
  function limitSolution(){
    cancelButton49 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow49,function(arrows){
    arrows.innerHTML = imgOff49; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector49 = [];
  for (let nums of box49.box){
      if (nums.textContent == 0){
        arrVector49.push(Number.parseInt(0));
      }
      else{
        arrVector49.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros49 = arrVector49.filter(x=>x!=0);
  box49.aux = filterOfZeros49;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES de números que terminan en dígito primo
  var seeker = filterOfZeros49.filter(x=>(Math.abs(x%10))==2 || (Math.abs(x%10))==3 || (Math.abs(x%10))==5 || (Math.abs(x%10))== 7);
  var snitch = [];

  for (let j=0; j<seeker.length; j++){
    for (let i=0; i<filterOfZeros49.length; i++){
      if(filterOfZeros49[i]==seeker[j]){
        snitch.push(i);
      };
    };
  };

  let fiu = `<br>`;
  for (let i = 0; i < seeker.length ; i++){
    fiu += `El número ${seeker[i]} en la posición n°${snitch[i]} <br>`;
  };

  var plural = (snitch.length>1)? `Hay ${snitch.length} números que terminan en un dígito primo: <br> ${fiu} uwu <br>`:`Sólo hay un número que termina en dígito primo: <br> el número ${seeker} y se halla en la posición n°${snitch} c:`;
  var no4 = (seeker.length==0)? `Ninguno de estos números termina en dígitos primos :c vaya suerte... <br> ¡Prueba con otra tanda de números, human@!`:`${plural}`;
  var answer = `Recuerda, human@, que los primos de 1 dígito solo son 2, 3, 5 y 7 c: <br> ${no4}`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd49 == 2){ 
      if (flash49==-1){
        arrow49[0].innerHTML = imgOff49;
        xd49 = 0;
        flash49=0;
      }
      else if (flash49==0){
        arrow49[1].innerHTML = imgOff49;
        arrow49[0].innerHTML = img;
        flash49=-1;
      }
      else{
        if (flash49<=8){
          arrow49[(flash49+1)].innerHTML = imgOff49;
        };
        arrow49[flash49].innerHTML = img;
        flash49--;
      }               
    }
    else if(xd49 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash49 = 9;
      arrow49[flash49].innerHTML = img;
      xd49 = 2;
      flash49--;
    }
    else{
      if (flash49==10){                       //VUELTA 2
        arrow49[(flash49-1)].innerHTML = imgOff49;
        xd49++;
        flash49 = 0;
      }
      else{                                 //VUELTA 1
        if (flash49>=1){
          arrow49[(flash49-1)].innerHTML = imgOff49;
        };
        arrow49[flash49].innerHTML = img;
        flash49++;
      }
    };
      getE("a49e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom49);
    [].forEach.call(arrow49,function(arrows){
      arrows.innerHTML = imgOff49; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow49[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    
    getE("a49e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros49.length == 10) {
    cancelButton49 = 1;
    freedom49 = setInterval(animation,250);
    justice49 = setTimeout(solution, 2000);
    love49 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros49.length == 0){
    flash49 = 0;
    clearInterval(freedom49);
    clearTimeout(justice49);
    clearTimeout(love49);
    getE("a49e").innerHTML = ``;
    [].forEach.call(arrow49,function(arrows){
      arrows.innerHTML = imgOff49; 
    });
  }
  else{
    getE("a49e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr49.addEventListener("keydown",arrayi49, false);
var iOfBox49 = 0; 
function arrayi49(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros49.length == 10 || filterOfZeros49.length == 0){
      buttona49.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros49.length == 9){
        buttona49.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona49.innerHTML = `GENERAR ${10-filterOfZeros49.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr49.value<0)? `-`:``;

  if (isNaN(inputArr49.value)){
    document.getElementById("a49").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr49.value == `` || inputArr49.value == '-' || inputArr49.value == '--' || inputArr49.value == '---' || inputArr49.value == '----'){
    document.getElementById("a49").innerHTML = ``;
  }
  else{
    if (inputArr49.value == 0){
      if (filterOfZeros49.length > 0){
        document.getElementById("a49").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a49").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a49").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr49.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr49.value)){
      inputArr49.value = ``;
    }else{
    if (inputArr49.value == `` || inputArr49.value == '-' || inputArr49.value == '--' || inputArr49.value == '---' || inputArr49.value == '----'){
      inputArr49.value = ``;
    }
    else if (inputArr49.value == 0){
      if(filterOfZeros49.length==0){
        inputArr49.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice49);
        clearInterval(freedom49);
        document.getElementById("a49b").innerHTML = ``;
        document.getElementById("a49c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a49c").innerHTML = ``;
        };
        box49.aux = [];
        filterOfZeros49.length = [];
        box49.equalize();
        solutiona49();
        inputArr49.value = ``;
        iOfBox49 = 0;

        clearInterval(freedom49);
        clearTimeout(justice49);
        clearTimeout(love49);
        getE("a49e").innerHTML = ``;
        [].forEach.call(arrow49,function(arrows){
          arrows.innerHTML = imgOff49; 
        });
      }
    }
    else{
      if (filterOfZeros49.length == 10){
        document.getElementById("a49c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box49.aux.shift();
        box49.aux.push(Number(inputArr49.value));
        box49.equalize();
        solutiona49();
        inputArr49.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a49c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox49 = 0; iOfBox49 < 10; iOfBox49++){
          if(box49.box[iOfBox49].textContent == ``){
            box49.box[iOfBox49].textContent = Number.parseInt(inputArr49.value);
            iOfBox49 = 10;
          };
        };
        solutiona49();
        inputArr49.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight49(){
  buttona49.style.border="3px solid #ffab22";
  buttona49.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona49.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight49(){
  buttona49.style.border='3px solid #f7b64e';
  buttona49.style.color='#333333';
  buttona49.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark49(){
  buttona49.style.border="3px solid #ffaa22";
  buttona49.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark49(){
  buttona49.style.border = '1px solid #ff9d00';
  buttona49.style.color = 'rgb(31, 11, 11)';
  buttona49.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array49(){
  //SOLUTION
  box49.method(-9999,10000);
  document.getElementById("a49c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona49.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona49();

  //OH, STYLO
  buttona49.onmouseover = function (){arrOnMouseOverLight49()};
  buttona49.onmouseout = function (){arrOnMouseOutLight49()};
  buttona49.onmousedown = function (){arrOnMouseOutDark49()};
  buttona49.onmouseup = function (){arrOnMouseOverDark49()};
}

// 50. Leer 10 números enteros, almacenarlos en un vector y determinar cuántos números de los almacenados en dicho vector comienzan en dígito primo.
var box50 = new get10Random("vector50");
var buttona50 = document.getElementById("arrayb50");
var inputArr50 = document.getElementById("arrayi50");
var freedom50;
var justice50;
var love50;
var flash50 = 0;
var xd50 = 0;
var cancelButton50 = 0;
var filterOfZeros50 = [];
var arrow50 = document.getElementsByClassName("arrow50");
var imgOff50 = `<img class="arrowImg" src="./arrowOff.png" alt="Aquí había una flecha... Ya no está xd">`;


  //DRAG AND DROP
  var dnd50 = document.querySelectorAll('div#a50d > div');
  [].forEach.call(dnd50,function(block){
    block.addEventListener('dragend',solutiona50);
  });

//solución al problema
function solutiona50(){
  if (cancelButton50==1){}
  else{
    
  function limitSolution(){
    cancelButton50 = 0;
  };
  //Variables locales elementales
  var imgOn   = '<img class="arrowImg" src="./arrowOn.png" alt="Aquí había una flecha... Ya no está xd">';
  var img = `<img class="arrowImg" src="./arrow.png" alt="Aquí había una flecha... Ya no está xd">`;
  //Un reinicio ligero al oprimir el vector
  [].forEach.call(arrow50,function(arrows){
    arrows.innerHTML = imgOff50; 
  });
  //EL CÓDIGO MÁGICO QUE PERMITE ACOPLAR FUNCIONALIDAD Y DRAG AND DROP
  var arrVector50 = [];
  for (let nums of box50.box){
      if (nums.textContent == 0){
        arrVector50.push(Number.parseInt(0));
      }
      else{
        arrVector50.push(Number.parseInt(nums.textContent));
      }
  };
  filterOfZeros50 = arrVector50.filter(x=>x!=0);
  box50.aux = filterOfZeros50;

  //ACÁ SOLUCIONAS TODO
  //Variables para solucionar la pregunta concreta
      //ÍNDICES de números que comienzan en dígito primo
  var seeker = [];
  for (let i = 0; i < filterOfZeros50.length; i++){
    let tissue = 0;
    tissue = Array.from(String(Math.abs(filterOfZeros50[i])),Number);
    if (tissue[0] == 2 || tissue[0] == 3 || tissue[0] == 5 || tissue[0] == 7){
      seeker.push(filterOfZeros50[i]);
    };
  };
  var snitch = [];

  for (let j=0; j<seeker.length; j++){
    for (let i=0; i<filterOfZeros50.length; i++){
      if(filterOfZeros50[i]==seeker[j]){
        snitch.push(i);
      };
    };
  };

  let fiu = `<br>`;
  for (let i = 0; i < seeker.length; i++){
    fiu += `El ${seeker[i]} en la posición ${snitch[i]} <br>`
  };
  let plural = (snitch.length>1)? `Hay ${snitch.length} números que comienzan por un dígito primo: <br> ${fiu} UwU <br>`:`Sólo hay un número que comienza por el 3: <br> el número ${seeker} y se halla en la posición n°${snitch} c:`;
  let no4 = (seeker.length==0)? `Ninguno de estos números comienza por dígito primo :c vaya suerte... <br> ¡Prueba con otra tanda de números, human@!`:plural;
  let answer =  `Recuerda, human@, que los primos de 1 dígito solo son 2, 3, 5 y 7 c: <br> ${no4}`;

  //"Animación" de las flechas
  function animation(){
    var card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();

    if(xd50 == 2){ 
      if (flash50==-1){
        arrow50[0].innerHTML = imgOff50;
        xd50 = 0;
        flash50=0;
      }
      else if (flash50==0){
        arrow50[1].innerHTML = imgOff50;
        arrow50[0].innerHTML = img;
        flash50=-1;
      }
      else{
        if (flash50<=8){
          arrow50[(flash50+1)].innerHTML = imgOff50;
        };
        arrow50[flash50].innerHTML = img;
        flash50--;
      }               
    }
    else if(xd50 == 1){             //¿A LAS CUÁNTAS VUELTAS QUIERES VOLTEAR?
      flash50 = 9;
      arrow50[flash50].innerHTML = img;
      xd50 = 2;
      flash50--;
    }
    else{
      if (flash50==10){                       //VUELTA 2
        arrow50[(flash50-1)].innerHTML = imgOff50;
        xd50++;
        flash50 = 0;
      }
      else{                                 //VUELTA 1
        if (flash50>=1){
          arrow50[(flash50-1)].innerHTML = imgOff50;
        };
        arrow50[flash50].innerHTML = img;
        flash50++;
      }
    };
      getE("a50e").innerHTML = `...`
  };  

  //SOLUCIÓN LÓGICA ESQUEMÁTICA DEL PROBLEMA 
  function solution(){
    clearInterval(freedom50);
    [].forEach.call(arrow50,function(arrows){
      arrows.innerHTML = imgOff50; 
    });

    for (let i=0; i<snitch.length; i++){
      let miau = snitch[i]; 
      arrow50[miau].innerHTML = imgOn;
    };

    win = new Audio();
    win.src = "music/win.mp3";
    win.play();
    card = new Audio();
    card.src = "music/arrows.mp3";
    card.play();
    
    getE("a50e").innerHTML = `${answer}`;
  }; 


  //Diálogos al vaciar
  if (filterOfZeros50.length == 10) {
    cancelButton50 = 1;
    freedom50 = setInterval(animation,250);
    justice50 = setTimeout(solution, 2000);
    love50 = setTimeout(limitSolution,3000);
  }
  else if (filterOfZeros50.length == 0){
    flash50 = 0;
    clearInterval(freedom50);
    clearTimeout(justice50);
    clearTimeout(love50);
    getE("a50e").innerHTML = ``;
    [].forEach.call(arrow50,function(arrows){
      arrows.innerHTML = imgOff50; 
    });
  }
  else{
    getE("a50e").innerHTML = `${answer} <br> Te invito a llenar todo el vector, humano, y mira lo que pasa -guiño guiño-`;
  };
};
};


//FUNCIONES PARA EL INPUT
inputArr50.addEventListener("keydown",arrayi50, false);
var iOfBox50 = 0; 
function arrayi50(e){
    //DIÁLOGOS PARA EL BOTÓN
    if (filterOfZeros50.length == 10 || filterOfZeros50.length == 0){
      buttona50.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
    }
    else{
      if (filterOfZeros50.length == 9){
        buttona50.innerHTML = `GENERAR 1 NÚMERO ALEATORIO`;
      }
      else{
        buttona50.innerHTML = `GENERAR ${10-filterOfZeros50.length} NÚMEROS ALEATORIOS`;
      }
    };
    //DIÁLOGOS PARA EL SPAN
  var ngt = (inputArr50.value<0)? `-`:``;

  if (isNaN(inputArr50.value)){
    document.getElementById("a50").innerHTML = `¿A quién intentas trollear con esos valores imposibles, humano?`;
  }else{
 
  if (inputArr50.value == `` || inputArr50.value == '-' || inputArr50.value == '--' || inputArr50.value == '---' || inputArr50.value == '----'){
    document.getElementById("a50").innerHTML = ``;
  }
  else{
    if (inputArr50.value == 0){
      if (filterOfZeros50.length > 0){
        document.getElementById("a50").innerHTML = `¿Quieres reiniciar el vector, humano? ¡Tírame ese cero entonces! c:<`;
      }
      else{
        document.getElementById("a50").innerHTML = `Oye, humano... Primero regístrame números con ENTER <br> antes de estar pensando en reiniciar el vector... ¿No? >:c`;
      }
    }
    else{
      document.getElementById("a50").innerHTML = `¡Cool, un ${ngt}${Math.abs(inputArr50.value)}! Regístralo oprimiendo ENTER c:`;
    }
  } 
  };
  //Ejecutar función cuando se oprima ENTER
  if (e.keyCode === 13){ 
    if (isNaN(inputArr50.value)){
      inputArr50.value = ``;
    }else{
    if (inputArr50.value == `` || inputArr50.value == '-' || inputArr50.value == '--' || inputArr50.value == '---' || inputArr50.value == '----'){
      inputArr50.value = ``;
    }
    else if (inputArr50.value == 0){
      if(filterOfZeros50.length==0){
        inputArr50.value = ``;
      }
      else{
        let zero = new Audio();
        zero.src = "music/hollow.mp3";
        zero.play();
        clearTimeout(justice50);
        clearInterval(freedom50);
        document.getElementById("a50b").innerHTML = ``;
        document.getElementById("a50c").innerHTML = `Vector reiniciado con éxito.`;
        setTimeout(fade,7000);
        function fade(){
          return document.getElementById("a50c").innerHTML = ``;
        };
        box50.aux = [];
        filterOfZeros50.length = [];
        box50.equalize();
        solutiona50();
        inputArr50.value = ``;
        iOfBox50 = 0;

        clearInterval(freedom50);
        clearTimeout(justice50);
        clearTimeout(love50);
        getE("a50e").innerHTML = ``;
        [].forEach.call(arrow50,function(arrows){
          arrows.innerHTML = imgOff50; 
        });
      }
    }
    else{
      if (filterOfZeros50.length == 10){
        document.getElementById("a50c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        box50.aux.shift();
        box50.aux.push(Number(inputArr50.value));
        box50.equalize();
        solutiona50();
        inputArr50.value = ``;
      }
      else{
        let introduce = new Audio("./music/introduce.mp3");
        introduce.play();
        document.getElementById("a50c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
        for(iOfBox50 = 0; iOfBox50 < 10; iOfBox50++){
          if(box50.box[iOfBox50].textContent == ``){
            box50.box[iOfBox50].textContent = Number.parseInt(inputArr50.value);
            iOfBox50 = 10;
          };
        };
        solutiona50();
        inputArr50.value = ``;
      }
    }
  };
}
} 

//FUNCIONES PARA EL BOTÓN
function arrOnMouseOverLight50(){
  buttona50.style.border="3px solid #ffab40";
  buttona50.style.background="linear-gradient(to bottom, #ffab23 5%, #ffec64 100%)";
  buttona50.style.color="rgb(31, 11, 11)";
};
function arrOnMouseOutLight50(){
  buttona50.style.border='3px solid #f7b64e';
  buttona50.style.color='#333333';
  buttona50.style.background='linear-gradient(to bottom, #fff186 5%, #f7b64e 100%)';
};

function arrOnMouseOverDark50(){
  buttona50.style.border="3px solid #ffaa40";
  buttona50.style.background="linear-gradient(to bottom, #ffe205 5%, #ffb71b 100%)";
};
function arrOnMouseOutDark50(){
  buttona50.style.border = '1px solid #ff9d00';
  buttona50.style.color = 'rgb(31, 11, 11)';
  buttona50.style.background = 'linear-gradient(to bottom, #ff9d00 5%, #ffe205 100%)';
};

function array50(){
  //SOLUTION
  box50.method(-9999,10000);
  document.getElementById("a50c").innerHTML = `Puedes registrar el número 0 para reiniciar el vector uwu`;
  buttona50.innerHTML = `GENERAR 10 NÚMEROS ALEATORIOS`;
  solutiona50();

  //OH, STYLO
  buttona50.onmouseover = function (){arrOnMouseOverLight50()};
  buttona50.onmouseout = function (){arrOnMouseOutLight50()};
  buttona50.onmousedown = function (){arrOnMouseOutDark50()};
  buttona50.onmouseup = function (){arrOnMouseOverDark50()};
}
//FINAL DE LA SECCIÓN ARREGLOS.

//SECCIÓN MATRIX
//DRAG AND DROP
var dragSrcE = null;
function handleDragStartM(e){
  this.style.opacity = '0.01';
  this.style.color = `blanchedalmond`;
  let ploop = new Audio("./music/drag.mp3");
  ploop.play();
  dragSrcE = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html',this.innerHTML);}
function handleDragOverM(e){
  if (e.preventDefault){e.preventDefault();}
  e.dataTransfer.dropEffect = 'move';
  return false;
}
function handleDragEnterM(e){this.classList.add('over');}
function handleDragLeaveM(e){this.classList.remove('over');}
function handleDropM(e){
  let droop = new Audio("./music/drop.mp3");
  droop.play();
  if(e.stopPropagation){e.stopPropagation();}
  if (dragSrcE != this){
    dragSrcE.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false; 
}
//swap to pos
function swapPos(){
  let win = new Audio('music/buttonUP.mp3');
  win.play();
  this.style.color = 'transparent';
  this.style.background = 'transparent';
  this.removeEventListener('contextmenu',swapPos);
  this.addEventListener('contextmenu',swapNum);
}
//swap to num
function swapNum(){
  let win = new Audio('music/win.mp3');
  win.play();
  this.style.color = 'blanchedalmond';
  if(this.style.fontWeight == 'bold'){
    this.style.background = `rgb(75, 41, 0)`;
  }
  else{
    this.style.background = 'black';
  }
  this.removeEventListener('contextmenu',swapNum);
  this.addEventListener('contextmenu',swapPos);
}
//retrieving hover effect
function overM(){
  if(this.style.color!=`transparent`){
    this.style.color = `white`;
  };
  let flash = new Audio();
  flash.src = 'music/flashes.mp3';
  flash.play();
}
function outM(){
  if(this.style.color!=`transparent`){
    this.style.color = `blanchedalmond`;
  };
}

class matrix {
  /*
  MATRIX 
    (matrix are placed into a x,2 grid called #matrixCradle) 
      you create a matrix in 3 steps:
    * step 1- Create a grid with defined rows and cols (thanks to parameters for exist) with the pos numbers
    * step 2- Generate random nums and introduce them into a grid overlaping the pos numbers grid - this takes place each dblclick
    * step 3- Add drag and drop & "swaping" functionalities
  */
  constructor (id,rows,cols) {

    // step 1: Pos numbers Grid
    this.numGrid = document.querySelector(`div#cuad${id}`)
    this.numGrid.style.gridTemplateColumns = `repeat(${cols},1fr)`
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const div = document.createElement('div')
        const pos = document.createTextNode(`${row},${col}`)
        div.appendChild(pos)
        this.numGrid.appendChild(div)
      }
    }

    // step 2: Matrix (and its dblclick event)
    let secondTime = 0; let matrixDivs; let morfeo
    this.matrix = document.querySelector(`div#m${id}`)
    this.matrix.addEventListener('dblclick', (e) => {
      this.matrix.style.gridTemplateColumns = `repeat(${cols}, 1fr)`
      const gen = new Audio('music/introduce.mp3')
      gen.play()
      switch (secondTime){
        case 0:
          secondTime = 1
          const em = document.querySelector(`div#m${id} > em`)
          this.matrix.removeChild(em)
          this.matrix.style.background = 'transparent'
          for (let i = 0; i < (rows * cols); i++) {
            const div = document.createElement('div')
            const rand = Math.round(Math.random()*(1000-(-999))+(-999))
            const num = document.createTextNode(rand)
            div.appendChild(num)
            this.matrix.appendChild(div)
          }
          break
        
        default:
          morfeo = document.querySelectorAll(`div#cuad${id} > div`)
          matrixDivs = document.querySelectorAll(`div#m${id} > div`)
          for (let i = 0; i < (rows * cols); i++) {
            const rand = Math.round(Math.random()*(1000-(-999))+(-999))
            matrixDivs[i].textContent = rand
            matrixDivs[i].style.color = `blanchedalmond`
            matrixDivs[i].style.background = `black`
            matrixDivs[i].style.fontWeight = 'normal'
            morfeo[i].style.background = 'black'
            morfeo[i].style.fontWeight = 'normal'
            morfeo[i].style.color = 'lightgray'
          }
          break
      }
    // step 3: functionalities: drag and drop and contextmenu-swap
    // DRAG AND DROP FOR MATRIX
      matrixDivs = document.querySelectorAll(`div#m${id} > div`)
      for (let i = 0; i < matrixDivs.length; i++){
        matrixDivs[i].setAttribute('data-id',`"${i}"`)
        matrixDivs[i].setAttribute('draggable',"true")
      }
      [].forEach.call(matrixDivs,function(matrix) {
        matrix.addEventListener('dragstart',handleDragStartM)
        matrix.addEventListener('dragover',handleDragOverM)
        matrix.addEventListener('dragenter',handleDragEnterM)
        matrix.addEventListener('dragleave',handleDragLeaveM)
        matrix.addEventListener('drop',handleDropM)
        matrix.addEventListener('dragend',handleDragEndM)
        matrix.addEventListener('contextmenu',swapPos)
        matrix.addEventListener('mouseover',overM)
        matrix.addEventListener('mouseout',outM)
      })
      function handleDragEndM(e) {
        this.style.opacity = '1'
        this.style.background = 'black'
        this.style.color = 'blanchedalmond';
        [].forEach.call(matrixDivs,function(matrix) {
          matrix.classList.remove('over')
          matrix.addEventListener('contextmenu',swapPos)
          matrix.addEventListener('mouseover',overM)
          matrix.addEventListener('mouseout',outM)
        })
      } // END OF MATRIX.
    // ATTRIBUTES AND METHODS TO SOLVE ANY EXERCISE
      //This method bring us the matrix's numbers
      this.renove = function (){
      this.nums = []
        matrixDivs = document.querySelectorAll(`div#m${id} > div`)
        for (let i = 0;  i < matrixDivs.length; i++) {
          this.nums.push(Number(matrixDivs[i].textContent))
        }
      }
      this.renove()
    })  // end of event.
    // This method will "light" the asked numbers in the matrix
    morfeo = document.querySelectorAll(`div#cuad${id} > div`)
    matrixDivs = document.querySelectorAll(`div#m${id} > div`)
    this.solution = (i) => {
      for (let j = 0; j < ( rows * cols ); j++) {
        morfeo[j].style.color = 'lightgray'
        morfeo[j].style.background = 'black'
        morfeo[j].style.fontWeight = 'normal'
        matrixDivs[j].style.background = `black`
        matrixDivs[j].style.fontWeight = `normal`
        matrixDivs[j].style.color = `blanchedalmond`
      }
      for (let j = 0; j < i.length; j++) {
        morfeo[i[j]].style.background = 'rgb(75, 41, 0)'
        morfeo[i[j]].style.fontWeight = 'bold'
        morfeo[i[j]].style.color = 'whitesmoke'
        matrixDivs[i[j]].style.background = `rgb(75, 41, 0) `
        matrixDivs[i[j]].style.fontWeight = 'bold'
        matrixDivs[i[j]].style.color = 'blanchedalmond'
      }
    } // END OF EXERCISES' SOLUTIONS     
  } // end of constructor. 
} // end of class.

//const smithxx   : an array with all the numbers of the matrix 
//const neoxx     : an array with the index of the chosen numbers
//const morfeoxx  : an array of the divs to add solution to dnd
//here's a little function that would help us a lot to write less code
function selectAll(selector){
  return document.querySelectorAll(selector)
}
//START SOLVING THE MATRIX SECTION

// 1. Leer una matriz 4x4 entera y determinar en qué fila y en qué columna se encuentra el número mayor.<br><br>
const matrix01 = new matrix('01',4,4)
function solveM01(e){
  matrix01.renove()
  const smith01 = matrix01.nums
  const neo01 = []
  //PUT HERE THE SOLUTION TO THE SPECIFIC PROBLEM
  for ( let i = 0; i < smith01.length; i++ ) {
    if ( Math.max(...smith01) == smith01[i] ) {
      neo01.push(i)
    }
  }
  //end of the solution of the problem.
  matrix01.solution(neo01)
}
getE('m01').addEventListener('dblclick', solveM01) 
getE('m01').addEventListener('dblclick',function(){ 
  const morfeo01 = selectAll('div#m01 > div');
  [].forEach.call(morfeo01, function(matrix) {
    matrix.addEventListener('dragend', solveM01)
    })
  })

// 2. Leer una matriz 4x4 entera y determinar cuántas veces se repita en ella el número mayor.<br><br>
const matrix02 = new matrix('02',4,4)
function solveM02(e){
  matrix02.renove()
  const smith02 = matrix02.nums
  const neo02 = []
  //PUT HERE THE SOLUTION TO THE SPECIFIC PROBLEM
  for ( let i = 0; i < smith02.length; i++ ) {
    if ( Math.max(...smith02) == smith02[i] ) {
      neo02.push(i)
    }
  }
  //end of the solution of the problem.
  matrix02.solution(neo02)
}
getE('m02').addEventListener('dblclick', solveM02) 
getE('m02').addEventListener('dblclick',function(){ 
  const morfeo02 = selectAll('div#m02 > div');
  [].forEach.call(morfeo02, function(matrix) {
    matrix.addEventListener('dragend', solveM02)
    })
  })

// 3. Leer una matriz 3x4 entera y determinar en qué posiciones exactas se encuentran los números pares.<br><br>


// 4. Leer una matriz 4x3 entera y determinar en qué posiciones exactas se encuentran los números primos.<br><br>


// 5. Leer una matriz 4x3 entera, calcular la suma de los elementos de cada fila y determinar cuál es la fila que tiene la mayor suma.<br><br>


// 6. Leer una matriz 4x4 entera y calcular el promedio de los números mayores de cada fila.<br><br>


// 7. Leer una matriz 4x4 entera y determinar en qué posiciones están los enteros terminados en 0.<br><br>


// 8. Leer una matriz 4x4 entera y determinar cuántos enteros terminados en 0 hay almacenados en ella.<br><br>


// 9. Leer una matriz 3x4 entera y determinar cuántos de los números almacenados son primos y terminan en 3.<br><br>


// 10. Leer una matriz 5x3 entera y determinar en qué fila está el mayor número primo.<br><br>

