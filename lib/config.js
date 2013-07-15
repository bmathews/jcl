var commander = require('commander'),
    path = require('path'),
    fs = require('fs'),
    crypto = require('crypto'),
    configPath = process.env[(process.platform === 'win32' ? 'USERPROFILE' : 'HOME')] + path.sep + ".jira-cli-config",
    c = configPath;

module.exports = function (cb) {
    if (fs.existsSync(configPath)) {
        readConfig(cb);
    } else {
        createDefaultConfig(cb);
    }
};

function readConfig (cb) {
    var cfg = {},
        decipher = crypto.createDecipher("aes192", c);
    try {
        cfg = JSON.parse(String(fs.readFileSync(configPath)));
        cfg.password = decipher.update(cfg.password, "hex", "binary") + decipher.final("binary");
        if (cfg.host && cfg.protocol && cfg.user && cfg.password) {
            cb(cfg);
        } else {
            throw "err";
        }
    } catch (e) {
        console.log("Error reading config...");
        createDefaultConfig(cb);
    }
}

function encrypt (pw) {
    var cipher = crypto.createCipher("aes192", c);
    return cipher.update(pw, "binary", "hex") + cipher.final("hex");
}

function writeConfig (config) {
    var configClone = JSON.parse(JSON.stringify(config));
    configClone.password = encrypt(config.password);
    fs.writeFileSync(configPath, JSON.stringify(configClone, null, 4));
}

function createDefaultConfig (cb) {
    var config = {
            protocol: 'https',
            host: "url",
            port: null,
            user: 'username',
            password: 'password'
        },
        prompts = {
            protocol: "Protocol (http or https): ",
            host: "Jira Server (jira.company.com/): ",
            user: "Username: ",
            password: "Password: "
        },
        i = 0,
        keys = Object.keys(prompts);

    function next () {
        if (i < keys.length) {
            commander[keys[i] === "password" ? "password" : "prompt"](prompts[keys[i]], function (val) {
                if (val.trim()) {
                    config[keys[i]] = val;
                    i += 1;
                    next();
                }
            });
        } else {
            if (config.host[config.host.length - 1] != "/") config.host += "/";
            writeConfig(config);
            cb(config);
            process.stdin.destroy();
        }
    }

    console.log("Setup config...\n");
    next();
}