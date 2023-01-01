const audioApi = new Audio('/assets/music/callisto.mp3')

const pauseIconPath = '/assets/svg/pause.svg'
const playIconPath = '/assets/svg/play.svg'

const playpauseButton = document.getElementById('playpauseBtn')
const playpauseIcon = playpauseButton.querySelector('img')
const forwardButton = document.getElementById('forwardBtn')
const backwardButton = document.getElementById('backwardBtn')
const discImg = document.getElementById('disc')
const playedBarElem = document.getElementById('playedBar')

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
function musicEnded() {
  playedBarElem.style.width = '0px'
  playpauseIcon.src = playIconPath
  audioApi.currentTime = 0
}

audioApi.addEventListener('timeupdate', timeplayUpdated)
audioApi.addEventListener('ended', musicEnded)
playpauseButton.addEventListener('click', togglePlay)
