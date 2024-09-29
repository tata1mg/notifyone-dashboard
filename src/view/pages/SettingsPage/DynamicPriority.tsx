import React, { useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { Button, Space, Tabs, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { fetchDynamicPriority } from 'src/store/actions/actions';
import { Spinner } from 'src/view/components/Spinner';
const { Title } = Typography;

const DynamicPriority = () => {
  const dispatch = useDispatch();
  const dynamicPriority = useSelector(
    (state: RootState) => state.reducer.dynamicPriority
  );

  const loading = useSelector((state: RootState) => state.reducer.loading);

  useEffect(() => {
    dispatch(fetchDynamicPriority());
  }, []);

  return (
    <>
      {loading ? (
        <Spinner className="h-[calc(100vh-48px-50px)]" loading={loading} />
      ) : (
        <div className="content-wrapper">
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
                    label: provider?.name?.toUpperCase(),
                    key: index,
                    children: (
                      <Space style={{ width: '100%' }} direction="vertical">
                        <div className="jsonEditor">
                          <Editor
                            height="40vh"
                            // onChange={(updatedJson: any) => onPayloadValueUpdate(updatedJson)}
                            language="python"
                            defaultValue={`${provider?.dynamic_priority}`}
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
                          // onClick={() =>
                          // dispatch(
                          //   setProvidersPriority({
                          //     channel: channel,
                          //     providers_priority: order,
                          //   })
                          // )
                          // }
                        >
                          Update Priority
                        </Button>
                      </Space>
                    ),
                  };
                }
              )}
            />
          </Space>
        </div>
      )}
    </>
  );
};

export default DynamicPriority;
