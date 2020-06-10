
	const question_text = document.querySelector(".question_text");
	const option_box = document.querySelector(".option_box");
	const current_question_num= document.querySelector(".current_question_num");
	const answer_desc= document.querySelector(".answer_desc");
	const next_question_btn= document.querySelector(".next_question_btn");
	const score_num = document.querySelector(".score_num");
	const see_result_btn= document.querySelector(".see_result_btn");
	const remaining_time= document.querySelector(".remaining_time");
	const time_up = document.querySelector(".time_up");
	const quiz_home_box=document.querySelector(".quiz_home_box");
	const quiz_box=document.querySelector('.quiz_box');
	const final_results= document.querySelector('.final_results');
	// const start_quiz_btn=document.querySelector('.start_quiz_btn');
	const start_again_btn =document.querySelector('.start_again_btn');
	const go_home_btn = document.querySelector('.go_home_btn');
	// const start_quiz_btn= document.querySelector('.start_quiz_btn');
	const category_box = document.querySelector(".category_box");
	const category_text=document.querySelector('.category_text');
	let attempt=0;
	let questionIndex = 0;
	let score = 0;
	let number= 0;
	let myArray=[];
	let interval;
	let categoryIndex;


    //Created array of objects for questions...................

myApp=[
{
	category:"Human body",
	quizWrap:[
    {
    	question:"Which organ belongs to the Digestive System",
    	options:["Thymus","stomach","Heart","Trachea"],
    	answer:1,   
    	
    },
    {
    	question:"Adults have fewer bones than babies do",
    	options:["true","false"],
    	answer:0,
    	desc:"Lots of bones start out as several fragements at birth,then fuse,together into a single bone later in life"
    },
    {
    	question:"Our human body has.......",
    	options:["206 bones","219bones","306 bones","350 bones"],
    	answer:0
    	
    },
      {
    	question:"Your fingernails and hair keep growing after you die",
    	options:["true","false"],
    	answer:1,
    	desc:"They really don't"
    },
    {
    	question:"One important function of bones is to produce.",
    	options:["tendons","ligaments","blood cells","certilage"],
    	answer:2,
    },
  ]
},

{
	category:"International - Current Affairs",
	quizWrap:[
    {
    	question:"Which of the following has become the first country to make all forms of public transport free?",
    	options:["Monaco","Liechtenstein","Luxembourg","Andorra"],
    	answer:2,   
    	desc:'Lucembourg in Europe has become the first country to make all forms of publick transport free.It is the second smallest country in Europe Union'

    },
    {
    	question:"Which Country is to host CommonWealth shooting, archery events in 2022",
    	options:["Australia","India","Brunai","Singapore"],
    	answer:3,
    	desc:"India to host CommonWealth shooting,archery events at chandigarh in January 2022"
    },
    {
    	question:"26 The Internation Criminal Police Organisation (INTERPOL) has its headquarters at",
    	options:["Montreal","Bonn","Paris","London"],
    	answer:2
  
    },
      {
    	question:"30 Where is the headquarters of Botanical Survey of India located?",
    	options:["Kolkata","Lucknow","ootacmund","Darjeeling"],
    	answer:0
    },
  ]
},

{
	category:"Computer Awareness",
	quizWrap:[
    {
    	question:"How many bytes are equal to one kilobytes?",
    	options:["1050","1024","1022","1000"],
    	answer:1
    },
    {
    	question:"Which of the following is not an input device?",
    	options:["anwserboard","Moniter","Mouse","Keyboard"],
    	answer:1
    },
    {
    	question:"The most powerful computer is__________",
    	options:["Super computer","micro computer","mini computer","all of these"],
    	answer:0,
    },
    {
    	question:"Every Computer connected to the Internet is identified by a unique four-part string known as",
    	options:["IP address","Host name","Domain Name","None of above"],
    	answer:0
    },
    {
    	question:"Which ofthe following memories needs refresh",
    	options:["DROM","ROM","SRAM","All o these"],
    	answer:0
    },

  ]
},

{
	category:"Sports",
	quizWrap:[
    {
    	question:"when was the first common Wealth Games held?",
    	options:["1930","1934","1938","1948"],
    	answer:0

    },
    {
    	question:"In which Sports is the participant called pugilist?",
    	options:["Sprinter","Boxing","Wrestling","Javelin"],
    	answer:1
    },
    {
    	question:"In which game term 'Putting' is used?",
    	options:["Chess","Hocanwser","Golf","Billiards"],
    	answer:2,
    },
    {
    	question:"Who was the first Test Centurion in India Cricket?",
    	options:["C.k.Naidu","Lala Amarnath","Vinu Mankad","Mansur Ali Pataudi"],
    	answer:1
    },
    {
    	question:"10 the number of players in each side in Water Polo is",
    	options:["6","8","9","7"],
    	answer:3
    },
  ]
},

    ]

    function createCategory(){
    	// console.log(myApp[1].category)
    	for(let i=0;i<myApp.length;i++)
    	{
    		const categoryList = document.createElement("div");
    		      categoryList.innerHTML=myApp[i].category;
    		      categoryList.setAttribute("data-id",i);
    		      categoryList.setAttribute("onclick","selectCategory(this)");
    		      category_box.appendChild(categoryList);
    	}
    }

 function selectCategory(ele)
 {
  	// starttimer();
  	 categoryIndex=ele.getAttribute("data-id");
   	 category_text.innerHTML=myApp[categoryIndex].category;
     quiz_home_box.classList.remove('show')
	 quiz_box.classList.add('show');
	 nextQuestion();
	 // starttimer();
  }  
 

function load()
{
	question_text.innerHTML = myApp[categoryIndex].quizWrap[questionIndex].question;
	createOption();
	scoreboard();
	current_question_num.innerHTML=number + "/" + myApp[categoryIndex].quizWrap.length;
}

function createOption()
{
	option_box.innerHTML="";
	let animationDelay=0.2;
	for(let i =0;i<myApp[categoryIndex].quizWrap[questionIndex].options.length;i++)
	{
		const option = document.createElement("div");
		      option.innerHTML = myApp[categoryIndex].quizWrap[questionIndex].options[i];
		      option.classList.add('option');
		      option.id=i;
		      option.style.animationDelay= 0.2 + "s";
		      animationDelay = animationDelay=0.2;
		      option.setAttribute("onclick","check(this)");
		      option_box.appendChild(option);
	}
}

function generateRandomQuestion()
{
	const randomNumber = Math.floor(Math.random() * myApp[categoryIndex].quizWrap.length);
	let hitDuplicate=0;
	if(myArray.length == 0)
	{
		questionIndex = randomNumber;
		load();
		console.log(randomNumber)
	}
	else
	{
		for(let i=0;i<myArray.length;i++)
		{
			if(randomNumber==myArray[i]){
				// console.log("duplicate Random Number" + randomNumber);
				hitDuplicate=1;
			}
		}
		if(hitDuplicate == 1)
		{
			generateRandomQuestion();
			return;
		}
		else
		{
			questionIndex = randomNumber;
		}
	}
	myArray.push(randomNumber);
	console.log(myArray)
	load();
}


function check(ele)
{
	const id=ele.id;
	if(id== myApp[categoryIndex].quizWrap[questionIndex].answer)
	{
		ele.classList.add("correct");
		score++;
		scoreboard();

	}
	else
	{
		ele.classList.add("wrong");

		for(var i=0;i<option_box.children.length;i++){
			if(option_box.children[i].id== myApp[categoryIndex].quizWrap[questionIndex].answer){
				option_box.children[i].classList.add("show_correct");
			}
		}
	}
	attempt++;

	disableOptions();
	showAnswerDesc();
	showNextQuestion();
	stoptimer();
	if(number == myApp[categoryIndex].quizWrap.length)
	{
		quizOver();
	}

}

function starttimer()
{
	let timelimit = 15;
	remaining_time.innerHTML=timelimit;
	remaining_time.classList.remove("less_time");
	interval = setInterval(() =>{
		timelimit--;
		if(timelimit < 10){
			timelimit="0" + timelimit;
		}
		if(timelimit < 6)
		{
			remaining_time.classList.add("less_time");
		}
		remaining_time.innerHTML=timelimit;
		if(timelimit == 0)
		{
			clearInterval(interval);
			timeIsUp();
		}

	},1000)

}
function timeIsUp(){
	showTimeUp()
	// time_up.classList.add('show');
		for(var i=0;i<option_box.children.length;i++){
			if(option_box.children[i].id==myApp[categoryIndex].quizWrap[questionIndex].answer){
				option_box.children[i].classList.add("show_correct");
			}
		}
	    disableOptions();
		showAnswerDesc();
		showNextQuestion();

}
function stoptimer(){
	clearInterval(interval)
}
function disableOptions()
{
	for(let i = 0;i<option_box.children.length;i++)
	{
		option_box.children[i].classList.add("already-answerd");
	}
}

function showTimeUp()
{
	time_up.classList.add('show');
}

function showAnswerDesc()
{
	if(typeof  myApp[categoryIndex].quizWrap[questionIndex].desc !== 'undefined'){
		answer_desc.classList.add('show');
	    answer_desc.innerHTML=myApp[categoryIndex].quizWrap[questionIndex].desc;
	}
	
}
function hideAnswerDesc()
{
	answer_desc.classList.remove('show');
    answer_desc.innerHTML= "";
}

function showNextQuestion()
{
	next_question_btn.classList.add('show');
}

function hideNextQuestion(){
	next_question_btn.classList.remove('show')
}
// function {

// 	next_question_btn.classList.add('show');
// 	next_question_btn.style.text="center";
// }

function hideTimeUp()
{
	time_up.classList.remove('show');

}

function scoreboard(){
	score_num.innerHTML=score;
}

next_question_btn.addEventListener("click",nextQuestion);

 function nextQuestion()
 {
 	number++;
 	// questionIndex++;
 	load();
 	generateRandomQuestion();
 	hideNextQuestion();
 	hideAnswerDesc();
 	hideTimeUp();
 	starttimer();

 }
function quizOver()
{
	next_question_btn.classList.remove('show');
	see_result_btn.classList.add('show')
}

see_result_btn.addEventListener("click",()=>{
	// quiz_box.style.display="none";
	// quiz_box.classList.remove('show');
	quiz_box.classList.remove('show')
	see_result_btn.classList.remove('show');
	final_results.classList.add('show');
	quizResult();
	// resetQuiz();
	// nextQuestion();
	
})

function quizResult()
{
	document.querySelector('.total_question').innerHTML="5";
	document.querySelector('.total_attempt').innerHTML="5";
	document.querySelector('.total_correct').innerHTML=score;
	document.querySelector('.total_wrong').innerHTML=attempt-score;
	const per=(score/myApp[categoryIndex].quizWrap.length)*100;
	document.querySelector('.per').innerHTML=per.toFixed(2) + "%";
}


function resetQuiz()
{
     attempt=0;
     // questionIndex = 0;
     score = 0;
     number= 0;
     myArray=[];	
}


start_again_btn.addEventListener("click",()=>{
    // starttimer();
	// quiz_box.style.display="block";
    quiz_box.classList.add("show")
	final_results.classList.remove('show');
    // starttimer();
	resetQuiz();
	nextQuestion();
	// generateRandomQuestion();
})

go_home_btn.addEventListener("click",()=>{
	// quiz_box.style.display="none";
	final_results.classList.remove('show');
	quiz_home_box.classList.add('show');
	resetQuiz();
	// nextQuestion();
})

// start_quiz_btn.addEventListener("click",()=>{
// 	// console.log("hi");
// 	// quiz_box.style.display="block";
	// quiz_home_box.classList.remove('show')
	// quiz_box.classList.add('show');
// 	// starttimer();
// 	// generateRandomQuestion();
// })

window.onload= () =>{
  createCategory();
}



