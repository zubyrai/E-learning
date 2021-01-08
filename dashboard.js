window.onload = dashboard();


		function dashboard()
		{
			if(sessionStorage.getItem("uname") !== null)
    		{	
            var uname = sessionStorage.getItem("uname");    
            $.getJSON('php/dashboard.php', {'uname': uname }, function(e) {
            decideUser(e.uid,e.utype);
    		});
            }
            else
            {
               window.location.href = "login.html"; 
            }

    	}

        function decideUser(uid,utype)
        {
            if(utype == 'u')
            {
                studentDashboard(uid,utype);
            }
            if(utype == 't')
            {
                teacherDashboard(uid,utype);
            }
            if(utype == 'm')
            {
                markerDashboard(uid,utype);
            }
        }
		
        function studentDashboard(uid,utype)
        {
            getCompletedCourses();
            addCarouselitem("images/item1.jpg","View Available Courses","View your courses","View","courselisting.html");
            addCarouselitem("images/item2.jpg","Buy Courses","See more courses that would fit your taste","Have a look","courses.html");
            addCarouselitem("images/item3.jpg","View Feedback","Look at all the feedback given to you for each course","View","selectviewfeedback.html");
            var greet = document.getElementById("greetings");
            greet.innerHTML = "Weclome, "+sessionStorage.getItem("uname");
            var greet2 = document.getElementById("greetings2");
            greet2.innerHTML = "Below is your course completion status:";
               
        }
        function teacherDashboard(uid,utype)
        {
            addCarouselitem("images/item1.jpg","Add a course","Add a course","Add","addcourse.html");
            addCarouselitem("images/item2.jpg","Add content","Add content to a course","Add","addcontent.html");
            addCarouselitem("images/item3.jpg","Add quizzes","Add quizzes to a course","Add","addquiz.html");
            var greet = document.getElementById("greetings");
            greet.innerHTML = "Weclome, "+sessionStorage.getItem("uname");
            var greet2 = document.getElementById("greetings2");
            greet2.innerHTML = "Below are your options as a Teacher";
               
        }
        function markerDashboard(uid,utype)
        {
            addCarouselitem("images/item1.jpg","Give Feedback","Leave feedback on student quizzes","View students","selectstudentmarking.html");
            addCarouselitem("images/item2.jpg","Mark courses as complete","Mark a student as having completed a course","View students","selectstudentcomplete.html");
            var greet = document.getElementById("greetings");
            greet.innerHTML = "Weclome, "+sessionStorage.getItem("uname");
            var greet2 = document.getElementById("greetings2");
            greet2.innerHTML = "Below are your options as a Marker";
               
        }
        function addCarouselitem(src,title,desc,action,link)
        {
            
            $('#caro .owl-stage-outer .owl-stage').append("<div class=\"owl-item active\" style=\"width: 408.5px; margin-right: 40px;\"><div class=\"item\"><img src=\""+src+"\" alt=\"\" class=\"img-responsive\"><h2>"+title+"</h2><p>"+desc+"</p><a href=\""+link+"\" class=\"btn-special\">"+action+"</a></div><br></div>")
        .trigger('refresh.owl.carousel');
        }

        function getCompletedCourses()
        {
                $.ajax({
                data: {uname: sessionStorage.getItem("uname")},
            url: 'php/getcoursecompletion.php',
            method: 'POST', // or GET
                success: function(msg) {
                   var data = JSON.parse(msg);
         addItems(data.cname,data.completed);
         }
        });
        }

        
        function addItems(cname,completed)
        {

            var jstring = cname.toString();
            var splitted = jstring.split(',');
            var jstring2 = completed.toString();
            var splitted2 = jstring2.split(',');
            for (var i in splitted)
            {
                placeContent(splitted[i],splitted2[i]);
            }
        }

        function placeContent(coursename,completedcheck)
        {
            if(completedcheck == "y")
            {
                completedcheck = "Completed";
            }
            else if(completedcheck == "n")
            {
                 completedcheck = "Not completed";
            }
            $('#greetings2').append("<br>"+coursename+" ->"+completedcheck);
        }

            
