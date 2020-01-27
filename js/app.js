let allEmployees;

function makeArray() {
  allEmployees = $('.employeeCard[style="display: flex;"]').toArray();
}

$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=gb,us',
  dataType: 'json',
  success(data) {
    let employees = '<ul id="employees">';
    $.each(data.results, function(i, info) {
      employees += '<li class="employeeCard" style="display: flex;">';
      employees += '<div class="container">';
      employees += `<div class="employeePhoto"><img src="${info.picture.large}"/></div>`;
      employees += '<div class="employeeInfo">';
      employees += `<h3 class="employeeName">${info.name.first} ${info.name.last}</h3>`;
      employees += `<p class="email">${info.email}</p>`;
      employees += `<p class="username">${info.login.username}</p>`;
      employees += `<p class="city">${info.location.city}</p>`;
      employees += '<div class="details">';
      employees += `<p class="cell">${info.cell}</p>`;
      employees += `<p class="street">${info.location.street}, ${info.location.city}<span class="state">${info.location.state}, ${info.location.postcode}</span></p>`;
      const date = new Date(info.dob.date);
      const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
      employees += `<p class="birthdate">${date.toLocaleDateString(
        'en-US-u-ca',
        options
      )}</p>`;
      employees += '</div></div></div> </li>';
    });
    employees += '</ul>';
    $('#employeeList').html(employees);

    makeArray();

    // MODAL
    $(allEmployees).click(function() {
      let currentEmployee;
      let current = $.inArray(this, allEmployees);

      function closeModal() {
        $('#modal').removeClass('on');
      }

      function removeCard() {
        const currentCard = $('#modal')
          .children('.employeeCard')
          .get(0);
        currentCard.remove();
      }

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

      function nextCard() {
        if (allEmployees.length - 1 > current) {
          removeCard();
          const number = 1 + current++;
          let nextEmployee;
          presentCard(nextEmployee, allEmployees[number]);
        }
      }

      function prevCard() {
        if (current > 0) {
          removeCard();
          const number = current-- + -1;
          let previousEmployee;
          presentCard(previousEmployee, allEmployees[number]);
        }
      }

      presentCard(currentEmployee, allEmployees[current]);

      $('#modal #next').click(function() {
        nextCard();
      });

      $('#modal #prev').click(function() {
        prevCard();
      });
    });
  },
});

$('#searchbox').keyup(function() {
  const search = $(this)
    .val()
    .toLowerCase();

  $('.employeeInfo').each(function() {
    if (
      $(this)
        .children('.employeeName')
        .text()
        .toLowerCase()
        .indexOf(search) === 0 ||
      $(this)
        .children('.employeeName')
        .text()
        .toLowerCase()
        .indexOf(search) > -1 ||
      $(this)
        .children('.username')
        .html()
        .indexOf(search) > -1
    ) {
      $(this)
        .parents('.employeeCard')
        .css('display', 'flex');
    } else {
      $(this)
        .parents('.employeeCard')
        .css('display', 'none');
    }
  });
  makeArray();
});
