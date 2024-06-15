import { StateSchema } from "@/app/providers/StoreProvider";
import { JSONSettings } from "../types/jsonSettings";
import { buildSelector } from "@/shared/lib/store";

const defaultJSONSettings: JSONSettings = {}

export const [useJSONSettings, getJSONSettings] = 
    buildSelector(state => state.user?.authData?.jsonSettings ?? defaultJSONSettings);

export const [useJSONSettingByKey, getJSONSettingByKey] = 
    buildSelector(
        (state: StateSchema, key: keyof JSONSettings) => state.user?.authData?.jsonSettings?.[key]
    );
