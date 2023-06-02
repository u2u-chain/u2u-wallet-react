import React, {ReactNode} from "react";
import {Outlet} from "react-router-dom";
import MarketingNavBar from "@/components/layouts/marketing/MarketingNavBar.tsx";

export default function MarketingLayout() {
  return (
    <div>
      <MarketingNavBar/>
      <Outlet/>
    </div>
  )
}
