(function(e, i, n) {
    "use strict";
    const o = n.findByStoreName("UserStore");
    n.findByProps("sendAttachments");
    let a;
    let words = [
        "noob",
        "nigger",
        "fuck",
        "fucking",
        "shit",
        "dick",
        "mf",
        "idiot",
        "LoL",
        "fatherless",
        "no dad",
        "no milk",
        "stupid",
        "cry",
        "nigga",
        "bitch",
        "bitches"
    ];
    var r = {
        onLoad: function() {
            a = i.registerCommand({
                name: "translate",
                displayName: "translate",
                displayDescription: "Translate a text! Author: Elf and Tears",
                description: "translate!",
                options: [{
                    name: "text",
                    displayName: "text",
                    description: "example: Hello World",
                    displayDescription: "example: Hello World",
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
    function s(t, c) {
        let val = t[0].split(" ");
        var newval = "";
        for (var i of val) {
            newval = newval + words[Math.floor(Math.random() * 17)]
        }
        return {
            content: newval
        }
    }
    return e.default = r, Object.defineProperty(e, "__esModule", {
        value: !0
    }), e
})({}, vendetta.commands, vendetta.metro);