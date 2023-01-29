import { refreshToken } from "./cookie";

export function request(url: string, options?: any) {
  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    }
    if (res.status === 403) {
      return refreshToken().then(() => {
        request(url, options);
      });
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
}
