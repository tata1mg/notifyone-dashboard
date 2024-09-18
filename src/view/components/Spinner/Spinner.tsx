import React from 'react';

import './Spinner.css';
import { Spin } from 'antd';

interface SpinnerType {
  className?: string;
  loading: boolean;
}

const Spinner = ({ className, loading }: SpinnerType) => {
  return (
    <div className={`container ${className}`}>
      <div className="center">
        <Spin size="large" spinning={loading} />
      </div>
    </div>
  );
};

export default Spinner;
