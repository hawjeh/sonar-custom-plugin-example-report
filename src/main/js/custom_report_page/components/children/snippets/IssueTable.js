import React from 'react';
import Logo from '../../../../common/logo';
import { getTableStyle, getRating } from '../../../../common/helper';

const IssueTable = ({ title, details, names }) => {
  const style = getTableStyle();

  const printTable = (name, detail) => {
    return (
      <tr>
        <td style={style.tdCategoryChild}>
          {name}
        </td>
        <td style={style.tdOtherChild}>
          {detail.issues.length}
        </td>
        <td style={style.tdOtherChild}>
          {detail.issues.filter(x => x.status === "CLOSED" || x.status === "RESOLVED").length}
        </td>
        <td style={style.tdOtherChild}>
          {detail.issues.length - detail.issues.filter(x => x.status === "CLOSED" || x.status === "RESOLVED").length} {getRating(detail)}
        </td>
      </tr>
    )
  }

  return (
    <div className="pagebreak">
      <Logo />
      <table style={style.table}>
        <tr style={style.trFirst}>
          <td colspan="3" style={style.tdHead}>
            <h6>
              {title}
            </h6>
          </td>
        </tr>
        <tr>
          <td style={style.tdCategory}>
            <b>Categories</b>
          </td>
          <td style={style.tdOther}>
            <b>Issue Found</b>
          </td>
          <td style={style.tdOther}>
            <b>Resolved</b>
          </td>
          <td style={style.tdOther}>
            <b>To Review</b>
          </td>
        </tr>
        {details.map((i, j) => printTable(names[j], i))}
      </table>
    </div>
  )
}

export default IssueTable;