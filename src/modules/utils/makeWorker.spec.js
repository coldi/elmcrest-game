/* eslint-disable  prefer-arrow-callback, func-names */
import makeWorker from './makeWorker';

describe('modules/utils', () => {
    describe('makeWorker', () => {
        const workerInput = 'ping';
        const workerOutput = 'ping pong';
        let work;

        beforeEach(() => {
            work = makeWorker(function () {
                onmessage = (e) => {
                    const firstParam = e.data[0];
                    postMessage(`${firstParam} pong`);
                };
            });
        });

        it('works when called once', () => (
            work(workerInput).then((result) => {
                expect(result).toBe(workerOutput);
            })
        ));

        it('works when called multiple times', () => (
            Promise.all(
                Array.from('abcde').map((char) => (
                    work(`${char} ${workerInput}`).then((result) => {
                        expect(result).toBe(`${char} ${workerOutput}`);
                    })
                ))
            )
        ));
    });
});
