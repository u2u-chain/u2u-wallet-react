import React, {ReactNode} from "react";
import {useAppSelector} from "@/redux/store.ts";

interface CurrencyWrapperProps {
  children: ReactNode
}

export default function CurrencyWrapper({children}: CurrencyWrapperProps) {
  const {currencyLoading} = useAppSelector(state => state.app);
  if (currencyLoading) return <>--</>
  return <>
    {children}
  </>
}
