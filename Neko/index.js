(function(e, i, n) {
    "use strict";
    const o = n.findByStoreName("UserStore");
    n.findByProps("sendAttachments");
    let a;
    var r = {
        onLoad: function() {
            a = i.registerCommand({
                name: "neko",
                displayName: "neko",
                displayDescription: "generates neko from neko.best!",
                description: "generates neko from neko.best!",
                options: [],
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
    async function p(t) {
        return await (await fetch('https://nekos.best/api/v2/neko')).json()
    }
    async function s(t, c) {
        const d = (await o.getUser(t[0].value)).getAvatarURL(512);
        return {
            content: (await p(d)).results[0].url
        }
    }
    return e.default = r, Object.defineProperty(e, "__esModule", {
        value: !0
    }), e
})({}, vendetta.commands, vendetta.metro);