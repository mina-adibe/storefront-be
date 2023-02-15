interface Error {
  statusCode?: number;
  status?: string;
  message?: string;
  stack?: string;
  name?: string;
}

export default Error;
