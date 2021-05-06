// By Samuel B.
/* -------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------X swiper X------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------------- */

var swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 20,
  effect: 'fade',
  loop: false,
  speed: 300,
  mousewheel: {
    invert: false,
  },
  pagination: {
    el: '.swiper-pagination',	
    clickable: true,
    dynamicBullets: false,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});


/* -------------------------------------------------------------------------------------------------------------- */
/* -----------------------------------------X data X------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------------- */
var credits = [
  {
    sprecher: [
      {
        name: "Max Musterman",
        en: "${credits[0].sprecher[0].en} , ${credits[0].sprecher[0].de}",
      },
      {
        name: "Max Musterman",
        de: 0
      }
    ],
    autoren: "Max Musterman, Max Musterman, Max Musterman, Max Musterman, Max Musterman, Max Musterman",
    uebersetzer: "Max Musterman, Max Musterman",
    ersteller: "Samuel"
  }
]

var listAudio = [
  {
    name: "Artist 1 - audio 1",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    duration: 0,
    thema:
      [
        {
          title: "Postcards From Italy",
          image: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2600&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore<br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
          time: 00,
        },
        {
          title: "Bunker",
          image: "https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          time: 00,
        },
        {
          title: "Small Mountain",
          image: "https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          time: 00,
        },
        {
          title: "Walking On a Dream",
          image: "https://images.unsplash.com/photo-1564604761388-83eafc96f668?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=801.2.1&auto=format&fit=crop&w=2167&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          time: 00,
        },
      ],
  },
  {
    name: "Artist 2 - audio 2",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: 0,
    thema: 
      [
        {
          title: "Postcards From Italy",
          image: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2600&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore<br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
          time: 0,
        },
        {
          title: "Bunker",
          image: "https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          time: 100,
        },
        {
          title: "Small Mountain",
          image: "https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          time: 200,
        },
        {
          title: "Walking On a Dream",
          image: "https://images.unsplash.com/photo-1564604761388-83eafc96f668?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=801.2.1&auto=format&fit=crop&w=2167&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          time: 300,
        },
      ],
  },
  {
    name: "Artist 3 - audio 3",
    file: "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_1MG.mp3",
    duration: 0,
    thema: 
      [
        {
          title: "Postcards From Italy",
          image: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2600&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore<br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
          time: 0,
        },
        {
          title: "Bunker",
          image: "https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          time: 0,
        },
        {
          title: "Small Mountain",
          image: "https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          time: 0,
        },
        {
          title: "Walking On a Dream",
          image: "https://images.unsplash.com/photo-1564604761388-83eafc96f668?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=801.2.1&auto=format&fit=crop&w=2167&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          time: 0,
        },
      ],
  },
  {
    name:"<b>1</b> Kirchturm",
    file:"audiofiles\\The-Human-Era.mp3",
    duration: 0,
    thema: 
      [
        {
          title: "Postcards From Italy",
          image: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2600&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore<br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
          time: 0,
        },
        {
          title: "Bunker",
          image: "https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          time: 0,
        },
        {
          title: "Small Mountain",
          image: "https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          time: 0,
        },
        {
          title: "Walking On a Dream",
          image: "https://images.unsplash.com/photo-1564604761388-83eafc96f668?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=801.2.1&auto=format&fit=crop&w=2167&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          time: 0,
        },
      ],
  },
  {
    name:"<b>2</b> Orgel",
    file:"audiofiles\\The-Human-Era.mp3",
    duration: 0,
    thema: 
      [
        {
          title: "Postcards From Italy",
          image: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2600&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore<br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
          time: 0,
        },
        {
          title: "Bunker",
          image: "https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          time: 0,
        },
        {
          title: "Small Mountain",
          image: "https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          time: 0,
        },
        {
          title: "Walking On a Dream",
          image: "https://images.unsplash.com/photo-1564604761388-83eafc96f668?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=801.2.1&auto=format&fit=crop&w=2167&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          time: 0,
        },
      ],
  },
  {
    name:"Blinding Lights",
    file:"http://physical-authority.surge.sh/music/2.mp3",
    duration: 0,
    thema: 
      [
        {
          title: "Postcards From Italy",
          image: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2600&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore<br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
          time: 0,
        },
        {
          title: "Bunker",
          image: "https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          time: 0,
        },
        {
          title: "Small Mountain",
          image: "https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          time: 0,
        },
        {
          title: "Walking On a Dream",
          image: "https://images.unsplash.com/photo-1564604761388-83eafc96f668?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=801.2.1&auto=format&fit=crop&w=2167&q=80",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          time: 0,
        },
      ],
  },
  {
    name:"<b>4</b> Chorraum",
    file:"https://raw.githubusercontent.com/xLerida/synth/master/drums-kick.mp3",
    duration: 0,
    thema: 
    [
      {
        title: "Postcards From Italy",
        image: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2600&q=80",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore<br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
        time: 0,
      },
      {
        title: "Bunker",
        image: "https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
        time: 0,
      },
      {
        title: "Small Mountain",
        image: "https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
        time: 0,
      },
      {
        title: "Walking On a Dream",
        image: "https://images.unsplash.com/photo-1564604761388-83eafc96f668?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=801.2.1&auto=format&fit=crop&w=2167&q=80",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
        time: 0,
      },
    ],
  },
]


/* -------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------X Player / Playlist X----------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------------- */


// as long as it is not complete modular and user frendly
function getDuration(index) {
  var audio = new Audio();
  audio.src = listAudio[index].file;
  audio.addEventListener("loadedmetadata", function(){
      listAudio[index].duration = audio.duration;
  });
}


function createTrackItem(index,name,duration)
{
  var trackItem = document.createElement('div');
  trackItem.setAttribute("class", "playlist-track-ctn");
  trackItem.setAttribute("id", "ptc-"+index);
  trackItem.setAttribute("data-index", index);
  document.querySelector(".playlist-ctn").appendChild(trackItem);

  var playBtnItem = document.createElement('button');
  playBtnItem.setAttribute("class", "playlist-btn-play");
  playBtnItem.setAttribute("id", "pbp-"+index);
  playBtnItem.setAttribute("aria-label", index + "-audio-toggle");
  document.querySelector("#ptc-"+index).appendChild(playBtnItem);

  var btnImg = document.createElement('i');
  btnImg.setAttribute("class", "fas fa-play");
  btnImg.setAttribute("height", "40px");
  btnImg.setAttribute("width", "40px");
  btnImg.setAttribute("id", "p-img-"+index);
  btnImg.setAttribute("data-index", index);
  document.querySelector("#pbp-"+index).appendChild(btnImg);

  var trackInfoItem = document.createElement('div');
  trackInfoItem.setAttribute("class", "playlist-info-track");
  trackInfoItem.innerHTML = name;
  document.querySelector("#ptc-"+index).appendChild(trackInfoItem);

  var trackDurationItem = document.createElement('div');
  trackDurationItem.setAttribute("class", "playlist-duration");
  trackDurationItem.innerHTML = duration;
  document.querySelector("#ptc-"+index).appendChild(trackDurationItem);
}


for (var i = 0; i < listAudio.length; i++) {
  createTrackItem(i,listAudio[i].name,listAudio[i].duration);
}

// As long as not modular and user frendly
for (var i = 0; i < listAudio.length; i++) {
  getDuration(i);
  setTimeout(() => {
    for (var i = 0; i < listAudio.length; i++) {
      document.getElementsByClassName("playlist-duration")[i].innerHTML = getMinutes(listAudio[i].duration);
    }
  }, 500);
}

var indexAudio = 0;

function loadNewTrack(index){
  var player = document.querySelector('#source-audio');
  player.src = listAudio[index].file;
  document.querySelector('.title').innerHTML = listAudio[index].name;
  this.currentAudio = document.getElementById("myAudio");
  this.currentAudio.load();
  this.toggleAudio();
  this.updateStylePlaylist(this.indexAudio,index);
  this.indexAudio = index;
  UpdateInfo(indexAudio);
}

var playListItems = document.querySelectorAll(".playlist-track-ctn");

for (let i = 0; i < playListItems.length; i++){
  playListItems[i].addEventListener("click", getClickedElement.bind(this));
}


function getClickedElement(event) {
  for (let i = 0; i < playListItems.length; i++) {
    if(playListItems[i] == event.target || playListItems[i].firstChild.firstChild == event.target){
      var clickedIndex = event.target.getAttribute("data-index");
      if (clickedIndex == this.indexAudio ) { // alert('Same audio');
        this.toggleAudio();
      }else{
        loadNewTrack(clickedIndex);
      }
      if(event.target.nodeName == "DIV") {
        toggleExpand();
      }
    }
  }
}

document.querySelector('#source-audio').src = listAudio[indexAudio].file;
document.querySelector('.title').innerHTML = listAudio[indexAudio].name;

 //loadNewTrack(indexAudio);

var currentAudio = document.getElementById("myAudio");

currentAudio.load();
UpdateInfo(indexAudio);

currentAudio.onloadedmetadata = function() {
  document.getElementsByClassName('duration')[0].innerHTML = this.getMinutes(this.currentAudio.duration);
}.bind(this);


function toggleAudio() {
  fn10 = false;
  if (this.currentAudio.paused) {
    document.querySelector('#icon-play').style.display = 'none';
    document.querySelector('#icon-pause').style.display = 'block';
    document.querySelector('#ptc-'+this.indexAudio).classList.add("active-track");
    this.playToPause(this.indexAudio);
    this.currentAudio.play();
  }else{
    document.querySelector('#icon-play').style.display = 'block';
    document.querySelector('#icon-pause').style.display = 'none';
    this.pauseToPlay(this.indexAudio);
    this.currentAudio.pause();
  }
}

function pauseAudio() {
  this.currentAudio.pause();
}

var timer = document.getElementsByClassName('timer')[0];


var width = 0;

function onTimeUpdate() {
  var t = this.currentAudio.currentTime;
  timer.innerHTML = this.getMinutes(t);
  this.setBarProgress();
  UpdateProgressBar();
  if (this.currentAudio.ended) {
    document.querySelector('#icon-play').style.display = 'block';
    document.querySelector('#icon-pause').style.display = 'none';
    this.pauseToPlay(this.indexAudio)
    if (this.indexAudio < listAudio.length-1) {
        var index = parseInt(this.indexAudio)+1
        this.loadNewTrack(index)
        ClearInfo();
    }
  }
}

var sliderfocus = false;
var slider = document.getElementById("slider");
function setBarProgress(){
  var progress = (this.currentAudio.currentTime/this.currentAudio.duration)*100;
  if(isNaN(progress)) {
    progress = 0;
  }
  if(!sliderfocus) {
    slider.value = progress;
  }
}


function getMinutes(t){
  var min = parseInt(parseInt(t)/60);
  var sec = parseInt(t%60);
  if (sec < 10) {
    sec = "0"+sec
  }
  if (min < 10) {
    min = "0"+min
  }
  return min+":"+sec
}


/* -------------------------------------------------------------------------------------------------------------- */
/* --------------------------------------X Player Buttons X------------------------------------------------------ */
/* -------------------------------------------------------------------------------------------------------------- */


function forward(){
  this.currentAudio.currentTime = this.currentAudio.currentTime + 5
  this.setBarProgress();
}

function rewind(){
  this.currentAudio.currentTime = this.currentAudio.currentTime - 5
  this.setBarProgress();
}


function next(){
  if (this.indexAudio <listAudio.length-1) {
      var oldIndex = this.indexAudio
      this.indexAudio++;
      updateStylePlaylist(oldIndex,this.indexAudio)
      this.loadNewTrack(this.indexAudio);
  }
}

function previous(){
  if (this.indexAudio>0) {
      var oldIndex = this.indexAudio
      this.indexAudio--;
      updateStylePlaylist(oldIndex,this.indexAudio)
      this.loadNewTrack(this.indexAudio);
  }
}

function updateStylePlaylist(oldIndex,newIndex){
  document.querySelector('#ptc-'+oldIndex).classList.remove("active-track");
  this.pauseToPlay(oldIndex);
  document.querySelector('#ptc-'+newIndex).classList.add("active-track");
  this.playToPause(newIndex)
}

function playToPause(index){
  var ele = document.querySelector('#p-img-'+index)
  ele.classList.remove("fa-play");
  ele.classList.add("fa-pause");
}

function pauseToPlay(index){
  var ele = document.querySelector('#p-img-'+index)
  ele.classList.remove("fa-pause");
  ele.classList.add("fa-play");
}


function toggleMute(){
  var btnMute = document.querySelector('#toggleMute');
  var volUp = document.querySelector('#icon-vol-up');
  var volMute = document.querySelector('#icon-vol-mute');
  if (this.currentAudio.muted == false) {
      this.currentAudio.muted = true
      volUp.style.display = "none"
      volMute.style.display = "block"
  }else{
    this.currentAudio.muted = false
    volMute.style.display = "none"
    volUp.style.display = "block"
  }
}



/* -------------------------------------------------------------------------------------------------------------- */
/* ----------------------------X Slider Hover Tip Box / Slider X------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------------- */



var slider = document.getElementById("slider");
var slidertitle = document.getElementById("slidertitle");

var sliderOffsetX = slider.getBoundingClientRect().left - document.documentElement.getBoundingClientRect().left;
//var sliderOffsetY = slider.getBoundingClientRect().top - document.documentElement.getBoundingClientRect().top;

var sliderWidth = slider.offsetWidth - 1;

window.addEventListener('resize', TooltipSliderResize);
function TooltipSliderResize() {
  sliderOffsetX = slider.getBoundingClientRect().left - document.documentElement.getBoundingClientRect().left;
  //sliderOffsetY = slider.getBoundingClientRect().top - document.documentElement.getBoundingClientRect().top;
  sliderWidth = slider.offsetWidth - 1;
}

var valueHover = 0;
slider.addEventListener('mousemove', function(event) {
  sliderPostion(event, false);
});

slider.addEventListener('touchmove', function(event) {
  slidertitle.style.display = "block";
  sliderPostion(event, true);
});

function sliderPostion(event, mobile) {
  if(!mobile) {
    valueHover = calcSliderPos(event).toFixed(2);
    var currentMouseXPos = (event.clientX + window.pageXOffset) - sliderOffsetX;
  } else {
    valueHover = slider.value;
    var currentMouseXPos = slider.value * 5;
  }

  var sliderValAtPos = Math.round(currentMouseXPos / sliderWidth * 100 + 1);
  // this...
  if(sliderValAtPos < 0) sliderValAtPos = 0;
  // ... and this are to make it easier to hover on the "0" and "100" positions
  if(sliderValAtPos > 100) sliderValAtPos = 100;

  if(100 >= valueHover && valueHover >= 0) {
    slidertitle.style.transition = "none";
    // slidertitle.innerHTML = sliderValAtPos;
    slidertitle.innerHTML = getMinutes(currentAudio.duration * (valueHover /100)); /* Rundungsfehler?? ne wegen valueHover*/
    //slidertitle.style.top = sliderOffsetY - 15 + 'px';
    slidertitle.style.left = currentMouseXPos + sliderOffsetX - 5 + 'px';
  }
  // Moves Tooltip, so it is not half out of screen on  0 and 100
  if(97 <= valueHover) {
    slidertitle.style.left = currentMouseXPos + sliderOffsetX - 28 + 'px';
    slidertitle.style.transition = "left 0.15s ease-out";
  }
  if(valueHover <= 1) {
    slidertitle.style.left = currentMouseXPos + sliderOffsetX + 20 + 'px';
    slidertitle.style.transition = "left 0.15s ease-out";
  }
  UpdateProgressBar();
}

function calcSliderPos(e) {
  return (e.offsetX / e.target.clientWidth) *  parseInt(e.target.getAttribute('max'),10);
}

//attach to slider and fire on mousemove
// document.getElementById('slider').addEventListener('mousemove', function(e) {
//     valueHover = calcSliderPos(e).toFixed(2);
//     // slidertitle.innerHTML = valueHover;
//     slidertitle.innerHTML = getMinutes(currentAudio.duration * valueHover /100); /* Rundungsfehler*/
// });
document.getElementById('slider').addEventListener('mouseup', function(e) {
  Progressbar(e);
});

document.getElementById('slider').addEventListener('touchend', function(e) {
  Progressbar(e);
  slidertitle.style.display = "none";
});

function Progressbar(e) {
  //valueHover = calcSliderPos(e).toFixed(2);
  sliderfocus = false;
  currentAudio.currentTime = slider.value/100 * currentAudio.duration;
  setBarProgress();
  UpdateProgressBar();
  document.activeElement.blur();
  //valueHover= valueHover>100?100:valueHover;
  //valueHover= valueHover<0?0:valueHover;
  //console.log(valueHover);
}

// document.getElementById('slider').onfocus = () => {
//   sliderfocus = true;
//   console.log(sliderfocus);
// };
document.getElementById('slider').onchange = () => {
  sliderfocus = true;
  //console.log(sliderfocus);
  // var valueSeeked = e.target.value;
  // console.log(valueSeeked);
  // console.log(valueSeeked === valueHover);
};

function UpdateProgressBar()  {
  var min = slider.min;
  var max = slider.max;
  var val = slider.value;
  
  slider.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}



/* -------------------------------------------------------------------------------------------------------------- */
/* ----------------------------X Body initialise / functionality X----------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------------- */


var showplaylist = true;
function toggleExpand(){
  var carpetup = document.querySelector('#icon-caret-up');
  var carpetdown = document.querySelector('#icon-caret-down');
  var trackinfo = document.getElementById("trackinfo");
  var playlist = document.getElementById("playlist");
  if (showplaylist == false) {
      showplaylist = true;
      trackinfo.style.display = "none";
      playlist.style.display = "block";
      carpetup.style.display = "none";
      carpetdown.style.display = "block";
  }else{
    showplaylist = false;
    trackinfo.style.display = "block";
    playlist.style.display = "none";
    carpetdown.style.display = "none";
    carpetup.style.display = "block";
    swiper.update();
  }
}

function UpdateInfo(index) {
  ClearInfo();
  createThema(index);
  swiper.update();
}

function ClearInfo() {
  swiper.removeAllSlides();
}

function createThema(index) {
  for (var i = 0; i < listAudio[index].thema.length; i++) {
    swiper.appendSlide(`
    <div class="slider-item swiper-slide" id="slideitem-${i}">
    <div class="slider-image-wrapper">
        <img class="slider-image" height="100%" width="100%" src="${listAudio[index].thema[i].image}" alt="SliderImg">
        </div>
    <div class="slider-item-content">
        <h1 class="slide h1">${listAudio[index].thema[i].title}</h1>
        <p class="swiper-p">${listAudio[index].thema[i].text}</p>
        <button aria-label="audio-jump" class="toaudio" onclick="JumpToAudio(${i})">Zur Audio</button>
    </div>
    </div>
    `);
  }
}

function JumpToAudio(slideindex) {
  //console.log("Jump to " + listAudio[indexAudio].thema[slideindex].time + " ; slide id: " +  slideindex)
  this.currentAudio.currentTime = listAudio[indexAudio].thema[slideindex].time;
  this.setBarProgress();
}


/* -------------------------------------------------------------------------------------------------------------- */
/* --------------------------------------X Dropdown X------------------------------------------------------------ */
/* -------------------------------------------------------------------------------------------------------------- */

var overlay = document.getElementById('overlay');
overlay.addEventListener("click", function(event) {
  hidedropmenu();
  showmodal = false;
  modal.style.display = "none";
  overlay.style.display = "none";
});

var dropdowncontent = document.getElementsByClassName('dropdown-content')[0];
var showdropdown = false;

function showdropmenu() {
  showdropdown = true;
  dropdowncontent.style.display = "block";
  overlay.style.display = "block";
}

function hidedropmenu() {
  dropdowncontent.style.display = "none";
  showdropdown = false;
}

var darkmodetoggle = document.getElementById('darkmodetoggle');
darktoggle.onchange = function(){
 darktoggle();
};

function darktoggle() {
  if(darkmodetoggle.value == "dark") {
    darkmodetoggle.value = "light";
    darkmodetoggle.checked = false;
    document.getElementById("css").href = "stylelight.css";
    // change to light mode (css)
  }
  else {
    darkmodetoggle.value = "dark";
    darkmodetoggle.checked = true;
    document.getElementById("css").href = "style.css";
    // change to dark mode (css)
  }
} 

function loadlang()
{
  var lng = document.getElementById("langselector").value;
  switch (lng)
  {
  case "en":
    window.location.href = "http://localhost:5500/sites/indexen.html";
  case "de":
    window.location.href = "http://localhost:5500/sites/index.html";
  break;
  }
}

function showAutoren() {
  setTimeout(() => {
    hidedropmenu();
  }, 1); 
  createModalAutoren();
  // alert("Diese Funktion ist momentan nicht verfügbar.");
}

function showImpressum() {
  setTimeout(() => {
    hidedropmenu();
  }, 1); 
  createModalInformationen();
}

/* -------------------------------------------------------------------------------------------------------------- */
/* -----------------------------------------X Modal X------------------------------------------------------------ */
/* -------------------------------------------------------------------------------------------------------------- */

var showmodal = false;
var modal = document.getElementById('modal');

function showModal() {
  showmodal = true;
  modal.style.display = "block";
  overlay.style.display = "block";
}

function createModalAutoren() {
  showModal();
  var sprecherout = "";
  for (let index = 0; index < credits[0].sprecher.length; index++) {
    sprecherout += credits[0].sprecher[index].name + " , ";
  }
  if(sprecherout[sprecherout.length -1] == " ") {
    sprecherout = sprecherout.slice(0, -3);
  }

  modal.innerHTML = `
  <h1>Sprecher</h1>
  <p>${sprecherout}</p>
  <h1>Übersetzer</h1>
  <p>${credits[0].uebersetzer}</p>
  <h1>Autoren</h1>
  <p>${credits[0].autoren}</p>
  <h1>Erstellt von</h1>
  <p>${credits[0].ersteller}</p>
  `;
}

function createModalInformationen() {
  showModal();
  modal.innerHTML = `
  <h1>Informationen</h1>
  <p>Social media</p>
  <button class="btn-modal" aria-label="dropdown-toggle">Twitter</button>
  <button class="btn-modal" aria-label="dropdown-toggle">Instagram</button>
  <button class="btn-modal" aria-label="dropdown-toggle">YouTube</button>
  <p>Rechtliches</p>
  <button class="btn-modal" aria-label="dropdown-toggle">Impressum</button>
  <button class="btn-modal" aria-label="dropdown-toggle">Datenschutz</button>
  `;
}


/* -------------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------X accessibility X-------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------------- */

// Let the document know when the mouse is being used
document.body.addEventListener('mousedown', function() {
  document.body.classList.add('using-mouse');
});

// Re-enable focus styling when Tab is pressed
document.body.addEventListener('keydown', function(event) {
  if (event.keyCode === 9) {
    document.body.classList.remove('using-mouse');
  }
});

// Alternatively, re-enable focus styling when any key is pressed
//document.body.addEventListener('keydown', function() {
//  document.body.classList.remove('using-mouse');
//});


document.addEventListener('keydown', function(event) {
  if(event.keyCode == 37) { //LeftArrow
    //rewind();
  }
  else if(event.keyCode == 39) { //RightArrow
    //forward();
  }
  else if(event.keyCode == 32) { //Space
    toggleAudio();
  }
  else if(event.keyCode == 77) { //Key M
    toggleMute();
  }
  else if(event.keyCode == 27) { //Esc
    toggleExpand();
    // alert('ESC was pressed');
  }
  else if(event.keyCode == 74 || event.keyCode == 176) { //Key J & fn+f12
    next();
  }
  else if(event.keyCode == 75 || event.keyCode == 177) { //Key K & fn+f11
    previous();
  }
  else if(event.keyCode == 179 ) { //Key fn+f9
    if(!fn10) {
      UpdatePlayIcon();
    }
    // if(currentAudio.paused){toggleAudio();}
  }
  else if(event.keyCode == 178) { //Key fn+f10
    fn10 = true;
    document.querySelector('#icon-play').style.display = 'block';
    document.querySelector('#icon-pause').style.display = 'none';
    pauseToPlay(indexAudio);
  }
});
var fn10 = false;
function UpdatePlayIcon() {
  if (currentAudio.paused) {
    document.querySelector('#icon-play').style.display = 'none';
    document.querySelector('#icon-pause').style.display = 'block';
    document.querySelector('#ptc-'+indexAudio).classList.add("active-track");
    playToPause(indexAudio);
  }else{
    document.querySelector('#icon-play').style.display = 'block';
    document.querySelector('#icon-pause').style.display = 'none';
    pauseToPlay(indexAudio);
  }
}



// ##############################################################################
// etc


document.getElementById('btn_test').onclick = () => {
  console.log(currentAudio.duration);
  console.log(getMinutes(currentAudio.duration));
  console.log("audioindex: " + indexAudio);
  //console.log("sliderfocus: " + sliderfocus);
  //console.log("dropdown: " + showdropdown);
  // swiper.slideTo(2, 300, true);
  for (var i = 0; i < listAudio.length; i++) {
    console.log(listAudio[i].duration);
    document.getElementsByClassName("playlist-duration")[i].innerHTML = listAudio[i].duration;
  }
};