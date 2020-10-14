/**
 * @author lihui
 */
/**
 * @author lihui
 */
var appid = 1;
if (!("TextDecoder" in window))
    alert("Sorry, this browser does not support TextDecoder...");

var protocol = new Object();
var enc = new TextDecoder("utf-8");
protocol.svid = {
    SVID_ALL : 0,
    SVID_MARKET : 100,
    SVID_BASE : 30000,
};

protocol.uri = {
    PMarketPing_uri				: protocol.svid.SVID_MARKET << 16 | 1,
    PMarketWatchInfo_uri		: protocol.svid.SVID_MARKET << 16 | 2,
    PMatchSuccessInfo_uri		: protocol.svid.SVID_MARKET << 16 | 3,
    PMarketOrder_uri			: protocol.svid.SVID_MARKET << 16 | 4,
    PMarket24HoursData_uri		: protocol.svid.SVID_MARKET << 16 | 5,
    PMarketKLine_uri			: protocol.svid.SVID_MARKET << 16 | 6,
    PMarketKLineRes_uri			: protocol.svid.SVID_MARKET << 16 | 7,
    PMarketKLineCurrent_uri		: protocol.svid.SVID_MARKET << 16 | 8,
    PMarketOptional_uri			: protocol.svid.SVID_MARKET << 16 | 9,
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
                var reallen = items[idx].value.replace(/[\u0391-\uFFE5]/g,"aaa").length;
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

    console.info("size:" + (size));
    if (isRetArray == true) {
        return {
            blobItemArray : blobItemArray,
            size : size
        };
    }

    var blob = new Blob(blobItemArray);

    return blob;
};

function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for ( i = 0; i < len; i++) {
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
        console.info("websoket connect.");
        //obj.currentTarget.myobj.auth();
        obj.currentTarget.myobj.watchInfo("BTC" )
        obj.currentTarget.myobj.watchInfo("DC", "BTC")
        obj.currentTarget.myobj.setOptional("{\"add\":[\"DC:BTC\", \"BTC:BTC\"]}" )
        obj.currentTarget.myobj.setOptional("{\"remove\" : [\"BTC:ETH\"]}" )
        obj.currentTarget.myobj.setOptional("{\"market\":\"DC\"}" )//发送当前DC市场下的所有币种信息
        setInterval(function() {
            obj.currentTarget.myobj.ping();
        }, 60000);



    };

    this.onmessage = function(evt) {
        //console.info(evt.data);
        //  socket.close();
        var fr = new FileReader();
        fr.readAsArrayBuffer(evt.data);

        fr.onload = function() {
            var dv = new DataView(this.result);

            //for(var i =0;i<dv.byteLength;++i){
            //	console.info('i:'+i+';value：'+dv.getUint8(i));
            //}
            var msgFlag = dv.getUint16(4);
            var msgType = dv.getUint16(6);
            if(msgFlag == 100 && msgType == 5){//24小时市场各币种统计
                var jsonString = decodeBufferString(dv,dv.getUint16(10),12);
                console.info("****24小时市场各币种统计:");
                console.info(jsonString);
                scoketMessage(jsonString)
            }

            if(msgFlag == 100 && msgType == 4){//挂单数据
                var jsonString = decodeBufferString(dv,dv.getUint16(10),12);
                console.info("****挂单数据:");
                console.info(jsonString);
                // var obj = JSON.parse(jsonString);
                // for(var i in obj)
                // {
                // console.info( "\""+ i + "\"" + ":" );
                // console.info(obj[i]);
                // }
            }

            if(msgFlag == 100 && msgType == 3){//成交数据
                var jsonString = decodeBufferString(dv,dv.getUint16(10),12);
                console.info("****成交数据:");
                console.info(jsonString);
                // var obj = JSON.parse(jsonString);
                // for(var i in obj)
                // {
                // console.info( i + " : " + obj[i]);
                // }
            }
            if(msgFlag == 100 && msgType == 7){//k线数据
                var offset  = 10;
                var len = dv.getUint16(offset);
                offset+=2;
                var market = decodeBufferString(dv,len,offset);
                offset +=len;
                len = dv.getUint16(offset)
                offset+=2;
                var coin = decodeBufferString(dv,len,offset);
                offset+=len;
                var type = dv.getUint16(offset);
                offset+=2;
                var offset_k = dv.getUint16(offset);
                offset+=2;
                var time = dv.getUint32(offset);
                offset+=4;
                len = dv.getUint16(offset);
                offset+=2;
                var data = decodeBufferString(dv,len,offset);

                console.info("****k线数据:" + "market:" + market +" " + "coin:" + coin + " " + "type:" + type + " " + "offset:" + offset_k);
                //console.info(data);
                // var obj = JSON.parse(data);
                // for(var i in obj)
                // {
                // var newDate = new Date();
                // newDate.setTime(obj[i][0] * 1000);
                // console.info(newDate.toLocaleString() + " : " + obj[i]);
                // }
            }
            if(msgFlag == 100 && msgType == 8){//当前分钟k线数据
                var offset  = 10;
                var len = dv.getUint16(offset);
                offset+=2;
                var jsonString = decodeBufferString(dv,len,offset);
                offset +=len;
                len = dv.getUint16(offset)
                offset+=2;
                var jsonString1 = decodeBufferString(dv,len,offset);
                console.info("****当前分钟k线数据:");
                console.info(jsonString);
                console.info(jsonString1);
            }
        };

    };

    this.onclose = function() {
        console.info("WebSocketClosed");

        // window.location.reload();
        //this.connect();
        //obj.currentTarget.myobj.connect();
    };

    this.onerror = function() {
        console.log("WebSocketError");
    };

    this.send = function (message, callback) {
        this.waitForConnection(function () {
            socket.send(message);
            if (typeof callback !== 'undefined') {
                callback();
            }
        }, 1000);
    };

    this.waitForConnection = function (callback, interval) {
        if (socket.readyState === 1) {
            callback();
        } else {
            var that = this;
            // optional: implement backoff for interval here
            setTimeout(function () {
                that.waitForConnection(callback, interval);
            }, interval);
        }
    };

    this.ping = function(){
        //console.log('ping...');
        var packInfo = protocol.pack(protocol.uri.PMarketPing_uri,[{
            type:'uint32',
            value: Date.parse(new Date())/1000
        }]);
        this.send(packInfo);
    }

    this.watchInfo = function(market,coin){
        var realcoin = typeof coin == 'undefined' ? '' : coin;
        var packInfo = protocol.pack(protocol.uri.PMarketWatchInfo_uri,[{
            type:'string16',
            value: market
        },{
            type:'string16',
            value: realcoin
        }]);
        this.send(packInfo);
    }

    this.klineInfo = function(market,coin, type, offset){
        var realcoin = typeof coin == 'undefined' ? '' : coin;
        var packInfo = protocol.pack(protocol.uri.PMarketKLine_uri,[{
            type:'string16',
            value: market
        },{
            type:'string16',
            value: realcoin
        },{
            type:'uint16',
            value: type
        },{
            type:'uint16',
            value: offset
        },{
            type:'uint32',
            value: 0
        }
        ]);
        this.send(packInfo);
    }


    this.setOptional = function(info){
        var packInfo = protocol.pack(protocol.uri.PMarketOptional_uri,[{
            type:'string16',
            value: info
        }]);
        this.send(packInfo);
    }

    /*
    this.sendMsg = function(msg, touid) {
        var textInfo = protocol.pack(protocol.uri.PIMTextInfo, [{
            type : 'string16',
            value : msg
        }, {
            type : 'string16',
            value : ""
        }, {
            type : 'uint16',
            value : 0
        }, {
            type : 'uint8',
            value : 0
        }, {
            type : 'uint8',
            value : 0
        }, {
            type : 'string16',
            value : ""
        }]);
        var msgUuid = randomString(32);
        var sendmsg = protocol.pack(protocol.uri.PIMSendMsg, [{
            type : 'uint8',
            value : deviceType
        }, {
            type : 'string16',
            value : msgUuid
        }, {
            type : 'uint64',
            value : {
                hi : 0,
                lo : uid
            }
        }, {
            type : 'uint64',
            value : {
                hi : 0,
                lo : touid
            }
        }, {
            type : 'uint32',
            value : 1
        }, {
            type : 'string16',
            value : "Joseph"
        }, {
            type : 'uint64',
            value : {
                hi : 0,
                lo : Date.parse(new Date()) / 1000
            }
        }, {
            type : 'uint64',
            value : {
                hi : 0,
                lo : 0
            }
        }, {
            type : 'uint16',
            value : 1
        },{
            type : 'string16',
            value : ""
        }, {
            type : 'uint64',
            value : {
                hi : 0,
                lo : 0
            }
        },{
            type : 'uint8',
            value : ''
        },{
            type : 'blob',
            value : textInfo
        }]);

        var transUp = protocol.pack(protocol.uri.PTransUp, [{
            type : 'uint16',
            value : protocol.svid.SVID_IM
        }, {
            type : 'uint64',
            value : uid
        }, {
            type : 'blob',
            value : sendmsg
        }, {
            type : 'uint8',
            value : 0
        }, {
            type : 'uint32',
            value : 0
        }]);

        this.send(transUp);
        return msgUuid;
    };
	*/
};

function decodeBufferString(buffer,lenth,offer_set){
    var ret_arr = [];
    for(var i =0;i<lenth;++i){
        ret_arr.push(buffer.getUint8(offer_set+i));
    }
    if(lenth == 8){
        console.info(ret_arr);
    }
    var ret_arr_uint8 = new Uint8Array(ret_arr);
    return enc.decode(ret_arr_uint8);
}
function scoketMessage(data) {
    return data;
}
export  {imvSDK,scoketMessage}