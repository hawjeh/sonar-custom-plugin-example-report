import React from 'react';
import Logo from '../../../../common/logo';
import ListSnippet from './ListSnippet';
import { getTableStyle } from '../../../../common/helper';

const IssueListTable = ({ title, details, names }) => {
  const style = getTableStyle();

  const printIssueSnippet = (detail, name) => {
    if (detail.issues.length === 0) return;
    return <div className='pagebreak'>
      <Logo />
      <table style={style.table}>
        <tr style={style.trFirst}>
          <td colspan="3" style={style.tdHead}>
            <h6>
              {title} Issues: {name}
            </h6>
          </td>
        </tr>
        {
          detail.issues.map((i) => {
            return (
              <tr>
                <td style={style.tdIssue}>
                  Severity: {i.severity}<br />
                  Status: {i.status} <br /><br />
                  <ListSnippet issue={i} />
                </td>
              </tr>
            )
          })
        }
      </table>
    </div>
  }

  return details.map((i, j) => printIssueSnippet(i, names[j]))

}

export default IssueListTable;