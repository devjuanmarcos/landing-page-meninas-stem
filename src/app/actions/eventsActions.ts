"use server";

import { GetState, SearchParamsType } from "@/@types/types";
import { findApprovedEvents, findEventById } from "@/services/eventsService";

export async function getEventsAction(searchParams: SearchParamsType): Promise<GetState> {
  try {
    let res;
    res = await findApprovedEvents(searchParams);

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

export async function getEventById(id: string): Promise<GetState> {
  try {
    let res;
    res = await findEventById(id);

    return {
      message: `Dados requisitados com sucesso.`,
      success: true,
      event: res?.data,
    };
  } catch (error) {
    console.log(error);
    return {
      message: `Erro: ${error}`,
      success: false,
    };
  }
}
