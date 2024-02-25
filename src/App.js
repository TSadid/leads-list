import React, { lazy, Suspense } from "react";
import logo from "./OpenhausLogo.svg";
import "./App.css";
import Placeholder from "./Leads.js";

// const LeadsList = React.lazy(() => import("./Leads.js"));
const LeadsList = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./Leads.js")), 1500);
  });
});

function AppCover() {
  return (
    <div className="App-header">
      <OpenhausLogo />
      {/* <div>
        <span className="LeadsPanel">Leads</span>
      </div> */}
      <div>
        <Suspense
          fallback={
            <>
              <PlaceholderLeadsCard />
              <PlaceholderLeadsCard />
              <PlaceholderLeadsCard />
              <PlaceholderLeadsCard />
              <PlaceholderLeadsCard />
              <PlaceholderLeadsCard />
              <PlaceholderLeadsCard />
              <PlaceholderLeadsCard />
              <PlaceholderLeadsCard />
              <PlaceholderLeadsCard />
            </>
          }
        >
          <LeadsList />
        </Suspense>
      </div>
    </div>
  );
}

function OpenhausLogo() {
  return (
    <div>
      <img src={logo} alt="Openhaus"></img>
    </div>
  );
}

function PlaceholderLeadsCard() {
  console.log("Placeholder");
  return (
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
  );
}

function App() {
  return <AppCover />;
}

export default App;
