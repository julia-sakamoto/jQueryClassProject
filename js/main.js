$.ajax({
    type: 'GET',
    url: 'json/customer.json', 
    dataType: 'json',
    success: parseCustomer,
    error: errMsg
});

/*
$.ajax({
    type: 'GET',
    url: '../json/product.json', 
    dataType: 'json',
    success: parseProduct,
    error: errMsg
});
*/

$.ajax({
    type: 'GET',
    url: 'json/invoice.json', 
    dataType: 'json',
    success: parseInvoice,
    error: errMsg
});

function errMsg(req, status, err) {
    alert(`${req} ${status} ${err}`);
}

function parseCustomer(data) {
    let cust = data.customer;

    for (i = 0; i < cust.length; i++) {
        $(".customer").append(
            `
            <li class="${i}">
                <button class="ui-btn moreInfo">Show More Info</button>
            </li>
            `
        );

        $(`.${i}`).append(
            `
            <div data-role="collapsible" data-collapsed="true" class="additional">
                <p class="compName"></p>
                <p class="compAddr"></p>
                <p class="compContact"></p>
                <p class="compPhone"></p>
                <p class="compEmail"></p>

                <div class="controls">
                    <button class="email ui-btn">Send Email</button>
                    <button class="map ui-btn">Show on Maps</button>
                </div>
                <div class="invoices" id="${cust[i].compId}">
                    <button class="showInvoices ui-btn">Show Invoices</button>
                    <div data-role="collapsible" data-collapsed="true" class="invNum ui-btn">Invoice Numbers</div>
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
            
            </div>
            `)
        }
    }
}