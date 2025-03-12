export default function handleAutoRespond(message) {
    if (!message.guild || message.author.bot) return;

    const lwmsg = message.content.toLowerCase().trim();

    // Respon otomatis berdasarkan kata kunci
    const responses = {
        "halo": "Halo juga!",
        "welcome": "Selamat datang! yang baru join",
        "hai": "hai haiiii ngapain nih",
        "lagi ngapain": "lagi ngepet banh",
        "salken": "widihh, ada member baru nih, salken salken",
    };

    if (responses[lwmsg]) {
        message.reply(responses[lwmsg]);
        return;
    }

    // Respon berdasarkan waktu
    const timeResponses = {
        "pagi": ["hai, pagi juga", "pagi, semangat hari ini", "pagi banh, btw ada kegiatan apa aja hari ini?"],
        "siang": ["siank juga", "siang banh, lagi ngapain?", "selamat siang met"],
        "sore": ["sore banh", "sore juga, udah mandi belum nih?", "sore banh"],
        "malam": ["malam juga banh", "malam chaos ini", "malam, sudah saatnya a mimir"]
    };

    if (timeResponses[lwmsg]) {
        const response = timeResponses[lwmsg][Math.floor(Math.random() * timeResponses[lwmsg].length)];
        message.reply(response);
        return;
    }

    // Respon berdasarkan kata dalam kalimat
    const keywordResponses = [
        { keyword: "voice", responses: ["gas lah, mau ikut juga bang", "lah ayo gua mah"] },
        { keyword: "sepi", responses: ["iya anjirr sepi banget, pada kemana nihh?", "sepi kek hati lu"] },
        { keyword: "salam kenal", responses: ["salam kenal oi, moga betah ya", "salam kenal yang baru join, moga betah yap"] },
        { keyword: "gabut", responses: ["iyaa nihh gabut", "2in aku juga gabut"] },
    ];

    for (const entry of keywordResponses) {
        if (lwmsg.includes(entry.keyword)) {
            const response = entry.responses[Math.floor(Math.random() * entry.responses.length)];
            message.reply(response);
            return;
        }
    }

    console.log(`📩 Auto-respond: ${message.content}`);
}
