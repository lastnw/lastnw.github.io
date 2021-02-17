var ip = "hypixel.net";
var max = 500000;
let online_num;
let online_bar;
let online_card;

function loadMonitor() {
  online_num = document.getElementById("online-num");
  online_bar = document.getElementById("online-bar");
  online_card = document.getElementById('online-card');
  setOff();
  update();
  setInterval(() => {
    update();
  }, 5000);
}

function update() {
  var req = new XMLHttpRequest();
  req.responseType = 'json';
  req.open('GET', 'https://api.mcsrvstat.us/2/' + ip, true);
  req.onload  = function() {
   var data = req.response;
   if (!data.online) {
     setOff();
     return;
   }
   setOn(data.players.online);
  };
  req.send();

}

function setOff() {
  online_card.classList.remove("border-success");
  online_card.classList.add("border-danger");

  online_num.classList.remove("text-success");
  online_num.classList.add("text-danger");

  online_bar.classList.remove("bg-success");
  online_bar.classList.add("bg-danger");
  online_bar.classList.add("progress-bar-animated");
  online_bar.classList.add("progress-bar-striped");


  online_num.innerText = "OFFLINE";
  online_bar.style = "width: 100%;";
}

function setOn(online) {
  online_card.classList.remove("border-danger");
  online_card.classList.add("border-success");

  online_num.classList.remove("text-danger");
  online_num.classList.add("text-success");

  online_bar.classList.remove("bg-danger");
  online_bar.classList.add("bg-success");
  online_bar.classList.remove("progress-bar-animated");
  online_bar.classList.remove("progress-bar-striped");

  online_num.innerText = online + "/" + max;
  online_bar.style = "width: " + (online / max * 100) + "%;";
}
