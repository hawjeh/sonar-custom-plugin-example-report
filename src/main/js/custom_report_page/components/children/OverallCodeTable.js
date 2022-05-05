import React from 'react';
import Icon from '../../../common/icon';
import { getResultTableStyle, getComponentValue, getComponentRating } from '../../../common/helper';

const OverallCodeTable = ({ componentData }) => {
  const style = getResultTableStyle();

  return (
    <table style={style.table}>
      <tr style={style.trFirst}>
        <td colspan="7" style={style.tdHead}>
          <h6>
            Overall Code <span style={style.span}>This shows the security problems detected on the project/application since its inception</span>
          </h6>
        </td>
      </tr>
      <tr>
        <td style={style.td}>{getComponentValue(componentData, 'vulnerabilities')}</td>
        <td style={style.td}>Vulnerabilities</td>
        <td style={style.td}></td>
        <td style={style.td}></td>
        <td style={style.td}></td>
        <td style={style.td}><Icon iconType='vulnerability' /> Security</td>
        <td style={style.td}>{getComponentRating(getComponentValue(componentData, 'security_rating'))}</td>
      </tr>
      <tr>
        <td style={style.td}>{getComponentValue(componentData, 'security_hotspots')}</td>
        <td style={style.td}>Security Hotspots</td>
        <td style={style.td}><Icon iconType='review' /> {getComponentValue(componentData, 'security_hotspots_reviewed')}% Reviewed</td>
        <td style={style.td}></td>
        <td style={style.td}></td>
        <td style={style.td}><Icon iconType='hotspot' /> Security review</td>
        <td style={style.td}>{getComponentRating(getComponentValue(componentData, 'security_review_rating'))}</td>
      </tr>
    </table>
  )
}

export default OverallCodeTable;