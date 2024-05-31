import { getErrorMessage } from './message.utils';

describe('Message utils tests', () => {
  it('Returns default message with no message error', () => {
    const error: any = {};
    const defaultMessage: string = 'Default error message';

    const result: string = getErrorMessage(error, defaultMessage);

    expect(result).toEqual(defaultMessage);
  });

  it('Returns error message with error message error', () => {
    const error: any = { message: 'Error message' };
    const defaultMessage: string = 'Default error message';

    const result: string = getErrorMessage(error, defaultMessage);

    expect(result).toEqual(error.message);
  });
});
