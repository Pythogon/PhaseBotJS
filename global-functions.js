const fs = require('fs');
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