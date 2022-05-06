import Icon from './icon';

export function getSettingTableStyle() {
  return {
    table: {
      'margin-top': '1rem',
      'margin-bottom': '1rem'
    },
    tr: {
      'margin-bottom': '0.5rem'
    },
    tdBold: {
      'padding': '0.5rem 2rem 0.5rem 0',
      'font-weight': 'bold',
      'width': '130px',
      'border': '0px'
    },
    td: {
      'padding': '0.5rem 2rem 0.5rem 0',
      'border': '0px'
    },
    reportCheckboxFirst: {
      'margin-right': '0.5rem'
    },
    reportCheckbox: {
      'margin-left': '0.5rem',
      'margin-right': '0.5rem'
    },
    reportBtn: {
      'padding': '0.5rem'
    }
  };
}

export function getCodeTableStyle() {
  return {
    table: {
      'width': '100%'
    },
    span: {
      'font-weight': 'normal',
      'font-size': '13px',
      'padding-left': '1rem'
    },
    trFirst: {
      'padding-top': '0',
      'padding-left': '0'
    },
    td: {
      'padding': '1rem 1rem 1rem 0',
      'border': '0px'
    },
    tdHead: {
      'padding': '0 1rem 0.5rem 0',
      'border': '0px'
    }
  };
}

export function getOwaspTableStyle() {
  return {
    table: {
      'width': '100%'
    },
    trFirst: {
      'padding-top': '0',
      'padding-left': '0'
    },
    tdOwaspHead: {
      'border': '0px'
    },
    tdCategory: {
      'padding': '1rem 1rem 0.5rem 0.5rem',
      'border': '0px',
      'border-bottom': '1px solid #aaa',
      'width': '55%'
    },
    tdOther: {
      'padding': '1rem 1rem 0.5rem 0.5rem',
      'border': '0px',
      'border-bottom': '1px solid #aaa',
      'width': '15%',
      'text-align': 'right'
    },
    tdCategoryChild: {
      'padding': '1rem 1rem 0.5rem 0.5rem',
      'border': '0px',
      'width': '55%'
    },
    tdOtherChild: {
      'padding': '1rem 1rem 0.5rem 0.5rem',
      'border': '0px',
      'width': '15%',
      'text-align': 'right'
    },
    tdIssue: {
      'padding': '1rem 1rem 1.5rem 0.5rem',
      'border': '0px',
      'border-bottom': '1px solid #aaa',
    },
    issuePre: {
      "padding": "0.3rem 0",
      "font-size": "0.6rem",
      "white-space": "pre-wrap"
    }
  };
}

export function getComponentValue(componentData, data_type) {
  if (data_type.includes('new_')) {
    return (componentData && componentData.find(m => m.metric === data_type) && componentData.find(m => m.metric === data_type).period.value) || '-';
  }
  return (componentData && componentData.find(m => m.metric === data_type) && componentData.find(m => m.metric === data_type).value) || '-';
}

export function getComponentRating(value) {
  const val = parseInt(value);
  if (val <= 1) return <Icon iconType="A" />;
  if (val <= 2) return <Icon iconType="B" />;
  if (val <= 3) return <Icon iconType="C" />;
  if (val <= 4) return <Icon iconType="D" />;
  if (val >= 5) return <Icon iconType="E" />;
  return <Icon iconType="A" />;
}

export function getOwapsRating(detail) {
  if (detail.issues.length === 0) return '';
  let rating = 'A';
  const blocker = detail.issues.filter(x => x.severity === "BLOCKER" && x.status !== "CLOSED" && x.status !== "RESOLVED").length;
  if (blocker > 0) {
    rating = 'E';
  } else {
    const critical = detail.issues.filter(x => x.severity === "CRITICAL" && x.status !== "CLOSED" && x.status !== "RESOLVED").length;
    if (critical > 0) {
      rating = 'D';
    } else {
      const major = detail.issues.filter(x => x.severity === "MAJOR" && x.status !== "CLOSED" && x.status !== "RESOLVED").length;
      if (major > 0) {
        rating = 'C';
      } else {
        const minor = detail.issues.filter(x => x.severity === "MINOR" && x.status !== "CLOSED" && x.status !== "RESOLVED").length;
        if (minor > 0) {
          rating = 'B';
        }
      }
    }
  }
  return <Icon iconType={rating} />;
}

export function getCaseStatusValue(caseStatuses, checked) {
  let final = [];
  for (let c in caseStatuses) {
    if (caseStatuses[c] === checked) {
      final.push(c);
    }
  }
  return final.join(', ');
}

export function getCaseSeverityValue(caseSeverities, checked) {
  let final = [];
  for (let c in caseSeverities) {
    if (caseSeverities[c] === checked) {
      final.push(c);
    }
  }
  return final.join(', ');
}