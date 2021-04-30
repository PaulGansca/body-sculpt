import { notification } from 'antd';

const customNotification = (type, notificationProps) => {
  notification[type](notificationProps);
};

export default customNotification;