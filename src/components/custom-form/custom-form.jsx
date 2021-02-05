import { Form } from 'antd';

const CustomForm = ({formInputItems, formTailItems}) => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {formInputItems.map(({input, ...inputProps}) => <Form.Item {...inputProps}>{input}</Form.Item>)}

      {formTailItems.map(({elem, ...tailProps}) => <Form.Item {...tailProps}>{elem}</Form.Item>)}

    </Form>
  );
};

export default CustomForm;