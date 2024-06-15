interface ToggleFeatures {
    // name: keyof FeatureFlags;
    name: string;
    on: boolean;
}

export const toggleFeatures = ({ name, on }: ToggleFeatures) => on ? name : ''