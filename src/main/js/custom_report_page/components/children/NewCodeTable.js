import React from 'react';
import Icon from '../../../common/icon';
import { getResultTableStyle, getComponentValue, getComponentRating } from '../../../common/helper';

const NewCodeTable = ({ componentData }) => {
  const style = getResultTableStyle();

  return (
    <table style={style.table}>
      <tr style={style.trFirst}>
        <td colspan="7" style={style.tdHead}>
          <h6>
            New Code <span style={style.span}>This shows the security problems detected of the code produced recently</span>
          </h6>
        </td>
      </tr>
      <tr>
        <td style={style.td}>{getComponentValue(componentData, 'new_vulnerabilities')}</td>
        <td style={style.td}>Vulnerabilities</td>
        <td style={style.td}></td>
        <td style={style.td}></td>
        <td style={style.td}></td>
        <td style={style.td}><Icon iconType='vulnerability' /> Security</td>
        <td style={style.td}>{getComponentRating(getComponentValue(componentData, 'new_security_rating'))}</td>
      </tr>
      <tr>
        <td style={style.td}>{getComponentValue(componentData, 'new_security_hotspots')}</td>
        <td style={style.td}>Security Hotspots</td>
        <td style={style.td}><Icon iconType='review' /> {getComponentValue(componentData, 'new_security_hotspots_reviewed')}% Reviewed</td>
        <td style={style.td}></td>
        <td style={style.td}></td>
        <td style={style.td}><Icon iconType='hotspot' /> Security review</td>
        <td style={style.td}>{getComponentRating(getComponentValue(componentData, 'new_security_review_rating'))}</td>
      </tr>
    </table>
  )
}

export default NewCodeTable;