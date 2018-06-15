import mediumZoom from 'medium-zoom'

export default function makeMediaZoomable () {
  mediumZoom(document.images, {
    margin: 80,
    background: 'rgba(30, 30, 30, .9)'
  })
}
