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

        var givenAnswer = $("input[title='answer']").value;
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
            console.log(response);

        });
    },


    getQuestionRow: function(question) {
        return `<tr>
    <td class="contentTitle">${question.contentTitle}
      <ul>
        <li class="choice1"><input class="add_given_answer" type="button" data-question_id="${question.id}" name ="${question.id}" title = "answer" id="Choice1" value="1">${question.choice1}</li>
        <li class="choice2"><input class="add_given_answer" type="button" data-question_id="${question.id}" name ="${question.id}" title = "answer" id="Choice2" value="2">${question.choice2}</li>
        <li class="choice3"><input class="add_given_answer" type="button" data-question_id="${question.id}" name ="${question.id}" title = "answer" id="Choice3" value="3">${question.choice3}</li>
      </ul>
    </td>  
    </tr>`
    },

    displayQuestions: function (questions){
        console.log('Display questions.');

        var rows = '';

        questions.forEach(question => rows += Test.getQuestionRow(question));

        console.log(rows);

        $('#questions tbody').html(rows)
    },

    bindEvents: function(){
        $('#questions tbody').delegate('add_given_answer', 'click', function () {
            var id = $(this).data('question_id');
            var givenAnswer = $(this).value('value')

            Test.addQuestionGivenAnswer(id,givenAnswer);
        });
    }
};



Test.getQuestions();

Test.bindEvents();



