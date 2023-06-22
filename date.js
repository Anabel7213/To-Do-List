exports.getDate = getDate;
function getDate() {
    let today = new Date();
    let options = {weekday: "short", month: "long", day: "numeric"};
    return today.toLocaleDateString("en-US", options);
}
exports.getDay = getDay;
function getDay() {
    let today = new Date();
    let options = {weekday: "long"}
    return today.toLocaleDateString("en-US", options);
}

console.log(module.exports);