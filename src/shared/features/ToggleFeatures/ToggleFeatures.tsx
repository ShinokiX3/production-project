import { memo } from 'react'
import { FeatureFlags } from '../../types/feature_flags';
import { getFeatureFlag } from '../setGetFeatures';

interface ToggleFeaturesProps {
    feature: keyof FeatureFlags;
    on: React.ReactElement;
    off: React.ReactElement;
}

export const ToggleFeatures = memo((props: ToggleFeaturesProps) => {
    const { feature, on, off } = props;

    return getFeatureFlag(feature) ? on : off;
});
