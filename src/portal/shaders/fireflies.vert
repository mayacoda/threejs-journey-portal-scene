attribute float aScale;

uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;

void main() {
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 clipPosition = projectionMatrix * viewPosition;

    gl_Position = clipPosition;
    gl_Position.y += sin(uTime + position.x * 100.0) * aScale * 0.1;
    gl_PointSize = uSize * uPixelRatio * aScale;
    gl_PointSize *= (1.0 / -viewPosition.z);
}