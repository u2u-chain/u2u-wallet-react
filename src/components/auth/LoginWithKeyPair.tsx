import React from "react";
import {Button, Form, Input, message} from "antd";
import {useAppDispatch} from "@/redux/store.ts";
import {doSignInWithPrivateKey} from "@/redux/actions/auth.actions.ts";

export default function LoginWithKeyPair() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onFinish = async (values: {privateKey: string; accountId: string}) => {
    const response = await dispatch(doSignInWithPrivateKey(values)) as any;
    if (response.error) {
      message.error('INVALID_PRIVATE_KEY');
    } else {
      message.success('SIGNED_IN');
    }
  }

  return <>
    <Form
      form={form}
      layout={'vertical'}
      onFinish={onFinish}
    >
      <Form.Item label={'Private Key'} name={'privateKey'}>
        <Input placeholder={'302e02100300...'} size={'large'}/>
      </Form.Item>
      <Form.Item label={'Account ID'} name={'accountId'}>
        <Input placeholder={'Shard.Realm.Num'} size={'large'}/>
      </Form.Item>
      <Form.Item>
        <Button
          size={'large'} shape={'round'} type={'primary'} htmlType={'submit'}
          block
        >
          Continue...
        </Button>
      </Form.Item>
    </Form>
  </>
}
