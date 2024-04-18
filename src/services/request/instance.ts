import { API_URL } from '@constants';

interface postRequestParameters {
  url: string;
  body: BodyInit | null | undefined;
}

export async function postRequest({ url, body }: postRequestParameters) {
  return await fetch(`${API_URL}${url}`, { method: 'POST', body: body });
}
