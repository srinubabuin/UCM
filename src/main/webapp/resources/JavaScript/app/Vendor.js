/*Vendor Variables starts*/

/*Vendor Variables ends*/
/*Venodor home page starts*/
/*Vendor home status variables starts*/
var vendorDialyStatusGridObj;
/*Vendor home status variables ends*/
function ediVendorHomeNavMenuClick(id) {
    if (id === "VENDORHOMENAVITEM") {
        onVendorHomeNavItemClick();
    } else if (id === "EDITRANSACADDSEGMENTNAVITEM") {
        onVendorEDITransactionAddSegmentClick();
    } else if (id === "EDITRANSACADDELEMENTNAVITEM") {
        onVendorEDITransactionAddElementClick();
    } else if (id === "EDITRANSACMODIFYSEGMENTNAVITEM") {
        onVendorEDITransactionModifySegmentNElementClick();
    } else if (id === "VENDORSALESREPORTNAVITEM") {
        onVendorSalesReportNavItemClick();
    } else if (id === "VENDORITEMSREPORTNAVITEM") {
        onVendorItemsReportNavItemClick();
    } else if (id === "VENDORCUSTOMERADDRESSNAVITEM") {
        onVendorCustomerAddressNavItemClick();
    } else if (id === "VENDORCUSTOMERPAYMENTNAVITEM") {
        onVendorCustomerPaymentNavItemClick();
    } else if (id === "VENDORPAYMENTREPORTNAVITEM") {
        onVendorPaymentReportNavItemClick();
    } else if (id === "REPORTPAYMENTSINVOICESNAVITEM") {
        onReportPaymentsInvoiceNavItemClick();
    } else if (id === "REPORTDOWNLOADSALLNAVITEM") {
        onReportDownloadAllNavItemClick();
    } else if (id === "LOGOUT") {
        doLogout();
    }
    return true;
}

function onVendorHomeNavItemClick() {
    clearAdminPageContentDivWrapper();
    var vendorDialyStatusGridLyt = getVendorDialyStatusGridLyt();
    var vendorDialyStatusGridConfigObj = new createBootstrapTable(vendorDialyStatusGridLyt);
    document.getElementById(vendorContentWrapperDivId).appendChild(vendorDialyStatusGridConfigObj.baseObj);

    vendorDialyStatusGridObj = $(vendorDialyStatusGridConfigObj.baseObj);
    vendorDialyStatusGridObj.bootstrapTable({
        data: []
    });
    vendorDialyStatusGridObj.on("click-row.bs.table", function (row, element) {
    });
//    vendorDialyStatusGridObj.on('pre-body.bs.table', function () {
//        vendorDialyStatusGridObj.bootstrapTable("showLoading");
//    });
    vendorDialyStatusGridObj.on('post-body.bs.table', function () {
        vendorDialyStatusGridObj.bootstrapTable("hideLoading");
        vendorDialyStatusGridObj.bootstrapTable("mergeCells", {index: 0, field: "traderName", colspan: 2, rowspan: 1});
    });
    loadVendorDialyStatusGrid(vendorDialyStatusGridObj);
}

function loadVendorDialyStatusGrid(gridDivObj) {
    var gridData = getVendorDialyStatusGridData();
    gridDivObj.bootstrapTable("load", gridData);
    gridDivObj.bootstrapTable("mergeCells", {index: 0, field: "traderName", colspan: 2, rowspan: 1});
}

function getVendorDialyStatusGridLyt() {
//    return ediAjaxSync("/EDIPaged/EDI/ediVendor/vendorStatusGridLayout", {});
    /* masterHdrColumns: [{
     label: "Trader Name",
     attributes: {
     colspan:"2",
     "data-valign":"middle",
     "data-align": "center"
     }
     }
     ],*/
    var configObj = {
        tableAttributes: {"data-unique-id": "traderName",
            "data-mobile-responsive": "true", "data-show-header": "false", "data-striped": "true"},
//        cellPadding: 4,
        columns: [{
                label: "Trader Name",
                attributes: {
                    "data-field": "traderName",
                    "data-align": "left"
                },
                css: {
                    width: 100
                }
            }, {
                label: "Purchase Orders",
                attributes: {
                    "data-field": "traderPos",
                    "data-align": "left"
                }, css: {
                    width: 300
                }
            }
        ]
    };
    return configObj;
}

function getVendorDialyStatusGridData() {
    return ediAjaxSync("/EDIPaged/EDI/ediVendor/vendorHomeStatus", {}, "JSON");
}
/*Venodor home page ends*/
