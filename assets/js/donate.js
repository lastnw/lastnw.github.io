  var discount = 15;
  var description = "В честь дня всех вюблённых дарим скидку %discount%%!";

  function changeName(i) {
    var name = document.getElementById('name');

    if (name.value + i == 0){
      errBord(name);
      return false;
    } else {
      succBord(name);
      return true;
    }
  }

  function changeSum() {
    var sum = document.getElementById('sum');
    var value = sum.value * 1;
    var btn = document.getElementById('sumbit-btn');
    if (value < 2 || value > sumToDiscounted(15_000)){
      errBord(sum);
      btn.innerHTML = "Оплатить"
      return false;
    } else {
      succBord(sum);
      btn.innerHTML = "Оплатить " + sumToDiscounted(value) + "руб";
      return true;
    }
  }

  function changeMethod() {
    var unit = document.getElementById('method-unit');
    var enot = document.getElementById('method-enot');
    var qiwi = document.getElementById('method-qiwi');
    var method = document.getElementById('method')

    if (!(qiwi.checked || enot.checked || unit.checked)) {
        return false;
    } else {
        return true;
    }
  }

  function buyCheck() {
    var name = changeName(0);
    var sum = changeSum();
    var method = changeMethod();
    if (name && sum && method){
      var element = document.getElementById('donate-alert');
      if (element != null)
        element.remove();
    } else {
      if (!name && !sum && !method)
        alert("<strong>Укажи: ник, сумму и способ оплаты!</strong>");
      else {
        if (!name){
          alert("<strong>Укажи ник</strong> длинной не более 16 символов");
          return;
        }
        if (!sum){
          var sum = discountedToSum(15_000).toString();
          alert("<strong>Укажи сумму</strong> от 2 до " + sum.substring(0, 2) + " " + sum.substring(2));
          return;
        }
        if (!method){
          alert("<strong>Укажи способ оплаты</strong> UnitPay, Enot. <small disabled>Qiwi - скоро!</small>");
          return;
        }
      }
    }
  }

  function alert(inner) {
    var element = document.getElementById('donate-alert');
    if (element != null)
      element.remove();
    element = document.createElement("div");
    element.className = "alert alert-danger alert-dismissible fade show";
    element.innerHTML = "<div>" + inner + "</div>"
    element.id = "donate-alert";
    document.getElementById("donate-body").append(element);
  }

  function errBord(el) {
    el.classList.add("border-danger");
    el.classList.remove("border-success");
  }

  function succBord(el) {
    el.classList.remove("border-danger");
    el.classList.add("border-success");
  }

  function getDiscount() {
    return discount;
  }

  function hasDiscount() {
    return discount > 0;
  }

  function sumToDiscounted(sum) {
    return (hasDiscount() ? sum - Math.floor(sum / 100 * discount) : sum);
  }

  function discountedToSum(sum) {
    return (hasDiscount() ? sum + Math.floor(sum / (100 - discount) * discount) : sum);
  }

  function loadDiscount() {
    if (!hasDiscount())
      return;
    document.getElementById("donate-toggle").innerHTML = "Пополнение (скидка<a style='color: #198754; font-weight: bold;'> " + discount + "%</a>)"
    var element = document.createElement("div");
    element.innerHTML = "<a style='color: #198754;'>" + description.replace("%discount%", discount) + "</a>";
    element.id = "discount-description";
    document.getElementById("desc").append(element);
    document.getElementById("desc").append(document.createElement("hr"));
  }
