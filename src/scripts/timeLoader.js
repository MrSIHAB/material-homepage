// populate date/time elements if present
export function renderTime() {
  document.addEventListener("DOMContentLoaded", () => {
    const time = new Date();
    const dayLoader = document.getElementById("day");
    const timeLoader = document.getElementById("time");
    if (dayLoader && timeLoader) {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      dayLoader.innerText = days[time.getDay()].toUpperCase();
      timeLoader.innerText = `${time.getDate()}, ${months[time.getMonth()]}, ${time.getFullYear()}`;
    }
  });
}
