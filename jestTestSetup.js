jest.mock(
    'modules/utils/requireScript',
    () => (file) => require(`scripts/${file}`) // eslint-disable-line
);
