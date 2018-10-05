var allEmployees;

$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=gb,us',
  dataType: 'json',
  success: function(data) {
      var employees = '<ul id="employees">';
      $.each(data.results, function(i, info) {
        employees += '<li class="employeeCard" style="display: flex;">';
        employees += '<div class="container">';
        employees += '<div class="employeePhoto"><img src="'+ info.picture.large +'"/></div>';
        employees += '<div class="employeeInfo">';
        employees += '<h3 class="employeeName">' + info.name.first + ' ' + info.name.last + '</h3>';
        employees += '<p class="email">' + info.email + '</p>';
        employees += '<p class="username">' + info.login.username + '</p>';
        employees += '<p class="city">' +  info.location.city + '</p>';
        employees += '<div class="details">';
        employees += '<p class="cell">' + info.cell + '</p>';
        employees += '<p class="street">' +info.location.street + ', ' + info.location.city + '<span class="state">' + info.location.state + ', ' + info.location.postcode + '</span></p>';
        var date = new Date(info.dob.date);
        var options = {year: '2-digit', month: '2-digit', day: '2-digit'};
        employees += '<p class="birthdate">' + date.toLocaleDateString('en-US-u-ca', options) + '</p>';
        employees += '</div></div></div> </li>';
      });
      employees += '</ul>';
      $('#employeeList').html(employees);

      makeArray();

      //MODAL
      $(allEmployees).click(function() {
        var currentEmployee;
        var current = $.inArray(this, allEmployees);

        presentCard(currentEmployee, allEmployees[current]);

        $('#modal #next').click(function() {
          nextCard();
        });

        $('#modal #prev').click(function() {
          prevCard();
        });

        function presentCard(clone, attachment) {
          $('#modal').addClass('on');
          clone = $.clone(attachment);
          $('#modal').prepend(clone);
          $('#modal .employeeCard').prepend('<span class="close">&times;</span>');
          $('.close').click(function() {
            removeCard();
            closeModal();
          });
        }

        function closeModal() {
          $('#modal').removeClass('on');
        }

        function removeCard() {
          var currentCard = $('#modal').children('.employeeCard').get(0);
            currentCard.remove();
        }

        function nextCard() {
          if ((allEmployees.length - 1) > current) {
            removeCard();
            var number = 1 + current++;
            var nextEmployee;
            presentCard(nextEmployee, allEmployees[number]);
          }
        }

        function prevCard() {
          if (current > 0) {
            removeCard();
            var number = (current--) + (-1);
            var previousEmployee;
            presentCard(previousEmployee, allEmployees[number]);
          }
        }
      });
  }
});

$('#searchbox').keyup(function () {
  var search = $(this).val().toLowerCase();

  $('.employeeInfo').each(function(i) {
    if($(this).children('.employeeName').html().indexOf(search) > -1 || $(this).children('.username').html().indexOf(search) > -1) {
      $(this).parents('.employeeCard').css('display', 'flex');
    } else {
      $(this).parents('.employeeCard').css('display', 'none');
    }
  });

  makeArray();
});

function makeArray() {
  allEmployees = $('.employeeCard[style="display: flex;"]').toArray();
}
