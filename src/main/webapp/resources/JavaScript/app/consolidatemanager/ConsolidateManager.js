function loadConsolidateManagerLyt(cellObj) {
    consolidateManagerTabbarObj = new appTabbar({
        "parent": cellObj,
        "id": "consolidatemanagertabbar",
        "callback": onConsolidateManagerTabbarClick

    });
    consolidateManagerTabbarObj.addTab({
        "id": "accountsTab",
        "text": "Accounts"
    });
    consolidateManagerTabbarObj.addTab({
        "id": "consolidationsTab",
        "text": "Consolidations"
    });
    consolidateManagerTabbarObj.setTabActive("accountsTab");
}

function onConsolidateManagerTabbarClick(id, tabObj) {
    var contentObj = tabObj.base.content;
    var tabConfObj = {
        "parent": contentObj
    };
    if (id === "accountsTab") {
        var accountsTab = new loadConsolidateManagerAcountsTab(tabConfObj);
        accountsTab.initAccountsTab();
    } else if (id === "consolidationsTab") {
//        var clientsTab = loadClientDetailsTab(tabConfObj);
//        clientsTab.attachClientsTree();
    }
}

function loadConsolidateManagerAcountsTab(confObj) {
    this.confObj = confObj;

    this.lytConfObj = {
        "pattern": "1C",
        "parent": this.confObj.parent
    };
    this.lytObj = new appLayout(this.lytConfObj);
    this.detailsCellObj = this.lytObj.cells.a.obj;
    this.accountTabbarObj;
    this.accountTabbarContentObj;

    this.initAccountsTab = function () {
        var _this = this;
        _this.accountTabbarObj = new appTabbar({
            "parent": _this.detailsCellObj,
            "id": "cmaccountstabbar",
            "tabWidth": "170",
            "callback": function (id, tabContentObj) {
                _this.onCMAccountsTabbarClick(id, tabContentObj);
            }

        });

        _this.accountTabbarObj.addTab({
            "id": "dialyAccounts",
            "text": "Dialy Accounts"
        });
        _this.accountTabbarObj.addTab({
            "id": "inCompleteAccounts",
            "text": "In Complete Accounts"
        });
        _this.accountTabbarObj.addTab({
            "id": "assignAccounts",
            "text": "Assign Accounts"
        });
        _this.accountTabbarObj.setTabActive("dialyAccounts");
    };
    this.onCMAccountsTabbarClick = function (id, tabContentObj) {
        var _this = this;
        _this.accountTabbarContentObj = tabContentObj.base.content;
        if (id === "dialyAccounts") {
            _this.loadDialyAccountsTab();
        } else if (id === "inCompleteAccounts") {
            _this.loadIncompleteAccountsTab();
        } else if (id === "assignAccounts") {
            _this.loadAssignAccountsTab();
        }
    };
    this.loadDialyAccountsTab = function () {
        var _this = this;
        clearAllElementsInDiv(_this.accountTabbarContentObj);
        _this.initDialyAccountsGrid();
    };
    this.loadIncompleteAccountsTab = function () {
        var _this = this;
        clearAllElementsInDiv(_this.accountTabbarContentObj);
        _this.initIncompleteAccountsGrid();
    };
    this.loadAssignAccountsTab = function () {
        var _this = this;
        clearAllElementsInDiv(_this.accountTabbarContentObj);
        _this.showAssignAccountsForm(_this.accountTabbarContentObj);
    };
    this.initDialyAccountsGrid = function () {
        var _this = this;
        var toolbarObj = _this.getDialyAccountsToolbar();
        var dialyAccountsGridConfObj = {
            "parent": _this.accountTabbarContentObj,
            "options": getDialyAccountDetailsGridConfObj(toolbarObj)
        };
        var dialyAccountsGridObj = new createBootstrapTable(dialyAccountsGridConfObj);
        var dialyAccountsGrid = $(dialyAccountsGridObj.baseObj);
        dialyAccountsGrid.bootstrapTable({
            "height": $(_this.accountTabbarContentObj).height() - 5,
            data: []
        });
        $(_this.accountTabbarContentObj).find("button[name=refresh]").click(function () {
            _this.showAddUserDetailsForm(_this.accountTabbarContentObj);
        });
        _this.loadDialyAccountsGridData(dialyAccountsGrid);
    };
    this.getDialyAccountsToolbar = function () {
        var toolbarObj = document.createElement("div");
        toolbarObj.role = "toolbar";
        var refreshButtonObj = document.createElement("button");
        refreshButtonObj.name = "refreshAccounts";
        refreshButtonObj.title = "Refresh";
        refreshButtonObj.type = "button";
        refreshButtonObj.className = "btn btn-default";
        refreshButtonObj.style.padding = "3px 6px";
        refreshButtonObj.innerHTML = '<i class="glyphicon glyphicon-refresh icon-refresh"></i>';
        toolbarObj.appendChild(refreshButtonObj);
        return toolbarObj;
    };
    this.loadDialyAccountsGridData = function (gridObj) {
        gridObj.bootstrapTable("showLoading");
        var gridData = getDialyAccountDetailsGridData();
        gridObj.bootstrapTable("load", gridData);
        gridObj.bootstrapTable("hideLoading");
    };

    this.initIncompleteAccountsGrid = function () {
        var _this = this;
        var toolbarObj = _this.getIncompleteAccountsToolbar();
        var incompleteAccountsGridConfObj = {
            "parent": _this.accountTabbarContentObj,
            "options": getIncompleteAccountDetailsGridConfObj(toolbarObj)
        };
        var dialyAccountsGridObj = new createBootstrapTable(incompleteAccountsGridConfObj);
        var incompleteAccountsGrid = $(dialyAccountsGridObj.baseObj);
        incompleteAccountsGrid.bootstrapTable({
            "height": $(_this.accountTabbarContentObj).height() - 5,
            data: []
        });
        $(_this.accountTabbarContentObj).find("button[name=refresh]").click(function () {
            _this.showAddUserDetailsForm(_this.accountTabbarContentObj);
        });
        _this.loadIncompleteAccountsGridData(incompleteAccountsGrid);
    };
    this.getIncompleteAccountsToolbar = function () {
        var toolbarObj = document.createElement("div");
        toolbarObj.role = "toolbar";
        var refreshButtonObj = document.createElement("button");
        refreshButtonObj.name = "refreshAccounts";
        refreshButtonObj.title = "Refresh";
        refreshButtonObj.type = "button";
        refreshButtonObj.className = "btn btn-default";
        refreshButtonObj.style.padding = "3px 6px";
        refreshButtonObj.innerHTML = '<i class="glyphicon glyphicon-refresh icon-refresh"></i>';
        toolbarObj.appendChild(refreshButtonObj);
        return toolbarObj;
    };
    this.loadIncompleteAccountsGridData = function (gridObj) {
        gridObj.bootstrapTable("showLoading");
        var gridData = getIncompleteAccountDetailsGridData();
        gridObj.bootstrapTable("load", gridData);
        gridObj.bootstrapTable("hideLoading");
    };

    this.showAssignAccountsForm = function (cellObj) {
        var _this = this;
        var assignAccountsFormName = "ASSIGNACCOUNTS";
        var assignAccountsFormObj;
        clearAllElementsInDiv(cellObj);
        cellObj.innerHTML = loadAssignAccountsForm();
        assignAccountsFormObj = document.forms[assignAccountsFormName];
        $(assignAccountsFormObj.elements["submitBtn"]).click(function () {
            _this.onAssignAccountsFormBtnClick("submitBtn", assignAccountsFormName);
        });
        $(assignAccountsFormObj.elements["clearBtn"]).click(function () {
            _this.onAssignAccountsFormBtnClick("clearBtn", assignAccountsFormName);
        });
        $(assignAccountsFormObj.elements["cancelBtn"]).click(function () {
            _this.onAssignAccountsFormBtnClick("cancelBtn", assignAccountsFormName);
        });
        _this.onAssignAccountsFormBtnClick("clearBtn", assignAccountsFormName);
    };
    this.onAssignAccountsFormBtnClick = function (id, formName) {

        var _this = this;
        if (id === "submitBtn") {
            var formObj = document.forms[formName];
            var fileObj = formObj.elements["consolidatedFileObj"];
            var file = fileObj.files[0];
            var fd = new FormData;
            if (file === undefined || file === null || file === "") {
                fd = {};
            } else {
                fd.append('consolidatedFileObj', file);
            }


            var xhr = new XMLHttpRequest();
//            (xhr.upload || xhr).addEventListener('progress', function (e) {
//                var done = e.position || e.loaded
//                var total = e.totalSize || e.total;
//                console.log('xhr progress: ' + Math.round(done / total * 100) + '%');
//            });
            xhr.addEventListener('load', function (e) {
                console.log('xhr upload complete', e, this.responseText);
            });
            xhr.open('post', appContextPath + "/ncm/FileUpload/uploadDocument?" + getFormDataFormRequest(formName), true);
            xhr.send(fd);
//            var formObj = $(document.forms[formName]);
//            var formData = new FormData(formObj);
//            $.ajax({
//                url: appContextPath + "/ncm/FileUpload/uploadDocument",
//                type: 'POST',
//                data: formData,
//                async: false,
//                success: function (data) {
//                    alert(data)
//                },
//                cache: false,
//                contentType: false,
//                processData: false
//            });

//            $.post(formObj.attr("action"), formData, function (data) {
//                alert(data);
//            });

//            return false;

            return false;
            document.forms[formName].submit();
            var consolidatedFileObj = document.forms[formName].elements["consolidatedFileObj"];
            var oMyForm = new FormData(consolidatedFileObj);
            console.log(oMyForm);
            return false;
//            var validateItems = {
//            };
//            if (!validateForm(formName, validateItems)) {
//                return false;
//            }
            var formData = getFormDataByName(formName, "object");
            var h = [];
            for (var e in formData) {
                h.push(e + "=" + encodeURIComponent(formData[e]));
            }
            var requstStr = h.join("&");
//            var formResponse = appAjaxFileUpload(appContextPath + "/ncm/FileUpload/uploadDocument" + requstStr, oMyForm);
            document.forms[formName].submit();
            formResponse = JSON.parse(formResponse);
            if (formResponse.requestSuccess) {
                showMessage(formResponse.message, "success");
//                _this.loadUsersTreeData();
//                _this.initUsersGrid();
            } else {
                showMessage(formResponse.message, "danger");
            }

        } else if (id === "clearBtn") {
            clearFormDataByName(formName);
        } else if (id === "cancelBtn") {
//            _this.initUsersGrid();
        }

    };
    return this;
}

function getDialyAccountDetailsGridData() {
    return appAjaxSync(appContextPath + "/ncm/ConsolidateManager/getDialyAccountDetailsGridData", {}, "JSON");
}
function getIncompleteAccountDetailsGridData() {
    return appAjaxSync(appContextPath + "/ncm/ConsolidateManager/getIncompleteAccountDetailsGridData", {}, "JSON");
}

function loadAssignAccountsForm() {
    return ajaxSyncLoadForm(appContextPath + "/ncm/ConsolidateManager/assignAccountsForm");//loadAssignAccountsForm
}
function getDialyAccountDetailsGridConfObj(toolbarObj) {
    var toolbar = toolbarObj.outerHTML;
    var dialyAccountDetailsConfobj = {
        tableAttributes: {"data-mobile-responsive": "true", "data-show-header": "true", "data-toolbar": toolbar,
            "data-pagination": "true", "data-page-size": "25", "data-page-list": "[25, 50, 100]", "data-search": "true", "data-unique-id": "srNo"},
        columns: [{
                label: "#",
                attributes: {
                    "data-field": "srNo",
                    "data-align": "left"
                }
            }, {
                label: "Account Id",
                attributes: {
                    "data-field": "accountId",
                    "data-align": "left"
                }
            }, {
                label: "Client Id",
                attributes: {
                    "data-field": "clientId",
                    "data-align": "left"
                }
            }, {
                label: "Category Id",
                attributes: {
                    "data-field": "categoryId",
                    "data-align": "left"
                }
            }, {
                label: "Assigned By",
                attributes: {
                    "data-field": "assignedBy",
                    "data-align": "left"
                }
            }
        ]
    };
    return dialyAccountDetailsConfobj;
}

function getIncompleteAccountDetailsGridConfObj(toolbarObj) {
    var toolbar = toolbarObj.outerHTML;
    var incompleteAccountDetailsConfobj = {
        tableAttributes: {"data-mobile-responsive": "true", "data-show-header": "true", "data-toolbar": toolbar,
            "data-pagination": "true", "data-page-size": "25", "data-page-list": "[25, 50, 100]", "data-search": "true", "data-unique-id": "srNo"},
        columns: [{
                label: "#",
                attributes: {
                    "data-field": "srNo",
                    "data-align": "left"
                }
            }, {
                label: "Account Id",
                attributes: {
                    "data-field": "accountId",
                    "data-align": "left"
                }
            }, {
                label: "Recieved Date",
                attributes: {
                    "data-field": "recievedDate",
                    "data-align": "left"
                }
            }, {
                label: "Client Id",
                attributes: {
                    "data-field": "clientId",
                    "data-align": "left"
                }
            }, {
                label: "Category Id",
                attributes: {
                    "data-field": "categoryId",
                    "data-align": "left"
                }
            }, {
                label: "Assigned By",
                attributes: {
                    "data-field": "assignedBy",
                    "data-align": "left"
                }
            }
        ]
    };
    return incompleteAccountDetailsConfobj;
}