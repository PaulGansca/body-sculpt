import React from 'react';
import { Form } from 'antd';

const CustomForm = React.forwardRef(({children, ...otherProps }, ref) => {
  return (
    <Form
      ref={ref}
      {...otherProps}
    >
      {children}
    </Form>
  );
});

export default CustomForm;