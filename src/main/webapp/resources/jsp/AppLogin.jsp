<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1" %>
<%--<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>--%>
<%@page session="true" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>UCM Login In</title>
    <link href="<%=request.getContextPath()%>/resources/CSS/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/CSS/loginpage/LoginPage.css" rel="stylesheet">
    <script src="<%=request.getContextPath()%>/resources/JavaScript/jquery/jquery-2.1.4.min.js"
            type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/resources/JavaScript/jquery/jquery.serializeObject.js"
            type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/resources/JavaScript/bootstrap/bootstrap.min.js"
            type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/resources/JavaScript/app/AppUtil.js" type="text/javascript"></script>
    <%
        String accessToken = (String) session.getAttribute("accessToken");
    %>
</head>
<body>
<div class="container">
    <div class="wrapper">

        <!--<form action="/EDIPaged/ediAuth/doLogin" method="post" name="ediLoginForm" class="form-signin">-->
        <form action="" method="post" name="loginForm" onsubmit="javascript:doLogin();return false;" id="loginForm" class="form-signin">
            <h3 class="form-signin-heading">UCM</h3>

            <input type="text" class="form-control" name="username"  placeholder="Login Id" autofocus=""/>
            <input type="password" class="form-control" name="password" placeholder="Password"/>
            <button class="btn btn-lg btn-primary btn-block" onclick="doLogin()" name="Submit" value="Login"
                    type="submit">Login
            </button>
            <span id="errorMessage" style="color: red;"></span>
        </form>
    </div>
</div>
<script>
    var appContextPath = "${pageContext.request.contextPath}";
    var accessToken = "${accessToken}"
    if (accessToken) {
        window.location.href = appContextPath + "/resources/jsp/DirectorHome.jsp";
    }

    function doLogin(e) {
        var formData = getFormData("loginForm", "object");
        $.ajax({
            url: appContextPath + "/rest/auth/login?ts=" + Date.now(),
            type: "POST",
            data: JSON.stringify({
                "loginId": formData.username,
                "password": formData.password
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function (response) {
                if (response.role == 'ADMIN') {
                    window.location.href = appContextPath + "/resources/jsp/DirectorHome.jsp";
                } else {
                    window.location.href = appContextPath + "/console.jsp";
                }
            },
            error: function (xhr) {
                $('span#errorMessage').html("Invalid user. Please check your login id and password");
            }
        });
        return false;
    }
</script>
</body>
</html>
