import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {Card} from "antd";

export default function TransactionsPage() {
  const {transactionId} = useParams();

  useEffect(() => {
    if (transactionId) {
      // TODO: load transaction info
    }
  }, [transactionId]);

  return (<Card>
  </Card>)
}
