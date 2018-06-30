import createStore from '../../store';
import getCachedFieldByCoord from './selectors/getCachedFieldByCoord';
import getKeyFromCoord from './utils/getKeyFromCoord';

describe('modules/world', () => {
    let getState;

    beforeEach(() => {
        const store = createStore();
        getState = store.getState;
    });

    describe('Given a field gets generated', () => {
        const coord = [1, 2];
        let field;

        describe('Given an field without coord gets generated', () => {
            it('should return null', () => {
                expect(getCachedFieldByCoord(getState())).toBe(null);
            });
        });

        describe('Given an field with coord gets generated', () => {
            beforeEach(() => {
                field = getCachedFieldByCoord(getState(), coord);
            });

            it('should generate a valid field', () => {
                expect(field.coord).toEqual(coord);
                expect(field.elevation).toBeDefined();
                expect(field.climate).toBeDefined();
            });

            it('should cache the generated field', () => {
                const key = getKeyFromCoord(coord);
                expect(getCachedFieldByCoord.cache.get(key)).toBe(field);
            });

            it('should always return the same field for the same coord', () => {
                let nextField;
                for (let i = 0; i < 10; i += 1) {
                    nextField = getCachedFieldByCoord(getState(), coord);
                    expect(nextField).toEqual(field);
                }
            });
        });
    });
});
