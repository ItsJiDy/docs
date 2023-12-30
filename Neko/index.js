(function(o, l, a) {
    "use strict";
    const f = a.findByProps("sendMessage", "receiveMessage"),
        i = a.findByProps("Messages")
    let c = [];
    var g = {
        onLoad: function() {
            c.push(l.commands.registerCommand({
                name: "neko",
                displayName: "neko",
                description: "neko image!",
                displayDescription: "Generates a neko from neko.best!",
                options: [],
                applicationId: -1,
                inputType: 1,
                type: 1,
                execute: function(e, n) {
                    f.sendMessage(n.channel.id, {
                        content: 'plugin test'
                    })
                }
            }))
        },
        onUnload: function() {
            for (const e of c) e()
        }
    };
    return o.default = g, Object.defineProperty(o, "__esModule", {
        value: !0
    }), o
})({}, vendetta, vendetta.metro);