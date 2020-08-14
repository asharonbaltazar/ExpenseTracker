import moment from "moment";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to sort the dates by simple terms
export const sorter = (data) => {
  // Sort the transactions by descending dates
  data.sort((first, second) => {
    if (first.createdAt > second.createdAt) return -1;
    if (first.createdAt < second.createdAt) return 1;
    return 0;
  });

  return data.reduce((dates, item) => {
    const createdAt = moment(item.createdAt).calendar(null, {
      lastDay: "[Yesterday]",
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      lastWeek: "dddd",
      nextWeek: "dddd",
      sameElse: "L",
    });

    if (dates[createdAt]) {
      dates[createdAt].push(item);
    } else {
      dates[createdAt] = [item];
    }
    return dates;
  }, {});
};

// Regex search functionality
export const filterExpenses = (query, transactions) => {
  query = Array.from(query).reduce(
    (a, v, i) => `${a}[^${query.substr(i)}]*?${v}`,
    ""
  );
  const regex = RegExp(query, "i");
  const result = transactions.filter((transaction) =>
    transaction.text.match(regex)
  );
  return result;
};
