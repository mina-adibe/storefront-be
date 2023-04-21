interface Error {
  statusCode?: number;
  status?: string | number;
  message?: string;
  stack?: string;
  name?: string;
}

export default Error;
