import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { ROUTES } from '@constants';
import { Sidebar } from './sidebar.component';
import { SIDEBAR_OPTIONS, TEST_IDS } from './sidebar.constant';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => {},
}));

describe('Sidebar component tests', () => {
  it('Render sidebar correctly', async () => {
    render(<Sidebar />);

    const userNameSpan = await screen.findByTestId(TEST_IDS.USER_NAME);
    const userEmailSpan = await screen.findByTestId(TEST_IDS.USER_EMAIL);
    const links = await screen.findAllByRole('link');
    const logoImages = await screen.findAllByAltText('logo', { exact: false });
    const headerLogo = logoImages[1];

    for (const sidebarOption of SIDEBAR_OPTIONS) {
      const optionLinks = sidebarOption.items;

      for (const optionLink of optionLinks) {
        const page = optionLink.page;
        const link = links.find((element) => element.getAttribute('href') === page);

        expect(link).toBeDefined();
      }
    }

    expect(userNameSpan).toBeInTheDocument();
    expect(userEmailSpan).toBeInTheDocument();
    expect(headerLogo).toBeInTheDocument();
  });

  it('Change page on link click', async () => {
    render(<Sidebar />);

    const links = await screen.findAllByRole('link');
    const link = links.find((link) => link.getAttribute('href') === ROUTES.TIMER);

    if (link) fireEvent.click(link);

    expect(useRouter);
  });
});
