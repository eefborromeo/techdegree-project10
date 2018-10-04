$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=gb,us',
  dataType: 'json',
  success: function(data) {
      var employees = '<ul id="employees">';
      $.each(data.results, function(i, info) {
        employees += '<li class="employeeCard">';
        employees += '<div class="container">';
        employees += '<div class="employeePhoto"><img src="'+ info.picture.large +'"/></div>';
        employees += '<div class="employeeInfo">';
        employees += '<h3 class="employeeName">' + info.name.first + ' ' + info.name.last + '</h3>';
        employees += '<p class="email">' + info.email + '</p>';
        employees += '<p class="city">' +  info.location.city + '</p>';
        employees += '<div class="details">';
        employees += '<p class="cell">' + info.cell + '</p>';
        employees += '<p class="street">' +info.location.street + ', ' + '<span class="state">' + info.location.state + ', ' + info.location.postcode + '</span></p>';
        var date = new Date(info.dob.date);
        var options = {year: '2-digit', month: '2-digit', day: '2-digit'};
        employees += '<p class="birthdate">' + date.toLocaleDateString('en-US-u-ca', options) + '</p>';
        employees += '</div></div></div> </li>';
      });
      employees += '</ul>';
      $('#employeeList').html(employees);

      var allEmployees = $('.employeeCard').toArray();

      //MODAL
      $(allEmployees).click(function() {
        var currentEmployee;
        var current = $.inArray(this, allEmployees);

        presentCard(currentEmployee, allEmployees[current]);

        // Next Button
        $('#modal #next').click(function() {
          nextCard();
        });

        //Previous Button
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

  function filter(filtered) {
    filtered.each(function(i) {
      if ($(this).html().indexOf(search) > -1) {
        $(this).parents('.employeeCard').css('display', 'flex');
      } else {
        $(this).parents('.employeeCard').css('display', 'none');
      }
    });
  }

  filter($('.employeeName'));
  filter($('.email'));
});
