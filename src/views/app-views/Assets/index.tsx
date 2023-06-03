 import React, {useEffect} from "react";
import {Card, Input} from "antd";
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {loadAccountBalance} from "@/redux/actions/app.actions.ts";
 import TokensTable from "@/components/app/assets/TokensTable";



export default function AssetsPage() {
  const {isLoggedIn} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) dispatch(loadAccountBalance());
  }, [isLoggedIn]);

  return (
    <>
      <Card title={'Assets'} extra={<Input.Search placeholder="Search assets" style={{ width: '100%' }} />}>
        <TokensTable />
      </Card>
    </>
  )
}
