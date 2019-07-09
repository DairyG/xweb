/**
 * 弹出加载层
 */
function layer_load() {
	window.layer_loading_id = layer.load(3, {
		shade: 0.3
	});
};

/**
 * 关闭加载层
 */
function layer_load_lose() {
	layer.close(window.layer_loading_id);
}

/**
 * 弹出 信息框
 * @param string message 提示信息
 * @param function callBack 回调函数
 */
function layer_alert(message, callBack) {
	layer_load_lose();
	layer.alert((message || '成功'), {
		title: '提示',
		closeBtn: 0
	}, function (index) {
		layer.close(index);
		callBack && callBack();
	});
}

/**
 * 确认框；
 * @param string message 提示信息
 * @param function confirmBack 点击确定的回调函数
 * @param function cancelBack 点击取消的回调函数
 */
function layer_confirm(message, confirmBack, cancelBack) {
	layer.confirm((message || '确定提交数据吗?'), {
		title: '确定信息',
		resize: false,
		btn: ['确定', '取消'],
		btnAlign: 'c',
		closeBtn: 0,
		anim: 0,
		icon: 3
	}, function (index) {
		layer.close(index);
		confirmBack && confirmBack();
	}, function (index) {
		layer.close(index);
		cancelBack && cancelBack();
	});
}

/** 
 * 弹出输入层
 */
function layui_prompt(obj) {
	var default_val = $(obj).val();
	layer.prompt({
		formType: 2,
		value: default_val,
		title: '请输入',
		area: ['350px', '120px'],
		yes: function (index, elem) {
			var value = elem.find(".layui-layer-input").val();
			$(obj).val(value);
			layer.close(index);
		}
	});
}

String.prototype.RTrim = function (c) {
	if (!c) {
		c = ' ';
	}
	var reg = new RegExp('([' + c + ']*$)', 'gi');
	return this.replace(reg, '');
}
/**
 * 日期格式转换
 * @param Boolean true=显示时间，false=不显示时间
 */
String.prototype.FormatDate = function (hasTime) {
	if (!this) {
		return "";
	}
	var fmt = 'yyyy-MM-dd';
	if (hasTime) {
		fmt = 'yyyy-MM-dd hh:mm:ss'
	}

	try {
		var date = new Date(Date.parse(this));
		if (!date) {
			return ''
		}

		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		var o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds()
		};
		for (let k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				var str = o[k] + '';
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
			}
		}
		return fmt;
	} catch (e) {
		return '';
	}
}
/**
 * 验证空值
 */
String.prototype.isEmpty = function () {
	if (this === null || this == undefined || this === '') {
		return true;
	}
	return false;
}
/**
 * 验证邮件
 */
String.prototype.IsEmail = function () {
	var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	return reg.test(this);
}
/**
 * 验证手机号码
 */
String.prototype.IsMobile = function () {
	var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
	return reg.test(this);
}
/**
 * 验证座机号码
 */
String.prototype.IsTelPhone = function () {
	var reg = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
	return reg.test(this);
}
/**
 * 验证座机/手机/400/800
 */
String.prototype.IsTel2 = function () {
	var reg = /(^(\d{3,4}-)?\d{6,8}$)|(^1[3456789]\d{9}$)|(^400[0-9]{7})|(^800[0-9]{7})|(^(400)-(\d{3})-(\d{4}$))/;
	return reg.test(this);
}
/**
 * 验证Url地址
 */
String.prototype.IsUrl = function () {
	var reg = /^(http:||https:)\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
	return reg.test(this);
}
/**
 * 验证数字
 */
String.prototype.IsNum = function () {
	var reg = /^[0-9\.]+$/;
	return reg.test(this);
}

//验证身份证号码
function isCard(value) {
	var city = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江 ",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北 ",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏 ",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外 "
	};
	if (!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
		return "身份证格式错误";
	} else if (!city[value.substr(0, 2)]) {
		//验证身份证地址
		return "身份证格式错误";
	} else {
		//18位身份证需要验证最后一位校验位
		if (value.length == 18) {
			value = value.split('');
			//∑(ai×Wi)(mod 11)
			//加权因子
			var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			//校验位
			var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for (var i = 0; i < 17; i++) {
				ai = value[i];
				wi = factor[i];
				sum += ai * wi;
			}
			var last = parity[sum % 11];
			if (parity[sum % 11] != value[17]) {
				return "身份证格式错误";
			}
		}
	}
	return '';
}

//根据身份证获取出生年月日
function getBirthdayFromIdCard(idCard) {
	var birthday = "";
	if (idCard != null && idCard != "") {
		if (idCard.length == 15) {
			birthday = "19" + idCard.substr(6, 6);
		} else if (idCard.length == 18) {
			birthday = idCard.substr(6, 8);
		}

		birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
	}

	return birthday;
}
//根据身份证获取年龄
function getAgeFromIdCard(idCard) {
	var myDate = new Date();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();
	var age = myDate.getFullYear() - idCard.substring(6, 10) - 1;
	if (idCard.substring(10, 12) < month || idCard.substring(10, 12) == month && idCard.substring(12, 14) <= day) {
		age++;
	}
	return age;
}


/**
 * 时间比较>=
 * @param string t1 日期
 * @param string t2 日期
 */
function compareDate(t1, t2) {
	return new Date(t1.replace(/-/g, "/")) >= new Date(t2.replace(/-/g, "/"));
}

/**
 * 左边自动补全0
 */
function padLeftZero(value) {
	return ('00' + value).substr(value.length);
}

/**
 * 写入cookie
 * @param string cookie名称
 * @param string cookie值
 */
function SetCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

/**
 * 获取cookie
 * @param string cookie名称
 */
function GetCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

/**
 * 删除cookie
 * @param string cookie名称
 */
function DelCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

/**
 * 获取get参数
 * @param string 参数名称
 */
function GetPara(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

function QueryHZPY(id, pyId) {
	var str = document.getElementById(id).value.trim();
	if (str == "") return;
	var arrRslt = makePy(str);
	//循环将值到下拉框
	var option = null;
	document.getElementById(pyId).value = ""; //清空下拉框
	var first = document.getElementById(pyId);
	first.value = arrRslt;
}

String.prototype.RTrim = function (c) {
	if (!c) {
		c = ' ';
	}
	var reg = new RegExp('([' + c + ']*$)', 'gi');
	return this.replace(reg, '');
}
String.prototype.LTrim = function (c) {
	if (!c) {
		c = ' ';
	}
	var reg = new RegExp('(^[' + c + '])', 'gi');
	return this.replace(reg, '');
}

/** 
 * 弹出输入层
 */
function layui_prompt(obj) {
	var default_val = $(obj).val();
	layer.prompt({
		formType: 2,
		value: default_val,
		title: '请输入',
		area: ['350px', '120px'],
		yes: function (index, elem) {
			var value = elem.find(".layui-layer-input").val();
			$(obj).val(value);
			layer.close(index);
		}
	});
}


function user_popup2(obj = null, allow_sels, num = 0, is_close_other = false, callback) {
	if (is_close_other) {
		layer.closeAll();
	}

	var user_company = {
		id: 1,
		pid: 0
	} //默认当前用户的公司信息 实际另行获取 
	//是否可选公司单独再次判断  集团账户才能选择公司
	if (user_company.pid > 0) {
		has_company = false;
	}
	var has_user = allow_sels.indexOf('user') > -1 ? true : false;
	var has_department = allow_sels.indexOf('department') > -1 ? true : false;
	var has_company = allow_sels.indexOf('company') > -1 ? true : false;
	var has_position = allow_sels.indexOf('position') > -1 ? true : false;
	var has_dpt_position = allow_sels.indexOf('dpt_position') > -1 ? true : false;
	$("#popup_content").remove();
	$('body').append('<div id="popup_content" data-has_user="' + has_user + '" data-has_department="' + has_department + '" data-has_company="' + has_company + '" data-has_position="' + has_position + '" data-has_dpt_position="' + has_dpt_position + '" data-num="' + num + '"></div>');
	$('#popup_content').load("../../pages/public/user_select3.html", null, function () {
		if (typeof obj == 'object') {
			var html = '';
			if ($(obj).attr('type') == 'text') {
				var arr = $(obj).siblings('input[name="sels"]').val();
			} else {
				var arr = $(obj).find('input[name="sels"]').val();
			}
			if (arr) {
				arr = JSON.parse(arr);
				var sel_type = arr.sel_type;
				$('#sel_type').val(sel_type);

				arr.company.ids = arr.company.ids.RTrim(',').LTrim(',');
				arr.company.ids = arr.company.ids ? arr.company.ids.split(',') : [];
				arr.company.names = arr.company.names.RTrim(',').LTrim(',');
				arr.company.names = arr.company.names ? arr.company.names.split(',') : [];
				if (arr.company.ids.length > 0) {
					$('#popup_content #company_ids').val(',' + arr.company.ids + ',');
					$('#popup_content #company_names').val(',' + arr.company.names + ',');
					for (var i = 0; i < arr.company.ids.length; i++) {
						html += build_selectd_html('company', arr.company.ids[i], arr.company.names[i]);
					}
				}
				arr.department.ids = arr.department.ids.RTrim(',').LTrim(',');
				arr.department.ids = arr.department.ids ? arr.department.ids.split(',') : [];
				arr.department.names = arr.department.names.RTrim(',').LTrim(',');
				arr.department.names = arr.department.names ? arr.department.names.split(',') : [];
				if (arr.department.ids.length > 0) {
					$('#popup_content #department_ids').val(',' + arr.department.ids + ',');
					$('#popup_content #department_names').val(',' + arr.department.names + ',');
					for (var i = 0; i < arr.department.ids.length; i++) {
						html += build_selectd_html('department', arr.department.ids[i], arr.department.names[i]);
					}
				}
				arr.user.ids = arr.user.ids.RTrim(',').LTrim(',');
				arr.user.ids = arr.user.ids ? arr.user.ids.split(',') : [];
				arr.user.names = arr.user.names.RTrim(',').LTrim(',');
				arr.user.names = arr.user.names ? arr.user.names.split(',') : [];
				if (arr.user.ids.length > 0) {
					$('#popup_content #user_ids').val(',' + arr.user.ids + ',');
					$('#popup_content #user_names').val(',' + arr.user.names + ',');
					for (var i = 0; i < arr.user.ids.length; i++) {
						html += build_selectd_html('user', arr.user.ids[i], arr.user.names[i]);
					}
				}
				arr.position.ids = arr.position.ids.RTrim(',').LTrim(',');
				arr.position.ids = arr.position.ids ? arr.position.ids.split(',') : [];
				arr.position.names = arr.position.names.RTrim(',').LTrim(',');
				arr.position.names = arr.position.names ? arr.position.names.split(',') : [];
				if (arr.position.ids.length > 0) {
					$('#popup_content #position_ids').val(',' + arr.position.ids + ',');
					$('#popup_content #position_names').val(',' + arr.position.names + ',');
					for (var i = 0; i < arr.position.ids.length; i++) {
						html += build_selectd_html('position', arr.position.ids[i], arr.position.names[i]);
					}
				}

				arr.dpt_position.ids = arr.dpt_position.ids.RTrim(',').LTrim(',');
				arr.dpt_position.ids = arr.dpt_position.ids ? arr.dpt_position.ids.split(',') : [];
				arr.dpt_position.names = arr.dpt_position.names.RTrim(',').LTrim(',');
				arr.dpt_position.names = arr.dpt_position.names ? arr.dpt_position.names.split(',') : [];
				if (arr.dpt_position.ids.length > 0) {
					$('#popup_content #dpt_position_ids').val(',' + arr.dpt_position.ids + ',');
					$('#popup_content #dpt_position_names').val(',' + arr.dpt_position.names + ',');
					for (var i = 0; i < arr.dpt_position.ids.length; i++) {
						html += build_selectd_html('dpt_position', arr.dpt_position.ids[i], arr.dpt_position.names[i]);
					}
				}
				$("#selected_box").append(html);
				if (has_company) {
					var ids = $("#company_ids").val();
					$("#select_ul input[data-type='company']").each(function () {
						var id = $(this).data('id');
						if (ids.indexOf(',' + id + ',') >= 0) {
							$(this).prop('checked', true);
						}
					});
				}
				$('.radio_box input').each(function () {
					if ($(this).val() == sel_type) {
						$(this).click();
					}
				});
			}
		}
	});

	layer.open({
		type: 1,
		title: '用户选择',
		btn: ['确认', '取消'],
		String: false,
		closeBtn: 1,
		skin: 'layui-layer-rim',
		area: ['760px', '480px'],
		content: $('#popup_content'),
		yes: function (index, layero) {
			//以下方式可获取到选中的 公司 部门 人员
			var sel_type = $("#selected_box #sel_type").val();
			var company_ids = $("#selected_box #company_ids").val(); //公司ID
			var company_names = $("#selected_box #company_names").val(); //公司名称
			var department_ids = $("#selected_box #department_ids").val(); //部门ID
			var department_names = $("#selected_box #department_names").val(); //部门名称
			var user_ids = $("#selected_box #user_ids").val(); //人员ID
			var user_names = $("#selected_box #user_names").val(); //人员名称
			var position_ids = $("#selected_box #position_ids").val(); //人员ID
			var position_names = $("#selected_box #position_names").val(); //人员名称
			var dpt_position_ids = $("#selected_box #dpt_position_ids").val(); //人员ID
			var dpt_position_names = $("#selected_box #dpt_position_names").val(); //人员名称
			var arr = {
				sel_type: sel_type,
				company: {
					'ids': company_ids,
					'names': company_names
				},
				department: {
					'ids': department_ids,
					'names': department_names
				},
				user: {
					'ids': user_ids,
					'names': user_names
				},
				position: {
					'ids': position_ids,
					'names': position_names
				},
				dpt_position: {
					'ids': dpt_position_ids,
					'names': dpt_position_names
				}
			};
			if (typeof obj == 'object') {
				var html = "";
				user_names = user_names.RTrim(',').LTrim(',');
				department_names = department_names.RTrim(',').LTrim(',');
				company_names = company_names.RTrim(',').LTrim(',');
				position_names = position_names.RTrim(',').LTrim(',');
				dpt_position_names = dpt_position_names.RTrim(',').LTrim(',');

				user_arr = user_names ? user_names.split(',') : [];
				department_arr = department_names ? department_names.split(',') : [];
				company_arr = company_names ? company_names.split(',') : [];
				position_arr = position_names ? position_names.split(',') : [];
				dpt_position_arr = dpt_position_names ? dpt_position_names.split(',') : [];

				var L1 = user_arr.length,
					L2 = department_arr.length,
					L3 = company_arr.length,
					L4 = position_arr.length,
					L5 = dpt_position_arr.length;
				if ((L1 + L2 + L3 + L4 + L5) > 1) {
					html = "等" + (L1 + L2 + L3 + L4 + L5) + '项';
				}
				if (L1 > 0) {
					html = user_arr[0] + html;
				} else if (L2 > 0) {
					html = department_arr[0] + html;
				} else if (L3 > 0) {
					html = company_arr[0] + html;
				} else if (L4 > 0) {
					html = position_arr[0] + html;
				} else if (L5 > 0) {
					html = dpt_position_arr[0] + html;
				}

				if ($(obj).attr('type') == 'text') {
					$(obj).val(html);
					var hide_ipt = $(obj).next('input[type="hidden"]');
					if (hide_ipt.length > 0) {
						hide_ipt.val(JSON.stringify(arr));
					} else {
						$(obj).after('<input type="hidden" name="sels" value=\'' + JSON.stringify(arr) + '\'>');
					}
				} else {
					html += '&gt;&gt;';
					$(obj).html(html);
					var hide_ipt = $(obj).find('input[type="hidden"]');
					if (hide_ipt.length > 0) {
						hide_ipt.val(JSON.stringify(arr));
					} else {
						$(obj).append('<input type="hidden" name="sels" value=\'' + JSON.stringify(arr) + '\'>');
					}
				}
			};

			if (typeof callback === 'function') {
				callback(arr);
			}
			layer.close(index);
		},
		btn2: function (index, layero) {
			if (typeof callback === 'function') {
				callback(null);
			}
			layer.close(index);
		}
	});
}

/**
 * 费用项选择弹出框
 */
function payitem_pop(obj = null, company_id, callback) {
	if (parseInt(company_id) <= 0) {
		layer.alert('请选择公司');
	}
	$('body').append('<div id="popup_content" data-company_id="' + company_id + '"></div>');
	$('#popup_content').load("../../pages/public/payitem_select.html");

	layer.open({
		type: 1,
		title: '费用科目选择',
		btn: ['确认', '取消'],
		String: false,
		closeBtn: 1,
		skin: 'layui-layer-rim',
		area: ['760px', '480px'],
		content: $('#popup_content'),
		yes: function (index, layero) {
			//以下方式可获取到选中的 公司 部门 人员

			if (typeof obj == 'object') {

			};

			if (typeof callback === 'function') {
				callback(arr);
			}
			layer.close(index);
		},
		btn2: function (index, layero) {
			layer.close(index);
		}
	});
}
/**
 * 创建选中项html
 * @param string type (user,company,department,position)
 * @param string value 选中项的值
 * @param string text 选中项文本
 */
function build_sel_html(type, value, text) {
	var html = '<span class="layui-badge layui-badge2 layui-bg-cyan">' + text + '<input type="hidden" class="' + type + '_ipt" value="' + value + '"><i class="layui-icon layui-icon-close" onclick="sel_remove(this)"></i></span>';
	return html;
}

/** 
 * 删除选中项
 * @param Object obj
 */
function sel_remove(obj) {
	$(obj).parents('span').remove();
}



/**
 * 弹出用户选择框
 * @param Object obj 显示选中内容的对象
 * @param boolean has_user 是否可选用户
 * @param boolean has_department 是否可选部门
 * @param boolean hsa_company 是否可选公司
 * @param int num 最大选择数(大于零时限制选址数量，否者不限制)
 * @param boolean is_close_other 是否关闭其他弹窗
 * @param function callback 回调函数
 */
function user_popup(obj = null, has_user = false, has_department = false, has_company = false, num = 0, is_close_other = false, callback) {
	if (is_close_other) {
		layer.closeAll();
	}
	var table;
	layui.use(['table'], function () {
		table = layui.table;
	});
	var user_company = {
		id: 1,
		pid: 0
	} //默认当前用户的公司信息 实际另行获取 
	//是否可选公司单独再次判断  集团账户才能选择公司
	if (user_company.pid > 0) {
		has_company = false;
	}

	if (obj == null) {
		layer.msg('第一个参数不能为空！');
	}

	$('body').append('<div id="popup_content" data-has_user="' + has_user + '" data-has_department="' + has_department + '" data-has_company="' + has_company + '" data-num="' + num + '"></div>');
	$('#popup_content').load("../../pages/public/user_select2.html", null, function () {
		if (typeof obj == 'object') {
			var html = '';
			if ($(obj).attr('type') == 'text') {
				var arr = $(obj).siblings('input[name="sels"]').val();
			} else {
				var arr = $(obj).find('input[name="sels"]').val();
			}
			if (arr) {
				arr = JSON.parse(arr);
				arr.company.ids = arr.company.ids.RTrim(',').LTrim(',');
				arr.company.ids = arr.company.ids ? arr.company.ids.split(',') : [];
				arr.company.names = arr.company.names.RTrim(',').LTrim(',');
				arr.company.names = arr.company.names ? arr.company.names.split(',') : [];
				if (arr.company.ids.length > 0) {
					$('#popup_content #company_ids').val(',' + arr.company.ids + ',');
					$('#popup_content #company_names').val(',' + arr.company.names + ',');
					for (var i = 0; i < arr.company.ids.length; i++) {
						html += build_selectd_html('company', arr.company.ids[i], arr.company.names[i]);
					}
				}
				arr.department.ids = arr.department.ids.RTrim(',').LTrim(',');
				arr.department.ids = arr.department.ids ? arr.department.ids.split(',') : [];
				arr.department.names = arr.department.names.RTrim(',').LTrim(',');
				arr.department.names = arr.department.names ? arr.department.names.split(',') : [];
				if (arr.department.ids.length > 0) {
					$('#popup_content #department_ids').val(',' + arr.department.ids + ',');
					$('#popup_content #department_names').val(',' + arr.department.names + ',');
					for (var i = 0; i < arr.department.ids.length; i++) {
						html += build_selectd_html('department', arr.department.ids[i], arr.department.names[i]);
					}
				}
				arr.user.ids = arr.user.ids.RTrim(',').LTrim(',');
				arr.user.ids = arr.user.ids ? arr.user.ids.split(',') : [];
				arr.user.names = arr.user.names.RTrim(',').LTrim(',');
				arr.user.names = arr.user.names ? arr.user.names.split(',') : [];
				if (arr.user.ids.length > 0) {
					$('#popup_content #user_ids').val(',' + arr.user.ids + ',');
					$('#popup_content #user_names').val(',' + arr.user.names + ',');
					for (var i = 0; i < arr.user.ids.length; i++) {
						html += build_selectd_html('user', arr.user.ids[i], arr.user.names[i]);
					}
				}
				$("#selected_box").append(html);
			}
		}
	});
	//获取初始值
	if (typeof obj == 'object') {
		$('#popup_content').attr('data-has_def', 'true');
	}

	layer.open({
		type: 1,
		title: '用户选择',
		btn: ['确认', '取消'],
		String: false,
		closeBtn: 1,
		skin: 'layui-layer-rim',
		area: ['760px', '480px'],
		content: $('#popup_content'),
		yes: function (index, layero) {
			//以下方式可获取到选中的 公司 部门 人员
			var company_ids = $("#selected_box #company_ids").val(); //公司ID
			var company_names = $("#selected_box #company_names").val(); //公司名称
			var department_ids = $("#selected_box #department_ids").val(); //部门ID
			var department_names = $("#selected_box #department_names").val(); //部门名称
			var user_ids = $("#selected_box #user_ids").val(); //人员ID
			var user_names = $("#selected_box #user_names").val(); //人员名称
			var arr = {
				company: {
					'ids': company_ids,
					'names': company_names
				},
				department: {
					'ids': department_ids,
					'names': department_names
				},
				user: {
					'ids': user_ids,
					'names': user_names
				}
			};

			if (typeof obj == 'object') {

				var html = "";
				user_names = user_names.RTrim(',').LTrim(',');
				department_names = department_names.RTrim(',').LTrim(',');
				company_names = company_names.RTrim(',').LTrim(',');

				user_arr = user_names ? user_names.split(',') : [];
				department_arr = department_names ? department_names.split(',') : [];
				company_arr = company_names ? company_names.split(',') : [];

				var L1 = user_arr.length,
					L2 = department_arr.length,
					L3 = company_arr.length;
				if ((L1 + L2 + L3) > 1) {
					html = "等" + (L1 + L2 + L3) + '项&gt;&gt;';
				}

				if ($(obj).attr('type') == 'text') {
					if (L1 > 0) {
						html = user_arr[0];
					} else if (L2 > 0) {
						html = department_arr[0];
					} else if (L3 > 0) {
						html = company_arr[0];
					}
					$(obj).val(html);
					$(obj).after('<input type="hidden" name="sels" value=\'' + JSON.stringify(arr) + '\'>');
				} else {
					if (L1 > 0) {
						html = user_arr[0] + html;
					} else if (L2 > 0) {
						html = department_arr[0] + html;
					} else if (L3 > 0) {
						html = company_arr[0] + html;
					}
					$(obj).html(html);
					$(obj).append('<input type="hidden" name="sels" value=\'' + JSON.stringify(arr) + '\'>');
				}
			};

			if (typeof callback === 'function') {
				callback(arr);
			}
			layer.close(index);
		},
		btn2: function (index, layero) {
			layer.close(index);
		}
	});
}

/**
 * 创建选中项html
 * @param string type (user,company,department,position)
 * @param string value 选中项的值
 * @param string text 选中项文本
 */
function build_sel_html(type, value, text) {
	var html = '<span class="layui-badge layui-badge2 layui-bg-cyan">' + text + '<input type="hidden" class="' + type + '_ipt" value="' + value + '"><i class="layui-icon layui-icon-close" onclick="sel_remove(this)"></i></span>';
	return html;
}

/** 
 * 删除选中项
 * @param Object obj
 */
function sel_remove(obj) {
	$(obj).parents('span').remove();
}

/**
 * 考核项选择框
 */
function assess_popup(obj, type = 'checkbox', callBack) {
	$('body').append('<div id="popup_content" data-type=' + type + '></div>');
	$('#popup_content').load("../../pages/public/assess.html");
	layer.open({
		type: 1,
		title: '选择考核项',
		String: false,
		closeBtn: 1,
		btn: ['确认', '取消'],
		yes: function (index) {
			callBack && callBack();
			layer.close(index);
		},
		skin: 'layui-layer-rim',
		area: ['850px', '450px'],
		content: $('#popup_content')
	});
}

/**
 * 解析用户选择项
 */

 function formart_sels(data){
	if(data == ""){
		return [];
	}
	data = JSON.parse(data);
	console.log(data);
	var businessType = data.sel_type;
	var c = data.company.ids;
		c = c.RTrim(',').LTrim(',');
		console.log(c);
	var d = data.department.ids;
		d = d.RTrim(',').LTrim(',');
		console.log(d);
	var u = data.user.ids;
		u = u.RTrim(',').LTrim(',');
		console.log(u);
	var p = data.position.ids;
		p = p.RTrim(',').LTrim(',');
		console.log(p);
	var dp = data.dpt_position.ids;
		dp = dp.RTrim(',').LTrim(',');
		console.log(dp);
	var res = [],data;
	if(c != ''){
		c = c.split(',');
		for(var i = 0;i < c.length;i++){
			data = {
				businessType:businessType,
				companyId:c[i],
				depId:0,
				userId:0,
				jobDepId:0,
				jobId:0
			}
			res.push(data);
		}
	}
	if(d != ''){
		d = d.split(',');
		for(var i = 0;i < d.length;i++){
			data = {
				businessType:businessType,
				companyId:0,
				depId:d[i],
				userId:0,
				jobDepId:0,
				jobId:0
			}
			res.push(data);
		}
	}
	if(u != ''){
		u = u.split(',');
		for(var i = 0;i < u.length;i++){
			data = {
				businessType:businessType,
				companyId:0,
				depId:0,
				userId:u[i],
				jobDepId:0,
				jobId:0
			}
			res.push(data);
		}
	}
	if(p != ''){
		p = p.split(',');
		for(var i = 0;i < p.length;i++){
			data = {
				businessType:businessType,
				companyId:0,
				depId:0,
				userId:0,
				jobDepId:0,
				jobId:p[i]
			}
			res.push(data);
		}
	}
	if(dp != ''){
		dp = dp.split(',');
		for(var i = 0;i < dp.length;i++){
			var r = dp[i].split('|');
			data = {
				businessType:businessType,
				companyId:0,
				depId:0,
				userId:0,
				jobDepId:r[0],
				jobId:r[1]
			}
			res.push(data);
		}
	}	
	return 	res;			
 }