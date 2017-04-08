/* Director Home Starts */
function onMainNavItemClick(itemId) {
    if (itemId == appManagerLytObj.module) {
        return;
    }
    if (appManagerLytObj.module) {
        $("#appNavBar").find('li[itemId="' + appManagerLytObj.module + '"]').removeClass('active');
    } else {
        $("#appNavBar").find('.active').removeClass('active');
    }
    $("#appNavBar").find('li[itemId="' + itemId + '"]').addClass('active');
    if (itemId === "STUDENTSEARCH") {
        appManagerLytObj.module = itemId;
        studentLytObj = new loadStudentSearchLyt(appManagerLytObj.domObj);
    } else if (itemId === "STUDENTS") {
        appManagerLytObj.module = itemId;
        studentLytObj = new loadStudentLyt(appManagerLytObj.domObj);
    } else if (itemId === "ADVISORS") {
        appManagerLytObj.module = itemId;
        advisorLytObj = new loadAdvisorLyt(appManagerLytObj.domObj);
    } else if (itemId === "CONCENTRATIONS") {
        appManagerLytObj.module = itemId;
        concentrationLytObj = new loadConcentrationLyt(appManagerLytObj.domObj);
    } else if (itemId === "COURCES") {
        appManagerLytObj.module = itemId;
        courceLytObj = new loadCourceLyt(appManagerLytObj.domObj);
    } else if (itemId === "LOGOUT") {
        doLogout();
    }
}

/*Student Serach Starts*/
function loadStudentSearchLyt(cellObj) {
    this.lytConfObj = {
        "pattern": "1C",
        "parent": cellObj
    };
    this.lytObj = new appLayout(this.lytConfObj);
    this.detailsCellObj = this.lytObj.cells.a.obj;
    this.loadStudentSearchLyt = function () {
        var _this = this;
        clearAllElementsInDiv(_this.detailsCellObj);
        _this.showStudentSearchForm(_this.detailsCellObj);
    };

    this.attachStudentSearchForm = function (cellObj, confObj) {
        var studentSearchFormWrapObj = new attachForm(confObj);
        studentSearchFormWrapObj.cell.form.innerHTML = getStudentSearchForm();
    };

    this.showStudentSearchForm = function (cellObj) {
        var _this = this;
        var studentSearchFormConfObj = {
            "parent": cellObj,
            "hdrText": "Search Student",
            "formType": "search",
            "name": "studentSearch",
            "id": "studentSearch"
        };
        _this.attachStudentSearchForm(cellObj, studentSearchFormConfObj);
        var studentSearchFormObj = document.forms[studentSearchFormConfObj.name];
        $(studentSearchFormObj.elements["search"]).click(function () {
            _this.onStudentSearchFormBtnClick("search", studentSearchFormConfObj);
        });

        $(studentSearchFormObj.elements["reset"]).click(function () {
            _this.onStudentSearchFormBtnClick("reset", studentSearchFormConfObj);
        });
    };

    this.onStudentSearchFormBtnClick = function (id, confObj) {
        var _this = this;
        var formName = confObj.name;
        $('span#errorMessage').html("");
        if (id === "search") {
            var formObj = document.forms[formName];
            var studentId = formObj["studentId"].value || "";
            if (!studentId) {
                return;
            }
            _this.clearStudentFormCell(_this.detailsCellObj);
            var response = getStudent(studentId);
            if (response && response.success) {
                _this.showEditStudentSearchForm(_this.detailsCellObj, response);
            } else {
                _this.showEditStudentSearchForm(_this.detailsCellObj);
                console.log(response);
                $('span#errorMessage').html("Student with id \"" + studentId + "\" doesn't exists");
            }
        } else if (id === "reset") {
            $('span#errorMessage').html("");
        }
    };

    this.clearStudentFormCell = function (cellObj) {
        if (!cellObj) {
            return;
        }
        var cellParent = cellObj.parentElement;
        for (var childCount = 1; childCount < cellParent.childElementCount; childCount++) {
            $(cellParent.childNodes[childCount]).remove();
        }
    };

    this.attachStudentForm = function (cellObj, confObj) {
        var studentFormWrapObj = new attachForm(confObj);
        studentFormWrapObj.cell.form.innerHTML = getStudentForm();
    };

    this.showEditStudentSearchForm = function (cellObj, studentSearch) {
        var _this = this;
        var detailsObj = cellObj.parentElement.appendChild(cellObj.cloneNode())
        var studentSearchFormConfObj = {
            "parent": detailsObj,
            "hdrText": "Edit Student Search",
            "formType": "edit",
            "name": "editstudentSearch",
            "id": "editstudentSearch"
        };
        _this.attachStudentForm(detailsObj, studentSearchFormConfObj);
        // var studentSearch = getStudentSearch(studentSearch.id);
        _this.setStudentSearchFormDetails(studentSearchFormConfObj, studentSearch);
        var studentSearchFormObj = document.forms[studentSearchFormConfObj.name];
        $(studentSearchFormObj.elements["reset"]).hide();
        $(studentSearchFormObj.elements["save"]).click(function () {
            // _this.onStudentSearchFormBtnClick("save", studentSearchFormConfObj);
        });
        // $(studentSearchFormObj.elements["reset"]).click(function () {
        //     _this.onStudentSearchFormBtnClick("reset", studentSearchFormConfObj);
        // });
        $(studentSearchFormObj.elements["cancel"]).click(function () {
            // _this.onStudentSearchFormBtnClick("cancel", studentSearchFormConfObj);
        });
        // _this.onStudentSearchFormBtnClick("clearBtn", studentSearchFormConfObj);
    };

    this.setStudentSearchFormDetails = function (formConfObj, details) {
        var studentSearchFormObj = document.forms[formConfObj.name];
    };
    this.loadStudentSearchLyt();
}

function getStudentSearchForm() {
    var form = document.getElementById("studentSearchFormTpl").innerHTML;
    return form;
}
/*Student Search Ends*/

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
        if (appManagerLytObj.module === 'STUDENTSEARCH') {

        } else {
            _this.initStudentsGrid();
        }
        // _this.showStudentForm(_this.detailsCellObj);
    };

    this.initStudentsGrid = function () {
        var _this = this;
        var toolbarObj = _this.getStudentDetailsToolbar();
        var confObj = {
            me: _this
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
            data: [],
            "onDblClickRow": function (row, el, field) {
                _this.showViewStudentForm(_this.detailsCellObj, row);
            }
        });
        $(_this.detailsCellObj).find("button[name=addStudent]").click(function () {
            _this.showAddStudentForm(_this.detailsCellObj);
        });
        _this.loadStudentsGridData(studentsGrid);
    };

    this.operateEvent = function () {
        var _this = this;
        return {
            'click .studentEdit': function (e, value, row, index) {
                _this.showEditStudentForm(_this.detailsCellObj, row);
            }, 'click .studentRemove': function (e, value, row, index) {
                _this.deleteStudentFromGrid(row);
            }
        };
    };

    this.loadStudentsGridData = function (gridObj) {
        gridObj.bootstrapTable("showLoading");
        var gridData = getAllStudents() || [];
        gridObj.bootstrapTable("load", gridData);
        gridObj.bootstrapTable("hideLoading");
    };

    this.getStudentDetailsToolbar = function () {
        var toolbarObj = document.createElement("div");
        toolbarObj.role = "toolbar";
        var addStudentButtonObj = document.createElement("button");
        addStudentButtonObj.name = "addStudent";
        addStudentButtonObj.title = "Add Student";
        addStudentButtonObj.type = "button";
        addStudentButtonObj.className = "btn btn-default";
        addStudentButtonObj.style.padding = "3px 6px";
        addStudentButtonObj.innerHTML = '<i class="glyphicon glyphicon-plus-sign icon-plus-sign"></i>';
        toolbarObj.appendChild(addStudentButtonObj);
        return toolbarObj;
    };

    this.attachStudentsForm = function (cellObj, confObj) {
        var studentFormWrapObj = new attachForm(confObj);
        studentFormWrapObj.cell.form.innerHTML = getStudentForm();
    };

    this.showAddStudentForm = function (cellObj) {
        var _this = this;

        var studentFormConfObj = {
            "parent": cellObj,
            "hdrText": "Add Student",
            "formType": "add",
            "name": "addstudent",
            "id": "addstudent"
        };
        _this.attachStudentsForm(cellObj, studentFormConfObj);
        var studentFormObj = document.forms[studentFormConfObj.name];
        $(studentFormObj.elements["status"].parentElement.parentElement).hide();
        $(studentFormObj.elements["save"]).click(function () {
            _this.onStudentFormBtnClick("save", studentFormConfObj);
        });
        // $(studentFormObj.elements["reset"]).click(function () {
        //     _this.onStudentFormBtnClick("reset", studentFormConfObj);
        // });
        $(studentFormObj.elements["cancel"]).click(function () {
            _this.onStudentFormBtnClick("cancel", studentFormConfObj);
        });
        // _this.onStudentFormBtnClick("clearBtn", studentFormConfObj);
    };

    this.showEditStudentForm = function (cellObj, student) {
        var _this = this;

        var studentFormConfObj = {
            "parent": cellObj,
            "hdrText": "Edit Student",
            "formType": "edit",
            "name": "editstudent",
            "id": "editstudent"
        };
        _this.attachStudentsForm(cellObj, studentFormConfObj);
        var student = getStudent(student.id);
        _this.setStudentFormDetails(studentFormConfObj, student);
        var studentFormObj = document.forms[studentFormConfObj.name];
        $(studentFormObj.elements["reset"]).hide();
        $(studentFormObj.elements["save"]).click(function () {
            _this.onStudentFormBtnClick("save", studentFormConfObj);
        });
        // $(studentFormObj.elements["reset"]).click(function () {
        //     _this.onStudentFormBtnClick("reset", studentFormConfObj);
        // });
        $(studentFormObj.elements["cancel"]).click(function () {
            _this.onStudentFormBtnClick("cancel", studentFormConfObj);
        });
        // _this.onStudentFormBtnClick("clearBtn", studentFormConfObj);
    };

    this.showViewStudentForm = function (cellObj, student) {
        var _this = this;
        var studentFormConfObj = {
            "parent": cellObj,
            "hdrText": "View Student",
            "formType": "view",
            "name": "viewstudent",
            "id": "viewstudent"
        };
        _this.attachStudentsForm(cellObj, studentFormConfObj);
        var student = getStudent(student.id);
        _this.setStudentFormDetails(studentFormConfObj, student);
        var studentFormObj = document.forms[studentFormConfObj.name];
        $(studentFormObj.elements["save"]).hide();
        $(studentFormObj.elements["reset"]).hide();
        $(studentFormObj.elements["cancel"]).text("Close");
        $(studentFormObj.elements["cancel"]).click(function () {
            _this.onStudentFormBtnClick("cancel", studentFormConfObj);
        });
        // _this.onStudentFormBtnClick("clearBtn", studentFormConfObj);
    };

    this.setStudentFormDetails = function (formConfObj, details) {
        var studentFormObj = document.forms[formConfObj.name];
    };

    this.onStudentFormBtnClick = function (id, confObj) {

        var _this = this;
        var formName = confObj.name;
        if (id === "save") {
            var formObj = document.forms[formName];
            if (formObj["password"].value !== formObj["rePassword"].value) {
                return;
            }
            var student = {};
            if (confObj.formType === "add") {
                response = addStudent(student);
            } else {
                student["id"] = formObj["id"].value;
                response = editStudent(student);
            }
            if (response && response.success) {
                _this.initStudentsGrid();
            } else {
                console.log(response);
            }
        } else if (id === "reset") {
            clearFormDataByName(formName);
        } else if (id === "cancel") {
            _this.initStudentsGrid();
        }
    };

    this.deleteStudentFromGrid = function (student) {
        var _this = this;
        var response = deleteStudent(student.id);
        if (response.success) {
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

function getAllStudents() {
    return appAjaxSync(appRestPath + "/student", "GET", "", "JSON");
}

function getStudent(studentId) {
    return appAjaxSync(appRestPath + "/student/" + studentId, "GET", "", "JSON");
}

function addStudent(student) {
    return appAjaxSync(appRestPath + "/student", "PUT", JSON.stringify(student), "JSON");
}

function editStudent(student) {
    return appAjaxSync(appRestPath + "/student/" + student.id, "PUT", JSON.stringify(student), "JSON");
}

function deleteStudent(studentId) {
    return appAjaxSync(appRestPath + "/student/" + studentId, "DELETE", "", "JSON");
}

function getStudentForm() {
    var form = document.getElementById("studentFormTpl").innerHTML;
    return form;
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
        // _this.showAdvisorForm(_this.detailsCellObj);
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
            data: [],
            "onDblClickRow": function (row, el, field) {
                _this.showViewAdvisorForm(_this.detailsCellObj, row);
            }
        });
        $(_this.detailsCellObj).find("button[name=addAdvisor]").click(function () {
            _this.showAddAdvisorForm(_this.detailsCellObj);
        });
        _this.loadAdvisorsGridData(advisorsGrid);
    };

    this.operateEvent = function () {
        var _this = this;
        return {
            'click .advisorEdit': function (e, value, row, index) {
                _this.showEditAdvisorForm(_this.detailsCellObj, row);
            }, 'click .advisorRemove': function (e, value, row, index) {
                _this.deleteAdvisorFromGrid(row);
            }
        };
    };

    this.loadAdvisorsGridData = function (gridObj) {
        gridObj.bootstrapTable("showLoading");
        var gridData = getAllAdvisors() || [];
        gridObj.bootstrapTable("load", gridData);
        gridObj.bootstrapTable("hideLoading");
    };

    this.getAdvisorDetailsToolbar = function () {
        var toolbarObj = document.createElement("div");
        toolbarObj.role = "toolbar";
        var addAdvisorButtonObj = document.createElement("button");
        addAdvisorButtonObj.name = "addAdvisor";
        addAdvisorButtonObj.title = "Add Advisor";
        addAdvisorButtonObj.type = "button";
        addAdvisorButtonObj.className = "btn btn-default";
        addAdvisorButtonObj.style.padding = "3px 6px";
        addAdvisorButtonObj.innerHTML = '<i class="glyphicon glyphicon-plus-sign icon-plus-sign"></i>';
        toolbarObj.appendChild(addAdvisorButtonObj);
        return toolbarObj;
    };

    this.attachAdvisorsForm = function (cellObj, confObj) {
        var advisorFormWrapObj = new attachForm(confObj);
        advisorFormWrapObj.cell.form.innerHTML = getAdvisorForm();
    };

    this.showAddAdvisorForm = function (cellObj) {
        var _this = this;

        var advisorFormConfObj = {
            "parent": cellObj,
            "hdrText": "Add Advisor",
            "formType": "add",
            "name": "addadvisor",
            "id": "addadvisor"
        };
        _this.attachAdvisorsForm(cellObj, advisorFormConfObj);
        var advisorFormObj = document.forms[advisorFormConfObj.name];
        $(advisorFormObj.elements["status"].parentElement.parentElement).hide();
        $(advisorFormObj.elements["save"]).click(function () {
            _this.onAdvisorFormBtnClick("save", advisorFormConfObj);
        });
        // $(advisorFormObj.elements["reset"]).click(function () {
        //     _this.onAdvisorFormBtnClick("reset", advisorFormConfObj);
        // });
        $(advisorFormObj.elements["cancel"]).click(function () {
            _this.onAdvisorFormBtnClick("cancel", advisorFormConfObj);
        });
        // _this.onAdvisorFormBtnClick("clearBtn", advisorFormConfObj);
    };

    this.showEditAdvisorForm = function (cellObj, advisor) {
        var _this = this;

        var advisorFormConfObj = {
            "parent": cellObj,
            "hdrText": "Edit Advisor",
            "formType": "edit",
            "name": "editadvisor",
            "id": "editadvisor"
        };
        _this.attachAdvisorsForm(cellObj, advisorFormConfObj);
        var advisor = getAdvisor(advisor.id);
        _this.setAdvisorFormDetails(advisorFormConfObj, advisor);
        var advisorFormObj = document.forms[advisorFormConfObj.name];
        $(advisorFormObj.elements["reset"]).hide();
        $(advisorFormObj.elements["save"]).click(function () {
            _this.onAdvisorFormBtnClick("save", advisorFormConfObj);
        });
        // $(advisorFormObj.elements["reset"]).click(function () {
        //     _this.onAdvisorFormBtnClick("reset", advisorFormConfObj);
        // });
        $(advisorFormObj.elements["cancel"]).click(function () {
            _this.onAdvisorFormBtnClick("cancel", advisorFormConfObj);
        });
        // _this.onAdvisorFormBtnClick("clearBtn", advisorFormConfObj);
    };

    this.showViewAdvisorForm = function (cellObj, advisor) {
        var _this = this;

        var advisorFormConfObj = {
            "parent": cellObj,
            "hdrText": "View Advisor",
            "formType": "view",
            "name": "viewadvisor",
            "id": "viewadvisor"
        };
        _this.attachAdvisorsForm(cellObj, advisorFormConfObj);
        var advisor = getAdvisor(advisor.id);
        _this.setAdvisorFormDetails(advisorFormConfObj, advisor);
        var advisorFormObj = document.forms[advisorFormConfObj.name];
        $(advisorFormObj.elements["name"]).attr('readonly', 'true');
        $(advisorFormObj.elements["mail"]).attr('readonly', 'true');
        $(advisorFormObj.elements["phone"]).attr('readonly', 'true');
        $(advisorFormObj.elements["notes"]).attr('readonly', 'true');
        $(advisorFormObj.elements["status"]).attr('disabled', 'disabled');
        $(advisorFormObj.elements["password"].parentElement.parentElement).hide();
        $(advisorFormObj.elements["rePassword"].parentElement.parentElement).hide();
        $(advisorFormObj.elements["save"]).hide();
        $(advisorFormObj.elements["reset"]).hide();
        $(advisorFormObj.elements["cancel"]).text("Close");
        $(advisorFormObj.elements["cancel"]).click(function () {
            _this.onAdvisorFormBtnClick("cancel", advisorFormConfObj);
        });
        // _this.onAdvisorFormBtnClick("clearBtn", advisorFormConfObj);
    };

    this.setAdvisorFormDetails = function (formConfObj, details) {
        var advisorFormObj = document.forms[formConfObj.name];
        $(advisorFormObj.elements["id"]).val(details.id);
        $(advisorFormObj.elements["name"]).val(details.name);
        $(advisorFormObj.elements["mail"]).val(details.email);
        $(advisorFormObj.elements["loginId"]).val(details.loginId);
        $(advisorFormObj.elements["phone"]).val(details.phone);
        $(advisorFormObj.elements["notes"]).val(details.notes);
        $(advisorFormObj.elements["status"]).val(details.status);
        $(advisorFormObj.elements["password"]).val(details.appUser.password);
        $(advisorFormObj.elements["rePassword"]).val(details.appUser.password);
    };

    this.onAdvisorFormBtnClick = function (id, confObj) {

        var _this = this;
        var formName = confObj.name;
        if (id === "save") {
            var formObj = document.forms[formName];
            if (formObj["password"].value !== formObj["rePassword"].value) {
                return;
            }
            var advisor = {};
            advisor["name"] = formObj["name"].value;
            advisor["email"] = formObj["mail"].value;
            advisor["loginId"] = formObj["loginId"].value;
            advisor["phone"] = formObj["phone"].value;
            advisor["notes"] = formObj["notes"].value;
            advisor["status"] = formObj["status"].value;
            advisor["appUser"] = {
                "password": formObj["password"].value
            };
            var response;
            if (confObj.formType === "add") {
                response = addAdvisor(advisor);
            } else {
                advisor["id"] = formObj["id"].value;
                response = editAdvisor(advisor);
            }
            if (response && response.success) {
                _this.initAdvisorsGrid();
            } else {
                console.log(response);
            }
        } else if (id === "reset") {
            clearFormDataByName(formName);
        } else if (id === "cancel") {
            _this.initAdvisorsGrid();
        }
    };

    this.deleteAdvisorFromGrid = function (advisor) {
        var _this = this;
        var response = deleteAdvisor(advisor.id);
        if (response.success) {
            _this.initAdvisorsGrid();
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
            field: "loginId",
            align: "left"
        }, {
            title: "Name",
            field: "name",
            align: "left"
        }, {
            title: "Mail",
            field: "email",
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

function getAllAdvisors() {
    return appAjaxSync(appRestPath + "/advisor", "GET", "", "JSON");
}

function getAdvisor(advisorId) {
    return appAjaxSync(appRestPath + "/advisor/" + advisorId, "GET", "", "JSON");
}

function addAdvisor(advisor) {
    return appAjaxSync(appRestPath + "/advisor", "PUT", JSON.stringify(advisor), "JSON");
}

function editAdvisor(advisor) {
    return appAjaxSync(appRestPath + "/advisor/" + advisor.id, "PUT", JSON.stringify(advisor), "JSON");
}

function deleteAdvisor(advisorId) {
    return appAjaxSync(appRestPath + "/advisor/" + advisorId, "DELETE", "", "JSON");
}

function advisorsExistedInConcentrations(advisorId) {
    return appAjaxSync(appRestPath + "/advisor/advisorsExistedInConcentrations", "GET", "", "JSON");
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
        _this.initConcentrationsGrid();
        // _this.showConcentrationsForm(_this.detailsCellObj);
    };
    this.initConcentrationsGrid = function () {
        var _this = this;
        var toolbarObj = _this.getConcentrationDetailsToolbar();
        var confObj = {
            me: _this
        };
        var concentrationsGridConfObj = {
            "parent": _this.detailsCellObj,
            "options": getConcentrationDetailsGridObj(toolbarObj, confObj)
        };
        var concentrationsGridObj = new createBootstrapTable(concentrationsGridConfObj);
        var concentrationsGrid = $(concentrationsGridObj.baseObj);
        concentrationsGrid.bootstrapTable({
            "height": $(_this.detailsCellObj).height() - 5,
            "columns": concentrationsGridConfObj.options.columns,
            data: [],
            "onDblClickRow": function (row, el, field) {
                _this.showViewConcentrationForm(_this.detailsCellObj, row);
            }
        });
        $(_this.detailsCellObj).find("button[name=addConcentration]").click(function () {
            _this.showAddConcentrationForm(_this.detailsCellObj);
        });
        _this.loadConcentrationsGridData(concentrationsGrid);
    };

    this.operateEvent = function () {
        var _this = this;
        return {
            'click .concentrationEdit': function (e, value, row, index) {
                _this.showEditConcentrationForm(_this.detailsCellObj, row);
            }, 'click .concentrationRemove': function (e, value, row, index) {
                _this.deleteConcentrationFromGrid(row);
            }
        };
    };

    this.loadConcentrationsGridData = function (gridObj) {
        gridObj.bootstrapTable("showLoading");
        var gridData = getAllConcentrations() || [];
        gridObj.bootstrapTable("load", gridData);
        gridObj.bootstrapTable("hideLoading");
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

    this.attachConcentrationsForm = function (cellObj, confObj) {
        var concentrationFormWrapObj = new attachForm(confObj);
        concentrationFormWrapObj.cell.form.innerHTML = getConcentrationForm();
    };

    this.showAddConcentrationForm = function (cellObj) {
        var _this = this;

        var concentrationFormConfObj = {
            "parent": cellObj,
            "hdrText": "Add Concentration",
            "formType": "add",
            "name": "addconcentration",
            "id": "addconcentration"
        };
        _this.attachConcentrationsForm(cellObj, concentrationFormConfObj);
        var concentrationFormObj = document.forms[concentrationFormConfObj.name];
        $(concentrationFormObj.elements["status"].parentElement.parentElement).hide();
        var courceOptions = getCourcesAsOptions();
        $(concentrationFormObj.elements["allCources"]).append(courceOptions);
        var advisorOptions = getAdvisorsAsOptions();
        $(concentrationFormObj.elements["advisor"]).append(advisorOptions);
        $(concentrationFormObj.elements["save"]).click(function () {
            _this.onConcentrationFormBtnClick("save", concentrationFormConfObj);
        });
        // $(concentrationFormObj.elements["reset"]).click(function () {
        //     _this.onConcentrationFormBtnClick("reset", concentrationFormConfObj);
        // });
        $(concentrationFormObj.elements["cancel"]).click(function () {
            _this.onConcentrationFormBtnClick("cancel", concentrationFormConfObj);
        });
        $(concentrationFormObj.elements["courceMoveLeft"]).click(function () {
            _this.onConcentrationFormBtnClick("courceMoveLeft", concentrationFormConfObj);
        });
        $(concentrationFormObj.elements["courceMoveRight"]).click(function () {
            _this.onConcentrationFormBtnClick("courceMoveRight", concentrationFormConfObj);
        });
        // _this.onConcentrationFormBtnClick("clearBtn", concentrationFormConfObj);
    };

    this.showEditConcentrationForm = function (cellObj, concentration) {
        var _this = this;

        var concentrationFormConfObj = {
            "parent": cellObj,
            "hdrText": "Edit Concentration",
            "formType": "edit",
            "name": "editconcentration",
            "id": "editconcentration"
        };
        _this.attachConcentrationsForm(cellObj, concentrationFormConfObj);
        var concentration = getConcentration(concentration.id);
        _this.setConcentrationFormDetails(concentrationFormConfObj, concentration);
        var concentrationFormObj = document.forms[concentrationFormConfObj.name];
        $(concentrationFormObj.elements["reset"]).hide();
        $(concentrationFormObj.elements["save"]).click(function () {
            _this.onConcentrationFormBtnClick("save", concentrationFormConfObj);
        });
        // $(concentrationFormObj.elements["reset"]).click(function () {
        //     _this.onConcentrationFormBtnClick("reset", concentrationFormConfObj);
        // });
        $(concentrationFormObj.elements["cancel"]).click(function () {
            _this.onConcentrationFormBtnClick("cancel", concentrationFormConfObj);
        });
        $(concentrationFormObj.elements["courceMoveLeft"]).click(function () {
            _this.onConcentrationFormBtnClick("courceMoveLeft", concentrationFormConfObj);
        });
        $(concentrationFormObj.elements["courceMoveRight"]).click(function () {
            _this.onConcentrationFormBtnClick("courceMoveRight", concentrationFormConfObj);
        });
        // _this.onConcentrationFormBtnClick("clearBtn", concentrationFormConfObj);
    };

    this.showViewConcentrationForm = function (cellObj, concentration) {
        var _this = this;

        var concentrationFormConfObj = {
            "parent": cellObj,
            "hdrText": "View Concentration",
            "formType": "view",
            "name": "viewconcentration",
            "id": "viewconcentration"
        };
        _this.attachConcentrationsForm(cellObj, concentrationFormConfObj);
        var concentration = getConcentration(concentration.id);
        _this.setConcentrationFormDetails(concentrationFormConfObj, concentration);
        var concentrationFormObj = document.forms[concentrationFormConfObj.name];
        $(concentrationFormObj.elements["name"]).attr('readonly', 'true');
        $(concentrationFormObj.elements["advisor"]).attr('disabled', 'true');
        $(concentrationFormObj.elements["allCources"]).attr('readonly', 'true');
        $(concentrationFormObj.elements["courceMoveLeft"]).attr('disabled', 'true');
        $(concentrationFormObj.elements["courceMoveRight"]).attr('disabled', 'true');
        $(concentrationFormObj.elements["cources"]).attr('readonly', 'true');
        $(concentrationFormObj.elements["notes"]).attr('readonly', 'true');
        $(concentrationFormObj.elements["status"]).attr('disabled', 'disabled');
        $(concentrationFormObj.elements["save"]).hide();
        $(concentrationFormObj.elements["reset"]).hide();
        $(concentrationFormObj.elements["cancel"]).text("Close");
        $(concentrationFormObj.elements["cancel"]).click(function () {
            _this.onConcentrationFormBtnClick("cancel", concentrationFormConfObj);
        });
        // _this.onConcentrationFormBtnClick("clearBtn", concentrationFormConfObj);
    };

    this.setConcentrationFormDetails = function (formConfObj, details) {
        if (!details) {
            return;
        }
        var concentrationFormObj = document.forms[formConfObj.name];
        $(concentrationFormObj.elements["concentrationId"]).val(details.id);
        $(concentrationFormObj.elements["name"]).val(details.concentrationName);
        $(concentrationFormObj.elements["notes"]).val(details.notes);
        $(concentrationFormObj.elements["status"]).val(details.concentrationStatus);
        var allCources = [], cources = [], existedCourceIds = [];
        var courceOptions = getCourcesAsOptions();
        for (var i = 0; i < details.cources.length; i++) {
            existedCourceIds.push(details.cources[i].id);
        }
        for (var i = 0; i < courceOptions.length; i++) {
            if (existedCourceIds.indexOf(parseInt(courceOptions[i].val())) > -1) {
                cources.push(courceOptions[i]);
            } else {
                allCources.push(courceOptions[i]);
            }
        }
        $(concentrationFormObj.elements["allCources"]).append(allCources);
        $(concentrationFormObj.elements["cources"]).append(cources);
        var advisorOptions = getAdvisorsAsOptions();
        $(concentrationFormObj.elements["advisor"]).append(advisorOptions);
        if (details.advisor && details.advisor.id) {
            $(concentrationFormObj.elements["advisor"]).find('option[value="' + details.advisor.id + '"]').attr("selected", "selected");
        }
    };

    this.onConcentrationFormBtnClick = function (id, confObj) {

        var _this = this;
        var formName = confObj.name;
        if (id === "save") {
            var formObj = document.forms[formName];
            var concentration = {}, courceObj, selectedCources = [];
            concentration["concentrationName"] = formObj["name"].value;
            concentration["concentrationStatus"] = formObj["status"].value;
            concentration["notes"] = formObj["notes"].value;
            $(formObj.elements["cources"]).find("option").each(function (ind, el) {
                if ($(el).val()) {
                    courceObj = {};
                    courceObj["id"] = $(el).val();
                    selectedCources.push(courceObj);
                }
            });
            concentration["cources"] = selectedCources;
            concentration["advisor"] = {
                id: formObj["advisor"].value
            };
            var response;
            if (confObj.formType === "add") {
                response = addConcentration(concentration);
            } else {
                concentration["id"] = formObj["concentrationId"].value;
                response = editConcentration(concentration);
            }
            if (response && response.success) {
                _this.initConcentrationsGrid();
            } else {
                console.log(response);
            }

        } else if (id === "reset") {
            clearFormDataByName(formName);
        } else if (id === "cancel") {
            _this.initConcentrationsGrid();
        } else if (id === "courceMoveLeft") {
            var formObj = document.forms[formName];
            var selectedOpts = $(formObj.elements["allCources"]).find("option:selected");
            $(formObj.elements["cources"]).append(selectedOpts);
        } else if (id === "courceMoveRight") {
            var formObj = document.forms[formName];
            var selectedOpts = $(formObj.elements["cources"]).find("option:selected");
            $(formObj.elements["allCources"]).append(selectedOpts);
        }

    };

    this.deleteConcentrationFromGrid = function (concentration) {
        var _this = this;
        var response = deleteConcentration(concentration.id);
        if (response.success) {
            _this.initConcentrationsGrid();
        }
    };

    this.loadConcentrationsLyt();
}

function getConcentrationDetailsGridObj(toolbarObj, confObj) {
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
            title: "#",
            field: "srNo",
            align: "left"
        }, {
            title: "Name",
            field: "concentrationName",
            align: "left"
        }, {
            title: "Cources",
            field: "cources",
            align: "left",
            formatter: function (value, row, index) {
                var courceNames = [];
                if (value && value.length) {
                    for (var i = 0; i < value.length; i++) {
                        courceNames.push(value[i].courceName + " (" + value[i].courcePrefix + " ," + value[i].courceCode + ")");
                    }
                }
                return courceNames.join(', ');
            }
        }, {
            title: "Notes",
            field: "notes",
            align: "left"
        }, {
            title: "Status",
            field: "concentrationStatus",
            align: "left"
        }, {
            title: "Operate",
            field: "operate",
            align: 'center',
            events: confObj.me.operateEvent(),
            formatter: [
                '<button class="concentrationEdit" title="Edit">',
                '<i class="glyphicon glyphicon-pencil icon-pencil"></i>',
                '</button>  ',
                '<button class="concentrationRemove" title="Remove">',
                '<i class="glyphicon glyphicon-remove-sign icon-remove-sign"></i>',
                '</button>'
            ].join('')
        }]
    };
    return concentrationDetailsConfobj;
}

function getAllConcentrations() {
    return appAjaxSync(appRestPath + "/concentration", "GET", "", "JSON");
}

function getConcentration(concentrationId) {
    return appAjaxSync(appRestPath + "/concentration/" + concentrationId, "GET", "", "JSON");
}

function addConcentration(concentration) {
    return appAjaxSync(appRestPath + "/concentration", "PUT", JSON.stringify(concentration), "JSON");
}

function editConcentration(concentration) {
    return appAjaxSync(appRestPath + "/concentration/" + concentration.id, "PUT", JSON.stringify(concentration), "JSON");
}

function deleteConcentration(concentrationId) {
    return appAjaxSync(appRestPath + "/concentration/" + concentrationId, "DELETE", "", "JSON");
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
                _this.showViewCourceForm(_this.detailsCellObj, row);
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
                _this.showEditCourceForm(_this.detailsCellObj, row);
            }, 'click .courceRemove': function (e, value, row, index) {
                _this.deleteCourceFromGrid(row);
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

    this.showEditCourceForm = function (cellObj, cource) {
        var _this = this;

        var courceFormConfObj = {
            "parent": cellObj,
            "hdrText": "Edit Cource",
            "formType": "edit",
            "name": "editcource",
            "id": "editcource"
        };
        _this.attachCourcesForm(cellObj, courceFormConfObj);
        var cource = getCource(cource.id);
        _this.setCourceFormDetails(courceFormConfObj, cource);
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

    this.showViewCourceForm = function (cellObj, cource) {
        var _this = this;

        var courceFormConfObj = {
            "parent": cellObj,
            "hdrText": "View Cource",
            "formType": "view",
            "name": "viewcource",
            "id": "viewcource"
        };
        _this.attachCourcesForm(cellObj, courceFormConfObj);
        var cource = getCource(cource.id);
        _this.setCourceFormDetails(courceFormConfObj, cource);
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

    this.setCourceFormDetails = function (formConfObj, details) {
        var courceFormObj = document.forms[formConfObj.name];
        $(courceFormObj.elements["courceId"]).val(details.id);
        $(courceFormObj.elements["name"]).val(details.courceName);
        $(courceFormObj.elements["prefix"]).val(details.courcePrefix);
        $(courceFormObj.elements["code"]).val(details.courceCode);
        $(courceFormObj.elements["notes"]).val(details.notes);
        $(courceFormObj.elements["status"]).val(details.courceStatus);
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
            var response;
            if (confObj.formType === "add") {
                response = addCource(cource);
            } else {
                cource["id"] = formObj["courceId"].value;
                response = editCource(cource);
            }
            if (response.success) {
                _this.initCourcesGrid();
            } else {
                console.log(response);
            }

        } else if (id === "reset") {
            clearFormDataByName(formName);
        } else if (id === "cancel") {
            _this.initCourcesGrid();
        }

    };

    this.deleteCourceFromGrid = function (cource) {
        var _this = this;
        var response = deleteCource(cource.id);
        if (response.success) {
            _this.initCourcesGrid();
        }
    };
    this.loadCourcesLyt();
}

function getAllCources() {
    return appAjaxSync(appRestPath + "/cource", "GET", "", "JSON");
}

function getCource(courceId) {
    return appAjaxSync(appRestPath + "/cource/" + courceId, "GET", "", "JSON");
}

function addCource(cource) {
    return appAjaxSync(appRestPath + "/cource", "PUT", JSON.stringify(cource), "JSON");
}

function editCource(cource) {
    return appAjaxSync(appRestPath + "/cource/" + cource.id, "PUT", JSON.stringify(cource), "JSON");
}

function deleteCource(courceId) {
    return appAjaxSync(appRestPath + "/cource/" + courceId, "DELETE", "", "JSON");
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

function getCourcesAsOptions() {
    var options = [];
    var cources = getAllCources();
    for (var i = 0; i < cources.length; i++) {
        if (cources[i].courceStatus === 'ACTIVE') {
            options.push($('<option>').val(cources[i].id).text(cources[i].courceName + " (" + cources[i].courcePrefix + " ," + cources[i].courceCode + ")"));
        }
    }
    return options;
}

function getConcentrationAsOptions() {
    var options = [];
    var concentrations = getAllConcentrations();
    for (var i = 0; i < concentrations.length; i++) {
        if (concentrations[i].concentrationStatus === 'ACTIVE') {
            options.push($('<option>').val(concentrations[i].id).text(concentrations[i].concentrationName));
        }
    }
    return options;
}

function getAdvisorsAsOptions() {
    var options = [];
    var advisors = getAllAdvisors();
    for (var i = 0; i < advisors.length; i++) {
        if (advisors[i].status === 'ACTIVE') {
            options.push($('<option>').val(advisors[i].id).text(advisors[i].name));
        }
    }
    return options;
}

/*Director Home Ends*/

/*Advisor Home Starts*/
function onAdvisorMainNavItemClick(itemId) {
    if (itemId == appManagerLytObj.module) {
        return;
    }
    if (appManagerLytObj.module) {
        $("#appNavBar").find('li[itemId="' + appManagerLytObj.module + '"]').removeClass('active');
    } else {
        $("#appNavBar").find('.active').removeClass('active');
    }
    $("#appNavBar").find('li[itemId="' + itemId + '"]').addClass('active');
    if (itemId === "STUDENTS") {
        appManagerLytObj.module = itemId;
        studentLytObj = new loadStudentLyt(appManagerLytObj.domObj);
    } else if (itemId === "PROFILE") {
        appManagerLytObj.module = itemId;
        advisorProfileLytObj = new loadAdvisorProfileLyt(appManagerLytObj.domObj);
    } else if (itemId === "LOGOUT") {
        doLogout();
    }
}

function loadAdvisorProfileLyt(cellObj) {
    this.lytConfObj = {
        "pattern": "1C",
        "parent": cellObj
    };
    this.lytObj = new appLayout(this.lytConfObj);
    this.detailsCellObj = this.lytObj.cells.a.obj;
    this.loadAdvisorProfilesLyt = function () {
        var _this = this;
        clearAllElementsInDiv(_this.detailsCellObj);
        _this.showEditAdvisorProfileForm(_this.detailsCellObj);
    };

    this.attachAdvisorProfilesForm = function (cellObj, confObj) {
        var advisorProfileFormWrapObj = new attachForm(confObj);
        advisorProfileFormWrapObj.cell.form.innerHTML = getAdvisorProfileForm();
    };

    this.showEditAdvisorProfileForm = function (cellObj, advisorProfile) {
        var _this = this;

        var advisorProfileFormConfObj = {
            "parent": cellObj,
            "hdrText": "Profile",
            "formType": "edit",
            "name": "editadvisorProfile",
            "id": "editadvisorProfile"
        };
        _this.attachAdvisorProfilesForm(cellObj, advisorProfileFormConfObj);
//        var advisorProfile = getAdvisor(advisorProfile.id);
//        _this.setAdvisorProfileFormDetails(advisorProfileFormConfObj, advisorProfile);
        var advisorProfileFormObj = document.forms[advisorProfileFormConfObj.name];
        $(advisorProfileFormObj.elements["name"]).attr('readonly', 'true');
        $(advisorProfileFormObj.elements["mail"]).attr('readonly', 'true');
        $(advisorProfileFormObj.elements["status"]).attr('disabled', 'disabled');
        $(advisorProfileFormObj.elements["reset"]).hide();
        $(advisorProfileFormObj.elements["cancel"]).hide();
        $(advisorProfileFormObj.elements["save"]).click(function () {
            _this.onAdvisorProfileFormBtnClick("save", advisorProfileFormConfObj);
        });
        // $(advisorProfileFormObj.elements["reset"]).click(function () {
        //     _this.onAdvisorProfileFormBtnClick("reset", advisorProfileFormConfObj);
        // });
//        $(advisorProfileFormObj.elements["cancel"]).click(function () {
//            _this.onAdvisorProfileFormBtnClick("cancel", advisorProfileFormConfObj);
//        });
        // _this.onAdvisorProfileFormBtnClick("clearBtn", advisorProfileFormConfObj);
    };

    this.setAdvisorProfileFormDetails = function (formConfObj, details) {
        var advisorProfileFormObj = document.forms[formConfObj.name];
        $(advisorProfileFormObj.elements["id"]).val(details.id);
        $(advisorProfileFormObj.elements["name"]).val(details.name);
        $(advisorProfileFormObj.elements["mail"]).val(details.email);
        $(advisorProfileFormObj.elements["loginId"]).val(details.loginId);
        $(advisorProfileFormObj.elements["phone"]).val(details.phone);
        $(advisorProfileFormObj.elements["notes"]).val(details.notes);
        $(advisorProfileFormObj.elements["status"]).val(details.status);
        $(advisorProfileFormObj.elements["password"]).val(details.appUser.password);
        $(advisorProfileFormObj.elements["rePassword"]).val(details.appUser.password);
    };

    this.onAdvisorProfileFormBtnClick = function (id, confObj) {

        var _this = this;
        var formName = confObj.name;
        if (id === "save") {
            var formObj = document.forms[formName];
            if (formObj["password"].value !== formObj["rePassword"].value) {
                return;
            }
            var advisorProfile = {};
            advisorProfile["name"] = formObj["name"].value;
            advisorProfile["email"] = formObj["mail"].value;
            advisorProfile["loginId"] = formObj["loginId"].value;
            advisorProfile["phone"] = formObj["phone"].value;
            advisorProfile["notes"] = formObj["notes"].value;
            advisorProfile["status"] = formObj["status"].value;
            advisorProfile["appUser"] = {
                "password": formObj["password"].value
            };
            var response;
            if (confObj.formType === "add") {
                response = addAdvisorProfile(advisorProfile);
            } else {
                advisorProfile["id"] = formObj["id"].value;
                response = editAdvisorProfile(advisorProfile);
            }
            if (response && response.success) {
                _this.initAdvisorProfilesGrid();
            } else {
                console.log(response);
            }
        } else if (id === "reset") {
            clearFormDataByName(formName);
        } else if (id === "cancel") {
            _this.initAdvisorProfilesGrid();
        }
    };

    this.deleteAdvisorProfileFromGrid = function (advisorProfile) {
        var _this = this;
        var response = deleteAdvisorProfile(advisorProfile.id);
        if (response.success) {
            _this.initAdvisorProfilesGrid();
        }
    };

    this.loadAdvisorProfilesLyt();
}

function getAdvisorProfileForm() {
    var form = document.getElementById("advisorFormTpl").innerHTML;
    return form;
}
/*Advisor Home Ends*/


/*Student Home Starts*/
function onStudentMainNavItemClick(itemId) {
    if (itemId == appManagerLytObj.module) {
        return;
    }
    if (appManagerLytObj.module) {
        $("#appNavBar").find('li[itemId="' + appManagerLytObj.module + '"]').removeClass('active');
    } else {
        $("#appNavBar").find('.active').removeClass('active');
    }
    $("#appNavBar").find('li[itemId="' + itemId + '"]').addClass('active');
    if (itemId === "QUESTIONNAIRES") {
        appManagerLytObj.module = itemId;
        studentLytObj = new loadStudentQuestionnaireLyt(appManagerLytObj.domObj);
    } else if (itemId === "CODEOFCONDUCT") {
        appManagerLytObj.module = itemId;
        studentLytObj = new loadCodeOfCounductLyt(appManagerLytObj.domObj);
    } else if (itemId === "LOGOUT") {
        doLogout();
    }
}

function loadStudentQuestionnaireLyt(cellObj) {
    this.lytConfObj = {
        "pattern": "1C",
        "parent": cellObj
    };

    this.questionnaireSubItems = {
        'takenCource': ['takenCourceDesc'],
        'planToWork': ['planToWorkDesc'],
        'currentEmployee': ['currentEmployeePosition', 'residenceFromWarrensburgCampus']
    };
    this.lytObj = new appLayout(this.lytConfObj);
    this.detailsCellObj = this.lytObj.cells.a.obj;
    this.loadStudentQuestionnaireLyt = function () {
        var _this = this;
        clearAllElementsInDiv(_this.detailsCellObj);
        _this.showStudentQuestionnaireForm(_this.detailsCellObj);
    };

    this.attachStudentQuestionnaireForm = function (cellObj, confObj) {
        var studentQuestionnaireFormWrapObj = new attachForm(confObj);
        studentQuestionnaireFormWrapObj.cell.form.innerHTML = getStudentQuestionnaireForm();
    };

    this.showStudentQuestionnaireForm = function (cellObj) {
        var _this = this;
        var studentQuestionnaireFormConfObj = {
            "parent": cellObj,
            "hdrText": "Student Questionnaire",
            "formType": "questionnnaire",
            "name": "studentQuestionnaire",
            "id": "studentQuestionnaire"
        };
        _this.attachStudentQuestionnaireForm(cellObj, studentQuestionnaireFormConfObj);
        var studentQuestionnaireFormObj = document.forms[studentQuestionnaireFormConfObj.name];
        $(studentQuestionnaireFormObj.elements["submitQuestionnaire"]).click(function () {
            _this.onStudentQuestionnaireFormBtnClick("submit", studentQuestionnaireFormConfObj);
        });

        $(studentQuestionnaireFormObj.elements["reset"]).click(function () {
            _this.onStudentQuestionnaireFormBtnClick("reset", studentQuestionnaireFormConfObj);
        });
    };

    this.onStudentQuestionnaireFormBtnClick = function (id, confObj) {
        var _this = this;
        var formName = confObj.name;
        if (id === "submit") {
            var formObj = document.forms[formName];
            var studentId = formObj["studentId"].value || "";
            if (!studentId) {
                return;
            }
            var response = ""//getStudent(studentId);
            if (response && response.success) {
                _this.showEditStudentQuestionnaireForm(_this.detailsCellObj, response);
            } else {
                console.log(response);
            }
        } else if (id === "reset") {
            hideAllQuestionnaireSubItems();
        }
    };

    this.loadStudentQuestionnaireLyt();
}

function getStudentQuestionnaireForm() {
    var form = document.getElementById("studentQuestionnairesFormTpl").innerHTML;
    return form;
}

function hideAllQuestionnaireSubItems() {
    for (var itemId in questionnaireSubItems) {
        onStudentQuestionnaireFormChange(itemId, 'no');
    }
}

function onStudentQuestionnaireFormChange(itemId, value) {

    if (!questionnaireSubItems[itemId]) {
        return;
    }
    var studentQuestionnaireFormObj = document.forms['studentQuestionnaire'];
    if (!studentQuestionnaireFormObj) {
        return;
    }
    var itemObj = studentQuestionnaireFormObj[itemId];
    if (!itemObj) {
        return;
    }
    var itemValue = value || itemObj.value;
    var subItems = questionnaireSubItems[itemId];
    if (itemValue === 'yes') {
        for (var itemInd = 0; itemInd < subItems.length; itemInd++) {
            $(studentQuestionnaireFormObj.elements[subItems[itemInd]].parentElement.parentElement).show();
        }
    } else {
        for (var itemInd = 0; itemInd < subItems.length; itemInd++) {
            $(studentQuestionnaireFormObj.elements[subItems[itemInd]].parentElement.parentElement).hide();
        }
    }
}

/*Student Home Ends*/