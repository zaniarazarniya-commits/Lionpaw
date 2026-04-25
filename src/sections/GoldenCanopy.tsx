import { useRef, useEffect } from 'react'
import * as THREE from 'three'

const noiseVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const noiseFragmentShader = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uRayIntensity;
uniform float uCloudDensity;
uniform vec2 uLightPosition;
uniform vec2 resolution;

#define PI 3.14159265359

float hash(float n) {
  return fract(sin(n) * 43758.5453123);
}

vec2 mod289v2(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 mod289v3(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permutev3(vec3 x) {
  return mod289v3(((x * 34.0) + 1.0) * x);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289v2(i);
  vec3 p = permutev3(permutev3(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 4; i++) {
    value += amplitude * snoise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

float cloudNoise(vec2 p, float t) {
  vec2 q = vec2(fbm(p + t * 0.015), fbm(p + vec2(5.2, 1.3) + t * 0.012));
  vec2 r = vec2(fbm(p + 4.0 * q + t * 0.008), fbm(p + 4.0 * q + vec2(8.3, 2.8) + t * 0.006));
  return fbm(p + 3.5 * r);
}

float rayMarch(vec2 uv, vec2 lightPos, float t) {
  vec2 rayDir = normalize(lightPos - uv);
  float numSteps = 24.0;
  float stepSize = 1.0 / numSteps;
  vec2 rayOrigin = uv;
  float illumination = 0.0;
  float transmittance = 1.0;
  float absorption = 2.8 * uCloudDensity;
  vec3 lightColor = vec3(0.94, 0.85, 0.47);
  for (float i = 0.0; i < 24.0; i++) {
    float progress = (i + 0.5) * stepSize;
    vec2 samplePos = rayOrigin + rayDir * progress * 0.7;
    float cloud = cloudNoise(samplePos * 1.5, t) * uCloudDensity;
    cloud = smoothstep(0.35, 0.8, cloud);
    float absorptionCoeff = cloud * absorption * stepSize;
    vec3 scatteredLight = lightColor * absorptionCoeff * transmittance;
    illumination += scatteredLight.r;
    transmittance *= exp(-absorptionCoeff);
  }
  return illumination * uRayIntensity;
}

void main() {
  vec2 aspectUV = vec2(vUv.x * (resolution.x / resolution.y), vUv.y);
  vec2 lightPos = vec2((resolution.x / resolution.y) * uLightPosition.x + sin(uTime * 0.07) * 0.12, uLightPosition.y + cos(uTime * 0.09) * 0.08);
  float rayIntensity = rayMarch(aspectUV, lightPos, uTime);
  gl_FragColor = vec4(rayIntensity, 0.0, 0.0, 1.0);
}
`

const displayVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const displayFragmentShader = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uRayIntensity;
uniform float uCloudDensity;
uniform vec2 uLightPosition;
uniform float uColorGrading;
uniform sampler2D uNoiseTexture;
uniform vec2 resolution;

#define PI 3.14159265359

float hash(float n) {
  return fract(sin(n) * 43758.5453123);
}

float hash2(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

vec2 mod289v2(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 mod289v3(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permutev3(vec3 x) {
  return mod289v3(((x * 34.0) + 1.0) * x);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289v2(i);
  vec3 p = permutev3(permutev3(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 4; i++) {
    value += amplitude * snoise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

float cloudNoise(vec2 p, float t) {
  vec2 q = vec2(fbm(p + t * 0.015), fbm(p + vec2(5.2, 1.3) + t * 0.012));
  vec2 r = vec2(fbm(p + 4.0 * q + t * 0.008), fbm(p + 4.0 * q + vec2(8.3, 2.8) + t * 0.006));
  return fbm(p + 3.5 * r);
}

float rayMarch(vec2 uv, vec2 lightPos, float t) {
  vec2 rayDir = normalize(lightPos - uv);
  float numSteps = 24.0;
  float stepSize = 1.0 / numSteps;
  vec2 rayOrigin = uv;
  float illumination = 0.0;
  float transmittance = 1.0;
  float absorption = 2.8 * uCloudDensity;
  vec3 lightColor = vec3(0.94, 0.85, 0.47);
  for (float i = 0.0; i < 24.0; i++) {
    float progress = (i + 0.5) * stepSize;
    vec2 samplePos = rayOrigin + rayDir * progress * 0.7;
    float cloud = cloudNoise(samplePos * 1.5, t) * uCloudDensity;
    cloud = smoothstep(0.35, 0.8, cloud);
    float absorptionCoeff = cloud * absorption * stepSize;
    vec3 scatteredLight = lightColor * absorptionCoeff * transmittance;
    illumination += scatteredLight.r;
    transmittance *= exp(-absorptionCoeff);
  }
  return illumination * uRayIntensity;
}

float sampleNoiseTexture(vec2 uv) {
  vec2 texel = vec2(1.0) / resolution;
  float s = texture2D(uNoiseTexture, uv).r;
  s += texture2D(uNoiseTexture, uv + vec2(texel.x, 0.0)).r;
  s += texture2D(uNoiseTexture, uv + vec2(0.0, texel.y)).r;
  s += texture2D(uNoiseTexture, uv + texel).r;
  return s * 0.25;
}

void main() {
  vec2 uv = vUv;
  float t = uTime;
  vec2 lightPos = vec2((resolution.x / resolution.y) * uLightPosition.x + sin(t * 0.07) * 0.12, uLightPosition.y + cos(t * 0.09) * 0.08);
  float texRayIntensity = sampleNoiseTexture(uv);
  float rayIntensity = rayMarch(uv, lightPos, t);
  float blendedRay = texRayIntensity * 0.4 + rayIntensity * 0.6;
  vec3 bgColor = vec3(0.102, 0.235, 0.204);
  float groundHaze = exp(-uv.y * 3.0) * 0.12;
  bgColor += vec3(0.35, 0.28, 0.12) * groundHaze;
  vec3 rayColor = vec3(0.94, 0.85, 0.47);
  vec3 rayColored = rayColor * blendedRay;
  float coreGlow = 1.0 - distance(uv, lightPos);
  float core = pow(max(coreGlow, 0.0), 5.0) * 0.4 * uRayIntensity;
  bgColor += vec3(1.0, 0.92, 0.65) * core;
  vec3 color = bgColor + rayColored;
  float lightDist = distance(uv, lightPos);
  color += vec3(1.0, 0.95, 0.75) * (0.06 / (lightDist * lightDist + 0.02)) * uRayIntensity;
  float cloud = cloudNoise(uv * 1.5, t) * uCloudDensity;
  cloud = smoothstep(0.35, 0.8, cloud);
  vec3 cloudColor = vec3(0.18, 0.22, 0.16);
  if (uColorGrading > 0.5) {
    cloudColor += (vec3(0.45, 0.38, 0.2) - cloudColor) * cloud * 0.4;
  }
  float cloudIllumination = blendedRay * 2.0 + 0.3;
  cloudColor *= cloudIllumination;
  color = mix(color, cloudColor, cloud * 0.6);
  float dust = hash2(uv * 500.0 + t);
  color += vec3(0.9, 0.82, 0.5) * dust * 0.015 * uRayIntensity;
  float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv - vec2(0.5)) * 1.8);
  color *= 0.65 + vignette * 0.35;
  color = pow(color, vec3(0.95, 1.0, 1.12));
  color += vec3(0.02, 0.01, -0.005);
  gl_FragColor = vec4(color, 1.0);
}
`

export default function GoldenCanopy() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const frameRef = useRef<number>(0)
  const isVisibleRef = useRef(true)
  const clockRef = useRef<THREE.Clock | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const w = container.offsetWidth || window.innerWidth
    const h = container.offsetHeight || window.innerHeight
    const isMobile = navigator.maxTouchPoints > 0

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'high-performance' })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const noiseMaterial = new THREE.ShaderMaterial({
      vertexShader: noiseVertexShader,
      fragmentShader: noiseFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uRayIntensity: { value: 1.2 },
        uCloudDensity: { value: 1.0 },
        uLightPosition: { value: new THREE.Vector2(0.65, 0.55) },
        resolution: { value: new THREE.Vector2(w, h) },
      },
    })

    const displayMaterial = new THREE.ShaderMaterial({
      vertexShader: displayVertexShader,
      fragmentShader: displayFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uRayIntensity: { value: 1.2 },
        uCloudDensity: { value: 1.0 },
        uLightPosition: { value: new THREE.Vector2(0.65, 0.55) },
        uColorGrading: { value: 1.0 },
        uNoiseTexture: { value: null },
        resolution: { value: new THREE.Vector2(w, h) },
      },
    })

    const rtW = isMobile ? Math.floor(w * 0.4) : Math.floor(w * 0.75)
    const rtH = isMobile ? Math.floor(h * 0.4) : Math.floor(h * 0.75)
    const renderTarget = new THREE.WebGLRenderTarget(rtW, rtH, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    })

    const noiseScene = new THREE.Scene()
    const displayScene = new THREE.Scene()
    const orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const noiseMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), noiseMaterial)
    const displayMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), displayMaterial)
    noiseScene.add(noiseMesh)
    displayScene.add(displayMesh)

    const clock = new THREE.Clock()
    clockRef.current = clock

    const animate = () => {
      if (!isVisibleRef.current) {
        frameRef.current = requestAnimationFrame(animate)
        return
      }

      const elapsed = clock.getElapsedTime()
      noiseMaterial.uniforms.uTime.value = elapsed
      displayMaterial.uniforms.uTime.value = elapsed

      const prevTarget = renderer.getRenderTarget()
      renderer.setRenderTarget(renderTarget)
      renderer.render(noiseScene, orthoCamera)
      renderer.setRenderTarget(prevTarget)

      displayMaterial.uniforms.uNoiseTexture.value = renderTarget.texture
      renderer.render(displayScene, orthoCamera)

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    const onResize = () => {
      const nw = container.offsetWidth || window.innerWidth
      const nh = container.offsetHeight || window.innerHeight
      renderer.setSize(nw, nh)
      noiseMaterial.uniforms.resolution.value.set(nw, nh)
      displayMaterial.uniforms.resolution.value.set(nw, nh)
      const nrtW = isMobile ? Math.floor(nw * 0.4) : Math.floor(nw * 0.75)
      const nrtH = isMobile ? Math.floor(nh * 0.4) : Math.floor(nh * 0.75)
      renderTarget.setSize(nrtW, nrtH)
    }

    window.addEventListener('resize', onResize)

    // Pause rendering when off-screen to save GPU
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(container)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
      renderer.dispose()
      renderTarget.dispose()
      noiseMaterial.dispose()
      displayMaterial.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  )
}
