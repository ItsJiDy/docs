(function(c, p, y, d, u, r, w, b) {
    "use strict";
    const {
        ScrollView: v
    } = u.General, {
        FormSection: f,
        FormRadioRow: _,
        FormSwitchRow: F,
        FormIcon: S
    } = u.Forms;

    function R() {
        return w.useProxy(r.storage), React.createElement(v, null, React.createElement(f, {
            title: "Misc Settings",
            titleStyleType: "no_border"
        }).map(function(n) {
            let [t, s] = n;
            return React.createElement(_, {
                label: t,
                selected: r.storage.sortdefs === s,
                onPress: function() {
                    r.storage.sortdefs = s
                }
            })
        })))
    }
    const g = d.findByProps("sendMessage", "receiveMessage"),
        A = d.findByProps("getLastSelectedChannelId"),
        N = d.findByProps("createBotMessage"),
        $ = d.findByProps("BOT_AVATARS");
    let m = [];
    m.push(p.registerCommand({
        name: "neko",
        displayName: "neko",
        description: "Generate",
        displayDescription: "Generate a neko from neko.best",
        applicationId: "-1",
        inputType: 1,
        type: 1,
        execute: async function(n, t) {
            try 
            {g.sendMessage(t.channel.id, {
                    content: "plugins"
                })
            } catch (s) {
                y.logger.log(s), l(t.channel.id, "ERROR !!!!!!!!!!!! \u{1F62D}\u{1F62D}\u{1F62D} Check debug logs!! \u{1F97A}\u{1F97A}\u{1F97A}", [])
            }
        }
    }));
    const M = R,
        B = function() {
            r.storage.nsfwwarn ??= !0, r.storage.sortdefs ??= "new"
        },
        j = function() {
            for (const n of m) n()
        };
    return c.onLoad = B, c.onUnload = j, c.settings = M, c
})({}, vendetta.commands, vendetta, vendetta.metro, vendetta.ui.components, vendetta.plugin, vendetta.storage, vendetta.ui.assets);
