import { getQueryParams } from './addQueryParams';

describe('shared/url/addQueryParams', () => {
    test('should work with one param', () => {
        const params = getQueryParams({
            value1: 'value1',
        });
        expect(params).toBe('?value1=value1');
    });

    test('should work with multiple params', () => {
        const params = getQueryParams({
            value1: 'value1',
            value2: 'value2',
        });
        expect(params).toBe('?value1=value1&value2=value2');
    });

    test('should work with undefined', () => {
        const params = getQueryParams({
            value1: undefined,
            value2: 'value2',
        });
        expect(params).toBe('?value2=value2');
    });
});
