import { Experience } from '../engine/Experience'
import { Resource } from '../engine/Resources'
import { Engine } from '../engine/Engine'
import { Mesh, MeshBasicMaterial, sRGBEncoding } from 'three'
import { Fireflies } from './Fireflies'
import { PortalMaterial } from './PortalMaterial'

export class PortalScene implements Experience {
  debugObject = {
    clearColor: 0x0b3231,
  }
  fireflies!: Fireflies
  portalMaterial!: PortalMaterial

  constructor(private engine: Engine) {}

  resources: Resource[] = [
    {
      name: 'portal',
      path: 'portal-scene.glb',
      type: 'gltf',
    },
    {
      name: 'baked',
      path: 'Baked.jpg',
      type: 'texture',
    },
  ]

  init(): void {
    const gltf = this.engine.resources.getItem('portal')

    const bakedTexture = this.engine.resources.getItem('baked')
    bakedTexture.flipY = false
    bakedTexture.encoding = sRGBEncoding

    gltf.scene.children.find((child: Mesh) => child.name === 'baked').material =
      new MeshBasicMaterial({ map: bakedTexture })

    const lightMaterial = new MeshBasicMaterial({ color: 0xffffe5 })
    gltf.scene.children
      .filter((child: Mesh) => child.name.startsWith('poleLight'))
      .forEach((child: Mesh) => (child.material = lightMaterial))

    this.portalMaterial = new PortalMaterial()
    gltf.scene.children.find(
      (child: Mesh) => child.name === 'portalLight'
    ).material = this.portalMaterial

    this.engine.scene.add(gltf.scene)

    // background color
    this.engine.renderEngine
      .getRenderer()
      .setClearColor(this.debugObject.clearColor)
    this.engine.debug.gui
      .addColor(this.debugObject, 'clearColor')
      .onChange(() => {
        this.engine.renderEngine
          .getRenderer()
          .setClearColor(this.debugObject.clearColor)
      })
    this.engine.debug.gui
      .addColor(this.portalMaterial.uniforms.uColorStart, 'value')
      .name('portal start color')
    this.engine.debug.gui
      .addColor(this.portalMaterial.uniforms.uColorEnd, 'value')
      .name('portal end color')

    // fireflies
    this.fireflies = new Fireflies(this.engine)
    this.engine.scene.add(this.fireflies)
  }

  update(delta: number): void {
    this.fireflies.update(delta)
    this.portalMaterial.uniforms.uTime.value += delta
  }
}
