uniform float uSize;
uniform float uTime;
uniform float uSpeedAnimation;

void main() {
    float maxY = 2.0;

    vec4 currentPosition = vec4(position, 1.0);
    vec4 modelPosition = modelMatrix * currentPosition;

    // Animation go up
    float rangeParticle = 10.0;
    modelPosition.y += abs(uTime * modelPosition.z) * uSpeedAnimation;
    modelPosition.y = mod(modelPosition.y, maxY * rangeParticle / 1.6) - rangeParticle;


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = uSize;

    // Size Attenuation
    gl_PointSize *= (1.0 / -viewPosition.z);
}
