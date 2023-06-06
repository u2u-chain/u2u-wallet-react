import React from "react";
import {Tabs, Typography} from "antd";
import RegisterForm from "@/components/auth/RegisterForm.tsx";
import RegisterWithMnemonic from "@/components/auth/RegisterWithMnemonic.tsx";

export default function RegisterPage() {

  return (
    <div>
      <Typography.Title level={2}>
        Create Account
      </Typography.Title>
      <Typography.Text>
        Create account to access your U2U Wallet & digital assets...
      </Typography.Text>
      <Tabs
        items={[{
          key: 'easy',
          label: 'Easy',
          children: <RegisterForm/>
        }, {
          key: 'advanced',
          label: 'Advanced',
          children: <RegisterWithMnemonic/>
        }]}
      />

    </div>
  )
}
