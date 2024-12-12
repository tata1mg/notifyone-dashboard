import React, { Fragment, useEffect } from 'react';
import { CreateForm } from '@tata1mg/formzen';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNewEvent,
  fetchCreateEventFormStructure,
} from 'src/store/actions/newEvent';
import { RootState } from 'src/store';
import { Spin } from 'antd';

const NewEventCreation = () => {
  const dispatch = useDispatch();
  const onSubmit = (formData: any) => {
    dispatch(createNewEvent(formData.create_event));
  };
  const loading = useSelector((state: RootState) => state?.newEvent?.loading);
  const formStructure = useSelector(
    (state: RootState) => state?.newEvent?.formStructure
  );
  const eventCreated = useSelector(
    (state: RootState) => state?.newEvent?.eventCreated
  );
  useEffect(() => {
    dispatch(fetchCreateEventFormStructure());
  }, [eventCreated]);

  return (
    <Fragment>
      <div className="content-wrapper">
        <Spin spinning={loading}>
          {formStructure && (
            <CreateForm
              formConfig={{
                onSubmit: onSubmit,
                formName: `create_new_event`,
                structure: formStructure,
                mode: 'create', // create | view | edit
              }}
            />
          )}
        </Spin>
      </div>
    </Fragment>
  );
};
export default NewEventCreation;
