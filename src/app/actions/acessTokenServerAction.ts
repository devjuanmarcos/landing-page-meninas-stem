"use server";

import { cookies } from "next/headers";

export async function getAcessTokenServerAction() {
  return cookies().get("biomob-node-admin.token");
}
