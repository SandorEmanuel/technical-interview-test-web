window.Test = {

    apiURL: "http://localhost:8082",

    getQuestions: function () {
        $.ajax({
            url: Test.apiURL + "/questions",
            method: "GET"
        }).done(function (response) {
            console.log(response);

            Test.displayQuestions (response.content);
        });
    },


    addQuestionGivenAnswer: function (id,givenAnswer) {
        console.log(id,givenAnswer);

        var data = {
            'id': id,
            'givenAnswer': givenAnswer
        };

        $.ajax({
            url: Test.apiURL + "/questions",
            method: "PUT",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data)
        }).done(function (response) {
            console.log("getting response:", response, typeof response);
            response = JSON.parse(response);

            $("#add_given_answer_" + response.id + "_" + response.answer).addClass(response.success === true ? "right_answer" : "wrong_answer");
            for (i = 1; i <= 5; i++) {
                $("#add_given_answer_" + response.id + "_" + i).attr("disabled", "disabled");
            }
        });
    },
    addUser: function(){
        console.log('calling adduser');
        var firstName = $("input[title='First Name']").val();
        var lastName = $("input[title='Last Name']").val();
        var email = $("input[title='Email']").val();

        var data = {
            'firstName': firstName,
            'lastName' : lastName,
            'email' : email
        };

        $.ajax({
            url: Test.apiURL +"/results",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data)
        }).done(function (response){
            console.log(response);


            $("#firstName").html($("#firstName").attr("data-prefix").replace("%%", response.firstName));
            $("#lastName").html($("#lastName").attr("data-prefix").replace("%%", response.lastName));
            $("#email").html($("#email").attr("data-prefix").replace("%%", response.email));
            $("#result").html($("#result").attr("data-prefix").replace("%%", response.result));
        });
    },

    getQuestionRow: function(question) {
        return `<tr>
    <td class="contentTitle">${question.contentTitle}
      <ul>
        <li class="choice1"><button id="add_given_answer_${question.id}_1" class="add_given_answer" type="button" data-question_id="${question.id}" name ="${question.id}" title = "answer" id="Choice1" value="1">${question.choice1}</button></li>
        <li class="choice2"><button id="add_given_answer_${question.id}_2" class="add_given_answer" type="button" data-question_id="${question.id}" name ="${question.id}" title = "answer" id="Choice2" value="2">${question.choice2}</button></li>
        <li class="choice3"><button id="add_given_answer_${question.id}_3" class="add_given_answer" type="button" data-question_id="${question.id}" name ="${question.id}" title = "answer" id="Choice3" value="3">${question.choice3}</button></li>
      </ul>
    </td>  
    </tr>`
    },

    displayQuestions: function (questions){
        console.log('Display questions.');

        var rows = '';

        questions.forEach(question => rows += Test.getQuestionRow(question));



        $('#questions tbody').html(rows)
    },

    bindEvents: function(){
        $('#questions tbody').delegate('.add_given_answer', 'click', function () {
            var id = $(this).data('question_id');
            var givenAnswer = $(this).val();

            Test.addQuestionGivenAnswer(id,givenAnswer);
        });
    },


};



Test.getQuestions();
Test.bindEvents();



