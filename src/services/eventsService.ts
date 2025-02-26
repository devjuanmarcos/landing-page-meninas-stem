"use server";
import api from "./axiosNodeApi";
import { EventType, Pagination, SearchParamsType } from "@/@types/types";
import { AxiosResponse } from "axios";

async function getEventsWithParams(
  endpoint: string,
  params: SearchParamsType
): Promise<AxiosResponse<Pagination<EventType>>> {
  const query = new URLSearchParams({
    page: params.page.toString(),
    size: params.size.toString(),
    title: params.title,
    startDate: params.startDate,
    endDate: params.endDate,
    category: params.category,
  }).toString();

  return await api.get(`/events/${endpoint}?${query}`);
}

export async function findApprovedEvents(params: SearchParamsType): Promise<AxiosResponse<Pagination<EventType>>> {
  return getEventsWithParams("approved", params);
}

export async function findEventById(id: string): Promise<AxiosResponse<EventType>> {
  return await api.get(`/events/events-id/${id}`);
}
