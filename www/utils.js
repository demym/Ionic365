var isPhone=false;
var cookieDays=3;
var storage;
var logactive=true;

var usersArray=[];

jQuery(document).ready(function() {
	 
			
			})


function colog(txt)
{
 if (!logactive) return;	
 console.log(txt)	
}

function getCookie(c_name)
{
 //colog("getcookie "+c_name)
 //colog("storage "+storage+ " - "+window.localStorage)
 
 var c_value;	
 //colog("isPhone "+isPhone) 
 if (isPhone)
 {
 // alert("getting localstorage "+c_name);	 
   c_value=storage.getItem(c_name)
   if (!c_value) c_value="";
 } else {	 
	
	
 c_value = document.cookie;
var c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1)
  {
  c_start = c_value.indexOf(c_name + "=");
  }
if (c_start == -1)
  {
  c_value = null;
  }
else
  {
  c_start = c_value.indexOf("=", c_start) + 1;
  var c_end = c_value.indexOf(";", c_start);
  if (c_end == -1)
    {
    c_end = c_value.length;
    }
  c_value = unescape(c_value.substring(c_start,c_end));
  }
  }
return c_value;
}

function setCookie(c_name,value,exdays)
{
 //colog("isPhone: "+isPhone)	
 if (isPhone) {
	// alert("setting localstorage "+c_name+" to "+value);
  	 storage.setItem(c_name, value);	 
 }	
 else
 {
 
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
 }
 
// alert(getCookie(c_name));
}



var deleteCookie = function(name) {
	if (isPhone) {
	// alert("removing localstorage "+name);	
	 storage.removeItem(name);
	} else {
	 
	 
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
};


function getShares(data,userid){
	colog("get shares for userid "+userid+" into the following data ")
	colog(data);
	var retdata=[];
					  for (var i=0;i<data.rows.length; i++){
					  var row=data.rows[i].doc;
					  var sh=row.shareobject;
					  var sw=row.sharewith;
					  
					  if (sw){
					  
					  colog("sharewith: "+sw+" - userid: "+userid);
					  
					  if (sw.indexOf(userid)>-1){
						  
						 // var doc={ doc: row.shareobject};
						  var doc=row;
						  retdata.push(data.rows[i])
						  colog("pushing")
					  }
					  
					  } else {
						  colog("sharewith field of record n."+i+" is undefined, skipping")
					  }
					  
				  }
	
	return retdata;
}

function getShareObjects(data,userid){
	//alert(data.rows.length);
	var retdata=[];
	if (data.rows.length==0) return retdata;
	
					  for (var i=0;i<data.rows.length; i++){
					  var row=data.rows[i].doc;
					  var sh="";
					  if (row.shareobject) {
						  sh=row.shareobject;
						  sh.sharewith=row.sharewith;
					  }	  
					  
					  var sw="";
					  if (row.sharewith) sw=row.sharewith;
					  //var sw=row.sharewith;
					  
					  if (sw){
					  
					  colog("sharewith: "+sw+" - userid: "+userid);
					  
					  if (sw.indexOf(userid)>-1){
						  
						 // var doc={ doc: row.shareobject};
						  var doc=row;
						  retdata.push(sh)
						  colog("pushing")
					  }
					  
					  } else {
						  colog("sharewith field of record n."+i+" is undefined, skipping")
					  }
					  
				  }
	
	return retdata;
}

function thesame(x){
	return "a";
}


function startWall(){
	var temp = "<div class='brick' style='width:{width}px; height: {height}px; background-color: {color}'><div class='cover'>{BodyDiv}</div></div>";
			var colour = [
				"rgb(142, 68, 173)",
				"rgb(243, 156, 18)",
				"rgb(211, 84, 0)",
				"rgb(0, 106, 63)",
				"rgb(204, 190, 0)",
				"rgb(192, 57, 43)",
				"rgb(135, 0, 0)",
				"rgb(142, 68, 173)"
			];

			var contenutobox = [
				"<h1>IBM Client365</h1><br><h2 id='welcome'>Welcome</h2><br><h2> to a new social way to communicate with IBM</h2>",
				"<div class='feature-wrap circle TestoIconFreeWallNone' onclick='gotoPlanner()'><i class='fa fa-calendar-o'></i><h1>Planning</h1><br /><h2>Meetings, Events, Agenda</h2></div>",
				"<div class='feature-wrap circle TestoIconFreeWallLeft' onclick='gotoReachme()'><i class='fa fa-street-view'></i><br><h1>Reach me</h1><br /><h2>Anywhere, Anyway, Anytime</h2></div>",
				"<div class='feature-wrap circle TestoIconFreeWallNone' onclick='gotoElibrary()'><i class='fa fa-book'></i><h1>e-library</h1><br /><h2>Send, Get, Share</h2></div>",
				"<div class='feature-wrap circle TestoIconFreeWallLeft' onclick='gotoSocial()'><i class='fa fa-comments-o'></i><h1>Social</h1><br /><h2>Feel the World</h2><br><img src='img/social/LinkedinSquare.png' border='0' class='social'><img src='img/social/TwitterSquare.png' border='0' class='social'><img src='img/social/GoogleplusSquare.png' border='0' class='social'></div>",
				"<div class='feature-wrap circle TestoIconFreeWallLeft' onclick='gotoTrybuy()'><i class='fa fa-life-ring'></i><h1>Try & Buy</h1><br /><h2>Now for free</h2></div>",
				"<div class='feature-wrap circle TestoIconFreeWallLeft' onclick='gotoTools()'><i class='fa fa-puzzle-piece'></i><h1>Tools</h1><br /><h2>Additional capabilities</h2></div>",
				"<div class='feature-wrap circle TestoIconFreeWallNone' onclick=''><a id='btnAccount' href='#accountPanel' data-icon='user'><i class='fa fa-user'></i><br><h1>Account</h1></a><br /><h3>User Management</h3><br><br><h3 id='homeusername'></h3><br><h3  id='homerole'></h3></div>",
				"<hr><h5><a href='http://www.ibm.com/privacy/it/it/'>Privacy</a></h5><hr><h5><a href='http://www.ibm.com/legal/it/it/'>Condizioni Utilizzo</a></h5><hr>",
				"<div class='feature-wrap circle TestoIconFreeWallLeft' onclick='gotoMymessage()'><i class='fa fa-newspaper-o'></i><h1>My Message</h1><br /><h2>Direct feed from Personal Page</h2></div>"
			];

	// <div class='madewithIBM'><h5><a href=javascript:window.open('http://www.ibm.com/smarterplanet/it/it/madewithibm/','_system') >Guarda →</a></h5></div>		

			var colorfix = [
				"rgb(142, 68, 173)",
				"rgb(255, 153, 0)",
				"rgb(41, 128, 185)",
				"rgb(255, 0, 153)",
				"rgb(0, 255, 102)",
				"rgb(0, 201, 255)",
				"rgb(227, 45, 45)",
				"rgb(39, 174, 96)",
				"rgb(204, 190, 0)",
				"rgb(0, 106, 63)",
				"rgb(39, 174, 96)"
			];
			var w = 1, h = 1, html = '', color = '', limitItem = 10;

html += temp.replace(/\{height\}/g, "100").replace(/\{width\}/g, "450").replace("{color}", colorfix[0]).replace("{BodyDiv}",contenutobox[0]); // Welcome Box
html += temp.replace(/\{height\}/g, "300").replace(/\{width\}/g, "300").replace("{color}", colorfix[1]).replace("{BodyDiv}",contenutobox[1]); // Planning Box
html += temp.replace(/\{height\}/g, "150").replace(/\{width\}/g, "300").replace("{color}", colorfix[2]).replace("{BodyDiv}",contenutobox[2]); // Reach Me
html += temp.replace(/\{height\}/g, "300").replace(/\{width\}/g, "150").replace("{color}", colorfix[3]).replace("{BodyDiv}",contenutobox[3]); // Social
html += temp.replace(/\{height\}/g, "150").replace(/\{width\}/g, "300").replace("{color}", colorfix[4]).replace("{BodyDiv}",contenutobox[4]); // Library
html += temp.replace(/\{height\}/g, "100").replace(/\{width\}/g, "450").replace("{color}", colorfix[5]).replace("{BodyDiv}",contenutobox[5]); // Try & Buy
html += temp.replace(/\{height\}/g, "150").replace(/\{width\}/g, "300").replace("{color}", colorfix[6]).replace("{BodyDiv}",contenutobox[6]);  // Tools

html += temp.replace(/\{height\}/g, "150").replace(/\{width\}/g, "300").replace("{color}", colorfix[8]).replace("{BodyDiv}",contenutobox[9]);  // New Box

html += temp.replace(/\{height\}/g, "150").replace(/\{width\}/g, "150").replace("{color}", colorfix[9]).replace("{BodyDiv}",contenutobox[8]);

html += temp.replace(/\{height\}/g, "150").replace(/\{width\}/g, "300").replace("{color}", colorfix[7]).replace("{BodyDiv}",contenutobox[7]);

html += temp.replace(/\{height\}/g, "150").replace(/\{width\}/g, "150").replace("background-color: {color}","background: url(img/logo/madewithIBM4.png); background-size:contain").replace("{BodyDiv}"," ");

         //alert(html)
	 
		 setTimeout(function(){ 
			jQuery("#freewall-homepage").append(html);
			colog("gowall")
			var wall = new Freewall("#freewall-homepage"); 
			//colog(JSON.stringify(wall))
				wall.reset({
					selector: '.brick',
					animate: true,
					cellW: 160,
					cellH: 160,
					delay: 10,
					onResize: function() {
						var width=jQuery(window).width();
							colog(jQuery(window).height()+" - "+jQuery(window).width());
						if (width>1000){
							wall.fitZone(jQuery(window).width() - 30 , jQuery(window).height() - 30);
							
						} else
						{
					
						//wall.refresh(jQuery(window).width() - 30,jQuery(window).height() - 30);
						//wall.fitZone(jQuery(window).width() - 30 , jQuery(window).height() - 30);
						wall.fitWidth();
						}
						//wall.fitHeight();
						//wall.refresh(jQuery(window).width() - 30,jQuery(window).height() - 30);
						
					}
				});
				// caculator width and height for IE7;
				wall.fitZone(jQuery(window).width() - 30 , jQuery(window).height() - 30);		
                //wall.fitWidth();



		 }, 1500);
		 
		
	
	
}
/*
function goWall() {
			 colog("gowall")
			var wall = new Freewall("#freewall-homepage"); 
			colog(JSON.stringify(wall))
				wall.reset({
					selector: '.brick',
					animate: false,
					cellW: 160,
					cellH: 160,
					delay: 30,
					onResize: function() {
						wall.refresh(jQuery(window).width() - 30,jQuery(window).height() - 30);
					}
				});
				// caculator width and height for IE7;
				wall.fitZone(jQuery(window).width() - 30 , jQuery(window).height() - 30);
			}
			*/

			
function gotoPlanner(){
	window.location.href="#/app/planner";
	
}



function renderTryBuy(data)
{
	
	
 	
 var html = '', size = '', color = '', limitItem = 24;
 var colour = [
                "rgb(135, 0, 0)", /* Analytics and Big Data */
				 "rgb(192, 57, 43)", /* Messaging */
				  "rgb(41, 128, 185)", /* InternetThings */
				  "rgb(243, 156, 18)", /*BusinessSupport*/
				  "rgb(39, 174, 96)", /* Dev Ops */
				"rgb(142, 68, 173)",
				"rgb(211, 84, 0)",
				"rgb(0, 106, 63)"
			];	
 var cats = ["Analytics", "Messaging", "InternetThings", "BusinessSupport", "DevOps"];	
 var tempOLD = "<div class='brick {familyfilter} {additionalstyle}' ><div class='cover'>{description}</div></div>";
 var temp = "<div class='brick {familyfilter} {additionalstyle}' >{description}</div>";

		 //colog("rendertrybuy of: "+JSON.stringify(data));	
		 var $tb=data;
		 
		 $(cats).each(function(j){
			 
			 var cat=cats[j];
			 //find trybuys in that category
			 
			 var $ct=filterRows($tb,{
				category: cat
			 })
			 colog("trybuys in cat "+cat+": "+$ct.rows.length)
			 
			 
			 
			 $($ct.rows).each(function(i){
				 
				 var row=$ct.rows[i].doc;
				 var image=row.imageurl;
				 var title=row.title;
				 var url=row.url;
			 
			 
			var color = colour[i];
			var descr = cat;
			var csstemp= descr+"CSS"
			var bodydescr ="<div class='imagefiltro'>{imgprodotto}"+"</div><div class='bodyfiltro'>"+"{nomeprodotto}"+"</div><div class='linkfiltro'><a class='btn btn-info' href='{linkprodotto}'>Try now</a><br/><br/></div>";
			var coloreback = "#fff";
			
			descrtemp = "<div class='familyfiltro'>"+descr+"</div>"+bodydescr.replace("{imgprodotto}", "<img src='"+image+"' border='0' style='width:100%'>")
				descrtemp = descrtemp.replace("{nomeprodotto}", title).replace("{linkprodotto}", url);
				html += temp.replace(/\{size\}/g, size).replace("{color}", color).replace("{description}", descrtemp).replace("{familyfilter}", descr).replace("{additionalstyle}", csstemp);
			
			/*for	(index = 0; index < category5Title.length; index++) {
				descrtemp = "<div class='familyfiltro'>"+descr+"</div>"+bodydescr.replace("{imgprodotto}", "<img src='"+category5image[index]+"' border='0' style='width:100%'>")
				descrtemp = descrtemp.replace("{nomeprodotto}", category5Title[index]).replace("{linkprodotto}", category5URL[index]);
				html += temp.replace(/\{size\}/g, size).replace("{color}", color).replace("{description}", descrtemp).replace("{familyfilter}", descr).replace("{additionalstyle}", csstemp);
			}	*/
			 })
			 
		 })
		 
		// alert(html);
	
	return html;
	
	$("#trybuy #freewallTryBuy").html(html);
			
			$(function() {
				var wall = new Freewall("#freewallTryBuy");
				wall.reset({
					selector: '.brick',
					animate: true,
					cellW: 160,
					cellH: 'auto',
					fixSize: 0, 
					onResize: function() {
						wall.fitWidth();
					}
				});
				wall.filter(".Analytics");
		
				$(".filter-labelTB").click(function() {
					$(".filter-labelTB").removeClass("active");
					var filter = $(this).addClass('active').data('filter');
					if (filter) {
						wall.filter(filter);
					} else {
						wall.unFilter();
					}
					wall.fitWidth();
				});
				wall.fitWidth();
			});	
		 
		 //find categories
		 
		 $("#trybuy #freewallTryBuy .linkfiltro a").each(function(){
		
		 var t=$(this);
		 var hr=t.attr("href");
		 colog(hr)
		 var newhr="javascript:window.open('"+hr+"','_blank','location=no')";
		 t.attr("href",newhr);
		
	})
	
		 
	
	
	
}

function renderElibrary(data)
{
	
	
 	
 var html = '', size = '', color = '', limitItem = 24;
 var colour = [
                "rgb(135, 0, 0)", /* Analytics and Big Data */
				 "rgb(192, 57, 43)", /* Messaging */
				  "rgb(41, 128, 185)", /* InternetThings */
				  "rgb(243, 156, 18)", /*BusinessSupport*/
				  "rgb(39, 174, 96)", /* Dev Ops */
				"rgb(142, 68, 173)",
				"rgb(211, 84, 0)",
				"rgb(0, 106, 63)"
			];	
 var cats = ["video", "pdf"];	
 var tempOLD = "<div class='brick {familyfilter} {additionalstyle}'  style='width: 300px;'><div class='cover'>{description}</div></div>";
 var temp = "<div class='brick {familyfilter} {additionalstyle} card'  style='height: 200px; width: 210px; ' >{description}</div>";

  temp="<div class='card brick {familyfilter} {additionalstyle} ' style='cursor: pointer;'>";
  temp+="<div class='brickheader' style='height: 30px; text-align: center;'>{titolo}</div>";
  temp+="<div class='brickimage' style='height: 50px; text-align:center; border: 1px solid silver;'><img style='height: 50px; width: 50px;' src='{img}'/></div>";
  temp+="<div class='brickurl' style='height: 50px; text-align: center;'><a style='color: black' href='{hurl}'>{url}</a></div>";
  temp+="<div class='brickbutton' style='padding: 6px; stext-align:center;'><button class='button'><i class='icon ion-share'></i> Share</b></div>";

  temp+="</div>";                                                                                      


		 //colog("rendertrybuy of: "+JSON.stringify(data));	
		 var $tb=data;
		 
		 $(cats).each(function(j){
			 
			 var cat=cats[j];
			 //find trybuys in that category
			 
			 var $ct=filterRows($tb,{
				tipo: cat
			 })
			 colog("elibs in cat "+cat+": "+$ct.rows.length)
			 
			 
			 
			 $($ct.rows).each(function(i){
				 
				 var row=$ct.rows[i].doc;
				 var image=row.imgurl;
				 var title=row.titolo;
				 var url=row.url;
			 
			 
			var color = colour[i];
			var descr = cat;
			var tipo=row.tipo;
			var csstemp= descr+"CSS"
			var bodydescr ="<div class='imagefiltro' style='text-align: center; vertical-align: middle; height: 110px;'>{imgprodotto}</div><div class='bodyfiltro'>"+"{nomeprodotto}"+"</div><div class='linkfiltro' style='position: relative;'><a class='btn btn-info' href='{linkprodotto}'>Try now</a><br/><br/></div>";
			
			/*var bodydescr="<div class='inner-container'>";
			bodydescr+="<div class='inner'>mavafangù</div>";
			bodydescr+="<div class='inner'>mavafangù</div>";
			bodydescr+="<div class='inner'>mavafangù</div>";
			bodydescr+="<div class='inner'>mavafangù</div>";
			bodydescr+="</div>";*/
			
			var coloreback = "#fff";
			
			descrtemp = "<div class='familyfiltro ' style='background: blue; height: 20px;'>"+tipo+"</div>"+bodydescr.replace("{imgprodotto}", "<img src='"+image+"' border='0' style='border: 1px solid silver; width:80%'><br>")
				descrtemp = descrtemp.replace("{nomeprodotto}", title).replace("{linkprodotto}", url);
				//html += temp.replace(/\{size\}/g, size).replace("{color}", color).replace("{description}", descrtemp).replace("{familyfilter}", descr).replace("{additionalstyle}", csstemp);
			
			//descrtemp=temp;
			
			var thishtml=temp;
			thishtml=thishtml.replace("{titolo}",title);
			thishtml=thishtml.replace("{img}",image);
			thishtml=thishtml.replace("{url}",url);
			thishtml=thishtml.replace("{hurl}",url);
			thishtml=thishtml.replace("{familyfilter}",descr);
			
			html+=thishtml;
			/*for	(index = 0; index < category5Title.length; index++) {
				descrtemp = "<div class='familyfiltro'>"+descr+"</div>"+bodydescr.replace("{imgprodotto}", "<img src='"+category5image[index]+"' border='0' style='width:100%'>")
				descrtemp = descrtemp.replace("{nomeprodotto}", category5Title[index]).replace("{linkprodotto}", category5URL[index]);
				html += temp.replace(/\{size\}/g, size).replace("{color}", color).replace("{description}", descrtemp).replace("{familyfilter}", descr).replace("{additionalstyle}", csstemp);
			}	*/
			 })
			 
		 })
		 
		// alert(html);
	
	return html;
	
	$("#trybuy #freewallTryBuy").html(html);
			
			$(function() {
				var wall = new Freewall("#freewallTryBuy");
				wall.reset({
					selector: '.brick',
					animate: true,
					cellW: 160,
					cellH: 'auto',
					fixSize: 0, 
					onResize: function() {
						wall.fitWidth();
					}
				});
				wall.filter(".Analytics");
		
				$(".filter-labelTB").click(function() {
					$(".filter-labelTB").removeClass("active");
					var filter = $(this).addClass('active').data('filter');
					if (filter) {
						wall.filter(filter);
					} else {
						wall.unFilter();
					}
					wall.fitWidth();
				});
				wall.fitWidth();
			});	
		 
		 //find categories
		 
		 $("#trybuy #freewallTryBuy .linkfiltro a").each(function(){
		
		 var t=$(this);
		 var hr=t.attr("href");
		 colog(hr)
		 var newhr="javascript:window.open('"+hr+"','_blank','location=no')";
		 t.attr("href",newhr);
		
	})
	
		 
	
	
	
}



 function filterRows($m,filt) {
		 //console.log(JSON.stringify($m))
		 var $retrows={
			 rows: []
		 };
		 var rows = $m; //.rows; //[{person:"me", age :"30"},{person:"you",age:"25"}];
         
		 colog($m.length)
		 
		 $(rows).each(function(i){
			 
			 var row=rows[i];
			 var eligible=true;
			 
			 for(var key in row.doc){
			 // console.log("key: "+key + " . "+ row.doc[key]);
              for (var fkey in filt){
				  if (fkey==key) {
					  //console.log("found key ---->"+fkey);
					  var v1=filt[fkey].toLowerCase();
					  if (v1.trim()!="")
					  {	  
					  var v2=row.doc[key].toLowerCase();
					  if (v2.indexOf(v1)>-1){
						 // console.log("found !: "+v2);
						 
					  } else {
						  eligible=eligible && false;
					  }
					  }
					  
				  }
			  } 
            }
			if (eligible)  $retrows.rows.push(row);
    	 });
		 
		return $retrows; 
	 }
	 
	 
	 
	 
	 function gotoPlanner(){
		 window.location.href="/#/app/planner";
		 
	 }
	 
	  function gotoElibrary(){
		 window.location.href="/#/app/elibrary";
		 
	 }
	  function gotoTrybuy(){
		 window.location.href="/#/app/trybuy";
		 
	 }
	  function gotoReachme(){
		 window.location.href="/#/app/reachme";
		 
	 }
	  function gotoMymessage(){
		 window.location.href="/#/app/mymessage";
		 
	 }
	   function gotoSocial(){
		 window.location.href="/#/app/social";
		 
	 }
	   function gotoTools(){
		 window.location.href="/#/app/tools";
		 
	 }
	 
	 
	 function freewallElib(){
		 
		/* var temp = "<div class='cell' style='border: 1px solid gray;width:{width}px; height: {height}px; background-image: url(i/photo/{index}.jpg)'></div>";
			var w = 200, h = 200, html = '', limitItem = 49;
			for (var i = 0; i < limitItem; ++i) {
				html += temp.replace(/\{height\}/g, h).replace(/\{width\}/g, w).replace("{index}", i + 1);
			}
			alert(html);
			//document.getElementById('sfreewall').innerHTML=html;
			jQuery("#ionicWall").html(html);
			
			*/
			
			var wall = new freewall("#elibWall");
			wall.reset({
				selector: '.cell',
				animate: true,
				cellW: "250",
				cellH: "250",
				onResize: function() {
					wall.refresh();
					//wall.fitWidth();
				}
			});
			wall.fitWidth();
			// for scroll bar appear;
			jQuery(window).trigger("resize");
		 
		 
	 }
	 
	 
	 function clickElibTab(obj,tipo){
		 var $this=jQuery(obj);
		 var bar=$this.closest(".button-bar");
		 bar.find("a.button").removeClass("active");
		 $this.addClass("active");
		 
		 //$this.closest("div.scroll").css("border","3px solid black")
		 
		 if (tipo=="") {
			  $this.closest("ion-nav-view").find("div.col").show();
			  return;
			 
		 }
		 
		 $this.closest("ion-nav-view").find("div.col").hide();
		 $this.closest("ion-nav-view").find("div.elib_"+tipo).show();
		 
		 
	 }
	 
	 function clickTrybuyTab(obj,tipo){
		 var $this=jQuery(obj);
		 var bar=$this.closest(".bar-subheader");
		 bar.find("a.button").removeClass("active");
		 $this.addClass("active");
		 
		 //$this.closest("div.scroll").css("border","3px solid black")
		 
		 if (tipo=="") {
			  $this.closest("ion-nav-view").find("div.col").show();
			  return;
			 
		 }
		 
		 $this.closest("ion-nav-view").find("div.col").hide();
		 $this.closest("ion-nav-view").find("div.trybuy_"+tipo).show();
		 
		 
	 }
	 
	 
	 function getSafe(x){
		 var retvalue="";
		 if (x) retvalue=x;
		 return retvalue;
		 
	 }
	 
	 
	 function getUsersFromCompanies(companies,users){
		 var retvalue=[];
		 colog("getting users from company "+company);
		 companies=companies.toLowerCase();
		 for (var i=0; i<users.length; i++){
			 var doc=users[i].doc;
			 var company=doc.company.toLowerCase();
			 var arr=companies.split(",");
			 for (var x=0; x<arr.length;x++){
				 var c=arr[x].toLowerCase();
				 if (c==company){
					 retvalue.push(users[i])
					 
				 }
				 
			 }
			 
			 
		 }
		 
		 
		 
		 
		return retvalue; 
	 }
	 
	 
	 
	 
	 function rssToEvents(options){
		 
		 
		var opt = { 
		 fromdata: null,
		 evarray: null,
		 url: "",
		 evtype: "event"
        };
        $.extend(opt, options);
		
        var retarray=[];
		
		 var data=opt.fromdata;
		 
		 var items=data.rss.channel[0].item;
				$(items).each(function(i){
					var item=items[i];
					var link=item.link[0];
					var title=item.title[0];
					var descr="";
					
					if (item.description) descr=item.description[0];
					
					var destart="";
					var deend="";
					
					if (item["events:start"])
				    {		
					
					var estart=item["events:start"][0];
					var eend=item["events:end"][0];
					
					var sestart="";
					var seend="";
					
					for (var i=0; i<mesi_it.length; i++){
						var m=mesi_it[i].toLowerCase();
						if (estart.toLowerCase().indexOf(m)>-1) {
							var j=parseInt(i,10)+1;
							sestart=estart.toLowerCase().replace(" "+m+" ",j.padZero(2));
							colog("changed estart "+estart+" to "+sestart)
						}
						if (eend.toLowerCase().indexOf(m)>-1) {
							var j=parseInt(i,10)+1;
							seend=eend.toLowerCase().replace(" "+m+" ",j.padZero(2));
						}
						
					}
					
					//alert(sestart+" - "+seend)
					var start_date=moment(sestart,"DDMMYYYY").toDate();
					var end_date=moment(seend,"DDMMYYYY").toDate();
					
			
					
					
					destart=start_date;
					deend=end_date;
					
					} else{
						
						destart=new Date();
						deend=new Date();
						
					}
					
					
					var location=""
					
					if (item["events:where"])
					{
					location=item["events:where"][0];
					}
					
					var color="black"
					if (opt.evtype=="event_feed_ibm") color="blue";
					if (opt.evtype=="event_feed_pp") color="orange";
					if (opt.evtype=="meeting") color="#3333cc";
					if (opt.evtype=="event") color="#009933";
					
					
					
					var rssevent={
				 "id": "rsspp"+i,
				 "rev": "rev",
				 "title": title,
				 "summary": descr,
				 "begin": destart,
				 "start": destart,
				 "end": deend,
				 "allDay": false,
				 "eventtype": opt.evtype,
				 "color": color,
				 "customer": "customer",
				 "url": link,
				 "regurl": link,
				 "location":location,
				 "description": descr,
				 "sharewith":""
			 };
			 
			  var id=rssevent.id;
			  
			  var doc={
				  id: id,
			      doc: rssevent
			  };
			  //opt.evarray.push(doc);
			  retarray.push(doc);	
              
				});
			  colog("RETARRAY:")
			  colog(retarray)
			
					
			 return retarray;
		 
	 }