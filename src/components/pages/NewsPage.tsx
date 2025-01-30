"use client";

import dynamic from "next/dynamic";
import React from "react";

const SimpleTextWithBackgroundBanner = dynamic(() =>
  import("@/components/banners/SimpleTextWithBackgroundBanner").then((mod) => mod.SimpleTextWithBackgroundBanner)
);

const NewsBanner = dynamic(() => import("@/components/banners/NewsBanner").then((mod) => mod.NewsBanner));

const NewsPage: React.FC = () => {
  React.useEffect(() => {
    import("@/components/banners/SimpleTextWithBackgroundBanner");
  }, []);

  return (
    <div className="flex flex-col gap-12 mb-20">
      <React.Suspense>
        <SimpleTextWithBackgroundBanner type="cover" />
      </React.Suspense>

      <NewsBanner />
    </div>
  );
};

export default NewsPage;
