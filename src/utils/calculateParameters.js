export default function calculateParameters(resolution) {
  let now = new Date();
  let isSunday = now.getDay() === 0;
  let isSaturday = now.getDay() === 6;

  let parameters = {};
  let startDate = new Date();
  isSaturday
    ? startDate.setDate(startDate.getDate() - 1)
    : isSunday
    ? startDate.setDate(startDate.getDate() - 2)
    : startDate;
  switch (resolution) {
    case "15M":
      startDate.setDate(startDate.getDate() - 1);
      parameters = {
        startDate,
        interval: "minute",
        period: 1,
      };
      break;
    case "1H":
      startDate.setDate(startDate.getDate() - 1);
      parameters = {
        startDate,
        interval: "minute",
        period: 5,
      };
      break;
    case "1D":
      startDate.setDate(startDate.getDate() - 1);
      parameters = {
        startDate,
        interval: "hourly",
        period: 1,
      };
      break;
    case "1W":
      startDate.setDate(startDate.getDate() - 7);
      parameters = {
        startDate,
        interval: "daily",
        period: 1,
      };
      break;
    case "1M":
      startDate.setDate(startDate.getDate() - 30);
      parameters = {
        startDate,
        interval: "daily",
        period: 1,
      };
      break;
    default:
      parameters = {
        startDate: null,
        interval: null,
        period: null,
      };
      break;
  }

  let getFridayIfWeekendOrNow = new Date();
  if (isSunday) {
    getFridayIfWeekendOrNow.setDate(getFridayIfWeekendOrNow.getDate() - 2);
  } else if (isSaturday) {
    getFridayIfWeekendOrNow.setDate(getFridayIfWeekendOrNow.getDate() - 1);
  }
  parameters.interval === "daily"
    ? (parameters.endDate = getFridayIfWeekendOrNow.toISOString().split("T")[0])
    : (parameters.endDate = getFridayIfWeekendOrNow
        .toISOString()
        .split(".")[0]
        .replace("T", " "));
  parameters.startDate = parameters.startDate?.toISOString().split("T")[0];
  return parameters;
}
