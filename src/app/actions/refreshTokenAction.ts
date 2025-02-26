"use server";

import { RefreshToken } from "@/services/user/refreshTokenService";
import { cookies } from "next/headers";

export async function actionRefreshToken() {
  try {
    const data = await RefreshToken();
    const acessToken = await data.json();

    const setCookieHeader = data.headers.get("Set-Cookie");

    const accessTokenOptions = {
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "none" as const,
      maxAge: 300,
    };

    const refreshTokenOptions = {
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "none" as const,
      maxAge: 604800,
    };

    cookies().set("biomob-node-admin.token", acessToken.accessToken, accessTokenOptions);
    cookies().set("biomob-node-admin.refresh-token", acessToken.refreshToken, refreshTokenOptions);

    if (setCookieHeader) {
      const cookieParts = setCookieHeader.split(";");
      const [name, value] = cookieParts[0].split("=");

      cookies().set(name, value, refreshTokenOptions);
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Erro ao rodar o refreshToken:", error);

    return {
      success: false,
      error: (error as any).message,
    };
  }
}
