/** @format */

export default class Consts {
  public static API_ENDPOINT =
    process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '/api';
}
