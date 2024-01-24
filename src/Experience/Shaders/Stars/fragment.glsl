void main() {
    // Diffuse Point particles
    float strength = distance(gl_PointCoord, vec2(0.5)) * 2.0;
    strength = 1.0 - strength;

    gl_FragColor = vec4(vec3(strength), 1.0);
}
