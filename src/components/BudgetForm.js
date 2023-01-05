import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { BudgetPerDay, isAuth } from '../utils/comeon';
import { useSelector } from 'react-redux';
import { fetchDataBudget } from '../utils/comeon';
import { Button, DatePicker, Form, Input, message } from 'antd';
import { Budget } from './Budget';
import apiIncomes from '../API/incomes';
import moment from 'moment';
import apiCosts from '../API/costs';


const disabledDate = current => {
  return current > moment().endOf('day');
};

export const BudgetForm = ({ page = 'income' }) => {
  const userId = useSelector(state => state.user.id);
  const userBudget = useSelector(state => state.budget);
  const [form] = Form.useForm();


  useEffect( () => {
    fetchDataBudget();
  },[]);

  const isValidFields = (value, category) => {
    if (!value.trim() || !category.trim()) {
      message.error('Форма не повинна містити порожніх полів');

      return false;
    }

    return true;
  };

  const sendIncomeData = async values => {
    const { income, category, date } = values;

    if (!income.trim() || !category.trim()) {
      message.error('Форма не повинна містити порожніх полів');

      return;
    }

    await apiIncomes.postIncomes({
      userId,
      income,
      category,
      date: moment(date).format('DD-MM-YYYY'),
      incomeId: new Date(),
    });

    message.success('Income added successfully');

  };

  const sendCostData = async values => {
    const { cost, category, date } = values;

    if (!cost.trim() || !category.trim()) {
      message.error('Форма не повинна містити порожніх полів');

      return;
    }

    await apiCosts.postCosts({
      userId,
      cost,
      category,
      date: moment(date).format('DD-MM-YYYY'),
      costId: new Date(),
    });

    message.success('Cost added successfully');

  };

  const onFinish = async values => {
    if(!isValidFields(values[`${page}`], values.category)) return;

    try {
      if(page === 'income') {
        await sendIncomeData(values);
      } else if (page === 'cost') {
        await sendCostData(values);
      }

      form.resetFields();

      await fetchDataBudget();

      console.log('стан стору', userBudget);

    } catch(e) {
      console.log(e);
      message.error('Server error');
    }
  };

  const checkNumber = e => {
    const { target: { value } } = e;

    if (value && !Number(value[value.length-1]) && (value[value.length-1] !== '0')) {
      form.setFieldsValue({ [`${page}`]: value.substring(0, value.length - 1) });
    }
  };

  return isAuth() ? (
    <>
      <Form
        form={form}
        onFinish={ onFinish }
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 12,
        }}
        autoComplete="off"
      >
        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Budget />
          <p>Доступні кошти на день: { BudgetPerDay() }</p>
        </Form.Item>

      <Form.Item
        label={page === 'income' ? 'Надходження' : 'Витрати'}
        name={page}
        rules={[
          {
            required: true,
            message: 'Введіть свої надходження',
          },
        ]}
      >
        <Input
          placeholder={page === 'income' ? 'Надходження' : 'Витрати'}
          onChange={checkNumber}
        />
      </Form.Item>

      <Form.Item
        label="Категорія"
        name="category"
        rules={[
          {
            required: true,
            message: 'Введіть категорію надходжень',
          },
        ]}
      >
        <Input
          placeholder="Категорія"
        />
      </Form.Item>

      <Form.Item
        label="Дата"
        name="date"
        rules={[
          {
            required: true,
            message: 'Введіть дату надходжень',
          },
        ]}
      >
        <DatePicker
        style={{ width: '100%' }}
        disabledDate={disabledDate}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 5,
        }}
      >
        <Button
          htmlType='submit'
          type="primary"
        >
          Додати {page === 'income' ? 'надходження' : 'витрати'}
        </Button>
      </Form.Item>
    </Form>
    </>
    ) : (
    <Redirect to="/login"/>
  );
};
