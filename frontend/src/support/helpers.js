export const prepareDetails = (data, props_list) => {
    let found_undefined = false;
    // create list of details with check if any undefined found
    let details_list = [];
    for (let i = 0; i < props_list.length; i++) {
        const properties = props_list[i]["properties"];
        let element = data[properties[0]];
        for (let j = 1; j < properties.length; j++) {
            if (!element) {
                found_undefined = true;
                break
            } else {
                element = element[properties[j]];
            }
        }

        if (props_list[i]["boolean"]) {
            element = element[0] ? "Yes" : "No"
        }
        details_list.push([props_list[i]["label"], element])
    }
    return details_list
};


export const prepareDetailsObject = (data, props_list) => {
    let found_undefined = false;
    // create list of details with check if any undefined found
    let details_object = {};
    for (let i = 0; i < props_list.length; i++) {
        const properties = props_list[i]["properties"];
        let element = data[properties[0]];
        for (let j = 1; j < properties.length; j++) {
            if (!element) {
                found_undefined = true;
                break
            } else {
                element = element[properties[j]];
            }
        }

        if (props_list[i]["boolean"]) {
            element = element[0] ? "Yes" : "No"
        }
        details_object[props_list[i]["label"]] = element
    }
    return details_object
};