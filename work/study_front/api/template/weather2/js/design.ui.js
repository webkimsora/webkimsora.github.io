var UiAppsPackage = null;;
(function($) {
    UiAppsPackage = {
        sortSelect: {
            _defaults: {
                select: '',
                selectobj: null,
                nullmsg: ['선택해주세요']
            },
            init: function(obj) {
                this.obj = $.extend(true, this._defaults, obj);
                this.opt = {};
                this.fnSelectBind();
                this.fnGetOption($('[data-idx=0]'), this.obj.selectobj.SORT1);
            },
            fnSelectBind: function() {
                var _this = this;
                $(this.obj.select).find('select').change(function() {
                    var $this = $(this);
                    var $val = $this.val();
                    var $data = $this.data('idx');
                    var cnt = 0;
                    if(!$data) {
                        $(_this.obj.select).find('select').not($this).html('<option value="">' + _this.obj.nullmsg[0] + '</option>');
                    }
                    for(var i in _this.obj.selectobj) {
                        if(cnt == $data + 1) {
                            _this.fnGetOption($('[data-idx=' + ($data + 1) + ']'), _this.obj.selectobj[i], $val);
                        }
                        cnt++;
                    }
                });
            },
            fnGetOption: function($select, a, pcode) {
                var html = '';
                html += '<option value="">' + this.obj.nullmsg[0] + '</option>';
                for(var j = 0; j < a.length; j++) {
                    if(pcode) {
                        if(a[j].parentCode == pcode) {
                            html += '<option value="' + a[j].code + '">' + a[j].name + '</option>';
                        }
                    } else {
                        html += '<option value="' + a[j].code + '">' + a[j].name + '</option>';
                    }
                }
                $select.html(html);
            },
        },
        clsformat: function() {},
        random: function() {},
        minmax: function() {},
        shuffle: function() {},
    };
})(jQuery);