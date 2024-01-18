uniform float uToload;
uniform float uLoaded;
uniform float uOffset;

void main() {
    vec4 realTimePosition = vec4(position, 1.0);
    realTimePosition.z -= 0.1;
    realTimePosition.x -= 2.0;
    realTimePosition.x += (uLoaded / uToload) * 2.0;
    realTimePosition.x += uOffset;

    gl_Position = realTimePosition;
}
