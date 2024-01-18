void main() {
    vec4 realTimePosition = vec4(position, 1.0);
    realTimePosition.x -= 2;

    gl_Position = realTimePosition;
}
