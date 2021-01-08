window.onload = startup();

		function startup()
		{
			if(sessionStorage.getItem("uname") !== null)
    		{	var log1 = document.getElementById("login1");
    		    var log2 = document.getElementById("login2");
    		    log1.innerHTML=sessionStorage.getItem("uname");
    		    log2.innerHTML="Logout";
    		    log1.setAttribute("href","dashboard.html");
    		    log2.setAttribute("href","#");
    		    log2.setAttribute("onclick","logout()");
    		}

    	}
    	function logout()
    	{
    		sessionStorage.removeItem("uname");
    		window.location.href="index.html";
    	}
		