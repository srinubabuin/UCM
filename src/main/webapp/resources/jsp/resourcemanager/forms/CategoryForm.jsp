<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<fromdata>
    <c:choose>
        <c:when test="${formType eq 'ADDCATEGORY'}">
            <form class="form-horizontal" method="post" autocomplete="off" name="ADDCATEGORY">
                <div class="form-group">      
                    <label for="clientName" class="control-label col-sm-2 labelleftalign required">Client Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control input-sm" name="clientName" value="${clientName}" readonly="readonly"/>
                    </div>
                </div>
                <div class="form-group">      
                    <label for="categoryName" class="control-label col-sm-2 labelleftalign required">Category Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control input-sm" name="categoryName" autofocus="true"/>
                    </div>
                </div>                    
                <div class="form-group">      
                    <label for="categoryFullName" class="control-label col-sm-2 labelleftalign">Category Full Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control input-sm" name="categoryFullName" />
                    </div>            
                </div>
                <div class="form-group">      
                    <label for="combineCodes" class="control-label col-sm-2 labelleftalign">Combine Codes</label>
                    <div class="col-sm-10">
                        <div class="checkbox">
                            <label><input type="checkbox" value="N" name="combineCodes" checked="false"/></label>
                        </div>
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
                        <textarea class="form-control input-sm" rows="5" name="categoryDescription"> </textarea>
                    </div>          
                </div>
                <input type="hidden" class="form-control input-sm" name="clientId" value="${clientId}"/>                    
                <div class="form-group"> 
                    <div class="col-sm-12 text-center">
                        <button name="submitBtn" type="button" class="btn btn-avg btn-success">Submit</button>
                        <button name="clearBtn" type="button" class="btn btn-avg btn-info">Clear</button>
                        <button name="cancelBtn" type="button" class="btn btn-avg btn-warning">Cancel</button>
                    </div>
                </div>    
            </form> 
        </c:when>
        <c:when test="${formType eq 'EDITCATEGORY'}">
            <form class="form-horizontal" method="post" autocomplete="off" name="EDITCATEGORY">
                <div class="form-group">      
                    <label for="clientName" class="control-label col-sm-2 labelleftalign required">Client Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control input-sm" name="clientName" value="${categoryDetails.clientName}" readonly="readonly"/>
                    </div>
                </div>
                <div class="form-group">      
                    <label for="categoryName" class="control-label col-sm-2 labelleftalign required">Category Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control input-sm" name="categoryName" value="${categoryDetails.categoryName}" autofocus="true"/>
                    </div>
                </div>                    
                <div class="form-group">      
                    <label for="categoryFullName" class="control-label col-sm-2 labelleftalign">Category Full Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control input-sm" name="categoryFullName" value="${categoryDetails.categoryFullName}"/>
                    </div>            
                </div>
                <div class="form-group">      
                    <label for="combineCodes" class="control-label col-sm-2 labelleftalign">Combine Codes</label>
                    <div class="col-sm-10">
                        <div class="checkbox">
                            <label><input type="checkbox" value="N" name="combineCodes" checked="false"/></label>
                        </div>
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
                        <textarea class="form-control input-sm" rows="5" name="categoryDescription">${categoryDetails.categoryDescription} </textarea>
                    </div>          
                </div>
                <input type="hidden" class="form-control input-sm" name="clientId" value="${categoryDetails.clientId}"/>
                <div class="form-group"> 
                    <div class="col-sm-12 text-center">
                        <button name="submitBtn" type="button" class="btn btn-avg btn-success">Submit</button>
                        <button name="clearBtn" type="button" class="btn btn-avg btn-info">Clear</button>
                        <button name="cancelBtn" type="button" class="btn btn-avg btn-warning">Cancel</button>
                    </div>
                </div>    
            </form> 
        </c:when>
        <c:when test="${formType eq 'VIEWCATEGORY'}">
            <form class="form-horizontal" method="post" autocomplete="off" name="VIEWCATEGORY">
                <div class="form-group">      
                    <label for="clientName" class="control-label col-sm-2 labelleftalign">Client Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control input-sm" name="clientName" value="${categoryDetails.clientName}" readonly="readonly"/>
                    </div>
                </div>
                <div class="form-group">      
                    <label for="categoryName" class="control-label col-sm-2 labelleftalign">Category Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control input-sm" name="categoryName" value="${categoryDetails.categoryName}" readonly="readonly"/>
                    </div>
                </div>                    
                <div class="form-group">      
                    <label for="categoryFullName" class="control-label col-sm-2 labelleftalign">Category Full Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control input-sm" name="categoryFullName" value="${categoryDetails.categoryFullName}" readonly="readonly"/>
                    </div>            
                </div>
                <div class="form-group">      
                    <label for="combineCodes" class="control-label col-sm-2 labelleftalign">Combine Codes</label>
                    <div class="col-sm-10">
                        <div class="checkbox">
                            <label><input type="checkbox" value="N" name="combineCodes" checked="false" disabled="disabled"/></label>
                        </div>
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
                    <label for="categoryDescription" class="control-label col-sm-2 labelleftalign">Description </label>
                    <div class="col-sm-10">
                        <textarea class="form-control input-sm" rows="5" name="categoryDescription" readonly="readonly">${categoryDetails.categoryDescription} </textarea>
                    </div>          
                </div>
                <div class="form-group">      
                    <label for="createdBy" class="control-label col-sm-2 labelleftalign">Created By</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="createdBy" value="${categoryDetails.createdBy}" readonly="readonly"/>
                    </div>          
                    <label for="createdDatetime" class="control-label col-sm-2 labelleftalign">Created Date</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="createdDatetime" value="${categoryDetails.createdDatetime}" readonly="readonly"/>
                    </div>          
                </div>                                        
                <div class="form-group">      
                    <label for="modifiedBy" class="control-label col-sm-2 labelleftalign">Modified By</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="modifiedBy" value="${categoryDetails.modifiedBy}" readonly="readonly"/>
                    </div>          
                    <label for="modifiedDatetime" class="control-label col-sm-2 labelleftalign">Modified Date</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="modifiedDatetime" value="${categoryDetails.modifiedDatetime}" readonly="readonly"/>
                    </div>          
                </div>                    
                <input type="hidden" class="form-control input-sm" name="clientId" value="${categoryDetails.clientId}"/>
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