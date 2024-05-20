export function getErrorMessage(error: any, defaultMessage: string): string {
  let message: string = defaultMessage;
  const hasErrorMessage: boolean = !!error?.message;

  if (hasErrorMessage) message = error.message;

  return message;
}
