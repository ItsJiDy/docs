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
                    required: !1,
                    type: 5
                }, {
                    name: "text",
                    displayName: "text",
                    description: "example: Hello World",
                    displayDescription: "text",
                    required: !1,
                    type: 5
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
        return await fetch("https://libretranslate.com/translate", {
            	method: "POST",
    	        body: JSON.stringify({
    		    q: text,
    		    source: "auto",
    		    target: lang,
    		    format: "text",
    		     api_key: ""
          	}),
        	headers: { "Content-Type": "application/json" }
        }).json()
    }
    async function s(t, c) {
        let a = t.find(function(o) {
                return o.name === "lang"
            }).value,
         b = t.find(function(o) {
                return o.name === "text"
            }).value;
        return {
            content: p(lang, c).translatedText;
        }
    }
    return e.default = r, Object.defineProperty(e, "__esModule", {
        value: !0
    }), e
})({}, vendetta.commands, vendetta.metro);
