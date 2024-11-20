const axios = require("axios");

module.exports = {
    name: "llama",
    description: "burat",
    nashPrefix: false,
    version: "1.0.0",
    role: 0,
    cooldowns: 5,
    aliases: ["llm"],
    execute(api, event, args, prefix) {
        const { threadID, messageID } = event;
        let query = args.join(" ");
        if (!query) return api.sendMessage("Please enter a query.", threadID, messageID);

        api.sendMessage(
            "[ 𝙻𝙻𝙰𝙼𝙰 𝙰𝙸 ]\n\nPlease wait...",
            threadID,
            async (err, info) => {
                if (err) return;

                try {
                    const response = await axios.get(
                        `${global.NashBot.ENDPOINT}Llama?q=${encodeURIComponent(query)}`
                    );

                    const aiResponse = response.data.response;

                    api.editMessage(
                        "[ 𝙻𝙻𝙰𝙼𝙰 𝙰𝙸 ]\n\n" +
                        aiResponse,
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
