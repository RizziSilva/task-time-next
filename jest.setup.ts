import '@testing-library/jest-dom';

const originalErrorLog = console.error;

// Supress useFormState usage error in jest test. Nextjs doesnt support useActionState in the current version.
beforeAll(() => {
  console.error = (msg) => !msg.toString().includes('React.useActionState');
});

afterAll(() => {
  console.error = originalErrorLog;
});
