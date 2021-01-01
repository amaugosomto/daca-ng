import { AUTH_LOGIN, AUTH_REGISTER } from "./types";

export const authLogin = () => ({
  type: AUTH_LOGIN
});

export const authRegister = () => ({
  type: AUTH_REGISTER
});