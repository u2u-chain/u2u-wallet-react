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
      console.log(response);
      message.error('INVALID_PRIVATE_KEY');
    } else {
      console.log(response);
    }
  }

  return <>
    <Form
      form={form}
      layout={'vertical'}
      onFinish={onFinish}
    >
      <Form.Item label={'Private Key'} name={'privateKey'}>
        <Input placeholder={'302e02100300...'}/>
      </Form.Item>
      <Form.Item label={'Account ID'} name={'accountId'}>
        <Input placeholder={'Shard.Realm.Num'}/>
      </Form.Item>
      <Form.Item>
        <Button size={'large'} shape={'round'} type={'primary'} htmlType={'submit'}>
          Continue
        </Button>
      </Form.Item>
    </Form>
  </>
}
