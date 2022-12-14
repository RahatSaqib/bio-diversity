const { getTable, executeQuery, uniqueIdGenerator, tableTypes } = require('../config/common');
const moment = require("moment/moment");
const DB = require("../config/connectToDatabase");

exports.addUpdateCategories = async (req, res, next) => {
    console.log(req.body)
    let table = getTable(tableTypes.categories)

    let { name, type, keyList, serial } = req.body
    if (!serial) {
        serial = await uniqueIdGenerator(table, 5)
    }
    let searchQuery = `select * from ${table} where serial = '${serial}`
    // let response = await executeQuery(searchQuery)
    let response = await executeQuery(insertQuery)
    if (response?.length > 0) {
        let modifiedDatetime = moment().format("YYYY-MM-DD HH:mm:ss");
        let updateQuery = `update ${table} set name = '${name}', name = '${type}', name = '${keyList}', lastModified = '${modifiedDatetime}' where serial = ${response[0].serial}`
        await executeQuery(updateQuery)
        res.status(200).json({
            success: true,
            data: "Updated",
        })
    }
    else {
        keyList = JSON.stringify(keyList)
        let createdDatetimeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
        let insertQuery = `insert into ${table} 
            (name, serial, type, keyList, createdDatetimeStamp)
            VALUES('${name}','${serial}','${type}','${keyList}','${createdDatetimeStamp}')`
        let response = await executeQuery(insertQuery)
        console.log(response)
        res.status(200).json({
            success: true,
            data: "Inserted",
        })
    }

}