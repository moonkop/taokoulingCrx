import { request } from "./request";

interface taokoulingApiResponse {
    ret: string;
    url: string;
    content: string;
    picUrl: string;
    validDate: string;
    code: number;
    msg: string;
}

export async function convertByTaokoulingApi (key) {
    let {res, err}: {
        res?: taokoulingApiResponse, err?: any
    } = await request({
        url: "https://api.taokouling.com/tkl/tkljm?apikey=VTIjdwvcpb&tkl=" + key,
    })
    if (err) {
        return {err}
    }
    if (res.url == '') {
        return {err: res.msg}
    }
    return {res};

}

interface MyApiResponse {
    code: number;
    data: {
        category_id: number;
        coupon_click_url: string;
        coupon_end_time: string;
        coupon_info: string;
        coupon_remain_count: number;
        coupon_start_time: string;
        coupon_total_count: number;
        item_id: number;
        item_url: string;
        max_commission_rate: string;
        has_coupon: boolean;
        youhuiquan: string;
        quanlimit: string;
    };
    msg: string;
}

export async function convertByMyApi (key) {
    let {res, err}: { res?: MyApiResponse, err?: any; } = await request({
        url: "http://tbk.moonkop.com/tklConvert.php?pass=" + key,
    });
    if (err) {
        return {err}
    }
    if (!(res.code == 200 && res.data)) {
        return {err: '淘口令无效'}
    }

    if (!res.data.coupon_click_url) {
        res.data.coupon_click_url = res.data.item_url;
    }
    return {res: res.data};

}