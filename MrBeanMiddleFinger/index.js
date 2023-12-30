(function(e, i, n) {
    "use strict";
    const o = n.findByStoreName("UserStore");
    n.findByProps("sendAttachments");
    let a;
    var r = {
        onLoad: function() {
            a = i.registerCommand({
                name: "mrbean",
                displayName: "mrbean",
                displayDescription: "Send Mr Bean Gif Middle Finger! Author: Elf and Tears",
                description: "Send Mr Bean Gif Middle Finger!",
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
    function s(t, c) {
        return {
            content: 'https://tenor.com/view/mr-bean-car-funny-middle-finger-gif-13800205'
        }
    }
    return e.default = r, Object.defineProperty(e, "__esModule", {
        value: !0
    }), e
})({}, vendetta.commands, vendetta.metro);

