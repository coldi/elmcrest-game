import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/withLatestFrom';

const storeSubject = new Subject();
export const store$ = Observable.from(storeSubject);

/**
 * Observable middleware for redux that treats the store as an observable
 * by providing a store$ data stream.
 */
const observableMiddleware = ({ dispatch, getState }) => next => action => {
    const prevState = getState();
    const onlyObserve = action.meta && action.meta.onlyObserve;
    const result = onlyObserve
        ? null
        : next(action);

    storeSubject.next({
        action,
        dispatch,
        getState,
        prevState,
    });

    return result;
};

export default observableMiddleware;
