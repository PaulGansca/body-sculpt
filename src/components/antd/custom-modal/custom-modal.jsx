import React from 'react';

import { Modal } from 'antd';

const CustomModal = ({children, ...props}) => {
    return (
        <Modal {...props}>
            {children}
        </Modal>
    )
};

export default CustomModal;