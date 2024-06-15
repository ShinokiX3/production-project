import { JSONSettings } from './jsonSettings';
import { FeatureFlags } from '@/shared/types/feature_flags';
import { UserRole } from '../consts/consts';

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];

    features?: FeatureFlags;
    jsonSettings?: JSONSettings; 
}

export interface UserSchema {
    authData?: User;

    _inited: boolean;
}
