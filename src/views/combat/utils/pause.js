const pause = (time) => (
    new Promise(resolve => setTimeout(resolve, time))
);

export default pause;
