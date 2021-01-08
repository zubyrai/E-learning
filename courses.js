window.onload = listIt(); 


		function listIt()
		{

            var itr;
            var itr2;
            var uname = sessionStorage.getItem("uname");    
            $.getJSON('php/courses.php', {'uname': uname }, function(e) {
                outOfJquery(e.courses);
            });


    	}

        function outOfJquery(courses)
        {

            var jstring = courses.toString();
            var splitted = jstring.split(',');
            for (var i in splitted)
            {
                getCourses(splitted[i]);
            }
        }
        function getCourses(coursename)
        {
                $.ajax({
                data: 'cid=' + coursename,
            url: 'php/getcourse.php',
            method: 'POST', // or GET
                success: function(msg) {
                   var data = JSON.parse(msg);
         addCarouselitem(data.picture,data.name,data.desc,"showCourse("+coursename+");");
         }
        });
        }
            

        function addCarouselitem(src,title,desc,action)
        {
            
            $('#caro .owl-stage-outer .owl-stage').append("<div class=\"owl-item active\" style=\"width: 408.5px; margin-right: 40px;\"><div class=\"item\">"+src+"<h2>"+title+"</h2><p>"+desc+"</p><a onclick=\""+action+"\" class=\"btn-special\">See Content</a></div><br</div>").trigger('refresh.owl.carousel');
        }

        function showCourse(cid)
        {
            sessionStorage.setItem("coursetemp",cid);
             window.location.href = "coursepage.html"; 

        }