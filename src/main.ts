import magnifyImg from './lib/index';

import img from './assets/waterDrop.jpg';

magnifyImg({
  src: img,
  zoom: 1,
  target: document.getElementById('example1') as HTMLElement,
  width: 500,
  MagnifyDomWidth: 200,
})

magnifyImg({
  src: img,
  zoom: 1,
  target: document.getElementById('example2') as HTMLElement,
  width: 500,
  MagnifyDomWidth: 200,
  MagnifyDomStyles: {
    // borderRadius: '50%',
    border: '20px solid red'
  }
})

magnifyImg({
  src: img,
  zoom: 3,
  target: document.getElementById('example3') as HTMLElement,
  width: 500,
  MagnifyDom: document.getElementById('example3Magnify') as HTMLElement,
})

magnifyImg({
  src: img,
  zoom: 3,
  target: document.getElementById('example4') as HTMLElement,
  width: 500,
  MagnifyDom: document.getElementById('example4Magnify') as HTMLElement,
  overflow: false,
})