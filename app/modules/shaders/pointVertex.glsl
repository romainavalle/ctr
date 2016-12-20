#define M_PI 3.1415926535897932384626433832795
#pragma glslify: snoise = require('glsl-noise/classic/4d')
attribute float size;
attribute vec3 customColor;
varying vec3 vColor;
uniform float time;
uniform float beat;
void main() {
  vColor = customColor;
  vec4 mvPosition = modelViewMatrix *vec4( position, 1.0 );
  mvPosition.y += 100.*sin(time/4.*M_PI)*snoise(vec4( position, 1.0 ));
  mvPosition.x += 100.*cos(time/4.*M_PI)*snoise(vec4( position, 1.0 ));
  mvPosition.z += 100.*tan(time/4.*M_PI)*snoise(vec4( position, 1.0 ));
  gl_PointSize = size * length(position.xy)/2000.;
  gl_Position = projectionMatrix * mvPosition;
}
