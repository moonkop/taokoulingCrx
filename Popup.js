let res = {
    "code": 200,
    "data": {
        "category_id": 50016422,
        "coupon_click_url": "https://uland.taobao.com/coupon/edetail?e=j7GkgSWESmoE%2BdAb1JoOOmT0cz7S41W6ElOKhj%2FT%2B0HLlj6PKR%2BSOMsVMUZNJP%2FLJN1xUl8YvXFhHw7CV8EJXH%2F4Vru%2FikDrO3C1FHCcJS%2Flw0Uysm7hYBemP0hpIIPvjDppvlX%2Bob8NlNJBuapvQ2MDg9t1zp0RHkLldzKuGCxFO8R2EPFtqUMuxoRQ3C%2BHMm4TK7nr5Xyie%2FpBy9wBFg%3D%3D&traceId=0b5113ac15890963033003203e11ba&union_lens=lensId:0b175abc_0e05_171fd854adc_4b9b&xId=6rKU6nMQJunEQWi9FJq6H6wZGrDpLKeRDfZjPHWT5E4W21rQiEA9URWLA1QZYpveEEhdHYgeJGTsJN3A2fyRFA&activityId=4db5c999c61740afab839f32cb1a5d78",
        "coupon_end_time": "2020-05-12",
        "coupon_info": "满10元减3元",
        "coupon_remain_count": 89000,
        "coupon_start_time": "2020-05-10",
        "coupon_total_count": 100000,
        "coupon_type": 0,
        "item_id": 607840862824,
        "item_url": "https://s.click.taobao.com/t?e=m%3D2%26s%3Djtd%2Bb%2BJ%2BCPRw4vFB6t2Z2ueEDrYVVa64K7Vc7tFgwiHLWlSKdGSYDjGvjoAaYPHEt4hWD5k2kjOUGOVNXiQhhWvq05R6NZ%2FMYKtc7agVg6UDDlXfUO2h%2FYz4rjZDGVMAzGXhme5IoQYJ3bH4VPbH5f1SarTXhIOTrhzfEh3ilxbvVacCb%2FND0tkYvQZuIwx3oGeIQL4Fi9Gz6194wxmAf5GAJg80DKMDf21Bzx46wt%2FrN430YghHCA%3D%3D&union_lens=lensId:0b175abc_0e05_171fd854adc_4b9b&xId=6rKU6nMQJunEQWi9FJq6H6wZGrDpLKeRDfZjPHWT5E4W21rQiEA9URWLA1QZYpveEEhdHYgeJGTsJN3A2fyRFA",
        "max_commission_rate": "6.02",
        "item_info": {
            "cat_leaf_name": "即食火锅",
            "cat_name": "粮油米面/南北干货/调味品",
            "item_url": "https://detail.tmall.com/item.htm?id=607840862824",
            "ju_online_end_time": "0",
            "ju_online_start_time": "0",
            "ju_pre_show_end_time": "0",
            "ju_pre_show_start_time": "0",
            "material_lib_type": "1,2",
            "nick": "威其诺食品旗舰店",
            "num_iid": 607840862824,
            "pict_url": "https://img.alicdn.com/bao/uploaded/i2/3338479648/O1CN01WFv0ij2L8pq8dsrxQ_!!0-item_pic.jpg",
            "presale_deposit": "0",
            "presale_end_time": 0,
            "presale_start_time": 0,
            "presale_tail_end_time": 0,
            "presale_tail_start_time": 0,
            "provcity": "四川 广安",
            "reserve_price": "28.9",
            "seller_id": 3338479648,
            "small_images": {
                "string": [
                    "https://img.alicdn.com/i3/3338479648/O1CN01i0mD892L8pmC7HbeA_!!3338479648.jpg",
                    "https://img.alicdn.com/i1/3338479648/O1CN01OotQOV2L8pmEmenfy_!!3338479648.jpg",
                    "https://img.alicdn.com/i4/3338479648/O1CN01BkNWA92L8pmCyE9DW_!!3338479648.jpg",
                    "https://img.alicdn.com/i4/3338479648/O1CN01w9UQA02L8pm9GLl7F_!!3338479648.jpg"
                ]
            },
            "title": "威其诺自热小火锅速食网红自煮自助懒人火锅微辣素菜版即食麻辣烫",
            "tmall_play_activity_end_time": 0,
            "tmall_play_activity_start_time": 0,
            "user_type": 1,
            "volume": 50128,
            "zk_final_price": "10.9"
        },
        "has_coupon": true,
        "youhuiquan": "3",
        "quanlimit": "10"
    },
    "msg": "success"
};
function convertByMyApi(key){
    return new Promise((resolve)=>{
        $.ajax({
            url: "http://tbk.moonkop.com/tklConvert.php?pass="+key,
            dataType: 'json',
            success: (res) => {
                console.log(res);
                debugger;
                if (res.code == 200){
                    let url = '';
                    if (res.data.coupon_click_url){
                        url = res.data.coupon_click_url;
                    } else{
                        url = res.data.item_url;
                    }
                    let pict_url = res.data.item_info.pict_url;
                    let title = res.data.item_info.title
                    resolve({url,title,pict_url});
                } else{
                    resolve(false);
                }
            },
            error:()=>{
                resolve(false);
            }
        })

    })
}

function convertByTaokoulingApi(key){
    return new Promise((resolve)=>{
        $.ajax({
            url:"https://api.taokouling.com/tkl/tkljm?apikey=VTIjdwvcpb&tkl="+key,
            dataType:'json',
            success:(res)=>{
                console.log(res);
                if (res.ret == '调用成功'){
                    resolve({url:res.url,title:res.content,pict_url: res.picUrl})
                }else{
                    resolve(false);
                }
            },error:(err)=>{
                resolve(false);
            }
        })

    })
}

async function resolveAndOpen(key,callback=(res)=>{}){

    $("#resolveOpenBtn").text('解析中...').attr('disable',true);
    $("#resolveBtn").attr("hidden",true);

    let res = await resolveKey(key);
    callback(res);
    window.open(res.url);
}

async function resolveKey(key){
    let result = await convertByMyApi(key);
    if (!result){
        result = await convertByTaokoulingApi(key);
    }
    if (!result){
        alert("解析失败,请检查淘口令是否有效");
        return
    }
    $("#img")[0].src = result.pict_url;
    $("#title")[0].innerText = result.title;
    let open = () => {
        window.open(result.url);
    };
    $("#openBtn").bind('click',open);
    $("#img").bind("click",open);
    $("#openBtn").attr("hidden",'');
    return result;
}

function getKey(){
    return $("#inputKey").val();
}

$(document).ready(() => {

    bg = chrome.extension.getBackgroundPage();        // get the background page
    bg.document.body.innerHTML= "";                   // clear the background page

// add a DIV, contentEditable=true, to accept the paste action
    var helperdiv = bg.document.createElement("div");
    bg.document.body.appendChild(helperdiv);
    helperdiv.contentEditable = true;

// focus the helper div's content
    var range =bg.document.createRange();
    range.selectNode(helperdiv);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    helperdiv.focus();

// trigger the paste action
    bg.document.execCommand("Paste");

// read the clipboard contents from the helperdiv
    var clipboardContents = helperdiv.innerText;

    if (/^[A-Za-z0-9]{11}$/.test(clipboardContents)
        || /\W[A-Za-z0-9]{11}\W/.test(clipboardContents)){
        resolveAndOpen(clipboardContents,()=>{
            window.getSelection().removeAllRanges();
            bg.document.body.innerHTML= "";                   // clear the background page
            var helperdiv = bg.document.createElement("div");
            bg.document.body.appendChild(helperdiv);
            var range =bg.document.createRange();
            helperdiv.innerText = '$';
            range.selectNode(helperdiv);
            bg.getSelection().removeAllRanges();
            bg.getSelection().addRange(range);
            bg.document.execCommand("Copy");
        });
        $("#inputKey").val(clipboardContents);
    };

    $("#resolveBtn").bind("click",() => {
        return resolveKey(getKey());
    })
    $("#resolveOpenBtn").bind('click',async() => {
        await resolveAndOpen(getKey());
    })
    $("#inputKey").focus();

    console.log('loaded')
})
