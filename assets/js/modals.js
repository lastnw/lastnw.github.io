let title;
let site_desc;

function loadModal(params) {
  title = document.getElementById('site-title');
  site_desc = document.getElementById('site-description');
  if (!params.has("modal"))
    return;
  var name = params.get("modal").toLocaleLowerCase();
  var modalElement = document.getElementById(name);
  if (modalElement == null)
    return;
  new bootstrap.Modal(modalElement, {keyboard: false}).show();
  if (name == "donate")
    launchDonateModal(params);
  if (name == "rules")
    launchRulesModal(params);
}

function launchDonateModal(params) {
  title.content = "Пополнение Баланса";
  let desc = "";
  if (params.has("name")){
    document.getElementById("name").value = params.get("name");
    desc += "Пополнение баланса на ник " + params.get("name");
  }
  if (params.has("sum")){
    document.getElementById("sum").value = params.get("sum");
    desc += " на сумму " + params.get("sum");
  }
  if (params.has("method")){
    var method = document.getElementById("method-" + params.get("method").toLocaleLowerCase());
    if (method != null && !method.disabled){
      method.checked = true;
      desc += " через " + document.getElementById("method-name-" + params.get("method").toLocaleLowerCase()).innerHTML;
    }
  }
  site_desc.content = (params.has("name") ? desc + "." : "");
  buyCheck();
  document.getElementById("sumbit-btn").click();
}

function launchRulesModal(params) {
  title.content = "Правила Проекта";
  if (!params.has("rule"))
    return;
  var rule_param = params.get("rule");
  var rule = document.getElementById("rule-btn-" + rule_param);
  site_desc.content = "Правило №" + rule_param + " " + ruleName(rule_param);
  if (rule != null)
    rule.click();
}

function ruleName(num) {
  return document.getElementById("rule-btn-" + num)
        .innerHTML
        .replace('<p>', "")
        .replace('</p>', "")
        .replace('<span class="rules">', "")
        .replace('</span>', "")
        .replace(num + '.', "")
        .trim();
}
