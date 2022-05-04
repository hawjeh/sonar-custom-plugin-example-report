/*
 * Copyright (C) 2009-2020 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
// import React from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { findDashboard, findOwasp2017, findOwasp2021 } from "../../common/api";

// export default class SecurityReport extends React.PureComponent {
//   state = {
//     loading: true,
//     project: {},
//     reportSetting: {
//       metrics: 'alert_status,quality_gate_details,bugs,new_bugs,reliability_rating,new_reliability_rating,vulnerabilities,new_vulnerabilities,security_rating,new_security_rating,security_hotspots,new_security_hotspots,security_hotspots_reviewed,new_security_hotspots_reviewed,security_review_rating,new_security_review_rating,code_smells,new_code_smells,sqale_rating,new_maintainability_rating,sqale_index,new_technical_debt,coverage,new_coverage,lines_to_cover,new_lines_to_cover,tests,duplicated_lines_density,new_duplicated_lines_density,duplicated_blocks,ncloc,ncloc_language_distribution,projects,lines,new_lines',
//       owasp: 'a1,a2,a3,a4,a5,a6,a7,a8,a9,a10',
//       caseType: 'VULNERABILITY,BUG',
//       caseStatus: 'OPEN,REOPENED',
//       caseSeverity: 'INFO,MINOR,MAJOR,BLOCKER,CRITICAL'
//     },
//     dashboardData: [],
//     owaspData2017: [],
//     owaspData2021: [],
//   };

//   componentDidMount() {
//     const key = this.props.options.component.key;
//     const branch = this.props.options.branchLike.name;
//     this.setState({
//       project: {
//         key: key,
//         name: this.props.options.component.name,
//         version: this.props.options.component.version,
//         branch: branch
//       }
//     });
//     window.html2canvas = html2canvas;

//     const { metrics, owasp, caseType, caseStatus, caseSeverity } = this.state.reportSetting;

//     Promise.all([
//       findDashboard({ key: key, branch: branch, metrics: metrics }),
//       findOwasp2017({ key: key, branch: branch, owasp: owasp, caseType: caseType, caseStatus: caseStatus, caseSeverity: caseSeverity }),
//       findOwasp2021({ key: key, branch: branch, owasp: owasp, caseType: caseType, caseStatus: caseStatus, caseSeverity: caseSeverity })
//     ]).then(([dashboardData, owaspData2017, owaspData2021]) => {
//       this.setState({
//         loading: false,
//         dashboardData,
//         owaspData2017,
//         owaspData2021
//       });
//     });
//   }

//   getValue(data_type) {
//     // console.log(this.state.data)
//     if (data_type.includes('new_')) {
//       return (this.state.dashboardData && this.state.dashboardData.find(m => m.metric === data_type) && this.state.dashboardData.find(m => m.metric === data_type).period.value) || '-';
//     }
//     return (this.state.dashboardData && this.state.dashboardData.find(m => m.metric === data_type) && this.state.dashboardData.find(m => m.metric === data_type).value) || '-';
//   }

//   getRating(value) {
//     const val = parseInt(value);
//     if (val <= 1) return 'A';
//     if (val <= 2) return 'B';
//     if (val <= 3) return 'C';
//     if (val <= 4) return 'D';
//     if (val >= 5) return 'E';
//     return 'A';
//   }

//   generatePdfReport(filename = 'report.pdf') {
//     var doc = new jsPDF("p", "mm", "a4");
//     var content = document.getElementById("report_wrapper");
//     doc.html(content, {
//       callback: function (doc) {
//         doc.output('save', filename);
//       }
//     });
//   }

//   render() {
//     if (this.state.loading) {
//       return (
//         <div className="page page-limited">
//           Loading...
//         </div>
//       );
//     }

//     return (
//       <div className="page page-limited sanity-check">
//         <br /><br />
//         <button type="button" onClick={() => this.generatePdfReport()}>Generate Report</button>
//         <br /><br />
//         <div id="report_wrapper" style={{ padding: "10px" }}>
//           <p>Project Name</p>
//           <p>{this.state.project.name}</p>
//           <br />
//           <p>Version</p>
//           <p>{this.state.project.version}</p>
//           <br />
//           <p>Branch</p>
//           <p>{this.state.project.branch}</p>
//           <br /><br />
//           <p>Overall Code - This shows the security problems detected on the project/application since its inception</p>
//           <p>Vulnerabilities: {this.getValue('vulnerabilities')}</p>
//           <p>Security Hotspots: {this.getValue('security_hotspots')}</p>
//           <p>Reviewed: {this.getValue('security_hotspots_reviewed')}</p>
//           <br />
//           <p>Security Review: {this.getRating(this.getValue('security_rating'))}</p>
//           <p>Security Review Rating: {this.getRating(this.getValue('security_review_rating'))}</p>
//           <br /><br />
//           <p>New Code - This shows the security problems detected of the code produced recently</p>
//           <p>Vulnerabilities: {this.getValue('new_vulnerabilities')}</p>
//           <p>Security Hotspots: {this.getValue('new_security_hotspots')}</p>
//           <p>Reviewed: {this.getValue('new_security_hotspots_reviewed')}</p>
//           <br />
//           <p>Security Review: {this.getRating(this.getValue('new_security_rating'))}</p>
//           <p>Security Review Rating: {this.getRating(this.getValue('new_security_review_rating'))}</p>
//           <br /><br /><br />
//           <p>OWASP Top 10 2017 Perspective</p>
//           <br />
//           <p>A1: Injection </p>
//           <p>A2: Broken Authentication </p>
//           <p>A3: Sensitive Data Exposure </p>
//           <p>A4: XML External Entities (XXE) </p>
//           <p>A5: Broken Access Control </p>
//           <p>A6: Security Misconfiguration </p>
//           <p>A7: Cross-Site Scripting (XSS) </p>
//           <p>A8: Insecure Deserialization </p>
//           <p>A9: Using Components with Known Vulnerabilities </p>
//           <p>A10: Insufficient Logging & Monitoring </p>
//           <br /><br /><br />
//           <p>OWASP Top 10 2021 Perspective</p>
//           <br />
//           <p>A1: Broken Access Control </p>
//           <p>A2: Cryptographic Failures </p>
//           <p>A3: Injection </p>
//           <p>A4: Insecure Design </p>
//           <p>A5: Security Misconfiguration </p>
//           <p>A6: Vulnerable and Outdated Components </p>
//           <p>A7: Identification and Authentication Failures </p>
//           <p>A8: Software and Data Integrity Failures </p>
//           <p>A9: Security Logging and Monitoring Failures </p>
//           <p>A10: Server-Side Request Forgery </p>
//         </div>
//       </div>
//     );
//   }
// }

import React, { memo } from 'react';

const SecurityReport = (props) => {
  return (
    <div>Hello World</div>
  )
}

// Wrap component using "pure" HOC
export default memo(SecurityReport);