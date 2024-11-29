"use client";

import React, { FC, memo } from "react";
import TextsVariants from "../texts/TextsVariants";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";

const MainBanner: FC = () => {
  const imageRef1 = React.useRef(null);
  const t = useTranslations("MainBanner");
  const { theme } = useTheme();

  const handleScrollToContato = (event: React.MouseEvent) => {
    event.preventDefault();
    const contatoElement = document.getElementById("contato");
    if (contatoElement) {
      contatoElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleImageLoad = (ref: React.MutableRefObject<any>) => {
    ref.current.dataset.loaded = "true";
  };

  return (
    <div
      className="relative bg-no-repeat bg-cover flex justify-center items-center"
      style={{
        backgroundImage:
          theme == "light" ? `url(/img/wallpaper/meninasStemLIGHT.png)` : `url(/img/wallpaper/meninasStem.png)`,
      }}
    >
      <div className="px-4 sm:px-6 md:px-[9.875rem]  absolute top-12 sm:top-32 w-full flex justify-center gap-4 section">
        <Image
          src={"/img/logoMeninasSTEM.png"}
          alt="Logo Meninas STEM"
          width={300}
          height={200}
          quality={100}
          className="w-[10rem] sm:w-[16rem] h-auto mx-auto"
        />
      </div>
      <div className="flex flex-col items-center justify-center h-[90vh] overflow-hidden w-full">
        <div className="flex flex-col gap-4 items-center max-w-[60rem] relative">
          <TextsVariants
            color=""
            text={t("topTitle")}
            variant="topTitle"
            showLine={false}
            extraClassName="text-center"
          />
          <TextsVariants color="" variant="titleH1Bold" text={t("title")} textCenter={true} />
          <div className="max-w-[40.9375rem]">
            <TextsVariants color="" variant="titleBold" text={t("paragraph")} textCenter={true} />
          </div>
          <Link onClick={handleScrollToContato} href={"#contato"} className={buttonVariants({ variant: "default" })}>
            {t("buttonText")}
          </Link>
        </div>
        <div className="w-full absolute bottom-0">
          <Image
            ref={imageRef1}
            src="/img/grafismos/onda_1.svg"
            alt={t("ondinhas")}
            width={1300}
            height={142}
            className=" h-auto blur-up"
            quality={100}
            sizes="1300px"
            placeholder="blur"
            blurDataURL="data:..."
            onLoad={() => handleImageLoad(imageRef1)}
          />
        </div>
      </div>
    </div>
  );
};

const MemoizedMainBanner = memo(MainBanner);
MemoizedMainBanner.displayName = "MainBanner";

export default MemoizedMainBanner;
