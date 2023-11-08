import React from "react";
import { Icon } from "@/components";

export default function LoadingExplorePage() {
  return (
    <div className="w-full h-screen bg-white dark:bg-dark-gray opacity-80 flex items-center justify-center">
      <div className="animate-pulse mx-auto ">
        <Icon name="logo" width="80" height="80" />
      </div>
    </div>
  );
}
