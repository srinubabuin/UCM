<%@ page import="com.ucm.model.AppAuth" %>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>UCM - Advisor</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="<%=request.getContextPath()%>/resources/CSS/bootstrap/css/bootstrap.min.css" rel="stylesheet"
              media="screen">
        <link href="<%=request.getContextPath()%>/resources/CSS/bootstraptable/bootstrap-table.css" rel="stylesheet"
              media="screen">
        <link href="<%=request.getContextPath()%>/resources/CSS/bootstrapmodalbox/bootstrap-dialog.min.css" rel="stylesheet"
              media="screen">
        <link href="<%=request.getContextPath()%>/resources/CSS/bootstraptimepicker/bootstrap-datepicker3.css"
              rel="stylesheet" media="screen">
        <link href="<%=request.getContextPath()%>/resources/CSS/app/App.css" rel="stylesheet">
        <link href="<%=request.getContextPath()%>/resources/CSS/app/AppBsCustommin.css" rel="stylesheet">
        <script src="<%=request.getContextPath()%>/resources/JavaScript/jquery/jquery-2.1.4.min.js"></script>
        <script src="<%=request.getContextPath()%>/resources/JavaScript/jquery/jquery.serializeObject.js"></script>
        <script src="<%=request.getContextPath()%>/resources/JavaScript/app/AppUtil.js"></script>
        <script src="<%=request.getContextPath()%>/resources/JavaScript/app/UCM.js"></script>
        <script src="<%=request.getContextPath()%>/resources/JavaScript/bootstrap/bootstrap.min.js"
        type="text/javascript"></script>
        <script src="<%=request.getContextPath()%>/resources/JavaScript/bootstraptable/bootstrap-table.js"
        type="text/javascript"></script>
        <script src="<%=request.getContextPath()%>/resources/JavaScript/bootstrapmodalbox/bootstrap-dialog.min.js"
        type="text/javascript"></script>
        <%
            String accessToken = (String) session.getAttribute("accessToken");
            String userRole = (String) session.getAttribute("role");
            String loginId = (String) session.getAttribute("loginId");
        %>
    </head>
    <body onload="doOnLoad()">
        <div id='formTempletes' style="display: none;">
            <div id="studentSearchFormTpl">
                <div class="form-group">
                    <label class="col-sm-3 control-label required">Student #</label>
                    <div class="col-sm-8">
                        <input type="text" name="studentId" class="form-control" placeholder="Student Id">
                    </div>
                </div>
                <div class="col-md-12 text-center">
                    <span id="errorMessage" style="color: red;"></span>
                </div>
                <div class="col-md-12 text-center">
                    <button name="search" class="btn btn-success" type="button">Search</button>
                    <button name="reset" class="btn btn-warning" type="reset">Reset</button>
                </div>
            </div>
            <div id="studentQuestionnairesFormTpl">
                <div class="form-group">
                    <label class="col-sm-6 control-label required">Have you taken a course like this?</label>
                    <div class="col-sm-6">
                        <label class="radio-inline"><input type="radio" value="yes" name="takenCource"
                                                           onchange="onStudentQuestionnaireFormChange('takenCource')">Yes</label>
                        <label class="radio-inline"><input type="radio" value="no" name="takenCource"
                                                           onchange="onStudentQuestionnaireFormChange('takenCource')"
                                                           checked='checked'>No</label>
                    </div>
                </div>
                <div class="form-group" style='display: none;'>
                    <label class="col-sm-6 control-label">If so, at what school? What was the course prefix, number and
                        title?</label>
                    <div class="col-sm-6">
                        <textarea name="takenCourceDesc" rows="3" class="form-control textarea-no-resize"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">How many classes do you plan to take each fall / spring
                        semester?</label>
                    <div class="col-sm-6">
                        <input type="text" name="classesPerSemester" class="form-control"
                               placeholder="How many classes do you plan per semester">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">How many classes to you plan to take in the
                        summer?</label>
                    <div class="col-sm-6">
                        <input type="text" name="classesPlanSummer" class="form-control"
                               placeholder="How many classes do you plan in summer?">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">Do you plan to work while pursuing your MBA?</label>
                    <div class="col-sm-6">
                        <label class="radio-inline"><input type="radio" value="yes" name="planToWork"
                                                           onchange="onStudentQuestionnaireFormChange('planToWork')">Yes</label>
                        <label class="radio-inline"><input type="radio" value="no" name="planToWork"
                                                           onchange="onStudentQuestionnaireFormChange('planToWork')"
                                                           checked='checked'>No</label>
                    </div>
                </div>
                <div class="form-group" style='display: none;'>
                    <label class="col-sm-6 control-label">If so, how many hours a week do you plan to work?</label>
                    <div class="col-sm-6">
                        <input type="text" name="planToWorkDesc" class="form-control" placeholder="Plan to Work?">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">If currently employed</label>
                    <div class="col-sm-6">
                        <label class="radio-inline"><input type="radio" value="yes" name="currentEmployee"
                                                           onchange="onStudentQuestionnaireFormChange('currentEmployee')">Yes</label>
                        <label class="radio-inline"><input type="radio" value="no" name="currentEmployee"
                                                           onchange="onStudentQuestionnaireFormChange('currentEmployee')"
                                                           checked='checked'>No</label>
                    </div>
                </div>
                <div class="form-group" style='display: none;'>
                    <label class="col-sm-6 control-label">For whom do you work?</label>
                    <div class="col-sm-6">
                        <input type="text" name="currentEmployeeWork" class="form-control" placeholder="Working Company">
                    </div>
                </div>
                <div class="form-group" style='display: none;'>
                    <label class="col-sm-6 control-label">What is your position?</label>
                    <div class="col-sm-6">
                        <input type="text" name="currentEmployeePosition" class="form-control" placeholder="Position">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">How far is your residence from UCM's Warrensburg
                        campus?</label>
                    <div class="col-sm-6">
                        <input type="text" name="residenceFromWarrensburgCampus" class="form-control"
                               placeholder="Residence from UCM's Warrensburg campus?">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">How far is your work location from UCM's Warresnburg
                        campus?</label>
                    <div class="col-sm-6">
                        <input type="text" name="workLocFromWarrensburgCampus" class="form-control"
                               placeholder="Work location from UCM's Warrensburg campus?">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">Do you have children for whom you are
                        responsible?</label>
                    <div class="col-sm-6">
                        <input type="text" name="childrenWhomYouAreResp" class="form-control"
                               placeholder="Children for whom you are responsible?">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">Are you a single parent?</label>
                    <div class="col-sm-6">
                        <label class="radio-inline"><input type="radio" value="yes" name="areYouSigleParent">Yes</label>
                        <label class="radio-inline"><input type="radio" value="no" name="areYouSigleParent"
                                                           checked='checked'>No</label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">Will you have difficulty scheduling morning
                        classes?</label>
                    <div class="col-sm-6">
                        <label class="radio-inline"><input type="radio" value="yes"
                                                           name="difficultySchedulingMorning">Yes</label>
                        <label class="radio-inline"><input type="radio" value="no" name="difficultySchedulingMorning"
                                                           checked='checked'>No</label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">Will you have difficulty scheduling afternoon
                        classes?</label>
                    <div class="col-sm-6">
                        <label class="radio-inline"><input type="radio" value="yes"
                                                           name="difficultySchedulingAfternoon">Yes</label>
                        <label class="radio-inline"><input type="radio" value="no" name="difficultySchedulingAfternoon"
                                                           checked='checked'>No</label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">Will you have difficulty scheduling night
                        classes?</label>
                    <div class="col-sm-6">
                        <label class="radio-inline"><input type="radio" value="yes"
                                                           name="difficultySchedulingNight">Yes</label>
                        <label class="radio-inline"><input type="radio" value="no" name="difficultySchedulingNight"
                                                           checked='checked'>No</label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">Will you have difficulty scheduling weekend
                        classes?</label>
                    <div class="col-sm-6">
                        <label class="radio-inline"><input type="radio" value="yes"
                                                           name="difficultySchedulingWeekend">Yes</label>
                        <label class="radio-inline"><input type="radio" value="no" name="difficultySchedulingWeekend"
                                                           checked='checked'>No</label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label">What is your motivation in pursing an MBA?</label>
                    <div class="col-sm-6">
                        <textarea name="motivationPursingMBA" rows="3" class="form-control textarea-no-resize"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label">What type of position do you plan to seek after obtaining your
                        MBA?</label>
                    <div class="col-sm-6">
                        <textarea name="positionSeedAfterMBA" rows="3" class="form-control textarea-no-resize"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">How did you become aware of the MBA program at
                        UCM?</label>
                    <div class="col-sm-6">
                        <select name="awareMBAatUCM" class="form-control">
                            <option value="internetSearch">Internet search</option>
                            <option value="referralByFriend">Referral by a friend/co-worker</option>
                            <option value="referralByManager">Referral by a manager at work</option>
                            <option value="attendedUCMBefore">Attended UCM before</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">What attracted you to the MBA program at UCM</label>
                    <div class="col-sm-6">
                        <select name="attractedProgramAtUCM" class="form-control">
                            <option value="cost">Cost</option>
                            <option value="entranceRequirements">Entrance requirements</option>
                            <option value="reputation">Reputation</option>
                            <option value="proximityToWork">Proximity to work</option>
                            <option value="proximityToHome">Proximity to home</option>
                            <option value="familiarityWithUCM">Familiarity with UCM</option>
                            <option value="knowOtherStudents">Know other students</option>
                            <option value="aacsbAccreditation">AACSB Accreditation</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-12 text-center">
                        <label class="checkbox-inline"><input type="checkbox" value="yes" name="codeOfConduct">Accept Code of
                            Counduct</label>
                    </div>
                </div>
            </div>
            <div id="studentPrerequisiteFormTpl">
                <div class="form-group">
                    <label class="col-sm-3 control-label required">Prerequisite</label>
                    <div class="col-sm-8">
                        <select type="text" name="studentSearchPrerequisite" class="form-control">
                            <option value="met">Met</option>
                            <option value="notmet" selected>Not Met</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">Notes</label>
                    <div class="col-sm-8">
                        <textarea name="searchNotes" rows="3" class="form-control textarea-no-resize"></textarea>
                    </div>
                </div>
            </div>
            <div id="studentSearchFormTplButtons">
                <div class="col-sm-12 text-center">
                    <button name="previous" class="btn" type="button">Previous</button>
                    <button name="save" class="btn btn-success" type="button">Save</button>
                    <button name="cancel" class="btn btn-primary" type="button">Cancel</button>
                    <button name="next" class="btn" type="button">Next</button>
                </div>
            </div>
            <div id="studentFormTpl">
                <div class="form-group">
                    <label class="col-sm-3 control-label required">Name</label>
                    <div class="col-sm-8">
                        <div class="row">
                            <div class="col-md-6">
                                <input type="text" name="firstName" class="form-control" placeholder="First Name">
                            </div>
                            <div class="col-md-6">
                                <input type="text" name="lastName" class="form-control" placeholder="Last Name">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label required">Concentration</label>
                    <div class="col-sm-8">
                        <select name="concentration" class="form-control">
                            <option value="-1">Select Concentration</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label required">UCMO Email</label>
                    <div class="col-sm-8">
                        <input type="text" name="mail" class="form-control" placeholder="example@ucmo.com">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label required">Personal Email</label>
                    <div class="col-sm-8">
                        <input type="text" name="personalMail" class="form-control" placeholder="example@example.com">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label required">Phone #</label>
                    <div class="col-sm-8">
                        <input type="text" name="phone" class="form-control" placeholder="+1XXXXXXXXXX">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label required">Mailing Address</label>
                    <div class="col-sm-8">
                        <textarea name="address" rows="3" class="form-control textarea-no-resize"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label required">GMAT/GRE Scores</label>
                    <div class="col-sm-8">
                        <div class="row">
                            <div class="col-md-4">
                                <select name="scoreType" class="form-control">
                                    <option value="GMAT">GMAT</option>
                                    <option value="GRE">GRE</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <input type="text" name="verbal" class="form-control"
                                       placeholder="Verbal">
                            </div>
                            <div class="col-md-2">
                                <input type="text" name="quantitative" class="form-control"
                                       placeholder="Quantitative">
                            </div>
                            <div class="col-md-2">
                                <input type="text" name="analytical" class="form-control"
                                       placeholder="Analytical">
                            </div>
                            <div class="col-md-2">
                                <input type="text" name="gpa" class="form-control" placeholder="GPA">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label required">Status</label>
                    <div class="col-sm-8">
                        <select name="status" class="form-control">
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">In Active</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label required">Prerequisite</label>
                    <div class="col-sm-8">
                        <select type="text" name="studentPrerequisite" class="form-control">
                            <option value="met">Met</option>
                            <option value="notmet" selected>Not Met</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">Notes</label>
                    <div class="col-sm-8">
                        <textarea name="notes" rows="3" class="form-control textarea-no-resize"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label required">Student Status</label>
                    <div class="col-sm-8">
                        <select type="text" name="studentStatus" class="form-control">
                            <option value="select" selected="selected">Please select</option>
                            <option value="approvedForGraduation">Approved for graduation.</option>
                            <option value="withdrawnFromProgramm">Withdrawn from program.</option>
                            <option value="acceptedIntoProgram">Accepted into program.</option>
                            <option value="acceptedIntoProgramWithConditions">Accepted into program with conditions.</option>
                        </select>
                    </div>
                </div>
                <input type="hidden" name="id" value="-1">
                <input type="hidden" name="loginId" value="-1">
            </div>
            <div id="studentFormTplBtns">
                <div class="col-sm-12 text-center">
                    <button name="save" class="btn btn-success" type="button">Save</button>
                    <button name="reset" class="btn btn-warning" type="reset">Reset</button>
                    <button name="cancel" class="btn btn-primary" type="button">Cancel</button>
                </div>
            </div>
            <div id="advisorFormTpl">
                <div class="form-group">
                    <label class="col-sm-3 control-label required">Name</label>
                    <div class="col-sm-8">
                        <input type="text" name="name" class="form-control" placeholder="Name">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label required">Password</label>
                    <div class="col-sm-8">
                        <input type="password" name="password" class="form-control" placeholder="Password">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label required">Reenter Password</label>
                    <div class="col-sm-8">
                        <input type="password" name="rePassword" class="form-control" placeholder="Reenter Password">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label required">Mail</label>
                    <div class="col-sm-8">
                        <input type="text" name="mail" class="form-control" placeholder="example@ucmo.com">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label required">Phone #</label>
                    <div class="col-sm-8">
                        <input type="text" name="phone" class="form-control" placeholder="+1XXXXXXXXXX">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">Notes</label>
                    <div class="col-sm-8">
                        <textarea name="notes" rows="3" class="form-control textarea-no-resize"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label required">Status</label>
                    <div class="col-sm-8">
                        <select name="status" class="form-control">
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">In Active</option>
                        </select>
                    </div>
                </div>
                <input type="hidden" name="id" value="-1">
                <input type="hidden" name="loginId" value="-1">
                <div class="col-sm-12 text-center">
                    <button name="save" class="btn btn-success" type="button">Save</button>
                    <button name="reset" class="btn btn-warning" type="reset">Reset</button>
                    <button name="cancel" class="btn btn-primary" type="button">Cancel</button>
                </div>
            </div>
        </div>


        <header class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#appNavBar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="javascript:void(0);">UCM</a>
                </div>
                <nav id="appNavBar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li class="active" itemId="STUDENTSEARCH">
                            <a href="javascript:void(0);" onclick="onAdvisorMainNavItemClick('STUDENTSEARCH')" title="Student Search">
                                Student Search
                            </a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li itemId="PROFILE">
                            <a href="javascript:void(0);" onclick="onAdvisorMainNavItemClick('PROFILE')" title="Profile">
                                Profile
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onclick="onAdvisorMainNavItemClick('LOGOUT')" title="Logout">
                                <!--Logout-->
                                <span class="glyphicon glyphicon-off"></span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        <div class="container-fluid" type="main">
        </div>
    </body>
    <script>
        appContextPath = "${pageContext.request.contextPath}";
        appRestPath = appContextPath + "/rest";
        accessToken = "${accessToken}";
        userRole = "ADVISOR";
        loginId = "${loginId}";
        var appManagerLytObj;
        var studentLytObj, advisorProfileLytObj;

        if (!accessToken) {
            window.location.href = "<%=request.getContextPath()%>/resources/jsp/AppLogin.jsp";
        }
        function doOnLoad() {
            loginUser = getAdvisorByLoginId(loginId);
            appManagerLytObj = getMainLayoutObj();
            onAdvisorMainNavItemClick("STUDENTSEARCH");
        }

    </script>
</html>
