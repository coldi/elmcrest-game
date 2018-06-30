export default ({ timeline, element, flipped }) => {
    const prefix = flipped ? '-=' : '+=';

    return timeline.to(element, 0.15, {
        y: '-=40',
        rotation: `${prefix}${15}`,
        yoyo: true,
        repeat: 1,
    });
};
