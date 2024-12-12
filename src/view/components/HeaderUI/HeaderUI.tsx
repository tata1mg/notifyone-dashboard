import React, { Fragment } from 'react';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import notifyoneLogo from 'src/assets/image/logo.png';

const HeaderUI = () => {
  return (
    <Fragment>
      <Row className="px-2 py-1" align="middle" justify="center">
        <Col>
          <Link replace={true} to={'/home'}>
            <img
              className="max-h-[4rem]"
              data-testid="unified-admin-logo"
              src={notifyoneLogo}
              alt={'notifyone_logo'}
            />
          </Link>
        </Col>
        {/* <Col>
          {name &&
            `${intl.formatMessage({
              id: 'welcome',
            })} ${username}`}
          &nbsp; &nbsp;
          <Select
            data-testid="select-locales"
            defaultValue={LOCALES.ENGLISH}
            onChange={changeLocale}
            value={locale}
          >
            {Object.values(LOCALES).map((key) => (
              <Option data-testid="select-locales-option" key={key} value={key}>
                {key}
              </Option>
            ))}
          </Select>
        </Col> */}
      </Row>

      {/* <Outlet /> */}
    </Fragment>
  );
};

export default HeaderUI;
