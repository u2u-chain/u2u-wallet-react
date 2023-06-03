import React, {useEffect} from "react";
import {Card, Typography} from "antd";
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {loadAccountBalance} from "@/redux/actions/app.actions.ts";

export default function AssetsPage() {
  const {isLoggedIn} = useAppSelector(state => state.auth);
  const {balance} = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) dispatch(loadAccountBalance());
  }, [isLoggedIn]);

  return (
    <>
      <Card>
        {balance} bars
      </Card>
    </>
  )
}
