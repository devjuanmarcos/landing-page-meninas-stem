"use client";
import { NewsType, SearchParamsType } from "@/@types/types";
import { getNewsAction } from "@/app/actions/newsActions";
import { useSort } from "@/context/SortContext";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { NewsCard } from "../ui/newsCard";
import Pagination from "../ui/pagination";
import { Skeleton } from "../ui/skeleton";
import { FaTimes } from "react-icons/fa";

export const NewsBanner: React.FC = () => {
  const t = useTranslations("Noticias");
  const { pagination, setPagination, title, setTitle, startAndEndDate, deleteValues, resetPagination } = useSort();
  const [newsData, setNewsData] = React.useState<NewsType[] | []>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [findValue, setFindValue] = React.useState<string>("");

  React.useEffect(() => {
    resetPagination();
    deleteValues();
  }, []);

  React.useEffect(() => {
    const searchParams: SearchParamsType = {
      page: pagination.pageIndex,
      size: pagination.pageSize,
      title: title,
      startDate: startAndEndDate.startDate,
      endDate: startAndEndDate.endDate,
      category: "",
    };

    async function fetch() {
      setLoading(true);
      try {
        const response = await getNewsAction(searchParams);
        const data = response.items as NewsType[];
        console.log("response", response, "Data: ", data);
        if (data && data.length > 0) {
          setNewsData(data);
          setPagination((prev) => ({ ...prev, totalItems: response.total }));
        } else {
          setNewsData([]);
          setPagination((prev) => ({ ...prev, totalItems: 0 }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [pagination.pageIndex, pagination.pageSize, title, startAndEndDate]);

  return (
    <div className="flex flex-col gap-4 w-full  px-5">
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
        }}
        className="w-full max-w-[26.75rem] flex gap-3"
      >
        <div className="relative w-full">
          <input
            className="border border-primary rounded-lg bg-bg-marca100 h-9 placeholder:m-auto pl-2 w-full"
            placeholder={t("pesquisarPlaceholder")}
            onChange={(e) => setFindValue(e.target.value)}
            value={findValue}
          />
          {findValue && (
            <button
              type="button"
              className="absolute right-[3.5rem] h-full top-0 transform -translate-x-20 text-gray-400"
              onClick={() => {
                setFindValue("");
                setTitle("");
              }}
              aria-label="Limpar pesquisa"
            >
              <FaTimes className="h-4 w-4" />
            </button>
          )}
          <button
            className="absolute right-0 top-0 h-9 border border-primary w-fit flex gap-2 items-center justify-center px-2  rounded-lg bg-bg-marca100"
            type="submit"
            onClick={() => {
              setTitle(findValue);
            }}
          >
            <Search className="w-4 h-4" />
            {t("pesquisarBotao")}
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-4 ">
        {loading && Array.from({ length: 8 }, (_, index) => <Skeleton key={index} className="w-full h-[20.75rem]" />)}
        {!loading && newsData.map((news) => <NewsCard {...news} key={news.id} />)}
      </div>
      <Pagination
        currentPage={pagination.pageIndex}
        itemsPerPage={pagination.pageSize}
        totalItems={pagination.totalItems || 0}
      />
    </div>
  );
};
