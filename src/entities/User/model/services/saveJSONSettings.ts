import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JSONSettings } from '../types/jsonSettings';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJSONSettings } from '../selectors/jsonSettings';
import { setJSONSettingsMutation } from '../../api/userApi';

export const saveJSONSettings = createAsyncThunk<
    JSONSettings,
    JSONSettings,
    ThunkConfig<string>
>('user/saveJSONSettings', async (jsonSettings, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    const userData = getUserAuthData(getState());
    const currentSettings = getJSONSettings(getState());

    if (!userData || !currentSettings) return rejectWithValue('no data');

    try {
        const response = await dispatch(setJSONSettingsMutation({
            userId: userData.id,
            jsonSettings: {
                ...currentSettings,
                ...jsonSettings,
            },
        })).unwrap();

        if (!response.jsonSettings) return rejectWithValue('no data');

        return response.jsonSettings;
    } catch (error) {
        return rejectWithValue('something went wrong');
    }
});
