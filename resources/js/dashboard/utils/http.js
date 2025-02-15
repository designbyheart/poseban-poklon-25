import axios from "axios";
import swal from "sweetalert";
import Toasted from "vue-toasted";
import Vue from "vue";
Vue.use(Toasted, {
    theme: "outline",
    position: "bottom-right",
    iconPack: "fontawesome",
    duration: 3000
});

const DEFAULT_HEADERS = {
    "Content-Type": "application/json"
};

const validStatuses = [200, 201, 202, 203, 204, 300, 301, 302, 303, 304];

/*
 * Returns default headers list
 * which will be used with every request.
 */
function getHeaders(multipart = false) {
    let defaultHeaders = DEFAULT_HEADERS;

    if (multipart) {
        defaultHeaders = { "Content-Type": "multipart/form-data" };
    }

    return defaultHeaders;
}

async function successResponse(message, { withReload, isSwal }) {
    if (isSwal) {
        await swal(message, {
            icon: "success",
            closeOnClickOutside: false
        });
    } else {
        Vue.toasted.success(message, {
            icon: "thumbs-up",
            duration: 5000
        });
    }

    if (withReload) {
        setTimeout(() => location.reload(), 1000);
    }
}

const errorResponse = (
    text = "Błąd! Proszę spróbować ponownie lub skontaktować się z administratorem."
) => {
    Vue.toasted.error(text, {
        icon: "exclamation",
        duration: 5000
    });
};

export function checkResponse(
    response,
    { withReload = false, isSwal = false } = {}
) {
    if (validStatuses.includes(response.status)) {
        return successResponse(response.data, { withReload, isSwal });
    }

    let err = new Error(response);
    err.response = response;

    return Promise.reject(err);
}

export function processAPIErrors(e) {
    console.error(e);
    const { status, data } = e.response;
    if (status === 500) {
        errorResponse(data);
    } else {
        errorResponse();
    }
}

export const esc = encodeURIComponent;

export function qs(params) {
    return Object.keys(params)
        .map(k => esc(k) + "=" + esc(params[k]))
        .join("&");
}

/*
 * Wraps axios and provides
 * more convenient post method
 * calls with data
 */
export function post(uri, data) {
    return axios.post(uri, data, {
        headers: getHeaders(),
        withCredentials: true
    });
}

/*
 * Wraps axios and provides
 * more convenient put method
 * calls with data
 */
export function put(uri, data) {
    return axios.put(uri, data, {
        headers: getHeaders(),
        withCredentials: true
    });
}

/*
 * Wraps axios and provides
 * more convenient delete method
 */
export function remove(uri) {
    return axios.delete(uri, {
        headers: getHeaders(),
        withCredentials: true
    });
}

/*
 * Wraps axios and provides
 * more convenient get method
 * calls with data.
 */
export function get(uri, data = {}) {
    if (Object.keys(data).length > 0) {
        uri = `${uri}?${qs(data)}`;
    }

    return axios.get(uri, {
        headers: getHeaders(),
        withCredentials: true
    });
}

export function upload(uri, data) {
    return axios.post(uri, data, {
        headers: getHeaders(true),
        withCredentials: true
    });
}

// Means endpoint
export function e(uri) {
    return BASE_URL + uri;
}
