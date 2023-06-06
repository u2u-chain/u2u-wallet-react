import React, {useEffect, useState} from "react";
import HederaService from "@/services/HederaService.ts";
import {Alert, Button, Form, Input, message, Modal, Popover, Space, Typography} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faDownload, faEye, faFileExport, faInfoCircle, faLock} from "@fortawesome/pro-solid-svg-icons";
import {downloadFile} from "@/utils/common.utils.ts";
import {encryptWithPassword} from "@/utils/encrypt.utils.ts";
import ApiService from "@/services/ApiService.ts";
import {useNavigate} from "react-router-dom";

export default function RegisterWithMnemonic() {
  const [form] = Form.useForm();
  const [keys, setKeys] = useState<any>({})
  const [exportEncryptionPassword, setExportEncryptionPassword] = useState('');
  const [exporting, setExporting] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [creationLoading, setCreationLoading] = useState(false);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [mnemonic, setMnemonic] = useState('');
  const [accountId, setAccountId] = useState('');

  const initialize = async () => {
    const generatedKeys = await HederaService.generateMnemonicPrivateKey();
    setKeys(generatedKeys);
    setMnemonic(generatedKeys.mnemonic);
  };

  useEffect(() => {
    // Generate Mnemonic
    initialize().then(() => null);
  }, []);

  useEffect(() => {
    console.log('mnemonic', mnemonic)
  }, [mnemonic])

  const downloadMnemonic = () => {
    downloadFile('u2u-wallet-mnemonic.txt', keys.mnemonic);
    ApiService.createAccountWithPublicKey(keys.publicKey).then((value) => {
      setAccountId(value.accountId);
      form.setFieldsValue({
        ...value,
        mnemonic: mnemonic
      });
    }).catch(e => {
      setCreationLoading(false);
      message.error('FAILED_TO_CRATE_ACCOUNT');
    })
    setShowWarning(false);
    setOpenModal(true);
    message.success('ACCOUNT_CREATED_SUCCESSFULLY');
  }

  const exportKeystore = async () => {
    if (exportEncryptionPassword.trim().length < 6) {
      message.error('ENCRYPTION_PASSWORD_IS_TOO_SHORT');
      return;
    }
    setExporting(true);
    const data = {
      accountId,
      privateKey: encryptWithPassword(keys.privateKey, exportEncryptionPassword),
      publicKey: encryptWithPassword(keys.publicKey, exportEncryptionPassword),
    }
    downloadFile('keystore.json', JSON.stringify(data));
    message.success('EXPORTED');
    setExporting(false);
  }

  const copyText = async (txt: string) => {
    return navigator.clipboard.writeText(txt);
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

    <Space direction={'vertical'} style={{width: '100%', marginBottom: 10}}>
      <Input.TextArea
        disabled={true}
        value={mnemonic}
        autoSize={{maxRows: 6}}
      />
      <Button
        icon={<FontAwesomeIcon icon={faDownload}/>}
        type={'primary'}
        shape={'round'}
        block
        onClick={downloadMnemonic}
        loading={creationLoading}
        size={'large'}
      >
        Create Account
      </Button>
    </Space>
    <Modal
      title={'Account'}
      centered
      open={openModal}
      onCancel={() => {
        setOpenModal(false);
        navigate('/auth/login', {replace: true})
      }}
      footer={false}
      okText="Finish"
    >
      <Form
        layout={'vertical'}
        form={form}
      >
        <Form.Item label={'Mnemonic'} name={'mnemonic'}>
          <Input
            disabled={true}
            addonAfter={<>
              <Popover trigger={'click'} content={'Copied'}>
                <Button type={'text'} size={'small'} onClick={() => copyText(mnemonic)}>
                  <FontAwesomeIcon icon={faCopy}/>
                </Button>
              </Popover>
            </>}
          />
        </Form.Item>
        <Form.Item label={'Account ID'} name={'accountId'}>
          <Input
            disabled={true}
            addonAfter={<>
              <Popover trigger={'click'} content={'Copied'}>
                <Button type={'text'} size={'small'} onClick={() => copyText(accountId)}>
                  <FontAwesomeIcon icon={faCopy}/>
                </Button>
              </Popover>
            </>}
          />
        </Form.Item>
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
        <Form.Item label={'Private key'}>
          <Input.Password
            disabled={true}
            value={keys?.privateKey}
            addonAfter={<>
              <Popover trigger={'click'} content={'Copied'}>
                <Button type={'text'} size={'small'} onClick={() => copyText(keys.privateKey)}>
                  <FontAwesomeIcon icon={faCopy}/>
                </Button>
              </Popover>
            </>}
          />
        </Form.Item>
        <Popover content={<>
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
        </>} title="Export keystore">
          <Button
            size={'middle'} shape={'round'} block
            icon={<FontAwesomeIcon icon={faLock}/>}
            loading={exporting}
          >
            Download Keystore
          </Button>
        </Popover>
      </Form>
    </Modal>
  </Space>
}
