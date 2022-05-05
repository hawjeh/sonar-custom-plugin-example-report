import { getJSON } from "sonar-request";

export function findQualityProfilesStatistics(project) {
  return getJSON("/api/qualityprofiles/search").then(function (response) {
    return response.profiles.length;
  });
}

export function findQualityQatesStatistics(project) {
  return getJSON("/api/qualitygates/list").then(function (response) {
    return response.qualitygates.length;
  });
}

export function findIssuesStatistics(project) {
  return getJSON("/api/issues/search").then(function (response) {
    return response.total;
  });
}

export function findProjects(project) {
  return getJSON("/api/projects/search").then(function (response) {
    return response.components.length;
  });
}

export function findVersionsAndMeasures(project) {
  return getJSON("/api/project_analyses/search", {
    project: project.key,
    p: 1,
    ps: 500
  }).then(function (responseAnalyses) {
    const numberOfAnalyses = responseAnalyses.analyses.length;
    if (numberOfAnalyses > 0) {
      return getJSON("/api/measures/search_history", {
        component: project.key,
        metrics: "alert_status,bugs,vulnerabilities,sqale_index,reliability_rating,security_rating,sqale_rating",
        ps: 50
      }).then(function (responseMetrics) {
        var data = [];
        var numberOfVersions = 0;
        for (let i = 0; i < numberOfAnalyses; i++) {
          let result = {
            alert_status: "",
            bugs: "0",
            vulnerabilities: "0",
            sqale_index: "0",
            reliability_rating: "",
            security_rating: "",
            sqale_rating: ""
          };
          const numberOfMeasuresRetrieved = 7;

          for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
            for (let d = 0; d < responseMetrics.measures[k].history.length; d++) {
              if (
                responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date
              ) {
                if (responseMetrics.measures[k].metric === "bugs") {
                  result.bugs = responseMetrics.measures[k].history[d].value;
                } else if (responseMetrics.measures[k].metric === "vulnerabilities") {
                  result.vulnerabilities = responseMetrics.measures[k].history[d].value;
                } else if (responseMetrics.measures[k].metric === "sqale_index") {
                  result.sqale_index = responseMetrics.measures[k].history[d].value;
                } else if (responseMetrics.measures[k].metric === "alert_status") {
                  result.alert_status = responseMetrics.measures[k].history[d].value;
                } else if (responseMetrics.measures[k].metric === "reliability_rating") {
                  result.reliability_rating = responseMetrics.measures[k].history[d].value;
                } else if (responseMetrics.measures[k].metric === "security_rating") {
                  result.security_rating = responseMetrics.measures[k].history[d].value;
                } else if (responseMetrics.measures[k].metric === "sqale_rating") {
                  result.sqale_rating = responseMetrics.measures[k].history[d].value;
                }
              }
            }
          }

          data[numberOfVersions] = result;
          numberOfVersions++;
        }
        return data;
      });
    }
  });
}

// Custom

export function findVersion() {
  return fetch("/api/server/version").then(function (response) {
    return response.text();
  }).then(function (response) {
    return response;
  });
}

export function findComponent({key, branch, metrics}) {
  return getJSON("/api/measures/component", {
    component: key,
    branch: branch,
    metricKeys: metrics,
  }).then(function (response) {
    return response.component.measures;
  });
}

export function findOwasp2017({key, branch, owasp, caseType, caseStatus, caseSeverity}) {
  return getJSON("/api/issues/search", {
    componentKeys: key,
    branch: branch,
    facets: 'owaspTop10',
    owaspTop10: owasp,
    types: caseType,
    statuses: caseStatus,
    severities: caseSeverity
  }).then(function (response) {
    return response;
  });
}

export function findOwasp2021({key, branch, owasp, caseType, caseStatus, caseSeverity}) {
  return getJSON("/api/issues/search", {
    componentKeys: key,
    branch: branch,
    facets: 'owaspTop10-2021',
    'owaspTop10-2021': owasp,
    types: caseType,
    statuses: caseStatus,
    severities: caseSeverity
  }).then(function (response) {
    return response;
  });
}