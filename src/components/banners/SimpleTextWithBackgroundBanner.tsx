import Image from "next/image";
import TextsVariants from "../texts/TextsVariants";
import { handleImageLoad } from "@/utils/handleImageLoad";
import React from "react";
import { useTranslations } from "next-intl";

export const SimpleTextWithBackgroundBanner = () => {
  const imageRef1 = React.useRef(null);
  const t = useTranslations("");
  return (
    <div
      className={`flex justify-center text-center bg-[url(/img/wallpaper/banner_mar.png)] py-28 object-cover bg-cover w-full relative `}
    >
      <TextsVariants
        textCenter={true}
        text={t("ComoBanner")}
        variant="bannerParagraph"
        extraClassName="max-w-[60rem] px-4"
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
};
