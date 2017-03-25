function initListener(){
  $('#getdirections').click(function(event){
    event.preventDefault();
    var origin = $('#origin').val();
    var destination=$('#destination').val();
    getDirections(origin,destination);
  });
}


function getDirections(origin,destination){
  var request={
    origin:origin,
    destination:destination,
    travelMode:'TRANSIT'
  };

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: 39.90973623453719, lng:-102.48046875 }
  });
  directionsDisplay.setMap(map);
  directionsService.route(request, callback);
  // calculateAndDisplayRoute(directionsService, directionsDisplay);



function callback(response, status) {
  if (status === 'OK') {
    directionsDisplay.setDirections(response);
    var routes = response.routes;
    var stepshetml='';
    var stephtml='';
    var finalhtml='';
    routes.forEach(function(route) {
      var legshtml='';
      var legs = route.legs;
      legshtml='<p>New Route Starts : </p><li> Legs : '+ legs.length +'</li>';

      // console.log("New Route Start.");
      // console.log("Legs : "+ legs.length);
      legs.forEach(function(leg) {
        var steps = leg.steps;
        var stepshtml=legshtml + '<p>Route Details : </p><li> Leave At : ' + leg.departure_time.text +'</li><li> Reach At : ' +
        leg.arrival_time.text + '</li><li> Transfers :' + steps.length +'</li>';

        console.log(" Leave At : " + leg.departure_time.text);
        console.log(" Reach At : " + leg.arrival_time.text);
        console.log("Number of steps :" + steps.length);
        steps.forEach(function(step) {

          var transit = step.transit;
          var stepOfSteps = step.steps;
          var stepNumber=parseInt(steps.indexOf(step)+1);
          var stephtml=stephtml + '<p>'+ stepNumber + ') Instructions : ' +  step.instructions + '</p>'+
          '<li>  Step Distance: ' + step.distance.text + '</li><li> Step Duration: ' + step.duration.text + '</li>';
          console.log(stepNumber + " Step Instructions: " + step.instructions);

          console.log(stepNumber + " Step Distance: " + step.distance.text);
          console.log(stepNumber + " Step Duration: " + step.duration.text);
          // if (stepOfSteps !== undefined){
          //   stepOfSteps.forEach(function(someS) {
          //     console.log("Route -> Leg -> Step -> Steps-> StepOfSteps Instruction : " + someS.instructions);
          //   });
          // }

          if (transit !== undefined) {
            console.log("Board at : " + transit.departure_stop.name);
            console.log("Get off at : " + step.transit.arrival_stop.name);
            console.log("Boarding Time : " + transit.departure_time.text);
            console.log("You will reach at : " + transit.arrival_time.text);
            console.log("Headsign : " + transit.headsign);
            console.log("Line Name  : " + transit.line.name + " & Agency : " + transit.line.agencies.map(function(item){
              return item.name;}));
              console.log(" Your Stop Number is  : " + transit.num_stops);

            }

          });

        });
      });
    }
    else {
            window.alert('Directions request failed due to ' + status);
          }
  }
}
