let scale = 1/window.devicePixelRatio;
// console.log(scale);
// console.log(document.querySelector('meta[name="viewport"]'));
document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';