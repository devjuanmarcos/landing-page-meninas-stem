"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";

const BarToolsSkeleton = () => {
  return (
    <div className="bg-primary w-full z-50 h-[3.125rem]">
      <div className="flex items-center justify-between px-5 lg:px-[6.25rem] p-2 my-0 mx-auto">
        <div className="flex items-center justify-center   px-2 rounded-md space-x-2">
          <Skeleton className="w-8 h-8  rounded-full" /> {/* VLibras */}
          <Skeleton className="w-20 h-4 " />
          <Skeleton className="w-8 h-8  rounded-md" /> {/* Decrease Font Size */}
          <Skeleton className="w-8 h-8  rounded-md" /> {/* Normalize Font Size */}
          <Skeleton className="w-8 h-8  rounded-md" /> {/* Increase Font Size */}
          <Skeleton className="w-8 h-8  rounded-md" /> {/* Change Theme Button */}
          <Skeleton className="w-8 h-8  rounded-md" /> {/* Libras Button */}
        </div>
        <div className="flex items-center justify-center  px-2 gap-x-4">
          <div className="flex items-center justify-center  px-2 gap-x-4">
            <Skeleton className="w-8 h-8  rounded-full" /> {/* Instagram */}
            <Skeleton className="w-8 h-8  rounded-full" /> {/* LinkedIn */}
            <Skeleton className="w-8 h-8  rounded-full" /> {/* Facebook */}
            <Skeleton className="w-8 h-8  rounded-full" /> {/* Twitter */}
            <Skeleton className="w-8 h-8  rounded-full" /> {/* YouTube */}
            <Skeleton className="w-4 h-4 " /> {/* Separator */}
            <Skeleton className="w-20 h-4 " /> {/* "Baixe o app" text */}
          </div>
          <div className="max-sm:hidden flex items-center justify-center  px-2 gap-x-4">
            <Skeleton className="w-8 h-8  rounded-full" /> {/* Apple App Store */}
            <Skeleton className="w-8 h-8  rounded-full" /> {/* Google Play */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarToolsSkeleton;
