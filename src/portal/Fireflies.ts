import { GameEntity } from '../engine/GameEntity'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Points,
  ShaderMaterial,
} from 'three'
import vertexShader from './shaders/fireflies.vert'
import fragmentShader from './shaders/fireflies.frag'
import { Engine } from '../engine/Engine'

export class Fireflies extends Points implements GameEntity {
  material: ShaderMaterial
  constructor(private engine: Engine) {
    super()

    const firefliesGeometry = new BufferGeometry()
    const count = 60
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4
      positions[i * 3 + 1] = Math.random()
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4
    }

    firefliesGeometry.setAttribute(
      'position',
      new BufferAttribute(positions, 3)
    )

    const scaleArray = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      scaleArray[i] = Math.random()
    }

    firefliesGeometry.setAttribute('aScale', new BufferAttribute(scaleArray, 1))

    this.material = new ShaderMaterial({
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: 100 },
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
    })

    this.engine.debug.gui
      .add(this.material.uniforms.uSize, 'value')
      .min(0)
      .max(200)
      .step(1)
      .name('fireflies size')

    this.geometry = firefliesGeometry
  }
  update(delta: number): void {
    this.material.uniforms.uTime.value += delta
  }

  resize() {
    this.material.uniforms.uPixelRatio.value = Math.min(
      window.devicePixelRatio,
      2
    )
  }
}
