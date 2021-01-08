var questionids = [];
window.onload = retrieveContent(); 


        
        function retrieveContent()
        {   
            if(sessionStorage.getItem("uname") !== null)
            {
            var temp = sessionStorage.getItem("quizid");    
            getQuizDetails(temp);
            }
             else
            {
               window.location.href = "login.html"; 
            }



        }

        function getQuizDetails(qid)
        {
                $.ajax({
                data: 'qid=' + qid,
            url: 'php/coursequiz.php',
            method: 'POST', // or GET
                success: function(msg) {
                   var data = JSON.parse(msg);
         addItems(data.questionid);
         }
        });
        }

		
        function addItems(id)
        {

            var jstring = id.toString();
            var splitted = jstring.split(',');
            for (var i in splitted)
            {
                placeContent(splitted[i]);
            }
        }
        function placeContent(questionid,num)
        {
                $.ajax({
                data: 'qid=' + questionid,
            url: 'php/getquestion.php',
            method: 'POST', // or GET
                success: function(msg) {
                   var data = JSON.parse(msg);
         addQuestions(data.question,"question"+questionid);
         questionids.push(questionid);
         }
        });
        }
            

        function addQuestions(question,id)
        {

            $('#questions').append('<div><label for"'+id+'">'+question+'</label><textarea name="quizquestions" id="'+id+'" cols="30" rows="10"></textarea></div>');
        }

        function submitAnswers()
        {
            for(i in questionids)
            {
            var element = document.getElementById("question"+questionids[i]);
            $.ajax({
                data: {answer: element.value, uid: sessionStorage.getItem("uname"), qid: questionids[i], quizid: sessionStorage.getItem("quizid")},
            url: 'php/addanswer.php',
            method: 'POST', // or GET
                success: function(msg) {
                  
         
         }
        });
            }
            alert("Submitted!");
            window.history.back();
        }
