window.onload = retrieveContent(); 

        
        function retrieveContent()
        {   
            if(sessionStorage.getItem("uname") !== null)
            {
            var temp = sessionStorage.getItem("contenttemp");    
            getContentDetails(temp);
            }
             else
            {
               window.location.href = "login.html"; 
            }



        }

        function getContentDetails(coursename)
        {
                $.ajax({
                data: 'cid=' + coursename,
            url: 'php/coursewatch.php',
            method: 'POST', // or GET
                success: function(msg) {
                   var data = JSON.parse(msg);
         addItems(data.contentid);
         }
        });
        }

		
        function addItems(id)
        {

            var jstring = id.toString();
            var splitted = jstring.split(',');
            setCurrent(splitted[0]);
            for (var i in splitted)
            {
                placeContent(splitted[i]);
            }
        }
        function placeContent(contentid)
        {
                $.ajax({
                data: 'cid=' + contentid,
            url: 'php/getcontent.php',
            method: 'POST', // or GET
                success: function(msg) {
                   var data = JSON.parse(msg);
         addCarouselitem(data.picture,data.name,data.desc,"setCurrent("+contentid+")",data.quizid);
         }
        });
        }
            

        function addCarouselitem(src,title,desc,action, quizid)
        {
           var prompt = "Watch this";
           if(quizid !== null)
           {
                action = "sendToQuiz("+quizid+")";
                prompt = "Test yourself";
           }

            $('#caro .owl-stage-outer .owl-stage').append("<div class=\"owl-item active\" style=\"width: 408.5px; margin-right: 40px;\"><div class=\"item\">"+src+"<h2>"+title+"</h2><p>"+desc+"</p><a onclick=\""+action+"\" class=\"btn-special\">"+prompt+"</a></div><br></div>").trigger('refresh.owl.carousel');
        }

        function setCurrent(contentid)
        {
            $.ajax({
                data: 'cid=' + contentid,
            url: 'php/getcontentvideo.php',
            method: 'POST', // or GET
                success: function(msg) {
                   var data = JSON.parse(msg);
         changeCurrent(data.video,data.name);
         }
        });
        }

        function changeCurrent(video,name)
        {
            document.getElementById("title").innerHTML = name;
            document.getElementById("videodiv").innerHTML = video;

        }

        function sendToQuiz(quizid)
        {
            sessionStorage.setItem("quizid",quizid);
             window.location.href = "coursequiz.html"; 
        }