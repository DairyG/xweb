var vm = new Vue({
    el: '#personBody',
    data: {
        person: null,
        familyData: [], //家庭成员
        educationData: [], //教育经历
        workData: [], //职位 
    },
    mounted: function () {
        var _this = this;
        var id = GetPara('id');
        id = !id ? '' : id;
        _this.initLayui(id);
    },
    methods: {
        initLayui: function (id) {
            var _this = this;
            layui.use(['element', 'form', 'table'], function () {
                var element = layui.element,
                    table = layui.table,
                    form = layui.form;

                if (!id.IsNum()) {
                    layer_alert('传入参数错误，请从正确入口访问');
                    return false;
                }

                _this.getPerson(id, table);

            });
        },
        //获取员工
        getPerson: function (value, table) {
            var _this = this;
            layer_load();
            Serv.Get('person/getInfo/' + value, {}, function (result) {
                layer_load_lose();
                if (result) {
                    _this.person = result;

                    _this.person.gender = ["", "男", "女"][result.gender];
                    _this.person.birthDay = result.birthDay.FormatDate(false);
                    _this.person.graduationDate = result.graduationDate.FormatDate(false);

                    // console.log(_this.person);

                    if (_this.person.family) {
                        _this.familyData = JSON.parse(_this.person.family);
                    }
                    if (_this.person.education) {
                        _this.educationData = JSON.parse(_this.person.education);
                    }
                    if (_this.person.work) {
                        _this.workData = JSON.parse(_this.person.work);
                    }

                    console.log(_this.workData);

                } else {
                    layer_alert(result.message);
                }
            });
        },

        //替换地址/
        replaceAdd: function (value) {
            if (!value) {
                return '';
            }
            return value.replace(/\//g, '');
        },
        //替换换行
        replaceLine: function (value) {
            if (!value) {
                return '';
            }
            value = value.replace(/\r\n/g, '<br>');
            value = value.replace(/\n/g, '<br>');
            return value;
        }
    }
});