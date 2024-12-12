import React, { useEffect } from 'react';
import { CreateForm } from '@tata1mg/formzen';
import { useDispatch, useSelector } from 'react-redux';
import {
  createApp,
  fetchAppNameFormStructure,
} from 'src/store/actions/newEvent';
import { RootState } from 'src/store';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

const AppNameCreation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (formData: any) => {
    dispatch(createApp(formData.create_app, navigate));
  };
  const loading = useSelector((state: RootState) => state?.newEvent?.loading);
  const formStructure = useSelector(
    (state: RootState) => state?.newEvent?.formStructure
  );

  useEffect(() => {
    dispatch(fetchAppNameFormStructure());
  }, []);

  return (
    <div className="content-wrapper">
      <Spin spinning={loading}>
        <CreateForm
          formConfig={{
            onSubmit: onSubmit,
            formName: `create_new_app`,
            structure: formStructure,
            mode: 'create', // create | view | edit
          }}
        />
      </Spin>
    </div>
  );
};
export default AppNameCreation;
