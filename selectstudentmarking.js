var quizid_global;
window.onload = getCourses(); 


		function getCourses()
		{   
            $.ajax({
            url: 'php/getmarkercourses.php',
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
            updateStudentList();
        }

        function addToList(courses)
        {
            
            $('#course').append('<option value='+courses+'>'+courses+'</option>');
        }

        function updateStudentList()
        {
          var course = getSelectedText("course");

             $.ajax({
                data: 'course=' + course,
            url: 'php/getstudentlist.php',
            method: 'POST', // or GET
                success: function(msg) {
                   var data = JSON.parse(msg);
                   
                   $('#student').empty();
            addStudents(data.uname);
         }
        });

        }

        function addStudents(students)
        {
           
            var jstring = students.toString();
            var splitted = jstring.split(',');
            for (var i in splitted)
            {
                addStudentList(splitted[i]);
            }
            updateQuizList();
        }

        function addStudentList(students)
        {
            
            $('#student').append('<option value='+students+'>'+students+'</option>');
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
          var student = getSelectedText("student");
          sessionStorage.setItem('coursename',course);
          sessionStorage.setItem('studentname',student);
          sessionStorage.setItem('quizid',quizid_global);
          window.location.href="coursequizmarking.html";
        }

        function updateQuizList()
        {
          var student = getSelectedText("student");
          var course = getSelectedText("course");

             $.ajax({
                data: {student: student, course : course },
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

