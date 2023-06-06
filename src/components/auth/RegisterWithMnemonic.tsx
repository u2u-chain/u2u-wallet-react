import React, {useEffect, useState} from "react";
import HederaService from "@/services/HederaService.ts";
import {Alert, Button, Form, Input, message, Modal, Popover, Space, Typography} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faDownload, faEye, faFileExport, faInfoCircle, faLock} from "@fortawesome/pro-solid-svg-icons";
import {downloadFile} from "@/utils/common.utils.ts";
import {encryptWithPassword} from "@/utils/encrypt.utils.ts";
import {useNavigate} from "react-router-dom";

export default function RegisterWithMnemonic() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [keys, setKeys] = useState<any>({})
  const [exportEncryptionPassword, setExportEncryptionPassword] = useState('');
  const [exporting, setExporting] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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
    setOpenModal(true);
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

  return <Space direction={'vertical'} style={{width: '100%'}}>
    <Alert
      type={'warning'}
      icon={<FontAwesomeIcon icon={faInfoCircle}/>}
      showIcon={true}
      message={'Please store your keys securely to prevent unauthorized accesses.'}
      closable={true}
    />
    <Form
      layout={'vertical'}
      form={form}
    >
      <Space direction={'vertical'} style={{width: '100%', marginBottom: 10}}>
        <Form.Item label={'Mnemonic phrase'} name={'mnemonic'} style={{marginBottom: 0}}>
          <Input.TextArea
            disabled={true}
            autoSize={{maxRows: 6}}
          />
        </Form.Item>
        <Button
          icon={<FontAwesomeIcon icon={faDownload}/>}
          type={'primary'}
          block
          onClick={downloadMnemonic}
        >
          Create Account
        </Button>
      </Space>
      <Modal
        title={'Account'}
        centered
        open={openModal}
        onOk={() => {
          setOpenModal(false);
          navigate('/auth/login', {replace: true})
        }}
        onCancel={() => setOpenModal(false)}
        okText="Finish"
      >
        
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
      </Modal>
    </Form>
  </Space>
}
