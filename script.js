const audioApi = new Audio('/assets/music/callisto.mp3')

const playpauseButton = document.getElementById('playpauseBtn')
const playpauseIcon = playpauseButton.querySelector('img')
const forwardButton = document.getElementById('forwardBtn')
const backwardButton = document.getElementById('backwardBtn')
const discImg = document.getElementById('disc')
const playedBarElem = document.getElementById('playedBar')

function togglePlay() {
  if (!audioApi.paused) {
    audioApi.pause()
    playpauseIcon.src = '/assets/svg/play.svg'
    discImg.style.animationPlayState = 'paused'
  } else {
    audioApi.play()
    playpauseIcon.src = '/assets/svg/pause.svg'
    discImg.style.animationPlayState = 'running'
  }
}
function timeplayUpdated() {
  playedBarElem.style.width = `${(audioApi.currentTime / audioApi.duration) * 100}%`
}

audioApi.addEventListener('timeupdate', timeplayUpdated)
playpauseButton.addEventListener('click', togglePlay)
