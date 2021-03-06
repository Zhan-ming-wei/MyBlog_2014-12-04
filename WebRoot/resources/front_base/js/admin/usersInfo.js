$(function(){
	
	/***
	 * 已知Bug：
	 * 删除完毕立即显示。
	 * 编辑时，下方按钮标记将改为保存,点span就显示text,即为可编辑,编辑完保存。
	 * *详情->下方保存按钮改为关闭,单击span显示当前span所对应的text可编辑>编辑完毕,失去焦点自动保存，将当前改好的text的值传给span,显示span。
	 * x号关闭还原。
	 * 分页查询时间未显示。
	 * 将查出来为null的都替换为“”。
	 * 在第几页删除完成，那么还是在第几页。
	 * 将单个删除按钮修改为设置为管理员等下拉框，只用选择删除。
	 * 查询所有用户的时候，分页问题
	 *
	 * 
	 * 功能：
	 * 保存头像：
	 * 路径为：upload/img/head/username+.picsuffix。
	 * 1、点击上传选择图片，选择完图片，确定，触发事件(change)，将头像保存到服务器，返回路径，给img src赋值。
	 * 2、上传超出文件大小提醒。
	 * 3、点击头像选择图片。
	 * 4、*头像剪裁。
	 * 
	 * 
	 * 角色分配：
	 * 1、得到所有角色。
	 * 2、遍历拼接成checkbox。
	 * 3、当点击的时候判断当前button中的值，如果与checkbox中的值有相同的，则将对应的checkbox高亮。
	 * 4、每添加一个用户默认分配一个注册用户角色。(触发器 	)
	 */
	
	function  User(id,username,userpwd,email,registerTime,registerIP,lastLoginTime,lastLoginIP,isDisabled,isEmailActive,uid)
	{
		this.id = id;
		this.username = username
		this.userpwd = userpwd;
		this.email = email;
		this.registerTime = registerTime;
		this.registerIP = registerIP;
		this.lastLoginTime = lastLoginTime;
		this.lastLoginIP = lastLoginIP;
		this.isDisabled = isDisabled;
		this.isEmailActive = isEmailActive;
		this.uid = uid;
	
	}
	
	function UserExt(id,gender,birthday,mobile,signature,qq,intro,headImg,user)
	{
		this.id = id;
		this.gender = gender;
		this.birthday = birthday;
		this.mobile = mobile;
		this.headImg = headImg;
		this.signature = signature;
		this.qq = qq;
		this.intro = intro;
		this.user = user;
	}
	
	//修改file样式为bootstrap样式
	//$(":file").bootstrapFileInput();
	//显示所有用户信息
	//总条数
	var totalNum = 0;
	//总页数
	var totalPage = 0;
	//当前页数
	var currentPage = 0;
	//每页显示条数
	var pageSize = 10;
	//从第几条开始
	var pageNo = currentPage*pageSize;
	//实际查出来的条数
	var findNumReality = 0; 
	$("#user_pre").attr("class","previous disabled");
	showUsers(pageNo,pageSize);
	function showUsers(pageNo,pageSize)
	{
		
		$("#allUsers_check").prop("checked",function(){
			return false;
		});
		
		$.post("user/show/allUsers",{"pageNo":pageNo,"pageSize":pageSize},function(result){
			totalNum = result.pagers.totalNum;
			var users = result.pagers.pageList;
			var roles = result.roles
			totalPage = Math.ceil(totalNum/pageSize)-1;
			if(totalPage<1 || currentPage==totalPage)
				$("#user_next").attr("class","next disabled");
			else
			 	$("#user_next").attr("class","next");
			
			findNumReality = users.length;
			
			
			
			$("#allUsers tbody").html("");
			$.each(users,function(n,user){
				var disabled = "";
				if(user.isDisabled==0)
					disabled="<span class='label label-danger'>停用</span>";
				else
					disabled="<span class='label label-success'>使用</span>";
					
				debugger;	
				//拥有角色拼接
				var roleArr = [];
				var roleStr = "";
				if(user.listRole==null || user.listRole.length==0)
				{
					roleArr.push("注册用户");
				}
				else
				{
					$.each(user.listRole,function(n,role){
						
						roleArr.push(role.desc);
						 
					});
				}
				roleStr = roleArr.join(",");
					
				//设置下拉菜单,将已有的角色高亮
				var rolesCheckboxStr = ""
				$.each(roles,function(n,role){
					
					//将已有的角色设置checked='checked'
					for(var i=0;i<roleArr.length;i++)
					{
						if(roleArr[i]==role.desc)
						{
							var desc = "<li><input type='checkbox' checked='checked' name='"+role.id+"' id='"+user.id+"_"+role.role+"'> <label for='"+user.id+"_"+role.role+"'>"+role.desc+"</label></li>";
							break;
						}
						else
						{
							var desc = "<li><input type='checkbox' name='"+role.id+"' id='"+user.id+"_"+role.role+"'> <label for='"+user.id+"_"+role.role+"'>"+role.desc+"</label></li>";
						}
					}
					
					rolesCheckboxStr+=desc;
				});
					
				
				
				var content = "<tr>" +
						"<td style='display:none;'>"+user.id+"</td>" +
						"<td><input type='checkbox' value="+user.id+"></td>" +
						"<td>"+user.username+"</td>" +
						"<td>"+user.email+"</td>" +
						"<td>"+user.registerTime+"</td>" +
						"<td>"+user.lastLoginTime+"</td>" +
						"<td width='5%' style='vertical-align: middle;'>"+disabled+"</td>" +
						"<td width='5%' style='vertical-align: middle;'><a href='#show_userext_modal' data-target='#show_userext_modal' data-toggle='modal' class='btn btn-sm btn-success detail'>详细</a></td>" +
						"<td width='14%'>" +
						"<div class='btn-group'>" +
						"<button data-toggle='dropdown' class='btn btn-sm btn-warning dropdown-toggle'>"+roleStr+"<i class='icon-caret-down'></i></button>" +
						"<ul class='dropdown-menu' id='roles_checkbox'>" +rolesCheckboxStr
						"</ul>" +
						"</div>"
						"</td>" +
						"</tr>"
						
				
				$("#allUsers tbody").append(content);					
					
				
					
					
				
			});
			
			
		
			
		},"json");
		
	
	}
	
	
	//给用户设置角色 
	$(document).on("change","#roles_checkbox :checkbox",function(event){
		debugger;
		
		//选中一个角色意味着在数据库关联表中添加一个与该用户的关系，将已选中的取消选中意味着在数据库关联表中删除一个与该用户的关系
		
		//选择的用户id
		var userId = $($(this).closest("tr").children("td")[0]).text();
		
		//选择的角色id
		var roleId = $(this)[0].name;
		
		//checkbox状态是否选中
		var flag = $(this).prop("checked");
		
		//如true则增加，否则删除
		if(flag)
		{
			$.post("user/add/roleRelation",{"userId":userId,"roleId":roleId},function(result){
			
				//showUsers(currentPage*pageSize,pageSize);
			},"json")
		}
		else
		{
			$.post("user/delete/roleRelation",{"userId":userId,"roleId":roleId},function(result){
			
				//showUsers(currentPage*pageSize,pageSize);
			},"json")
		}
		
	});
	
	
	
	$("#allUsers .detail").live("click",function(event){
		
		var id = parseInt($(this).closest("tr").children("td").eq(0).text());
		debugger;
		$.post("user/show/"+id+"/ext","",function(result){
			$("#id_span_update").html(result.user.id);
			$("#username_span_update").html(result.user.username);
			$("#email_span_update").html(result.user.email);
			$("#qq_span_update").html(result.qq);
			$("#mobile_span_update").html(result.mobile);
			$("#birthday_span_update").html(result.birthday);
			$("#signature_span_update").html(result.signature);
			$("#intro_span_update").html(result.intro);
			
			
			$("#id_text_update").val(result.user.id);
			$("#username_text_update").val(result.user.username);
			$("#email_text_update").val(result.user.email);
			$("#qq_text_update").val(result.qq);
			$("#mobile_text_update").val(result.mobile);
			$("#birthday_text_update").val(result.birthday);
			$("#signature_text_update").val(result.signature);
			$("#intro_text_update").val(result.intro);
			
			$("#head_img").attr("src",result.headImg);
	//			$("#username").val(result.user.username);
	//			$("#email").val(result.user.email);
	//			$(".page").hide();
	//			$("#personInfoPage").show();
			
		},"json")
		
	});
	
	$(document).on("click","#allUsers .delete",function(){
		debugger;
		var id = parseInt($(this).closest("tr").children().eq(0).text());
		
		$.post("user/delete/"+id,"",function(result){
			if(findNumReality==1)
				showUsers((currentPage-1)*pageSize,pageSize);
			else
				showUsers(currentPage*pageSize,pageSize);
		},"json");
		
	});
	
	
	//全选，取消全选
	$("#allUsers_check").on("click",function(event){
		
		$(":checkbox").attr("checked",this.checked);
		
	});
	
	//批量删除
	$(document).on("click","#delete_user_link",function(){
			
		var usersChecked = $("#allUsers input:checked");
		var idArr = new Array();
		$.each(usersChecked,function(n,userCheck){
		
			var value = $(userCheck).val();
			if("on"!=value && ""!=value && null!=value)
				idArr.push(parseInt(value));
		
		});
		
		if(idArr.length>0)
		{
			debugger;
			$.ajax({
				url:"user/delete/idArr",
				type:"post",
				data:JSON.stringify(idArr),
				dataType:"json",
				contentType:"application/json", 
				success:function(result){
					//如果删除的条数  = 本页实际查出来的条数 则将页数-1
					if(idArr.length==findNumReality)
						showUsers((currentPage-1)*pageSize,pageSize);
					else
						showUsers(currentPage*pageSize,pageSize);
					
				}
				
			});
		}
		else	
		{
			alert("请选择要删除的用户");
		}
	});
	
	
	//下一页
	$("#user_next").on("click",function(){
		currentPage++;
		if(currentPage<=totalPage)
		{
			$("#user_pre").attr("class","previous");
			showUsers(currentPage*pageSize,pageSize);
			if(currentPage == totalPage)
				$(this).attr("class","next disabled");
		}
		else
		{
			currentPage = totalPage;
		}
		
	});
	//上一页
	$("#user_pre").on("click",function(){
		currentPage--;
		if(currentPage>0)
		{
			$("#user_next").attr("class","next");
			showUsers(currentPage*pageSize,pageSize);
		}
		else
		{
			currentPage=0;
			$("#user_next").attr("class","next");
			$(this).attr("class","previous disabled");
			showUsers(currentPage*pageSize,pageSize);
		}
		
	});
	
	
	

	
	//添加用户
	$("#add_user_btn").on("click",function(event){
		
		$("#add_user_modal").modal("hide");
		
		var username = $("#username_text_add").val();
		var userpwd = $("#userpwd_text_add").val();
		var user = new User(0,username,userpwd,null,"2015-01-10 01:24:34",null,"2015-01-10 01:24:34",null,0,0,null);
		
		
		$.post("user/add.do",user,function(result){
			debugger;
			showUsers(currentPage*pageSize,pageSize);
				
		},"json");
		
	});
	
	
	
	
	/****
	 * 1.将每个tr的第一个td变色，并且居右对齐。
	 * 2.点击详细，默认数据显示在label里，点击编辑按钮，数据变为可编辑状态，底部编辑按钮变为更新按钮。
	 */
	
	$.each($("#show_userext_table tr"),function(n,trs){
		//$(this) = $(trs)
		$(trs).children("td").eq(0).css("width","80px").css("background-color","#EDF3F4").css("text-align","right");
		$(trs).children("td").eq(1).css("padding-left","10px").css("text-align","left");
		
	});
	
	
	$("#show_userext_table .sp").on("click",function(event){
		debugger;
		//$(this);
		//$("#email_text_update").focus();
		$("#show_userext_table .sp").hide();
		$("#show_userext_table .in").show();
		
	});
	
	
	//编辑用户
	$("#update_user_btn").on("click",function(event){
	
		$("#show_userext_table .sp").hide();
		$("#show_userext_table .in").show();
		reset();
//		alert("存储到数据库!");
		var id = $("#id_text_update").val();
		var username = $("#username_text_update").val();
		var email = $("#email_text_update").val();
		var userpwd = null;
		var registerTime = null;
		var registerIP = null;
		var lastLoginTime = null;
		var lastLoginIP = null;
		var isEmailActive = 0;
		var isDisabled = 1;
		var uid = null;
		
		
		
		var birthday = $("#birthday_text_update").val();
		var qq = $("#qq_text_update").val();
		var mobile = $("#mobile_text_update").val();
		var signature = $("#signature_text_update").val();
		var intro = $("#intro_text_update").val();
		var gender = 1;
		var headImg = $("#head_img").attr("src");
		debugger;
		var user = new User(id,username,userpwd,email,registerTime,registerIP,lastLoginTime,lastLoginIP,isDisabled,isEmailActive,uid);
		var userExt = new UserExt(0,gender,birthday,mobile,signature,qq,intro,headImg,user);
		
		$.ajax({
			type:"POST", 
            url:"user/update",
            //发送至服务器时，内容编码格式，默认为：application/x-www-form-urlencoded"，务必要指定！
            contentType:"application/json",
            //预期服务器返回的数据类型，默认为：String，也可为xml、text、html等，如有返回复杂类型的数据，务必要指定！
            dataType:"json",      
            //将json对象user转换为json字符串
            data:JSON.stringify(userExt), 
            success:function(data){ 
            	showUsers(currentPage*pageSize,pageSize);
				//alert(data);                          
            } 
		});
			
		
	})
	
	//点击上传头像按钮可选图片文件
	$("#head_pic_btn").on("click",function(){
	
		
		$("#head_pic_file").click();
		
		
	});
	//点击头像本身可选图片文件
	$("#head_img").on("click",function(){
	
		
		$("#head_pic_file").click();
		
	});
	
	   $(document).on("change","#head_pic_file",function(){
        var file = $("#head_pic_file").val();
        //获取现在图片的路径，以便传到后台删除当前路径中的文件
        var headPicNameOld = $("#head_img").attr("src");
        
        if(typeof(headPicNameOld) != "undefined" && "" != headPicNameOld)
        	headPicNameOld = headPicNameOld.substring(headPicNameOld.lastIndexOf("/")+1);
        else
        	headPicNameOld = "";
        var username = $("#username_text_update").val();
        //判断上传的文件的格式是否正确  
        var fileType = file.substring(file.lastIndexOf(".")+1).toLowerCase();  
        if(fileType!="png"&&fileType!="jpg"&&fileType!="gif"){  
            alert("上传文件格式错误");  
            return;  
        }  
        else{  
            var url = "/MyBlog_2014-12-04/user/upload/headpic";  
            $.ajaxFileUpload({  
                url:url,
                data:{"username":username,"fileType":fileType,"headPicNameOld":headPicNameOld},
                secureuri:false,  
                fileElementId:"head_pic_file",        //file的id  
                dataType:"text",                  //返回数据类型为文本  
                success:function(data, status){        //服务器响应成功时的处理函数
		            //本例中设定上传文件完毕后,服务端会返回给前台[0`filepath]
                	//0表示上传成功(后跟上传后的文件路径),1表示失败(后跟失败描述)
		            if(data.substring(0, 1) == 0){     
		            	debugger;
		            	headPicNameNew = data.substring(2);
		                $("#head_img").attr("src", headPicNameNew);
		            }else if(data ==1)
		            {
		            	alert("请选择文件后上传！");
		            }
		            else{
		                alert("失败！");
		            }
        		},
		        error:function(data, status, e){ //服务器响应失败时的处理函数
		            alert("上传失败！");
		        }  
            })  
        }  
    })  
	
	
	
	$("#close_update").on("click",function(){
	
		reset();
		
	});
	
	
	 /**
	 * 编辑还原
	 */
	function reset()
	{
		$("#show_userext_modal").modal("hide");
		$("#show_userext_table .sp").show();
		$("#show_userext_table .in").hide();
	}
	
	
});

//删除用户
function deleteUser(id)
{
	$.post("user/delete/"+id,"",function(result){
		showUsers();
	},"json");
}

function showUserExt(id)
{
	debugger;
	$.post("user/show/"+id+"/ext","",function(result){
		$("#id_span_update").html(result.user.id);
		$("#username_span_update").html(result.user.username);
		$("#email_span_update").html(result.user.email);
		$("#qq_span_update").html(result.qq);
		$("#mobile_span_update").html(result.mobile);
		$("#birthday_span_update").html(result.birthday);
		$("#signature_span_update").html(result.signature);
		$("#intro_span_update").html(result.intro);
		
		
		$("#id_text_update").val(result.user.id);
		$("#username_text_update").val(result.user.username);
		$("#email_text_update").val(result.user.email);
		$("#qq_text_update").val(result.qq);
		$("#mobile_text_update").val(result.mobile);
		$("#birthday_text_update").val(result.birthday);
		$("#signature_text_update").val(result.signature);
		$("#intro_text_update").val(result.intro);
		
		$("#head_img").attr("src",result.headImg);
//			$("#username").val(result.user.username);
//			$("#email").val(result.user.email);
//			$(".page").hide();
//			$("#personInfoPage").show();
		
	},"json")

}


