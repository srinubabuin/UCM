/*Misc starts*/
function getBoundTypes() {
    return [{
            "value": "inbound",
            "text": "In Bound"
        }, {
            "value": "outbound",
            "text": "Out Bound"
        }];
}

function getStructureTypes() {
    return [{
            "value": "editype",
            "text": "EDI Type"
        }, {
            "value": "implimentationtype",
            "text": "Implimentation Type"
        }];
}

function getTradePartnerTransactionTypes(tpId, tpName) {
    var transactionTypes = ediAjaxSync("/EDIPaged/EDI/ediVendorTransactions/getTradePartnerTransactions?tpId=" + tpId + "&tpName=" + tpName, {}, "JSON");
    if (transactionTypes === null || transactionTypes === "" || transactionTypes === undefined) {
        return [];
    }
    if (typeof transactionTypes === "string") {
        return JSON.parse(transactionTypes);
    }
    return transactionTypes;
}

function getModifySegmentNElementGridData(formData) {
    var tradePartner = formData["tradePartner"];
    var transactionType = formData["transactionType"];
    if (transactionType === null || transactionType === undefined) {
        transactionType = "";
    }
    var requestString = "traderPartner=" + encodeURIComponent(tradePartner) + "&transactionType=" + encodeURIComponent(transactionType);
    return ediAjaxSync("/EDIPaged/EDI/ediVendorTransactions/modifySegmentsNElementsGridData?" + requestString, {}, "JSON");
}

function getSegmentsDetailsUserLevel(formData) {
    var segmentDetails = ediAjaxSync("/EDIPaged/EDI/ediVendorTransactions/getSegmentsDetailsUserLevel?formData=" + JSON.stringify(formData), {}, "JSON");
    if (segmentDetails === null || segmentDetails === "" || segmentDetails === undefined) {
        return {};
    }
    if (typeof segmentDetails === "string") {
        return JSON.parse(segmentDetails);
    }
    return segmentDetails;
}

function getElementDetailsAdminLevelBySegment(formData) {
    var elementDetailsAdminLevel = ediAjaxSync("/EDIPaged/EDI/ediVendorTransactions/getElementDetailsAdminLevelBySegment?formData=" + JSON.stringify(formData), {}, "JSON");
    if (elementDetailsAdminLevel === null || elementDetailsAdminLevel === "" || elementDetailsAdminLevel === undefined) {
        return [];
    }
    if (typeof elementDetailsAdminLevel === "string") {
        return JSON.parse(elementDetailsAdminLevel);
    }
    return elementDetailsAdminLevel;
}

function getSegmentDescriptionAdminLevelBySegmentIDName(segmentId, segmentName) {
    var segmentDescription = ediAjaxSync("/EDIPaged/EDI/ediVendorTransactions/getSegmentDescriptionAdminLevel?segmentId=" + segmentId + "&segmentName=" + segmentName, {}, "");
    if (segmentDescription === null || segmentDescription === "" || segmentDescription === undefined) {
        return "";
    }
    return segmentDescription;
}

function getElementDescriptionAdminLevel(formData) {
    var elementDescription = ediAjaxSync("/EDIPaged/EDI/ediVendorTransactions/getElementDescriptionAdminLevel?formData=" + JSON.stringify(formData), {}, "");
    if (elementDescription === null || elementDescription === "" || elementDescription === undefined) {
        return "";
    }
    return elementDescription;
}

function getAllSegmentsDescriptionAdminLevel() {
    var segmentDescription = ediAjaxSync("/EDIPaged/EDI/ediVendorTransactions/getAllSegmentsDescriptionAdminLevel", {}, "JSON");
    if (segmentDescription === null || segmentDescription === "" || segmentDescription === undefined) {
        return [];
    }
    if (typeof segmentDescription === "string") {
        return JSON.parse(segmentDescription);
    }
    return segmentDescription;
}
/*Misc ends*/

/*Add Segment starts*/
var addSegmentFormName = "ADDSEGMENTFORM", addSegmentGridFormName = "EDIADDSEGMENTSGRID";
var addSegmentCheckedIds = [];
function onVendorEDITransactionAddSegmentClick() {
    clearAdminPageContentDivWrapper();
    addSegmentCheckedIds = [];
    var addSegmentLytObj = new cell2Hor();
    var addSegmentFormObj;
    document.getElementById(vendorContentWrapperDivId).appendChild(addSegmentLytObj.base.domObj);
    addSegmentLytObj.base.childs.a.innerHTML = getVendorAddSegmentForm();
    addSegmentLytObj.base.childs.b.innerHTML = getVendorAddSegmentGrid();
    addSegmentFormObj = document.forms[addSegmentFormName];
    $(addSegmentFormObj.elements["tradePartner"]).on("change", function () {
        onAddSegmentTradePartnerChange(addSegmentFormName);
    });

    $(addSegmentFormObj.elements["transactionType"]).on("change", function () {
        onAddSegmentTransactionTypeChange(addSegmentFormName);
    });

    $(addSegmentFormObj.elements["boundType"]).on("change", function () {
        onAddSegmentBoundTypeChange(addSegmentFormName);
    });

    $(addSegmentFormObj.elements["structureType"]).on("change", function () {
        onAddSegmentStructureTypeChange(addSegmentFormName);
    });

    $(addSegmentFormObj.elements["submitBtn"]).click(function () {
        submitEDITransactionAddSegmentDetails(addSegmentFormName, addSegmentGridFormName, $(addSegmentLytObj.base.childs.b));
    });
    $(addSegmentFormObj.elements["clearBtn"]).click(function () {
        clearEDITransactionAddSegmentForm(addSegmentFormName, addSegmentGridFormName);
    });
}

function getVendorAddSegmentForm() {
    return ajaxSyncLoadForm("/EDIPaged/EDI/ediVendorTransactions/addSegmentForm", {});
}

function getVendorAddSegmentGrid() {
    return ajaxSyncLoadForm("/EDIPaged/EDI/ediVendorTransactions/addSegmentDetailsGrid", {});
}

function validatedAddSegmentForm(formName) {
    var formObj = document.forms[formName];
    var tradePartnerObj = $(formObj.elements["tradePartner"]);
    var transactionTypeObj = $(formObj.elements["transactionType"]);
    var boundTypeObj = $(formObj.elements["boundType"]);
    var structureTypeObj = $(formObj.elements["structureType"]);
    var tradePartner = tradePartnerObj.val();
    var transactionType = transactionTypeObj.val();
    var boundType = boundTypeObj.val();
    var structureType = structureTypeObj.val();
    if (!validateSelectItem(tradePartner)) {
        console.log("Please Select Trade Partner");
        tradePartnerObj.focus();
        return false;
    }
    if (!validateSelectItem(transactionType)) {
        console.log("Please Select Transaction Type");
        transactionTypeObj.focus();
        return false;
    }
    if (!validateSelectItem(boundType)) {
        console.log("Please Select Bound Type");
        boundTypeObj.focus();
        return false;
    }
    if (!validateSelectItem(structureType)) {
        console.log("Please Select Structure Type");
        structureTypeObj.focus();
        return false;
    }
    return true;
}

function onAddSegmentTradePartnerChange(formName) {
    var formObj = document.forms[formName];
    var tradePartnerObj = $(formObj.elements["tradePartner"]);
    var transactionTypeObj = $(formObj.elements["transactionType"]);
    var tpId = tradePartnerObj.val();
    transactionTypeObj.empty();
    transactionTypeObj.append(
            $('<option>', {
                value: "select",
                text: "Select Transaction Type"
            }, '</option>'));
    if (tpId === "select") {
        transactionTypeObj.val("select").change();
    } else {
        var tpName = tradePartnerObj.find('option:selected').text();
        var transactionTypes = getTradePartnerTransactionTypes(tpId, tpName);

        if (transactionTypes.length === 0) {
            transactionTypeObj.val("select").change();
        } else {
            $.each(transactionTypes, function (index, item) {
                transactionTypeObj.append(
                        $('<option>', {
                            value: item,
                            text: item
                        }, '</option>'));
            });
        }
    }
    return true;
}

function onAddSegmentTransactionTypeChange(formName) {
    var formObj = document.forms[formName];
    var boundTypes = getBoundTypes();
    var transactionTypeObj = $(formObj.elements["transactionType"]);
    var boundTypeObj = $(formObj.elements["boundType"]);
    var transactionType = transactionTypeObj.val();
    boundTypeObj.empty();
    boundTypeObj.append(
            $('<option>', {
                value: "select",
                text: "Select Bound Type"
            }, '</option>'));
    if (transactionType === "select") {
        boundTypeObj.val("select").change();
    } else {
        $.each(boundTypes, function (index, item) {
            boundTypeObj.append(
                    $('<option>', {
                        value: item.value,
                        text: item.text
                    }, '</option>'));
        });
    }
    return true;
}

function onAddSegmentBoundTypeChange(formName) {
    var formObj = document.forms[formName];
    var strureTypes = getStructureTypes();
    var boundTypeObj = $(formObj.elements["boundType"]);
    var boundType = boundTypeObj.val();
    var structureTypeObj = $(formObj.elements["structureType"]);
    structureTypeObj.empty();
    structureTypeObj.append(
            $('<option>', {
                value: "select",
                text: "Select Structure Type"
            }, '</option>'));
    if (boundType === "select") {
        structureTypeObj.val("select").change();
    } else {
        $.each(strureTypes, function (index, item) {
            structureTypeObj.append(
                    $('<option>', {
                        value: item.value,
                        text: item.text
                    }, '</option>'));
        });
    }
}

function onAddSegmentStructureTypeChange(formName) {
    var formObj = document.forms[formName];
    var structureTypeObj = $(formObj.elements["structureType"]);
    var boundTypeObj = $(formObj.elements["boundType"]);
    var structureType = structureTypeObj.val();
    var boundType = boundTypeObj.val();
    if (boundType === "select") {
        structureTypeObj.val("select").change();
    }
    return true;
}

function onAddSegmentGridSegmentChange(itemId) {
    var gridFormObj = document.forms[addSegmentGridFormName];
    var segmentObj = $(gridFormObj.elements["segment" + itemId]);
    var segmentDescObj = $(gridFormObj.elements["description" + itemId]);
    var itemCheckObj = $(gridFormObj.elements["itemCheck" + itemId]);
    var segmentId = segmentObj.val();
    var segmentName = segmentObj.find("option:selected").text();
    if (segmentId === "select") {
        segmentDescObj.val("");
        itemCheckObj.prop("checked", false).change();
    } else {
        var segmentDescription = getSegmentDescriptionAdminLevelBySegmentIDName(segmentId, segmentName);
        segmentDescObj.val(segmentDescription);
        itemCheckObj.prop("checked", "checked").change();
    }
    return true;
}

function onAddSegmentGridChekboxChange(itemId) {
    var gridFormObj = document.forms[addSegmentGridFormName];
    var itemCheckObj = $(gridFormObj.elements["itemCheck" + itemId]);
    if (itemCheckObj.is(":checked")) {
        if (addSegmentCheckedIds.indexOf(itemId) < 0) {
            addSegmentCheckedIds.push(itemId);
        }
    } else {
        addSegmentCheckedIds.splice(addSegmentCheckedIds.indexOf(itemId), 1);
    }
    return true;
}

function submitEDITransactionAddSegmentDetails(formName, gridFormName, gridWrapperObj) {
    var segmentItemDetails = [], segmentItem = {};
    var formData = {}, reqFormData = {}, tableBodyObj, itemObj, position, segmentId, segmentName, description, usedArea, requirement, maxUse, loop;
    if (!validatedAddSegmentForm(formName)) {
        return false;
    }

    if (addSegmentCheckedIds.length === 0) {
        showMessage("No Segments to accept", "warning");
        return false;
    }

    tableBodyObj = gridWrapperObj.find("table>tbody");
    for (var itemInd = 1; itemInd <= addSegmentCheckedIds.length; itemInd++) {
        segmentItem = {};
        itemObj = tableBodyObj.find("tr[row-id=item" + addSegmentCheckedIds[itemInd - 1] + "]");
        if (itemObj !== null && itemObj !== undefined && itemObj !== "") {
            segmentId = itemObj.find("td[column-id=segment]>select").val();
            segmentName = itemObj.find("td[column-id=segment]>select").find('option:selected').text();
            description = itemObj.find("td[column-id=description]>textarea").val();
            position = itemObj.find("td[column-id=position]>input").val();
            usedArea = itemObj.find("td[column-id=usedArea]>select").val();
            requirement = itemObj.find("td[column-id=requirement]>select").val();
            maxUse = itemObj.find("td[column-id=maxUse]>input").val();
            loop = itemObj.find("td[column-id=loops]>input").val();
            segmentItem = {
                "segmentId": segmentId,
                "segName": segmentName,
                "description": description,
                "usedArea": usedArea,
                "requirement": requirement,
                "position": position,
                "maxUse": maxUse,
                "loops": loop
            };

            segmentItemDetails.push(segmentItem);
        }
    }
    var formObj = document.forms[formName];
    formData = getFormDataByName(formName, "object");
    reqFormData["tp"] = $(formObj.elements["tradePartner"]).find('option:selected').text();
    reqFormData["tpId"] = encodeURIComponent(formData["tradePartner"]);
    reqFormData["transType"] = encodeURIComponent(formData["transactionType"]);
    reqFormData["boundType"] = encodeURIComponent(formData["boundType"]);
    reqFormData["structureType"] = encodeURIComponent(formData["structureType"]);
    ediAjaxSync("/EDIPaged/EDI/ediVendorTransactions/insertSegmentUserLevelDetails?formData=" + JSON.stringify(reqFormData) + "&segmentItemDetails=" + JSON.stringify(segmentItemDetails), {}, "");
    addSegmentCheckedIds = [];
    onVendorEDITransactionAddSegmentClick();
}

function clearEDITransactionAddSegmentForm(formName, gridFormName) {
    addSegmentCheckedIds = [];
    clearFormDataByName(formName);
    clearFormDataByName(gridFormName);
}
/*Add Segment ends*/

/*Add Element starts*/
var addElementFormName = "ADDELEMENTFORM", addElementGridFormName = "EDIADDELEMENTSGRID";
var addElementCheckedIds = [];
function onVendorEDITransactionAddElementClick() {
    clearAdminPageContentDivWrapper();
    addElementCheckedIds = [];
    var addElementLytObj = new cell2Hor();
    var addElementFormObj;
    document.getElementById(vendorContentWrapperDivId).appendChild(addElementLytObj.base.domObj);
    addElementLytObj.base.childs.a.innerHTML = getVendorAddElementForm();
    addElementLytObj.base.childs.b.innerHTML = getVendorAddElementGrid();
    addElementFormObj = document.forms[addElementFormName];
    $(addElementFormObj.elements["tradePartner"]).on("change", function () {
        onAddElementTradePartnerChange(addElementFormName);
    });

    $(addElementFormObj.elements["transactionType"]).on("change", function () {
        onAddElementTransactionTypeChange(addElementFormName);
    });

    $(addElementFormObj.elements["boundType"]).on("change", function () {
        onAddElementBoundTypeChange(addElementFormName);
    });

    $(addElementFormObj.elements["structureType"]).on("change", function () {
        onAddElementStructureTypeChange(addElementFormName, addElementGridFormName, $(addElementLytObj.base.childs.b));
    });

    $(addElementFormObj.elements["submitBtn"]).click(function () {
        submitEDITransactionAddElementDetails(addElementFormName, addElementGridFormName, $(addElementLytObj.base.childs.b));
    });
    $(addElementFormObj.elements["clearBtn"]).click(function () {
        clearEDITransactionAddElementForm(addElementFormName, addElementGridFormName);
    });
}

function getVendorAddElementForm() {
    return ajaxSyncLoadForm("/EDIPaged/EDI/ediVendorTransactions/addElementsForm", {});
}

function getVendorAddElementGrid() {
    return ajaxSyncLoadForm("/EDIPaged/EDI/ediVendorTransactions/addElementsDetailsGrid", {});
}

function validatedAddElementForm(formName) {
    var formObj = document.forms[formName];
    var tradePartnerObj = $(formObj.elements["tradePartner"]);
    var transactionTypeObj = $(formObj.elements["transactionType"]);
    var boundTypeObj = $(formObj.elements["boundType"]);
    var structureTypeObj = $(formObj.elements["structureType"]);
    var tradePartner = tradePartnerObj.val();
    var transactionType = transactionTypeObj.val();
    var boundType = boundTypeObj.val();
    var structureType = structureTypeObj.val();
    if (!validateSelectItem(tradePartner)) {
        console.log("Please Select Trade Partner");
        tradePartnerObj.focus();
        return false;
    }
    if (!validateSelectItem(transactionType)) {
        console.log("Please Select Transaction Type");
        transactionTypeObj.focus();
        return false;
    }
    if (!validateSelectItem(boundType)) {
        console.log("Please Select Bound Type");
        boundTypeObj.focus();
        return false;
    }
    if (!validateSelectItem(structureType)) {
        console.log("Please Select Structure Type");
        structureTypeObj.focus();
        return false;
    }
    return true;
}

function onAddElementTradePartnerChange(formName) {
    var formObj = document.forms[formName];
    var tradePartnerObj = $(formObj.elements["tradePartner"]);
    var transactionTypeObj = $(formObj.elements["transactionType"]);
    var tpId = tradePartnerObj.val();
    transactionTypeObj.empty();
    transactionTypeObj.append(
            $('<option>', {
                value: "select",
                text: "Select Transaction Type"
            }, '</option>'));
    if (tpId === "select") {
        transactionTypeObj.val("select").change();
    } else {
        var tpName = tradePartnerObj.find('option:selected').text();
        var transactionTypes = getTradePartnerTransactionTypes(tpId, tpName);
        if (transactionTypes.length === 0) {
            transactionTypeObj.val("select").change();
        } else {
            $.each(transactionTypes, function (index, item) {
                transactionTypeObj.append(
                        $('<option>', {
                            value: item,
                            text: item
                        }, '</option>'));
            });
            transactionTypeObj.val("select").change();
        }
    }
    return true;
}

function onAddElementTransactionTypeChange(formName) {
    var formObj = document.forms[formName];
    var boundTypes = getBoundTypes();
    var transactionTypeObj = $(formObj.elements["transactionType"]);
    var boundTypeObj = $(formObj.elements["boundType"]);
    var transactionType = transactionTypeObj.val();
    boundTypeObj.empty();
    boundTypeObj.append(
            $('<option>', {
                value: "select",
                text: "Select Bound Type"
            }, '</option>'));
    if (transactionType === "select") {
        boundTypeObj.val("select").change();
    } else {
        $.each(boundTypes, function (index, item) {
            boundTypeObj.append(
                    $('<option>', {
                        value: item.value,
                        text: item.text
                    }, '</option>'));
        });
        boundTypeObj.val("select").change();
    }
    return true;
}

function onAddElementBoundTypeChange(formName) {
    var formObj = document.forms[formName];
    var strureTypes = getStructureTypes();
    var boundTypeObj = $(formObj.elements["boundType"]);
    var boundType = boundTypeObj.val();
    var structureTypeObj = $(formObj.elements["structureType"]);
    structureTypeObj.empty();
    structureTypeObj.append(
            $('<option>', {
                value: "select",
                text: "Select Structure Type"
            }, '</option>'));
    if (boundType === "select") {
        structureTypeObj.val("select").change();
    } else {
        $.each(strureTypes, function (index, item) {
            structureTypeObj.append(
                    $('<option>', {
                        value: item.value,
                        text: item.text
                    }, '</option>'));
        });
    }
    return true;
}

function onAddElementStructureTypeChange(formName, gridFormName) {
    var formObj = document.forms[formName];
    var structureTypeObj = $(formObj.elements["structureType"]);
    var structureType = structureTypeObj.val();
    if (structureType === "select") {
        setElementGridSegmentDetailsOptions(gridFormName, {});
    } else {
        setElementGridSegmentsByForm(formName, gridFormName);
    }
    return true;
}

function setElementGridSegmentsByForm(formName, gridFormName) {
    var formObj = $(document.forms[formName]);
    var formData = {};
    formData["tp"] = encodeURIComponent(formObj.find("select[name='tradePartner']").find('option:selected').text());
    formData["tpId"] = encodeURIComponent(formObj.find("select[name='tradePartner']").val());
    formData["transType"] = encodeURIComponent(formObj.find("select[name='transactionType']").val());
    formData["boundType"] = encodeURIComponent(formObj.find("select[name='boundType']").val());
    formData["structureType"] = encodeURIComponent(formObj.find("select[name='structureType']").val());
    var segmentDetails = getSegmentsDetailsUserLevel(formData);
    setElementGridSegmentDetailsOptions(gridFormName, segmentDetails);

    return true;
}

function setElementGridSegmentDetailsOptions(gridFormName, segmentDetails) {
    var segmentDetailsOptions = getSegmentDetailsOptions(segmentDetails);
    var gridFormObj = $(document.forms[gridFormName]);
    var tableBody = gridFormObj.find("table>tbody");
    var itemObj, segmentComboObj;
    for (var itemInd = 0; itemInd <= tableBody.find("tr[row-id]").length; itemInd++) {
        itemObj = tableBody.find("tr[row-id=item" + itemInd + "]");
        if (itemObj !== null && itemObj !== undefined && itemObj !== "") {
            segmentComboObj = itemObj.find("td[column-id=segment]>select");
            segmentComboObj.empty();
            segmentComboObj.append(segmentDetailsOptions);
            segmentComboObj.val("select").change();
        }
    }
}

function getSegmentDetailsOptions(segmentDetails) {
    if (segmentDetails === null && segmentDetails === undefined) {
        segmentDetails = {};
    }
    var segmentDetailsOptions = "<option value='select'>Select Segment</option>"
    if (Object.keys(segmentDetails).length >= 0) {
        for (var segment in segmentDetails) {
            segmentDetailsOptions = segmentDetailsOptions + "<option value='" + segment + "'>" + segmentDetails[segment] + "</option>";
        }
    }
    return segmentDetailsOptions;
}

function onAddElementGridSegmentChange(itemId) {
    var gridFormName = addElementGridFormName;
    var gridFormObj = document.forms[gridFormName];
    var segmentObj = $(gridFormObj.elements["segment" + itemId]);
    var elementObj = $(gridFormObj.elements["element" + itemId]);
    var segmentId = segmentObj.val();
    var segmentName = segmentObj.find("option:selected").text();
    if (segmentId === "select") {
        if (elementObj.find("option").length > 1) {
            setElementGridElementDetailsOptions(elementObj, {});
        }
    } else {
        var elementDetails = getElementDetailsAdminLevelBySegment({"segmentId": segmentId, "segName": segmentName});
        setElementGridElementDetailsOptions(elementObj, elementDetails);
    }
    return true;
}

function setElementGridElementDetailsOptions(elementComboObj, elementDetails) {
    var elementDetailsOptions = getElementDetailsOptions(elementDetails);
    if (elementComboObj !== null && elementComboObj !== undefined && elementComboObj !== "") {
        elementComboObj.empty();
        elementComboObj.append(elementDetailsOptions);
        elementComboObj.val("select").change();
    }

    return true;
}

function getElementDetailsOptions(elementDetails) {
    if (elementDetails === null && elementDetails === undefined) {
        elementDetails = {};
    }
    var segmentDetailsOptions = "<option value='select'>Select Element</option>"
    if (Object.keys(elementDetails).length >= 0) {
        for (var segment in elementDetails) {
            segmentDetailsOptions = segmentDetailsOptions + "<option value='" + segment + "'>" + elementDetails[segment] + "</option>";
        }
    }
    return segmentDetailsOptions;
}

function onAddElementGridElementChange(itemId) {
    var gridFormObj = document.forms[addElementGridFormName];
    var segmentObj = $(gridFormObj.elements["segment" + itemId]);
    var elementObj = $(gridFormObj.elements["element" + itemId]);
    var elementDescObj = $(gridFormObj.elements["description" + itemId]);
    var itemCheckObj = $(gridFormObj.elements["itemCheck" + itemId]);
    var elementId = elementObj.val();
    var elementName = elementObj.find("option:selected").text();
    var segmentId = segmentObj.val();
    var segmentName = segmentObj.find("option:selected").text();
    if (elementId === "select") {
        elementDescObj.val("");
        itemCheckObj.prop("checked", false).change();
    } else {
        var formData = {
            "segId": segmentId,
            "segName": segmentName,
            "elementId": elementId,
            "elementName": elementName
        }

        var elementDescription = getElementDescriptionAdminLevel(formData);
        elementDescObj.val(elementDescription);
        itemCheckObj.prop("checked", "checked").change();
    }
    return true;
}

function onAddElementGridChekboxChange(itemId) {
    var gridFormObj = document.forms[addElementGridFormName];
    var itemCheckObj = $(gridFormObj.elements["itemCheck" + itemId]);
    var elementObj = $(gridFormObj.elements["element" + itemId]);
    var element = elementObj.val();
    if (itemCheckObj.is(":checked")) {
        if (!validateSelectItem(element)) {
            console.log("Please select Element");
            elementObj.focus();
            itemCheckObj.prop("checked", false);
            return false;
        }

        if (addElementCheckedIds.indexOf(itemId) < 0) {
            addElementCheckedIds.push(itemId);
        }
    } else {
        if (addElementCheckedIds.indexOf(itemId) > -1) {
            addElementCheckedIds.splice(addElementCheckedIds.indexOf(itemId), 1);
        }
    }
    return true;
}

function validateAddElementDetailsGrid(gridFormName, checkedIds) {
    var tableBodyObj, itemObj;
    tableBodyObj = $(document.forms[gridFormName]).find("table>tbody");
    for (var itemInd = 1; itemInd <= checkedIds.length; itemInd++) {
        itemObj = tableBodyObj.find("tr[row-id=item" + checkedIds[itemInd - 1] + "]");
        if (itemObj !== null && itemObj !== undefined && itemObj !== "") {
            var positionObj = itemObj.find("td[column-id=position]>input");
            var segmentObj = itemObj.find("td[column-id=segment]>select");
            var elementObj = itemObj.find("td[column-id=element]>select");
            var descriptionObj = itemObj.find("td[column-id=description]>input");
            var usedAreaObj = itemObj.find("td[column-id=usedArea]>select");
            var requirementObj = itemObj.find("td[column-id=requirement]>select");
            var maxUseObj = itemObj.find("td[column-id=maxUse]>input");
            var loopObj = itemObj.find("td[column-id=loops]>input");
            if (!validateValue.isNumber(positionObj.val())) {
                console.log("Please enter valid position");
                positionObj.focus();
                return false;
            }
            if (!validateValue.isSelectValid(segmentObj.val())) {
                console.log("Please select Segment.");
                segmentObj.focus();
                return false;
            }
            if (!validateValue.isSelectValid(elementObj.val())) {
                console.log("Please select Element.");
                elementObj.focus();
                return false;
            }
            if (!validateValue.isNotEmpty(descriptionObj.val())) {
                console.log("Please enter Descriptions");
                descriptionObj.focus();
                return false;
            }

            if (!validateValue.isSelectValid(usedAreaObj.val())) {
                console.log("Please select User Area.");
                usedAreaObj.focus();
                return false;
            }
            if (!validateValue.isSelectValid(requirementObj.val())) {
                console.log("Please select Requirement.");
                requirementObj.focus();
                return false;
            }

            if (!validateValue.isNumber(maxUseObj.val())) {
                console.log("Please enter valid max use.");
                maxUseObj.focus();
                return false;
            }

            if (!validateValue.isNumber(loopObj.val())) {
                console.log("Please enter valid loops.");
                loopObj.focus();
                return false;
            }
        }
    }
    return true;
}

function submitEDITransactionAddElementDetails(formName, gridFormName, gridWrapperObj) {
    var elementItemDetails = [], elementItem = {};
    var formData = {}, reqFormData = {}, tableBodyObj, itemObj, position, segmentId, segmentName, elementId, elementName, description, usedArea, requirement, maxUse, loop;
    if (!validatedAddElementForm(formName)) {
        return false;
    }

    if (addElementCheckedIds.length === 0) {
        showMessage("No Elements to accept", "warning");
        return false;
    }

    if (!validateAddElementDetailsGrid(gridFormName, addElementCheckedIds)) {
        return false;
    }

    tableBodyObj = $(document.forms[gridFormName]).find("table>tbody");
    for (var itemInd = 1; itemInd <= addElementCheckedIds.length; itemInd++) {
        elementItem = {};
        itemObj = tableBodyObj.find("tr[row-id=item" + addElementCheckedIds[itemInd - 1] + "]");
        if (itemObj !== null && itemObj !== undefined && itemObj !== "") {
            segmentId = itemObj.find("td[column-id=segment]>select").val();
            segmentName = itemObj.find("td[column-id=segment]>select").find('option:selected').text();
            elementId = itemObj.find("td[column-id=element]>select").val();
            elementName = itemObj.find("td[column-id=element]>select").find('option:selected').text();
            description = itemObj.find("td[column-id=description]>textarea").val();
            position = itemObj.find("td[column-id=position]>input").val();
            usedArea = itemObj.find("td[column-id=usedArea]>select").val();
            requirement = itemObj.find("td[column-id=requirement]>select").val();
            maxUse = itemObj.find("td[column-id=maxUse]>input").val();
            loop = itemObj.find("td[column-id=loops]>input").val();
            elementItem = {
                "segmentId": segmentId,
                "segName": segmentName,
                "elementName": elementName,
                "elementId": elementId,
                "description": description,
                "usedArea": usedArea,
                "requirement": requirement,
                "position": position,
                "elementMax": maxUse,
                "loops": loop
            };

            elementItemDetails.push(elementItem);
        }
    }
    var formObj = document.forms[formName];
    formData = getFormDataByName(formName, "object");
    reqFormData["tp"] = $(formObj.elements["tradePartner"]).find('option:selected').text();
    reqFormData["tpId"] = encodeURIComponent(formData["tradePartner"]);
    reqFormData["transType"] = encodeURIComponent(formData["transactionType"]);
    reqFormData["boundType"] = encodeURIComponent(formData["boundType"]);
    reqFormData["structureType"] = encodeURIComponent(formData["structureType"]);
    ediAjaxSync("/EDIPaged/EDI/ediVendorTransactions/insertElementUserLevelDetails?formData=" + JSON.stringify(reqFormData) + "&elementItemDetails=" + JSON.stringify(elementItemDetails), {}, "");
    addElementCheckedIds = [];
    onVendorEDITransactionAddElementClick();
}

function clearEDITransactionAddElementForm(formName, gridFormName) {
    addElementCheckedIds = [];
    clearFormDataByName(formName);
    clearFormDataByName(gridFormName);
}
/*Add Element ends*/

/*Modify segment and Element starts*/
var modifySegmentNElementFormName = "MODIFYSEGMENTSNELEMENTS", modifySegmentNElementGridName = "MODIFYSEGMENTSNELEMENTSGRID";
var modifyElementCheckedIds = [];
function onVendorEDITransactionModifySegmentNElementClick() {
    clearAdminPageContentDivWrapper();
    modifySegmentCheckedIds = [];
    modifyElementCheckedIds = [];
    var modifySegmentElementLytObj = new cell2Hor();
    var modifySegmentNElementGridObj = new createBootstrapTable(getVendorModifySegmentNElementGrid());
    var addSegmentFormObj;
    modifySegmentElementLytObj.base.domObj.setAttribute("view", "main");
    document.getElementById(vendorContentWrapperDivId).appendChild(modifySegmentElementLytObj.base.domObj);
    modifySegmentElementLytObj.base.childs.a.innerHTML = getModifySegmentNElementForm();
    modifySegmentElementLytObj.base.childs.b.appendChild(modifySegmentNElementGridObj.baseObj);
    var modifySegmentElementDetailsGrid = $(modifySegmentNElementGridObj.baseObj);
    modifySegmentElementDetailsGrid.bootstrapTable({
        data: []
    });


    addSegmentFormObj = document.forms[modifySegmentNElementFormName];
    $(addSegmentFormObj.elements["tradePartner"]).on("change", function () {
        onModifySegmentNElementTradePartnerChange(modifySegmentNElementFormName, modifySegmentElementDetailsGrid);
    });

    $(addSegmentFormObj.elements["transactionType"]).on("change", function () {
        onModifySegmentNElementTransactionTypeChange(modifySegmentNElementFormName, modifySegmentElementDetailsGrid);
    });

}

function getModifySegmentNElementForm() {
    return ajaxSyncLoadForm("/EDIPaged/EDI/ediVendorTransactions/modifySegmentsNElementsForm", {});
}

function loadModifySegmentNElementGrid(gridObj, formData) {
    gridObj.bootstrapTable("showLoading");
    var gridData = getModifySegmentNElementGridData(formData);
    gridObj.bootstrapTable("load", gridData);
    gridObj.bootstrapTable("hideLoading");
}

function getVendorModifySegmentNElementGrid() {
    var gridConfiObj = {
        tableAttributes: {"data-mobile-responsive": "true", "data-show-header": "true",
            "data-pagination": "true", "data-page-size": "25", "data-page-list": "[25, 50, 100]", "data-unique-id": "srNo", "data-height": "550"}
        , columns: [{
                label: "#",
                attributes: {
                    "data-field": "srNo",
                    "data-align": "left"
                }
            }, {
                label: "Transaction Type",
                attributes: {
                    "data-field": "transactionType",
                    "data-align": "left"
                }
            }, {
                label: "Bound Type",
                attributes: {
                    "data-field": "boundType",
                    "data-align": "left"
                }
            }, {
                label: "Structure Type",
                attributes: {
                    "data-field": "structureType",
                    "data-align": "left"
                }
            }, {
                label: "Status",
                attributes: {
                    "data-field": "status",
                    "data-align": "left"
                }
            }, {
                label: "Modify Segments",
                attributes: {
                    "data-field": "modifySegments",
                    "data-align": "left",
                    "data-formatter": "modifySegmentsFormatter"
                }
            }, {
                label: "Modify Elements",
                attributes: {
                    "data-field": "modifyElements",
                    "data-align": "left",
                    "data-formatter": "modifyElementsFormatter"
                }
            }
        ]
    };
    return gridConfiObj;
}

function modifySegmentsFormatter(value) {
    if (!value) {
        return '';
    }
    var removeItem = "<a href='javascript:void(0);' onclick='onModifySegmentNElementGridClick(" + JSON.stringify(value) + ", \"SEGMENTS\");'>Modify Segments</a>";
    return removeItem;
}

function modifyElementsFormatter(value) {
    if (!value) {
        return '';
    }
    var removeItem = "<a href='javascript:void(0);' onclick='onModifySegmentNElementGridClick(" + JSON.stringify(value) + ", \"ELEMENTS\");'>Modify Elements</a>";
    return removeItem;
}

function onModifySegmentNElementTradePartnerChange(formName, gridObj) {
    var formObj = document.forms[formName];
    var tradePartnerObj = $(formObj.elements["tradePartner"]);
    var transactionTypeObj = $(formObj.elements["transactionType"]);
    var tpName = tradePartnerObj.find('option:selected').text();
    var tpId = tradePartnerObj.val();
    transactionTypeObj.empty();
    transactionTypeObj.append(
            $('<option>', {
                value: "select",
                text: "Select Transaction Type"
            }, '</option>'));
    if (tpId === "select") {
        transactionTypeObj.val("select");
        gridObj.bootstrapTable("load", []);
    } else {
        var transactionTypes = getTradePartnerTransactionTypes(tpId, tpName);

        if (transactionTypes.length === 0) {
            transactionTypeObj.val("select");
        } else {
            $.each(transactionTypes, function (index, item) {
                transactionTypeObj.append(
                        $('<option>', {
                            value: item,
                            text: item
                        }, '</option>'));
            });
        }

        var formData = {"tradePartner": tpName, "transactionType": ""};
        loadModifySegmentNElementGrid(gridObj, formData);
    }
    return true;
}

function onModifySegmentNElementTransactionTypeChange(formName, gridObj) {
    var formObj = document.forms[formName];
    var tradePartnerObj = $(formObj.elements["tradePartner"]);
    var transactionTypeObj = $(formObj.elements["transactionType"]);
    var tpName = tradePartnerObj.find('option:selected').text();
    var transactionType = transactionTypeObj.val();
    var formData = {"tradePartner": tpName, "transactionType": ""};
    if (transactionType === "select") {
        loadModifySegmentNElementGrid(gridObj, formData);
    } else {
        formData["transactionType"] = transactionType;
        loadModifySegmentNElementGrid(gridObj, formData);
    }
    return true;
}

function onModifySegmentNElementGridClick(data, type) {
    console.log(data);
    console.log(type);
    if (type === "SEGMENTS") {
        onVendorEDITransactionModifySegmentsClick(data, true);
    } else if (type === "ELEMENTS") {
        onVendorEDITransactionModifySegmentsClick(data, true);
    }
}

/*Modify segment starts*/
var modifySegmentsFormName = "EDIMODIFYSEGMENTSFORM", modifySegmentsGridFormName = "EDIMODIFYSEGMENTSGRID";
var modifySegmentCheckedIds = [];
function onVendorEDITransactionModifySegmentsClick(formData, createView) {
    if (!createView) {
        clearAdminPageContentDivWrapper();
    } else {
        var mainDivObj = $(document.getElementById(vendorContentWrapperDivId)).find("div[view='main']");
        if (mainDivObj !== null && mainDivObj !== undefined) {
            mainDivObj.fadeOut();
        }
        var segmentDivObj = $(document.getElementById(vendorContentWrapperDivId)).find("div[view='segmentnelement']");
        if (segmentDivObj !== null && segmentDivObj !== undefined) {
            segmentDivObj.remove();
        }

    }

    modifySegmentCheckedIds = [];
    var modifySegmentLytObj = new cell2Hor();
    modifySegmentLytObj.base.domObj.setAttribute("view", "segmentnelement");
    var modifySegmentFormObj;
    document.getElementById(vendorContentWrapperDivId).appendChild(modifySegmentLytObj.base.domObj);
    modifySegmentLytObj.base.childs.a.innerHTML = getVendorModifySegmentForm(formData);
    modifySegmentLytObj.base.childs.b.innerHTML = getVendorModifySegmentGrid(formData);
    modifySegmentFormObj = document.forms[modifySegmentsFormName];
    $(modifySegmentFormObj.elements["backBtn"]).click(function () {
        showVendorModifySegmentsNElementsView();
    });
}

function showVendorModifySegmentsNElementsView() {
    var mainDivObj = $(document.getElementById(vendorContentWrapperDivId)).find("div[view='main']");
    if (mainDivObj !== null && mainDivObj !== undefined) {
        mainDivObj.fadeIn();
    }
    var segmentDivObj = $(document.getElementById(vendorContentWrapperDivId)).find("div[view='segmentnelement']");
    if (segmentDivObj !== null && segmentDivObj !== undefined) {
        segmentDivObj.remove();
    }
//    document.getElementById(vendorContentWrapperDivId).childNodes[1].style.display = "none";
//    document.getElementById(vendorContentWrapperDivId).childNodes[0].style.display = "";
}

function getVendorModifySegmentForm(formData) {
    return ajaxSyncLoadForm("/EDIPaged/EDI/ediVendorTransactions/modifySegmentDetailsForm?formData=" + JSON.stringify(formData), {});
}

function getVendorModifySegmentGrid(formData) {
    return ajaxSyncLoadForm("/EDIPaged/EDI/ediVendorTransactions/modifySegmentDetailsGrid?formData=" + JSON.stringify(formData), {});
}


/*Modify segment ends*/

/*Modify segment and Element ends*/

