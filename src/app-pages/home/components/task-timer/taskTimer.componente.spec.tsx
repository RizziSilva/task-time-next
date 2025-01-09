import { act, fireEvent, render, screen } from '@testing-library/react';
import { TaskTimer } from './taskTimer.componente';
import { FIELD_KEYS, INPUTS_LABELS, TEST_IDS } from '../../constants';

describe('TaskTimer Tests', () => {
  it('Render task title correctly', async () => {
    render(<TaskTimer onTaskCreation={() => {}} />);

    const taskTitleInput = await screen.findByPlaceholderText(INPUTS_LABELS[FIELD_KEYS.TITLE]);
    const descriptionInput = await screen.findByPlaceholderText(
      INPUTS_LABELS[FIELD_KEYS.DESCRIPTION],
    );
    const linkInput = await screen.findByPlaceholderText(INPUTS_LABELS[FIELD_KEYS.LINK]);
    const additionalInputsContainer = await screen.findByTestId(TEST_IDS.ADDITIONAL_INFO_CONTAINER);

    expect(taskTitleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(linkInput).toBeInTheDocument();
    expect(additionalInputsContainer).toBeInTheDocument();
  });

  it('Open and close additional info correctly', async () => {
    render(<TaskTimer onTaskCreation={() => {}} />);

    const additionalInputsButton = await screen.findByTestId(TEST_IDS.ADDITIONAL_INFO_BUTTON);
    const additionalInputsContainer = await screen.findByTestId(TEST_IDS.ADDITIONAL_INFO_CONTAINER);
    const additionalInputsIcon = await screen.findByTestId(TEST_IDS.ADDITIONAL_INFO_ICON);

    expect(additionalInputsContainer).toHaveClass('h-0');
    expect(additionalInputsButton).toBeInTheDocument();
    expect(additionalInputsIcon).toHaveClass('rotate-180');

    act(() => {
      fireEvent.click(additionalInputsButton);
    });

    expect(additionalInputsContainer).toHaveClass('h-full');
    expect(additionalInputsIcon).not.toHaveClass('rotate-180');

    act(() => {
      fireEvent.click(additionalInputsButton);
    });

    expect(additionalInputsContainer).toHaveClass('h-0');
    expect(additionalInputsIcon).toHaveClass('rotate-180');
  });

  it('Change inputs values correctly', async () => {
    render(<TaskTimer onTaskCreation={() => {}} />);

    const taskTitleInput = await screen.findByPlaceholderText(INPUTS_LABELS[FIELD_KEYS.TITLE]);
    const descriptionInput = await screen.findByPlaceholderText(
      INPUTS_LABELS[FIELD_KEYS.DESCRIPTION],
    );
    const linkInput = await screen.findByPlaceholderText(INPUTS_LABELS[FIELD_KEYS.LINK]);
    const title = 'Test title';
    const description = 'Test description';
    const link = 'Test link';

    act(() => {
      fireEvent.change(taskTitleInput, { target: { value: title } });
    });

    act(() => {
      fireEvent.change(descriptionInput, { target: { value: description } });
    });

    act(() => {
      fireEvent.change(linkInput, { target: { value: link } });
    });

    expect(taskTitleInput).toHaveValue(title);
    expect(descriptionInput).toHaveValue(description);
    expect(linkInput).toHaveValue(link);
  });
});
