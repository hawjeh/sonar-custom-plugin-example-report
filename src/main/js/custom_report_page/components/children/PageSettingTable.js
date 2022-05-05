import React from 'react';
import { getSettingTableStyle } from '../../../common/helper';

const PageSettingTable = ({ onPresetChange, onCaseStatusChange, onCaseSeverityChange, caseStatuses, caseSeverities, onGenerateClick }) => {
  const style = getSettingTableStyle();

  return (
    <table style={style.table}>
      <tr style={style.tr}>
        <td style={style.tdBold}>Preset</td>
        <td style={style.td}>
          <select onChange={(e) => onPresetChange(e)}>
            <option value="OWASP TOP 10 - 2021">OWASP TOP 10 - 2021</option>
            <option value="OWASP TOP 10 - 2017">OWASP TOP 10 - 2017</option>
          </select>
        </td>
      </tr>
      <tr style={style.tr}>
        <td style={style.tdBold}>Case Statuses</td>
        <td style={style.td}>
          <input type="checkbox"
            defaultChecked={caseStatuses.OPEN}
            onChange={() => onCaseStatusChange('OPEN')}
            style={style.reportCheckboxFirst}
          />
          OPEN |

          <input type="checkbox"
            defaultChecked={caseStatuses.CONFIRMED}
            onChange={() => onCaseStatusChange('CONFIRMED')}
            style={style.reportCheckbox}
          />
          CONFIRMED |

          <input type="checkbox"
            defaultChecked={caseStatuses.REOPENED}
            onChange={() => onCaseStatusChange('REOPENED')}
            style={style.reportCheckbox}
          />
          REOPENED |

          <input type="checkbox"
            defaultChecked={caseStatuses.RESOLVED}
            onChange={() => onCaseStatusChange('RESOLVED')}
            style={style.reportCheckbox}
          />
          RESOLVED |

          <input type="checkbox"
            defaultChecked={caseStatuses.CLOSED}
            onChange={() => onCaseStatusChange('CLOSED')}
            style={style.reportCheckbox}
          />
          CLOSED
        </td>
      </tr>
      <tr style={style.tr}>
        <td style={style.tdBold}>Case Severities</td>
        <td style={style.td}>
          <input type="checkbox"
            defaultChecked={caseSeverities.INFO}
            onChange={() => onCaseSeverityChange('INFO')}
            style={style.reportCheckboxFirst}
          />
          INFO |

          <input type="checkbox"
            defaultChecked={caseSeverities.MINOR}
            onChange={() => onCaseSeverityChange('MINOR')}
            style={style.reportCheckbox}
          />
          MINOR |

          <input type="checkbox"
            defaultChecked={caseSeverities.MAJOR}
            onChange={() => onCaseSeverityChange('MAJOR')}
            style={style.reportCheckbox}
          />
          MAJOR |

          <input type="checkbox"
            defaultChecked={caseSeverities.CRITICAL}
            onChange={() => onCaseSeverityChange('CRITICAL')}
            style={style.reportCheckbox}
          />
          CRITICAL |

          <input type="checkbox"
            defaultChecked={caseSeverities.BLOCKER}
            onChange={() => onCaseSeverityChange('BLOCKER')}
            style={style.reportCheckbox}
          />
          BLOCKER
        </td>
      </tr>
      <tr style={style.tr}>
        <td style={style.td} colspan={2}>
          <button type="button" onClick={(e) => onGenerateClick(e)} style={style.reportBtn}>Generate Report</button>
        </td>
      </tr>
    </table>
  )
}

export default PageSettingTable;