import React from 'react';

const ReportTitle = ({ fontSize, title }) => {
  const style = {
    'text-align': 'center'
  };

  return (
    fontSize === "h4" ? <h4 style={style}>{title}</h4> : <h5 style={style}>{title}</h5>
  )
}

export default ReportTitle;