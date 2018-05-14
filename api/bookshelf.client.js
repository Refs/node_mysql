var bookshelf = require('./booshelf');
var checkit = require('checkit');
var Promise = require('bluebird');

// checkit 用来验证对象的，与angular的 validator 一致，且可以去自定义校验器；自己应该去探索一下；
// var checkit = new Checkit({
//     firstName: 'required',
//     lastName: 'required',
//     email: ['required', 'email']
// });

// var body = {
//     email: 'test@example.com',
//     firstName: 'Tim',
//     lastName: 'Griesser',
//     githubUsername: 'tgriesser'
// };

// checkit.run(body).then(function(validated) {
//     console.log(validated);
//     }).catch(Checkit.Error, function(err) {
//     console.log(err.toJSON());
// })

// var rules = {};

// var Customer = bookshelf.Model.extend({
//     initialize: function() {
//         this.constructor._super_.initialize.apply(this, arguments);
//         this.on('saving', this.validateSave);
//     },

//     validateSave: () => {
//        return checkit(rules).run(this.atrributes); 
//     },

//     account: () => {
//         return this.belongsTo(Account);
//     }
//  })


var User = bookshelf.Model.extend({
    tableName: 'users',
    posts: function() {
      return this.hasMany(Posts);
    }
  });
  
  var Posts = bookshelf.Model.extend({
    tableName: 'messages',
    tags: function() {
      return this.belongsToMany(Tag);
    }
  });
  
  var Tag = bookshelf.Model.extend({
    tableName: 'tags'
  })
  
  User.where('id', 1).fetch({withRelated: ['posts.tags']}).then(function(user) {
    console.log(user.related('posts').toJSON());
  }).catch(function(err) {
    console.error(err);
  });
