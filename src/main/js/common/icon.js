import React, { useState, useEffect } from 'react';
const vulnerability_icon = require('file!./assets/open-lock.png');
const hotspot_icon = require('file!./assets/shield.png');
const review_icon = require('file!./assets/review.png');
const A_icon = require('file!./assets/A.png');
const B_icon = require('file!./assets/B.png');
const C_icon = require('file!./assets/C.png');
const D_icon = require('file!./assets/D.png');
const E_icon = require('file!./assets/E.png');

const Icon = ({ iconType }) => {
  const style = {
    'display': 'inline-block',
    'padding-right': '0.2rem',
    'width': '20px',
    'height': '20px'
  };

  const icon_style = {
    'display': 'inline-block',
    'padding-left': '0.5rem',
    'width': '15px',
    'height': '15px'
  }

  const [iconStyle, setIconStyle] = useState({});
  const [base64Icon, setBase64Icon] = useState();

  useEffect(() => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.onload = function () {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);
      setBase64Icon(canvas.toDataURL());
    };
    let icon = '';
    if (iconType === 'vulnerability') {
      icon = vulnerability_icon;
    } else if (iconType === 'hotspot') {
      icon = hotspot_icon;
    } else if (iconType === 'review') {
      icon = review_icon;
    } else if (iconType === 'A') {
      icon = A_icon;
    } else if (iconType === 'B') {
      icon = B_icon;
    } else if (iconType === 'C') {
      icon = C_icon;
    } else if (iconType === 'D') {
      icon = D_icon;
    } else if (iconType === 'E') {
      icon = E_icon;
    }

    if (iconType === 'A' || iconType === 'B' || iconType === 'C' || iconType === 'D' || iconType === 'E') {
      setIconStyle(icon_style);
    } else {
      setIconStyle(style);
    }

    img.src = icon;
  }, [iconType]);

  return (
    <img style={iconStyle} alt={iconType + ' icon'} src={base64Icon} title={iconType + ' icon'} />
  )
}

export default Icon;