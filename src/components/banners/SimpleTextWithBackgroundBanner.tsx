import React from "react";
import Image from "next/image";
import TextsVariants from "../texts/TextsVariants";
import { handleImageLoad } from "@/utils/handleImageLoad";
import { useTranslations } from "next-intl";

interface SimpleImageWithTextBannerProps {
  type: "normal" | "cover";
}

export const SimpleTextWithBackgroundBanner: React.FC<SimpleImageWithTextBannerProps> = ({ type }) => {
  const imageRef1 = React.useRef(null);
  const t = useTranslations("");

  if (type == "normal") {
    return (
      <div
        className={`flex justify-center text-center bg-[url(/img/wallpaper/cientistamenina.jpg)] py-28 object-cover bg-cover w-full relative `}
      >
        <TextsVariants
          textCenter={true}
          text={t("ComoBanner")}
          variant="bannerParagraph"
          extraClassName="max-w-[80rem] px-4"
          color="text-white"
        />
        <Image
          src="/img/grafismos/onda_3.svg"
          alt={t("Outros.ondinhas")}
          sizes="100%"
          className="max-h-[51.875rem] absolute -bottom-8 md:-bottom-16 xl:-bottom-32 -z-10"
          placeholder="blur"
          blurDataURL="data:..."
          width={1300}
          height={142}
          onLoad={() => handleImageLoad(imageRef1)}
        />
      </div>
    );
  } else {
    return (
      <div
        className={`flex justify-start text-start bg-[url(/img/wallpaper/cientistamenina.jpg)] pt-[6.5rem] pb-10 object-cover bg-cover w-full relative mt-20`}
      >
        <TextsVariants
          textCenter={true}
          text={t("Noticias.bannerTitle")}
          variant="titleH1Bold"
          extraClassName=" px-4 w-full border-b border-white text-start max-w-[33.875rem] ml-4"
          color="text-white"
        />
      </div>
    );
  }
};
