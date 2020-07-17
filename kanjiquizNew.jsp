<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>한자 퀴즈</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./css/kanjiquizNew.css?v=1.37">
</head>

<body>
    <br /><br />
    <!-- <form action="kanjiquizOracleDB.jsp"> -->




    <form action="kanjiquizMariaDB.jsp">

   <section class="selectBox">
            <h3>퀴즈 데이터를 선택하세요 : </h3><select id="pageSelector" name="selectedPage">
               	<option value= "107108">7월 16일 (107, 108페이지)</option>
                <optgroup label=" ~ 6월 ~">
                    <option value="6768">6월 02일 (67, 68페이지)</option>
                    <option value="6970">6월 03일 (69, 70페이지)</option>
                    <option value="7172">6월 04일 (71, 72페이지)</option>
                    <option value="7374">6월 09일 (73, 74페이지)</option>
                    <option value="7576">6월 10일 (75, 76페이지)</option>
                    <option value="7778">6월 11일 (77, 78페이지)</option>
                    <option value="7980">6월 16일 (79, 80페이지)</option>
                    <option value="8182">6월 17일 (81, 82페이지)</option>
                    <option value="8384">6월 18일 (83, 84페이지)</option>
                    <option value="8586">6월 23일 (85, 86페이지)</option>
                    <option value="8788">6월 24일 (87, 88페이지)</option>
                    <option value="8990">6월 25일 (89, 90페이지)</option>
                    <option value="9192">6월 30일 (91, 92페이지)</option>
                </optgroup>
                <optgroup label=" ~ 7월 ~">
                    <option value="9394">7월 01일 (93, 94페이지)</option>
                    <option value="9596">7월 02일 (95, 96페이지)</option>
                    <option value="9798">7월 07일 (97, 98페이지)</option>
                    <option value="99100">7월 08일 (99, 100페이지)</option>
                    <option value="101012">7월 09일 (101, 102페이지)</option>
                    <option value="103104">7월 14일 (103, 104페이지)</option>
                    <option value="105106">7월 15일 (105, 106페이지)</option>
                    <option value= "107108">7월 16일 (107, 108페이지)</option>
                    <!-- <option value= "109110">7월 21일 (109, 110페이지)</option> -->
                </optgroup>
            </select>
            <br />
            <h3>문제 수를 선택하세요 : </h3><select id="numSelector" name="howMany">
                <option value="10"> 몇 문제 ? </option>
                <option value="5">5 문제</option>
                <option value ="10">10 문제</option>
                <option value ="15">15 문제</option>
                <option value ="20">20 문제</option>
                <option value ="25">25 문제</option>
                <option value ="30">30 문제</option>
            </select>
            <div class="space"></div>
        </section>
        <input type="submit" value="Submit" />
    </form>
</body>

</html>
