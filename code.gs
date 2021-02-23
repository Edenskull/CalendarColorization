function onCalendarChange(){
  var priority = 0;
  var color;
  const config = JSON.parse(PropertiesService.getUserProperties().getProperty('config'));
  const now = new Date();
  const events = CalendarApp.getEvents(
      now,
      new Date(now.getTime() + 2 * 60 * 60 * 1000000)
  );
  events.forEach((event) => {
    let guestList = event.getGuestList();
    guestList.forEach((guest) => {
      var gEmail = guest.getEmail();
      if(config[gEmail] !== null) {
        if(config[gEmail]["priority"] > priority) {
          color = config[gEmail]["color"];
          priority = config[gEmail]["priority"];
        }
      }
    });
    event.setColor(color);
  });
}

/**
 * Change the configuration of the trigger here
 */
function setup() {
  var config = {
    "dummy1@gmail.com": {
      "color": CalendarApp.EventColor.RED,
      "priority": 5
    },
    "dummy2@gmail.com": {
      "color": CalendarApp.EventColor.CYAN,
      "priority": 2
    }
  }
  PropertiesService.getUserProperties().setProperty('config', JSON.stringify(config));
  Logger.log(PropertiesService.getUserProperties().getProperties());
}
