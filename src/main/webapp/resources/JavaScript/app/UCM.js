function onMainNavItemClick(itemId) {
    if (itemId == appManagerLytObj.module) {
        return;
    }
    if (appManagerLytObj.module) {
        $("#appNavBar").find('li[itemId="' + appManagerLytObj.module + '"]').removeClass('active');
    }
    $("#appNavBar").find('li[itemId="' + itemId + '"]').addClass('active');
    if (itemId === "STUDENTS") {
        studentLytObj = new loadStudentLyt(appManagerLytObj.domObj);
        appManagerLytObj.module = itemId;
    } else if (itemId === "ADVISORS") {
        advisorLytObj = new loadAdvisorLyt(appManagerLytObj.domObj);
        appManagerLytObj.module = itemId;
    } else if (itemId === "CONCENTRATIONS") {
        concentrationLytObj = new loadConcentrationLyt(appManagerLytObj.domObj);
        appManagerLytObj.module = itemId;
    } else if (itemId === "COURCES") {
        courceLytObj = new loadCourceLyt(appManagerLytObj.domObj);
        appManagerLytObj.module = itemId;
    } else if (itemId === "LOGOUT") {
        doLogout();
    }
}

/*Student Layout Starts*/
function loadStudentLyt(cellObj) {
    this.lytConfObj = {
        "pattern": "1C",
        "parent": cellObj
    };
    this.lytObj = new appLayout(this.lytConfObj);
    this.detailsCellObj = this.lytObj.cells.a.obj;
    this.loadStudentsLyt = function () {
        var _this = this;
        clearAllElementsInDiv(_this.detailsCellObj);
        // _this.initStudentsGrid();
        _this.showStudentForm(_this.detailsCellObj);
    };

    this.initStudentsGrid = function () {
        var _this = this;
        var toolbarObj = _this.getStudentDetailsToolbar();
        var confObj = {
            'me': _this
        };
        var studentsGridConfObj = {
            "parent": _this.detailsCellObj,
            "options": getStudentDetailsGridObj(toolbarObj, confObj)
        };
        var studentsGridObj = new createBootstrapTable(studentsGridConfObj);
        var studentsGrid = $(studentsGridObj.baseObj);
        studentsGrid.bootstrapTable({
            "height": $(_this.detailsCellObj).height() - 5,
            "columns": studentsGridConfObj.options.columns,
            data: []
        });
        $(_this.detailsCellObj).find("button[name=addStudents]").click(function () {
            _this.showStudentForm(_this.detailsCellObj);
        });
        _this.loadStudentsGridData(studentsGrid);
    };

    this.operateEvent = function () {
        var _this = this;
        return {
            'click .studentEdit': function (e, value, row, index) {
                console.log('edit', value, row, index);
                _this.showStudentForm(_this.detailsCellObj);
            }, 'click .studentRemove': function (e, value, row, index) {
                console.log('remove', value, row, index);
            }
        };
    };

    this.loadStudentsGridData = function (gridObj) {
        gridObj.bootstrapTable("showLoading");
        var gridData = getStudentsGridData();
        gridObj.bootstrapTable("load", gridData);
        gridObj.bootstrapTable("hideLoading");
    };

    this.getStudentDetailsToolbar = function () {
        var toolbarObj = document.createElement("div");
        toolbarObj.role = "toolbar";
        var refreshButtonObj = document.createElement("button");
        refreshButtonObj.name = "addStudents";
        refreshButtonObj.title = "Add Student";
        refreshButtonObj.type = "button";
        refreshButtonObj.className = "btn btn-default";
        refreshButtonObj.style.padding = "3px 6px";
        refreshButtonObj.innerHTML = '<i class="glyphicon glyphicon-plus-sign icon-plus-sign"></i>';
        toolbarObj.appendChild(refreshButtonObj);
        return toolbarObj;
    };

    this.showStudentForm = function (cellObj) {
        var _this = this;
        appManagerLytObj.module = "";
        var studentFormConfObj = {
            "parent": cellObj,
            "hdrText": "Add Student",
            "name": "addstudent",
            "id": "addstudent"
        };
        var studentFormWrapObj = new attachForm(studentFormConfObj);

        studentFormWrapObj.cell.form.innerHTML = getStudentForm();
        var studentFormObj = document.forms[studentFormConfObj.name];
        $(studentFormObj.elements["save"]).click(function () {
            _this.onStudentFormBtnClick("save", studentFormObj.name);
        });
        // $(studentFormObj.elements["reset"]).click(function () {
        //     _this.onStudentFormBtnClick("reset", studentFormObj.name);
        // });
        $(studentFormObj.elements["cancel"]).click(function () {
            _this.onStudentFormBtnClick("cancel", studentFormObj.name);
        });
        // _this.onStudentFormBtnClick("clearBtn", studentFormObj.name);
    };
    this.onStudentFormBtnClick = function (id, formName) {

        var _this = this;
        if (id === "save") {
            var formObj = document.forms[formName];
        } else if (id === "reset") {
            clearFormDataByName(formName);
        } else if (id === "cancel") {
            _this.initStudentsGrid();
        }

    };

    this.loadStudentsLyt();
}

function getStudentDetailsGridObj(toolbarObj, confObj) {
    var toolbar = toolbarObj.outerHTML;
    var studentDetailsConfobj = {
        tableAttributes: {
            "data-mobile-responsive": "true",
            "data-show-header": "true",
            "data-toolbar": toolbar,
            "data-pagination": "true",
            "data-page-size": "25",
            "data-page-list": "[25, 50, 100]",
            "data-search": "true",
            "data-unique-id": "srNo"
        },
        columns: [{
            title: "#",
            field: "srNo",
            align: "left"
        }, {
            title: "700#",
            field: "studentId",
            align: "left"
        }, {
            title: "Name",
            field: "name",
            align: "left"

        }, {
            title: "Mail",
            field: "mail",
            align: "left"
        }, {
            title: "Phone #",
            field: "phone",
            align: "left"
        }, {
            title: "Concentration",
            field: "concentration",
            align: "left"

        }, {
            title: "Entry Date",
            field: "entryDate",
            align: "left"

        }, {
            title: "Operate",
            field: "operate",
            align: 'center',
            events: confObj.me.operateEvent(),
            formatter: [
                '<button class="studentEdit" title="Edit">',
                '<i class="glyphicon glyphicon-pencil icon-pencil"></i>',
                '</button>  ',
                '<button class="studentRemove" title="Remove">',
                '<i class="glyphicon glyphicon-remove-sign icon-remove-sign"></i>',
                '</button>'
            ].join('')
        }]
    };
    return studentDetailsConfobj;
}

function getStudentForm() {
    var form = document.getElementById("studentFormTpl").innerHTML;
    return form;
}

function getStudentsGridData() {
    return [{
        srNo: 1,
        studentId: 7001,
        name: 'abc'
    }];
}

/*Student Layout Ends*/

/*Advisor Layout Starts*/
function loadAdvisorLyt(cellObj) {
    this.lytConfObj = {
        "pattern": "1C",
        "parent": cellObj
    };
    this.lytObj = new appLayout(this.lytConfObj);
    this.detailsCellObj = this.lytObj.cells.a.obj;
    this.loadAdvisorsLyt = function () {
        var _this = this;
        clearAllElementsInDiv(_this.detailsCellObj);
        // _this.initAdvisorsGrid();
        _this.showAdvisorForm(_this.detailsCellObj);
    };
    this.initAdvisorsGrid = function () {
        var _this = this;
        var toolbarObj = _this.getAdvisorDetailsToolbar();
        var confObj = {
            me: _this
        };
        var advisorsGridConfObj = {
            "parent": _this.detailsCellObj,
            "options": getAdvisorDetailsGridObj(toolbarObj, confObj)
        };
        var advisorsGridObj = new createBootstrapTable(advisorsGridConfObj);
        var advisorsGrid = $(advisorsGridObj.baseObj);
        advisorsGrid.bootstrapTable({
            "height": $(_this.detailsCellObj).height() - 5,
            "columns": advisorsGridConfObj.options.columns,
            data: []
        });
        $(_this.detailsCellObj).find("button[name=addAdvisors]").click(function () {
            _this.showAdvisorForm(_this.detailsCellObj);
        });
        _this.loadAdvisorsGridData(advisorsGrid);
    };

    this.operateEvent = function () {
        var _this = this;
        return {
            'click .advisorEdit': function (e, value, row, index) {
                console.log('edit', value, row, index);
                _this.showAdvisorForm(_this.detailsCellObj);
            }, 'click .advisorRemove': function (e, value, row, index) {
                console.log('remove', value, row, index);
            }
        };
    };

    this.loadAdvisorsGridData = function (gridObj) {
        gridObj.bootstrapTable("showLoading");
        var gridData = getStudentsGridData();
        gridObj.bootstrapTable("load", gridData);
        gridObj.bootstrapTable("hideLoading");
    };

    this.getAdvisorDetailsToolbar = function () {
        var toolbarObj = document.createElement("div");
        toolbarObj.role = "toolbar";
        var addAdvisorButtonObj = document.createElement("button");
        addAdvisorButtonObj.name = "addAdvisors";
        addAdvisorButtonObj.title = "Add Advisor";
        addAdvisorButtonObj.type = "button";
        addAdvisorButtonObj.className = "btn btn-default";
        addAdvisorButtonObj.style.padding = "3px 6px";
        addAdvisorButtonObj.innerHTML = '<i class="glyphicon glyphicon-plus-sign icon-plus-sign"></i>';
        toolbarObj.appendChild(addAdvisorButtonObj);
        return toolbarObj;
    };

    this.showAdvisorForm = function (cellObj) {
        var _this = this;
        appManagerLytObj.module = "";
        var advisorFormConfObj = {
            "parent": cellObj,
            "hdrText": "Add Advisor",
            "name": "addadvisor",
            "id": "addadvisor"
        };
        var advisorFormWrapObj = new attachForm(advisorFormConfObj);

        advisorFormWrapObj.cell.form.innerHTML = getAdvisorForm();
        var advisorFormObj = document.forms[advisorFormConfObj.name];
        $(advisorFormObj.elements["save"]).click(function () {
            _this.onAdvisorFormBtnClick("save", advisorFormObj.name);
        });
        // $(advisorFormObj.elements["reset"]).click(function () {
        //     _this.onAdvisorFormBtnClick("reset", advisorFormObj.name);
        // });
        $(advisorFormObj.elements["cancel"]).click(function () {
            _this.onAdvisorFormBtnClick("cancel", advisorFormObj.name);
        });
        // _this.onAdvisorFormBtnClick("clearBtn", studentFormObj.name);
    };
    this.onAdvisorFormBtnClick = function (id, formName) {

        var _this = this;
        if (id === "save") {
            var formObj = document.forms[formName];
        } else if (id === "reset") {
            clearFormDataByName(formName);
        } else if (id === "cancel") {
            _this.initAdvisorsGrid()
        }

    };

    this.loadAdvisorsLyt();
}

function getAdvisorDetailsGridObj(toolbarObj, confObj) {

    var toolbar = toolbarObj.outerHTML;
    var advisorDetailsConfobj = {
        tableAttributes: {
            "data-mobile-responsive": "true",
            "data-show-header": "true",
            "data-toolbar": toolbar,
            "data-pagination": "true",
            "data-page-size": "25",
            "data-page-list": "[25, 50, 100]",
            "data-search": "true",
            "data-unique-id": "srNo"
        },
        columns: [{
            title: "#",
            field: "srNo",
            align: "left"
        }, {
            title: "700#",
            field: "advisorId",
            align: "left"
        }, {
            title: "Name",
            field: "name",
            align: "left"
        }, {
            title: "Mail",
            field: "mail",
            align: "left"
        }, {
            title: "Concentration",
            field: "concentration",
            align: "left"
        }, {
            title: "Status",
            field: "status",
            align: "left"
        }, {
            title: "Operate",
            field: "operate",
            align: 'center',
            events: confObj.me.operateEvent(),
            formatter: [
                '<button class="advisorEdit" title="Edit">',
                '<i class="glyphicon glyphicon-pencil icon-pencil"></i>',
                '</button>  ',
                '<button class="advisorRemove" title="Remove">',
                '<i class="glyphicon glyphicon-remove-sign icon-remove-sign"></i>',
                '</button>'
            ].join('')
        }]
    };
    return advisorDetailsConfobj;
}

function getAdvisorForm() {
    var form = document.getElementById("advisorFormTpl").innerHTML;
    return form;
}
/*Advisor Layout Ends*/

/*Concentration Layout Starts*/
function loadConcentrationLyt(cellObj) {
    this.lytConfObj = {
        "pattern": "1C",
        "parent": cellObj
    };
    this.lytObj = new appLayout(this.lytConfObj);
    this.detailsCellObj = this.lytObj.cells.a.obj;
    this.loadConcentrationsLyt = function () {
        var _this = this;
        clearAllElementsInDiv(_this.detailsCellObj);
        // _this.initConcentrationsGrid();
        _this.showConcentrationsForm(_this.detailsCellObj);
    };
    this.initConcentrationsGrid = function () {
        var _this = this;
        var toolbarObj = _this.getConcentrationDetailsToolbar();
        var concentrationsGridConfObj = {
            "parent": _this.detailsCellObj,
            "options": getConcentrationDetailsGridObj(toolbarObj)
        };
        var concentrationsGridObj = new createBootstrapTable(concentrationsGridConfObj);
        var concentrationsGrid = $(concentrationsGridObj.baseObj);
        concentrationsGrid.bootstrapTable({
            "height": $(_this.detailsCellObj).height() - 5,
            data: []
        });
        $(_this.detailsCellObj).find("button[name=addConcentration]").click(function () {
            _this.showConcentrationsForm(_this.detailsCellObj);
        });
//        _this.loadDialyAccountsGridData(dialyAccountsGrid);
    };

    this.getConcentrationDetailsToolbar = function () {
        var toolbarObj = document.createElement("div");
        toolbarObj.role = "toolbar";
        var addConcentrationButtonObj = document.createElement("button");
        addConcentrationButtonObj.name = "addConcentration";
        addConcentrationButtonObj.title = "Add Concentration";
        addConcentrationButtonObj.type = "button";
        addConcentrationButtonObj.className = "btn btn-default";
        addConcentrationButtonObj.style.padding = "3px 6px";
        addConcentrationButtonObj.innerHTML = '<i class="glyphicon glyphicon-plus-sign icon-plus-sign"></i>';
        toolbarObj.appendChild(addConcentrationButtonObj);
        return toolbarObj;
    };

    this.showConcentrationsForm = function (cellObj) {
        var _this = this;
        appManagerLytObj.module = "";
        var concentrationFormConfObj = {
            "parent": cellObj,
            "hdrText": "Add Concentration",
            "name": "addconcentration",
            "id": "addconcentration"
        };
        var concentrationFormWrapObj = new attachForm(concentrationFormConfObj);

        concentrationFormWrapObj.cell.form.innerHTML = getConcentrationForm();
        var concentrationFormObj = document.forms[concentrationFormConfObj.name];
        $(concentrationFormObj.elements["save"]).click(function () {
            _this.onConcentrationsFormBtnClick("save", concentrationFormObj.name);
        });
        // $(concentrationFormObj.elements["reset"]).click(function () {
        //     _this.onConcentrationsFormBtnClick("reset", concentrationFormObj.name);
        // });
        $(concentrationFormObj.elements["cancel"]).click(function () {
            _this.onConcentrationsFormBtnClick("cancel", concentrationFormObj.name);
        });
        // _this.onConcentrationsFormBtnClick("clearBtn", concentrationFormObj.name);
    };

    this.onConcentrationsFormBtnClick = function (id, formName) {

        var _this = this;
        if (id === "save") {
            var formObj = document.forms[formName];
        } else if (id === "reset") {
            clearFormDataByName(formName);
        } else if (id === "cancel") {
            _this.initConcentrationsGrid();
        }

    };

    this.loadConcentrationsLyt();
}

function getConcentrationDetailsGridObj(toolbarObj) {
    var toolbar = toolbarObj.outerHTML;
    var concentrationDetailsConfobj = {
        tableAttributes: {
            "data-mobile-responsive": "true",
            "data-show-header": "true",
            "data-toolbar": toolbar,
            "data-pagination": "true",
            "data-page-size": "25",
            "data-page-list": "[25, 50, 100]",
            "data-search": "true",
            "data-unique-id": "srNo"
        },
        columns: [{
            label: "#",
            attributes: {
                "data-field": "srNo",
                "data-align": "left"
            }
        }, {
            label: "Name",
            attributes: {
                "data-field": "name",
                "data-align": "left"
            }
        }, {
            label: "Cources",
            attributes: {
                "data-field": "cources",
                "data-align": "left"
            }
        }, {
            label: "Status",
            attributes: {
                "data-field": "status",
                "data-align": "left"
            }
        }]
    };
    return concentrationDetailsConfobj;
}

function getConcentrationForm() {
    var form = document.getElementById("concentrationFormTpl").innerHTML;
    return form;
}
/*Concentration Layout Ends*/


/*Cource Layout Starts*/
function loadCourceLyt(cellObj) {
    this.lytConfObj = {
        "pattern": "1C",
        "parent": cellObj
    };
    this.lytObj = new appLayout(this.lytConfObj);
    this.detailsCellObj = this.lytObj.cells.a.obj;
    this.loadCourcesLyt = function () {
        var _this = this;
        clearAllElementsInDiv(_this.detailsCellObj);
        _this.initCourcesGrid();
    };
    this.initCourcesGrid = function () {
        var _this = this;
        var toolbarObj = _this.getCourceDetailsToolbar();
        var confObj = {
            me: _this
        };
        var courcesGridConfObj = {
            "parent": _this.detailsCellObj,
            "options": getCourceDetailsGridObj(toolbarObj, confObj)
        };
        var courcesGridObj = new createBootstrapTable(courcesGridConfObj);
        var courcesGrid = $(courcesGridObj.baseObj);
        courcesGrid.bootstrapTable({
            "height": $(_this.detailsCellObj).height() - 5,
            "columns": courcesGridConfObj.options.columns,
            data: [],
            "onDblClickRow": function (row, el, field) {
                _this.showViewCourceForm(_this.detailsCellObj);
            }
        });
        $(_this.detailsCellObj).find("button[name=addCource]").click(function () {
            _this.showAddCourceForm(_this.detailsCellObj);
        });
        _this.loadCourcesGridData(courcesGrid);
    };

    this.operateEvent = function () {
        var _this = this;
        return {
            'click .courceEdit': function (e, value, row, index) {
                console.log('edit', value, row, index);
                _this.showEditCourceForm(_this.detailsCellObj);
            }, 'click .courceRemove': function (e, value, row, index) {
                console.log('remove', value, row, index);
            }
        };
    };

    this.loadCourcesGridData = function (gridObj) {
        gridObj.bootstrapTable("showLoading");
        var gridData = getAllCources();
        gridObj.bootstrapTable("load", gridData);
        gridObj.bootstrapTable("hideLoading");
    };

    this.getCourceDetailsToolbar = function () {
        var toolbarObj = document.createElement("div");
        toolbarObj.role = "toolbar";
        var addCourceButtonObj = document.createElement("button");
        addCourceButtonObj.name = "addCource";
        addCourceButtonObj.title = "Add Cource";
        addCourceButtonObj.type = "button";
        addCourceButtonObj.className = "btn btn-default";
        addCourceButtonObj.style.padding = "3px 6px";
        addCourceButtonObj.innerHTML = '<i class="glyphicon glyphicon-plus-sign icon-plus-sign"></i>';
        toolbarObj.appendChild(addCourceButtonObj);
        return toolbarObj;
    };

    this.attachCourcesForm = function (cellObj, confObj) {
        var courceFormWrapObj = new attachForm(confObj);
        courceFormWrapObj.cell.form.innerHTML = getCourceForm();
    };

    this.showAddCourceForm = function (cellObj) {
        var _this = this;
        appManagerLytObj.module = "";
        var courceFormConfObj = {
            "parent": cellObj,
            "hdrText": "Add Cource",
            "formType": "add",
            "name": "addcource",
            "id": "addcource"
        };
        _this.attachCourcesForm(cellObj, courceFormConfObj);
        var courceFormObj = document.forms[courceFormConfObj.name];
        $(courceFormObj.elements["status"].parentElement.parentElement).hide();
        $(courceFormObj.elements["save"]).click(function () {
            _this.onCourceFormBtnClick("save", courceFormConfObj);
        });
        // $(courceFormObj.elements["reset"]).click(function () {
        //     _this.onCourceFormBtnClick("reset", courceFormConfObj);
        // });
        $(courceFormObj.elements["cancel"]).click(function () {
            _this.onCourceFormBtnClick("cancel", courceFormConfObj);
        });
        // _this.onCourceFormBtnClick("clearBtn", courceFormConfObj);
    };

    this.showEditCourceForm = function (cellObj) {
        var _this = this;
        appManagerLytObj.module = "";
        var courceFormConfObj = {
            "parent": cellObj,
            "hdrText": "Edit Cource",
            "formType": "edit",
            "name": "editcource",
            "id": "editcource"
        };
        _this.attachCourcesForm(cellObj, courceFormConfObj);
        var courceFormObj = document.forms[courceFormConfObj.name];
        $(courceFormObj.elements["save"]).click(function () {
            _this.onCourceFormBtnClick("save", courceFormConfObj);
        });
        // $(courceFormObj.elements["reset"]).click(function () {
        //     _this.onCourceFormBtnClick("reset", courceFormConfObj);
        // });
        $(courceFormObj.elements["cancel"]).click(function () {
            _this.onCourceFormBtnClick("cancel", courceFormConfObj);
        });
        // _this.onCourceFormBtnClick("clearBtn", courceFormConfObj);
    };

    this.showViewCourceForm = function (cellObj) {
        var _this = this;
        appManagerLytObj.module = "";
        var courceFormConfObj = {
            "parent": cellObj,
            "hdrText": "View Cource",
            "formType": "view",
            "name": "viewcource",
            "id": "viewcource"
        };
        _this.attachCourcesForm(cellObj, courceFormConfObj);
        var courceFormObj = document.forms[courceFormConfObj.name];
        $(courceFormObj.elements["name"]).attr('readonly', 'true');
        $(courceFormObj.elements["prefix"]).attr('readonly', 'true');
        $(courceFormObj.elements["code"]).attr('readonly', 'true');
        $(courceFormObj.elements["notes"]).attr('readonly', 'true');
        $(courceFormObj.elements["status"]).attr('disabled', 'disabled');
        $(courceFormObj.elements["save"]).hide();
        $(courceFormObj.elements["reset"]).hide();
        $(courceFormObj.elements["cancel"]).text("Close");
        $(courceFormObj.elements["cancel"]).click(function () {
            _this.onCourceFormBtnClick("cancel", courceFormConfObj);
        });
        // _this.onCourceFormBtnClick("clearBtn", courceFormConfObj);
    };

    this.onCourceFormBtnClick = function (id, confObj) {

        var _this = this;
        var formName = confObj.name;
        if (id === "save") {
            var formObj = document.forms[formName];
            var cource = {};
            cource["courceName"] = formObj["name"].value;
            cource["courcePrefix"] = formObj["prefix"].value;
            cource["courceCode"] = formObj["code"].value;
            cource["courceStatus"] = formObj["status"].value;
            cource["notes"] = formObj["notes"].value;
            var response = addCource(cource);
            console.log(response);
        } else if (id === "reset") {
            clearFormDataByName(formName);
        } else if (id === "cancel") {
            _this.initCourcesGrid();
        }

    };
    this.loadCourcesLyt();
}

function getAllCources() {
    return appAjaxSync(appRestPath + "/cource", "GET", JSON.stringify({}), "JSON");
}

function addCource(cource) {
    return appAjaxSync(appRestPath + "/cource", "PUT", JSON.stringify(cource), "JSON");
}

function getCourceDetailsGridObj(toolbarObj, confObj) {
    var toolbar = toolbarObj.outerHTML;
    var courceDetailsConfobj = {
        tableAttributes: {
            "data-mobile-responsive": "true",
            "data-show-header": "true",
            "data-toolbar": toolbar,
            "data-pagination": "true",
            "data-page-size": "25",
            "data-page-list": "[25, 50, 100]",
            "data-search": "true",
            "data-unique-id": "srNo"
        },
        columns: [{
            title: "#",
            field: "srNo",
            align: "left"
        }, {
            title: "Name",
            field: "courceName",
            align: "left"
        }, {
            title: "Prefix",
            field: "courcePrefix",
            align: "left"
        }, {
            title: "Code",
            field: "courceCode",
            align: "left"
        }, {
            title: "Notes",
            field: "notes",
            align: "left"
        }, {
            title: "Status",
            field: "courceStatus",
            align: "left"
        }, {
            title: "Operate",
            field: "operate",
            align: 'center',
            events: confObj.me.operateEvent(),
            formatter: [
                '<button class="courceEdit" title="Edit">',
                '<i class="glyphicon glyphicon-pencil icon-pencil"></i>',
                '</button>  ',
                '<button class="courceRemove" title="Remove">',
                '<i class="glyphicon glyphicon-remove-sign icon-remove-sign"></i>',
                '</button>'
            ].join('')
        }]
    };
    return courceDetailsConfobj;
}

function getCourceForm() {
    var form = document.getElementById("courceFormTpl").innerHTML;
    return form;
}

/*Cource Layout Ends*/
