/**
 * App smoke + navigation tests (Vitest).
 *
 * Revives the intent of the original Jest suite, which had been fully
 * commented out (and targeted a previous design: /about and /stats no
 * longer exist). Renders the app with fetch/scrollTo mocked, then walks
 * the main nav asserting each route's path and document title.
 */
import { act, render } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';

describe('renders the app', () => {
  // mocks the fetch API used by the indicator and content pages.
  const jsonMock = vi.fn(() => Promise.resolve({}));
  const textMock = vi.fn(() => Promise.resolve(''));
  const fetchMock = vi.fn(() =>
    Promise.resolve({
      json: jsonMock,
      text: textMock,
    }),
  );

  beforeEach(async () => {
    global.fetch = fetchMock;
    // mocks the scrollTo API used when navigating to a new page.
    window.scrollTo = vi.fn();
    await act(async () => {
      render(<App />);
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the app', () => {
    expect(document.body).toBeInTheDocument();
  });

  it('lands on the About home with the site title', () => {
    expect(window.location.pathname).toBe('/');
    expect(document.title).toBe('About | Aman Thakkar');
  });

  const routes = [
    ['/resume', 'Resume |'],
    ['/projects', 'Projects |'],
    ['/contact', 'Contact |'],
    ['/feed', null],
    ['/blogs', null],
    ['/power-law-oscillator-indicator', null],
  ];

  it.each(routes)('can navigate to %s', async (path, titlePart) => {
    const link = document.querySelector(`a[href="${path}"]`);
    expect(link).not.toBeNull();
    await act(async () => {
      link.click();
    });
    expect(window.location.pathname).toBe(path);
    if (titlePart) {
      // react-helmet-async applies the new title after render.
      await vi.waitFor(() => {
        expect(document.title).toContain(titlePart);
      });
    }
  });

  it('Bitcoin indicator page routes, titles, degrades gracefully', async () => {
    const link = document.querySelector(
      'a[href="/power-law-oscillator-indicator"]',
    );
    await act(async () => {
      link.click();
    });
    expect(window.location.pathname).toBe('/power-law-oscillator-indicator');
    await vi.waitFor(() => {
      expect(document.title).toContain('Bitcoin Indicator |');
    });
    // With live indicator data unavailable (mocked), the page must fall
    // back to its daily PNG snapshot, not a blank screen or crash.
    await vi.waitFor(() => {
      expect(document.body.textContent).toContain('PNG fallback');
    });
  });
});
