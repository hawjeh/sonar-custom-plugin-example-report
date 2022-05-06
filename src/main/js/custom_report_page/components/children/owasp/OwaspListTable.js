import React from 'react';
import Logo from '../../../../common/logo';
import OwaspListSnippet from './OwaspListSnippet';
import { getOwaspTableStyle } from '../../../../common/helper';

const OwaspListTable = ({ owaspSelection, owaspData2021, owaspData2017 }) => {
  const style = getOwaspTableStyle();

  const owaspTop102017 = ["A1 - Injection", "A2 - Broken Authentication", "A3 - Sensitive Data Exposure", "A4 - XML External Entities (XXE)", "A5 - Broken Access Control",
    "A6 - Security Misconfiguration", "A7 - Cross-Site Scripting (XSS)", "A8 - Insecure Deserialization", "A9 - Using Components with Known Vulnerabilities", "A10 - Insufficient Logging & Monitoring"];

  const owaspTop102021 = ["A1 - Broken Access Control", "A2 - Cryptographic Failures", "A3 - Injection", "A4 - Insecure Design", "A5 - Security Misconfiguration",
    "A6 - Vulnerable and Outdated Components", "A7 - Identification and Authentication Failures", "A8 - Software and Data Integrity Failures", "A9 - Security Logging and Monitoring Failures", "A10 - Server-Side Request Forgery"];

  const owaspTop10Name = owaspSelection === '2021' ? owaspTop102021 : owaspTop102017;
  const owaspTop10Detail = owaspSelection === '2021' ? owaspData2021 : owaspData2017;

  const printOwaspTop10IssueSnippet = (top10Detail, owaspName) => {
    if (top10Detail.issues.length === 0) return;
    return <div className='pagebreak'>
      <Logo />
      <table style={style.table}>
        <tr style={style.trFirst}>
          <td colspan="3" style={style.tdOwaspHead}>
            <h6>
              {'OWASP Top 10 - ' + owaspSelection} Issues: {owaspName}
            </h6>
          </td>
        </tr>
        {
          top10Detail.issues.map((i) => {
            return (
              <tr>
                <td style={style.tdIssue}>
                  Severity: {i.severity}<br />
                  Status: {i.status} <br /><br />
                  <OwaspListSnippet issue={i} />
                </td>
              </tr>
            )
          })
        }
      </table>
    </div>
  }

  return owaspTop10Detail.map((i, j) => printOwaspTop10IssueSnippet(i, owaspTop10Name[j]))

}

export default OwaspListTable;