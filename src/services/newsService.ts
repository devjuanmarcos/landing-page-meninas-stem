"use server";
import { NewsType, Pagination, SearchParamsType } from "@/@types/types";
import api from "./axiosNodeApi";
import { AxiosResponse } from "axios";

async function getNewsWithParams(
  endpoint: string,
  params: SearchParamsType
): Promise<AxiosResponse<Pagination<NewsType>>> {
  const query = new URLSearchParams({
    page: params.page.toString(),
    size: params.size.toString(),
    title: params.title,
    startDate: params.startDate,
    endDate: params.endDate,
    category: params.category,
  }).toString();

  console.log(`/news/${endpoint}?${query}`);

  return await api.get(`/news/${endpoint}?${query}`);
}

export async function findApprovedNews(params: SearchParamsType): Promise<AxiosResponse<Pagination<NewsType>>> {
  return getNewsWithParams("approved", params);
}

export async function findNewsById(id: string): Promise<AxiosResponse<NewsType>> {
  return await api.get(`/news/news-id/${id}`);
}
