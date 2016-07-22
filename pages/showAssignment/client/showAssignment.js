Template.showAssignment.helpers({
	

	submissions: function(){
		console.log("checled");
		// console.log(Submissions.find({"metadata.assignment": this._id}).fetch());
		console.log(Submissions.find().fetch());
		return Submissions.find({"metadata.assignment": this._id});
	},
})

Template.showAssignment.events({

	"click .js-submit": function(event){
		event.preventDefault();
		console.log("worked");
		const id = Meteor.userId()
		const Assignment = this._id;

		const submission = {Assignment:Assignment, id:id}

		console.log(submission);

		SubmissionsTwo.insert(feedbackComment);
	}
})


Template.showSubmission.helpers({

	feedback: function(){

		console.log(this.metadata.assignment);
		return Feedback.find({"id": this._id});
	},
	

	assignments: function(){
		console.log("assignments reached");
		return Assignments.find({"_id": this.metadata.assignment});
	}
})

Template.showSubmission.events({

	"click .js-feedback": function(event){
		event.preventDefault();
		console.log("worked");
		const comment = $(".js-feedbackText").val();
		const id = this._id;

		console.log(this._id);

		const feedbackComment = {comment:comment, id:id}

		console.log(feedbackComment);

		Feedback.insert(feedbackComment);
	}
})