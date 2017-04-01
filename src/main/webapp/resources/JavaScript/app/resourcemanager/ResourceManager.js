function loadResourceManagerLyt(cellObj) {
    resourceTabbarObj = new appTabbar({
        "parent": cellObj,
        "id": "resourcemanagertab",
        "callback": onResourceTabbarClick

    });
    resourceTabbarObj.addTab({
        "id": "usersTab",
        "text": "Users"
    });
    resourceTabbarObj.addTab({
        "id": "clientsTab",
        "text": "Clients"
    });
    resourceTabbarObj.addTab({
        "id": "rolesTab",
        "text": "Roles"
    });
    resourceTabbarObj.setTabActive("usersTab");
}

function onResourceTabbarClick(id, tabObj) {
    var contentObj = tabObj.base.content;
    var tabConfObj = {
        "parent": contentObj
    };
    if (id === "usersTab") {
        var usersTab = new loadUserDetailsTab(tabConfObj);
        usersTab.attachUsersTree();
    } else if (id === "clientsTab") {
        var clientsTab = loadClientDetailsTab(tabConfObj);
        clientsTab.attachClientsTree();
    } else if (id === "rolesTab") {
        loadRolesDetailsTab(tabConfObj);
    }
}

function loadUserDetailsTab(confObj) {
    this.confObj = confObj;
    this.lytConfObj = {
        "pattern": "2U",
        "parent": confObj.parent,
        "cells": {
            "a": {
                "className": "col-md-2"
            },
            "b": {
                "className": "col-md-10"
            }
        }
    };
    this.lytObj = new appLayout(this.lytConfObj);
    this.userTreeCellObj = this.lytObj.cells.a.cont;
    this.treeObj = $(this.userTreeCellObj);
    this.userDetailsCellObj = this.lytObj.cells.b.cont;
    this.userDetailsObj;
    this.attachUsersTree = function () {
        var _this = this;
        _this.treeObj.jstree({'core': {
                "check_callback": true,
                "multiple": false
//            "themes": {"icons": false},
            }});
        _this.loadUsersTreeData(this.treeObj);
        _this.treeObj.on('changed.jstree', function (e, data) {
            _this.onUsersTreeSelect(e, data);
        });
    };
    this.loadUsersTreeData = function () {
        var _this = this;
        _this.treeObj.jstree().deselect_node(_this.treeObj.jstree().get_selected(true), true);
        _this.treeObj.jstree().delete_node(_this.treeObj.find('li'));
        var treeData = getUsersTreeData();
        _this.treeObj.jstree().create_node("#", treeData, "", false, false);
    };
    this.onUsersTreeSelect = function (ev, data) {
        var _this = this;
        if (data.selected.length > 1) {
            return;
        }
        var itemObj = data.instance.get_node(data.selected[0]);
        var nodeType = itemObj.li_attr.nodeType;
        var nodeId = itemObj.id;
        if (nodeType === "users") {
            _this.initUsersGrid();
        } else if (nodeType === "user") {
            _this.userDetailsObj = new loadUserDetailsLyt(nodeId, _this, _this.userDetailsCellObj, _this.treeObj);
            _this.userDetailsObj.initUserDetailsTabbarObj();
        }
    };
    this.initUsersGrid = function () {
        var _this = this;
        var toolbarObj = _this.getUserDetailsToolbar(_this.userDetailsCellObj);
        var usersGridConfObj = {
            "parent": _this.userDetailsCellObj,
            "options": getUserDetailsGridConfObj(toolbarObj)
        };
        var userDetailsGridObj = new createBootstrapTable(usersGridConfObj);
        var userGridObj = $(userDetailsGridObj.baseObj);
        userGridObj.bootstrapTable({
            "height": $(_this.userDetailsCellObj).height() - 5,
            data: []
        });
        $(_this.userDetailsCellObj).find("button[name=addUser]").click(function () {
            _this.showAddUserDetailsForm(_this.userDetailsCellObj);
        });
        _this.loadUsersGridData(userGridObj);
    };
    this.getUserDetailsToolbar = function (cellObj) {
        var toolbarObj = document.createElement("div");
        toolbarObj.role = "toolbar";
        var addButtonObj = document.createElement("button");
        addButtonObj.name = "addUser";
        addButtonObj.title = "Add User";
        addButtonObj.type = "button";
        addButtonObj.className = "btn btn-default";
        addButtonObj.style.padding = "3px 6px";
        addButtonObj.innerHTML = '<i class="glyphicon glyphicon-plus icon-plus"></i>';
        toolbarObj.appendChild(addButtonObj);
        return toolbarObj;
    };
    this.loadUsersGridData = function (gridObj) {
        gridObj.bootstrapTable("showLoading");
        var gridData = getUsersGridData();
        gridObj.bootstrapTable("load", gridData);
        gridObj.bootstrapTable("hideLoading");
    };
    this.showAddUserDetailsForm = function (cellObj) {
        var _this = this;
        var addUserFormName = "ADDUSER";
        var addUserFormObj;
        clearAllElementsInDiv(cellObj);
        cellObj.innerHTML = loadAddUserForm();
        addUserFormObj = document.forms[addUserFormName];
        $(addUserFormObj.elements["submitBtn"]).click(function () {
            _this.onAddUserFormBtnClick("submitBtn", addUserFormName);
        });
        $(addUserFormObj.elements["clearBtn"]).click(function () {
            _this.onAddUserFormBtnClick("clearBtn", addUserFormName);
        });
        $(addUserFormObj.elements["cancelBtn"]).click(function () {
            _this.onAddUserFormBtnClick("cancelBtn", addUserFormName);
        });
        _this.onAddUserFormBtnClick("clearBtn", addUserFormName);
    };
    this.onAddUserFormBtnClick = function (id, formName) {
        var _this = this;
        if (id === "submitBtn") {
            var validateItems = {"userName": {"validations": {"isNotEmpty": "Please enter Username", "isMaxLengthReached": "Please enter username below 50 characters"}, "maxLength": 50},
                "userFullName": {"validations": {"isNotEmpty": "Please enter User Full Name", "isMaxLengthReached": "Please enter user full name below 100 characters"}, "maxLength": 100},
                "password": {"validations": {"isNotEmpty": "Please enter Password", "isMaxLengthReached": "Please enter password below 25 characters"}, "maxLength": 25},
                "email": {"validations": {"isEmailAddress": "Please enter valid email address", "isMaxLengthReached": "Please enter email address below 100 characters"}, "maxLength": 100},
                "phone": {"validations": {"isNotEmpty": "Please enter phone number", "isPhoneNumber": "Please enter valid phone number"}},
                "userDescription": {"validations": {"isMaxLengthReached": "Please enter description below 1000 characters"}, "maxLength": 1000},
                "address": {"validations": {"isMaxLengthReached": "Please enter address below 255 characters"}, "maxLength": 255},
                "defaultModule": {"validations": {"isSelectValid": "Please select module"}},
                "defaultRole": {"validations": {"isSelectValid": "Please select role"}}
            };
            if (!validateForm(formName, validateItems)) {
                return false;
            }
            var formData = getFormDataByName(formName, "object");
            var h = [];
            for (var e in formData) {
                h.push(e + "=" + encodeURIComponent(formData[e]));
            }
            var requstStr = h.join("&");
            var formResponse = appAjaxSync(appContextPath + "/ncm/ResourceManager/insertUserDetails?" + requstStr);
            formResponse = JSON.parse(formResponse);
            if (formResponse.requestSuccess) {
                showMessage(formResponse.message, "success");
                _this.loadUsersTreeData();
                _this.initUsersGrid();
            } else {
                showMessage(formResponse.message, "danger");
            }

        } else if (id === "clearBtn") {
            clearFormDataByName(formName);
        } else if (id === "cancelBtn") {
            _this.initUsersGrid();
        }

    };
    return this;
}

function getUsersTreeData() {
    return appAjaxSync(appContextPath + "/ncm/ResourceManager/getUsersTreeData", {}, "JSON");
}


function getUsersGridData() {
    return appAjaxSync(appContextPath + "/ncm/ResourceManager/getUsersGridData", {}, "JSON");
}

function loadAddUserForm() {
    return ajaxSyncLoadForm(appContextPath + "/ncm/ResourceManager/addUserForm");
}

function validateForm(formName, validateItems) {
    var formObj = document.forms[formName];
    var items = Object.keys(validateItems);
    for (var element in formObj.elements) {
        if (items.indexOf(element) >= 0) {
            var formElement = formObj.elements[element];
            var validationEle = validateItems[element].validations;
            var maxLength = validateItems[element].maxLength;
            var validateTypes = Object.keys(validateItems[element].validations);
            for (var i = 0; i < validateTypes.length; i++) {
                var res;
                if (validateTypes[i] === "isMaxLengthReached") {
                    res = validateValue[validateTypes[i]](formElement.value, maxLength);
                } else {
                    res = validateValue[validateTypes[i]](formElement.value);
                }


                if (!res) {
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_WARNING,
                        title: 'Warning',
                        message: validationEle[validateTypes[i]],
                        draggable: true,
                        nl2br: false,
                        onhidden: function (e) {
                            formElement.focus();
                        }
                    });
                    return false;
                }
            }
        }

    }
    return true;
}

function getUserDetailsGridConfObj(toolbarObj) {
    var toolbar = toolbarObj.outerHTML;
    var userDetailsConfobj = {
        tableAttributes: {"data-mobile-responsive": "true", "data-show-header": "true", "data-toolbar": toolbar,
            "data-pagination": "true", "data-page-size": "25", "data-page-list": "[25, 50, 100]", "data-search": "true", "data-unique-id": "srNo"},
        columns: [{
                label: "#",
                attributes: {
                    "data-field": "srNo",
                    "data-align": "left"
                }
            }, {
                label: "User Name",
                attributes: {
                    "data-field": "userName",
                    "data-align": "left"
                }
            }, {
                label: "Role",
                attributes: {
                    "data-field": "role",
                    "data-align": "left"
                }
            }, {
                label: "Description",
                attributes: {
                    "data-field": "description",
                    "data-align": "left"
                }
            }, {
                label: "Email",
                attributes: {
                    "data-field": "email",
                    "data-align": "left"
                }
            }, {
                label: "Phone #",
                attributes: {
                    "data-field": "phone",
                    "data-align": "left"
                }
            }, {
                label: "Clients",
                attributes: {
                    "data-field": "clients",
                    "data-align": "left"
                }
            }
        ]
    };
    return userDetailsConfobj;
}


function loadUserDetailsLyt(nodeId, parentObj, cellObj, treeObj) {
    this.cellObj = cellObj;
    this.treeObj = treeObj;
    this.nodeId = nodeId;
    this.parentObj = parentObj;
    this.initUserDetailsTabbarObj = function () {
        var _this = this;
        _this.userDetailsTabbarObj = new appTabbar({
            "parent": cellObj,
            "id": "userdetailstab",
            "callback": function (id, tabObj) {
                _this.selectedTabContent = tabObj.base.content;
                _this.onUserDetailsTabbarClick(id);
            }
        });
        _this.userDetailsTabbarObj.addTab({
            "id": "userDetailsTab",
            "text": "User Details"
        });
        _this.userDetailsTabbarObj.addTab({
            "id": "assignClientsTab",
            "text": "Assign Clients"
        });
        _this.userDetailsTabbarObj.addTab({
            "id": "assignUsersTab",
            "text": "Assign Users"
        });
        _this.userDetailsTabbarObj.setTabActive("userDetailsTab");
    };
    this.onUserDetailsTabbarClick = function (id) {
        var _this = this;
        if (id === "userDetailsTab") {
            _this.showViewUserDetailsForm();
        } else if (id === "assignClientsTab") {
            _this.showUserClients();
        } else if (id === "assignUsersTab") {
            _this.showUserUsers();
        }
    };

    this.showViewUserDetailsForm = function () {
        var _this = this;
        var cellObj = _this.selectedTabContent;
        var nodeObj = treeObj.jstree().get_node(_this.nodeId);
        var viewUserFormName = "VIEWUSER";
        var viewUserFormObj;
        clearAllElementsInDiv(cellObj);
        cellObj.innerHTML = loadViewUserForm(nodeObj.text);
        viewUserFormObj = document.forms[viewUserFormName];
        $(viewUserFormObj.elements["editBtn"]).click(function () {
            _this.onVeiwUserFormBtnClick("editBtn", viewUserFormName);
        });
        $(viewUserFormObj.elements["deleteBtn"]).click(function () {
            _this.onVeiwUserFormBtnClick("deleteBtn", viewUserFormName);
        });
        _this.onVeiwUserFormBtnClick("clearBtn", viewUserFormName);
    };
    this.onVeiwUserFormBtnClick = function (id, formName) {
        var _this = this;
        if (id === "editBtn") {
            var userName = document.forms[formName].elements["userName"].value;
            _this.showEditUserDetailsForm(userName);
        } else if (id === "deleteBtn") {
            var userName = document.forms[formName].elements["userName"].value;
            var userId = document.forms[formName].elements["userId"].value;
            var formResponse = appAjaxSync(appContextPath + "/ncm/ResourceManager/deleteUserDetails?userId=" + userId + "&userName=" + userName + "&softDelete=true");
            formResponse = JSON.parse(formResponse);
            if (formResponse.requestSuccess) {
                showMessage(formResponse.message, "success");
                _this.parentObj.loadUsersTreeData();
                _this.parentObj.initUsersGrid();
            } else {
                showMessage(formResponse.message, "danger");
            }
        }
    };
    this.showEditUserDetailsForm = function (userName) {
        var _this = this;
        var cellObj = _this.selectedTabContent;
        var editUserFormName = "EDITUSER";
        var editUserFormObj;
        clearAllElementsInDiv(cellObj);
        cellObj.innerHTML = loadEditUserForm(userName);
        editUserFormObj = document.forms[editUserFormName];
        $(editUserFormObj.elements["submitBtn"]).click(function () {
            _this.onEditUserFormBtnClick("submitBtn", editUserFormName);
        });
        $(editUserFormObj.elements["clearBtn"]).click(function () {
            _this.onEditUserFormBtnClick("clearBtn", editUserFormName);
        });
        $(editUserFormObj.elements["cancelBtn"]).click(function () {
            _this.onEditUserFormBtnClick("cancelBtn", editUserFormName);
        });
        _this.onEditUserFormBtnClick("clearBtn", editUserFormName);
    };
    this.onEditUserFormBtnClick = function (id, formName) {
        var _this = this;
        if (id === "submitBtn") {
            var validateItems = {"userFullName": {"validations": {"isNotEmpty": "Please enter User Full Name", "isMaxLengthReached": "Please enter user full name below 100 characters"}, "maxLength": 100},
                "password": {"validations": {"isNotEmpty": "Please enter Password", "isMaxLengthReached": "Please enter password below 25 characters"}, "maxLength": 25},
                "email": {"validations": {"isEmailAddress": "Please enter valid email address", "isMaxLengthReached": "Please enter email address below 100 characters"}, "maxLength": 100},
                "phone": {"validations": {"isNotEmpty": "Please enter phone number", "isPhoneNumber": "Please enter valid phone number"}},
                "userDescription": {"validations": {"isMaxLengthReached": "Please enter description below 1000 characters"}, "maxLength": 1000},
                "address": {"validations": {"isMaxLengthReached": "Please enter address below 255 characters"}, "maxLength": 255},
                "defaultModule": {"validations": {"isSelectValid": "Please select module"}},
                "defaultRole": {"validations": {"isSelectValid": "Please select role"}}
            };
            if (!validateForm(formName, validateItems)) {
                return false;
            }
            var formData = getFormDataByName(formName, "object");
            var h = [];
            for (var e in formData) {
                h.push(e + "=" + encodeURIComponent(formData[e]));
            }
            var requstStr = h.join("&");
            var formResponse = appAjaxSync(appContextPath + "/ncm/ResourceManager/updateUserDetails?" + requstStr);
            formResponse = JSON.parse(formResponse);
            if (formResponse.requestSuccess) {
                showMessage(formResponse.message, "success");
                _this.showViewUserDetailsForm();
            } else {
                showMessage(formResponse.message, "danger");
            }

        } else if (id === "clearBtn") {
            clearFormDataByName(formName);
        } else if (id === "cancelBtn") {
            _this.showViewUserDetailsForm();
        }

    };

    this.showUserClients = function () {
        var _this = this;
        var cellObj = _this.selectedTabContent;
        var nodeObj = treeObj.jstree().get_node(_this.nodeId);
        clearAllElementsInDiv(cellObj);
    };
    this.showUserUsers = function () {
        var _this = this;
        var cellObj = _this.selectedTabContent;
        var nodeObj = treeObj.jstree().get_node(_this.nodeId);
        clearAllElementsInDiv(cellObj);
    };
}

function loadEditUserForm(userName) {
    return ajaxSyncLoadForm(appContextPath + "/ncm/ResourceManager/editUserForm?&userName=" + userName + "&status=A");
}

function loadViewUserForm(userName) {
    return ajaxSyncLoadForm(appContextPath + "/ncm/ResourceManager/viewUserForm?&userName=" + userName + "&status=A");
}

function loadClientDetailsTab(confObj) {
    this.confObj = confObj;
    this.lytConfObj = {
        "pattern": "2U",
        "parent": confObj.parent,
        "cells": {
            "a": {
                "className": "col-md-2"
            },
            "b": {
                "className": "col-md-10"
            }
        }
    };
    this.lytObj = new appLayout(this.lytConfObj);
    this.clientTreeCellObj = this.lytObj.cells.a.cont;
    this.treeObj = $(this.clientTreeCellObj);
    this.clientDetailsCellObj = this.lytObj.cells.b.cont;
    this.categoryDetailsObj;
    this.attachClientsTree = function () {
        var _this = this;
        _this.treeObj.jstree({'core': {
                "check_callback": true,
                "multiple": false
//            "themes": {"icons": false},
            }});
        _this.loadClientsTreeData(this.treeObj);
        _this.treeObj.on('changed.jstree', function (e, data) {
            _this.onClientsTreeSelect(e, data);
        });
    };
    this.loadClientsTreeData = function () {
        var _this = this;
        _this.treeObj.jstree().deselect_node(_this.treeObj.jstree().get_selected(true), true);
        _this.treeObj.jstree().delete_node(_this.treeObj.find('li'));
        var treeData = getClientsTreeData();
        _this.treeObj.jstree().create_node("#", treeData, "", false, false);
    };
    this.onClientsTreeSelect = function (ev, data) {
        var _this = this;
        if (data.selected.length > 1) {
            return;
        }
        var itemObj = data.instance.get_node(data.selected[0]);
        var nodeType = itemObj.li_attr.nodeType;
        var nodeId = itemObj.id;
        if (nodeType === "clients") {
            _this.initClientsGrid();
        } else if (nodeType === "client") {
            var nodeIds = nodeId.split(":");
            _this.clientId = nodeIds[1];
            _this.showViewClientDetailsForm(_this.clientDetailsCellObj);
        } else if (nodeType === "categories") {
            var nodeIds = nodeId.split(":");
            _this.clientId = nodeIds[1];
            var clientName = _this.treeObj.jstree().get_node("CLIENT:" + nodeIds[1]).text;
            var confObj = {
                "cells": _this.clientDetailsCellObj,
                "nodeId": nodeId,
                "parentObj": _this,
                "clientId": nodeIds[1],
                "clientName": clientName
            };

            _this.categoryDetailsObj = new loadCategoryDetails(confObj);
            _this.categoryDetailsObj.loadClientsTreeCategories();
            _this.categoryDetailsObj.initCategoriesGrid();
        } else if (nodeType === "category") {
            _this.clientId = itemObj.li_attr.clientId;
            var nodeIds = nodeId.split(":");
            var confObj = {
                "cells": _this.clientDetailsCellObj,
                "nodeId": nodeId,
                "parentObj": _this,
                "clientId": _this.clientId,
                "categoryId": nodeIds[1]
            };
            _this.categoryDetailsObj = new loadCategoryDetails(confObj);
            _this.categoryDetailsObj.initCategoryDetailsTabbarObj();
        }
    };
    this.initClientsGrid = function () {
        var _this = this;
        var toolbarObj = _this.getClientDetailsToolbar(_this.clientDetailsCellObj);
        var clientsGridConfObj = {
            "parent": _this.clientDetailsCellObj,
            "options": getClientDetailsGridConfObj(toolbarObj)
        };
        var clientDetailsGridObj = new createBootstrapTable(clientsGridConfObj);
        var clientGridObj = $(clientDetailsGridObj.baseObj);
        clientGridObj.bootstrapTable({
            "height": $(_this.clientDetailsCellObj).height() - 5,
            data: []
        });
        $(_this.clientDetailsCellObj).find("button[name=addClient]").click(function () {
            _this.showAddClientDetailsForm(_this.clientDetailsCellObj);
        });
        _this.loadClientsGridData(clientGridObj);
    };
    this.getClientDetailsToolbar = function (cellObj) {
        var toolbarObj = document.createElement("div");
        toolbarObj.role = "toolbar";
        var addButtonObj = document.createElement("button");
        addButtonObj.name = "addClient";
        addButtonObj.title = "Add Client";
        addButtonObj.type = "button";
        addButtonObj.className = "btn btn-default";
        addButtonObj.style.padding = "3px 6px";
        addButtonObj.innerHTML = '<i class="glyphicon glyphicon-plus icon-plus"></i>';
        toolbarObj.appendChild(addButtonObj);
        return toolbarObj;
    };
    this.loadClientsGridData = function (gridObj) {
        gridObj.bootstrapTable("showLoading");
        var gridData = getClientsGridData();
        gridObj.bootstrapTable("load", gridData);
        gridObj.bootstrapTable("hideLoading");
    };
    this.showAddClientDetailsForm = function (cellObj) {
        var _this = this;
        var addClientFormName = "ADDCLIENT";
        var addClientFormObj;
        clearAllElementsInDiv(cellObj);
        cellObj.innerHTML = loadAddClientForm();
        addClientFormObj = document.forms[addClientFormName];
        $(addClientFormObj.elements["submitBtn"]).click(function () {
            _this.onAddClientFormBtnClick("submitBtn", addClientFormName);
        });
        $(addClientFormObj.elements["clearBtn"]).click(function () {
            _this.onAddClientFormBtnClick("clearBtn", addClientFormName);
        });
        $(addClientFormObj.elements["cancelBtn"]).click(function () {
            _this.onAddClientFormBtnClick("cancelBtn", addClientFormName);
        });
        _this.onAddClientFormBtnClick("clearBtn", addClientFormName);
    };

    this.onAddClientFormBtnClick = function (id, formName) {
        var _this = this;
        if (id === "submitBtn") {
            var validateItems = {"clientName": {"validations": {"isNotEmpty": "Please enter Client name", "isMaxLengthReached": "Please enter clientname below 20 characters"}, "maxLength": 20},
                "clientFullName": {"validations": {"isNotEmpty": "Please enter Client Full Name", "isMaxLengthReached": "Please enter client full name below 100 characters"}, "maxLength": 100},
                "clientDescription": {"validations": {"isMaxLengthReached": "Please enter description below 1000 characters"}, "maxLength": 1000}
            };
            if (!validateForm(formName, validateItems)) {
                return false;
            }
            var formData = getFormDataByName(formName, "object");
            var h = [];
            for (var e in formData) {
                h.push(e + "=" + encodeURIComponent(formData[e]));
            }
            var requstStr = h.join("&");
            var formResponse = appAjaxSync(appContextPath + "/ncm/ResourceManager/insertClientDetails?" + requstStr);
            formResponse = JSON.parse(formResponse);
            if (formResponse.requestSuccess) {
                showMessage(formResponse.message, "success");
                _this.loadClientsTreeData();
                _this.initClientsGrid();
            } else {
                showMessage(formResponse.message, "danger");
            }

        } else if (id === "clearBtn") {
            clearFormDataByName(formName);
        } else if (id === "cancelBtn") {
            _this.initClientsGrid();
        }
    };

    this.showViewClientDetailsForm = function (cellObj) {
        var _this = this;
        var viewClientFormName = "VIEWCLIENT";
        var viewClientFormObj;
        clearAllElementsInDiv(cellObj);
        cellObj.innerHTML = loadViewClientForm(_this.clientId);
        viewClientFormObj = document.forms[viewClientFormName];
        $(viewClientFormObj.elements["editBtn"]).click(function () {
            _this.onViewClientFormBtnClick("editBtn", viewClientFormName);
        });
        $(viewClientFormObj.elements["deleteBtn"]).click(function () {
            _this.onViewClientFormBtnClick("deleteBtn", viewClientFormName);
        });
    };

    this.onViewClientFormBtnClick = function (id, formName) {
        var _this = this;
        if (id === "editBtn") {
            var clientId = document.forms[formName].elements["clientId"].value;
            _this.showEditClientDetailsForm(clientId, _this.clientDetailsCellObj);
        } else if (id === "deleteBtn") {
            var clientId = document.forms[formName].elements["clientId"].value;
            var formResponse = appAjaxSync(appContextPath + "/ncm/ResourceManager/deleteClientDetails?clientId=" + clientId + "&softDelete=true");
            formResponse = JSON.parse(formResponse);
            if (formResponse.requestSuccess) {
                showMessage(formResponse.message, "success");
                _this.loadClientsTreeData();
                _this.initClientsGrid();
            } else {
                showMessage(formResponse.message, "danger");
            }
        }
    };

    this.showEditClientDetailsForm = function (clientId, cellObj) {
        var _this = this;
        var editClientFormName = "EDITCLIENT";
        var editClientFormObj;
        clearAllElementsInDiv(cellObj);
        cellObj.innerHTML = loadEditClientForm(clientId);
        editClientFormObj = document.forms[editClientFormName];
        $(editClientFormObj.elements["submitBtn"]).click(function () {
            _this.onEditClientFormBtnClick("submitBtn", editClientFormName);
        });
        $(editClientFormObj.elements["clearBtn"]).click(function () {
            _this.onEditClientFormBtnClick("clearBtn", editClientFormName);
        });
        $(editClientFormObj.elements["cancelBtn"]).click(function () {
            _this.onEditClientFormBtnClick("cancelBtn", editClientFormName);
        });
        _this.onEditClientFormBtnClick("clearBtn", editClientFormName);
    };
    this.onEditClientFormBtnClick = function (id, formName) {
        var _this = this;
        if (id === "submitBtn") {
            var validateItems = {"clientName": {"validations": {"isNotEmpty": "Please enter Client name", "isMaxLengthReached": "Please enter clientname below 20 characters"}, "maxLength": 20},
                "clientFullName": {"validations": {"isNotEmpty": "Please enter Client Full Name", "isMaxLengthReached": "Please enter client full name below 100 characters"}, "maxLength": 100},
                "clientDescription": {"validations": {"isMaxLengthReached": "Please enter description below 1000 characters"}, "maxLength": 1000}
            };
            if (!validateForm(formName, validateItems)) {
                return false;
            }
            var formData = getFormDataByName(formName, "object");
            var h = [];
            for (var e in formData) {
                h.push(e + "=" + encodeURIComponent(formData[e]));
            }
            var requstStr = h.join("&");
            var formResponse = appAjaxSync(appContextPath + "/ncm/ResourceManager/updateClientDetails?" + requstStr);
            formResponse = JSON.parse(formResponse);
            if (formResponse.requestSuccess) {
                showMessage(formResponse.message, "success");
                _this.showViewClientDetailsForm(_this.clientDetailsCellObj);
            } else {
                showMessage(formResponse.message, "danger");
            }

        } else if (id === "clearBtn") {
            clearFormDataByName(formName);
        } else if (id === "cancelBtn") {
            _this.showViewClientDetailsForm(_this.clientDetailsCellObj);
        }

    };
    return this;
}

function getClientDetailsGridConfObj(toolbarObj) {
    var toolbar = toolbarObj.outerHTML;
    var userDetailsConfobj = {
        tableAttributes: {"data-mobile-responsive": "true", "data-show-header": "true", "data-toolbar": toolbar,
            "data-pagination": "true", "data-page-size": "25", "data-page-list": "[25, 50, 100]", "data-search": "true", "data-unique-id": "srNo"},
        columns: [{
                label: "#",
                attributes: {
                    "data-field": "srNo",
                    "data-align": "left"
                }
            }, {
                label: "Client Name",
                attributes: {
                    "data-field": "clientName",
                    "data-align": "left"
                }
            }, {
                label: "Client Full Name",
                attributes: {
                    "data-field": "clientFullName",
                    "data-align": "left"
                }
            }, {
                label: "Description",
                attributes: {
                    "data-field": "description",
                    "data-align": "left"
                }
            }, {
                label: "Modified By",
                attributes: {
                    "data-field": "modifiedBy",
                    "data-align": "left"
                }
            }, {
                label: "Modified Date",
                attributes: {
                    "data-field": "modifiedDate",
                    "data-align": "left"
                }
            }
        ]
    };

    return userDetailsConfobj;
}

function getClientsTreeData() {
    return appAjaxSync(appContextPath + "/ncm/ResourceManager/getClientsTreeData", {}, "JSON");
}

function getClientsGridData() {
    return appAjaxSync(appContextPath + "/ncm/ResourceManager/getClientsGridData", {}, "JSON");
}

function loadAddClientForm() {
    return ajaxSyncLoadForm(appContextPath + "/ncm/ResourceManager/addClientForm");
}

function loadViewClientForm(clientId) {
    return ajaxSyncLoadForm(appContextPath + "/ncm/ResourceManager/viewClientForm?clientId=" + clientId);
}

function loadEditClientForm(clientId) {
    return ajaxSyncLoadForm(appContextPath + "/ncm/ResourceManager/editClientForm?clientId=" + clientId);
}

function loadCategoryDetails(confObj) {
    this.confObj = confObj;
    this.cellObj = this.confObj.cells;
    this.treeObj = $(this.confObj.parentObj.treeObj);
    this.nodeId = this.confObj.nodeId;
    this.clientId = this.confObj.clientId;
    this.clientName = this.confObj.clientName;
    this.categoryId = this.confObj.categoryId;

    this.loadClientsTreeCategories = function () {
        var _this = this;
        var childEls = _this.treeObj.jstree().get_children_dom(_this.nodeId);
        for (var itemInd = 0; itemInd < childEls.length; itemInd++) {
            _this.treeObj.jstree().delete_node(childEls[itemInd]);
        }
        var treeData = getClientsTreeCategiesData(_this.clientId);
        for (var itemInd = 0; itemInd < treeData.length; itemInd++) {
            _this.treeObj.jstree().create_node(_this.nodeId, treeData[itemInd], "", false, false);
        }
        _this.treeObj.jstree().open_node(_this.nodeId);
    };

    this.initCategoriesGrid = function () {
        var _this = this;
        var toolbarObj = _this.getCategoriesDetailsToolbar();
        var categoryGridConfObj = {
            "parent": _this.cellObj,
            "options": getCategoriesDetailsGridConfObj(toolbarObj)
        };
        var categoryDetailsGridObj = new createBootstrapTable(categoryGridConfObj);
        var clientGridObj = $(categoryDetailsGridObj.baseObj);
        clientGridObj.bootstrapTable({
            "height": $(_this.cellObj).height() - 5,
            data: []
        });
        $(_this.cellObj).find("button[name=addCategory]").click(function () {
            _this.showAddCategoryDetailsForm(_this.cellObj);
        });
        _this.loadCategoriesGridData(clientGridObj);
    };
    this.getCategoriesDetailsToolbar = function () {
        var toolbarObj = document.createElement("div");
        toolbarObj.role = "toolbar";
        var addButtonObj = document.createElement("button");
        addButtonObj.name = "addCategory";
        addButtonObj.title = "Add Category";
        addButtonObj.type = "button";
        addButtonObj.className = "btn btn-default";
        addButtonObj.style.padding = "3px 6px";
        addButtonObj.innerHTML = '<i class="glyphicon glyphicon-plus icon-plus"></i>';
        toolbarObj.appendChild(addButtonObj);
        return toolbarObj;
    };
    this.loadCategoriesGridData = function (gridObj) {
        var _this = this;
        gridObj.bootstrapTable("showLoading");
        var gridData = getCategoriesGridData(_this.clientId);
        gridObj.bootstrapTable("load", gridData);
        gridObj.bootstrapTable("hideLoading");
    };

    this.showAddCategoryDetailsForm = function (cellObj) {
        var _this = this;
        var addCategoryFormName = "ADDCATEGORY";
        var addCategoryFormObj;
        clearAllElementsInDiv(cellObj);
        cellObj.innerHTML = loadAddCategoryForm(_this.clientId, _this.clientName);
        addCategoryFormObj = document.forms[addCategoryFormName];
        $(addCategoryFormObj.elements["submitBtn"]).click(function () {
            _this.onAddCategoryFormBtnClick("submitBtn", addCategoryFormName);
        });
        $(addCategoryFormObj.elements["clearBtn"]).click(function () {
            _this.onAddCategoryFormBtnClick("clearBtn", addCategoryFormName);
        });
        $(addCategoryFormObj.elements["cancelBtn"]).click(function () {
            _this.onAddCategoryFormBtnClick("cancelBtn", addCategoryFormName);
        });
        _this.onAddCategoryFormBtnClick("clearBtn", addCategoryFormName);
    };

    this.onAddCategoryFormBtnClick = function (id, formName) {
        var _this = this;
        if (id === "submitBtn") {
            var validateItems = {"categoryName": {"validations": {"isNotEmpty": "Please enter Caregory name", "isMaxLengthReached": "Please enter Caregory name below 20 characters"}, "maxLength": 20},
                "categoryFullName": {"validations": {"isNotEmpty": "Please enter Caregory Full Name", "isMaxLengthReached": "Please enter Caregory full name below 100 characters"}, "maxLength": 100},
                "categoryDescription": {"validations": {"isMaxLengthReached": "Please enter description below 1000 characters"}, "maxLength": 1000}
            };
            if (!validateForm(formName, validateItems)) {
                return false;
            }
            var formData = getFormDataByName(formName, "object");
            var h = [];
            for (var e in formData) {
                h.push(e + "=" + encodeURIComponent(formData[e]));
            }
            var requstStr = h.join("&");
            var formResponse = appAjaxSync(appContextPath + "/ncm/ResourceManager/insertCategoryDetails?" + requstStr);
            formResponse = JSON.parse(formResponse);
            if (formResponse.requestSuccess) {
                showMessage(formResponse.message, "success");
                _this.loadClientsTreeCategories();
                _this.initCategoriesGrid();
            } else {
                showMessage(formResponse.message, "danger");
            }
        } else if (id === "clearBtn") {
            clearFormDataByName(formName);
        } else if (id === "cancelBtn") {
            _this.initCategoriesGrid();
        }
    };

    this.initCategoryDetailsTabbarObj = function () {
        var _this = this;
        _this.categoryDetailsTabbarObj = new appTabbar({
            "parent": _this.cellObj,
            "tabWidth": "200",
            "id": "categorydetailstabbar",
            "callback": function (id, tabObj) {
                _this.selectedTabContent = tabObj.base.content;
                _this.onCategoryDetailsTabbarClick(id);
            }
        });
        _this.categoryDetailsTabbarObj.addTab({
            "id": "categoryDetailsTab",
            "text": "Category Details"
        });
        _this.categoryDetailsTabbarObj.addTab({
            "id": "categoryExcelConfigurationTab",
            "text": "Category Excel Configuration"
        });
        _this.categoryDetailsTabbarObj.setTabActive("categoryDetailsTab");
    };
    this.onCategoryDetailsTabbarClick = function (id) {
        var _this = this;
        if (id === "categoryDetailsTab") {
            _this.showViewCategoryDetailsTab();
        } else if (id === "categoryExcelConfigurationTab") {
            _this.showCategoryExcelConfigurationTab();
        }
    };

    this.showViewCategoryDetailsTab = function () {
        var _this = this;
        this.showViewCategoryDetailsForm(_this.selectedTabContent);
    };

    this.showCategoryExcelConfigurationTab = function () {
        var _this = this;
        this.showCategoryHeaderConfigurationDetails(_this.selectedTabContent);
    };

    this.showViewCategoryDetailsForm = function (cellObj) {
        var _this = this;
        var viewCategoryFormName = "VIEWCATEGORY";
        var viewCategoryFormObj;
        clearAllElementsInDiv(cellObj);
        cellObj.innerHTML = loadViewCategoryForm(_this.categoryId);
        viewCategoryFormObj = document.forms[viewCategoryFormName];
        $(viewCategoryFormObj.elements["editBtn"]).click(function () {
            _this.onViewCategoryFormBtnClick("editBtn", viewCategoryFormName);
        });
        $(viewCategoryFormObj.elements["deleteBtn"]).click(function () {
            _this.onViewCategoryFormBtnClick("deleteBtn", viewCategoryFormName);
        });
    };

    this.onViewCategoryFormBtnClick = function (id, formName) {
        var _this = this;
        if (id === "editBtn") {
            _this.showEditCategoryDetailsForm(_this.selectedTabContent);
        } else if (id === "deleteBtn") {
            var formResponse = appAjaxSync(appContextPath + "/ncm/ResourceManager/deleteCategoryDetails?categoryId=" + _this.categoryId + "&softDelete=true");
            formResponse = JSON.parse(formResponse);
            if (formResponse.requestSuccess) {
                showMessage(formResponse.message, "success");
                _this.treeObj.jstree().deselect_node("CATEGORY:" + _this.categoryId, true);
                _this.treeObj.jstree().select_node("CATEGORIES:" + _this.clientId, false);
//                _this.loadClientsTreeData();
//                _this.initClientsGrid();
            } else {
                showMessage(formResponse.message, "danger");
            }
        }
    };

    this.showEditCategoryDetailsForm = function (cellObj) {
        var _this = this;
        var editCategoryFormName = "EDITCATEGORY";
        var editCategoryFormObj;
        clearAllElementsInDiv(cellObj);
        cellObj.innerHTML = loadEditCategoryForm(_this.categoryId);
        editCategoryFormObj = document.forms[editCategoryFormName];
        $(editCategoryFormObj.elements["submitBtn"]).click(function () {
            _this.onEditCategoryFormBtnClick("submitBtn", editCategoryFormName);
        });
        $(editCategoryFormObj.elements["clearBtn"]).click(function () {
            _this.onEditCategoryFormBtnClick("clearBtn", editCategoryFormName);
        });
        $(editCategoryFormObj.elements["cancelBtn"]).click(function () {
            _this.onEditCategoryFormBtnClick("cancelBtn", editCategoryFormName);
        });
        _this.onEditCategoryFormBtnClick("clearBtn", editCategoryFormName);
    };
    this.onEditCategoryFormBtnClick = function (id, formName) {
        var _this = this;
        if (id === "submitBtn") {
            var validateItems = {"categoryName": {"validations": {"isNotEmpty": "Please enter Caregory name", "isMaxLengthReached": "Please enter Caregory name below 20 characters"}, "maxLength": 20},
                "categoryFullName": {"validations": {"isNotEmpty": "Please enter Caregory Full Name", "isMaxLengthReached": "Please enter Caregory full name below 100 characters"}, "maxLength": 100},
                "categoryDescription": {"validations": {"isMaxLengthReached": "Please enter description below 1000 characters"}, "maxLength": 1000}
            };
            if (!validateForm(formName, validateItems)) {
                return false;
            }
            var formData = getFormDataByName(formName, "object");
            var h = [];
            for (var e in formData) {
                h.push(e + "=" + encodeURIComponent(formData[e]));
            }
            var requstStr = h.join("&");
            var formResponse = appAjaxSync(appContextPath + "/ncm/ResourceManager/updateCategoryDetails?" + requstStr);
            formResponse = JSON.parse(formResponse);
            if (formResponse.requestSuccess) {
                showMessage(formResponse.message, "success");
                _this.showViewCategoryDetailsTab();
            } else {
                showMessage(formResponse.message, "danger");
            }

        } else if (id === "clearBtn") {
            clearFormDataByName(formName);
        } else if (id === "cancelBtn") {
            _this.showViewCategoryDetailsTab();
        }

    };

    this.showCategoryHeaderConfigurationDetails = function (cellObj) {
        var _this = this;
        var toolbarObj = _this.categoryHeaderConfigurationToolbar();
        var categoryHeaderConfGridConfObj = {
            "parent": cellObj,
            "options": getCateagoryExcelConfigurationGridConfObj(toolbarObj)
        };
        var categoryHeaderConfGrid = new createBootstrapTable(categoryHeaderConfGridConfObj);
        var categoryHeaderConfGridObj = $(categoryHeaderConfGrid.baseObj);
        categoryHeaderConfGridObj.bootstrapTable({
            "height": $(cellObj).height() - 5,
            data: []
        });

        _this.loadCategoryHeaderGridData(categoryHeaderConfGridObj, "VIEW");
        showOrHideDetails("");
        $(_this.cellObj).find("button[name=editCategoryHeadersConf]").click(function () {
            showOrHideDetails("EDIT");
//            _this.showAddCategoryDetailsForm(_this.cellObj);
        });
        $(_this.cellObj).find("button[name=saveCategoryHeadersConf]").click(function () {
            console.log(categoryHeaderConfGridObj.bootstrapTable("getData"));
            var gridConfData = getExcelHdrConfigGridReqData(categoryHeaderConfGridObj);
            console.log(gridConfData);
            showOrHideDetails("SAVE");
//            _this.showAddCategoryDetailsForm(_this.cellObj);
        });
        $(_this.cellObj).find("button[name=cancelCategoryHeadersConf]").click(function () {
            showOrHideDetails("CANCEL");
//            _this.showAddCategoryDetailsForm(_this.cellObj);
        });

        function showOrHideDetails(itemId) {
            if (itemId === "EDIT") {
                $(_this.cellObj).find("button[name=editCategoryHeadersConf]").hide();
                $(_this.cellObj).find("button[name=saveCategoryHeadersConf]").show();
                $(_this.cellObj).find("button[name=cancelCategoryHeadersConf]").show();
                _this.loadCategoryHeaderGridData(categoryHeaderConfGridObj, "EDIT");
            } else {
                $(_this.cellObj).find("button[name=editCategoryHeadersConf]").show();
                $(_this.cellObj).find("button[name=saveCategoryHeadersConf]").hide();
                $(_this.cellObj).find("button[name=cancelCategoryHeadersConf]").hide();
                _this.loadCategoryHeaderGridData(categoryHeaderConfGridObj, "VIEW");
            }

        }
    };

    this.loadCategoryHeaderGridData = function (gridObj, mode) {
        var _this = this;
        gridObj.bootstrapTable("showLoading");
        var gridData = getCategoryHeadersGridData(_this.categoryId, mode);
        gridObj.bootstrapTable("load", gridData);
        gridObj.bootstrapTable("hideLoading");
    };

    this.categoryHeaderConfigurationToolbar = function () {
        var toolbarObj = document.createElement("div");
        toolbarObj.role = "toolbar";
        var editButtonObj = document.createElement("button");
        editButtonObj.name = "editCategoryHeadersConf";
        editButtonObj.title = "Edit Configuration";
        editButtonObj.type = "button";
        editButtonObj.className = "btn btn-avg btn-info";
        editButtonObj.style.padding = "3px 6px";
        editButtonObj.style["margin-left"] = "05px";
        editButtonObj.innerHTML = 'Edit';
        toolbarObj.appendChild(editButtonObj);
        var saveButtonObj = document.createElement("button");
        saveButtonObj.name = "saveCategoryHeadersConf";
        saveButtonObj.title = "Save Configuration";
        saveButtonObj.type = "button";
        saveButtonObj.className = "btn btn-avg btn-success";
        saveButtonObj.style.padding = "3px 6px";
        saveButtonObj.style["margin-left"] = "05px";
        saveButtonObj.innerHTML = 'Save';
        toolbarObj.appendChild(saveButtonObj);
        var cancelButtonObj = document.createElement("button");
        cancelButtonObj.name = "cancelCategoryHeadersConf";
        cancelButtonObj.title = "Cancel Configuration";
        cancelButtonObj.type = "button";
        cancelButtonObj.className = "btn btn-avg btn-warning";
        cancelButtonObj.style.padding = "3px 6px";
        cancelButtonObj.style["margin-left"] = "05px";
        cancelButtonObj.innerHTML = 'Cancel';
        toolbarObj.appendChild(cancelButtonObj);
        return toolbarObj;
    };
}


function getCategoriesDetailsGridConfObj(toolbarObj) {
    var toolbar = toolbarObj.outerHTML;
    var userDetailsConfobj = {
        tableAttributes: {"data-mobile-responsive": "true", "data-show-header": "true", "data-toolbar": toolbar,
            "data-pagination": "true", "data-page-size": "25", "data-page-list": "[25, 50, 100]", "data-search": "true", "data-unique-id": "srNo"},
        columns: [{
                label: "#",
                attributes: {
                    "data-field": "srNo",
                    "data-align": "left"
                }
            }, {
                label: "Category Name",
                attributes: {
                    "data-field": "categoryName",
                    "data-align": "left"
                }
            }, {
                label: "Category Full Name",
                attributes: {
                    "data-field": "categoryFullName",
                    "data-align": "left"
                }
            }, {
                label: "Client Name",
                attributes: {
                    "data-field": "clientName",
                    "data-align": "left"
                }
            }, {
                label: "Description",
                attributes: {
                    "data-field": "description",
                    "data-align": "left"
                }
            }, {
                label: "Modified By",
                attributes: {
                    "data-field": "modifiedBy",
                    "data-align": "left"
                }
            }, {
                label: "Modified Date",
                attributes: {
                    "data-field": "modifiedDate",
                    "data-align": "left"
                }
            }
        ]
    };

    return userDetailsConfobj;
}

function getCateagoryExcelConfigurationGridConfObj(toolbarObj) {
    var toolbar = toolbarObj.outerHTML;
    var userDetailsConfobj = {
        tableAttributes: {"data-mobile-responsive": "true", "data-show-header": "true", "data-toolbar": toolbar,
            "data-search": "true", "data-unique-id": "srNo"},
        columns: [{
                label: "#",
                attributes: {
                    "data-field": "srNo",
                    "data-align": "left"
                }
            }, {
                label: "Column Name",
                attributes: {
                    "data-field": "columnName",
                    "data-align": "left"
                }
            }, {
                label: "Excel Column Name",
                attributes: {
                    "data-field": "excelColumnName",
                    "data-align": "left",
                    "data-formatter": "categoryExcelHeaderEditFormatter",
                }
            }, {
                label: "Description",
                attributes: {
                    "data-field": "description",
                    "data-align": "left",
                    "data-formatter": "categoryExcelDescriptionEditFormatter"
                }
            }, {
                label: "Enable",
                attributes: {
                    "data-field": "enable",
                    "data-align": "center",
                    "data-checkbox": true,
                    "data-formatter": "categoryExcelEnableFormatter"
                }
            }
        ]
    };
    return userDetailsConfobj;
}

function categoryExcelHeaderEditFormatter(value, row, index) {
    return categoryHeaderGridFormatter("excelColumnNameEdit", value, row, index);
}

function categoryExcelDescriptionEditFormatter(value, row, index) {
    return categoryHeaderGridFormatter("descriptionEdit", value, row, index);
}

function categoryExcelEnableFormatter(value, row, index) {
    if (row["mode"] === "VIEW") {
        return {
            checked: value,
            disabled: true
        };
    }
    return value;
//    return categoryHeaderGridFormatter("enable", value, row, index);
}

function categoryHeaderGridFormatter(id, value, row, index) {
    if (row["mode"] === "VIEW") {
        return value;
    }
    var cellText = value;
    if (id === "excelColumnNameEdit") {
        cellText = "<input name='HEADER_" + row["columnName"] + "' type = 'text' style='width: 100%;'> </input>";
    } else if (id === "descriptionEdit") {
        cellText = "<textarea name='DESCRIPTION_" + row["columnName"] + "' type = 'text' rows=3 style='width: 100%;'> </textarea>";
    } else if (id === "enable") {
        if (value === "1") {
            cellText = {
                checked: true
            };
        } else {
            cellText = {
                checked: false
            };
        }
    }
    return cellText;
}

function getExcelHdrConfigGridReqData(gridObj) {
    //excelColumnName, description
    var gridData = gridObj.bootstrapTable("getData");
    var gridRowsDom = gridObj.find("tbody").find("tr");
    for (var i = 0; i < gridData.length; i++) {
        gridData[i]["excelColumnName"] = gridRowsDom.find("input[name='HEADER_" + gridData[i]["columnName"] + "']").val();
        gridData[i]["description"] = gridRowsDom.find("textarea[name='DESCRIPTION_" + gridData[i]["columnName"] + "']").val();
    }
    return gridData;
}

function getClientsTreeCategiesData(clientId) {
    return appAjaxSync(appContextPath + "/ncm/ResourceManager/getClientsTreeCategoriesData?clientId=" + clientId, {}, "JSON");
}

function getCategoriesGridData(clientId) {
    return appAjaxSync(appContextPath + "/ncm/ResourceManager/getClientCategoriesGridData?clientId=" + clientId, {}, "JSON");
}

function loadAddCategoryForm(clientId, clientName) {
    return ajaxSyncLoadForm(appContextPath + "/ncm/ResourceManager/addCategoryForm?clientId=" + clientId + "&clientName=" + clientName);
}

function loadViewCategoryForm(categoryId) {
    return ajaxSyncLoadForm(appContextPath + "/ncm/ResourceManager/viewCategoryForm?categoryId=" + categoryId);
}

function loadEditCategoryForm(categoryId) {
    return ajaxSyncLoadForm(appContextPath + "/ncm/ResourceManager/editCategoryForm?categoryId=" + categoryId);
}

function getCategoryHeadersGridData(clientId, mode) {
    return appAjaxSync(appContextPath + "/ncm/ResourceManager/getCategoryExcelHeaders?categoryId=" + clientId + "&mode=" + mode, {}, "JSON");
}

function loadRolesDetailsTab(confObj) {
    var lytConfObj = {
        "pattern": "2U",
        "parent": confObj.parent,
        "cells": {
            "a": {
                "className": "col-md-2"
            },
            "b": {
                "className": "col-md-10"
            }
        }
    };
    var rolesLytObj = new appLayout(lytConfObj);
}

