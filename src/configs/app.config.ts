
import {
  faCloudArrowDown,
  faCloudArrowUp,
  faFileExport,
  faMoneyBillTransfer,
  faUserPlus,
  faChalkboardUser
} from "@fortawesome/pro-solid-svg-icons";
export const COIN_CODE = 'usd';

export const TOOlS_LIST = [
  {
    key: 'associate-token',
    name: 'Associate Token',
    link: '/wallet/tools/associate-token',
    description: 'To send or receive a token, you need to first associate your account with the token',
    icon: faChalkboardUser
  }, {
    key: 'create-account',
    name: 'Create Account',
    link: '/wallet/tools/create-account',
    description: 'Create an account for a public key',
    icon: faUserPlus
  }, {
    key: 'upload',
    name: 'Upload',
    link: '/wallet/tools/upload',
    description: 'Upload a file to HFS',
    icon: faCloudArrowUp
  }, {
    key: 'download',
    name: 'Download',
    link: '/wallet/tools/download',
    description: 'Download a file from HFS',
    icon: faCloudArrowDown
  }, {
    key: 'convert-units',
    name: 'Convert Units',
    link: '/wallet/tools/convert-units',
    description: 'Our helpful conversion tool and hbar unit reference allow you to calculate your total transaction cost',
    icon: faMoneyBillTransfer
  }, {
    key: 'export-keystore',
    name: 'Export Keystore',
    link: '/wallet/tools/export-keystore',
    description: 'Export a keystore file for your current wallet',
    icon: faFileExport
  },
]
