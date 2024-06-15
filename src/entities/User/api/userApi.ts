import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '../model/types/user';
import { JSONSettings } from '../model/types/jsonSettings';

interface SetJSONSettingsArgs {
    userId: string;
    jsonSettings: JSONSettings;
}

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        setJSONSettings: build.mutation<User, SetJSONSettingsArgs>({
            query: ({ userId, jsonSettings }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    jsonSettings,
                },
            }),
        }),
        getUserDataById: build.query<User, string>({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const setJSONSettingsMutation =
    userApi.endpoints.setJSONSettings.initiate;

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
