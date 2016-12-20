#pragma glslify: snoise = require('glsl-noise/classic/4d')
#define M_PI 3.1415926535897932384626433832795
uniform float time;
uniform float beat;
uniform float noise;
varying vec2 vUv;
varying vec4 vWorldPosition;


void main() {
  vUv = uv;

  vec4 worldPosition = modelMatrix * vec4( position, 1.0) ;
  //vec4 worldPosition = modelMatrix * vec4( position, 1.0);
  //worldPosition.x += sin(M_PI * length(position.x)/200. - time * 5.) * 10.;
  //worldPosition.y += sin(M_PI * length(position.y)/200. - time * 5.) * 10.;
  worldPosition += snoise(worldPosition) * noise;
  worldPosition.z += sin(M_PI * length(position.xy)/200. - time * 5.) * 100.;
  vWorldPosition = worldPosition;
  gl_Position = projectionMatrix * viewMatrix * worldPosition;

}
