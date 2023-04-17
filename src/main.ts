import './style.scss'
import { Engine } from './engine/Engine'
import { PortalScene } from './portal/PortalScene'

new Engine({
  canvas: document.querySelector('#canvas') as HTMLCanvasElement,
  experience: PortalScene,
  info: {
    twitter: 'https://twitter.com/maya_ndljk',
    github: 'https://github.com/mayacoda/threejs-journey-portal-scene',
    description: 'Chapter 06 of Three.js Journey',
    documentTitle: 'Portal Scene',
    title: 'Portal scene',
  },
})
