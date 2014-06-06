/*
Provides access to a database of events.  Currently supports:
all():  return all events in the system
update(event):  update a specific event
add(event):  adds an event to the system
remove(event):  removes the given event from the system
*/

angular.module('eventApp').factory('EventService', function($q) {
  var events =  [{
    "id" : 123,
    "name" : "Sesame Street Live - Elmo Makes Music",
    "date" : "2014-01-15T10:30:00",
    "venue" : {
      "id" : 111,
      "name" : "Broome County Forum",
      "city" : "Binghamton",
      "state" : "NY"
    }
  }, {
    "id" : 124,
    "name" : "2014 Australian Open",
    "date" : "2014-01-15T11:00:00",
    "venue" : {
      "name" : "Rod Laver Arena",
      "city" : "Melbourne"
    }
  }, {
    "id" : 125,
    "name" : "Mac King Comedy Magic Show",
    "date" : "2014-01-15T13:00:00",
    "venue" : {
      "id" : 300,
      "name" : "Harrah's Las Vegas Casino",
      "city" : "Las Vegas",
      "state" : "NV"
    }
  }, {
    "id" : 126,
    "name" : "42nd Street",
    "date" : "2014-01-15T13:30:00",
    "venue" : {
      "id" : 1200,
      "name" : "Paramount Theatre - IL",
      "city" : "Aurora",
      "state" : "IL"
    }
  }, {
    "id" : 127,
    "name" : "Million Dollar Quartet",
    "date" : "2014-01-15T14:00:00",
    "venue" : {
      "id" : 712,
      "name" : "Apollo Theater-IL",
      
      "city" : "Chicago",
      "state" : "IL"
      
    }
  }, {
    "id" : 128,
    "name" : "Twelfth Night",
    "date" : "2014-01-15T14:00:00",
    "venue" : {
      "id" : 1665,
      "name" : "Belasco Theatre",
      "city" : "New York",
      "state" : "NY"
    }
  }, {
    "id" : 129,
    "name" : "The Glass Menagerie",
    "date" : "2014-01-15T14:00:00",
    "venue" : {
      "id" : 2411,
      "name" : "Booth Theatre",
      "city" : "New York",
      "state" : "NY"
    }
  }, {
    "id" : 130,
    "name" : "Cinderella - The Musical",
    "date" : "2014-01-16T14:00:00",
    "venue" : {
      "id" : 2332,
      "name" : "Broadway Theatre-New York",
      "city" : "New York",
      "state" : "NY"
      
    }
    
  }, {
    "id" : 131,
    "name" : "After Midnight",
    "date" : "2014-01-16T14:00:00",
    "venue" : {
      "id" : 2372,
      "name" : "Brooks Atkinson Theatre",
      "city" : "New York",
      "state" : "NY"
    }
  }, {
    "id" : 132,
    "name" : "Die Fledermaus",
    "date" : "2014-01-16T14:00:00",
    "venue" : {
      "id" : 3244,
      "name" : "Civic Opera House",
      "city" : "Chicago",
      "state" : "IL"
    }
  }, {
      "id" : 909,
      "name" : "Binghamton Whalers vs Adirondack Red Wings",
      //Yeah, these were real hockey teams that played up in Binghamton
      "date" : "1990-01-15T10:30:00",
      "venue" : {
          "id" : 111,
          "name" : "Broome County Forum",
          "city" : "Binghamton",
          "state" : "NY"
      }
  } ];
  
  return {
    all: function() { 
      var deferred = $q.defer();
      setTimeout(function(){ deferred.resolve(events);}, 100);
      return deferred.promise;
    },
    
    update: function(event) {
      events.forEach(function(item){
        if(item.id === event.id)
        {
          Object.getOwnPropertyNames(event).forEach(function(name){
            var desc = Object.getOwnPropertyDescriptor(event,name);
            Object.defineProperty(item, name, desc);
          });
        }
      });
    },
    
    add: function(event) {
      events.push(event);
    },
    
    remove: function(event) {
      events = events.filter(function(item){return item.id !== event.id});
    }
    
    
    
    
  }
});