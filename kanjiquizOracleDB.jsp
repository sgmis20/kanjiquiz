<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.time.LocalDate" %>
<%-- <%@ page import="kanjiquiz.*" %> --%>
<%@ page import="kanjiquizOracleDB.*" %>
<%-- <%@ page import="kanjiquizMariaDB.*" %> --%>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>한자 퀴즈</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./css/kanjiquiz.css?v=1.1717">
  </head>
  <body>


     <div class="space">
     </div>
    <h3>한자퀴즈 자가테스트</h3>

<!--
    <br />
        <p> 오늘 날짜 : </p> <%= LocalDate.now() %>
    <br />
 -->



 


     <%
     	StaticSelect orclKanjiquiz = new StaticSelect();

		int num = Integer.parseInt(request.getParameter("howMany"));

		orclKanjiquiz.problemSet(num);

		//for (int p : kq.randomNumbers) {
		//	out.println(++count+"번 : " +p + "<br/>");
		//}
		
		out.print("<p class=\"lecturedate\">");
		out.print(orclKanjiquiz.getlecturedate());
		out.print("</p>");
		
		out.print("<p class=\"regdate\">");
		out.print(orclKanjiquiz.getregdate());
		out.print("</p>");
		
		out.println("<h4 class=\"instruction desktop\">다음 단어의 일본어 한자와 요미가나를 써보세요!</h4>");
		//out.println("<h4 class=\"instruction mobile\">모바일로는 가로보기 모드로 보시면 편합니다!</h4>");

		int count = 0;

		  out.println("<table class=\"resultTable\">");
			out.println("<tbody>");

			int countTableData = 0;
			int countEveryFive = 5;
		for (int i = 0; i < (num/5); i++) {
			  // int residual = num%5; // 공백 셀

			  out.println("<tr>");


			  for(int j=countTableData; j < countEveryFive; j++){
				  out.println("<td>");
				  out.println("<h4 class=\"problemNumber\">Q"+ ++count + "</h4>"); // h4.problemNumber
				  out.println("<h5 class=\"yomigana\">"+ orclKanjiquiz.getYomiganaList()[j] + "</h5>");
			      out.println("<h5 class=\"tango\">"+ orclKanjiquiz.getTangoList()[j] + "</h5>");
			      out.println("<h5 class=\"korMeaning\">"+ orclKanjiquiz.getKorList()[j] + "</h5>");
			      out.println("</td>");
			      countTableData++;
			  }
		      countEveryFive +=5;

			  if(countEveryFive>num){
				  break;
			  }

		      		out.println("</tr>");

		    }
    		out.println("</tbody>");
		     out.println("</table>");






		%>

    <h3 class="btnAnswer">정답 확인</h3>
    <br/>
    <br/>
    <script>

    function hideAnswer() {
    	  const upper = document.getElementsByClassName('yomigana');
    	  const middle = document.getElementsByClassName('tango');
    	  console.log(upper.length);
    	  let i;
    	  for (i = 0; i < upper.length; i++) {
    		  upper[i].style.display = 'none';
    		  middle[i].style.display = 'none';
    	  }
    	}
    hideAnswer();

    document
    .querySelector('.btnAnswer')
    .addEventListener('click', function() {
      const upper = document.getElementsByClassName('yomigana');
      const middle = document.getElementsByClassName('tango');
      console.log(upper.length);
      console.log(middle.length);
      let i;
      for (i = 0; i < upper.length; i++) {
        if (upper[i].style.display === 'none') {
        	upper[i].style.display = 'block';
        } else {
        	upper[i].style.display = 'none';
        }
      }
      for (i = 0; i < middle.length; i++) {
          if (middle[i].style.display === 'none') {
        	  middle[i].style.display = 'block';
          } else {
        	  middle[i].style.display = 'none';
          }
        }
    });


    </script>

  </body>
</html>
