import { Theme } from "@/app/providers/ThemeProvider";

export interface JSONSettings {
    theme?: Theme;
    isFirstVisit?: true;
    isArticlePageWasOpened?: boolean;
}