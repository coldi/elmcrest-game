import FastSimplexNoise from 'fast-simplex-noise';
import { memoizeHash } from '../../utils/memoize';
import makeRng from './makeRng';
import getSeed from '../selectors/getSeed';

const makeNoiseGen = memoizeHash(
    (state, id) => id,
    (state, id, settings) =>
        new FastSimplexNoise({
            min: 0,
            ...settings,
            // every noise generator needs an untouched instance of seeded RNG
            random: makeRng(getSeed(state)).instance,
        })
);

export default makeNoiseGen;
