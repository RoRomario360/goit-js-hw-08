import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(evt) {
  localStorage.setItem('videoplayer-current-time', evt.seconds);
}
player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));

const lastPosition = localStorage.getItem('videoplayer-current-time');
if (lastPosition) {
  player.setCurrentTime(lastPosition);
}
