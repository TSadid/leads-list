import data from "./Lead.json";
import { useState, useMemo, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchIcon from "./search.png";
import SortIcon from "./sort.png";

const cardsPerPage = 10;

export default function LeadsList() {
  console.log("Entered leads list function");
  const [leadsData, setLeadsData] = useState(data);
  const [leadsPerPage, setLeadsPerPage] = useState(cardsPerPage);
  const [pageNumber, setPageNumber] = useState(1);
  const outputDOM = useMemo(() => parseLeadsData(), [pageNumber, leadsPerPage]);
  // return outputDOM;
  const fetchMoreData = async () => {
    try {
      // alert("fetching");
      setTimeout(() => setLeadsPerPage(leadsPerPage + 5), 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <InfiniteScroll dataLength={leadsPerPage} pullDownToRefreshThreshold={500} hasMore={true} next={fetchMoreData} loader={<Placeholder></Placeholder>}>
      {outputDOM}
    </InfiniteScroll>
  );

  function parseToMinutes(timeVal) {
    if (timeVal === 0) {
      return;
    } else {
      const mins = Math.floor(timeVal / 60);
      const sec = timeVal - mins * 60;
      return mins + "m " + sec + "s";
    }
  }

  function LeadsLocationList(projectList) {
    const leadProjArr = [];
    for (let i = 0; i < 3; i++) {
      if (i > projectList.length - 1) {
        break;
      } else {
        leadProjArr.push(
          <div key={projectList[i].id} className="LeadProjectSeen">
            {projectList[i].name}
          </div>
        );
      }
    }
    if (projectList.length > 3) {
      leadProjArr.push(
        <div key="-1" className="LeadProjectSeen">
          ...
        </div>
      );
    }
    // projectList?.forEach((project) => {
    //   leadProjArr.push(<div className="LeadProjectSeen">{project.name}</div>);
    // });
    return leadProjArr;
  }

  function PaginateArr(dataArr) {
    console.log("Entered pagination");

    let last = pageNumber * leadsPerPage; //1*5=5 2*5=10
    let first = (pageNumber - 1) * leadsPerPage; //0 5 10

    const LeadsDivShown = dataArr.slice(first, last);

    // const totalLeadsPages = Math.ceil(dataArr.length / leadsPerPage);

    // const leadPageButtons = [];

    // leadPageButtons.push(
    //   <button key="-1" className="LeadPageBtn Previous" onClick={() => handlePageClick(-1)}>
    //     Prev
    //   </button>
    // );
    // leadPageButtons.push(
    //   <button key="0" className="LeadPageBtn Previous">
    //     {pageNumber}
    //   </button>
    // );
    // leadPageButtons.push(
    //   <button key="1" className="LeadPageBtn Previous" onClick={() => handlePageClick(1)}>
    //     Next
    //   </button>
    // );

    // function handlePageClick(pageClicked) {
    //   if (pageClicked == 1) {
    //     if (pageNumber < totalLeadsPages) {
    //       setPageNumber(pageNumber + 1);
    //     }
    //   } else {
    //     if (pageNumber > 1) {
    //       setPageNumber(pageNumber - 1);
    //     }
    //   }
    // }

    // LeadsDivShown.push(
    //   <div key={"-2"} className="LeadPageBtn-Parent">
    //     {leadPageButtons}
    //   </div>
    // );
    return LeadsDivShown;
  }

  function parseLeadsData() {
    console.log("Entered calculation");
    const returnArr = [];
    returnArr.push(<FilterCards />);
    leadsData?.forEach((lead) => {
      returnArr.push(
        <div key={lead.homebuyer_id} className={lead.lead_priority + "-lead LeadsCard"}>
          <div className="LeadsName">{lead.homebuyer_name}</div>
          <div className="LeadsTimeSpent">{parseToMinutes(lead.elapsed_time_seconds)}</div>
          <div className="LeadsLocation">{LeadsLocationList(lead.projects)}</div>
        </div>
      );
    }, leadsData);
    //return returnArr;

    //Pagination

    return PaginateArr(returnArr);
  }
}

export function Placeholder() {
  console.log("Placeholder");
  return (
    <>
      <div className="loading-lead LeadsCard">
        <div className="LeadsName Loading">Rafid Wahid Ophs</div>
        <div className="LeadsTimeSpent Loading">5m 1s</div>
        <div className="LeadsLocation">
          <div className="LeadProjectSeen Loading">Antariksh Ace</div>
          <div className="LeadProjectSeen Loading">Bandra</div>
          <div className="LeadProjectSeen Loading">Aakasa</div>
          <div className="LeadProjectSeen Loading">...</div>
        </div>
      </div>
    </>
  );
}

function FilterCards() {
  return (
    <>
      <div className="FilterSection">
        <div>
          <img className="SearchIcon" src={SearchIcon} alt="Search" />
        </div>
        <input className="FilterText" placeholder="Search by name or project"></input>
        <div>
          <img className="FilterIcon" src={SortIcon} alt="Filter" />
        </div>
      </div>
      <div className="FilterEndLine"></div>
    </>
  );
}
