var mongodb = require('./db');

function User(user) {
    this.ip = user.ip;
}

module.exports = User;

//save user ip, story
User.prototype.save = function(callback) {
    //the file being saved in DB
    var user = {
        ip: this.ip
    };

    //open DB
    mongodb.open(function(err, db){
        if(err) return callback(err); //if error happen, return err info

        //read users set
        db.collection('users', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err); //if error happen, return err info
            }
            //insert the user data into users set
            collection.insert(user, {safe: true}, function(err, user){
                mongodb.close();
                if(err) return callback(err); //if error happen, return err info
                callback(null, user); //success! err is null, then return the user document file after being saved.
            });
        });
    });
};

//read user info
User.get = function(ip, callback) {
    //open DB
    mongodb.open(function(err, db){
        if(err) return callback(err); //if error happen, return err info
        //read users set
        db.collection('users', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err); //if error happen, return err info
            }
            //查詢user IP(key:ip) 值(value)為 ip(User.get傳入值) 的文件檔
            collection.findOne({ip: ip}, function(err, user){
                mongodb.close();
                if(err) return callback(err); //if error happen, return err info
                callback(null, user[0]); //success! err is null, then return the user info
            });
        });
    });
};