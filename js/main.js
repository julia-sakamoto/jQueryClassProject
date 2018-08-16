$(document).on("pagecreate", "#homePage", (function() {
    $.ajax({
        type: 'GET',
        url: 'json/customer.json', 
        dataType: 'json',
        success: parseCustomer,
        error: errMsg
    });
}));

function errMsg(req, status, err) {
    alert(`${req} ${status} ${err}`);
}

function parseCustomer(data) {
    let cust = data.customer;

    for (i = 0; i < cust.length; i++) {
        $("#invoice").append(
            `
            <div>
            <a onclick="showInv(${i})" class="ui-btn">Show Invoice from ${cust[i].compName}</a>
            <div data-role='collapsible' style="display: none;" class="showInvoices${i}"></div>
            </div>
            `
        );

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

                <div class="ui-grid-a">
                    <div class="ui-block-a">
						<a href="mailto:${cust[i].compEmail}" data-role="button" class="ui-btn"	>Send Email</a>
					</div>
                    <div class="ui-block-b" class="ui-btn">
                        <button id="btnmap" class="map ui-btn" onclick="drawMap('${cust[i].compAddr}', ${i})">Show on Map</button>
					</div>
                </div>
                <canvas id="canvasMap${i}"></canvas>
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

$(document).on("pagecreate", "#invoicePage", (function() {
    
    $.ajax({
        type: 'GET',
        url: 'json/invoice.json', 
        dataType: 'json',
        success: parseInvoice,
        error: errMsg
    });
}));

function parseInvoice(data) {
    for (i = 0; i < data.length; i++) {
        var inv = data[i];
        $(`.showInvID${i}`).append(`
        <p>Invoice Number: ${inv[0].invNum}</p>
        `);

        for (j = 0; j < inv.length; j++) {
            $(`.showInvoices${i}`).append(`
            <div class="inv${j}">
            <p>Invoice Number: ${inv[j].invNum}</p>
            <p>Invoice Date: ${inv[j].invDate}</p>
            <p>Invoice Amount: ${inv[j].invAmt}</p>
            <p>cust ID: ${inv[j].product.prodId}</p>
            <p>cust Quantity: ${inv[j].product.qty}</p>
            <p>----</p><br>
            </div>
            `);
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

// Here is the showProducts.js code 
$(document).on("pagecreate", "#productPage", function(event, data) {
	$.ajax({
		type: 'GET',
		url: 'json/product.json', 
		dataType: 'json',
		success: parseProduct,
		error: errMsg
	});

	function errMsg(req, status, err) {
		alert(`${req} ${status} ${err}`);
	}
	
	function parseProduct(data) {
	
		var product = data.product;
		console.log(product);

		for (var i = 0; i < product.length; i++) {
			var content = "<div data-role='collapsible'><h4>" + product[i].prodName + "\n- $" + product[i].prodAmt.toFixed(2) + "</h4><p id=" + 'prodDesc' + i +"></p><p id=" + 'prodAmt' + i + "></p></div>";
			
			$("#products").append(content).collapsibleset('refresh');
			$("#prodDesc"+i).append(product[i].prodDesc);
			$("#prodAmt"+i).append();
		}
	}
});

function drawMap(addr, i) {
    var lat = 0;
    var lng = 0;

    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 12,   
        mapTypeId: google.maps.MapTypeId.ROADMAP   
    };
    var map = new google.maps.Map($(`#canvasMap${i}`), mapOptions);

    var myMarker = new google.maps.Marker ({
        map: map,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(lat, lng)
    });

    var info = new google.maps.InfoWindow({
        content: addr,
        maxWidth: 150
    });

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': addr}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
        } else {
            alert("Invalid Address");
        }
    });
}