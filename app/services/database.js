import React from 'react';
var sqlite = require('react-native-android-sqlite')

export function addScoreRow(time, round,callback) {
    var sql = 'INSERT INTO score(type, value) VALUES (?, ?)'
    var params = [time, round]
    var result = {time: time, round:round}
    var databaseName = 'databaseDead'
    sqlite.init(databaseName)
        .then((_) => {
            sqlite.exec(sql, params)
                .then((data) => {
                    callback && callback(result);
                }).catch((errorMessage) => {
                    callback && callback(errorMessage);
                });
        }).catch((errorMessage) => {
            callback && callback(errorMessage);
        });
}
export function dropAll(callback) {
    var sql = "delete from score"
    var params = []

    var databaseName = 'databaseDead'
    sqlite.init(databaseName)
        .then((_) => {
            sqlite.query(sql,params)
                .then((data) => {
                    callback && callback(data);
                }
                )
        }).catch((errorMessage) => {
                    callback && callback([]);
        });
}
export function getAllScore(callback) {
    var sql = 'SELECT * FROM score'
    var params = []
    var databaseName = 'databaseDead'
    sqlite.init(databaseName)
        .then((_) => {
            sqlite.query(sql,params)
                .then((data) => {
                    callback && callback(data);
                }
                )
        }).catch((errorMessage) => {
                    callback && callback([]);
        });
}
