/*Vendor reports starts*/
/*Vendor reports variables starts*/
var dwnldInvoiceDetailsGridObj;
var vendorSalesReportFormName = "vendorSalesReportForm", vendorItemsReportFormName = "vendorItemsReportForm", vendorPaymentReportSearchFormName = "vendorPaymentReportForm", vendorCustomerPaymentReportSearchFormName = "vendorCustomerPaymentReportForm";
var vendorCustomerPayRprtGridFormName = "VENDORCUSTOMERPAYMENTREPORTGRID";
var reportPaymentInvoiceSearchFormName = "reportPaymentInvoiceSearchForm";
var reportDownloadAllSearchFormName = "reportDownloadAllSearchForm";
var vendorCustomerPayRprtGridPaymentIds = [];
/*Vendor reports variables ends*/
/*Venodr Report starts*/
/*Vendor sales report starts*/
function onVendorSalesReportNavItemClick() {
    clearAdminPageContentDivWrapper();
    var vendorSalesReportLytObj = new vendorSalesReportLyt();
    var vendorSalesReportDetailsObj = new createBootstrapTable(getVendorSalesReportGridConfigObj());
    var vendorSalesReportSearchFromObj;
    document.getElementById(vendorContentWrapperDivId).appendChild(vendorSalesReportLytObj.base.domObj);
    vendorSalesReportLytObj.base.childs.formWrapper.innerHTML = getVendorSalesReportFormLyt();
    vendorSalesReportLytObj.base.childs.gridWrapper.appendChild(vendorSalesReportDetailsObj.baseObj);
    vendorSalesReportSearchFromObj = document.forms[vendorSalesReportFormName];

    $(vendorSalesReportSearchFromObj.elements["searchBtn"]).click(function () {
        var formData = getFormDataByName(vendorSalesReportFormName, "object");
        loadVendorSalesReportGridData(vendorSalesReportDetailsGridObj, formData["tradePartner"], formData["invoiceId"], formData["skuId"], formData["upcId"], "A");

    });
    $(vendorSalesReportSearchFromObj.elements["clearBtn"]).click(function () {
        clearVendorSalesReportForm(vendorSalesReportFormName);
    });
    var vendorSalesReportDetailsGridObj = $(vendorSalesReportDetailsObj.baseObj);
    vendorSalesReportDetailsGridObj.bootstrapTable({
        data: []
    });

}

function vendorSalesReportLyt() {
    var confObj = {};
    var vendorSalesReportLytObj = document.createElement("div");
    vendorSalesReportLytObj.className = "row";
    var vendorSalesReportSearchFormWrapper = document.createElement("div");
    vendorSalesReportSearchFormWrapper.className = "rprt-form-wrapper";
    var vendorSalesReportSearchGridWrapper = document.createElement("div");
    vendorSalesReportSearchGridWrapper.className = "rprt-grid-wrapper";
    vendorSalesReportLytObj.appendChild(vendorSalesReportSearchFormWrapper);
    vendorSalesReportLytObj.appendChild(vendorSalesReportSearchGridWrapper);
    confObj = {
        base: {
            domObj: vendorSalesReportLytObj,
            childs: {
                formWrapper: vendorSalesReportSearchFormWrapper,
                gridWrapper: vendorSalesReportSearchGridWrapper
            }
        }
    };
    return confObj;
}

function getVendorSalesReportFormLyt() {
    return ajaxSyncLoadForm("/EDIPaged/EDI/ediVendorReport/getVendorSalesReportSearchForm", {});
}

function loadVendorSalesReportGridData(gridDivObj, traderName, invoiceId, skuId, upcId, status) {
    gridDivObj.bootstrapTable("showLoading");
    var gridData = getVendorSalesReportData(traderName, invoiceId, skuId, upcId, status);
    gridDivObj.bootstrapTable("load", gridData);
    gridDivObj.bootstrapTable("mergeCellsById", {id: "   ", field: "tradePartner", colspan: 6, rowspan: 1});
    gridDivObj.bootstrapTable("hideLoading");
}

function clearVendorSalesReportForm(formName) {
    clearFormDataByName(formName);
}

function getVendorSalesReportData(traderName, invoiceId, skuId, upcId, status) {
    var requestString = "traderName=" + encodeURIComponent(traderName) + "&invoiceId=" + encodeURIComponent(invoiceId) + "&skuId=" + encodeURIComponent(skuId) + "&upcId=" + encodeURIComponent(upcId) + "&status=" + encodeURIComponent(status);
    return ediAjaxSync("/EDIPaged/EDI/ediVendorReport/getVendorSalesReportData?" + requestString, {}, "JSON");
}

function getVendorSalesReportGridConfigObj() {
    var vendorSalesReortGridConfObj = {
        tableAttributes: {"data-mobile-responsive": "true", "data-show-header": "true", "data-mobile-responsive": "true",
                    "data-pagination": "true", "data-page-size": "25", "data-page-list": "[25, 50, 100]", "data-unique-id": "srNo", "data-height": "500"},
//        cellPadding: 4,
        columns: [{
                label: "#",
                attributes: {
                    "data-field": "srNo",
                    "data-align": "left"
                },
                css: {
                    //                    width: 40
                }
            }, {
                label: "Trade Partner",
                attributes: {
                    "data-field": "tradePartner",
                    "data-align": "left"
                }, css: {
                    //                    width: 140
                }
            }, {
                label: "Invoice#",
                attributes: {
                    "data-field": "invoiceId",
                    "data-align": "left"
                }, css: {
                    //                    width: 80
                }
            }, {
                label: "SKU#",
                attributes: {
                    "data-field": "skuId",
                    "data-align": "left"
                }, css: {
                    //                    width: 80
                }
            }, {
                label: "UPC#",
                attributes: {
                    "data-field": "upcId",
                    "data-align": "left"
                }, css: {
                    //                    width: 80
                }
            }, {
                label: "Item Color",
                attributes: {
                    "data-field": "itemColor",
                    "data-align": "left"
                }, css: {
                    //                    width: 100
                }
            }, {
                label: "Item Price",
                attributes: {
                    "data-field": "itemPrice",
                    "data-align": "left"
                }, css: {
                    //                    width: 70
                }
            }, {
                label: "Item Quantity",
                attributes: {
                    "data-field": "itemQuantity",
                    "data-align": "left"
                }, css: {
                    //                    width: 120
                }
            }, {
                label: "Amount",
                attributes: {
                    "data-field": "amount",
                    "data-align": "left"
                }, css: {
                    //                    width: 120
                }
            }
        ]
    };
    return vendorSalesReortGridConfObj;
}
/*Vendor sales report ends*/
/*Vendor items report starts*/
function onVendorItemsReportNavItemClick() {
    clearAdminPageContentDivWrapper();
    var vendorItemsReportLytObj = new vendorItemsReportLyt();
    var vendorItemsReportDetailsObj = new createBootstrapTable(getVendorItemsReportGridConfigObj());
    var vendorItemsReportSearchFromObj;
    document.getElementById(vendorContentWrapperDivId).appendChild(vendorItemsReportLytObj.base.domObj);
    vendorItemsReportLytObj.base.childs.formWrapper.innerHTML = getVendorItemsReportFormLyt();
    vendorItemsReportLytObj.base.childs.gridWrapper.appendChild(vendorItemsReportDetailsObj.baseObj);
    vendorItemsReportSearchFromObj = document.forms[vendorItemsReportFormName];

    $(vendorItemsReportSearchFromObj.elements["searchBtn"]).click(function () {
        var formData = getFormDataByName(vendorItemsReportFormName, "object");
        loadVendorItemsReportGridData(vendorItemsReportDetailsGridObj, formData["tradePartner"], formData["upcId"], formData["itemCode"], "A");

    });
    $(vendorItemsReportSearchFromObj.elements["clearBtn"]).click(function () {
        clearVendorItemsReportForm(vendorItemsReportFormName);
    });
    var vendorItemsReportDetailsGridObj = $(vendorItemsReportDetailsObj.baseObj);
    vendorItemsReportDetailsGridObj.bootstrapTable({
        data: []
    });

}

function vendorItemsReportLyt() {
    var confObj = {};
    var vendorSalesReportLytObj = document.createElement("div");
    vendorSalesReportLytObj.className = "row";
    var vendorItemsReportSearchFormWrapper = document.createElement("div");
    vendorItemsReportSearchFormWrapper.className = "rprt-form-wrapper";
    var vendorItemsReportSearchGridWrapper = document.createElement("div");
    vendorItemsReportSearchGridWrapper.className = "rprt-grid-wrapper";
    vendorSalesReportLytObj.appendChild(vendorItemsReportSearchFormWrapper);
    vendorSalesReportLytObj.appendChild(vendorItemsReportSearchGridWrapper);
    confObj = {
        base: {
            domObj: vendorSalesReportLytObj,
            childs: {
                formWrapper: vendorItemsReportSearchFormWrapper,
                gridWrapper: vendorItemsReportSearchGridWrapper
            }
        }
    };
    return confObj;
}

function getVendorItemsReportFormLyt() {
    return ajaxSyncLoadForm("/EDIPaged/EDI/ediVendorReport/getVendorItemsReportSearchForm", {});
}

function loadVendorItemsReportGridData(gridDivObj, traderName, upcId, itmeCode, status) {
    gridDivObj.bootstrapTable("showLoading");
    var gridData = getVendorItemsReportData(traderName, upcId, itmeCode, status);
    gridDivObj.bootstrapTable("load", gridData);
    gridDivObj.bootstrapTable("mergeCellsById", {id: "   ", field: "tradePartner", colspan: 6, rowspan: 1});
    gridDivObj.bootstrapTable("hideLoading");
}

function clearVendorItemsReportForm(formName) {
    clearFormDataByName(formName);
}

function getVendorItemsReportData(traderName, upcId, itmeCode, status) {
    var requestString = "traderName=" + encodeURIComponent(traderName) + "&itmeCode=" + encodeURIComponent(itmeCode) + "&upcId=" + encodeURIComponent(upcId) + "&status=" + encodeURIComponent(status);
    return ediAjaxSync("/EDIPaged/EDI/ediVendorReport/getVendorItemsReportData?" + requestString, {}, "JSON");
}

function getVendorItemsReportGridConfigObj() {
    var vendorItemsReortGridConfObj = {
        tableAttributes: {"data-mobile-responsive": "true", "data-show-header": "true", "data-mobile-responsive": "true",
                    "data-pagination": "true", "data-page-size": "25", "data-page-list": "[25, 50, 100]", "data-unique-id": "srNo", "data-height": "500"},
//        cellPadding: 4,
        columns: [{
                label: "#",
                attributes: {
                    "data-field": "srNo",
                    "data-align": "left"
                },
                css: {
                    //                    width: 40
                }
            }, {
                label: "UPC#",
                attributes: {
                    "data-field": "upcId",
                    "data-align": "left"
                }, css: {
                    //                    width: 80
                }
            }, {
                label: "Item Code(SKU#)",
                attributes: {
                    "data-field": "skuId",
                    "data-align": "left"
                }, css: {
                    //                    width: 80
                }
            }, {
                label: "Item Description",
                attributes: {
                    "data-field": "itemDescription",
                    "data-align": "left"
                }, css: {
                    //                    width: 100
                }
            }, {
                label: "Item Color",
                attributes: {
                    "data-field": "itemColor",
                    "data-align": "left"
                }, css: {
                    //                    width: 100
                }
            }, {
                label: "Item Price",
                attributes: {
                    "data-field": "itemPrice",
                    "data-align": "left"
                }, css: {
                    //                    width: 70
                }
            }, {
                label: "Retail Price",
                attributes: {
                    "data-field": "retailPrice",
                    "data-align": "left"
                }, css: {
                    //                    width: 120
                }
            }
        ]
    };
    return vendorItemsReortGridConfObj;
}
/*Vendor items report ends*/
/*Vendor Customer address starts*/
function onVendorCustomerAddressNavItemClick() {
    clearAdminPageContentDivWrapper();
    document.getElementById(vendorContentWrapperDivId).innerHTML = '<table border="1" cellpadding="1" cellspacing="1" width="100%"><tr height="25"><td align="center" colspan="4" bgcolor="#3399ff"><font face="arial" size="2" color="white"><b>customer address</b></font></td></tr><tr height="20"><td align="left" bgcolor="#ffffff"><font face="arial" size="2">Amar Mandalapu <br>PO.BOX No. 870<br>SEATTLE<br>SEATTLE-Washington<br>USA-98111<br>Phno:123-455-6789<br>Email:mandalapu@yahoo.com</font></td><tr height="25"><td align="center" colspan="4" bgcolor="#3399ff"><input type="button" name="print" value="print" onclick="javascript:window.print();" class="button" style="border-left-color: mediumblue;border-right-color: mediumblue; border-bottom-color: indigo; border-top-color: mediumblue;font-style: normal; border-left-style: double; background-color: lavender; border-bottom-style: solid"></td></tr></table>';
}
/*Vendor Customer address ends*/
/*Vendor Customer payment report starts*/
function onVendorCustomerPaymentNavItemClick() {
    clearAdminPageContentDivWrapper();

    var vendorCustomerPaymentReportLytObj = new vendorReportPaymentLyt();
//    var vendorCustomerPaymentReportOpenInvoiceDetailsObj = new createBootstrapTable(getVendorCustomerPaymentReportOpenInvoiceGridLyt());
//    var vendorCustomerPaymentReportPayedInvoiceDetailsObj = new createBootstrapTable(getVendorCustomerPaymentReportPayedInvoiceGridLyt());
    var vendorCustomerPaymentReportSearchFormObj;
    document.getElementById(vendorContentWrapperDivId).appendChild(vendorCustomerPaymentReportLytObj.base.domObj);
    vendorCustomerPaymentReportLytObj.base.childs.formWrapper.innerHTML = getVendorCustomerPaymentReportDwnldFormLyt();
    vendorCustomerPaymentReportSearchFormObj = document.forms[vendorCustomerPaymentReportSearchFormName];
    $(vendorCustomerPaymentReportSearchFormObj).children()[1].style.display = "none";
    vendorCustomerPaymentReportSearchFormObj.elements["submit"].style.display = "none";
    var gridWrapperObj = $(vendorCustomerPaymentReportLytObj.base.childs.gridWrapper);
    $(vendorCustomerPaymentReportSearchFormObj.elements["searchBtn"]).click(function () {
        vendorCustomerPayRprtGridPaymentIds = [];
        getVendorCustomerReportPaymentStatusGrid(gridWrapperObj, vendorCustomerPaymentReportSearchFormName);
    });

    $(vendorCustomerPaymentReportSearchFormObj.elements["submit"]).click(function () {
        onVenodorCustomerRprtPaySubmitBtnClicked(vendorCustomerPayRprtGridFormName, vendorCustomerPaymentReportSearchFormName, gridWrapperObj);
    });
    $(vendorCustomerPaymentReportSearchFormObj.elements["clearBtn"]).click(function () {
        gridWrapperObj.empty();
        vendorCustomerPayRprtGridPaymentIds = [];
        clearVendorCustomerPaymentReportForm(vendorCustomerPaymentReportSearchFormName);
    });
    $(vendorCustomerPaymentReportSearchFormObj.elements["amount"]).change(function () {
        onVenodorCustomerRprtAmountEntered(vendorCustomerPaymentReportSearchFormName);
    });
    $(vendorCustomerPaymentReportSearchFormObj.elements["paymentMethod"]).change(function () {
        onVenodorCustomerRprtPayMethodChanged(vendorCustomerPaymentReportSearchFormName);
    });

//    var panel= $("#panel");
//var inputs = panel.find("input");
    var dateRange = $(vendorCustomerPaymentReportSearchFormObj.elements["invoiceFromDate"].parentElement.parentElement.parentElement).datepicker({
        weekStart: 1,
        todayBtn: "linked",
        clearBtn: true,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true,
        inputs: [vendorCustomerPaymentReportSearchFormObj.elements["invoiceFromDate"], vendorCustomerPaymentReportSearchFormObj.elements["invoiceToDate"]]

    });
    var invoiceDate = $(vendorCustomerPaymentReportSearchFormObj.elements["invoiceDate"].parentElement).datepicker({
        weekStart: 1,
        todayBtn: "linked",
        clearBtn: true,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true,
        inputs: [vendorCustomerPaymentReportSearchFormObj.elements["invoiceDate"]]
    });
}

function getVendorCustomerReportPaymentStatusGrid(gridWrappeObj, formName) {
    var formData = getFormDataByName(formName, "object");
    if (formData["paymentType"] === "D") {
        clearFormItems(formName, ["refChequeNo", "memo", "depositTo"]);

        var formObj = document.forms[formName];
        var payMethodObj = formObj.elements["paymentMethod"];
        $(payMethodObj).val("select");
        formObj.elements["refChequeNo"].value = "";
        formObj.elements["memo"].value = "";
        formObj.elements["depositTo"].value = "";
        onVenodorCustomerRprtPayMethodChanged(formName);
        $(formObj).children()[1].style.display = "";
        var tradePartnerBalance = getVendorTradePartnerBalance(formObj.elements["tradePartner"].value);
        formObj.elements["customerPreviousBalance"].value = tradePartnerBalance;
        formObj.elements["amount"].removeAttribute("readonly");
        formObj.elements["amount"].value = "0.00";
        setVendorCustomerReportAmounts(formName, tradePartnerBalance, tradePartnerBalance);
        gridWrappeObj.empty();
//        var vendorCustomerPaymentReportOpenInvoiceDetailsObj = new createBootstrapTable(getVendorCustomerPaymentReportOpenInvoiceGridLyt());
//        gridWrappeObj.append(vendorCustomerPaymentReportOpenInvoiceDetailsObj.baseObj);
//        var vendorCustomerPaymentReportOpenInvoiceDetailsGridObj = $(vendorCustomerPaymentReportOpenInvoiceDetailsObj.baseObj);
//        vendorCustomerPaymentReportOpenInvoiceDetailsGridObj.bootstrapTable({
//            data: []
//        });
//        vendorCustomerPaymentReportOpenInvoiceDetailsGridObj.on('pre-body.bs.table', function () {
//            vendorCustomerPaymentReportOpenInvoiceDetailsGridObj.bootstrapTable("showLoading");
//        });
//        vendorCustomerPaymentReportOpenInvoiceDetailsGridObj.on('post-body.bs.table', function () {
//            vendorCustomerPaymentReportOpenInvoiceDetailsGridObj.bootstrapTable("hideLoading");
//        });
        loadVendorCustomerPaymentReportOpenInvoiceGrid($(gridWrappeObj), formData);
    } else if (formData["paymentType"] === "P") {
        var formObj = document.forms[formName];
        $(formObj).children()[1].style.display = "none";
        formObj.elements["submit"].style.display = "none";
        gridWrappeObj.empty();
        var vendorCustomerPaymentReportPayedInvoiceDetailsObj = new createBootstrapTable(getVendorCustomerPaymentReportPayedInvoiceGridLyt());
        gridWrappeObj.append(vendorCustomerPaymentReportPayedInvoiceDetailsObj.baseObj);
        var vendorCustomerPaymentReportPayedInvoiceDetailsGridObj = $(vendorCustomerPaymentReportPayedInvoiceDetailsObj.baseObj);
        vendorCustomerPaymentReportPayedInvoiceDetailsGridObj.bootstrapTable({
            data: []
        });
//        vendorCustomerPaymentReportPayedInvoiceDetailsGridObj.on('pre-body.bs.table', function () {
//            vendorCustomerPaymentReportPayedInvoiceDetailsGridObj.bootstrapTable("showLoading");
//        });
//        vendorCustomerPaymentReportPayedInvoiceDetailsGridObj.on('post-body.bs.table', function () {
//            vendorCustomerPaymentReportPayedInvoiceDetailsGridObj.bootstrapTable("hideLoading");
//        });
        loadVendorCustomerPaymentReportPayedInvoiceGrid(vendorCustomerPaymentReportPayedInvoiceDetailsGridObj, formData);
    }
}

function getVendorTradePartnerBalance(tradePartner) {
    var tradePartnerBal = ediAjaxSync("/EDIPaged/EDI/ediVendorReport/getVendorTradePartnerBalance?tradePartner=" + tradePartner, {});
    if (isNaN(tradePartnerBal)) {
        tradePartnerBal = 0.00;
    }
    return parseFloat(tradePartnerBal).toFixed(2);
}

function onVenodorCustomerRprtAmountEntered(formName) {
    var formObj = document.forms[formName];
    var enteredAmountObj = formObj.elements["amount"];
    var enteredAmount = enteredAmountObj.value;
    var vendorPrevBalance = formObj.elements["customerPreviousBalance"].value;
    if (enteredAmount.trim() === "") {
        console.log("Please enter amount");
        enteredAmountObj.focus();
        return false;
    }
    var validateValue = validateNumber(enteredAmount);
    if (!validateValue.isSuccess) {
        if (validateValue.error === "NAN") {
            console.log("Please enter nos only");
        }
        if (validateValue.error === "NAP") {
            console.log("Please enter positve integer");
        }
        enteredAmountObj.value = "0.00";
        enteredAmountObj.focus();
        return false;
    }

    var decimalValueObj = validate2DecimalValue(parseFloat(enteredAmount));
    if (!decimalValueObj.isSuccess) {
        console.log("Please enter amouont with two degits after decimal point");
        enteredAmountObj.value = "0.00";
        enteredAmountObj.focus();
        return false;
    }
    var decimalValue = decimalValueObj.value;
    if (isNaN(vendorPrevBalance)) {
        vendorPrevBalance = 0.00;
    }
    vendorPrevBalance = parseFloat(vendorPrevBalance);
    vendorPrevBalance = parseFloat(vendorPrevBalance.toFixed(2));
    var totalAmount = vendorPrevBalance + decimalValue;
    enteredAmountObj.value = appendDecimalToString(roundFloatValue(enteredAmount));
    enteredAmountObj.setAttribute("readonly", true);
    formObj.elements["submit"].style.display = "";
    setVendorCustomerReportAmounts(formName, totalAmount, totalAmount);
}

function onVenodorCustomerRprtPayMethodChanged(formName) {
    var formObj = document.forms[formName];
    var payMethodObj = formObj.elements["paymentMethod"];
    var payMethodVal = payMethodObj.value;
    if (payMethodVal === "CASH") {
        formObj.elements["refChequeNo"].setAttribute("readonly", true);
    } else {
        formObj.elements["refChequeNo"].removeAttribute("readonly");
    }
    return true;
}

function setVendorCustomerReportAmounts(formName, totalAmount, outAmount) {
    var formObj = document.forms[formName];

    if (isNaN(totalAmount)) {
        totalAmount = 0.00;
    }
    if (isNaN(outAmount)) {
        outAmount = 0.00;
    }
    totalAmount = appendDecimalToString(totalAmount);
    outAmount = appendDecimalToString(outAmount);

    formObj.elements["totalAmount"].value = totalAmount;
    formObj.elements["outstandingAmount"].value = outAmount;
}

function loadVendorCustomerPaymentReportOpenInvoiceGrid(gridDivObj, formData) {
//    gridDivObj.bootstrapTable("showLoading");
    var gridData = getVendorCustomerPaymentReportOpenInvoiceData(formData);
    $(gridDivObj).html("");
    $(gridDivObj).html(gridData);
//    $(gridDivObj).find("tbody").html("");
//    $(gridDivObj).find("tbody").html(gridData);
//    gridDivObj.bootstrapTable("load", gridData);
//    gridDivObj.bootstrapTable("mergeCellsById", {id: "   ", field: "invoiceId", colspan: 8, rowspan: 1});
//    gridDivObj.bootstrapTable("hideLoading");
}

function loadVendorCustomerPaymentReportPayedInvoiceGrid(gridDivObj, formData) {
    gridDivObj.bootstrapTable("showLoading");
    var gridData = getVendorCustomerPaymentReportPayedInvoiceData(formData);
    gridDivObj.bootstrapTable("load", gridData);
    gridDivObj.bootstrapTable("hideLoading");
}

function clearFormItems(formName, itemsList) {
    var formObj = document.forms[formName];
    for (var itemInd = 0; itemInd < itemsList; itemInd++) {
        formObj[itemsList[itemInd]].value = formObj[itemsList[itemInd]].defaultValue;
    }
}

function clearVendorCustomerPaymentReportForm(formName) {
    var formObj = document.forms[formName];
    formObj.elements["submit"].style.display = "none";
    formObj.elements["amount"].removeAttribute("readonly");
    clearFormDataByName(formName);
}

function getVendorCustomerPaymentReportDwnldFormLyt() {
    return ajaxSyncLoadForm("/EDIPaged/EDI/ediVendorReport/getVendorCustomerPaymentsReportSearchForm", {});//Customer
}

function getVendorCustomerPaymentReportOpenInvoiceGridLyt() {
    var vendoerCustomerPaymentReportConfigObj = {
        tableAttributes: {"data-mobile-responsive": "true", "data-show-header": "true", "data-mobile-responsive": "true",
                    "data-pagination": "true", "data-page-size": "25", "data-page-list": "[25, 50, 100]", "data-unique-id": "srNo", "data-height": "350"}
        ,
//        cellPadding: 4,
        columns: [{
                label: "   ",
                attributes: {
                    "data-field": "select",
                    "data-align": "left"
                }
            }, {
                label: "Invoice #",
                attributes: {
                    "data-field": "invoiceId",
                    "data-align": "left"
                }
            }, {
                label: "Invoice Date",
                attributes: {
                    "data-field": "invoiceDate",
                    "data-align": "left"
                }
            }, {
                label: "P.O #",
                attributes: {
                    "data-field": "poId",
                    "data-align": "left"
                }
            }, {
                label: "Qty",
                attributes: {
                    "data-field": "quantity",
                    "data-align": "left"
                }
            }, {
                label: "Store #",
                attributes: {
                    "data-field": "storeId",
                    "data-align": "left"
                }
            }, {
                label: "Amount",
                attributes: {
                    "data-field": "amount",
                    "data-align": "left"
                }
            }, {
                label: "Amount Received",
                attributes: {
                    "data-field": "amountReceived",
                    "data-align": "left"
                }
            }, {
                label: "Due Amount",
                attributes: {
                    "data-field": "dueAmount",
                    "data-align": "left"
                }
            }, {
                label: "Discount",
                attributes: {
                    "data-field": "discount",
                    "data-align": "left"
                }
            }, {
                label: "Pay Received(A.D)",
                attributes: {
                    "data-field": "paymentRecieved",
                    "data-align": "left"
                }
            }, {
                label: "Pay Status",
                attributes: {
                    "data-field": "paymentStatus",
                    "data-align": "left"
                }
            }
        ]
    };
    return vendoerCustomerPaymentReportConfigObj;
}

function getVendorCustomerPaymentReportOpenInvoiceData(formData) {
    var requestString = "requestString=" + encodeURIComponent(JSON.stringify(formData));
    return ajaxSyncLoadGrid("/EDIPaged/EDI/ediVendorReport/getVendorCustomerPaymentsReportOpenInvoiceData?" + requestString);
//    return ediAjaxSync("/EDIPaged/EDI/ediVendorReport/getVendorCustomerPaymentsReportOpenInvoiceData?" + requestString, {}, "JSON");
}

function getVendorCustomerPaymentReportPayedInvoiceGridLyt() {
    var vendoerCustomerPaymentReportConfigObj = {
        tableAttributes: {"data-mobile-responsive": "true", "data-show-header": "true", "data-mobile-responsive": "true",
                    "data-pagination": "true", "data-page-size": "25", "data-page-list": "[25, 50, 100]", "data-unique-id": "srNo", "data-height": "450"}
        ,
//        cellPadding: 4,
        columns: [{
                label: "Store #",
                attributes: {
                    "data-field": "storeId",
                    "data-align": "left"
                }
            }, {
                label: "Invoice #",
                attributes: {
                    "data-field": "invoiceId",
                    "data-align": "left"
                }
            }, {
                label: "P.O #",
                attributes: {
                    "data-field": "poId",
                    "data-align": "left"
                }
            }, {
                label: "Payment Date",
                attributes: {
                    "data-field": "paymentDate",
                    "data-align": "left"
                }
            }, {
                label: "Deposit To",
                attributes: {
                    "data-field": "depositTo",
                    "data-align": "left"
                }
            }, {
                label: "Amount",
                attributes: {
                    "data-field": "ammount",
                    "data-align": "left"
                }
            }, {
                label: "Discount",
                attributes: {
                    "data-field": "discount",
                    "data-align": "left"
                }
            }, {
                label: "Payed Amount",
                attributes: {
                    "data-field": "payedAmount",
                    "data-align": "left"
                }
            }, {
                label: "Pay Status",
                attributes: {
                    "data-field": "paymentStatus",
                    "data-align": "left"
                }
            }, {
                label: "Remove",
                attributes: {
                    "data-field": "removePayment",
                    "data-align": "center",
                    "data-formatter": "removeVenodorCustomerReportPayedInvoiceFmtr"
                }
            }
        ]
    };
    return vendoerCustomerPaymentReportConfigObj;
}

function getVendorCustomerPaymentReportPayedInvoiceData(formData) {
    var requestString = "requestString=" + encodeURIComponent(JSON.stringify(formData));
    return ediAjaxSync("/EDIPaged/EDI/ediVendorReport/getVendorCustomerPaymentsReportPayedInvoiceData?" + requestString, {}, "JSON");
}

function removeVenodorCustomerReportPayedInvoiceFmtr(value) {
    if (!value) {
        return '';
    }
    var removeItem = "<a href='javascript:void(0);' onclick='removeVenodorCustomerReportPayedInvoice(" + JSON.stringify(value) + ");'>Remove</a>";
    return removeItem;
}

function removeVenodorCustomerReportPayedInvoice(paymentDetails) {
    var h = [];
    for (var e in paymentDetails) {
        h.push(e + "=" + encodeURIComponent(paymentDetails[e]));
    }
    var requestText = h.join("&");
    var response = ediAjaxSync("/EDIPaged/EDI/ediVendorReport/updateCustomerPaymentDetails?" + requestText, {});
    var responseJSON = JSON.parse(response);
    var formObj = document.forms[vendorCustomerPaymentReportSearchFormName];
    formObj.elements["searchBtn"].click();
//    if (responseJSON.requestSuccess) {
//    }
}

/*Vendor customer report amount callculation starts*/
function calculateCustomerReportItemAmount(itemId) {
    var searchFormObj = document.forms[vendorCustomerPaymentReportSearchFormName];
    var customerPrevBalanceHelper, enteredAmountHelper, totalAmountHelper, outstandingAmountHelper;
    var customerPrevBalanceObj = searchFormObj.elements["customerPreviousBalance"];
    var enteredAmountObj = searchFormObj.elements["amount"];
    var totalAmountObj = searchFormObj.elements["totalAmount"];
    var outstandingAmountObj = searchFormObj.elements["outstandingAmount"];
    var customerPrevBalance = customerPrevBalanceObj.value;
    var enteredAmount = enteredAmountObj.value;
    var totalAmount = totalAmountObj.value;
    var outstandingAmount = outstandingAmountObj.value;
    totalAmountHelper = parseFloat(roundFloatValue(totalAmount, 2));
    outstandingAmountHelper = parseFloat(roundFloatValue(outstandingAmount, 2));
    var isEnteredAmount = searchFormObj.elements["amount"].getAttribute("readonly");

    var gridFormObj = document.forms[vendorCustomerPayRprtGridFormName];
    var gridItemObj = getCustomerPayRprtGridItems(gridFormObj, itemId);
    var orginalAmount = gridItemObj.orginalamt.value;
    var paymentReceived = gridItemObj.payreceived.value;
    var dueAmount = gridItemObj.dueamt.value;
    var discountAmount = gridItemObj.discount.value;
    var itemTotalAmount = gridItemObj.itemTotal.value;
    var isItemChecked = gridItemObj.check.checked;
    var orginalAmountHelper, discountAmountHelper;

    var gridTotalItemObj = getCustomerPayRprtGridTotalAmntItem(gridFormObj);
    var totalOrginalAmount = gridTotalItemObj.orginalamt.value;
    var totalPaymentReceived = gridTotalItemObj.payreceived.value;
    var totalDueAmount = gridTotalItemObj.dueamt.value;
    var totalDiscountAmount = gridTotalItemObj.discount.value;
    var totalItemsAmount = gridTotalItemObj.itemTotal.value;
    var totalPaymentReceivedHelper, totalDueAmountHelper, totalDiscountAmountHelper;
    orginalAmountHelper = parseFloat(roundFloatValue(orginalAmount, 2));
    discountAmountHelper = parseFloat(roundFloatValue(discountAmount, 2));
    if (isEnteredAmount !== "true") {
        gridItemObj.check.checked = false;
        console.log("Please enter amount");
        return false;
    }
    if (isItemChecked) {
        outstandingAmount = (outstandingAmountHelper - orginalAmountHelper);
        if (outstandingAmount < 0) {
            gridItemObj.check.checked = false;
            console.log("Insufficient funds");
            return false;
        }
    } else {
        outstandingAmount = (outstandingAmountHelper + orginalAmountHelper) - discountAmountHelper;
    }
    outstandingAmountObj.value = appendDecimalToString(roundFloatValue(outstandingAmount));
    totalPaymentReceivedHelper = parseFloat(roundFloatValue(totalPaymentReceived, 2));
    totalDueAmountHelper = parseFloat(roundFloatValue(totalDueAmount, 2));
    totalDiscountAmountHelper = parseFloat(roundFloatValue(totalDiscountAmount, 2));

    if (isItemChecked) {
        gridItemObj.payreceived.value = orginalAmount;
        gridItemObj.dueamt.value = "0.00";
        gridItemObj.discount.value = "0.00";
        gridItemObj.itemTotal.value = orginalAmount;
        gridItemObj.discount.removeAttribute("readonly");
        totalPaymentReceived = parseFloat(roundFloatValue(totalPaymentReceivedHelper + orginalAmountHelper));
        totalDueAmount = parseFloat(roundFloatValue(totalDueAmount - orginalAmountHelper));
        totalItemsAmount = parseFloat(roundFloatValue(totalPaymentReceived - totalDiscountAmountHelper));
        if (vendorCustomerPayRprtGridPaymentIds.indexOf(itemId) < 0) {
            vendorCustomerPayRprtGridPaymentIds.push(itemId);
        }
    } else {
        gridItemObj.payreceived.value = "0.00";
        gridItemObj.dueamt.value = orginalAmount;
        gridItemObj.discount.value = "0.00";
        gridItemObj.itemTotal.value = "0.00";
        gridItemObj.discount.setAttribute("readonly", true);
        totalPaymentReceived = parseFloat(roundFloatValue(totalPaymentReceivedHelper - orginalAmountHelper));
        totalDueAmount = parseFloat(roundFloatValue(totalDueAmountHelper + orginalAmountHelper));
        totalDiscountAmount = parseFloat(roundFloatValue(totalDiscountAmountHelper - discountAmountHelper));
        totalItemsAmount = parseFloat(roundFloatValue(totalPaymentReceived + totalDiscountAmount));
        var index = vendorCustomerPayRprtGridPaymentIds.indexOf(itemId);
        if (index > -1) {
            vendorCustomerPayRprtGridPaymentIds.splice(index, 1);
        }
    }
    gridTotalItemObj.payreceived.value = appendDecimalToString(roundFloatValue(totalPaymentReceived));
    gridTotalItemObj.dueamt.value = appendDecimalToString(roundFloatValue(totalDueAmount));
    gridTotalItemObj.discount.value = appendDecimalToString(roundFloatValue(totalDiscountAmount));
    gridTotalItemObj.itemTotal.value = appendDecimalToString(roundFloatValue(totalItemsAmount));
}

function onCustomerPayRprtGridDiscountFocus(e) {
    e = e || window.event;
//    var target = e.target || e.srcElement;
    e.setAttribute("previous-value", e.value);
}

function calculateCustomerReportItemDiscount(itemId) {
    var searchFormObj = document.forms[vendorCustomerPaymentReportSearchFormName];
    var customerPrevBalanceHelper, enteredAmountHelper, totalAmountHelper, outstandingAmountHelper;
    var customerPrevBalanceObj = searchFormObj.elements["customerPreviousBalance"];
    var enteredAmountObj = searchFormObj.elements["amount"];
    var totalAmountObj = searchFormObj.elements["totalAmount"];
    var outstandingAmountObj = searchFormObj.elements["outstandingAmount"];
    var enteredAmount = enteredAmountObj.value;
    var totalAmount = totalAmountObj.value;
    var outstandingAmount = outstandingAmountObj.value;
    totalAmountHelper = parseFloat(roundFloatValue(totalAmount, 2));
    outstandingAmountHelper = parseFloat(roundFloatValue(outstandingAmount, 2));

    var gridFormObj = document.forms[vendorCustomerPayRprtGridFormName];
    var gridItemObj = getCustomerPayRprtGridItems(gridFormObj, itemId);
    var orginalAmount = gridItemObj.orginalamt.value;
    var paymentReceived = gridItemObj.payreceived.value;
    var dueAmount = gridItemObj.dueamt.value;
    var discountAmount = gridItemObj.discount.value;
    var itemTotalAmount = gridItemObj.itemTotal.value;
    var isItemChecked = gridItemObj.check.checked;

    var gridTotalItemObj = getCustomerPayRprtGridTotalAmntItem(gridFormObj);
    var totalOrginalAmount = gridTotalItemObj.orginalamt.value;
    var totalPaymentReceived = gridTotalItemObj.payreceived.value;
    var totalDueAmount = gridTotalItemObj.dueamt.value;
    var totalDiscountAmount = gridTotalItemObj.discount.value;
    var totalItemsAmount = gridTotalItemObj.itemTotal.value;
    var totalPaymentReceivedHelper, totalDiscountAmountHelper, totalItemsAmountHelper;

    var previousDiscount = gridItemObj.discount.getAttribute("previous-value"), discountDifference;
    var validateValue = validateNumber(discountAmount);
    if (!validateValue.isSuccess) {
        gridItemObj.discount.value = previousDiscount;
        if (validateValue.error === "NAN") {
            console.log("Please enter nos only");
        }
        if (validateValue.error === "NAP") {
            console.log("Please enter positve integer");
        }

        return false;
    }

    var discountAmountValidateObj = validate2DecimalValue(parseFloat(discountAmount));
    if (!discountAmountValidateObj.isSuccess) {
        gridItemObj.discount.value = previousDiscount;
        console.log("Please enter amouont with two degits after decimal point");
        return false;
    }
    var discountAmountHelper = discountAmountValidateObj.value;
    paymentReceived = parseFloat(paymentReceived);
    if (discountAmountHelper > paymentReceived) {
        gridItemObj.discount.value = previousDiscount;
        console.log("Invalid discount");
        return false;
    }
    previousDiscount = parseFloat(roundFloatValue(previousDiscount, 2));
//    discountDifference = discountAmountHelper - previousDiscount;
    outstandingAmount = (outstandingAmountHelper + discountAmountHelper) - previousDiscount;
    totalPaymentReceivedHelper = parseFloat(roundFloatValue(totalPaymentReceived, 2));
    totalDiscountAmountHelper = parseFloat(roundFloatValue(totalDiscountAmount, 2));
    totalItemsAmountHelper = parseFloat(roundFloatValue(totalItemsAmount, 2));
    var itemAfterDiscount = parseFloat(roundFloatValue(paymentReceived - discountAmountHelper));
    totalDiscountAmount = parseFloat(roundFloatValue(totalDiscountAmountHelper + discountAmountHelper) - previousDiscount);
    totalItemsAmount = parseFloat(roundFloatValue(totalPaymentReceivedHelper - totalDiscountAmount));
    gridItemObj.discount.value = roundFloatValue(discountAmount);
    outstandingAmountObj.value = appendDecimalToString(roundFloatValue(outstandingAmount));
    gridItemObj.itemTotal.value = appendDecimalToString(roundFloatValue(itemAfterDiscount));
    gridTotalItemObj.discount.value = appendDecimalToString(roundFloatValue(totalDiscountAmount));
    gridTotalItemObj.itemTotal.value = appendDecimalToString(roundFloatValue(totalItemsAmount));
//    gridItemObj.itemTotal.value = itemAfterDiscount;
}

function getCustomerPayRprtGridItems(formObj, itemId) {
    var orginalAmountObj = formObj.elements["orginalamt" + itemId];
    var paymentReceivedObj = formObj.elements["payreceived" + itemId];
    var dueAmountObj = formObj.elements["dueamt" + itemId];
    var discountAmountObj = formObj.elements["discount" + itemId];
    var itemTotalAmountObj = formObj.elements["itemTotal" + itemId];
    var itemCheckObj = formObj.elements["check" + itemId];
    return {
        "orginalamt": orginalAmountObj,
        "payreceived": paymentReceivedObj,
        "dueamt": dueAmountObj,
        "discount": discountAmountObj,
        "itemTotal": itemTotalAmountObj,
        "check": itemCheckObj
    };
}
function getCustomerPayRprtGridTotalAmntItem(formObj) {
    var orginalAmountObj = formObj.elements["totalorginalamount"];
    var paymentReceivedObj = formObj.elements["totalpayreceived"];
    var dueAmountObj = formObj.elements["totaldueamt"];
    var discountAmountObj = formObj.elements["totaldiscount"];
    var itemTotalAmountObj = formObj.elements["totalitemsamount"];
    return {
        "orginalamt": orginalAmountObj,
        "payreceived": paymentReceivedObj,
        "dueamt": dueAmountObj,
        "discount": discountAmountObj,
        "itemTotal": itemTotalAmountObj
    };
}

function onVenodorCustomerRprtPaySubmitBtnClicked(gridFormName, searchFormName, gridWrapperObj) {
    var paymentItemDetails = [], paymentItem = {};
    var tableBodyObj, itemObj, invoiceId, poId, storeId, invoiceDate, orginalAmount, discount, paidAmount;
    var searchFormObj, searchFormData;
    if (vendorCustomerPayRprtGridPaymentIds.length === 0) {
        showMessage("No payments to submit", "warning");
        return false;
    }

    searchFormObj = document.forms[searchFormName];
    searchFormData = getFormDataByName(searchFormName, "object");
    if (searchFormData["paymentMethod"].trim() === "select") {
        console.log("Select the payment method");
        searchFormObj.elements["paymentMethod"].focus();
        return false;
    }
    if (searchFormData["refChequeNo"].trim() === "" && searchFormData["paymentMethod"].trim() !== "CASH") {
        console.log("Enter the reference number");
        searchFormObj.elements["refChequeNo"].focus();
        return false;
    }
    if (searchFormData["depositTo"].trim() === "") {
        console.log("Enter the deposit to");
        searchFormObj.elements["depositTo"].focus();
        return false;
    }

    tableBodyObj = gridWrapperObj.find("table>tbody");
    for (var itemInd = 1; itemInd <= vendorCustomerPayRprtGridPaymentIds.length; itemInd++) {
        paymentItem = {};
        itemObj = tableBodyObj.find("tr[row-id=item" + vendorCustomerPayRprtGridPaymentIds[itemInd - 1] + "]");
        if (itemObj !== null && itemObj !== undefined && itemObj !== "") {
            invoiceId = itemObj.find("td[column-id=invoiceId]").html();
            poId = itemObj.find("td[column-id=poId]").html();
            storeId = itemObj.find("td[column-id=storeId]").html();
            invoiceDate = itemObj.find("td[column-id=invoiceDate]").html();
            orginalAmount = itemObj.find("td[column-id=amount]>input").val();
            discount = itemObj.find("td[column-id=discount]>input").val();
            paidAmount = itemObj.find("td[column-id=paymentRecieved]>input").val();
            paymentItem["invoiceId"] = encodeURIComponent(invoiceId);
            paymentItem["poNum"] = encodeURIComponent(poId);
            paymentItem["storeDc"] = encodeURIComponent(storeId);
            paymentItem["invoiceDate"] = encodeURIComponent(invoiceDate);
            paymentItem["originalAmount"] = encodeURIComponent(orginalAmount);
            paymentItem["discount"] = encodeURIComponent(discount);
            paymentItem["paidAmount"] = encodeURIComponent(paidAmount);
            paymentItemDetails.push(paymentItem);
        }
    }
    var reqSearchFormData = {};
    reqSearchFormData["tp"] = encodeURIComponent(searchFormData["tradePartner"]);
    reqSearchFormData["beforeTransTdpBal"] = encodeURIComponent(searchFormData["customerPreviousBalance"]);
    reqSearchFormData["enterdAmount"] = encodeURIComponent(searchFormData["amount"]);
    reqSearchFormData["afterTransTdpBal"] = encodeURIComponent(searchFormData["outstandingAmount"]);
    reqSearchFormData["paymentMethod"] = encodeURIComponent(searchFormData["paymentMethod"]);
    reqSearchFormData["cheqRefNo"] = encodeURIComponent(searchFormData["refChequeNo"]);
    reqSearchFormData["dipositTo"] = encodeURIComponent(searchFormData["memo"]);
    reqSearchFormData["memo"] = encodeURIComponent(searchFormData["depositTo"]);

    ediAjaxSync("/EDIPaged/EDI/ediVendorReport/insertCustomerPaymentDetails?formData=" + JSON.stringify(reqSearchFormData) + "&paymentItemDetails=" + JSON.stringify(paymentItemDetails), {}, "");
    searchFormObj.elements["searchBtn"].click();
    vendorCustomerPayRprtGridPaymentIds = [];
}

/*Vendor customer report amount callculation starts*/

/*Vendor Customer payment report ends*/
/*Vendor payments report starts*/
function onVendorPaymentReportNavItemClick() {
    clearAdminPageContentDivWrapper();
    var vendorPaymentReportLytObj = new vendorReportPaymentLyt();
    var vendorPaymentReportDetailsObj = new createBootstrapTable(getVendorPaymentReportGridLyt());
    var vendorPaymentReportSearchFormObj;
//    gutter-10
//    document.getElementById(vendorContentWrapperDivId).className = "gutter-10";
    document.getElementById(vendorContentWrapperDivId).appendChild(vendorPaymentReportLytObj.base.domObj);
    vendorPaymentReportLytObj.base.childs.formWrapper.innerHTML = getVendorPaymentReportDwnldFormLyt();
    vendorPaymentReportLytObj.base.childs.gridWrapper.appendChild(vendorPaymentReportDetailsObj.baseObj);
    vendorPaymentReportSearchFormObj = document.forms[vendorPaymentReportSearchFormName];

    $(vendorPaymentReportSearchFormObj.elements["searchBtn"]).click(function () {
        //        var dataObj = getReportDownloadInvoiceSearchFromData(reportPaymentInvoiceSearchFormName);
        var formData = getFormDataByName(vendorPaymentReportSearchFormName, "object");
        loadVendorPaymentReportGrid(vendorPaymentReportDetailsGridObj, formData);

    });

    $(vendorPaymentReportSearchFormObj.elements["clearBtn"]).click(function () {
        clearVendorPaymentReportForm(vendorPaymentReportSearchFormName);

    });


//    var panel= $("#panel");
//var inputs = panel.find("input");
    var dateRange = $(vendorPaymentReportSearchFormObj.elements["invoiceFromDate"].parentElement.parentElement.parentElement).datepicker({
        weekStart: 1,
        todayBtn: "linked",
        clearBtn: true,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true,
        inputs: [vendorPaymentReportSearchFormObj.elements["invoiceFromDate"], vendorPaymentReportSearchFormObj.elements["invoiceToDate"]]

    });
    var invoiceDate = $(vendorPaymentReportSearchFormObj.elements["invoiceDate"].parentElement).datepicker({
        weekStart: 1,
        todayBtn: "linked",
        clearBtn: true,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true,
        inputs: [vendorPaymentReportSearchFormObj.elements["invoiceDate"]]
    });



    var vendorPaymentReportDetailsGridObj = $(vendorPaymentReportDetailsObj.baseObj);
    vendorPaymentReportDetailsGridObj.bootstrapTable({
        data: []
    });
//    vendorPaymentReportDetailsGridObj.on('pre-body.bs.table', function () {
//        vendorPaymentReportDetailsGridObj.bootstrapTable("showLoading");
//    });
//    vendorPaymentReportDetailsGridObj.on('post-body.bs.table', function () {
//        vendorPaymentReportDetailsGridObj.bootstrapTable("hideLoading");
//    });
}
function loadVendorPaymentReportGrid(gridDivObj, formData) {
    gridDivObj.bootstrapTable("showLoading");
    var gridData = getVendorPaymentReportData(formData);
    gridDivObj.bootstrapTable("load", gridData);
    gridDivObj.bootstrapTable("mergeCellsById", {id: "   ", field: "invoiceId", colspan: 8, rowspan: 1});
    gridDivObj.bootstrapTable("hideLoading");
}

function clearVendorPaymentReportForm(formName) {
    clearFormDataByName(formName);
}

function getVendorPaymentReportDwnldFormLyt() {
    return ajaxSyncLoadForm("/EDIPaged/EDI/ediVendorReport/getVendorPaymentsReportSearchForm", {});
}

function getVendorPaymentReportGridLyt() {
    var dwnldInvoiceSearchConfObj = {
        tableAttributes: {"data-mobile-responsive": "true", "data-show-header": "true", "data-mobile-responsive": "true",
                    "data-pagination": "true", "data-page-size": "25", "data-page-list": "[25, 50, 100]", "data-unique-id": "srNo", "data-height": "500"}
        ,
//        cellPadding: 4,
        columns: [{
                label: "#",
                attributes: {
                    "data-field": "srNo",
                    "data-align": "left"
                }
            }, {
                label: "Invoice #",
                attributes: {
                    "data-field": "invoiceId",
                    "data-align": "left"
                }
            }, {
                label: "Invoice Date",
                attributes: {
                    "data-field": "invoiceDate",
                    "data-align": "left"
                }
            }, {
                label: "Bill To",
                attributes: {
                    "data-field": "billTo",
                    "data-align": "left"
                }
            }, {
                label: "P.O #",
                attributes: {
                    "data-field": "poId",
                    "data-align": "left"
                }
            }, {
                label: "Department",
                attributes: {
                    "data-field": "department",
                    "data-align": "left"
                }
            }, {
                label: "Cartoons",
                attributes: {
                    "data-field": "cartoons",
                    "data-align": "left"
                }
            }, {
                label: "Store #",
                attributes: {
                    "data-field": "store",
                    "data-align": "left"
                }
            }, {
                label: "Quantity",
                attributes: {
                    "data-field": "quantity",
                    "data-align": "left"
                }
            }, {
                label: "Amount",
                attributes: {
                    "data-field": "amount",
                    "data-align": "left"
                }
            }, {
                label: "Payment Status",
                attributes: {
                    "data-field": "paymentStatus",
                    "data-align": "left"
                }
            }
        ]
    };
    return dwnldInvoiceSearchConfObj;
}

function getVendorPaymentReportData(formData) {
    var requestString = "requestString=" + encodeURIComponent(JSON.stringify(formData));
    return ediAjaxSync("/EDIPaged/EDI/ediVendorReport/getVendorPaymentsReportData?" + requestString, {}, "JSON");
}
/*Vendor payments report ends*/
/*Vendor Report ends*/
/*Vendor reports payments invoices starts*/
function onReportPaymentsInvoiceNavItemClick() {
    clearAdminPageContentDivWrapper();
    var reportPaymentInvoiceLytObj = new vendorReportPaymentLyt();
    var dwnldInvoiceDetailsObj = new createBootstrapTable(getReportPaymentInvoiceGridLyt());
    var reportDownloadInvoiceSearchFormObj;
    document.getElementById(vendorContentWrapperDivId).appendChild(reportPaymentInvoiceLytObj.base.domObj);
    reportPaymentInvoiceLytObj.base.childs.formWrapper.innerHTML = getReportDwnldInvoiceFormLyt();
    reportPaymentInvoiceLytObj.base.childs.gridWrapper.appendChild(dwnldInvoiceDetailsObj.baseObj);
    reportDownloadInvoiceSearchFormObj = document.forms[reportPaymentInvoiceSearchFormName];

    $(reportDownloadInvoiceSearchFormObj.elements["searchBtn"]).click(function () {
        //        var dataObj = getReportDownloadInvoiceSearchFromData(reportPaymentInvoiceSearchFormName);
        var formData = getFormDataByName(reportPaymentInvoiceSearchFormName, "object");
        loadReportPaymentInvoiceGrid(dwnldInvoiceDetailsGridObj, formData["tradePartner"], formData["poNumber"], formData["fromDate"], formData["toDate"]);

    });
    $(reportDownloadInvoiceSearchFormObj.elements["generateExcelBtn"]).click(function () {
        generateExcelReportDownloadInvoiceSearchForm(reportPaymentInvoiceSearchFormName);
    });

    var dateRange = $(reportDownloadInvoiceSearchFormObj.elements["toDate"].parentElement.parentElement.parentElement).datepicker({
        weekStart: 1,
        todayBtn: "linked",
        clearBtn: true,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true,
        inputs: $('.date')

    });

    var dwnldInvoiceDetailsGridObj = $(dwnldInvoiceDetailsObj.baseObj);
    dwnldInvoiceDetailsGridObj.bootstrapTable({
        data: []
    });
//    dwnldInvoiceDetailsGridObj.on("click-row.bs.table", function (row, element) {
////        console.log(row);
////        console.log(element);
    //    });
//    dwnldInvoiceDetailsGridObj.on('pre-body.bs.table', function () {
//        dwnldInvoiceDetailsGridObj.bootstrapTable("showLoading");
//    });
//    dwnldInvoiceDetailsGridObj.on('post-body.bs.table', function () {
//        dwnldInvoiceDetailsGridObj.bootstrapTable("hideLoading");
//        dwnldInvoiceDetailsGridObj.bootstrapTable("mergeCellsById", {id: "   ", field: "tradePartner", colspan: 6, rowspan: 1});
//    });
}

function vendorReportPaymentLyt() {
    var confObj = {};
    var reportPaymentInvoiceLytObj = document.createElement("div");
    reportPaymentInvoiceLytObj.className = "row";
    var invoiceSearchFormWrapper = document.createElement("div");
    invoiceSearchFormWrapper.className = "rprt-form-wrapper";
    var invoiceSearchGridWrapper = document.createElement("div");
    invoiceSearchGridWrapper.className = "rprt-grid-wrapper";
    reportPaymentInvoiceLytObj.appendChild(invoiceSearchFormWrapper);
    reportPaymentInvoiceLytObj.appendChild(invoiceSearchGridWrapper);
    confObj = {
        base: {
            domObj: reportPaymentInvoiceLytObj,
            childs: {
                formWrapper: invoiceSearchFormWrapper,
                gridWrapper: invoiceSearchGridWrapper
            }
        }
    };
    return confObj;
}

function loadReportPaymentInvoiceGrid(gridDivObj, traderName, poNumber, startDate, endDate) {
//    gridDivObj.bootstrapTable("showLoading");
    var gridData = getReportPaymentInvoiceData(traderName, poNumber, startDate, endDate);
    gridDivObj.bootstrapTable("load", gridData);
    gridDivObj.bootstrapTable("mergeCellsById", {id: "   ", field: "tradePartner", colspan: 6, rowspan: 1});
//    gridDivObj.bootstrapTable("hideLoading");
}

function getReportDwnldInvoiceFormLyt() {
    return ajaxSyncLoadForm("/EDIPaged/EDI/ediVendorReport/reportPaymentsInvoiceSearchForm", {});
}
function getReportPaymentInvoiceGridLyt() {
    var dwnldInvoiceSearchConfObj = {
        tableAttributes: {"data-mobile-responsive": "true", "data-show-header": "true", "data-mobile-responsive": "true",
                    "data-pagination": "true", "data-page-size": "25", "data-page-list": "[25, 50, 100]", "data-unique-id": "srNo", "data-height": "500"}
        ,
//        cellPadding: 4,
        columns: [{
                label: "#",
                attributes: {
                    "data-field": "srNo",
                    "data-align": "left"
                },
                css: {
                    //                    width: 40
                }
            }, {
                label: "Trade Partner",
                attributes: {
                    "data-field": "tradePartner",
                    "data-align": "left"
                }, css: {
                    //                    width: 140
                }
            }, {
                label: "Invoice Date",
                attributes: {
                    "data-field": "invoiceDate",
                    "data-align": "left"
                }, css: {
                    //                    width: 80
                }
            }, {
                label: "Invoice Id",
                attributes: {
                    "data-field": "invoiceId",
                    "data-align": "left"
                }, css: {
                    //                    width: 80
                }
            }, {
                label: "PO Number",
                attributes: {
                    "data-field": "poNumber",
                    "data-align": "left"
                }, css: {
                    //                    width: 80
                }
            }, {
                label: "DC/Store",
                attributes: {
                    "data-field": "dcStore",
                    "data-align": "left"
                }, css: {
                    //                    width: 100
                }
            }, {
                label: "Shipment",
                attributes: {
                    "data-field": "shipment",
                    "data-align": "left"
                }, css: {
                    //                    width: 70
                }
            }, {
                label: "Invoice Amount",
                attributes: {
                    "data-field": "invoiceAmount",
                    "data-align": "left"
                }, css: {
                    //                    width: 120
                }
            }, {
                label: "Total PO Amount",
                attributes: {
                    "data-field": "totalPOAmount",
                    "data-align": "left"
                }, css: {
                    //                    width: 120
                }
            }
        ]
    };
    return dwnldInvoiceSearchConfObj;
}

function getReportPaymentInvoiceData(traderName, poNumber, startDate, endDate) {
    var requestString = "traderName=" + encodeURIComponent(traderName) + "&poNumber=" + encodeURIComponent(poNumber) + "&startDate=" + encodeURIComponent(startDate) + "&endDate=" + encodeURIComponent(endDate);
    return ediAjaxSync("/EDIPaged/EDI/ediVendorReport/getReportPaymentInvoice?" + requestString, {}, "JSON");
}
/*Vendor reports payments invoices ends*/
/*Vendor reports payments invoices starts*/
function onReportDownloadAllNavItemClick() {
    clearAdminPageContentDivWrapper();
    var reportDownloadAllLytObj = new reportDownloadAllLyt();
    var reportDownloadAllGridLytObj = new createBootstrapTable(getReportDwnldAllGridLyt());
    var reportDownloadAllSearchFormObj;
    document.getElementById(vendorContentWrapperDivId).appendChild(reportDownloadAllLytObj.base.domObj);
    reportDownloadAllLytObj.base.childs.formWrapper.innerHTML = getReportDwnldAllFormLyt();
    reportDownloadAllLytObj.base.childs.gridWrapper.appendChild(reportDownloadAllGridLytObj.baseObj);
    reportDownloadAllSearchFormObj = document.forms[reportDownloadAllSearchFormName];

    $(reportDownloadAllSearchFormObj.elements["searchBtn"]).click(function () {
        var formData = getFormDataByName(reportDownloadAllSearchFormName, "object");
        loadReportDownloadEdiAllFilesGrid(dwnldAllDetailsGridObj, formData["tradePartner"], formData["transaction"], formData["fromDate"], formData["toDate"]);

    });

    var dateRange = $(reportDownloadAllSearchFormObj.elements["toDate"].parentElement.parentElement.parentElement).datepicker({
        weekStart: 1,
        todayBtn: "linked",
        clearBtn: true,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true,
        inputs: $('.date')

    });

    var dwnldAllDetailsGridObj = $(reportDownloadAllGridLytObj.baseObj);
    dwnldAllDetailsGridObj.bootstrapTable({
        data: []
    });
//    dwnldInvoiceDetailsGridObj.on("click-row.bs.table", function (row, element) {
////        console.log(row);
////        console.log(element);
    //    });
//    dwnldAllDetailsGridObj.on('pre-body.bs.table', function () {
//        dwnldAllDetailsGridObj.bootstrapTable("showLoading");
//    });
//    dwnldAllDetailsGridObj.on('post-body.bs.table', function () {
//        dwnldAllDetailsGridObj.bootstrapTable("hideLoading");
//    });
}

function reportDownloadAllLyt() {
    var confObj = {};
    var reportPaymentInvoiceLytObj = document.createElement("div");
    reportPaymentInvoiceLytObj.className = "row";
    var downloadAllSearchFormWrapper = document.createElement("div");
    downloadAllSearchFormWrapper.className = "rprt-form-wrapper";
    var downloadAllSearchGridWrapper = document.createElement("div");
    downloadAllSearchGridWrapper.className = "rprt-grid-wrapper";
    reportPaymentInvoiceLytObj.appendChild(downloadAllSearchFormWrapper);
    reportPaymentInvoiceLytObj.appendChild(downloadAllSearchGridWrapper);
    confObj = {
        base: {
            domObj: reportPaymentInvoiceLytObj,
            childs: {
                formWrapper: downloadAllSearchFormWrapper,
                gridWrapper: downloadAllSearchGridWrapper
            }
        }
    };
    return confObj;
}

function loadReportDownloadEdiAllFilesGrid(gridDivObj, traderName, transaction, startDate, endDate) {
    gridDivObj.bootstrapTable("showLoading");
    var gridData = getReportDownloadEdiAllFilesData(traderName, transaction, startDate, endDate);
    gridDivObj.bootstrapTable("load", gridData);
    gridDivObj.bootstrapTable("hideLoading");
}

function getReportDwnldAllFormLyt() {
    return ajaxSyncLoadForm("/EDIPaged/EDI/ediVendorReport/reportDownloadAllEDIFilesSearchForm", {});
}
function getReportDwnldAllGridLyt() {
    var dwnldAllSearchGridConfObj = {
        tableAttributes: {"data-mobile-responsive": "true", "data-show-header": "true", "data-mobile-responsive": "true",
                    "data-pagination": "true", "data-page-size": "25", "data-page-list": "[25, 50, 100]", "data-unique-id": "srNo", "data-height": "500"}
        ,
//        cellPadding: 4,
        columns: [{
                label: "#",
                attributes: {
                    "data-field": "srNo",
                    "data-align": "left"
                },
                css: {
                    //                    width: 40
                }
            }, {
                label: "Trade Partner",
                attributes: {
                    "data-field": "tradePartner",
                    "data-align": "left"
                }, css: {
                    //                    width: 140
                }
            }, {
                label: "Transaction",
                attributes: {
                    "data-field": "transaction",
                    "data-align": "left"
                }, css: {
                    //                    width: 80
                }
            }, {
                label: "Date",
                attributes: {
                    "data-field": "date",
                    "data-align": "left"
                }, css: {
                    //                    width: 80
                }
            }, {
                label: "PO Number",
                attributes: {
                    "data-field": "poNumber",
                    "data-align": "left"
                }, css: {
                    //                    width: 80
                }
            }, {
                label: "DC",
                attributes: {
                    "data-field": "dc",
                    "data-align": "left"
                }, css: {
                    //                    width: 100
                }
            }, {
                label: "Store",
                attributes: {
                    "data-field": "store",
                    "data-align": "left"
                }, css: {
                    //                    width: 100
                }
            }, {
                label: "File Download",
                attributes: {
                    "data-field": "fileDownload",
                    "data-align": "left",
                    "data-formatter": "reportDownloadAllFilesGridFormatter"
                }, css: {
                    //                    width: 120
                }
            }
        ]
    };
    return dwnldAllSearchGridConfObj;
}

function reportDownloadAllFilesGridFormatter(value) {
    if (!value) {
        return '';
    }
    var path = 'http://' + value.replace(/\*/g, '/');

    var downloadItem = "<a href='javascript:void(0);' onClick=reportAllFilesDownloadByPath('" + path + "');>Download</a>";
    return downloadItem;
}

function reportAllFilesDownloadByPath(path) {
    window.location = path;
}

function getReportDownloadEdiAllFilesData(traderName, transaction, startDate, endDate) {
    var requestString = "traderName=" + encodeURIComponent(traderName) + "&transaction=" + encodeURIComponent(transaction) + "&startDate=" + encodeURIComponent(startDate) + "&endDate=" + encodeURIComponent(endDate);
    return ediAjaxSync("/EDIPaged/EDI/ediVendorReport/getReportDownloadEdiAllFiles?" + requestString, {}, "JSON");
}
/*Vendor reports payments invoices ends*/
/*Vendor reports ends*/