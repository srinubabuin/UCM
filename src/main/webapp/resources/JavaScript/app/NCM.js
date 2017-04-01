function onMainNavItemClick(itemId) {
    if (itemId === "RESOURCEMANAGER") {
        document.location.href = appContextPath + "/ncm/ResourceManager/resourceManager";
    } else if (itemId === "CONSOLIDATEMANGAER") {
        document.location.href = appContextPath + "/ncm/ConsolidateManager/consolidateManager";
    } else if (itemId === "REPORTMANAGER") {
        document.location.href = appContextPath + "/ncm/ReportManager/reportManager";
    } else if (itemId === "FILEMANAGER") {
        document.location.href = appContextPath + "/ncm/FileManager/fileManager";
    } else if (itemId === "NOTIFICATIONS") {

    } else if (itemId === "LOGOUT") {
        doLogout();
    }
}