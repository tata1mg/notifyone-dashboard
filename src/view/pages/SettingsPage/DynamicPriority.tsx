import React, { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Button, Space, Spin, Tabs, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import {
  fetchDynamicPriority,
  setDynamicPriority,
} from 'src/store/actions/actions';
const { Title } = Typography;

const DynamicPriority = () => {
  const dispatch = useDispatch();
  const dynamicPriority = useSelector(
    (state: RootState) => state.reducer.dynamicPriority
  );
  const [updatedDynamicPriority, setUpdatedDynamicPriority] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const [channel, setChannel] = useState('email');

  const loading = useSelector((state: RootState) => state.reducer.loading);

  useEffect(() => {
    dispatch(fetchDynamicPriority());
  }, []);

  const getCodeEditor = (provider: any) => {
    return (
      <Space style={{ width: '100%' }} direction="vertical">
        <div className="jsonEditor">
          <Editor
            height="40vh"
            onChange={(updatedCode: any) =>
              setUpdatedDynamicPriority(updatedCode)
            }
            language="python"
            value={editorValue || provider.dynamic_priority}
            lineNumbers={false}
            options={{
              codeLens: false,
              minimap: { enabled: false },
              lineNumbers: 'off',
            }}
            theme="vs-dark"
          />
        </div>
        <Button
          type="primary"
          style={{ width: 240, marginTop: 16 }}
          onClick={() =>
            dispatch(
              setDynamicPriority({
                channel: channel,
                dynamic_priority: updatedDynamicPriority,
              })
            )
          }
        >
          Update Priority
        </Button>
      </Space>
    );
  };

  return (
    <>
      <div className="content-wrapper">
        <Spin spinning={loading}>
          <Space style={{ width: '100%' }} direction="vertical">
            <Title level={3}>
              {dynamicPriority?.title || 'Configure Priority for Providers'}
            </Title>
            <Tabs
              defaultActiveKey="1"
              items={dynamicPriority?.channels?.map(
                (
                  provider: {
                    name: string;
                    code: string;
                    dynamic_priority: string;
                  },
                  index: number
                ) => {
                  return {
                    label: provider.name?.toUpperCase(),
                    key: index,
                    children: <>{getCodeEditor(provider)}</>,
                  };
                }
              )}
              onChange={(selectedTab) => {
                setChannel(dynamicPriority?.channels?.[selectedTab]?.code);
                setUpdatedDynamicPriority(
                  dynamicPriority?.channels?.[selectedTab]?.dynamic_priority
                );
                setEditorValue(
                  dynamicPriority?.channels?.[selectedTab]?.dynamic_priority
                );
              }}
            />
          </Space>
        </Spin>
      </div>
    </>
  );
};

export default DynamicPriority;
