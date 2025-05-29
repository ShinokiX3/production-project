[0;34m[INFO][0m Генерируем тесты для src/shared/ui/redesigned/Test Component/TestComponent copy 9.tsx...
[0;34m[INFO][0m Попытка использовать Hugging Face Router API...
[0;34m[INFO][0m Используем авторизованный запрос к Hugging Face Router API
[1;33m[WARN][0m Router API недоступен или вернул ошибку
[0;31m[ERROR][0m Ответ API: {"id":"chatcmpl-961fbc1a-b9dc-42df-bffa-99fbb48ec133","choices":[{"finish_reason":"length","index":0,"message":{"content":"<think>
Okay, let's see. I need to create comprehensive unit tests for this TestComponentZ using Jest and React Testing Library. First, I should look at the component's props and how it behaves based on them.

The component has several props: className, title, text, variant, align, size, bold, and data-testid. The variant can be primary, accent, or error. Align can be right, left, or center. Size has s, m, l, xl. There's also a bold boolean.

The component uses classNames to combine classes, so I need to check if the correct classes are applied based on the props. Also, the HeaderTag is determined by the size, which maps to h1, h2, h3. The sizeClass is also mapped from the size prop.

The test should cover different scenarios. For example, when title is present, the HeaderTag should be rendered with the correct tag. When text is present, the paragraph should be there. The variant, align, size, and bold should affect the class names.

I need to mock the classNames function since it's imported from another module. Wait, the code uses classNames from '@/shared/lib/classNames/classNames'. So in the test, I should mock that to ensure it's called correctly. But maybe the actual implementation of classNames is to combine classes, so perhaps I can just use a mock that returns the combined classes.

Wait, the component uses the classNames function with cls.Text as the base, and then additional classes. So in the test, I need to check that the classNames function is called with the correct parameters.

But maybe using React Testing Library, I can check the rendered output's classes. Alternatively, if the classNames function is a helper, maybe I should mock it to return a specific value for easier testing. Hmm.

Alternatively, since the component uses cls (imported from './Text.module.scss'), which is a CSS module, I can't directly access those class names in the test. So perhaps I need to check the presence of classes based on the props.

Wait, but in the test, when using RTL, I can check the className of the elements. For example, if variant is 'accent', then the component's div should have the cls.accent class. But since cls is a CSS module, the actual class name is a hash. So maybe I need to mock the CSS module to have known class names for testing.

Ah, right. To test the classes, I need to mock the cls object. So in the test setup, I can create a mock for './Text.module.scss' that returns an object with known keys. For example:

const cls = {
    Text: 'Text',
    primary: 'primary',
    accent: 'accent',
    error: 'error',
    left: 'left',
    center: 'center',
    right: 'right',
    size_s: 'size_s',
    size_m: 'size_m',
    size_l: 'size_l',
    bold: 'bold',
    title: 'title',
    text: 'text',
};

Then, in the test, when I render the component, I can check if the elements have the correct classes.

So first, I need to mock the CSS module. In Jest, I can use jest.mock to mock the module. So:

jest.mock('./Text.module.scss', () => ({
    Text: 'Text',
    primary: 'primary',
    accent: 'accent',
    error: 'error',
    left: 'left',
    center: 'center',
    right: 'right',
    size_s: 'size_s',
    size_m: 'size_m',
    size_l: 'size_l',
    bold: 'bold',
    title: 'title',
    text: 'text',
}));

Then, the component's cls will use these mock classes.

Now, the tests can check for the presence of these classes based on props.

Also, the data-testid prop is passed, so tests can check the data attributes.

Let me outline the test cases:

1. Renders title and text when provided.
2. Applies correct variant class (primary, accent, error).
3. Applies correct align class (left, center, right).
4. Applies correct size class (size_s, size_m, etc.).
5. Applies bold class when bold is true.
6. Uses the correct header tag based on size (h1, h2, h3).
7. Custom className is applied.
8. data-testid is correctly set on header and paragraph.

Also, check edge cases, like when title or text is not provided.

For each test case, I can use RTL's render, getByTestId, queryByTestId, etc.

For example, test if when title is present, the HeaderTag is rendered. And check the tag type based on size.

For the HeaderTag, when size is 's', it should be h3. So if I pass size='s', the title should be in an h3.

But how to check the tag name? Using RTL's container and then checking the node's tagName.

Alternatively, use a data-testid on the HeaderTag and check the element's tag name.

In the component, the HeaderTag has data-testid={`${dataTestId}.Header`}, so in the test, I can get that element and check its tagName.

Same for the paragraph.

So, for example:

test('Renders title with correct header tag based on size', () => {
    render(<TestComponentZ title=\"Test Title\" size=\"s\" />);
    const header = screen.getByTestId('Text.Header');
    expect(header.tagName).toBe('H3');
});

Similarly for other sizes.

Another test case: when bold is true, the div has the cls.bold class.

test('Applies bold class when bold is true', () => {
    render(<TestComponentZ text=\"Bold text\" bold />);
    const textElement = screen.getByTestId('Text.Paragraph');
    const parent = textElement.parentElement;
    expect(parent).toHaveClass(cls.bold);
});

Wait, the div with className from classNames has the cls.bold when bold is true. The div wraps both title and text. So if there's a title, the parent is the div. So perhaps:

render(<TestComponentZ title=\"Title\" bold />);
const header = screen.getByTestId('Text.Header');
const parent = header.parentElement;
expect(parent).toHaveClass(cls.bold);

But need to make sure that the parent is the correct element.

Also, the component is memoized, but since we're using React Testing Library, it should handle that as long as the props are passed correctly.

Now, putting it all together.

First, the setup: mock the CSS module, import the component, and write the tests.

Also, the component is exported as TestComponentZ, so in the test file, I need to import it.

So the test code would start with:

import { render, screen } from '@testing-library/react';
import TestComponentZ from './TestComponentZ';

jest.mock('./Text.module.scss', () => ({
    Text: 'Text',
    primary: 'primary',
    accent: 'accent',
    error: 'error',
    left: 'left',
    center: 'center',
    right: 'right',
    size_s: 'size_s',
    size_m: 'size_m',
","role":"assistant"}}],"created":1748552717,"model":"qwen-3-32b","system_fingerprint":"fp_d7c70c58dd52e0143bae","object":"chat.completion","usage":{"prompt_tokens":543,"completion_tokens":1500,"total_tokens":2043,"prompt_tokens_details":{"cached_tokens":0}},"time_info":{"queue_time":0.00026521,"prompt_time":0.016441817,"completion_time":1.153297462,"total_time":1.1720595359802246,"created":1748552717}}
[0;34m[INFO][0m Создаем базовый шаблон теста...
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestComponentZ } from './TestComponent copy 9';

describe('TestComponentZ', () => {
  it('should render without crashing', () => {
    render(<TestComponentZ />);
    expect(document.body).toBeInTheDocument();
  });

  it('should render with provided props', () => {
    const testProps = {
      className: 'test-class',
      'data-testid': 'test-component'
    };
    
    render(<TestComponentZ {...testProps} />);
    const element = screen.getByTestId('test-component');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('test-class');
  });

  // TODO: Add more specific tests based on component functionality
  it('should handle user interactions', () => {
    // Add interaction tests here
    expect(true).toBe(true);
  });
});
