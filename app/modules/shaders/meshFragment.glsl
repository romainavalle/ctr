#define M_PI 3.1415926535897932384626433832795
uniform vec3 color;
varying vec2 vUv;
varying vec4 vWorldPosition;
uniform float time;
uniform float signCurve;
uniform float tanCoef;
uniform float tanSpeed;
uniform sampler2D water;
uniform sampler2D displacement;
uniform float allowTan;
uniform vec2 direction;

void main() {
  vec2 v = vUv;
  vec2 uvTimeShift = vUv + vec2(.1,.2)*time*direction;
  vec4 noiseGeneratorTimeShift = texture2D( displacement, uvTimeShift);
  vec2 uvDisplacementTimeShift = vUv + vec2( noiseGeneratorTimeShift.r, noiseGeneratorTimeShift.b )*direction;
  vec4 baseColor = texture2D( water,uvDisplacementTimeShift ) * vec4(color,1.);

  float stepCurve = 1.;
  if(allowTan == 1.){
      stepCurve =  (1.-tan(2.* M_PI * length(vWorldPosition.xy) / tanCoef + signCurve * time * tanSpeed)) ;
    }else if(allowTan == 2.){
      stepCurve = fract(vWorldPosition.x/vWorldPosition.y * time) *2.;
    }else if(allowTan == 3.){
      stepCurve =  (1.-cos(2.* M_PI * length(vWorldPosition.xy) / tanCoef + signCurve * time * tanSpeed)) ;
    }else if(allowTan == 4.){
      stepCurve =  (1.-cos(2.* M_PI * length(vWorldPosition.xy) / tanCoef + signCurve * time * tanSpeed)) ;
    }else if(allowTan == 5.){
      stepCurve =  step(.5,1.-cos(2.* M_PI * length(vWorldPosition.xy) / tanCoef + signCurve * time * tanSpeed)) ;
    }else if(allowTan == 6.){
      stepCurve =  sin(10.*M_PI * dot(vWorldPosition.xy,direction) / tanCoef + signCurve * time * tanSpeed) ;
    }else if(allowTan == 7.){
      stepCurve =  -sin(10.*M_PI * dot(vWorldPosition.xy,direction) / tanCoef + signCurve * time * tanSpeed) ;
    }
    else if(allowTan == 8.){
      stepCurve = mod(vWorldPosition.x,vWorldPosition.y) * cos(time) / 100.;
    }
    else if(allowTan == 10.){
      stepCurve = mod(vWorldPosition.y,vWorldPosition.x) * cos(time) / 100. ;
    }
    else if(allowTan == 11.){
      stepCurve = mix(vWorldPosition.y,vWorldPosition.x,signCurve * time * tanSpeed) / 500. * cos(time);
    }
    else if(allowTan == 9.){
      stepCurve = normalize(vWorldPosition.y) * cos(time) * 10.;

    }
    else if(allowTan == 12.){
      stepCurve =  (1.-sin(2.* M_PI * distance(vWorldPosition.x,vWorldPosition.y) / tanCoef + signCurve * time * tanSpeed)) ;
    }
    gl_FragColor = baseColor * stepCurve;
}
