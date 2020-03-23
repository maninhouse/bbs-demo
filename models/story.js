var mongodb = require('./db');

function Story(story) {
    this.index = story.index; // 先固定值為0
    this.timestamp = story.timestamp;
    this.content = story.content;
}

module.exports = Story;

//save story index, timestamp, content
Story.prototype.save = function(callback) {
    //the file being saved in DB
    var story = {
        index: this.index,
        timestamp: this.timestamp,
        content: this.content
    };

    //open DB
    mongodb.open(function(err, db){
        if(err) return callback(err); //if error happen, return err info

        //read stories set
        db.collection('stories', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err); //if error happen, return err info
            }
            //insert the user data into users set
            collection.insert(stroy, {safe: true}, function(err, story){
                mongodb.close();
                if(err) return callback(err); //if error happen, return err info
                callback(null, story[0]); //success! err is null, then return the user document file after being saved.
            });
        });
    });
};

//read story info
Story.get = function(index, callback) {
    //open DB
    mongodb.open(function(err, db){
        if(err) return callback(err); //if error happen, return err info
        //read stories set
        db.collection('stories', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err); //if error happen, return err info
            }
            //查詢story index(key:index) 值(value)為 index(Story.get傳入值) 的文件檔
            collection.findOne({index: index}, function(err, story){
                mongodb.close();
                if(err) return callback(err); //if error happen, return err info
                callback(null, story); //success! err is null, then return the story info
            });
        });
    });
};