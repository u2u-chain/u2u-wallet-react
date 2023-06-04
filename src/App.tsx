import './App.css';
import 'antd/dist/reset.css';
import {ConfigProvider, Layout, theme} from "antd";
import React from "react";
import {Provider} from "react-redux";
import {store} from "@/redux/store.ts";
import AppViews from "@/views";

const AppContent = () => {
  return <Layout className={'app-content'}>
    <AppViews/>
  </Layout>
}

export default function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b',
            colorLink: '#00b96b',
            fontFamily: 'Mabry Pro'
          },
          algorithm: theme.darkAlgorithm,
        }}
      >
        <AppContent/>
      </ConfigProvider>
    </Provider>
  )
}
