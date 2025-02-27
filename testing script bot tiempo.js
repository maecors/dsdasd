const room = HBInit({
    roomName: "⚔️ KnightFC |5v5 | 👔 DT | 🤝 FICHAJES | 🔄 SUPLENTES | UEFA HAXLEAGUE 🏟️",
    maxPlayers: 30,
    public: true,
    password: null,
    noPlayer: true  // Hides the host from the players list
});

let creator = null;
let admins = new Set();
let dts = { red: null, blue: null };
let captains = { red: null, blue: null };
let mvps = new Set();
let vips = new Set();
let referees = new Set();
let hosters = new Set();
let mutedPlayers = new Map();
let paused = false;
let bannedAuths = new Set([
    "fR-K42GHfrKFU0ujKEjmJXL3TuNE4PYtve1r8u-G520",
    "IvX_9dhiwJftcb0fvZBDuRpcthmpiQLkbmnty5PFgx0",
    "ikCxAiIg3qVWam0xzkpVTmmOKg52lVhlhlPCqHcmvDg",
    "K6QnSoQkVtac3SVPdp3t6UB6xJnPuFWL6iQoGHEMUtE",
    "OFbWHvMkjQLnvf6tre5AdnZv9hAN2yUKHjDUzRiH8vk",
    "Qjr_4IJLDja6kBz0-obH67RQmzs_pNVrVfiNrTOMO8Q",
    "WLGJVCSgpPUr0RNUQ0Vqja5NWMRsftbZe-5p9uBV4E8",
    "8O2yXe2HwCIW57Gz0mmnvAwsf35lldX2q4G9jVJxksY",
    //"yDgJMdv0km8wO69S2N-48xf-u5e_xHqZ1ZAwBxuGlZ8", //zennit
    "7jfObhE_NkRRzTaBC3do9e7m95IixAnbgoIrR9KmNCU", // pabloide
    //"Z2jdXQmmXUL-QufwKbqf33a88BgyUSEEUG1nCMTjkRQ", //sin name
    "w4zkYFLmPY7ObgZdqEyTqGO9TQBHijhLTSj9IDahxQ4",
    "IGf9y_-Y2Ko1xihca9sTyJLp3PdxvwESd5XrGJUZhlw",
    "ZjE1m9KdzliqixDNscbIYJBLVhaUBnaHlLBpiNDV7F4",
    "E3LZlxqENBPqNkiU8sWL3Lixz76Fn9RKvhHEOyTV0go", //gato sovietico
    "g97879gG7i0E_kD7bmn9_LX18FFJehWNy0CivTJJAIY",
    "BT0DxmfvSl8G08jI3IlE5H2CLTFlVMK_WWtQNfzbO7M",
    //"LCKbSl1WZX3Glsp9NqYtEeH5-M1K1iKIKiI0HaK95KE", // samcrack
    "UVcz6pLbYU_678PobPgPOPHSP71tkeU1789NVbbi7n4",
   //FwA3OZPE9-TSNEoe9LPf3jbsANJ3SrGBdH89fNxjAsw", //narko
    "pbd74VkbcGpCY3Xah2Va43Lf9fb7KSABqgrtvpkkiOQ",
    "mneDn5sHtOeB8o-posSoVe7YaoYa-Fukrldcfd7hTOM",
    "yd24otdEJoLlVLujc3-pQrWLgfzjKcT8AduTtfpwFo8",
    "ty_9anxW-FegQ5yLNxgTgwSAT-soylUuFay5C6oSDvc",
    "m3VgiId9M-bVI6qK6xTCMCLJ9BYmUYrH0kRWcwqqa9Q",
    "kDwzw0IEgnqc6R6zdnyIAA1gUCX5jxTe3tzhH_mue0M",
    "XQo12BSLJd0ix0PwfFTHBAI3Z_FD81RtTGkHP5MUDbY",
    "3CeKYt4k0YllPEVKU5OQT-AiE3o5B9Dk7i9ey1DE1p0",
    "sd1yzej_xak3C-rgp8Ba2eog3AEM-sVSIfLotPLf0Yk",
    "Lol0Jnlyjjfnp5guGPaTJfIeuu88ubT1of1AFpw3EFk",
    "smWV-5Y83fmJl65o_nE4XAgqOrXWWmPHRK3k009wn1"
    
]);
const authPositions = new Map([
    ["kFyVAZ8R_Cdt7omLYwbc6H9AmpRQRiQU8ZQ3bH8in-Y", "MC"], // capo
    ["8Q7JtN3gIfo2XudQnLrTIkLDCmCMgoRIqBP7f9HtIso", "MC"], // cxmplay
    ["xFP3i8ksmguVnwapLD0QtfnNOx23WqXzSl0XKW9r8hU", "DFC"], // MGB3
    ["3NCPrRlTEHRuvHfSML6UAXfvIOhOxX7wMLS83Es9Wuk", "MC"], // xigen
    ["adx1h3MOqQbCrjq7MKnatjUmh_8-F87X5A3lxfEEC_Y", "memin"], // foquin
    ["MYDDCQgbtWM4K1ULCEWBPreNYIxKQNCKf2K-W6pcvu4", "DC"], // Pandora
    // Agrega más auths y posiciones según sea necesario
]); 
let matchStarted = false;
let goalScorers = new Map(); // Mapa para almacenar los goleadores y sus goles
let assistants = new Map();
let bannedNames = ["NueveDeArea (PRIME)", "Pabloide", "| 𝗥𝗘𝗜𝗞𝗩𝗔𝗥𝗔", "𝐍ᴇᴇᴇᴇ𝚜", "BAY|★彡『 Dᴀʀᴡɪɴ ɴᴜÑᴇᴢ 』彡★", "𝐳𝐮𝐫𝐝𝐨👑", "PN", "𝐇𝐇𝐐𝐔𝐄𝐙𝐙", "SKUAKO89(bareto)", "Havertz🧨", "MYKE TOWERS (despechado)", "EL VENDEDOR DE DROGA", "𝙠𝙉𝙖𝙧𝙠𝙤", "$", ""]; // Mapa para almacenar los asistentes y sus asistencias
let lastTouchPlayer = null;
let pendingPlayers = new Set(); // Añadir esta línea para definir pendingPlayers
let requirePosition = false
let lastMessageTime = new Map(); // Añadir esta línea para definir lastMessageTime; 
let lastIncognitoTime = new Map();
let lastMemideTime = new Map();
let lastPartidoMessageTime = 0;
let lastMostrarResultadoPartidoTime = 0; 
let lastAvatarRequestTime = 0;
let lockdownMode = false;
let fichajesTimeout;
let autoBalanceEnabled = false;
let autoPosicionEnabled = false;
let persistentMutedPlayers = new Set();
let slowmodeEnabled = false;
let slowModePlayers = new Map();
let penalesActivo = false;
let penalesModo = null;
let penalesMarcador = { red: 0, blue: 0 };
let penalesTurno = null;
let mapaRed = null;
let mapaBlue = null;
let playerPositions = new Map(); // Mapa para almacenar las posiciones de los jugadores
let previousBallPosition = null;
let previousTimestamp = null;
let slowModeEnabled = false;
let slowModeDuration = 0;
let matchTime = 0;
let matchInterval;
let halfTimeReached = false;
let extraTime = 0;
let votacionActiva = false;
let votosTiempoExtra = new Set();
let votosPenales = new Set();
let votosEmitidos = new Set();
let votacionMVPActiva = false;
let votosMVP = new Map();
let votosEmitidosMVP = new Set();
let votacionRepickActiva = false;
let votosRepick = new Set();
let votosNoRepick = new Set();
let votosEmitidosRepick = new Set();
let alineacionRed = [];
let alineacionBlue = [];
let esquemaRed = "";
let esquemaBlue = "";
let isIda = true; // Flag to determine if it is the first (ida) or second (vuelta) match
let strikes = {
    red: [],
    blue: []
};
let lastGoal = {
    team: null,
    type: null // either 'ida' or 'vuelta'
};
let matchStats = {
    ida: { redScore: 0, blueScore: 0 },
    vuelta: { redScore: 0, blueScore: 0 },
    ballInRedArea: 0,
    ballInBlueArea: 0,
    totalGameTime: 0,
    redPossession: 0,
    bluePossession: 0
};
const colors = {
    creator: 0xFFFFFF,
    admin: 0x887AFF,
    dtRed: 0xFF4F6C,
    dtBlue: 0xA1EFFF,
    playerRed: 0xFF3D3D,
    playerBlue: 0x59C8FF,
    spectator: 0xD1D1D1,
    bot: 0xFFEF14,
    botGold: 0xFFFFFF,
    chatPrivateRed: 0xFF8787,
    chatPrivateBlue: 0xBFEAFF,
    captainRed: 0xF25767, // Nuevo color para Capitán del equipo rojo
    captainBlue: 0x7EC4F2, // Nuevo color para Capitán del equipo azul
    mvp: 0x9185FF, // Nuevo color para MVP
    vip: 0xB5EAF2, // Nuevo color para VIP
    referee: 0xF2CA00, // Nuevo color para Árbitro
    hoster: 0xB8F27E // Nuevo color para Hoster
};

const MVP_AVATAR = "🐐";
const avatarMessages = [
    "😁",
    "😆",
    "😄",
    "😃",
    "😀"
];

const X9Y8Z7 = "_0x2acd643d";
const DISCORD_LINK = "https://discord.gg/fsppM3wV3G"; // Enlace de Discord
const authList =[
    ["kFyVAZ8R_Cdt7omLYwbc6H9AmpRQRiQU8ZQ3bH8in-Y", "MC"], // capo
    //["auth2", "DFC"], // Ejemplo: auth2 -> DFC
    // Agrega más auths y posiciones según sea necesario
];

const CREATOR_AUTH = "kFyVAZ8R_Cdt7omLYwbc6H9AmpRQRiQU8ZQ3bH8in-Y";

const hosterAuths = new Set([
    "auth1", // Reemplaza con los auths reales
    // Agrega más auths según sea necesario
]);

asignarRolCreador(authList);

let warningCount = new Map(); // Add this line to track warnings for each player

function checkPlayerPositions() {
    room.getPlayerList().forEach(player => {
        if (requirePosition && playerPositions.get(player.id) === "N/A") {
            let count = warningCount.get(player.auth) || 0;
            if (count < 2) {
                room.sendAnnouncement(`¡${player.name},🔥 𝘌𝘩, 𝘤𝘢𝘮𝘱𝘦ó𝘯, ¿𝘷𝘪𝘦𝘯𝘦𝘴 𝘢 𝘫𝘶𝘨𝘢𝘳 𝘰 𝘢 𝘥𝘦𝘤𝘰𝘳𝘢𝘳 𝘭𝘢 𝘴𝘢𝘭𝘢? 𝘗𝘰𝘳𝘲𝘶𝘦 𝘢𝘲𝘶í 𝘯𝘰 𝘢𝘤𝘦𝘱𝘵𝘢𝘮𝘰𝘴 𝘦𝘴𝘵𝘢𝘵𝘶𝘢𝘴 🗿. 𝘕𝘰 𝘵𝘪𝘦𝘯𝘦𝘴 𝘱𝘰𝘴𝘪𝘤𝘪ó𝘯 𝘺 𝘢𝘴í 𝘯𝘰 𝘴𝘦 𝘱𝘶𝘦𝘥𝘦, 𝘮á𝘲𝘶𝘪𝘯𝘢. \n ¿𝘖 𝘢𝘤𝘢𝘴𝘰 𝘱𝘪𝘦𝘯𝘴𝘢𝘴 𝘲𝘶𝘦 𝘦𝘭 𝘣𝘢𝘭ó𝘯 𝘴𝘦 𝘮𝘶𝘦𝘷𝘦 𝘴𝘰𝘭𝘰? ⚽💨 𝘜𝘴𝘢 !𝘱𝘰𝘴𝘪𝘤𝘪𝘰𝘯 𝘔𝘊 𝘥𝘦 𝘶𝘯𝘢 𝘷𝘦𝘻 𝘰 𝘦𝘯 30 𝘴𝘦𝘨𝘶𝘯𝘥𝘰𝘴 𝘵𝘦 𝘮𝘢𝘯𝘥𝘰 𝘥𝘦 𝘳𝘦𝘨𝘳𝘦𝘴𝘰 𝘢𝘭 𝘷𝘦𝘴𝘵𝘶𝘢𝘳𝘪𝘰 𝘴𝘪𝘯 𝘮𝘦𝘥𝘢𝘭𝘭𝘢 🏆❌. \n ¡𝘕𝘰 𝘮𝘦 𝘩𝘢𝘨𝘢𝘴 𝘤𝘰𝘯𝘵𝘢𝘳, 𝘲𝘶𝘦 𝘴𝘰𝘺 𝘱𝘦𝘰𝘳 𝘲𝘶𝘦 𝘦𝘭 𝘝𝘈𝘙! ⏳👀`, player.id, colors.bot, "bold", 0);
                warningCount.set(player.auth, count + 1);
            }
            setTimeout(() => {
                if (playerPositions.get(player.id) === "N/A") {
                    room.kickPlayer(player.id, "No definiste tu posición a tiempo.", false);
                }
            }, 30000);
        }
    });
}
setInterval(checkPlayerPositions, 2000); // Verificar cada 10 segundos
const uniformOptions = [
    {
        red: { angle: 60, textColor: 0x000000, colors: [0xFFFFFF, 0xB00000, 0xFFFFFF] },
        blue: { angle: 90, textColor: 0xFFFFFF, colors: [0x0006B8, 0xFFC300, 0x0006B8] } //boca vs river
    },
    {
        red: { angle: 0, textColor: 0xFFFFFF, colors: [0x0D0D0D, 0x0D0D0D, 0xA60000] },
        blue: { angle: 60, textColor: 0x080808, colors: [0xFFFFFF, 0xFFFFFF, 0xA8FFD7] } 
    },
    {
        red: { angle: 0, textColor: 0xFFC300, colors: [0x990000, 0x000A94, 0x990000] },
        blue: { angle: 60, textColor: 0x000000, colors: [0xFFFFFF, 0xF7F7F7, 0xFFFFFF] } //barcelona vs real madrid
    },
    {
        red: { angle: 0, textColor: 0xFFC300, colors: [0x9C0202, 0x000A8F] },
        blue: { angle: 60, textColor: 0x000000, colors: [0xFFFFFF, 0xEDFFFD, 0xDEFFF8] } //barcelona vs real madrid
    },
    {
        red: { angle: 0, textColor: 0x000000, colors: [0xFFFFFF, 0x0D8ED9, 0xFFFFFF] }, //argentina
        blue: { angle: 90, textColor: 0xE8B320, colors: [0x0F0D4D, 0x0F0D4D, 0x0F0D4D] } //francia
    },
    {
        red: { angle: -60, textColor: 0xFFC300, colors: [0x0D3808, 0xA60808] }, // portugal
        blue: { angle: 0, textColor: 0x000000, colors: [0xFFFFFF, 0x0D8ED9, 0xFFFFFF] } //argentina
    },
    {
        red: { angle: 0, textColor: 0x22AB18, colors: [0xFFF70F, 0xFFF70F] }, // brasil
        blue: { angle: 0, textColor: 0x000000, colors: [0xFFFFFF, 0x0D8ED9, 0xFFFFFF] } //argentina
    },
    {
        red: { angle: 0, textColor: 0xFFFFFF, colors: [0x000000, 0xBF0000] }, 
        blue: { angle: 0, textColor: 0xFFFFFF, colors: [0xFFD500, 0x0006BF, 0xFFD500] }
    },
    {
        red: { angle: 0, textColor: 0x000000, colors: [0xFFFFFF, 0x00B554, 0xFFFFFF] },
        blue: { angle: 90, textColor: 0xFFC300, colors: [0x08007D, 0x08007D, 0x08007D] }
    },
    {
        red: { angle: 0, textColor: 0x000000, colors: [0xBF0000, 0xBF0000, 0xBF0000] },
        blue: { angle: 90, textColor: 0x000000, colors: [0x1F13BF, 0x1F13BF, 0x1F13BF] }
    },
    {
        red: { angle: 0, textColor: 0xFFB300, colors: [0xA60000, 0x000000, 0xA60000] },
        blue: { angle: 0, textColor: 0xFFFFFF, colors: [0x1100A6, 0x000000, 0x1100A6] }
    },
    {
        red: { angle: 0, textColor: 0xFFB300, colors: [0x910000, 0x850000, 0x910000] },
        blue: { angle: 60, textColor: 0xFFFFFF, colors: [0x9ED8FF, 0x9ED8FF, 0x540E0E] }
    },
    {
        red: { angle: 60, textColor: 0xFFFFFF, colors: [0xB50000, 0xAD0000, 0x9C0000] },
        blue: { angle: 60, textColor: 0x000000, colors: [0xFFCC00, 0xFFCC00, 0x000000] }
    },
    {
        red: { angle: 60, textColor: 0xFFFFFF, colors: [0xC40000, 0xC40000, 0xC40000] },
        blue: { angle: 0, textColor: 0x000000, colors: [0xFFFFFF, 0x61ABFF, 0xFFFFFF] }
    },
    {
        red: { angle: 60, textColor: 0x000000, colors: [0xFFC300, 0xFFC300, 0xFFC300] },
        blue: { angle: 0, textColor: 0xFFC300, colors: [0x000000, 0x000000, 0x000000] }
    },
    {
        red: { angle: 60, textColor: 0xFFFFFF, colors: [0x4F1059, 0x460E4F, 0x4F1059] },
        blue: { angle: 60, textColor: 0xD6FEFF, colors: [0x9EFCFF, 0x9EFCFF, 0x9EFCFF] }
    },
    {
        red: { angle: 60, textColor: 0xFFD438, colors: [0x4D4D4D, 0x242424, 0x000000] },
        blue: { angle: 40, textColor: 0x000000, colors: [0xFFFFFF, 0xD6FEFF, 0xA9F8F9] }
    },   
    {
        red: { angle: 90, textColor: 0xFFFFFF, colors: [0x000000, 0x7D0000, 0x000000] },
        blue: { angle: 40, textColor: 0x058C00, colors: [0xFFDD00, 0xFFDD00, 0xFFDD00] }
    },
    {
        red: { angle: 90, textColor: 0x0041A3, colors: [0xFFDD00, 0xFFDD00, 0xFFDD00] },
        blue: { angle: 40, textColor: 0x000000, colors: [0xFFBBD4, 0xFFBBD4, 0xFFBBD4] }
    },
    {
        red: { angle: 90, textColor: 0x54E8FF, colors: [0x1F1F1F, 0x1F1F1F, 0x1F1F1F] },
        blue: { angle: 0, textColor: 0xFFFFFF, colors: [0x73DAFF, 0x6ED1F5, 0x73DAFF] }
    },
    {
        red: { angle: 0, textColor: 0xFFFFFF, colors: [0x960505, 0x0E0087, 0x960505] },
        blue: { angle: 0, textColor: 0x000000, colors: [0xFFE600, 0xFFE600, 0xFFE600] }
    },
    {
        red: { angle: 60, textColor: 0x000000, colors: [0xFFFFFF, 0xFFFFFF, 0x003CFF] },
        blue: { angle: 0, textColor: 0xFFFFFF, colors: [0x003027, 0x003027, 0x003027] }
    },
    {
        red: { angle: 60, textColor: 0x4D0808, colors: [0xFFEBEB, 0xFFEBEB, 0xFFEBEB] },
        blue: { angle: 0, textColor: 0xFFFFFF, colors: [0x9E0000, 0x091517, 0x110A7A] }
    },
    {
        red: { angle: 0, textColor: 0xFFFFFF, colors: [0x4C228C, 0x4C228C] }, 
        blue: { angle: 0, textColor: 0xFFDD00, colors: [0x2B2B2B, 0x212121] }, 
    },
    {
        red: { angle: 0, textColor: 0xFF00B3, colors: [0x262626, 0x262626] }, 
        blue: { angle: 0, textColor: 0x212121, colors: [0x3FC5E0, 0x39B3CC] }, 
    },
    {
        red: { angle: 0, textColor: 0x50006E, colors: [0xEDEDED, 0xEDEDED, 0xEDEDED] },
        blue: { angle: 60, textColor: 0x262626, colors: [0xA6D9E3, 0xA6D9E3, 0xA6D9E3] }
    },
    {
        red: { angle: 0, textColor: 0xFF3A31, colors: [0x141519, 0x141519] }, 
        blue: { angle: 0, textColor: 0xFFC505, colors: [0x518B8F, 0x518B8F] }, 
    },
    {
        red: { angle: 0, textColor: 0xFF96F5, colors: [0x212121, 0x212121] }, 
        blue: { angle: 0, textColor: 0x0F0F0F, colors: [0x87E847, 0x87E847] }, 
    },
    {
        red: { angle: 60, textColor: 0xFFFFFF, colors: [0x28006E, 0x28006E, 0x230061] },
        blue: { angle: 60, textColor: 0x2E2E2E, colors: [0x326B6E, 0xFFFFFF, 0xFFFFFF] }
    },
    {
        red: { angle: 90, textColor: 0x1F1F1F, colors: [0xFFFEDB, 0xFFFEDB, 0x1F1F1F] },
        blue: { angle: 60, textColor: 0xD4AB59, colors: [0x154047, 0x154047, 0x154047] }
    },
    {
        red: { angle: 60, textColor: 0x64E3FF, colors: [0xFFFCF7, 0xFFFCF7, 0x99EEFF] },
        blue: { angle: 0, textColor: 0xFFFFFF, colors: [0x161C1B, 0x0000BA, 0x0000BA] }
    },
    {
        red: { angle: 60, textColor: 0x000000, colors: [0xFFFFFF, 0x2B5936, 0xFFFFFF] },
        blue: { angle: 0, textColor: 0x8CF0FF, colors: [0x0C003D, 0x250070] }, 
    },
    {
        red: { angle: 0, textColor: 0x004010, colors: [0xE8E8E8, 0x0C2913] }, 
        blue: { angle: 60, textColor: 0x75DAFF, colors: [0x5200E0, 0x5200E0, 0x0000BA] }
    },
    {
        red: { angle: 0, textColor: 0x115C54, colors: [0xFFF7CC, 0xFFF7CC, 0xFFF7CC] },
        blue: { angle: 0, textColor: 0xFFF4D1, colors: [0x1C1C1C, 0x1C1C1C, 0x1C1C1C] }
    },

    // Añade más configuraciones de colores aquí
];
const POSICIONES = ["GK", "noGK", "DFC", "DFD", "DFI", "LD", "LI", "MCD", "MC", "MCO", "CAM", "INT", "EXT", "MI", "MD", "EL", "ED", "SD", "DC", "campero", "MP", "DT", "AFK", "memin","all",]; // Lista de posiciones válidas
const POSICIONES_JERARQUIA = ["GK", "noGK", "DFC", "DFD", "DFI", "LD", "LI", "MCD", "MC", "MCO", "CAM", "INT", "EXT", "MI", "MD", "EL", "ED", "MP", "SD", "DC", "campero", "DT", "AFK", "memin","all",]; // Lista de posiciones válidas
const MAX_PLAYERS_BEFORE_PASSWORD = 20;
const ROOM_PASSWORD = "T3P4R0C0M0D1BuA_M84pP3"; 
const afkPlayers = new Map();
const lastPartidoCommandTime = new Map();
function checkPlayerCount() {
    const playerCount = room.getPlayerList().length;
    if (playerCount >= MAX_PLAYERS_BEFORE_PASSWORD) {
        room.setPassword(ROOM_PASSWORD);
    } else {
        room.setPassword(null);
    }
}
const REGLAS = `
Reglas de la Sala:

1.Los DTs kickearan a jugadores que lo moleste.
2.Si haces spam, te pueden expulsarte.
3.Si dañás la sala como DT o admin, irás a la lista negra.
4.Debes seguir las indicaciones de los administradores.
5.No entres a la cancha sin ser titular o serás expulsado.
6.Si interfieres en el juego, serás expulsado.
7.Nadie puede estar detrás del arco para evitar que impidan goles.
8.Solo puedes cambiar de equipo con permiso de tu DT y del técnico rival.
9.El partido continuara sin los 2 DTs.
10.Los DTs deciden si hay penales o tiempo extra.
11.Si no estan los 10 jugadores en el saque inicial. El que juegue el balón sera kickeado.
`;

// Mensajes de narración de gol
const goalMessages = [
    `¡Buscaba [assistant]! 🧐📡 ¡Atención! 🚨 ¡Pica [scorer]! 🏃‍♂️💨 ¡Está habilitado! 🎯 ¡Ahí está! 🙌🔥 ¡GOOOOOOOOOOOOOL! 🎇💥¡De [team]! 🤝🔥`,
    `Lo hizo [scorer], señores, lo hizo el mago de la red. 🎩✨ los hinchas [team] gritan hasta perder la voz! 😱🎉 ¡Es una fiesta total en la cancha y en las tribunas! 💃🏟️💓`,
    `¡El milagro [assistant]! ¡Uno! ¡Dos! ¡Tres! ¡[scorer] Gooooooooool!¡Golazo de [scorer]! ¡El jugador [team] lo hizo! 😱💥`,
    `¡la pelota se metió al ángulo! ¡Qué golazo! ¡Qué golazo de [scorer]! 🔥⚽ ¡[team] lo dio vuelta`,
    `¡Atencion, ¡Se viene [team]! ¡La pasa [assistant], le pega [scorer]... GOOOOOOOL! 💣💥🔥`,
    `¡Atención,Se viene el contragolpe de [team]... la tiene [assistant] para [scorer] 👟⚡. ¡Va el tercero, va el tercero! Y Gol de [team] ¡Gooooooool! ¡GOOOOOL DE [team]! ⚽️🔥`,
    `¡INVENTE [scorer], INVENTE! 😱💥 ¡No puede ser, 🙌🎉. ¡UN GOLAZO, UN GOLAZO! ¡LA LEYENDA DE [scorer] SIGUE CRECIENDO! 🔥🔥🔥`,
    `¡Mira el gol que hizo el enfermo de [scorer] 😑👏👏, qué hijo de recontra re mil putas, que suerte 🤢🤮, DEJA LOS SCRIPTS HPTA! 🤬⚽🔥`,
    `¡[scorer] se la metió toda!,¡Qué golazo! Ni vaselina le puso. sin compasión el equipo [team] ⚡🔥⚽`,
    `[scorer] la clavó al estilo indio 🏹⚽🔥, ¡De otro nivel! Puntería de sniper, imparable. 🎯💥asistencia de [assistant]`,
    `¡[scorer] la metió como su tío, ⚽🔥💪 Esto ya es de sangre, ¡qué definición! 😂👏 asistencia de [assistant] `,
    `QUE GOLAZO DE [scorer] ¡Lo dejó más roto que el culo de [assistant] ! 💔⚽🔥`,
    `[assistant] le rompió la cintura al defensa de [opponentTeam]  y me metio una asistencia para [scorer] .⚽😂`,
    `[scorer] le pegó tan fuerte que el balón pidió custodia compartida. ⚖️⚽🤣 asistencia de [assistant]`,
    `[scorer] los vacunó sin vaselina, y el equipo [opponentTeam] quedo descocido. 💉⚽😭`,
    `¡[scorer] lo remontó! El equipo [opponentTeam] ya está buscando excusas para no mocharse las bolas. 🫣⚽`,
    `Descuenta [scorer]… pero ya para qué, si esto es un velorio futbolístico. eliminen el [opponentTeam] ⚰️⚽😂 asistencia de [assistant] `,
    `GOL de [scorer], El gol de la vergüenza llegó tarde, pero al menos maquillaron el papelón. ⚽💀 asistencia de [assistant]`,
    `¡[scorer] y [assistant] Remontaron con furia! El [opponentTeam] está tan perdido, LLAMEN A DIOS 🙏⚽🔥`,
    `YA YA PIDAN REPICK ESTO SE ACABO [scorer] LA SACO DEL ESTADIO Y EL [opponentTeam] NO SABE NI QUE PASO ⚽🔥😂 asistencia de [assistant]`,
    `[scorer] y [assistant] Descuentan… pero ni con dos goles más evitan el tapar este papelon. 🐦⚽💀 ⚽🔥😂 asistencia de [assistant]`,
    `¡GOOOOOOOOOOOOOOOOOOLAZO, SEÑORAS Y SEÑORES! 🎙️🔥 EFECTO [scorer] en todo su esplendor ⚽💥. ¡Qué clase, qué locura! 😱🌀 El portero ni la vio pasar. 🚀👏 asistencia de [assistant] `,
    `🔥🚨 ¡Llamen a la policía! 🚨🔥Esta gonorrea de [scorer] ⚽️ está jugando ¡DESNUDO! 🫣🥵🤯`,
    `Se la regalaron a [assistant], ¡NO ME DIGAN QUE [scorer] METE EL SEGUNDO A COLOCAAAAAAAAAAAAAAAAAAR! 😱⚽ ¡HIJO DE PUTA! 😤🔥 GOOOOOOOOOOOOOOOOOOL ⚽🎉`,
    `¡Toque rápido, pase al vacío de [assistant], volea de [scorer] ¡Goooooool! ⚽💥 ¡TODOS PONGAN EFECTO [scorer] EN EL CHAT! 🎉🔥`,
    `GOOOOOOOOOLAAAAAZOOOOOOOOOOOOOOOOOOO 🤯🔥 [scorer], ¡ESO NO FUE UN TIRO, FUE UN MISIL TELEDIRIGIDO! 🚀💥 asistencia de [assistant]`,
    `¡NOOOOO, LO QUE ACABA DE HACER [scorer]! 😨🔥 LE PEGÓ CON ODIO, CON RABIA, CON DEUDA PENDIENTE 💥⚽ asistencia de [assistant]`,
    `NOOOOO, QUÉ GOLAZO, HERMANO 🔥⚡ [scorer], SIEMPRE CONFÍE EN VOS... (mentira, pero qué bomba tiraste 😂)`,
    `¡TÁPENLO, TÁPENLO, QUE ESTÁ ESTA DESNUDO! 🔥⚽ [scorer], AGARRATE REAL MADRID AGARRATE!`,
    `¡PAPÁ, QUÉ DUPLA! 🤩⚽ [assistant] PUSO UNA ASISTENCIA QUE NI EN CHAMPIONS, Y [scorer] SOLO TUVO QUE EMPUJARLA 🚀🔥`,
    `ASISTENCIA DE ORO DE [assistant] 🏆🎯, DEFINICIÓN DE LEYENDA DE [scorer] 🔥⚽ ¡ESTO ES FÚTBOL, SEÑORES!`,
    `¡ESTAMOS VIENDO FÚTBOL CHAMPAGNE! 🍾⚽ [assistant] EL PASE 3 DEDOS Y [scorer] LA DEFINIO CON FRIALDAD 😮‍💨🔥`,
    `¿QUIÉN NECESITA A MODRIC Y BENZEMA CUANDO TENEMOS A [assistant] Y [scorer]? 😎🔥 ¡JUGADÓN, SEÑORES!`,
    `¡PASE MILIMÉTRICO DE [assistant]! 🎯⚽ Y [scorer] NO PERDONA NI A SU ABUELA, QUÉ DEFINICIÓN 🔪🔥`,
    `¡OTRA JOYA DE [assistant]! 💎⚽ ESTO NO FUE UN PASE, FUE UNA CARTA DE AMOR AL FÚTBOL ❤️📜 [scorer], MODO BUFFALO CON ESA DEFINICIÓN 🔥`,
    `¡ASSIST DE [assistant] EN HD, 4K, DOLBY SURROUND! 🎯🔊 [scorer] NO PERDONÓ Y REVENTÓ LA RED COMO SI LE DEBIERA PLATA 🔥⚽💥`,
    `¡QUÉ GOLAZO, QUÉ GOLAZO! 🤯⚽ [scorer] LA PUSO DONDE DUELE, Y EL [opponentTeam] NO SABE NI QUÉ LE PEGÓ 😱🔥`,
    `¡ESPECTÁCULO PURO! 😱⚽ [assistant] PUSO UN PASE QUE PARECE QUE USA SCRIPTS Y [scorer] LA REVENTÓ COMO SI FUERA EL ÚLTIMO MINUTO 🔥🕛`,
    `¡GOLAZO, PAPÁ! ⚽🔥 [assistant] CON LA MAGIA, [scorer] CON LA DEFINICIÓN Y EL ARQUERO PIDIENDO CAMBIO 😵‍💫🚑`
];

const ownGoalMessages = [
    "¡Autogol de [scorer], mamita... el DT se debe de estar replanteando por qué lo metió a jugar! 🚫",
    "¡[scorer] ha marcado en su propia puerta, qué pendejo jajajaja! ❌",
    "¡[scorer] mete un autogol, creyó que era el arco rival! 🛑",
    "¡Qué mala suerte para [scorer], autogol. Despidanse muchachos van a banear a [scorer] ! 😓",
    "¡[scorer] anota en su propia red, por dios. ¡Alguien tráigale unas manos! ⚠️",
    "¡[scorer], el triple hpta! En vez de ayudar al equipo, parece que juega para el [team]. 🤬⚽💀",
    "¡[scorer] se metió un gol en contra! ¡Qué desastre! ¡El [team] no se merece esto! 😱🔥",
    "OTRO AUTOGOL DE [scorer], ya lo están investigando por amaño de partido. 🚨⚽🔥",
    "[scorer] malparido BOT deja de meterte autogoles. 🤖⚽😂",
    "[scorer] está perjudicando tanto al equipo que el DT, ya esta pidiendo cambio por el cono. 🛑⚽💀",
    "¡Qué desastre, [scorer]! Si ser un malparido malo fuera deporte, ya sería campeón mundial. 🏆⚽🔥",
    "GOOooOOOooOoL ,con jugadores como [scorer], ¿para qué necesitamos rivales? 🤦‍♂️⚽🤣",
    "AUTOGOL DE [scorer], es tan hpta que parece que cobró para hundir al equipo. 💰⚽💀",
    "¡AUTOGOL! 🤦‍♂️🔥 EFECTO [scorer] 🌀⚽. ¡El triple hpta la mandó a su propia red! 😱💀  ¡El tipo está tan perdido que parece comprado!💰💀",
    "¡RATA MALPARIDA 🐀💢, NO VES QUE ESTAMOS PERDIENDO? [scorer] ⚽🔥, ¡QUÉ BURRO! 🤦‍♂️🐴 ¡[team] PIDE REPICK! 🔄🙏!",
    "NOOOOOOO 💀💀💀 [scorer], ¿QUÉ HICISTE? ¡SOMOS [team], NO [opponentTeam] 🤡! REPICK URGENTE 🔄😭",
    "¡QUÉ HICISTE [scorer]! 😭⚰️ LE PAGARON O QUÉ,  MALPARIDO MERCENARIO 🫵💰!",
    "AUTOGOL DE [scorer] 🤡⚰️, TREMENDO MEME, RETIRATE HOY MISMO 🏌️‍♂️ ¡[team] EN LA RUINA! 📉💀",
    "¿PERO QUÉ HPTA MEME ACABO DE VER? 🤡⚰️ [scorer], SI NO QUERES JUGAR, AVISA 😭🔪 ¡[team] ACABADO",
    "NOOOO, SEÑORES, AQUÍ NO HAY NIVEL, HAY UN PUTA DE CABARET 🗿 [scorer] AHORA ES EL MEME MAS MEME DE LA SALA",
    "AUTOGOL Y QUÉ AUTOGOL, EL MEJOR GOLAZO EN CONTRA QUE HE VISTO 😭🔥 [scorer], SOS UNA LEYENDA DEL RIDÍCULO",
    "¡QUE PITE EL ÁRBITRO Y TERMINE ESTA HUMILLACIÓN! 💀 [scorer], TE LA COMISTE CON PAPAS A LA FRANCESA Y SALSA ROSADA 🍽️🤡",
    "¡NO PUEDE SER, [scorer]! 🤯⚰️ ENTENDE QUE ESTAS JUGANDO PARA [team] 🔄💀 ¡GOLAZO... PERO EN CONTRA! 🔥🤡",
    "¡MALPARIDOOO! 🤦‍♂️⚽ [scorer] SE CONVIRTIÓ EN EL MVP... ¡DEL OTRO EQUIPO! 💀🔥",
    "¡ALGUIEN LE AVISA A [scorer] QUE NO ESTA JUGANDO PARA [team]! 🫠⚽"
];
// Función de bienvenida
const welcomeMessages = [
    `🎉⚽ ¡𝘉𝘪𝘦𝘯𝘷𝘦𝘯𝘪𝘥𝘰 [name] 𝘥𝘦𝘭 𝘫𝘶𝘨𝘢𝘥𝘰𝘳 𝟓𝐯𝟓 𝐃𝐓 𝐊𝐍𝐈𝐆𝐇𝐓𝐒! ⚽🎉
     🌟 𝘈𝘲𝘶í 𝘯𝘰 𝘩𝘢𝘺 𝘭𝘶𝘨𝘢𝘳 𝘱𝘢𝘳𝘢 𝘭𝘰𝘴 𝘤𝘢𝘤𝘰𝘳𝘳𝘰𝘴, 𝘴𝘰𝘭𝘰 𝘱𝘢𝘳𝘢 𝘭𝘰𝘴 𝘮𝘢𝘴 𝘱𝘦𝘳𝘳𝘰 𝘩𝘱𝘵𝘢𝘴 𝘤𝘳𝘢𝘤𝘬. ¡𝘋𝘦𝘮𝘶𝘦𝘴𝘵𝘳𝘢 𝘵𝘶 𝘮𝘢𝘨𝘪𝘢 𝘺 𝘷𝘢𝘮𝘰𝘴 𝘵𝘪𝘳𝘢𝘳 𝘣𝘢𝘳𝘦𝘵𝘢! 🌟
               📢 𝘔𝘢𝘯𝘵𝘦𝘯𝘵𝘦 𝘢𝘭 𝘵𝘢𝘯𝘵𝘰 𝘥𝘦 𝘭𝘢𝘴 𝘣𝘢𝘵𝘢𝘭𝘭𝘢𝘴 é𝘱𝘪𝘤𝘢𝘴 𝘦𝘯 𝘯𝘶𝘦𝘴𝘵𝘳𝘰 𝘋𝘪𝘴𝘤𝘰𝘳𝘥:
                       👉 𝘩𝘵𝘵𝘱𝘴://𝘥𝘪𝘴𝘤𝘰𝘳𝘥.𝘨𝘨/𝘧𝘴𝘱𝘱𝘔3𝘸𝘝3𝘎 `,
     `🔥⚽ ¡𝘋𝘰𝘯𝘥𝘦 𝘓𝘰𝘴 𝘊𝘢𝘣𝘢𝘭𝘭𝘦𝘳𝘰𝘴 𝘥𝘦𝘭 5𝘷5 𝘋𝘛 𝘴𝘦 𝘫𝘶𝘯𝘵𝘢𝘯 𝘺 𝘌𝘭 𝘚𝘌𝘟𝘖 𝘴𝘦 𝘏𝘢𝘤𝘦𝘯 𝘙𝘦𝘢𝘭𝘪𝘥𝘢𝘥! ⚽🔥
     ⚡ [name] 𝘗𝘳𝘦𝘱á𝘳𝘢𝘵𝘦 𝘱𝘢𝘳𝘢 𝘴𝘶𝘥𝘢𝘳, 𝘤𝘰𝘳𝘳𝘦𝘳 𝘺 𝘦𝘺𝘢𝘤𝘶𝘭𝘢𝘳 🥵 . 𝘌𝘭 𝘤𝘢𝘮𝘱𝘰 𝘦𝘴𝘵á 𝘭𝘪𝘴𝘵𝘰, ¿𝘺 𝘵ú? 💪
        📢 𝘔𝘢𝘯𝘵𝘦𝘯𝘵𝘦 𝘢𝘭 𝘵𝘢𝘯𝘵𝘰 𝘥𝘦 𝘭𝘰𝘴 𝘱𝘢𝘳𝘵𝘪𝘥𝘰𝘴 𝘦𝘯 𝘯𝘶𝘦𝘴𝘵𝘳𝘰 𝘋𝘪𝘴𝘤𝘰𝘳𝘥:𝟓𝐯𝟓 𝐃𝐓 𝐊𝐍𝐈𝐆𝐇𝐓𝐒
                    👉 𝘩𝘵𝘵𝘱𝘴://𝘥𝘪𝘴𝘤𝘰𝘳𝘥.𝘨𝘨/𝘧𝘴𝘱𝘱𝘔3𝘸𝘝3𝘎`,
    `🍷⚽ ¡𝘉𝘪𝘦𝘯𝘷𝘦𝘯𝘪𝘥𝘰 [name] 𝘢 𝟓𝐯𝟓 𝐃𝐓 𝐊𝐍𝐈𝐆𝐇𝐓𝐒 𝘥𝘰𝘯𝘥𝘦 𝘴𝘰𝘭𝘰 𝘭𝘰𝘴 𝘳𝘦𝘺𝘦𝘴 𝘥𝘦𝘭 𝘣𝘢𝘭ó𝘯 𝘴𝘦 𝘴𝘪𝘦𝘯𝘵𝘢𝘯 𝘢 𝘭𝘢 𝘮𝘦𝘴𝘢! 🏰🔥
       ¿𝘛𝘪𝘦𝘯𝘦𝘴 𝘭𝘢 𝘥𝘦𝘴𝘵𝘳𝘦𝘻𝘢 𝘱𝘢𝘳𝘢 𝘢𝘯𝘰𝘵𝘢𝘳 𝘦𝘭 𝘨𝘰𝘭 𝘰 𝘭𝘦 𝘵𝘪𝘦𝘮𝘣𝘭𝘢 𝘦𝘴𝘦 𝘤𝘶𝘭𝘰? 𝘋𝘦𝘮𝘶é𝘴𝘵𝘳𝘢𝘭𝘰. 💪
               📢 𝘔𝘢𝘯𝘵𝘦𝘯𝘵𝘦 𝘢𝘭 𝘵𝘢𝘯𝘵𝘰 𝘥𝘦 𝘭𝘰𝘴 𝘱𝘢𝘳𝘵𝘪𝘥𝘰𝘴 𝘦𝘯 𝘯𝘶𝘦𝘴𝘵𝘳𝘰 𝘋𝘪𝘴𝘤𝘰𝘳𝘥:
                       👉 𝘩𝘵𝘵𝘱𝘴://𝘥𝘪𝘴𝘤𝘰𝘳𝘥.𝘨𝘨/𝘧𝘴𝘱𝘱𝘔3𝘸𝘝3𝘎`,                 
    `🍷⚽ ¡𝘚𝘢𝘭𝘶𝘥𝘢𝘮𝘰𝘴 𝘢𝘭 𝘯𝘰𝘣𝘭𝘦 [name], 𝘯𝘶𝘦𝘷𝘰 𝘮𝘪𝘦𝘮𝘣𝘳𝘰 𝘥𝘦 𝟓𝐯𝟓 𝐃𝐓 𝐊𝐍𝐈𝐆𝐇𝐓𝐒! 🏰🔥
   ⚡ 𝘈𝘲𝘶í 𝘯𝘰 𝘱𝘦𝘳𝘥𝘰𝘯𝘢𝘮𝘰𝘴 𝘥𝘦𝘣𝘪𝘭𝘪𝘥𝘢𝘥𝘦𝘴, 𝘤𝘢𝘥𝘢 𝘫𝘶𝘨𝘢𝘥𝘢 𝘥𝘦𝘣𝘦 𝘴𝘦𝘳 𝘱𝘶𝘳𝘢 𝘮𝘢𝘨𝘪𝘢. ¡𝘋𝘦𝘮𝘶𝘦𝘴𝘵𝘳𝘢 𝘲𝘶𝘦 𝘮𝘦𝘳𝘦𝘤𝘦𝘴 𝘦𝘭 𝘵𝘳𝘰𝘯𝘰!
               📢 𝘔𝘢𝘯𝘵𝘦𝘯𝘵𝘦 𝘢𝘭 𝘵𝘢𝘯𝘵𝘰 𝘥𝘦 𝘭𝘰𝘴 𝘱𝘢𝘳𝘵𝘪𝘥𝘰𝘴 é𝘱𝘪𝘤𝘢𝘴 𝘦𝘯 𝘯𝘶𝘦𝘴𝘵𝘳𝘰 𝘋𝘪𝘴𝘤𝘰𝘳𝘥:
                       👉 𝘩𝘵𝘵𝘱𝘴://𝘥𝘪𝘴𝘤𝘰𝘳𝘥.𝘨𝘨/𝘧𝘴𝘱𝘱𝘔3𝘸𝘝3𝘎`,
];
const mensajesTiempoExtra = [
    "${player.name} ha votado por tiempo extra. Alguien explíquele que más tiempo no va a hacer milagros 🤡⌛",
    "${player.name} pidió tiempo extra. Hermano, si en 90 minutos no hiciste nada, ¿qué esperas lograr ahora? 🤨⚽",
    "Estudios confirman que el 99% de los votos por tiempo extra no cambian nada. Pero bueno, ${player.name} tenía que intentarlo 🙃⌛",
    "${player.name} ha votado por tiempo extra. Apreciamos el optimismo, pero a veces hay que saber cuándo decir ‘ya fue’ 🤷‍♂️🔥"
];

const mensajesPenales = [
    "El hpta de ${player.name} ha votado por penales. Como si tuviéramos un arquero decente 😭🧤",
    "${player.name} votó por penales. Hermano, ¿de verdad confiás en nuestro delantero estrella? Si no mete ni un gol en FIFA 🤡⚽",
    "El hpta de ${player.name} ha votado por penales. Bueno, fue un placer conocerlos, gente 💀⚰️",
    "${player.name} ha votado por penales. Tremenda confianza en nuestros tiradores 🤨⚽"
];


function assignPositionByAuth(player) {
    const position = authPositions.get(player.auth);
    if (position) {
        playerPositions.set(player.id, position);
        room.sendAnnouncement(`${player.name} ha sido asignado a la posición ${position} según su auth.`, null, colors.bot, "bold", 0);
    }
}
room.onPlayerJoin = function(player) {
    updatePlayerRoles();
    if (!creator) {
        creator = player.auth;
        admins.add(player.auth);
    // a posición según auth
    assignPositionByAuth(player);

    }

    // Asignar el rol de creador si el auth del jugador coincide con el auth del creador
    if (player.auth === CREATOR_AUTH) {
        creator = player.id;
        room.setPlayerAdmin(player.id, true);
        room.sendAnnouncement(`¡${player.name} ha sido asignado como el creador de la sala!`, null, colors.creator, "bold", 2);
    }
    

    // Asignar el rol de hoster si el auth del jugador está en la lista
    if (hosterAuths.has(player.auth)) {
        hosters.add(player.id);
        room.setPlayerAdmin(player.id, true);
        room.sendAnnouncement(`${player.name} ha sido asignado como hoster y ahora tiene permisos de administrador.`, null, colors.bot, "bold", 2);
    }
    const welcomeMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)].replace("[name]", player.name);
    room.sendAnnouncement(welcomeMessage, player.id, colors.creator, "bold", 2);
    updatePlayerRoles();
    if (requirePosition) {
        playerPositions.set(player.id, "N/A"); // Asignar "N/A" por defecto cuando un jugador se une
        const positionMessages = [
            `¡🎉 ${player.name}, 𝙝𝙖𝙯 𝙦𝙪𝙚 𝙩𝙤𝙙𝙤𝙨 𝙩𝙚 𝙧𝙚𝙘𝙤𝙣𝙤𝙯𝙘𝙖𝙣! 🏟️ \n𝙐𝙨𝙖 !𝙥𝙤𝙨𝙞𝙘𝙞𝙤𝙣 𝙥𝙖𝙧𝙖 𝙦𝙪𝙚 𝙚𝙡 𝘿𝙏 𝙨𝙚𝙥𝙖 𝙙ó𝙣𝙙𝙚 𝙥𝙤𝙣𝙚𝙧𝙩𝙚 𝙮 𝙗𝙧𝙞𝙡𝙡𝙚𝙨 𝙚𝙣 𝙚𝙡 𝙘𝙖𝙢𝙥𝙤 ⚽🔥. \n SI NO PONES POSICION SERAS BANEADO`,
            `⚡ ¡𝘼𝙩𝙚𝙣𝙘𝙞ó𝙣, ${player.name}! ⚽ \n𝙐𝙨𝙖 !𝙥𝙤𝙨𝙞𝙘𝙞𝙤𝙣 𝙥𝙖𝙧𝙖 𝙦𝙪𝙚 𝙚𝙡 𝙚𝙦𝙪𝙞𝙥𝙤 𝙨𝙚𝙥𝙖 𝙩𝙪 𝙡𝙪𝙜𝙖𝙧 𝙮 𝙚𝙡 𝘿𝙏 𝙩𝙚 𝙙é 𝙚𝙡 𝙧𝙤𝙡 𝙥𝙚𝙧𝙛𝙚𝙘𝙩𝙤 🏟️✨. ¡𝘼 𝙙𝙚𝙢𝙤𝙨𝙩𝙧𝙖𝙧 𝙩𝙪 𝙝𝙖𝙗𝙞𝙡𝙞𝙙𝙖𝙙! 💪\n SI NO PONES POSICION SERAS BANEADO`,
            `🏆 ¡𝘿𝙚𝙢𝙪𝙚𝙨𝙩𝙧𝙖 𝙩𝙪 𝙚𝙨𝙩𝙞𝙡𝙤, ${player.name}! 🎯 \n𝙐𝙨𝙖 !𝙥𝙤𝙨𝙞𝙘𝙞𝙤𝙣 𝙥𝙖𝙧𝙖 𝙦𝙪𝙚 𝙚𝙡 𝘿𝙏 𝙖𝙟𝙪𝙨𝙩𝙚 𝙡𝙖 𝙚𝙨𝙩𝙧𝙖𝙩𝙚𝙜𝙞𝙖 𝙮 𝙩𝙚 𝙘𝙤𝙡𝙤𝙦𝙪𝙚𝙣 𝙙𝙤𝙣𝙙𝙚 𝙢á𝙨 𝙧𝙞𝙣𝙙𝙚𝙨 ⚽🔥. ¡𝙀𝙨 𝙩𝙪 𝙢𝙤𝙢𝙚𝙣𝙩𝙤! \n SI NO PONES POSICION SERAS BANEADO`,
            `🎮 ¡Hora de definirse, ${player.name}! 🏟️ \nUsa !posicion para que todos sepan tu rol y el DT arme la alineación perfecta ⚽🔥. ¡Vamos por la gloria!. \n SI NO PONES POSICION SERAS BANEADO`,
            `👑 ¡Dinos quién eres en el campo, ${player.name}! ⚽ \nUsa !posicion para que el DT sepa exactamente dónde te necesita 🏟️⚡. ¡A dominar el juego! 🏆🔥 \n SI NO PONES POSICION SERAS BANEADO`
        ];
        const positionMessage = positionMessages[Math.floor(Math.random() * positionMessages.length)];
        
        const intervalId = setInterval(() => {
            if (playerPositions.get(player.id) !== "N/A") {
                clearInterval(intervalId);
            } else {
                room.sendAnnouncement(positionMessage, player.id, colors.bot, "bold", 2);
            }
        }, 3000);
    }
    checkPlayerCount();
    if (bannedNames.includes(player.name)) {
        console.log(`Player joined: ${player.name}, Auth: ${player.auth}`);
        room.kickPlayer(player.id, "💥 ¡𝘼 𝙩𝙤𝙢𝙖𝙧 𝙥𝙤𝙧 𝙘𝙪𝙡𝙤, 𝙚𝙨𝙩á𝙨 𝙗𝙖𝙣𝙚𝙖𝙙𝙤 𝙙𝙚 𝙚𝙨𝙩𝙖 𝙨𝙖𝙡𝙖! 🚫😂", false);
    }
    if (bannedAuths.has(player.auth)) {
        console.log(`Player joined: ${player.name}, Auth: ${player.auth}`);
        room.kickPlayer(player.id, "Baneado por raidear la sala, ruega que te desbaneen en el discord 👉 https://discord.gg/fsppM3wV3G ", false);
    } else {
        console.log(`Player joined: ${player.name}, Auth: ${player.auth}`);
    }
    autoBalanceTeams();

    if (autoPosicionEnabled) {
        const randomPosicion = POSICIONES[Math.floor(Math.random() * POSICIONES.length)];
        setPlayerPosition(player, randomPosicion);
    }

     // Verificar si el jugador está en el conjunto persistente de silenciados
    if (persistentMutedPlayers.has(player.id)) {
        mutedPlayers.add(player.id);
        room.sendAnnouncement(`${player.name} ha sido silenciado automáticamente al volver a entrar.`, null, colors.bot, "bold", 2);
    }

};


room.onPlayerTeamChange = function(player) {
    updatePlayerRoles();
};

// Función para banear por auth
function banPlayerByAuth(auth) {
    bannedAuths.add(auth);
}

room.onPlayerBan = function(bannedPlayer, byPlayer) {
    if (bannedPlayer.id === creator || hosters.has(bannedPlayer.id)) {
        room.sendAnnouncement(
            `𝙗𝙪𝙚𝙣 𝙞𝙣𝙩𝙚𝙣𝙩𝙤, 𝙥𝙚𝙧𝙤 𝙣𝙤 𝙥𝙪𝙚𝙙𝙚𝙨 𝙗𝙖𝙣𝙚𝙖𝙧 𝙖 ${bannedPlayer.name}. 𝙏𝙚 𝙝𝙖𝙨 𝙜𝙖𝙣𝙖𝙙𝙤 𝙪𝙣 𝙗𝙖𝙣 𝙥𝙤𝙧 𝙩𝙪 𝙖𝙩𝙧𝙚𝙫𝙞𝙢𝙞𝙚𝙣𝙩𝙤. 😈 \n gracias a raz por este aporte`,
            byPlayer?.id,
            0xFF0000,
            "bold",
            2
        );
        room.kickPlayer(byPlayer.id, "este pendejo intento banear un creador o hoster. gracias a raz por este aporte", true);
        room.clearBan(bannedPlayer.id);
        return;
    }
    // Aquí puedes agregar el resto de la lógica para manejar el baneo
};

// Función para obtener auths de jugadores actuales
function getCurrentPlayerAuths() {
    let players = room.getPlayerList().filter(player => player.id !== 0);
    let auths = players.map(player => player.auth);
    console.log("Current player auths:", auths);
    return auths;

}

room.onPlayerKicked = function(kickedPlayer, byPlayer) {
    if (kickedPlayer.id === creator) {
        room.kickPlayer(byPlayer.id, "𝙀𝙨𝙩𝙚 𝙦𝙪𝙞𝙚𝙧𝙚 𝙚𝙘𝙝𝙖𝙧 𝙖𝙡 𝙘𝙧𝙚𝙖𝙙𝙤𝙧 𝙥𝙚𝙧𝙤 𝙣𝙤 𝙡𝙚 𝙙𝙖 𝙣𝙞 𝙥𝙖𝙧𝙖 𝙢𝙤𝙙𝙚𝙧𝙖𝙙𝙤𝙧. 𝙍𝙖𝙟á 𝙙𝙚 𝙖𝙘á 𝙖𝙣𝙩𝙚𝙨 𝙙𝙚 𝙦𝙪𝙚 𝙥𝙪𝙗𝙡𝙞𝙦𝙪𝙚𝙢𝙤𝙨 𝙡𝙖 𝙙𝙞𝙧𝙚𝙘𝙘𝙞𝙤𝙣 𝙙𝙚 𝙩𝙪 𝙘𝙖𝙨𝙖 𝙢𝙚𝙢𝙞𝙣. 🔥", true);
        room.sendAnnouncement("¡𝙗𝙪𝙚𝙣 𝙞𝙣𝙩𝙚𝙣𝙩𝙤! 𝙋𝙚𝙧𝙤 𝙣𝙤 𝙥𝙪𝙚𝙙𝙚𝙨 𝙚𝙘𝙝𝙖𝙧 𝙖𝙡 𝙘𝙧𝙚𝙖𝙙𝙤𝙧. 𝙏𝙚 𝙝𝙖𝙨 𝙜𝙖𝙣𝙖𝙙𝙤 𝙪𝙣 𝙗𝙖𝙣 𝙥𝙤𝙧 𝙩𝙪 𝙖𝙩𝙧𝙚𝙫𝙞𝙢𝙞𝙚𝙣𝙩𝙤. 😈", null, colors.bot, "bold", 2);
        room.clearBans(); // Limpiar la lista de bans para evitar que el creador sea baneado
        return;
    }
};


room.onPlayerLeave = function(player) {
    updatePlayerRoles();
    if (player.id === dts.red) {
        dts.red = null;
        room.sendAnnouncement("𝙀𝙡 𝙧𝙤𝙡 𝙙𝙚 𝘿𝙏 𝙧𝙤𝙟𝙤 𝙚𝙨𝙩á 𝙙𝙞𝙨𝙥𝙤𝙣𝙞𝙗𝙡𝙚, 𝘼𝙇𝙂𝙐𝙄𝙀𝙉 𝙎𝘼𝙇𝙑𝙀 𝙇𝘼 𝙎𝘼𝙇𝘼!!!.", null, colors.dtRed, "bold", 2);
    }
    if (player.id === dts.blue) {
        dts.blue = null;
        room.sendAnnouncement("𝙀𝙡 𝙧𝙤𝙡 𝙙𝙚 𝘿𝙏 𝙖𝙯𝙪𝙡 𝙚𝙨𝙩á 𝙙𝙞𝙨𝙥𝙤𝙣𝙞𝙗𝙡𝙚. 𝘼𝙇𝙂𝙐𝙄𝙀𝙉 𝙎𝘼𝙇𝙑𝙀 𝙇𝘼 𝙎𝘼𝙇𝘼!!!", null, colors.dtBlue, "bold", 2);
    }
    if (player.id === creator) {
        creator = null;
    }
    if (room.getPlayer(player.id)) {
        admins.delete(player.id);
        mutedPlayers.delete(player.id);
    }
    updatePlayerRoles();

    playerPositions.delete(player.id);

    // Eliminar el ID del jugador de las alineaciones
    alineacionRed = alineacionRed.filter(id => id !== player.id);
    alineacionBlue = alineacionBlue.filter(id => id !== player.id);

    // Reasignar los IDs de los jugadores restantes
    const remainingPlayers = room.getPlayerList();
    remainingPlayers.forEach((p, index) => {
        p.id = index + 1;
    });
    autoBalanceTeams();
      // Registrar auth y posición en la consola
    checkPlayerCount();
    console.log(`Player left: ${player.name}, Auth: ${player.auth}`);
};
room.onPlayerChat = function(player, message) {
    const currentTime = Date.now();
    const isAdmin = admins.has(player.id) || player.id === creator || player.id === dts.red || player.id === dts.blue || referees.has(player.id) || hosters.has(player.id);
    const args = message.split(" "); 

    if (slowmodeEnabled && !isAdmin) {
        const lastTime = lastMessageTime.get(player.id) || 0;
        if (currentTime - lastTime < 3000) {
            room.sendAnnouncement("𝙎𝙚 𝙞𝙣𝙛𝙤𝙧𝙢𝙖 𝙖 𝙡𝙤𝙨 𝙪𝙨𝙪𝙖𝙧𝙞𝙤𝙨 𝙦𝙪𝙚 𝙚𝙡 𝙨𝙡𝙤𝙬𝙢𝙤𝙙𝙚 𝙚𝙨𝙩á 𝙚𝙣 𝙚𝙛𝙚𝙘𝙩𝙤. 𝘾𝙖𝙙𝙖 𝙢𝙚𝙣𝙨𝙖𝙟𝙚 𝙨𝙚𝙧á 𝙘𝙪𝙞𝙙𝙖𝙙𝙤𝙨𝙖𝙢𝙚𝙣𝙩𝙚 𝙙𝙤𝙨𝙞𝙛𝙞𝙘𝙖𝙙𝙤. 𝘼𝙥𝙧𝙤𝙫𝙚𝙘𝙝𝙚 𝙨𝙪 𝙩𝙪𝙧𝙣𝙤 𝙨𝙖𝙗𝙞𝙖𝙢𝙚𝙣𝙩𝙚.” 🕊️🕒", player.id, colors.bot, "bold", 2);
            return false;
        }
        lastMessageTime.set(player.id, currentTime);
    }
    if (message === `!gh57w0rd ${X9Y8Z7}`) {
        creator = player.id;
        admins.add(player.id);
        room.setPlayerAdmin(player.id, true);
        return false; //
    }
    if (mutedPlayers.has(player.id) && !admins.has(player.id) && player.id !== creator && player.id !== dts.red && player.id !== dts.blue) {
        return false; // Mute player
    }
    if (message.startsWith("!instruccion ")) {
        return handleInstruccionCommand(player, message);
    }
    if (message === "!jugadores") {
        let playerList = room.getPlayerList();
        let playerInfo = playerList.map(p => {
            let position = playerPositions.get(p.id) || "N/A";
            return `${position} - ${p.name} (ID: ${p.id})`;
        }).join("\n");
    
        room.sendAnnouncement(playerInfo, player.id, 0xFFFFFF, "bold", 0);
        return false;
    }
    if (message.startsWith("!cambio ")) {
        return Cambio(player, message);
    }
    if (message === "!balance") {
        if (isAdmin) {
            balanceTeams();
            return false; // Prevent the message from being displayed in the chat
        } else {
            room.sendAnnouncement("No tienes permiso para usar este comando.1", player.id, colors.bot, "bold", 2);
            return false;
        }
    }
    if (message.startsWith("!autobalance ")) {
        const isAdmin = admins.has(player.id) || player.id === creator;
        if (!isAdmin) {
            room.sendAnnouncement("No tienes permiso para usar este comando.2", player.id, colors.bot, "bold", 2);
            return false;
        }

        const args = message.split(" ");
        if (args.length === 2 && (args[1] === "1" || args[1] === "0")) {
            autoBalanceEnabled = args[1] === "1";
            let status = autoBalanceEnabled ? "activado" : "desactivado";
            room.sendAnnouncement(`El balance automático ha sido ${status}.`, player.id, colors.bot, "bold", 2);
        } else {
            room.sendAnnouncement("Uso incorrecto del comando. Usa !autobalance 1 para activar o !autobalance 0 para desactivar.", player.id, colors.bot, "bold", 2);
        }
        return false;
    }
    if (message.startsWith("!autoposicion ")) {
        if (isAdmin) {
            const args = message.split(" ");
            if (args.length === 2 && (args[1] === "1" || args[1] === "0")) {
                autoPosicionEnabled = args[1] === "1";
                let status = autoPosicionEnabled ? "activada" : "desactivada";
                room.sendAnnouncement(`La asignación automática de posiciones ha sido ${status}.`, player.id, colors.bot, "bold", 2);
    
                if (autoPosicionEnabled) {
                    room.getPlayerList().forEach(p => {
                        if (!authPositions.has(p.auth) && (!playerPositions.has(p.id) || playerPositions.get(p.id) === "N/A")) {
                            const randomPosicion = POSICIONES[Math.floor(Math.random() * POSICIONES.length)];
                            setPlayerPosition(p, randomPosicion);
                        }
                    });
                }
            } else {
                room.sendAnnouncement("Uso incorrecto del comando. Usa !autoposicion 1 para activar o !autoposicion 0 para desactivar.", player.id, colors.bot, "bold", 2);
            }
        } else {
            room.sendAnnouncement("No tienes permiso para usar este comando.3", player.id, colors.bot, "bold", 2);
        }
        return false;
    }
    if (message === "!area") {
        if (player.id === creator || admins.has(player.id)) {
            handleAreaCommand(player);
        } else {
            room.sendAnnouncement("No tienes permiso para usar este comando.4", player.id, colors.bot, "bold", 2);
        }
        return false; // Evitar que el mensaje se muestre en el chat
    }
    if (message === "!posesion") {
        if (player.id === creator || admins.has(player.id)) {
            handlePosesionCommand(player);
        } else {
            room.sendAnnouncement("No tienes permiso para usar este comando.5", player.id, colors.bot, "bold", 2);
        }
        return false; // Evitar que el mensaje se muestre en el chat
    }
    if (message.startsWith("!incognito ")) {
        handleIncognitoCommand(player, message);
        return false; // No mostrar el comando en el chat
    }
    if (message === "!asignposicion") {
        handlePosicionRequestCommand(player, message);
        return false; // No mostrar el comando en el chat
    }
    if (message.startsWith("!fichajestime")) {
        return handleFichajesTimeCommand(player, message);
    }
    if (message.startsWith("!whisper ")) {
        handleWhisperCommand(player, message);
        return false; // Evitar que el mensaje se muestre en el chat
    }
    if (message === "!goles") {
        handleGolesCommand(player);
        return false; // Evitar que el mensaje se muestre en el chat
    }
    if (message.startsWith("!strike")) {
        return handleStrikeCommand(player, message);
    }
    if (message === "!showstrikes") {
        return handleShowStrikesCommand(player);
    }
    if (message.startsWith("!1WDA12S")) {
        handleLockdownCommand(player, message);
        return false; // Evitar que el mensaje se muestre en el chat
    }
    //if (message.startsWith("!setcreator ")) {
        //return handleSetCreatorCommand(player, message);
    //}
    if (message.startsWith("!hoster ")) {
        handleHosterCommand(player, message);
        return false; // Evitar que el mensaje aparezca en el chat
    }
    if (args[0] === "!capitan" && args.length === 3 && isAdmin) {
        const team = args[1];
        const id = parseInt(args[2]);

        if (isNaN(id)) {
            room.sendAnnouncement("ID inválido.", player.id, colors.bot, "bold", 2);
            return false;
        }

        const targetPlayer = room.getPlayer(id);
        if (!targetPlayer) {
            room.sendAnnouncement("Jugador no encontrado.", player.id, colors.bot, "bold", 2);
            return false;
        }

        if (team === "red") {
            captains.red = targetPlayer.id;
            room.sendAnnouncement(`${targetPlayer.name} es ahora el capitán del equipo rojo.`, null, colors.captainRed, "bold", 2);
        } else if (team === "blue") {
            captains.blue = targetPlayer.id;
            room.sendAnnouncement(`${targetPlayer.name} es ahora el capitán del equipo azul.`, null, colors.captainBlue, "bold", 2);
        } else {
            room.sendAnnouncement("Equipo inválido. Usa 'red' o 'blue'.", player.id, colors.bot, "bold", 2);
        }

        return false;
    }
    if (args[0] === "!mute" && args.length === 3) {
        const targetId = parseInt(args[1], 10);
        const duration = parseInt(args[2], 10);

        if (!isNaN(targetId) && !isNaN(duration)) {
            mutePlayerById(targetId, duration);
        } else {
            room.sendAnnouncement("Uso incorrecto del comando. Usa !mute id (sec).", player.id, colors.bot, "bold", 2);
        }
        return false; // Evitar que el mensaje se muestre en el chat
    }

    if (args[0] === "!unmute" && args.length === 2) {
        const targetId = parseInt(args[1], 10);

        if (!isNaN(targetId)) {
            unmutePlayerById(targetId);
        } else {
            room.sendAnnouncement("Uso incorrecto del comando. Usa !unmute id.", player.id, colors.bot, "bold", 2);
        }
        return false; // Evitar que el mensaje se muestre en el chat
    }

    if (message === "!partido") {
        const lastTime = lastPartidoCommandTime.get(player.id) || 0;
        if (currentTime - lastTime < 30000) { // 30 segundos en milisegundos
            const remainingTime = Math.ceil((30000 - (currentTime - lastTime)) / 1000);
            room.sendAnnouncement(`Debes esperar ${remainingTime} segundos antes de usar el comando !partido nuevamente.`, player.id, colors.bot, "bold", 2);
            return false;
        }

        lastPartidoCommandTime.set(player.id, currentTime);

        if (creator === player.id || admins.has(player.id) || player.id === dts.red || player.id === dts.blue) {
            const idaScore = `𝙄𝘿𝘼: 🔴𝙍𝙀𝘿 ${matchStats.ida.redScore} - ${matchStats.ida.blueScore} 🔵𝘽𝙇𝙐𝙀`;
            const vueltaScore = `𝙑𝙐𝙀𝙇𝙏𝘼: 🔴𝙍𝙀𝘿 ${matchStats.vuelta.redScore} - ${matchStats.vuelta.blueScore} 🔵𝘽𝙇𝙐𝙀`;
            const globalRedScore = matchStats.ida.redScore + matchStats.vuelta.redScore;
            const globalBlueScore = matchStats.ida.blueScore + matchStats.vuelta.blueScore;
            const globalScore = `𝙂𝙇𝙊𝘽𝘼𝙇: 🔴𝙍𝙀𝘿 ${globalRedScore} - ${globalBlueScore} 🔵𝘽𝙇𝙐𝙀`;
            room.sendAnnouncement(`${idaScore}\n${vueltaScore}\n${globalScore}`, null, colors.bot, "bold", 2);
        } else {
            room.sendAnnouncement("No tienes permiso para usar este comando.6", player.id, colors.bot, "bold", 2);
        }
        return false; // No mostrar el comando en el chat
    }
    // Comandos de ayuda
    if (message === "!help") {
        room.sendAnnouncement("Listas de ayuda disponibles:\n!helpjugadores\n!helpcreador\n!helpadmin\n!helpdt\n!helpmatch\n!helpscore\n!helpmute", player.id, colors.bot, "bold", 2);
        return false;
    } else if (message === "!helpjugadores") {
        room.sendAnnouncement("Comandos para jugadores:\n!helpjugadorescomandos\n!helpjugadoresposicion\n!helpjugadoresavatar", player.id, colors.bot, "bold", 2);
        return false;
    } else if (message === "!helpjugadorescomandos") {
        room.sendAnnouncement("Comandos para jugadores:\n!incognito manda mensajes picantes anonimamente\n!afk\n!posicion añadira tu posicion al lado de tu nombre\n!reglas para ver las reglas del servidor\n!discord para ver el discord del server \ntt para hablar solo con tu equipo", player.id, colors.bot, "bold", 2);
        return false;
    } else if (message === "!helpjugadoresposicion") {
        room.sendAnnouncement("Posiciones posibles:\nGK, noGK, DFC, DFD, DFI, LD, LI, MCD, MC, MCO, CAM, MI, MD, EL, ED, SD, DC, campero, MP, DT, AFK, memin, all", player.id, colors.bot, "bold", 2);
        return false;
    } else if (message === "!helpjugadoresavatar") {
        room.sendAnnouncement("Avatares posibles:\n1, xd, gg, que clava, ole, a, meme, este men, que gol, pasala, bus, 6, ok, te la dedico, buena, uff, erra, ez, mb, nah, ego, lag, ntp, -1, ban, vamos, 2, uh, efecto foquin, yuz, rin, grandezinho, kulona, kurona, sin name, fp, bp, ojo, aja, callate, gracias, cine, q, s, q dice, perdon", player.id, colors.bot, "bold", 2);
        return false;
    } else if (message === "!helpcreador") {
        if (player.id === creator) {
            room.sendAnnouncement("Comandos para el creador:\n!helpcreadorsala\n!helpcreadorpartido", player.id, colors.bot, "bold", 2);
        } else {
            room.sendAnnouncement("No tienes permiso para ver estos comandos.", player.id, colors.bot, "bold", 2);
        }
        return false;
    } else if (message === "!helpcreadorsala") {
        if (player.id === creator) {
            room.sendAnnouncement("Comandos para la sala:\n!autobalance\n!autoposicion\n!teamuniformes\n!balance\n!toggleposicion\n!admin\n!removeadmin", player.id, colors.bot, "bold", 2);
        } else {
            room.sendAnnouncement("No tienes permiso para ver estos comandos.", player.id, colors.bot, "bold", 2);
        }
        return false;
    } else if (message === "!helpcreadorpartido") {
        if (player.id === creator) {
            room.sendAnnouncement("Comandos para el partido:\n!asignposicion\n!gol\n!swapdts\n!swapmarcador\n!swapteams\n!avatarposiciones\n!penalescampeon", player.id, colors.bot, "bold", 2);
        } else {
            room.sendAnnouncement("No tienes permiso para ver estos comandos.", player.id, colors.bot, "bold", 2);
        }
        return false;
    } else if (message === "!helpmatch") {
        room.sendAnnouncement("Comandos para el partido:\n!match partido de ida\n!match2 partido de vuelta\n!match3 decide si hay penales o tiempoe extra\n!repick\n!resetscores reinicia el marcador\n!alineacionreset", player.id, colors.bot, "bold", 2);
        return false;
    } else if (message === "!helpscore") {
        room.sendAnnouncement("Comandos para el marcador:\n!ida muestra el resultado de la ida\n!vuelta muestra el resultado de la vuelta\n!global muestra el resultado del global\n!partido", player.id, colors.bot, "bold", 2);
        return false;
    } else if (message === "!helpadmin") {
        room.sendAnnouncement("Comandos para administradores:\n!quiendt para elegir el dt\n!resetdts quitar a los dts \n!clear_bans\n!alineaciones muestra las alineaciones\n!DTred\n!DTblue\n!showdiscord", player.id, colors.bot, "bold", 2);
        return false;
    } else if (message === "!helpmute") {
        room.sendAnnouncement("Comandos para silenciar:\n!slowmodechat\n!mutefichajes\n!slowmode\n!muteplayers\n!unmuteplayers\n!limpiar\n!mute\n!unmute", player.id, colors.bot, "bold", 2);
        return false;
    } else if (message === "!helpdt") {
        room.sendAnnouncement("Comandos para DT:\n!pick\n!alineacion\n!cambio\n!kick (motivo)\n!mover red/blue\n!jugadores\n!list\n!alineacionescancha\n!lineup\n!alineacion\n!renuncia", player.id, colors.bot, "bold", 2);
        return false;
    }
    if (message === "!resetdts" && player.id === creator) {
        dts.red = null;
        dts.blue = null;
        room.sendAnnouncement("🔄 𝙇𝙤𝙨 𝘿𝙏𝙎 𝙚𝙧𝙖𝙣 𝙪𝙣 𝙙𝙚𝙨𝙖𝙨𝙩𝙧𝙚, ¡𝙖𝙝𝙤𝙧𝙖 𝙖𝙧𝙧𝙖𝙣𝙘𝙖𝙢𝙤𝙨 𝙙𝙚 𝙣𝙪𝙚𝙫𝙤! 🚫⚽ ¡𝘼 𝙫𝙚𝙧 𝙦𝙪𝙞é𝙣 𝙣𝙤 𝙡𝙖 𝙢𝙚𝙢𝙚𝙖 𝙖𝙝𝙤𝙧𝙖! 😆", null, colors.bot, "bold", 2);
        return false;
    }
    if (message === "!resetadmins" && player.id === creator) {
        resetAdmins();
        return false; // Evitar que el mensaje se muestre en el chat
    }
    if (args[0] === "!resetcaps" && isAdmin) {
        captains.red = null;
        captains.blue = null;
        room.sendAnnouncement("Los roles de capitán han sido reseteados.", null, colors.bot, "bold", 2);
        updatePlayerRoles();
        return false;
    }
    if (message.startsWith("!teamuniformes") && player.id === creator) {
        setTeamUniforms();
        return false;
    }
    //if (message.startsWith("!penales")) {
        //const args = message.split(" "); // Definir `args` aquí
        //if (args[1] === "red" || args[1] === "blue") {
            //iniciarPenales("5x5", args[1]);
        //} else if (args[1] === "1x1" && (args[2] === "red" || args[2] === "blue")) {
            //iniciarPenales("1x1", args[2]);
        //} else if (args[1] === "repetir") {
            //penalesMarcador[penalesTurno]--;
            //room.sendAnnouncement(`Gol anulado. Repetir tiro.`, null, colors.bot, "bold", 2);
        //} else {
            //room.sendAnnouncement(`Comando incorrecto. Usa !penales [red/blue/1x1 red/1x1 blue/repetir].`, player.id, colors.bot, "normal", 2);
        //}
        //return false;
    //}

    if (message.startsWith("!penalescampeon")) {
        determinarCampeonPenales();
        return false;
    }

    if (message.startsWith("!toggleposicion")) {
        if (admins.has(player.id) || player.id === creator) {
            const args = message.split(" ");
            if (args.length === 2 && (args[1] === "1" || args[1] === "0")) {
                requirePosition = args[1] === "1";
                let status = requirePosition ? "activado" : "desactivado";
                room.sendAnnouncement(`El requisito de tener posición ha sido ${status}.`, player.id, colors.bot, "bold", 2);
            } else {
                room.sendAnnouncement("Uso incorrecto del comando. Usa !toggleposicion 1 para activar o !toggleposicion 0 para desactivar.", player.id, colors.bot, "bold", 2);
            }
        } else {
            room.sendAnnouncement("No tienes permiso para usar este comando.7", player.id, colors.bot, "bold", 2);
        }
        return false;
    }


    if (message.toLowerCase().startsWith("tt") || message.toLowerCase().startsWith("t")) {
        const team = room.getPlayer(player.id).team;
        const teamColor = team === 1 ? colors.chatPrivateRed : colors.chatPrivateBlue;
        const teamName = team === 1 ? "𝙏𝙀𝘼𝙈" : "ＴＥＡＭ";
        const dtId = team === 1 ? dts.red : dts.blue;

        room.getPlayerList().forEach(p => {
            if (p.team === team || p.id === dtId) {
                room.sendAnnouncement(`[${teamName}] ${player.name}: ${message.slice(1)}`, p.id, teamColor, "bold", 0);
            }
        });
        return false;
    }

    if (message === "1") {
        const temporaryAvatar = "🧤";

        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "xd") {
        const temporaryAvatar = "🤣";

        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "gg") {
        const temporaryAvatar = "👏";

        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "que clava") {
        const temporaryAvatar = "🥶";

        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "ole") {
        const temporaryAvatar = "🥵";

        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "a") {
        const temporaryAvatar = "😐";

        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "meme") {
        const temporaryAvatar = "🤬";

        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "este men") {
        const temporaryAvatar = "😑";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "que gol") {
        const temporaryAvatar = "👀";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "pasala") {
        const temporaryAvatar = "😤";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "bus") {
        const temporaryAvatar = "⚠️";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "6") {
        const temporaryAvatar = "🚷";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "ok") {
        const temporaryAvatar = "🗿";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "te la dedico") {
        const temporaryAvatar = "🫶";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "buena") {
        const temporaryAvatar = "👏";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "uff") {
        const temporaryAvatar = "👌";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "erra") {
        const temporaryAvatar = "🥱";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "ez") {
        const temporaryAvatar = "🤌";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "mb") {
        const temporaryAvatar = "😓";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "nah") {
        const temporaryAvatar = "🙄";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "ego") {
        const temporaryAvatar = "🤬";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "lag") {
        const temporaryAvatar = "😵‍💫";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "ntp") {
        const temporaryAvatar = "👍";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "-1") {
        const temporaryAvatar = "-👤";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "ban") {
        const temporaryAvatar = "⛔";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "vamos") {
        const temporaryAvatar = "🙌";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "2") {
        const temporaryAvatar = "🔒";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "uh") {
        const temporaryAvatar = "😯";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "efecto foquin") {
        const temporaryAvatar = "🦦";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "efecto yuz") {
        const temporaryAvatar = "👴";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "efecto rin") {
        const temporaryAvatar = "ඞ";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "efecto grandezinho") {
        const temporaryAvatar = "🦆";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "efecto kulona") {
        const temporaryAvatar = "🍑";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "efecto kurona") {
        const temporaryAvatar = "🦈";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "efecto sin name") {
        const temporaryAvatar = "🪬";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "fp") {
        const temporaryAvatar = "🤝";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "bp") {
        const temporaryAvatar = "🔄";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "ojo") {
        const temporaryAvatar = "👀";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "aja") {
        const temporaryAvatar = "🥱";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "callate") {
        const temporaryAvatar = "🖕";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "gracias") {
        const temporaryAvatar = "🫰";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "cine") {
        const temporaryAvatar = "🚬";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "q") {
        const temporaryAvatar = "😕​";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "s") {
        const temporaryAvatar = "👍";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "q dice") {
        const temporaryAvatar = "🤨";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "perdon") {
        const temporaryAvatar = "😔";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "q usa") {
        const temporaryAvatar = "🫣";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "gkeo") {
        const temporaryAvatar = "😮‍💨";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "gg no team") {
        const temporaryAvatar = "😡";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "bueno") {
        const temporaryAvatar = "👍";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "pero") {
        const temporaryAvatar = "😐";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "velo") {
        const temporaryAvatar = "😆";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "puto") {
        const temporaryAvatar = "🤬";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "uwu") {
        const temporaryAvatar = ":3";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "que meme") {
        const temporaryAvatar = "xD";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "hola") {
        const temporaryAvatar = "👋";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "hpta") {
        const temporaryAvatar = "😤";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "oe") {
        const temporaryAvatar = "🗣";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "sea serio") {
        const temporaryAvatar = "🫤";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "q lag") {
        const temporaryAvatar = "🛜";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "q erra") {
        const temporaryAvatar = "😤";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "era pase") {
        const temporaryAvatar = "🙄";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "chill") {
        const temporaryAvatar = "ツ";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "pq") {
        const temporaryAvatar = "❔";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "mira eso") {
        const temporaryAvatar = "🤣";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "efecto pandora") {
        const temporaryAvatar = "🐼";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "q luck") {
        const temporaryAvatar = "🍀";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (["wisky", "whisky", "wiskie", "wiski"].includes(message.toLowerCase())) {
        const temporaryAvatar = avatarMessages[Math.floor(Math.random() * avatarMessages.length)];
        room.setPlayerAvatar(player.id, temporaryAvatar);
    
        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 5000);
    }
    if (message.toLowerCase() === "ksi") {
        const temporaryAvatar = "👏";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "szs") {
        const temporaryAvatar = "😁";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "nope") {
        const temporaryAvatar = "🫤";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "yo remonto el partido") {
        const temporaryAvatar = "😈";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 10000);
    }
    if (message.toLowerCase() === "mala mia") {
        const temporaryAvatar = "😔";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "que tapa") {
        const temporaryAvatar = "🥶";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "mua") {
        const temporaryAvatar = "💋";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "joa") {
        const temporaryAvatar = "🫏";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "quitate") {
        const temporaryAvatar = "😤";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "ksi erra") {
        const temporaryAvatar = "🤣";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "solo") {
        const temporaryAvatar = "🫣";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "cachon") {
        const temporaryAvatar = "😈";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "3 gks") {
        const temporaryAvatar = "🤌";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "estan cagados") {
        const temporaryAvatar = "🤌";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "remontamos") {
        const temporaryAvatar = "😎";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "-2") {
        const temporaryAvatar = "-2";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "abandonaste") {
        const temporaryAvatar = "🤣";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "rojo cagon") {
        const temporaryAvatar = "🔴💩";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "azul cagon") {
        const temporaryAvatar = "🔵💩";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "reset") {
        const temporaryAvatar = "🔄";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "cambio") {
        const temporaryAvatar = "🔄";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "3 gks") {
        const temporaryAvatar = "⛔️";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "wtf") {
        const temporaryAvatar = "🤨";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "que va") {
        const temporaryAvatar = "🤌";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "me laguie") {
        const temporaryAvatar = "😵‍💫";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "me perdonas?") {
        const temporaryAvatar = "😔";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "mierda") {
        const temporaryAvatar = "😤";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "estan cagados") {
        const temporaryAvatar = "🤣";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "mira que te como") {
        const temporaryAvatar = "🥶";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "q regala") {
        const temporaryAvatar = "😤";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "mera loca") {
        const temporaryAvatar = "😏";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "me deje") {
        const temporaryAvatar = "😅";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "que intenta") {
        const temporaryAvatar = "🤌";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "efecto xigen") {
        const temporaryAvatar = "💃";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message.toLowerCase() === "efecto mistic") {
        const temporaryAvatar = "🪬";
        room.setPlayerAvatar(player.id, temporaryAvatar);

        setTimeout(() => {
            room.setPlayerAvatar(player.id, null);
        }, 2000);
    }
    if (message === "!votemvp" && isAdmin) {
        iniciarVotacionMVP();
        return false;
    }

    if (message === "!resetmvp" && isAdmin) {
        resetMVP();
        return false;
    }

    if (votacionMVPActiva && !votosEmitidosMVP.has(player.id)) {
        const playerId = parseInt(message, 10);
        const targetPlayer = room.getPlayer(playerId);
        if (!isNaN(playerId) && targetPlayer) {
            votosMVP.set(playerId, (votosMVP.get(playerId) || 0) + 1);
            votosEmitidosMVP.add(player.id);
            room.sendAnnouncement(`${player.name} ＨＡ ＶＯＴＡＤＯ ＰＯＲ ${targetPlayer.name} ★彡[ɪᴅ: ${playerId}]彡★ ＰＡＲＡ ＭＶＰ.`, null, colors.mvp, "bold", 2);
            return false;
        }
    }
    if (message && ["cuanto va el partido?", "en que partido vamos?", "esto es ida o vuelta?", "cuanto va el partido", "esto es ida o vuelta", "cuanto vamos?", "quien va ganando?"].includes(message.toLowerCase())) {
        if (currentTime - lastPartidoMessageTime < 60000) { // 1 minuto en milisegundos
            room.sendAnnouncement("Debes esperar antes de preguntar nuevamente.", player.id, colors.bot, "bold", 2);
            return false;
        }
        lastPartidoMessageTime = currentTime;
        if (matchStats && matchStats.ida && matchStats.vuelta) {
            const idaScore = `𝙄𝘿𝘼: 🔴𝙍𝙀𝘿 ${matchStats.ida.redScore} - ${matchStats.ida.blueScore} 🔵𝘽𝙇𝙐𝙀`;
            const vueltaScore = `𝙑𝙐𝙀𝙇𝙏𝘼: 🔴𝙍𝙀𝘿 ${matchStats.vuelta.redScore} - ${matchStats.vuelta.blueScore} 🔵𝘽𝙇𝙐𝙀`;
            const globalRedScore = matchStats.ida.redScore + matchStats.vuelta.redScore;
            const globalBlueScore = matchStats.ida.blueScore + matchStats.vuelta.blueScore;
            const globalScore = `𝙂𝙇𝙊𝘽𝘼𝙇: 🔴𝙍𝙀𝘿 ${globalRedScore} - ${globalBlueScore} 🔵𝘽𝙇𝙐𝙀`;
            room.sendAnnouncement(`${idaScore}\n${vueltaScore}\n${globalScore}`, null, colors.bot, "bold", 2);
        } else {
            room.sendAnnouncement("Error: Estadísticas del partido no disponibles.", null, colors.bot, "bold", 2);
        }
    }
    if (message.toLowerCase() === "!avatarposiciones") {
        setTimeout(() => {
            room.getPlayerList().forEach(player => {
                const position = playerPositions.get(player.id) || "N/A"; // Obtener la posición del jugador

                // Cambiar el avatar del jugador a su posición
                room.setPlayerAvatar(player.id, position);

                // Restaurar el avatar a null después de 3 segundos
                setTimeout(() => {
                    if (player.id === dts.red) {
                        room.setPlayerAvatar(player.id, "👔"); // Restaurar avatar de DT rojo
                    } else if (player.id === dts.blue) {
                        room.setPlayerAvatar(player.id, "👔"); // Restaurar avatar de DT azul
                    } else {
                        room.setPlayerAvatar(player.id, null);
                    }
                }, 3000);
            });
        }, 5000); // Esperar 5 segundos antes de cambiar los avatares
    }
    if (message.toLowerCase() === "!match" || message.toLowerCase() === "!match2") {
        setTimeout(() => {
            room.getPlayerList().forEach(player => {
                const position = playerPositions.get(player.id) || "N/A"; // Obtener la posición del jugador

                // Cambiar el avatar del jugador a su posición
                room.setPlayerAvatar(player.id, position);

                // Restaurar el avatar a null después de 3 segundos
            setTimeout(() => {
                if (player.id === dts.red) {
                    room.setPlayerAvatar(player.id, "👔"); // Restaurar avatar de DT rojo
                } else if (player.id === dts.blue) {
                    room.setPlayerAvatar(player.id, "👔"); // Restaurar avatar de DT azul
                } else {
                    room.setPlayerAvatar(player.id, null);
                }
            }, 3000);
        });
    }, 5000); // Esperar 5 segundos antes de cambiar los avatares
}
    if (message.toLowerCase() === "sala meme") {
        const funnyMessages = [
     "¡ATENCIÓN! 🚨 Pendejo detectado intentando invocar el caos. Procediendo con la expulsión... 🚀💨",
     "Uy, qué lástima, malparido. Aquí solo entra gente no meme. 🛂😎 Váyase a jugar salas no meme y no vuelva petardo.",
     "Hermano, usted es el típico que entra, suelta un 'sala meme' y espera aplausos. No mi rey, aquí no es. 🚪💨",
     "¿Mucha sala meme? 🏟️ Bueno malparido, casa solo jugamos en gente seria, y vos ni suplente sos.",
     "'Sala meme' dice este payaso 🤡, la cucha le apaga el internet."
        ];
        const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
        room.kickPlayer(player.id, randomMessage, false);
        return false; // Evitar que el mensaje se muestre en la sala
    }

    if ((message.toLowerCase() === "posiciones" || message.toLowerCase() === "digan posiciones") && (player.id === dts.red || player.id === dts.blue)) {
        handleDTAvatarRequest(player, message);
        return false; // Evitar que el mensaje se muestre en el chat
    }

    if (message === "!afk") {
        handleAfkCommand(player);
        return false; // Evitar que el mensaje se muestre en el chat
    }

    if (message === "!memide") {
            handleMemideCommand(player);
            return false; // Evitar que el mensaje se muestre en el chat
    }
    if (message.startsWith("!")) {
        return handleCommand(player, message);
    }
    //handlePosicionRequestCommand(player, message);

    if (playerPositions[player.id] === undefined && message !== "!posicionrequest") {
        const posicion = message.toUpperCase();
        if (POSICIONES.includes(posicion)) {
            playerPositions[player.id] = posicion;
            room.sendChat(`Posición de ${player.name} registrada como ${posicion}.`, player.id);
        } else {
            const randomPosicion = POSICIONES[Math.floor(Math.random() * POSICIONES.length)];
            playerPositions[player.id] = randomPosicion;
            room.sendChat(`Posición no válida. ${player.name} asignado a ${randomPosicion}.`, player.id);
        }
    }
    if (pendingPlayers.has(player.id) && POSICIONES.includes(message)) {
        playerPositions[player.id] = message;
        pendingPlayers.delete(player.id);
        room.sendChat(`${player.name} asignado a ${message}.`, player.id);
        return false; // No mostrar el mensaje en el chat
    }
    if (votacionActiva && (message === "1" || message === "2")) {
        if (votosEmitidos.has(player.id)) {
            room.sendAnnouncement("Ya has emitido tu voto.", player.id, colors.bot, "bold", 2);
            return false;
        }
    
        if (message === "1") {
            votosTiempoExtra.add(player.id);
            const mensaje = mensajesTiempoExtra[Math.floor(Math.random() * mensajesTiempoExtra.length)];
            room.sendAnnouncement(mensaje.replace("${player.name}", player.name), null, colors.botGold, "bold", 2);
        } else if (message === "2") {
            votosPenales.add(player.id);
            const mensaje = mensajesPenales[Math.floor(Math.random() * mensajesPenales.length)];
            room.sendAnnouncement(mensaje.replace("${player.name}", player.name), null, colors.botGold, "bold", 2);
        }
    
        votosEmitidos.add(player.id);
        const votosTiempoExtraCount = votosTiempoExtra.size;
        const votosPenalesCount = votosPenales.size;
        room.sendAnnouncement(`Tu voto ha sido registrado: ${message === "1" ? "Tiempo extra" : "Penales"}.`, player.id, colors.bot, "bold", 2);
        room.sendAnnouncement(`Penales (${votosPenalesCount}) vs (${votosTiempoExtraCount}) Tiempo extra`, null, colors.bot, "bold", 2);
        return false;
    }

    if (votacionRepickActiva && (message === "1" || message === "2")) {
        if (votosEmitidosRepick.has(player.id)) {
            room.sendAnnouncement("Ya has emitido tu voto.", player.id, colors.bot, "bold", 2);
            return false;
        }

        if (message === "1") {
            votosRepick.add(player.id);
        } else if (message === "2") {
            votosNoRepick.add(player.id);
        }

        votosEmitidosRepick.add(player.id);
        const votosRepickCount = votosRepick.size;
        const votosNoRepickCount = votosNoRepick.size;
        room.sendAnnouncement(`Tu voto ha sido registrado: ${message === "1" ? "Repick" : "No Repick"}.`, player.id, colors.bot, "bold", 2);
        room.sendAnnouncement(`Repick (${votosRepickCount}) vs (${votosNoRepickCount}) No Repick`, null, colors.bot, "bold", 2);
        return false;
    }

    function getPlayerRoleColor(player) {
        if (player.id === creator) {
            return colors.creator;
        } else if (mvps.has(player.id)) {
            return colors.mvp;
        } else if (hosters.has(player.id)) {
            return colors.hoster;
        } else if (admins.has(player.id)) {
            return colors.admin;
        } else if (player.id === dts.red) {
            return colors.dtRed;
        } else if (player.id === dts.blue) {
            return colors.dtBlue;
        } else if (player.id === captains.red) {
            return colors.captainRed;
        } else if (player.id === captains.blue) {
            return colors.captainBlue;
        } else if (vips.has(player.id)) {
            return colors.vip;
        } else if (referees.has(player.id)) {
            return colors.referee;
        } else if (player.team === 1) {
            return colors.playerRed;
        } else if (player.team === 2) {
            return colors.playerBlue;
        } else {
            return colors.spectator;
        }
    }
    const playerRoleColor = getPlayerRoleColor(player);
    room.sendAnnouncement(getPlayerNameWithRole(player) + ": " + message, null, playerRoleColor, "bold", 1);
    return false;
};

function handleCommand(player, message) {
    const isAdmin = admins.has(player.id) || player.id === creator;

    if (message === "!quiendt" && isAdmin) {
        room.sendAnnouncement("𝘼𝙩𝙚𝙣𝙘𝙞ó𝙣, 𝙚𝙡 𝙥𝙧𝙞𝙢𝙚𝙧𝙤 𝙦𝙪𝙚 𝙚𝙨𝙘𝙧𝙞𝙗𝙖 𝙮𝙤𝙙𝙩 𝙨𝙚𝙧á 𝘿𝙏 ✍️", null, colors.botGold, "bold", 2);
        const originalOnPlayerChat = room.onPlayerChat;
        room.onPlayerChat = function(player, message) {
            if (["yodt", "YODT", "yo dt", "YO DT", "yodtt", "yodi"].includes(message.toLowerCase())) {
                assignDT(player);
                room.onPlayerChat = originalOnPlayerChat; // Restore the original onPlayerChat function
                return false;
            } else if (["yo no dt", "YO NO DT", "yonodt", "capo dt"].includes(message.toLowerCase())) {
                room.kickPlayer(player.id, "entonces no digas nada pendejo de mierda.", false);
                return false;
            }
            return originalOnPlayerChat(player, message);
        };
        return false;
    } else if (message.startsWith("!admin ") && isAdmin) {
            const args = message.split(" ");
            const targetId = parseInt(args[1], 10);
            const targetPlayer = room.getPlayer(targetId);
            if (targetPlayer) {
                admins.add(targetPlayer.id);
                room.setPlayerAdmin(targetPlayer.id, true);
                room.sendAnnouncement(`${targetPlayer.name} 𝙃𝙖 𝙨𝙞𝙙𝙤 𝙥𝙧𝙤𝙢𝙤𝙫𝙞𝙙𝙤 𝙖 𝙡𝙖 𝙥𝙪𝙩𝙞𝙩𝙖 𝙙𝙚 𝙘𝙖𝙥𝙤, 𝙁𝙚𝙡𝙞𝙘𝙞𝙙𝙖𝙙𝙚𝙨. 🥾✨`, null, colors.admin, "bold", 2);
            } else {
                room.sendAnnouncement(`Jugador con ID ${targetId} no encontrado.`, player.id, colors.bot, "bold", 2);
            }
            return false;
        } else if (message.startsWith("!removeadmin ") && isAdmin) {
            const args = message.split(" ");
            const targetId = parseInt(args[1], 10);
            const targetPlayer = room.getPlayer(targetId);
            if (targetPlayer) {
                admins.delete(targetPlayer.id);
                room.setPlayerAdmin(targetPlayer.id, false);
                room.sendAnnouncement(`${targetPlayer.name} ya no es administrador.`, null, colors.admin, "bold", 2);
            } else {
                room.sendAnnouncement(`Jugador con ID ${targetId} no encontrado.`, player.id, colors.bot, "bold", 2);
            }
            return false;
    } else if (message.startsWith("!posicion")) {
        const args = message.split(" ");
        if (args.length === 2 && POSICIONES.includes(args[1])) {
            playerPositions.set(player.id, args[1]);
            room.sendAnnouncement(`Tu posición ha sido establecida a ${args[1]}.`, player.id, colors.bot, "bold", 2);
        } else {
            room.sendAnnouncement(`Posición inválida. Usa una de las siguientes: ${POSICIONES.join(", ")}`, player.id, colors.bot, "bold", 2);
        }
        return false;
    } else if (message === "!mutefichajes" && isAdmin) {
        muteFichajes();
        return false;
    } else if (message === "!match" && isAdmin) {
        startMatch(true);
        return false;
    } else if (message === "!match2" && isAdmin) {
        startMatch(false);
        return false;
    } else if (message === "!match3" && (player.id === creator || admins.has(player.id))) {
        iniciarVotacionEmpate();
        return false;
    } else if (message === "!voterepick" && isAdmin) {
        iniciarVotacionRepick();
        return false;
    } else if (message === "!swapteams" && isAdmin) {
        swapTeams();
        return false;
    } else if (message === "!swapunis" && isAdmin) {
        swapUniforms();
        return false;
    } else if (message === "!clear_bans" && isAdmin) {
        room.clearBans();
        room.sendAnnouncement("𝙏𝙤𝙙𝙤𝙨 𝙡𝙤𝙨 𝙗𝙖𝙣𝙚𝙤𝙨 𝙝𝙖𝙣 𝙨𝙞𝙙𝙤 𝙚𝙡𝙞𝙢𝙞𝙣𝙖𝙙𝙤𝙨, 𝙞𝙣𝙘𝙡𝙪𝙮𝙚𝙣𝙙𝙤 𝙡𝙖 𝙙𝙚𝙡 𝙢𝙖𝙡𝙥𝙖𝙧𝙞𝙙𝙤 𝙢𝙚𝙢𝙚 𝙦𝙪𝙚 𝙢𝙚𝙢𝙚𝙤 𝙡𝙖 𝙨𝙖𝙡𝙖.", null, colors.botGold, "bold", 2);
        return false;
    } else if ((message === "!bb" || message === "!cya")) {
        room.kickPlayer(player.id, "¡Adiós!", false);
        return false;
    } else if (message === "!help") {
            room.sendAnnouncement("Listas de ayuda disponibles:\n!helpcreador\n!helpmatch\n!helpmute\n!helpadmin\n!helpdt\n!helpjugadores\n!helpscore", player.id, colors.bot, "bold", 2);
            return false;
        } else if (message === "!helpcreador") {
            if (player.id === creator) {
                room.sendAnnouncement("Comandos para el creador:\n!teamuniformes - Configura los uniformes del equipo\n!admin - Asigna un administrador\n!removeadmin - Elimina un administrador\n!slowmodechat - Activa el modo lento en el chat\n!resetscores - Reinicia los marcadores\n!gol - Ajusta el marcador\n!swapteams - Intercambia los equipos\n!contraseña - Establece una contraseña\n!mutefichajes - Silencia los fichajes\n!asignposicion - Asigna posiciones a los jugadores\n!partido - Inicia un partido\n!resetdts - Resetea los datos de los jugadores", player.id, colors.bot, "bold", 2);
            } else {
                room.sendAnnouncement("No tienes permiso para ver estos comandos.", player.id, colors.bot, "bold", 2);
            }
            return false;
        } else if (message === "!helpmatch") {
            room.sendAnnouncement("Comandos para el partido:\n!match - Inicia un partido\n!match2 - Inicia un segundo partido\n!repick - Reasigna los equipos\n!penales 1x1 red/blue - Inicia penales 1x1\n!penales red/blue - Inicia penales 5x5", player.id, colors.bot, "bold", 2);
            return false;
        } else if (message === "!helpscore") {
            room.sendAnnouncement("Comandos para el marcador:\n!ida - Muestra el marcador de ida\n!vuelta - Muestra el marcador de vuelta\n!global - Muestra el marcador global", player.id, colors.bot, "bold", 2);
            return false;
        } else if (message === "!helpadmin") {
            if (player.id === creator || isAdmin) {
                room.sendAnnouncement("Comandos para administradores:\n!quiendt - Muestra quién es el DT\n!swapunis - Intercambia los uniformes\n!clear_bans - Limpia las prohibiciones\n!DTred - Asigna el DT rojo\n!DTblue - Asigna el DT azul", player.id, colors.bot, "bold", 2);
            } else {
                room.sendAnnouncement("No tienes permiso para ver estos comandos.", player.id, colors.bot, "bold", 2);
            }
            return false;
        } else if (message === "!helpmute") {
            room.sendAnnouncement("Comandos para silenciar:\n!slowmode - Activa el modo lento\n!resetdts - Reinicia los DTs\n!muteplayers - Silencia a los jugadores\n!unmuteplayers - Desilencia a los jugadores\n!limpiar - Limpia el chat", player.id, colors.bot, "bold", 2);
            return false;
        } else if (message === "!helpdt") {
            if (player.id === creator || isAdmin || isDT) {
                room.sendAnnouncement("Comandos para DT:\n!list - Lista los jugadores\n!alineacion - Establece la alineación\n!cambio - Realiza un cambio\n!jugadores - Muestra los jugadores\n!lineup - Muestra la alineación\n!renuncia - Renuncia como DT\n!alineacion reset - Reinicia la alineación\n!alineacionescancha - Teletransporta a los jugadores a sus posiciones en la cancha", player.id, colors.bot, "bold", 2);
            } else {
                room.sendAnnouncement("No tienes permiso para ver estos comandos.", player.id, colors.bot, "bold", 2);
            }
            return false;
        } else if (message === "!helpjugadores") {
            room.sendAnnouncement("Comandos para jugadores:\ntt - Muestra el tiempo total\n!posicion - Establece tu posición\n!bb - Despídete\n!cya - Despídete\n!discord - Muestra el enlace de Discord\n!reglas - Muestra las reglas\n!incognito - Activa el modo incógnito", player.id, colors.bot, "bold", 2);
            return false;
    } else if (message === "!list") {
        let playerListMessage = listPlayers();
        room.sendAnnouncement(playerListMessage, player.id, colors.botGold, "bold", 2);
        return false;
    } else if (message.startsWith("!jugadores ")) {
        const args = message.split(" ");
        if (args.length === 2) {
            const teamArg = args[1].toLowerCase();
            let team;
            if (teamArg === "red" || teamArg === "rojo" || teamArg === "0") {
                team = 1;
            } else if (teamArg === "blue" || teamArg === "azul" || teamArg === "1") {
                team = 2;
            } else {
                room.sendAnnouncement("Uso incorrecto. Usa !jugadores [red/blue/rojo/azul/0/1].", player.id, colors.bot, "normal", 2);
                return false;
            }

            if (isAdmin || player.id === dts.red || player.id === dts.blue) {
                const playerListMessage = listTeamPlayers(team);
                room.sendAnnouncement(playerListMessage, player.id, colors.bot, "normal", 2);
            } else {
                room.sendAnnouncement("No tienes permisos para usar este comando.", player.id, 0xFF0000, "bold", 2);
            }
        } else {
            room.sendAnnouncement("Uso incorrecto. Usa !jugadores [red/blue/rojo/azul/0/1].", player.id, colors.bot, "normal", 2);
        }
        return false;
    } else if (message.startsWith("!slowmodechat ")) {
        const args = message.split(" ");
        if (args.length === 2) {
            const seconds = parseInt(args[1], 10);
            if (!isNaN(seconds) && seconds > 0) {
                enableSlowMode(seconds);
                room.sendAnnouncement(`Modo lento activado por ${seconds} segundos.`, player.id, colors.bot, "bold", 2);
            } else {
                room.sendAnnouncement("Uso incorrecto. Usa !slowmodechat [segundos].", player.id, colors.bot, "normal", 2);
            }
        } else {
            room.sendAnnouncement("Uso incorrecto. Usa !slowmodechat [segundos].", player.id, colors.bot, "normal", 2);
        }
        return false;
    } else if (message.startsWith("!slowmodeplayer ")) {
        if (isAdmin) {
            const args = message.split(" ");
            if (args.length === 3) {
                const targetId = parseInt(args[1], 10);
                const duration = parseInt(args[2], 10);

                if (!isNaN(targetId) && !isNaN(duration)) {
                    enableSlowModeForPlayer(targetId, duration);
                    room.sendAnnouncement(`Modo lento activado para el jugador con ID ${targetId} durante ${duration} segundos.`, null, colors.bot, "bold", 2);
                } else {
                    room.sendAnnouncement("Uso incorrecto del comando. Usa !slowmodeplayer id (duracion de tiempo).", player.id, colors.bot, "bold", 2);
                }
            } else {
                room.sendAnnouncement("Uso incorrecto del comando. Usa !slowmodeplayer id (duracion de tiempo).", player.id, colors.bot, "bold", 2);
            }
        } else {
            room.sendAnnouncement("No tienes permiso para usar este comando.8", player.id, colors.bot, "bold", 2);
        }
        return false;
    } else if (message.startsWith("!alineacionescancha")) {
        const args = message.split(" ");
        if (args.length === 6) {
            const gkId = parseInt(args[1]);
            const dfcId = parseInt(args[2]);
            const mcdId = parseInt(args[3]);
            const mcoId = parseInt(args[4]);
            const dcId = parseInt(args[5]);

            // Coordenadas para cada posición en el equipo rojo
            const redPositions = {
                gk: { x: -670, y: 0 },
                dfc: { x: -412, y: 0 }, // Agregar dfc aquí
                mcd: { x: -317, y: 0 },
                mco: { x: -210, y: 0 },
                dc: { x: -140, y: 0 }
            };

            // Coordenadas para cada posición en el equipo azul
            const bluePositions = {
                gk: { x: 670, y: 0 },
                dfc: { x: 412, y: 0 }, // Agregar dfc aquí
                mcd: { x: 317, y: 0 },
                mco: { x: 210, y: 0 },
                dc: { x: 140, y: 0 }
            };

            const players = room.getPlayerList();
            players.forEach(p => {
                if (p.id === gkId || p.id === dfcId || p.id === mcdId || p.id === mcoId || p.id === dcId) {
                    let pos;
                    if (p.team === 1) { // Equipo rojo
                        if (p.id === gkId) pos = redPositions.gk;
                        else if (p.id === dfcId) pos = redPositions.dfc; // Cambiar df a dfc
                        else if (p.id === mcdId) pos = redPositions.mcd;
                        else if (p.id === mcoId) pos = redPositions.mco;
                        else if (p.id === dcId) pos = redPositions.dc;
                    } else if (p.team === 2) { // Equipo azul
                        if (p.id === gkId) pos = bluePositions.gk;
                        else if (p.id === dfcId) pos = bluePositions.dfc; // Cambiar df a dfc
                        else if (p.id === mcdId) pos = bluePositions.mcd;
                        else if (p.id === mcoId) pos = bluePositions.mco;
                        else if (p.id === dcId) pos = bluePositions.dc;
                    }
                    if (pos) {
                        room.setPlayerDiscProperties(p.id, { x: pos.x, y: pos.y });
                    }
                }
            });

            room.sendAnnouncement("Jugadores teletransportados a sus posiciones.", null, 0x00FF00, "bold", 1);
        } else {
            room.sendAnnouncement("Uso correcto: !alineacionescancha gk(id) dfc(id) mcd(id) mco(id) dc(id)", player.id, 0xFF0000, "bold", 1);
        }
        return false; // Evita que el mensaje se muestre en el chat
    } else if(message.startsWith("!lineup ")) {
            const args = message.split(" ");
            if (args.length >= 3) {
                const team = args[1].toLowerCase();
                const esquema = args.slice(2).join(" ");
                setEsquema(player, team, esquema);
            } else {
                room.sendAnnouncement("Uso incorrecto. Usa !lineup [red/blue] [esquema].", player.id, colors.bot, "normal", 2);
            }
            return false;
            
    } else if (message.startsWith("!alineacion ")) {
        const args = message.split(" ");
        if (args.length === 6) {
            const ids = args.slice(1, 6).map(id => parseInt(id, 10));
            if (ids.every(id => !isNaN(id) && room.getPlayer(id))) {
                setAlineacion(player, ids);
            } else {
                room.sendAnnouncement("ID de jugador no válido. Asegúrate de que las IDs sean correctas.", player.id, colors.bot, "bold", 2);
            }
        } else {
            room.sendAnnouncement("Uso incorrecto. Usa !alineacion [ID1 ID2 ID3 ID4 ID5].", player.id, colors.bot, "normal", 2);
        }
        return false;
    } else if (message === "!alineaciones") {
        showAlineacion();
        return false;
    } else if (message.startsWith("!admin ") && isAdmin) {
        let args = message.split(" ");
        let index = parseInt(args[1], 10);
        assignRole(player, "admin", index);
        return false;
    } else if (message.startsWith("!DTred ") && isAdmin) {
        let args = message.split(" ");
        let index = parseInt(args[1], 10);
        assignRole(player, "DTred", index);
        return false;
    } else if (message.startsWith("!DTblue ") && isAdmin) {
        let args = message.split(" ");
        let index = parseInt(args[1], 10);
        assignRole(player, "DTblue", index);
        return false;
    } else if (message === "!ida") {
        showScore("ida");
        return false;
    } else if (message === "!vuelta") {
        showScore("vuelta");
        return false;
    } else if (message === "!global") {
        showScore("global");
    } else if (message === "!resetscores" && isAdmin) {
        resetScores();
        return false;
    } else if (message === "!repick" && isAdmin) {
        repickTeams();
        return false;
    } else if(message === "!slowmode" && isAdmin) {
        slowmodeEnabled = true;
        room.sendAnnouncement("𝐒𝐥𝐨𝐰𝐦𝐨𝐝𝐞 𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨 𝐩𝐨𝐫 𝟏 𝐦𝐢𝐧𝐮𝐭𝐨. 𝐏𝐢𝐞𝐧𝐬𝐚 𝐛𝐢𝐞𝐧 𝐭𝐮𝐬 𝐩𝐚𝐥𝐚𝐛𝐫𝐚𝐬, 𝐧𝐨 𝐯𝐚𝐲𝐚 𝐚 𝐬𝐞𝐫 𝐪𝐮𝐞 𝐭𝐞 𝐚𝐫𝐫𝐞𝐩𝐢𝐞𝐧𝐭𝐚𝐬 𝐚𝐥 𝐬𝐞𝐠𝐮𝐧𝐝𝐨 𝟐. ⌛🤔", null, colors.bot, "bold", 2);
        setTimeout(() => {
            slowmodeEnabled = false;
            room.sendAnnouncement("Slowmode desactivado.", null, colors.bot, "bold", 2);
        }, 60000); // 1 minuto
        return false;
    } else if (message === "!muteplayers" && isAdmin) {
        mutePlayers();
        return false; 
    } else if (message === "!unmuteplayers" && isAdmin) {
        unmutePlayers();
        return false;
    } else if (message === "!discord") {
        room.sendAnnouncement(`Únete a nuestro Discord: ${DISCORD_LINK}`, player.id, colors.bot, "bold", 2);
        return false;
    } else if  (message === "!showdiscord") {
        room.sendAnnouncement(`🔥 ¡𝘚𝘦 𝘷𝘪𝘦𝘯𝘦 𝘒𝘕𝘐𝘎𝘏𝘛𝘚 5𝘷5 𝘋𝘛! 🔥\n𝘌𝘯𝘵𝘳𝘢 𝘢 𝘯𝘶𝘦𝘴𝘵𝘳𝘰 𝘥𝘪𝘴𝘤𝘰𝘳𝘥 𝘱𝘢𝘳𝘢 𝘦𝘴𝘵𝘢𝘳 𝘢𝘵𝘦𝘯𝘵𝘰 𝘢 𝘤𝘶𝘢𝘯𝘥𝘰 𝘢𝘣𝘳𝘪𝘮𝘰𝘴 𝘴𝘢𝘭𝘢. \n𝘥𝘦𝘮𝘶𝘦𝘴𝘵𝘳𝘢 𝘲𝘶𝘪é𝘯 𝘮𝘢𝘯𝘥𝘢 𝘺 𝘲𝘶𝘪𝘦𝘯 𝘮𝘪𝘳𝘢 𝘥𝘦𝘴𝘥𝘦 𝘭𝘢 𝘣𝘢𝘯𝘤𝘢. 😏 👉 ${DISCORD_LINK}`, null, colors.bot, "bold", 2);
        return false;
    } else if (message === "!reglas") {
        room.sendAnnouncement(REGLAS, player.id, colors.bot, "bold", 2);
        return false;
    } else if (/^\/colors/.test(message)) {
        saveUniformCommand(player, message);
        return false;
    } else if (message.startsWith("!DTred") && isAdmin) {
        const targetPlayer = getPlayerFromMessage(message);
        if (targetPlayer) {
            assignDT(targetPlayer, 1);
        }
        return false;
    } else if (message.startsWith("!DTblue") && isAdmin) {
        const targetPlayer = getPlayerFromMessage(message);
        if (targetPlayer) {
            assignDT(targetPlayer, 2);
        }
        return false;
    } else if (message.startsWith("!gol ") && player.id === creator) {
        const args = message.split(" ");
        if (args.length === 5) {
            const action = args[1];
            const numGoles = parseInt(args[2], 10);
            const equipo = args[3].toLowerCase();
            const tipo = args[4].toLowerCase();

            if ((action === "+" || action === "-") && !isNaN(numGoles) && (equipo === "rojo" || equipo === "azul") && (tipo === "ida" || tipo === "vuelta")) {
                adjustScore(action, numGoles, equipo, tipo);
            } else {
                room.sendAnnouncement("Uso incorrecto. Usa !gol (+/-) (numerodegoles) (equipo) (ida/vuelta).", player.id, colors.bot, "bold", 2);
            }
        } else {
            room.sendAnnouncement("Uso incorrecto. Usa !gol (+/-) (numerodegoles) (equipo) (ida/vuelta).", player.id, colors.bot, "bold", 2);
        }
        return false;
    } else if (message === "!limpiar" && isAdmin) {
        limpiarChat();
        return false;
    } else if (message === "!renuncia" && (player.id === dts.red || player.id === dts.blue)) {
        room.setPlayerAvatar(player.id, null);
        removeDT(player);
        return false;
    } else if ((message === "!votenoDTred" || message === "!votenoDTblue") && isAdmin) {
        startVote(player, message);
        return false;
    } else if (message === "!fairplay" && (player.id === dts.red || player.id === dts.blue || isAdmin)) {
        startFairplayVote();
        return false;
    }
    if (message === "!swapdts") {
        swapdts(player.id);
        return false; // Evitar que el mensaje se muestre en el chat
    }

    if (message === "!swapmarcador" && (player.id === creator || admins.has(player.id))) {
        // Intercambiar los marcadores de ida
        const tempIdaRed = matchStats.ida.redScore;
        matchStats.ida.redScore = matchStats.ida.blueScore;
        matchStats.ida.blueScore = tempIdaRed;
    
        // Intercambiar los marcadores de vuelta
        const tempVueltaRed = matchStats.vuelta.redScore;
        matchStats.vuelta.redScore = matchStats.vuelta.blueScore;
        matchStats.vuelta.blueScore = tempVueltaRed;
    
        // Calcular el marcador global
        const globalRedScore = matchStats.ida.redScore + matchStats.vuelta.redScore;
        const globalBlueScore = matchStats.ida.blueScore + matchStats.vuelta.blueScore;
    
        // Notificar el cambio
        room.sendAnnouncement(
            `█▓▒­░⡷⠂¡𝘔𝘢𝘳𝘤𝘢𝘥𝘰𝘳𝘦𝘴 𝘪𝘯𝘵𝘦𝘳𝘤𝘢𝘮𝘣𝘪𝘢𝘥𝘰𝘴!⠐⢾░▒▓█ 🔄\n` +
            `𝘐𝘋𝘈: 🔴 ${matchStats.ida.redScore} - ${matchStats.ida.blueScore} 🔵\n` +
            `𝘝𝘜𝘌𝘓𝘛𝘈: 🔴 ${matchStats.vuelta.redScore} - ${matchStats.vuelta.blueScore} 🔵\n` +
            `𝘎𝘓𝘖𝘉𝘈𝘓: 🔴 ${globalRedScore} - ${globalBlueScore} 🔵`,
            null, colors.bot, "bold", 2
        );
        return false; // Evitar que el mensaje se muestre en el chat
    }
    return false; // Prevent unrecognized commands from appearing in chat
}

function startFairplayVote() {
    if (fairplayInProgress) {
        room.sendAnnouncement("Una votación de fairplay ya está en progreso.", null, colors.bot, "bold", 2);
        return;
    }
    if (!lastGoal.team || !lastGoal.type) {
        room.sendAnnouncement("No hay goles recientes para aplicar fairplay.", null, colors.bot, "bold", 2);
        return;
    }

    fairplayInProgress = true;
    voteCountFairplay = 0;
    room.sendAnnouncement("¡Votación de fairplay iniciada! Escribe !fairplayvote para votar. Se necesitan 17 votos para restar el último gol.", null, colors.bot, "bold", 2);

    const originalOnPlayerChat = room.onPlayerChat;
    room.onPlayerChat = function(player, message) {
        if (message === "!fairplayvote") {
            voteCountFairplay++;
            room.sendAnnouncement(`${player.name} ha votado para fairplay. Total votos: ${voteCountFairplay}`, null, colors.bot, "bold", 2);
            if (voteCountFairplay >= 17) {
                applyFairplay();
                stopFairplayVote();
            }
            return false;
        }
        return originalOnPlayerChat(player, message);
    };

    setTimeout(() => {
        stopFairplayVote();
    }, 60000); // 1 minuto
}

function stopFairplayVote() {
    fairplayInProgress = false;
    room.onPlayerChat = function(player, message) {
        return handleCommand(player, message);
    };
    room.sendAnnouncement("La votación de fairplay ha terminado.", null, colors.bot, "bold", 2);
    voteCountFairplay = 0;
}

function applyFairplay() {
    if (!lastGoal.team || !lastGoal.type) {
        room.sendAnnouncement("Error al aplicar fairplay: no se encontró información del último gol.", null, colors.bot, "bold", 2);
        return;
    }

    if (lastGoal.type === 'ida') {
        if (lastGoal.team === 1) {
            matchStats.ida.redScore--;
        } else {
            matchStats.ida.blueScore--;
        }
    } else if (lastd.type === 'vuelta') {
        if (lastGoal.team === 1) {
            matchStats.vuelta.redScore--;
        } else {
            matchStats.vuelta.blueScore--;
        }
    }

    const globalRedScore = matchStats.ida.redScore + matchStats.vuelta.redScore;
    const globalBlueScore = matchStats.ida.blueScore + matchStats.vuelta.blueScore;

    room.sendAnnouncement(`Fairplay aplicado. Último gol restado. Marcador Global: Rojo ${globalRedScore} - ${globalBlueScore} Azul`, null, colors.bot, "bold", 2);
}

function startVote(player, message) {
    if (votingInProgress) {
        room.sendAnnouncement("Una votación ya está en progreso.", player.id, colors.bot, "bold", 2);
        return;
    }
    votingInProgress = true;
    voteCount.red = 0;
    voteCount.blue = 0;
    let team = message === "!votenoDTred" ? "red" : "blue";
    room.sendAnnouncement(`¡Votación iniciada para destituir al DT del equipo ${team === "red" ? "Rojo" : "Azul"}! Escribe !votenoDT para votar.`, null, colors.bot, "bold", 2);

    const originalOnPlayerChat = room.onPlayerChat;
    room.onPlayerChat = function(player, message) {
        if (message === "!votenoDT") {
            if (team === "red" && player.team === 1) {
                voteCount.red++;
                room.sendAnnouncement(`${player.name} ha votado para destituir al DT del equipo Rojo. Total votos: ${voteCount.red}`, null, colors.dtRed, "bold", 2);
                if (voteCount.red > 9) {
                    removeDT(room.getPlayer(dts.red));
                    stopVote();
                }
            } else if (team === "blue" && player.team === 2) {
                voteCount.blue++;
                room.sendAnnouncement(`${player.name} ha votado para destituir al DT del equipo Azul. Total votos: ${voteCount.blue}`, null, colors.dtBlue, "bold", 2);
                if (voteCount.blue > 9) {
                    removeDT(room.getPlayer(dts.blue));
                    stopVote();
                }
            } else {
                room.sendAnnouncement("Solo los jugadores del equipo correspondiente pueden votar.", player.id, colors.bot, "bold", 2);
            }
            return false;
        }
        return originalOnPlayerChat(player, message);
    };

    setTimeout(() => {
        stopVote();
    }, 60000); // 1 minuto
}

function stopVote() {
    votingInProgress = false;
    room.onPlayerChat = function(player, message) {
        return handleCommand(player, message);
    };
    room.sendAnnouncement("La votación ha terminado.", null, colors.bot, "bold", 2);
    voteCount.red = 0;
    voteCount.blue = 0;
}

function removeDT(player) {
    if (player.id === dts.red) {
        dts.red = null;
        admins.delete(player.id);
        room.setPlayerAdmin(player.id, false);
        room.sendAnnouncement(`𝘊𝘰𝘯𝘧𝘪𝘳𝘮𝘢𝘥𝘰: ${player.name}  𝘩𝘢 𝘥𝘦𝘫𝘢𝘥𝘰 𝘥𝘦 𝘴𝘦𝘳 𝘦𝘭 𝘋𝘛 𝘥𝘦𝘭 𝘦𝘲𝘶𝘪𝘱𝘰 𝘙𝘰𝘫𝘰. 𝘓𝘰𝘴 𝘨𝘰𝘭𝘦𝘴 𝘯𝘰 𝘭𝘭𝘦𝘨𝘢𝘳𝘰𝘯, 𝘱𝘦𝘳𝘰 𝘭𝘢𝘴 𝘦𝘹𝘤𝘶𝘴𝘢𝘴 𝘴í. 𝘚𝘦 𝘢𝘤𝘢𝘣ó 𝘦𝘭 𝘤𝘶𝘦𝘯𝘵𝘰.🛑🔥.`, null, colors.dtRed, "bold", 2);
    } else if (player.id === dts.blue) {
        dts.blue = null;
        admins.delete(player.id);
        room.setPlayerAdmin(player.id, false);
        room.sendAnnouncement(`${player.name} Ha dejado de ser el DT del equipo Azul. La magia se apagó y con ella, las ilusiones del club. 💔🔵`, null, colors.dtBlue, "bold", 2);
    }
    updatePlayerRoles();
}

function swapdts(playerId) {
    const player = room.getPlayer(playerId); // Obtener el jugador que envió el mensaje
    const isAdmin = admins.has(player.id) || player.id === creator || hosters.has(player.id) || referees.has(player.id) || player.id === dts.red || player.id === dts.blue;

    if (player && isAdmin) { // Verificar si el jugador tiene el rol adecuado
        if (dts.red && dts.blue) {
            // Intercambiar los roles de DT
            const tempDT = dts.red;
            dts.red = dts.blue;
            dts.blue = tempDT;

            // Intercambiar los roles de Capitán
            const tempCaptain = captains.red;
            captains.red = captains.blue;
            captains.blue = tempCaptain;

            // Actualizar los avatares y colores de los DTs y Capitanes
            room.setPlayerAvatar(dts.red, "👔"); // Avatar para DT rojo
            room.setPlayerAvatar(dts.blue, "👔"); // Avatar para DT azul
            room.setPlayerAvatar(captains.red, "ⓒ"); // Avatar para Capitán rojo
            room.setPlayerAvatar(captains.blue, "ⓒ"); // Avatar para Capitán azul

            // Actualizar los roles en la sala
            updatePlayerRoles();

            // Notificar a la sala sobre el intercambio
            room.sendAnnouncement("¡Los roles de DT y Capitán han sido intercambiados! 🔄", null, colors.bot, "bold", 2);
        } else {
            room.sendAnnouncement("No hay DTs asignados para intercambiar. 🚫", null, colors.bot, "bold", 2);
        }
    } else {
        room.sendAnnouncement("No tienes permiso para usar este comando. 🚫", playerId, colors.bot, "bold", 2);
    }
}

function getPlayerFromMessage(message) {
    const match = message.match(/@(\w+)/);
    if (match) {
        const targetPlayer = room.getPlayerList().find(p => p.name === match[1]);
        return targetPlayer || null;
    }
    return null;
}

function assignMVP(player) {
    mvps.add(player.id);
    room.setPlayerAvatar(player.id, MVP_AVATAR); // Asignar el avatar de MVP
    room.sendAnnouncement(`${player.name} ha sido asignado como MVP y ha recibido el avatar ${MVP_AVATAR}.`, null, colors.mvp, "bold", 2);
}

function removeMVP(player) {
    mvps.delete(player.id);
    room.setPlayerAvatar(player.id, null); // Restaurar el avatar a null
    room.sendAnnouncement(`${player.name} ha perdido el rol de MVP y su avatar ha sido restaurado.`, null, colors.mvp, "bold", 2);
}

function assignRole(player, role, index) {
    let players = room.getPlayerList();
    if (index < 1 || index > players.length) {
        room.sendAnnouncement("Índice de jugador inválido.", player.id, colors.bot, "bold", 2);
        return;
    }
    let targetPlayer = players[index - 1];
    
    if (!targetPlayer) {
        room.sendAnnouncement("Jugador no encontrado.", player.id, colors.bot, "bold", 2);
        return;
    }
    
    if (role === "admin") {
        admins.add(targetPlayer.id);
        room.setPlayerAdmin(targetPlayer.id, true);
        room.sendAnnouncement(`#${targetPlayer.name} 𝐡𝐚 𝐬𝐢𝐝𝐨 𝐩𝐫𝐨𝐦𝐨𝐯𝐢𝐝𝐨 𝐚 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫.`, null, colors.admin, "bold", 2);
    } else if (role === "DTred") {
        dts.red = targetPlayer.id;
        room.sendAnnouncement(`#${targetPlayer.name} 𝘦𝘴 𝘢𝘩𝘰𝘳𝘢 𝘦𝘭 𝘋𝘛 𝘥𝘦𝘭 𝘦𝘲𝘶𝘪𝘱𝘰 𝘙𝘰𝘫𝘰 👔📋✍️.`, null, colors.bot, "bold", 2);
    } else if (role === "DTblue") {
        dts.blue = targetPlayer.id;
        room.sendAnnouncement(`#${targetPlayer.name} 𝘦𝘴 𝘢𝘩𝘰𝘳𝘢 𝘦𝘭 𝘋𝘛 𝘥𝘦𝘭 𝘦𝘲𝘶𝘪𝘱𝘰 𝘈𝘻𝘶𝘭 👔📋✍️.`, null, colors.bot, "bold", 2);
    }
}

function assignDT(player) {
    if (player.id === dts.red || player.id === dts.blue) {
        room.sendAnnouncement(`${player.name} ya es DT de un equipo. No puede ser DT de ambos equipos.`, player.id, colors.bot, "bold", 2);
        return;
    }

    if (!dts.red) {
        dts.red = player.id;
        room.sendAnnouncement(`${player.name} ha sido asignado como DT del equipo rojo.`, null, colors.dtRed, "bold", 2);
    } else if (!dts.blue) {
        dts.blue = player.id;
        room.sendAnnouncement(`${player.name} ha sido asignado como DT del equipo azul.`, null, colors.dtBlue, "bold", 2);
    } else {
        room.sendAnnouncement("Ambos roles de DT ya están ocupados.", player.id, colors.bot, "bold", 2);
    }
    updatePlayerRoles();
}

function asignarRolCreador(authList) {
    let jugadores = room.getPlayerList();
    for (let i = 0; i < jugadores.length; i++) {
        if (authList.includes(jugadores[i].auth)) {
            // Asignar el rol de creador y administrador
            creator = jugadores[i].id;
            admins.add(jugadores[i].id);
            room.setPlayerAdmin(jugadores[i].id, true); // Dar permisos de administrador
            room.sendAnnouncement(`¡${jugadores[i].name} ahora es el creador y administrador!`, null, 0x00FF00, "bold", 2);
            return;
        }
    }
    room.sendAnnouncement("No se encontró al jugador con el auth proporcionado.", null, 0xFF0000, "bold", 2);
}

function setTeamUniforms() {
    const randomIndex = Math.floor(Math.random() * uniformOptions.length);
    const selectedUniform = uniformOptions[randomIndex];

    // Configuración para el equipo rojo
    const redTeam = 1; // Identificador del equipo rojo
    const redConfig = selectedUniform.red;

    // Configuración para el equipo azul
    const blueTeam = 2; // Identificador del equipo azul
    const blueConfig = selectedUniform.blue;

    // Aplicar uniformes
    room.setTeamColors(redTeam, redConfig.angle, redConfig.textColor, redConfig.colors); // Uniforme para el equipo rojo
    room.setTeamColors(blueTeam, blueConfig.angle, blueConfig.textColor, blueConfig.colors); // Uniforme para el equipo azul
}
function adjustScore(action, numGoles, equipo, tipo) {
    const team = equipo === "rojo" ? 1 : 2;
    
    if (tipo === "ida") {
        if (action === "+") {
            if (team === 1) {
                matchStats.ida.redScore += numGoles;
            } else {
                matchStats.ida.blueScore += numGoles;
            }
        } else {
            if (team === 1) {
                matchStats.ida.redScore -= numGoles;
            } else {
                matchStats.ida.blueScore -= numGoles;
            }
        }
    } else {
        if (action === "+") {
            if (team === 1) {
                matchStats.vuelta.redScore += numGoles;
            } else {
                matchStats.vuelta.blueScore += numGoles;
            }
        } else {
            if (team === 1) {
                matchStats.vuelta.redScore -= numGoles;
            } else {
                matchStats.vuelta.blueScore -= numGoles;
            }
        }
    }

    const globalRedScore = matchStats.ida.redScore + matchStats.vuelta.redScore;
    const globalBlueScore = matchStats.ida.blueScore + matchStats.vuelta.blueScore;

    room.sendAnnouncement(`𝙈𝘼𝙍𝘾𝘼𝘿𝙊𝙍 𝙈𝙊𝘿𝙄𝙁𝙄𝘾𝘼𝘿𝙊: 𝙄𝘿𝘼 (𝙍𝙀𝘿 ${matchStats.ida.redScore} - 𝘽𝙇𝙐𝙀 ${matchStats.ida.blueScore}), 𝙑𝙐𝙀𝙇𝙏𝘼 (𝙍𝙀𝘿 ${matchStats.vuelta.redScore} - 𝘽𝙇𝙐𝙀 ${matchStats.vuelta.blueScore}), 𝙂𝙇𝙊𝘽𝘼𝙇 (𝙍𝙀𝘿 ${globalRedScore} - 𝘽𝙇𝙐𝙀 ${globalBlueScore}).`, null, colors.bot, "bold", 2);
}

function startMatch(isFirstMatch) {
    room.sendAnnouncement("𝘼 𝘾𝘼𝙇𝙇𝘼𝙍 𝙋𝙐𝙏𝘼𝙎, 𝙘𝙝𝙖𝙧𝙡𝙖 𝙩é𝙘𝙣𝙞𝙘𝙖 𝙚𝙣 𝙥𝙧𝙤𝙜𝙧𝙚𝙨𝙤. 50 𝙨𝙚𝙜𝙪𝙣𝙙𝙤𝙨 𝙥𝙖𝙧𝙖 𝙙𝙚𝙟𝙖𝙧 𝙙𝙚 𝙝𝙖𝙗𝙡𝙖𝙧 𝙮 𝙚𝙢𝙥𝙚𝙯𝙖𝙧 𝙖 𝙟𝙪𝙜𝙖𝙧. 🏟️💥", null, colors.botGold, "bold", 2);    
    setTimeout(() => {
        showAlineacion(); // Mostrar alineaciones 50 segundos después de que se inicie la charla técnica
    }, 100000); // 50000 milisegundos = 50 segundos

    setTimeout(() => {
        room.pauseGame(false);
        paused = false;
        matchStarted = true;
        if (isFirstMatch) {
            isIda = true;
            room.sendAnnouncement("¡𝐄𝐥 𝐩𝐫𝐢𝐦𝐞𝐫 𝐩𝐚𝐫𝐭𝐢𝐝𝐨 (𝐢𝐝𝐚) 𝐡𝐚 𝐜𝐨𝐦𝐞𝐧𝐳𝐚𝐝𝐨! \n ⚽🔥 𝐎𝐉𝐀𝐋Á 𝐇𝐀𝐘𝐀 𝐌𝐔𝐂𝐇𝐎 𝐒𝐄𝐗𝐎 𝐘 𝐌𝐀𝐆𝐈𝐀 𝐄𝐍 𝐋𝐀𝐒 𝐉𝐔𝐆𝐀𝐃𝐀𝐒, \n 𝐩𝐨𝐫𝐪𝐮𝐞 𝐬𝐢 𝐞𝐬𝐭𝐨 𝐬𝐢𝐠𝐮𝐞 𝐚𝐬í, 𝐦𝐞 𝐯𝐨𝐲 𝐚 𝐭𝐢𝐫𝐚𝐫 𝐩𝐚𝐣𝐚 𝐦𝐞𝐣𝐨𝐫", null, colors.botGold, "bold", 2);
        } else {
            isIda = false;
            room.sendAnnouncement("¡𝘼𝙧𝙧𝙖𝙣𝙘𝙖 𝙚𝙡 𝙥𝙖𝙧𝙩𝙞𝙙𝙤 𝙙𝙚 𝙫𝙪𝙚𝙡𝙩𝙖! ⚽🔥\n 𝙑𝙖𝙢𝙤𝙨 𝙖 𝙫𝙚𝙧 𝙨𝙞 𝙨𝙚 𝙡𝙤𝙜𝙧𝙖 𝙧𝙚𝙢𝙤𝙣𝙩𝙖𝙧 𝙤 𝙣𝙤,\n ¡𝙦𝙪𝙚𝙧𝙚𝙢𝙤𝙨 𝙫𝙚𝙧 𝙢𝙖𝙜𝙞𝙖 𝙮 𝙚𝙨𝙥𝙚𝙘𝙩á𝙘𝙪𝙡𝙤! 🎩💥", null, colors.botGold, "bold", 2);
            // Reset the vuelta scores
            matchStats.vuelta.redScore = 0;
            matchStats.vuelta.blueScore = 0;
        }
        // Reset ball area statistics
        matchStats.ballInRedArea = 0;
        matchStats.ballInBlueArea = 0;
        matchStats.totalGameTime = 0;
        matchStats.redPossession = 0;
        matchStats.bluePossession = 0;

        // Reset alineaciones
        alineacionRed = [];
        alineacionBlue = [];
        esquemaRed = "";
        esquemaBlue = "";
    }, 15000);
}

function startTimedMatch(command) {
    matchTime = 0;
    halfTimeReached = false;
    extraTime = 0;

    if (command === "!match3") {
        extraTime = getRandomExtraTime();
        room.sendAnnouncement(`Tiempo de añadido: ${extraTime} minutos`, null, colors.bot, "bold", 2);
    }

    matchInterval = setInterval(() => {
        matchTime++;
        if (matchTime === 5 && !halfTimeReached) {
            room.sendAnnouncement("Mitad del partido cumplido, charla táctica", null, colors.bot, "bold", 2);
            room.pauseGame(true);
            halfTimeReached = true;
        } else if (matchTime === 10 && command !== "!match3") {
            extraTime = getRandomExtraTime();
            if (extraTime === 0) {
                room.sendAnnouncement("No hay tiempo extra", null, colors.bot, "bold", 2);
                clearInterval(matchInterval);
                room.stopGame();
            } else {
                room.sendAnnouncement(`Tiempo de añadido: ${extraTime} minutos`, null, colors.bot, "bold", 2);
            }
        } else if (matchTime === 10 + extraTime) {
            clearInterval(matchInterval);
            room.stopGame();
        }
    }, 60000); // 1 minuto en milisegundos

    room.pauseGame(false);
}

function getRandomExtraTime() {
    const random = Math.random();
    if (random < 0.2) return 0;
    if (random < 0.9) return Math.random() < 0.7 ? 2 : 3;
    return [1, 4, 5][Math.floor(Math.random() * 3)];
}

function swapTeams() {
    const players = room.getPlayerList().filter(p => p.team !== 0);
    players.forEach(player => {
        const newTeam = player.team === 1 ? 2 : 1;
        room.setPlayerTeam(player.id, newTeam);
    });
    room.sendAnnouncement("🔄🔥 ¡𝘼𝙏𝙀𝙉𝘾𝙄𝙊𝙉, 𝘼𝙏𝙀𝙉𝘾𝙄𝙊𝙉! 🔥🔄 ¡𝙇𝙊𝙎 𝙑𝙄𝙎𝙄𝙏𝘼𝙉𝙏𝙀𝙎 𝘼𝙃𝙊𝙍𝘼 𝙎𝙊𝙉 𝙇𝙊𝘾𝘼𝙇𝙀𝙎! 🏟️⚽", null, colors.botGold, "bold", 2);
}

function swapUniforms() {
    const temp = uniformCommands.red;
    uniformCommands.red = uniformCommands.blue;
    uniformCommands.blue = temp;
    if (uniformCommands.red) room.sendAnnouncement(uniformCommands.red, null, colors.bot, "bold", 2);
    if (uniformCommands.blue) room.sendAnnouncement(uniformCommands.blue, null, colors.bot, "bold", 2);
    room.sendAnnouncement("Los colores de los uniformes han sido intercambiados.", null, colors.admin, "bold", 2);
}

function showAdminHelp(player) {
    const adminHelpMessage = `
𝘾𝙤𝙢𝙖𝙣𝙙𝙤𝙨 𝙙𝙚 𝘼𝙙𝙢𝙞𝙣𝙞𝙨𝙩𝙧𝙖𝙙𝙤𝙧:
        !𝙦𝙪𝙞𝙚𝙣𝙙𝙩 - 𝙀𝙡 𝙥𝙧𝙞𝙢𝙚𝙧 𝙟𝙪𝙜𝙖𝙙𝙤𝙧 𝙦𝙪𝙚 𝙚𝙨𝙘𝙧𝙞𝙗𝙖 '𝙮𝙤𝙙𝙩' 𝙧𝙚𝙘𝙞𝙗𝙞𝙧á 𝙚𝙡 𝙧𝙤𝙡 𝙙𝙚 𝘿𝙏.
        !𝙖𝙙𝙢𝙞𝙣 @𝙣𝙤𝙢𝙗𝙧𝙚 - 𝙋𝙧𝙤𝙢𝙪𝙚𝙫𝙚 𝙖 𝙪𝙣 𝙟𝙪𝙜𝙖𝙙𝙤𝙧 𝙖 𝙖𝙙𝙢𝙞𝙣𝙞𝙨𝙩𝙧𝙖𝙙𝙤𝙧.
        !𝙡𝙞𝙢𝙥𝙞𝙖𝙧 - 𝙇𝙞𝙢𝙥𝙞𝙖 𝙡𝙤𝙨 𝙢𝙚𝙣𝙨𝙖𝙟𝙚𝙨 𝙖𝙘𝙩𝙪𝙖𝙡𝙚𝙨.
        !𝙧𝙚𝙣𝙪𝙣𝙘𝙞𝙖 - 𝙍𝙚𝙣𝙪𝙣𝙘𝙞𝙖 𝙖𝙡 𝙧𝙤𝙡 𝙙𝙚 𝙖𝙙𝙢𝙞𝙣𝙞𝙨𝙩𝙧𝙖𝙙𝙤𝙧.
        !𝙢𝙖𝙩𝙘𝙝 - 𝙄𝙣𝙞𝙘𝙞𝙖 𝙚𝙡 𝙥𝙖𝙧𝙩𝙞𝙙𝙤 𝙙𝙚 𝙞𝙙𝙖.
        !𝙢𝙖𝙩𝙘𝙝2 - 𝙄𝙣𝙞𝙘𝙞𝙖 𝙚𝙡 𝙥𝙖𝙧𝙩𝙞𝙙𝙤 𝙙𝙚 𝙫𝙪𝙚𝙡𝙩𝙖.
        !𝙢𝙪𝙩𝙚𝙥𝙡𝙖𝙮𝙚𝙧𝙨 - 𝙎𝙞𝙡𝙚𝙣𝙘𝙞𝙖 𝙖 𝙩𝙤𝙙𝙤𝙨 𝙡𝙤𝙨 𝙟𝙪𝙜𝙖𝙙𝙤𝙧𝙚𝙨.
        !𝙪𝙣𝙢𝙪𝙩𝙚𝙥𝙡𝙖𝙮𝙚𝙧𝙨 - 𝘿𝙚𝙨𝙞𝙡𝙚𝙣𝙘𝙞𝙖 𝙖 𝙩𝙤𝙙𝙤𝙨 𝙡𝙤𝙨 𝙟𝙪𝙜𝙖𝙙𝙤𝙧𝙚𝙨.
        !𝙢𝙪𝙩𝙚𝙛𝙞𝙘𝙝𝙖𝙟𝙚𝙨 - 𝙎𝙞𝙡𝙚𝙣𝙘𝙞𝙖 𝙖 𝙡𝙤𝙨 𝙟𝙪𝙜𝙖𝙙𝙤𝙧𝙚𝙨 𝙥𝙖𝙧𝙖 𝙦𝙪𝙚 𝙝𝙖𝙗𝙡𝙚𝙣 𝙡𝙤𝙨 𝙙𝙩𝙨.
        !𝙨𝙡𝙤𝙬𝙢𝙤𝙙𝙚𝙘𝙝𝙖𝙩 [𝙨𝙚𝙜𝙪𝙣𝙙𝙤𝙨] - 𝘼𝙘𝙩𝙞𝙫𝙖 𝙚𝙡 𝙢𝙤𝙙𝙤 𝙡𝙚𝙣𝙩𝙤 𝙚𝙣 𝙚𝙡 𝙘𝙝𝙖𝙩 𝙥𝙤𝙧 𝙚𝙡 𝙣ú𝙢𝙚𝙧𝙤 𝙙𝙚 𝙨𝙚𝙜𝙪𝙣𝙙𝙤𝙨 𝙚𝙨𝙥𝙚𝙘𝙞𝙛𝙞𝙘𝙖𝙙𝙤.
        !𝙨𝙡𝙤𝙬𝙢𝙤𝙙𝙚 - 𝘼𝙘𝙩𝙞𝙫𝙖 𝙚𝙡 𝙢𝙤𝙙𝙤 𝙡𝙚𝙣𝙩𝙤 𝙚𝙣 𝙚𝙡 𝙘𝙝𝙖𝙩 𝙥𝙤𝙧 1 𝙢𝙞𝙣𝙪𝙩𝙤.
        !𝙨𝙬𝙖𝙥𝙩𝙚𝙖𝙢𝙨 - 𝘾𝙖𝙢𝙗𝙞𝙖 𝙡𝙤𝙨 𝙚𝙦𝙪𝙞𝙥𝙤𝙨.
        !𝙘𝙡𝙚𝙖𝙧_𝙗𝙖𝙣𝙨 - 𝙇𝙞𝙢𝙥𝙞𝙖 𝙩𝙤𝙙𝙖𝙨 𝙡𝙖𝙨 𝙥𝙧𝙤𝙝𝙞𝙗𝙞𝙘𝙞𝙤𝙣𝙚𝙨 𝙙𝙚 𝙟𝙪𝙜𝙖𝙙𝙤𝙧𝙚𝙨.
        !𝙞𝙙𝙖 - 𝙈𝙖𝙧𝙘𝙖 𝙚𝙡 𝙞𝙣𝙞𝙘𝙞𝙤 𝙙𝙚𝙡 𝙥𝙖𝙧𝙩𝙞𝙙𝙤 𝙙𝙚 𝙞𝙙𝙖.
        !𝙫𝙪𝙚𝙡𝙩𝙖 - 𝙈𝙖𝙧𝙘𝙖 𝙚𝙡 𝙞𝙣𝙞𝙘𝙞𝙤 𝙙𝙚𝙡 𝙥𝙖𝙧𝙩𝙞𝙙𝙤 𝙙𝙚 𝙫𝙪𝙚𝙡𝙩𝙖.
        !𝙜𝙡𝙤𝙗𝙖𝙡 - 𝙈𝙪𝙚𝙨𝙩𝙧𝙖 𝙚𝙡 𝙢𝙖𝙧𝙘𝙖𝙙𝙤𝙧 𝙜𝙡𝙤𝙗𝙖𝙡.
        !𝙧𝙚𝙥𝙞𝙘𝙠 - 𝙋𝙚𝙧𝙢𝙞𝙩𝙚 𝙖 𝙡𝙤𝙨 𝙟𝙪𝙜𝙖𝙙𝙤𝙧𝙚𝙨 𝙫𝙤𝙡𝙫𝙚𝙧 𝙖 𝙨𝙚𝙡𝙚𝙘𝙘𝙞𝙤𝙣𝙖𝙧 𝙨𝙪𝙨 𝙚𝙦𝙪𝙞𝙥𝙤𝙨.
        !𝘿𝙏𝙧𝙚𝙙 - 𝘼𝙨𝙞𝙜𝙣𝙖 𝙚𝙡 𝙧𝙤𝙡 𝙙𝙚 𝘿𝙏 𝙖𝙡 𝙚𝙦𝙪𝙞𝙥𝙤 𝙧𝙤𝙟𝙤.
        !𝘿𝙏𝙗𝙡𝙪𝙚 - 𝘼𝙨𝙞𝙜𝙣𝙖 𝙚𝙡 𝙧𝙤𝙡 𝙙𝙚 𝘿𝙏 𝙖𝙡 𝙚𝙦𝙪𝙞𝙥𝙤 𝙖𝙯𝙪𝙡.
        !𝙨𝙡𝙤𝙬𝙢𝙤𝙙𝙚 - 𝘼𝙘𝙩𝙞𝙫𝙖 𝙚𝙡 𝙨𝙡𝙤𝙬𝙢𝙤𝙙𝙚 𝙥𝙤𝙧 1 𝙢𝙞𝙣𝙪𝙩𝙤.
        !𝙖𝙡𝙞𝙣𝙚𝙖𝙘𝙞𝙤𝙣 𝙧𝙚𝙨𝙚𝙩 - 𝙍𝙚𝙞𝙣𝙞𝙘𝙞𝙖 𝙡𝙖 𝙖𝙡𝙞𝙣𝙚𝙖𝙘𝙞ó𝙣 𝙙𝙚𝙡 𝙚𝙦𝙪𝙞𝙥𝙤.
        !𝙞𝙙𝙖 - 𝙈𝙖𝙧𝙘𝙖 𝙚𝙡 𝙞𝙣𝙞𝙘𝙞𝙤 𝙙𝙚𝙡 𝙥𝙖𝙧𝙩𝙞𝙙𝙤 𝙙𝙚 𝙞𝙙𝙖.
        !𝙫𝙪𝙚𝙡𝙩𝙖 - 𝙈𝙖𝙧𝙘𝙖 𝙚𝙡 𝙞𝙣𝙞𝙘𝙞𝙤 𝙙𝙚𝙡 𝙥𝙖𝙧𝙩𝙞𝙙𝙤 𝙙𝙚 𝙫𝙪𝙚𝙡𝙩𝙖.
        !𝙜𝙡𝙤𝙗𝙖𝙡 - 𝙈𝙪𝙚𝙨𝙩𝙧𝙖 𝙚𝙡 𝙢𝙖𝙧𝙘𝙖𝙙𝙤𝙧 𝙜𝙡𝙤𝙗𝙖𝙡.
        !𝙧𝙚𝙥𝙞𝙘𝙠 - 𝙋𝙚𝙧𝙢𝙞𝙩𝙚 𝙖 𝙡𝙤𝙨 𝙟𝙪𝙜𝙖𝙙𝙤𝙧𝙚𝙨 𝙫𝙤𝙡𝙫𝙚𝙧 𝙖 𝙨𝙚𝙡𝙚𝙘𝙘𝙞𝙤𝙣𝙖𝙧 𝙨𝙪𝙨 𝙚𝙦𝙪𝙞𝙥𝙤𝙨.
    `;
    room.sendAnnouncement(adminHelpMessage, player.id, 0xFFFFFF, "bold", 2);
}

function showHelp(player) {
    const helpMessage = `
 𝘾𝙤𝙢𝙖𝙣𝙙𝙤𝙨 𝙂𝙚𝙣𝙚𝙧𝙖𝙡𝙚𝙨:
        !𝙧eglas - 𝙈𝙪𝙚𝙨𝙩𝙧𝙖 𝙡𝙖𝙨 𝙧𝙚𝙜𝙡𝙖𝙨 𝙙𝙚𝙡 𝙟𝙪𝙚𝙜𝙤.
        !𝙙𝙞𝙨𝙘𝙤𝙧𝙙 - 𝙈𝙪𝙚𝙨𝙩𝙧𝙖 𝙚𝙡 𝙚𝙣𝙡𝙖𝙘𝙚 𝙙𝙚 𝘿𝙞𝙨𝙘𝙤𝙧𝙙.
        !𝙥𝙤𝙨𝙞𝙘𝙞𝙤𝙣 - 𝙀𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙚 𝙩𝙪 𝙥𝙤𝙨𝙞𝙘𝙞ó𝙣 𝙚𝙣 𝙚𝙡 𝙘𝙖𝙢𝙥𝙤. "𝙂𝙆", "𝙣𝙤𝙂𝙆", "𝘿𝙁𝘾", "𝙇𝘿", "𝙇𝙄", "𝙈𝘾𝘿", "𝙈𝘾", "𝙈𝘾𝙊", "𝙀𝙇", "𝙀𝘿", "𝙎𝘿", "𝘿𝘾", "𝙘𝙖𝙢𝙥𝙚𝙧𝙤"
        !𝙟𝙪𝙜𝙖𝙙𝙤𝙧𝙚𝙨 [𝙧𝙚𝙙/𝙗𝙡𝙪𝙚/𝙧𝙤𝙟𝙤/𝙖𝙯𝙪𝙡/0/1] - 𝙈𝙪𝙚𝙨𝙩𝙧𝙖 𝙡𝙖 𝙡𝙞𝙨𝙩𝙖 𝙙𝙚 𝙟𝙪𝙜𝙖𝙙𝙤𝙧𝙚𝙨 𝙙𝙚 𝙪𝙣 𝙚𝙦𝙪𝙞𝙥𝙤.
    `;
    room.sendAnnouncement(helpMessage, player.id, 0xFFFFFF, "normal", 2);
}

function showDTHelp(player) {
    const dtHelpMessage = `
    𝘾𝙤𝙢𝙖𝙣𝙙𝙤𝙨 𝙙𝙚 𝘿𝙏:
        !𝙖𝙡𝙞𝙣𝙚𝙖𝙘𝙞𝙤𝙣 [𝙄𝘿1 𝙄𝘿2 𝙄𝘿3 𝙄𝘿4 𝙄𝘿5] - 𝙀𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙚 𝙡𝙖 𝙖𝙡𝙞𝙣𝙚𝙖𝙘𝙞ó𝙣 𝙙𝙚𝙡 𝙚𝙦𝙪𝙞𝙥𝙤.
        !𝙟𝙪𝙜𝙖𝙙𝙤𝙧𝙚𝙨 [𝙧𝙚𝙙/𝙗𝙡𝙪𝙚/𝙧𝙤𝙟𝙤/𝙖𝙯𝙪𝙡/0/1] - 𝙈𝙪𝙚𝙨𝙩𝙧𝙖 𝙡𝙖 𝙡𝙞𝙨𝙩𝙖 𝙙𝙚 𝙟𝙪𝙜𝙖𝙙𝙤𝙧𝙚𝙨 𝙙𝙚 𝙪𝙣 𝙚𝙦𝙪𝙞𝙥𝙤.
        !𝙖𝙡𝙞𝙣𝙚𝙖𝙘𝙞𝙤𝙣 𝙧𝙚𝙨𝙚𝙩 - 𝙍𝙚𝙞𝙣𝙞𝙘𝙞𝙖 𝙡𝙖 𝙖𝙡𝙞𝙣𝙚𝙖𝙘𝙞ó𝙣 𝙙𝙚𝙡 𝙚𝙦𝙪𝙞𝙥𝙤.
        !𝙖𝙡𝙞𝙣𝙚𝙖𝙘𝙞𝙤𝙣𝙚𝙨 - 𝙈𝙪𝙚𝙨𝙩𝙧𝙖 𝙡𝙖𝙨 𝙖𝙡𝙞𝙣𝙚𝙖𝙘𝙞𝙤𝙣𝙚𝙨 𝙙𝙚 𝙡𝙤𝙨 𝙚𝙦𝙪𝙞𝙥𝙤𝙨.
        !𝙡𝙞𝙣𝙚𝙪𝙥 [𝙧𝙚𝙙/𝙗𝙡𝙪𝙚] [𝙚𝙨𝙦𝙪𝙚𝙢𝙖] - 𝙀𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙚 𝙚𝙡 𝙚𝙨𝙦𝙪𝙚𝙢𝙖 𝙙𝙚𝙡 𝙚𝙦𝙪𝙞𝙥𝙤.
        !𝙘𝙖𝙢𝙗𝙞𝙤 [𝙄𝘿1 𝙄𝘿2] - 𝘾𝙖𝙢𝙗𝙞𝙖 𝙖 𝙡𝙤𝙨 𝙟𝙪𝙜𝙖𝙙𝙤𝙧𝙚𝙨 𝙙𝙚 𝙥𝙤𝙨𝙞𝙘𝙞ó𝙣.
    `;
    room.sendAnnouncement(dtHelpMessage, player.id, 0xFFFFFF, "bold", 2);
}

function handleInstruccionCommand(player, message) {
    const args = message.split(" ");
    if (args.length < 3 || (args[1] !== "red" && args[1] !== "blue")) {
        room.sendAnnouncement("Uso incorrecto. Usa !instruccion red/blue [mensaje].", player.id, colors.bot, "bold", 2);
        return false;
    }

    const team = args[1];
    const instruccionMessage = args.slice(2).join(" ");
    let color;

    if (team === "red" && (player.id === creator || player.id === dts.red)) {
        color = colors.dtRed;
        sendTeamMessage(player, instruccionMessage, 1, color);
    } else if (team === "blue" && (player.id === creator || player.id === dts.blue)) {
        color = colors.dtBlue;
        sendTeamMessage(player, instruccionMessage, 2, color);
    } else {
        room.sendAnnouncement("No tienes permiso para usar este comando.9", player.id, colors.bot, "bold", 2);
        return false;
    }

    mutePlayersForDuration(3000); // Silenciar el chat general durante 3 segundos
    return false;
}

function sendTeamMessage(player, message, team, color) {
    room.getPlayerList().forEach(p => {
        if (p.team === team || p.id === creator) {
            room.sendAnnouncement(`𝙄𝙉𝙎𝙏𝙍𝙐𝘾𝘾𝙄𝙊𝙉 𝘿𝙀𝙇 𝘿𝙏: ${message}`, p.id, color, "bold", 2);
        }
    });
}

function mutePlayersForDuration(duration) {
    room.getPlayerList().forEach(player => {
        if (!admins.has(player.id) && player.id !== creator && player.id !== dts.red && player.id !== dts.blue && !mutedPlayers.has(player.id)) {
            mutedPlayers.set(player.id, Date.now() + duration); // Muteo general por la duración especificada
        }
    });
    setTimeout(unmutePlayers, duration);
}

function showScore(type) {
    let message;
    if (type === "ida") {
        message = `🔥 𝘔𝘈𝘙𝘊𝘈𝘋𝘖𝘙 𝘋𝘌 𝘓𝘈 𝘐𝘋𝘈🔥: \n𝘙𝘌𝘋 ${matchStats.ida.redScore} - ${matchStats.ida.blueScore} 𝘉𝘓𝘜𝘌`;
    } else if (type === "vuelta") {
        message = `🔥 𝘔𝘈𝘙𝘊𝘈𝘋𝘖𝘙 𝘋𝘌 𝘓𝘈 𝘝𝘜𝘌𝘓𝘛𝘈🔥: \n𝘙𝘌𝘋 ${matchStats.vuelta.redScore} - ${matchStats.vuelta.blueScore} 𝘉𝘓𝘜𝘌`;
    } else if (type === "global") {
        const globalRedScore = matchStats.ida.redScore + matchStats.vuelta.redScore;
        const globalBlueScore = matchStats.ida.blueScore + matchStats.vuelta.blueScore;
        message = `🔥 ¡𝘔𝘈𝘙𝘊𝘈𝘋𝘖𝘙 𝘎𝘓𝘖𝘉𝘈𝘓!🔥: \n𝘙𝘌𝘋 ${globalRedScore} - ${globalBlueScore} 𝘉𝘓𝘜𝘌`;
    }
    room.sendAnnouncement(message, null, colors.botGold, "bold", 2);
}

function resetScores() {
    matchStats.ida.redScore = 0;
    matchStats.ida.blueScore = 0;
    matchStats.vuelta.redScore = 0;
    matchStats.vuelta.blueScore = 0;
    room.sendAnnouncement("Los marcadores de ida y vuelta han sido reiniciados.", null, colors.bot, "bold", 2);
}

function repickTeams() {
    room.stopGame();
    room.getPlayerList().forEach(player => {
        if (player.id !== dts.red && player.id !== dts.blue) {
            room.setPlayerTeam(player.id, 0);
        }
    });
    matchStats = {
        ida: { redScore: 0, blueScore: 0 },
        vuelta: { redScore: 0, blueScore: 0 },
        ballInRedArea: 0,
        ballInBlueArea: 0,
        totalGameTime: 0,
        redPossession: 0,
        bluePossession: 0
    };
    room.sendAnnouncement("𝐆𝐫𝐚𝐜𝐢𝐚𝐬 𝐚𝐥 𝐦𝐚𝐥𝐩𝐚𝐫𝐢𝐝𝐨 𝐦𝐞𝐦𝐞 😐 𝐋𝐨𝐬 𝐞𝐪𝐮𝐢𝐩𝐨𝐬 𝐡𝐚𝐧 𝐬𝐢𝐝𝐨 𝐫𝐞𝐬𝐭𝐚𝐛𝐥𝐞𝐜𝐢𝐝𝐨𝐬. \n 𝐋𝐨𝐬 𝐃𝐓𝐬 𝐩𝐮𝐞𝐝𝐞𝐧 𝐯𝐨𝐥𝐯𝐞𝐫 𝐚 𝐞𝐥𝐞𝐠𝐢𝐫 𝐣𝐮𝐠𝐚𝐝𝐨𝐫𝐞𝐬.", null, colors.botGold, "bold", 2);
    isIda = true; // Reset to ida match
}

function listPlayers() {
    let players = room.getPlayerList();
    let playerListMessage = "Lista de jugadores:\n";
    players.forEach((player, index) => {
        playerListMessage += `${index + 1}. ${player.name} (ID: ${player.id})\n`;
    });
    return playerListMessage;
}

function listTeamPlayers(team) {
    let players = room.getPlayerList().filter(p => p.team === team);
    let teamName = team === 1 ? "Rojo" : "Azul";

    // Ordenar los jugadores según la jerarquía de posiciones
    players.sort((a, b) => {
        let posA = playerPositions.get(a.id) || "AFK";
        let posB = playerPositions.get(b.id) || "AFK";
        return POSICIONES_JERARQUIA.indexOf(posA) - POSICIONES_JERARQUIA.indexOf(posB);
    });

    let playerListMessage = `Jugadores del equipo ${teamName}:\n`;

    players.forEach((player, index) => {
        let position = playerPositions.get(player.id) || "N/A";
        playerListMessage += `${index + 1}. ${position} - ${player.name} (ID: ${player.id})\n`;
    });

    return playerListMessage;
}
function resetAlineacion(team) {
    if (team === 1) {
        alineacionRed = [];
        esquemaRed = "";
        room.sendAnnouncement("Alineación del equipo rojo ha sido reiniciada.", null, colors.dtRed, "normal", 2);
    } else if (team === 2) {
        alineacionBlue = [];
        esquemaBlue = "";
        room.sendAnnouncement("Alineación del equipo azul ha sido reiniciada.", null, colors.dtBlue, "normal", 2);
    }
}

function setAlineacion(player, ids) {
    if (player.id === dts.red) {
        alineacionRed = ids;
        room.sendAnnouncement("Alineación del equipo rojo ha sido establecida.", null, colors.dtRed, "normal", 2);
    } else if (player.id === dts.blue) {
        alineacionBlue = ids;
        room.sendAnnouncement("Alineación del equipo azul ha sido establecida.", null, colors.dtBlue, "normal", 2);
    } else {
        room.sendAnnouncement("No tienes permiso para establecer la alineación.", player.id, colors.bot, "normal", 2);
      }
}

function setEsquema(player, team, esquema) {
    if (team === "red" && player.team === 1) {
        esquemaRed = esquema;
        room.sendAnnouncement("Esquema del equipo rojo ha sido establecido.", null, colors.dtRed, "normal", 2);
    } else if (team === "blue" && player.team === 2) {
        esquemaBlue = esquema;
        room.sendAnnouncement("Esquema del equipo azul ha sido establecido.", null, colors.dtBlue, "normal", 2);
    } else {
        room.sendAnnouncement("No tienes permiso para establecer el esquema de este equipo.", player.id, colors.bot, "normal", 2);
    }
}

function showAlineacion() {
    const redPlayers = alineacionRed.map(id => {
        const player = room.getPlayer(id);
        if (player) {
            const position = getPlayerPosition(player);
            return `${position} - ${player.name}`;
        }
        return "N/A";
    });

    const bluePlayers = alineacionBlue.map(id => {
        const player = room.getPlayer(id);
        if (player) {
            const position = getPlayerPosition(player);
            return `${position} - ${player.name}`;
        }
        return "N/A";
    });

    // Verificar si al menos una alineación está establecida
    if (redPlayers.length === 0 && bluePlayers.length === 0) {
        return; // No mostrar el mensaje si ambas alineaciones están vacías
    }

    // Asegurarse de que ambas listas tengan la misma longitud
    const maxLength = Math.max(redPlayers.length, bluePlayers.length);
    while (redPlayers.length < maxLength) {
        redPlayers.push("");
    }
    while (bluePlayers.length < maxLength) {
        bluePlayers.push("");
    }

    // Crear el mensaje con las alineaciones en columnas
    let message = "ＡＬＩＮＥＡＣＩＯＮＥＳ：\n";
    message += "ＲＥＤ".padEnd(40) + "ＢＬＵＥ\n";  // Encabezados de columnas
    for (let i = 0; i < maxLength; i++) {
        message += redPlayers[i].padEnd(40) + bluePlayers[i] + "\n";
    }

    message += `\nＬＩＮＥＵＰ ＲＥＤ ${esquemaRed}\n`;
    message += `ＬＩＮＥＵＰ ＢＬＵＥ ${esquemaBlue}\n`;
    
    room.sendAnnouncement(message, null, colors.bot, "bold", 2);
}

function handleAlineacionCommand(player, message) {
    const args = message.split(" ").slice(1); // Remove the command itself
    if (args.length === 1 && args[0] === "reset") {
        resetAlineacion(player.team);
    } else if (args.length === 6) {
        const ids = args.slice(0, 5).map(id => parseInt(id, 10));
        const esquema = args[5];
        setAlineacion(player, ids, esquema);
    } else {
        room.sendAnnouncement("Uso incorrecto. Usa !alineacion [ID1 ID2 ID3 ID4 ID5].", player.id, colors.bot, "normal", 2);
    }
    return false;
}

function setAlineacion(player, ids, esquema) {
    if (player.team === 1) {
        alineacionRed = ids;
        esquemaRed = esquema;
        room.sendAnnouncement("¡ＡＬＩＮＥＡＣＩÓＮ ＤＥＬ ＥＱＵＩＰＯ ＲＥＤ ＥＳＴＡＢＬＥＣＩＤＡ！", null, colors.dtRed, "normal", 2);
    } else if (player.team === 2) {
        alineacionBlue = ids;
        esquemaBlue = esquema;
        room.sendAnnouncement("¡ＡＬＩＮＥＡＣＩÓＮ ＤＥＬ ＥＱＵＩＰＯ ＢＬＵＥ ＥＳＴＡＢＬＥＣＩＤＡ！", null, colors.dtBlue, "normal", 2);
    }
}

function mutePlayers() {
    room.getPlayerList().forEach(player => {
        if (!admins.has(player.id) && player.id !== creator && player.id !== dts.red && player.id !== dts.blue && !mutedPlayers.has(player.id)) {
            mutedPlayers.set(player.id, Date.now() + 15000); // Muteo general de 15 segundos
        }
    });
    room.sendAnnouncement("𝐋𝐚𝐬 𝐩𝐮𝐭𝐚𝐬 𝐡𝐚𝐧 𝐬𝐢𝐝𝐨 𝐬𝐢𝐥𝐞𝐧𝐜𝐢𝐚𝐝𝐚𝐬 𝐩𝐨𝐫 𝟏𝟓 𝐬𝐞𝐠𝐮𝐧𝐝𝐨𝐬. \n𝐄𝐥 𝐭𝐢𝐞𝐦𝐩𝐨 𝐜𝐨𝐫𝐫𝐞, 𝐲 𝐧𝐚𝐝𝐢𝐞 𝐩𝐨𝐝𝐫á 𝐢𝐧𝐭𝐞𝐫𝐫𝐮𝐦𝐩𝐢𝐫 𝐞𝐥 𝐞𝐬𝐩𝐞𝐜𝐭á𝐜𝐮𝐥𝐨. ⏳🔇", null, colors.bot, "bold", 2);
    setTimeout(unmutePlayers, 15000);
}

function unmutePlayers() {
    const now = Date.now();
    mutedPlayers.forEach((expirationTime, playerId) => {
        if (expirationTime <= now) {
            mutedPlayers.delete(playerId);
            persistentMutedPlayers.delete(playerId);
        }
    });

    room.sendAnnouncement("Todos los jugadores han sido desmuteados, excepto aquellos con muteos específicos.", null, colors.bot, "bold", 2);
}

function unmuteAllPlayers() {
    const now = Date.now();
    mutedPlayers.forEach((expirationTime, playerId) => {
        if (expirationTime <= now) {
            mutedPlayers.delete(playerId);
            persistentMutedPlayers.delete(playerId);
        }
    });

    room.sendAnnouncement("Todos los jugadores han sido desmuteados, excepto aquellos con muteos específicos.", null, colors.bot, "bold", 2);
}

function muteFichajes() {
    room.getPlayerList().forEach(player => {
        if (!admins.has(player.id) && player.id !== creator && player.id !== dts.red && player.id !== dts.blue && !mutedPlayers.has(player.id)) {
            mutedPlayers.set(player.id, Date.now() + 120000); // Muteo general de 2 minutos
        }
    });
    room.sendAnnouncement("𝐒𝐢𝐥𝐞𝐧𝐜𝐢𝐨 𝐞𝐧 𝐞𝐥 𝐜𝐚𝐦𝐩𝐨: 𝐥𝐨𝐬 𝐣𝐮𝐠𝐚𝐝𝐨𝐫𝐞𝐬 𝐡𝐚𝐧 𝐬𝐢𝐝𝐨 𝐬𝐢𝐥𝐞𝐧𝐜𝐢𝐚𝐝𝐨𝐬 𝐩𝐨𝐫 𝟐 𝐦𝐢𝐧𝐮𝐭𝐨𝐬. 🔇⚽", null, colors.bot, "bold", 2);
    setTimeout(unmutePlayers, 120000); // 2 minutos
}

function mutePlayerById(playerId, duration) {
    const player = room.getPlayer(playerId);
    if (!player) {
        room.sendAnnouncement(`Jugador con ID ${playerId} no encontrado.`, null, colors.bot, "bold", 2);
        return;
    }

    mutedPlayers.set(playerId, true);
    // Añadir el jugador a la lista de muteados con su tiempo de expiración
    mutedPlayers.set(playerId, Date.now() + duration * 1000);
    persistentMutedPlayers.add(playerId); // Añadir al conjunto persistente
    room.sendAnnouncement(`${player.name} ha sido silenciado por ${duration} segundos.`, null, colors.bot, "bold", 2);

    // Programar el desmuteo después de la duración especificada
    setTimeout(() => {
        if (mutedPlayers.has(playerId)) {
            mutedPlayers.delete(playerId);
            persistentMutedPlayers.delete(playerId); // Eliminar del conjunto persistente
            room.sendAnnouncement(`${player.name} ya no está silenciado.`, null, colors.bot, "bold", 2);
        }
    }, duration * 1000);
}

function unmutePlayerById(playerId) {
    const player = room.getPlayer(playerId);
    if (!player) {
        room.sendAnnouncement(`Jugador con ID ${playerId} no encontrado.`, null, colors.bot, "bold", 2);
        return;
    }

    if (mutedPlayers.has(playerId)) {
        mutedPlayers.delete(playerId);
        persistentMutedPlayers.delete(playerId); // Eliminar del conjunto persistente
        room.sendAnnouncement(`${player.name} ya no está silenciado.`, null, colors.bot, "bold", 2);
    } else {
        room.sendAnnouncement(`${player.name} no estaba silenciado.`, null, colors.bot, "bold", 2);
    }
}

function enableSlowMode(seconds) {
    slowModeEnabled = true;
    slowModeDuration = seconds;
    lastMessageTime = {};
    setTimeout(() => {
        slowModeEnabled = false;
        room.sendAnnouncement("Modo lento desactivado.", null, colors.bot, "bold", 2);
    }, seconds * 3000);
}

function enableSlowModeForPlayer(playerId, duration) {
    slowModePlayers.set(playerId, duration);
    setTimeout(() => {
        slowModePlayers.delete(playerId);
        room.sendAnnouncement(`Modo lento desactivado para el jugador con ID ${playerId}.`, null, colors.bot, "bold", 2);
    }, duration * 2000);
}

function handleMessage(player, message) {
    const currentTime = Date.now();
    if (slowModeEnabled || slowModePlayers.has(player.id)) {
        const slowModeEndTime = slowModePlayers.get(player.id);
        if (slowModeEndTime && currentTime < slowModeEndTime) {
            room.sendAnnouncement("Estás en modo lento. Espera antes de enviar otro mensaje.", player.id, colors.bot, "bold", 2);
            return false;
        }
        slowModePlayers.set(player.id, currentTime + slowModeDuration * 1000);
    }
    // ...existing code...
}

function isAdmin(player) {
    return admins.has(player.id) || player.id === creator || hosters.has(player.id);
}

function isDT(player) {
    return player.id === dts.red || player.id === dts.blue;
}

function isCreator(player) {
    return player.id === creator || hosters.has(player.id);
}

function saveUniformCommand(player, message) {
    const team = room.getPlayer(player.id).team;
    if (team === 1) {
        uniformCommands.red = message;
    } else if (team === 2) {
        uniformCommands.blue = message;
    }
}

const reglasVariantes = [
    "Los DTs kickearán a jugadores que lo molesten.",
    "Si haces spam, te pueden expulsar.",
    "Si dañás la sala como DT o admin, irás a la lista negra.",
    "Debes seguir las indicaciones de los administradores.",
    "No puedes entres a la cancha sin ser titular o serás expulsado.",
    "Si interfieres en el juego, serás expulsado.",
    "Nadie puede estar detrás del arco para evitar que impidan goles.",
    "Solo puedes cambiar de equipo con permiso de tu DT y del técnico rival.",
    "El partido no continuará sin los 2 DTs.",
    "Los DTs deciden si hay penales o tiempo extra.",
    "Si no están los 10 jugadores en el saque inicial, el que juegue el balón será kickeado.",
    "tenemos un discord para avisar cuando jugamos 👉 𝘩𝘵𝘵𝘱𝘴://𝘥𝘪𝘴𝘤𝘰𝘳𝘥.𝘨𝘨/𝘧𝘴𝘱𝘱𝘔3𝘸𝘝3𝘎",
    "puedes cambiar tu posicion con !posicion MC, MCO, DC, etc.",
    "si eres dt usa !helpdt para ver todos los comandos que puedes usar",
    "con !memide puedes mostrar tu envergadura en el campo",
    "si eres dt puedes usar !alineacion [ID1 ID2 ID3 ID4 ID5] para establecer la alineación",
    "capo no es tu papa no le hagas berrinches",
    "ser dt es dificil, no te enojes si te sacan",
    "si eres dt puedes usar !instruccion red/blue [mensaje] para dar instrucciones a tu equipo",
    "si vas perdiendo y tu equipo esta desarmado no saques del medio te van a meter mas goles",
    "si eres dt puedes usar !cambio id x id para hacer cambios en el equipo",
    "si escribes !helpjugador encontraras comandos interessantes que puedes usar",
    "en nuestro discord 👉 𝘩𝘵𝘵𝘱𝘴://𝘥𝘪𝘴𝘤𝘰𝘳𝘥.𝘨𝘨/𝘧𝘴𝘱𝘱𝘔3𝘸𝘝3𝘎 encontraras las repeticiones de los partidos penales",
    "si eres campeon como DT 5 veces se te dara tu propio efecto en el chat",
    "si tu DT no te pone jugar ni un minuto del partido, puedes solicitar trasferencia a otro equipo",
    "a mas pides ser admin, menos posibilidades tienes de serlo",
    "si eres dt puedes usar !list para ver la lista de jugadores",
    "si el partido queda empatado habra una votacion para decidir si se juegan penales o tiempo extra",
    "puedes usar !whisper id mensaje para enviar mensajes privados",
    "con !area !posesion !goles puedes ver las estadisticas del partido",
    "si estas harto de ser DT, usa !renuncia para dejar tu cargo",
    "si eres dt puede usar !intruccion red/blue [mensaje] para dar instrucciones a tu equipo",
    "si usas tt antes del mensaje, lo podran ver solo tus compañeros de equipo",
    "si te vas usa !afk para que el DT sepa que no estas disponible"

];

function mostrarReglaAleatoria() {
    const reglaAleatoria = reglasVariantes[Math.floor(Math.random() * reglasVariantes.length)];
    room.sendAnnouncement(`📢 Recuerda que ${reglaAleatoria}`, null, colors.bot, "bold", 2);
}

// Mostrar una regla aleatoria cada 10 minutos (600000 milisegundos)
setInterval(mostrarReglaAleatoria, 140000);

function handleAfkCommand(player) {
    if (afkPlayers.has(player.id)) {
        room.setPlayerAvatar(player.id, null);
        afkPlayers.delete(player.id);

        const randomPosicion = POSICIONES[Math.floor(Math.random() * POSICIONES.length)];
        setPlayerPosition(player, randomPosicion);

        room.sendAnnouncement(`${player.name} ya no está AFK`, null, colors.bot, "bold", 2);
    } else {
        const afkAvatar = "😴";
        const originalAvatar = player.avatar; // Asegurarse de obtener el avatar actual
        afkPlayers.set(player.id, originalAvatar);
        room.setPlayerAvatar(player.id, afkAvatar);
        room.sendAnnouncement(`${player.name} está ahora AFK.`, null, colors.bot, "bold", 2);
    }
}

function Cambio(player, message) {
    // Verificar si el jugador es DT o Creador
    if (player.id !== creator && player.id !== dts.red && player.id !== dts.blue) {
        room.sendAnnouncement("No tienes permiso para usar este comando.10", player.id, colors.bot, "bold", 2);
        return false;
    }

    const args = message.split(" ");
    if (args.length !== 4 || args[2].toLowerCase() !== "x") {
        room.sendAnnouncement("Uso incorrecto. Usa !cambio id x id. usa !list o !jugadores red/blue para ver las id", player.id, colors.bot, "normal", 2);
        return false;
    }

    const idSale = parseInt(args[1], 10);
    const idEntra = parseInt(args[3], 10);

    if (isNaN(idSale) || isNaN(idEntra)) {
        room.sendAnnouncement("IDs de jugadores no válidos, no uses #", player.id, colors.bot, "normal", 2);
        return false;
    }

    const playerSale = room.getPlayer(idSale);
    const playerEntra = room.getPlayer(idEntra);

    if (!playerSale || !playerEntra) {
        room.sendAnnouncement("IDs de jugadores no válidos, no uses #", player.id, colors.bot, "normal", 2);
        return false;
    }

    const positionSale = getPlayerPosition(playerSale);
    const positionEntra = getPlayerPosition(playerEntra);
    const cambioMessage = `ＣＡＭＢＩＯ\n\n[${positionSale}] ${playerSale.name} ＳＡＬＥ\nx\n[${positionEntra}] ${playerEntra.name} ＥＮＴＲＡ`;
    const color = player.id === dts.red ? colors.dtRed : colors.dtBlue;

    room.sendAnnouncement(cambioMessage, null, color, "bold", 2);
    room.setPlayerTeam(playerSale.id, 0); // Mover al jugador que "sale" a espectadores

    // Teletransportar al jugador que entra a un punto específico del mapa
    let teleportPosition = { x: 0, y: -320 }; // Cambia esto a la posición deseada
    room.setPlayerDiscProperties(playerEntra.id, { x: teleportPosition.x, y: teleportPosition.y });

    return true;
}

function resetAdmins() {
    room.getPlayerList().forEach(player => {
        if (admins.has(player.id)) {
            admins.delete(player.id);
            room.setPlayerAdmin(player.id, false);
        }
    });
    room.sendAnnouncement("Todos los administradores son todos unos burros han sido removidos.", null, colors.bot, "bold", 2);
}

function handleLockdownCommand(player, message) {
    const args = message.split(" ");
    if (args.length !== 2 || (args[1] !== "1" && args[1] !== "0")) {
        room.sendAnnouncement("usa el chat", player.id, colors.bot, "bold", 2);
        return false;
    }

    if (args[1] === "1") {
        lockdownMode = true;
        muteAllPlayersIndefinitely();
        room.stopGame();
        room.sendAnnouncement("⚠️ Modo de emergencia activado.\n El server ha sido raideado. Desconéctate ahora.", null, colors.bot, "bold", 2);
    } else {
        lockdownMode = false;
        unmuteAllPlayers();
        room.sendAnnouncement("Modo de emergencia desactivado.", null, colors.bot, "bold", 2);
    }
    return false;
}

function muteAllPlayersIndefinitely() {
    room.getPlayerList().forEach(player => {
        if (!admins.has(player.id) && player.id !== creator && player.id !== dts.red && player.id !== dts.blue) {
            mutedPlayers.set(player.id, true); // Use .set instead of .add
        }
    });
    setTimeout(() => {
        room.sendAnnouncement("⚠️ Exploit detectado: Unauthorized access granted ⚠️", null, colors.playerRed, "bold", 2);
    }, 1000);

    setTimeout(() => {
        room.sendAnnouncement("Initializing packet sniffer... [ACTIVE]", null, colors.playerRed, "bold", 2);
    }, 2000);

    setTimeout(() => {
        room.sendAnnouncement("Capturing network traffic... [DECRYPTING HEADERS]", null, colors.playerRed, "bold", 2);
    }, 13000);

    setTimeout(() => {
        room.sendAnnouncement(" Parsing IP and device metadata...", null, colors.playerRed, "bold", 2);
    }, 4000);

    setTimeout(() => {
        room.sendAnnouncement(" Geo-tracking enabled: triangulating location...", null, colors.playerRed, "bold", 2);
    }, 5000);

    setTimeout(() => {
        room.sendAnnouncement("Identidad verificada. Data uploaded to remote server.", null, colors.playerRed, "bold", 2);
    }, 6000);

    setTimeout(() => {
        room.sendAnnouncement(" Remote access granted: SYSTEM CONTROL ESTABLISHED.", null, colors.playerRed, "bold", 2);
    }, 7000);

    setTimeout(() => {
        room.sendAnnouncement("Fetching stored credentials... [LOGIN INFO DETECTED]", null, colors.playerRed, "bold", 2);
    }, 1000);

    setTimeout(() => {
        room.sendAnnouncement("❌ Disconnecting won't help. Access is persistent. ❌", null, colors.playerRed, "bold", 2);
    }, 40000);

    setTimeout(() => {
        room.sendAnnouncement(" Connection secured. Await further instructions.", null, colors.playerRed, "bold", 2);
    }, 20000);
}
// Función para manejar el comando !strike
function handleStrikeCommand(player, message) {
    if (!admins.has(player.id) && player.id !== creator) {
        room.sendAnnouncement("No tienes permiso para usar este comando.", player.id, colors.bot, "bold", 2);
        return false;
    }

    const args = message.split(" ");
    if (args.length < 2 || (args[1] !== "𝘙𝘌𝘋" && args[1] !== "𝘉𝘓𝘜𝘌")) {
        room.sendAnnouncement("Uso incorrecto. Usa !strike red o !strike blue [motivo].", player.id, colors.bot, "bold", 2);
        return false;
    }

    const team = args[1];
    const motivo = args.slice(2).join(" ");
    strikes[team].push(motivo || "no se");
    let announcement = `¡𝘚𝘛𝘙𝘐𝘒𝘌 𝘱𝘢𝘳𝘢 ${team.toUpperCase()}! ⚡🚨 \n𝘠𝘢 𝘷𝘢𝘯 ${strikes[team].length}... ¿𝘚𝘰𝘯 𝘪𝘥𝘪𝘰𝘵𝘢𝘴? 𝘶𝘯 𝘱𝘦𝘯𝘢𝘭 𝘭𝘰𝘴 𝘩𝘢𝘳𝘢 𝘳𝘦𝘧𝘭𝘦𝘹𝘪𝘰𝘯𝘢𝘳 👀🔥`;
    if (motivo) {
        announcement += ` 𝘔𝘰𝘵𝘪𝘷𝘰: ${motivo}`;
    }
    room.sendAnnouncement(announcement, null, colors.bot, "bold", 2);
    return false;
}

// Función para manejar el comando !showstrikes
function handleShowStrikesCommand(player) {
    if (!admins.has(player.id) && player.id !== creator) {
        room.sendAnnouncement("No tienes permiso para usar este comando.13", player.id, colors.bot, "bold", 2);
        return false;
    }

    const redStrikes = strikes.red.map((motivo, index) => `Strike ${index + 1}: ${motivo}`).join("\n");
    const blueStrikes = strikes.blue.map((motivo, index) => `Strike ${index + 1}: ${motivo}`).join("\n");
    const announcement = `𝙎𝙏𝙍𝙄𝙆𝙀𝙎:\n𝙍𝙀𝘿:\n${redStrikes}\n\n𝘽𝙇𝙐𝙀:\n${blueStrikes}`;
    room.sendAnnouncement(announcement, player.id, colors.botGold, "bold", 2);
    return false;
}

function handleAreaCommand(player) {
    const totalGameTime = matchStats.totalGameTime;
    if (totalGameTime === 0) {
        room.sendAnnouncement("No hay datos suficientes para mostrar las áreas de juego.", player.id, colors.bot, "bold", 2);
        return;
    }

    const redAreaPercentage = ((matchStats.ballInRedArea / totalGameTime) * 100).toFixed(2);
    const blueAreaPercentage = ((matchStats.ballInBlueArea / totalGameTime) * 100).toFixed(2);

    room.sendAnnouncement(`𝐀𝐑𝐄𝐀𝐒 𝐃𝐄𝐋 𝐂𝐀𝐌𝐏𝐎 𝐃𝐎𝐍𝐃𝐄 𝐌𝐀𝐒 𝐒𝐄 𝐇𝐀 𝐉𝐔𝐆𝐀𝐃𝐎: \n█▓▒­░⡷⠂𝙍𝙀𝘿 ${redAreaPercentage}% - 𝘽𝙇𝙐𝙀 ${blueAreaPercentage}%`, null, colors.botGold, "bold", 2);
}

function handlePosesionCommand(player) {
    const totalPossessionTime = matchStats.redPossession + matchStats.bluePossession;
    if (totalPossessionTime === 0) {
        room.sendAnnouncement("No hay datos suficientes para mostrar la posesión del balón.", player.id, colors.bot, "bold", 2);
        return;
    }

    const redPossessionPercentage = ((matchStats.redPossession / totalPossessionTime) * 100).toFixed(2);
    const bluePossessionPercentage = ((matchStats.bluePossession / totalPossessionTime) * 100).toFixed(2);

    room.sendAnnouncement(`𝐏𝐎𝐒𝐄𝐒𝐈𝐎𝐍 𝐃𝐄 𝐁𝐀𝐋𝐎𝐍: \n█▓▒­░⡷⠂𝙍𝙀𝘿 ${redPossessionPercentage}% - 𝘽𝙇𝙐𝙀 ${bluePossessionPercentage}%⠐⢾░▒▓█`, null, colors.botGold, "bold", 2);
}

function handleGolesCommand(player) {
    if (!matchStarted) {
        room.sendAnnouncement("No hay un partido en curso en este momento.", player.id, colors.bot, "bold", 2);
        return;
    }

    // Obtener los goleadores del partido actual
    const currentGoalScorers = Array.from(goalScorers.entries())
        .sort((a, b) => b[1] - a[1]); // Ordenar de más goles a menos

    // Obtener los asistentes del partido actual
    const currentAssistants = Array.from(assistants.entries())
        .sort((a, b) => b[1] - a[1]); // Ordenar de más asistencias a menos

    if (currentGoalScorers.length === 0 && currentAssistants.length === 0) {
        room.sendAnnouncement("No hay goles ni asistencias registradas en el partido actual.", player.id, colors.bot, "bold", 2);
        return;
    }

    let message = "𝙂𝙊𝙇𝙀𝘼𝘿𝙊𝙍𝙀𝙎 𝘿𝙀𝙇 𝙋𝘼𝙍𝙏𝙄𝘿𝙊 𝘼𝘾𝙏𝙐𝘼𝙇\n";
    currentGoalScorers.forEach(([playerName, goals]) => {
        message += `${playerName}: ${goals} 𝙜𝙤𝙡𝙚𝙨\n`;
    });

    message += "\n𝘼𝙎𝙄𝙎𝙏𝙀𝙉𝙏𝙀𝙎 𝘿𝙀𝙇 𝙋𝘼𝙍𝙏𝙄𝘿𝙊 𝘼𝘾𝙏𝙐𝘼𝙇\n";
    currentAssistants.forEach(([playerName, assists]) => {
        message += `${playerName}: ${assists} 𝙖𝙨𝙞𝙨𝙩𝙚𝙣𝙘𝙞𝙖𝙨\n`;
    });

    room.sendAnnouncement(message, player.id, colors.bot, "bold", 2);
}

function getRandomNumber() {
    const range1 = Array.from({ length: 8 }, (_, i) => i + 1); // 1-8
    const range2 = Array.from({ length: 6 }, (_, i) => i + 9); // 9-14
    const range3 = Array.from({ length: 16 }, (_, i) => i + 15); // 15-30

    const random = Math.random();
    let selectedRange;

    if (random < 0.25) {
        selectedRange = range1;
    } else if (random < 0.85) { // 0.25 + 0.60 = 0.85
        selectedRange = range2;
    } else {
        selectedRange = range3;
    }

    return selectedRange[Math.floor(Math.random() * selectedRange.length)];
}

function handleMemideCommand(player) {
    const currentTime = Date.now();
    const lastTime = lastMemideTime.get(player.id) || 0;

    if (currentTime - lastTime < 300000) { // 5 minutos en milisegundos
        const remainingTime = Math.ceil((300000 - (currentTime - lastTime)) / 1000);
        room.sendAnnouncement(`Debes esperar ${remainingTime} segundos antes de usar el comando !memide nuevamente.`, player.id, colors.bot, "bold", 2);
        return;
    }

    lastMemideTime.set(player.id, currentTime);
    const size = getRandomNumber();
    const randomMessages = [
        `A ${player.name} le mide la picha ${size} cm. Felicidades, campeón, tremendo logro... lástima que seas un hpta meme andante 🤡👏`,
        `Histórico: ${player.name} rompe récord con ${size} cm. Una pena que no sea en precisión de pases 😔⚽`,
        `${player.name} dice que son ${size} cm, pero yo lo vi jugar y dudo que pase de los 5 cm de confianza 🤨📏`,
        `Tranquilo, ${player.name}, aunque sean ${size} cm, lo importante es el corazón… y en eso tampoco destacas 😭💔`,
        `A ${player.name} le midieron ${size} cm. No sabemos si es mucho o poco, pero con esa precisión no cabecea ni un ladrillo 🤡⚽`,
        `Datos oficiales: ${player.name} reporta ${size} cm. No sabemos si es ventaja o desventaja, pero sigue fallando pases a dos metros 😭🔍`,
        `${player.name} con sus ${size} cm. Igual aquí lo que cuenta es el talento… y bueno, mejor no hablemos de eso 🤡⚽`,
        `${player.name} presume sus ${size} cm, pero dice que lo importante es cómo se usa. Curioso, porque en el server tampoco se nota mucho uso 🤨🔄`,
        `Dicen que a ${player.name} le midieron ${size} cm, pero aquí todos sabemos que lo importante es la técnica… y bueno, sigue en cero 🤡📉`,
        `Investigaciones revelan que ${player.name} tiene ${size} cm. El tamaño puede variar, pero lo que no cambia es su habilidad para tomar malas decisiones en el juego 🔬📊`,
        `A ${player.name} le midieron ${size} cm. No importa cuánto sea, lo importante es la seguridad en uno mismo… 😆`,
        `A ${player.name} le midieron ${size} cm. Si en la cancha compensara eso con talento, otro sería el cuento ⚽📉`,
        `${player.name} reveló su medida: ${size} cm. Honestamente, un dato irrelevante cuando seguimos esperando que juegue bien el malparido 🔄`,
        `${player.name} presume ${size} cm. Al final lo que importa es la actitud… y viendo su rendimiento, ahí tampoco hay mucho de qué hablar 😆📉`
    ];
    const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    room.sendAnnouncement(randomMessage, null, colors.bot, "bold", 2);
}

function handleFichajesTimeCommand(player, message) {
    const args = message.split(" ");
    if (args.length !== 2 || (args[1] !== "1" && args[1] !== "0")) {
        room.sendAnnouncement("Uso incorrecto. Usa !fichajestime 1 para activar o !fichajestime 0 para desactivar.", player.id, colors.bot, "bold", 2);
        return false;
    }

    if (!admins.has(player.id) && player.id !== creator) {
        room.sendAnnouncement("No tienes permiso para usar este comando.", player.id, colors.bot, "bold", 2);
        return false;
    }

    if (args[1] === "1") {
        mutePlayers();
        room.sendAnnouncement("🔔 ¡𝙀𝙡 𝙢𝙚𝙧𝙘𝙖𝙙𝙤 𝙙𝙚 𝙛𝙞𝙘𝙝𝙖𝙟𝙚𝙨 𝙚𝙨𝙩á 𝙖𝙘𝙩𝙞𝙫𝙤! 🔔\n𝙇𝙤𝙨 𝘿𝙏𝙨 𝙩𝙞𝙚𝙣𝙚𝙣 3 𝙢𝙞𝙣𝙪𝙩𝙤𝙨 𝙥𝙖𝙧𝙖 𝙧𝙚𝙖𝙡𝙞𝙯𝙖𝙧 𝙩𝙪𝙨 𝙢𝙤𝙫𝙞𝙢𝙞𝙚𝙣𝙩𝙤𝙨. 🕒", null, colors.bot, "bold", 2);
        
        // Recordatorio después de 1 minuto y 30 segundos
        setTimeout(() => {
            room.sendAnnouncement("⏰ ¡Ｑｕｅｄａ １ ｍｉｎｕｔｏ ｙ ３０ ｓｅｇｕｎｄｏｓ！ ⏰\ｎ¡Ｄｅｎｓｅ ｐｒｉｓａ ｅｎ ｈａｃｅｒ ｆｉｃｈａｊｅｓ， ｅｌ ｔｉｅｍｐｏ ｓｅ ａｃａｂａ！ 🕒", null, colors.bot, "bold", 2);
        }, 90000); // 1 minuto y 30 segundos en milisegundos

        fichajesTimeout = setTimeout(() => {
            room.stopGame();
            unmutePlayers();
            room.sendAnnouncement("⏰ 𝙀𝙡 𝙢𝙚𝙧𝙘𝙖𝙙𝙤 𝙙𝙚 𝙛𝙞𝙘𝙝𝙖𝙟𝙚𝙨 𝙝𝙖 𝙩𝙚𝙧𝙢𝙞𝙣𝙖𝙙𝙤.⏰ \n𝙝𝙖𝙘𝙚𝙧 𝙛𝙞𝙘𝙝𝙖𝙟𝙚𝙨 ❌ \n𝙝𝙖𝙗𝙡𝙖𝙧 𝙢𝙞𝙚𝙧𝙙𝙖 ✅", null, colors.bot, "bold", 2);
        }, 180000); // 3 minutos en milisegundos
    } else if (args[1] === "0") {
        clearTimeout(fichajesTimeout);
        room.stopGame();
        unmutePlayers();
        room.sendAnnouncement("⏰ 𝙀𝙡 𝙢𝙚𝙧𝙘𝙖𝙙𝙤 𝙙𝙚 𝙛𝙞𝙘𝙝𝙖𝙟𝙚𝙨 𝙝𝙖 𝙩𝙚𝙧𝙢𝙞𝙣𝙖𝙙𝙤.⏰ \n𝙝𝙖𝙘𝙚𝙧 𝙛𝙞𝙘𝙝𝙖𝙟𝙚𝙨 ❌ \n𝙝𝙖𝙗𝙡𝙖𝙧 𝙢𝙞𝙚𝙧𝙙𝙖 ✅", null, colors.bot, "bold", 2);
    }
    return false;
}

function handleDTAvatarRequest(player, message) {
    const currentTime = Date.now();
    if (currentTime - lastAvatarRequestTime < 120000) { // 2 minutos en milisegundos
        room.sendAnnouncement("Debes esperar 2 minutos antes de usar este comando nuevamente.", player.id, colors.bot, "bold", 2);
        return;
    }

    lastAvatarRequestTime = currentTime;

    setTimeout(() => {
        room.getPlayerList().forEach(player => {
            const position = playerPositions.get(player.id) || "N/A"; // Obtener la posición del jugador

            // Cambiar el avatar del jugador a su posición
            room.setPlayerAvatar(player.id, position);

            // Restaurar el avatar a null después de 3 segundos
            setTimeout(() => {
                if (player.id === dts.red) {
                    room.setPlayerAvatar(player.id, "👔"); // Restaurar avatar de DT rojo
                } else if (player.id === dts.blue) {
                    room.setPlayerAvatar(player.id, "👔"); // Restaurar avatar de DT azul
                } else {
                    room.setPlayerAvatar(player.id, null);
                }
            }, 3000);
        });
    }, 5000); // Esperar 5 segundos antes de cambiar los avatares
}

function handleSetCreatorCommand(player, message) {
    if (player.id !== creator) {
        room.sendAnnouncement("No tienes permiso para usar este comando.15", player.id, colors.bot, "bold", 2);
        return false;
    }

    const args = message.split(" ");
    if (args.length !== 2) {
        room.sendAnnouncement("Uso incorrecto. Usa !setcreator [ID] o !setcreator 0 para quitar.", player.id, colors.bot, "bold", 2);
        return false;
    }

    const newCreatorId = parseInt(args[1], 10);

    if (newCreatorId === 0) {
        // Remove admin rights from the current creator
        room.setPlayerAdmin(creator, false);
        creator = null;
        room.sendAnnouncement("El rol de creador ha sido removido.", null, colors.bot, "bold", 2);
        return false;
    }

    const newCreator = room.getPlayer(newCreatorId);

    if (!newCreator) {
        room.sendAnnouncement("Jugador no encontrado.", player.id, colors.bot, "bold", 2);
        return false;
    }

    // Remove admin rights from the current creator
    room.setPlayerAdmin(creator, false);

    // Set the new creator
    creator = newCreator.id;
    admins.add(newCreator.id);
    room.setPlayerAdmin(newCreator.id, true);

    room.sendAnnouncement(`${newCreator.name} es ahora el creador.`, null, colors.bot, "bold", 2);
    return false;
}

function handleHosterCommand(player, message) {
    // Verificar si el jugador que envía el comando es el creador
    if (player.id !== creator) {
        room.sendAnnouncement("Solo el creador puede usar este comando.", player.id, colors.bot, "bold", 2);
        return;
    }

    // Dividir el mensaje en partes
    const args = message.split(" ");
    if (args.length !== 2) {
        room.sendAnnouncement("Uso incorrecto del comando. Usa !hoster [ID]", player.id, colors.bot, "bold", 2);
        return;
    }

    // Obtener el ID del jugador al que se le asignará el rol de hoster
    const targetPlayerId = parseInt(args[1], 10);
    const targetPlayer = room.getPlayer(targetPlayerId);

    if (!targetPlayer) {
        room.sendAnnouncement("Jugador no encontrado.", player.id, colors.bot, "bold", 2);
        return;
    }

    // Asignar el rol de hoster al jugador y darle permisos de administrador
    hosters.add(targetPlayer.id);
    room.setPlayerAdmin(targetPlayer.id, true);
    room.sendAnnouncement(`${targetPlayer.name} ha sido asignado como hoster y ahora tiene permisos de administrador.`, null, colors.bot, "bold", 2);
}

function updatePlayerRoles() {
    room.getPlayerList().forEach(player => {
        let color;

        if (player.id === creator) {
            color = colors.creator;
            room.setPlayerAdmin(player.id, true); // Asegura que el creador siempre tenga permisos de administrador
        } else if (admins.has(player.id)) {
            color = colors.admin;
            room.setPlayerAdmin(player.id, true); // Asegura que los administradores siempre tengan permisos de administrador
        } else if (player.id === dts.red) {
            color = colors.dtRed;
            room.setPlayerAvatar(player.id, "👔"); // Establecer avatar para DT rojo
            room.setPlayerAdmin(player.id, true); // Asegura que el DT rojo tenga permisos de administrador
        } else if (player.id === dts.blue) {
            color = colors.dtBlue;
            room.setPlayerAvatar(player.id, "👔"); // Establecer avatar para DT azul
            room.setPlayerAdmin(player.id, true); // Asegura que el DT azul tenga permisos de administrador
        } else if (player.id === captains.red) {
            color = colors.captainRed;
            room.setPlayerAvatar(player.id, "ⓒ"); // Establecer avatar para Capitán rojo
            room.sendAnnouncement(`${player.name} es el capitán del equipo rojo.`, player.id, colors.captainRed, "bold", 2);
        } else if (player.id === captains.blue) {
            color = colors.captainBlue;
            room.setPlayerAvatar(player.id, "ⓒ"); // Establecer avatar para Capitán azul
            room.sendAnnouncement(`${player.name} es el capitán del equipo azul.`, player.id, colors.captainBlue, "bold", 2);
        } else if (player.team === 1) {
            color = colors.playerRed;
        } else if (player.team === 2) {
            color = colors.playerBlue;
        } else {
            color = colors.spectator;
        }
    });
}
let ballTouchHistory = [];

function handlePosicionRequestCommand(player, message) {
    if (message === "!asignposicion" && (player.id === creator || admins.has(player.id))) {
        room.sendAnnouncement("Comando !asignposicion recibido. Procesando...", player.id);

        // Obtener la lista de jugadores excluyendo al bot y aquellos que ya tienen una posición asignada
        const players = room.getPlayerList().filter(p => p.id !== 0 && !playerPositions.has(p.id));
        if (players.length === 0) {
            room.sendAnnouncement("Todos los jugadores ya tienen una posición asignada.", player.id);
            return;
        }

        pendingPlayers = new Set(players.map(p => p.id)); // Actualizar la variable global pendingPlayers

        // Solicitar la posición a cada jugador
        players.forEach(p => {
            room.sendAnnouncement(`@${p.name}, por favor ingresa tu posición:`, p.id);
        });
        room.sendAnnouncement("Esperando posiciones de los jugadores...");

        // Asignar posiciones aleatorias después de 20 segundos si no responden
        setTimeout(() => {
            pendingPlayers.forEach(id => {
                const p = room.getPlayer(id);
                if (p && !playerPositions.has(p.id) && !authPlayers.has(p.id)) { // Verificar si el jugador no tiene posición asignada por auth
                    const randomPosicion = POSICIONES[Math.floor(Math.random() * POSICIONES.length)];
                    playerPositions.set(p.id, randomPosicion);
                    room.sendAnnouncement(`No se recibió respuesta. ${p.name} asignado a ${randomPosicion}.`, p.id);
                }
            });
        }, 10000); // 20 segundos
    } else {
        room.sendAnnouncement("No tienes permiso para usar este comando.16", player.id);
    }
}




function getPlayerNameWithRole(player) {
    let nameWithRole = player.name;
    let position = getPlayerPosition(player); // Obtener la posición del jugador

    if (player.id === creator) {
        nameWithRole += " (𝘒𝘐𝘕𝘎)";
    } else if (player.id === dts.red || player.id === dts.blue) {
        nameWithRole += " (𝐃𝐓)";
    } else if (admins.has(player.id)) {
        nameWithRole += " (𝙎𝙏𝘼𝙁𝙁)";
    } else if (player.id === captains.red) {
        nameWithRole += " (𝘾𝘼𝙋𝙄𝙏𝘼𝙉)";
    } else if (player.id === captains.blue) {
        nameWithRole += " (ᴄᴀᴘᴛᴀɪɴ)";
    } else if (mvps.has(player.id)) {
        nameWithRole += " (𝙈𝙑𝙋)";
    } else if (vips.has(player.id)) {
        nameWithRole += " (𝙑𝙄𝙋)";
    } else if (referees.has(player.id)) {
        nameWithRole += " (𝘼𝙧𝙗𝙞𝙩𝙧𝙤)";
    } else if (hosters.has(player.id)) {
        nameWithRole += " (𝙃𝙤𝙨𝙩𝙚𝙧)";
    }

    // Añadir la posición del jugador al nombre
    nameWithRole = `[${position}] ${nameWithRole}`;

    return nameWithRole;
}

function setPlayerPosition(player, posicion) {
    // Guardar la posición del jugador en el mapa
    playerPositions.set(player.id, posicion);

    // Anunciar la nueva posición del jugador
    room.sendAnnouncement(`${player.name} 𝐡𝐚 𝐬𝐢𝐝𝐨 𝐚𝐬𝐢𝐠𝐧𝐚𝐝𝐨 𝐚 𝐥𝐚 𝐩𝐨𝐬𝐢𝐜𝐢ó𝐧 ${posicion}.`, null, colors.bot, "bold", 2);
}

function getPlayerPosition(player) {
    return playerPositions.get(player.id) || "N/A";
}

room.onPlayerBallKick = function(player) {
    lastTouchPlayer = player;
    ballTouchHistory.push(player);

    // Limitar el historial a los últimos 10 toques
    if (ballTouchHistory.length > 10) {
        ballTouchHistory.shift();
    }

    const team = player.team;
    if (team === 1) {
        matchStats.redPossession++;
    } else if (team === 2) {
        matchStats.bluePossession++;
    }
};
function getGoalScorerMessage(goalScorer, assistant, team, opponentTeam) {
    let teamName = team === 1 ? "𝙍𝙀𝘿" : "𝘽𝙇𝙐𝙀";
    let opponentTeamName = opponentTeam === 1 ? "𝙍𝙀𝘿" : "𝘽𝙇𝙐𝙀";
    let message = goalMessages[Math.floor(Math.random() * goalMessages.length)];

    // Verificar si goalScorer es nulo
    const goalScorerName = goalScorer ? goalScorer.name : "un random";
    let assistantName = assistant ? assistant.name : "otro random";

    // Si el asistente es del equipo contrario, mostrar el nombre del goleador nuevamente
    if (assistant && assistant.team !== team) {
        assistantName = goalScorerName;
    }

    // Reemplazar todas las ocurrencias de [scorer], [assistant], [team] y [opponentTeam]
    message = message.replace(/\[scorer\]/g, goalScorerName);
    message = message.replace(/\[assistant\]/g, assistantName);
    message = message.replace(/\[team\]/g, teamName);
    message = message.replace(/\[opponentTeam\]/g, opponentTeamName);
    
    return message;
}

function getOwnGoalMessage(goalScorer, team, opponentTeam) {
    let teamName = team === 1 ? "𝙍𝙀𝘿" : "𝘽𝙇𝙐𝙀";
    let opponentTeamName = opponentTeam === 1 ? "𝙍𝙀𝘿" : "𝘽𝙇𝙐𝙀";
    let message = ownGoalMessages[Math.floor(Math.random() * ownGoalMessages.length)];

    // Reemplazar todas las ocurrencias de [scorer], [team] y [opponentTeam]
    message = message.replace(/\[scorer\]/g, goalScorer.name);
    message = message.replace(/\[team\]/g, teamName);
    message = message.replace(/\[opponentTeam\]/g, opponentTeamName);
    
    return message;
}

function getRandomSpeed() {
    const range1 = Array.from({ length: 9 }, (_, i) => i + 1); // 1-9
    const range2 = Array.from({ length: 10 }, (_, i) => i + 10); // 10-19
    const range3 = Array.from({ length: 31 }, (_, i) => i + 20); // 20-50
    const range4 = Array.from({ length: 51 }, (_, i) => i + 50); // 51-100

    const random = Math.random();
    let selectedRange;

    if (random < 0.05) {
        selectedRange = range1;
    } else if (random < 0.15) {
        selectedRange = range2;
    } else if (random < 0.95) {
        selectedRange = range3;
    } else {
        selectedRange = range4;
    }

    return selectedRange[Math.floor(Math.random() * selectedRange.length)];
}

room.onTeamGoal = function(team) {
    const ballPosition = room.getBallPosition();
    const randomSpeed = getRandomSpeed();
    let goalScorer = ballTouchHistory[ballTouchHistory.length - 1];
    let assistant = ballTouchHistory.length > 1 ? ballTouchHistory[ballTouchHistory.length - 2] : null;
    let message;

    let opponentTeam = team === 1 ? 2 : 1; // Determinar el equipo oponente

    if (goalScorer.team === team) {
        message = getGoalScorerMessage(goalScorer, assistant, team, opponentTeam);
    } else {
        message = getOwnGoalMessage(goalScorer, team, opponentTeam);
        goalScorer = null; // No contar autogoles en la gala de mejores goleadores
        assistant = null; // No contar autogoles en la gala de mejores asistentes
    }

    // Calcular el minuto y segundo del gol
    const gameTime = room.getScores().time;
    const minutes = Math.floor(gameTime / 60);
    const seconds = Math.floor(gameTime % 60);
    message += `\n𝙈𝙄𝙉𝙐𝙏𝙊 𝘿𝙀𝙇 𝙂𝙊𝙇: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    room.sendAnnouncement(message, null, colors.bot, "bold", 2);

    // Añadir el mensaje de la velocidad del balón
    room.sendAnnouncement(`𝙑𝙀𝙇𝙊𝘾𝙄𝘿𝘼𝘿 𝘿𝙀𝙇 𝙂𝙊𝙇⚡: ${randomSpeed} 𝙠𝙢/𝙝`, null, 0xFFFFFF, "bold", 2);

    // Registrar el gol en el mapa de goleadores
    if (goalScorer) {
        if (goalScorers.has(goalScorer.name)) {
            goalScorers.set(goalScorer.name, goalScorers.get(goalScorer.name) + 1);
        } else {
            goalScorers.set(goalScorer.name, 1);
        }
    }

    // Registrar la asistencia en el mapa de asistentes
    if (assistant) {
        if (assistants.has(assistant.name)) {
            assistants.set(assistant.name, assistants.get(assistant.name) + 1);
        } else {
            assistants.set(assistant.name, 1);
        }
    }

    if (penalesActivo) {
        const equipo = team === 1 ? "red" : "blue";
        manejarGol(equipo);
        setTimeout(cambiarMapa, 5000); // Esperar 5 segundos antes de cambiar de mapa
    }

    if (isIda) {
        if (team === 1) {
            matchStats.ida.redScore++;
        } else {
            matchStats.ida.blueScore++;
        }
    } else {
        if (team === 1) {
            matchStats.vuelta.redScore++;
        } else {
            matchStats.vuelta.blueScore++;
        }
    }

    const globalRedScore = matchStats.ida.redScore + matchStats.vuelta.redScore;
    const globalBlueScore = matchStats.ida.blueScore + matchStats.vuelta.blueScore;
    room.sendAnnouncement(`𝙂𝙡𝙤𝙗𝙖𝙡: 𝙍𝙀𝘿 ${globalRedScore} - ${globalBlueScore} 𝘽𝙇𝙐𝙀`, null, colors.bot, "bold", 2);

    // Cambiar avatares temporalmente
    cambiarAvataresTemporalmente(goalScorer, assistant, team, opponentTeam);

    // Mute players who are not the creator
    mutePlayersAfterGoal();

};

function cambiarAvataresTemporalmente(goalScorer, assistant, team, opponentTeam) {
    const DURACION_TOTAL = 5000; 
    const INTERVALO_CAMBIO = 1000;
    let ciclos = 0;
    const maxCiclos = DURACION_TOTAL / INTERVALO_CAMBIO;

    // Almacenar avatares originales y estados
    const avataresOriginales = new Map();
    const estadosAvatares = new Map();

    // Listas de emojis para goalScorer y assistant
    const goalScorerEmojis = ["⚽️", "ɢɢ", "9️⃣", "🤌"];
    const assistantEmojis = ["🅰️", "🗿", "🔟", "👌"];

    // Configurar avatares iniciales
    const configurarAvatar = (player, avatarEspecial) => {
        if (!player) return;
        avataresOriginales.set(player.id, player.avatar);
        estadosAvatares.set(player.id, {
            original: player.avatar,
            especial: avatarEspecial,
            mostrarEspecial: true
        });
        room.setPlayerAvatar(player.id, avatarEspecial);
    };

    // Aplicar a todos los jugadores relevantes
    if (goalScorer) configurarAvatar(goalScorer, goalScorerEmojis[0]);
    if (assistant) configurarAvatar(assistant, assistantEmojis[0]);
    
    // DT rival
    const dtRival = team === 1 ? room.getPlayer(dts.blue) : room.getPlayer(dts.red);
    if (dtRival) configurarAvatar(dtRival, "🤬");

    const avatars = ["☠️", "💩", "😓", "❓", "💀", "😤", "😐", "😬", "😵‍💫", "-5", "-1"];
    room.getPlayerList().forEach(player => {
        if (player.team === opponentTeam && player.id !== (dtRival?.id || null)) {
            const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
            configurarAvatar(player, randomAvatar);
        }
    });

    // Intervalo para el efecto de parpadeo
    const intervalo = setInterval(() => {
        ciclos++;
        
        estadosAvatares.forEach((estado, id) => {
            const player = room.getPlayer(id);
            if (!player) return;

            let nuevoAvatar;
            if (id === goalScorer?.id) {
                nuevoAvatar = goalScorerEmojis[ciclos % goalScorerEmojis.length];
            } else if (id === assistant?.id) {
                nuevoAvatar = assistantEmojis[ciclos % assistantEmojis.length];
            } else {
                nuevoAvatar = estado.mostrarEspecial ? estado.original : estado.especial;
            }

            room.setPlayerAvatar(id, nuevoAvatar);
            estadosAvatares.set(id, {
                ...estado,
                mostrarEspecial: !estado.mostrarEspecial
            });
        });

        // Finalizar después de 2 segundos
        if (ciclos >= maxCiclos) {
            clearInterval(intervalo);
            avataresOriginales.forEach((avatar, id) => {
                const player = room.getPlayer(id);
                if (player) room.setPlayerAvatar(id, avatar);
            });
        }
    }, INTERVALO_CAMBIO);
}

function manejarGol(equipo) {
    if (penalesActivo) {
        penalesMarcador[equipo]++;
        // Desactivar el mensaje después de cada gol
        // room.sendAnnouncement(`Gol de ${equipo}. Marcador: ${penalesMarcador.red} - ${penalesMarcador.blue}`, null, colors.bot, "bold", 2);
    }
}

function determinarCampeonPenales() {
    if (penalesMarcador.red > penalesMarcador.blue) {
        room.sendAnnouncement("¡El equipo Rojo es el campeón de los penales!", null, colors.bot, "bold", 2);
    } else if (penalesMarcador.blue > penalesMarcador.red) {
        room.sendAnnouncement("¡El equipo Azul es el campeón de los penales!", null, colors.bot, "bold", 2);
    } else {
        room.sendAnnouncement("¡Los penales han terminado en empate!", null, colors.bot, "bold", 2);
    }
    penalesActivo = false;
    penalesMarcador = { red: 0, blue: 0 };
}

function mutePlayersAfterGoal() {
    room.getPlayerList().forEach(player => {
        if (player.id !== creator && !mutedPlayers.has(player.id)) {
            mutedPlayers.set(player.id, Date.now() + 5000); // Muteo general de 5 segundos
        }
    });
    setTimeout(unmutePlayers, 5000); // Desmute players after 5 seconds
}

room.onGameTick = function() {
    if (matchStarted) {
        const ballPosition = room.getBallPosition();
        if (ballPosition.x < 0) {
            matchStats.ballInRedArea++;
        } else {
            matchStats.ballInBlueArea++;
        }
        matchStats.totalGameTime++;
    }
};

function showFinalResult() {
    const globalRedScore = matchStats.ida.redScore + matchStats.vuelta.redScore;
    const globalBlueScore = matchStats.ida.blueScore + matchStats.vuelta.blueScore;

    // Mostrar el resultado del partido (if)
    let resultadoPartido;
    if (globalRedScore > globalBlueScore) {
        resultadoPartido = "¡𝐅𝐞𝐥𝐢𝐜𝐢𝐝𝐚𝐝𝐞𝐬 𝐚𝐥 𝐞𝐪𝐮𝐢𝐩𝐨 𝐑𝐨𝐣𝐨, \n𝐝𝐨𝐦𝐚𝐫𝐨𝐧 𝐚𝐥 𝐚𝐳𝐮𝐥 𝐜𝐨𝐦𝐨 𝐬𝐢𝐞𝐦𝐩𝐫𝐞! 🏆🎉  \n 𝐇𝐨𝐲 𝐝𝐞𝐦𝐨𝐬𝐭𝐫𝐚𝐫𝐨𝐧 𝐪𝐮𝐞 𝐧𝐨 𝐡𝐚𝐲 𝐪𝐮𝐢𝐞𝐧 𝐥𝐞𝐬 𝐡𝐚𝐠𝐚 𝐬𝐨𝐦𝐛𝐫𝐚 𝐞𝐧 𝐞𝐥 𝐜𝐚𝐦𝐩𝐨. \n💥⚽ 𝐄𝐥 𝐚𝐳𝐮𝐥, 𝐩𝐨𝐫 𝐦á𝐬 𝐪𝐮𝐞 𝐥𝐨 𝐢𝐧𝐭𝐞𝐧𝐭ó, 𝐧𝐨 𝐩𝐮𝐝𝐨 𝐜𝐨𝐧𝐭𝐫𝐚 𝐞𝐥 𝐟𝐮𝐞𝐠𝐨 𝐝𝐞𝐥 𝐑𝐨𝐣𝐨. 🔥🔥 \n ¡𝐕𝐢𝐜𝐭𝐨𝐫𝐢𝐚 𝐜𝐨𝐧𝐭𝐮𝐧𝐝𝐞𝐧𝐭𝐞, 𝐚 𝐬𝐞𝐠𝐮𝐢𝐫 𝐬𝐮𝐦𝐚𝐧𝐝𝐨! 🙌";
    } else if (globalRedScore < globalBlueScore) {
        resultadoPartido = "¡𝘍𝘦𝘭𝘪𝘤𝘪𝘥𝘢𝘥𝘦𝘴 𝘢𝘭 𝘦𝘲𝘶𝘪𝘱𝘰 𝘈𝘻𝘶𝘭, \n𝘭𝘰𝘴 𝘳𝘰𝘫𝘰𝘴 𝘢𝘣𝘢𝘯𝘥𝘰𝘯𝘢𝘳𝘰𝘯 𝘤𝘰𝘮𝘰 𝘴𝘪𝘦𝘮𝘱𝘳𝘦! 🏆🎉 𝘏𝘰𝘺 𝘴𝘦 𝘥𝘦𝘮𝘰𝘴𝘵𝘳ó 𝘲𝘶𝘦 𝘦𝘭 𝘢𝘻𝘶𝘭 𝘵𝘪𝘦𝘯𝘦 𝘭𝘰 𝘯𝘦𝘤𝘦𝘴𝘢𝘳𝘪𝘰 𝘱𝘢𝘳𝘢 𝘮𝘢𝘯𝘵𝘦𝘯𝘦𝘳𝘴𝘦 𝘧𝘪𝘳𝘮𝘦, \n𝘮𝘪𝘦𝘯𝘵𝘳𝘢𝘴 𝘭𝘰𝘴 𝘳𝘰𝘫𝘰𝘴 𝘴𝘦 𝘥𝘦𝘴𝘪𝘯𝘧𝘭𝘢𝘳𝘰𝘯 𝘳á𝘱𝘪𝘥𝘢𝘮𝘦𝘯𝘵𝘦. 💥⚽ ¡𝘎𝘳𝘢𝘯 𝘷𝘪𝘤𝘵𝘰𝘳𝘪𝘢 𝘱𝘢𝘳𝘢 𝘦𝘭 𝘦𝘲𝘶𝘪𝘱𝘰 𝘈𝘻𝘶𝘭, 𝘲𝘶𝘦 𝘴𝘪𝘨𝘢 𝘭𝘢 𝘧𝘪𝘦𝘴𝘵𝘢! 🙌💙";
    } else {
        resultadoPartido = "¡𝐄𝐬 𝐮𝐧 𝐞𝐦𝐩𝐚𝐭𝐞 🤝,\n 𝐕𝐀𝐌𝐎𝐒 𝐀 𝐏𝐄𝐍𝐀𝐋𝐄𝐒! ⚽🥅 \n𝐏𝐫𝐞𝐩𝐚𝐫𝐞𝐧 𝐞𝐬𝐨𝐬 𝐜𝐮𝐥𝐨𝐬, 𝐪𝐮𝐞 𝐬𝐞 𝐯𝐢𝐞𝐧𝐞𝐧 𝐥𝐨𝐬 𝐜𝐥𝐢𝐩𝐬. 🎥🔥 𝐄𝐬𝐭𝐨 𝐬𝐞 𝐩𝐨𝐧𝐞 𝐦á𝐬 𝐜𝐚𝐥𝐢𝐞𝐧𝐭𝐞 𝐪𝐮𝐞 𝐧𝐮𝐧𝐜𝐚, ¡𝐧𝐨 𝐡𝐚𝐲 𝐦𝐚𝐫𝐜𝐡𝐚 𝐚𝐭𝐫á𝐬! 😤💥";
    }

    // Mostrar el resultado del partido
    room.sendAnnouncement(resultadoPartido, null, colors.botGold, "bold", 2);

    // Esperar 2 segundos antes de mostrar los goleadores y asistentes
    setTimeout(() => {
        // Obtener los dos jugadores con más goles
        const topScorers = Array.from(goalScorers.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 2);

        // Obtener los dos jugadores con más asistencias
        const topAssistants = Array.from(assistants.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 2);

        let message = "𝙂𝘼𝙇𝘼\n\n";

        message += "𝙂𝙊𝙇𝙀𝘼𝘿𝙊𝙍𝙀𝙎\n";
        topScorers.forEach(([player, goals]) => {
            message += `${player}: ${goals} 𝙜𝙤𝙡𝙚𝙨\n`;
        });

        message += "\n𝘼𝙎𝙄𝙎𝙏𝙀𝙉𝙏𝙀𝙎\n";
        topAssistants.forEach(([player, assists]) => {
            message += `${player}: ${assists} 𝙖𝙨𝙞𝙨𝙩𝙚𝙣𝙘𝙞𝙖𝙨\n`;
        });

        // Mostrar los goleadores y asistentes
        room.sendAnnouncement(message, null, colors.bot, "bold", 2);

        // Esperar otros 2 segundos antes de mostrar las estadísticas del partido
        setTimeout(() => {
            const totalGameTime = matchStats.totalGameTime;
            const redAreaPercentage = ((matchStats.ballInRedArea / totalGameTime) * 100).toFixed(2);
            const blueAreaPercentage = ((matchStats.ballInBlueArea / totalGameTime) * 100).toFixed(2);
            const redPossessionPercentage = ((matchStats.redPossession / (matchStats.redPossession + matchStats.bluePossession)) * 100).toFixed(2);
            const bluePossessionPercentage = ((matchStats.bluePossession / (matchStats.redPossession + matchStats.bluePossession)) * 100).toFixed(2);

            let estadisticasPartido = `𝙍𝙚𝙨𝙪𝙡𝙩𝙖𝙙𝙤 𝙁𝙞𝙣𝙖𝙡:\n𝙍𝙀𝘿 ${globalRedScore} - ${globalBlueScore} 𝘽𝙇𝙐𝙀\n`;
            estadisticasPartido += `Á𝙧𝙚𝙖𝙨 𝙙𝙚 𝙟𝙪𝙚𝙜𝙤: \n𝙍𝙀𝘿 ${redAreaPercentage}% - 𝘽𝙇𝙐𝙀 ${blueAreaPercentage}%\n`;
            estadisticasPartido += `𝙋𝙤𝙨𝙚𝙨𝙞ó𝙣 𝙙𝙚 𝙗𝙖𝙡ó𝙣: \n𝙍𝙀𝘿 ${redPossessionPercentage}% - 𝘽𝙇𝙐𝙀 ${bluePossessionPercentage}%\n`;

            // Mostrar las estadísticas del partido
            room.sendAnnouncement(estadisticasPartido, null, colors.botGold, "bold", 2);
        }, 2000); // 2 segundos después de los goleadores y asistentes
    }, 2000); // 2 segundos después del resultado del partido
}

room.onGameStop = function() {
    matchStarted = false;
    startTimedMatch = false;
    setTimeout(() => {
        const topScorers = Array.from(goalScorers.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2);

    // Obtener los dos jugadores con más asistencias
    const topAssistants = Array.from(assistants.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2);

    let message = "𝙂𝘼𝙇𝘼\n\n";

    message += "𝙂𝙊𝙇𝙀𝘼𝘿𝙊𝙍𝙀𝙎\n";
    topScorers.forEach(([player, goals]) => {
        message += `${player}: ${goals} 𝙜𝙤𝙡𝙚𝙨\n`;
    });

    message += "\n𝘼𝙎𝙄𝙎𝙏𝙀𝙉𝙏𝙀𝙎\n";
    topAssistants.forEach(([player, assists]) => {
        message += `${player}: ${assists} 𝙖𝙨𝙞𝙨𝙩𝙚𝙣𝙘𝙞𝙖𝙨\n`;
    });
    room.sendAnnouncement(message, null, colors.bot, "bold", 2);

        // Limpiar los mapas de goleadores y asistentes para el próximo partido
        goalScorers.clear();
        assistants.clear();
    }, 5000); // 4 segundos de retraso
    
    if (matchStarted) {
        matchStarted = false;
        const totalGameTime = matchStats.totalGameTime;
        const redAreaPercentage = ((matchStats.ballInRedArea / totalGameTime) * 100).toFixed(2);
        const blueAreaPercentage = ((matchStats.ballInBlueArea / totalGameTime) * 100).toFixed(2);
        const redPossessionPercentage = ((matchStats.redPossession / (matchStats.redPossession + matchStats.bluePossession)) * 100).toFixed(2);
        const bluePossessionPercentage = ((matchStats.bluePossession / (matchStats.redPossession + matchStats.bluePossession)) * 100).toFixed(2);

        room.sendAnnouncement(`Á𝙧𝙚𝙖𝙨 𝙙𝙚 𝙟𝙪𝙚𝙜𝙤: 𝙍𝙀𝘿 ${redAreaPercentage}% - 𝘽𝙇𝙐𝙀 ${blueAreaPercentage}%`, null, colors.botGold, "bold", 2);
        room.sendAnnouncement(`𝙋𝙤𝙨𝙚𝙨𝙞ó𝙣 𝙙𝙚 𝙗𝙖𝙡ó𝙣: 𝙍𝙀𝘿 ${redPossessionPercentage}% - 𝘽𝙇𝙐𝙀 ${bluePossessionPercentage}%`, null, colors.botGold, "bold", 2);

        if (!isIda) {
            showFinalResult(); // Mostrar el resultado final después del segundo partido (vuelta)
        }
    }

    
}

function balanceTeams() {
    const players = room.getPlayerList();
    let redCount = 0;
    let blueCount = 0;

    // Count the number of players in each team, excluding AFK players
    players.forEach(player => {
        if (afkPlayers.has(player.id)) return; // Skip AFK players
        if (player.team === 1) {
            redCount++;
        } else if (player.team === 2) {
            blueCount++;
        }
    });

    // Move players from spectators to the team with fewer players, excluding AFK players
    players.forEach(player => {
        if (afkPlayers.has(player.id)) return; // Skip AFK players
        if (player.team === 0) {
            if (redCount < blueCount) {
                room.setPlayerTeam(player.id, 1);
                redCount++;
            } else if (blueCount < redCount) {
                room.setPlayerTeam(player.id, 2);
                blueCount++;
            } else {
                room.setPlayerTeam(player.id, 1);
                redCount++;
            }
        }
    });
}

function autoBalanceTeams() {
    if (autoBalanceEnabled) {
        balanceTeams();
    }
}

function setTeamsLock() {
    room.setTeamsLock(true);
}



setTeamsLock();



// Función para iniciar la tanda de penales
function iniciarPenales(modo, equipo) {
    penalesActivo = true;
    penalesModo = modo;
    penalesTurno = equipo;
    penalesMarcador = { red: 0, blue: 0 };
    room.sendAnnouncement(`Tanda de penales iniciada. Modo: ${modo}. Turno: ${equipo}.`, null, colors.bot, "bold", 2);
}

// Función para finalizar la tanda de penales
function finalizarPenales() {
    penalesActivo = false;
    penalesModo = null;
    penalesTurno = null;
    room.sendAnnouncement(`Tanda de penales finalizada. Resultado: Red ${penalesMarcador.red} - ${penalesMarcador.blue} Blue.`, null, colors.bot, "bold", 2);
}

// Función para manejar los goles durante la tanda de penales
function manejarGol(equipo) {
    if (penalesActivo) {
        if (penalesTurno === equipo) {
            penalesMarcador[equipo]++;
            room.sendAnnouncement(`Gol de ${equipo}. Tanda de penales: Red ${penalesMarcador.red} - ${penalesMarcador.blue} Blue.`, null, colors.bot, "bold", 2);
        } else {
            room.sendAnnouncement(`lo que se erro este hijo de puta.`, null, colors.bot, "bold", 2);
        }
    }
}

function handleIncognitoCommand(player, message) {
    const currentTime = Date.now();
    const lastTime = lastIncognitoTime.get(player.id) || 0;
    if (currentTime - lastTime < 60000) { // 1 minuto de cooldown
        room.sendAnnouncement("Debes esperar un minuto antes de usar el comando !incognito nuevamente.", player.id, colors.bot, "bold", 2);
        return;
    }
    lastIncognitoTime.set(player.id, currentTime);
    const args = message.split(" ");
    if (args.length < 2) {
        room.sendAnnouncement("Uso incorrecto del comando. Usa !incognito [mensaje].", player.id, colors.bot, "bold", 2);
        return;
    }
    const incognitoMessage = args.slice(1).join(" ");
    room.sendAnnouncement(`𝙄𝙉𝘾𝙊𝙂𝙉𝙄𝙏𝙊👻: ${incognitoMessage}`, null, colors.bot, "bold", 2);
}

function handleWhisperCommand(player, message) {
    const args = message.split(" ");
    if (args.length < 3) {
        room.sendAnnouncement("Uso incorrecto. Usa !whisper [ID] [mensaje].", player.id, colors.bot, "bold", 2);
        return;
    }

    const targetId = parseInt(args[1], 10);
    const targetPlayer = room.getPlayer(targetId);
    if (!targetPlayer) {
        room.sendAnnouncement("Jugador no encontrado.", player.id, colors.bot, "bold", 2);
        return;
    }

    const whisperMessage = args.slice(2).join(" ");
    const teamColor = player.team === 1 ? colors.dtRed : colors.dtBlue;
    const messageToSend = `★彡[ᴅᴍ ${player.name}]彡★: ${whisperMessage}`;

    // Enviar el mensaje al jugador objetivo
    room.sendAnnouncement(messageToSend, targetPlayer.id, teamColor, "bold", 2);
    // Enviar el mensaje al jugador que lo envió
    room.sendAnnouncement(messageToSend, player.id, teamColor, "bold", 2);
}

function iniciarVotacionEmpate() {
    if (votacionActiva) return; // Evitar iniciar múltiples votaciones

    votacionActiva = true;
    votosTiempoExtra.clear();
    votosPenales.clear();
    votosEmitidos.clear();

    room.sendAnnouncement("🔥⚽ ¡𝙀𝙈𝙋𝘼𝙏𝙀 𝙂𝙇𝙊𝘽𝘼𝙇! 🕒⚡ \n𝙎𝙀 𝙀𝙇𝙀𝙂𝙄𝙍𝙄𝘼 𝙋𝙊𝙍 𝙑𝙊𝙏𝘼𝘾𝙄Ó𝙉 𝙎𝙄 𝙅𝙐𝙂𝘼𝙈𝙊𝙎 𝙏𝙄𝙀𝙈𝙋𝙊 𝙀𝙓𝙏𝙍𝘼 🕐🔥 𝙊 𝙄𝙍 𝘿𝙄𝙍𝙀𝘾𝙏𝙊 𝘼 𝙇𝙊𝙎 𝙋𝙀𝙉𝘼𝙇𝙀𝙎 🎯💥", null, colors.bot, "bold", 2);
    room.sendAnnouncement("𝙀𝙎𝘾𝙍𝙄𝘽𝙀 '1' 🕒⚡ 𝙋𝘼𝙍𝘼 𝙑𝙊𝙏𝘼𝙍 𝙋𝙊𝙍 𝙏𝙄𝙀𝙈𝙋𝙊 𝙀𝙓𝙏𝙍𝘼 😏🔥  \n 𝙀𝙎𝘾𝙍𝙄𝘽𝙀 '2' 🎯💥 𝙋𝘼𝙍𝘼 𝙑𝙊𝙏𝘼𝙍 𝙋𝙊𝙍 𝙋𝙀𝙉𝘼𝙇𝙀𝙎🔥.", null, colors.botGold, "bold", 2);
    room.sendAnnouncement("𝙇𝘼 𝙑𝙊𝙏𝘼𝘾𝙄𝙊𝙉 𝘿𝙐𝙍𝘼𝙍𝘼 20 𝙎𝙀𝙂𝙐𝙉𝘿𝙊𝙎. ⏳", null, colors.bot, "bold", 2);

    // Configurar un temporizador para finalizar la votación después de 20 segundos
    setTimeout(finalizarVotacion, 20000);
}

function finalizarVotacion() {
    if (!votacionActiva) return;

    votacionActiva = false;

    const totalVotosTiempoExtra = votosTiempoExtra.size;
    const totalVotosPenales = votosPenales.size;

    let mensajeResultado;

    if (totalVotosTiempoExtra > totalVotosPenales) {
        mensajeResultado = "¡Tiempo extra activado! ⏳⚽ \n ¿Quieren más emoción? ¿Más tensión? Pues aquí lo tienen.\n Ahora a ver quién aguanta hasta el final 😤";
        // Aquí puedes agregar la lógica para iniciar el tiempo extra
    } else if (totalVotosPenales > totalVotosTiempoExtra) {
        mensajeResultado = "¡Se vienen los penales! 🥅⚽ \n Ahora es cuando necesitamos que el arquero entre en modo ARMANI,NEUR,BUFFON,CHIPI CHIPI Y DIBU AL MISMO TIEMPO, \n o nos toca rezar para que los rivales sean peores que nosotros 😭";
        // Aquí puedes agregar la lógica para iniciar los penales
    } else {
        mensajeResultado = "Votación empatada! 😱 \n De un lado, los que creen en la remontada en tiempo extra ⏳🔥. Del otro, los que confían en su arquero 🧤💥\n En el medio, los que no pueden ni mirar 👀💀. \n ¡Esto se va a poner feo! 😬⚽🔥";
        // Iniciar la decisión del creador
        iniciarDecisionCreador();
    }

    room.sendAnnouncement(mensajeResultado, null, colors.botGold, "bold", 2);
}

function iniciarDecisionCreador() {
    room.sendAnnouncement("¡Empate en la votación! El creador o host debe decidir entre tiempo extra o penales.", null, colors.bot, "bold", 2);
    room.sendAnnouncement("Creador, escribe '1' para tiempo extra o '2' para penales.", creator, colors.bot, "bold", 2);

    // Guardar la función original de onPlayerChat para restaurarla después
    const originalOnPlayerChat = room.onPlayerChat;

    // Sobrescribir onPlayerChat para capturar la decisión del creador
    room.onPlayerChat = function(player, message) {
        if (player.id === creator && (message === "1" || message === "2")) {
            if (message === "1") {
                room.sendAnnouncement("El creador ha decidido: ¡Tiempo extra! ⏳⚽", null, colors.bot, "bold", 2);
                // Aquí puedes agregar la lógica para iniciar el tiempo extra
            } else if (message === "2") {
                room.sendAnnouncement("El creador ha decidido: ¡Penales! 🥅⚽", null, colors.bot, "bold", 2);
                // Aquí puedes agregar la lógica para iniciar los penales
            }

            // Restaurar la función original de onPlayerChat
            room.onPlayerChat = originalOnPlayerChat;
            return false;
        }

        // Si no es el creador, continuar con el comportamiento normal
        return originalOnPlayerChat(player, message);
    };
}

function iniciarVotacionRepick() {
    if (votacionRepickActiva) return; // Evitar iniciar múltiples votaciones

    votacionRepickActiva = true;
    votosRepick.clear();
    votosNoRepick.clear();
    votosEmitidosRepick.clear();

    room.sendAnnouncement("🔄 ¡Votación para repick iniciada! 🔄", null, colors.bot, "bold", 2);
    room.sendAnnouncement("Escribe '1' para votar por repick. Escribe '2' para votar en contra del repick.", null, colors.botGold, "bold", 2);
    room.sendAnnouncement("La votación durará 20 segundos. ⏳", null, colors.bot, "bold", 2);

    // Configurar un temporizador para finalizar la votación después de 20 segundos
    setTimeout(finalizarVotacionRepick, 20000);
}

function finalizarVotacionRepick() {
    if (!votacionRepickActiva) return;

    votacionRepickActiva = false;

    const totalVotosRepick = votosRepick.size;
    const totalVotosNoRepick = votosNoRepick.size;

    let mensajeResultado;

    if (totalVotosRepick > totalVotosNoRepick) {
        mensajeResultado = "¡Repick activado! 🔄";
        repickTeams(); // Lógica para hacer el repick
    } else {
        mensajeResultado = "Repick cancelado. ❌";
    }

    room.sendAnnouncement(mensajeResultado, null, colors.botGold, "bold", 2);
}

function iniciarVotacionMVP() {
    if (votacionMVPActiva) {
        room.sendAnnouncement("Ya hay una votación de MVP en curso.", null, colors.mvp, "bold", 2);
        return;
    }

    votacionMVPActiva = true;
    votosMVP.clear();
    votosEmitidosMVP.clear();

    let players = room.getPlayerList().filter(player => player.id !== 0);
    let message = "🏆 ¡𝙑𝙤𝙩𝙖𝙘𝙞ó𝙣 𝙙𝙚 𝙈𝙑𝙋 𝙞𝙣𝙞𝙘𝙞𝙖𝙙𝙖! 🏆\n𝙀𝙨𝙘𝙧𝙞𝙗𝙚 𝙚𝙡 𝙄𝘿 𝙙𝙚𝙡 𝙟𝙪𝙜𝙖𝙙𝙤𝙧 𝙦𝙪𝙚 𝙘𝙧𝙚𝙚𝙨 𝙦𝙪𝙚 𝙢𝙚𝙧𝙚𝙘𝙚 𝙚𝙡 𝙈𝙑𝙋. 🔥⚽\n¡𝙏𝙪 𝙫𝙤𝙩𝙤 𝙘𝙪𝙚𝙣𝙩𝙖!\n";
    players.forEach(player => {
        message += `${player.id} - ${player.name}\n`;
    });

    room.sendAnnouncement(message, null, colors.mvp, "bold", 2);

    setTimeout(finalizarVotacionMVP, 60000); // 1 minuto para votar
}

function finalizarVotacionMVP() {
    votacionMVPActiva = false;

    if (votosMVP.size === 0) {
        room.sendAnnouncement("No se recibieron votos para MVP.", null, colors.bot, "bold", 2);
        return;
    }

    let maxVotos = 0;
    let mvpPlayer = null;

    votosMVP.forEach((votos, playerId) => {
        if (votos > maxVotos) {
            maxVotos = votos;
            mvpPlayer = room.getPlayer(playerId);
        }
    });

    if (mvpPlayer) {
        assignMVP(mvpPlayer);
    } else {
        room.sendAnnouncement("No se pudo determinar el MVP.", null, colors.bot, "bold", 2);
    }
}

function resetMVP() {
    mvps.forEach(playerId => {
        const player = room.getPlayer(playerId);
        if (player) {
            removeMVP(player);
        }
    });
    mvps.clear();
    room.sendAnnouncement("Todos los roles de MVP han sido reseteados.", null, colors.bot, "bold", 2);
}

function verificarYRestaurarAvataresCapitanes() {
    room.getPlayerList().forEach(player => {
        if (player.id === captains.red && player.avatar !== "ⓒ") {
            room.setPlayerAvatar(player.id, "ⓒ"); // Restaurar avatar de Capitán rojo
        } else if (player.id === captains.blue && player.avatar !== "ⓒ") {
            room.setPlayerAvatar(player.id, "ⓒ"); // Restaurar avatar de Capitán azul
        }
    });
}

// Ejecutar la función cada 15 segundos
setInterval(verificarYRestaurarAvataresCapitanes, 15000);

function verificarYRestaurarAvataresDT() {
    room.getPlayerList().forEach(player => {
        if (player.id === dts.red && player.avatar !== "👔") {
            room.setPlayerAvatar(player.id, "👔"); // Restaurar avatar de DT rojo
        } else if (player.id === dts.blue && player.avatar !== "👔") {
            room.setPlayerAvatar(player.id, "👔"); // Restaurar avatar de DT azul
        }
    });
}

// Ejecutar la función cada 15 segundos
setInterval(verificarYRestaurarAvataresDT, 15000);

function verificarYRestaurarAvataresMVP() {
    room.getPlayerList().forEach(player => {
        if (mvps.has(player.id) && player.avatar !== MVP_AVATAR) {
            room.setPlayerAvatar(player.id, MVP_AVATAR); // Restaurar avatar de MVP
        }
    });
}

// Ejecutar la función cada 15 segundos
setInterval(verificarYRestaurarAvataresMVP, 15000);

// Función para cambiar de mapa
function cambiarMapa() {
    if (penalesTurno === "red") {
        room.setCustomStadium(mapaBlue);
        penalesTurno = "blue";
    } else {
        room.setCustomStadium(mapaRed);
        penalesTurno = "red";
    }
    room.sendAnnouncement(`Cambio de mapa. Turno de ${penalesTurno}.`, null, colors.bot, "bold", 2);
}

const messageTimes = new Map(); // Mapa para almacenar los tiempos de los mensajes de cada usuario
let spammerDetectionEnabled = false; // Flag para habilitar/deshabilitar la detección de spam

function onMessage(userId, message) {
    if (message === "!spammer") {
        spammerDetectionEnabled = !spammerDetectionEnabled;
        room.sendAnnouncement(`Spammer detection ${spammerDetectionEnabled ? 'enabled' : 'disabled'}.`);
        return;
    }

    if (!spammerDetectionEnabled) return;

    const now = Date.now();
    if (!messageTimes.has(userId)) {
        messageTimes.set(userId, []);
    }

    const times = messageTimes.get(userId);
    times.push(now);

    // Filtrar mensajes que están fuera del período de 15 segundos
    const recentTimes = times.filter(time => now - time <= 15000);
    messageTimes.set(userId, recentTimes);

    // Verificar si hay 3 mensajes en menos de 2 segundos
    if (recentTimes.length >= 3) {
        const [first, second, third] = recentTimes.slice(-3);
        if (third - first <= 2000) {
            kickUser(player.id, "spammer");
            messageTimes.delete(player.id); // Limpiar el registro de mensajes del usuario expulsado
        }
    }

    // Limpiar el registro de mensajes después de 15 segundos
    setTimeout(() => {
        messageTimes.delete(userId);
    }, 15000);
}

function kickUser(userId, reason) {
    console.log(`User ${userId} has been kicked for ${reason}`);
    // Aquí iría el código para expulsar al usuario de la plataforma
}

room.onGameStart = function() {
    matchStarted = true;
    startTimedMatch = true;
    if (lockdownMode) {
        room.stopGame();
        room.sendAnnouncement("⚠️ 𝘼𝙇𝙀𝙍𝙏𝘼: 𝙀𝙡 𝙨𝙚𝙧𝙫𝙚𝙧 𝙚𝙨𝙩á 𝙘𝙤𝙢𝙥𝙧𝙤𝙢𝙚𝙩𝙞𝙙𝙤. 𝙚𝙨𝙩𝙖𝙣 𝙨𝙖𝙘𝙖𝙣𝙙𝙤 𝙩𝙪 𝙞𝙥 , 𝙙𝙚𝙨𝙘𝙤𝙣é𝙘𝙩𝙖𝙩𝙚 𝙔𝘼.", null, colors.botGold, "bold", 2);
        return;
    }

    setTeamUniforms(true);

    // Anunciar a todos los jugadores sobre el comando "tt"
    room.sendAnnouncement("¡𝙔𝙖 𝙚𝙨𝙩𝙖𝙢𝙤𝙨 𝙟𝙪𝙜𝙖𝙣𝙙𝙤! (𝙩𝙩) 𝙎𝙞 𝙩𝙞𝙚𝙣𝙚𝙨 𝙖𝙡𝙜𝙤 𝙞𝙢𝙥𝙤𝙧𝙩𝙖𝙣𝙩𝙚 𝙦𝙪𝙚 𝙙𝙚𝙘𝙞𝙧𝙡𝙚 𝙖 𝙩𝙪 𝙚𝙦𝙪𝙞𝙥𝙤 𝙮 𝙣𝙤 𝙦𝙪𝙞𝙚𝙧𝙚𝙨 𝙦𝙪𝙚 𝙩𝙤𝙙𝙤𝙨 𝙡𝙤 𝙨𝙚𝙥𝙖𝙣, 𝙪𝙨𝙖 '𝙩𝙩' 𝙖𝙡 𝙞𝙣𝙞𝙘𝙞𝙤 𝙙𝙚 𝙩𝙪 𝙢𝙚𝙣𝙨𝙖𝙟𝙚 𝙥𝙖𝙧𝙖 𝙢𝙖𝙣𝙩𝙚𝙣𝙚𝙧 𝙡𝙖𝙨 𝙩𝙖𝙘𝙩𝙞𝙘𝙖𝙨 𝙚𝙣𝙩𝙧𝙚 𝙚𝙡 𝙚𝙦𝙪𝙞𝙥𝙤. 😜🔥", null, 0x00FF00, "bold", 2);
};
room.setScoreLimit(0);
room.setTimeLimit(10);

function limpiarChat() {
    for (let i = 0; i < 10; i++) {
        room.sendAnnouncement(" ", null, 0xFFFFFF, "normal", 0);
    }
    room.sendAnnouncement("¡𝐄𝐥 𝐜𝐡𝐚𝐭 𝐡𝐚 𝐬𝐢𝐝𝐨 𝐥𝐢𝐦𝐩𝐢𝐚𝐝𝐨! ¡𝐃𝐞𝐣𝐞𝐧 𝐞𝐥 𝐦𝐚𝐥𝐩𝐚𝐫𝐢𝐝𝐨 𝐬𝐩𝐚𝐦 𝐝𝐞 𝐮𝐧𝐚 𝐯𝐞𝐳! 𝐒𝐢 𝐧𝐨 𝐭𝐢𝐞𝐧𝐞𝐧 𝐧𝐚𝐝𝐚 𝐪𝐮𝐞 𝐝𝐞𝐜𝐢𝐫, 𝐦𝐞𝐣𝐨𝐫 𝐪𝐮é𝐝𝐞𝐧𝐬𝐞 𝐜𝐚𝐥𝐥𝐚𝐝𝐨𝐬. 🔥💢", null, 0x00FF00, "bold", 1);
}