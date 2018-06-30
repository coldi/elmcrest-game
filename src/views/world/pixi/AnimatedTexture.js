import 'pixi.js';
import { TILE_SIZE } from '../constants';
/* eslint-disable  no-undef */
const {
    Texture,
    BaseTexture,
    Rectangle,
    utils: { TextureCache },
} = PIXI;
/* eslint-enable  no-undef */

export default class AnimatedTexture extends Texture {

    currentFrame = 0;
    numFrames = 1;
    animationFrame = null;
    animationFrameCounter = 0;
    animationInterval = 15;

    static fromImage(imageUrl, crossorigin, scaleMode, sourceScale) {
        let texture = TextureCache[imageUrl];
        if (!texture) {
            texture = new AnimatedTexture(
                BaseTexture.fromImage(imageUrl, crossorigin, scaleMode, sourceScale)
            );
            Texture.addToCache(texture, imageUrl);
        }

        return texture;
    }

    constructor (...args) {
        super(...args);

        this.animate = this.animate.bind(this);

        const [baseTexture] = args;

        if (baseTexture.hasLoaded) {
            this.handleLoad();
        } else {
            baseTexture.once('loaded', this.handleLoad, this);
        }
    }

    handleLoad () {
        const { realWidth } = this.baseTexture;

        this.numFrames = Math.ceil(realWidth / TILE_SIZE);

        this.setCurrentFrame();
        this.animate();
    }

    setCurrentFrame (currentFrame = this.currentFrame) {
        const { realHeight } = this.baseTexture;
        const x = TILE_SIZE * currentFrame;

        this.frame = new Rectangle(x, 0, TILE_SIZE, realHeight);
        this.currentFrame = currentFrame;
    }

    animate () {
        if (this.numFrames > 1) {
            this.animationFrameCounter += 1;

            if (this.animationFrameCounter > this.animationInterval) {
                this.animationFrameCounter = 0;

                this.setCurrentFrame((this.currentFrame + 1) % this.numFrames);
            }
        }

        this.animationFrame = requestAnimationFrame(this.animate);
    }

    destroy () {
        cancelAnimationFrame(this.animationFrame);
        super.destroy();
    }
}
