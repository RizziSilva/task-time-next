export interface PostRequestParameters {
  url: string;
  body: BodyInit | null | undefined;
  isServerSide?: boolean;
}

export interface GetRequestParameters {
  url: string;
  isServerSide?: boolean;
}
