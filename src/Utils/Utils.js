export const getDate = () => {
    let d = new Date();
    let y = d.getFullYear();
    let m = (d.getMonth() < 10 ? "0" : "") + d.getMonth();
    let day = (d.getDate() < 10 ? "0" : "") + d.getDate();
    return y + "-" + m + "-" + day;
};

export const nth = function(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
}

export const getFormattedDate = (date, type) => {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const day = weekday[date.getDay()];
    const month = months[date.getMonth()];
    const dateTh = date.getDate() + nth(date.getDate());
    const year = date.getFullYear();
    if(type == "date") return `${month} ${dateTh}, ${year}`;
    else return day;
};