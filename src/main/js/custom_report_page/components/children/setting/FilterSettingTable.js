import React from 'react';
import { getSettingTableStyle, getCaseStatusValue, getCaseSeverityValue } from '../../../../common/helper';

const FilterSettingTable = ({ project, caseStatuses, caseSeverities }) => {
  const style = getSettingTableStyle();

  return (
    <table style={style.table}>
      <tr style={style.tr}>
        <td style={style.tdBold}>Case Statuses</td>
        <td style={style.td}>
          Include: {getCaseStatusValue(caseStatuses, true)}
          <br />
          Exclude: {getCaseStatusValue(caseStatuses, false)}
        </td>
      </tr>
      <tr style={style.tr}>
        <td style={style.tdBold}>Case Severities</td>
        <td style={style.td}>
          Include: {getCaseSeverityValue(caseSeverities, true)}
          <br />
          Exclude: {getCaseSeverityValue(caseSeverities, false)}
        </td>
      </tr>
    </table>
  )
}

export default FilterSettingTable;