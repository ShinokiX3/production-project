import { ReactElement } from 'react';
import { getFeatureFlag } from '../setGetFeatures';
import { FeatureFlags } from '@/shared/types/feature_flags';

interface ToggleFeaturesProps {
    feature: keyof FeatureFlags;
    on: ReactElement;
    off: ReactElement;
}

export const ToggleFeatures = (props: ToggleFeaturesProps) => {
    const { on, off, feature } = props;

    if (getFeatureFlag(feature)) return on;

    return off;
};
