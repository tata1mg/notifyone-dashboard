import React, { Fragment, useEffect, useState } from 'react';
import { CreateForm } from '@tata1mg/formzen';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Spin } from 'antd';
import {
  addProvider,
  fetchAddProvidersFormStructure,
  resetProvidersForm,
} from 'src/store/actions/actions';
const AddProviderForm = ({
  channelCode,
  providerCode,
  onCancel,
}: {
  channelCode: string;
  providerCode: string;
  onCancel: () => void;
}) => {
  const dispatch = useDispatch();
  const onSubmit = (formData: any) => {
    formData?.add_provider &&
      dispatch(
        addProvider(formData.add_provider, () => {
          onCancel?.();
        })
      );
  };
  const formStructure = useSelector(
    (state: RootState) => state?.reducer?.addProviderFormStructure
  );

  const allProvidersLoading = useSelector(
    (state: RootState) => state.reducer.allProvidersLoading
  );

  useEffect(() => {
    dispatch(fetchAddProvidersFormStructure(channelCode, providerCode));
    return () => {
      if (Object.keys(formStructure)?.length) {
        dispatch(resetProvidersForm());
      }
    };
  }, []);

  return (
    <Fragment>
      <Spin spinning={allProvidersLoading}>
        <CreateForm
          formConfig={{
            onSubmit: onSubmit,
            formName: `add_provider`,
            structure: formStructure,
            mode: 'create', // create | view | edit
          }}
        />
      </Spin>
    </Fragment>
  );
};
export default AddProviderForm;
