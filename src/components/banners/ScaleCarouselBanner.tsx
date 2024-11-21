import React from "react";
import TextsVariants from "../texts/TextsVariants";
import Image from "next/image";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "../emblaCarousel/EmblaCarousel";
import { handleImageLoad } from "@/utils/handleImageLoad";

export const ScaleCarouselBanner = () => {
  const imageRef1 = React.useRef(null);

  const OPTIONS: EmblaOptionsType = { loop: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <div className="relative overflow-hidden w-full">
      <div className="absolute z-0 left-0 ml-[-15rem] sm:block hidden">
        <Image
          src="/img/grafismos/onda_2.svg"
          alt="Grafismo de onda"
          sizes="100%"
          className="max-h-[51.875rem]"
          placeholder="blur"
          blurDataURL="data:..."
          width={142}
          height={1300}
          onLoad={() => handleImageLoad(imageRef1)}
        />
      </div>

      <div className="px-4 sm:px-6 md:px-10">
        <div className="flex justify-center">
          <div className="max-w-full flex flex-col gap-[32px]">
            <div className="max-w-[60rem] mx-auto">
              <TextsVariants
                textCenter={true}
                text="EXPOSIÇÃO"
                variant="topTitle"
                showLine={true}
                subtitle="Conheça nossa exposição de obras"
              />
              <TextsVariants
                textCenter={true}
                text="Embarque em uma viagem extraordinária pelas profundezas do oceano e apaixone-se ainda mais por esse universo com seus incontáveis tons azuis repleto de vida, mistérios e uma beleza inigualável."
                variant="bannerParagraph"
              />
            </div>
            <div>
              <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
