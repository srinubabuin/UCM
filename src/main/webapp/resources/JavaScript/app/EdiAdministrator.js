//Super Adinistrator Starts
var addGroupFormId = "addGroupForm", editGroupFormId = "editGroupForm";
var isGroupUpdated = false;
var pagedGroupAdminGridDivObj, pagedGroupAdminGridObj, pagedGroupAdminUsersDataGridObj;
//Super Adinistrator Ends
function clearAdminPageContentDivWrapper() {
    removeAllElementsInDiv("ediContentWrapper");
}

function navAddGroupOnClick(obj) {

    clearAdminPageContentDivWrapper();
    var formData = getAddPagedGroupForm();
    document.getElementById("ediContentWrapper").innerHTML = formData;
    $("button#groupNameCheck_add").click(function () {
        checkEDIGroupNameExists(addGroupFormId);
    });
    $("button#addPagedGroupFormSubmit").click(function () {
        insertEDIPagedGroupForm(addGroupFormId);
    });
    $("button#addPagedGroupFormClear").click(function () {
        clearEDIPagedGroupForm(addGroupFormId);
    });
}

function getAddPagedGroupForm() {
    return ajaxSyncLoadForm("/EDIPaged/EDI/ediAdmin/addPagedGroupForm", {});
}

function getEditPagedGroupForm(groupId, status) {
    return ajaxSyncLoadForm("/EDIPaged/EDI/ediAdmin/editPagedGroupForm?groupId=" + groupId + "&status=" + status, {});
}

function getViewPagedGroupForm(groupId, status) {
    return ajaxSyncLoadForm("/EDIPaged/EDI/ediAdmin/viewPagedGroupForm?groupId=" + groupId + "&status=" + status, {});
}

function insertEDIPagedGroupForm(formId) {
    var formData = getFormData(formId, "object");
    var response = ediAjaxSync("/EDIPaged/EDI/ediAdmin/insertPagedGroup?" + getFormData(formId), {});
    var responseJSON = JSON.parse(response);
    if (responseJSON.requestSuccess) {
        clearFormData(formId);
        showMessage("Group with name " + formData["organizationName"] + " successfully saved.", "success");
    } else {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_ERROR,
            title: 'Error',
            message: 'Failed to create group with name: ' + formData["organizationName"],
            draggable: true,
            nl2br: false
        });
    }
}

function updateEDIPagedGroupForm(formId) {
    var formData = getFormData(formId, "object");
    var response = ediAjaxSync("/EDIPaged/EDI/ediAdmin/updatePagedGroup?" + getFormData(formId), {});
    var responseJSON = JSON.parse(response);
    if (responseJSON.requestSuccess) {
        isGroupUpdated = true;
//        clearFormData(formId);
//        showMessage("Group with name " + formData["organizationName"] + " successfully modified.", "success");
        showMessage("Group successfully modified.", "success");
    } else {
        isGroupUpdated = false;
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_ERROR,
            title: 'Error',
            message: 'Failed to modify group',
            draggable: true,
            nl2br: false
        });
    }
}

function clearEDIPagedGroupForm(formId) {
    clearFormData(formId);
}

function checkEDIGroupNameExists(formId) {
    var organigationName = getFormData(formId, "object")["organizationName"];
    var isPagedGroupExistsFlag = isPagedGroupExists(organigationName);
    if (isPagedGroupExistsFlag !== "true") {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: 'Warning',
            message: 'Group with this name is already created*',
            draggable: true,
            nl2br: false
        });
    } else {
        return true;
    }
}

function isPagedGroupExists(groupName) {
    return ediAjaxSync("/EDIPaged/EDI/ediAdmin/isPagedGroupExists?groupName=" + encodeURIComponent(groupName), {});
}

function navViewGroupOnClick(obj) {
    clearAdminPageContentDivWrapper();
    var pagedGroupsData = getGroupsGrid();
    document.getElementById("ediContentWrapper").innerHTML = pagedGroupsData;

    pagedGroupAdminGridDivObj = $('#groupDataGrid');
    pagedGroupAdminGridObj = pagedGroupAdminGridDivObj.bootstrapTable({
        data: []
    });
    loadPageGroupDetails(pagedGroupAdminGridDivObj);

    pagedGroupAdminGridDivObj.on("click-row.bs.table", function (row, element) {
//        console.log(row);
//        console.log(element);
    });

}


function loadPageGroupDetails(gridDivObj) {
    var gridData = getGroupsGridData();
    gridDivObj.bootstrapTable("load", gridData);
}

function getGroupsGrid() {
    return ediAjaxSync("/EDIPaged/EDI/ediAdmin/groupsGridLayout", {});
}

function getGroupsGridData() {
    return ediAjaxSync("/EDIPaged/EDI/ediAdmin/getPagedGroupDetails?status=A", {}, "JSON");
}

function checkboxCellFormatter(value) {
    if (!value) {
        return '';
    }
    var enabledStr = value.toUpperCase() === "A" ? "checked" : "";
    var checkboxItem = "<input type='checkbox' class='bs-checkbox '" + enabledStr + "  />";
    return checkboxItem;
}

function editCellFormatter(value) {
    if (!value) {
        return '';
    }
    var editItem = "<a href='javascript:void(0);' onclick=onGroupsGridOperationsClick('" + value + "','EDIT')><i title='Modify' class='glyphicon glyphicon-pencil'></i></a>";
    return editItem;
}
function viewCellFormatter(value) {
    if (!value) {
        return '';
    }
    var viewItem = "<a href='javascript:void(0);' onclick=onGroupsGridOperationsClick('" + value + "','VIEW')><i title='View'class='glyphicon glyphicon-list-alt'></i></a>";
    return viewItem;
}
function onGroupsGridOperationsClick(id, operation) {
//    console.log(pagedGroupAdminGridDivObj.bootstrapTable('getRowByUniqueId', id));
//    console.log(id);
    if (operation === "EDIT") {
        onEditGroupClick(id);
    }
    if (operation === "VIEW") {
        onViewGroupClick(id);
    }
}

function onEditGroupClick(groupId) {
    var groupFormData = getEditPagedGroupForm(groupId, "A");
//        var editWindow = BootstrapDialog.show({
    var editGroupWindow = new BootstrapDialog({
        title: 'Edit Group',
        message: '<div class="row" style="height: 400px !important; overflow: auto;!important">  ' +
                '<div class="col-lg-12"> ' +
                groupFormData + ' </div>  </div>',
        draggable: true,
        size: BootstrapDialog.SIZE_WIDE,
        onshown: function (dialogue) {
            onEditPagedGrouWindowShow(dialogue);
        },
        onhidden: function (dialogue) {
            if (isGroupUpdated) {
                isGroupUpdated = false;
                loadPageGroupDetails(pagedGroupAdminGridDivObj);
            }
        },
        nl2br: false
    });

    editGroupWindow.open();
}

function onEditPagedGrouWindowShow(winObj) {
    $("button#editPagedGroupFormSubmit").click(function () {
        updateEDIPagedGroupForm(editGroupFormId);
    });
    $("button#editPagedGroupFormClear").click(function () {
        clearEDIPagedGroupForm(editGroupFormId);
    });


}

function onViewGroupClick(groupId) {
    var groupFormData = getViewPagedGroupForm(groupId, "A");
    var editWindow = BootstrapDialog.show({
        title: 'View Group',
        message: '<div class="row" style="height: 400px !important; overflow: auto;!important">  ' +
                '<div class="col-lg-12"> ' +
                groupFormData + ' </div>  </div>',
        draggable: true,
        size: BootstrapDialog.SIZE_WIDE,
        nl2br: false
    });
}

function navAddUserOnClick(obj) {
    clearAdminPageContentDivWrapper();
    var formData = getAddUserForm();
    document.getElementById("ediContentWrapper").innerHTML = formData;
}
function getAddUserForm() {
    return ediAjaxSync("/EDIPaged/EDI/ediAdmin/AddUserForm", {});
}

function navViewPagedGroupUserOnClick(obj) {
    clearAdminPageContentDivWrapper();
    var pagedUserGroupAdminGridData = getPagedUserGroupAdminUsersGrid();
    document.getElementById("ediContentWrapper").innerHTML = pagedUserGroupAdminGridData;

    pagedGroupAdminUsersDataGridObj = $('#pagedGroupAdminUsersDataGrid');
    var dataObj = getPagedUserGroupAdminUsersGridData();
    var tableObj = pagedGroupAdminUsersDataGridObj.bootstrapTable({
        data: dataObj
    });
    pagedGroupAdminUsersDataGridObj.on("click-row.bs.table", function (row, element) {
//        console.log(row);
//        console.log(element);
    });

}

function getPagedUserGroupAdminUsersGrid() {
    return ediAjaxSync("/EDIPaged/EDI/ediAdmin/pagedGroupAdminUsersGridLayout", {});
}

function getPagedUserGroupAdminUsersGridData() {
    return ediAjaxSync("/EDIPaged/EDI/ediAdmin/pagedGroupAdminUsersDetailsGrid?userCategory=groupadmin&status=A", {}, "JSON");
}

function groupAdminUserCheckboxCellFormatter(value) {
    if (!value) {
        return '';
    }
    var enabledStr = value.toUpperCase() === "A" ? "checked" : "";
    var checkboxItem = "<input type='checkbox' class='bs-checkbox '" + enabledStr + "  />";
    return checkboxItem;
}

function editGroupAdminUserCellFormatter(value) {
    if (!value) {
        return '';
    }
//                style='font-size: 1.4em;'
    var editItem = "<a href='javascript:void(0);' onclick=onPagedUserGroupAdminGridOperationsClick('" + value + "','EDIT')><i title='Modify' class='glyphicon glyphicon-pencil'></i></a>";
    return editItem;
}
function viewGroupAdminUserCellFormatter(value) {
    if (!value) {
        return '';
    }
    var viewItem = "<a href='javascript:void(0);' onclick=onPagedUserGroupAdminGridOperationsClick('" + value + "','VIEW')><i title='View'class='glyphicon glyphicon-list-alt'></i></a>";
    return viewItem;
}
function onPagedUserGroupAdminGridOperationsClick(id, operation) {
//    console.log(pagedGroupAdminGridDivObj.bootstrapTable('getRowByUniqueId', id));
//    console.log(id);
    if (operation === "EDIT") {
        onPagedGroupAdminGridEditClick(id);
    }
    if (operation === "VIEW") {
        onPagedGroupAdminGridEditClick(id);
    }
}

function onPagedGroupAdminGridEditClick(groupId) {
    var groupFormData = getAddUserForm();
    var editWindow = BootstrapDialog.show({
        title: 'Edit Group',
        message: '<div class="row" style="height: 400px !important; overflow: auto;!important">  ' +
                '<div class="col-lg-12"> ' +
                groupFormData + ' </div>  </div>',
        draggable: true,
        size: BootstrapDialog.SIZE_WIDE,
        nl2br: false
    });
//    bootbox.dialog({
//        title: "This is a form in a modal.",
//        size: "large",
//        className: "my-modal",
//        message: '<div class="row">  ' +
//                '<div class="col-lg-12"> ' +
//                groupFormData + ' </div>  </div>'
//    });
}