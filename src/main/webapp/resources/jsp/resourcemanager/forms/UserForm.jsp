<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<fromdata>
    <c:choose>
        <c:when test="${formType eq 'ADDUSER'}">
            <form class="form-horizontal" method="post" autocomplete="off" name="ADDUSER">
                <div class="form-group">      
                    <label for="userName" class="control-label col-sm-2 labelleftalign required">User Id</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="userName" value="" autofocus="true"/>
                    </div>
                    <label for="userFullName" class="control-label col-sm-2 labelleftalign">Full Name</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="userFullName" />
                    </div>            
                </div>
                <div class="form-group">      
                    <label for="password" class="control-label col-sm-2 labelleftalign">Password</label>
                    <div class="col-sm-4">
                        <input type="password" class="form-control input-sm" name="password"  value=""/>
                    </div>          
                    <label for="email" class="control-label col-sm-2 labelleftalign">Email</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="email" />
                    </div>          
                </div>
                <div class="form-group">      
                    <label for="phone" class="control-label col-sm-2 labelleftalign">Phone</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="phone" />
                    </div>          
                    <label for="status" class="control-label col-sm-2 labelleftalign">Status</label>
                    <div class="col-sm-4">
                        <div class="checkbox">
                            <label><input type="checkbox" value="A" name="status" checked="checked"/></label>
                        </div>
                    </div>          
                </div>
                <div class="form-group">      
                    <label for="userDescription" class="control-label col-sm-2 labelleftalign">Description </label>
                    <div class="col-sm-10">
                        <textarea class="form-control input-sm" rows="5" name="userDescription"> </textarea>
                    </div>          
                </div>
                <div class="form-group">      
                    <label for="address" class="control-label col-sm-2 labelleftalign">Address </label>
                    <div class="col-sm-10">
                        <textarea class="form-control input-sm" rows="5" name="address"> </textarea>
                    </div>          
                </div>
                <div class="form-group">      
                    <label for="defaultModule" class="control-label col-sm-2 labelleftalign">Module</label>
                    <div class="col-sm-4">
                        <select class="form-control" name="defaultModule">
                            <option value="select" selected="true">Select Module</option>
                            <c:forEach var="module" items="${modules}">
                                <option value="${module.key}">${module.value}</option>
                            </c:forEach>
                        </select>
                        <!--<input type="password" class="form-control input-sm" name="defaultModule" />-->
                    </div>          
                    <label for="defaultRole" class="control-label col-sm-2 labelleftalign">Role</label>
                    <div class="col-sm-4">
                        <select class="form-control" name="defaultRole">
                            <option value="select" selected="true">Select Role</option>
                            <c:forEach var="role" items="${roles}">
                                <option value="${role.key}">${role.value}</option>
                            </c:forEach>
                        </select>
                        <!--<input type="text" class="form-control input-sm" name="defaultRole" />-->
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
        <c:when test="${formType eq 'EDITUSER'}">
            <form class="form-horizontal" method="post" autocomplete="off" name="EDITUSER">
                <div class="form-group">      
                    <label for="userName" class="control-label col-sm-2 labelleftalign">User Id</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="userName" value="${userDetails.userName}" readonly="readonly"/>
                    </div>
                    <label for="userFullName" class="control-label col-sm-2 labelleftalign">Full Name</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="userFullName" value="${userDetails.userFullName}"/>
                    </div>            
                </div>
                <div class="form-group">      
                    <label for="password" class="control-label col-sm-2 labelleftalign">Password</label>
                    <div class="col-sm-4">
                        <input type="password" class="form-control input-sm" name="password"  value="${userDetails.password}"/>
                    </div>          
                    <label for="email" class="control-label col-sm-2 labelleftalign">Email</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="email" value="${userDetails.email}" />
                    </div>          
                </div>
                <div class="form-group">      
                    <label for="phone" class="control-label col-sm-2 labelleftalign">Phone</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="phone" value="${userDetails.phone}"/>
                    </div>          
                    <label for="status" class="control-label col-sm-2 labelleftalign">Status</label>
                    <div class="col-sm-4">
                        <div class="checkbox">
                            <label><input type="checkbox" value="A" name="status" checked="checked"/></label>
                        </div>
                    </div>          
                </div>
                <div class="form-group">      
                    <label for="userDescription" class="control-label col-sm-2 labelleftalign">Description</label>
                    <div class="col-sm-10">
                        <textarea class="form-control input-sm" rows="5" name="userDescription">${userDetails.userDescription} </textarea>
                    </div>          
                </div>
                <div class="form-group">      
                    <label for="address" class="control-label col-sm-2 labelleftalign">Address</label>
                    <div class="col-sm-10">
                        <textarea class="form-control input-sm" rows="5" name="address">${userDetails.address} </textarea>
                    </div>          
                </div>
                <div class="form-group">      
                    <label for="defaultModule" class="control-label col-sm-2 labelleftalign">Module</label>
                    <div class="col-sm-4">
                        <select class="form-control" name="defaultModule">
                            <option value="select" selected="true">Select Module</option>
                            <c:forEach var="module" items="${modules}">
                                <option value="${module.key}" <c:if test="${userDetails.defaultModule eq module.key}">selected="selected"</c:if>>${module.value}</option>
                            </c:forEach>
                        </select>
                    </div>          
                    <label for="defaultRole" class="control-label col-sm-2 labelleftalign">Role</label>
                    <div class="col-sm-4">
                        <select class="form-control" name="defaultRole">
                            <option value="select" selected="true">Select Role</option>
                            <c:forEach var="role" items="${roles}">
                                <option value="${role.key}" <c:if test="${userDetails.defaultRole eq role.key}">selected="selected"</c:if>>${role.value}</option>
                            </c:forEach>
                        </select>
                    </div>          
                </div>                    
                <input type="hidden" class="form-control input-sm" name="userId" value="${userDetails.userId}"/>
                <div class="form-group"> 
                    <div class="col-sm-12 text-center">
                        <button name="submitBtn" type="button" class="btn btn-avg btn-success">Submit</button>
                        <button name="clearBtn" type="button" class="btn btn-avg btn-info">Clear</button>
                        <button name="cancelBtn" type="button" class="btn btn-avg btn-warning">Cancel</button>
                    </div>
                </div>    
            </form> 
        </c:when>
        <c:when test="${formType eq 'VIEWUSER'}">
            <form class="form-horizontal" method="post" name="VIEWUSER">
                <div class="form-group">      
                    <label for="userName" class="control-label col-sm-2 labelleftalign">User Id</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="userName" value="${userDetails.userName}" readonly="readonly"/>
                    </div>
                    <label for="fullName" class="control-label col-sm-2 labelleftalign">Full Name</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="fullName" value="${userDetails.userFullName}" readonly="readonly"/>
                    </div>            
                </div>
                <div class="form-group">      
                    <label for="password" class="control-label col-sm-2 labelleftalign">Password</label>
                    <div class="col-sm-4">
                        <input type="password" class="form-control input-sm" name="password"  value="${userDetails.password}" readonly="readonly"/>
                    </div>          
                    <label for="email" class="control-label col-sm-2 labelleftalign">Email</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="email" value="${userDetails.email}" readonly="readonly"/>
                    </div>          
                </div>
                <div class="form-group">      
                    <label for="phone" class="control-label col-sm-2 labelleftalign">Phone</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="phone" value="${userDetails.phone}" readonly="readonly"/>
                    </div>          
                    <label for="status" class="control-label col-sm-2 labelleftalign">Status</label>
                    <div class="col-sm-4">
                        <div class="checkbox">
                            <label><input type="checkbox" value="A" name="status" checked="checked" disabled="disabled"/></label>
                        </div>
                    </div>          
                </div>
                <div class="form-group">      
                    <label for="userDescription" class="control-label col-sm-2 labelleftalign">Description</label>
                    <div class="col-sm-10">
                        <textarea class="form-control input-sm" rows="5" name="userDescription" readonly="readonly">${userDetails.userDescription} </textarea>
                    </div>          
                </div>
                <div class="form-group">      
                    <label for="address" class="control-label col-sm-2 labelleftalign">Address</label>
                    <div class="col-sm-10">
                        <textarea class="form-control input-sm" rows="5" name="address" readonly="readonly">${userDetails.address} </textarea>
                    </div>          
                </div>
                <div class="form-group">      
                    <label for="defaultModule" class="control-label col-sm-2 labelleftalign">Module</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="defaultModule" value="${userDetails.defaultModuleName}" readonly="readonly"/>
                    </div>          
                    <label for="defaultRole" class="control-label col-sm-2 labelleftalign">Role</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="defaultRole" value="${userDetails.defaultRoleName}" readonly="readonly"/>
                    </div>          
                </div>                    

                <div class="form-group">      
                    <label for="createdBy" class="control-label col-sm-2 labelleftalign">Created By</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="createdBy" value="${userDetails.createdBy}" readonly="readonly"/>
                    </div>          
                    <label for="createdDatetime" class="control-label col-sm-2 labelleftalign">Created Date</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="createdDatetime" value="${userDetails.createdDatetime}" readonly="readonly"/>
                    </div>          
                </div>                                        
                <div class="form-group">      
                    <label for="modifiedBy" class="control-label col-sm-2 labelleftalign">Modified By</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="modifiedBy" value="${userDetails.modifiedBy}" readonly="readonly"/>
                    </div>          
                    <label for="modifiedDatetime" class="control-label col-sm-2 labelleftalign">Modified Date</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control input-sm" name="modifiedDatetime" value="${userDetails.modifiedDatetime}" readonly="readonly"/>
                    </div>          
                </div>                                                            
                <input type="hidden" class="form-control input-sm" name="userId" value="${userDetails.userId}"/>
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