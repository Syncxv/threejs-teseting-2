#pragma glslify: snoise = require('glsl-noise/simplex/4d')
uniform float uTime;

varying vec2 vUv;
varying vec3 vNormal;
void main() {

    vNormal = normal;
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}


