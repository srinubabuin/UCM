<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<fromdata>
    <c:choose>
        <c:when test="${formType eq 'ASSIGNACCOUNTS'}">
            <form class="form-horizontal" action="${pageContext.request.contextPath}/ncm/FileUpload/uploadDocument" method="post" autocomplete="off" name="ASSIGNACCOUNTS" enctype="multipart/form-data">
                <div class="form-group">      
                    <label for="clientName" class="control-label col-sm-2 labelleftalign required">Client Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control input-sm" name="clientName" value="${clientName}" readonly="readonly"/>
                    </div>
                </div>
                <div class="form-group">      
                    <label for="categoryName" class="control-label col-sm-2 labelleftalign required">File</label>
                    <div class="col-sm-10">
                        <input type="file" class="form-control input-sm"  name="consolidatedFileObj"/>
                    </div>
                </div>                    
                <div class="form-group">      
                    <label for="status" class="control-label col-sm-2 labelleftalign">Status</label>
                    <div class="col-sm-10">
                        <div class="checkbox">
                            <label><input type="checkbox" value="A" name="status" checked="checked"/></label>
                        </div>
                    </div>          
                </div>                    
                <div class="form-group">      
                    <label for="categoryDescription" class="control-label col-sm-2 labelleftalign">Description </label>
                    <div class="col-sm-10">
                        <textarea class="form-control input-sm" rows="5" name="documentDescription"> </textarea>
                    </div>          
                </div>
                <div class="form-group"> 
                    <div class="col-sm-12 text-center">
                        <button name="submitBtn" type="button" class="btn btn-avg btn-success">Submit</button>
                        <button name="clearBtn" type="button" class="btn btn-avg btn-info">Clear</button>
                        <button name="cancelBtn" type="button" class="btn btn-avg btn-warning">Cancel</button>
                    </div>
                </div>    
            </form> 
        </c:when>
    </c:choose>
</fromdata>