export default ({ timeline, element }) => {
    timeline.to(element, 0.15, {
        y: '-=40',
        yoyo: true,
        repeat: 1,
    });
};
