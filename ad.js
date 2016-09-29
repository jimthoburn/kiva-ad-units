var imageElem = document.getElementById('loan_image');
var linkElem = document.getElementById('lend_link');
var nameElem = document.getElementById('name');
var locationElem = document.getElementById('location');
var descriptionElem = document.getElementById('description');
var progressElem = document.getElementById('progress');
var progressTextElem = document.getElementById('progress_text');

function hide() {
  lend_link.className += ' hidden';
}
function show() {
  lend_link.className = lend_link.className.replace(/hidden/g, '');
}

var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function() {
  show();

  var loans = JSON.parse(this.responseText)["loans"];

  var kivaData = loans[Math.floor(Math.random() * loans.length)];

  imageElem.setAttribute('src', '');
  imageElem.setAttribute('src', 'https://www.kiva.org/img/w480h480/' + kivaData["image"]["id"] + '.jpg');
  imageElem.setAttribute('alt', kivaData["name"]);
  linkElem.setAttribute('href', 'https://www.kiva.org/lend/' + kivaData["id"]);
  nameElem.innerHTML = kivaData["name"];
  locationElem.innerHTML = kivaData["location"]["country"];
  var loanAmount = kivaData["loan_amount"];
  var fundedAmount = kivaData["funded_amount"];
  var fundingLeft = kivaData["loan_amount"] - kivaData["funded_amount"];
  var fundingPercentage = Math.floor((fundedAmount / loanAmount) * 100);

  descriptionElem.innerHTML = "A loan of $" + loanAmount + " helps " + kivaData["use"];
  progressElem.setAttribute('value', fundingPercentage);
  progressElem.innerText = fundingPercentage + '%';
  progressTextElem.innerText = '$' + fundingLeft.toLocaleString() + ' to go';
});
xhr.open('GET', 'https://api.kivaws.org/v1/loans/search.json?status=fundraising&sort_by=amount_remaining');
xhr.send();

// Avoid a flash of static content
hide();
setTimeout(show, 3000);
