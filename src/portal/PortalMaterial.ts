import { Color, ShaderMaterial } from 'three'
import vertexShader from './shaders/portal.vert'
import fragmentShader from './shaders/portal.frag'

export class PortalMaterial extends ShaderMaterial {
  constructor() {
    super()
    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader

    this.uniforms = {
      uTime: { value: 0 },
      uColorStart: { value: new Color(0x903c7e) },
      uColorEnd: { value: new Color(0x2e87e5) },
    }
  }
}
