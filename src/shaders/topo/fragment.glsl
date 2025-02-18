uniform float uAmplitude; // Value between 0 and 5
varying vec2 vUv;

void main() {
    float t = clamp(uAmplitude / 5.0, 0.0, 1.0);

    vec3 green = vec3(0.0, 1.0, 0.0);
    vec3 yellow = vec3(1.0, 1.0, 0.0);
    vec3 red = vec3(1.0, 0.0, 0.0);

    vec3 color;
    if (t < 0.5) {
        color = mix(green, yellow, t * 2.0);
    } else {
        color = mix(yellow, red, (t - 0.5) * 2.0);
    }

    gl_FragColor = vec4(color, 1.0);
}