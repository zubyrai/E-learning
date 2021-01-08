var answerids = [];
window.onload = retrieveContent(); 


        
        function retrieveContent()
        {   
            if(sessionStorage.getItem("uname") !== null)
            {
            var quizid = sessionStorage.getItem("quizidu");
            var student = sessionStorage.getItem("uname");      
            getQuizDetails(quizid,student);
            }
             else
            {
               window.location.href = "login.html"; 
            }



        }

        function getQuizDetails(qid,student)
        {
                $.ajax({
                data: {qid: qid, student: student},
            url: 'php/coursequizmarking.php',
            method: 'POST', // or GET
                success: function(msg) {
                   var data = JSON.parse(msg);
         addItems(data.answerid);
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
        function placeContent(answerid)
        {
                $.ajax({
                data: 'aid=' + answerid,
            url: 'php/getanswerfeedback.php',
            method: 'POST', // or GET
                success: function(msg) {
                   var data = JSON.parse(msg);
         addQuestions(data.question,"answer"+answerid,data.answer,data.feedback);
         answerids.push(answerid);
         }
        });
        }
            

        function addQuestions(question,id,answer,feedback)
        {
            $('#questions').append('<div><label for="'+id+'">'+question+'</label><br>'+answer+'</div>');
            $('#feedback').append('<div><label for="'+id+'">'+question+'</label><br>'+feedback+'</div>');
        }

        function submitFeedback()
        {
            for(i in answerids)
            {
            var element = document.getElementById("answer"+answerids[i]);
            $.ajax({
                data: {answerid: answerids[i], feedback: element.value},
            url: 'php/addfeedbackmarking.php',
            method: 'POST', // or GET
                success: function(msg) {
                  
         
         }
        });
            }
            alert("Submitted Feedback!");
            window.history.back();
        }
