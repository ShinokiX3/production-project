import { createAsyncThunk } from '@reduxjs/toolkit';
import i18n from '@/shared/config/i18n/i18n';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { User, userActions } from '@/entities/User';
import { ThunkConfig, ThunkExtraArg } from '@/app/providers/StoreProvider/config/StateSchema';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
		User,
		LoginByUsernameProps,
		ThunkConfig<string>
	>(
		'login/loginByUsername',
		async (authData, thunkApi) => {
			const { dispatch, extra, rejectWithValue } = thunkApi;

			try {
				const response = await extra.api.post<User>('/login', authData);

				if (!response.data) throw new Error('error');

				localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
				dispatch(userActions.setAuthData(response.data));

				// extra.navigate?.('/profile');
				return response.data;
			} catch (error) {
				return rejectWithValue(i18n.t('Неверный логин или пароль'));
			}
		}
	);
