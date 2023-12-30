(function(e, i, n) {
    "use strict";
    const o = n.findByStoreName("UserStore");
    n.findByProps("sendAttachments");
    let a;
    var r = {
        onLoad: function() {
            a = i.registerCommand({
                name: "translate",
                displayName: "translate",
                displayDescription: "Translator! Author: Elf and Tears",
                description: "Translator!",
                options: [{
                    name: "lang",
                    displayName: "lang",
                    description: "example: en",
                    displayDescription: "language",
                    required: !0,
                    type: 3
                }, {
                    name: "text",
                    displayName: "text",
                    description: "example: Hello World",
                    displayDescription: "text",
                    required: !0,
                    type: 3
                }],
                execute: s,
                applicationId: "-1",
                inputType: 1,
                type: 1
            })
        },
        onUnload: function() {
            a()
        }
    };
    async function p(lang, text) {
        return await (await fetch("https://libretranslate.com/translate", {
            method: "POST",
            body: JSON.stringify({
                q: text,
                source: "auto",
                target: lang,
                format: "text",
                api_key: ""
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }))
    }
    async function s(t, c) {
        return {
            content: await p(t[0].value, t[1].value)
        }
    }
    return e.default = r, Object.defineProperty(e, "__esModule", {
        value: !0
    }), e
})({}, vendetta.commands, vendetta.metro);