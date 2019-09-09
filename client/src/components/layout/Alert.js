import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { alerts } = alertContext;

  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.id} className={alert.type} style={{ padding: 10 }}>
        {alert.msg.toUpperCase()}
      </div>
    ))
  );
};

export default Alert;
