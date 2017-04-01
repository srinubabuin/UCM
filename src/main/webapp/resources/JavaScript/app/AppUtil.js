var appContextPath = "", accessToken = "";
var browsersObj = {
    isIE: (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0),
    isIE6: (window.XMLHttpRequest === null && navigator.userAgent.indexOf("MSIE") >= 0),
    isIE7: (navigator.userAgent.indexOf("MSIE 7.0") >= 0 && navigator.userAgent.indexOf("Trident") < 0),
    isIE8: (navigator.userAgent.indexOf("MSIE 8.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0),
    isOpera: (navigator.userAgent.indexOf("Opera") >= 0),
    isChrome: (navigator.userAgent.indexOf("Chrome") >= 0),
    isKHTML: (navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent.indexOf("Konqueror") >= 0),
    isFF: (navigator.userAgent.indexOf("Firefox") >= 0)
};

var getTreeNodeWrapper = function () {
    this.treeNodeWrapper = {
        "id": "", // will be autogenerated if omitted
        "text": "", // node text
        "icon": "", // string for custom
        "state": {
            "opened": false, // is the node open
            "disabled": false, // is the node disabled
            "selected": false // is the node selected
        },
        "children": [], // array of strings or objects
        "li_attr": {}, // attributes for the generated LI node
        "a_attr": {}  // attributes for the generated A node
    };
    return this;
};

/*Layout creation starts*/

function clearAllElementsInDiv(divObj) {
    if (typeof (divObj) === "undefined") {
        return;
    }
    while (divObj.firstChild) {
        divObj.removeChild(divObj.firstChild);
    }
}

function getMainLayoutObj(module) {
    var documentHeight = $(document).height();
    var navHeight = $("body").find("header[class='navbar navbar-default']").height();

    var lyt = document.createElement("div");
    lyt.className = "row fixed-lyt";
    lyt.style.height = ((documentHeight - navHeight) - 5) + "px"; //2px is nav margin
    var mainObj = $("body").find("div[class='container-fluid'][type='main']");
    mainObj.append(lyt);
    return {
        domObj: lyt,
        module: module
    };
}

function appLayout(confObj) {
    clearAllElementsInDiv(confObj.parent);
    var lytObj = {};
    var cells = {};
    var parentObj = confObj.parent;
    var parentHeight = parentObj.clientHeight;
    if (typeof (confObj.cells) === "undefined") {
        confObj["cells"] = {
            "a": {
                "className": "col-md-12"
            }
        };
    }

    if (confObj.pattern === "2U") {
        var cell = {};
        var aObj = confObj.cells.a;
        var bObj = confObj.cells.b;
        var acls, bcls;
        if (typeof aObj !== "undefined" || aObj !== "") {
            if (typeof aObj.className === "undefined") {
                acls = "col-md-6";
            } else {
                acls = aObj.className;
            }
        } else {
            acls = "col-md-6";
        }
        if (typeof bObj !== "undefined" || bObj !== "") {
            if (typeof bObj.className === "undefined") {
                bcls = "col-md-6";
            } else {
                bcls = bObj.className;
            }
        } else {
            acls = "col-md-6";
        }
        var a = document.createElement("div");
        a.className = acls + " app-cell";
        a.style.height = (parentHeight - 2) + "px";
        var aCont = document.createElement("div");
        aCont.className = "app-cell-content";
        a.appendChild(aCont);
        cell = {
            "obj": a,
            "cont": aCont
        };

        cells["a"] = cell;
        cell = {};
        var b = document.createElement("div");
        b.className = bcls + " app-cell";
        b.style.height = (parentHeight - 2) + "px";
        var bCont = document.createElement("div");
        bCont.className = "app-cell-content";
        b.appendChild(bCont);
        cell = {
            "obj": b,
            "cont": bCont
        };
        cells["b"] = cell;
    } else if (confObj.pattern === "2E") {
        var acls = confObj.cells.a;
        var bcls = confObj.cells.b;
        if (typeof acls === undefined || acls === "") {
            acls = "col-md-12";
        }
        if (typeof acls === undefined || acls === "") {
            bcls = "col-md-12";
        }
        var a = document.createElement("div");
        a.className = acls;
        var b = document.createElement("div");
        b.className = bcls;
        cells = {
            "a": a,
            "b": b
        };
    } else {
        var cell = {};
        var aObj = confObj.cells.a;
        var acls;
        if (typeof aObj !== "undefined" || aObj !== "") {
            if (typeof aObj.className === "undefined") {
                acls = "col-md-12";
            } else {
                acls = aObj.className;
            }
        } else {
            acls = "col-md-12";
        }
        var a = document.createElement("div");
        a.className = acls + " app-cell";
        a.style.height = (parentHeight - 2) + "px";
        var aCont = document.createElement("div");
        aCont.className = "app-cell-content";
        a.appendChild(aCont);
        cell = {
            "obj": a,
            "cont": aCont
        };
        cells["a"] = cell;
    }
    for (var cell in cells) {
        parentObj.appendChild(cells[cell].obj);
    }

    lytObj = {
        "domObj": confObj.parent,
        "confObj": confObj,
        "cells": cells
    };
    return lytObj;
}

function cell2Hor() {
    var confObj = {};
    var lyt = document.createElement("div");
    lyt.className = "row";
    var a = document.createElement("div");
    a.className = "cellwrapper";
    var b = document.createElement("div");
    b.className = "cellwrapper";
    lyt.appendChild(a);
    lyt.appendChild(b);
    confObj = {
        base: {
            domObj: lyt,
            childs: {
                a: a,
                b: b
            }
        }
    };
    return confObj;
}
/*Layout creation endss*/

/*Tab Starts  */

function appTabbar(confObj) {
    if (typeof (confObj) === "undefined") {
        return;
    }
    var parentObj = confObj.parent;
    if (typeof (parentObj) === "undefined") {
        return;
    }
    clearAllElementsInDiv(parentObj);
    var tabbarLytObj = document.createElement("ul");
    tabbarLytObj.className = "nav nav-tabs";
    tabbarLytObj.setAttribute("tabbar-type", confObj.id);
    var tabbarContObj = document.createElement("div");
    tabbarContObj.className = "tab-content";
    tabbarContObj.style.height = (parentObj.clientHeight - 40) + "px";
    this.itemHdrObj = tabbarLytObj;
    this.itemContentObj = tabbarContObj;
    this.itemIds = [];
    this.items = {};
    this.selected;
    this.conf = confObj;
    if (typeof confObj.tabWidth === "undefined") {
        this.tabWidth = "100";
    } else {
        this.tabWidth = confObj.tabWidth;
    }

    parentObj.appendChild(tabbarLytObj);
    parentObj.appendChild(tabbarContObj);
    this.addTab = function (a) {
        var tabObj = document.createElement("li");
        tabObj.setAttribute("tab-id", a.id);
        tabObj.style.width = this.tabWidth + "px";
        tabObj.className = "app-tab";
        var anc = document.createElement("a");
        anc.href = "javascript:void(0);";
        anc.innerHTML = a.text;
        tabObj.appendChild(anc);
        var p = this;
        tabObj.onclick = function (e) {
            if (p.selected === a.id) {
                return;
            }

            if (typeof (p.selected) !== "undefined") {
                p.items[p.selected].item.className = p.items[p.selected].item.className.replace(/\s{0,}active/gi, "");
            }
            p.selected = a.id;
            p.items[p.selected].item.className = p.items[p.selected].item.className + " active";

            if (typeof (p.conf.callback) === "function") {
                p.conf.callback.apply(this, [a.id, p.items[a.id]]);
            }
            return true;
        };
        this.itemIds.push(a.id);
        this.items[a.id] = {
            id: a.id,
            item: tabObj,
            childs: a,
            base: {
                tabbar: this.itemHdrObj,
                content: this.itemContentObj
            }
        };
        this.itemHdrObj.appendChild(tabObj);
    };

    this.getTab = function (a) {
        if (typeof (a) === "undefined") {
            return;
        }
        return this.items[a];
    };

    this.getSelectedTab = function () {
        if (typeof (this.selected) === "undefined") {
            return;
        }
        return this.items[this.selected];
    };

    this.setTabActive = function (id) {
        if (typeof (id) === "undefined" && this.items[id] !== undefined) {
            return;
        }
        this.items[id].item.click();
    };

    return this;
}
/*Tab Ends  */

/* Dialog starts  */
function showDialog(confObj) {
    var type = "default";
    var dialogTypes = {
        "default": BootstrapDialog.TYPE_DEFAULT,
        "info": BootstrapDialog.TYPE_INFO,
        "primary": BootstrapDialog.TYPE_PRIMARY,
        "success": BootstrapDialog.TYPE_SUCCESS,
        "warning": BootstrapDialog.TYPE_WARNING,
        "danger": BootstrapDialog.TYPE_DANGER
    };
    if (dialogTypes.hasOwnProperty(confObj.type)) {
        type = dialogTypes[confObj.type];
    } else {
        type = dialogTypes[type];
    }

    BootstrapDialog.show({
        type: type,
        title: confObj.title,
        message: confObj.message,
        draggable: true,
        nl2br: false,
        onhidden: function (e) {
            //formElement.focus();
        }
    });
}

/* Dialog ends  */


/*Table creation starts*/
function cellStylePadding4(row, index) {
    return {
        classes: " table-cell-pd-2"
    };
}

function createBootstrapTable(confObj) {
    if (typeof (confObj) === "undefined") {
        return;
    }
    var options = confObj.options;
    var parentObj = confObj.parent;
    if (typeof (options) === "undefined" || typeof (parentObj) === "undefined") {
        return;
    }
    clearAllElementsInDiv(parentObj);
    var tableAttributes = options.tableAttributes;
    var tableColumnsBase = options.columns;
    var tableMasterColumnsBase = typeof options.masterHdrColumns === "undefined" ? [] : options.masterHdrColumns;
    var tableColumns = {
        columnIds: []
    };
    var cellPadingClassName = typeof options.cellPadding === "undefined" ? " " : " table-cell-pd-" + options.cellPadding;
    var tableConfigObj = {};
    var tableBaseObj = document.createElement("table");
    for (var tableAttrib in tableAttributes) {
        tableBaseObj.setAttribute(tableAttrib, tableAttributes[tableAttrib]);
    }
    var tableHdrObj = document.createElement("thead");
    if (tableMasterColumnsBase.length > 0) {
        var tableMstrHdrRowObj = document.createElement("tr");
        for (var columnIndex = 0; columnIndex < tableMasterColumnsBase.length; columnIndex++) {
            var columnDetails = tableMasterColumnsBase[columnIndex];
            var columnAttributes = columnDetails.attributes;
            var columnClassName = "";
            var tableHdrColObj = document.createElement("th");
            tableHdrColObj.textContent = columnDetails.label;
//            columnClassName = "table-col-wd-" + columnDetails.css.width + " " + cellPadingClassName;
            tableHdrColObj.className = columnClassName;
            for (var columnAttrib in columnAttributes) {
                tableHdrColObj.setAttribute(columnAttrib, columnAttributes[columnAttrib]);
            }
            tableMstrHdrRowObj.appendChild(tableHdrColObj);
        }
        tableHdrObj.appendChild(tableMstrHdrRowObj);
    }
    var tableHdrRowObj = document.createElement("tr");
    for (var columnIndex = 0; columnIndex < tableColumnsBase.length; columnIndex++) {
        var columnDetails = tableColumnsBase[columnIndex];
        var columnAttributes = columnDetails.attributes;
        var columnClassName = "", columnWidthClassName = "";
        if (typeof columnDetails.css !== "undefined") {
            columnWidthClassName = typeof columnDetails.css.width === "undefined" ? "" : "table-col-wd-" + columnDetails.css.width;
        }
        var tableHdrColObj = document.createElement("th");
        tableHdrColObj.textContent = columnDetails.label;
        columnClassName = columnWidthClassName + " " + cellPadingClassName + " " + "table-row-cell-ofl";
        tableHdrColObj.className = columnClassName;
        for (var columnAttrib in columnAttributes) {
            tableHdrColObj.setAttribute(columnAttrib, columnAttributes[columnAttrib]);
        }
        tableHdrRowObj.appendChild(tableHdrColObj);
    }
    tableHdrObj.appendChild(tableHdrRowObj);
    tableBaseObj.appendChild(tableHdrObj);
    parentObj.appendChild(tableBaseObj);
    tableConfigObj = {
        baseObj: tableBaseObj
    };
    return tableConfigObj;
}
/*Table creation ends*/


function showMessage(message, type, closeDelay) {
    if ($("#alerts-container").length === 0) {
        $("body").append($('<div id="alerts-container" class="message-position">'));
    }
    type = type || "info";
    var alert = $('<div class="alert alert-' + type + ' fade-in message-inner-position">')
        .append(
            $('<button type="button" class="close" data-dismiss="alert">')
                .append("&times;")
        )
        .append(message);
    $("#alerts-container").append(alert);
    $('.alert .close').on("click", function (e) {
        $(alert).remove();
    });
    closeDelay = closeDelay || "5000";
    if (closeDelay) {
        window.setTimeout(function () {
            $(alert).remove();
        }, closeDelay);
    }
}

function doLogout() {
    $.ajax({
        url: appContextPath + "/rest/auth/logout?ts=" + Date.now(),
        type: "POST",
        headers: {
            "Authorization": "Bearer " + accessToken
        },
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        success: function (response) {
            window.location.href = appContextPath + "/resources/jsp/AppLogin.jsp";
        },
        error: function (xhr) {
            window.location.href = appContextPath + "/resources/jsp/AppLogin.jsp";
        }
    });
}

function removeAllElementsInDiv(divId) {
    var bodyNode = document.getElementById(divId);
    while (bodyNode.firstChild) {
        bodyNode.removeChild(bodyNode.firstChild);
    }
}

function ajaxSyncLoadForm(url, data) {
    var response = appAjaxSync(url, data);
    if (response !== undefined && response !== null) {
        var responseXML = parseXML(response);
//        var responseXML = $.parseXML(response);
        if (browsersObj.isIE) {
            return responseXML.childNodes[0].xml;
        } else {
            return responseXML.childNodes[0].innerHTML;
        }
    }
    return "";
}

function ajaxSyncLoadGrid(url, data) {
    var response = appAjaxSync(url, data);
    if (response !== undefined && response !== null) {
        var responseXML = parseXML(response);
//        var responseXML = $.parseXML(response);
        if (browsersObj.isIE) {
            return responseXML.childNodes[0].xml;
        } else {
            return responseXML.childNodes[0].innerHTML;
        }
    }
    return "";
}

function parseXML(a) {
    if (typeof a !== "string") {
        return a;
    }
    a = a.replace(/^[\s]+/, "");
    if (window.DOMParser && !browsersObj.isIE) {
        var c = (new window.DOMParser()).parseFromString(a, "text/xml");
    } else {
        if (window.ActiveXObject !== window.undefined) {
            var c = new window.ActiveXObject("Microsoft.XMLDOM");
            c.async = "false";
            c.loadXML(a);
        }
    }
    return c;

}

function setFormItemValue(formName, formItem, value) {
    var formObj = document.forms[formName];
    var formItemObj = "", formItemType = "";
    if (formObj !== null && formObj !== undefined) {
        formItemObj = formObj.elements[formItem];
        if (formItemObj !== null && formItemObj !== undefined) {
            formItemType = formItemObj.type.toLowerCase();
            if (formItemType === "checkbox" || formItemType === "radio") {
                formItemObj.checked = value;
            } else if (formItemType === "select-one") {
                for (var i = 0; i < formItemObj.options.length; i++) {
                    if (formItemObj.options[i].text === value) {
                        formItemObj.options[i].selected = true;
                        break;
                    }
                }
            } else {// if (formItemType === "input" || formItemType === "password" || formItemType === "hidden") {
                formItemObj.value = value;
            }
        }
    }
}
function getFormItemValue(formName, formItem) {
    var formObj = document.forms[formName];
    var formItemObj = "", formItemType = "";
    var value = "";
    if (formObj !== null && formObj !== undefined) {
        formItemObj = formObj.elements[formItem];
        if (formItemObj !== null && formItemObj !== undefined) {
            formItemType = formItemObj.type.toLowerCase();
            if (formItemType === "checkbox" || formItemType === "radio") {
                value = formItemObj.checked;
            } else {
                value = formItemObj.value;
            }
        }
    }
    return value;
}

function getFormDataByName(formObj, returnType) {
    if (typeof formObj === "string") {
        formObj = $(document.forms[formObj]);
    }

    if (typeof formObj !== "undefined" && returnType === "object") {
        return formObj.serializeObject();
    } else if (typeof formObj !== "undefined") {
        return formObj.serialize();
    }
    return "";
}

function getFormDataFormRequest(formObj) {
    var formData = getFormDataByName(formObj, "object");
    var h = [];
    for (var e in formData) {
        h.push(e + "=" + encodeURIComponent(formData[e]));
    }
    var requstStr = h.join("&");
    return requstStr;
}

function getFormData(formObj, returnType) {
    if (typeof formObj === "string") {
        formObj = $("#" + formObj);
    }

    if (typeof formObj !== "undefined" && returnType === "object") {
        return formObj.serializeObject();
    } else if (typeof formObj !== "undefined") {
        return formObj.serialize();
    }
    return "";
}

function clearFormDataByName(formObj) {
    if (typeof formObj === "string") {
        formObj = $(document.forms[formObj]);
    }

    if (typeof formObj !== "undefined") {
        formObj.trigger("reset");
    }
}

function clearFormData(formObj) {
    if (typeof formObj === "string") {
        formObj = $("#" + formObj);
    }

    if (typeof formObj !== "undefined") {
        formObj.trigger("reset");
    }
}
/*Validation starts*/
function validateSelectItem(value, defaultValue) {
    if (defaultValue === undefined || defaultValue === null) {
        defaultValue = "select";
    }
    if (value === null || value === undefined || value === "" || value === defaultValue) {
        return false;
    }
    return true;
}

var validateValue = {
    isEmailAddress: function (str) {
//        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return pattern.test(str);  // returns a boolean
    },
    isNotEmpty: function (str) {
        var pattern = /\S+/;
        return pattern.test(str);  // returns a boolean
    },
    isNumber: function (str) {
        var pattern = /^\d+$/;
        return pattern.test(str);  // returns a boolean
    },
    isPhoneNumber: function (str) {
        var pattern = /^\d{10}$/;
        return pattern.test(str);  // returns a boolean
    },
    isSame: function (str1, str2) {
        return str1 === str2;
    },
    isSelectValid: function (str1, str2) {
        if (str2 === "" || str2 === undefined || str2 === null) {
            str2 = "select";
        }
        return !(str1 === str2);
    },
    isMaxLengthReached: function (str, maxLength) {
        maxLength = parseInt(maxLength);
        return str.length <= maxLength;
    }
};


function validateNumber(value) {
    var returnValue = {};
    if (value === "" || value === undefined || value === null) {
        return {
            "isSuccess": false,
            "error": "EMP"
        };
    }
    if (isNaN(value)) {
        returnValue = {
            "isSuccess": false,
            "error": "NAN"
        };
        return returnValue;
    }
    value = parseInt(value);
    if (value < 0) {
        returnValue = {
            "isSuccess": false,
            "error": "NAP"
        };
        return returnValue;
    }
    returnValue = {
        "isSuccess": true,
        "error": ""
    };
    return returnValue;
}

function validate2DecimalValue(value) {
    if (isNaN(value)) {
        return {
            "isSuccess": true,
            "value": "0.00"
        };
    }

    var valueHelper = value.toFixed(2);
    value = appendDecimalToString(value);
    if (value.toString() !== valueHelper) {
        return {
            "isSuccess": false,
            "error": "NEQ"
        };
    }
    return {
        "isSuccess": true,
        "value": parseFloat(valueHelper)
    };
}

function get2DecimalValue(value) {

    return parseFloat(value.toFixed(2));
}
/*validation ends*/

/*util methods starts*/
function appendDecimalToString(value) {
    var decimalCheck = /^[-+]?[0-9]+\.[0-9]+$/;
    if (!value.toString().match(decimalCheck)) {
        value = value + ".00";
    }
    return value;
}
function roundFloatValue(number, precision)          //this function returns round value
{
    if (precision === undefined || precision === null || precision === "") {
        precision = 2;
    }
    number = parseFloat(number) + 0.5 * Math.pow(10, -precision);
    number = Math.floor(number * Math.pow(10, precision));
    var res = (number * Math.pow(10, -precision)).toFixed(precision);
    if (res.charAt(0) == ".") {
        res = "0" + res;
    }
    return res;
}
/*util methods ends*/

/*Ajax starts*/
function appAjax(url, formData, callback) {
    $.ajax({
        url: url,
        dataType: 'json',
        data: formData,
        contentType: 'application/json',
        processData: false,
        type: 'POST',
        success: function (data) {
            if (typeof callback === "function") {
                callback(data);
            } else {
                return data;
            }
        }
    });
}

function appAjaxSync(url, formData, responseType) {
    var response;
    var result = $.ajax({
        url: url,
        dataType: 'json',
        data: formData,
        contentType: 'application/json',
        processData: false,
        type: 'POST',
        async: false
    });
    if (responseType === "JSON") {
        response = result.responseJSON;
    } else {
        response = result.responseText;
    }
    return response;
}

function appAjaxFileUpload(url, formData, responseType) {
    var response;
    var result = $.ajax({
        url: url,
        dataType: 'json',
        data: formData,
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        type: 'POST',
        async: false
    });
    if (responseType === "JSON") {
        response = result.responseJSON;
    } else {
        response = result.responseText;
    }
    return response;
}
