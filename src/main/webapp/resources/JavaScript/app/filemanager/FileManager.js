function loadFileManagerLayout(cellObj) {
    this.confObj = cellObj;
    this.nodeId;
    this.rootPath;
    this.lytConfObj = {
        "pattern": "2U",
        "parent": cellObj,
        "cells": {
            "a": {
                "className": "col-md-2"
            },
            "b": {
                "className": "col-md-10"
            }
        }
    };
    this.lytObj = new appLayout(this.lytConfObj);
    this.fileManaterTreeCellObj = this.lytObj.cells.a.cont;
    this.treeObj = $(this.fileManaterTreeCellObj);
    this.gridObj;
    this.fileManagerDetailsCellObj = this.lytObj.cells.b.cont;
    this.userDetailsObj;
    this.attachFileManagerTree = function () {
        var _this = this;
        _this.treeObj.jstree({'core': {
                "check_callback": true,
                "multiple": false
//            "themes": {"icons": false},
            }});
        _this.loadFileManagerRoot();
        _this.treeObj.on('changed.jstree', function (e, data) {
            _this.onFileManagerTreeSelect(e, data);
        });
    };

    this.loadFileManagerRoot = function () {
        var _this = this;
        _this.treeObj.jstree().deselect_node(_this.treeObj.jstree().get_selected(true), true);
        _this.treeObj.jstree().delete_node(_this.treeObj.find('li'));
        var treeData = getFMRootTreeData("");
        treeData.li_attr["nodeType"] = "root";
        _this.treeObj.jstree().create_node("#", treeData, "", false, false);
    };

    this.loadFileManagerTreeData = function (fileName) {
        var _this = this;
        var childEls = _this.treeObj.jstree().get_children_dom(_this.nodeId);
        for (var itemInd = 0; itemInd < childEls.length; itemInd++) {
            _this.treeObj.jstree().delete_node(childEls[itemInd]);
        }
        var treeData = getFMTreeData(fileName);
        for (var itemInd = 0; itemInd < treeData.length; itemInd++) {
            _this.treeObj.jstree().create_node(_this.nodeId, treeData[itemInd], "last", false, false);
        }
        _this.treeObj.jstree().get_selected(true)[0].li_attr["isLoaded"] = true;
        _this.treeObj.jstree().open_node(_this.nodeId);
    };
    this.onFileManagerTreeSelect = function (ev, data) {
        var _this = this;
        if (data.selected.length > 1) {
            return;
        }
        var itemObj = data.instance.get_node(data.selected[0]);
        var nodeType = itemObj.li_attr.nodeType;
        var isItemLoaded = itemObj.li_attr["isLoaded"];
        var nodeType = itemObj.li_attr["nodeType"];
        _this.nodeId = itemObj.id;
        if (nodeType === "root") {
            if (!isItemLoaded) {
                loadFileManagerTreeData("");
            }
            _this.loadFileManagerGridData("");
        } else {
            loadFileManagerTreeData(_this.nodeId);
            _this.loadFileManagerGridData(_this.nodeId);
        }
    };
    this.initFileManagerDetailsGrid = function () {
        var _this = this;
        var toolbarObj = _this.getFileManagerToolbar();
        var fileManagerGridConfObj = {
            "parent": _this.fileManagerDetailsCellObj,
            "options": getFileManagerGridConfObj(toolbarObj)
        };
        var fileManagerGridWrapper = new createBootstrapTable(fileManagerGridConfObj);
        _this.gridObj = $(fileManagerGridWrapper.baseObj);
        _this.gridObj.bootstrapTable({
            "height": $(_this.fileManagerDetailsCellObj).height() - 5,
            data: []
        });
        $(_this.fileManagerDetailsCellObj).find("button[name=refreshFiles]").click(function () {

        });

        $(_this.fileManagerDetailsCellObj).find("button[name=downloadFiles]").click(function () {
            var gridData = _this.gridObj.bootstrapTable("getSelections");
            var rowObj, checkedIds = [];
            var notAllowedExt = ["dir", ""];
            for (var rowInd = 0; rowInd < gridData.length; rowInd++) {
                rowObj = gridData[rowInd];
                if (rowObj["fmGridCkBox"] && !notAllowedExt.indexOf(rowObj["type"]) > -1) {
                    checkedIds.push(rowObj["fileFullName"]);
                }
            }
            window.location = appContextPath + "/ncm/FileManager/doDownload?filePath=" + encodeURIComponent(_this.nodeId) + "&fileNames=" +
                    encodeURIComponent(JSON.stringify(checkedIds)) + "&downloadType=" + "ALL";
            _this.clearFMGridCheckboxes();
        });

//        _this.loadFileManagerGridData();
    };

    this.clearFMGridCheckboxes = function () {
        var _this = this;
        _this.gridObj.bootstrapTable("uncheckAll");
    };

    this.getFileManagerToolbar = function () {
        var toolbarObj = document.createElement("div");
        toolbarObj.role = "toolbar";
        var refreshButtonObj = document.createElement("button");
        refreshButtonObj.name = "refreshFiles";
        refreshButtonObj.title = "Refresh";
        refreshButtonObj.type = "button";
        refreshButtonObj.className = "btn btn-default";
        refreshButtonObj.style.padding = "3px 6px";
        refreshButtonObj.style["margin-right"] = "5px";
        refreshButtonObj.innerHTML = '<i class="glyphicon glyphicon-refresh icon-refresh"></i>';
        toolbarObj.appendChild(refreshButtonObj);
        var downloadButtonObj = document.createElement("button");
        downloadButtonObj.name = "downloadFiles";
        downloadButtonObj.title = "Download Selected";
        downloadButtonObj.type = "button";
        downloadButtonObj.className = "btn btn-default";
        downloadButtonObj.style.padding = "3px 6px";
        refreshButtonObj.style["margin-right"] = "5px";
        downloadButtonObj.innerHTML = '<i class="glyphicon glyphicon-download icon-download"></i>';
        toolbarObj.appendChild(refreshButtonObj);
        toolbarObj.appendChild(downloadButtonObj);
        return toolbarObj;
    };
    this.loadFileManagerGridData = function (fileName) {
        var _this = this;
        _this.gridObj.bootstrapTable("showLoading");
        var gridData = getFMGridData(fileName);
        _this.gridObj.bootstrapTable("load", gridData);
        _this.gridObj.bootstrapTable("hideLoading");
    };

    this.attachFileManagerTree();
    this.initFileManagerDetailsGrid();
    return this;
}

function getFMRootPath() {
    return appAjaxSync(appContextPath + "/ncm/FileManager/getFileManagerRootDirectory", {}, "XML");
}

function getFMRootTreeData(fileName) {
    var fileDetails = getFMFileDetails(fileName);
    return getJSTreeData(fileDetails);
}

function getFMTreeData(fileName) {
    var fileDetails = getFMInnerFiles(fileName, true);
    return getJSTreeData(fileDetails);
}

function getFMGridData(fileName) {
    var fileDetails = getFMInnerFiles(fileName, false);
    return getFMGridAPIData(fileDetails);
}

function getFMFileDetails(fileName) {
    return appAjaxSync(appContextPath + "/ncm/FileManager/getFileDetails?filePath=" + encodeURIComponent(fileName), {}, "JSON");
}

function getFMInnerFiles(fileName, loadDirectories) {
    return appAjaxSync(appContextPath + "/ncm/FileManager/loadInnerFiles?filePath=" + encodeURIComponent(fileName) + "&loadDirectories=" + loadDirectories, {}, "JSON");
}

function getFMGridAPIData(fileDetails) {
    var gridData = [];
    if (fileDetails === null || fileDetails === undefined || fileDetails === "") {
        return gridData;
    }
    if (fileDetails.constructor === Object) {
        gridData.push(constructFMGridAPIData(fileDetails));
    } else if (fileDetails.constructor === Array) {
        for (var fileIndex = 0; fileIndex < fileDetails.length; fileIndex++) {
            gridData.push(constructFMGridAPIData(fileDetails[fileIndex]));
        }
    }
    if (typeof gridData === "undefined") {
        gridData = "";
    }
    return gridData;
}

function getJSTreeData(fileDetails) {
    var treeData;
    if (fileDetails === null || fileDetails === undefined || fileDetails === "") {
        return "";
    }
    if (fileDetails.constructor === Object) {
        treeData = constructJSTreeData(fileDetails);
    } else if (fileDetails.constructor === Array) {
        treeData = [];
        for (var fileIndex = 0; fileIndex < fileDetails.length; fileIndex++) {
            treeData.push(constructJSTreeData(fileDetails[fileIndex]));
        }
    }
    if (typeof treeData === "undefined") {
        treeData = "";
    }
    return treeData;
}

function constructJSTreeData(fileDetails) {
    var treeNodeTemp = new getTreeNodeWrapper().treeNodeWrapper;
    var nodeId = fileDetails["filePath"].replace(fileManagerRootPath, "");

    treeNodeTemp.id = nodeId + fileDetails["fileFullName"];
    treeNodeTemp.text = fileDetails["fileFullName"];
    treeNodeTemp.a_attr["nodeDetails"] = fileDetails;
    return treeNodeTemp;
}

function constructFMGridAPIData(fileDetails) {
    var gridRowObj = new getFMGridAPIRowWrapper().fmGridAPIRowWrapper;
    var nodeId = fileDetails["filePath"].replace(fileManagerRootPath, "");
    gridRowObj["rowId"] = nodeId + fileDetails["fileFullName"];
    gridRowObj["name"] = fileDetails["fileName"];
    gridRowObj["type"] = fileDetails["fileExt"];
    gridRowObj["createdBy"] = "";//fileDetails["createdBy"];
    gridRowObj["createdDate"] = fileDetails["createdDate"];
    gridRowObj["size"] = fileDetails["fileSize"];
    gridRowObj["fileFullName"] = fileDetails["fileFullName"];
    gridRowObj["info"] = "<p data-placement='top' data-toggle='tooltip' title='Info'><a href='javascript:void(0);' onclick='onFMGridOperaionsClick(\"INFO\"," + JSON.stringify(gridRowObj["rowId"]) + "," + JSON.stringify(fileDetails) + ");' style='cursor: pointer;'><span class='glyphicon glyphicon-info-sign'></a></button></p>";//"INFO";
    gridRowObj["download"] = "<p data-placement='top' data-toggle='tooltip' title='Download'><a href='javascript:void(0);' onclick='onFMGridOperaionsClick(\"DOWNLOAD\"," + JSON.stringify(gridRowObj["rowId"]) + "," + JSON.stringify(fileDetails) + ");' style='cursor: pointer;' ><span class='glyphicon glyphicon-download'></span></a></p>";//"DOWNLOAD";
    gridRowObj["fileDetails"] = fileDetails;
    return gridRowObj;
}

var getFMGridAPIRowWrapper = function () {
    this.fmGridAPIRowWrapper = {
        "checkbox": false,
        "rowId": "",
        "name": "",
        "type": "",
        "createdBy": "",
        "createdDate": "",
        "size": "",
        "info": "",
        "download": ""
    };
    return this;
};

function getFileManagerGridConfObj(toolbarObj) {
    var toolbar = toolbarObj.outerHTML;
    var fileManagerDetailsConfobj = {
        tableAttributes: {"data-mobile-responsive": "true", "data-show-header": "true", "data-toolbar": toolbar,
            "data-search": "true", "data-unique-id": "rowId", "data-select-item-name": "fmGridCheckboxName"},
        columns: [{
                label: "",
                attributes: {
                    "data-field": "fmGridCkBox",
                    "data-align": "center",
                    "data-checkbox": true,
                    "data-formatter": "fmGridCkBoxFormatter"
                }
            }, {
                label: "rowId",
                attributes: {
                    "data-field": "rowId",
                    "data-switchable": false,
                    "data-visible": false
                }
            }, {
                label: "Name",
                attributes: {
                    "data-field": "name",
                    "data-align": "left"
                }
            }, {
                label: "Type",
                attributes: {
                    "data-field": "type",
                    "data-align": "left"
                }
            }, {
                label: "Created Date",
                attributes: {
                    "data-field": "createdDate",
                    "data-align": "left"
                }
            }, {
                label: "Size",
                attributes: {
                    "data-field": "size",
                    "data-align": "left"
                }
            }, {
                label: "",
                attributes: {
                    "data-field": "info",
                    "data-align": "center"
                }
            }, {
                label: "",
                attributes: {
                    "data-field": "download",
                    "data-align": "center"
                }
            }
        ]
    };
    return fileManagerDetailsConfobj;
}

function fmGridCkBoxFormatter(value, row, index) {
    var notAllowedExt = ["dir", ""];
    if (notAllowedExt.indexOf(row["type"]) > -1) {
        return {
            disabled: true
        };
    }
    return value;
}

function onFMGridOperaionsClick(itemId, rowId, itemDetails) {
    if (itemId === "INFO") {

    } else if (itemId === "DOWNLOAD") {
        var notAllowedExt = ["dir", ""];
        if (notAllowedExt.indexOf(itemDetails["fileExt"]) > -1) {
            var confObj = {"type": "warning",
                "title": "Download not possible",
                "message": "Download not possible for this type."
            };
            showDialog(confObj);
            return;
        }
        window.location = appContextPath + "/ncm/FileManager/doDownload?filePath=" + encodeURIComponent(rowId);
    }
}
