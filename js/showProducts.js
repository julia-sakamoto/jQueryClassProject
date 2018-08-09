alert("This ran!");
console.log("This ran.");

$.ajax({
    type: 'GET',
    url: 'json/product.json', 
    dataType: 'json',
    success: parseProduct,
    error: errMsg
});

alert("Ajax ran!");

function errMsg(req, status, err) {
    alert(`${req} ${status} ${err}`);
}

function parseProduct(data) {
	alert("Parsing...");
    var product = data.product;
	console.log(product);

    for (var i = 0; i < product.length; i++) {
        $(".products").append(
            `
            <li class="${i}">
                <button class="ui-btn moreInfo">Show More Info</button>
            </li>
            `
        );

        $(`.${i}`).append(
            `
            <div data-role="collapsible" data-collapsed="true" class="additional">
                <p class="prodName"></p>
                <p class="prodDesc"></p>
                <p class="prodAmt"></p>
            </div>
            `
        );

        $(`.${i} .prodName`).append(product[i].prodName + "<br>");
        $(`.${i} .prodDesc`).append(product[i].prodDesc + "<br>");
        $(`.${i} .prodAmt`).append(product[i].prodAmt + "<br>");
    }
}

function moreInfo() {

}