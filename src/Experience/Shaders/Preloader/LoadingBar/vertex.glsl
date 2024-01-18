uniform float uToload;
uniform float uLoaded;

void main() {
    vec4 realTimePosition = vec4(position, 1.0);
    realTimePosition.x -= 1.99;
    realTimePosition.x += (uToload / uLoaded) * 2.0;

    gl_Position = realTimePosition;
}
