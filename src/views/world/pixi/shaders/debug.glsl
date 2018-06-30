// A simple debug shader, mainly intended for filters.

varying vec2 vTextureCoord;
uniform vec2 filterArea;
uniform sampler2D uSampler;

void main() {
    vec4 color = vec4(vTextureCoord, 0, 1.);

    if(vTextureCoord.x < 0.5) {
      color = 1. - color;
    }

    if(vTextureCoord.y < 0.5) {
      color = 1. - color;
    }

    vec4 samplerCol = texture2D(uSampler, vTextureCoord);

    gl_FragColor = color + samplerCol;
}
