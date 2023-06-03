import React from "react";
import {Button, Form, Input, Select} from "antd";
import {Transaction} from "@/views/app-views/Wallet/Send";


interface TransferFormProps {
  onSubmit: (transaction: Transaction) => any
}

export default function TransferForm(props: TransferFormProps) {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = React.useState(false);

  const values = Form.useWatch([], form);

  React.useEffect(() => {
    if ((values?.recipient?.match(/\./g) || []).length !== 2) {
      return setSubmittable(false);
    }
    form.validateFields({validateOnly: true}).then(() => {
      setSubmittable(true);
    }, () => {
      setSubmittable(false);
    });
  }, [values]);

  return (
    <Form
      form={form}
      layout={'vertical'}
      onFinish={() => props.onSubmit && props.onSubmit({
        ...values,
        amount: parseInt(values.amount)
      })}
    >
      <Form.Item
        name={'recipient'}
        label={'To'}
        rules={[{required: true}]}
      >
        <Input
          size={'large'}
          placeholder={'Recipient ID'}
        />
      </Form.Item>
      <Form.Item
        name={'asset'}
        label={'Asset'}
      >
        <Select
          size={'large'}
        >
          <Select.Option value={'u2u'}>
            U2U
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={'amount'}
        label={'Amount'}
        rules={[{required: true}]}
      >
        <Input
          type={'number'}
          size={'large'}
        />
      </Form.Item>
      <Button block size={'large'} disabled={!submittable} htmlType={'submit'}>
        Add Transaction
      </Button>
    </Form>
  )
}
