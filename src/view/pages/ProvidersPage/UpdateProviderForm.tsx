import React, { Fragment, useEffect } from 'react';
import { CreateForm } from '@tata1mg/formzen';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Spin } from 'antd';
import {
  fetchUpdateProvidersFormStructure,
  updateProvider,
} from 'src/store/actions/actions';
const UpdateProviderForm = ({
  uniqueIdentifier,
  onCancel,
}: {
  uniqueIdentifier: string;
  onCancel: () => void;
}) => {
  const dispatch = useDispatch();
  const onSubmit = (formData: any) => {
    formData?.update_provider &&
      dispatch(
        updateProvider(formData.update_provider, () => {
          onCancel?.();
        })
      );
  };
  const formStructure = useSelector(
    (state: RootState) => state?.reducer?.updateProviderFormStructure
  );

  const allProvidersLoading = useSelector(
    (state: RootState) => state.reducer.allProvidersLoading
  );

  useEffect(() => {
    dispatch(fetchUpdateProvidersFormStructure(uniqueIdentifier));
  }, []);

  return (
    <Fragment>
      <Spin spinning={allProvidersLoading}>
        <CreateForm
          formConfig={{
            onSubmit: onSubmit,
            formName: `update_provider`,
            structure: formStructure,
            mode: 'create', // create | view | edit
          }}
        />
      </Spin>
    </Fragment>
  );
};
export default UpdateProviderForm;
