
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
            $('#student').empty();
          var course = getSelectedText("course");

             $.ajax({
                data: 'course=' + course,
            url: 'php/getstudentlistcompletion.php',
            method: 'POST', // or GET
                success: function(msg) {
                   var data = JSON.parse(msg);
                   
                   
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

        function submitCompleted()
        {
          var course = getSelectedText("course");
          var student = getSelectedText("student");
          window.location.href="coursequizmarking.html";
           $.ajax({
                data: {course: course,student: student},
            url: 'php/addcompletedcourse.php',
            method: 'POST', // or GET
                success: function(msg) {
                  
         
         }
        });
            
            alert("Marked as Completed!");
            window.location.href="dashboard.html";
        }
