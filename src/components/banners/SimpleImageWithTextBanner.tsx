import Image from "next/image";
import TextsVariants from "../texts/TextsVariants";
import { handleImageLoad } from "@/utils/handleImageLoad";
import React from "react";

type ButtonContent = {
  text: string;
  link?: string;
  target?: string;
};

type SimpleImageWithTextBanner = {
  type: "col" | "row";
  title?: string;
  paragraph?: string;
  button?: ButtonContent;
};

export const SimpleImageWithTextBanner: React.FC<SimpleImageWithTextBanner> = ({ type, button, paragraph, title }) => {
  const imageRef1 = React.useRef(null);

  if (type == "row")
    return (
      <div
        className={`flex flex-col max-lg:px-8 lg:grid grid-cols-2 max-w-[60rem] gap-8  justify-center text-center w-full items-center `}
      >
        <Image
          src="/img/wallpaper/banner_mar.png"
          alt="Grafismo de onda"
          sizes="100%"
          className="w-auto h-full aspect-video rounded-lg"
          placeholder="blur"
          blurDataURL="data:..."
          width={635}
          height={394}
          onLoad={() => handleImageLoad(imageRef1)}
        />
        <div className="flex flex-col text-left">
          {title && (
            <TextsVariants textCenter={false} text={title} variant="titleH2Bold" extraClassName="max-w-[60rem]" />
          )}
          {paragraph && (
            <TextsVariants
              textCenter={false}
              text={paragraph}
              variant="bannerParagraph"
              extraClassName="max-w-[60rem]"
            />
          )}
        </div>
      </div>
    );
  else {
    return (
      <div className="max-w-[60rem] mx-auto max-lg:px-8">
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
        <Image
          src={"/img/wallpaper/banner_mar.png"}
          alt=""
          width={706}
          height={435}
          className="rounded-[1.25rem] mt-8 mx-auto"
        />
      </div>
    );
  }
};
