window.onload = listIt(); 


		function listIt()
		{
			if(sessionStorage.getItem("uname") !== null)
    		{
            
            var uname = sessionStorage.getItem("uname");    
            $.getJSON('php/courselisting.php', {'uname': uname }, function(e) {
                outOfJquery(e.courses,e.uid);
            });

                
            }
            else
            {
               window.location.href = "login.html"; 
            }

    	}

        function outOfJquery(courses,uid)
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
         addCarouselitem(data.picture,data.name,data.desc,"showContent("+coursename+");");
         }
        });
        }
            

        function addCarouselitem(src,title,desc,action)
        {
            
            $('#caro .owl-stage-outer .owl-stage').append("<div class=\"owl-item active\" style=\"width: 408.5px; margin-right: 40px;\"><div class=\"item\">"+src+"<h2>"+title+"</h2><p>"+desc+"</p><a onclick=\""+action+"\" class=\"btn-special\">See Content</a></div><br></div>").trigger('refresh.owl.carousel');
        }

         function showContent(cid)
        {
            sessionStorage.setItem("contenttemp",cid);
             window.location.href = "coursewatch.html"; 

        }