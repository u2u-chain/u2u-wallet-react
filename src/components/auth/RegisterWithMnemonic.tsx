import React, {useEffect, useState} from "react";
import HederaService from "@/services/HederaService.ts";
import {Alert, Button, Form, Input, message, Popconfirm, Popover, Space, Typography} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faDownload, faEye, faFileExport, faInfoCircle, faLock} from "@fortawesome/pro-solid-svg-icons";
import {downloadFile} from "@/utils/common.utils.ts";
import {encryptWithPassword} from "@/utils/encrypt.utils.ts";
import ApiService from "@/services/ApiService.ts";
import {useNavigate} from "react-router-dom";

export default function RegisterWithMnemonic() {
  const [form] = Form.useForm();
  const [keys, setKeys] = useState<any>({})
  const [showMnemonic, setShowMnemonic] = useState(true);
  const [showKeys, setShowKeys] = useState(false);
  const [exportEncryptionPassword, setExportEncryptionPassword] = useState('');
  const [exporting, setExporting] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [creationLoading, setCreationLoading] = useState(false);
  const navigate = useNavigate();

  const initialize = async () => {
    const generatedKeys = await HederaService.generateMnemonicPrivateKey();
    setKeys(generatedKeys);
    form.setFieldsValue(generatedKeys);
  };

  useEffect(() => {
    // Generate Mnemonic
    initialize().then(() => null);
  }, []);

  const downloadMnemonic = () => {
    downloadFile('u2u-wallet-mnemonic.txt', keys.mnemonic);
    setShowKeys(true);
    setShowMnemonic(false);
    setShowWarning(false);
  }

  const exportKeystore = async () => {
    if (exportEncryptionPassword.trim().length < 6) {
      message.error('ENCRYPTION_PASSWORD_IS_TOO_SHORT');
      return;
    }
    setExporting(true);
    const data = {
      privateKey: await encryptWithPassword(keys.privateKey, exportEncryptionPassword),
      publicKey: await encryptWithPassword(keys.publicKey, exportEncryptionPassword),
      mnemonic: await encryptWithPassword(keys.mnemonic, exportEncryptionPassword),
    }
    downloadFile('keystore.json', JSON.stringify(data));
    message.success('EXPORTED');
    setExporting(false);
  }

  const copyText = async (txt: string) => {
    return navigator.clipboard.writeText(txt);
  }

  const onFinishCreation = async () => {
    setCreationLoading(true);
    ApiService.createAccountWithPublicKey(keys.publicKey).then(() => {
      message.success('ACCOUNT_CREATED_SUCCESSFULLY');
      navigate('/auth/login');
    }).catch(e => {
      setCreationLoading(false);
      message.error('FAILED_TO_CRATE_ACCOUNT');
    })
  }

  return <Space direction={'vertical'} style={{width: '100%'}}>
    {showWarning && (
      <Alert
        type={'warning'}
        icon={<FontAwesomeIcon icon={faInfoCircle}/>}
        showIcon={true}
        message={'Please store your keys securely to prevent unauthorized accesses.'}
        closable={true}
      />
    )}
    <Form
      layout={'vertical'}
      form={form}
      onFinish={onFinishCreation}
    >
      {showMnemonic ? (
        <Space direction={'vertical'} style={{width: '100%', marginBottom: 10}}>
          <Form.Item label={'Mnemonic phrase'} name={'mnemonic'} style={{marginBottom: 0}}>
            <Input.TextArea
              disabled={true}
              autoSize={{maxRows: 6}}
            />
          </Form.Item>
          <Button
            icon={<FontAwesomeIcon icon={faDownload}/>}
            block
            onClick={downloadMnemonic}
          >
            Save Mnemonic Phrase To Continue...
          </Button>
        </Space>
      ) : (
        <Button
          block style={{marginBottom: 10}} onClick={() => setShowMnemonic(true)}
          icon={<FontAwesomeIcon icon={faEye}/>}
        >
          Display Mnemonic
        </Button>
      )}
      {showKeys && (
        <>
          <Form.Item label={'Public key'} name={'publicKey'}>
            <Input
              disabled={true}
              addonAfter={<>
                <Popover trigger={'click'} content={'Copied'}>
                  <Button type={'text'} size={'small'} onClick={() => copyText(keys.publicKey)}>
                    <FontAwesomeIcon icon={faCopy}/>
                  </Button>
                </Popover>
              </>}
            />
          </Form.Item>
          <Form.Item label={'Private key'} name={'privateKey'}>
            <Input.Password
              disabled={true}
              addonAfter={<>
                <Popover trigger={'click'} content={'Copied'}>
                  <Button type={'text'} size={'small'} onClick={() => copyText(keys.privateKey)}>
                    <FontAwesomeIcon icon={faCopy}/>
                  </Button>
                </Popover>
              </>}
            />
          </Form.Item>
          <Form.Item>
            <Popconfirm
              title={'Have you stored keys securely?'}
              description={'Please make sure that you have saved your keys at a safe place.'}
              okText={"Yes, I'm sure"}
              onConfirm={() => form.submit()}
            >
              <Button type={'primary'} shape={'round'} block size={'large'} loading={creationLoading}>
                Create Account
              </Button>
            </Popconfirm>
          </Form.Item>

          <Popover
            content={
              <>
                <Typography.Text>
                  Encryption Password:
                </Typography.Text>
                <Input.Password
                  value={exportEncryptionPassword}
                  placeholder={'Encryption Password'}
                  onChange={e => setExportEncryptionPassword(e.target.value)}
                  disabled={exporting}
                />
                <Button
                  type={'primary'} block style={{marginTop: 10}}
                  icon={<FontAwesomeIcon icon={faFileExport}/>}
                  onClick={exportKeystore}
                  loading={exporting}
                >
                  Export
                </Button>
              </>
            }
            title="Export keystore"
          >
            <Button
              size={'middle'} shape={'round'} block
              icon={<FontAwesomeIcon icon={faLock}/>}
              loading={exporting}
            >
              Download Keystore
            </Button>
          </Popover>
        </>
      )}
    </Form>
  </Space>
}
