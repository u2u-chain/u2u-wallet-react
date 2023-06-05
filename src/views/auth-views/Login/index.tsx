import React, {useEffect} from "react";
import {Button, Form, Input, message, Typography} from "antd";
import styles from './login.module.css';
import ApiService from "@/services/ApiService.ts";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {doSignIn} from "@/redux/actions/auth.actions.ts";

export default function LoginPage() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    const response = await dispatch(doSignIn(values)) as any;
    if (response.error) {
      message.error(response.error.message);
    } else {
      message.success('Login success');
    }
  }

  return (
    <div style={{width: '100%'}}>
      <Typography.Title level={2} className={styles.title}>
        Sign In
      </Typography.Title>
      <Typography.Paragraph className={styles.description}>
        Sign in to access your U2U Wallet & digital assets...
      </Typography.Paragraph>
      <Form
        form={form}
        className={styles.loginForm}
        layout={'vertical'}
        onFinish={onFinish}
      >
        <Form.Item name={'email'} label={'Email'}>
          <Input
            type={'email'}
            size={'large'}
            placeholder={'example@email.com'}
          />
        </Form.Item>
        <Form.Item name={'password'} label={'Password'}>
          <Input
            size={'large'}
            type={'password'}
            placeholder={'Password...'}
          />
        </Form.Item>
        <Form.Item>
          <Button
            size={'large'}
            type={'primary'}
            shape={'round'}
            htmlType={'submit'}
            className={styles.submitBtn}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
      <Typography.Paragraph>
        Haven't got an account yet? <Link to={'/auth/register'}>Create One</Link>
      </Typography.Paragraph>
    </div>
  )
}
