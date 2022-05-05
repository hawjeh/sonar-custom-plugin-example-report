import React from 'react';
const sonarqube_logo = require('file-loader?name=[hash].[ext]&publicPath=/static/websparks/!./assets/sonarqube-logo.png');

const Logo = () => {
  const style = {
    'display': 'block',
    'margin-left': 'auto',
    'margin-bottom': '1.5rem'
  };

  return (
    <img style={style} width="135" height="50" alt="SonarQube Logo" src={sonarqube_logo} title="SonarQube Logo" />
  )
}

export default Logo;