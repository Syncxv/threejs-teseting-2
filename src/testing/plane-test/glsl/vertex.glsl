
#pragma glslify: snoise = require('glsl-noise/simplex/4d')

uniform float uTime;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uQuadSize;
uniform vec2 uTextureSize;
uniform vec4 uCorners;


varying vec2 vUv;
varying vec3 vNormal;
varying vec2 vSize;
void main() {

    vNormal = normal;
    vUv = uv;



    vec4 initalState =  modelMatrix * vec4(position, 1.0);
    vec4 fullscreenState = vec4(position, 1.0);
    fullscreenState.x *=  uResolution.x ;
    fullscreenState.y *=  uResolution.y ;

    float realProgress = mix(mix(uCorners.y, uCorners.x, uv.x), mix(uCorners.z, uCorners.w, uv.x), uv.y);

    vSize = mix(uQuadSize, uResolution, realProgress);

    vec4 finalState = mix(initalState, fullscreenState, realProgress);
    gl_Position = projectionMatrix * viewMatrix * finalState;

}


