import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { fetchDataBudget, isAuth } from '../utils/comeon';
import { Row, Col } from 'antd';
import moment from 'moment';
import { Redirect } from 'react-router-dom';



const BudgetHistoryTable = () => {

  const incomes = useSelector(state => state.budget.incomes);
  const costs = useSelector(state => state.budget.costs);
  const incomesDateArray = incomes.map(income => income.date);
  const costsDateArray = costs.map(cost => cost.date);
  const datesArray = [...(new Set([...incomesDateArray, ...costsDateArray]))]
    .map(date => moment(date, 'DD-MM-YYYY').format('X'))
    .sort((a, b) => b - a)
    .map(date => moment(date, 'X').format('DD-MM-YYYY'));

  const dataSource = datesArray.map(date => {
    return {
      date: date,
      incomes: incomes.filter(income => income.date === date),
      costs: costs.filter(cost => cost.date === date),
    };
  });
  console.log('dataSource', dataSource);

  const monthsArray = [...(new Set([...datesArray
    .map(date => moment(date, 'DD-MM-YYYY').format('M'))
    .sort((a, b) => b - a)]))];

  console.log('monthsArray ', monthsArray);

  const getAmount = (array, prop) => {
    return getData(array, prop)
      .reduce((previousValue, cur) => previousValue + +cur[prop], 0);
  };

  const getData = (array, prop) => array.reduce((acc, cur) => acc.concat(cur[`${prop}s`]), []);



  const dataSourceForMonths = monthsArray
    .map(month => {

    const children = dataSource.filter(item => moment(item.date,'DD-MM-YYYY').format('MMM') === moment(month, 'M').format('MMM'));
    const amountIncomes = getAmount(children, 'income');
    const amountCosts = getAmount(children, 'cost');

      return {
      month: moment(month, 'M').format('MMM'),
      amountIncomes,
      // amountIncomes: dataSource
      //   .map(income => income.incomes)
      //   .flat()
      //   .filter(income => moment(income.date,'DD-MM-YYYY').format('MMM') === moment(month, 'M').format('MMM'))
      //   .reduce((previousValue, { income }) => previousValue + +income, 0),
      amountCosts,
      budgetDif: amountIncomes - amountCosts,
      children,
    };
  });

  console.log('dataSourceForMonths', dataSourceForMonths);




  useEffect(() => {
    fetchDataBudget();
  }, []);

  const columns = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Incomes',
      dataIndex: 'children',
      key: 'children',
      render: children => (
        <span>
        {getData(children, 'income')
          .map(income => {
            return (
              <div>
                {income.income} - {income.category}
              </div>
            );
          })}
      </span>
      ),
    },
    {
      title: 'Costs',
      dataIndex: 'children',
      key: 'children',
      render: children => (
        <span>
        {getData(children, 'cost')
          .map(cost => {
            return (
              <div>
                {moment(cost.date, 'DD-MM-YYYY').format('DD MMM')} - {cost.cost} - {cost.category}
              </div>
            );
          })}
      </span>
      ),
    },
    {
      title: 'Amount incomes',
      dataIndex: 'amountIncomes',
      key: 'amountIncomes',
    },
    {
      title: 'Amount costs',
      dataIndex: 'amountCosts',
      key: 'amountCosts',
    },
    {
      title: 'Balance',
      dataIndex: 'budgetDif',
      key: 'budgetDif',
    },
  ];

  return isAuth() ? (
    <>
      <Row>
        <Col>
          <Table
            dataSource={dataSourceForMonths}
            columns={columns}
          />
        </Col>
      </Row>
    </>
  ) : (
    <Redirect to="/login"/>
  );
};

export default BudgetHistoryTable;