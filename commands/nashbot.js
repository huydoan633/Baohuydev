const axios = require("axios");

module.exports = {
    name: "nashbot",
    description: "bulbul",
    nashPrefix: false,
    version: "1.0.0",
    role: 0,
    cooldowns: 5,
    aliases: ["nbot"],
    execute(api, event, args, prefix) {
        const { threadID, messageID } = event;
        let query = args.join(" ");
        if (!query) return api.sendMessage("Please enter a query.", threadID, messageID);

        api.sendMessage(
            "[ 𝙽𝙰𝚂𝙷𝙱𝙾𝚃 𝙰𝙸 ]\n\n⏳ Fetching response...",
            threadID,
            async (err, info) => {
                if (err) return;

                try {
                    const response = await axios.get(
                        `${global.NashBot.ENDPOINT}nashbot?q=${encodeURIComponent(query)}`
                    );

                    const aiResponse = response.data.response;

                    api.editMessage(
                        "[ 𝙽𝙰𝚂𝙷𝙱𝙾𝚃 𝙰𝙸 ]\n\n" + aiResponse,
                        info.messageID
                    );
                } catch (error) {
                    console.error("Error fetching data:", error.message);
                    api.sendMessage(
                        "Error processing your request: " + error.message,
                        threadID,
                        messageID
                    );
                }
            },
            messageID
        );
    },
};
