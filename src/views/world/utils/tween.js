import TweenMax from 'gsap';

const tween = (from, to, time = 0.5, onUpdate = () => {}) => {
    TweenMax.to(from, time, { ...to, onUpdate: () => onUpdate(from) });
};

export default tween;
