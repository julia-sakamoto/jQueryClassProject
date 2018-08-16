$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'json/customer.json', 
        dataType: 'json',
        success: parseCustomer,
        error: errMsg
    });
    
    $.ajax({
        type: 'GET',
        url: 'json/invoice.json', 
        dataType: 'json',
        success: parseInvoice,
        error: errMsg
    });
});

function errMsg(req, status, err) {
    alert(`${req} ${status} ${err}`);
}

function parseCustomer(data) {
    let cust = data.customer;

    for (i = 0; i < cust.length; i++) {
        $("#customer").append(
            `
            <a class="ui-btn moreInfo" onclick="showCust(${i})">${cust[i].compName}</a>
            <div class="${i}" style="display: none;"></div>
            `
        );

        $(`.${i}`).append(
            `
            <div data-role='collapsible' class="content">
                <p class="compName"></p>
                <p class="compAddr"></p>
                <p class="compContact"></p>
                <p class="compPhone"></p>
                <p class="compEmail"></p>

                <div class="ui-grid-b">
                    <div class="ui-block-a">
						<a href="mailto:${cust[i].compEmail}" data-role="button" class="ui-btn">Send Email</a>
					</div>
                    <div class="ui-block-b" class="ui-btn" href="mailto:${cust[i].compAddr}">
						<div class="ui-btn">Show on Map</div>
					</div>
					<div class="ui-block-c" id="${cust[i].compId}">
						<a onclick="showInv(${i})" class="ui-btn">Show Invoices</a>
						<div class="showInvoices${i}" style="display: none;"></div>
					</div>
                </div>
            </div>
            `
        );

        $(`.${i} .compName`).append(cust[i].compName + "<br>");
        $(`.${i} .compAddr`).append(cust[i].compAddr + "<br>");
        $(`.${i} .compContact`).append(cust[i].compContact + "<br>");
        $(`.${i} .compPhone`).append(cust[i].compPhone + "<br>");
        $(`.${i} .compEmail`).append(cust[i].compEmail + "<br>");
    }
}

function parseInvoice(data) {
    for (i = 0; i < data.length; i++) {
        var inv = data[i];

        for (j = 0; j < inv.length; j++) {
            $(`.showInvoices${i}`).append(`
            <div class="inv${j}">
            <p>Invoice Number: ${inv[j].invNum}</p>
            <p>Invoice Date: ${inv[j].invDate}</p>
            <p>Invoice Amount: ${inv[j].invAmt}</p>
            <p>cust ID: ${inv[j].product.prodId}</p>
            <p>cust Quantity: ${inv[j].product.qty}</p>
            </div>
            `)
        }
    }
}

function show(i) {
$(`.${i}`).show();

}

function showInv(i) {
    var style = $(`.showInvoices${i}`).css("display");

    if (style === "none")
        $(`.showInvoices${i}`).slideDown();
    else
			$(`.showInvoices${i}`).slideUp();
}

function showCust(i) {
    var style = $(`.${i}`).css("display");

    if (style === "none")
        $(`.${i}`).slideDown();
    else
        $(`.${i}`).slideUp();
}

function sendMail(email) {
	window.location.href = "mailto:" + email;
}