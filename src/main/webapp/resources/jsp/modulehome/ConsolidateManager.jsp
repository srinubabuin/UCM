<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Consolidate Manager</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="../../CSS/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
        <link href="../../CSS/tree/default/style.min.css" rel="stylesheet" media="screen">
        <link href="../../CSS/bootstraptable/bootstrap-table.css" rel="stylesheet" media="screen">
        <link href="../../CSS/bootstrapmodalbox/bootstrap-dialog.min.css" rel="stylesheet" media="screen">
        <link href="../../CSS/bootstraptimepicker/bootstrap-datepicker3.css" rel="stylesheet"  media="screen">        
        <link href="../../CSS/app/Ncm.css" rel="stylesheet">
        <link href="../../CSS/app/NcmBsCustommin.css" rel="stylesheet">
        <script src="../../JavaScript/jquery/jquery-2.1.4.min.js"></script>
        <script src="../../JavaScript/jquery/jquery.serializeObject.js"></script>
        <script src="../../JavaScript/app/consolidatemanager/ConsolidateManager.js"></script>        
        <script src="../../JavaScript/ncm/NCMUtil.js"></script>
        <script src="../../JavaScript/app/NCM.js"></script>        
        <script src="../../JavaScript/bootstrap/bootstrap.min.js" type="text/javascript"></script>
        <script src="../../JavaScript/tree/jstree.min.js" type="text/javascript"></script>
        <script src="../../JavaScript/bootstraptable/bootstrap-table.js" type="text/javascript"></script>
        <script src="../../JavaScript/bootstrapmodalbox/bootstrap-dialog.min.js" type="text/javascript"></script>
        <script src="../../JavaScript/bootstraptimepicker/bootstrap-datepicker.js" type="text/javascript"></script>
    </head>
    <body onload="doOnLoad()">

        <header class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#resourceManagerNavBar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>                    
                    <a class="navbar-brand" href="javascript:void(0);">NCM</a>
                </div>
                <nav id="resourceManagerNavBar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li>
                            <a href="javascript:void(0);" onclick="onMainNavItemClick('RESOURCEMANAGER')" title="Resource Manager">
                                <span class="glyphicon glyphicon-user"></span>
                            </a>
                        </li>
                        <li class="active">
                            <a href="javascript:void(0);" onclick="onMainNavItemClick('CONSOLIDATEMANGAER')" title="Consolidate Manager">
                                <span class="glyphicon glyphicon-book"></span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onclick="onMainNavItemClick('REPORTMANAGER')" title="Report Manager">
                                <span class="glyphicon glyphicon-dashboard"></span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" onclick="onMainNavItemClick('FILEMANAGER')" title="File Manager">
                                <span class="glyphicon glyphicon-folder-open"></span>
                            </a>
                        </li>

                        <!--                        <li class="active"><a href="javascript:void(0);" onclick="onResourceMangaerNavItemClick('USER')">Users</a></li>
                                                <li><a href="javascript:void(0);">Clients</a></li>
                                                <li><a href="javascript:void(0);">Categories</a></li>-->
                        <!--                        <li>
                                                    <a href="#"class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Groups<span class="caret"></span></a>
                                                    <ul class="dropdown-menu">
                                                        <li><a onclick="navAddGroupOnClick(this);" href="javascript:void(0);">Add Group</a></li>
                                                        <li><a onclick="navViewGroupOnClick(this);" href="javascript:void(0);">Modify/View Group</a></li>
                                                    </ul>
                                                </li>-->
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a href="javascript:void(0);" onclick="onMainNavItemClick('NOTIFICATIONS')" title="Notifications">
                                <span class="glyphicon glyphicon-bell"></span><!--glyphicon-bullhorn-->
                            </a>
                        </li>

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
        var consolidateManagerLytObj;
        var consolidateManagerTabbarObj;
        function doOnLoad() {
            consolidateManagerLytObj = getMainLayoutObj("CONSOLIDATEMANAGER");
            consolidateManagerTabbarObj = new loadConsolidateManagerLyt(consolidateManagerLytObj.domObj);
        }

    </script>
</html>
