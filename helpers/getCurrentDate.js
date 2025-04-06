const getCurrentDate = () => {
    const DATE = new Date();
    let [day, month, year] = DATE.toLocaleDateString().split('/');
    let [hours, minutes, seconds] = [DATE.getHours().toString(), DATE.getMinutes().toString(), DATE.getSeconds().toString()];
    month.length == 1 ? month = `0${month}` : null;
    day.length == 1 ? day = `0${day}` : null;
    hours.length == 1 ? hours = `0${hours}` : null;
    minutes.length == 1 ? minutes = `0${minutes}` : null;
    seconds.length == 1 ? seconds = `0${seconds}` : null;
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default getCurrentDate;