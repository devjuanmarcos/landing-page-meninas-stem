"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";

const HeaderSkeleton = () => {
  return (
    <header className="header w-full bg-background h-[3.3125rem] flex items-center justify-center px-4 max-sm:px-2 max-2sm:flex-col-reverse max-2sm:py-1 z-50">
      <div className="px-5 lg:px-[6.25rem] overflow-visible my-0 mx-auto flex items-center justify-center sm:justify-between w-full">
        <Skeleton className="w-6 h-6 lg:hidden mr-4" />

        <Skeleton className="h-12 w-48" />

        <nav className="relative items-center justify-end px-9 w-full gap-6 hidden lg:flex">
          <div className="flex space-x-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-32" />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HeaderSkeleton;
