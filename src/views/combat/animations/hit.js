export default ({ timeline, element }) => {
    timeline.delay(0.25).to(element, 0.075, {
        opacity: 0.25,
        yoyo: true,
        repeat: 7,
    });
};
