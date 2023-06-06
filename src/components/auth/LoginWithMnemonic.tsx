import React from "react";
import {Button, Form, Input, message} from "antd";
import HederaService from "@/services/HederaService.ts";
import {doSignInWithPrivateKey} from "@/redux/actions/auth.actions.ts";
import {decryptWithPassword} from "@/utils/encrypt.utils.ts";
import {useAppDispatch} from "@/redux/store.ts";

export default function LoginWithMnemonic() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onFinish = async (values) => {
    const keys = await HederaService.restoreKeyFromMnemonic(values.mnemonic);
    const privateKey = keys.privateKey;
    const accountId = values.accountId;

    const response = await dispatch(doSignInWithPrivateKey({
      accountId: accountId,
      privateKey: privateKey,
    })) as any;
    if (response.error) {
      console.log(response);
      message.error('INVALID_CREDENTIALS');
    } else {
      message.success('SIGNED_IN');
    }
  }

  return <Form
    form={form}
    onFinish={onFinish}
    layout={'vertical'}
  >
    <Form.Item label={'Account ID'} name={'accountId'}>
      <Input placeholder={'Shard.Realm.Num'}/>
    </Form.Item>
    <Form.Item label={'Mnemonic phrases'} name={'mnemonic'}>
      <Input.TextArea placeholder={'Paste your mnemonic phrase here...'}/>
    </Form.Item>
    <Form.Item>
      <Button block type={'primary'} shape={'round'} htmlType={'submit'}>
        Continue...
      </Button>
    </Form.Item>
  </Form>
}
