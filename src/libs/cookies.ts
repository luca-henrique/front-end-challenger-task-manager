import nookies from "nookies";

export const addCookie = (field: string, value: string) => {
  nookies.set(null, field, value, { path: "/" });
};

export const removeCookie = (field: string) => {
  nookies.destroy(null, field, { path: "/" });
};
