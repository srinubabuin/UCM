<%@ page import="com.ucm.model.AppAuth" %>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>UCM - Student</title>
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
            String userRole;
            if (accessToken != null) {
                AppAuth appAuth = (AppAuth) session.getAttribute("appAuth");
                userRole = appAuth.getRole().toString();
            }
        %>
    </head>
    <body onload="doOnLoad()">

        <div id='formTempletes' style="display: none;">
            <div id="studentQuestionnairesFormTpl">
                <div class="form-group">
                    <label class="col-sm-6 control-label required">Have you taken a course like this?</label>
                    <div class="col-sm-6">
                        <label class="radio-inline"><input type="radio" value="yes"  name="takenCource"  onchange="onStudentQuestionnaireFormChange('takenCource')">Yes</label>
                        <label class="radio-inline"><input type="radio" value="no" name="takenCource" onchange="onStudentQuestionnaireFormChange('takenCource')" checked='checked'>No</label>
                    </div>
                </div>
                <div class="form-group" style='display: none;'>
                    <label class="col-sm-6 control-label">If so, at what school? What was the course prefix, number and title?</label>
                    <div class="col-sm-6">
                        <textarea name="takenCourceDesc" rows="3" class="form-control textarea-no-resize"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">How many classes do you plan to take each fall / spring semester?</label>
                    <div class="col-sm-6">
                        <input type="text" name="classesPerSemester" class="form-control" placeholder="How many classes do you plan per semester">
                    </div>
                </div>
                <div class="form-group" style='display: none;'>
                    <label class="col-sm-6 control-label required">How many classes to you plan to take in the summer?</label>
                    <div class="col-sm-6">
                        <input type="text" name="classesPlanSummer" class="form-control" placeholder="How many classes do you plan in summer?">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">Do you plan to work while pursuing your MBA?</label>
                    <div class="col-sm-6">
                        <label class="radio-inline"><input type="radio" value="yes" name="planToWork" onchange="onStudentQuestionnaireFormChange('planToWork')">Yes</label>
                        <label class="radio-inline"><input type="radio" value="no" name="planToWork" onchange="onStudentQuestionnaireFormChange('planToWork')" checked='checked'>No</label>
                    </div>
                </div>
                <div class="form-group" style='display: none;'>
                    <label class="col-sm-6 control-label">If so, how many hours a week do you plan to work?</label>
                    <div class="col-sm-6">
                        <input type="text" name="planToWorkDesc" class="form-control" placeholder="Working Company">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">If currently employed</label>
                    <div class="col-sm-6">
                        <label class="radio-inline"><input type="radio" value="yes" name="currentEmployee" onchange="onStudentQuestionnaireFormChange('currentEmployee')">Yes</label>
                        <label class="radio-inline"><input type="radio" value="no" name="currentEmployee" onchange="onStudentQuestionnaireFormChange('currentEmployee')" checked='checked'>No</label>
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
                    <label class="col-sm-6 control-label required">How far is your residence from UCM's Warrensburg campus?</label>
                    <div class="col-sm-6">
                        <input type="text" name="residenceFromWarrensburgCampus" class="form-control" placeholder="Residence from UCM's Warrensburg campus?">
                    </div>  
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">How far is your work location from UCM's Warresnburg campus?</label>
                    <div class="col-sm-6">
                        <input type="text" name="workLocFromWarrensburgCampus" class="form-control" placeholder="Work location from UCM's Warrensburg campus?">
                    </div>  
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">Do you have children for whom you are responsible?</label>
                    <div class="col-sm-6">
                        <input type="text" name="childrenWhomYouAreResp" class="form-control" placeholder="Children for whom you are responsible?">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">Are you a single parent?</label>
                    <div class="col-sm-6">
                        <label class="radio-inline"><input type="radio" value="yes" name="areYouSigleParent">Yes</label>
                        <label class="radio-inline"><input type="radio" value="no" name="areYouSigleParent" checked='checked'>No</label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">Will you have difficulty scheduling morning classes?</label>
                    <div class="col-sm-6">
                        <label class="radio-inline"><input type="radio" value="yes" name="difficultySchedulingMorning">Yes</label>
                        <label class="radio-inline"><input type="radio" value="no" name="difficultySchedulingMorning" checked='checked'>No</label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">Will you have difficulty scheduling afternoon classes?</label>
                    <div class="col-sm-6">
                        <label class="radio-inline"><input type="radio" value="yes" name="difficultySchedulingAfternoon">Yes</label>
                        <label class="radio-inline"><input type="radio" value="no" name="difficultySchedulingAfternoon" checked='checked'>No</label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">Will you have difficulty scheduling night classes?</label>
                    <div class="col-sm-6">
                        <label class="radio-inline"><input type="radio" value="yes" name="difficultySchedulingNight">Yes</label>
                        <label class="radio-inline"><input type="radio" value="no" name="difficultySchedulingNight" checked='checked'>No</label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">Will you have difficulty scheduling weekend classes?</label>
                    <div class="col-sm-6">
                        <label class="radio-inline"><input type="radio" value="yes" name="difficultySchedulingWeekend">Yes</label>
                        <label class="radio-inline"><input type="radio" value="no" name="difficultySchedulingWeekend" checked='checked'>No</label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label">What is your motivation in pursing an MBA?</label>
                    <div class="col-sm-6">
                        <textarea name="motivationPursingMBA" rows="3" class="form-control textarea-no-resize"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label">What type of position do you plan to seek after obtaining your MBA?</label>
                    <div class="col-sm-6">
                        <textarea name="positionSeedAfterMBA" rows="3" class="form-control textarea-no-resize"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-6 control-label required">How did you become aware of the MBA program at UCM?</label>
                    <div class="col-sm-6">
                        <select name="status" class="form-control">
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
                        <select name="status" class="form-control">
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
                <input type="hidden" name="id" value="-1">
                <input type="hidden" name="loginId" value="-1">
                <div class="col-sm-12 text-center">
                    <button name="submitQuestionnaire" class="btn btn-success" type="button">Submit</button>
                    <button name="reset" class="btn btn-warning" type="reset">Reset</button>
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
                        <li class="active" itemId="QUESTIONNAIRES">
                            <a href="javascript:void(0);" onclick="onStudentMainNavItemClick('QUESTIONNAIRES')" title="Questionnaire">
                                Questionnaire
                            </a>
                        </li>
                        <li itemId="CODEOFCONDUCT">
                            <a href="javascript:void(0);" onclick="onStudentMainNavItemClick('CODEOFCONDUCT')" title="Code of Conduct">
                                Code of Conduct
                            </a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a href="javascript:void(0);" onclick="onMainNavItemClick('LOGOUT')" title="Logout">
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
        var userRole = "${userRole}";
        var appManagerLytObj;
        var studentLytObj, advisorLytObj, courceLytObj, concentrationLytObj;
        var questionnaireSubItems = {
            'takenCource': ['takenCourceDesc'],
            'planToWork': ['planToWorkDesc'],
            'currentEmployee': ['currentEmployeeWork', 'currentEmployeePosition']
        };
//        if (!accessToken) {
//            window.location.href = "<%=request.getContextPath()%>/resources/jsp/AppLogin.jsp";
//        }
        function doOnLoad() {
            console.log(accessToken);
            console.log(userRole);
            appManagerLytObj = getMainLayoutObj();
            onStudentMainNavItemClick("QUESTIONNAIRES");
        }

    </script>
</html>
