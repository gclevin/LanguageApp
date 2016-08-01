var x;
var max;
var random;
var array;

Template.flashcards.helpers({
	flashcards:function(){
		console.log(this._id);
		return Flashcards.find({courseId: this._id}, {sort:{name:1}});
	},

})

Template.flashcardSet.helpers({
	flashcards:function(){
		console.log(this._id);
		return Flashcards.find({courseId: this._id});
	},

	flashcardPairs:function(){
		console.log("working");
		return FlashcardPairs.find({flashcardId: this._id});
	},

	// flashcardPairs:function(){
	// 	console.log("working");
	// 	x = FlashcardPairs.findOne({flashcardId: this._id});
	// 	return x;
	// },
})

Template.practiceFlashcards.onCreated(function() {
  this.state = new ReactiveDict();
  	console.log(this);
	console.log("working");
	array = FlashcardPairs.find({flashcardId: this.data._id}).fetch();
	console.log(x);
	max = array.length - 1;
	console.log("Max " + max);
	var random = Math.floor((Math.random() * max));
	console.log("Random " + random);
	x = array[random];
	console.log(x);


  this.state.setDefault({
    pair: x.wordOne,   
  });

});

Template.practiceFlashcards.helpers({
	flashcardPairs:function(){
		const instance = Template.instance();
		return instance.state.get("pair");
	},
})




Template.createFlashcards.events({


	 "click .js-submit": function(event){
	 	event.preventDefault();
	 	console.log("worked");
		const name = $(".js-setName").val();
		const instructions = $(".js-instructions").val();

		const flashcardSet = {courseId:this._id, name:name, instructions:instructions};
		const flashcardId = Flashcards.insert(flashcardSet);
		console.log(flashcardId);


		
		// const wordOne = $(".js-wordOne").val();
		// const wordTwo = $(".js-wordTwo").val();
		// const pair = {flashcardId:flashcardId, wordOne:wordOne, wordTwo:wordTwo}; 
		// FlashcardPairs.insert(pair);



		console.dir(flashcardSet);
		// console.dir(pair);


		Router.go("/flashcards/" + this._id);
	},
})

Template.flashcardSet.events({

	 "click .js-addPair": function(event){
	 	event.preventDefault();
		const wordOne = $(".js-wordOne").val();
		const wordTwo = $(".js-wordTwo").val();
		const pair = {flashcardId:this._id, wordOne:wordOne, wordTwo:wordTwo}; 
		console.dir(pair);
		FlashcardPairs.insert(pair);

		$(".js-wordOne").val("");
		$(".js-wordTwo").val("");

	},

	//  "click .js-submit": function(event){
	//  	event.preventDefault();
	//  	console.log("worked");
	// 	const guess = $(".js-guess").val();

	// 	if (guess == x.wordTwo) {
	// 		window.alert("Correct!");
	// 		console.log("correct");
	// 	} else {
	// 		window.alert("Incorrect. Try again");
	// 	}

	// 	console.log(guess);


	// },
})


Template.practiceFlashcards.events({

	//  "click .js-addPair": function(event){
	//  	event.preventDefault();
	// 	const wordOne = $(".js-wordOne").val();
	// 	const wordTwo = $(".js-wordTwo").val();
	// 	const pair = {flashcardId:this._id, wordOne:wordOne, wordTwo:wordTwo}; 
	// 	console.dir(pair);
	// 	FlashcardPairs.insert(pair);

	// 	$(".js-wordOne").val("");
	// 	$(".js-wordTwo").val("");

	// },

	 "click .js-showAnswer": function(event, instance){
	 	event.preventDefault();
	 	console.log("worked");

		window.alert("The correct answer was: " + x.wordTwo);

		random = Math.floor((Math.random() * max));
		x = array[random];
		$(".js-guess").val("");
		instance.state.set("pair", x.wordOne);
	},

	 "click .js-submit": function(event, instance){

	 	event.preventDefault();
	 	console.log("worked");
		const guess = $(".js-guess").val();

		if (guess == x.wordTwo) { 
			window.alert("Correct!");
			console.log("correct");
			random = Math.floor((Math.random() * max));
			x = array[random];
			$(".js-guess").val("");
			instance.state.set("pair", x.wordOne);
		} else {
			window.alert("Incorrect. Try again");
		}

		console.log(guess);


	},
})