let knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./new-hackd-pt.db"
    }
});
let bookshelf = require('bookshelf')(knex);

knex.schema.createTable('ANewTable', function(table) {
    table.increments();
    table.string('label');
    table.string('timeDate');
    table.timestamps();
});

var User = bookshelf.Model.extend({
  tableName: 'users'
});

let Calendar = bookshelf.Model.extend({
    tableName: 'ANewTable',
    hasTimestamps: true,
    byId : function() {
        return 
    },
    something: "else"
});
var User = bookshelf.Model.extend({
  tableName: 'users',
  posts: function() {
    return this.hasMany(Post);
  }
});

var Post = bookshelf.Model.extend( 
    
    
    
    {
  tableName: 'posts',
  user: function() {
    return this.belongsTo(User);
  }
});

function displayCalendarData(req, res) {
    Calendar.collection().fetch().then(function(){
        console.log("I AM A PROMISE!");
    }).catch(function(){
        console.log("I AM A PROMISE ERROR");
    });
};

console.log("end");

