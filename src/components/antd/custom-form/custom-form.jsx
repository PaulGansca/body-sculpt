import { Form } from 'antd';

const CustomForm = ({formInputItems, formTailItems, handleSubmit }) => {
  const onFinish = (values) => {
    console.log('Success:', values);
    handleSubmit(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="customForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {formInputItems.map(({input, ...inputProps}, idx) => <Form.Item key={idx} {...inputProps}>{input}</Form.Item>)}

      {formTailItems.map(({elem, ...tailProps}, idx) => <Form.Item key={idx} {...tailProps}>{elem}</Form.Item>)}

    </Form>
  );
};

export default CustomForm;