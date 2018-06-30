const makePropReceiver = (context, nextProps) => (key, ignorePrev = false) => {
    const nextValue = nextProps[key];

    if (nextValue === undefined) {
        return false;
    }

    return ignorePrev
        ? true
        : nextValue !== context.props[key];
};

export default makePropReceiver;
