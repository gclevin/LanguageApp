Comments= new Meteor.Collection("comments");
Recordings= new FS.Collection('recordings',{
	stores: [
	new FS.Store.FileSystem('recordings', {path: "~/uploads"})
	],
	filter: {
		allow: {
			contentTypes: ['audio/*']
		}
	},
});

Recordings.allow({
	insert: function(){
		return true;

	},

	remove: function(){
		return true;
	},


});
