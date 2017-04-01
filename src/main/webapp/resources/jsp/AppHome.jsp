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

<header class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#resourceManagerNavBar" aria-expanded="false" aria-controls="navbar">
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
