import React from 'react';
import Logo from '../../../common/logo';
import FilterSettingTable from './FilterSettingTable';
import NewCodeTable from './NewCodeTable';
import OverallCodeTable from './OverallCodeTable';
import HotSpotListTable from './HotSpotListTable';
import OwaspReport from './OwaspReport';
import ProjectSettingTable from './ProjectSettingTable';
import ReportTitle from './ReportTitle';

const Report = React.forwardRef(({ project, componentData, caseStatuses, caseSeverities, owaspSelection, owaspData2021, owaspData2017 }, ref) => {
  return (
    <div id="report_wrapper" ref={ref}>
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
      <div style={{ height: '200px' }}></div>
      <Logo />
      <OwaspReport owaspSelection={owaspSelection} owaspData2021={owaspData2021} owaspData2017={owaspData2017} />
      {/* <hr />
      <div style={{ height: '50px' }}></div>
      <HotSpotListTable /> */}
    </div>
  )
})

export default Report;