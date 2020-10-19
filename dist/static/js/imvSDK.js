var appid = 1;
var k_time = 0;
var fn = window.fn;
var protocol = new Object();

protocol.svid = {
    SVID_ALL: 0,
    SVID_MARKET: 100,
};

protocol.uri = {
    PMarketPing_uri: protocol.svid.SVID_MARKET << 16 | 1,
    PMarketWatchInfo_uri: protocol.svid.SVID_MARKET << 16 | 2,
    PMatchSuccessInfo_uri: protocol.svid.SVID_MARKET << 16 | 3,
    PMarketOrder_uri: protocol.svid.SVID_MARKET << 16 | 4,
    PMarket24HoursData_uri: protocol.svid.SVID_MARKET << 16 | 5,
    PMarketKLine_uri: protocol.svid.SVID_MARKET << 16 | 6,
    PMarketKLineRes_uri: protocol.svid.SVID_MARKET << 16 | 7,
    PMarketKLineCurrent_uri: protocol.svid.SVID_MARKET << 16 | 8,
    PMarketOptional_uri: protocol.svid.SVID_MARKET << 16 | 9,
    PMarketWatch24HoursData_uri: protocol.svid.SVID_MARKET << 16 | 10,
    PMarketWatchCoinCap_uri: protocol.svid.SVID_MARKET << 16 | 11,

    PMarketLogin_uri            : protocol.svid.SVID_MARKET << 16 | 12,
    PMarketLoginRes_uri         : protocol.svid.SVID_MARKET << 16 | 13,
    PMatchOrderNotification_uri : protocol.svid.SVID_MARKET << 16 | 14,
    PMatchConsensusInfo_uri     : protocol.svid.SVID_MARKET << 16 | 15//下发共识区24小时币种变化

};

protocol.pack = function(uri, items, isRetArray, isPushHeader) {
    var size = 0;
    var blobItemArray = [];

    if (isPushHeader == undefined) {
        isPushHeader = true;
    }

    for (var idx in items) {
        switch (items[idx].type) {
            case 'uint8':
                //console.info("uint8");
                var buffer = new ArrayBuffer(1);
                new DataView(buffer).setUint8(0, items[idx].value, false);
                blobItemArray.push(buffer);
                size += 1;
                break;
            case 'uint16':
                //console.info("uint16");
                var buffer = new ArrayBuffer(2);
                new DataView(buffer).setUint16(0, items[idx].value, false);
                blobItemArray.push(buffer);
                size += 2;
                break;
            case 'uint32':
                //console.info("uint32");
                var buffer = new ArrayBuffer(4);
                new DataView(buffer).setUint32(0, items[idx].value, false);
                blobItemArray.push(buffer);
                size += 4;
                break;
            case 'uint64':
                //console.info("uint64");
                var buffer = new ArrayBuffer(8);
                new DataView(buffer).setUint32(0, items[idx].value.hi, false);
                new DataView(buffer).setUint32(4, items[idx].value.lo, false);
                blobItemArray.push(buffer);
                size += 8;
                break;
            case 'string16':
                //console.info("string");
                var buffer = new ArrayBuffer(2);
                var reallen = items[idx].value.replace(/[\u0391-\uFFE5]/g, "aaa").length;
                new DataView(buffer).setUint16(0, reallen, false);
                blobItemArray.push(buffer);
                blobItemArray.push(items[idx].value);
                size += 2 + items[idx].value.length;
                break;
            case 'string32':
                //console.info("string");
                var buffer = new ArrayBuffer(4);
                new DataView(buffer).setUint32(0, items[idx].value.length, false);
                blobItemArray.push(buffer);
                blobItemArray.push(items[idx].value);
                size += 4 + items[idx].value.length;
                break;
            case 'vector16':
                //console.info("vector16");
                var buffer = new ArrayBuffer(2);
                new DataView(buffer).setUint16(0, items[idx].value.length, false);
                blobItemArray.push(buffer);
                for (var vIdx in items[idx].value) {
                    var vRet = protocol.pack(null, items[idx].value[vIdx], true, false);
                    blobItemArray = blobItemArray.concat(vRet.blobItemArray);
                    size += vRet.size;
                }
                break;
            case 'vector32':
                //console.info("vector32");
                var buffer = new ArrayBuffer(4);
                new DataView(buffer).setUint32(0, items[idx].value.length, false);
                blobItemArray.push(buffer);
                for (var vIdx in items[idx].value) {
                    var vRet = protocol.pack(null, items[idx].value[vIdx], true, false);
                    blobItemArray = blobItemArray.concat(vRet.blobItemArray);
                    size += vRet.size;
                }
                break;
            case 'blob':
                //console.info("blob");
                var buffer = new ArrayBuffer(2);
                new DataView(buffer).setUint16(0, items[idx].value.size, false);
                blobItemArray.push(buffer);
                blobItemArray.push(items[idx].value);
                size += 2 + items[idx].value.size;
                break;
            default:
                console.error("Unkown blobItem type [" + items[idx].type + "].");
                return undefined;
        };
    };

    if (isPushHeader) {
        //Header
        var buffer = new ArrayBuffer(10);
        size += 10;
        new DataView(buffer).setUint32(0, size, false);
        new DataView(buffer).setUint32(4, uri, false);
        new DataView(buffer).setUint16(8, appid, false);

        blobItemArray.splice(0, 0, buffer);
    }

    if (isRetArray == true) {
        return {
            blobItemArray: blobItemArray,
            size: size
        };
    }

    var blob = new Blob(blobItemArray);

    return blob;
};

function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = location.search.substr(1).match(reg);
    if (r != null)
        return unescape(decodeURI(r[2]));
    return null;
}

function imvSDK(option) {

    var host = option.host;

    this.getHost = function() {
        return host;
    };

    var socket = null;

    function initSocket(imv) {
        socket = new WebSocket(host);
        socket.onopen = imv.onopen;
        socket.onmessage = imv.onmessage;
        socket.onclose = imv.onclose;
        socket.error = imv.error;
        socket.binaryType = "blob";
    };

    this.connect = function() {
        if (!socket || socket.readyState != 1) {
            initSocket(this);
            socket.myobj = this;
        }
    };

    this.onopen = function(obj) {
        setInterval(function() {
            obj.currentTarget.myobj.ping();
        }, 30000);



    };

    this.onmessage = function(evt) {
        //console.info(evt.data);
        //  socket.close();
        var fr = new FileReader();
        fr.readAsArrayBuffer(evt.data);

        fr.onload = function() {
            var dv = new DataView(this.result);
            var msgID = dv.getUint32(4);

            if (msgID == protocol.uri.PMarketOrder_uri) {
                var jsonString = decodeBufferString(dv, dv.getUint16(10), 12);
                console.log(jsonString, '4-16');
                fn.trades(jsonString)
            }
            if (msgID == protocol.uri.PMarket24HoursData_uri) {
                var jsonString = decodeBufferString(dv, dv.getUint16(10), 12);

                fn.scoketMessage(jsonString)
            }
            if (msgID == protocol.uri.PMatchSuccessInfo_uri) {
                var jsonString = decodeBufferString(dv, dv.getUint16(10), 12);
                fn.dealDatas(jsonString)
            }
            if (msgID == protocol.uri.PMarketKLineRes_uri) {
                var offset = 10;
                var len = dv.getUint16(offset);
                offset += 2;
                var market = decodeBufferString(dv, len, offset);
                offset += len;
                len = dv.getUint16(offset)
                offset += 2;
                var coin = decodeBufferString(dv, len, offset);
                offset += len;
                var type = dv.getUint16(offset);
                offset += 2;
                var offset_k = dv.getUint16(offset);
                offset += 2;
                var time = dv.getUint32(offset);
                offset += 4;
                len = dv.getUint16(offset);
                offset += 2;
                var data = decodeBufferString(dv, len, offset);
                console.info("****k线数据:" + "market:" + market + " " + "coin:" + coin + " " + "type:" + type + " " + "offset:" + offset_k + "time:" + time);

                fn.KlineData(data, market, coin, type, offset)
            }
            if (msgID == protocol.uri.PMarketKLineCurrent_uri) {
                var offset = 10;
                var len = dv.getUint16(offset);
                offset += 2;
                var jsonString = decodeBufferString(dv, len, offset);
                offset += len;
                len = dv.getUint16(offset)
                offset += 2;
                var data = decodeBufferString(dv, len, offset);
                console.log('16-8', data)
                fn.KlineDataM(data)
            }

            if (msgID == protocol.uri.PMarketWatch24HoursData_uri) {
                var jsonString = decodeBufferString(dv, dv.getUint16(10), 12);
                fn.market24(jsonString)
            }

            if (msgID == protocol.uri.PMarketWatchCoinCap_uri) {
                var jsonString = decodeBufferString(dv, dv.getUint16(10), 12);
                fn.scoketBBMessage(jsonString)
            }

            if(msgID == protocol.uri.PMarketLoginRes_uri)
            {
                var offset  = 10;
                var rescode = dv.getUint32(offset);
                console.info("login to marketinfo rescode:" + rescode );
            }
            if(msgID == protocol.uri.PMatchOrderNotification_uri)
            {
                var jsonString = decodeBufferString(dv,dv.getUint16(10),12);
                console.info("****挂单撮合成交信息:");
                console.info(jsonString);
                fn.entrust(jsonString)
            }
            if(msgID == protocol.uri.PMatchConsensusInfo_uri)
            {
                var jsonString = decodeBufferString(dv,dv.getUint16(10),12);
                console.info("****共识区内容:");

                fn.entrust11(jsonString)
            }
            if(msgID == protocol.uri.PMarketSendMsg_uri)
            {
                var offset  = 10;
                var fromid = dv.getUint32(offset);
                offset+=4;
                var toid = dv.getUint32(offset);
                offset+=4;
                len = dv.getUint16(offset);
                offset+=2;
                var data = decodeBufferString(dv,len,offset);

                console.info("message from:" + fromid+  " to:" + toid +" msg:" + data );


            }

        };

    };

    this.onclose = function() {
        console.log("WebSocket connected");
        fn.connect();
    };

    this.onerror = function() {};

    this.send = function(message, callback) {
        this.waitForConnection(function() {
            socket.send(message);
            if (typeof callback !== 'undefined') {
                callback();
            }
        }, 1000);
    };

    this.waitForConnection = function(callback, interval) {
        if (socket.readyState === 1) {
            callback();
        } else {
            var that = this;
            setTimeout(function() {
                that.waitForConnection(callback, interval);
            }, interval);
        }
    };

    this.ping = function() {
        var packInfo = protocol.pack(protocol.uri.PMarketPing_uri, [{
            type: 'uint32',
            value: Date.parse(new Date()) / 1000
        }]);
        this.send(packInfo);
    }

    this.watchInfo = function(market, coin) {
        var realcoin = typeof coin == 'undefined' ? '' : coin;
        var packInfo = protocol.pack(protocol.uri.PMarketWatchInfo_uri, [{
            type: 'string16',
            value: market
        }, {
            type: 'string16',
            value: realcoin
        }]);
        this.send(packInfo);
    }

    this.klineInfo = function(market, coin, type, offset, time) {
        var realcoin = typeof coin == 'undefined' ? '' : coin;
        var packInfo = protocol.pack(protocol.uri.PMarketKLine_uri, [{
            type: 'string16',
            value: market
        }, {
            type: 'string16',
            value: realcoin
        }, {
            type: 'uint16',
            value: type
        }, {
            type: 'uint16',
            value: offset
        }, {
            type: 'uint32',
            value: time
        }]);
        this.send(packInfo);
    }


    this.setOptional = function(info) {
        var packInfo = protocol.pack(protocol.uri.PMarketOptional_uri, [{
            type: 'string16',
            value: info
        }]);
        this.send(packInfo);
    }
    this.marketinfLogin = function (device_type, token) {
        var packInfo = protocol.pack(protocol.uri.PMarketLogin_uri, [
            {
                type: 'uint16',
                value: device_type
            },
            {
                type: 'string16',
                value: token
            }
        ]);
        this.send(packInfo);
    }
    this.marketinfLogin = function (device_type, token) {
        var packInfo = protocol.pack(protocol.uri.PMarketLogin_uri, [
            {
                type: 'uint16',
                value: device_type
            },
            {
                type: 'string16',
                value: token
            }
        ]);
        this.send(packInfo);
    }
};

function decodeUTF8(arr) {
    var str = '';
    for (var i = 0; i < arr.length; i++) {
        str += String.fromCharCode(arr[i]);
    }
    return decodeURIComponent(escape(str));
}

function decodeBufferString(buffer, lenth, offer_set) {
    var ret_arr = [];
    for (var i = 0; i < lenth; ++i) {
        ret_arr.push(buffer.getUint8(offer_set + i));
    }
    if (lenth == 8) {}
    var ret_arr_uint8 = new Uint8Array(ret_arr);
    return decodeUTF8(ret_arr_uint8);
}