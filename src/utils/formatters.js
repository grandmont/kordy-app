const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const formatDate = (dateTime) => {
    const now = new Date(),
        date = new Date(dateTime),
        minutes = date.getMinutes(),
        hours = date.getHours(),
        day = date.getDate(),
        month = date.getMonth() + 1,
        diff = now.getTime() - date.getTime(),
        secondsDiff = diff / 1000,
        minutesDiff = secondsDiff / 60,
        hoursDiff = minutesDiff / 60;

    return `${
        secondsDiff > 10
            ? secondsDiff > 59.9
                ? minutesDiff > 59.9
                    ? hoursDiff > 23.9
                        ? `${months[month - 1]}, ${
                              day < 10 ? `0${day}` : day
                          } at ${hours < 10 ? `0${hours}` : hours}:${
                              minutes < 10 ? `0${minutes}` : minutes
                          }`
                        : `${parseInt(hoursDiff)} h`
                    : `${parseInt(minutesDiff)} min`
                : `${parseInt(secondsDiff)} seconds ago`
            : `Now`
    }`;
};

export { formatDate };
