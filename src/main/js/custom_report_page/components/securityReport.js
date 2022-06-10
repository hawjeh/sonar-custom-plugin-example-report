import React, { memo, useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { findVersion, findComponent, findOwasp2021, findOwasp2017, findSonarSource, findCwe2021 } from "../../common/api";
import { getMetrics, getSonarMetrics, getCweMetrics } from "../../common/constant";
import { getCaseStatusValue, getCaseSeverityValue } from "../../common/helper";

import PageSettingTable from './children/setting/PageSettingTable';
import Report from './children/Report';
import './style.css';

const SecurityReport = (props) => {
  const componentRef = useRef();
  const [ready, setReady] = useState(false);
  const [project, setProject] = useState({});

  const metrics = getMetrics();
  const sonarMetrics = getSonarMetrics();
  const cweMetrics = getCweMetrics();

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
  const [owasp2017, setowasp2017] = useState([]);
  const [owasp2021, setowasp2021] = useState([]);
  const [sonarSource, setSonarSource] = useState([]);
  const [cwe2021, setCwe2021] = useState([]);

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
    let query = { key, branch, caseType, caseStatus, caseSeverity };

    for (let i = 1; i <= 10; i++) {
      query.owasp = `a${i}`;
      promises.push(findOwasp2017(query));
    }

    for (let i = 1; i <= 10; i++) {
      query.owasp = `a${i}`;
      promises.push(findOwasp2021(query));
    }

    const sonarMetricsArr = sonarMetrics.split(',');
    for (let i = 0; i <= sonarMetricsArr.length; i++) {
      query.sonarMetrics = sonarMetricsArr[i];
      promises.push(findSonarSource(query));
    }

    const cweMetricsArr = cweMetrics.split(',');
    for (let i = 0; i <= cweMetricsArr.length; i++) {
      query.cwe = cweMetricsArr[i];
      promises.push(findCwe2021(query));
    }

    promises.push(findVersion(), findComponent({ key, branch, metrics }));
    Promise.all(promises).then((results) => {
      const owaspResults = results.slice(0, 10);
      setowasp2017(owaspResults);
      const owaspResults2021 = results.slice(10, 20);
      setowasp2021(owaspResults2021);

      const sonarResults = results.slice(20, 20 + sonarMetricsArr.length);
      setSonarSource(sonarResults);
      // skip Others
      const cweTop25Results = results.slice(21 + sonarMetricsArr.length, 21 + sonarMetricsArr.length + cweMetricsArr.length);
      setCwe2021(cweTop25Results);

      project.sqVersion = results[results.length - 2];
      setComponentData(results[results.length - 1]);
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
        <PageSettingTable onCaseStatusChange={onCaseStatusChange} onCaseSeverityChange={onCaseSeverityChange}
          onGenerateClick={onGenerateClick} onPrintClick={onPrintClick} ready={ready} caseStatuses={caseStatuses} caseSeverities={caseSeverities} />
      </div>
      <div id='report_out_wrapper' className="bg-white">
        {
          ready && (
            <Report ref={componentRef} project={project}
              componentData={componentData}
              caseStatuses={caseStatuses}
              caseSeverities={caseSeverities}
              owasp2021={owasp2021}
              owasp2017={owasp2017}
              sonarSource={sonarSource}
              cwe2021={cwe2021} />
          )
        }
      </div>

    </div>
  )
}

export default memo(SecurityReport);