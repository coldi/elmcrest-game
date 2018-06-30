export default ({ timeline, element }) => {
    timeline
        .to(element, 0.1, {
            scaleX: 0.5,
        })
        .to(element, 0.15, {
            y: '-=300',
            alpha: 0,
            scaleY: 1.5,
        });
};
