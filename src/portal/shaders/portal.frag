#include "../../shaders/lygia/generative/cnoise.glsl"

uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

varying vec2 vUv;

void main() {
    vec2 displacedUv = vUv + cnoise(vec3(vUv * 5.0, uTime * 0.1));

    float strength = cnoise(vec3(displacedUv * 5.0, uTime * 0.2));

    float outerGlow = distance(vUv, vec2(0.5)) * 5.0 - 1.4;
    strength += outerGlow;

    strength += step(0.3, strength) * 0.7;
//    strength = clamp(strength, -0.5, 1.0);
    vec3 color = mix(uColorEnd, uColorStart, strength);

    gl_FragColor = vec4(color, 1.0);
}