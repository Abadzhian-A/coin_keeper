import React from 'react';
import BudgetHistoryTable from '../components/BudgetHistoryTable';
import { Row, Col } from 'antd';

export const MainPage = () => {

  return (
    <>
      <Row>
        <Col>
          <BudgetHistoryTable />
        </Col>
      </Row>
    </>
  );
};