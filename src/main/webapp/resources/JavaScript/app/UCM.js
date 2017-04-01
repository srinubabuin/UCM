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
        _this.initStudentsGrid();
    };
    this.initStudentsGrid = function () {
        var _this = this;
        var toolbarObj = _this.getStudentDetailsToolbar();
        var dialyAccountsGridConfObj = {
            "parent": _this.detailsCellObj,
            "options": getStudentDetailsGridObj(toolbarObj)
        };
        var studentsGridObj = new createBootstrapTable(dialyAccountsGridConfObj);
        var studentsGrid = $(studentsGridObj.baseObj);
        studentsGrid.bootstrapTable({
            "height": $(_this.detailsCellObj).height() - 5,
            data: []
        });
        $(_this.detailsCellObj).find("button[name=refresh]").click(function () {
            // _this.detailsCellObj(_this.detailsCellObj);
        });
//        _this.loadDialyAccountsGridData(studentsGrid);
    };

    this.getStudentDetailsToolbar = function () {
        var toolbarObj = document.createElement("div");
        toolbarObj.role = "toolbar";
        var refreshButtonObj = document.createElement("button");
        refreshButtonObj.name = "refreshStudents";
        refreshButtonObj.title = "Refresh";
        refreshButtonObj.type = "button";
        refreshButtonObj.className = "btn btn-default";
        refreshButtonObj.style.padding = "3px 6px";
        refreshButtonObj.innerHTML = '<i class="glyphicon glyphicon-refresh icon-refresh"></i>';
        toolbarObj.appendChild(refreshButtonObj);
        return toolbarObj;
    };
    this.loadStudentsLyt();
}


function getStudentDetailsGridObj(toolbarObj) {
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
            label: "#",
            attributes: {
                "data-field": "srNo",
                "data-align": "left"
            }
        }, {
            label: "700#",
            attributes: {
                "data-field": "studentId",
                "data-align": "left"
            }
        }, {
            label: "Name",
            attributes: {
                "data-field": "name",
                "data-align": "left"
            }
        }, {
            label: "Mail",
            attributes: {
                "data-field": "mail",
                "data-align": "left"
            }
        }, {
            label: "Phone #",
            attributes: {
                "data-field": "phone",
                "data-align": "left"
            }
        }, {
            label: "Concentration",
            attributes: {
                "data-field": "concentration",
                "data-align": "left"
            }
        }, {
            label: "Entry Date",
            attributes: {
                "data-field": "entryDate",
                "data-align": "left"
            }
        }]
    };
    return studentDetailsConfobj;
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
        _this.initAdvisorsGrid();
    };
    this.initAdvisorsGrid = function () {
        var _this = this;
        var toolbarObj = _this.getAdvisorDetailsToolbar();
        var advisorsGridConfObj = {
            "parent": _this.detailsCellObj,
            "options": getAdvisorDetailsGridObj(toolbarObj)
        };
        var advisorsGridObj = new createBootstrapTable(advisorsGridConfObj);
        var advisorsGrid = $(advisorsGridObj.baseObj);
        advisorsGrid.bootstrapTable({
            "height": $(_this.detailsCellObj).height() - 5,
            data: []
        });
        $(_this.detailsCellObj).find("button[name=refresh]").click(function () {
            // _this.detailsCellObj(_this.detailsCellObj);
        });
//        _this.loadDialyAccountsGridData(dialyAccountsGrid);
    };

    this.getAdvisorDetailsToolbar = function () {
        var toolbarObj = document.createElement("div");
        toolbarObj.role = "toolbar";
        var refreshButtonObj = document.createElement("button");
        refreshButtonObj.name = "refreshAdvisors";
        refreshButtonObj.title = "Refresh";
        refreshButtonObj.type = "button";
        refreshButtonObj.className = "btn btn-default";
        refreshButtonObj.style.padding = "3px 6px";
        refreshButtonObj.innerHTML = '<i class="glyphicon glyphicon-refresh icon-refresh"></i>';
        toolbarObj.appendChild(refreshButtonObj);
        return toolbarObj;
    };
    this.loadAdvisorsLyt();
}


function getAdvisorDetailsGridObj(toolbarObj) {
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
            label: "#",
            attributes: {
                "data-field": "srNo",
                "data-align": "left"
            }
        }, {
            label: "700#",
            attributes: {
                "data-field": "advisorId",
                "data-align": "left"
            }
        }, {
            label: "Name",
            attributes: {
                "data-field": "name",
                "data-align": "left"
            }
        }, {
            label: "Mail",
            attributes: {
                "data-field": "mail",
                "data-align": "left"
            }
        }, {
            label: "Concentration",
            attributes: {
                "data-field": "concentration",
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
    return advisorDetailsConfobj;
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
        _this.initConcentrationsGrid();
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
        $(_this.detailsCellObj).find("button[name=refresh]").click(function () {
            // _this.detailsCellObj(_this.detailsCellObj);
        });
//        _this.loadDialyAccountsGridData(dialyAccountsGrid);
    };

    this.getConcentrationDetailsToolbar = function () {
        var toolbarObj = document.createElement("div");
        toolbarObj.role = "toolbar";
        var refreshButtonObj = document.createElement("button");
        refreshButtonObj.name = "refreshConcentrations";
        refreshButtonObj.title = "Refresh";
        refreshButtonObj.type = "button";
        refreshButtonObj.className = "btn btn-default";
        refreshButtonObj.style.padding = "3px 6px";
        refreshButtonObj.innerHTML = '<i class="glyphicon glyphicon-refresh icon-refresh"></i>';
        toolbarObj.appendChild(refreshButtonObj);
        return toolbarObj;
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
        var courcesGridConfObj = {
            "parent": _this.detailsCellObj,
            "options": getCourceDetailsGridObj(toolbarObj)
        };
        var courcesGridObj = new createBootstrapTable(courcesGridConfObj);
        var courcesGrid = $(courcesGridObj.baseObj);
        courcesGrid.bootstrapTable({
            "height": $(_this.detailsCellObj).height() - 5,
            data: []
        });
        $(_this.detailsCellObj).find("button[name=refresh]").click(function () {
            // _this.detailsCellObj(_this.detailsCellObj);
        });
//        _this.loadDialyAccountsGridData(dialyAccountsGrid);
    };

    this.getCourceDetailsToolbar = function () {
        var toolbarObj = document.createElement("div");
        toolbarObj.role = "toolbar";
        var refreshButtonObj = document.createElement("button");
        refreshButtonObj.name = "refreshCources";
        refreshButtonObj.title = "Refresh";
        refreshButtonObj.type = "button";
        refreshButtonObj.className = "btn btn-default";
        refreshButtonObj.style.padding = "3px 6px";
        refreshButtonObj.innerHTML = '<i class="glyphicon glyphicon-refresh icon-refresh"></i>';
        toolbarObj.appendChild(refreshButtonObj);
        return toolbarObj;
    };
    this.loadCourcesLyt();
}


function getCourceDetailsGridObj(toolbarObj) {
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
            label: "Prefix",
            attributes: {
                "data-field": "prefix",
                "data-align": "left"
            }
        }, {
            label: "Code",
            attributes: {
                "data-field": "code",
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
    return courceDetailsConfobj;
}
/*Cource Layout Ends*/
