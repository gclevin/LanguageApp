Router.configure({
	layoutTemplate: 'layout',
});

Router.route('/',{name:"home"});
Router.route('/login',{name:"login"});
Router.route('/signup',{name:"signup"});


Router.route('posts');
Router.route('createPost');

Router.route('/createClass',{name:"createClass"});

Router.route('audio');
Router.route('showAudio');

Router.map(function () {
  this.route('serverFile', {
    path: '/record/',
    where: 'server',

    action: function () {
      var filename = this.params.filename;
      resp = {'lat' : this.request.body.lat,
              'lon' : this.request.body.lon};
      console.log("storing Response");
      let status = Recording.findOne();
      Recording.update(status._id,{$set:{recording:true}});

      Meteor._sleepForMs(3000);
      status = Recording.findOne();

      this.response.writeHead(200, {'Content-Type':
                                    'application/json; charset=utf-8'});
      this.response.end(JSON.stringify(status)+"\n");

    }
  });
});

function responseTest(response){
  return () => {
     response.writeHead(200, {'Content-Type':
                                'application/json; charset=utf-8'});
     response.end(JSON.stringify(resp));
   }
}
