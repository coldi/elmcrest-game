// Weather & environmental effects.

varying vec2 vTextureCoord;
uniform vec2 filterArea;
uniform sampler2D uSampler;

uniform float uTime;
uniform vec2 uWindDirection;
uniform float uCloudDensity;
uniform vec2 uWorldOrigin;
uniform vec2 uWorldOffset;
uniform float uWorldScale;
uniform float uTemperature;
uniform float uRainIntensity;
uniform float uNightLevel;

vec4 permute(vec4 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}
vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}
vec3 fade(vec3 t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float rand(float n){return fract(sin(n) * 43758.5453123);}

float noise(float p){
	float fl = floor(p);
  float fc = fract(p);
	return mix(rand(fl), rand(fl + 1.0), fc);
}

// classic perlin 3d noise
// by Stefan Gustavson
float perlin(vec3 P) {
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
  vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
  vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
  vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
  vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}


// const matrices for 3d rotation
const mat3 rot1 = mat3(-0.37, 0.36, 0.85,-0.14,-0.93, 0.34,0.92, 0.01,0.4);
const mat3 rot2 = mat3(-0.55,-0.39, 0.74, 0.33,-0.91,-0.24,0.77, 0.12,0.63);
const mat3 rot3 = mat3(-0.71, 0.52,-0.47,-0.08,-0.72,-0.68,-0.7,-0.45,0.56);


// directional artifacts can be reduced by rotating each octave
float fracNoise(vec3 m) {
  return 0.5333333*perlin(m*rot1)
      +0.2666667*perlin(2.0*m*rot2)
      +0.1*perlin(16.0*m);
}

vec2 screenToPixel(vec2 screenPos, vec2 pixelSize) {
  return vec2(
    floor(screenPos.x / pixelSize.x) * pixelSize.x,
    floor(screenPos.y / pixelSize.y) * pixelSize.y
  );
}

vec2 worldToScreen(vec2 screenPos, vec2 resolution) {
  return screenPos * resolution;
}

vec2 screenToWorld(vec2 screenPos, vec2 resolution) {
  return screenPos / resolution;
}

float drawClouds(vec2 uv, float time, vec2 direction, vec2 offset, float density) {
  float parallaxStrength = 1.3;

  float aspect = filterArea.x / filterArea.y;
  uv.x *= aspect;
  offset.x *= aspect;

  vec2 pos2d = (uv - offset * parallaxStrength) / uWorldScale;

  // modify time value to be less fluid (more old skool pixel style)
  float fps = floor(time * 16.) / 16.;
  float speed = length(direction) * fps * 0.015;
  direction = normalize(-direction);
  float morphSpeed = speed * .2;
  float scale = 0.3;
  pos2d = ((pos2d + (direction * speed)) / scale);
  vec3 pos = vec3(pos2d.x, pos2d.y, morphSpeed);

  // get noise result
  float noise = fracNoise(pos);

  float color = 0.0;
  float threshold = 0.5 * (1.0 - density);

  if (noise > threshold) {
    color = .75;
  }
  if (noise > threshold + .05) {
    color = 1.;
  }

  return color;
}

vec4 drawSampler(vec2 uv) {
  return texture2D(uSampler, uv);
}

vec4 drawHeat(vec2 uv, float time, float strength, vec2 worldOrigin) {
  float rippleDensity = 80.;
  vec2 cofactor = (uv.yx - worldOrigin.yx) * rippleDensity;
  float speed = time * 3.;
  float rippleIntensity = strength * 0.001;

  uv = vec2(
    uv.x + sin(speed + cofactor.x) * rippleIntensity,
    uv.y + cos(speed + cofactor.y) * rippleIntensity
  );

  vec4 samplerCol = drawSampler(uv);

  vec4 filterColor = vec4(0.93, 0.64, 0.07, 1.); // An aggressive orange-yellowish color.

  return samplerCol + filterColor * strength * 0.3;
}

vec4 drawColdness(vec2 uv, vec2 pixelUV, float time, float strength, vec2 worldOrigin) {
  vec4 samplerCol = drawSampler(uv);

  vec4 filterColor = vec4(0, 0.45, 0.9, 0.); // A decent blue tone.

  vec4 result = mix(samplerCol, filterColor, strength * 0.3);

  float noise = fracNoise(vec3(pixelUV - worldOrigin, time * 0.01) * 10.);
  result += vec4(1., 1., 1., 1.) * noise * 0.5 * strength;

  // Sparkles
  /*
  noise = fracNoise(vec3(pixelUV - worldOrigin, time * 0.005) * 8.);
  if((noise >= 0.6 && noise < 0.62) || (noise >= 0.7 && noise < 0.72)) {
    result = mix(result, vec4(1., 1., 1., 1.), (noise + 0.3) * (0.5 + sin(time * pixelUV.x * pixelUV.y) * 0.5) * strength * 0.7);
  }
  */

  return result;
}

float drawSnowLayer(vec2 uv,float scale) {
	float w=smoothstep(1.,0.,-uv.y*(scale/10.));
  if(w<.1) {
    return 0.;
  }

  float fps = floor(uTime * 32.) / 32.;
  float speed = fps * .5;
	uv+=speed/scale;
  uv.y+=speed*2./scale;
  uv.x+=sin(uv.y+speed*.5)/scale;

	uv*=scale;
  vec2 s=floor(uv),f=fract(uv),p;
  float k=3.,d;

  p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;
  d=length(p);
  k=min(d,k);
	k=smoothstep(0.,k,sin(f.x+f.y)*0.01);

  return k*w;
}

float drawSnow(vec2 uv, vec2 worldPos, vec2 worldOrigin, vec2 windDirection, float strength) {
  worldPos -= worldOrigin;
  worldPos.y *= -1.;

  worldPos.x -= uv.y * (windDirection.x + 1.);

  float result =
    drawSnowLayer(worldPos, 10.0 / uWorldScale) * 0.8 *min(uv.y, 1.-uv.y) * ((strength - 0.0) / 0.8)
    + drawSnowLayer(worldPos, 16.0 / uWorldScale) * 0.4*min(uv.y, 1.-uv.y) * ((strength - 0.2) / 0.8)
    + drawSnowLayer(worldPos, 17.0 / uWorldScale) * 0.2*(1.-uv.y) * ((strength - 0.7) / 0.3)
    ;

  return clamp(result, 0., 1.);
}

float drawRainLayer(float seed, vec2 worldPos, float time, float strength, vec2 windDirection) {
  float timeBasedNoise = noise(time * time * 0.1); // Get a pseudo-random time based noise value.
  float noiseScale = 800.; // How much to scale the value for the noise function.
  float horizontalWindOffset = worldPos.y * windDirection.x * 0.7; // The rain drops x-offset calculated for the current wind strenght.
  float xThreshold = 0.2 * strength;
  float yThreshold = 0.8;

  float t = noise((timeBasedNoise + vTextureCoord.x + horizontalWindOffset) * noiseScale);
  if(t < xThreshold) {
    // Cut the line at a few points along the y axis to give it the impression of multiple smaller drops.
    timeBasedNoise = time * 3.;
    t = noise((timeBasedNoise + (vTextureCoord.x + vTextureCoord.y) + seed) * 200.);
    if(t > yThreshold) {
      return 1.;
    }
  }

  return 0.;
}

float drawRainLayerSmooth(float seed, vec2 worldPos, float time, float strength, vec2 windDirection) {
  vec2 stepSize = vec2(
    1. / filterArea.x,
    1. / filterArea.y
    ) * 1.2;

  float t = drawRainLayer(seed, worldPos, time, strength, windDirection);

  float t1 = drawRainLayer(seed, worldPos + vec2(stepSize.x, 0.), time, strength, windDirection);
  float t2 = drawRainLayer(seed, worldPos + vec2(-stepSize.x, 0.), time, strength, windDirection);
  float t3 = drawRainLayer(seed, worldPos + vec2(0., stepSize.y), time, strength, windDirection);
  float t4 = drawRainLayer(seed, worldPos + vec2(0., -stepSize.y), time, strength, windDirection);

  return (t + t1 + t2 + t3 + t4) / 10.;
}

vec4 drawRain(vec2 uv, vec2 worldPos, vec2 worldOrigin, float time, float strength, vec2 windDirection) {
  float aspect = filterArea.x / filterArea.y;
  worldPos.x *= aspect;

  worldPos -= worldOrigin;
  worldPos.y *= -1.;

  time = floor(time * 32.) / 32.;

  return (
    vec4(1.) * drawRainLayerSmooth(1.22, worldPos, time, strength, windDirection) * 0.1
    + vec4(1.) * drawRainLayerSmooth(0.12234, worldPos, time, strength * 0.75, windDirection) * 0.5
    + vec4(1.) * drawRainLayerSmooth(0.34, worldPos, time, strength * 0.5, windDirection) * 0.8
  );
}

vec4 drawMist(vec2 uv, vec2 worldPos, vec2 worldOrigin, float time, float strength, vec2 windDirection) {
  float aspect = filterArea.x / filterArea.y;
  worldPos.x *= aspect;

  worldPos -= worldOrigin;
  worldPos.y *= -1.;

  time = floor(time * 32.) / 32.;

  // Draw some mist
  float mistIntensity = clamp(fracNoise(vec3(
    worldPos.x - windDirection.x * time * 0.05,
    worldPos.y + worldPos.x * windDirection.x * 0.7,
    time * 0.05
    )), 0., 1.);

  return vec4(vec3(mistIntensity), 0.4) * strength;
}

float getWorldDistanceToCenter(vec2 worldPos, vec2 worldOrigin, float falloffPixelSize) {
  float aspect = filterArea.x / filterArea.y;
  vec2 aspectCorrectedWorldPos = vec2(worldPos.x * aspect, worldPos.y);
  vec2 aspectCorrectedWorldOrigin = vec2(worldOrigin.x * aspect, worldOrigin.y);
  vec2 p = aspectCorrectedWorldPos - aspectCorrectedWorldOrigin;

  falloffPixelSize *= aspect;
  p.x *= filterArea.x / falloffPixelSize;
  p.y *= filterArea.y / falloffPixelSize * aspect;

  return length(p); // pow(length(p), 4.);
}

vec4 mixAlpha(vec4 a, vec4 b, float amount) {
  a.a = 1.0 - b.a;
  return mix(a, vec4(a.rgb * a.a + b.rgb * b.a, 1.), amount);
}

vec4 grayscale3(vec4 color) {
  float average = pow((color.r + color.g + color.b) / 3., 1.25);
  return vec4(average, average, average, 1.);
}

vec4 drawNight(vec2 pixelUV, vec2 worldOrigin, vec4 color, float level, float temperature, float time) {
  // Night tint
  vec3 nightTint = vec3(0.5, 0.5, 1.0); // mighnight blue
  vec4 nightColor = grayscale3(color) * vec4(nightTint, 1.) * .5;

  vec4 result = mix(color, nightColor, clamp(level * .8, 0., 1.));

  // Draw some fireflies
  /*
  if(temperature > 0.) {
    temperature = 0.1 + temperature * 0.1;
    float fireflies = fracNoise(vec3(pixelUV - worldOrigin, time * 0.0005) * 16.);

    if((fireflies > 0.71 && fireflies < 0.721) || (fireflies > 0.51 && fireflies < 0.521)) {
      float factor = (fireflies < 0.71 ? (0.521 - fireflies) : (0.721 - fireflies)) / 0.011;

      result = mix(result, vec4(0.678, 1.000, 0.184, 1.), (factor - temperature) * level); // green yellowish
    }
  }
  */

  return result;
}

void main() {
    vec2 pixelSize = vec2(4., 4.);
    vec2 screenPos = worldToScreen(vTextureCoord, filterArea);
    vec2 pixelPos = screenToPixel(screenPos, pixelSize);
    vec2 worldPos = screenToWorld(pixelPos, filterArea);
    vec2 worldOffset = (uWorldOrigin + uWorldOffset) * uWorldScale;
    vec2 worldOrigin = screenToWorld(uWorldOffset, filterArea);

    float maskRadius = 360.0;

    float worldDistanceToCenter = getWorldDistanceToCenter(worldPos, screenToWorld(worldOffset, filterArea), maskRadius * uWorldScale);

    vec4 color = drawSampler(vTextureCoord);

    if(uTemperature < 0.) {
        // Coldness
        float areaStrength = clamp((1. - worldDistanceToCenter) * -uTemperature, 0., 1.);
        color = drawColdness(vTextureCoord, worldPos, uTime, areaStrength,  worldOrigin);
        if (uRainIntensity > 0.) {
          // Snow
          color += drawSnow(vTextureCoord, worldPos, worldOrigin, uWindDirection, uRainIntensity);
        }
    } else {
        // Heat
        float areaStrength = clamp((1. - worldDistanceToCenter) * uTemperature, 0., 1.);
        color = drawHeat(vTextureCoord, uTime, areaStrength,  worldOrigin);
        if (uRainIntensity > 0.) {
          // Rain
          vec2 rainWorldPos = screenToWorld(screenToPixel(screenPos, pixelSize * 0.5), filterArea);
          color += drawRain(vTextureCoord, rainWorldPos, worldOrigin, uTime, uRainIntensity, uWindDirection);
          float mistStrength = clamp((1. - worldDistanceToCenter) * uRainIntensity, 0., 1.);
          color += drawMist(vTextureCoord, rainWorldPos, worldOrigin, uTime, mistStrength, uWindDirection);
        }
    }

    // Clouds
    if(uCloudDensity > 0.) {
      float cloudIntensity = drawClouds(worldPos, uTime, uWindDirection, worldOrigin, uCloudDensity);
      vec4 clouds = vec4(1., 1., 1., cloudIntensity);

      if(cloudIntensity > 0.) {
        clouds.a = min(cloudIntensity, max(0.1, worldDistanceToCenter));
      }

      color = mixAlpha(color, clouds, 0.9);
    }

    // Night time
    color = drawNight(worldPos, worldOrigin, color, uNightLevel, uTemperature, uTime);

    gl_FragColor = color;
}
