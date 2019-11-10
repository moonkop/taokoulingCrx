res = {
    "ret": "调用成功",
    "url": "https://uland.taobao.com/coupon/edetail?e=xSI8pYi8KfoGQASttHIRqcRU84wUdwvPZ0rM088gVHrbLaGB9uZG%2BqpiOZOQWfB%2BGVPv4TQ5LdfD8Elz0ezfETdWopZfnoey819cieM8MLYF8rTm%2FMJPtsVCwcluH%2FFGqPvOl%2FdVh95KRHBRZLMjGmCBLf0Ce8vJQdUCsKS61xH3LTDo28QWQkbYLu1k1GIxF6Y%2FSGkgg%2B%2BMOmm%2BVf6hvw2U0kG5qm9DYwOD23XOnRHymNXcL2pzBKfcrHclERh1P3s63GgvVlQ%3D&traceId=0b51066415733899130327974e4a7b&union_lens=lensId%3AAPP%401573371259%400b18304f_0c78_16e543c2c44_2a4c%40043npAjHCRmx5K6HI0KY2qOp&traffic_flag=lm&scm=20140618.1.01010001.s101c6&spm=a21wq.8595780.1000.3&src=tblm_lmapp&un=cf86353cf5ac4132d038ceec619ae9fd&share_crt_v=1&ut_sk=1.utdid_null_1573389913284.TaoPassword-Outside.lianmeng-app&sp_tk=77+lYzRNVFl1OUFYUE7vv6U=",
    "content": "HOYO日本千鸟格毛巾纯棉洗脸家用高档毛巾礼盒伴手礼 2条装 定制",
    "picUrl": "https://img.alicdn.com/i1/4055393970/O1CN01thScoL1fCIx8uUEmO_!!4055393970-0-pixelsss.jpg",
    "taopwdOwnerId": "2652943783",
    "validDate": "29天22小时39分59秒",
    "pj": "taokouling.com",
    "code": 1,
    "msg": "调用成功"
};
$(document).ready(()=>{
    let resolveKey=(key)=>{
        return new Promise((resolve, reject) => {
            $.ajax({
                url:"https://api.taokouling.com/tkl/tkljm?apikey=VTIjdwvcpb&tkl="+key,
                dataType:'json',
                success:(res)=>{
                    console.log(res);
                    if (res.ret == '调用成功'){
                        $("#img")[0].src=res.picUrl;
                        $("#title")[0].innerText=res.content;
                        let open = () => {
                            window.open(res.url);
                        };
                        $("#openBtn").bind('click',open)
                        $("#img").bind("click",open)
                        $("#openBtn").attr("hidden",'')
                        resolve(res);
                    }else{
                        reject(res);
                    }
                }
            })

        })

    }
    let getKey=()=>{
        return $("#inputKey").val();
    }
    $("#resolveBtn").bind("click",()=>{
        resolveKey(getKey());
    })
    $("#resolveOpenBtn").bind('click',async ()=>{
        let res = await resolveKey(getKey());
        window.open(res.url);
    })
    $("#inputKey").focus();

    console.log('loaded')
})
