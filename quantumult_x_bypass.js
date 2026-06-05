/**
 * Quantumult X 重写脚本 - 问真排盘 VIP 绕过
 *
 * 使用方法：
 * 1. 圈X → 设置 → 重写 → 引用 → 添加
 * 2. 将此脚本保存为 wenzhen_vip_bypass.js
 * 3. 重写规则：
 *    https://bzpp2.iwzbz.com/api/v1.1/user/getvipinfo url script-response-body wenzhen_vip_bypass.js
 *
 * 原理：拦截 getvipinfo API 响应，将 vipLevel 字段改为 3（钻石会员）
 */

const urlPattern = /\/user\/getvipinfo/;

if (urlPattern.test($request.url)) {
    try {
        let body = JSON.parse($response.body);

        // 修改VIP数据
        body.data = body.data || {};
        body.data.vipLevel = 3;
        body.data.expires = "2099-12-31 23:59:59";

        console.log("[问真VIP绕过] 已修改响应: vipLevel=3, expires=2099-12-31");

        $done({ body: JSON.stringify(body) });
    } catch (e) {
        console.log("[问真VIP绕过] 解析失败: " + e);
        $done({});
    }
} else {
    $done({});
}
