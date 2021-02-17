// Created for LastNetwork by dargen

var params = fetchParams();

$(function load() {
  loadModal(params);
  loadMonitor();
  loadDiscount();
});

function fetchParams() {
  var getParams = window.location.search.replace("?", "").split("&");
  var params = new Map();
  for (var i = 0; i < getParams.length; i++) {
    var splited = getParams[i].split("=");
    params.set(splited[0], splited[1]);
  }
  return params;
}

function copy(text) {
  var el = document.createElement("input");
  el.value = text;
  document.body.append(el);
  el.select();
  document.execCommand("copy");
  el.remove();
}

function copyIp() {
  copy("lastnetwork.ru");
  document.getElementById('copy-ip').innerHTML = "IP Скопирован!";
  setTimeout(() => {document.getElementById('copy-ip').innerHTML = "Скопировать IP";}, 2500);
}
