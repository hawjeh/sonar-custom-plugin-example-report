import React from 'react';
import { getSettingTableStyle, getComponentValue } from '../../../common/helper';

const ProjectSettingTable = ({ project, componentData }) => {
  const style = getSettingTableStyle();

  return (
    <table style={style.table}>
      <tr style={style.tr}>
        <td style={style.tdBold}>SonarQube version</td>
        <td style={style.td}>{project.sqVersion}</td>
      </tr>
      <tr style={style.tr}>
        <td style={style.tdBold}>Project Name</td>
        <td style={style.td}>{project.name}</td>
      </tr>
      <tr style={style.tr}>
        <td style={style.tdBold}>Version</td>
        <td style={style.td}>{project.version}</td>
      </tr>
      <tr style={style.tr}>
        <td style={style.tdBold}>Branch</td>
        <td style={style.td}>{project.branch}</td>
      </tr>
      <tr style={style.tr}>
        <td style={style.tdBold}>Total line of code</td>
        <td style={style.td}>{getComponentValue(componentData, "ncloc")}</td>
      </tr>
    </table>
  )
}

export default ProjectSettingTable;