import moment from "moment";

export const increaseByDays = (strDate, days) => {
    let startdate = moment(strDate);
    return startdate.add(days, "days").format("YYYY/MM/DD");
}

export const toDateString = (isoStr) => {
    let curr = moment(isoStr);
    return curr.format("YYYY-MM-DD")
};
export const toDateTimeString = (isoStr) => {
    let curr = moment(isoStr);
    return curr.format("DD/MM/YYYY hh:mm")
};


export const intifiy = (isoStr) => {
    let old = moment(isoStr);
    let now = moment(new Date());
    let duration = moment.duration(now.diff(old));
    let seconds = duration.asSeconds();
    return seconds
}



export const getDaysBefore = (days) => {
    let startdate = moment();
    return new Date(startdate.subtract(days, "days"));
}
export const getDaysAfter = (days) => {
    let startdate = moment();
    return startdate.add(days, "days");
}

const stringfy = (num, char) => {
    return `${num.toFixed(0)}${char}`
}

export const getFormatUTC = (date) => {
    return new Date(date).toUTCString()
}