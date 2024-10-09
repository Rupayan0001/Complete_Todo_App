export default function getCurrentTimeStatus() {
    const date = new Date();
    const hours = date.getHours();

    let timeStatus;
    if (hours >= 0 && hours <= 4) {
        timeStatus = "Good night";
    }
    else if (hours >= 5 && hours <= 11) {
        timeStatus = "Good morning";
    }
    else if (hours >= 12 && hours <= 16) {
        timeStatus = "Good afternoon";
    }
    else if (hours >= 17 && hours <= 21) {
        timeStatus = "Good evening";
    }
    else if (hours >= 22 && hours <= 23) {
        timeStatus = "Good night";
    }
    return timeStatus;

}
