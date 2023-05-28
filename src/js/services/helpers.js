import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(
                new Error(`Request took too long! Timeout after ${s} second`),
            );
        }, s * 1000);
    });
};

export const AJAX = async (url, uploadData = undefined) => {
    try {
        const fetchPro = uploadData
            ? fetch(url, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(uploadData),
              })
            : fetch(url);

        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        if (!res.ok) throw new Error(`${res.status}`);
        const data = await res.json();
        return data;
    } catch (err) {
        throw err;
    }
};
