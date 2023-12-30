(function(o, l, a) {
    "use strict";
    const f = a.findByProps("sendMessage", "receiveMessage"),
        i = a.findByProps("Messages")
        
    function httpGet(theUrl)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false );
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

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
                    let Neko = JSON.parse(httpGet('https://nekos.best/api/v2/neko')).results[0].url;
                    f.sendMessage(n.channel.id, {
                        content: Neko
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