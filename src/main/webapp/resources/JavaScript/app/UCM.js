var userRole, loginId, loginUser;

/*questionnaireInputDetails starts*/
var questionnaireSubItems = {
    'takenCource': ['takenCourceDesc'],
    'planToWork': ['planToWorkDesc'],
    'currentEmployee': ['currentEmployeeWork', 'currentEmployeePosition']
};

var questionnaireNotRequiredItems = ['takenCourceDesc', 'planToWorkDesc', 'currentEmployeeWork', 'currentEmployeePosition'];

var questionnaireInputDetails = {
    "takenCource": {
        "type": "radio"
    }, "takenCourceDesc": {
        "type": "text"
    }, "classesPerSemester": {
        "type": "text"
    }, "classesPlanSummer": {
        "type": "text"
    }, "planToWork": {
        "type": "radio"
    }, "planToWorkDesc": {
        "type": "text"
    }, "currentEmployee": {
        "type": "radio"
    }, "currentEmployeeWork": {
        "type": "text"
    }, "currentEmployeePosition": {
        "type": "text"
    }, "residenceFromWarrensburgCampus": {
        "type": "text"
    }, "workLocFromWarrensburgCampus": {
        "type": "text"
    }, "childrenWhomYouAreResp": {
        "type": "text"
    }, "areYouSigleParent": {
        "type": "radio"
    }, "difficultySchedulingMorning": {
        "type": "radio"
    }, "difficultySchedulingAfternoon": {
        "type": "radio"
    }, "difficultySchedulingNight": {
        "type": "radio"
    }, "difficultySchedulingWeekend": {
        "type": "radio"
    }, "motivationPursingMBA": {
        "type": "text"
    }, "positionSeedAfterMBA": {
        "type": "text"
    }, "awareMBAatUCM": {
        "type": "select"
    }, "attractedProgramAtUCM": {
        "type": "select"
    }
}
/*questionnaireInputDetails ends*/

/*Student Details Starts*/
var studentInputDetails = {
    "firstName": {
        "type": "text"
    }, "lastName": {
        "type": "text"
    }, "concentration": {
        "type": "select"
    }, "mail": {
        "type": "text"
    }, "personalMail": {
        "type": "text"
    }, "phone": {
        "type": "text"
    }, "address": {
        "type": "text"
    }, "scoreType": {
        "type": "select"
    }, "verbal": {
        "type": "text"
    }, "quantitative": {
        "type": "text"
    }, "analytical": {
        "type": "text"
    }, "gpa": {
        "type": "text"
    }, "status": {
        "type": "select"
    }, "studentPrerequisite": {
        "type": "select"
    }, "studentStatus": {
        "type": "select"
    }, "notes": {
        "type": "select"
    }
};

var studentSkipInputs = ["lastName", "verbal", "quantitative", "analytical", "gpa"];

var studentFinalInputs = ["firstName", "lastName", "phone", "scoreType", "address", "verbal", "quantitative", "analytical", "gpa", "notes"];

/*Student Details Ends*/

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
        _this.studentEditFormPosition = 0;
        clearAllElementsInDiv(_this.detailsCellObj);
        _this.showStudentSearchForm(_this.detailsCellObj);
    };

    this.attachStudentSearchForm = function (cellObj, confObj) {
        var studentSearchFormWrapObj = new attachForm(confObj);
        studentSearchFormWrapObj.cell.form.innerHTML = getStudentSearchForm();
    };

    this.showStudentSearchForm = function (cellObj) {
        var _this = this;
        _this.clearStudentFormCell(_this.detailsCellObj);
        var studentSearchFormConfObj = {
            "parent": cellObj,
            "hdrText": "Search Student",
            "formType": "search",
            "name": "studentSearch",
            "id": "studentSearch"
        };
        _this.attachStudentSearchForm(cellObj, studentSearchFormConfObj);
        var studentSearchFormObj = document.forms[studentSearchFormConfObj.name];
        studentSearchFormObj.elements['studentId'].focus();
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
        _this.clearStudentFormCell(_this.detailsCellObj);
        _this.studentEditFormPosition = 0;
        if (id === "search") {
            var formObj = document.forms[formName];
            var validateItems = {
                "studentId": {
                    "validations": {
                        "isNotEmpty": "Please enter Student #"
                    }
                }
            }
            if (!validateForm(formName, validateItems)) {
                return false;
            }

            if (userRole === "ADVISOR") {
                if (loginUser.concentration && !loginUser.concentration.id) {
                    $('span#errorMessage').html("Student not belongs to advisor concentration");
                    return;
                }
            }

            var studentId = formObj["studentId"].value || "";
            var response = getStudentByLoginId(studentId);
            if (response) {
                if (userRole === "ADVISOR") {
                    var advConcId = loginUser.concentration ? loginUser.concentration.id : "";
                    if (advConcId && response.concentration && response.concentration.id != advConcId) {
                        $('span#errorMessage').html("Student not belongs to advisor concentration");
                        return;
                    }
                }

                if (response.testDetails) {
                    _this.showEditStudentSearchForm(_this.detailsCellObj, response);
                } else {
                    $('span#errorMessage').html("Student with id \"" + studentId + "\" not yet completed Questionnaire");
                }
            } else {
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
        studentFormWrapObj.cell.form.innerHTML = getStudentAndQuestionarieForm();
    };

    this.showEditStudentSearchForm = function (cellObj, studentSearch) {
        var _this = this;
        var detailsObj = cellObj.parentElement.appendChild(cellObj.cloneNode())
        var studentFormConfObj = {
            "parent": detailsObj,
            "hdrText": "Edit Student Search",
            "formType": "edit",
            "name": "editstudentSearch",
            "id": "editstudentSearch"
        };
        _this.attachStudentForm(detailsObj, studentFormConfObj);
        // var studentSearch = getStudentSearch(studentSearch.id);
        // _this.setStudentSearchFormDetails(studentFormConfObj, studentSearch);

        var studentSearchFormObj = document.forms[studentFormConfObj.name];
        $(studentSearchFormObj.elements["notes"].parentElement.parentElement).hide();
        $(studentSearchFormObj.elements["save"]).click(function () {
            _this.onStudentSearchFormDetailsBtnClick("save", studentFormConfObj, studentSearch);
        });
        $(studentSearchFormObj.elements["next"]).click(function () {
            _this.onStudentSearchFormDetailsBtnClick("next", studentFormConfObj, studentSearch);
        });
        $(studentSearchFormObj.elements["previous"]).click(function () {
            _this.onStudentSearchFormDetailsBtnClick("previous", studentFormConfObj, studentSearch);
        });
        $(studentSearchFormObj.elements["cancel"]).click(function () {
            _this.onStudentSearchFormDetailsBtnClick("cancel", studentFormConfObj, studentSearch);
        });
        _this.onStudentSearchFormDetailsBtnClick("next", studentFormConfObj);
        setStudentFormDetails(studentFormConfObj, studentSearch);
        setStudentQuestionnaireFormDetails(studentFormConfObj, studentSearch);
        _this.disableStudentSearchForm(studentFormConfObj);
    };

    this.disableStudentSearchForm = function (formConfObj) {
        var formObj = document.forms[formConfObj.name];
        $("input[type=radio]").attr('disabled', true);
        $("input[type=checkbox]").attr('disabled', true);
        // $(formObj).find("input[type=radio]").attr('disabled', true);
        for (var itemKey in studentInputDetails) {
            if (studentInputDetails[itemKey].type === "text") {
                $(formObj.elements[itemKey]).attr('readonly', 'true');
            } else if (studentInputDetails[itemKey].type === "select") {
                $(formObj.elements[itemKey]).attr('disabled', 'true');
            }
        }
        for (var itemKey in questionnaireInputDetails) {
            if (questionnaireInputDetails[itemKey].type === "text") {
                $(formObj.elements[itemKey]).attr('readonly', 'true');
            } else if (questionnaireInputDetails[itemKey].type === "select") {
                $(formObj.elements[itemKey]).attr('disabled', 'true');
            }
        }
    };

    this.onStudentSearchFormDetailsBtnClick = function (id, formConfObj, studentDetails) {
        var _this = this;
        var formName = formConfObj.name;
        if (id === "save") {
            var formObj = document.forms[formName];
            var prerequisiteDetails = formObj.elements['studentSearchPrerequisite'].value || 'notmet';
            var notes = formObj.elements['searchNotes'].value || '';
            var student = {
                'id': studentDetails.id,
                'loginId': studentDetails.loginId,
                'preReq': prerequisiteDetails,
                'notes': notes
            }
            var response = updateStudentPrerequisite(student);
            if (response && response.success) {
                showMessage(response.message, "success");
                _this.loadStudentSearchLyt();
            } else {
                showMessage(response.message, "danger");
            }
        } else if (id === "cancel") {
            _this.clearStudentFormCell(_this.detailsCellObj);
        } else if (id === "next") {
            _this.studentEditFormPosition = _this.studentEditFormPosition + 1;
            _this.showHideStudentDetails(formConfObj);
        } else if (id === "previous") {
            _this.studentEditFormPosition = _this.studentEditFormPosition - 1;
            _this.showHideStudentDetails(formConfObj);
        }
    };

    this.showHideStudentDetails = function (formConfObj) {
        var _this = this;
        if (_this.studentEditFormPosition == 1) {
            this.showHideStudentForm(formConfObj, true);
        } else if (_this.studentEditFormPosition == 2) {
            this.showHideStudentQuestionnaireForm(formConfObj, true);
        } else if (_this.studentEditFormPosition == 3) {
            this.showHideStudentPrerequisiteForm(formConfObj, true);
        }
    };

    this.showHideStudentForm = function (formConfObj, show) {
        var _this = this;
        var formObj = document.forms[formConfObj.name];
        if (!formObj) {
            return;
        }
        if (show) {
            this.showHideStudentQuestionnaireForm(formConfObj, false);
            this.showHideStudentPrerequisiteForm(formConfObj, false);
        }
        $(formObj.elements["previous"]).hide();
        $(formObj.elements["save"]).hide();
        $(formObj.elements["cancel"]).show();
        $(formObj.elements["next"]).show();

        if (show) {
            $("#studentFormItems").show();
        } else {
            $("#studentFormItems").hide();
        }

        /*        for (var itemKey in studentInputDetails) {
         if (studentSkipInputs.indexOf(itemKey) <= -1) {
         if (show) {
         $(formObj.elements[studentInputDetails[itemKey]].parentElement.parentElement).show();
         } else {
         $(formObj.elements[studentInputDetails[itemKey]].parentElement.parentElement).hide();
         }
         }
         }*/
    };

    this.showHideStudentQuestionnaireForm = function (formConfObj, show) {
        var _this = this;
        var formObj = document.forms[formConfObj.name];
        if (!formObj) {
            return;
        }

        if (show) {
            this.showHideStudentForm(formConfObj, false);
            this.showHideStudentPrerequisiteForm(formConfObj, false);
        }

        $(formObj.elements["previous"]).show();
        $(formObj.elements["save"]).hide();
        $(formObj.elements["cancel"]).show();
        $(formObj.elements["next"]).show();
        if (show) {
            $("#studentQuestionnairesFormItems").show();
        } else {
            $("#studentQuestionnairesFormItems").hide();
        }
        /*for (var itemKey in questionnaireSubItems) {
         if (studentSkipInputs.indexOf(itemKey) <= -1) {
         if (show) {
         $(formObj.elements[questionnaireSubItems[itemKey]].parentElement.parentElement).show();
         } else {
         $(formObj.elements[questionnaireSubItems[itemKey]].parentElement.parentElement).hide();
         }
         }
         }*/
    };

    this.showHideStudentPrerequisiteForm = function (formConfObj, show) {
        var _this = this;
        var formObj = document.forms[formConfObj.name];
        if (!formObj) {
            return;
        }
        if (show) {
            this.showHideStudentForm(formConfObj, false);
            this.showHideStudentQuestionnaireForm(formConfObj, false);
        }

        $(formObj.elements["previous"]).show();
        $(formObj.elements["save"]).show();
        $(formObj.elements["cancel"]).show();
        $(formObj.elements["next"]).hide();
        if (show) {
            $("#studentPrerequisiteFormItems").show();
        } else {
            $("#studentPrerequisiteFormItems").hide();
        }
        // $(formObj.elements['studentSearchPrerequisite'].parentElement.parentElement).show();
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
        studentFormObj.elements['firstName'].focus();
        var concentrationOptions = getConcentrationAsOptions();
        $(studentFormObj.elements["concentration"]).append(concentrationOptions);
        $(studentFormObj.elements["status"].parentElement.parentElement).hide();
        $(studentFormObj.elements["notes"].parentElement.parentElement).hide();
        $(studentFormObj.elements["studentStatus"].parentElement.parentElement).hide();
        $(studentFormObj.elements["studentPrerequisite"].parentElement.parentElement).hide();
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
        setStudentFormDetails(studentFormConfObj, student);
        var studentFormObj = document.forms[studentFormConfObj.name];
        studentFormObj.elements['firstName'].focus();
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
        _this.disableStudentEditForm(studentFormConfObj);
    };

    this.disableStudentEditForm = function (formConfObj) {
        var formObj = document.forms[formConfObj.name];
        for (var itemKey in studentInputDetails) {
            if (studentFinalInputs.indexOf(itemKey) > -1) {
                if (studentInputDetails[itemKey].type === "text") {
                    $(formObj.elements[itemKey]).attr('readonly', 'true');
                } else if (studentInputDetails[itemKey].type === "select") {
                    $(formObj.elements[itemKey]).attr('disabled', 'true');
                }
            }
        }
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
        setStudentFormDetails(studentFormConfObj, student);
        var studentFormObj = document.forms[studentFormConfObj.name];
        $(studentFormObj.elements["save"]).hide();
        $(studentFormObj.elements["reset"]).hide();
        $(studentFormObj.elements["cancel"]).text("Close");
        $(studentFormObj.elements["cancel"]).click(function () {
            _this.onStudentFormBtnClick("cancel", studentFormConfObj);
        });
        _this.disableStudentViewForm(studentFormConfObj);
    };

    this.disableStudentViewForm = function (formConfObj) {
        var formObj = document.forms[formConfObj.name];
        for (var itemKey in studentInputDetails) {
            if (studentInputDetails[itemKey].type === "text") {
                $(formObj.elements[itemKey]).attr('readonly', 'true');
            } else if (studentInputDetails[itemKey].type === "select") {
                $(formObj.elements[itemKey]).attr('disabled', 'true');
            }
        }
        $(formObj.elements['studentPrerequisite']).attr('disabled', 'true');
    };

    this.setStudentFormDetails = function (formConfObj, details) {
        var studentFormObj = document.forms[formConfObj.name];
    };

    this.onStudentFormBtnClick = function (id, confObj) {

        var _this = this;
        var formName = confObj.name;
        if (id === "save") {
            var formObj = document.forms[formName];

            var validateItems = {
                "firstName": {
                    "validations": {
                        "isNotEmpty": "Please enter Student First Name",
                        "isMaxLengthReached": "Please enter Student First Name below 64 characters"
                    }, "maxLength": 128
                },
                "lastName": {
                    "validations": {
                        "isNotEmpty": "Please enter Student Last Name",
                        "isMaxLengthReached": "Please enter Student Last Name below 64 characters"
                    }, "maxLength": 128
                }, "concentration": {"validations": {"isSelectValid": "Please select Concentration"}},
                "mail": {
                    "validations": {
                        "isNotEmpty": "Please enter Student email",
                        "isEmailAddress": "Please enter valid email address",
                        "isMaxLengthReached": "Please enter Student email below 128 characters",
                    }, "maxLength": 128
                },
                "personalMail": {
                    "validations": {
                        "isNotEmpty": "Please enter Student personal email",
                        "isEmailAddress": "Please enter valid personal email address",
                        "isMaxLengthReached": "Please enter Student personal email below 128 characters",
                    }, "maxLength": 128
                },
                "phone": {
                    "validations": {
                        "isNotEmpty": "Please enter Student phone #",
                        "isValidPhoneNumber": "Please enter valid Student phone #"
                    }
                },
                "address": {
                    "validations": {
                        "isNotEmpty": "Please enter Student Address",
                        "isMaxLengthReached": "Please enter Student address below 1000 characters",
                    }, "maxLength": 1000
                }
            };
            if (!validateForm(formName, validateItems)) {
                return false;
            }
            var student = {};
            var scores = {};
            student["loginId"] = formObj["loginId"].value;
            student["firstName"] = formObj["firstName"].value;
            student["lastName"] = formObj["lastName"].value;
            student["email"] = formObj["mail"].value
            student["secondaryEmail"] = formObj["personalMail"].value;
            student["phoneNumber"] = formObj["phone"].value;
            student["address"] = formObj["address"].value;
            scores["verbal"] = formObj["verbal"].value;
            scores["quantitative"] = formObj["quantitative"].value;
            scores["analytical"] = formObj["analytical"].value;
            scores["gpa"] = formObj["gpa"].value;
            scores["notes"] = formObj["notes"].value;
            student["concentration"] = {
                id: formObj["concentration"].value,
                concentrationName: $(formObj["concentration"]).find(":selected").text()
            };
            scores["scoreType"] = formObj["scoreType"].value;
            student["scores"] = JSON.stringify(scores);
            var response;
            if (confObj.formType === "add") {
                response = addStudent(student);
            } else {
                student["id"] = formObj["id"].value;
                student["notes"] = formObj["notes"].value;
                student["studentStatus"] = formObj["studentStatus"].value;
                student["preReq"] = formObj["studentPrerequisite"].value;
                response = editStudent(student);
            }
            if (response && response.success) {
                showMessage(response.message, "success");
                _this.initStudentsGrid();
            } else {
                showMessage(response.message, "danger");
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
            showMessage(response.message, "success");
            _this.initStudentsGrid();
        } else {
            showMessage(response.message, "delete");
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
            field: "id",
            align: "left",
            formatter: function (value, row, index) {
                return (index + 1);
            }
        }, {
            title: "700#",
            field: "loginId",
            align: "left"
        }, {
            title: "Name",
            field: "firstName",
            align: "left"

        }, {
            title: "Mail",
            field: "email",
            align: "left"
        }, {
            title: "Phone #",
            field: "phoneNumber",
            align: "left"
        }, {
            title: "Notes",
            field: "notes",
            align: "left"
        }, {
            title: "Concentration",
            field: "concentration.concentrationName",
            align: "left"

        }, {
            title: "Entry Date",
            field: "createdDate",
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

function getStudentByLoginId(loginId) {
    return appAjaxSync(appRestPath + "/student/loginId/" + loginId, "GET", "", "JSON");
}

function updateStudentQuestionnaire(student) {
    return appAjaxSync(appRestPath + "/student/updateQuestionnaire", "PUT", JSON.stringify(student), "JSON");
}

function updateStudentPrerequisite(student) {
    return appAjaxSync(appRestPath + "/student/updatePrerequisite", "PUT", JSON.stringify(student), "JSON");
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
    var formBtns = document.getElementById("studentFormTplBtns").innerHTML;
    return form + formBtns;
}

function getStudentAndQuestionarieForm() {
    var form = '<div id="studentFormItems">' + document.getElementById("studentFormTpl").innerHTML + '</div>';
    var questionForm = '<div id="studentQuestionnairesFormItems">' + document.getElementById("studentQuestionnairesFormTpl").innerHTML + '</div>';
    var prerequisiteForm = '<div id="studentPrerequisiteFormItems">' + document.getElementById("studentPrerequisiteFormTpl").innerHTML + '</div>';
    var buttonsForm = document.getElementById("studentSearchFormTplButtons").innerHTML;
    return form + questionForm + prerequisiteForm + buttonsForm;
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
        advisorFormObj.elements['name'].focus();
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
        advisorFormObj.elements['name'].focus();
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
            var validateItems = {
                "name": {
                    "validations": {
                        "isNotEmpty": "Please enter Advisor Name",
                        "isMaxLengthReached": "Please enter Advisor Name below 128 characters"
                    }, "maxLength": 128
                },
                "mail": {
                    "validations": {
                        "isNotEmpty": "Please enter Advisor mail",
                        "isEmailAddress": "Please enter valid email address",
                        "isMaxLengthReached": "Please enter Advisor mail below 128 characters",
                    }, "maxLength": 128
                },
                "phone": {
                    "validations": {
                        "isNotEmpty": "Please enter Advisor phone #",
                        "isValidPhoneNumber": "Please enter valid Advisor phone #"
                    }
                },
                "notes": {
                    "validations": {"isMaxLengthReached": "Please enter notes below 400 characters"},
                    "maxLength": 400
                }
            };
            if (!validateForm(formName, validateItems)) {
                return false;
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
                showMessage(response.message, "success");
                _this.initAdvisorsGrid();
            } else {
                showMessage(response.message, "danger");
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
            showMessage(response.message, "success");
        } else {
            showMessage(response.message, "danger");
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
            align: "left",
            formatter: function (value, row, index) {
                return (index + 1);
            }
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
            align: "left",
            formatter: function (value, row, index) {
                if (value && value.concentrationName) {
                    return value.concentrationName;
                }
                return '';
            }
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

function getAdvisorByLoginId(loginId) {
    return appAjaxSync(appRestPath + "/advisor/loginId/" + loginId, "GET", "", "JSON");
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
        concentrationFormObj.elements['name'].focus();
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
        concentrationFormObj.elements['name'].focus();
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
            var validateItems = {
                "name": {
                    "validations": {
                        "isNotEmpty": "Please enter Concentration Name",
                        "isMaxLengthReached": "Please enter Concentration Name below 128 characters"
                    }, "maxLength": 128
                },
                "advisor": {"validations": {"isSelectValid": "Please select Advisor"}},
                "cources": {"validations": {"isSelectValid": "Please select atleast one cource"}},
                "notes": {
                    "validations": {"isMaxLengthReached": "Please enter notes below 400 characters"},
                    "maxLength": 400
                }
            };
            if (!validateForm(formName, validateItems)) {
                return false;
            }

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
                showMessage(response.message, "success");
                _this.initConcentrationsGrid();
            } else {
                showMessage(response.message, "danger");
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
            showMessage(response.message, "success");
        } else {
            showMessage(response.message, "danger");
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
            align: "left",
            formatter: function (value, row, index) {
                return (index + 1);
            }
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
                        courceNames.push(value[i].courceName + " (" + value[i].courcePrefix + ", " + value[i].courceCode + ")");
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
        courceFormObj.elements['name'].focus();
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
        courceFormObj.elements['name'].focus();
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

            var validateItems = {
                "name": {
                    "validations": {
                        "isNotEmpty": "Please enter Cource Name",
                        "isMaxLengthReached": "Please enter Cource Name below 64 characters"
                    }, "maxLength": 64
                },
                "prefix": {
                    "validations": {
                        "isNotEmpty": "Please enter Cource Prefix",
                        "isMaxLengthReached": "Please enter Cource Prefix below 16 characters"
                    }, "maxLength": 16
                },
                "code": {
                    "validations": {
                        "isNotEmpty": "Please enter Cource Code",
                        "isMaxLengthReached": "Please enter Cource Code below 16 characters"
                    }, "maxLength": 16
                },
                "notes": {
                    "validations": {"isMaxLengthReached": "Please enter notes below 400 characters"},
                    "maxLength": 400
                }
            };
            if (!validateForm(formName, validateItems)) {
                return false;
            }
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
                showMessage(response.message, "success");
                _this.initCourcesGrid();
            } else {
                showMessage(response.message, "danger");
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
            showMessage(response.message, "success");
            _this.initCourcesGrid();
        } else {
            showMessage(response.message, "danger");
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
            align: "left",
            formatter: function (value, row, index) {
                return (index + 1);
            }
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
    if (itemId === "STUDENTSEARCH") {
        appManagerLytObj.module = itemId;
        studentSearchLytObj = new loadStudentSearchLyt(appManagerLytObj.domObj);
    } else if (itemId === "STUDENTS") {
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
        _this.showEditAdvisorProfileForm(_this.detailsCellObj, loginUser);
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
        var advisorProfile = getAdvisor(advisorProfile.id);
        _this.setAdvisorProfileFormDetails(advisorProfileFormConfObj, advisorProfile);
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
            var validateItems = {
                "phone": {
                    "validations": {
                        "isNotEmpty": "Please enter Advisor phone #",
                        "isValidPhoneNumber": "Please enter valid Advisor phone #"
                    }
                },
                "notes": {
                    "validations": {"isMaxLengthReached": "Please enter notes below 400 characters"},
                    "maxLength": 400
                }
            };
            if (!validateForm(formName, validateItems)) {
                return false;
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

            } else {
                advisorProfile["id"] = formObj["id"].value;
                response = editAdvisor(advisorProfile);
            }
            if (response && response.success) {
                showMessage(response.message, "success");
            } else {
                showMessage(response.message, "success");
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
        if (loginUser.testDetails) {
            studentQuestionnaireLytObj = new loadQuestionnaireCompletedLyt(appManagerLytObj.domObj);
        } else {
            studentQuestionnaireLytObj = new loadStudentQuestionnaireLyt(appManagerLytObj.domObj);
        }
    } else if (itemId === "LOGOUT") {
        doLogout();
    }
}

function loadQuestionnaireCompletedLyt(cellObj) {
    this.lytConfObj = {
        "pattern": "1C",
        "parent": cellObj
    };

    this.lytObj = new appLayout(this.lytConfObj);
    this.detailsCellObj = this.lytObj.cells.a.obj;
    this.loadQuestionnaireCompletedLyt = function () {
        var _this = this;
        clearAllElementsInDiv(_this.detailsCellObj);
        _this.showStudentQuestionnaireForm(_this.detailsCellObj);
    };

    this.showStudentQuestionnaireForm = function (cellObj) {
        var _this = this;
        cellObj.innerHTML = "<b style='color: #7bbf69;'>Already completed Questionnaire. Please wait for approval</b>";
        cellObj.style['text-align'] = 'center';
    };
    this.loadQuestionnaireCompletedLyt();
}

function loadStudentQuestionnaireLyt(cellObj) {
    this.lytConfObj = {
        "pattern": "1C",
        "parent": cellObj
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
            var validateItems = getStudentQuestionnaireFormValidationObj();
            if (!validateForm(formName, validateItems)) {
                return false;
            }
            var studentId = loginUser ? loginUser.id : "";
            if (!studentId) {
                return;
            }
            var questionnaireDetails = getStudentQuestionnaireFormDetails(formName);
            var student = {
                'id': studentId,
                'loginId': loginUser.loginId,
                'acceptedCodeOfConduct': !formObj['codeOfConduct'].checked ? "no" : "yes",
                'testDetails': JSON.stringify(questionnaireDetails)
            }
            var response = updateStudentQuestionnaire(student);
            if (response && response.success) {
                showMessage(response.message, "success");
                _this.attachStudentQuestionnaireCompletedCell();
            } else {
                showMessage(response.message, "danger");
            }
        } else if (id === "reset") {
            hideAllQuestionnaireSubItems();
        }
    };

    this.attachStudentQuestionnaireCompletedCell = function () {
        var _this = this;
        clearAllElementsInDiv(_this.detailsCellObj);
        cellObj.innerHTML = "<b style='color: #7bbf69;'>Completed Questionnaire. Please wait for approval</b>";
        cellObj.style['text-align'] = 'center';
    };

    this.loadStudentQuestionnaireLyt();
}

function getStudentQuestionnaireFormDetails(formName) {
    var formObj = document.forms[formName],
        itemObj, questionnaireDetailsObj = {};

    for (var itemKey in questionnaireInputDetails) {
        itemObj = formObj[itemKey];
        if (!itemObj) {
            return true;
        }
        questionnaireDetailsObj[itemKey] = itemObj.value;
    }
    return questionnaireDetailsObj;
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

function setStudentFormDetails(formConfObj, details) {
    var studentFormObj = document.forms[formConfObj.name];
    var score = details.scores ? JSON.parse(details.scores) : {};
    var concentrationOptions = getConcentrationAsOptions();
    $(studentFormObj.elements["concentration"]).append(concentrationOptions);
    $(studentFormObj.elements["id"]).val(details.id);
    $(studentFormObj.elements["loginId"]).val(details.loginId);
    $(studentFormObj.elements["firstName"]).val(details.firstName);
    $(studentFormObj.elements["lastName"]).val(details.lastName);
    $(studentFormObj.elements["concentration"]).val(details.concentration.id);
    $(studentFormObj.elements["mail"]).val(details.email);
    $(studentFormObj.elements["personalMail"]).val(details.secondaryEmail);
    $(studentFormObj.elements["phone"]).val(details.phoneNumber);
    $(studentFormObj.elements["address"]).val(details.address);
    $(studentFormObj.elements["status"]).val(details.status);
    $(studentFormObj.elements["scoreType"]).val(score.scoreType);
    $(studentFormObj.elements["verbal"]).val(score.verbal);
    $(studentFormObj.elements["quantitative"]).val(score.quantitative);
    $(studentFormObj.elements["analytical"]).val(score.analytical);
    $(studentFormObj.elements["gpa"]).val(score.gpa);
    $(studentFormObj.elements["gpa"]).val(score.gpa);
    $(studentFormObj.elements["studentStatus"]).val(details.studentStatus || "select");
    $(studentFormObj.elements["studentSearchPrerequisite"]).val(details.preReq || "notmet");
    $(studentFormObj.elements["searchNotes"]).val(details.notes || "");
    $(studentFormObj.elements["studentPrerequisite"]).val(details.preReq || "notmet");
    $(studentFormObj.elements["notes"]).val(details.notes || "");
}

function setStudentQuestionnaireFormDetails(formConfObj, details) {
    var studentFormObj = document.forms[formConfObj.name];
    var testDetails = details.testDetails ? JSON.parse(details.testDetails) : {};
    for (var itemKey in questionnaireInputDetails) {
        if (questionnaireInputDetails[itemKey].type === 'radio') {
            $(studentFormObj).find('input[name=' + itemKey + '][value=' + testDetails[itemKey] + ']').prop('checked', true);
            if (questionnaireSubItems[itemKey]) {
                var subItems = questionnaireSubItems[itemKey];
                if (testDetails[itemKey] === 'yes') {
                    for (var itemInd = 0; itemInd < subItems.length; itemInd++) {
                        $(studentFormObj.elements[subItems[itemInd]].parentElement.parentElement).show();
                    }
                } else {
                    for (var itemInd = 0; itemInd < subItems.length; itemInd++) {
                        $(studentFormObj.elements[subItems[itemInd]].parentElement.parentElement).hide();
                    }
                }
            }
        } else {
            $(studentFormObj.elements[itemKey]).val(testDetails[itemKey]);
        }
    }

    $(studentFormObj).find('input[name=codeOfConduct]').attr('checked', details.acceptedCodeOfConduct === 'yes' ? true : false);
}

function getStudentQuestionnaireFormValidationObj() {
    var validationConfObj = {};
    for (var itemKey in questionnaireInputDetails) {
        if (questionnaireNotRequiredItems.indexOf(itemKey) <= -1) {
            validationConfObj[itemKey] = {
                "validations": {
                    "isNotEmpty": "This field must not be empty"
                }
            }
        }

    }
    return validationConfObj;
}