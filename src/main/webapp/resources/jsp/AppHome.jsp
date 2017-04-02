<%@ page import="com.ucm.model.AppAuth" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>UCM - Director</title>
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
            <label class="col-sm-3 control-label required">Mail</label>
            <div class="col-sm-8">
                <input type="text" name="mail" class="form-control" placeholder="example@ucmo.com">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label required">Personal Mail</label>
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
        <div class="col-sm-12 text-center">
            <button name="save" class="btn btn-success" type="button">Save</button>
            <button name="reset" class="btn btn-warning" type="reset">Reset</button>
            <button name="cancel" class="btn btn-primary" type="button">Cancel</button>
        </div>
    </div>
    <div id="concentrationFormTpl">
        <div class="form-group">
            <label class="col-sm-3 control-label required">Concentration Name</label>
            <div class="col-sm-8">
                <input type="text" name="name" class="form-control" placeholder="Concentration Name">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label required">Cources</label>
            <div class="col-sm-8">
                <div class="row">
                    <div class="col-md-5">
                        <select name="allCources" multiple class="form-control">
                        </select>
                    </div>
                    <div class="col-md-2  text-center">
                        <button name="courceMoveLeft" class="btn btn-success" type="button"
                                style="padding: 3px 6px; width: 70px;" value=">>">&gt;&gt;</button>
                        </br>
                        </br>
                        <button name="courceMoveRight" class="btn btn-danger" type="reset"
                                style="padding: 3px 6px; width: 70px;" value="<<">&lt;&lt;</button>
                    </div>
                    <div class="col-md-5">
                        <select name="cources" multiple class="form-control">
                        </select>
                    </div>
                </div>
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
        <input type="hidden" name="concentrationId" value="-1">
        <div class="col-sm-12 text-center">
            <button name="save" class="btn btn-success" type="button">Save</button>
            <button name="reset" class="btn btn-warning" type="reset">Reset</button>
            <button name="cancel" class="btn btn-primary" type="button">Cancel</button>
        </div>
    </div>
    <div id="courceFormTpl">
        <div class="form-group">
            <label class="col-sm-3 control-label required">Cource Name</label>
            <div class="col-sm-8">
                <input type="text" name="name" class="form-control" placeholder="Cource Name">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label required">Prefix</label>
            <div class="col-sm-8">
                <input type="text" name="prefix" class="form-control" placeholder="Prefix">
            </div>

        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label required">Code</label>
            <div class="col-sm-8">
                <input type="text" name="code" class="form-control" placeholder="Code">
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
        <input type="hidden" name="courceId" value="-1">
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
                <li class="active" itemId="STUDENTS">
                    <a href="javascript:void(0);" onclick="onMainNavItemClick('STUDENTS')" title="Students">
                        Students
                    </a>
                </li>
                <li itemId="ADVISORS">
                    <a href="javascript:void(0);" onclick="onMainNavItemClick('ADVISORS')" title="Advisors">
                        Advisors
                    </a>
                </li>
                <li itemId="CONCENTRATIONS">
                    <a href="javascript:void(0);" onclick="onMainNavItemClick('CONCENTRATIONS')" title="Concentrations">
                        Concentrations
                    </a>
                </li>
                <li itemId="COURCES">
                    <a href="javascript:void(0);" onclick="onMainNavItemClick('COURCES')" title="Cources">
                        Cources
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
    var appManagerLytObj;
    var studentLytObj, advisorLytObj, courceLytObj, concentrationLytObj;
    var userRole = "${userRole}";

    if (!accessToken) {
        window.location.href = "<%=request.getContextPath()%>/resources/jsp/AppLogin.jsp";
    }
    function doOnLoad() {
        console.log(accessToken);
        console.log(userRole);
        appManagerLytObj = getMainLayoutObj();
        onMainNavItemClick("STUDENTS");
    }

</script>
</html>
