export const getQueryParams = (_params: OptionalRecord<string, string>) => {
    const params = new URLSearchParams(window.location.search);
    Object.entries(_params).forEach(([name, value]) => {
        if (value !== undefined) params.set(name, value);
    });
    return `?${String(params)}`;
};

/**
 * @funtion to add query params to search url's
 * @param params
 */

export const addQueryParams = (params: OptionalRecord<string, string>) => {
    window.history.pushState(null, '', getQueryParams(params));
};
