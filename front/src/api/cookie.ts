import { CookieOptions } from "express";
import { Cookies } from "react-cookie";
// import  from 'react-cookie';
const ck = new Cookies();

const cookieController = {
  save: (name: string, value: any, option?: CookieOptions | undefined) => {
    ck.set(name, value, option);
  },

  get: (name: string) => {
    return ck.get(name);
  },

  remove: (name: string) => {
    ck.remove(name);
  }
}

export { cookieController };
