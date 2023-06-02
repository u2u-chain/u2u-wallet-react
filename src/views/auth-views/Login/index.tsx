import React from "react";
import {Button, Form, Input, message, Typography} from "antd";
import styles from './login.module.css';
import ApiService from "@/services/ApiService.ts";
import {Link} from "react-router-dom";

export default function LoginPage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('values', values);
    ApiService.login(values.email, values.password).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
      if (error.response && error.response.data) {
        message.error(error.response.data.message)
      }
    });
  }

  return (
    <div>
      <Typography.Title level={2}>
        Sign In
      </Typography.Title>
      <Typography.Text>
        Sign in to access your U2U Wallet & digital assets...
      </Typography.Text>
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
