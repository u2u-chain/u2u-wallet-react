import React, {useState} from "react";
import {Button, Form, Input, message, Space, Upload} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileLock} from "@fortawesome/pro-solid-svg-icons";
import {decryptWithPassword} from "@/utils/encrypt.utils.ts";
import {doSignInWithPrivateKey} from "@/redux/actions/auth.actions.ts";
import {useAppDispatch} from "@/redux/store.ts";

export default function LoginWithKeystore() {
  const [password, setPassword] = useState('');
  const [fileContent, setFileContent] = useState('');

  const dispatch = useAppDispatch();

  const onFileInput = async (info) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (event) => {
      setFileContent(event.target?.result as string);
    });
    reader.readAsText(info.fileList[info.fileList.length - 1].originFileObj);
  }

  const finish = async () => {
    try {
      const keystore = JSON.parse(fileContent as string);

      const response = await dispatch(doSignInWithPrivateKey({
        accountId: keystore.accountId,
        privateKey: decryptWithPassword(keystore.privateKey, password),
      })) as any;
      if (response.error) {
        console.log(response);
        message.error('INVALID_PRIVATE_KEY');
      } else {
        message.success('SIGNED_IN');
      }
    } catch (e: any) {
      message.error(e.message || "INVALID_KEYSTORE");
    }
  }

  return <Space direction={'vertical'} style={{width: '100%'}}>
    <Upload.Dragger
      onChange={onFileInput}
      multiple={false}
    >
      <FontAwesomeIcon icon={faFileLock}/> Click or drag keystore file here
    </Upload.Dragger>
    <Input.Password
      value={password}
      placeholder={'Decryption Password'}
      onChange={e => setPassword(e.target.value)}
      size={'large'}
    />
    <Button
      type={'primary'} size={'large'} shape={'round'} block
      style={{
        marginTop: 16
      }}
      onClick={finish}
    >
      Continue...
    </Button>
  </Space>
}
