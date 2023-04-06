import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ReportIndexItem from './ReportIndexItem';
import { getAllReportsThunk } from '../store/reports';

const ReportIndex = () => {
  const reportsObj = useSelector((state) => state.reports)
  console.log(reportsObj)
  const reports = Object.values(reportsObj); // populate from Redux store
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllReportsThunk())
  }, [dispatch])

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <section>
      <ul>
        {reports.map((report) => (
          <ReportIndexItem
            report={report}
            key={report.id}
          />
        ))}
      </ul>
      <Link
        className="back-button new"
        to="/reports/new"
      >
        New Report
      </Link>
    </section>
  );
};

export default ReportIndex;
