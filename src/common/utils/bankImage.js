export default function getBankImageWithCode(bankCode){
    console.log('bankCode',bankCode)
        if(bankCode=='ICBC'){
            //工商银行
            return require('@/image/bank/gs@2x.png')
        };
        if(bankCode=='ABC'){
           //农业银行
            return require('@/image/bank/ny@2x.png')
        };
        if(bankCode=='BOB'){
            // 北京银行
            return require('@/image/bank/bj@2x.png')
        }
        if(bankCode=='GDB'){
            // 广发银行
            return require('@/image/bank/gdfz@2x.png')
        }

        if(bankCode=='CCB'){
            //建设银行
            return require('@/image/bank/js@2x.png')
        }
        if(bankCode=='BOC'){
            //中国银行
            return require('@/image/bank/zg@2x.png')
        }
        if(bankCode=='SZPAB'){
            //平安银行
            return require('@/image/bank/pa@2x.png')
        }
        if(bankCode=='CEB'){
            //光大银行
            return require('@/image/bank/gd@2x.png')
        }
        if(bankCode=='CIB'){
            //兴业银行
            return require('@/image/bank/xy@2x.png')
        }
        if(bankCode=='CMB'){
            //招商银行
            return require('@/image/bank/zs@2x.png')
        }
        if(bankCode=='COMM'){
            //交通银行
            return require('@/image/bank/jt@2x.png')
        }
        if(bankCode=='SPDB'){
            //浦发银行
            return require('@/image/bank/pdfz@2x.png')
        }
        if(bankCode=='SHBK'){
            //上海银行
            return require('@/image/bank/sh@2x.png')
        }
        if(bankCode=='CMBC'){
            //民生银行
            return require('@/image/bank/ms@2x.png')
        }
        if(bankCode=='CITIC'){
            //中信银行
            return require('@/image/bank/zx@2x.png')
        }
        if(bankCode=='PSBC'){
            //邮政银行
            return require('@/image/bank/yz@2x.png')
        }
        if(bankCode=='HXB'){
            //华夏银行
            return require('@/image/bank/hx@2x.png')
        }
        if(bankCode=='CZB'){
            //浙商银行
            return require('@/image/bank/zheshang@2x.png')
        }

        return '';

}

// 工商银行  ICBC  1
// 农业银行  ABC   2
// 北京银行  BOB   3
// 广发银行  GDB   4
// 建设银行  CCB   5
// 中国银行  BOC   6
// 平安银行  SZPAB 7
// 光大银行  CEB   8
// 兴业银行  CIB   9
// 招商银行  CMB   10
// 交通银行  COMM  11
// 浦发银行  SPDB  12
// 上海银行  SHBK  13
// 民生银行  CMBC  14
// 中信银行  CITIC 15
// 邮政银行  PSBC  16
// 华夏银行  HXB   17
// 浙商银行  CZB   18
