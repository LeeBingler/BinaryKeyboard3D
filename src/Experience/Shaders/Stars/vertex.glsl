uniform float uSize;
uniform float uTime;

void main() {
    float maxY = 1.0;
    float minY = -1.0;

    vec4 currentPosition = vec4(position, 1.0);
    vec4 modelPosition = modelMatrix * currentPosition;

    // Animation go up
    modelPosition.y += abs(uTime * modelPosition.z) * 0.1;


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = uSize;

    // Size Attenuation
    gl_PointSize *= (1.0 / -viewPosition.z);
}
