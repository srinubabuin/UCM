<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<fromdata>
    <c:choose>
        <c:when test="${formType eq 'ADDCLIENT'}">
            <form class="form-horizontal" method="post" autocomplete="off" name="ADDCLIENT">
                <div class="form-group">      
                    <label for="clientName" class="control-label col-sm-2 labelleftalign required">Client Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control input-sm" name="clientName" value="" autofocus="true"/>
                    </div>
                </div>
                <div class="form-group">      
                    <label for="clientFullName" class="control-label col-sm-2 labelleftalign">Client Full Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control input-sm" name="clientFullName" />
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
                    <label for="clientDescription" class="control-label col-sm-2 labelleftalign">Description </label>
                    <div class="col-sm-10">
                        <textarea class="form-control input-sm" rows="5" name="clientDescription"> </textarea>
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
        <c:when test="${formType eq 'EDITCLIENT'}">
            <form class="form-horizontal" method="post" autocomplete="off" name="EDITCLIENT">
                <div class="form-group">      
                    <label for="clientName" class="control-label col-sm-2 labelleftalign required">Client Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control input-sm" name="clientName" value="${clientDetails.clientName}" autofocus="true" />
                    </div>
                </div>
                <div class="form-group">      
                    <label for="clientFullName" class="control-label col-sm-2 labelleftalign">Client Full Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control input-sm" name="clientFullName" value="${clientDetails.clientFullName}"/>
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
                    <label for="clientDescription" class="control-label col-sm-2 labelleftalign">Description </label>
                    <div class="col-sm-10">
                        <textarea class="form-control input-sm" rows="5" name="clientDescription">${clientDetails.clientDescription} </textarea>
                    </div>          
                </div>
                <input type="hidden" class="form-control input-sm" name="clientId" value="${clientDetails.clientId}"/>
                <div class="form-group"> 
                    <div class="col-sm-12 text-center">
                        <button name="submitBtn" type="button" class="btn btn-avg btn-success">Submit</button>
                        <button name="clearBtn" type="button" class="btn btn-avg btn-info">Clear</button>
                        <button name="cancelBtn" type="button" class="btn btn-avg btn-warning">Cancel</button>
                    </div>
                </div>    
            </form> 
        </c:when>
        <c:when test="${formType eq 'VIEWCLIENT'}">
            <form class="form-horizontal" method="post" name="VIEWCLIENT">
                <div class="form-group">      
                    <label for="clientName" class="control-label col-sm-2 labelleftalign required">Client Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control input-sm" name="clientName" value="${clientDetails.clientName}" readonly="readonly"/>
                    </div>
                </div>
                <div class="form-group">      
                    <label for="clientFullName" class="control-label col-sm-2 labelleftalign">Client Full Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control input-sm" name="clientFullName" value="${clientDetails.clientFullName}" readonly="readonly"/>
                    </div>            
                </div>
                <div class="form-group">      
                    <label for="status" class="control-label col-sm-2 labelleftalign">Status</label>
                    <div class="col-sm-10">
                        <div class="checkbox">
                            <label><input type="checkbox" value="A" name="status" checked="checked" disabled="disabled"/></label>
                        </div>
                    </div>          
                </div>
                <div class="form-group">      
                    <label for="clientDescription" class="control-label col-sm-2 labelleftalign">Description </label>
                    <div class="col-sm-10">
                        <textarea class="form-control input-sm" rows="5" name="clientDescription" readonly="readonly">${clientDetails.clientDescription} </textarea>
                    </div>          
                </div>
                <div class="form-group">      
                    <label for="createdBy" class="control-label col-sm-2 labelleftalign">Created By</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="createdBy" value="${clientDetails.createdBy}" readonly="readonly"/>
                    </div>          
                    <label for="createdDatetime" class="control-label col-sm-2 labelleftalign">Created Date</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="createdDatetime" value="${clientDetails.createdDatetime}" readonly="readonly"/>
                    </div>          
                </div>                                        
                <div class="form-group">      
                    <label for="modifiedBy" class="control-label col-sm-2 labelleftalign">Modified By</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="modifiedBy" value="${clientDetails.modifiedBy}" readonly="readonly"/>
                    </div>          
                    <label for="modifiedDatetime" class="control-label col-sm-2 labelleftalign">Modified Date</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="modifiedDatetime" value="${clientDetails.modifiedDatetime}" readonly="readonly"/>
                    </div>          
                </div>              
                <input type="hidden" class="form-control input-sm" name="clientId" value="${clientDetails.clientId}"/>
                <div class="form-group"> 
                    <div class="col-sm-12 text-center">
                        <button name="editBtn" type="button" class="btn btn-avg btn-success">Edit</button>
                        <button name="deleteBtn" type="button" class="btn btn-avg btn-danger">Delete</button>
                    </div>
                </div>    
            </form> 
        </c:when>
    </c:choose>
</fromdata>