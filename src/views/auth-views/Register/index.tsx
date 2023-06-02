import React, {useState} from "react";
import {Button, Form, Input, message, Typography} from "antd";
import styles from "@/views/auth-views/Login/login.module.css";
import {Link, useNavigate} from "react-router-dom";
import ApiService from "@/services/ApiService.ts";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    setLoading(true);
    ApiService.createAccount(values).then((response) => {
      navigate('/auth/login');
      message.success(response.message).then(() => {
        setLoading(false);
      });
    }).catch(e => {
      setLoading(false);
      return message.error(e.message);
    });
  }

  return (
    <div>
      <Typography.Title level={2}>
        Create Account
      </Typography.Title>
      <Typography.Text>
        Create account to access your U2U Wallet & digital assets...
      </Typography.Text>
      <Form
        form={form}
        className={styles.loginForm}
        layout={'vertical'}
        onFinish={onFinish}
        disabled={loading}
      >
        <Form.Item name={'fullName'} label={'Full name'}>
          <Input
            size={'large'}
            placeholder={'John Doe'}
          />
        </Form.Item>
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
            loading={loading}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
      <Typography.Paragraph>
        Have an account? <Link to={'/auth/login'}>Login</Link>
      </Typography.Paragraph>
    </div>
  )
}
