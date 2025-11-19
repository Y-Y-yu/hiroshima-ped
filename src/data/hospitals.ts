export type Hospital = {
    name: string;
    area: string;
    address: string;
    url: string;
};

export const hospitals: Hospital[] = [
    //広島地区
    { name: "医療法人あすか", area: "広島地区", address: "（広島市安佐南区）", url: "http://www.asuka-net.or.jp/" },
    { name: "広島市立北部医療センター安佐市民病院", area: "広島地区", address: "（広島市安佐北区）", url: "http://www.asa-hosp.city.hiroshima.jp/" },
    { name: "桑原医院", area: "広島地区", address: "（広島市安佐南区）", url: "http://www.pedi-kuwabaraclinic.jp/" },
    { name: "すがはら小児科アレルギー科クリニック", area: "広島地区", address: "（広島市安佐南区）", url: "http://www.sugahara-ped.jp/" },
    { name: "いちごこどもクリニック", area: "広島地区", address: "（広島市安佐南区）", url: "http://paw.candypop.jp/" },
    { name: "県立広島病院", area: "広島地区", address: "（広島市南区）", url: "https://hiroshima.hpho.jp/bumon/shinryo/shoni-sanpuka/shonika_sec01.html" },
    { name: "向洋こどもクリニック", area: "広島地区", address: "（安芸郡）", url: "http://www.mndcc.jp" },
    { name: "広島市医師会運営 安芸市民病院", area: "広島地区", address: "（広島市安芸区）", url: "http://www.hosp.city.hiroshima.med.or.jp/" },
    { name: "谷本小児科", area: "広島地区", address: "（広島市佐伯区）", url: "http://tanimoto-syounika.jp" },
    { name: "はだ小児科", area: "広島地区", address: "（広島市佐伯区）", url: "https://www.hada-shonika.jp" },
    { name: "おかはた小児科クリニック", area: "広島地区", address: "（広島市南区）", url: "http://www.okahata-cl.com/" },
    { name: "大野キッズ・ファミリークリニック", area: "広島地区", address: "（広島市南区）", url: "" },
    { name: "広島大学病院小児科", area: "広島地区", address: "（広島市南区）", url: "https://www.hiroshima-u.ac.jp/hosp/sinryoka/shinryo_ika/syonika" },
    { name: "さかたに小児科", area: "広島地区", address: "（広島市南区）", url: "http://tatuiti.in.coocan.jp/index.htm" },
    { name: "小児科さとうクリニック", area: "広島地区", address: "（広島市南区）", url: "http://www.pedclinsato.jp" },
    { name: "藤本内科ファミリークリニック", area: "広島地区", address: "（広島市南区）", url: "https://fujimoto-family-clinic.com" },
    { name: "もり小児科", area: "広島地区", address: "（広島市南区）", url: "http://mori-ped.jp" },
    { name: "かくれんぼ小児科・アレルギー科", area: "広島地区", address: "（広島市南区）", url: "https://shirokumakai.com/kakurenbo/" },
    { name: "堂面医院", area: "広島地区", address: "（広島市南区）", url: "https://domengomachan.jimdofree.com/堂面医院-診療案内/" },
    { name: "県立二葉の里病院", area: "広島地区", address: "（広島市東区）", url: "https://futaba.hpho.jp" },
    { name: "ますだ小児科", area: "広島地区", address: "（広島市東区）", url: "http://www.megaegg.ne.jp/~masuda-kids/index.html" },
    { name: "広島市立広島市民病院", area: "広島地区", address: "（広島市中区）", url: "https://www.city-hosp.naka.hiroshima.jp/search/department_dtl.php?a=15&m=1&#tab1" },
    { name: "広島市立舟入市民病院", area: "広島地区", address: "（広島市中区）", url: "http://funairi-hospital.jp/index.html" },
    { name: "広島赤十字・原爆病院", area: "広島地区", address: "（広島市中区）", url: "http://www.hiroshima-med.jrc.or.jp/section/page16.php" },
    { name: "すがいこどもクリニック", area: "広島地区", address: "（広島市中区）", url: "https://sugai-kodomo.jp" },
    { name: "広島中央通りこどもクリニック", area: "広島地区", address: "（広島市中区）", url: "https://www.katsuki-medical.com/kodomo/" },
    { name: "しのはら小児クリニック", area: "広島地区", address: "（広島市西区）", url: "https://www.shinoped.com" },
    { name: "はまさきこどもクリニック", area: "広島地区", address: "（広島市西区）", url: "http://hamacli.sakura.ne.jp/" },
    { name: "どんぐり小児科", area: "広島地区", address: "（広島市西区）", url: "http://www15.plala.or.jp/donguricl/dongurihome.html" },
    { name: "福島生協病院", area: "広島地区", address: "（広島市西区）", url: "http://www.hch.coop/fukushima/" },
    { name: "こばたけ小児科 皮膚科", area: "広島地区", address: "（広島市西区）", url: "https://www.kobatake.jp" },
    { name: "うなじ家庭医療クリニック", area: "広島地区", address: "（広島市南区）", url: "https://ujina-family-clinic.com" },
    { name: "よしのこどもとアレルギーのクリニック", area: "広島地区", address: "（広島市西区）", url: "https://yoshino-kids.com/news/news.html#" },
    
    //広島西地区
    { name: "国立病院機構西医療センター", area: "広島西地区", address: "（大竹市）", url: "https://www.hiro-nishi-nh.jp" },
    { name: "しまだファミリークリニック", area: "広島西地区", address: "（大竹市）", url: "https://www.shimada-fc.com" },
    { name: "ひろしまこどもクリニック", area: "広島西地区", address: "（廿日市市）", url: "https://hiroshima-kids.com" },
    { name: "河村小児科", area: "広島西地区", address: "（廿日市市）", url: "https://hiroshima-kids.com" },

    //呉地区
    { name: "国立病院機構呉医療センター", area: "呉地区", address: "（呉市）", url: "https://kure.hosp.go.jp/department/pediatrics/" },
    { name: "もりや小児科クリニック", area: "呉地区", address: "（呉市・広）", url: "https://www.moriya-p-clinic.jp/index.html" },

    //広島中央区
    { name: "国立病院機構東広島医療センター", area: "広島中央地区", address: "（東広島市）", url: "https://higashihiroshima.hosp.go.jp/section/08_shounika.html" },
    { name: "県立重症心身障害児施設わかば療育園", area: "広島中央地区", address: "（東広島市）", url: "https://www.ryoiku-hiroshima.gr.jp" },
    { name: "かわはらこどもクリニック", area: "広島中央地区", address: "（東広島市）", url: "https://www.kawahara-kc.jp" },
    { name: "かとう小児科アレルギー科", area: "広島中央地区", address: "（東広島市）", url: "http://kato-kidsclinic.or.jp/" },
    { name: "虹の子どもクリニック", area: "広島中央地区", address: "（東広島市）", url: "https://www.nijinokodomo.jp/top.html" },

    //尾三地区
    { name: "興生総合病院", area: "尾三地区", address: "（三原市）", url: "http://kohsei-hp.jp/" },
    { name: "土本ファミリークリニック", area: "尾三地区", address: "（尾道市）", url: "https://www.tsuchimoto-fcl.com" },

    //北部
    { name: "社会福祉法人ともえ会子鹿医療療育センター", area: "北部地区", address: "（三次市）", url: "https://tomoekai-miyoshi.jp/tomoekaigroup/kojikamrc/" },

    //福山・府中・岡山地区
    { name: "せきもとクリニック", area: "福山・府中・岡山地区", address: "（福山市）", url: "https://sekimotoclinic.com" },
    { name: "おひさまこどもクリニック", area: "福山・府中・岡山地区", address: "（福山市）", url: "http://ohisamakodomo-cl.jp/" },
    { name: "橘高クリニック", area: "福山・府中・岡山地区", address: "（福山市）", url: "https://kittaka-clinic.com" },
    { name: "国立病院機構福山医療センター", area: "福山・府中・岡山地区", address: "（福山市）", url: "https://fukuyama.hosp.go.jp/section/cnt1_00009.html" },
    { name: "玉野市玉野市民病院", area: "福山・府中・岡山地区", address: "（玉野市）", url: "https://tamano-hp.jp" },
    { name: "やすはらこどもクリニック", area: "福山・府中・岡山地区", address: "（福山市）", url: "https://yasuharakodomo.com/" },
    { name: "福山市民病院", area: "福山・府中・岡山地区", address: "（福山市）", url: "https://fc-hosp.jp/" },
];
