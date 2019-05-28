import { fieldTypeDefaults } from '../modules/world/definitions';
import { createFieldTypesAction } from '../modules/world';
import loadCSV from '../modules/utils/loadCSV';

/**
 * Registers world field types.
 */
export default function fields(dispatch) {
    return loadCSV('field-types.csv')
        .then(result => result.data)
        .then(data =>
            data.map(fieldType => ({
                ...fieldTypeDefaults,
                ...fieldType,
            }))
        )
        .then(createFieldTypesAction)
        .then(dispatch);
}
