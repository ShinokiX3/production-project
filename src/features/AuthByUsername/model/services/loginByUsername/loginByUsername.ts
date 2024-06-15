import { createAsyncThunk } from '@reduxjs/toolkit';
import i18n from '@/shared/config/i18n/i18n';
import { User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<User>('/login', authData);

        if (!response.data) throw new Error('error');

        dispatch(userActions.setAuthData(response.data));

        // extra.navigate?.('/profile');
        return response.data;
    } catch (error) {
        return rejectWithValue(i18n.t('Неверный логин или пароль'));
    }
});
