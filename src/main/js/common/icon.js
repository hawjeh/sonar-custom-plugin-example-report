import React, { useState, useEffect } from 'react';
const vulnerability_icon = require('file-loader?name=[hash].[ext]&publicPath=/static/websparks/!./assets/open-lock.png');
const hotspot_icon = require('file-loader?name=[hash].[ext]&publicPath=/static/websparks/!./assets/shield.png');
const review_icon = require('file-loader?name=[hash].[ext]&publicPath=/static/websparks/!./assets/review.png');
const A_icon = require('file-loader?name=[hash].[ext]&publicPath=/static/websparks/!./assets/A.png');
const B_icon = require('file-loader?name=[hash].[ext]&publicPath=/static/websparks/!./assets/B.png');
const C_icon = require('file-loader?name=[hash].[ext]&publicPath=/static/websparks/!./assets/C.png');
const D_icon = require('file-loader?name=[hash].[ext]&publicPath=/static/websparks/!./assets/D.png');
const E_icon = require('file-loader?name=[hash].[ext]&publicPath=/static/websparks/!./assets/E.png');

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
  const [iconUrl, setIconUrl] = useState();

  useEffect(() => {
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

    setIconUrl(icon);
  }, [iconType]);

  return (
    <img style={iconStyle} alt={iconType + ' icon'} src={iconUrl} title={iconType + ' icon'} />
  )
}

export default Icon;