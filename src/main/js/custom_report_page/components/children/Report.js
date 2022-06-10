import React from 'react';
import Logo from '../../../common/logo';
import FilterSettingTable from './setting/FilterSettingTable';
import IssueTable from './snippets/IssueTable';
import ListTable from './snippets/ListTable';
import NewCodeTable from './code/NewCodeTable';
import OverallCodeTable from './code/OverallCodeTable';
import ProjectSettingTable from './setting/ProjectSettingTable';
import { getOwasp2017Name, getOwasp2021Name, getSonarSourceName, getCweName } from '../../../common/constant';

const Report = React.forwardRef(({ project, componentData, caseStatuses, caseSeverities, owasp2021, owasp2017, sonarSource, cwe2021 }, ref) => {
  return (
    <div id="report_wrapper" ref={ref}>
      <div className="pagebreak">
        <Logo />
        <h4 style={{ 'text-align': 'center' }}>{project.name + ' Report'}</h4>
        <hr />
        <ProjectSettingTable project={project} componentData={componentData} />
        <hr />
        <h5 style={{ 'text-align': 'center' }}>Filter Settings</h5>
        <FilterSettingTable project={project} caseStatuses={caseStatuses} caseSeverities={caseSeverities} />
        <hr />
        <OverallCodeTable componentData={componentData} />
        <hr />
        <NewCodeTable componentData={componentData} />
        <hr />
      </div>
      <IssueTable title={'OWASP Top 10 - 2017'} details={owasp2017} names={getOwasp2017Name()} />
      <IssueTable title={'OWASP Top 10 - 2021'} details={owasp2021} names={getOwasp2021Name()} />
      <IssueTable title={'SonarSource Perspective'} details={sonarSource} names={getSonarSourceName()} />
      <IssueTable title={'CWE Top 25 2021 Perspective'} details={cwe2021} names={getCweName()} />
      <ListTable title={'OWASP Top 10 - 2017'} details={owasp2017} names={getOwasp2017Name()} />
      <ListTable title={'OWASP Top 10 - 2021'} details={owasp2021} names={getOwasp2021Name()} />
      <ListTable title={'SonarSource Perspective'} details={sonarSource} names={getSonarSourceName()} />
      <ListTable title={'CWE Top 25 2021 Perspective'} details={cwe2021} names={getCweName()} />
    </div>
  )
})

export default Report;