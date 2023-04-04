import { useState, useEffect } from "react";
import { FaRegEye, FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router";
import Modal from "../../components/Modal/Modal";
import "./Reports.css";
import { formateDate } from "../../utils/date-function";

export const Reports = ({ openModal, setOpenModal }) => {
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [modalReport, setModalReport] = useState([]);

  const deleteHandler = (id) => {
    fetch(`http://localhost:3333/api/reports/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status !== 200) {
        console.log("Error");
        return;
      }
    });

    const newReports = reports.filter((report) => report.id !== id);
    setReports(newReports);
    navigate("/reports");
  };

  useEffect(() => {
    fetch("http://localhost:3333/api/reports")
      .then((response) => response.json())
      .then((data) => setReports(data));
  }, []);

  

  const searchByCompany = reports.filter((report) =>
    report.companyName.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );
  const searchByCandidate = reports.filter((report) =>
    report.candidateName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div
        className={`${openModal ? "modalUp" : "modalDown"}`}
        id="main-wrapper"
      >
        <div className="row search-wrapper">
          <div className="col s6 m4 l3 xl3">
            <h2>Reports</h2>
            <form>
              <div className="input-field">
                <input
                  className="searchInput"
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="container reports-container">
          {openModal && (
            <Modal report={modalReport} setOpenModal={setOpenModal} />
          )}
          {searchQuery &&
          searchByCompany.length === 0 &&
          searchByCandidate.length === 0 ? (
            <div className="error-message">No matching reports found</div>
          ) : searchByCompany.length > 0 ? (
            searchByCompany.map((report) => (
              <div className="row report-data report2" key={report.id}>
                <div className="col s12 m3 l3 xl3">
                  <div className="truncate report-info">
                    {report.companyName}
                  </div>
                  <div className="tiny-text">Company</div>
                </div>

                <div className="col s12 m3 l3 xl3">
                  <div className="truncate report-info">
                    {report.candidateName}
                  </div>
                  <div className="tiny-text">Candidate</div>
                </div>
                <div className="col s12 m3 l3 xl3">
                  <div className="truncate report-info">
                    {formateDate(report.interviewDate)}
                  </div>
                  <div className="tiny-text">Interview date</div>
                </div>
                <div className="col s12 m2 l2 xl2">
                  <div className="truncate report-info">{report.status}</div>
                  <div className="tiny-text">Status</div>
                </div>

                <div className="col s12 m1 l1 xl1 valign-wrapper">
                  <span className="eye-icon">
                    <FaRegEye
                      onClick={() => {
                        setOpenModal(true);
                        setModalReport(report);
                      }}
                    />
                  </span>
                  <span className="close-icon">
                    <FaRegWindowClose
                      onClick={() => deleteHandler(report.id)}
                    />
                  </span>
                </div>
              </div>
            ))
          ) : (
            searchByCandidate.map((report) => (
              <div className="row report-data" key={report.id}>
                <div className="col s12 m3 l3 xl3">
                  <div className="truncate report-info">
                    {report.companyName}
                  </div>
                  <div className="tiny-text">Company</div>
                </div>
                <div className="col s12 m3 l3 xl3">
                  <div className="truncate report-info">
                    {report.candidateName}
                  </div>
                  <div className="tiny-text">Candidate</div>
                </div>
                <div className="col s12 m3 l3 xl3">
                  <div className="truncate report-info">
                    {formateDate(report.interviewDate)}
                  </div>
                  <div className="tiny-text">Interview date</div>
                </div>
                <div className="col s12 m2 l2 xl2">
                  <div className="truncate report-info">{report.status}</div>
                  <div className="tiny-text">Status</div>
                </div>

                <div className="col s12 m1 l1 xl1 valign-wrapper">
                  <span className="eye-icon">
                    <FaRegEye
                      onClick={() => {
                        setOpenModal(true);
                        setModalReport(report);
                      }}
                    />
                  </span>
                  <span className="close-icon">
                    <FaRegWindowClose
                      onClick={() => deleteHandler(report.id)}
                    />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
