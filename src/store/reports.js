//import reportDataV1 from "../mocks/data/reportSeedsV1.json"
// import reportDataV2 from "../mocks/data/reportSeedsV2.json"

/** Action Type Constants: */
export const LOAD_REPORTS = 'reports/LOAD_REPORTS';
export const RECEIVE_REPORT = 'reports/RECEIVE_REPORT';
export const UPDATE_REPORT = 'reports/UPDATE_REPORT';
export const REMOVE_REPORT = 'reports/REMOVE_REPORT';

/**  Action Creators: */
export const loadReports = (reports) => ({
  type: LOAD_REPORTS,
  reports,
});

export const receiveReport = (report) => ({
  type: RECEIVE_REPORT,
  report,
});

export const editReport = (report) => ({
  type: UPDATE_REPORT,
  report,
});

export const removeReport = (reportId) => ({
  type: REMOVE_REPORT,
  reportId,
});

/** Thunk Action Creators: */

// Your code here

export const getAllReportsThunk = () => async (dispatch) => {
  const res = await fetch("/api/reports");
  const reports = await res.json()
  console.log(reports)
  await dispatch(loadReports(reports))
}

export const deleteReportThunk = (reportId) => async (dispatch) => {
  const res = await fetch(`/api/reports/${reportId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: {message: "Successfully deleted"}
  });

  if (res.ok) {
    // res.json({
    //   message: "Successfully deleted"
    // })
    const reports = await res.json()
    dispatch(removeReport(reportId))
    return reports
  } else {
    res.json({
      errors: {
        message: "Unauthorized"
      }
    })
  }
}

export const getOneReportThunk = (reportId) => async (dispatch) => {
  const res = await fetch(`/api/reports/${reportId}`)
  const report = await res.json()
  console.log("onereport", report)
  await dispatch(receiveReport(report))
}


/** The reports reducer is complete and does not need to be modified */
const reportsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_REPORTS:
      const reportsState = {};
      action.reports.forEach((report) => {
        reportsState[report.id] = report;
      });
      return reportsState;
    case RECEIVE_REPORT:
      return { ...state, [action.report.id]: action.report };
    case UPDATE_REPORT:
      return { ...state, [action.report.id]: action.report };
    case REMOVE_REPORT:
      const newState = { ...state };
      delete newState[action.reportId];
      return newState;
    default:
      return state;
  }
};

export default reportsReducer;
