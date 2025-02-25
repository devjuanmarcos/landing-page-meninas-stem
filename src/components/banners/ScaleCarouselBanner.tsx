import React from "react";
import TextsVariants from "../texts/TextsVariants";
import Image from "next/image";
import { EmblaOptionsType } from "embla-carousel";
import { handleImageLoad } from "@/utils/handleImageLoad";
import { SimpleImageWithTextBanner } from "./SimpleImageWithTextBanner";
import { useTranslations } from "next-intl";

export const ScaleCarouselBanner = () => {
  const imageRef1 = React.useRef(null);

  const OPTIONS: EmblaOptionsType = { loop: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  const t = useTranslations("");

  return (
    <div className="relative overflow-hidden w-full">
      <div className="absolute z-0 left-0 ml-[-15rem] sm:block hidden">
        <Image
          src="/img/grafismos/onda_2.svg"
          alt={t("Outros.ondinhas")}
          sizes="100%"
          className="max-h-[51.875rem]"
          placeholder="blur"
          blurDataURL="data:..."
          width={142}
          height={1300}
          onLoad={() => handleImageLoad(imageRef1)}
        />
      </div>

      <div className="md:px-10">
        <div className="flex justify-center">
          <div className="max-w-full flex flex-col gap-[5.3125rem]">
            <div className="max-w-[80rem] mx-auto px-4 sm:px-6 ">
              <TextsVariants
                textCenter={true}
                text={t("OQueEBanner.topTitle")}
                variant="topTitle"
                showLine={true}
                subtitle={t("OQueEBanner.title")}
              />
              <TextsVariants textCenter={true} text={t("OQueEBanner.paragraph")} variant="bannerParagraph" />
            </div>
            <div className="flex flex-col gap-[5.3125rem]">
              <SimpleImageWithTextBanner
                type="row-reverse"
                title={t("ProjetoBanner.title")}
                paragraph={t("ProjetoBanner.paragraph")}
                image="https://biomobtinastorage.blob.core.windows.net/images/meninas-stem.jpg"
                altImage={t("ProjetoBanner.altImage")}
                link={"https://bit.ly/ApoiadoresMeninasSTEM"}
              />
              <SimpleImageWithTextBanner
                type="row"
                title={t("ObjetivoBanner.title")}
                paragraph={t("ObjetivoBanner.paragraph")}
                image="/img/wallpaper/meninascientistas2.jpeg"
                altImage={t("ObjetivoBanner.altImage")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
