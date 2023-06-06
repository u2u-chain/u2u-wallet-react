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
          key: 'account',
          label: 'Managed',
          children: <RegisterForm/>
        }, {
          key: 'key-pair',
          label: 'Key Pair',
          children: <RegisterWithMnemonic/>
        }]}
      />

    </div>
  )
}
