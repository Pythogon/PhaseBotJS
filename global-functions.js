const fs = require('fs');

function FetchFooter() {
    randomFooters = {
        1: "with love. ❤",
        2: "in discord.py.",
        3: "on 2020-07-04.",
        4: "| Error 404: Good code not found.",
        5: "with special thanks to Erika!",
        6: "with Anabot.",
        7: "with no added sugar!",
        8: "| It's nut free!",
        9: "with magic and rainbows.",
        10: "while consulting the deities.",
        11: "on behalf of a very caffeinated frog.",
        12: "| If you find a bug, feel free to report it!",
        13: "with thanks to bekano_cat for her artistic talent!",
        14: "because even monsters deserve love. ❤",
        15: "rising from the ashes.",
        16: "with unintentional help from distopioid!",
        17: "to cultivate psychedelic cacti - not for consumption (for legal reasons)" // Thanks cool tomato
    } 
    return randomFooters[Math.floor((Math.random()*17)+1)]
}

function ReadUserData(user) { 
    let raw_data = fs.readFileSync("./local_memory/userdata.json");
    let all_user_data = JSON.parse(raw_data);
    if(user in all_user_data) return all_user_data[user];
    return all_user_data["default"];
}
function WriteUserData(user, data) { 
    let raw_data = fs.writeFileSync("./local_memory/userdata.json");
    let all_user_data = JSON.parse(raw_data);
    all_user_data[user] = data;
    let data_to_write = JSON.stringify(all_user_data);
    fs.writeFileSync("./local_memory/userdata.json", data_to_write);
}

function ReadGlobalVariable(variable) {
    let raw_data = fs.readFileSync("./local_memory/globaldata.json");
    let all_global_data = JSON.parse(raw_data);
    return all_global_data[variable];
}

function WriteGlobalVariable(variable, data) {
    let raw_data = fs.writeFileSync("./local_memory/globaldata.json");
    let all_global_data = JSON.parse(raw_data);
    all_global_data[variable] = data;
    let data_to_write = JSON.stringify(all_global_data);
    fs.writeFileSync("./local_memory/globaldata.json", data_to_write);
}

module.exports.FetchFooter = FetchFooter;
module.exports.ReadUserData = ReadUserData;
module.exports.ReadGlobalVariable = ReadGlobalVariable;
module.exports.WriteUserData = WriteUserData;
module.exports.WriteGlobalVariable = WriteGlobalVariable;