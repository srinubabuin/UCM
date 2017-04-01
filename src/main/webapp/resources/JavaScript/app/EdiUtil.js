//var ediBrowsersVar = {
//    isIE: (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0),
//    isIE6: (window.XMLHttpRequest === null && navigator.userAgent.indexOf("MSIE") >= 0),
//    isIE7: (navigator.userAgent.indexOf("MSIE 7.0") >= 0 && navigator.userAgent.indexOf("Trident") < 0),
//    isIE8: (navigator.userAgent.indexOf("MSIE 8.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0),
//    isOpera: (navigator.userAgent.indexOf("Opera") >= 0),
//    isChrome: (navigator.userAgent.indexOf("Chrome") >= 0),
//    isKHTML: (navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent.indexOf("Konqueror") >= 0),
//    isFF: (navigator.userAgent.indexOf("Firefox") >= 0)
//};
//
///*Layout creation starts*/
//function cell2Hor() {
//    var confObj = {};
//    var lyt = document.createElement("div");
//    lyt.className = "row";
//    var a = document.createElement("div");
//    a.className = "cellwrapper";
//    var b = document.createElement("div");
//    b.className = "cellwrapper";
//    lyt.appendChild(a);
//    lyt.appendChild(b);
//    confObj = {
//        base: {
//            domObj: lyt,
//            childs: {
//                a: a,
//                b: b
//            }
//        }
//    };
//    return confObj;
//}
///*Layout creation endss*/
//
//
///*Table creation starts*/
//function cellStylePadding4(row, index) {
//    return {
//        classes: " table-cell-pd-2"
//    };
//}
//
//function createBootstrapTable(options) {
//    var tableAttributes = options.tableAttributes;
//    var tableColumnsBase = options.columns;
//    var tableMasterColumnsBase = typeof options.masterHdrColumns === "undefined" ? [] : options.masterHdrColumns;
//    var tableColumns = {
//        columnIds: []
//    };
//    var cellPadingClassName = typeof options.cellPadding === "undefined" ? " " : " table-cell-pd-" + options.cellPadding;
//    var tableConfigObj = {};
//    var tableBaseObj = document.createElement("table");
//    for (var tableAttrib in tableAttributes) {
//        tableBaseObj.setAttribute(tableAttrib, tableAttributes[tableAttrib]);
//    }
//    var tableHdrObj = document.createElement("thead");
//    if (tableMasterColumnsBase.length > 0) {
//        var tableMstrHdrRowObj = document.createElement("tr");
//        for (var columnIndex = 0; columnIndex < tableMasterColumnsBase.length; columnIndex++) {
//            var columnDetails = tableMasterColumnsBase[columnIndex];
//            var columnAttributes = columnDetails.attributes;
//            var columnClassName = "";
//            var tableHdrColObj = document.createElement("th");
//            tableHdrColObj.textContent = columnDetails.label;
////            columnClassName = "table-col-wd-" + columnDetails.css.width + " " + cellPadingClassName;
//            tableHdrColObj.className = columnClassName;
//            for (var columnAttrib in columnAttributes) {
//                tableHdrColObj.setAttribute(columnAttrib, columnAttributes[columnAttrib]);
//            }
//            tableMstrHdrRowObj.appendChild(tableHdrColObj);
//        }
//        tableHdrObj.appendChild(tableMstrHdrRowObj);
//    }
//    var tableHdrRowObj = document.createElement("tr");
//    for (var columnIndex = 0; columnIndex < tableColumnsBase.length; columnIndex++) {
//        var columnDetails = tableColumnsBase[columnIndex];
//        var columnAttributes = columnDetails.attributes;
//        var columnClassName = "", columnWidthClassName = "";
//        if (typeof columnDetails.css !== "undefined") {
//            columnWidthClassName = typeof columnDetails.css.width === "undefined" ? "" : "table-col-wd-" + columnDetails.css.width;
//        }
//        var tableHdrColObj = document.createElement("th");
//        tableHdrColObj.textContent = columnDetails.label;
//        columnClassName = columnWidthClassName + " " + cellPadingClassName + " " + "table-row-cell-ofl";
//        tableHdrColObj.className = columnClassName;
//        for (var columnAttrib in columnAttributes) {
//            tableHdrColObj.setAttribute(columnAttrib, columnAttributes[columnAttrib]);
//        }
//        tableHdrRowObj.appendChild(tableHdrColObj);
//    }
//    tableHdrObj.appendChild(tableHdrRowObj);
//    tableBaseObj.appendChild(tableHdrObj);
//    tableConfigObj = {
//        baseObj: tableBaseObj
//    };
//    return tableConfigObj;
//}
//
////
////
////function createBootstrapTable() {
////    var tableConfigObj = {};
////    var tableBaseObj = document.createElement("table");
////    tableBaseObj.setAttribute("data-pagination", "false");
////    tableBaseObj.setAttribute("data-unique-id", "traderName");
////    tableBaseObj.setAttribute("data-show-toggle", "true");
////    tableBaseObj.setAttribute("data-mobile-responsive", "true");
////    tableBaseObj.setAttribute("data-show-header", "false");
////    var tableHdrObj = document.createElement("thead");
////    var tableHdrRowObj = document.createElement("tr");
////    var tableHdrColObj1 = document.createElement("th");
////    tableHdrColObj1.setAttribute("data-field", "traderName");
////    tableHdrColObj1.className = "table-col-wd-100 table-cell-pd-4";
////    tableHdrColObj1.innerHTML = "Trader Name";
////    var tableHdrColObj2 = document.createElement("th");
////    tableHdrColObj2.setAttribute("data-field", "traderPos");
////    tableHdrColObj2.className = "table-col-wd-100 table-cell-pd-4";
////    tableHdrColObj2.innerHTML = "Purchase Orders";
////    tableHdrRowObj.appendChild(tableHdrColObj1);
////    tableHdrRowObj.appendChild(tableHdrColObj2);
////    tableHdrObj.appendChild(tableHdrRowObj);
////    tableBaseObj.appendChild(tableHdrObj);
////    tableConfigObj = {
////        baseObj: tableBaseObj
////    };
////    return tableConfigObj;
////}
///*Table creation ends*/
//
//
//
//function showMessage(message, type, closeDelay) {
//    if ($("#alerts-container").length === 0) {
//        $("body").append($('<div id="alerts-container" class="message-position">'));
//    }
//    type = type || "info";
//    var alert = $('<div class="alert alert-' + type + ' fade-in message-inner-position">')
//            .append(
//                    $('<button type="button" class="close" data-dismiss="alert">')
//                    .append("&times;")
//                    )
//            .append(message);
//    $("#alerts-container").append(alert);
//    $('.alert .close').on("click", function (e) {
//        $(alert).remove();
//    });
//    closeDelay = closeDelay || "5000";
//    if (closeDelay) {
//        window.setTimeout(function () {
//            $(alert).remove();
//        }, closeDelay);
//    }
//}
//
//function doLogout() {
//    document.location.href = "/EDIPaged/EDI/ediAuth/doLogout";
//}
//
//function removeAllElementsInDiv(divId) {
//    var bodyNode = document.getElementById(divId);
//    while (bodyNode.firstChild) {
//        bodyNode.removeChild(bodyNode.firstChild);
//    }
//}
//
//function ajaxSyncLoadForm(url, data) {
//    var response = ediAjaxSync(url, data);
//    if (response !== undefined && response !== null) {
//        var responseXML = parseXML(response);
////        var responseXML = $.parseXML(response);
//        if (ediBrowsersVar.isIE) {
//            return responseXML.childNodes[0].xml;
//        } else {
//            return responseXML.childNodes[0].innerHTML;
//        }
//    }
//    return "";
//}
//
//function ajaxSyncLoadGrid(url, data) {
//    var response = ediAjaxSync(url, data);
//    if (response !== undefined && response !== null) {
//        var responseXML = parseXML(response);
////        var responseXML = $.parseXML(response);
//        if (ediBrowsersVar.isIE) {
//            return responseXML.childNodes[0].xml;
//        } else {
//            return responseXML.childNodes[0].innerHTML;
//        }
//    }
//    return "";
//}
//
//function parseXML(a) {
//    if (typeof a !== "string") {
//        return a;
//    }
//    a = a.replace(/^[\s]+/, "");
//    if (window.DOMParser && !ediBrowsersVar.isIE) {
//        var c = (new window.DOMParser()).parseFromString(a, "text/xml");
//    } else {
//        if (window.ActiveXObject !== window.undefined) {
//            var c = new window.ActiveXObject("Microsoft.XMLDOM");
//            c.async = "false";
//            c.loadXML(a);
//        }
//    }
//    return c;
//
//}
//
//function setFormItemValue(formName, formItem, value) {
//    var formObj = document.forms[formName];
//    var formItemObj = "", formItemType = "";
//    if (formObj !== null && formObj !== undefined) {
//        formItemObj = formObj.elements[formItem];
//        if (formItemObj !== null && formItemObj !== undefined) {
//            formItemType = formItemObj.type.toLowerCase();
//            if (formItemType === "checkbox" || formItemType === "radio") {
//                formItemObj.checked = value;
//            } else if (formItemType === "select-one") {
//                for (var i = 0; i < formItemObj.options.length; i++) {
//                    if (formItemObj.options[i].text === value) {
//                        formItemObj.options[i].selected = true;
//                        break;
//                    }
//                }
//            } else {// if (formItemType === "input" || formItemType === "password" || formItemType === "hidden") {
//                formItemObj.value = value;
//            }
//        }
//    }
//}
//function getFormItemValue(formName, formItem) {
//    var formObj = document.forms[formName];
//    var formItemObj = "", formItemType = "";
//    var value = "";
//    if (formObj !== null && formObj !== undefined) {
//        formItemObj = formObj.elements[formItem];
//        if (formItemObj !== null && formItemObj !== undefined) {
//            formItemType = formItemObj.type.toLowerCase();
//            if (formItemType === "checkbox" || formItemType === "radio") {
//                value = formItemObj.checked;
//            } else {
//                value = formItemObj.value;
//            }
//        }
//    }
//    return value;
//}
//
//function getFormDataByName(formObj, returnType) {
//    if (typeof formObj === "string") {
//        formObj = $(document.forms[formObj]);
//    }
//
//    if (typeof formObj !== "undefined" && returnType === "object") {
//        return formObj.serializeObject();
//    } else if (typeof formObj !== "undefined") {
//        return formObj.serialize();
//    }
//    return "";
//}
//
//function getFormData(formObj, returnType) {
//    if (typeof formObj === "string") {
//        formObj = $("#" + formObj);
//    }
//
//    if (typeof formObj !== "undefined" && returnType === "object") {
//        return formObj.serializeObject();
//    } else if (typeof formObj !== "undefined") {
//        return formObj.serialize();
//    }
//    return "";
//}
//
//function clearFormDataByName(formObj) {
//    if (typeof formObj === "string") {
//        formObj = $(document.forms[formObj]);
//    }
//
//    if (typeof formObj !== "undefined") {
//        formObj.trigger("reset");
//    }
//}
//
//function clearFormData(formObj) {
//    if (typeof formObj === "string") {
//        formObj = $("#" + formObj);
//    }
//
//    if (typeof formObj !== "undefined") {
//        formObj.trigger("reset");
//    }
//}
///*Validation starts*/
//function validateSelectItem(value, defaultValue) {
//    if (defaultValue === undefined || defaultValue === null) {
//        defaultValue = "select";
//    }
//    if (value === null || value === undefined || value === "" || value === defaultValue) {
//        return false;
//    }
//    return true;
//}
//
//var validateValue = {
//    isEmailAddress: function (str) {
//        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//        return pattern.test(str);  // returns a boolean
//    },
//    isNotEmpty: function (str) {
//        var pattern = /\S+/;
//        return pattern.test(str);  // returns a boolean
//    },
//    isNumber: function (str) {
//        var pattern = /^\d+$/;
//        return pattern.test(str);  // returns a boolean
//    },
//    isSame: function (str1, str2) {
//        return str1 === str2;
//    },
//    isSelectValid: function (str1, str2) {
//        if (str2 === "" || str2 === undefined || str2 === null) {
//            str2 = "select";
//        }
//        return !(str1 === str2);
//
//    }
//};
//
//
//function validateNumber(value) {
//    var returnValue = {};
//    if (value === "" || value === undefined || value === null) {
//        return {
//            "isSuccess": false,
//            "error": "EMP"
//        };
//    }
//    if (isNaN(value)) {
//        returnValue = {
//            "isSuccess": false,
//            "error": "NAN"
//        };
//        return returnValue;
//    }
//    value = parseInt(value);
//    if (value < 0) {
//        returnValue = {
//            "isSuccess": false,
//            "error": "NAP"
//        };
//        return returnValue;
//    }
//    returnValue = {
//        "isSuccess": true,
//        "error": ""
//    };
//    return returnValue;
//}
//
//function validate2DecimalValue(value) {
//    if (isNaN(value)) {
//        return {
//            "isSuccess": true,
//            "value": "0.00"
//        };
//    }
//
//    var valueHelper = value.toFixed(2);
//    value = appendDecimalToString(value);
//    if (value.toString() !== valueHelper) {
//        return {
//            "isSuccess": false,
//            "error": "NEQ"
//        };
//    }
//    return {
//        "isSuccess": true,
//        "value": parseFloat(valueHelper)
//    };
//}
//
//function get2DecimalValue(value) {
//
//    return parseFloat(value.toFixed(2));
//}
///*validation ends*/
//
///*util methods starts*/
//function appendDecimalToString(value) {
//    var decimalCheck = /^[-+]?[0-9]+\.[0-9]+$/;
//    if (!value.toString().match(decimalCheck)) {
//        value = value + ".00";
//    }
//    return value;
//}
//function roundFloatValue(number, precision)          //this function returns round value
//{
//    if (precision === undefined || precision === null || precision === "") {
//        precision = 2;
//    }
//    number = parseFloat(number) + 0.5 * Math.pow(10, -precision);
//    number = Math.floor(number * Math.pow(10, precision));
//    var res = (number * Math.pow(10, -precision)).toFixed(precision);
//    if (res.charAt(0) == ".")
//    {
//        res = "0" + res;
//    }
//    return res;
//}
///*util methods ends*/
//
///*Ajax starts*/
//function ediAjax(url, formData, callback) {
//    $.ajax({
//        url: url,
//        dataType: 'json',
//        data: formData,
//        contentType: 'application/json',
//        processData: false,
//        type: 'POST',
//        success: function (data) {
//            if (typeof callback === "function") {
//                callback(data);
//            } else {
//                return data;
//            }
//        }
//    });
//}
//
//function ediAjaxSync(url, formData, responseType) {
//    var response;
//    var result = $.ajax({
//        url: url,
//        dataType: 'json',
//        data: formData,
//        contentType: 'application/json',
//        processData: false,
//        type: 'POST',
//        async: false
//    });
//    if (responseType === "JSON") {
//        response = result.responseJSON;
//    } else {
//        response = result.responseText;
//    }
//    return response;
//}
//
///*Ajax ends*/
//
//
////
////var h = [];
////    for (var e in formData) {
////        h.push(e + "=" + encodeURIComponent(formData[e]));
////    }
////    var a = function (o) {
////        if (callBack) {
////            callBack.call(this, o, o.xmlDoc.responseText);
////        }
////    };
////    if (requestType === "get") {
////        sendFormDataTypeGet(url + (c.indexOf("?") === -1 ? "?" : "&") + h.join("&"), c);
////    } else {
////        sendFormDataTypePost(url, h.join("&"), a);
////    }