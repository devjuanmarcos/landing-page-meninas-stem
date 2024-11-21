"use client";

import dynamic from "next/dynamic";
import React from "react";
import { ThreeIconWithTextBannersProps } from "../banners/ThreeIconWithTextsBanner";
import { FaCar } from "react-icons/fa";

const MemoizedMainBanner = dynamic(() => import("@banners/MainBanner").then((mod) => mod.default), {
  loading: () => <span>Carregando...</span>,
});
const ScaleCarouselBanner = dynamic(() =>
  import("@banners/ScaleCarouselBanner").then((mod) => mod.ScaleCarouselBanner)
);
const SimpleTextWithBackgroundBanner = dynamic(() =>
  import("@/components/banners/SimpleTextWithBackgroundBanner").then((mod) => mod.SimpleTextWithBackgroundBanner)
);
const SimpleImageWithTextBanner = dynamic(() =>
  import("@/components/banners/SimpleImageWithTextBanner").then((mod) => mod.SimpleImageWithTextBanner)
);
const ThreeIconWithTextsBanner = dynamic(() =>
  import("@/components/banners/ThreeIconWithTextsBanner").then((mod) => mod.ThreeIconWithTextsBanner)
);

const HomePage: React.FC = () => {
  React.useEffect(() => {
    import("@banners/MainBanner");
  }, []);

  return (
    <div className="flex flex-col mb-20">
      <React.Suspense>
        <MemoizedMainBanner />
      </React.Suspense>

      <div className="flex flex-col gap-24 items-center justify-center w-full bg-bg-marca100 rounded-[2.5rem] sm:rounded-[10rem] mt-[-64px]  lg:py-[6.25rem] py-[4.0625rem]  z-10 mb-16">
        <ScaleCarouselBanner />
        <SimpleTextWithBackgroundBanner />
        <SimpleImageWithTextBanner
          type="row"
          title="Impacto do projeto"
          paragraph="Loc David: Os oceanos deixaram este mundo habitável; o ar que respiramos vem deles. Sem o azul dos oceanos,
            não haveria o verde da vida, e você nem estaria aqui! Essas águas abraçam a maior e mais rica biodiversidade
            da Terra, sustentando um som gigante como o mundo."
        />
        <SimpleImageWithTextBanner
          type="col"
          paragraph="Loc David: Os oceanos deixaram este mundo habitável; o ar que respiramos vem deles. Sem o azul dos oceanos,
            não haveria o verde da vida, e você nem estaria aqui! Essas águas abraçam a maior e mais rica biodiversidade
            da Terra, sustentando um som gigante como o mundo."
        />
      </div>
      <ThreeIconWithTextsBanner {...threeIconWithTextBannersData} />
    </div>
  );
};

export default HomePage;

let threeIconWithTextBannersData: ThreeIconWithTextBannersProps = {
  title: "Programas e Actividades",
  topTitle: "Saiba Mais",
  iconCardOne: {
    title: "Capacitação",
    description:
      "O projecto oferece oportunidades de desenvolvimento de habilidades, empoderamento e autonomia financeira, permitindo que essas mulheres se tornem protagonistas de suas próprias vidas por meio de formações.",
    icon: FaCar,
  },
  iconCardTwo: {
    title: "Capacitação",
    description:
      "O projecto oferece oportunidades de desenvolvimento de habilidades, empoderamento e autonomia financeira, permitindo que essas mulheres se tornem protagonistas de suas próprias vidas por meio de formações.",
    icon: FaCar,
  },
  iconCardThree: {
    title: "Capacitação",
    description:
      "O projecto oferece oportunidades de desenvolvimento de habilidades, empoderamento e autonomia financeira, permitindo que essas mulheres se tornem protagonistas de suas próprias vidas por meio de formações.",
    icon: FaCar,
  },
};
