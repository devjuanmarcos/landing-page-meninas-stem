"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import React from "react";

const SimpleTextWithBackgroundBanner = dynamic(() =>
  import("@/components/banners/SimpleTextWithBackgroundBanner").then((mod) => mod.SimpleTextWithBackgroundBanner)
);

const EventsBanner = dynamic(() => import("@/components/banners/EventsBanner").then((mod) => mod.EventsBanner));

const EventsPage: React.FC = () => {
  React.useEffect(() => {
    import("@/components/banners/SimpleTextWithBackgroundBanner");
  }, []);

  const t = useTranslations("");

  return (
    <div className="flex flex-col gap-12 mb-20">
      <React.Suspense>
        <SimpleTextWithBackgroundBanner title={t("Eventos.bannerTitle")} type="cover" />
      </React.Suspense>

      <EventsBanner />
    </div>
  );
};

export default EventsPage;
