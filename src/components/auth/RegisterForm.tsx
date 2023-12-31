import React, {useEffect, useState} from "react";
import {Alert, Button, Form, Input, message, Typography} from "antd";
import styles from "@/views/auth-views/Login/login.module.css";
import {Link, useNavigate} from "react-router-dom";
import ApiService from "@/services/ApiService.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/pro-solid-svg-icons";

export default function RegisterForm() {
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

  // useEffect(() => {
  //   HederaService.createMnemonicPrivateKey().then(keys => {
  //     console.log(keys);
  //
  //   });
  // }, []);

  return (
    <>
      <Alert
        type={'info'}
        icon={<FontAwesomeIcon icon={faInfoCircle}/>}
        showIcon={true}
        message={'Your account will be stored on our database, encrypted securely.'}
      />
      <Typography.Paragraph>
      </Typography.Paragraph>
      <Form
        form={form}
        className={styles.loginForm}
        layout={'vertical'}
        onFinish={onFinish}
        disabled={loading}
      >
        <Form.Item
          name={'username'} label={'Username'}
          rules={[{
            pattern: /^[a-zA-Z0-9]+$/,
            message: 'Invalid Username'
          }, {
            min: 3,
            message: 'Username is too short'
          }, {
            max: 40,
            message: 'Username is too long'
          }]}
        >
          <Input
            size={'large'}
            placeholder={'u2user'}
          />
        </Form.Item>
        <Form.Item
          name={'email'} label={'Email'}
          rules={[{
            type: "email",
            message: 'Invalid Email'
          }]}
        >
          <Input
            type={'email'}
            size={'large'}
            placeholder={'example@email.com'}
          />
        </Form.Item>
        <Form.Item
          name={'password'} label={'Password'}
          rules={[{
            min: 8,
            message: 'Password is too short'
          }, {
            max: 100,
            message: 'Password is too long'
          }]}
        >
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
      <Typography.Paragraph style={{color: 'var(--text-light)'}}>
        Have an account? <Link to={'/auth/login'}>Login</Link>
      </Typography.Paragraph>
    </>
  )
}
