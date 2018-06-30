import Papa from 'papaparse';

/**
 * Loads a csv file.
 * @param {string} file
 * @return {Promise<Array>}
 */
export default function loadCSV (file) {
    return new Promise((resolve, reject) => {
        Papa.parse(`assets/payloads/${file}`, {
            download: true,
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            comments: true,
            complete: resolve,
            error: reject,
        });
    });
}
