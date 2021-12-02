import React from 'react';
import { configure, cleanup, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from './App';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  configure({ testIdAttribute: 'data-test-id' });
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

test('Renders the TfL Discovery App wrapper', async () => {
  const { container, getByTestId } = render(<App />);
  const appWrapper = getByTestId('app-wrapper');
  expect(appWrapper).toBeInTheDocument();

  const menuWrapper = getByTestId('menu-wrapper');
  expect(menuWrapper).toBeInTheDocument();

  const contentWrapper = getByTestId('content-wrapper');
  expect(contentWrapper).toBeInTheDocument();

  const axeA11yResult = await axe(container, {
    rules: {
      'button-name': { enabled: false },
    }
  });
  expect(axeA11yResult).toHaveNoViolations();
});
