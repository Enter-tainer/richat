import mediumZoom from 'medium-zoom'
export default function makeMediaZoomable () {
  mediumZoom('img:not(.medium-zoom-image)', {
    margin: 80,
    background: 'rgba(30, 30, 30, .9)'
  })
}
