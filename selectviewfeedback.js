var quizid_global;
window.onload = getCourses(); 


		function getCourses()
		{   
            $.ajax({
            url: 'php/getusercourses.php',
            data: {uname: sessionStorage.getItem("uname")},
            method: 'POST', // or GET
                success: function(msg) {
                   var data = JSON.parse(msg);
            addCourses(data.courses);
         }
        });


    	}

        function addCourses(courses)
        {

            var jstring = courses.toString();
            var splitted = jstring.split(',');
            for (var i in splitted)
            {
                addToList(splitted[i]);
            }
            updateQuizList();
        }

        function addToList(courses)
        {
            
            $('#course').append('<option value='+courses+'>'+courses+'</option>');
        }


        function getSelectedText(elementId) {
    var elt = document.getElementById(elementId);

    if (elt.selectedIndex == -1)
        return null;

    return elt.options[elt.selectedIndex].text;
}

        function sendToFeedbackPage()
        {
          var course = getSelectedText("course");
          sessionStorage.setItem('coursename',course);
          sessionStorage.setItem('quizidu',quizid_global);
          window.location.href="coursequizfeedbackview.html";
        }

        function updateQuizList()
        {
          var course = getSelectedText("course");

             $.ajax({
                data: {student: sessionStorage.getItem("uname"), course : course },
            url: 'php/getquizlist.php',
            method: 'POST', // or GET
                success: function(msg) {
                   var data = JSON.parse(msg);
                   $('#quiz').empty();
                    quizid_global = data.quizid;
            addQuiz(data.quiz);
           
         }
        });

        }

        function addQuiz(quiz)
        {
           
            var jstring = quiz.toString();
            var splitted = jstring.split(',');
            for (var i in splitted)
            {
                addQuizList(splitted[i]);
            }
        }

        function addQuizList(quiz)
        {
            
            $('#quiz').append('<option value='+quiz+'>'+quiz+'</option>');
        }

