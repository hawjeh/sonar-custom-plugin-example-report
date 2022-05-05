import React, { memo, useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { findVersion, findComponent, findOwasp2021, findOwasp2017 } from "../../common/api";
import { getCaseStatusValue, getCaseSeverityValue } from "../../common/helper";

import PageSettingTable from './children/PageSettingTable';
import Report from './children/Report';
import './style.css';

const SecurityReport = (props) => {
  const componentRef = useRef();
  const [ready, setReady] = useState(false);
  const [project, setProject] = useState({
    preset: 'OWASP TOP 10 - 2021'
  });
  const metrics = useState("alert_status,quality_gate_details,bugs,new_bugs,reliability_rating,new_reliability_rating,vulnerabilities,new_vulnerabilities,security_rating,new_security_rating,security_hotspots,new_security_hotspots,security_hotspots_reviewed,new_security_hotspots_reviewed,security_review_rating,new_security_review_rating,code_smells,new_code_smells,sqale_rating,new_maintainability_rating,sqale_index,new_technical_debt,coverage,new_coverage,lines_to_cover,new_lines_to_cover,tests,duplicated_lines_density,new_duplicated_lines_density,duplicated_blocks,ncloc,ncloc_language_distribution,projects,lines,new_lines");
  const [caseStatuses, setCaseStatuses] = useState({
    OPEN: true,
    CONFIRMED: true,
    REOPENED: true,
    RESOLVED: true,
    CLOSED: true
  })
  const [caseSeverities, setCaseSeverities] = useState({
    INFO: false,
    MINOR: true,
    MAJOR: true,
    BLOCKER: true,
    CRITICAL: true
  });

  const [componentData, setComponentData] = useState([]);
  const [owaspSelection, setOwaspSelection] = useState('2021');
  const [owaspData2017, setOwaspData2017] = useState([]);
  const [owaspData2021, setOwaspData2021] = useState([]);

  useEffect(() => {
    const key = props.options.component.key;
    const branch = props.options.branchLike.name;

    project.key = key;
    project.name = props.options.component.name;
    project.version = props.options.component.version;
    project.branch = branch;
    setProject(project);
  }, [props]);

  // Report Actions
  const onPresetChange = (e) => {
    project.preset = e.target.value;
    setProject(project);
  }

  const onCaseStatusChange = (e) => {
    if (e === 'OPEN') {
      caseStatuses.OPEN = !caseStatuses.OPEN;
    } else if (e === 'CONFIRMED') {
      caseStatuses.CONFIRMED = !caseStatuses.CONFIRMED;
    } else if (e === 'REOPENED') {
      caseStatuses.REOPENED = !caseStatuses.REOPENED;
    } else if (e === 'RESOLVED') {
      caseStatuses.RESOLVED = !caseStatuses.RESOLVED;
    } else if (e === 'CLOSED') {
      caseStatuses.CLOSED = !caseStatuses.CLOSED;
    }

    setCaseStatuses(caseStatuses);
  }

  const onCaseSeverityChange = (e) => {
    if (e === 'INFO') {
      caseSeverities.INFO = !caseSeverities.INFO;
    } else if (e === 'MINOR') {
      caseSeverities.MINOR = !caseSeverities.MINOR;
    } else if (e === 'MAJOR') {
      caseSeverities.MAJOR = !caseSeverities.MAJOR;
    } else if (e === 'CRITICAL') {
      caseSeverities.CRITICAL = !caseSeverities.CRITICAL;
    } else if (e === 'BLOCKER') {
      caseSeverities.BLOCKER = !caseSeverities.BLOCKER;
    }

    setCaseSeverities(caseSeverities);
  }

  const onGenerateClick = (e) => {
    const { key, branch } = project;

    const caseType = 'VULNERABILITY';
    const caseStatus = getCaseStatusValue(caseStatuses, true);
    const caseSeverity = getCaseSeverityValue(caseSeverities, true);
    const promises = [];
    let selection = '2021';
    let query = { key, branch, caseType, caseStatus, caseSeverity };

    if (project.preset === 'OWASP TOP 10 - 2021') {
      selection = '2021';
      for (let i = 1; i <= 10; i++) {
        query.owasp = `a${i}`;
        promises.push(findOwasp2021(query));
      }
    } else if (project.preset === 'OWASP TOP 10 - 2017') {
      selection = '2017';
      for (let i = 1; i <= 10; i++) {
        query.owasp = `a${i}`;
        promises.push(findOwasp2017(query));
      }
    }

    promises.push(findVersion(), findComponent({ key, branch, metrics }));
    Promise.all(promises).then((results) => {
      const owaspResults = results.slice(0, 10);
      if (selection === '2021') {
        setOwaspData2021(owaspResults);
      } else if (selection === '2017') {
        setOwaspData2017(owaspResults);
      }
      project.sqVersion = results[10];
      setComponentData(results[11]);
      setOwaspSelection(selection);
      setReady(true);
    });
  }

  const onPrintClick = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="page page-container page-limited">
      <header className="page-header">
        <h3 className="page-title">Websparks - Custom Security Report</h3>
      </header>
      <div className="page-setting">
        <PageSettingTable onPresetChange={onPresetChange} onCaseStatusChange={onCaseStatusChange} onCaseSeverityChange={onCaseSeverityChange} onGenerateClick={onGenerateClick} caseStatuses={caseStatuses} caseSeverities={caseSeverities} />
      </div>
      <div id='report_out_wrapper' className="bg-white">
        {
          ready && (
            <Report ref={componentRef} project={project} componentData={componentData}
              caseStatuses={caseStatuses} caseSeverities={caseSeverities}
              owaspSelection={owaspSelection} owaspData2021={owaspData2021} owaspData2017={owaspData2017} />
          )
        }
      </div>
      {
        ready && (
          <div>
            <button type="button" onClick={onPrintClick} className="export-btn">Print Report</button>
          </div>
        )
      }
    </div>
  )
}

export default memo(SecurityReport);