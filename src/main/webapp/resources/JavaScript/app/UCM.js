var userRole, loginId, loginUser;

/*questionnaireInputDetails starts*/
var questionnaireSubItems = {
    'takenCourse': ['takenCourseDesc'],
    'planToWork': ['planToWorkDesc'],
    'currentEmployee': ['currentEmployeeWork', 'currentEmployeePosition']
};

var questionnaireNotRequiredItems = ['takenCourseDesc', 'planToWorkDesc', 'currentEmployeeWork', 'currentEmployeePosition'];

var questionnaireInputDetails = {
    "takenCourse": {
        "type": "radio"
    }, "takenCourseDesc": {
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
    }, "programEntryTerm": {
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
    } else if (itemId === "COURSES") {
        appManagerLytObj.module = itemId;
        courseLytObj = new loadCourseLyt(appManagerLytObj.domObj);
    } else if (itemId === "PROFILE") {
        appManagerLytObj.module = itemId;
        advisorProfileLytObj = new loadDirectorProfileLyt(appManagerLytObj.domObj);
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
                    _this.showEditStudentSearchForm(_this.detailsCellObj, response);
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
        $('span#errorMessage').html("");
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
        if (!studentSearch.testDetails) {
            $(studentSearchFormObj.elements["save"]).hide();
            $(studentSearchFormObj.elements["next"]).hide();
            $(studentSearchFormObj.elements["previous"]).hide();
        }
        
        if(!studentSearch.preReq) {
            $(studentSearchFormObj.elements["previousNotes"]).hide();
        }
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
            if(!notes) {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    title: 'Warning',
                    message: "Please enter notes",
                    draggable: true,
                    nl2br: false
                });
                return false;
            }
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
        if (userRole === "ADVISOR") {
            $(_this.detailsCellObj).find("button[name=addStudent]").hide();
        }
        $(_this.detailsCellObj).find("button[name=addStudent]").click(function () {
            _this.showAddStudentForm(_this.detailsCellObj);
        });
        $(_this.detailsCellObj).find("button[name=allStudents]").click(function () {
//            $(_this.detailsCellObj).find("button[name=allStudents]").hide();
//            $(_this.detailsCellObj).find("button[name=codeOfConduct]").show();
            _this.loadStudentsGridData(studentsGrid);
        });
        $(_this.detailsCellObj).find("button[name=studentsByNotes]").click(function () {
            _this.loadStudentsNotesGridData(studentsGrid);
        });
        $(_this.detailsCellObj).find("button[name=codeOfConduct]").click(function () {
//            $(_this.detailsCellObj).find("button[name=codeOfConduct]").hide();
//            $(_this.detailsCellObj).find("button[name=allStudents]").show();
            _this.loadCodeOfConductNotCompletedStudents(studentsGrid);
        });
        $(_this.detailsCellObj).find("button[name=studentsByNotes]").hide();
//        $(_this.detailsCellObj).find("button[name=allStudents]").hide();
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
        var students = userRole === "ADVISOR" ? getStudentByConcentration(concentrationId) : getAllStudents();
        var gridData = students || [];
        gridObj.bootstrapTable("load", gridData);
        gridObj.bootstrapTable("hideLoading");
    };

    this.loadCodeOfConductNotCompletedStudents = function (gridObj) {
        gridObj.bootstrapTable("showLoading");
        var students = userRole === "ADVISOR" ? codeOfConductCompletedStudentsByConcentration(concentrationId) : codeOfConductNotCompletedStudents();
        var gridData = students || [];
        gridObj.bootstrapTable("load", gridData);
        gridObj.bootstrapTable("hideLoading");
    };

    this.loadStudentsNotesGridData = function (gridObj) {
        gridObj.bootstrapTable("showLoading");
        var students = userRole === "ADVISOR" ? getAllStudentNotesByConcentration(concentrationId) : getAllStudentNotes();
        var gridData = students || [];
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
        addStudentButtonObj.style['margin-left'] = "5px";
        addStudentButtonObj.innerHTML = '<i class="glyphicon glyphicon-plus-sign icon-plus-sign"></i>';
        var codeOfConductButtonObj = document.createElement("button");
        codeOfConductButtonObj.name = "codeOfConduct";
        codeOfConductButtonObj.title = "Code of Conduct not completed";
        codeOfConductButtonObj.type = "button";
        codeOfConductButtonObj.className = "btn btn-default";
        codeOfConductButtonObj.style.padding = "3px 6px";
        codeOfConductButtonObj.style['margin-left'] = "5px";
        codeOfConductButtonObj.innerHTML = userRole === "ADVISOR" ? 'Code of Conduct completed' : 'Code of Conduct not completed';
        var allStudentsButtonObj = document.createElement("button");
        allStudentsButtonObj.name = "allStudents";
        allStudentsButtonObj.title = "All Students";
        allStudentsButtonObj.type = "button";
        allStudentsButtonObj.className = "btn btn-default";
        allStudentsButtonObj.style.padding = "3px 6px";
        allStudentsButtonObj.style['margin-left'] = "5px";
        allStudentsButtonObj.innerHTML = 'All Students';
        var allStudentNotessButtonObj = document.createElement("button");
        allStudentNotessButtonObj.name = "studentsByNotes";
        allStudentNotessButtonObj.title = "Notes";
        allStudentNotessButtonObj.type = "button";
        allStudentNotessButtonObj.className = "btn btn-default";
        allStudentNotessButtonObj.style.padding = "3px 6px";
        allStudentNotessButtonObj.style['margin-left'] = "5px";
        allStudentNotessButtonObj.innerHTML = 'Students by Notes';
        toolbarObj.appendChild(addStudentButtonObj);
        toolbarObj.appendChild(allStudentsButtonObj);
        toolbarObj.appendChild(allStudentNotessButtonObj);
        toolbarObj.appendChild(codeOfConductButtonObj);
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
//        _this.disableStudentEditForm(studentFormConfObj);
    };

    this.disableStudentEditForm = function (formConfObj) {
        var formObj = document.forms[formConfObj.name];
        for (var itemKey in studentInputDetails) {
            // if (studentFinalInputs.indexOf(itemKey) > -1) {
            if (studentInputDetails[itemKey].type === "text") {
                $(formObj.elements[itemKey]).attr('readonly', 'true');
            } else if (studentInputDetails[itemKey].type === "select") {
                $(formObj.elements[itemKey]).attr('disabled', 'true');
            }
            // }
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
            student["programEntryTerm"] = formObj["programEntryTerm"].value;
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
                align: "left",
                formatter: function (value, row, index) {
                    return row.firstName + ' ' + row.lastName;
                }

            }, {
                title: "UCMO Email",
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

            }
        ]
    };
    if (userRole !== "ADVISOR") {
        studentDetailsConfobj.columns.push({
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
        });
    }
    return studentDetailsConfobj;
}

function getAllStudents() {
    return appAjaxSync(appRestPath + "/student", "GET", "", "JSON");
}

function codeOfConductNotCompletedStudents() {
    return appAjaxSync(appRestPath + "/student/codeOfConductNotCompleted", "GET", "", "JSON");
}

function getAllStudentNotes() {
    return appAjaxSync(appRestPath + "/student/studentNotes", "GET", "", "JSON");
}

function getStudent(studentId) {
    return appAjaxSync(appRestPath + "/student/" + studentId, "GET", "", "JSON");
}

function getStudentByLoginId(loginId) {
    return appAjaxSync(appRestPath + "/student/loginId/" + loginId, "GET", "", "JSON");
}

function getStudentByConcentration(concentrationId) {
    return appAjaxSync(appRestPath + "/student/concentration/" + concentrationId, "GET", "", "JSON");
}

function codeOfConductNotCompletedStudentsByConcentration(concentrationId) {
    return appAjaxSync(appRestPath + "/student/concentration/codeOfConductNotCompleted/" + concentrationId, "GET", "", "JSON");
}

function codeOfConductCompletedStudentsByConcentration(concentrationId) {
    return appAjaxSync(appRestPath + "/student/concentration/codeOfConductCompleted/" + concentrationId, "GET", "", "JSON");
}

function getAllStudentNotesByConcentration(concentrationId) {
    return appAjaxSync(appRestPath + "/student/concentration/studentNotes/" + concentrationId, "GET", "", "JSON");
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

/*director profile Layout Ends*/
function loadDirectorProfileLyt(cellObj) {
    this.lytConfObj = {
        "pattern": "1C",
        "parent": cellObj
    };
    this.lytObj = new appLayout(this.lytConfObj);
    this.detailsCellObj = this.lytObj.cells.a.obj;
    this.loadDirectorProfilesLyt = function () {
        var _this = this;
        clearAllElementsInDiv(_this.detailsCellObj);
        _this.showEditDirectorProfileForm(_this.detailsCellObj, loginUser);
    };

    this.attachDirectorProfilesForm = function (cellObj, confObj) {
        var directorProfileFormWrapObj = new attachForm(confObj);
        directorProfileFormWrapObj.cell.form.innerHTML = getDirectorProfileForm();
    };

    this.showEditDirectorProfileForm = function (cellObj, directorProfile) {
        var _this = this;

        var directorProfileFormConfObj = {
            "parent": cellObj,
            "hdrText": "Profile",
            "formType": "edit",
            "name": "editdirectorProfile",
            "id": "editdirectorProfile"
        };
        _this.attachDirectorProfilesForm(cellObj, directorProfileFormConfObj);
        _this.setDirectorProfileFormDetails(directorProfileFormConfObj, loginUser);
        var directorProfileFormObj = document.forms[directorProfileFormConfObj.name];
        $(directorProfileFormObj.elements["save"]).hide();
        $(directorProfileFormObj.elements["cancel"]).hide();
        $(directorProfileFormObj.elements["save"]).click(function () {
            _this.onDirectorProfileFormBtnClick("save", directorProfileFormConfObj);
        });
        $(directorProfileFormObj.elements["edit"]).click(function () {
            _this.onDirectorProfileFormBtnClick("edit", directorProfileFormConfObj);
        });
        $(directorProfileFormObj.elements["cancel"]).click(function () {
            _this.onDirectorProfileFormBtnClick("cancel", directorProfileFormConfObj);
        });
        // $(directorProfileFormObj.elements["reset"]).click(function () {
        //     _this.onDirectorProfileFormBtnClick("reset", directorProfileFormConfObj);
        // });
//        $(directorProfileFormObj.elements["cancel"]).click(function () {
//            _this.onDirectorProfileFormBtnClick("cancel", directorProfileFormConfObj);
//        });
        // _this.onDirectorProfileFormBtnClick("clearBtn", directorProfileFormConfObj);
        _this.setDirectorFormnotEditable(directorProfileFormConfObj, true);
    };

    this.setDirectorProfileFormDetails = function (formConfObj, details) {
        var directorProfileFormObj = document.forms[formConfObj.name];
        $(directorProfileFormObj.elements["id"]).val(details.id);
        $(directorProfileFormObj.elements["loginId"]).val(details.loginId);
        $(directorProfileFormObj.elements["password"]).val(details.password);
        $(directorProfileFormObj.elements["rePassword"]).val(details.password);
    };

    this.onDirectorProfileFormBtnClick = function (id, confObj) {

        var _this = this;
        var formName = confObj.name;
        if (id === "save") {
            var formObj = document.forms[formName];
            if (formObj["password"].value !== formObj["rePassword"].value) {
                return;
            }
            var directorProfile = {};
            directorProfile["loginId"] = formObj["loginId"].value;
            directorProfile["password"] = formObj["password"].value;
            var response;
            if (confObj.formType === "add") {

            } else {
                directorProfile["id"] = formObj["id"].value;
                response = editDirector(directorProfile);
            }
            if (response && response.success) {
                showMessage(response.message, "success");
            } else {
                showMessage(response.message, "success");
            }
        } else if (id === "edit") {
            var formObj = document.forms[formName];
            $(formObj.elements["edit"]).hide();
            $(formObj.elements["save"]).show();
            $(formObj.elements["cancel"]).show();
            _this.setDirectorFormnotEditable(confObj, false);
        } else if (id === "cancel") {
            var formObj = document.forms[formName];
            $(formObj.elements["edit"]).show();
            $(formObj.elements["save"]).hide();
            $(formObj.elements["cancel"]).hide();
            _this.setDirectorFormnotEditable(confObj, true);
//            _this.initDirectorProfilesGrid();
        }
    };

    this.setDirectorFormnotEditable = function (formConfObj, readonly) {
        var formObj = document.forms[formConfObj.name];
        $(formObj.elements["loginId"]).attr('readonly', true);

        $(formObj.elements["password"]).attr('readonly', readonly);
        $(formObj.elements["rePassword"]).attr('readonly', readonly);

    };


    this.loadDirectorProfilesLyt();
}

function getDirectorProfileForm() {
    var form = document.getElementById("directorFormTpl").innerHTML;
    return form;
}

function getDirector(directorId) {
    return appAjaxSync(appRestPath + "/advisor/director/" + directorId, "GET", "", "JSON");
}

function editDirector(director) {
    return appAjaxSync(appRestPath + "/advisor/director/" + director.loginId, "PUT", JSON.stringify(director), "JSON");
}
/*director profile Layout Ends*/

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
        var courseOptions = getCoursesAsOptions();
        $(concentrationFormObj.elements["allCourses"]).append(courseOptions);
        var advisorOptions = getNotAssignedAdvisorsAsOptions();
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
        $(concentrationFormObj.elements["courseMoveLeft"]).click(function () {
            _this.onConcentrationFormBtnClick("courseMoveLeft", concentrationFormConfObj);
        });
        $(concentrationFormObj.elements["courseMoveRight"]).click(function () {
            _this.onConcentrationFormBtnClick("courseMoveRight", concentrationFormConfObj);
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
        $(concentrationFormObj.elements["courseMoveLeft"]).click(function () {
            _this.onConcentrationFormBtnClick("courseMoveLeft", concentrationFormConfObj);
        });
        $(concentrationFormObj.elements["courseMoveRight"]).click(function () {
            _this.onConcentrationFormBtnClick("courseMoveRight", concentrationFormConfObj);
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
        $(concentrationFormObj.elements["allCourses"]).attr('readonly', 'true');
        $(concentrationFormObj.elements["courseMoveLeft"]).attr('disabled', 'true');
        $(concentrationFormObj.elements["courseMoveRight"]).attr('disabled', 'true');
        $(concentrationFormObj.elements["courses"]).attr('readonly', 'true');
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
        var allCourses = [], courses = [], existedCourseIds = [];
        var courseOptions = getCoursesAsOptions();
        for (var i = 0; i < details.courses.length; i++) {
            existedCourseIds.push(details.courses[i].id);
        }
        for (var i = 0; i < courseOptions.length; i++) {
            if (existedCourseIds.indexOf(parseInt(courseOptions[i].val())) > -1) {
                courses.push(courseOptions[i]);
            } else {
                allCourses.push(courseOptions[i]);
            }
        }
        $(concentrationFormObj.elements["allCourses"]).append(allCourses);
        $(concentrationFormObj.elements["courses"]).append(courses);
        var advisorId = details.advisor && details.advisor.id;
        var advisorOptions = getNotAssignedAdvisorsAsOptions(advisorId);
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
                "courses": {"validations": {"isSelectValid": "Please select atleast one course"}},
                "notes": {
                    "validations": {"isMaxLengthReached": "Please enter notes below 400 characters"},
                    "maxLength": 400
                }
            };
            if (!validateForm(formName, validateItems)) {
                return false;
            }

            var concentration = {}, courseObj, selectedCourses = [];
            concentration["concentrationName"] = formObj["name"].value;
            concentration["concentrationStatus"] = formObj["status"].value;
            concentration["notes"] = formObj["notes"].value;
            $(formObj.elements["courses"]).find("option").each(function (ind, el) {
                if ($(el).val()) {
                    courseObj = {};
                    courseObj["id"] = $(el).val();
                    selectedCourses.push(courseObj);
                }
            });
            concentration["courses"] = selectedCourses;
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
        } else if (id === "courseMoveLeft") {
            var formObj = document.forms[formName];
            var selectedOpts = $(formObj.elements["allCourses"]).find("option:selected");
            $(formObj.elements["courses"]).append(selectedOpts);
        } else if (id === "courseMoveRight") {
            var formObj = document.forms[formName];
            var selectedOpts = $(formObj.elements["courses"]).find("option:selected");
            $(formObj.elements["allCourses"]).append(selectedOpts);
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
                title: "Courses",
                field: "courses",
                align: "left",
                formatter: function (value, row, index) {
                    var courseNames = [];
                    if (value && value.length) {
                        for (var i = 0; i < value.length; i++) {
                            courseNames.push(value[i].courseName + " (" + value[i].coursePrefix + ", " + value[i].courseCode + ")");
                        }
                    }
                    return courseNames.join(', ');
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


/*Course Layout Starts*/
function loadCourseLyt(cellObj) {
    this.lytConfObj = {
        "pattern": "1C",
        "parent": cellObj
    };
    this.lytObj = new appLayout(this.lytConfObj);
    this.detailsCellObj = this.lytObj.cells.a.obj;
    this.loadCoursesLyt = function () {
        var _this = this;
        clearAllElementsInDiv(_this.detailsCellObj);
        _this.initCoursesGrid();
    };
    this.initCoursesGrid = function () {
        var _this = this;
        var toolbarObj = _this.getCourseDetailsToolbar();
        var confObj = {
            me: _this
        };
        var coursesGridConfObj = {
            "parent": _this.detailsCellObj,
            "options": getCourseDetailsGridObj(toolbarObj, confObj)
        };
        var coursesGridObj = new createBootstrapTable(coursesGridConfObj);
        var coursesGrid = $(coursesGridObj.baseObj);
        coursesGrid.bootstrapTable({
            "height": $(_this.detailsCellObj).height() - 5,
            "columns": coursesGridConfObj.options.columns,
            data: [],
            "onDblClickRow": function (row, el, field) {
                _this.showViewCourseForm(_this.detailsCellObj, row);
            }
        });
        $(_this.detailsCellObj).find("button[name=addCourse]").click(function () {
            _this.showAddCourseForm(_this.detailsCellObj);
        });
        _this.loadCoursesGridData(coursesGrid);
    };

    this.operateEvent = function () {
        var _this = this;
        return {
            'click .courseEdit': function (e, value, row, index) {
                _this.showEditCourseForm(_this.detailsCellObj, row);
            }, 'click .courseRemove': function (e, value, row, index) {
                _this.deleteCourseFromGrid(row);
            }
        };
    };

    this.loadCoursesGridData = function (gridObj) {
        gridObj.bootstrapTable("showLoading");
        var gridData = getAllCourses();
        gridObj.bootstrapTable("load", gridData);
        gridObj.bootstrapTable("hideLoading");
    };

    this.getCourseDetailsToolbar = function () {
        var toolbarObj = document.createElement("div");
        toolbarObj.role = "toolbar";
        var addCourseButtonObj = document.createElement("button");
        addCourseButtonObj.name = "addCourse";
        addCourseButtonObj.title = "Add Course";
        addCourseButtonObj.type = "button";
        addCourseButtonObj.className = "btn btn-default";
        addCourseButtonObj.style.padding = "3px 6px";
        addCourseButtonObj.innerHTML = '<i class="glyphicon glyphicon-plus-sign icon-plus-sign"></i>';
        toolbarObj.appendChild(addCourseButtonObj);
        return toolbarObj;
    };

    this.attachCoursesForm = function (cellObj, confObj) {
        var courseFormWrapObj = new attachForm(confObj);
        courseFormWrapObj.cell.form.innerHTML = getCourseForm();
    };

    this.showAddCourseForm = function (cellObj) {
        var _this = this;

        var courseFormConfObj = {
            "parent": cellObj,
            "hdrText": "Add Course",
            "formType": "add",
            "name": "addcourse",
            "id": "addcourse"
        };
        _this.attachCoursesForm(cellObj, courseFormConfObj);
        var courseFormObj = document.forms[courseFormConfObj.name];
        courseFormObj.elements['name'].focus();
        $(courseFormObj.elements["status"].parentElement.parentElement).hide();
        $(courseFormObj.elements["save"]).click(function () {
            _this.onCourseFormBtnClick("save", courseFormConfObj);
        });
        // $(courseFormObj.elements["reset"]).click(function () {
        //     _this.onCourseFormBtnClick("reset", courseFormConfObj);
        // });
        $(courseFormObj.elements["cancel"]).click(function () {
            _this.onCourseFormBtnClick("cancel", courseFormConfObj);
        });
        // _this.onCourseFormBtnClick("clearBtn", courseFormConfObj);
    };

    this.showEditCourseForm = function (cellObj, course) {
        var _this = this;

        var courseFormConfObj = {
            "parent": cellObj,
            "hdrText": "Edit Course",
            "formType": "edit",
            "name": "editcourse",
            "id": "editcourse"
        };
        _this.attachCoursesForm(cellObj, courseFormConfObj);
        var course = getCourse(course.id);
        _this.setCourseFormDetails(courseFormConfObj, course);
        var courseFormObj = document.forms[courseFormConfObj.name];
        courseFormObj.elements['name'].focus();
        $(courseFormObj.elements["save"]).click(function () {
            _this.onCourseFormBtnClick("save", courseFormConfObj);
        });
        // $(courseFormObj.elements["reset"]).click(function () {
        //     _this.onCourseFormBtnClick("reset", courseFormConfObj);
        // });
        $(courseFormObj.elements["cancel"]).click(function () {
            _this.onCourseFormBtnClick("cancel", courseFormConfObj);
        });
        // _this.onCourseFormBtnClick("clearBtn", courseFormConfObj);
    };

    this.showViewCourseForm = function (cellObj, course) {
        var _this = this;

        var courseFormConfObj = {
            "parent": cellObj,
            "hdrText": "View Course",
            "formType": "view",
            "name": "viewcourse",
            "id": "viewcourse"
        };
        _this.attachCoursesForm(cellObj, courseFormConfObj);
        var course = getCourse(course.id);
        _this.setCourseFormDetails(courseFormConfObj, course);
        var courseFormObj = document.forms[courseFormConfObj.name];
        $(courseFormObj.elements["name"]).attr('readonly', 'true');
        $(courseFormObj.elements["prefix"]).attr('readonly', 'true');
        $(courseFormObj.elements["code"]).attr('readonly', 'true');
        $(courseFormObj.elements["notes"]).attr('readonly', 'true');
        $(courseFormObj.elements["status"]).attr('disabled', 'disabled');
        $(courseFormObj.elements["save"]).hide();
        $(courseFormObj.elements["reset"]).hide();
        $(courseFormObj.elements["cancel"]).text("Close");
        $(courseFormObj.elements["cancel"]).click(function () {
            _this.onCourseFormBtnClick("cancel", courseFormConfObj);
        });
        // _this.onCourseFormBtnClick("clearBtn", courseFormConfObj);
    };

    this.setCourseFormDetails = function (formConfObj, details) {
        var courseFormObj = document.forms[formConfObj.name];
        $(courseFormObj.elements["courseId"]).val(details.id);
        $(courseFormObj.elements["name"]).val(details.courseName);
        $(courseFormObj.elements["prefix"]).val(details.coursePrefix);
        $(courseFormObj.elements["code"]).val(details.courseCode);
        $(courseFormObj.elements["notes"]).val(details.notes);
        $(courseFormObj.elements["status"]).val(details.courseStatus);
    };

    this.onCourseFormBtnClick = function (id, confObj) {

        var _this = this;
        var formName = confObj.name;
        if (id === "save") {
            var formObj = document.forms[formName];

            var validateItems = {
                "name": {
                    "validations": {
                        "isNotEmpty": "Please enter Course Name",
                        "isMaxLengthReached": "Please enter Course Name below 64 characters"
                    }, "maxLength": 64
                },
                "prefix": {
                    "validations": {
                        "isNotEmpty": "Please enter Course Prefix",
                        "isMaxLengthReached": "Please enter Course Prefix below 16 characters"
                    }, "maxLength": 16
                },
                "code": {
                    "validations": {
                        "isNotEmpty": "Please enter Course Code",
                        "isMaxLengthReached": "Please enter Course Code below 16 characters"
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
            var course = {};
            course["courseName"] = formObj["name"].value;
            course["coursePrefix"] = formObj["prefix"].value;
            course["courseCode"] = formObj["code"].value;
            course["courseStatus"] = formObj["status"].value;
            course["notes"] = formObj["notes"].value;
            var response;
            if (confObj.formType === "add") {
                response = addCourse(course);
            } else {
                course["id"] = formObj["courseId"].value;
                response = editCourse(course);
            }
            if (response.success) {
                showMessage(response.message, "success");
                _this.initCoursesGrid();
            } else {
                showMessage(response.message, "danger");
            }

        } else if (id === "reset") {
            clearFormDataByName(formName);
        } else if (id === "cancel") {
            _this.initCoursesGrid();
        }

    };

    this.deleteCourseFromGrid = function (course) {
        var _this = this;
        var response = deleteCourse(course.id);
        if (response.success) {
            showMessage(response.message, "success");
            _this.initCoursesGrid();
        } else {
            showMessage(response.message, "danger");
        }
    };
    this.loadCoursesLyt();
}

function getAllCourses() {
    return appAjaxSync(appRestPath + "/course", "GET", "", "JSON");
}

function getCourse(courseId) {
    return appAjaxSync(appRestPath + "/course/" + courseId, "GET", "", "JSON");
}

function addCourse(course) {
    return appAjaxSync(appRestPath + "/course", "PUT", JSON.stringify(course), "JSON");
}

function editCourse(course) {
    return appAjaxSync(appRestPath + "/course/" + course.id, "PUT", JSON.stringify(course), "JSON");
}

function deleteCourse(courseId) {
    return appAjaxSync(appRestPath + "/course/" + courseId, "DELETE", "", "JSON");
}

function getCourseDetailsGridObj(toolbarObj, confObj) {
    var toolbar = toolbarObj.outerHTML;
    var courseDetailsConfobj = {
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
                field: "courseName",
                align: "left"
            }, {
                title: "Prefix",
                field: "coursePrefix",
                align: "left"
            }, {
                title: "Code",
                field: "courseCode",
                align: "left"
            }, {
                title: "Notes",
                field: "notes",
                align: "left"
            }, {
                title: "Status",
                field: "courseStatus",
                align: "left"
            }, {
                title: "Operate",
                field: "operate",
                align: 'center',
                events: confObj.me.operateEvent(),
                formatter: [
                    '<button class="courseEdit" title="Edit">',
                    '<i class="glyphicon glyphicon-pencil icon-pencil"></i>',
                    '</button>  ',
                    '<button class="courseRemove" title="Remove">',
                    '<i class="glyphicon glyphicon-remove-sign icon-remove-sign"></i>',
                    '</button>'
                ].join('')
            }]
    };
    return courseDetailsConfobj;
}

function getCourseForm() {
    var form = document.getElementById("courseFormTpl").innerHTML;
    return form;
}

/*Course Layout Ends*/

function getCoursesAsOptions() {
    var options = [];
    var courses = getAllCourses();
    for (var i = 0; i < courses.length; i++) {
        if (courses[i].courseStatus === 'ACTIVE') {
            options.push($('<option>').val(courses[i].id).text(courses[i].courseName + " (" + courses[i].coursePrefix + " ," + courses[i].courseCode + ")"));
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

function getNotAssignedAdvisorsAsOptions(advisorId) {
    var options = [];
    var advisors = getAllAdvisors();
    for (var i = 0; i < advisors.length; i++) {
        if (advisors[i].status === 'ACTIVE' && (!advisors[i].concentration.id || advisors[i].id === advisorId)) {
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
        $(advisorProfileFormObj.elements["save"]).hide();
        $(advisorProfileFormObj.elements["cancel"]).hide();
        $(advisorProfileFormObj.elements["save"]).click(function () {
            _this.onAdvisorProfileFormBtnClick("save", advisorProfileFormConfObj);
        });
        $(advisorProfileFormObj.elements["edit"]).click(function () {
            _this.onAdvisorProfileFormBtnClick("edit", advisorProfileFormConfObj);
        });
        $(advisorProfileFormObj.elements["cancel"]).click(function () {
            _this.onAdvisorProfileFormBtnClick("cancel", advisorProfileFormConfObj);
        });
        // $(advisorProfileFormObj.elements["reset"]).click(function () {
        //     _this.onAdvisorProfileFormBtnClick("reset", advisorProfileFormConfObj);
        // });
//        $(advisorProfileFormObj.elements["cancel"]).click(function () {
//            _this.onAdvisorProfileFormBtnClick("cancel", advisorProfileFormConfObj);
//        });
        // _this.onAdvisorProfileFormBtnClick("clearBtn", advisorProfileFormConfObj);
        _this.setAdvisorFormnotEditable(advisorProfileFormConfObj, true);
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
        } else if (id === "edit") {
            var formObj = document.forms[formName];
            $(formObj.elements["edit"]).hide();
            $(formObj.elements["save"]).show();
            $(formObj.elements["cancel"]).show();
            _this.setAdvisorFormnotEditable(confObj, false);
        } else if (id === "cancel") {
            var formObj = document.forms[formName];
            $(formObj.elements["edit"]).show();
            $(formObj.elements["save"]).hide();
            $(formObj.elements["cancel"]).hide();
            _this.setAdvisorFormnotEditable(confObj, true);
//            _this.initAdvisorProfilesGrid();
        }
    };

    this.setAdvisorFormnotEditable = function (formConfObj, readonly) {
        var formObj = document.forms[formConfObj.name];
        $(formObj.elements["name"]).attr('readonly', true);
        $(formObj.elements["mail"]).attr('readonly', true);
        $(formObj.elements["status"]).attr('disabled', true);

        $(formObj.elements["password"]).attr('readonly', readonly);
        $(formObj.elements["rePassword"]).attr('readonly', readonly);
        $(formObj.elements["phone"]).attr('readonly', readonly);
        $(formObj.elements["notes"]).attr('readonly', readonly);

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
            var codeOfConductValue = formObj.elements['codeOfConduct'];
            if (codeOfConductValue && !codeOfConductValue.checked) {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_WARNING,
                    title: 'Warning',
                    message: "Please accept code of conduct",
                    draggable: true,
                    nl2br: false
                });
                return false;
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
    $(studentFormObj.elements["searchNotes"]).val();
    $(studentFormObj.elements["previousNotes"]).val(details.notes || "");
    $(studentFormObj.elements["studentPrerequisite"]).val(details.preReq || "notmet");
    $(studentFormObj.elements["notes"]).val(details.notes || "");
    $(studentFormObj.elements["programEntryTerm"]).val(details.programEntryTerm || "");
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

function onViewCodeOfConductClick() {
    var codeOfConductMsg = '<b>The students, faculty and staff of the Adrian and Margaret Harmon College of Business Administration, working together to create a supportive and ethical educational environment, adopt the following guiding principles.' +
            '</br>' +
            '</br>' +
            'We recognize and support the Central Community Creed.' +
            '</br>' +
            '</br>' +
            'In addition, we believe that:' +
            '<li>We are responsible for acting in a way that preserves academic honesty, freedom and integrity; </li>' +
            '<li> We endeavor to foster a sense of personal responsibility for our actions and continuing education; </li>' +
            '<li> We behave in a manner which encourages ethical behavior; </li>' +
            '<li> We are personally responsible for acquiring and maintaining professional competence; </li>' +
            '<li> We appreciate the impacts and benefits of diversity in race, religion gender, ethnicity, opinion, and ideas at UCM and in the workplace; </li>' +
            '<li> We serve our community both by reaching our educational goals and by being proactive members of the community. </li>' +
            '</b>';
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_INFO,
        title: 'Code of Conduct',
        message: codeOfConductMsg,
        draggable: true,
        nl2br: false,
        onhidden: function (e) {
        },
        buttons: [
            {
                label: 'Accept',
                action: function (dialogRef) {
                    $(document.forms['studentQuestionnaire']).find('input[name=codeOfConduct]').prop('checked', true);
                    dialogRef.close();
                }
            },
            {
                label: 'Decline',
                action: function (dialogRef) {
                    $(document.forms['studentQuestionnaire']).find('input[name=codeOfConduct]').prop('checked', false);
                    dialogRef.close();
                }
            }
        ]
    });
}