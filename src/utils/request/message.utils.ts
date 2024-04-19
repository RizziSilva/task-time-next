export function getErrorMessage(error: any, defaultMessage: string): string {
  let message: string = defaultMessage;

  if (error instanceof Error) message = error.message;

  return message;
}
