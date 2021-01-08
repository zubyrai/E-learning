window.onload = retrieveContent(); 

		function retrieveContent()
		{
            var temp = sessionStorage.getItem("coursetemp");    
            getCourseDetails(temp);


    	}

        function getCourseDetails(coursename)
        {
                $.ajax({
                data: 'cid=' + coursename,
            url: 'php/getcoursedetails.php',
            method: 'POST', // or GET
                success: function(msg) {
                   var data = JSON.parse(msg);
         addItems(data.picture,data.name,data.desc,data.details);
         }
        });
        }
            

        function addItems(src,title,desc,details)
        {
            
           document.getElementById("coursename").innerHTML= title;
           document.getElementById("coursedesc").innerHTML= desc;
           document.getElementById("coursedetails").innerHTML= details;
           document.getElementById("picture").innerHTML= src;
           checkIfExists();

           
        }

        function checkLogin()
        {
            if(sessionStorage.getItem("uname") !== null)
            {
            var uname = sessionStorage.getItem("uname"); 
             $.getJSON('php/addcoursetolist.php', {'uname': uname, 'cid' : sessionStorage.getItem("coursetemp") }, function(e) {
                applyChanges(e.courses);
            });
            alert("Course added!");
            location.reload();
            }
            else
            {
               window.location.href = "login.html"; 
            }
        }

        function checkIfExists()
        {
            if(sessionStorage.getItem("uname") !== null)
            {
            
            var uname = sessionStorage.getItem("uname");    
            $.getJSON('php/courselisting.php', {'uname': uname }, function(e) {
                applyChanges(e.courses);
            });
            }
        }

        function applyChanges(courses)
        {
            var temp = sessionStorage.getItem("coursetemp"); 
            var jstring = courses.toString();
            var splitted = jstring.split(',');
            for (var i in splitted)
            {
                if(splitted[i] == temp)
                {
                    document.getElementById("link").innerHTML= "View Content";
                    document.getElementById("link").setAttribute("onclick","sendToContent("+temp+")");
                    
                }
            }
        }

        function sendToContent(cid)
        {
            sessionStorage.setItem("contenttemp",cid);
             window.location.href = "coursewatch.html"; 
        }
