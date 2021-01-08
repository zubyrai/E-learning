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

        function submitContent()
        {
            var name = document.getElementById("name");
            var picture = document.getElementById("picture");
            var video1 = document.getElementById("video1");
            var desc = document.getElementById("desc");
            var course = document.getElementById("course");
            var picturefile = picture.files[0];
            var videofile = video1.files[0];
             var formData = new FormData();
             formData.append('name', name.value);
             formData.append('picture', picturefile);
             formData.append('video', videofile);
             formData.append('desc', desc.value);
             formData.append('course', course.value);
              $.ajax({
                data: formData,
            url: 'php/submitcontent.php',
            enctype: 'multipart/form-data',
            processData: false,
    contentType: false,
            method: 'POST', // or GET
                success: function(msg) {
                    
                   alert("Content added"); 
                   
         }
        });

        }
