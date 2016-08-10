/**
 * The base bookshelf model to init other models.
 */
let bookshelf = require('../init/bookshelf');

let BaseModel = bookshelf.Model.extend({
    hasTimestamps: ['created_at', 'updated_at']
}, {
    findAll: function(filter, options) {
        return this.forge().where(filter).fetchAll(options);
    },

    findOne: function(query, options) {
        return this.forge(query).fetch(options);
    },
    create: function(data, options) {
        return this.forge(data).save(null, options);
    }
});

BaseModel.find = function(id, options) {
    return new this({id: id}).fetch(options);
    
};