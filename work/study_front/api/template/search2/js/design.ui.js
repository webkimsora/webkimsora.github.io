var UiAppsPackage = null;;
(function($) {
    UiAppsPackage = {
        localapi: { //지역검색
            init: function() {},
            lstset: function() {},
        },
        iamgesapi: { // 이미지검색
            _defaults: {
                el: '',
                itemclsname: '',
                data: [],
                maxheight: 200,
                histrotydata: [],
                start: 0,
                layerpop: false,
            },
            init: function(o) {
                var _this = this;
                this.obj = $.extend(true, this._defaults, o);
                this.beforeCallback = null;
                this.afterCallback = null;
                this.fnReParse();
                $(window).smartresize(function() {
                    _this.fnReParse();
                });
                if(this.obj.layerpop) {
                    this.fnLayerpop();
                }
            },
            fnLayerpop: function() {
                $(document).off().on('click', this.obj.itemclsname, function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    var $dataSrc = $this.data('paramsSrc');
                    var $dataWidth = $this.data('paramsWidth');
                    $(this).cmmAlert({
                        width: $dataWidth < 1000 ? $dataWidth + 40 : 1000,
                        msg: '<img src="' + $dataSrc + '" style="max-width: 100%; display: block; margin: 0 auto; max-height: 700px;" />'
                    });
                    return false;
                });
            },
            fnReParse: function() {
                var cnt = 0;
                this.opt = {
                    innerwidth: $(this.obj.el).innerWidth(),
                    data_wh: []
                };
                for(var i = 0; i < this.obj.histrotydata.length; i++) {
                    var t = $(this.obj.itemclsname + ':eq(' + i + ')');
                    t.css('height', this.obj.maxheight);
                    this.opt.data_wh.push(t.data('paramsWidth') * (this.obj.maxheight / t.data('paramsHeight')));
                }
                this.fnImgGroup();
            },
            fnImgGroup: function() {
                var c = 0;
                var aryi = [];
                for(var i = 0; i < this.opt.data_wh.length; i++) {
                    if(this.opt.data_wh[i + 1]) {
                        var cp = c + this.opt.data_wh[i + 1];
                        if(cp > this.opt.innerwidth) {
                            this.fnImgResizable(aryi, c);
                            aryi = [];
                            c = 0;
                        }
                    }
                    c += this.opt.data_wh[i];
                    aryi.push(i);
                }
            },
            fnImgResizable: function(aryi, rowitemwidth) {
                var ratio = this.ratio(this.opt.innerwidth, rowitemwidth, true);
                var tset = 0;
                for(var i = 0; i < this.obj.histrotydata.length; i++) {
                    if(aryi.indexOf(i) != -1) {
                        var t = $(this.obj.itemclsname + ':eq(' + i + ')');
                        t.css({
                            'width': this.opt.data_wh[i] * ratio,
                            'height': this.obj.maxheight * ratio
                        });
                        t.find('img').css({
                            'width': '100%',
                            'height': '100%'
                        });
                    }
                }
            },
            ratio: function(w, h, gubun) {
                return gubun || typeof gubun === 'undifined' ? w / h : h / w;
            },
            clsformat: function(s) {
                return s.replace(/\./g, '');
            },
            resotre: function() {},
            resize: function() {}
        },
        mapAPI: {
            _defaults: {
                fnMapsLstTarget: '.fnMapsLstTarget',
                initLatLng: [37.5666805, 126.9784147],
                initMapZoom: 3,
                nullmsg: '',
                marker: false,
                cluster: false,
                map: {},
                form: '',
                layerpopname: '[data-layer-pop="tnc"]',
                layerpopobj: {
                    title: '상세정보창',
                    width: 900
                }
            },
            init: function(o) {
                var _this = this;
                this.obj = $.extend(this._defaults, o);
                this.opt = {
                    latArry: [], //전체 데이타의 위도값 배열
                    lngArry: [], //전체 데이타의 경도값 배열
                    markers: [], //다중 마커를 위한 마커들의 배열[0] , 해당 마커의 infowindow 값들[1]
                    onlymarkers: [], //다중 마커를 위한 마커들 배열
                    search: {},
                    searcharry: {},
                    searchbtn: '.searchBtn',
                    layerpopbtn: '.mapLayerPopBtn',
                    inputname: 'ABN_FIELD',
                    locoption: ['서울', '경기', '강원', '충청', '전라', '경상', '제주'],
                    errormsg: ['검색조건이 없습니다.', '리스트타겟이없습니다', '검색어를 입력해주세요.']
                };
                this.map = null;
                if(this.obj.form) {
                    this.fnFormInit(GET_DATA_ID, [GET_DATA_ID[0].id, GET_DATA_ID[5].id]);
                }
                this.fnMapsSet(this.obj.mapid);
            },
            fnFormInit: function(d, a) {
                this.opt.search = {
                    data: d,
                    filterarry: a
                };
                for(var i = 0; i < a.length; i++) {
                    this.opt.searcharry['input' + i] = a[i];
                }
                this.fnFormSet(this.opt.search.data, this.opt.search.filterarry);
                this.fnFormBind();
            },
            fnFormSet: function(d, a) {
                var html = '';
                for(var i = 0; i < d.length; i++) {
                    if(a.indexOf(d[i].id) != -1) {
                        if(d[i].id.indexOf('소재지') != -1) {
                            /* 여기는 하드코딩으로 가야할 듯 ? 다른 방법을 모르겟네.. : S */
                            html += '<div class="tp"><select name="' + this.opt.inputname + i + '" title="' + d[i].id + '" class="inp">';
                            html += '<option value="0">전체</option>';
                            for(var j = 0; j < this.opt.locoption.length; j++) {
                                var str = '도';
                                if(!j) {
                                    str = '특별시';
                                }
                                html += '<option value="' + this.opt.locoption[j] + '">' + this.opt.locoption[j] + str + '</option>';
                            }
                            html += '</select></div>';
                            /* 여기는 하드코딩으로 가야할 듯 ? 다른 방법을 모르겟네.. : E */
                        } else {
                            html += '<div class="tp"><input type="text" name="' + this.opt.inputname + i + '" title="' + d[i].id + '" placeholder="' + d[i].id + '" class="inp" /></div>';
                        }
                    }
                }
                this.fnMapsNullLst(this.opt.errormsg[2]);
                html += '<a href="#" class="btn ' + this.clsformat(this.opt.searchbtn) + '">검색</a>';
                $(this.obj.form).html(html);
            },
            fnFormGet: function(a) {
                var _this = this;
                var html = '';
                if(a == 'reset') {
                    this.fnMapsNullLst(this.opt.errormsg[2]);
                } else {
                    this.fnDataPars(GET_DATA_RECORD, [this.opt.search.filterarry, a], function(data) { //파싱중 데이터 반복돌릴때마다
                        if(!$(_this.obj.fnMapsLstTarget).length) {
                            console.warn(_this.opt.errormsg[1]);
                        } else {
                            var adrs = data[GET_DATA_ID[5].id] ? data[GET_DATA_ID[5].id] : _this.obj.nullmsg;
                            html += '<li class="tp">';
                            html += '<a href="javascript:;" class="txt" data-params=\'{"x":' + data[GET_DATA_ID[3].id] + ', "y" : ' + data[GET_DATA_ID[2].id] + '}\'>';
                            html += '<span class="tit">' + data[GET_DATA_ID[0].id] + '</span>';
                            html += '<span class="s_adr">' + adrs + '</span>';
                            html += '</a>';
                            html += '</li>';
                        }
                    }, function() {
                        $(_this.obj.fnMapsLstTarget).html(html);
                    });
                    if(this.obj.marker) {
                        this.fnMapsInfoBind();
                    }
                }
            },
            fnMapsNullLst: function(msg) {
                $(this.obj.fnMapsLstTarget).html('<li class="tp nullmsg"><span class="txt">' + msg + '</span></li>');
            },
            fnFormBind: function() {
                var _this = this;
                var $input = $('[name^="' + _this.opt.inputname + '"]');
                $input.on({
                    'keydown': function(e) {
                        if(e.keyCode == 13) {
                            $(_this.opt.searchbtn).click();
                        }
                    }
                });
                $(this.opt.searchbtn).on({
                    'click': function() {
                        var a = [];
                        $input.each(function() {
                            var $thisVal = $(this).val() ? $(this).val() : 0;
                            a.push($thisVal);
                        });
                        _this.fnFormGet(a);
                    },
                });
            },
            fnMapsSet: function(id) {
                var _this = this;
                if(this.map) {
                    this.map.destroy();
                }
                this.map = new naver.maps.Map(id, $.extend(true, {
                    center: new naver.maps.LatLng(_this.obj.initLatLng[0], _this.obj.initLatLng[1]),
                    zoom: _this.obj.initMapZoom,
                    enableWheelZoom: true,
                    enableDragPan: true,
                    enableDblClickZoom: false,
                    mapMode: 0,
                    activateTrafficMap: false,
                    activateBicycleMap: false,
                    minMaxLevel: [_this.obj.initMapZoom, 14],
                    zoomControl: true,
                    zoomControlOptions: {
                        position: naver.maps.Position.TOP_RIGHT
                    },
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                        style: naver.maps.MapTypeControlStyle.BUTTON,
                        position: naver.maps.Position.TOP_RIGHT
                    },
                    scaleControl: true,
                    scaleControlOptions: {
                        position: naver.maps.Position.RIGHT_BOTTOM
                    },
                    logoControl: true,
                    logoControlOptions: {
                        position: naver.maps.Position.TOP_LEFT
                    },
                    mapDataControl: true,
                    mapDataControlOptions: {
                        position: naver.maps.Position.BOTTOM_LEFT
                    }
                }, this.obj.map));
            },
            fnMapsMarker: function(o) {
                var b = {};
                var html = '';
                for(var i in o) {
                    b[i] = o[i] ? o[i] : this.obj.nullmsg;
                }
                html += '<div class="map-info-window">';
                html += '<h3 class="tit">' + b.title + '</h3>';
                html += '<dl class="adr"><dt>도로명주소</dt><dd>' + b.address1 + '</dd></dl>';
                html += '<dl class="adr"><dt>지번주소</dt><dd>' + b.address2 + '</dd></dl>';
                html += '<dl class="adr"><dt>이용요금</dt><dd>' + b.w + '</dd></dl>';
                html += '<dl class="adr"><dt>이용시간</dt><dd>' + b.t + '</dd></dl>';
                html += '<dl class="adr"><dt>전화번호</dt><dd>' + b.p + '</dd></dl>';
                html += '<button class="map_laypop_info ' + this.clsformat(this.opt.layerpopbtn) + '" data-idx="' + o.sec + '">상세정보</button>';
                html += '</div>';
                var marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(b.x, b.y),
                    icon: {
                        content: '<div style="width:100px;"><img src="./images/marker.png" alt="" ' + 'style="margin: 0; padding: 0; border: 0 solid transparent; display: block; max-width: 100%; ' + 'max-height: none; -webkit-user-select: none; position: absolute; width: 32px; left: 0; top: 0;"/>' + '<div style="position: absolute; top: 40px; left: -60px; color: #000; font-weight: bold; font-size: 12px; text-indent: -999em;">' + b.title + '</div></div>',
                        size: new naver.maps.Size(28, 37),
                        anchor: new naver.maps.Point(11, 35)
                    },
                    map: this.map
                });
                var infoWindow = new naver.maps.InfoWindow({
                    content: html
                });
                this.opt.onlymarkers.push(marker);
                this.opt.markers.push([marker, infoWindow]);
            },
            fnMapsClust: function(markers) {
                var _this = this;
                var markerClustering = new MarkerClustering({
                    minClusterSize: 2,
                    maxZoom: 8,
                    map: _this.map,
                    markers: markers,
                    disableClickZoom: false,
                    gridSize: 120,
                    icons: [{
                        content: '<div class="map_cluster"></div>',
                        size: N.Size(50, 50),
                        anchor: N.Point(25, 25)
                    }],
                    indexGenerator: [10, 100, 200, 500, 1000],
                    stylingFunction: function(clusterMarker, count) {
                        $(clusterMarker.getElement()).find('div:first-child').text(count);
                    }
                });
            },
            fnDataParsLstBind: function() {
                var _this = this;
                $(_this.obj.fnMapsLstTarget).find('>li, >dd').on({
                    'click': function() {
                        var $this = $(this);
                        var $data = $this.find('>a').data('params');
                        _this.fnMapsInfoWindow($data.x, $data.y);
                        _this.fnMapsLatLngMove($data);
                    }
                });
            },
            fnMapsLatLngMove: function(o, zoom) {
                this.map.setCenter(new naver.maps.LatLng(o.y, o.x));
                this.map.setOptions({
                    zoom: zoom ? zoom : 8
                });
            },
            fnMapsInfoBind: function() {
                var _this = this;
                for(var i = 0; i < this.opt.markers.length; i++) {
                    naver.maps.Event.addListener(this.opt.markers[i][0], "click", function(e) {
                        _this.fnMapsInfoWindow(e.overlay.position.x, e.overlay.position.y);
                    });
                }
            },
            fnMapsInfoWindow: function(ex, ey) {
                var _this = this;
                var c = 0;
                $(_this.obj.fnMapsLstTarget).find('>li').each(function() {
                    var $this = $(this);
                    var $data = $this.find('>a').data('params');
                    if(ey == $data.y && ex == $data.x) {
                        _this.fnDataParsLstCallback($this, $data);
                        c = $this.index();
                    }
                });
                if(_this.opt.markers[c][1].getMap()) {
                    _this.opt.markers[c][1].close();
                } else {
                    _this.opt.markers[c][1].open(_this.map, _this.opt.markers[c][0]);
                    _this.fnDetailDiaLogBind();
                }
            },
            fnDetailDiaLogBind: function() {
                var _this = this;
                $(_this.opt.layerpopbtn).off().on({
                    'click': function() {
                        var $this = $(this);
                        var $data = $this.data('idx');
                        _this.fnDetailDiaLogGet($data);
                        return false;
                    }
                });
            },
            fnDetailDiaLogGet: function(data) {
                $(this.obj.layerpopname).cmmLocLaypop($.extend({
                    beforeCallback: function($el) {
                        var html = '';
                        var idx = 0;
                        var oddeven = '';
                        for(var i in GET_DATA_RECORD[data]) {
                            if(idx % 2 == 0) {
                                oddeven = 'even';
                            } else {
                                oddeven = 'odd';
                            }
                            html += '<li class="tp tp' + idx + ' ' + oddeven + '"><span class="lab">' + i + '</span><span class="txt">' + GET_DATA_RECORD[data][i] + '</span></li>';
                            idx++;
                        }
                        $el.find('.lst').html(html);
                        $el.find('.tnLst .tp').removeClass('active');
                        $el.find('.tnLst .tp').each(function() {
                            var $this = $(this);
                            var $txt = $this.data('tncWord');
                            if(GET_DATA_RECORD[data][GET_DATA_ID[12].id].indexOf($txt) != -1) {
                                $this.addClass('active');
                            }
                        });
                    }
                }, this.obj.layerpopobj));
            },
            fnDataParsLstCallback: function($this, $data) {
                if($this.closest('li').is('.active')) {
                    $(this.obj.fnMapsLstTarget).find('>li, >dd').removeClass('active');
                    return;
                }
                $(this.obj.fnMapsLstTarget).find('>li, >dd').removeClass('active');
                $this.closest('li').addClass('active');
                $(this.obj.fnMapsLstTarget).stop().animate({
                    'scrollTop': $this[0].offsetTop - $(this.obj.fnMapsLstTarget)[0].offsetTop
                }, this.animatecallb());
            },
            fnDataPars: function(d, search, filtercallback, callback) {
                var loca = new Array();
                var cnidx = [];
                this.opt.latArry = [];
                this.opt.lngArry = [];
                this.opt.markers = [];
                this.opt.onlymarkers = [];
                this.fnMapsSet(this.obj.mapid);
                if(search[1][0] === 0) {
                    loca = d;
                    for(var i = 0; i < d.length; i++) {
                        cnidx.push(i);
                    }
                } else {
                    for(var i = 0; i < d.length; i++) {
                        for(var key in d[i]) {
                            if(key == search[0][0]) {
                                if(d[i][key].indexOf(search[1][0]) != -1) {
                                    loca.push(d[i]);
                                    cnidx.push(i);
                                }
                            }
                        }
                    }
                }
                for(var i = 0; i < loca.length; i++) {
                    for(var key in loca[i]) {
                        if(key == search[0][1]) {
                            if(loca[i][key].indexOf(search[1][1]) != -1 || search[1][1] == 0) {
                                this.fnDataParsCallback(i, filtercallback, loca, cnidx[i]);
                            }
                        }
                    }
                }
                if(this.obj.cluster) {
                    this.fnMapsClust(this.opt.onlymarkers);
                }
                if(!this.opt.latArry.length) {
                    alert(this.opt.errormsg[0]);
                    this.fnMapsNullLst(this.opt.errormsg[2]);
                    return;
                }
                if(typeof callback === 'function') {
                    callback();
                }
                this.fnMapsLatLngMove(this.fnMapsAlign(this.opt.latArry, this.opt.lngArry), this.obj.initMapZoom);
                this.fnDataParsLstBind();
            },
            fnDataParsCallback: function(i, filtercallback, loca, cnidx) {
                this.opt.latArry.push(loca[i][GET_DATA_ID[3].id]);
                this.opt.lngArry.push(loca[i][GET_DATA_ID[2].id]);
                this.fnMapsMarker({
                    sec: cnidx,
                    x: loca[i][GET_DATA_ID[2].id], //좌표x
                    y: loca[i][GET_DATA_ID[3].id], //좌표y
                    p: loca[i][GET_DATA_ID[6].id], //전화번호
                    t: loca[i][GET_DATA_ID[15].id], //이용시간
                    w: loca[i][GET_DATA_ID[16].id], //이용요금
                    title: loca[i][GET_DATA_ID[0].id], //이름
                    address1: loca[i][GET_DATA_ID[4].id], //도로
                    address2: loca[i][GET_DATA_ID[5].id], //지번주소
                });
                if(typeof filtercallback === 'function') {
                    filtercallback(loca[i]);
                }
            },
            fnMapsAlign: function(lata, lnga) {
                return {
                    x: (this.maxmin(lata).max - this.maxmin(lata).min) / 2 + this.maxmin(lata).min,
                    y: (this.maxmin(lnga).max - this.maxmin(lnga).min) / 2 + this.maxmin(lnga).min,
                }
            },
            maxmin: function(a) {
                return {
                    min: Math.min.apply(null, a),
                    max: Math.max.apply(null, a),
                };
            },
            animatecallb: function(o) {
                return $.extend({
                    duration: 300,
                    easing: 'swing',
                    step: function() {},
                    complete: function() {}
                }, o);
            },
            clsformat: function(n) {
                return n.replace('.', '');
            }
        },
    };
})(jQuery);