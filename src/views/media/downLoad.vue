<template>
    <div class="downLoad">
        <div class="main ">
            <img src="../../images/media/bg.png" width="100%" alt="">
        </div>
        <div class="load">
            <img src="../../images/media/ios.png" width="30%" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "appDownLoad",
        data() {
            return {};
        },
        methods: {
            editE :function(num) {
                if (!num) {return num}
                num = num.toString()
                if (num.indexOf('e') === -1) { return num }
                let reg = /(?:(\d)+(?:.(\d+))?)[e]{1}-(\d)/.exec(num)
                if (!reg) {
                    return num
                }
                let v = num
                if (reg[3] === '7') {
                    v = '0.000000' + (reg[2] ? reg[1] + reg[2] : reg[1])
                } else {
                    v = '0.0000000' + reg[1]
                }
                return v
            },


            convertNum: function (amount) {
                // 判断是否科学计数法,是则进行转换
                var num = 0;
                var result = [];
                amount = new String(amount);
                if ((amount.indexOf('E') != -1) || (amount.indexOf('e') != -1)) {
                    (amount.indexOf('E') != -1) ? num = amount.indexOf('E') : num = amount.indexOf('e');
                    var decimal = amount.substr(0, num);
                    // devide the sentice efficial number
                    var decArr = decimal.split('.', 2);
                    // total 10 power
                    var power = amount.substr(num + 1, amount.length);
                    // symbol + -
                    var symbol = power.substr(0, 1);
                    power = power.substr(1, power.length);
                    power = power * 1.0;
                    if ('+' == symbol) {
                        // the number of 0 is power - decArr[1]
                        power = power - decArr[1].length;
                        // the return data
                        while (power > 0) {
                            result.unshift(0);
                            power -= 1;
                        }
                        result.unshift(decArr[1] * 1.0);
                        result.unshift(decArr[0] * 1.0);
                    } else {
                        power = power - decArr[1].length;
                        var result = [0];
                        result.push('.');
                        while (power > 0) {
                            result.push(0);
                            power -= 1;
                        }
                        result.push(decArr);
                    }
                    result.join("");
                    result = result + '';
                    amount = result.replace(/,/g, '');
                    alert(amount);
                } else {
                    alert(amount);
                }


            }
        },
        mounted(){
            alert(this.editE('4e-7'))
        }
    }
</script>

    <style scoped>
        body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,button,textarea,p,blockquote,th,td { margin:0; padding:0; }
        .load{
            margin-top: -143px;
            width: 100%;
            text-align: center;
            z-index: 999;
        }

    </style>