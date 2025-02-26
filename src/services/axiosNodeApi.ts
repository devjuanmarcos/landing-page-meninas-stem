"use server";

import { getAcessTokenServerAction } from "@/app/actions/acessTokenServerAction";
import { actionRefreshToken } from "@/app/actions/refreshTokenAction";
import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoginResProps = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: "Bearer";
  "not-before-policy": number;
  session_state: string;
  scope: string;
};

const URL_API: string = process.env.BASE_URL_NODE || "";

const api: AxiosInstance = axios.create({
  withCredentials: true,
  withXSRFToken: true,
  baseURL: URL_API,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: any) => {
    const token = await getAcessTokenServerAction();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token.value}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: (() => void)[] = [];

api.interceptors.response.use(
  (res: any) => {
    return res;
  },
  async (error) => {
    const originalConfig = error.config;

    if (error?.response) {
      if (error?.response?.status === 401 && !originalConfig._retry) {
        if (error?.response?.data?.message === "Invalid credentials") {
          return Promise.reject(error);
        }
        originalConfig._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          try {
            cookies().delete("biomob-node-admin.token");
            await actionRefreshToken();

            failedQueue.forEach((callback) => callback());
            failedQueue = [];

            return api(originalConfig);
          } catch (_error: any) {
            if (
              _error?.response?.data?.message === "No refresh token found" ||
              _error?.response?.data?.message === "Token is not active"
            ) {
              cookies().delete("biomob-node-admin.token");

              if (typeof window !== "undefined") {
                alert("Você foi deslogado por inatividade.");
                redirect("/entrar/integrado");
              } else {
                redirect("/");
              }
            }

            return Promise.reject(_error);
          } finally {
            isRefreshing = false;
          }
        } else {
          return new Promise((resolve, reject) => {
            failedQueue.push(() => {
              resolve(api(originalConfig));
            });
          });
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
