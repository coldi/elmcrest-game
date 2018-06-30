import TimelineMax from 'gsap/TimelineMax';

const playAnimation = (animation, params) => (
    new Promise((resolve) => {
        const timeline = new TimelineMax({ onComplete: resolve });

        try {
            animation({ ...params, timeline });
        } catch (err) {
            resolve();
        }
    })
);

export default playAnimation;
