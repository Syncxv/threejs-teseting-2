#pragma glslify: snoise = require('glsl-noise/simplex/4d')
uniform float uTime;

varying vec2 vUv;
varying vec3 vNormal;
varying float vNoise;
void main() {

    vNormal = normal;
    vUv = uv;

    float noise = snoise(vec4(normal*5., uTime * .2));
    vNoise = noise;
    vec3 pos = position;
    pos += 0.1*normal*noise;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

}


