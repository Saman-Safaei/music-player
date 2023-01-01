const audioApi = new Audio('/assets/music/callisto.mp3')

const pauseIconPath = '/assets/svg/pause.svg'
const playIconPath = '/assets/svg/play.svg'

const allMusics = document.getElementsByClassName('musics-list__item')
const playpauseButton = document.getElementById('playpauseBtn')
const playpauseIcon = playpauseButton.querySelector('img')
const forwardButton = document.getElementById('forwardBtn')
const backwardButton = document.getElementById('backwardBtn')
const discImg = document.getElementById('disc')
const playedBarElem = document.getElementById('playedBar')
const musicTitle = document.getElementById('musicTitle')

function togglePlay() {
  if (!audioApi.paused) {
    audioApi.pause()
    playpauseIcon.src = playIconPath
    discImg.style.animationPlayState = 'paused'
  } else {
    audioApi.play()
    playpauseIcon.src = pauseIconPath
    discImg.style.animationPlayState = 'running'
  }
}
function timeplayUpdated() {
  playedBarElem.style.width = `${
    (audioApi.currentTime / audioApi.duration) * 100
  }%`
}
function forwardMusic() {
  if (audioApi.currentTime + 5 < audioApi.duration) {
    audioApi.currentTime += 5
  }
}
function backwardMusic() {
  if (audioApi.currentTime - 5 > 0) {
    audioApi.currentTime -= 5
  } else {
    audioApi.currentTime = 0
  }
}
function musicEnded() {
  playedBarElem.style.width = '0px'
  playpauseIcon.src = playIconPath
  audioApi.currentTime = 0
  discImg.style.animationPlayState = 'paused'
}

audioApi.addEventListener('timeupdate', timeplayUpdated)
audioApi.addEventListener('ended', musicEnded)
playpauseButton.addEventListener('click', togglePlay)
forwardButton.addEventListener('click', forwardMusic)

//#region multi music
const musicList = [
  {
    title: 'The Callisto Protocol',
    name: 'callisto',
    src: '/assets/music/callisto.mp3',
    cover: '/assets/cover/callisto.jpg',
  },
  {
    title: 'The Hellsinger',
    name: 'thehellsinger',
    src: '/assets/music/thehellsinger.mp3',
    cover: '/assets/cover/hellsinger.png',
  },
  {
    title: 'Through You',
    name: 'through_you',
    src: '/assets/music/through_you.mp3',
    cover: '/assets/cover/hellsinger.png',
  },
]

function playMusic(name) {
  audioApi.pause()

  const music = musicList.find(musicItem => musicItem.name === name)
  if (music) {
    audioApi.currentTime = 0
    playedBarElem.style.width = '0px'
    playpauseIcon.src = pauseIconPath
    discImg.style.animationPlayState = 'running'
    audioApi.src = music.src
    discImg.src = music.cover
    musicTitle.innerText = music.title
    audioApi.play()
  }
}

backwardButton.addEventListener('click', backwardMusic)

for (let i = 0; i < allMusics.length; i++) {
  const musicItem = allMusics[i]

  musicItem.addEventListener('click', () => playMusic(musicItem.dataset.name))
}
//#endregion multi music
