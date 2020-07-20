<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="java.time.LocalDate"%>
<%-- <%@ page import="kanjiquiz.*" %> --%>
<%@ page import="kanjiquizMariaDB.StaticSelect"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>한자 퀴즈</title>
<link
	href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap"
	rel="stylesheet">
<link
	href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap"
	rel="stylesheet">
<link rel="stylesheet" href="./css/kanjiquizNew.css?v=1.7718">
</head>
<body>


	<div class="spaceResult"></div>
	<h3>한자퀴즈 자가테스트</h3>

	<%
		StaticSelect orclKanjiquiz = new StaticSelect();

	int numOfQuestion = Integer.parseInt(request.getParameter("howMany"));
	int selectedPage = Integer.parseInt(request.getParameter("selectedPage"));
	orclKanjiquiz.problemSet(numOfQuestion, selectedPage);

	// DB등록일시 확인용
	//	out.print("<p class=\"regdate\">");
	//	out.print(orclKanjiquiz.getregdate());
	//	out.print("</p>");

	int pageData = orclKanjiquiz.getPage();
	String pageToString = pageData + "";
	pageToString = pageToString.trim();
	String frontPage = "";
	String backPage = "";

	switch ((int) (Math.log10(pageData) + 1)) {
		case 2 :
		case 3 :
			frontPage = pageToString.substring(0, 1);
			backPage = pageToString.substring(1);
			break;
		case 4 :
		case 5 :
			frontPage = pageToString.substring(0, 2);
			backPage = pageToString.substring(2);
			break;
		case 6 :
			frontPage = pageToString.substring(0, 3);
			backPage = pageToString.substring(3);
			break;
		default :
			frontPage = "999";
			backPage = "1000";
			break;
	}

	String dateData = orclKanjiquiz.getlecturedate();
	String formerDate = "06";
	String latterDate = "01";
	if (dateData.charAt(0) == '0') {
		formerDate = dateData.substring(1, 2);
	} else {
		formerDate = dateData.substring(0, 2);
	}
	if (dateData.charAt(2) == '0') {
		latterDate = dateData.substring(3);
	} else {
		latterDate = dateData.substring(2);
	}

	out.print("<h4 class=\"dataInfo\">");
	out.print(formerDate + "월 ");
	out.print(latterDate + "일  /  ");
	out.print(frontPage + ", ");
	out.print(backPage + "페이지");
	out.print("</h4>");

	out.println("<h4 class=\"instruction desktop\">다음 단어의 일본어 한자와 요미가나를 써보세요 !</h4>");
	//out.println("<h4 class=\"instruction mobile\">모바일 가로보기 모드로 보면 좀 더 쾌적합니다</h4>");

	int count = 0;

	out.println("<table class=\"resultTable\">");
	out.println("<tbody>");

	int countTableData = 0;
	int countEveryFive = 5;
	for (int i = 0; i < (numOfQuestion / 5); i++) {
		// int residual = num%5; // 공백 셀

		out.println("<tr>");

		for (int j = countTableData; j < countEveryFive; j++) {
			out.println("<td>");
			out.println("<h4 class=\"problemNumber\">Q" + ++count + "</h4>"); // h4.problemNumber
			out.println("<h5 class=\"yomigana\">" + orclKanjiquiz.getYomiganaList()[j] + "</h5>");
			out.println("<h5 class=\"tango\">" + orclKanjiquiz.getTangoList()[j] + "</h5>");
			out.println("<h5 class=\"korMeaning\">" + orclKanjiquiz.getKorList()[j] + "</h5>");
			out.println("</td>");
			countTableData++;
		}
		countEveryFive += 5;

		if (countEveryFive > numOfQuestion) {
			break;
		}

		out.println("</tr>");

	}
	out.println("</tbody>");
	out.println("</table>");
	%>

	<h3 class="btnAnswer">정답 확인</h3>
	<br />
	<br />
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

		document.querySelector('.btnAnswer').addEventListener('click',
				function() {
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
