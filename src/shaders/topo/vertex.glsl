uniform float uTime;
uniform float uPulseIntensity;
varying vec2 vUv;

void main() {
    vec3 newPosition = position * (1.0 + sin(uTime * 5.0) * uPulseIntensity * 100.0);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}