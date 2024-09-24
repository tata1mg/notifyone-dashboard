import React, { useEffect } from 'react';
import { CreateForm } from '@tata1mg/formzen';
import { useDispatch, useSelector } from 'react-redux';
import {
  createAppName,
  fetchAppNameFormStructure,
} from 'src/store/actions/newEvent';
import { RootState } from 'src/store';
import { Spin } from 'antd';
import '../NewEventCreation/index.css';
const AppNameCreation = () => {
  const dispatch = useDispatch();
  const onSubmit = (formData: any) => {
    dispatch(createAppName(formData.create_app));
  };
  const loading = useSelector((state: RootState) => state?.newEvent?.loading);
  const formStructure = useSelector(
    (state: RootState) => state?.newEvent?.formStructure
  );
  const appNameCreated = useSelector(
    (state: RootState) => state?.newEvent?.appNameCreated
  );
  useEffect(() => {
    dispatch(fetchAppNameFormStructure());
  }, [appNameCreated]);

  return (
    <div className="content-wrapper">
      <Spin spinning={loading}>
        <CreateForm
          formConfig={{
            onSubmit: onSubmit,
            formName: `example_form`,
            structure: formStructure,
            mode: 'create', // create | view | edit
          }}
        />
      </Spin>
    </div>
  );
};
export default AppNameCreation;
