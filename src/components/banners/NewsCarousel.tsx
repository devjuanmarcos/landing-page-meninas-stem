"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { NewsType, SearchParamsType } from "@/@types/types";
import { getNewsAction } from "@/app/actions/newsActions";
import { NewsCard } from "../ui/newsCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

export const NewsCarousel: React.FC = () => {
  const t = useTranslations("Noticias");
  const [newsData, setNewsData] = useState<NewsType[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const searchParams: SearchParamsType = {
      page: 1,
      size: 6, // Limitamos para mostrar apenas 6 notícias no carrossel
      title: "",
      startDate: "",
      endDate: "",
      category: "",
    };

    async function fetchNews() {
      setLoading(true);
      try {
        const response = await getNewsAction(searchParams);
        const data = response.items as NewsType[];
        if (data && data.length > 0) {
          setNewsData(data);
        } else {
          setNewsData([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center py-10">Carregando notícias...</div>;
  }

  if (newsData.length === 0) {
    return null; // Não exibe nada se não houver notícias
  }

  return (
    <section className="w-full px-5 py-12 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t("bannerTitle")}</h2>
        <a href="/noticias" className="text-primary hover:underline">
          Ver todas
        </a>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-4">
          {newsData.map((news) => (
            <CarouselItem key={news.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="h-full">
                <NewsCard {...news} extraClassName="h-full" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:flex">
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </div>
      </Carousel>
    </section>
  );
};

export default NewsCarousel;
