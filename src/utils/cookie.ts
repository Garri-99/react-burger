import { baseUrl } from "./constants";

export function setCookie(name: string, value: any, props?: any) {
  props = {
    path: "/",
    ...props,
  };
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    /* eslint-disable */
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
    /* eslint-enable */
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const refreshToken = () => {
  return fetch(`${baseUrl}/api/auth/token`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      token: getCookie("refresh"),
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then((res) => {
      setCookie("token", res.accessToken.split("Bearer ")[1]);
      setCookie("refresh", res.refreshToken);
    });
};

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}
