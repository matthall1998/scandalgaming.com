export const site: {
  discordUrl: string | null;
  serverAddress: string;
  backgrounds: { file: string; name: string }[];
  maps: { name: string; file: string }[];
} = {
  discordUrl: "https://discord.scandalgaming.com",
  serverAddress: "scandalgaming.com:27015",
  backgrounds: [
    { file: "pumpkin-path", name: "Pumpkin path" },
    { file: "moonlit-courtyard", name: "Moonlit courtyard" },
    { file: "horror-entrance", name: "Horror entrance" },
    { file: "cobwebbed-room", name: "Cobwebbed room" },
    { file: "iron-gate", name: "Iron gate" },
  ],
  maps: [
    { name: "Halloween Night", file: "de_halloween_night" },
    { name: "Horror II", file: "cs_horror2" },
    { name: "Old Mansion", file: "cs_oldmansion" },
    { name: "Cemetery", file: "fy_cemetery" },
    { name: "Castle Night", file: "cs_castle_nightV2" },
    { name: "Horror", file: "cs_horror" },
  ],
};
