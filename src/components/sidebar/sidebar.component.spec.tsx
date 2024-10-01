import { act, fireEvent, render, screen } from '@testing-library/react';
import { SidebarContent } from './sidebar.component';
import { SIDEBAR_OPTIONS, TEST_IDS } from './constants/sidebar.constant';

describe('Sidebar component tests', () => {
  it('Render sidebar correctly', async () => {
    render(<SidebarContent />);

    const userNameSpan = await screen.findByTestId(TEST_IDS.USER_NAME);
    const userEmailSpan = await screen.findByTestId(TEST_IDS.USER_EMAIL);
    const links = await screen.findAllByRole('link');
    const logoImages = await screen.findByTestId(TEST_IDS.SIDEBAR_LOGO_IMAGE);

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
    expect(logoImages).toBeInTheDocument();
  });

  it('Render mobile sidebar correctly', async () => {
    render(<SidebarContent />);

    const sidebar = await screen.findByTestId(TEST_IDS.SIDEBAR);
    const openButton = await screen.findByTestId(TEST_IDS.OPEN_MOBILE_SIDEBAR);
    const closeButton = await screen.findByTestId(TEST_IDS.CLOSE_MOBILE_SIDEBAR);

    expect(sidebar).toHaveClass('small-screen:-translate-x-full');

    act(() => {
      fireEvent.click(openButton);
    });

    expect(sidebar).toHaveClass('small-screen:translate-x-0');

    act(() => {
      fireEvent.click(closeButton);
    });

    expect(sidebar).toHaveClass('small-screen:-translate-x-full');
  });
});
