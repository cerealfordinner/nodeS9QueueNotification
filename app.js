const axios = require("axios");
const notifier = require("node-notifier");
const path = require("path");
const player = require("play-sound")((opts = {}));

const url = "http://queue.square-9.com/data/support-page.json";
let seconds = 5,
  the_interval = seconds * 1000;
let lastCount = 0;

setInterval(function () {
  axios
    .get(url)
    .then((response) => {
      let currentCount = response.data.currentQueueCountiOS;
      if (currentCount > lastCount) {
        player.play("coin.mp3", function (err) {
          if (err) throw err;
        });
        notifier.notify({
          title: "S9 Queue Notifier",
          message: `New case in queue, current count: ${currentCount} last count: ${lastCount}`,
          sound: true,
          icon: path.join(__dirname, "icon.png"),
        });
        console.log(
          `New case in queue, current count: ${currentCount} last count: ${lastCount}`
        );
      } else {
        console.log(`No new cases, the current queue count: ${currentCount}`);
      }
      lastCount = currentCount;
    })
    .catch((error) => {
      console.log(error);
    });
}, the_interval);
