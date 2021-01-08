window.onload = getMarker(); 


		function getMarker()
		{   
            $.ajax({
            url: 'php/getmarker.php',
            method: 'POST', // or GET
                success: function(msg) {
                   var data = JSON.parse(msg);
            addMarkers(data.mname);
         }
        });


    	}

        function addMarkers(mname)
        {

            var jstring = mname.toString();
            var splitted = jstring.split(',');
            for (var i in splitted)
            {
                addToList(splitted[i]);
            }
        }

        function addToList(mname)
        {
            
            $('#marker').append('<option value='+mname+'>'+mname+'</option>');
        }

        function submitCourse()
        {
            var name = document.getElementById("name");
            var picture = document.getElementById("picture");
            var desc = document.getElementById("desc");
            var details = document.getElementById("details");
            var marker = document.getElementById("marker");
            var picturefile = picture.files[0];
             var formData = new FormData();
             formData.append('name', name.value);
             formData.append('picture', picturefile);
             formData.append('desc', desc.value);
             formData.append('details', details.value);
             formData.append('marker', marker.value);
             formData.append('teacher', sessionStorage.getItem("uname"));
              $.ajax({
                data: formData,
            url: 'php/submitcourse.php',
            enctype: 'multipart/form-data',
            processData: false,
    contentType: false,
            method: 'POST', // or GET
                success: function(msg) {
                    
                   alert("Course added"); 
                   window.location.href = "dashboard.html"; 
         }
        });

        }
