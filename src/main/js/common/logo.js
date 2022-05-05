import React, { useState, useEffect } from 'react';
const sonarqube_logo = require('file!./assets/sonarqube-logo.png');

const Logo = () => {
  const style = {
    'display': 'block',
    'margin-left': 'auto',
    'margin-bottom': '1.5rem'
  };

  const [base64Logo, setBase64Logo] = useState();

  useEffect(() => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.onload = function () {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);
      setBase64Logo(canvas.toDataURL());
    };
    img.src = sonarqube_logo;
  }, []);

  return (
    <img style={style} width="135" height="50" alt="SonarQube Logo" src={base64Logo} title="SonarQube Logo" />
  )
}

export default Logo;