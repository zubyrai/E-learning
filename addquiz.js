var questionids = [];
questionids.push('question1');
window.onload = getCourses(); 


		function getCourses()
		{   
            $.ajax({
            url: 'php/getteachercourses.php',
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
        }

        function addToList(courses)
        {
            
            $('#course').append('<option value='+courses+'>'+courses+'</option>');
        }

        function submitQuiz()
        {
            var name = document.getElementById("name");
            var picture = document.getElementById("picture");
            var desc = document.getElementById("desc");
            var course = document.getElementById("course");
            var picturefile = picture.files[0];
             var formData = new FormData();
             formData.append('name', name.value);
             formData.append('picture', picturefile);
             formData.append('desc', desc.value);
             formData.append('course', course.value);
              $.ajax({
                data: formData,
            url: 'php/submitquiz.php',
            enctype: 'multipart/form-data',
            processData: false,
    contentType: false,
            method: 'POST', // or GET
                success: function(msg) {
                   var data = JSON.parse(msg); 
                   submitQuestions(data.quizid);
                  
         }
        });

        }

        function submitQuestions(quizid)
        {
            for(i in questionids)
            {
                var x = document.getElementById(questionids[i]);
                $.ajax({
                data: {question : x.value, qid: quizid},
            url: 'php/addquestion.php',
            method: 'POST', // or GET
                success: function(msg) {
         }
        });
            }
            alert("Quiz submitted");
        }
