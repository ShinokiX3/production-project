import { addDecorator } from "@storybook/react";
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator';
import { TranslationDecorator } from '../../src/shared/config/storybook/TranslationDecorator';
import { Theme } from '../../src/app/providers/ThemeProvider';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layot: 'fullscreen',
  themes: {
    default: 'light',
    list: [
      { name: 'light', class: Theme.LIGHT, color: '#FFFFFF' },
      { name: 'dark', class: Theme.DARK, color: '#000000' },
      { name: 'orange', class: Theme.ORANGE, color: '#FFB005' },
    ],
  }
}

addDecorator(StyleDecorator);
addDecorator(RouterDecorator);
addDecorator(TranslationDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(SuspenseDecorator);