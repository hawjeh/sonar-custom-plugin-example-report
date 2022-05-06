import React, { useEffect, useState } from 'react';
import { findIssueSnippet, findRule } from '../../../../common/api';
import { getOwaspTableStyle } from '../../../../common/helper';

const OwaspListSnippet = ({ issue }) => {
  const { key, component, line, message, rule } = issue;
  const style = getOwaspTableStyle();

  const [componentData, setComponentData] = useState({});
  const [sourcesData, setSourcesData] = useState([]);
  const [ruleData, setRuleData] = useState();

  useEffect(() => {
    Promise
      .all([findIssueSnippet({ issueKey: key }), findRule({ key: rule })])
      .then(([snippet, rule]) => {
        setComponentData(snippet[component].component);
        setSourcesData(snippet[component].sources);
        setRuleData(rule.rule);
      });
  }, []);

  return (
    <div>
      <p style={style.issuePre}><i>{componentData.path}</i></p>
      {
        sourcesData.filter(x => x.line === line).map((i) => {
          return (
            <table style={{ "margin-bottom": ".6rem" }}>
              <tr>
                <td style={style.issuePre}>{i.line}</td>
                <td>
                  <pre style={style.issuePre} dangerouslySetInnerHTML={{ __html: i.code }}></pre>
                </td>
              </tr>
            </table>
          )
        })
      }
      <p>Message: {message}</p>
      <br />
      {
        ruleData && (
          <div className="coding-suggestion">
            <p><b>{ruleData.name}</b></p>
            <div className="coding-rules-detail-description rule-desc markdown" dangerouslySetInnerHTML={{ __html: ruleData.mdDesc }}></div>
          </div>
        )
      }
    </div>
  )
}

export default OwaspListSnippet;