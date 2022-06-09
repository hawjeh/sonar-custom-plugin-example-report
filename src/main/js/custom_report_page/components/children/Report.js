import React from 'react';
import Logo from '../../../common/logo';
import FilterSettingTable from './setting/FilterSettingTable';
import NewCodeTable from './code/NewCodeTable';
import OverallCodeTable from './code/OverallCodeTable';
import OwaspTable from './owasp/OwaspTable';
import OwaspListTable from './owasp/OwaspListTable';
import ProjectSettingTable from './setting/ProjectSettingTable';
import ReportTitle from './ReportTitle';

const Report = React.forwardRef(({ project, componentData, caseStatuses, caseSeverities, owaspData2021, owaspData2017 }, ref) => {
  return (
    <div id="report_wrapper" ref={ref}>
      <div className="pagebreak">
        <Logo />
        <ReportTitle fontSize="h4" title={project.name + ' Report'} />
        <hr />
        <ProjectSettingTable project={project} componentData={componentData} />
        <hr />
        <ReportTitle fontSize="h5" title={'Filter Settings'} />
        <FilterSettingTable project={project} caseStatuses={caseStatuses} caseSeverities={caseSeverities} />
        <hr />
        <OverallCodeTable componentData={componentData} />
        <hr />
        <NewCodeTable componentData={componentData} />
        <hr />
      </div>
      <div style={{ height: '50px' }}></div>
      <div className="pagebreak">
        <Logo />
        <OwaspTable owaspSelection='2017' owaspData2021={owaspData2021} owaspData2017={owaspData2017} />
      </div>
      <div style={{ height: '50px' }}></div>
      <div className="pagebreak">
        <Logo />
        <OwaspTable owaspSelection='2021' owaspData2021={owaspData2021} owaspData2017={owaspData2017} />
      </div>
      <div style={{ height: '50px' }}></div>
      <OwaspListTable owaspSelection='2021' owaspData2021={owaspData2021} owaspData2017={owaspData2017} />
      <div style={{ height: '50px'}}></div>
      <OwaspListTable owaspSelection='2017' owaspData2021={owaspData2021} owaspData2017={owaspData2017} />
    </div>
  )
})

export default Report;