import React from "react";
import Balance from "./Balance";
import IncomeExpenses from "./IncomeExpenses";

const Overview = () => {
  return (
    <div className="overview">
      <div>
        <Balance />
        <IncomeExpenses />
      </div>
    </div>
  );
};

export default Overview;
