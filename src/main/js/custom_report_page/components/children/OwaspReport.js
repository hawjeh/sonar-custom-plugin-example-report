import React from 'react';
import Icon from '../../../common/icon';
import { getResultTableStyle, getOwapsRating } from '../../../common/helper';

const OwaspReport = ({ owaspSelection, owaspData2021, owaspData2017 }) => {
  const style = getResultTableStyle();

  const owaspTop102017 = ["A1 - Injection", "A2 - Broken Authentication", "A3 - Sensitive Data Exposure", "A4 - XML External Entities (XXE)", "A5 - Broken Access Control",
    "A6 - Security Misconfiguration", "A7 - Cross-Site Scripting (XSS)", "A8 - Insecure Deserialization", "A9 - Using Components with Known Vulnerabilities", "A10 - Insufficient Logging & Monitoring"];

  const owaspTop102021 = ["A1 - Broken Access Control", "A2 - Cryptographic Failures", "A3 - Injection", "A4 - Insecure Design", "A5 - Security Misconfiguration",
    "A6 - Vulnerable and Outdated Components", "A7 - Identification and Authentication Failures", "A8 - Software and Data Integrity Failures", "A9 - Security Logging and Monitoring Failures", "A10 - Server-Side Request Forgery"];

  const owaspTop10Name = owaspSelection === '2021' ? owaspTop102021 : owaspTop102017;
  const owaspTop10Detail = owaspSelection === '2021' ? owaspData2021 : owaspData2017;

  const printOwaspTop10 = (top10Name, top10Detail) => {
    return (
      <tr>
        <td style={style.tdCategoryChild}>
          {top10Name}
        </td>
        <td style={style.tdOtherChild}>
        {top10Detail.issues.length === 0 ? '-' : top10Detail.issues.filter(x => x.status !== "CLOSED" && x.status !== "RESOLVED").length} {getOwapsRating(top10Detail)}
        </td>
      </tr>
    )
  }

  return (
    <table style={style.table}>
      <tr style={style.trFirst}>
        <td colspan="3" style={style.tdOwaspHead}>
          <h6>
            {'OWASP Top 10 - ' + owaspSelection}
          </h6>
        </td>
      </tr>
      <tr>
        <td style={style.tdCategory}>
          Categories
        </td>
        <td style={style.tdOther}>
          <Icon iconType='vulnerability' /> Security Vulnerabilities
        </td>
      </tr>
      {owaspTop10Detail.map((i, j) => printOwaspTop10(owaspTop10Name[j], i))}
    </table>
  )
}

export default OwaspReport;