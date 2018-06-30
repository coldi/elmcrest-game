import uniq from 'lodash/uniq';
import uid from './uid';

describe('modules/utils', () => {
    describe('uid', () => {
        let uids;

        beforeEach(() => {
            uids = [];

            while (uids.length < 1000) {
                uids.push(uid());
            }
        });

        it('should create unique ids', () => {
            expect(uniq(uids).length).toBe(uids.length);
        });

        it('should use given prefix for uid', () => {
            expect(uid('test').startsWith('test-')).toBe(true);
        });
    });
});
