"use server";

import { GetState, SearchParamsType } from "@/@types/types";
import { findApprovedNews } from "@/services/newsService";

export async function getNewsAction(searchParams: SearchParamsType): Promise<GetState> {
  try {
    let res;

    res = await findApprovedNews(searchParams);

    return {
      message: `Dados requisitados com sucesso.`,
      success: true,
      items: res?.data.items,
      total: res?.data.pagination.totalItems,
    };
  } catch (error) {
    console.log(error);
    return {
      message: `Erro: ${error}`,
      success: false,
    };
  }
}
